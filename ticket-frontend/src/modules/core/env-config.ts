export class EnvConfig {
    readonly backendUrl: string;
    readonly envProfile: string;

    constructor(requiredProps: {
        backendUrl: string,
        envProfile: string;
    }) {
        this.backendUrl = requiredProps.backendUrl;
        this.envProfile = requiredProps.envProfile;
    }

    static fromEnv(): EnvConfig {
        const backendUrl =  process.env.REACT_APP_BACKEND_URL ?  process.env.REACT_APP_BACKEND_URL : '';
        const envProfile = process.env.REACT_APP_ENV_PROFILE ? process.env.REACT_APP_ENV_PROFILE: ''
        return new EnvConfig({
            backendUrl,
            envProfile
        });
    }
}