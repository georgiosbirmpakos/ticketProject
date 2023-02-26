import { KeycloakError, KeycloakPromise } from 'keycloak-js';
import { GlobalState } from '../core/global-state';
import { FetchLoggedUserDetailsDto } from './dtos/fetch-logged-user-details-dto';
import { RoleEnum } from './role-enum';

export class AuthService {
    static async init(): Promise<KeycloakPromise<boolean, KeycloakError>> {
        const kc = GlobalState.instance.kc;
        const initResult = await kc.init({
            onLoad: 'check-sso',
        });
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

    static async updateToken() {
        const kc = GlobalState.instance.kc;
        await kc.updateToken(60).then((isTokenUpdated) => {
            console.log('isTokenUpdated', isTokenUpdated)
            if (isTokenUpdated) {
                this.setAccessToken();
            }
        });
    }

    private static async setUserDetails() {
        const kc = GlobalState.instance.kc;

        console.log('kc.tokenParsed', kc.tokenParsed)

        if (kc.authenticated) {
            this.setAccessToken();
            const fetchLoggedUserDetailsDto: FetchLoggedUserDetailsDto = await this.fetchLoggedUserDetails();
            const loggedUserDetails = fetchLoggedUserDetailsDto.loggedUserDetails;
            GlobalState.instance.loggedUser = loggedUserDetails;

        } else {
            console.log('USER not loggedIn')
            GlobalState.instance.loggedUser = null;
            delete GlobalState.instance.apiConsumer.defaults.headers['Authorization'];
        }
    }

    private static setAccessToken() {
        const kc = GlobalState.instance.kc;
        if (kc.token) {
            GlobalState.instance.apiConsumer.defaults.headers['Authorization'] = 'Bearer ' + kc.token
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

    static isUserAuthorizedForRoles(pageRoles: RoleEnum[]): boolean {
        const user = GlobalState.instance.loggedUser;
        if (!user) {
            return false;
        }
        const userRoles = user.roles;

        for (const userRole of userRoles) {
            if (pageRoles.includes(userRole)) {
                return true;
            }
        }
        return false;
    }
}