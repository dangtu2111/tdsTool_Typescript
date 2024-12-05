
import delay from 'delay';
import Facebook from './facebook/facebook';

class FacebookAutomationManager  {
  private page: any;
  private facebook:Facebook;

  constructor(page: any,facebook:Facebook) {
    this.page = page;
    this.facebook=facebook;
  }
  
  async main(job: any,name:string) {
    // const page = await this.createPage(this.browser);
    // await this.facebook.login(page);
    // await controller.fillForm(page,'#email','#pass','button[value="1"]._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy','https://www.facebook.com/',account[accountName as keyof typeof account].email,account[accountName as keyof typeof account].password);

    await delay(2000);
    switch (name) {
      case 'follow':
          await this.facebook.follow(this.page,job);
          break;
      case 'like':
          await this.facebook.like(this.page,job);
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
  async test(link: any) {
    
    // await controller.fillForm(page,'#email','#pass','button[value="1"]._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy','https://www.facebook.com/',account[accountName as keyof typeof account].email,account[accountName as keyof typeof account].password);

    await delay(2000);
    await this.facebook.test(this.page,link)
    await delay(80000);
  }

  // async createSingleJob(arrayOfValuesfb: any, accountName: keyof typeof account) {
  //   const page = await this.createPage(this.browser);
    
  //   // await controller.loginCookie(page, account[accountName].cookie, 'https://www.facebook.com/');
  //   await this.fillForm(page,'#email','#pass','button[value="1"]._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy','https://www.facebook.com/',account[accountName as keyof typeof account].email,account[accountName as keyof typeof account].password);
  //   await delay(2000);
  //   await fb.facebook(page, arrayOfValuesfb, account[accountName]);
  //   await delay(5000);
  //   await page.close();
  //   return 'Hoàn thành';
  // }

  // async createJobs(arrayOfValuesfb: any[], accountName: keyof typeof account) {
  //   const promises = arrayOfValuesfb.map((value) =>
  //     this.createSingleJob(value, accountName)
  //   );
  //   console.log('Running promises:', promises.length);
  //   await Promise.all(promises);
  // }

  // async main1(results: any[], accountName: keyof typeof account) {
  //   const promises = results.map((result) =>
  //     this.createSingleJob(result, accountName)
  //   );
  //   console.log('Running promises:', promises.length);
  //   await Promise.all(promises);
  // }

  // async main2(arrayOfValuesfb: any[], accountName: keyof typeof account) {
  //   const promises = arrayOfValuesfb.map((value) =>
  //     this.createSingleJob(value, accountName)
  //   );
  //   console.log('Running promises:', promises.length);
  //   await Promise.all(promises);
  // }
}

export default FacebookAutomationManager;
