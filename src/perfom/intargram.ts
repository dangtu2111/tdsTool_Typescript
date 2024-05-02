import * as interactfb from '../interact-view/interact-facebook';
import * as interactInta from '../interact-view/interact-intagram';

import * as controller from '../controller';


export async function  instagram(page: any ,arrayOfValuesfb : any,account:any){
    let result={
        init:'Da khoi tao',
    };
    while(result!=null){
        for(const value of  arrayOfValuesfb){
            result= await controller.getOneJob(value,account);
            if(result!=null){
                if ('data' in result) {
                    // Thực hiện các hành động liên quan đến thuộc tính data ở đây
                    const data = result.data;
                switch (value) {
                    case 'instagram_follow':
                        await interactInta.follow(page,data,account);
                        break;
                        
                    case 'instagram_like':
                        if(await interactInta.like(page,data,account) === null){
                            return null;
                        }
                        
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
            } else {
                console.log('data khong tra ve ');
              }
            }
            
        }
    }
    
}
