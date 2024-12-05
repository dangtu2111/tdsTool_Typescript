import TDS from "../TDS/TDS";

class Facebook {
    private url="https://www.facebook.com";
    constructor(private id: any , private email:any, private password: any,private cookie:any,private tds:TDS) {
      
    }
    parseCookieString(cookieString: string): Array<{ name: string, value: string }> {
      const cookiePairs = cookieString.split('; '); // Tách chuỗi thành các cặp key-value
    
      const cookies: Array<{ name: string, value: string }> = []; // Khởi tạo một mảng để lưu trữ các cặp key-value
    
      // Duyệt qua mỗi cặp key-value và thêm chúng vào mảng
      for (const pair of cookiePairs) {
          const [name, value] = pair.split('='); // Tách cặp key-value thành key và value
          cookies.push({ name: name.trim(), value: value.trim() }); // Thêm cặp key-value vào mảng
      }
    
      return cookies;
    }
    
    async login(page: any) {
      try {
          // Parse the cookie string
          const cookies = this.parseCookieString(this.cookie);
  
          // Navigate to the specified URL
          await page.goto(this.url, {
              waitUntil: 'networkidle2', // Đợi trang tải xong
          });
          console.log('Navigated to:', this.url);
  
          // Clear all existing cookies
          const oldCookies = await page.cookies();
          if (oldCookies.length > 0) {
              await page.deleteCookie(...oldCookies);
              console.log('Old cookies deleted:', oldCookies.map((c: { name: any; }) => c.name));
          }
  
          // Set each new cookie on the page
          for (const cookie of cookies) {
              await page.setCookie(cookie);
          }
          console.log('New cookies set:', cookies);
  
          // Reload the page to ensure cookies are applied
          await page.reload();
          console.log('Page reloaded');
  
          // Optional: Wait for the page to stabilize
          await new Promise(resolve => setTimeout(resolve, 3000));
  
          // Optional: Verify cookies are set by checking the page's cookies
          const pageCookies = await page.cookies();
          console.log('Cookies set on page:', pageCookies);
  
      } catch (error) {
          console.error('Error during login execution:', error);
      }
    }
      
