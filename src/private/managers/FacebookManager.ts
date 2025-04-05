import Facebook from '../facebook/facebook'; // Giả sử Facebook là một lớp tùy chỉnh bạn đã định nghĩa
import TDS from '../TDS/TDS'; // Giả sử TDS là một lớp tùy chỉnh bạn đã định nghĩa
import FacebookAutomationManager from '../mainFacebook'; // Giả sử đây là một lớp bạn đã tạo
import type * as Puppeteer from 'puppeteer';
// Quản lý trình duyệt của bạn
import BrowserManager from './BrowserManager';

interface Account {
  name: string;
  id: string;
  email: string;
  password: string;
  cookie: string;
}

interface TDSAccount {
  token: string;
  username: string;
  password: string;
  facebook: Account[]; // Array of Facebook accounts
}

class FacebookManager {
  constructor(private browserManager: BrowserManager) {}

  async standardizedData(resultsfb: any): Promise<any[]> {
    return Array.isArray(resultsfb) ? resultsfb : [];
  }

  async divideResults(resultsfb: any, num: number): Promise<any[]> {
    const dividedResults: any[] = [];
    for (let i = 0; i < num; i++) {
      dividedResults.push({
        follow: Array.isArray(resultsfb.follow)
          ? resultsfb.follow.slice(
              i * Math.ceil(resultsfb.follow.length / num),
              (i + 1) * Math.ceil(resultsfb.follow.length / num),
            )
          : [],
        like: Array.isArray(resultsfb.like)
          ? resultsfb.like.slice(
              i * Math.ceil(resultsfb.like.length / num),
              (i + 1) * Math.ceil(resultsfb.like.length / num),
            )
          : [],
      });
    }
    return dividedResults;
  }

