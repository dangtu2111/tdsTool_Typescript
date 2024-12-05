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
                headless: false,
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

    async standardizedData(resultsfb: any) {
        console.log("xxxxxxxxxxxxxxxx",resultsfb);
        let results: { [key: string]: any } = {};
        if (resultsfb.follow){
            if(resultsfb.like){
                results={
                    follow: Array.isArray(resultsfb.follow) ? resultsfb.follow : [],
                    like: Array.isArray(resultsfb.like) ? resultsfb.like : [],
                };
            }else{
                results={
                    follow: Array.isArray(resultsfb.follow) ? resultsfb.follow : [],
                };
            }
        }else{
            results={
                // follow: Array.isArray(resultsfb.follow) ? resultsfb.follow : [],
                like: Array.isArray(resultsfb.like) ? resultsfb.like : [],
            };
        }
        return results;
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

    async main(accounts: any[], nameJobs: string[], TDSacount: any[]): Promise<void> {
        // Tạo trình duyệt cho các tài khoản
        await this.browserManager.createBrowsers(accounts);
        const tds = new TDS(TDSacount[0].token, TDSacount[0].username, TDSacount[0].password);
        const fb = new Facebook(accounts[0].id, accounts[0].email, accounts[0].password, accounts[0].cookie, tds);
        const fbAutomation = new FacebookAutomationManager(this.browserManager.getBrowser(accounts[0].name),fb);
        fbAutomation.test("https://www.facebook.com/profile.php?id=100021140784015");
        // const maxIterations = 5; // Số lần lặp tối đa (điều kiện dừng)
        // let iteration = 0;
    
        // while (iteration < maxIterations) {
        //     console.log(`Iteration ${iteration + 1} bắt đầu.`);
    
        //     const tds = new TDS(TDSacount[0].token, TDSacount[0].username, TDSacount[0].password);
        //     const accountFB :any=[]
        //     // Lấy công việc từ TDS cho từng tài khoản
        //     for (const account of accounts) {
        //         const fb = new Facebook(account.id, account.email, account.password, account.cookie, tds);
        //         accountFB.push(fb)
        //     }
    
        //     try {
        //         // Đợi tất cả các công việc hoàn thành
                
        //         // Xử lý và thực thi công việc
        //         const promises: Promise<any>[] = [];
        //         const fbAutomation = new FacebookAutomationManager(this.browserManager.getBrowser(accounts[0].name),accountFB[0]);
    
        //         for (let i = 0; i < accountFB.length; i++) {
        //             const resultsfbArray = await accountFB[i].getAllJob(nameJobs);
        //             const resultsfb = await this.standardizedData(resultsfbArray); // Chuẩn hóa dữ liệu
        //             promises.push(fbAutomation.main(resultsfb)); // Thực thi các công việc
        //         }
    
        //         console.log('Running promises:', promises.length);
        //         await Promise.all(promises); // Đợi các công việc hoàn thành
    
        //     } catch (error) {
        //         console.error("Lỗi xảy ra trong khi xử lý công việc:", error);
        //     }
    
        //     // Đợi trước khi lặp lại
        //     console.log("Chờ 60 giây trước khi lặp lại...");
        //     await new Promise(resolve => setTimeout(resolve, 60000));
    
        //     iteration++;
        // }
    
        // console.log("Hoàn thành tất cả các vòng lặp.");
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
        const facebookJobs = ['follow'];
    
        // Run Facebook jobs
        await facebookManager.main(facebookAccounts, facebookJobs,TDS);
    
        // Run Instagram jobs
        // await instagramManager.main(instagramAccounts, ['instagram_like']);
    }
    
})();
