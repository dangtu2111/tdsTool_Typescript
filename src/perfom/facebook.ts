import * as interact from '../interact-view/interact-facebook';
import * as call from '../call-api/call-facebook';
import * as api from '../api/facebook-api';
import { token } from '../constants';
export async function  facebook(page: any ,jobs : any){
    for(const [value, job] of Object.entries(jobs) ){
        switch (value) {
            case 'follow':
                await interact.follow(page,job);
                break;
                
            case 'like':
                await interact.like(page,job);
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
