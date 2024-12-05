
import delay from 'delay';
import { api_get_money } from '../api/facebook-api'
import { token } from '../constants';
export async function clickButton(page: any, button: any, buttonDefault: any): Promise<string | undefined>  {
    try {
        const buttonActive = await page.waitForSelector(button, { visible: true });
        console.log(button);
        if (buttonActive) {
            await buttonActive.click();
            console.log("click thành công ");
            await delay(1000);
            return 'Đã hoàn thành';
        }
        return 'Hết  button';
    } catch (error) {
        if(buttonDefault!=''){
            await delay(1000);
            return await clickButton(page,buttonDefault,'');
        }
        console.error("Đã xảy ra lỗi:", error);
        return 'Đã xảy ra lỗi';
    }
}
export async function clickButton1(
    page: any, 
    button: string[], 
    buttonDefault: number
): Promise<string> {
    try {
        const buttonSelector = button[buttonDefault];
        const buttonActive = await page.$$(buttonSelector);
        
        if (buttonActive.length > 0) {
            console.log(`Tìm thấy nút: ${buttonSelector}, đang xử lý...`);
            await new Promise(resolve => setTimeout(resolve, 1000));

            for (const [index, btn] of buttonActive.entries()) {
                await page.evaluate((el: { scrollIntoView: (arg0: { behavior: string; block: string; }) => void; }) => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, btn);
                await new Promise(resolve => setTimeout(resolve, 1500));

                const isVisible = await page.evaluate((el: { getBoundingClientRect: () => DOMRect; }) => {
                    const rect = el.getBoundingClientRect();
                    return rect.top >= 0 && 
                           rect.left >= 0 && 
                           rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
                           rect.right <= (window.innerWidth || document.documentElement.clientWidth);
                }, btn);

                const isClickable = await page.evaluate((el: HTMLElement) => {
                    const style = getComputedStyle(el);
                    const isDisabled = 'disabled' in el && (el as HTMLButtonElement).disabled;
                    return !isDisabled &&
                           style.pointerEvents !== 'none' &&
                           style.visibility !== 'hidden' &&
                           parseFloat(style.opacity) > 0;
                }, btn);
                
                

                console.log(`Nút ${index + 1} - isVisible: ${isVisible}, isClickable: ${isClickable}`);
                
                if (isVisible && isClickable) {
                    try {
                        console.log(`Click vào nút ${index + 1}`);
                        await btn.click();
                        await new Promise(resolve => setTimeout(resolve, 500));
                    } catch (clickError) {
                        console.error(`Lỗi khi click vào nút ${index + 1}:`, clickError);
                    }
                } else {
                    console.log(`Nút ${index + 1} không hiển thị hoặc không khả dụng.`);
                }
            }

            console.log("Click hoàn thành!");
            return 'Đã hoàn thành';
        } else {
            console.log(`Không tìm thấy nút: ${buttonSelector}`);
        }

        if (buttonDefault < button.length - 1) {
            return await clickButton1(page, button, buttonDefault + 1);
        }

        console.log("Không có nút nào phù hợp.");
        return 'Không phù hợp';
    } catch (error) {
        console.error("Lỗi khi xử lý nút:", error);
        if (buttonDefault < button.length - 1) {
            return await clickButton1(page, button, buttonDefault + 1);
        }
        return 'Đã xảy ra lỗi';
    }
}
export async function clickButtonUrl(
    page: any, 
): Promise<string> {
    try {
        const link = page.url();
        const regex = /^https:\/\/www\.facebook\.com\/([a-zA-Z0-9.]+)\/posts\/([a-zA-Z0-9]+)$/;
        const match = link.match(regex);

        // Biểu thức chính quy để kiểm tra URL video trên Facebook
        const regex1 = /^https:\/\/www\.facebook\.com\/watch\/\?v=\d+$/;
        const regex2 = /^https:\/\/www\.facebook\.com\/photo\/\?fbid=\d+&set=a\.\d+$/;

        if (match) {
            const buttonSelector =".x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label='Thích']";
            const buttonActive = await page.$$(buttonSelector);
            await buttonActive[1].click();
            console.log("CLick thành công.")
            return "Click thành công ";

        } else if  (link.match(regex1)){
            const buttonSelector =".x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label='Thích']";
            const buttonActive = await page.$$(buttonSelector);
            await buttonActive[0].click();
            console.log("CLick thành công.")
            return "Click thành công ";
        }else if(link.match(regex2)){
            const buttonSelector =".x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label='Thích']";
            const buttonActive = await page.$$(buttonSelector);
            await buttonActive[0].click();
            console.log("CLick thành công.")
            return "Click thành công ";
        }else{
            console.log("URL không hợp lệ");
        }
        console.log("Không có nút nào phù hợp.");
        return 'Không phù hợp';
    } catch (error) {
        console.error("Lỗi khi xử lý nút:", error);
        
        return 'Đã xảy ra lỗi';
    }
}
export async function clickButtonUrl_Follow(
    page: any, 
): Promise<string> {
    try {
        const link = page.url();
        const regex = /^https:\/\/www\.facebook\.com\/([a-zA-Z0-9.]+)\/posts\/([a-zA-Z0-9]+)$/;
        const match = link.match(regex);

        // Biểu thức chính quy để kiểm tra URL video trên Facebook
        const regex1 = /^https:\/\/www\.facebook\.com\/watch\/\?v=\d+$/;
        const regex2 = /^https:\/\/www\.facebook\.com\/photo\/\?fbid=\d+&set=a\.\d+$/;

        if (match) {
            const buttonSelector =".x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label='Thích']";
            const buttonActive = await page.$$(buttonSelector);
            await buttonActive[1].click();
            console.log("CLick thành công.")
            return "Click thành công ";

        } else if  (link.match(regex1)){
            const buttonSelector =".x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label='Thích']";
            const buttonActive = await page.$$(buttonSelector);
            await buttonActive[0].click();
            console.log("CLick thành công.")
            return "Click thành công ";
        }else if(link.match(regex2)){
            const buttonSelector =".x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label='Thích']";
            const buttonActive = await page.$$(buttonSelector);
            await buttonActive[0].click();
            console.log("CLick thành công.")
            return "Click thành công ";
        }else{
            console.log("URL không hợp lệ");
        }
        console.log("Không có nút nào phù hợp.");
        return 'Không phù hợp';
    } catch (error) {
        console.error("Lỗi khi xử lý nút:", error);
        
        return 'Đã xảy ra lỗi';
    }
}

