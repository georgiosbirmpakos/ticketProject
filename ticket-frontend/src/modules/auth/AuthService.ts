import Keycloak, { KeycloakError, KeycloakPromise } from 'keycloak-js';
import { EnvConfig } from '../core/env-config';
import { GlobalState } from '../core/global-state';
import { UserDetails } from './user-details';

export class AuthService {
    static async init(): Promise<KeycloakPromise<boolean, KeycloakError>> {
        const envConfig = GlobalState.instance.envConfig;
        const kc = GlobalState.instance.kc;
        const initResult = await kc.init({
            onLoad: 'check-sso'
        })
        this.setUserDetails();
        return initResult;
    }

    static async login() {
        const kc = GlobalState.instance.kc;
        await kc.login();
    }

    static async logout() {
        const kc = GlobalState.instance.kc;
        await kc.logout();
    }

    private static async setUserDetails() {
        const kc = GlobalState.instance.kc;

        if (kc.idTokenParsed) {
            console.log('idTokenParsed', kc.idTokenParsed)

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
            console.log('GlobalState.instance.user ', GlobalState.instance.user)
        } else {
            console.log('USER not loggedIn')
            GlobalState.instance.user = null;
        }


    }
}