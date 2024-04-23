// import * as interact from '../interact-view/interact-facebook';
// import * as call from '../call-api/call-facebook';
// import * as api from '../api/facebook-api';
// import { token } from '../constants';
// export async function  facebook(page: any , key :any){
//     // const keys = Object.keys(apiResults);
//     // console.log(apiResults);
//     // console.log(keys);
//     // for(const i of keys ){
//         switch (key) {
//             case 'subcribe':
//                 const follow = await api.api_get_job('follow', token.TDS_token);
//                 console.log('ffffff',JSON.stringify(follow));
//                 await interact.follow(page,follow);
//                 break;
                
//             case 'like':
//                 for(let i =0 ; i<3; i++){
//                     const like = await api.api_get_job('like', token.TDS_token);
//                     console.log("xxxxxxxx"+JSON.stringify(like));
//                     await interact.like(page,like);
//                 }
                
//                 break;
                
//             // case 'likegiare':
//             //     await interact.likegiare(page,apiResults[i]);
//             //     break;
//             // case 'likesieure':
//             //     await interact.likesieure(page,apiResults[i]);
//             //     break;
//             // case 'reaction':
//             //     await interact.reaction(page,apiResults[i]);
//             //     break;
//             // case 'comment':
//             //     await interact.comment(page,apiResults[i]);
//             //     break;
//             // case 'share':
//             //     await interact.share(page,apiResults[i]);
//             //     break;
//             // case 'reactcmt':
//             //     await interact.reactcmt(page,apiResults[i]);
//             //     break;
            
//             default:
//                 console.log('Không có hành động nào được xác định cho giá trị');
//         }
//     // }
// }
