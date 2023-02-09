export class EnvConfig {
    readonly backendUrl: string;
    readonly envProfile: string;
    readonly kcUrl: string;
    readonly kcRealm: string;
    readonly kcClientId: string;

    constructor(requiredProps: {
        backendUrl: string,
        envProfile: string,
        kcUrl: string,
        kcRealm: string,
        kcClientId: string
    }) {
        this.backendUrl = requiredProps.backendUrl;
        this.envProfile = requiredProps.envProfile;
        this.kcUrl = requiredProps.kcUrl;
        this.kcRealm = requiredProps.kcRealm;
        this.kcClientId = requiredProps.kcClientId;
    }

    static fromEnv(): EnvConfig {
        const backendUrl = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : '';
        const envProfile = process.env.REACT_APP_ENV_PROFILE ? process.env.REACT_APP_ENV_PROFILE : ''
        const kcUrl = process.env.REACT_APP_KC_URL ? process.env.REACT_APP_KC_URL : ''
        const kcRealm = process.env.REACT_APP_KC_REALM ? process.env.REACT_APP_KC_REALM : ''
        const kcClientId = process.env.REACT_APP_KC_CLIENT_ID ? process.env.REACT_APP_KC_CLIENT_ID : ''
        return new EnvConfig({
            backendUrl,
            envProfile,
            kcUrl,
            kcRealm,
            kcClientId
        });
    }
}