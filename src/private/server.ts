import puppeteer from 'puppeteer-extra'; // Correct import for puppeteer-extra
import type * as Puppeteer from 'puppeteer';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import Facebook from './facebook/facebook';
import TDS from './TDS/TDS';
import fs from 'fs';
import path from 'path';
import FacebookAutomationManager from "./mainFacebook"

puppeteer.use(StealthPlugin());

class BrowserManager {
    private browsers: { [key: string]: Puppeteer.Browser } = {};

    async createBrowsers(accounts: any[]) {
        let x = 0;
        let y = 0;
        const h = 700;
        const w = 700;

        for (const value of accounts) {
            const browser = await puppeteer.launch({
                headless: true,
                args: [`--window-size=${w},${h}`, `--window-position=${x},${y}`],
            });
            this.browsers[value.name] = browser;
            x += 310;
            if (x > 1024) {
                x = 0;
                y += 300;
            }
        }
    }

    getBrowser(key: string): Puppeteer.Browser {
        return this.browsers[key];
    }

    async closeAllBrowsers() {
        for (const key in this.browsers) {
            await this.browsers[key].close();
        }
    }
}

class FacebookManager {
    constructor(private browserManager: BrowserManager) {}

    async standardizedData(resultsfb: any): Promise<any[]> {
        return Array.isArray(resultsfb) ? resultsfb : [];
    }

    async divideResults(resultsfb: any, num: number) {
        const dividedResults = [];
        for (let i = 0; i < num; i++) {
            dividedResults.push({
                follow: Array.isArray(resultsfb.follow)
                    ? resultsfb.follow.slice(i * Math.ceil(resultsfb.follow.length / num), (i + 1) * Math.ceil(resultsfb.follow.length / num))
                    : [],
                like: Array.isArray(resultsfb.like)
                    ? resultsfb.like.slice(i * Math.ceil(resultsfb.like.length / num), (i + 1) * Math.ceil(resultsfb.like.length / num))
                    : [],
            });
        }
        return dividedResults;
    }
    async  createPage(browser : any){
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

    async main(accounts: any[], nameJobs: string[], TDSacount: any[]): Promise<void> {
        
        
        
        
    
        while (true) {
            // Tạo trình duyệt cho các tài khoản
            await this.browserManager.createBrowsers(accounts);
        
            const maxIterations = 5; // Số lần lặp tối đa (điều kiện dừng)
            let iteration = 0;
            
            const tds = new TDS(TDSacount[0].token, TDSacount[0].username, TDSacount[0].password);
            const accountFB :any=[]
            const pages:any=[]
            for (const account of accounts) {
                const fb = new Facebook(account.id, account.email, account.password, account.cookie, tds);
                const page = await this.createPage(this.browserManager.getBrowser(account.name));
                await fb.login(page);
                accountFB.push(fb);
                pages.push(page);
                
            }
            while (iteration < maxIterations) {
                console.log(`Iteration ${iteration + 1} bắt đầu.`);
                
                
                try {
                    let flag=false;
                    // Đợi tất cả các công việc hoàn thành
                    for (let i = 0; i < accountFB.length; i++) {
    
                        tds.api_config_account(accountFB[i].id);
                        await new Promise(resolve => setTimeout(resolve, 20000));
                        flag=false;
                        const fbAutomation = new FacebookAutomationManager(pages[i],accountFB[i]);
                        for(let j=0; j<nameJobs.length;j++){
                            const resultsfbArray = await accountFB[i].getOneJob(nameJobs[j]);
                            if(resultsfbArray!=0||resultsfbArray!=1&&flag==false){
                                const resultsfb = await this.standardizedData(resultsfbArray); // Chuẩn hóa dữ liệu
                                console.log("resultsfb",resultsfb);
                                console.log("nameJobs",nameJobs[j]);
                                await fbAutomation.main(resultsfb, nameJobs[j]);
                                // Chờ 5 giây
                                await new Promise(resolve => setTimeout(resolve, 10000));
                            }
                            flag=true;
                        }
                        
                    }
        
                } catch (error) {
                    console.error("Lỗi xảy ra trong khi xử lý công việc:", error);
                }
        
                // Đợi trước khi lặp lại
                console.log("Chờ 10 giây trước khi lặp lại...");
                await new Promise(resolve => setTimeout(resolve, 10000));
        
                iteration++;
            }
            for (const account of accounts) {
                this.browserManager.closeAllBrowsers()
            }
        
            console.log("Hoàn thành tất cả các vòng lặp.");
        }
        

        }
        
    
    
}

class InstagramManager {
    constructor(private browserManager: BrowserManager) {}

    async main(accounts: string[], accountsfb: string[]) {
        // await this.browserManager.createBrowsers(accounts);
        // const promises = [];

        // for (const value of accounts) {
        //     promises.push(mainInstagram.main2(this.browserManager.getBrowser(value), accountsfb, value));
        // }

        // console.log('Running promises:', promises.length);
        // await Promise.all(promises);

        // await this.browserManager.closeAllBrowsers();
    }
}

function loadConfig(filePath: string) {
    try {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const config = JSON.parse(rawData);
        return config;
    } catch (error) {
        console.error("Không thể đọc file cấu hình:", error);
        return null;
    }
}
// Main function to execute
(async () => {
    const configPath = path.join(__dirname, 'config.json');
    // Đọc và sử dụng cấu hình
    const config = loadConfig(configPath);
    if (!config) {
        console.log("Khong the lay du lieu")
    }else{
        const facebookAccounts=config.Facebook;
        const TDS=config.TDS;
        const browserManager = new BrowserManager();
        const facebookManager = new FacebookManager(browserManager);
        const instagramManager = new InstagramManager(browserManager);
    
        // const facebookAccounts = ['facebook0'];
        const instagramAccounts = ['instagram0'];
        const facebookJobs = ['follow','like',];
    
        // Run Facebook jobs
        await facebookManager.main(facebookAccounts, facebookJobs,TDS);
    
        // Run Instagram jobs
        // await instagramManager.main(instagramAccounts, ['instagram_like']);
    }
    
})();
