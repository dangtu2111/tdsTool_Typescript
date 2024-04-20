import { Browser } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import delay from 'delay';
import { account } from './constants';
import * as api from './api/facebook-api';
import { token } from './constants';
import * as fb from './perfom/facebook';



puppeteer.use(StealthPlugin());
export async function createPage(browser : any){
  try {
    
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US'
    });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)');
    await page.setJavaScriptEnabled(true);
    return page;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
export async function getAllJob(arrayOfValues: any) {
  const results: { [key: string]: any } = {};
  const keys = Object.keys(arrayOfValues);
  const lastKey = keys[keys.length - 1];
  const lastValue = arrayOfValues[lastKey];
  for (let value of arrayOfValues) {
      const result = await api.api_get_job(value, token.TDS_token);
      results[value] = result;

      // Chờ 70 giây trước khi gọi API tiếp theo (nếu cần)
      console.log(value);
      console.log(lastValue);
      if(value != lastValue ){
        await new Promise(resolve => {
          setTimeout(resolve, 60000);
        });
      }
  }

  // Log kết quả ra màn hình (nếu cần)
  console.log(results);

  return results;
}
function parseCookieString(cookieString: string): Array<{ name: string, value: string }> {
  const cookiePairs = cookieString.split('; '); // Tách chuỗi thành các cặp key-value

  const cookies: Array<{ name: string, value: string }> = []; // Khởi tạo một mảng để lưu trữ các cặp key-value

  // Duyệt qua mỗi cặp key-value và thêm chúng vào mảng
  for (const pair of cookiePairs) {
      const [name, value] = pair.split('='); // Tách cặp key-value thành key và value
      cookies.push({ name: name.trim(), value: value.trim() }); // Thêm cặp key-value vào mảng
  }

  return cookies;
}

export async function loginCookie(page : any,cookieString: string){
  const cookies = parseCookieString(cookieString);
  console.log('xasdfasdfasdfasdfasdf',cookies);
  await page.goto('https://www.facebook.com/login');
  for (const cookie of cookies) {
    await page.setCookie(cookie);
  }

    // Tải lại trang để sử dụng cookie
    await page.reload();
     // Chờ một khoảng thời gian để đảm bảo trang đã được tải đúng cách
     await delay(2000);

     // Kiểm tra xem đã đăng nhập thành công hay không bằng cách kiểm tra sự hiện diện của một phần tử duy nhất trên trang
     const loggedIn = await page.evaluate(() => !!document.querySelector('[data-testid="account_settings_icon"]'));
 
     if (loggedIn) {
         console.log('Đăng nhập thành công!');
     } else {
         console.log('Đăng nhập không thành công!');
     }
}


export async function fillForm(page : any, classUser :any, classPass: any,classButton:any,link:any,email:string,password:string){
  await page.goto(link);
  const inpEmail=await page.waitForSelector(classUser);
  const time= new Promise(resolve => setTimeout(resolve,500));
  if (inpEmail) {
    await inpEmail.type(email, { delay: 101 });
        
  };
  const inpPassword = await page.waitForSelector(classPass);
  const time1= new Promise(resolve => setTimeout(resolve,500));

  if (inpPassword) {
    await inpPassword.type(password, { delay: 201 });
  }
  const btnLogin = await page.waitForSelector(classButton);

  if (btnLogin) {
    await btnLogin.click();
    const time2= new Promise(resolve => setTimeout(resolve,8000));
  }
  await delay(5000);
}