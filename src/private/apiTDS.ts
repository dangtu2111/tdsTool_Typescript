import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 5000, // 5 giây
        });
    }

    // Phương thức GET
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
            return response.data;
        } catch (error: any) {
            this.handleError(error);
            throw error;
        }
    }

    // Phương thức POST
    async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
            return response.data;
        } catch (error: any) {
            this.handleError(error);
            throw error;
        }
    }

    // Phương thức PUT
    async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
            return response.data;
        } catch (error: any) {
            this.handleError(error);
            throw error;
        }
    }

    // Phương thức DELETE
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
            return response.data;
        } catch (error: any) {
            this.handleError(error);
            throw error;
        }
    }

    // Hàm xử lý lỗi
    private handleError(error: any): void {
        if (error.response) {
            console.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            console.error('API Error: No response received from the server');
        } else {
            console.error(`API Error: ${error.message}`);
        }
    }
}

export default ApiService;
