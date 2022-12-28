package aics.domain.user;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {

    // put your custom logic here as instance methods

//    public User findByName(String name){
//        return find("name", name).firstResult();
//    }
//
//    public List<Person> findAlive(){
//        return list("status", Status.Alive);
//    }
//
//    public void deleteStefs(){
//        delete("name", "Stef");
//    }
}