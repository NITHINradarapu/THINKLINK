# DOCUMENT: agent 7 kb1.pdf

# **Novel Method of Separating Probe and Wire Bond Regions without Increasing Die Size and Reducing Weak Fab-Back End of Line Adhesion Interfaces** 

Chu-Chung (Stephen) Lee<sup>1*</sup> , Tu Anh Tran<sup>1</sup> , Bill Williams, Jody Ross<sup>2</sup> Freescale Semiconductor, Inc. 7700 W. Parmer Lane Austin, Texas 78729 

1: Advanced Packaging & Systems Integration (APSI) / Bond Pad Technology Group Stephen.chuchung.lee@freescale.com, Tu.Anh.tran@freescale.com 

2: Final Manufacturing / Global New Product Introduction (NPI) JodyRoss@freescale.com * Corresponding author 

## **Abstract** 

The drive for enhanced electrical performance and reduced silicon area has triggered significant changes in wafer fabrication, wafer level testing, and packaging technologies. In the wafer fabrication era, copper is quickly replacing aluminum as the interconnect metal of choice for technologies 0.13µm and below. To overcome the difficulty of wire bonding onto readily oxidized copper bond pads, capping copper bond pads with aluminum has been the industry standard method for wire bonding. In terms of wafer level testing and packaging, the resulting fine pitch geometry has created challenges for both cantilever probe and wire bond processes. Pad damage due to probe marks during probe process has been shown to cause "non-sticks" and "lifted bonds" at the wire bonding process. The wire bond yield loss due to pad damage is aggravated for fine pitch since increasingly smaller bonded ball diameters are formed on top of the same damage area caused by the probe mark. Wire Bond parameter optimization can minimize wire bond yield loss but cannot eliminate the problem. One logical solution is to lengthen the bond pad to create separate regions for probing and wire bonding. However, this method can result in a larger die size. This paper will reveal a unique bond pad structure that provides separate regions but yet results in no impact to the existing die size. This bond pad structure utilizes the aluminum cap layer to create a longer bond pad without changing the size of the underlying copper last metal, resulting in no impact to the existing die size. Evaluations were conducted on 0.13µm CMOS technology, with cantilever probing and wire bonding on 52µm bond pad size. Failure analysis and test methods to detect failures will be discussed. Designs of experiments for probing and wire bonding processes, characterization studies, and reliability results will be presented. Furthermore, a unique Extended Armored Pad (EAP) has been introduced for the purpose of reducing the Ta-Cu interface area under the Aluminum bond pad region because the Ta-Cu adhesion is known to be one of the weakest interfaces for Cu-interconnect BEOL processes. 

**Key words:** Copper Probe, Wire Bond, Fine Pitch, Back End of Line (BEOL), Aluminum Cap 

### **1. INTRODUCTION** 

Copper is quickly replacing aluminum as the interconnect metal of choice for CFMOS technologies at 0.13µm and below. Cantilever probe technology has long been the most widely used and cost effective method of conducting wafer level testing. Correspondingly, for packaging, wire bonding is the dominant means of interconnection between the silicon chip and the package. The ever-present drive for 

miniaturization of electronic products demands the need for silicon shrinks and smaller bond pad geometries. Copper interconnects, small bond pad sizes, and fine pitches between the pads present increasing challenges for both cantilever probing and wire bonding. 

One of the primary issues is the interaction between the probe mark and the wire bond. The probe mark is the indentation left on the bond pad due to contact between the cantilever needle 

>  _International Microelectronics And Packaging Society  — JMEP, Vol. 3, No.1, 1_<sup>_st_</sup> _Qtr, 2006 (ISSN 1551-4897)_ 

1 

Novel Method of Separating Probe and Wire Bond Regions without Increasing Die Size and Reducing Weak Fab-Back End of Line Adhesion Interfaces 

and the bond pad. For closely spaced and small bond pads, it has become increasingly difficult to control the size, location, and consistency of the probe mark. This creates significant damage on the bond pad, which results in difficulty of forming a bond during wire bonding. The resulting failure modes are “non-stick” during wire bonding, and “lifted bond” resulting in “low ball shear force” during the ball shear test. 

