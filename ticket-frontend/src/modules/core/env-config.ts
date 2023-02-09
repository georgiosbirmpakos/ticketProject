export class EnvConfig {
    readonly backendUrl: string;
    readonly envProfile: string;
    readonly kcRedirectUri: string;
    readonly kcUrl: string;
    readonly kcRealm: string;
    readonly kcClientId: string;

    constructor(requiredProps: {
        backendUrl: string,
        envProfile: string,
        kcRedirectUri: string,
        kcUrl: string,
        kcRealm: string,
        kcClientId: string
    }) {
        this.backendUrl = requiredProps.backendUrl;
        this.envProfile = requiredProps.envProfile;
        this.kcRedirectUri = requiredProps.kcRedirectUri;
        this.kcUrl = requiredProps.kcUrl;
        this.kcRealm = requiredProps.kcRealm;
        this.kcClientId = requiredProps.kcClientId;
    }

    static fromEnv(): EnvConfig {
        const backendUrl = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : '';
        const envProfile = process.env.REACT_APP_ENV_PROFILE ? process.env.REACT_APP_ENV_PROFILE : ''
        const kcRedirectUri = process.env.REACT_APP_KC_REDIRECT_URI ? process.env.REACT_APP_KC_REDIRECT_URI : ''
        const kcUrl = process.env.REACT_APP_KC_URL ? process.env.REACT_APP_KC_URL : ''
        const kcRealm = process.env.REACT_APP_KC_REALM ? process.env.REACT_APP_KC_REALM : ''
        const kcClientId = process.env.REACT_APP_KC_CLIENT_ID ? process.env.REACT_APP_KC_CLIENT_ID : ''
        return new EnvConfig({
            backendUrl,
            envProfile,
            kcRedirectUri,
            kcUrl,
            kcRealm,
            kcClientId
        });
    }
}