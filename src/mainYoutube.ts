import { Browser } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import delay from 'delay';
import { account } from './constants';
import * as apiCall from './call-api/call-facebook';
import * as fb from './perfom/facebook';
import * as call from './call-api/call-facebook';
import { token } from './constants';

puppeteer.use(StealthPlugin());
async function createPage(browser : any){
  try {
    
    const page = await browser.newPage();
    await page.goto('https://www.facebook.com/');
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
async function fillForm(page : any){
    const inpEmail=await page.waitForSelector('#email');
    const time= new Promise(resolve => setTimeout(resolve,500));
    if (inpEmail) {
      await inpEmail.type(account.email, { delay: 101 });
          
    };
    const inpPassword = await page.waitForSelector('#pass');
    const time1= new Promise(resolve => setTimeout(resolve,500));

    if (inpPassword) {
      await inpPassword.type(account.password, { delay: 201 });
    }

    const btnLogin = await page.waitForSelector('button[value="1"]._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy');

    if (btnLogin) {
      await btnLogin.click();
      const time2= new Promise(resolve => setTimeout(resolve,8000));
    }
    await delay(5000);
}
async function login() {
    // Call the api_config_account function
    const browsers = [];
    // const apiResults = await call.call();
    const pages=[];
    for(let i = 0;i<2;i++){
      const browser = await puppeteer.launch({ headless: false });
      browsers.push(browser);
      const page = await createPage(browser);
      
      pages.push(page);
    }
    // await page.close();
    // await browser.close();
    // const result = apiResults['like'];
    // fb.facebook(pages[0],'like');
    await fillForm(pages[1]);
    // fb.facebook(pages[1],'like');
}
export async function main(){
    login();
}
