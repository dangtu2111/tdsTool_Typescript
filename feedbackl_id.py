import requests
import json
import re

# Các biến cần thay đổi
NODE_ID = "1228396462185468"  # ID của ảnh hoặc bài viết
MEDIASET_TOKEN = "pcb.1228396702185444"  # Token của mediaset
POST_URL = "https://www.facebook.com/4282601421967352"  # URL bài viết mới
FEEDBACK_ID = "ZmVlZGJhY2s6NDI4MjYwMTQyMTk2NzM1Mg=="  # Feedback ID của bài viết mới
REACTION_ID = "1635855486666999"  # ID của reaction "LIKE" (thả tim)
USER_ID = "100011679788503"  # ID người dùng của bạn
SESSION_ID = "5f4320e1-5d67-41c9-9ca0-9dc17dff0c00"  # ID phiên, có thể giữ nguyên hoặc tạo mới
FB_DTSG = "NAcNpjW3BNevWXICy9DKgMPbffrv0PYSwr8-xpp7zN4uRxg_jC4MICg:45:1743763120" 
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
    "x-fb-friendly-name": "CometPhotoRootContentQuery",
    "x-fb-lsd": "xj_4IhCFe1PEYKNQfIPpgk",
}

# Định nghĩa cookies
cookies = {
    "sb": "WgZ-ZzGb48Pf3waGUwhVcr0r",
    "datr": "WgZ-ZwQzQ1RuMq1j86kMrmaH",
    "ps_l": "1",
    "ps_n": "1",
    "c_user": USER_ID,  # Sử dụng biến
    "b_user": "61560505044637",
    "ar_debug": "1",
    "dpr": "1.375",
    "xs": "25:T21t-KmIBIuGQQ:2:1738807458:-1:6187:8Znbzf5IqLgHJw:AcVEokRJOd322moOR_Q_viJgl1rMcVOJ-Zsj0A2a55dg",
    "fr": "1smn37hCBUO9bnYZN.AWdDcxecZbhhlG_y_MHNGd7Iwlu_XoXSjIEY55xc0pkRJwpI4pw.Bn75dy..AAA.0.0.Bn76NX.AWfrm6ONxY2WTMSQVJyJ0yf8nEU",
    "wd": "602x632",
    "presence": "C%7B%22t3%22%3A%5B%7B%22o%22%3A0%2C%22i%22%3A%22sc.9130267307067017%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100018217415005%22%7D%5D%2C%22utc3%22%3A1743758333926%2C%22v%22%3A1%7D",
}

# Định nghĩa dữ liệu (data-raw)
data = {
    "av": USER_ID,  # Sử dụng biến
    "__aaid": "0",
    "__user": USER_ID,  # Sử dụng biến
    "__a": "1",
    "__req": "9",
    "__hs": "20182.HYP:comet_pkg.2.1...0",
    "dpr": "1",
    "__ccg": "EXCELLENT",
    "__rev": "1021573499",
    "__s": "l8pry0:k7tgvp:r7cljt",
    "__hsi": "7489385816006465931",
    "__comet_req": "15",
    "fb_dtsg": FB_DTSG,  # Sử dụng biến
    "jazoest": "25174",
    "lsd": "xj_4IhCFe1PEYKNQfIPpgk",
    "__spin_r": "1021573499",
    "__spin_b": "trunk",
    "__spin_t": "1743758520",
    "fb_api_caller_class": "RelayModern",
    "fb_api_req_friendly_name": "CometPhotoRootContentQuery",
    "variables": json.dumps({
        "isMediaset": True,
        "renderLocation": "comet_media_viewer",
        "scale": 1,
        "feedLocation": "COMET_MEDIA_VIEWER",
        "feedbackSource": 65,
        "focusCommentID": None,
        "glbFileURIHackToRenderAs3D_DO_NOT_USE": None,
        "privacySelectorRenderLocation": "COMET_MEDIA_VIEWER",
        "useDefaultActor": False,
        "shouldShowComments": True,
        "__relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider": False,
        "__relay_internal__pv__CometUFIShareActionMigrationrelayprovider": True,
        "__relay_internal__pv__IsWorkUserrelayprovider": False,
        "__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider": False,
        "__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider": False
    }),
    "server_timestamps": "true",
    "doc_id": "9194323264011535",
}

