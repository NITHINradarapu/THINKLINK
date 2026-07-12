/**
 * ThinkLink Arduino Firmware — Industrial Safety Monitor
 *
 * Sensors:
 *   - DHT11/DHT22     → Temperature & Humidity     (Pin 7)
 *   - MQ-2/MQ-135     → Gas / Smoke (Analog ADC)   (Pin A1)
 *   - KY-026 IR Flame → Flame Digital + Analog      (D0 → Pin 2, A0 → Pin A0)
 *   - Vibration SW-420→ Vibration digital            (Pin 3)
 *
 * Outputs (Serial 9600 baud, JSON per packet):
 *   {"device_id":"ARDUINO-01","temperature":25.3,"humidity":52.1,
 *    "gas_level":120,"smoke_detected":false,
 *    "flame_detected":true,"flame_intensity":850,"flame_proximity":0.83,
 *    "vibration":0.0,"battery_level":100}
 *
 * Actuator Inputs (from Python backend via Serial):
 *   '1' → Buzzer + Red LED ON   (ALARM)
 *   '0' → Buzzer OFF, Green LED (NOMINAL)
 *   'R' → Red LED ON
 *   'G' → Green LED ON
 *   '2' → Emergency relay open (Machine shutdown)
 *
 * WIRING KY-026 Flame Sensor:
 *   VCC → 5V (or 3.3V)
 *   GND → GND
 *   A0  → Arduino A0   (analog intensity: 0=flame/close, 1023=no flame)
 *   D0  → Arduino Pin 2 (digital: LOW=flame detected, HIGH=no flame)
 *   Potentiometer on board: turn CW to increase sensitivity
 */

// ─── Pin Definitions ──────────────────────────────────────────
#define DHTPIN          7       // DHT temp/humidity data pin
#define DHTTYPE         DHT11   // Change to DHT22 if you have that model

#define GAS_PIN         A1      // MQ-2/MQ-135 analog gas sensor
#define GAS_DOUT_PIN    4       // MQ-2 digital threshold pin (optional)

// Flame sensor KY-026 / YG1006 IR sensor
#define FLAME_ANALOG_PIN  A0    // A0 → analog intensity (0=flame nearby, 1023=no flame)
#define FLAME_DIGITAL_PIN 2     // D0 → digital threshold output (LOW when flame detected)

// Vibration sensor SW-420
#define VIBRATION_PIN   3       // Digital vibration trigger

// Actuator pins
#define BUZZER_PIN      8
#define LED_RED_PIN     9
#define LED_GREEN_PIN   10
#define RELAY_PIN       11

// ─── Library ──────────────────────────────────────────────────
#include <DHT.h>
DHT dht(DHTPIN, DHTTYPE);

// ─── Constants ────────────────────────────────────────────────
#define SEND_INTERVAL_MS       1000   // Send JSON every 1 second
#define FLAME_SAMPLES          5      // Average this many ADC samples for noise reduction
#define FLAME_ANALOG_THRESHOLD 600    // ADC value BELOW this = flame detected
                                      // KY-026 A0 outputs LOW when flame is near
                                      // Calibrate: try 500-700 based on your environment
#define GAS_DANGER_THRESHOLD   400    // MQ-2 ADC value for smoke/gas alert
#define VIBRATION_DEBOUNCE_MS  50     // Hold vibration flag for this long (ms)

// ─── State ────────────────────────────────────────────────────
unsigned long lastSendTime    = 0;
unsigned long vibrationTime   = 0;
bool          vibrationActive = false;

// ─── Flame Sensor Reading ────────────────────────────────────
// KY-026 behaviour:
//   Analog A0 : HIGH (near 1023) = no flame | LOW (near 0) = flame directly in front
//   Digital D0: LOW  = flame detected | HIGH = no flame
//
// We use BOTH pins simultaneously:
//   D0  → instant boolean, calibrated by the onboard potentiometer
//   A0  → smoothed analog value for intensity/proximity
//
// Returned intensity is INVERTED: 0 = no flame, 1023 = maximum/very close flame
struct FlameReading {
  bool    detected;    // true if flame is present (D0 OR analog threshold)
  int     rawAnalog;   // raw ADC average (0–1023); low = close flame
  int     intensity;   // inverted (0–1023); high = intense flame
  float   proximity;   // 0.0–1.0; 1.0 = flame very close to sensor
};

FlameReading readFlameSensor() {
  FlameReading r;

  // Average multiple ADC reads to reduce electrical noise
  long sum = 0;
  for (int i = 0; i < FLAME_SAMPLES; i++) {
    sum += analogRead(FLAME_ANALOG_PIN);
    delay(2);
  }
  r.rawAnalog = (int)(sum / FLAME_SAMPLES);

  // Invert so that HIGH means intense flame
  r.intensity = 1023 - r.rawAnalog;

  // Digital is active-LOW on KY-026
  bool digitalFlame = (digitalRead(FLAME_DIGITAL_PIN) == LOW);

  // Analog confirm: raw below threshold → flame within sensor range
  bool analogFlame  = (r.rawAnalog < FLAME_ANALOG_THRESHOLD);

  // Detected if EITHER method triggers (D0 is primary; analog adds sensitivity)
  r.detected = digitalFlame || analogFlame;

  // Proximity 0.0–1.0
  r.proximity = constrain((float)r.intensity / 1023.0, 0.0, 1.0);

  return r;
}

