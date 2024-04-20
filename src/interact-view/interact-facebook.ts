
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
export async function clickButton1(page: any, button: any, buttonDefault: any): Promise<string | undefined>  {
    try {
        const buttonActive = await page.waitForSelector(button[buttonDefault], { visible: true });
        if (buttonActive) {
            await buttonActive.click();
            console.log("click thành công ");
            await delay(1000);
            return 'Đã hoàn thành';
        }
    } catch (error) {
        if(buttonDefault<button.length){
            await delay(1000);
            buttonDefault++;
            return await clickButton(page,buttonDefault,'');
        }
        console.error("Đã xảy ra lỗi:",buttonDefault,'::', error);
        return 'Đã xảy ra lỗi';
    }
}
// const buttonxSelector = '.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3';
//         const buttonx = await page.waitForSelector(buttonxSelector, { visible: true });
        
//         if (buttonx) {
//             // Đặt thuộc tính aria-expanded thành true
//             await page.evaluate((buttonx) => {
//                 buttonx.setAttribute('aria-expanded', 'true');
//             }, buttonx);

//             const text = 'Theo dõi';
//             const classes = 'x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xk50ysn.xzsf02u.x1yc453h';
//             const selector = `//span[contains(@class, '${classes}') and contains(text(), '${text}')]`;

//             const buttonToFollow = await page.waitForXPath(selector, { visible: true });
//             if (buttonToFollow) {
//                 await buttonToFollow.click();
//             } else {
//                 console.error('Không tìm thấy nút "Theo dõi"');
//             }
//         } else {
//             console.error('Không tìm thấy nút có lớp:', buttonxSelector);
//         }
// export async function clickbuttonDefault(page: any, button: any, buttonDefault: any) {
//     try {
//         const buttonxSelector = '.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Xem lựa chọn"]';
//         const buttonx = await page.waitForSelector(buttonxSelector, { visible: true });
//         if (buttonx) {
//             await buttonx.click();
//             console.log("click thành công ... ");
//             return await clickButton(page,buttonDefault,'');
//         } 
//     } catch (error) {
//         console.error("Đã xảy ra lỗi1:", error);
//         return 'Đã xảy ra lỗi1';
//     }
// }
export async function clickbuttonDefault(page: any, button: any, buttonDefault: any) {
    try {    
        // Chờ cho phần tử xuất hiện trên trang
        const buttonxSelector: string[]  = [
            '.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Xem lựa chọn"]',
        ];
        await delay(3000);
        
        if (await clickButton1(page, buttonxSelector, 0) === 'Đã hoàn thành') {
            console.log("Click thành công");
            await delay(3000);
            console.log("Delay thành công");
            
            // Sử dụng page.$$ để lấy danh sách các phần tử DOM
            const spans = await page.$$('.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xk50ysn.xzsf02u.x1yc453h');
            console.log("spans:  ",spans);
            
            // Duyệt qua danh sách các phần tử DOM và click vào phần tử mong muốn
            for (const span of spans) {
                console.log("const thanh cong");
                const text = await span.evaluate((element: { textContent: any; }) => element.textContent);
                console.log('Text:', text);
                
                if (text.trim() === 'Theo dõi') {
                    await span.click();
                    await delay(1000); // Đợi 1 giây trước khi tiếp tục vòng lặp
                    console.log('Clicked');
                    break;
                }
            }
            
            return 'Thành công';
        } else {
            console.error("Không tìm thấy buttonx");
            return 'Không tìm thấy buttonx';
        }
    } catch (error) {
        console.error("Lỗi:", error);
        return 'Lỗi trang web không tồn tại';
    }
}

export async function follow(page: any,input: any) {
    console.log('Da vao follow');
    delay(5000);
    for (const j of input) {
        console.log('Chuan bi follow');

        await page.goto(`https://www.facebook.com/${j.id}`);
        console.log(`https://www.facebook.com/${j.id}`);
        const button ='.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Theo dõi"]';
        const buttonDefault ='.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xk50ysn.xzsf02u.x1yc453h'; 
        
        try {
            await delay(5000);
            if(await clickButton(page,button,'')!='Đã hoàn thành'){
                console.log(await clickbuttonDefault(page,button,buttonDefault));
            }
            const money =await api_get_money('FOLLOW',j.id,token.TDS_token);
            // In dữ liệu trả về từ hàm api_get_money
            console.log('Dữ liệu trả về:', JSON.stringify(money));
        }catch (error) {
            console.error("Đã xảy ra lỗi1:", error);
            continue; // Bỏ qua lần lặp hiện tại nếu có lỗi
        } 
        await delay(1000);
    }
}
export async function like(page: any,input: any) {
    for (const j of input) {
        await page.goto(`https://www.facebook.com/${j.id}`);
        console.log(`https://www.facebook.com/${j.id}`);
        // Wait for 5 seconds
        
        const button='.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label="Thích"]';
        const buttonDefault='.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x14yjl9h.xudhj91.x18nykt9.xww2gxu.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1[aria-label="Thích"]';
        const button1: string[] =[
            '.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label="Thích"]',
            '.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.xzolkzo.x12go9s9.x1rnf11y.xprq8jg.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1[aria-label="Thích"]',
            '.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label="Thích"]',
        ]
        const buttonDefault1=0;
        try {
            await delay(5000);
            console.log(await clickButton1(page,button1,buttonDefault1));
            const money =await api_get_money('LIKE',j.id,token.TDS_token);
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
