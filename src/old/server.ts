import puppeteer from 'puppeteer-extra'; // Correct import for puppeteer-extra
import type * as Puppeteer from 'puppeteer';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import FacebookAutomationManager from './mainFacebook';
import * as mainInstagram from './mainIntargram';
import * as controller from './controller';
import { account } from './constants';
import * as interactfb from './interact-view/interact-facebook';

puppeteer.use(StealthPlugin());

class BrowserManager {
    private browsers: { [key: string]: Puppeteer.Browser } = {};

    async createBrowsers(arrayOfValues: string[]) {
        let x = 0;
        let y = 0;
        const h = 700;
        const w = 700;

        for (const value of arrayOfValues) {
            const browser = await puppeteer.launch({
                headless: false,
                args: [`--window-size=${w},${h}`, `--window-position=${x},${y}`],
            });
            this.browsers[value] = browser;
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

    async main(arrayOfValues: string[], arrayOfValuesfb: string[]) {
        // Tạo browsers cho các tài khoản
        await this.browserManager.createBrowsers(arrayOfValues);
        
        
        
        while (true) { // Vòng lặp vô hạn - cần có điều kiện dừng nếu cần
            const promises: Promise<any>[] = [];
            const jobs: Promise<any>[] = [];
    
            // Lấy kết quả cho mỗi tài khoản
            for (const value of arrayOfValues) {
                const job = controller.getAllJob(arrayOfValuesfb, account[value as keyof typeof account]);
                jobs.push(job);  // Đẩy promise vào mảng jobs
            }
    
            // Đợi tất cả các job hoàn thành
            const resultsfbArray = await Promise.all(jobs);
            console.log("resultsfbArray: ", resultsfbArray);  // Log kết quả
            await new Promise(resolve => setTimeout(resolve, 9000));
            // Tạo các công việc cho từng tài khoản
            const fbAutomation = new FacebookAutomationManager(this.browserManager.getBrowser(arrayOfValues[0])); // Chỉ cần một browser
            for (let i = 0; i < arrayOfValues.length; i++) {
                const resultsfb = await this.standardizedData(resultsfbArray[i]);  // Chuẩn hóa dữ liệu
                promises.push(fbAutomation.main(resultsfb, arrayOfValues[i]));  // Thực thi các công việc
            }
    
            console.log('Running promises:', promises.length);
    
            // Đợi tất cả các promises hoàn thành
            await Promise.all(promises);
    
            // Đợi 60 giây trước khi lặp lại
            await new Promise(resolve => setTimeout(resolve, 60000)); // Delay 60 seconds
    
            // Điều kiện dừng vòng lặp hoặc thoát (nếu bạn muốn dừng vòng lặp sau một số lần)
            // Ví dụ: dừng sau 5 lần lặp
            // if (/* Một điều kiện nào đó để dừng vòng lặp */) break;
        }
    }
    
}

class InstagramManager {
    constructor(private browserManager: BrowserManager) {}

    async main(arrayOfValues: string[], arrayOfValuesfb: string[]) {
        await this.browserManager.createBrowsers(arrayOfValues);
        const promises = [];

        for (const value of arrayOfValues) {
            promises.push(mainInstagram.main2(this.browserManager.getBrowser(value), arrayOfValuesfb, value));
        }

        console.log('Running promises:', promises.length);
        await Promise.all(promises);

        await this.browserManager.closeAllBrowsers();
    }
}


// Main function to execute
(async () => {
    const browserManager = new BrowserManager();
    const facebookManager = new FacebookManager(browserManager);
    const instagramManager = new InstagramManager(browserManager);

    const facebookAccounts = ['facebook0'];
    const instagramAccounts = ['instagram0'];
    const facebookJobs = ['follow'];

    // Run Facebook jobs
    await facebookManager.main(facebookAccounts, facebookJobs);

    // Run Instagram jobs
    // await instagramManager.main(instagramAccounts, ['instagram_like']);
})();
