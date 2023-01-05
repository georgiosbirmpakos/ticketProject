import axios, { AxiosInstance } from 'axios';
import { EnvConfig } from '../core/env-config';

export function createApiConsumer(envConfig: EnvConfig): AxiosInstance {
    const apiConsumer = axios.create({
        baseURL: envConfig.backendUrl + '/api',
        timeout: 5000,
        // headers: { 'X-Custom-Header': 'foobar' },
        maxContentLength: 5000,
        maxBodyLength: 5000,
        maxRedirects: 21 // default
    });
    return apiConsumer;
}