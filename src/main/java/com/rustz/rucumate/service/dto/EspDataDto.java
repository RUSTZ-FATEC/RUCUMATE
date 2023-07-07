package com.rustz.rucumate.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.rustz.rucumate.domain.EspData} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EspDataDto implements Serializable {

    private Long id;

    private String sensorId;

    private Float temperature;

    private Float humidity;

    private UserDto user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    public Float getTemperature() {
        return temperature;
    }

    public void setTemperature(Float temperature) {
        this.temperature = temperature;
    }

    public Float getHumidity() {
        return humidity;
    }

    public void setHumidity(Float humidity) {
        this.humidity = humidity;
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
        if (!(o instanceof EspDataDto)) {
            return false;
        }

        EspDataDto espDataDto = (EspDataDto) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, espDataDto.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EspDataDto{" +
            "id=" + getId() +
            ", sensorId='" + getSensorId() + "'" +
            ", temperature=" + getTemperature() +
            ", humidity=" + getHumidity() +
            ", user=" + getUser() +
            "}";
    }
}