In order to utilize the existing infrastructure and to overcome the difficulty of probing and wire bonding directly onto a copper bond pad, aluminum has been used to “cap” the copper bond pad [1 and 2]. One of the concerns with this pad structure is the possibility of the probe mark scrubbing through and penetrating the aluminum and exposing the underlying copper. The exposed copper oxidizes, further exacerbating the difficulty of wire bonding onto the bond pad. Common probe solutions to the issues described above have been focused on creating a smaller and shallower probe mark. A typical strategy to make a smaller probe mark is to reduce the probe needle tip diameter. In some cases, 0.8mil and 0.6mil tips have been used. Small probe needles pose both fabrication and maintenance challenges. Many probe card suppliers have difficulties in controlling the size, location, and durability of these small probe needles. The life of the probe needle reduces dramatically as the diameter decreases. In addition, the need for special needle manufacturing processes and/or materials increases the cost of probe cards. These issues are amplified for high I/O devices where probe needles are configured in multiple tiers. Some devices having 400 – 500 bond pads require 3 or 4 tiers of needles on a single probe card. On top of this, many devices require wafer level testing multiple times, on multiple die simultaneously and at elevated temperatures. 

To minimize the depth of the probe mark and lessen copper exposure, a conventional method is to reduce the force exerted by the probe needle onto the bond pads. This is achieved by manufacturing the probe card at a lower spring force, and by reducing the overdrive during the probe process itself. However, in order to obtain valid wafer level test results, it is necessary to achieve good contact between the needle and the bond pad. Reducing the probe needle force may result in unstable test results. 

successfully wire bonded, even when the bonding parameters are fully optimized. 

### **2. SOLUTION – BOND PAD STRUCTURE** 

The solution to eliminate issues due to the interaction between the probe mark and the wire bond is to create separate regions on the bond pad for probing and wire bonding. With separate regions, the probe process can be optimized to maintain the lowest contact resistance with the bond pad without limiting the probe mark size to facilitate good wire bonding. Thus, the only constraint on probe mark size is the bond pad size. With a separate wire bond region, a clean, untouched bond pad is then available for wire bonding. This is crucial for wire bonding on small bond pads. 

Fig. 1 shows an illustration of a conventional bond pad with a shared probe and wire bond location. In Fig. 2, the concept of separating bond pad from probe region is shown. 



**Fig. 1. Conventional Bond Pad with Shared Probe and Wire Bond Location** 



**Fig. 2. Bond Pad with Separate Probe and Wire Bond Regions** 

Fig. 3 shows a cross-sectional illustration of a standard copper bond pad with an aluminum cap. To create two regions on a single bond pad, the “conventional” manufacturing method would lengthen the last metal copper bond pad to enable the elongated aluminum pad.  The conventional method therefore creates a larger die size and increases the overall cost of the device. 

To tackle the issues from the wire bond side, wire bond parameters such as ultrasonic power and bond force are adjusted. For larger bond pads, the bonded ball diameter can be increased so that the ratio of the ball bond to the probe mark is larger. This provides a higher percentage of the “undamaged” aluminum pad for the bond to be created. However, with small bond pads, the damage on the bond pad caused by the probe mark is often too severe to be 

>  _International Microelectronics And Packaging Society  — JMEP, Vol. 3, No.1, 1_<sup>_st_</sup> _Qtr, 2006 (ISSN 1551-4897)_ 

2 

C. Lee, T. Tran, B. Williams, J. Ross 



**Fig. 3. Cross-section of Standard Aluminum Cap Bond Pad** 

### **2.1  Probe Over Passivation (POP)** 

In Fig. 4, a new bond pad structure with separate probe and wire bond regions without increasing the die size is presented. On an aluminum capped copper bond pad, the aluminum is extended over the passivation region beyond the underlying copper bond pad. Since the copper bond pad size remains the same, this pad structure allows for a longer bond pad with no impact to the size of the die. Furthermore, no additional wafer processing costs are incurred, since the aluminum and barrier layers are blanket sputtered on the entire wafer and etched to define the features. Since the probe region is defined to be over the passivation, this type of bond pad structure is called Probe-Over-Passivation (POP) pad. 



**Fig. 4.  Schematic drawing of Probe Over Passivation pads (POP): Separate Probe and Wire Bond Regions without Increasing Die Size** 

### **2.2  EXTENDED ARMORED PAD (EAP)** 

In Fig. 5, an Extended Armored Pad (EAP) design is introduced. The EAP concept has been created mainly to reduce the Ta-Cu interface area under the wire bonding region. This bond pad design was to resolve a unique bond pad lift problem that will be discussed in details in a later section of this paper.  As shown in Fig. 5, the passivation layer was patterned with small vias above the last copper bond pad. These vias above the copper pad will be filled later with Ta then aluminum to allow the electrical connection. Comparing the cross-sections of the POP and EAP bond pads, the EAP pad offers a significantly reduced Ta-Cu area.  The Ta-Cu interface is known to be the weakest adhesion interface, of the Back End of Line (BEOL).  The EAP bond 

