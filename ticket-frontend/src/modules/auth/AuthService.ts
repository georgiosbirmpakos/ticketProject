import Keycloak, { KeycloakError, KeycloakPromise } from 'keycloak-js';
import { EnvConfig } from '../core/env-config';
import { GlobalState } from '../core/global-state';
import { UserDetails } from './user-details';

export class AuthService {
    static async init(): Promise<KeycloakPromise<boolean, KeycloakError>> {
        const envConfig = GlobalState.instance.envConfig;
        const kc = GlobalState.instance.kc;
        const initResult = await kc.init({
            onLoad: 'check-sso',
        })
        kc.onTokenExpired = async () => {
            console.log('token expired', kc.token);
            try {
                await kc.updateToken(30);
                await this.setUserDetails();
            } catch (e) {
                console.error(e);
                await this.logout();
            }
        }
        await this.setUserDetails();
        return initResult;
    }

    static async login() {
        const kc = GlobalState.instance.kc;
        await kc.login();
    }

    static async accountManagement() {
        const kc = GlobalState.instance.kc;
        await kc.accountManagement();
    }

    static async logout() {
        const kc = GlobalState.instance.kc;
        await kc.logout();
    }

    private static async setUserDetails() {
        const kc = GlobalState.instance.kc;

        console.log('kc.tokenParsed', kc.tokenParsed)

        if (kc.idToken && kc.idTokenParsed && kc.token && kc.tokenParsed) {
            let roles: string[] = []
            if (kc.realmAccess?.roles) {
                roles = kc.realmAccess.roles
            }
            const userDetails = new UserDetails({
                sub: kc.idTokenParsed.sub,
                email: kc.idTokenParsed['email'],
                givenName: kc.idTokenParsed['given_name'],
                familyName: kc.idTokenParsed['family_name'],
                name: kc.idTokenParsed['name'],
                roles: roles
            });
            GlobalState.instance.user = userDetails;

            GlobalState.instance.apiConsumer.defaults.headers['Authorization'] = 'Bearer ' + kc.token
        } else {
            console.log('USER not loggedIn')
            GlobalState.instance.user = null;
            delete GlobalState.instance.apiConsumer.defaults.headers['Authorization'];
        }
    }
}