import axios from 'axios';

export async function sendFacebookRequest() {
    const url = 'https://www.facebook.com/api/graphql/';
    const headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8,ja;q=0.7',
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'Content-Encoding': 'zstd',
        'Content-Length': '1740',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'dpr=1.25; datr=Z_YTZhR_A7Bc_1ex6td1C3RJ; sb=evYTZuBLk4Sd6yfiErnpevaG; ps_n=0; ps_l=0; locale=vi_VN; c_user=100089902717451; xs=40%3AdVKGfYGwyWqKHw%3A2%3A1713321671%3A-1%3A7632%3A%3AAcWvBlMEOPMdr1-T-cUjA45LVnebb_qp-DiLIP9OUA; fr=1w20HD5TIVEYRuWhv.AWX643-SQgmYpwvElnZSdiWwUFI.BmH3lV..AAA.0.0.BmH3lV.AWVlxoaIW4A; usida=eyJ2ZXIiOjEsImlkIjoiQXNjMnNxZzE0aHl1MXYiLCJ0aW1lIjoxNzEzMzM4ODcyfQ%3D%3D; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1713339002515%2C%22v%22%3A1%7D; wd=982x730',
        'Dpr': '1.25',
        'Origin': 'https://www.facebook.com',
        'Referer': 'https://www.facebook.com/photo/?fbid=1597151631061616&set=a.108339076609553',
        'Sec-Ch-Prefers-Color-Scheme': 'light',
        'Sec-Ch-Ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        'Sec-Ch-Ua-Full-Version-List': '"Google Chrome";v="123.0.6312.123", "Not:A-Brand";v="8.0.0.0", "Chromium";v="123.0.6312.123"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Model': '""',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Ch-Ua-Platform-Version': '"15.0.0"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'X-Asbd-Id': '129477',
        'X-Fb-Friendly-Name': 'CometUFIFeedbackReactMutation',
        'X-Fb-Lsd': 'p3GAlRXf-4n_BLXCxoeA0X',
        // Add any additional headers as needed
    };

    const data = {
        av: '100089902717451',
        __aaid: '0',
        __user: '100089902717451',
        __a: '1',
        __req: '1c',
        __hs: '19830.HYP:comet_pkg.2.1..2.1',
        dpr: '1.5',
        __ccg: 'GOOD',
        __rev: '1012839731',
        __s: ':wz0l9b:7dbeq8',
        __hsi: '7358734942767042136',
        __dyn: '7AzHK4HwkEng5K8G6EjBAg2owIxu13wFwnQdwSwAyUco2qwJyE24wJwpUe8hwaG0Z82_CxS320om78c87m221Fwgo9oO0-E4a3a4oaEnxO0Bo7O2l2Utwwwi831wiE561lwlE-U2exi4UaEW2G1jxS6FobrwKxm5oe8464-5pUfEe88o4Wm7-2K0-poarCwLyES0Io88cA0z8c84q58jyUaUcojxK2B08-269wkopg6C13whEeE4WVU-4EdouwjUy',
        __csr: 'glMngzOigzdeIJN12Rk9IqKgWRZjhtiHehtEAIH4vmL8B99R8AKObbLKqQ8AGiGZey4Amh-ibCWB-9-iaWCGurjhUKrGvy5gPFe8HHUGQGmAq9Lh9FHy9aLqDzqFGbzpo9rzEC6oiyVoK8UG14G4EKbyHAx-8zFEy49ogyES7Uaeu266olz8jwLwIwJAwdC9wr8qwm98-3qawq8460YU23g5u7osw5Kw9m1sAwSw5xw5Kw5fw6zg0US088KmEbE056t0bha00ZHpE1y4Ejw2GElF3k098w1dqp0Iw1uC6oO0iO1Bw0hLU1fE6W0WpU0_J0102018QwkUzu0hp1m2O0Eo3vz8gw3FE0Ai02dO',
        __comet_req: '15',
        fb_dtsg: 'NAcPLA-jQ9_h_PHXngiUD358nedD4JeXFE8PXeiuhoAHQSBw9mihWeA:40:1713321671',
        jazoest: '25354',
        lsd: 'p3GAlRXf-4n_BLXCxoeA0X',
        __spin_r: '1012839731',
        __spin_b: 'trunk',
        __spin_t: '1713338993',
        fb_api_caller_class: 'RelayModern',
        fb_api_req_friendly_name: 'LSPlatformGraphQLLightspeedRequestQuery',
        variables: JSON.stringify({
            deviceId: 'fca5f86a-ca83-4b98-8d0c-f6613c633fda',
            requestId: 44,
            requestPayload: '{"database":141,"epoch_id":7186268389463677779,"failure_count":null,"last_applied_cursor":"dummy_cursor","sync_params":"{\"locale\":\"vi_VN\"}","version":7511418012230245}',
            requestType: 2
        }),
        server_timestamps: true,
        doc_id: '9944623912245126'
    };
    try {
        const response = await axios.post(url, data, { headers });
        console.log('Response:', response);
    } catch (error) {
        console.error('Error:', error);
    }
}


