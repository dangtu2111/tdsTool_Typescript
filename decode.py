import requests

proxies_list = [
    "113.22.136.42:12043",
    "117.7.138.244:12004",
    "171.252.205.110:12001",
    "113.22.136.42:12021",
    "171.252.205.110:12003",
]

def test_socks_proxy(proxy):
    proxies = {
        "http": f"socks5h://{proxy}",
        "https": f"socks5h://{proxy}",
    }
    try:
        response = requests.get("https://httpbin.org/ip", proxies=proxies, timeout=10)
        print(f"[✓] Proxy {proxy} hoạt động. IP: {response.json()['origin']}")
    except Exception as e:
        print(f"[✗] Proxy {proxy} lỗi. Lý do: {e}")

for proxy in proxies_list:
    test_socks_proxy(proxy)