// ─── Vibration Reading ────────────────────────────────────────
float readVibration() {
  if (digitalRead(VIBRATION_PIN) == HIGH) {
    vibrationTime   = millis();
    vibrationActive = true;
  }
  if (vibrationActive && (millis() - vibrationTime > VIBRATION_DEBOUNCE_MS)) {
    vibrationActive = false;
  }
  return vibrationActive ? 1.0 : 0.0;
}

// ─── Handle Incoming Actuator Commands ───────────────────────
void handleSerialInput() {
  while (Serial.available()) {
    char cmd = (char)Serial.read();
    switch (cmd) {
      case '1': // Full alarm: buzzer + red LED
        digitalWrite(BUZZER_PIN,    HIGH);
        digitalWrite(LED_RED_PIN,   HIGH);
        digitalWrite(LED_GREEN_PIN, LOW);
        break;
      case '0': // Nominal: buzzer off + green LED
        digitalWrite(BUZZER_PIN,    LOW);
        digitalWrite(LED_RED_PIN,   LOW);
        digitalWrite(LED_GREEN_PIN, HIGH);
        break;
      case 'R': // Red LED only (silent alarm)
        digitalWrite(LED_RED_PIN,   HIGH);
        digitalWrite(LED_GREEN_PIN, LOW);
        break;
      case 'G': // Green LED only
        digitalWrite(LED_RED_PIN,   LOW);
        digitalWrite(LED_GREEN_PIN, HIGH);
        break;
      case '2': // Emergency: open relay (machine shutdown)
        digitalWrite(RELAY_PIN, LOW);
        break;
    }
  }
}

// ─── Setup ───────────────────────────────────────────────────
void setup() {
  Serial.begin(9600);
  dht.begin();

  pinMode(FLAME_DIGITAL_PIN, INPUT);
  pinMode(GAS_DOUT_PIN,      INPUT);
  pinMode(VIBRATION_PIN,     INPUT);

  pinMode(BUZZER_PIN,    OUTPUT);
  pinMode(LED_RED_PIN,   OUTPUT);
  pinMode(LED_GREEN_PIN, OUTPUT);
  pinMode(RELAY_PIN,     OUTPUT);

  // Safe startup state
  digitalWrite(BUZZER_PIN,    LOW);
  digitalWrite(LED_RED_PIN,   LOW);
  digitalWrite(LED_GREEN_PIN, HIGH); // Green = initialising OK
  digitalWrite(RELAY_PIN,     HIGH); // NC relay = machine running

  delay(2000); // Allow DHT + MQ-2 sensors to stabilise
}

// ─── Main Loop ───────────────────────────────────────────────
void loop() {
  handleSerialInput();

  unsigned long now = millis();
  if (now - lastSendTime < SEND_INTERVAL_MS) {
    delay(10);
    return;
  }
  lastSendTime = now;

  // ── Read all sensors ──────────────────────────────────
  float temperature = dht.readTemperature();
  float humidity    = dht.readHumidity();
  if (isnan(temperature)) temperature = 25.0;  // DHT failure fallback
  if (isnan(humidity))    humidity    = 50.0;

  int   gasAdc    = analogRead(GAS_PIN);
  bool  smokeBool = (gasAdc >= GAS_DANGER_THRESHOLD);

  FlameReading flame = readFlameSensor();
  float vibration    = readVibration();

  // Flame combustion also produces gases → raise smoke flag
  if (flame.detected) smokeBool = true;

  // ── Emit JSON packet ──────────────────────────────────
  Serial.print("{");
  Serial.print("\"device_id\":\"ARDUINO-01\"");
  Serial.print(",\"temperature\":");      Serial.print(temperature, 1);
  Serial.print(",\"humidity\":");         Serial.print(humidity, 1);
  Serial.print(",\"gas_level\":");        Serial.print(gasAdc);
  Serial.print(",\"smoke_detected\":");   Serial.print(smokeBool   ? "true" : "false");
  Serial.print(",\"flame_detected\":");   Serial.print(flame.detected  ? "true" : "false");
  Serial.print(",\"flame_intensity\":");  Serial.print(flame.intensity);    // 0–1023
  Serial.print(",\"flame_raw\":");        Serial.print(flame.rawAnalog);    // raw ADC (debug)
  Serial.print(",\"flame_proximity\":"); Serial.print(flame.proximity, 3);  // 0.0–1.0
  Serial.print(",\"vibration\":");        Serial.print(vibration, 2);
  Serial.print(",\"battery_level\":100");
  Serial.println("}");
}