pad structure reduces the area of this weak interface without adding additional Fab processing cost or increasing the die size. The size and location of aluminum vias of EAP bonding region have been carefully designed such that both the electrical performance and electro-migration requirements can be met. 



<!-- Start of picture text -->
Al via<br><!-- End of picture text -->

**Fig. 5.  Cross-section of Extended Armored Pad design with separate probe and wirebond regions and reduced Ta-Cu interface area** 

### **3. PRELIMINARY CONSIDERATIONS** 

Theoretical calculations and simulations were conducted to determine the viability of using both POP and EAP bond pad structures. 

### **3.1  Adhesion** 

Previous data [1 and 2] had shown good adhesion between the copper-passivation-barrier-aluminum interfaces. 

### **3.2  Contact Force** 

An estimate of the force per unit area exerted during probing and wire bonding was made. Typical values associated with probe forces are as follows: 

Probe needle force = 0.8g/mil of overdrive Overdrive = 50µm Tip = 0.8 mil 

Pr _obeForce_ = 8.0 _g_ / _milOD_ × 50µ _mOD_ × π 8.0 _mil_ 1 2 = .313 _g_ / _mil_ 2 <u>(</u> 4 <u>)</u> 

Although a direct comparison cannot be made due to the different nature of the forces, this force is relatively low when compared to forces exerted during wire bonding. Admittedly, wire bond forces are difficult to estimate. However, typical values during wire bonding, without considering ultrasonic energy, are approximated as follows: 

>  _International Microelectronics And Packaging Society  — JMEP, Vol. 3, No.1, 1_<sup>_st_</sup> _Qtr, 2006 (ISSN 1551-4897)_ 

3 

Novel Method of Separating Probe and Wire Bond Regions without Increasing Die Size and Reducing Weak Fab-Back End of Line Adhesion Interfaces 



### **4. EXPERIMENTAL APPROACH** 

The test vehicle used in this study was fabricated with 0.13µm CMOS copper technology.  The aluminum cap layer of the test vehicle was re-designed to extend the aluminum cap above the passivation and thus elongate the aluminum caps of bond pads such that a separate probe region was created on the passivation.  The experiment was conducted in three parts: 

### **3.3  Electrical Simulation** 

An electrical simulation was conducted to determine the capacitance effects of the additional aluminum metal. Simulation details will not be presented in this paper. The results indicated a negligible increase in capacitance as a result of the new bond pad structure. Compared to the POP bond pad, where the whole bonding surface can be used to carry the electrical current, the EAP can only transfer electrical current through the aluminum vias. The size of aluminum vias can potentially raise the electro-migration concern. Therefore, optimizing the size and location of these aluminum vias is the key to the success of implementing EAP. 

### **3.4  Thermal Simulation** 

Likewise, there was no impact on thermal performance of the die or package associated with the increase in aluminum bond pad area. 

### **3.5  Topography of bonding surface of Extended Armored Pad (EAP)** 

The aluminum topography of bonding region of EAP follows the profile of last passivation, and thus the EAP bonding surface cannot be as smooth as the regular bonding pad surface (Fig. 5). Therefore, a special wire bond process optimization needs to be performed in order to overcome the topography of EAP aluminum bonding surface. 

Discussions in this paper will focus on the key experiments and evaluations conducted to ensure manufacturability and reliability of wafers containing both POP and EAP pads. The optimized assembly process developed for POP can be applied to EAP pads except for the wire bond process recipe. The topography of aluminum bonding surface of EAP depends strongly on the passivation thickness, the aluminum via size (height / depth ratio) and the final aluminum layer thickness. The aluminum via location and size were optimized so that the wire bond process developed for POP pad can be applied to EAP pad with a very minor adjustment. 

a) Probe performance comparison between standard location and POP location 

b)   Wire bond yield, and 

c)  Package reliability stress testing 

### **4.1 Probe Performance Comparison between Standard Probe Location and POP Location** 

The overall purpose of the probe experiments is (1) to establish at the minimum, the probe yield equivalency between the standard probe location and POP probe location; (2) to ensure no passivation cracking or copper metal damage underneath the POP probe marks across a range of probe process conditions; and (3) to establish new POP probe card specifications and probe process window that takes advantage of no interaction with wire bonding. 

