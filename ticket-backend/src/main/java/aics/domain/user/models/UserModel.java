package aics.domain.user.models;

import aics.domain.user.entities.User;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class UserModel implements Serializable {
    private Long userId;
    private String name;
    private String surname;
    private String gmail;
    private String details;

    public static UserModel fromUser(User user) {
        if (user == null) {
            return null;
        }
        return new UserModel()
            .setUserId(user.getUserId())
            .setName(user.getName())
            .setSurname(user.getSurname())
            .setGmail(user.getGmail())
            .setDetails(user.getDetails());
    }
}
