package com.rustz.rucumate.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.rustz.rucumate.domain.Notification} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class NotificationDto implements Serializable {

    private Long id;

    private String content;

    private UserDto user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NotificationDto)) {
            return false;
        }

        NotificationDto notificationDto = (NotificationDto) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, notificationDto.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NotificationDto{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", user=" + getUser() +
            "}";
    }
}
