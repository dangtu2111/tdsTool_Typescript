import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as fs from 'fs';
import * as path from 'path';

class TDS {
    private axiosInstance: AxiosInstance;

    constructor(
        private token: string,
        private username: string,
        private password: string
    ) {
        // Khởi tạo axiosInstance với cấu hình mặc định
        this.axiosInstance = axios.create({
            baseURL: 'https://traodoisub.com/api/',
            timeout: 5000, // Thời gian timeout
            headers: {
            },
        });
    }
    public getUsername(): string {
        return this.username;
      }
    /**
     * Lấy danh sách công việc từ Traodoisub.
     * @param type Loại công việc (vd: "facebook_reaction")
     * @returns Dữ liệu công việc hoặc lỗi
     */
    async api_get_job_fb(type: string): Promise<any> {
        const url = `?fields=${type}&access_token=${this.token}`;
    
        try {
            console.log(`Đang gửi yêu cầu đến API với URL: ${url}`);
            const response: AxiosResponse<any> = await this.axiosInstance.get(url);
        
            if(response.data.error=='Thao tác quá nhanh vui lòng chậm lại'){
                await new Promise(resolve => setTimeout(resolve, response.data.countdown *1000));
                this.api_get_job_fb(type);
            }
            return response.data;
        } catch (error: any) {
            console.error("Lỗi khi gọi API:", error.message);
            
            // Kiểm tra lỗi timeout và thử retry nếu cần
            if (error.code === 'ECONNABORTED') {
                console.warn("Yêu cầu bị timeout. Thử lại...");
                try {
                    const retryResponse: AxiosResponse<any> = await this.axiosInstance.get(url);
                    console.log("Dữ liệu trả về sau retry: ", retryResponse.data);
                    return retryResponse.data;
                } catch (retryError: any) {
                    console.error("Lỗi khi retry API:", retryError.message);
                    this.handleError(retryError);
                    throw retryError;
                }
            }
    
            // Gọi hàm xử lý lỗi chung
            this.handleError(error);
            throw error;
        }
    }
    

    /**
     * Xử lý lỗi từ API
     * @param error Lỗi nhận được
     */
    private handleError(error: any): void {
        if (error.response) {
            console.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            console.error('API Error: No response received from the server');
        } else {
            console.error(`API Error: ${error.message}`);
        }
    }
    async  api_get_money(type: string, idfb: string): Promise<any> {
        try {
            
            const response = await axios.get(`https://traodoisub.com/api/coin/?type=${type}&id=${idfb}&&access_token=${this.token}`);
            console.log('GET MONEY: ',`https://traodoisub.com/api/coin/?type=${type}&id=${idfb}&&access_token=${this.token}`);
            if(response.data.error=="Thất bại! Bạn chưa like ID này!"){
                // Ví dụ sử dụng
                const logger = new Logger('logs/application.log');
                logger.log(`https://traodoisub.com/api/coin/?type=${type}&id=${idfb}&&access_token=${this.token}\n`)
                logger.close();
            }
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data || 'Internal Server Error');
        }
    }
    async  api_config_account(idfb: string): Promise<any> {
        try {
            const response = await axios.get(`https://traodoisub.com/api/?fields=run&id=${idfb}&access_token=${this.token}`);
            console.log(`https://traodoisub.com/api/?fields=run&id=${idfb}&access_token=${this.token}`)
            return response.data.data;
        } catch (error: any) {
            throw new Error(error.response?.data || 'Internal Server Error');
        }
    }
}
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

export default TDS;