Table 1 shows the three probe cards that were evaluated. All probe cards were fabricated with 0.8 mil needle tip diameter. The spring force designed for the baseline probe card and POP light probe card was optimized so as to provide a balance between low contact resistance during probing and minimal pad damage required for wire bonding. Since probing on the POP location eliminates the interaction between probe mark damage and wire bondability, the POP card with heavier spring force was evaluated to obtain the lowest contact resistance with no damage to the underlying passivation layer. This advantage can potentially widen the probe manufacturing window in terms of heavier contact force for lower contact resistance and less re-probe is needed. 

>  _International Microelectronics And Packaging Society  — JMEP, Vol. 3, No.1, 1_<sup>_st_</sup> _Qtr, 2006 (ISSN 1551-4897)_ 

4 

C. Lee, T. Tran, B. Williams, J. Ross 

**<u>Table 1. Probe Cards Used in Evaluations</u>** 

|**Probe Card**|**Description**|
|---|---|
|Baseline|Baseline probe card<br>targeting thestandard<br>probe location|
|POP Light|POP probe card targeting<br>thePOP<br> probe locations<br>and designed at thesame<br>spring force<br> as the<br>baseline probe card|
|POP Heavy|POP probe card targeting<br>thePOP<br> probe location<br>and designed at aheavier<br>spring force|



A four-cell experiment presented in Table 2 was planned to provide the direct comparison of probe performance between the baseline probe card and the two POP probe cards. One wafer was used in each cell of the experiment. To exercise the operating range of the probe cards, two probe overdrive settings were used - a nominal overdrive setting and a heavy overdrive setting which is 20% higher than the nominal setting. On each wafer, all 2118 dice were probed at the standard location using the baseline probe card, then probed again at the POP location using the POP probe card at the probe conditions defined for each cell. To further understand the extent of passivation damage under POP locations due to multiple probe passes, the number of probe passes varied from 1, 2, 3 and 4 double-touch passes (i.e. 2, 4, 6 and 8 touches) across each wafer.  Fig. 6 depicts an example of the wafer map instruction for Cell 1 of the probe experiment. 

**Table 2.  POP Probe Experiment Matrix** 

||**Pr**|**obe Card Ty**|<br>**pe**||
|---|---|---|---|---|
|||||**e**|
||**Baseline**|**POP Light**|<br>**Heavy**||
|**Nominal**<br>**rive**|X|X||1|
|**Heavy**<br>**verd**<br>**ting**|X|X||2|
|**Nominal**<br>**obe O**<br>**Set**|X||X|3|
|**Heavy**<br>**Pr**|X||X|4|



Three types of responses were collected and compared on each of the four wafers: (1) electrical yield during probing, (2) mechanical characterization of probe mark (X- and Y- dimensions and depth measurement), and (3) inspection for passivation cracking and copper line disturbance underneath the POP locations. 

Two methods used to inspect for passivation cracking or copper line disturbance are a chemical etching method and Focused Ion Beam (FIB) inspection through the probe marks. The chemical etching method is a two-step process, with the first one using fuming nitric acid to attack any exposed Cu metal, and the second one using NaOH to remove the Al cap and the barrier to reveal the passivation layer underneath the POP location. Each POP bond pad is examined with high magnification optical microscope at 100X, for passivation cracking or copper line corrosion. 



**Fig. 6.  Wafer Map Instruction for Cell 1** 

### **4.2  Wire Bond Yield** 

Since the intent of the POP concept is to minimize non-stickon-pad (NSOP) defect at wire bonding by eliminating the interaction between probing and wire bond processes, the main assembly response presented in this paper will be the NSOP defect rate when wire bonding the test dice on a 160 I/O 15x15mm 1mm pitch PBGA.  Although the wafers used in the probe experiments described in the previous section were probed at both the standard and POP locations, the wafers sent for assembly evaluation were probed only at the POP locations, leaving the standard probe location un-probed for wire bonding. The targeted ball bond diameter was 40µm using 20µm-diameter Au wire. The NSOP rate for the test vehicle using POP bond pads was compared with NSOP rate 

>  _International Microelectronics And Packaging Society  — JMEP, Vol. 3, No.1, 1_<sup>_st_</sup> _Qtr, 2006 (ISSN 1551-4897)_ 

5 

Novel Method of Separating Probe and Wire Bond Regions without Increasing Die Size and Reducing Weak Fab-Back End of Line Adhesion Interfaces 

observed in production devices wire bonded with similar ball bond diameters on production probe marks.  The expectation was that the NSOP rate for the POP bond pads would be substantially lower than that of production devices. 

### **4.3  Product and Package Reliability Testing** 

