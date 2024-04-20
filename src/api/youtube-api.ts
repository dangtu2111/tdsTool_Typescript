import axios from 'axios';


export async function api_config_account(idIg: string, TDS_token: string): Promise<any> {
    try {
        const response = await axios.get(`https://traodoisub.com/api/?fields=instagram_run&id=${idIg}&access_token=${TDS_token}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data || 'Internal Server Error');
    }
}
export async function api_get_job(type: string, TDS_token: string): Promise<any> {
    try {
        const response = await axios.get(`https://traodoisub.com/api/?fields=${type}&access_token=${TDS_token}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data || 'Internal Server Error');
    }
}
export async function api_submit_task_approval(idIg : String ,type: string, TDS_token: string): Promise<any> {
    try {
        const response = await axios.get(`https://traodoisub.com/api/coin/?type=${type}&id=${idIg}&access_token=${TDS_token}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data || 'Internal Server Error');
    }
}
export async function api_get_money(type: string, idfb: string,TDS_token: string): Promise<any> {
    try {
        const response = await axios.get(`https://traodoisub.com/api/coin/?type=${type}&id=${idfb}&&access_token=${TDS_token}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data || 'Internal Server Error');
    }
}