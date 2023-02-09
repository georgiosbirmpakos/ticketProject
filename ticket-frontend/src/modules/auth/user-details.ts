export class UserDetails {
    sub: string;
    email: string;
    givenName: string;
    familyName: string;
    name: string;
    roles: string[];

    constructor(obj: {
        sub?: string,
        email?: string,
        givenName?: string,
        familyName?: string,
        name?: string,
        roles?: string[],
    }) {
        this.sub = obj.sub ? obj.sub : '';
        this.email = obj.email ? obj.email : '';
        this.givenName = obj.givenName ? obj.givenName : '';
        this.familyName = obj.familyName ? obj.familyName : '';
        this.name = obj.name ? obj.name : '';
        this.roles = obj.roles ? obj.roles : [];
    }
}