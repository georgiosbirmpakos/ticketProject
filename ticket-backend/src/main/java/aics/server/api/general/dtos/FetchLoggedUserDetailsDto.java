package aics.server.api.general.dtos;

import aics.infrastructure.auth.LoggedUserDetails;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class FetchLoggedUserDetailsDto implements Serializable {
    private LoggedUserDetails loggedUserDetails;
}
