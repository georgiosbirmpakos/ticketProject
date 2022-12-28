package aics;

import aics.domain.user.UserRepository;
import aics.domain.user.User;
import aics.domain.user.models.UserModel;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/api/hello")
public class GreetingResource {
    @Inject
    UserRepository userRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public UserModel hello() {
        User user = new User()
            .setDetails("")
            .setName("name")
            .setGmail("hasd@gam")
            .setSurname("asdfpo");

        this.userRepository.persist(user);

        UserModel userModel = UserModel.fromUser(user);

        return  userModel;
    }
}