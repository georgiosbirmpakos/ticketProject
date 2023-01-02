import { EnvConfig } from './env-config';

export class GlobalState {
    private static _instance: GlobalState | null = null;

    private readonly envConfig: EnvConfig;

    constructor(requiredProps: {
        envConfig: EnvConfig
    }) {
        this.envConfig = requiredProps.envConfig;
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
        GlobalState._instance = new GlobalState({
            envConfig: EnvConfig.fromEnv()
        });
    }
}