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
        
        const page = await controller.createPage(this.browserManager.getBrowser(arrayOfValues[0]));
        await controller.loginCookie(page, account["facebook0"].cookie, 'https://www.facebook.com/login');
        await page.goto('https://www.facebook.com/photo/?fbid=1107148594108453&set=a.1107153684107944', {
            waitUntil: 'networkidle2' // Đợi trang tải xong
        });
        await page.evaluate(() => {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        });
        
        await page.waitForSelector('[aria-label="Thích"]'); // Chờ nút "Thích" xuất hiện
        
       const button1: string[] =[
            '.x1i10hfl.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.xzolkzo.x12go9s9.x1rnf11y.xprq8jg.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1[aria-label="Thích"]',
            '.xq8finb.x16n37ib .x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label="Thích"]',
            '.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label="Thích"]',
            '.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.xzolkzo.x12go9s9.x1rnf11y.xprq8jg.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1vqgdyp.x100vrsf.x1qhmfi1[aria-label="Thích"]',
            '.x1n2onr6.xh8yej3 .x1i10hfl.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x78zum5.x1iyjqo2.x2lah0s.xl56j7k.x5ve5x3[aria-label="Thích"]',
        ]
        const buttonDefault1=0;
        await interactfb.clickButtonUrl(page)
        
        // while (true) { // Vòng lặp vô hạn - cần có điều kiện dừng nếu cần
        //     const promises: Promise<any>[] = [];
        //     const jobs: Promise<any>[] = [];
    
        //     // Lấy kết quả cho mỗi tài khoản
        //     for (const value of arrayOfValues) {
        //         const job = controller.getAllJob(arrayOfValuesfb, account[value as keyof typeof account]);
        //         jobs.push(job);  // Đẩy promise vào mảng jobs
        //     }
    
        //     // Đợi tất cả các job hoàn thành
        //     const resultsfbArray = await Promise.all(jobs);
        //     console.log("resultsfbArray: ", resultsfbArray);  // Log kết quả
        //     await new Promise(resolve => setTimeout(resolve, 9000));
        //     // Tạo các công việc cho từng tài khoản
        //     const fbAutomation = new FacebookAutomationManager(this.browserManager.getBrowser(arrayOfValues[0])); // Chỉ cần một browser
        //     for (let i = 0; i < arrayOfValues.length; i++) {
        //         const resultsfb = await this.standardizedData(resultsfbArray[i]);  // Chuẩn hóa dữ liệu
        //         promises.push(fbAutomation.main(resultsfb, arrayOfValues[i]));  // Thực thi các công việc
        //     }
    
        //     console.log('Running promises:', promises.length);
    
        //     // Đợi tất cả các promises hoàn thành
        //     await Promise.all(promises);
    
        //     // Đợi 60 giây trước khi lặp lại
        //     await new Promise(resolve => setTimeout(resolve, 60000)); // Delay 60 seconds
    
        //     // Điều kiện dừng vòng lặp hoặc thoát (nếu bạn muốn dừng vòng lặp sau một số lần)
        //     // Ví dụ: dừng sau 5 lần lặp
        //     // if (/* Một điều kiện nào đó để dừng vòng lặp */) break;
        // }
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
    const facebookJobs = ['like'];

    // Run Facebook jobs
    await facebookManager.main(facebookAccounts, facebookJobs);

    // Run Instagram jobs
    // await instagramManager.main(instagramAccounts, ['instagram_like']);
})();