    async loginWithCookie(){

    }
    async getAllJob(jobs: any) {
        const results: { [key: string]: any } = {}; // Đối tượng lưu kết quả
        const keys = Object.keys(jobs);
        const lastValue = jobs[keys[keys.length - 1]];
      
        for (let value of jobs) {
          try {
            // Gọi hàm getOneJob và chờ kết quả
            const result = await this.getOneJob(value); 
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
    async  getOneJob(type: any): Promise<any> {
        const result = await this.tds.api_get_job_fb(type);
        console.log(result);
    
        if (typeof result.error !== 'undefined') {
          // Key 'error' tồn tại và có giá trị không phải undefined
          console.log('Tồn tại error');
          console.log(result.error);
    
          if(result['error']=="Thao tác quá nhanh vui lòng chậm lại"){
            return 1;
          }else{
            return 0;
          }
        }
        return result;
    }
    async clickButton1(
      page: any, 
      button: string[], 
      buttonDefault: number
    ): Promise<string> {
        try {
            const buttonSelector = button[buttonDefault];
            const buttonActive = await page.$$(buttonSelector);
            
            if (buttonActive.length > 0) {
                console.log(`Tìm thấy nút: ${buttonSelector}, đang xử lý...`);
                await new Promise(resolve => setTimeout(resolve, 1000));
    
                for (const [index, btn] of buttonActive.entries()) {
                    await page.evaluate((el: { scrollIntoView: (arg0: { behavior: string; block: string; }) => void; }) => {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, btn);
                    await new Promise(resolve => setTimeout(resolve, 1500));
    
                    const isVisible = await page.evaluate((el: { getBoundingClientRect: () => DOMRect; }) => {
                        const rect = el.getBoundingClientRect();
                        return rect.top >= 0 && 
                              rect.left >= 0 && 
                              rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
                              rect.right <= (window.innerWidth || document.documentElement.clientWidth);
                    }, btn);
    
                    const isClickable = await page.evaluate((el: HTMLElement) => {
                        const style = getComputedStyle(el);
                        const isDisabled = 'disabled' in el && (el as HTMLButtonElement).disabled;
                        return !isDisabled &&
                              style.pointerEvents !== 'none' &&
                              style.visibility !== 'hidden' &&
                              parseFloat(style.opacity) > 0;
                    }, btn);
                    
                    
    
                    console.log(`Nút ${index + 1} - isVisible: ${isVisible}, isClickable: ${isClickable}`);
                    
                    if (isVisible && isClickable) {
                        try {
                            console.log(`Click vào nút ${index + 1}`);
                            await btn.click();
                            await new Promise(resolve => setTimeout(resolve, 500));
                            return 'Đã hoàn thành';
                        } catch (clickError) {
                            console.error(`Lỗi khi click vào nút ${index + 1}:`, clickError);
                        }
                    } else {
                        console.log(`Nút ${index + 1} không hiển thị hoặc không khả dụng.`);
                    }
                }
    
                console.log("Click hoàn thành!");
                return 'Đã hoàn thành';
            } else {
                console.log(`Không tìm thấy nút: ${buttonSelector}`);
            }
    
            if (buttonDefault < button.length - 1) {
                return await this.clickButton1(page, button, buttonDefault + 1);
            }
    
            console.log("Không có nút nào phù hợp.");
            return 'Không phù hợp';
        } catch (error) {
            console.error("Lỗi khi xử lý nút:", error);
            if (buttonDefault < button.length - 1) {
                return await this.clickButton1(page, button, buttonDefault + 1);
            }
            return 'Đã xảy ra lỗi';
        }
    }
    async  follow(page: any,input: any) {
        console.log('Da vao follow');
        for (const j of input) {
    
            await page.goto(`https://www.facebook.com/${j.id}`, {
              waitUntil: 'networkidle2' // Đợi trang tải xong
          });
            console.log(`https://www.facebook.com/${j.id}`);
            const button1: string[] =[
                    '.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Theo dõi"]',
                    '.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Thêm bạn bè"]',
                    '.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Thích"]'
            ]
    
            try {
                console.log(await this.clickButton1(page,button1,0));
                await new Promise(resolve => {
                  setTimeout(resolve, 3000);
                });
                const money =await this.tds.api_get_money('FOLLOW',j.id);
                // In dữ liệu trả về từ hàm api_get_money
                console.log('Dữ liệu trả về:', JSON.stringify(money));
            }catch (error) {
                console.error("Đã xảy ra lỗi1:", error);
                continue; // Bỏ qua lần lặp hiện tại nếu có lỗi
            } 
        }
    }
    async  clickButtonUrl(
      page: any, 
    ): Promise<string> {
        try {
            const link = page.url();
            const regex = /^https:\/\/www\.facebook\.com\/([a-zA-Z0-9.]+)\/posts\/([a-zA-Z0-9]+)$/;
            const match = link.match(regex);
    
            // Biểu thức chính quy để kiểm tra URL video trên Facebook
            const regex1 = /^https:\/\/www\.facebook\.com\/watch\/\?v=\d+$/;
            const regex2 = /^https:\/\/www\.facebook\.com\/photo\/\?fbid=\d+&set=a\.\d+$/;
    
            if (match) {
                const buttonSelector =".x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label='Thích']";
                const buttonActive = await page.$$(buttonSelector);
                await buttonActive[1].click();
                console.log("CLick thành công.")
                return "Click thành công ";
    
            } else if  (link.match(regex1)){
                const buttonSelector =".x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label='Thích']";
                const buttonActive = await page.$$(buttonSelector);
                await buttonActive[0].click();
                console.log("CLick thành công.")
                return "Click thành công ";
            }else if(link.match(regex2)){
                const buttonSelector =".x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label='Thích']";
                const buttonActive = await page.$$(buttonSelector);
                await buttonActive[0].click();
                console.log("CLick thành công.")
                return "Click thành công ";
            }else{
                console.log("URL không hợp lệ");
            }
            console.log("Không có nút nào phù hợp.");
            return 'Không phù hợp';
        } catch (error) {
            console.error("Lỗi khi xử lý nút:", error);
            
            return 'Đã xảy ra lỗi';
        }
    }
    async regexMatch(page:any,regex:string,button:string){
        try {
          const link = page.url();
          const match = link.match(regex);
          if (match) {
              const buttonActive = await page.$$(button);
              await buttonActive[1].click();
              console.log("CLick thành công.")
              return 1;
          }else{
              console.log("URL không hợp lệ");
              return 0;
          }
      } catch (error) {
          console.error("Lỗi khi xử lý nút:", error);
          
          return 'Đã xảy ra lỗi';
      }
    }
    
    async  like(page: any,input: any) {
        for (const j of input) {
            await page.goto(`https://www.facebook.com/${j.id}`);
            console.log(`https://www.facebook.com/${j.id}`);
            // Wait for 5 seconds
            try {
                await new Promise(resolve => {
                    setTimeout(resolve, 1000);
                  });
                console.log(await this.clickButtonUrl(page));
                await new Promise(resolve => {
                    setTimeout(resolve, 2000);
                  });
                const money =await this.tds.api_get_money('LIKE',j.id);
                // In dữ liệu trả về từ hàm api_get_money
                console.log('Dữ liệu trả về:', JSON.stringify(money));
                
            }catch (error) {
                console.error("Đã xảy ra lỗi2:", error);
                // Bỏ qua lần lặp hiện tại nếu có lỗi
                continue; // Bỏ qua lần lặp hiện tại nếu có lỗi
    
            }
        }
    }
    async test(page: any ,link : any,){
      await page.goto(link,{
        waitUntil: 'networkidle2' // Đợi trang tải xong
    });
      console.log(link);
      const button1: string[] =[
        '.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Theo dõi"]',
        '.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xk50ysn.xzsf02u.x1yc453h',
        '.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Thêm bạn bè"]'
      ]

      try {
          console.log(await this.clickButton1(page,button1,0));
          // const money =await this.tds.api_get_money('FOLLOW',j.id);
          // // In dữ liệu trả về từ hàm api_get_money
          // console.log('Dữ liệu trả về:', JSON.stringify(money));
      }catch (error) {
          console.error("Đã xảy ra lỗi1:", error);
      } 

    }
    async runJobs(page: any ,jobs : any,){
      for(const [value, job] of Object.entries(jobs) ){
        switch (value) {
            case 'follow':
                await this.follow(page,job);
                break;
                
            case 'like':
                await this.like(page,job);
                break;
                
        //     // case 'likegiare':
        //     //     await interactfb.likegiare(page,apiResults[i]);
        //     //     break;
        //     // case 'likesieure':
        //     //     await interactfb.likesieure(page,apiResults[i]);
        //     //     break;
        //     // case 'reaction':
        //     //     await interactfb.reaction(page,apiResults[i]);
        //     //     break;
        //     // case 'comment':
        //     //     await interactfb.comment(page,apiResults[i]);
        //     //     break;
        //     // case 'share':
        //     //     await interactfb.share(page,apiResults[i]);
        //     //     break;
        //     // case 'reactcmt':
        //     //     await interactfb.reactcmt(page,apiResults[i]);
        //     //     break;
            
        //     default:
        //         console.log('Không có hành động nào được xác định cho giá trị');
        }
      }
    }

}
export default Facebook;