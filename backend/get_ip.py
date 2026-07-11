import socket

def get_local_ips():
    print("\n" + "="*50)
    print("          THINKLINK NETWORK DIAGNOSER")
    print("="*50)
    
    hostname = socket.gethostname()
    try:
        # Get all IPs associated with hostname
        ips = socket.gethostbyname_ex(hostname)[2]
    except Exception as e:
        ips = []
        
    print(f"PC Hostname: {hostname}")
    print("\nDetected PC network IP addresses:")
    
    recommended_ip = None
    for ip in ips:
        if ip.startswith("127."):
            continue
        # Typical private subnet ranges
        is_probable = ip.startswith("192.168.") or ip.startswith("10.") or (ip.startswith("172.") and (16 <= int(ip.split(".")[1]) <= 31))
        
        tag = ""
        if is_probable:
            # Skip common virtualization subnets
            if not ip.startswith("192.168.56.") and not ip.startswith("172.17.") and not ip.startswith("172.20."):
                tag = "  <-- RECOMMENDED (Local Wi-Fi/Ethernet)"
                if not recommended_ip:
                    recommended_ip = ip
            else:
                tag = "  (WSL / Virtualization Adapter)"
                
        print(f"  - {ip}{tag}")
        
    print("="*50)
    if recommended_ip:
        print(f"-> In your mobile app settings, set the API Base URL to:")
        print(f"   http://{recommended_ip}:8000")
        print(f"\n-> Set the Socket.IO Server URL to:")
        print(f"   http://{recommended_ip}:3000")
    else:
        # Fallback using UDP socket connection to find public route
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(("8.8.8.8", 80))
            alt_ip = s.getsockname()[0]
            s.close()
            print(f"-> Recommended Connection URL:")
            print(f"   http://{alt_ip}:8000")
        except Exception:
            print("Could not automatically locate your local Wi-Fi IP.")
            print("Please run 'ipconfig' and look for your active Wi-Fi IPv4 address.")
    print("="*50 + "\n")

if __name__ == "__main__":
    get_local_ips()
