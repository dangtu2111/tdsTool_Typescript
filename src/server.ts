import * as mainFacebook from './mainFacebook';
// import * as mainIntargram from './mainIntargram';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as controller from './controller';
import { account } from './constants';


puppeteer.use(StealthPlugin());

async function createBrowser(arrayOfValues: any) {
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
export async function standardizedData(resultsfb: any) {
    const part = {
        follow: Array.isArray(resultsfb.follow) ? resultsfb.follow : [], // Nếu follow không phải là một mảng, gán một mảng rỗng
        like: Array.isArray(resultsfb.like) ? resultsfb.like : [] // Tương tự cho like
    };
    return part;
}
export async function main(){
    const arrayOfValues = ['facebook0','facebook2'/*,'facebook2','facebook3','facebook4','facebook5','facebook5+1','facebook7'*/];
    const browsers = await createBrowser(arrayOfValues);
    const arrayOfValuesfb = ['like'];
    
    while (true) {
        const promises = [];
        const promises0 = [];
        const promises1 = [];

        
        for (const value of arrayOfValues) {
            console.log(account[value as keyof typeof account]);
            const promise = controller.getAllJob(arrayOfValuesfb, account[value as keyof typeof account]);
            promises1.push(promise);
        }
        const resultsfbArray = await Promise.all(promises1);
        for( let i = 0; i < arrayOfValues.length; i++){
            const resultsfb = resultsfbArray[i];
            const resultsfb1 = standardizedData(resultsfb);
            promises0.push(resultsfb1);
        }
        const resultsfbArray1 = await Promise.all(promises0);
        // Xử lý kết quả và gọi mainFacebook.main() cho mỗi value
        for (let i = 0; i < arrayOfValues.length; i++) {
            const value = arrayOfValues[i];
            const resultsfb = resultsfbArray1[i];
            console.log(value);
            console.log(resultsfb);
            promises.push(mainFacebook.main(browsers[value], resultsfb,value));
        }
        console.log('Running promises:', promises.length);
        await Promise.all(promises);

        // Add a delay to avoid rapid API calls
        await new Promise(resolve => setTimeout(resolve, 60000)); // Delay 60 seconds
    }
}
export async function main1(){
    const arrayOfValues = ['facebook0','facebook2'/*'facebook4','facebook5','facebook5+1','facebook7'*/];
    const browsers = await createBrowser(arrayOfValues);
    const arrayOfValuesfb = ['like'];
    
    while (true) {
        const promises = [];
        const promises0 = [];
        const promises1 = [];

        
        for (const value of arrayOfValues) {
            console.log(account[value as keyof typeof account]);
            const promise = controller.getAllJob(arrayOfValuesfb, account[value as keyof typeof account]);
            promises1.push(promise);
        }
        const resultsfbArray = await Promise.all(promises1);
        for( let i = 0; i < arrayOfValues.length; i++){
            const resultsfb = resultsfbArray[i];
            const resultsfb1 = standardizedData(resultsfb);
            promises0.push(resultsfb1);
        }
        const resultsfbArray1 = await Promise.all(promises0);
        // Xử lý kết quả và gọi mainFacebook.main() cho mỗi value
        for (let i = 0; i < arrayOfValues.length; i++) {
            const dividedResults = await Chia(resultsfbArray1[i], 2);
            const value = arrayOfValues[i];
            promises.push(mainFacebook.main1(browsers[value], dividedResults,value));
        }
        console.log('Running promises:', promises.length);
        await Promise.all(promises);

        // Add a delay to avoid rapid API calls
        await new Promise(resolve => setTimeout(resolve, 10000)); // Delay 60 seconds
    }
}
export async function main2(){
    const arrayOfValues = ['facebook0','facebook1'/*'facebook4','facebook5','facebook5+1','facebook7'*/];
    const browsers = await createBrowser(arrayOfValues);
    const arrayOfValuesfb = ['like'];
    
    while (true) {
        const promises = [];
        // Xử lý kết quả và gọi mainFacebook.main() cho mỗi value
        for (let i = 0; i < arrayOfValues.length; i++) {
            const value = arrayOfValues[i];
            promises.push(mainFacebook.main2(browsers[value], arrayOfValuesfb,value));
        }
        console.log('Running promises:', promises.length);
        await Promise.all(promises);

        // Add a delay to avoid rapid API calls
        await new Promise(resolve => setTimeout(resolve, 10000)); // Delay 60 seconds
    }
}
main2()
