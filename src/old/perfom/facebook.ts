import * as interactfb from '../interact-view/interact-facebook';
import * as interactInta from '../interact-view/interact-intagram';

import * as controller from '../controller';

export async function  facebook(page: any ,jobs : any,account:any){
    for(const [value, job] of Object.entries(jobs) ){
        switch (value) {
            case 'follow':
                await interactfb.follow(page,job,account);
                break;
                
            case 'like':
                await interactfb.like(page,job,account);
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
export async function  facebook1(page: any ,arrayOfValuesfb : any,account:any){
    let result={
        init:'Da khoi tao',
    };
    while(result!=null){
        for(const value of  arrayOfValuesfb){
            result= await controller.getOneJob(value,account);
            console.log('job là : ',result)
            if(result!=null){
                switch (value) {
                    case 'follow':
                        await interactfb.follow(page,result,account);
                        break;
                        
                    case 'like':
                        await interactfb.like(page,result,account);
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
    
}
export async function  instagram(page: any ,arrayOfValuesfb : any,account:any){
    let result={
        init:'Da khoi tao',
    };
    while(result!=null){
        for(const value of  arrayOfValuesfb){
            result= await controller.getOneJob(value,account);
            if(result!=null){
                switch (value) {
                    case 'follow':
                        await interactInta.follow(page,result,account);
                        break;
                        
                    case 'like':
                        await interactInta.like(page,result,account);
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
    
}