# Gửi yêu cầu POST để lấy feedback_id
try:
    response = requests.post(url, headers=headers, cookies=cookies, data=data)
    print(f"Mã trạng thái: {response.status_code}")

    json_data_str = response.text
    if json_data_str.startswith("for (;;);"):
        json_data_str = json_data_str[len("for (;;);"):]

    # Tìm feedback_id bằng regex
    feedback_id_match = re.search(r'"feedback_id":"(.*?)"', json_data_str)
    if feedback_id_match:
        feedback_id = feedback_id_match.group(1)
        print(f"Feedback ID: {feedback_id}")

        # Thả tim bằng CometUFIFeedbackReactMutation
        react_headers = headers.copy()
        react_headers["x-fb-friendly-name"] = "CometUFIFeedbackReactMutation"

        react_data = {
            "av": USER_ID,
            "__user": USER_ID,
            "__a": "1",
            "__req": "2g",
            "__hs": "20182.HYP:comet_pkg.2.1...0",
            "dpr": "1",
            "__ccg": "EXCELLENT",
            "__rev": "1021573499",
            "__s": "jtncly:k7tgvp:numy3x",
            "__hsi": "7489376075118519367",
            "__comet_req": "15",
            "fb_dtsg": FB_DTSG,
            "jazoest": "25206",
            "lsd": "xj_4IhCFe1PEYKNQfIPpgk",
            "__spin_r": "1021573499",
            "__spin_b": "trunk",
            "__spin_t": "1743758520",
            "fb_api_caller_class": "RelayModern",
            "fb_api_req_friendly_name": "CometUFIFeedbackReactMutation",
            "variables": json.dumps({
                "input": {
                    "attribution_id_v2": "CometPhotoRoot.react,comet.mediaviewer.photo,via_cold_start,1743756253875,921518,,,",
                    "feedback_id": feedback_id,  # Sử dụng feedback_id vừa lấy
                    "feedback_reaction_id": "1635855486666999",  # LIKE
                    "feedback_source": "MEDIA_VIEWER",
                    "is_tracking_encrypted": True,
                    "tracking": [],
                    "session_id": SESSION_ID,
                    "actor_id": USER_ID,
                    "client_mutation_id": "4"
                },
                "useDefaultActor": False,
                "__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider": False
            }),
            "server_timestamps": "true",
            "doc_id": "9232085126871383",
        }

        # Gửi yêu cầu thả tim
        react_response = requests.post(url, headers=react_headers, cookies=cookies, data=react_data)
        print(f"Mã trạng thái (reaction): {react_response.status_code}")

        react_json_str = react_response.text
        if react_json_str.startswith("for (;;);"):
            react_json_str = react_json_str[len("for (;;);"):]
        
        try:
            react_json = json.loads(react_json_str)
            if "data" in react_json and "feedback_react" in react_json["data"]:
                print("Thành công! Đã thả tim bài viết.")
            elif "error" in react_json:
                print(f"Lỗi khi thả tim: {react_json.get('errorSummary')} - {react_json.get('errorDescription')}")
            else:
                print("Phản hồi không chứa dữ liệu mong đợi")
        except json.JSONDecodeError as e:
            print(f"Không thể phân tích JSON (reaction): {e}")
    else:
        print("Không tìm thấy feedback_id trong chuỗi")
        print(f"Chuỗi kiểm tra (200 ký tự đầu tiên): {json_data_str[:200]}")

except requests.exceptions.RequestException as e:
    print(f"Lỗi khi gửi yêu cầu: {e}")