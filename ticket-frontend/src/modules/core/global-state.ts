import { AxiosInstance } from 'axios';
import { createApiConsumer } from '../net/api-consumer';
import { EnvConfig } from './env-config';

export class GlobalState {
    private static _instance: GlobalState | null = null;

    readonly envConfig: EnvConfig;
    readonly apiConsumer: AxiosInstance;

    constructor(requiredProps: {
        envConfig: EnvConfig,
        apiConsumer: AxiosInstance;
    }) {
        this.envConfig = requiredProps.envConfig;
        this.apiConsumer = requiredProps.apiConsumer;
    }

    static get instance(): GlobalState {
        if (this._instance == null) {
            throw new Error('GlobalState has not been initialized');
        }
        return this._instance;
    }

    static initializeDefault(): void {
        if (this._instance != null) {
            throw new Error('GlobalState has already been initialized');
        }
        const envConfig = EnvConfig.fromEnv();
        const apiConsumer = createApiConsumer(envConfig);

        GlobalState._instance = new GlobalState({
            envConfig: envConfig,
            apiConsumer: apiConsumer
        });
    }
}