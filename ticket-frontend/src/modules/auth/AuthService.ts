import Keycloak, { KeycloakError, KeycloakPromise } from 'keycloak-js';
import { EnvConfig } from '../core/env-config';
import { GlobalState } from '../core/global-state';
import { FetchLoggedUserDetailsDto } from './dtos/fetch-logged-user-details-dto';
import { LoggedUserDetails } from './logged-user-details';

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
            GlobalState.instance.apiConsumer.defaults.headers['Authorization'] = 'Bearer ' + kc.token
            const fetchLoggedUserDetailsDto: FetchLoggedUserDetailsDto = await this.fetchLoggedUserDetails();
            const loggedUserDetails = fetchLoggedUserDetailsDto.loggedUserDetails;
            GlobalState.instance.loggedUser = loggedUserDetails;

        } else {
            console.log('USER not loggedIn')
            GlobalState.instance.loggedUser = null;
            delete GlobalState.instance.apiConsumer.defaults.headers['Authorization'];
        }
    }

    static async fetchLoggedUserDetails(): Promise<FetchLoggedUserDetailsDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchLoggedUserDetailsUrl = '/general/logged-user-details'

        const response = await apiConsumer.get(fetchLoggedUserDetailsUrl);
        const fetchLoggedUserDetailsDto: FetchLoggedUserDetailsDto | null = FetchLoggedUserDetailsDto.fromObj(response.data)
        if (!fetchLoggedUserDetailsDto) {
            throw new Error('fetchLoggedUserDetailsDto was null');
        }
        return fetchLoggedUserDetailsDto;
    }
}