The test dice were submitted to standard device and package qualification testing. Device-related testing included Dynamic High Temperature Operating Life (HTOL) (125<sup>o</sup> C with dynamic bias for a minimum of 168 hours), Static Bake (150<sup>o</sup> C for a minimum of 168 hours), ESD Human Body Model (2000V requirement) and Machine Model (200V requirement), and Latch-up (200mA requirement). Packagelevel reliability testing was performed on the packages, which began with Moisture Sensitivity Level 3 (MSL3) preconditioning (10 cycles of temperature cycling at -65<sup>o</sup> C to 150<sup>o</sup> C, bake at 125<sup>o</sup> C/24hours, moisture soak at 30<sup>o</sup> C, 60%RH for 192 hours, and 3 cycles of forced convection reflow at 260°C). After MSL3 preconditioning, parts were split and subjected to Air-to-Air Temperature Cycling (-65<sup>o</sup> C to 150<sup>o</sup> C for 1000 cycles), Autoclave (121<sup>o</sup> C, 100%RH, 15PSIG for 144 hours), and Temperature-Humidity-Bias THB (85<sup>o</sup> C, 85%RH, bias for 1000 hours). 

There are two failure mechanisms of primary concern: (1) electrical performance after stress testing; and (2) delamination of the extended aluminum cap bond pads to the mold compound. 

### **5. RESULTS** 

### **5.1  Probe Performance Comparison between Standard Probe Location and POP Location** 

The probe yield comparison among Baseline and POP Light cards is summarized in Table 3. For Wafer 1, the overdrive setting was the same for both probe cards. For Wafer 2, the overdrive for the Baseline probe card was set 20% higher than the overdrive of the POP Light card. In both cases, since the wafers and test program were still at an early development stage, only subtle differences in probe yield could be seen. However, the results were adequate enough to indicate no probe yield degradation due to probing on the POP location. As expected, the results for Wafer 2 indicate that there is a slight advantage of increasing the overdrive setting to produce better contact between the pad and probe needle. 

**Table 3.  Probe Yield Comparison between Baseline** **<u>and POP Light Probe Cards</u>** 

|Wafer<br>ID|<br># of<br>Passes|<br>Baseline<br>Overdrive|<br>POP<br>Light<br>Overdrive|<br>Probe<br>Yield<br>Difference<br>(POP Light<br>– Baseline)|
|---|---|---|---|---|
|1|1|N|N|4.2|
||2|N|N|1.4|
||3|N|N|1.0|
||4|N|N|-1.2|
|2|1|N+|N|0.0|
||2|N+|N|-2.1|
||3|N+|N|0.0|
||4|N+|N|-.05|



Note: N denotes nominal probe card overdrive and N+ denoted the nominal value plus 20% for the overdrive set up 

In Table 4, the probe yield comparison between Baseline and POP heavy cards is made. Results from wafer 3 suggest that increasing the overdrive setting may improve probe test yield, especially when only 1 pass is made at probe. However, similar to the results in Table 3, the differences are very small. Nevertheless, the results at least confirm the equivalency in probe yield from both standard and POP locations. 

|**Table 4**<br>|**.  Probe Y**<br>**and P**<br>|**ield Compar**<br>**OP Heavy P**<br>|**ison betwee**<br>**robe Cards**<br>|**n Baseline**<br>|
|---|---|---|---|---|
|Wafer<br>ID|# of<br>Passes|Baseline<br>Overdrive|POP<br>Heavy<br>Overdrive|Probe<br>Yield<br>Differenc<br>e(POP<br>Heavy –<br>Baseline)|
|3|1|N|N+|8.6|
||2|N|N+|-0.4|
||3|N|N+|0.2|
||4|N|N+|0.0|
|4|1|N+|N+|-0.3|
||2|N+|N+|1.0|
||3|N+|N+|2.5|
||4|N+|N+|0.2|
|Note: N<br>deno<br>over|denotes no<br>ted the no<br>drive set u|minal probe c<br>minal value pl<br>p|ard overdrive<br>us 20% for th|and N+<br>e|



As mentioned in the Experimental Approach Section, the second objective in comparing probe performance was to ensure no passivation cracking or copper metal damage 

>  _International Microelectronics And Packaging Society  — JMEP, Vol. 3, No.1, 1_<sup>_st_</sup> _Qtr, 2006 (ISSN 1551-4897)_ 

6 

C. Lee, T. Tran, B. Williams, J. Ross 

underneath the POP probe marks. Actual probe mark photographs captured microscopically are shown in Fig. 7. The picture compares probe marks made by the Baseline card on the standard location and the POP Heavy card on the POP location. Here, the larger and darker probe marks created by the POP heavy card with a higher spring force are clearly seen. The probe marks on the standard location are smaller and lighter. The bond pads in the picture underwent four probe passes (i.e. 8 touches). 



