import { AxiosInstance } from 'axios';
import { createApiConsumer } from '../net/api-consumer';
import { EnvConfig } from './env-config';
import Keycloak from 'keycloak-js';
import { createKeycloack } from '../auth/create-keycloak';

export class GlobalState {
    private static _instance: GlobalState | null = null;

    readonly envConfig: EnvConfig;
    readonly apiConsumer: AxiosInstance;
    readonly kc: Keycloak;

    constructor(requiredProps: {
        envConfig: EnvConfig,
        apiConsumer: AxiosInstance,
        kc: Keycloak
    }) {
        this.envConfig = requiredProps.envConfig;
        this.apiConsumer = requiredProps.apiConsumer;
        this.kc = requiredProps.kc;
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
        const kc = createKeycloack(envConfig);

        GlobalState._instance = new GlobalState({
            envConfig: envConfig,
            apiConsumer: apiConsumer,
            kc: kc
        });
    }
}