import Keycloak from 'keycloak-js';
import { EnvConfig } from '../core/env-config';

export function createKeycloack(envConfig: EnvConfig) {
    return new Keycloak({
        url: envConfig.kcUrl,
        realm: envConfig.kcRealm,
        clientId: envConfig.kcClientId
    });
}