export async function follow(page: any,input: any,account:any) {
    console.log('Da vao follow');
    delay(5000);
    for (const j of input) {

        await page.goto(`https://www.facebook.com/${j.id}`);
        console.log(`https://www.facebook.com/${j.id}`);
        
        const button1: string[] =[
                '.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Theo dõi"]',
                '.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xk50ysn.xzsf02u.x1yc453h',
                'x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Thêm bạn bè"]'
        ]

        try {
            await delay(5000);
            console.log(await clickButton1(page,button1,0));
            const money =await api_get_money('FOLLOW',j.id,account.TDS_token);
            // In dữ liệu trả về từ hàm api_get_money
            console.log('Dữ liệu trả về:', JSON.stringify(money));
        }catch (error) {
            console.error("Đã xảy ra lỗi1:", error);
            continue; // Bỏ qua lần lặp hiện tại nếu có lỗi
        } 
        await delay(1000);
    }
}
export async function like(page: any,input: any,account:any) {
    for (const j of input) {
        await page.goto(`https://www.facebook.com/${j.id}`);
        console.log(`https://www.facebook.com/${j.id}`);
        // Wait for 5 seconds
        
         const button1: string[] =[
            '.x1i10hfl.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.xzolkzo.x12go9s9.x1rnf11y.xprq8jg.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1[aria-label="Thích"]',
            '.xq8finb.x16n37ib .x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label="Thích"]',
            '.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label="Thích"]',
            '.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.xzolkzo.x12go9s9.x1rnf11y.xprq8jg.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1[aria-label="Thích"]',
            '.x1n2onr6.xh8yej3 .x1i10hfl.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x78zum5.x1iyjqo2.x2lah0s.xl56j7k.x5ve5x3[aria-label="Thích"]',
        ]
        const buttonDefault1=0;
        try {
            await new Promise(resolve => {
                setTimeout(resolve, 1000);
              });
            console.log(await clickButtonUrl(page));
            await new Promise(resolve => {
                setTimeout(resolve, 2000);
              });
            const money =await api_get_money('LIKE',j.id,account.TDS_token);
            // In dữ liệu trả về từ hàm api_get_money
            console.log('Dữ liệu trả về:', JSON.stringify(money));
            
        }catch (error) {
            console.error("Đã xảy ra lỗi2:", error);
             // Bỏ qua lần lặp hiện tại nếu có lỗi
            continue; // Bỏ qua lần lặp hiện tại nếu có lỗi

        }
        await delay(1000);
    }
}

