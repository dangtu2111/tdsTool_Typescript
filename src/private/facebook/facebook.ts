import type * as Puppeteer from 'puppeteer';
import TDS from '../TDS/TDS';

class Facebook {
  private url = 'https://www.facebook.com';
  constructor(
    private id: string,
    private email: string,
    private password: string,
    private cookie: string,
    private tds: TDS,
  ) {}

  parseCookieString(cookieString: string): Array<{ name: string; value: string }> {
    const cookiePairs = cookieString.split('; ');
    const cookies: Array<{ name: string; value: string }> = [];

    for (const pair of cookiePairs) {
      const [name, value] = pair.split('=');
      cookies.push({ name: name.trim(), value: value.trim() });
    }

    return cookies;
  }

  async login(page: Puppeteer.Page): Promise<void> {
    try {
      const cookies = this.parseCookieString(this.cookie);

      await page.goto(this.url, { waitUntil: 'networkidle2' });

      const oldCookies = await page.cookies();
      if (oldCookies.length > 0) {
        await page.deleteCookie(...oldCookies);
      }

      for (const cookie of cookies) {
        await page.setCookie(cookie);
      }

      await page.reload({ waitUntil: 'networkidle2' });

      await new Promise((resolve) => setTimeout(resolve, 3000));
      const pageCookies = await page.cookies();
    } catch (error) {
      console.error('Error during login execution:', error);
    }
  }

  async loginWithCookie(): Promise<void> {
    // Để trống vì chưa được triển khai
  }

  async getAllJob(jobs: string[]): Promise<{ [key: string]: any }> {
    const results: { [key: string]: any } = {};
    const lastValue = jobs[jobs.length - 1];

    for (const value of jobs) {
      try {
        const result = await this.getOneJob(value);
        results[value] = result;

        console.log(`Hoàn thành công việc cho: ${value}`);
        if (value !== lastValue) {
          console.log(`Đang chờ 60 giây trước khi tiếp tục...`);
          await new Promise((resolve) => setTimeout(resolve, 60000));
        }
      } catch (error) {
        console.error(`Lỗi khi xử lý công việc cho: ${value}`, error);
        results[value] = { error: error instanceof Error ? error.message : error };
      }
    }

    console.log('Kết quả cuối cùng:', results);
    return results;
  }

  async getOneJob(type: string): Promise<any> {
    const result = await this.tds.api_get_job_fb(type);

    if (typeof result.error !== 'undefined') {
      console.log('Tồn tại error:', result.error);
      if (result.error === 'Thao tác quá nhanh vui lòng chậm lại') {
        return 1;
      }
      return 0;
    }
    return result;
  }
  async clickXpath(page: Puppeteer.Page, xpath: string): Promise<boolean> {
    try {
      const clicked = await page.evaluate((xpathExpression: string) => {
        const element = document.evaluate(
          xpathExpression,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        ).singleNodeValue;

        if (element) {
          (element as HTMLElement).click();
          return true;
        }
        return false;
      }, xpath);

      return clicked;
    } catch (error) {
      console.error('Error in clickXpath:', error);
      return false;
    }
  }

  async clickButton1(page: Puppeteer.Page, button: string[], buttonDefault: number): Promise<boolean> {
    try {
      const buttonSelector = button[buttonDefault];
      const buttonActive = await page.$$(buttonSelector);

      if (buttonActive.length > 0) {
        console.log(`Tìm thấy nút: ${buttonSelector}, đang xử lý...`);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        for (const [index, btn] of buttonActive.entries()) {
          await page.evaluate((el: Element) => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), btn);
          await new Promise((resolve) => setTimeout(resolve, 1500));

          const isVisible = await page.evaluate((el: Element) => {
            const rect = el.getBoundingClientRect();
            return (
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
              rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
          }, btn);

          const isClickable = await page.evaluate((el: Element) => {
            const style = getComputedStyle(el);
            const isDisabled = 'disabled' in el && (el as HTMLButtonElement).disabled;
            return (
              !isDisabled &&
              style.pointerEvents !== 'none' &&
              style.visibility !== 'hidden' &&
              parseFloat(style.opacity) > 0
            );
          }, btn);

          if (isVisible && isClickable) {
            try {
              await btn.click();
              await new Promise((resolve) => setTimeout(resolve, 500));
              return true;
            } catch (clickError) {
              console.error(`Lỗi khi click vào nút ${index + 1}:`, clickError);
            }
          } else {
            console.log(`Nút ${index + 1} không hiển thị hoặc không khả dụng.`);
          }
        }
        return true;
      } else {
        console.log(`Không tìm thấy nút: ${buttonSelector}`);
      }

      if (buttonDefault < button.length - 1) {
        return await this.clickButton1(page, button, buttonDefault + 1);
      }

      console.log('Không có nút nào phù hợp.');
      return false;
    } catch (error) {
      console.error('Lỗi khi xử lý nút:', error);
      if (buttonDefault < button.length - 1) {
        return await this.clickButton1(page, button, buttonDefault + 1);
      }
      return false;
    }
  }