**Fig. 7.  Probe Marks Generated by Baseline and POP Heavy Probe Cards** 

Fig. 8 shows the standard and POP locations after the aluminum cap has been etched off in order to inspect for barrier layer damage. No damage could be found at either location. 



**Fig. 8.  Barrier Layer after Al cap Removal** 

For the photograph shown in Fig. 9, the barrier layer was removed to expose the underlying copper and passivation layer. The area of primary interest was the POP location, where no damage to the passivation layer was seen. 



**Fig. 9.  Copper and Passivation Layers after Al cap Removal** 

To further confirm that probing on the POP location did not damage the underlying passivation layer, cross sections of the bond pads were made with a FIB, then inspected via SEM (Scanning Electron Microscopy). The SEM images are presented in Figs. 10 – 12. From Fig. 11, it was clearly seen that both the barrier and passivation layer underneath the POP aluminum cap region had no damage. In Fig. 12, underneath the standard probe location, the barrier layer between aluminum bonding area and copper layer also indicates no damage. However, the deepest part of the probe mark is very close to the top of the barrier layer. This means that any variations in the probe process may cause the barrier layer to be removed, exposing underlying copper.  Therefore, although no damage is seen at the standard probe location, the possibility of having the probe marks scrub through the barrier and copper bond pad is very high. 



**Fig. 10.  FIB Cross Section** Left: POP Location, Right: Standard Location 

>  _International Microelectronics And Packaging Society  — JMEP, Vol. 3, No.1, 1_<sup>_st_</sup> _Qtr, 2006 (ISSN 1551-4897)_ 

7 

Novel Method of Separating Probe and Wire Bond Regions without Increasing Die Size and Reducing Weak Fab-Back End of Line Adhesion Interfaces 



**Fig. 11. Close up of FIB Cross Section at POP location.** 



**Fig. 12. Close up of FIB Cross Section at Standard Location** 

Therefore, the results of visual inspection after etching, and FIB cross-sectioning verified that no mechanical damage was induced in the passivation layer underneath the POP location. 

### **5.2  Wire Bond Yield** 

The data in Table 5 demonstrates that as wire bond ball diameter decreases, the NSOP defect rate increases. This is largely due to the increase in probe mark and disturbed aluminum area to bonded ball diameter area ratio as bond diameter decreases.   Assembling the test vehicle with probing performed on the POP location and leaving the standard location intact for wire bonding a 40µm ball bond diameter resulted in 0% NSOP due to probe mark.  This improvement cannot be achieved by any type of parameter optimization at wire bonding. 

### **5.3  Reliability** 

Scanning Acoustic Microscopy (SAM) analysis before and after MSL3 preconditioning showed no delamination at the interface between the extended aluminum surfaces and the molding compound. Sample SAM images are shown in Fig. 13. 





<!-- Start of picture text -->
(a) Before MSL3 Preconditioning<br><!-- End of picture text -->

**(b) After MSL3 Preconditioning Fig. 13.  SAM Images Before and After MSL3 Preconditioning** Sample Size: 60 packages 

**Table 5. NSOP% Comparison among Devices with** **<u>Different Bonded Ball Diameters</u>** 

|Device Name|BBD (µm)|NSOP Rejects/ Wire<br>Bond Rejects|
|---|---|---|
|Device1|60|41%|
|Device2|50|64%|
|Device 3|35|84%|
|Device with<br>POP|40|0%|



Product qualification data for a device fabricated with POP is summarized in Table 6. The results demonstrated that introduction of the new POP pad did not cause package reliability issues. 

Note: Device 3 is a fine pitch wire bond test vehicle whose sample size is limited to an experimental scale 

>  _International Microelectronics And Packaging Society  — JMEP, Vol. 3, No.1, 1_<sup>_st_</sup> _Qtr, 2006 (ISSN 1551-4897)_ 

8 

C. Lee, T. Tran, B. Williams, J. Ross 

**Table 6.  An example of Product Qualification Results for** 

**Device** **<u>with POP</u>** 

