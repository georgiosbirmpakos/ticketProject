package aics.domain.user;

import aics.domain.user.entities.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.Optional;

@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {

    // put your custom logic here as instance methods

    public Optional<User> findByName(String name) {
        return find("name", name).stream().findFirst();
    }
//
//    public List<Person> findAlive(){
//        return list("status", Status.Alive);
//    }
//
//    public void deleteStefs(){
//        delete("name", "Stef");
//    }
}