  async follow(page: Puppeteer.Page, input: Array<any>): Promise<void> {
    console.log('Đã vào follow');
    for (const j of input) {
      await page.goto(`https://www.facebook.com/${j.id}`, { waitUntil: 'networkidle2' });
      console.log(`https://www.facebook.com/${j.id}`);

      const button1: string[] = [
        '.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Theo dõi"]',
        '.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Thêm bạn bè"]',
        '.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Thích"]',
      ];

      try {
        let resultButton = await this.clickButton1(page, button1, 0);
        console.log(resultButton);
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        if (resultButton) {
          const money = await this.tds.api_get_money('facebook_follow_cache', j.code);
          console.log('Dữ liệu trả về:', JSON.stringify(money));
        }
      } catch (error) {
        const money = await this.tds.api_get_money('facebook_follow', 'facebook_api');
        console.log('nHẬN XU :', JSON.stringify(money));
        console.error('Đã xảy ra lỗi1:', error);
        continue;
      }
    }
    const money = await this.tds.api_get_money('facebook_follow', 'facebook_api');
    console.log('nHẬN XU :', JSON.stringify(money));
  }

  async clickButtonUrl(page: Puppeteer.Page): Promise<boolean> {
    try {
      // Kiểm tra xem trang có bị đóng không
      if (page.isClosed()) {
        console.log('Trang đã bị đóng trước khi thao tác');
        return false;
      }

      const link = page.url();
      console.log('URL hiện tại:', link);

      // Đợi trang tải xong
      await page.waitForNetworkIdle({ idleTime: 1000, timeout: 30000 });

      const regexPost = /^https:\/\/www\.facebook\.com\/([a-zA-Z0-9.]+)\/posts\/([a-zA-Z0-9]+)$/;
      const regexVideo = /^https:\/\/www\.facebook\.com\/watch\/\?v=\d+$/;
      const regexPhoto = /^https:\/\/www\.facebook\.com\/photo\/\?fbid=\d+&set=a\.\d+$/;

      const buttonSelector =
        '.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label="Thích"]';

      // Đợi nút "Thích" xuất hiện
      console.log('Đang đợi nút Thích...');
      await page.waitForSelector(buttonSelector, { timeout: 15000 });

      if (link.match(regexPost)) {
        const buttonActive = await page.$$(buttonSelector);
        console.log('Số nút Thích tìm thấy (post):', buttonActive.length);
        if (buttonActive.length > 1) {
          await buttonActive[1].click();
          console.log('Click thành công vào nút Thích (post).');
          return true;
        } else {
          console.log('Không đủ phần tử nút Thích cho bài post');
          return false;
        }
      } else if (link.match(regexVideo) || link.match(regexPhoto)) {
        const buttonActive = await page.$$(buttonSelector);
        console.log('Số nút Thích tìm thấy (video/photo):', buttonActive.length);
        if (buttonActive.length > 0) {
          await buttonActive[0].click();
          console.log('Click thành công vào nút Thích (video/photo).');
          return true;
        } else {
          console.log('Không tìm thấy nút Thích cho video/photo');
          return false;
        }
      } else {
        console.log('URL không hợp lệ:', link);
        return false;
      }
    } catch (error) {
      console.error('Lỗi khi xử lý nút:', error);
      return false;
    }
  }

  async regexMatch(page: Puppeteer.Page, regex: string, button: string): Promise<string | number> {
    try {
      const link = page.url();
      const match = link.match(regex);
      if (match) {
        const buttonActive = await page.$$(button);
        await buttonActive[1].click();
        console.log('Click thành công.');
        return 1;
      } else {
        console.log('URL không hợp lệ');
        return 0;
      }
    } catch (error) {
      console.error('Lỗi khi xử lý nút:', error);
      return 'Đã xảy ra lỗi';
    }
  }
  async translateEmotion(emotion: string) {
    switch (emotion) {
      case 'LIKE':
        return 'Thích';
      case 'LOVE':
        return 'Yêu thích';
      case 'WOW':
        return 'Wow';
      case 'HAHA':
        return 'Haha';
      case 'ANGRY':
        return 'Phẫn nộ';
      case 'SAD':
        return 'Buồn';
      case 'CARE':
        return 'Thương thương';
      default:
        return 'Trạng thái không xác định';
    }
  }

