import * as mainFacebook from './mainFacebook';
import * as mainIntargram from './mainIntargram';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as controller from './controller';


puppeteer.use(StealthPlugin());

async function login(arrayOfValues: any) {
    const browsers: { [key: string]: any } = {};
    let x = 0;
    let y = 0;
    let h = 300;
    let w = 300; 
    for (let value of arrayOfValues) {
        const browser = await puppeteer.launch({ 
            headless: false,
            args: [`--window-size=${w},${w}`, `--window-position=${x},${y}`] 
        });
         
        browsers[value] = browser;
        x=x+310;
        if(x > 1024){
            x=0;
            y=y+300;
        }
    }

    return browsers;
}
export async function Chia(resultsfb: any, num: number) {
    const dividedResults: any[] = [];

    // Lặp qua số lần chia và tạo các phần tương ứng
    for (let i = 0; i < num; i++) {
        const part = {
            follow: Array.isArray(resultsfb.follow) ? resultsfb.follow.slice(i * Math.ceil(resultsfb.follow.length / num), (i + 1) * Math.ceil(resultsfb.follow.length / num)) : [], // Nếu follow không phải là một mảng, gán một mảng rỗng
            like: Array.isArray(resultsfb.like) ? resultsfb.like.slice(i * Math.ceil(resultsfb.like.length / num), (i + 1) * Math.ceil(resultsfb.like.length / num)) : [] // Tương tự cho like
        };
        // Đẩy phần vừa chia vào mảng
        dividedResults.push(part);
    }

    // Trả về mảng các phần đã chia
    return dividedResults;
}
// export async function main(){
//     const arrayOfValues = ['facebook','facebook1'];
//     const browsers = await login(arrayOfValues);
//     const arrayOfValuesfb = ['follow','like'];
//     const resultsfb = await controller.getAllJob(arrayOfValuesfb);
//     // const arrayOfValuesIntar = ['instagram_like'];
//     const dividedResults= await Chia(resultsfb,arrayOfValues.length);
//     const promises = [];
//     let ii=0;
//     for (const [value, browser] of Object.entries(browsers)) {
//         console.log(value);
//         // switch (value){
//         //     case 'facebook':
//         //         mainFacebook.main(browser,combinedArray[ii],arrayOfValuesfb);
//         //         ii++;
//         //         break;
//         //     // case 'intargram':
//         //     //     mainIntargram.main(browser,resultsIntar,arrayOfValuesIntar);
//         //     //     break;
//         // }
//         console.log(dividedResults[ii]);
//         promises.push(mainFacebook.main(browser, dividedResults[ii], arrayOfValuesfb));
//         ii++;
//     }
//     console.log('xádfasdfasdfasdf',promises);
    
//     while(1==1){
//         const resultsfb = await controller.getAllJob(arrayOfValuesfb);
//         const dividedResults= await Chia(resultsfb,arrayOfValues.length);
//         for(const promise of promises){
//             promises.push(mainFacebook.main(browser, dividedResults[ii], arrayOfValuesfb));
//         }
//         await Promise.all(promises);
//     }
    
// }
export async function main(){
    const arrayOfValues = ['facebook'/*,'facebook1','facebook2','facebook3','facebook4','facebook5','facebook5+1','facebook7'*/];
    const browsers = await login(arrayOfValues);
    const arrayOfValuesfb = ['follow'];
    
    while (true) {
        const resultsfb = await controller.getAllJob(arrayOfValuesfb);
        const dividedResults = await Chia(resultsfb, arrayOfValues.length);

        const promises = [];
        let ii = 0;

        for (const [value, browser] of Object.entries(browsers)) {
            console.log(value);
            console.log(dividedResults[ii]);
            promises.push(mainFacebook.main(browser, dividedResults[ii], arrayOfValuesfb));
            ii++;
        }

        console.log('Running promises:', promises.length);
        await Promise.all(promises);

        // Add a delay to avoid rapid API calls
        await new Promise(resolve => setTimeout(resolve, 60000)); // Delay 60 seconds
    }
}
main();
