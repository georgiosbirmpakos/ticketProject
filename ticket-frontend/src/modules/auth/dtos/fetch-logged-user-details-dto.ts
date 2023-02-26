import { LoggedUserDetailsDto } from '../logged-user-details-dto';

export class FetchLoggedUserDetailsDto {
    loggedUserDetails: LoggedUserDetailsDto

    constructor(obj: {
        loggedUserDetails: LoggedUserDetailsDto
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