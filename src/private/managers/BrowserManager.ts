import puppeteer, { Browser, Page } from 'puppeteer';

class BrowserManager {
  private browsers: Map<string, Browser> = new Map();
  private proxyAuthMap: Map<string, { username: string; password: string }> = new Map();

  // Tạo trình duyệt cho từng tài khoản và lưu vào Map
  async createBrowsers(accounts: { username: string }[], proxies: string[] = []): Promise<void> {
    const browserPromises = accounts.map(async (account, index) => {
      const browserArgs: string[] = [
        '--no-sandbox',              // Bỏ sandbox để chạy trên server
        '--disable-setuid-sandbox',  // Tắt sandbox bổ sung
        '--disable-dev-shm-usage',   // Tránh lỗi bộ nhớ dùng chung
        '--disable-gpu',             // Tắt GPU trong chế độ không đầu
        '--disable-software-rasterizer', // Tối ưu cho không đầu
        `--remote-debugging-port=${9222 + index}`, // Cổng khác nhau cho mỗi instance
      ];

      let proxyAuth = null;

      if (proxies.length > 0) {
        const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
        const [ip, port, user, pass] = randomProxy.split(':');

        if (!ip || !port || !user || !pass) {
          console.error(`Invalid proxy format for ${randomProxy}. Expected: ip:port:user:pass`);
          return; // Bỏ qua nếu proxy không hợp lệ
        }

        browserArgs.push(`--proxy-server=${ip}:${port}`);
        proxyAuth = { username: user, password: pass };
        this.proxyAuthMap.set(account.username, proxyAuth);
      }

      try {
        console.log(`Launching browser for ${account.username}...`);
        const browser = await puppeteer.launch({
          headless: true, // Chạy không đầu để không cần GUI
          defaultViewport: { width: 1280, height: 720 }, // Kích thước mặc định
          args: browserArgs,
          executablePath: '/usr/bin/chromium-browser',
        });

        const page = await browser.newPage();

        if (proxyAuth) {
          await page.authenticate(proxyAuth);
        }

        this.browsers.set(account.username, browser);
        console.log(`Browser for ${account.username} launched successfully.`);
      } catch (error) {
        console.error(`Failed to launch browser for ${account.username}:`, error);
      }
    });

    // Chạy tất cả các instance song song
    await Promise.all(browserPromises);
  }

  // Lấy trình duyệt theo tên
  getBrowser(name: string): Browser | undefined {
    return this.browsers.get(name);
  }

  // Đóng tất cả trình duyệt
  async closeAllBrowsers(): Promise<void> {
    const closePromises = Array.from(this.browsers.values()).map(async (browser) => {
      try {
        await browser.close();
      } catch (error) {
        console.error('Error closing browser:', error);
      }
    });

    await Promise.all(closePromises);
    this.browsers.clear();
    this.proxyAuthMap.clear();
  }

  // Tạo trang mới trên trình duyệt đã chọn
  async createPage(browserName: string): Promise<Page | undefined> {
    const browser = this.getBrowser(browserName);
    if (!browser) {
      console.error(`Browser with name ${browserName} not found`);
      return undefined;
    }

    try {
      const page = await browser.newPage();
      const proxyAuth = this.proxyAuthMap.get(browserName);

      if (proxyAuth) {
        await page.authenticate(proxyAuth);
      }

      // Cấu hình page
      await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US' });
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
      );
      await page.setJavaScriptEnabled(true); // Mặc định đã bật, có thể bỏ dòng này

      return page;
    } catch (error) {
      console.error(`Error creating page for ${browserName}:`, error);
      return undefined;
    }
  }
}

export default BrowserManager;