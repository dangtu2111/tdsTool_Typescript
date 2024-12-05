
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import delay from 'delay';

import * as api from './api/facebook-api';



puppeteer.use(StealthPlugin());
export async function createPage(browser : any){
  try {
    const context = browser.defaultBrowserContext();

    // Từ chối quyền thông báo
    await context.overridePermissions('https://www.facebook.com/', ['geolocation']);
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US'
    });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36');
    await page.setJavaScriptEnabled(true);
    return page;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
export async function getOneJob(nameJob: any,account : any): Promise<any> {
    const result = await api.api_get_job(nameJob, account.TDS_token);
    console.log(result);

    if (typeof result.error !== 'undefined') {
      // Key 'error' tồn tại và có giá trị không phải undefined
      console.log('Tồn tại error');
      console.log(result.error);

      if(result['error']=="Thao tác quá nhanh vui lòng chậm lại"){
        await new Promise(resolve => {
          setTimeout(resolve,10000);
        });
        return await getOneJob(nameJob,account);
      }else{
        return null;
      }
    }
    return result;
}
export async function getAllJob(arrayOfValues: any, account: any) {
  const results: { [key: string]: any } = {}; // Đối tượng lưu kết quả
  const keys = Object.keys(arrayOfValues);
  const lastValue = arrayOfValues[keys[keys.length - 1]];

  for (let value of arrayOfValues) {
    try {
      // Gọi hàm getOneJob và chờ kết quả
      const result = await getOneJob(value, account); 
      results[value] = result;

      console.log(`Hoàn thành công việc cho: ${value}`);

      // Nếu chưa phải phần tử cuối, chờ 60 giây
      if (value !== lastValue) {
        console.log(`Đang chờ 60 giây trước khi tiếp tục...`);
        await new Promise(resolve => setTimeout(resolve, 60000));
      }
    } catch (error) {
      console.error(`Lỗi khi xử lý công việc cho: ${value}`, error);
      results[value] = { error: error || error };
    }
  }

  console.log("Kết quả cuối cùng:", results);
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

export async function loginCookie(page: any, cookieString: string, url: string) {
  try {
    // Parse the cookie string
    const cookies = parseCookieString(cookieString);

    // Navigate to the specified URL
    await page.goto(url, {
      waitUntil: 'networkidle2' // Đợi trang tải xong
  });
    console.log('Navigated to:', url);

    // Set each cookie on the page
    for (const cookie of cookies) {
      await page.setCookie(cookie);
    }

    // Reload the page to ensure cookies are applied
    await page.reload();
    console.log('Page reloaded');
  await new Promise(resolve => setTimeout(resolve, 3000));

    // Optionally, verify cookies are set by checking the page's cookies
    // const pageCookies = await page.cookies();
    // console.log('Cookies set on page:', pageCookies);

  } catch (error) {
    console.error('Error during loginCookie execution:', error);
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

