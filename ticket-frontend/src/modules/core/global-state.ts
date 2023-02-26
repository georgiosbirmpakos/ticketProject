import { AxiosInstance } from 'axios';
import { createApiConsumer } from '../net/api-consumer';
import { EnvConfig } from './env-config';
import Keycloak from 'keycloak-js';
import { createKeycloack } from '../auth/create-keycloak';
import { LoggedUserDetailsDto } from '../auth/logged-user-details-dto';

export class GlobalState {
    private static _instance: GlobalState | null = null;

    readonly envConfig: EnvConfig;
    readonly apiConsumer: AxiosInstance;
    readonly kc: Keycloak;
    loggedUser: LoggedUserDetailsDto | null;

    constructor(obj: {
        envConfig: EnvConfig,
        apiConsumer: AxiosInstance,
        kc: Keycloak,
        loggedUser: LoggedUserDetailsDto | null
    }) {
        this.envConfig = obj.envConfig;
        this.apiConsumer = obj.apiConsumer;
        this.kc = obj.kc;
        this.loggedUser = obj.loggedUser;
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
            kc: kc,
            loggedUser: null
        });
    }
}