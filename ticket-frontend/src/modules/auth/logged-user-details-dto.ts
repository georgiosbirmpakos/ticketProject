import { RoleEnum } from './role-enum';

export class LoggedUserDetailsDto {
    userId: number;
    name: string;
    sub: string;
    email: string;
    preferredUsername: string;
    givenName: string;
    familyName: string;
    fullName: string;
    roles: RoleEnum[];

    constructor(obj: {
        userId?: number,
        name?: string,
        sub?: string,
        email?: string,
        preferredUsername?: string,
        givenName?: string,
        familyName?: string,
        fullName?: string,
        roles?: RoleEnum[],
    }) {
        this.userId = obj.userId ? obj.userId : 0;
        this.name = obj.name ? obj.name : '';
        this.sub = obj.sub ? obj.sub : '';
        this.email = obj.email ? obj.email : '';
        this.preferredUsername = obj.preferredUsername ? obj.preferredUsername : '';
        this.givenName = obj.givenName ? obj.givenName : '';
        this.familyName = obj.familyName ? obj.familyName : '';
        this.fullName = obj.fullName ? obj.fullName : '';
        this.roles = obj.roles ? obj.roles : [];
    }
}