export async function likegiare(page: any,input: any) { 
    for (const j of input) {
        await page.goto(`https://www.facebook.com/${j.id}`);
        console.log(`https://www.facebook.com/${j.id}`);
        // Wait for 5 seconds
        await delay(1000);
        try {
            const button = await page.waitForSelector('.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.x10b6aqq.x1yrsyyn');
            if(button){
                    await button.click();
                    console.log("click thành công ");
                    
            }else{
                const button = await page.waitForSelector('.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x14yjl9h.xudhj91.x18nykt9.xww2gxu.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1');
                if(button){
                    await button.click();
                    console.log("click thành công ");
                }
            }
            const money =await api_get_money('LIKE',j.id,token.TDS_token);
            // In dữ liệu trả về từ hàm api_get_money
            console.log('Dữ liệu trả về:', JSON.stringify(money));
        }catch (error) {
            console.error("3:", error);
            continue; // Bỏ qua lần lặp hiện tại nếu có lỗi
        } 
        await delay(1000);
    }
}
export async function reaction(page: any,input: any) {
    for (const j of input) {
        await page.goto(`https://www.facebook.com/${j.id}`);
        console.log(`https://www.facebook.com/${j.id}`);
        // Wait for 5 seconds
        await delay(1000);
        try {
            const button = await page.waitForSelector('.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.x10b6aqq.x1yrsyyn');
            if(button){
                    await button.click();
                    console.log("click thành công ");
                    
            }else{
                const button = await page.waitForSelector('.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x14yjl9h.xudhj91.x18nykt9.xww2gxu.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1');
                if(button){
                    await button.click();
                    console.log("click thành công ");
                }
            }
            const money =await api_get_money('LIKE',j.id,token.TDS_token);
            // In dữ liệu trả về từ hàm api_get_money
            console.log('Dữ liệu trả về:', JSON.stringify(money));
        }catch (error) {
            console.error("Đã xảy ra lỗi:", error);
            continue; // Bỏ qua lần lặp hiện tại nếu có lỗi
        } 
        await delay(1000);
    }
}
export async function comment(page: any,input: any) {
    for (const j of input) {
        await page.goto(`https://www.facebook.com/${j.id}`);
        console.log(`https://www.facebook.com/${j.id}`);
        // Wait for 5 seconds
        await delay(1000);
        try {
            const button = await page.waitForSelector('.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.x10b6aqq.x1yrsyyn');
            if(button){
                    await button.click();
                    console.log("click thành công ");
                    
            }else{
                const button = await page.waitForSelector('.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x14yjl9h.xudhj91.x18nykt9.xww2gxu.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1');
                if(button){
                    await button.click();
                    console.log("click thành công ");
                }
            }
            const money =await api_get_money('LIKE',j.id,token.TDS_token);
            // In dữ liệu trả về từ hàm api_get_money
            console.log('Dữ liệu trả về:', JSON.stringify(money));
        }catch (error) {
            console.error("Đã xảy ra lỗi:", error);
            continue; // Bỏ qua lần lặp hiện tại nếu có lỗi
        } 
        await delay(1000);
    }
}
export async function share(page: any,input: any) {
    for (const j of input) {
        await page.goto(`https://www.facebook.com/${j.id}`);
        console.log(`https://www.facebook.com/${j.id}`);
        // Wait for 5 seconds
        await delay(1000);
        try {
            const button = await page.waitForSelector('.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.x10b6aqq.x1yrsyyn');
            if(button){
                    await button.click();
                    console.log("click thành công ");
                    
            }else{
                const button = await page.waitForSelector('.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x14yjl9h.xudhj91.x18nykt9.xww2gxu.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1');
                if(button){
                    await button.click();
                    console.log("click thành công ");
                }
            }
            const money =await api_get_money('LIKE',j.id,token.TDS_token);
            // In dữ liệu trả về từ hàm api_get_money
            console.log('Dữ liệu trả về:', JSON.stringify(money));
        }catch (error) {
            console.error("Đã xảy ra lỗi:", error);
            continue; // Bỏ qua lần lặp hiện tại nếu có lỗi
        } 
        await delay(1000);
    }
}
export async function reactcmt(page: any,input: any) {
    for (const j of input) {
        await page.goto(`https://www.facebook.com/${j.id}`);
        console.log(`https://www.facebook.com/${j.id}`);
        // Wait for 5 seconds
        await delay(1000);
        try {
            const button = await page.waitForSelector('.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.x10b6aqq.x1yrsyyn');
            if(button){
                    await button.click();
                    console.log("click thành công ");
                    
            }else{
                const button = await page.waitForSelector('.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x14yjl9h.xudhj91.x18nykt9.xww2gxu.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1');
                if(button){
                    await button.click();
                    console.log("click thành công ");
                }
            }
            const money =await api_get_money('LIKE',j.id,token.TDS_token);
            // In dữ liệu trả về từ hàm api_get_money
            console.log('Dữ liệu trả về:', JSON.stringify(money));
        }catch (error) {
            console.error("Đã xảy ra lỗi:", error);
            continue; // Bỏ qua lần lặp hiện tại nếu có lỗi
        } 
        await delay(1000);
    }
}

export function likesieure(page: any, result: any) {
    throw new Error('Function not implemented.');
}
