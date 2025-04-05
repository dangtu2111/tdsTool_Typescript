import requests
import json

# Các biến cần thay đổi
POST_URL = "https://www.facebook.com/4282601421967352"  # URL bài viết mới
FEEDBACK_ID = "ZmVlZGJhY2s6MjcxMTIwNzQ2NTc0NzM5OA=="  # Feedback ID của bài viết mới
REACTION_ID = "1635855486666999"  # ID của reaction "LIKE" (thả tim)
USER_ID = "100011679788503"  # ID người dùng của bạn
SESSION_ID = "5f4320e1-5d67-41c9-9ca0-9dc17dff0c00"  # ID phiên, có thể giữ nguyên hoặc tạo mới
FB_DTSG = "NAcNpjW3BNevWXICy9DKgMPbffrv0PYSwr8-xpp7zN4uRxg_jC4MICg:45:1743763120"  # Token fb_dtsg từ cookie hoặc trang

# Định nghĩa URL
url = "https://www.facebook.com/api/graphql/"

# Định nghĩa headers
headers = {
    "accept": "*/*",
    "accept-language": "vi,en-US;q=0.9,en;q=0.8",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://www.facebook.com",
    "priority": "u=1, i",
    "referer": POST_URL,  # Sử dụng biến
    "sec-ch-prefers-color-scheme": "light",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-full-version-list": "\"Google Chrome\";v=\"135.0.7049.41\", \"Not-A.Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"135.0.7049.41\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-model": "\"\"",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-ch-ua-platform-version": "\"19.0.0\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "x-asbd-id": "359341",
    "x-fb-friendly-name": "CometUFIFeedbackReactMutation",
    "x-fb-lsd": "LqBXHUPNplDqKNk2igqM22",
}

# Định nghĩa cookies
cookies = {'fr': '0OAzd5RpbZiAgGcQC.AWc4cYK7zl32Ve39gNuJmajTE7YMYyPN8cfARUbdMnwC_H5wslM.Bn77aj..AAA.0.0.Bn77az.AWf_yr0OFXqeguM-o5Mek0lNw6o', 'xs': '45%3A9CNy0FUWZj5VoQ%3A2%3A1743763120%3A-1%3A6187', 'c_user': '100011679788503', 'dpr': '1.25', 'presence': 'C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1743763126805%2C%22v%22%3A1%7D', 'wd': '1036x651', 'sb': 'o7bvZwRMEVPGl0QNbpm8qPcv', 'datr': 'o7bvZ5raV2vKhpv2Udm7glI4'}

# Định nghĩa dữ liệu (data-raw)
data = {
    "av": USER_ID,  # Sử dụng biến
    "__user": USER_ID,  # Sử dụng biến
    "__a": "1",
    "__req": "2g",
    "__hs": "20182.HYP:comet_pkg.2.1...0",
    "dpr": "1",
    "__ccg": "EXCELLENT",
    "__rev": "1021573499",
    "__s": "jtncly:k7tgvp:numy3x",
    "__hsi": "7489376075118519367",
    "__comet_req": "15",
    "fb_dtsg": FB_DTSG,  # Sử dụng biến
    "jazoest": "25206",
    "lsd": "LqBXHUPNplDqKNk2igqM22",
    "__spin_r": "1021573499",
    "__spin_b": "trunk",
    "__spin_t": "1743756252",
    "fb_api_caller_class": "RelayModern",
    "fb_api_req_friendly_name": "CometUFIFeedbackReactMutation",
    "variables": json.dumps({
        "input": {
            "attribution_id_v2": "CometPostRoot.react,comet.post,via_cold_start,1743756253875,921518,,,",
            "feedback_id": FEEDBACK_ID,  # Sử dụng biến
            "feedback_reaction_id": REACTION_ID,  # Sử dụng biến
            "feedback_source": "POST",
            "is_tracking_encrypted": True,
            "tracking": [],
            "session_id": SESSION_ID,  # Sử dụng biến
            "actor_id": USER_ID,  # Sử dụng biến
            "client_mutation_id": "4"
        },
        "useDefaultActor": False,
        "__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider": False
    }),
    "server_timestamps": "true",
    "doc_id": "9232085126871383",
}

# Gửi yêu cầu POST
try:
    response = requests.post(url, headers=headers, cookies=cookies, data=data)
    
    # In mã trạng thái
    print(f"Mã trạng thái: {response.status_code}")
    print("Nội dung phản hồi (text):")
    # print(response.text)

    # Xử lý phản hồi
    json_data_str = response.text
    try:
        if json_data_str.startswith("for (;;);"):
            json_data_str = json_data_str[len("for (;;);"):]
        
        json_data = json.loads(json_data_str)
        print("Phản hồi JSON:")
        print(json.dumps(json_data, indent=2))

        # Kiểm tra kết quả
        if "data" in json_data and "feedback_react" in json_data["data"]:
            feedback = json_data["data"]["feedback_react"]["feedback"]
            reaction_id = feedback.get("viewer_feedback_reaction_info", {}).get("id")
            if reaction_id == REACTION_ID:
                print("Thành công! Đã thả tim bài viết.")
            else:
                print(f"Cảnh báo: Reaction hiện tại ({reaction_id}) không khớp với yêu cầu ({REACTION_ID}).")
        elif "error" in json_data:
            print(f"Lỗi từ server: {json_data.get('errorSummary')} - {json_data.get('errorDescription')}")
        else:
            print("Phản hồi không chứa dữ liệu mong đợi")

    except json.JSONDecodeError as e:
        print(f"Không thể phân tích JSON: {e}")
        print(f"Chuỗi gây lỗi (200 ký tự đầu tiên): {json_data_str[:200]}")

except requests.exceptions.RequestException as e:
    print(f"Lỗi khi gửi yêu cầu: {e}")