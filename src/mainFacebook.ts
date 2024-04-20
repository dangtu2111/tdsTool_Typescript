
import * as fb from './perfom/facebook';
import * as controller from './controller';
import { account } from './constants';
import delay from 'delay';


export async function main(browser : any,results:any,arrayOfValues:any){
   // Danh sách các giá trị
   
   // , 'likegiare', 'likesieure', 'reaction', 'comment', 'share', 'reactcmt', 'group', 'page'

  const page = await controller.createPage(browser);
    // await controller.fillForm(pages[0],'#email','#pass','button[value="1"]._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy','https://www.facebook.com/',account.email,account.password);
    await controller.loginCookie(page,account.cookie);
    await delay(2000);
    await fb.facebook(page,results);
    await delay(80000);
    // results = await controller.getAllJob(arrayOfValues);
 
    
    
            // In dữ liệu trả về từ hàm api_get_money
    
        
}
