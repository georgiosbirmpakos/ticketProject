import { LoggedUserDetails } from '../logged-user-details';

export class FetchLoggedUserDetailsDto {
    loggedUserDetails: LoggedUserDetails

    constructor(obj: {
        loggedUserDetails: LoggedUserDetails
    }) {
        this.loggedUserDetails = obj.loggedUserDetails;
    }

    static fromObj(obj: any): FetchLoggedUserDetailsDto | null {
        if (!obj) {
            return null;
        }
        const fetchLoggedUserDetailsDto: FetchLoggedUserDetailsDto = new FetchLoggedUserDetailsDto({
            loggedUserDetails: obj.loggedUserDetails
        });
        return fetchLoggedUserDetailsDto;
    }
}