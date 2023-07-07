package com.rustz.rucumate.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EspData.
 */
@Entity
@Table(name = "esp_data")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EspData implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "sensor_id")
    private String sensorId;

    @Column(name = "temperature")
    private Float temperature;

    @Column(name = "humidity")
    private Float humidity;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public EspData id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSensorId() {
        return this.sensorId;
    }

    public EspData sensorId(String sensorId) {
        this.setSensorId(sensorId);
        return this;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    public Float getTemperature() {
        return this.temperature;
    }

    public EspData temperature(Float temperature) {
        this.setTemperature(temperature);
        return this;
    }

    public void setTemperature(Float temperature) {
        this.temperature = temperature;
    }

    public Float getHumidity() {
        return this.humidity;
    }

    public EspData humidity(Float humidity) {
        this.setHumidity(humidity);
        return this;
    }

    public void setHumidity(Float humidity) {
        this.humidity = humidity;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public EspData user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EspData)) {
            return false;
        }
        return id != null && id.equals(((EspData) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EspData{" +
            "id=" + getId() +
            ", sensorId='" + getSensorId() + "'" +
            ", temperature=" + getTemperature() +
            ", humidity=" + getHumidity() +
            "}";
    }
}