  async clickButton2(page: Puppeteer.Page, button: string[], buttonDefault: number, type: string): Promise<boolean> {
    try {
      if (page.isClosed()) {
        console.log('Trang đã bị đóng trước khi thao tác');
        return false;
      }
  
      const TIMEOUT = 3000;
      const DELAY = 1000;
  
      // Kiểm tra xem có nút nào tồn tại trong danh sách button không
      let buttonSelector = '';
      let buttonActive: Puppeteer.ElementHandle[] = [];
      for (let i = buttonDefault; i < button.length; i++) {
        buttonSelector = button[i];
        try {
          await page.waitForSelector(buttonSelector, { timeout: TIMEOUT });
          buttonActive = await page.$$(buttonSelector);
          if (buttonActive.length > 0) {
            // console.log(`Tìm thấy ${buttonActive.length} nút với selector: ${buttonSelector}`);
            break; // Thoát vòng lặp nếu tìm thấy nút
          }
        } catch (error) {
          console.log(`Không tìm thấy nút với selector: ${buttonSelector}`);
          continue; // Thử selector tiếp theo
        }
      }
      const currentUrl = await page.url();
      const regexGroupPost = /^https:\/\/www\.facebook\.com\/groups\/(\d+)\/posts\/(\d+)/;
      const regexUsernamePost = /^https:\/\/www\.facebook\.com\/[^\/]+\/posts\/[a-zA-Z0-9]+$/;
      const regexPermalink = /^https:\/\/www\.facebook\.com\/permalink\.php\?story_fbid=([^&]+)&id=([^&]+)/;

      if (currentUrl.match(regexGroupPost)||currentUrl.match(regexPermalink)||currentUrl.match(regexUsernamePost)) {
        if (buttonActive.length >= 2) {
          buttonActive = buttonActive.slice(1); // Bỏ nút đầu tiên (index 0)
          console.log(`Đã bỏ nút đầu tiên, còn lại ${buttonActive.length} nút để xử lý`);
        }
      }
      https://www.facebook.com/groups/1116494126903395/posts/1116494910236650/
      // Nếu tìm thấy 2 nút trở lên, bỏ nút đầu tiên
      
      if (buttonActive.length === 0) {
        console.log('Không tìm thấy nút nào trong danh sách selector');
        return false;
      }
  
      const typeResult = await this.translateEmotion(type);
      console.log('type:', type, typeResult);
      const targetSelectors = [
        `.x1i10hfl.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.xdl72j9.x2lah0s.xe8uvvx.xdj266r.xat24cr.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x5hsz1j.x10e4vud.x1v7wizp.xif3mjy.x4hg4is.x1ypdohk.x78zum5.xw3qccf.xsgj6o6.x1n2onr6[aria-label="${typeResult}"]`,
        `.x1i10hfl.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label="${typeResult}"]`,
        `.x1i10hfl.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.xdl72j9.x2lah0s.xe8uvvx.xdj266r.xat24cr.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x5hsz1j.x10e4vud.x1v7wizp.xif3mjy.x4hg4is.x1ypdohk.x78zum5.xw3qccf.xsgj6o6.x1n2onr6.x5ve5x3[aria-label="${typeResult}"]`
        
      ];
  
  
      let success = false;
  
      // Lặp qua tất cả các buttonActive
      for (const buttonElement of buttonActive) {
        try {
          // Cuộn đến phần tử
          await page.evaluate((el) => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
          }, buttonElement);
  
          await new Promise(resolve => setTimeout(resolve, 500));
  
          // Kích hoạt hover
          await page.evaluate((el) => {
            const rect = el.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
  
            const fireEvent = (type: string, EventClass: typeof MouseEvent | typeof PointerEvent) => {
              const event = new EventClass(type, {
                bubbles: true,
                composed: true,
                cancelable: true,
                clientX: x,
                clientY: y,
                screenX: x,
                screenY: y,
              });
              el.dispatchEvent(event);
            };
  
            fireEvent('pointerover', PointerEvent);
            fireEvent('mouseover', MouseEvent);
            fireEvent('mouseenter', MouseEvent);
          }, buttonElement);
  
          await new Promise(resolve => setTimeout(resolve, 500));
  
          // Kiểm tra từng targetSelector để tìm nút cảm xúc tồn tại
          let targets: Puppeteer.ElementHandle[] = [];
          for (const targetSelector of targetSelectors) {
            try {
              await page.waitForSelector(targetSelector, { timeout: 500, visible: true });
              targets = await page.$$(targetSelector);
              if (targets.length > 0) {
                console.log(`Tìm thấy ${targets.length} nút cảm xúc với ${targetSelector}`);
                break;
              }
            } catch (error) {
              console.log(`Không tìm thấy nút cảm xúc với ${targetSelector}`);
              continue;
            }
          }
  
          if (targets.length === 0) {
            console.log('Không tìm thấy nút cảm xúc nào trong danh sách targetSelectors');
            continue;
          }
  
          // Lặp qua tất cả các target để click nút có thể click
          for (const target of targets) {
            try {
              await page.evaluate((el) => {
                el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
              }, target);
  
              await new Promise(resolve => setTimeout(resolve, 500));
  
              await target.click();
              console.log(`Đã click vào cảm xúc ${typeResult} cho nút ${buttonSelector}`);
              success = true;
              break; // Thoát vòng lặp target sau khi click thành công
  
            } catch (targetError) {
              console.error(`Lỗi khi click phần tử cảm xúc:`, targetError);
              continue;
            }
          }
  
          await page.evaluate((el) => {
            const rect = el.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
  
            const fireEvent = (type: string, EventClass: typeof MouseEvent | typeof PointerEvent) => {
              const event = new EventClass(type, {
                bubbles: true,
                composed: true,
                cancelable: true,
                clientX: x,
                clientY: y,
                screenX: x,
                screenY: y,
              });
              el.dispatchEvent(event);
            };
  
            fireEvent('pointerout', PointerEvent);
            fireEvent('mouseout', MouseEvent);
            fireEvent('mouseleave', MouseEvent);
          }, buttonElement);
          if(success){
            console.log('Da click !!!!!!!!!!!!!!!!!!!!!!!!');
            break;
          }
  
        } catch (innerError) {
          await page.evaluate((el) => {
            const rect = el.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
  
            const fireEvent = (type: string, EventClass: typeof MouseEvent | typeof PointerEvent) => {
              const event = new EventClass(type, {
                bubbles: true,
                composed: true,
                cancelable: true,
                clientX: x,
                clientY: y,
                screenX: x,
                screenY: y,
              });
              el.dispatchEvent(event);
            };
  
            fireEvent('pointerout', PointerEvent);
            fireEvent('mouseout', MouseEvent);
            fireEvent('mouseleave', MouseEvent);
          }, buttonElement);
          console.error(`Lỗi khi xử lý nút ${buttonSelector}:`, innerError);
          continue;
        }
      }
  
      return success;
  
    } catch (error) {
      console.error('Lỗi khi xử lý nút:', error);
      if (buttonDefault < button.length - 1) {
        console.log('Thử selector tiếp theo...');
        return await this.clickButton2(page, button, buttonDefault + 1, type);
      }
      return false;
    }
  }
  async like(page: Puppeteer.Page, input: Array<any>): Promise<void> {
    for (const j of input) {
      try {
        // Truy cập URL
        const url = `https://www.facebook.com/${j.id}`;
        console.log('Đang truy cập:', url);

        // Kiểm tra trạng thái trang trước khi tải
        if (page.isClosed()) {
          console.log('Trang đã bị đóng, không thể tiếp tục');
          continue;
        }
        // Thử tải URL với timeout
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

        // Định nghĩa danh sách các selector
        const button1: string[] = [
          '.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x5ve5x3[aria-label="Thích"]',
          '.x1i10hfl.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x78zum5.x1iyjqo2.x2lah0s.xl56j7k.x5ve5x3[aria-label="Thích"]',
        ];

        // Thực hiện click vào nút đầu tiên trong danh sách
        const resultButton = await this.clickButton2(page, button1, 0, j.type);
        console.log('Kết quả click:', resultButton);

        if (resultButton) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          const money = await this.tds.api_get_money('facebook_reaction', j.code);
          console.log('Dữ liệu trả về:', JSON.stringify(money));
        } else {
          console.log('Click không thành công');
        }
      } catch (error) {
        console.error('Đã xảy ra lỗi trong quá trình like:', error);
        continue; // Tiếp tục với ID tiếp theo nếu có lỗi
      }
    }
  }
  public getId(): string {
    return this.id;
  }
  async test(page: Puppeteer.Page, link: string): Promise<void> {
    if (!page) {
      console.error('Page is undefined in test method');
      return;
    }
    await page.goto(link, { waitUntil: 'networkidle2' });
    console.log(link);

    const button1: string[] = [
      '.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Theo dõi"]',
      '.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xk50ysn.xzsf02u.x1yc453h',
      '.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3[aria-label="Thêm bạn bè"]',
    ];

    try {
      console.log(await this.clickButton1(page, button1, 0));
    } catch (error) {
      console.error('Đã xảy ra lỗi1:', error);
    }
  }

  async runJobs(page: Puppeteer.Page, jobs: { [key: string]: Array<{ id: string; code: string }> }): Promise<void> {
    for (const [value, job] of Object.entries(jobs)) {
      switch (value) {
        case 'follow':
          await this.follow(page, job);
          break;
        case 'like':
          await this.like(page, job);
          break;
        default:
          console.log('Không có hành động nào được xác định cho giá trị:', value);
      }
    }
  }
}

export default Facebook;
