package com.rustz.rucumate.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.rustz.rucumate.domain.Valve} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ValveDto implements Serializable {

    private Long id;

    @NotNull
    private Boolean status;

    private UserDto user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
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
        if (!(o instanceof ValveDto)) {
            return false;
        }

        ValveDto valveDto = (ValveDto) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, valveDto.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ValveDto{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", user=" + getUser() +
            "}";
    }
}