|Stress Description|Testing/<br>Approval<br>Done|Comments|
|---|---|---|
|HTOL Dynamic|<sup>passed</sup><br>168hrs|FITs ≤ 250|
|Static Bake|passed<br>168 hrs|125C Ta; Tmax<br>< materials<br>capability|
|HBM<br>MM|passed<br>2kV<br>HBM and<br>200V<br>MM||
|Latch-up|passed<br>200mA||
|High<br>Temperature<br>Bake|Passed<br>1008 hrs|150C<br>Temperature|
|Temp. Cycling|passed<br>1000<br>cycles|MSL3<br>preconditioning<br>(-65 to 150 C);|
|Autoclave|passed<br>144 hrs|MSL3<br>preconditioning;|
|THB|passed<br>1008 hrs|<sup>85°C/85%RH</sup>|



Note: Sample sizes are defined based on JEDEC and Motorola internal semiconductor product qualification requirements 

Aluminum Pad Lift Failure due to Weak Ta-Cu Interface. During the wire bonding operation on the aluminum capped copper bond pad, a unique failure mode was observed and this failure caused wire bond stoppage and failure during the wire pull test.  As shown in Fig. 14, a closer examination of the failure mode indicated that the aluminum was pulled off the bond pad. This type of failure mode is defined as Aluminum pad lift. 



### **Fig. 14.  SEM Photo of Al-cap Lift Failure Observed During Wire Bond Process** 

Using Auger surface scan, FIB cross sectioning and high magnification of SEM (Scanning Electronic Microscope), the failure interface was later confirmed to be the interface between Ta and Cu layer. As indicated at Fig. 15, the Ta layer interfacing with the copper area of the bond pad was pulled off and exposed the underlying copper pad, while the aluminum above the copper-pad slot was still intact. This discovery confirmed our understanding that the weakest adhesion interface for a copper-interconnect die with standard low k layer (dielectric k value is 2.9 and above) is between Ta and Cu layers. 

With this finding, it is assumed that if there is no Ta-Cu interface area under the aluminum bonding surface, the lifted metal failure incidence would not occur. However, Ta is needed in between copper and aluminum layers as the barrier layer for electro-migration purpose, and thus can not be totally eliminated. There are three approaches to resolving the lifted metal problem.  One approach is to swap the probe region and the wire bond region of the POP bond pad.  Referencing the POP pad in Fig. 4, the first approach would have the wire bond region above the passivation, whereas the probe region on aluminum cap above the copper bond pad.  The approach would completely eliminate the aluminum cap lift failure during wire bonding because there is no Ta-Cu interface under the new wire bond region. However, the maximum electrical current density of aluminum pad could limit this approach to pads that are designed to carry smaller electrical current, because the electrical current has an extra path along the aluminum layer to travel, resulting in the electro-migration concern. Therefore, this work-around can not be used for all devices. Furthermore, probing on aluminum capped copper has caused concern with heavy probing exposing the underlying copper bond pad and posing package reliability risk. The second approach is to minimize the Ta-Cu interface area under the aluminum bonding region.  This approach is 

>  _International Microelectronics And Packaging Society  — JMEP, Vol. 3, No.1, 1_<sup>_st_</sup> _Qtr, 2006 (ISSN 1551-4897)_ 

9 

Novel Method of Separating Probe and Wire Bond Regions without Increasing Die Size and Reducing Weak Fab-Back End of Line Adhesion Interfaces 

the foundation for the Extended Armored Pad (EAP) structure shown in Fig. 5. This bond pad structure reduces the Ta-Cu area underneath the bond pad and allows the ball bonds to be placed on the aluminum vias to eliminate the maximum current density constraint.  Subsequent evaluation of the EAP pads found a significant reduction in the Al metal lift failure. 





<!-- Start of picture text -->
Al<br>Ta<br>Al<br><!-- End of picture text -->

**Fig. 15.  A High Magnification SEM Photo of Fig. 14** 

The third approach is to strengthen the Ta-Cu interfacial adhesion which was achieved by modifying specific Fab processing steps.  This process modification will not be discussed in this paper.  Combining the last two approaches (i.e. reducing the Ta-Cu interface underneath the aluminum pad and strengthening the Ta-Cu interface) has provided us a much more robust bond pad for wire bonding.  It is worth noting that  even though the Ta-Cu interfacial adhesion could be strengthened, this particular Ta-Cu interface is still considered to be the weakest adhesive location for a copperinterconnect die assuming that the standard low k material is used (i.e. k value is 2.9 and above). 

### **6. CONCLUSIONS AND FUTURE WORKS** 

The interaction between probing and wire bonding processes has been reported as the major obstacle in fine pitch wire bonding [4]. The traditional way to minimize the probe damage on the bond pad usually requires either to offset the probe mark which can not totally eliminate the probe damage 

