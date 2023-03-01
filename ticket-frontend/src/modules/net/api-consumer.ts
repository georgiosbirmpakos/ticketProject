import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { AuthService } from '../auth/AuthService';
import { EnvConfig } from '../core/env-config';
import { GlobalState } from '../core/global-state';

export function createApiConsumer(envConfig: EnvConfig): AxiosInstance {
    const apiConsumer = axios.create({
        baseURL: envConfig.backendUrl + '/api',
        timeout: 50000,
        // headers: { 'X-Custom-Header': 'foobar' },
        maxContentLength: 50000,
        maxBodyLength: 50000,
        maxRedirects: 21 // default
    });

    apiConsumer.interceptors.request.use(
        async (axiosRequestConfig) => {
            const kc = GlobalState.instance.kc;
            if (kc.authenticated) {
                await AuthService.updateToken();
                const headers = { ...axiosRequestConfig.headers } as Partial<AxiosRequestHeaders>;
                headers["Authorization"] = GlobalState.instance.apiConsumer.defaults.headers['Authorization'];
                axiosRequestConfig.headers = headers;
            }
            return axiosRequestConfig
        },
        error => {
            return Promise.reject(error)
        }
    );

    return apiConsumer;
}