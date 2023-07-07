package com.rustz.rucumate.service.dto;

import com.rustz.rucumate.domain.User;
import java.io.Serializable;

/**
 * A DTO representing a user, with only the public attributes.
 */
public class UserDto implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String login;

    public UserDto() {
        // Empty constructor needed for Jackson.
    }

    public UserDto(User user) {
        this.id = user.getId();
        // Customize it here if you need, or not, firstName/lastName/etc
        this.login = user.getLogin();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserDto{" +
            "id='" + id + '\'' +
            ", login='" + login + '\'' +
            "}";
    }
}
