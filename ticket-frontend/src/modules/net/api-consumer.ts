import axios, { AxiosHeaders, AxiosInstance, AxiosRequestHeaders } from 'axios';
import { AuthService } from '../auth/AuthService';
import { EnvConfig } from '../core/env-config';
import { GlobalState } from '../core/global-state';

export function createApiConsumer(envConfig: EnvConfig): AxiosInstance {
    const apiConsumer = axios.create({
        baseURL: envConfig.backendUrl + '/api',
        timeout: 5000,
        // headers: { 'X-Custom-Header': 'foobar' },
        maxContentLength: 5000,
        maxBodyLength: 5000,
        maxRedirects: 21 // default
    });

    apiConsumer.interceptors.request.use(
        async (axiosRequestConfig) => {
            await AuthService.updateToken();
            const headers = { ...axiosRequestConfig.headers } as Partial<AxiosRequestHeaders>;
            headers["Authorization"] = GlobalState.instance.apiConsumer.defaults.headers['Authorization'];
            axiosRequestConfig.headers = headers;
            return axiosRequestConfig
        },
        error => {
            return Promise.reject(error)
        }
    );

    return apiConsumer;
}