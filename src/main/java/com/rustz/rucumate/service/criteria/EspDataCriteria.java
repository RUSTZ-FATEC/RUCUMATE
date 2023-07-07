package com.rustz.rucumate.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.rustz.rucumate.domain.EspData} entity. This class is used
 * in {@link com.rustz.rucumate.web.rest.EspDataResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /esp-data?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EspDataCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter sensorId;

    private FloatFilter temperature;

    private FloatFilter humidity;

    private LongFilter userId;

    private Boolean distinct;

    public EspDataCriteria() {}

    public EspDataCriteria(EspDataCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.sensorId = other.sensorId == null ? null : other.sensorId.copy();
        this.temperature = other.temperature == null ? null : other.temperature.copy();
        this.humidity = other.humidity == null ? null : other.humidity.copy();
        this.userId = other.userId == null ? null : other.userId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public EspDataCriteria copy() {
        return new EspDataCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public LongFilter id() {
        if (id == null) {
            id = new LongFilter();
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getSensorId() {
        return sensorId;
    }

    public StringFilter sensorId() {
        if (sensorId == null) {
            sensorId = new StringFilter();
        }
        return sensorId;
    }

    public void setSensorId(StringFilter sensorId) {
        this.sensorId = sensorId;
    }

    public FloatFilter getTemperature() {
        return temperature;
    }

    public FloatFilter temperature() {
        if (temperature == null) {
            temperature = new FloatFilter();
        }
        return temperature;
    }

    public void setTemperature(FloatFilter temperature) {
        this.temperature = temperature;
    }

    public FloatFilter getHumidity() {
        return humidity;
    }

    public FloatFilter humidity() {
        if (humidity == null) {
            humidity = new FloatFilter();
        }
        return humidity;
    }

    public void setHumidity(FloatFilter humidity) {
        this.humidity = humidity;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public LongFilter userId() {
        if (userId == null) {
            userId = new LongFilter();
        }
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final EspDataCriteria that = (EspDataCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(sensorId, that.sensorId) &&
            Objects.equals(temperature, that.temperature) &&
            Objects.equals(humidity, that.humidity) &&
            Objects.equals(userId, that.userId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, sensorId, temperature, humidity, userId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EspDataCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (sensorId != null ? "sensorId=" + sensorId + ", " : "") +
            (temperature != null ? "temperature=" + temperature + ", " : "") +
            (humidity != null ? "humidity=" + humidity + ", " : "") +
            (userId != null ? "userId=" + userId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
