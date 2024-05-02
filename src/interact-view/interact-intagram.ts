
import delay from 'delay';
import { api_get_money } from '../api/facebook-api'
import { token } from '../constants';
import * as event from './event-interact';
import { classClick } from '../constants';
export async function follow(page: any,input: any,account:any) {
    console.log('Da vao follow');
    delay(5000);
    for (const j of input) {
        console.log('Chuan bi follow');
        await page.goto(j.link);
        console.log(j.link);
        const button= classClick.intagram.follow[0];
        try {
            await delay(5000);
            if(await event.clickButton(page,button,'')!='Đã hoàn thành'){
                console.log(await event.clickbuttonDefault(page,classClick.facebook.follow[1],classClick.facebook.follow[2]));
            }
            const money =await api_get_money('INS_FOLLOW',j.id,account.TDS_token);
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
        await page.goto(j.link);
        console.log(j.link);
        // Wait for 5 seconds
            const button1: string[] =classClick.intagram.like;
        const buttonDefault1=0;
        try {
            await new Promise(resolve => {
                setTimeout(resolve, 1000);
              });
            console.log(await event.clickButton1(page,button1,buttonDefault1));
            await event.clickButton1(page,button1,buttonDefault1);
            await new Promise(resolve => {
                setTimeout(resolve, 2000);
              });
            const money =await api_get_money('INS_LIKE',j.id,account.TDS_token);
            // In dữ liệu trả về từ hàm api_get_money
            console.log('Dữ liệu trả về:', JSON.stringify(money));
            if(money.error === "Đã đạt giới hạn nhiệm vụ vui long quay lại sau 1h nữa!"){
                return null;
            }
        }catch (error) {
            console.error("Đã xảy ra lỗi2:", error);
             // Bỏ qua lần lặp hiện tại nếu có lỗi
            continue; // Bỏ qua lần lặp hiện tại nếu có lỗi

        }
        await delay(1000);
    }
}

// export async function likegiare(page: any,input: any) { 
//     for (const j of input) {
//         await page.goto(`https://www.facebook.com/${j.id}`);
//         console.log(`https://www.facebook.com/${j.id}`);
//         // Wait for 5 seconds
//         await delay(1000);
//         try {
//             const button = await page.waitForSelector('.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.x10b6aqq.x1yrsyyn');
//             if(button){
//                     await button.click();
//                     console.log("click thành công ");
                    
//             }else{
//                 const button = await page.waitForSelector('.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x14yjl9h.xudhj91.x18nykt9.xww2gxu.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1');
//                 if(button){
//                     await button.click();
//                     console.log("click thành công ");
//                 }
//             }
//             const money =await api_get_money('LIKE',j.id,token.TDS_token);
//             // In dữ liệu trả về từ hàm api_get_money
//             console.log('Dữ liệu trả về:', JSON.stringify(money));
//         }catch (error) {
//             console.error("3:", error);
//             continue; // Bỏ qua lần lặp hiện tại nếu có lỗi
//         } 
//         await delay(1000);
//     }
// }
// export async function reaction(page: any,input: any) {
//     for (const j of input) {
//         await page.goto(`https://www.facebook.com/${j.id}`);
//         console.log(`https://www.facebook.com/${j.id}`);
//         // Wait for 5 seconds
//         await delay(1000);
//         try {
//             const button = await page.waitForSelector('.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.x10b6aqq.x1yrsyyn');
//             if(button){
//                     await button.click();
//                     console.log("click thành công ");
                    
//             }else{
//                 const button = await page.waitForSelector('.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x14yjl9h.xudhj91.x18nykt9.xww2gxu.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1');
//                 if(button){
//                     await button.click();
//                     console.log("click thành công ");
//                 }
//             }
//             const money =await api_get_money('LIKE',j.id,token.TDS_token);
//             // In dữ liệu trả về từ hàm api_get_money
//             console.log('Dữ liệu trả về:', JSON.stringify(money));
//         }catch (error) {
//             console.error("Đã xảy ra lỗi:", error);
//             continue; // Bỏ qua lần lặp hiện tại nếu có lỗi
//         } 
//         await delay(1000);
//     }
// }
// export async function comment(page: any,input: any) {
//     for (const j of input) {
//         await page.goto(`https://www.facebook.com/${j.id}`);
//         console.log(`https://www.facebook.com/${j.id}`);
//         // Wait for 5 seconds
//         await delay(1000);
//         try {
//             const button = await page.waitForSelector('.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.x10b6aqq.x1yrsyyn');
//             if(button){
//                     await button.click();
//                     console.log("click thành công ");
                    
//             }else{
//                 const button = await page.waitForSelector('.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x14yjl9h.xudhj91.x18nykt9.xww2gxu.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1');
//                 if(button){
//                     await button.click();
//                     console.log("click thành công ");
//                 }
//             }
//             const money =await api_get_money('LIKE',j.id,token.TDS_token);
//             // In dữ liệu trả về từ hàm api_get_money
//             console.log('Dữ liệu trả về:', JSON.stringify(money));
//         }catch (error) {
//             console.error("Đã xảy ra lỗi:", error);
//             continue; // Bỏ qua lần lặp hiện tại nếu có lỗi
//         } 
//         await delay(1000);
//     }
// }
// export async function share(page: any,input: any) {
//     for (const j of input) {
//         await page.goto(`https://www.facebook.com/${j.id}`);
//         console.log(`https://www.facebook.com/${j.id}`);
//         // Wait for 5 seconds
//         await delay(1000);
//         try {
//             const button = await page.waitForSelector('.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.x10b6aqq.x1yrsyyn');
//             if(button){
//                     await button.click();
//                     console.log("click thành công ");
                    
//             }else{
//                 const button = await page.waitForSelector('.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x14yjl9h.xudhj91.x18nykt9.xww2gxu.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1');
//                 if(button){
//                     await button.click();
//                     console.log("click thành công ");
//                 }
//             }
//             const money =await api_get_money('LIKE',j.id,token.TDS_token);
//             // In dữ liệu trả về từ hàm api_get_money
//             console.log('Dữ liệu trả về:', JSON.stringify(money));
//         }catch (error) {
//             console.error("Đã xảy ra lỗi:", error);
//             continue; // Bỏ qua lần lặp hiện tại nếu có lỗi
//         } 
//         await delay(1000);
//     }
// }
// export async function reactcmt(page: any,input: any) {
//     for (const j of input) {
//         await page.goto(`https://www.facebook.com/${j.id}`);
//         console.log(`https://www.facebook.com/${j.id}`);
//         // Wait for 5 seconds
//         await delay(1000);
//         try {
//             const button = await page.waitForSelector('.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.x10b6aqq.x1yrsyyn');
//             if(button){
//                     await button.click();
//                     console.log("click thành công ");
                    
//             }else{
//                 const button = await page.waitForSelector('.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x14yjl9h.xudhj91.x18nykt9.xww2gxu.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1');
//                 if(button){
//                     await button.click();
//                     console.log("click thành công ");
//                 }
//             }
//             const money =await api_get_money('LIKE',j.id,token.TDS_token);
//             // In dữ liệu trả về từ hàm api_get_money
//             console.log('Dữ liệu trả về:', JSON.stringify(money));
//         }catch (error) {
//             console.error("Đã xảy ra lỗi:", error);
//             continue; // Bỏ qua lần lặp hiện tại nếu có lỗi
//         } 
//         await delay(1000);
//     }
// }

// export function likesieure(page: any, result: any) {
//     throw new Error('Function not implemented.');
// }
