import axios from 'axios';
const fields=["facebook_reaction", "facebook_reactioncmt", "facebook_share", "facebook_follow", "facebook_page"]

export async function api_config_account(idfb: string, TDS_token: string): Promise<any> {
    try {
        const response = await axios.get(`https://traodoisub.com/api/?fields=run&id=${idfb}&access_token=${TDS_token}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data || 'Internal Server Error');
    }
}
export async function api_get_job(type: string, TDS_token: string): Promise<any> {
    try {
        const response = await axios.get(`https://traodoisub.com/api/?fields=${type}&access_token=${TDS_token}`);
        console.log(`https://traodoisub.com/api/?fields=${type}&access_token=${TDS_token}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data || 'Internal Server Error');
    }
}
import * as fs from 'fs';
import * as path from 'path';

class Logger {
    private logStream: fs.WriteStream;

    constructor(logFile: string = 'app.log') {
        const logDir = path.dirname(logFile);

        // Tạo thư mục chứa file log nếu chưa tồn tại
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        // Mở file log ở chế độ ghi thêm
        this.logStream = fs.createWriteStream(logFile, { flags: 'a' });
    }

    log(message: string): void {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}\n`;

        // Ghi vào file log
        this.logStream.write(logMessage);
    }

    close(): void {
        // Đóng luồng ghi khi không còn sử dụng
        this.logStream.end();
    }
}





export async function api_get_money(type: string, idfb: string,TDS_token: string): Promise<any> {
    try {
        
        const response = await axios.get(`https://traodoisub.com/api/coin/?type=${type}&id=${idfb}&&access_token=${TDS_token}`);
        console.log('GET MONEY: ',`https://traodoisub.com/api/coin/?type=${type}&id=${idfb}&&access_token=${TDS_token}`);
        if(response.data.error=="Thất bại! Bạn chưa like ID này!"){
            // Ví dụ sử dụng
            const logger = new Logger('logs/application.log');
            logger.log(`https://traodoisub.com/api/coin/?type=${type}&id=${idfb}&&access_token=${TDS_token}\n`)
            logger.close();
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data || 'Internal Server Error');
    }
}