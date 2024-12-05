import delay from "delay";
import { api_get_money } from '../api/youtube-api'
import { token } from '../constants';
export async function clickButton(page: any,button:any,buttonDefault:any){
    try {
        const buttonactive = await page.waitForSelector(button,{ visible: true });
        if(buttonactive){
                await buttonactive.click();
                console.log("click thành công ");
        }else{
            const buttonactive1 = await page.waitForSelector(buttonDefault);
            if(buttonactive1){
                await buttonactive1.click();
                console.log("click thành công ");
            }
        }
        await delay(1000);
        return 'Đã hoàn thành';
    }catch(error){
        return console.error("Đã xảy ra lỗixxxx:", error);
    }
}
export async function follow(page: any,input: any) {
    for (const j of input) {
        await page.goto(`https://www.youtube.com/${j.id}`);
        console.log(`https://www.youtube.com/${j.id}`);
        const button ='.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Theo dõi"]';
        const buttonDefault ='.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x14yjl9h.xudhj91.x18nykt9.xww2gxu.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1'; 
        try {
            await delay(5000);
            console.log(await clickButton(page,button,buttonDefault));
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