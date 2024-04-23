import * as interact from '../interact-view/interact-facebook';
import * as controller from '../controller';

export async function  facebook(page: any ,jobs : any,account:any){
    
    for(const [value, job] of Object.entries(jobs) ){
        switch (value) {
            case 'follow':
                await interact.follow(page,job,account);
                break;
                
            case 'like':
                await interact.like(page,job,account);
                break;
                
        //     // case 'likegiare':
        //     //     await interact.likegiare(page,apiResults[i]);
        //     //     break;
        //     // case 'likesieure':
        //     //     await interact.likesieure(page,apiResults[i]);
        //     //     break;
        //     // case 'reaction':
        //     //     await interact.reaction(page,apiResults[i]);
        //     //     break;
        //     // case 'comment':
        //     //     await interact.comment(page,apiResults[i]);
        //     //     break;
        //     // case 'share':
        //     //     await interact.share(page,apiResults[i]);
        //     //     break;
        //     // case 'reactcmt':
        //     //     await interact.reactcmt(page,apiResults[i]);
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
            if(result!=null){
                switch (value) {
                    case 'follow':
                        await interact.follow(page,result,account);
                        break;
                        
                    case 'like':
                        await interact.like(page,result,account);
                        break;
                        
                //     // case 'likegiare':
                //     //     await interact.likegiare(page,apiResults[i]);
                //     //     break;
                //     // case 'likesieure':
                //     //     await interact.likesieure(page,apiResults[i]);
                //     //     break;
                //     // case 'reaction':
                //     //     await interact.reaction(page,apiResults[i]);
                //     //     break;
                //     // case 'comment':
                //     //     await interact.comment(page,apiResults[i]);
                //     //     break;
                //     // case 'share':
                //     //     await interact.share(page,apiResults[i]);
                //     //     break;
                //     // case 'reactcmt':
                //     //     await interact.reactcmt(page,apiResults[i]);
                //     //     break;
                    
                //     default:
                //         console.log('Không có hành động nào được xác định cho giá trị');
                }
            }
            
        }
    }
    
}