  async createPage(browser: Puppeteer.Browser): Promise<Puppeteer.Page | undefined> {
    try {
      const context = browser.defaultBrowserContext();
      await context.overridePermissions('https://www.facebook.com/', ['geolocation']);
      const page = await browser.newPage();
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US',
      });
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
      );
      await page.setJavaScriptEnabled(true);
      return page;
    } catch (error) {
      console.error('An error occurred while creating page:', error);
      return undefined;
    }
  }
  async test(nameJobs: string[], tdsAccounts: TDSAccount[],proxies:string[]): Promise<void> {
    try {
      // Kiểm tra dữ liệu đầu vào
      if (!tdsAccounts || tdsAccounts.length === 0) {
        console.warn('Danh sách tài khoản TDS trống');
        return;
      }
  
      const fbInfo = tdsAccounts[0].facebook[0];
      if (!fbInfo) {
        console.warn('Không tìm thấy thông tin Facebook trong tài khoản TDS');
        return;
      }
  
      // Khởi tạo đối tượng TDS và Facebook
      const tds = new TDS(tdsAccounts[0].token, tdsAccounts[0].username, tdsAccounts[0].password);
      const fb = new Facebook(fbInfo.id, fbInfo.email, fbInfo.password, fbInfo.cookie, tds);
  
      // Tạo các trình duyệt
      await this.browserManager.createBrowsers(tdsAccounts);
      const browser = this.browserManager.getBrowser(tds.getUsername());
      if (!browser) {
        console.warn(`Không tìm thấy browser cho tài khoản TDS: ${tds.getUsername()}`);
        return;
      }
  
      // Tạo page
      const page = await this.browserManager.createPage(tds.getUsername());
      if (!page) {
        console.warn('Không thể tạo page cho trình duyệt');
        return;
      }
      await fb.login(page);
      // Điều hướng đến URL

  
      // Danh sách selector cho nút
      const button1: string[] = [
        '.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label="Thích"]',
        '.x1i10hfl.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x78zum5.x1iyjqo2.x2lah0s.xl56j7k.x5ve5x3[aria-label="Thích"]',
      ];
  
      // Gọi clickButton2 từ đối tượng fb
      const clicked = await fb.clickButton2(page, button1, 0, 'CARE');
      console.log(`Kết quả click CARE: ${clicked}`);
  
      // Đóng page và browser (tuỳ chọn)
 
  
    } catch (error) {
      console.error('Lỗi trong hàm test:', error);
      throw error; // Ném lỗi để caller xử lý nếu cần
    }
  }
  async main(nameJobs: string[], tdsAccounts: TDSAccount[],proxies:string[]): Promise<void> {
    if (!tdsAccounts.length) {
      console.error('No TDS account provided');
      return;
    }
  
    // Biến tdsAccounts thành các đối tượng TDS
    const tdsInstances = tdsAccounts.map(
      (tdsAccount) => new TDS(tdsAccount.token, tdsAccount.username, tdsAccount.password),
    );
  
    
  
    try {
      let iteration = 0;
      while (true) {
        try {
          await this.browserManager.createBrowsers(tdsAccounts,proxies);
          const tdsTasks = tdsInstances.map(async (tds, tdsIndex) => {
            const fbInfo = tdsAccounts[tdsIndex].facebook[iteration % tdsAccounts[tdsIndex].facebook.length]; // Lấy tài khoản Facebook theo vòng lặp
            
            // Kiểm tra nếu fbInfo hợp lệ
            if (!fbInfo) {
              console.warn(`Không tìm thấy tài khoản Facebook cho TDS ${tds.getUsername()}`);
              return;
            }
  
            const fb = new Facebook(fbInfo.id, fbInfo.email, fbInfo.password, fbInfo.cookie, tds);
            const browser = this.browserManager.getBrowser(tdsInstances[tdsIndex].getUsername());
            
            if (!browser) {
              console.warn(`Không tìm thấy browser cho tài khoản TDS: ${tdsInstances[tdsIndex].getUsername()}`);
              return;
            }
            
            const page = await this.browserManager.createPage(tds.getUsername());
            if (!page) {
              console.warn(`Không thể tạo trang cho tài khoản Facebook: ${fbInfo.id}`);
              return;
            }
  
            try {
              await fb.login(page);
              await tds.api_config_account(fb.getId()); // Cấu hình tài khoản TDS
              await new Promise((resolve) => setTimeout(resolve, 1000)); // Chờ 20 giây
  
              
  
              // Duyệt qua tất cả các công việc
              for (const job of nameJobs) {
                const resultsfbArray = await fb.getOneJob(job);
                if (resultsfbArray !== 0 && resultsfbArray !== 1) {
                  const resultsfb = await this.standardizedData(resultsfbArray.data);
                  console.log('resultsfb', resultsfb);
                  await this.typeWork(page,fb,resultsfb,job) // Thực thi công việc
                  await new Promise((resolve) => setTimeout(resolve, 10000)); // Chờ 10 giây
                }
              }
  
              
            } catch (error) {
              console.error('Lỗi xảy ra trong khi xử lý công việc:', error);
              // Nếu có lỗi frame bị detached hoặc page bị đóng, bỏ qua và tiếp tục vòng lặp
            }
          });
  
          // Chạy tất cả các task song song cho các TDS
          await Promise.all(tdsTasks);
  
          // Chờ trước khi lặp lại
          console.log('Chờ 10 giây trước khi lặp lại...');
          await new Promise((resolve) => setTimeout(resolve, 10000));
          await this.browserManager.closeAllBrowsers();
          iteration++; // Tăng số lần lặp
        } catch (error) {
          console.error('Lỗi trong vòng lặp chính:', error);
          break; // Dừng vòng lặp chính nếu có lỗi không xác định
        }
      }
  
      console.log('Chờ 10 giây trước khi lặp lại...');
      await new Promise((resolve) => setTimeout(resolve, 10000));
    } catch (error) {
      console.error('Lỗi trong vòng lặp chính:', error);
    } finally {
      await this.browserManager.closeAllBrowsers();
      console.log('Hoàn thành tất cả các vòng lặp.');
    }
  }
  async typeWork(page: any,facebook:Facebook,job:any,name:any){
    switch (name) {
      case 'facebook_follow':
          await facebook.follow(page,job);
          break;
      case 'facebook_reaction':
          await facebook.like(page,job);
          break;
    }
  }
  
}

export default FacebookManager;
