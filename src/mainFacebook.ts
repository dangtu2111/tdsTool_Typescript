
import * as fb from './perfom/facebook';
import * as controller from './controller';
import delay from 'delay';
import { account } from './constants';
export async function main(browser : any,results:any, accountName : any){
   // Danh sách các giá trị
   
   // , 'likegiare', 'likesieure', 'reaction', 'comment', 'share', 'reactcmt', 'group', 'page'

     const page = await controller.createPage(browser);
    // await controller.fillForm(page,'#email','#pass','button[value="1"]._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy','https://www.facebook.com/',account[accountName as keyof typeof account].email,account[accountName as keyof typeof account].password);
    await controller.loginCookie(page,account[accountName as keyof typeof account].cookie,'https://www.facebook.com/login');
    await delay(2000);
    await fb.facebook(page,results,account[accountName as keyof typeof account]);
    await delay(80000);
    // results = await controller.getAllJob(arrayOfValues);
 
    
    
            // In dữ liệu trả về từ hàm api_get_money
    
        
}
export async function create1(browser : any,arrayOfValuesfb:any, accountName : any){
  const page = await controller.createPage(browser);
  // await controller.fillForm(page,'#email','#pass','button[value="1"]._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy','https://www.facebook.com/',account[accountName as keyof typeof account].email,account[accountName as keyof typeof account].password);
  await controller.loginCookie(page,account[accountName as keyof typeof account].cookie,'https://www.facebook.com/');
  await delay(2000);
  await fb.facebook(page,arrayOfValuesfb,account[accountName as keyof typeof account]);
  await delay(5000);
  page.close();
  return 'Hoan thanh';
}
export async function create(browser : any,arrayOfValuesfb:any, accountName : any){
    const page = await controller.createPage(browser);
    // await controller.fillForm(page,'#email','#pass','button[value="1"]._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy','https://www.facebook.com/',account[accountName as keyof typeof account].email,account[accountName as keyof typeof account].password);
    await controller.loginCookie(page,account[accountName as keyof typeof account].cookie,'https://www.facebook.com/');
    await delay(2000);
    await fb.facebook1(page,arrayOfValuesfb,account[accountName as keyof typeof account]);
    await delay(5000);
    page.close();
    return 'Hoan thanh';
}
export async function main1(browser : any,results:any, accountName : any){
  // Danh sách các giá trị
  
  // , 'likegiare', 'likesieure', 'reaction', 'comment', 'share', 'reactcmt', 'group', 'page'
  const promises = [];
  for(const result of results){
    promises.push(create(browser,result,accountName));
  }
  console.log('Running promises:', promises.length);
  await Promise.all(promises);
   // results = await controller.getAllJob(arrayOfValues);
       
}
export async function main2(browser : any,arrayOfValuesfb:any, accountName : any){
  // Danh sách các giá trị
  
  // , 'likegiare', 'likesieure', 'reaction', 'comment', 'share', 'reactcmt', 'group', 'page'
  const promises = [];
  for(const result of arrayOfValuesfb){
    promises.push(create(browser,arrayOfValuesfb,accountName));
  }
  console.log('Running promises:', promises.length);
  await Promise.all(promises);
   // results = await controller.getAllJob(arrayOfValues);
       
}
