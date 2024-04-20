import{ token } from  '../constants';
import{ account } from  '../constants';
import * as api from '../api/facebook-api';
import * as interact from '../interact-view/interact-facebook';

function delay(ms: number | undefined) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function  call() {
    const config = await api.api_config_account(account.idfb, token.TDS_token);
    if(config.success){
      console.log('config success');
    }
    const values = ['like','follow', 'likegiare', 'likesieure', 'reaction', 'comment', 'share', 'reactcmt', ];
    const apiResults: {[key: string]: any} = {};
    
    for(const i of  values){
        try {
            await new Promise(resolve => {
                setTimeout(resolve, 1000);
            });
            const result = await api.api_get_job(i, token.TDS_token);
            apiResults[i] = result; // Lưu kết quả vào đối tượng với key là giá trị từ values
        } catch (error) {
            console.error(`Lỗi khi gọi API cho giá trị ${i}:`, error);
            // Bạn có thể xử lý lỗi ở đây nếu cần
        }
    }
    console.log(apiResults);
    return apiResults;

}