[5 and 6], or to lengthen the last metal which can increase the die size.  The Probe Over Passivation (POP) structure enables a long bond pad with separate probe and wire bond regions without incurring any additional cost or increase in die size. By separating the probe and wire bond regions, a clean pad is available for bonding. The POP structure helped eliminate any interaction between probe and wire bonding processes. 

Probe evaluations demonstrated equivalent electrical test yield between probing over the standard location and probing on passivation. Mechanically, acid etching and FIB results confirmed no cracking in the passivation layer under the aluminum cap, even after four passes of double-touch probe at a heavy overdrive setting. Further probe evaluations can be conducted to further take advantage of the separate probe region on passivation and to further improve probe process robustness.  Some evaluations may include large probe needle, higher spring force and higher probe overdrive setting, without the concern of punching through the aluminum cap and exposing copper. 

Wire bond yield data indicated that when the bonded ball diameter was 35 µ m, the ratio of Non-Stick-on-Pad (NSOP) due to probe mark could be as high as 84% of the total wire bond rejects on conventional bond pads.  POP bond pads produced 0% NSOP due to probe mark.  This improvement could not be achieved by any type of parameter optimization at wire bonding.  Moisture characterization of packages designed with POP pads eradicated any concerns of poor adhesion between the aluminum cap and the mold compound. 

The Extended Armored Pad (EAP) structure reduces the TaCu interface – the weakest interface in the copper interconnect die - underneath the aluminum and significantly reduces the incidences of the aluminum pad lift failure during the wire bonding operation.  To date, Freescale product portfolio with POP and EAP designs has extended its product offerings with fine pitch applications (50 µ m pitch and below) to various industrial markets including automotive markets. Implementing POP/ EAP makes it possible to pursuit further fine pitch wire bonding technology, e.g. 35 and 26 µ m. 

### **Acknowledgments** 

The authors would like to thank the following people for their support in their respective expert areas: Al Maus for POP pad design, Soosan Yong for handling assembly requirements, Chuck Miller for chemical etching, and Fonzell Martin, Marcus Fletcher, Paul Wineberger, Jim Peterson and Stenly Tukunang for wafer fab processing, and Jeff Blackwell for new product introduction activities. 

>  _International Microelectronics And Packaging Society  — JMEP, Vol. 3, No.1, 1_<sup>_st_</sup> _Qtr, 2006 (ISSN 1551-4897)_ 

10 

C. Lee, T. Tran, B. Williams, J. Ross 

### **References** 

- [1] T. Tran, L. Yong, B. Williams, S. Chen and A. Chen “Fine Pitch Probing and Wirebonding and Reliability of Aluminum Capped Copper Bond Pads”, Proceedings for 50<sup>th</sup> Electronic Components and Technology Conference, Las Vegas, Nevada, May 21-24, 2000. 

- [2] T. Tran, L. Yong, B. Williams, S. Chen and A. Chen “Fine Pitch Probing and Wirebonding and Reliability of Aluminum Capped Copper Bond Pads”, Proceedings for 2000 International Conference on High-Density Interconnect and Systems Packaging, IMAPS/ CMP, Denver, Colorado, April 26-28, 2000, pp. 390-395. 

- [3] L. Mercado, R. Radke, M. Ruston, T. Tran, B. Williams, L. Yong, A. Chen and S. Chen, “Fine Pitch Probing and Wirebonding and Reliability of Multi Layer Copper Interconnect Structures”, Proc 33<sup>rd</sup> International Symposium on Microelectronics, IMAPS, Boston, MA, September 2000, pp. 727-732. 

- [4] G. Hotchkiss, G Ryan, Willmar Subido, Ruben Rolda and Lani Guimbaolibot, “Effects of Probe Damage on Wire Bond Integrity” 2001. Proceedings., 51<sup>st</sup> 29 May-1 June 2001, pp.1175 - 1180 

- [5] G. Hotchkiss, Jason Aronoff, Jerry Broz, Cheryl Hartfield, Randy James, Less Stark, Willmar Subido, Vish Sundararaman and Howard Test, “Probing and Wire Bonding of Aluminum Capped Copper Pads”, Reliability Physics Symposium Proceedings, 2002. 40th Annual 7-11 April 2002 Page(s):140 – 143 

- [6] T. Tran, L. Yong and R. Radke, “Effects of Probing on Aluminum Capped Bond Pads”, Presentation at IEEE Southwest Test Workshop (SWTW), San Diego, California, June 11-14, 2000. 

 _International Microelectronics And Packaging Society  — JMEP, Vol. 3, No.1, 1_<sup>_st_</sup> _Qtr, 2006 (ISSN 1551-4897)_ 

11 

