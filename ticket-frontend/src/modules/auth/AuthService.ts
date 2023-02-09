import Keycloak, { KeycloakError, KeycloakPromise } from 'keycloak-js';
import { EnvConfig } from '../core/env-config';
import { GlobalState } from '../core/global-state';

export class AuthService {
    static async init(): Promise<KeycloakPromise<boolean, KeycloakError>> {
        const envConfig = GlobalState.instance.envConfig;
        const kc = GlobalState.instance.kc;
        const initResult = await kc.init({
            redirectUri: envConfig.kcRedirectUri,
            onLoad: 'check-sso'
        })
        this.setUserDetails();
        return initResult;
    }

    static async login() {
        const kc = GlobalState.instance.kc;
        await kc.login();
    }

    private static async setUserDetails() {
        const kc = GlobalState.instance.kc;

        if (kc.idTokenParsed) {
            console.log('idTokenParsed', kc.idTokenParsed)
        } else {
            console.log('USER not loggedIn')
        }
    }
}