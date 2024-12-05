import * as fb from './perfom/facebook';
import * as controller from './controller';
import delay from 'delay';
import { account } from './constants';

class FacebookAutomationManager {
  private browser: any;

  constructor(browser: any) {
    this.browser = browser;
  }

  async main(results: any, accountName: keyof typeof account) {
    const page = await controller.createPage(this.browser);
    await controller.loginCookie(page, account[accountName].cookie, 'https://www.facebook.com/login');
    // await controller.fillForm(page,'#email','#pass','button[value="1"]._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy','https://www.facebook.com/',account[accountName as keyof typeof account].email,account[accountName as keyof typeof account].password);

    await delay(2000);
    console.log("job: ",results);
    await fb.facebook(page, results, account[accountName]);
    await delay(80000);
  }

  async createSingleJob(arrayOfValuesfb: any, accountName: keyof typeof account) {
    const page = await controller.createPage(this.browser);
    
    // await controller.loginCookie(page, account[accountName].cookie, 'https://www.facebook.com/');
    await controller.fillForm(page,'#email','#pass','button[value="1"]._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy','https://www.facebook.com/',account[accountName as keyof typeof account].email,account[accountName as keyof typeof account].password);
    await delay(2000);
    await fb.facebook(page, arrayOfValuesfb, account[accountName]);
    await delay(5000);
    await page.close();
    return 'Hoàn thành';
  }

  async createJobs(arrayOfValuesfb: any[], accountName: keyof typeof account) {
    const promises = arrayOfValuesfb.map((value) =>
      this.createSingleJob(value, accountName)
    );
    console.log('Running promises:', promises.length);
    await Promise.all(promises);
  }

  async main1(results: any[], accountName: keyof typeof account) {
    const promises = results.map((result) =>
      this.createSingleJob(result, accountName)
    );
    console.log('Running promises:', promises.length);
    await Promise.all(promises);
  }

  async main2(arrayOfValuesfb: any[], accountName: keyof typeof account) {
    const promises = arrayOfValuesfb.map((value) =>
      this.createSingleJob(value, accountName)
    );
    console.log('Running promises:', promises.length);
    await Promise.all(promises);
  }
}

export default FacebookAutomationManager;
