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
        const buttonActive = await page.$(button[buttonDefault], { visible: true });
        if (buttonActive) {
            await new Promise(resolve => {
                setTimeout(resolve, 1000);
              });
            await buttonActive.click();
            console.log("click thành công ");
            return 'Đã hoàn thành';
        }
        if(buttonDefault<button.length){
            buttonDefault++;
            return await clickButton1(page,buttonDefault,'');
        }
        return 'khong phu hop';
    } catch (error) {
        if(buttonDefault<button.length){
            buttonDefault++;
            return await clickButton1(page,buttonDefault,'');
        }
        console.error("Đã xảy ra lỗi:",buttonDefault,'::', error);
        return 'Đã xảy ra lỗi';
    }
}
export async function clickbuttonDefault(page: any, button: any, buttonAfter: any) {
    try {    
        // Chờ cho phần tử xuất hiện trên trang
        const buttonxSelector: string[]  = [
            button,
        ];
        await delay(3000);
        
        if (await clickButton1(page, buttonxSelector, 0) === 'Đã hoàn thành') {
            console.log("Click thành công");
            await delay(3000);
            console.log("Delay thành công");
            
            // Sử dụng page.$$ để lấy danh sách các phần tử DOM
            const spans = await page.$$(buttonAfter);
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