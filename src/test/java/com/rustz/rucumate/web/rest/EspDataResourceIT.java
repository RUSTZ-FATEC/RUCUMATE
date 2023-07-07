package com.rustz.rucumate.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.rustz.rucumate.IntegrationTest;
import com.rustz.rucumate.domain.EspData;
import com.rustz.rucumate.domain.User;
import com.rustz.rucumate.repository.EspDataRepository;
import com.rustz.rucumate.service.criteria.EspDataCriteria;
import com.rustz.rucumate.service.dto.EspDataDto;
import com.rustz.rucumate.service.mapper.EspDataMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link EspDataResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EspDataResourceIT {

    private static final String DEFAULT_SENSOR_ID = "AAAAAAAAAA";
    private static final String UPDATED_SENSOR_ID = "BBBBBBBBBB";

    private static final Float DEFAULT_TEMPERATURE = 1F;
    private static final Float UPDATED_TEMPERATURE = 2F;
    private static final Float SMALLER_TEMPERATURE = 1F - 1F;

    private static final Float DEFAULT_HUMIDITY = 1F;
    private static final Float UPDATED_HUMIDITY = 2F;
    private static final Float SMALLER_HUMIDITY = 1F - 1F;

    private static final String ENTITY_API_URL = "/api/esp-data";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EspDataRepository espDataRepository;

    @Autowired
    private EspDataMapper espDataMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEspDataMockMvc;

    private EspData espData;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EspData createEntity(EntityManager em) {
        EspData espData = new EspData().sensorId(DEFAULT_SENSOR_ID).temperature(DEFAULT_TEMPERATURE).humidity(DEFAULT_HUMIDITY);
        return espData;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EspData createUpdatedEntity(EntityManager em) {
        EspData espData = new EspData().sensorId(UPDATED_SENSOR_ID).temperature(UPDATED_TEMPERATURE).humidity(UPDATED_HUMIDITY);
        return espData;
    }

    @BeforeEach
    public void initTest() {
        espData = createEntity(em);
    }

    @Test
    @Transactional
    void createEspData() throws Exception {
        int databaseSizeBeforeCreate = espDataRepository.findAll().size();
        // Create the EspData
        EspDataDto espDataDto = espDataMapper.toDto(espData);
        restEspDataMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(espDataDto)))
            .andExpect(status().isCreated());

        // Validate the EspData in the database
        List<EspData> espDataList = espDataRepository.findAll();
        assertThat(espDataList).hasSize(databaseSizeBeforeCreate + 1);
        EspData testEspData = espDataList.get(espDataList.size() - 1);
        assertThat(testEspData.getSensorId()).isEqualTo(DEFAULT_SENSOR_ID);
        assertThat(testEspData.getTemperature()).isEqualTo(DEFAULT_TEMPERATURE);
        assertThat(testEspData.getHumidity()).isEqualTo(DEFAULT_HUMIDITY);
    }

    @Test
    @Transactional
    void createEspDataWithExistingId() throws Exception {
        // Create the EspData with an existing ID
        espData.setId(1L);
        EspDataDto espDataDto = espDataMapper.toDto(espData);

        int databaseSizeBeforeCreate = espDataRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEspDataMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(espDataDto)))
            .andExpect(status().isBadRequest());

        // Validate the EspData in the database
        List<EspData> espDataList = espDataRepository.findAll();
        assertThat(espDataList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllEspData() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList
        restEspDataMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(espData.getId().intValue())))
            .andExpect(jsonPath("$.[*].sensorId").value(hasItem(DEFAULT_SENSOR_ID)))
            .andExpect(jsonPath("$.[*].temperature").value(hasItem(DEFAULT_TEMPERATURE.doubleValue())))
            .andExpect(jsonPath("$.[*].humidity").value(hasItem(DEFAULT_HUMIDITY.doubleValue())));
    }

    @Test
    @Transactional
    void getEspData() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get the espData
        restEspDataMockMvc
            .perform(get(ENTITY_API_URL_ID, espData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(espData.getId().intValue()))
            .andExpect(jsonPath("$.sensorId").value(DEFAULT_SENSOR_ID))
            .andExpect(jsonPath("$.temperature").value(DEFAULT_TEMPERATURE.doubleValue()))
            .andExpect(jsonPath("$.humidity").value(DEFAULT_HUMIDITY.doubleValue()));
    }

    @Test
    @Transactional
    void getEspDataByIdFiltering() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        Long id = espData.getId();

        defaultEspDataShouldBeFound("id.equals=" + id);
        defaultEspDataShouldNotBeFound("id.notEquals=" + id);

        defaultEspDataShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultEspDataShouldNotBeFound("id.greaterThan=" + id);

        defaultEspDataShouldBeFound("id.lessThanOrEqual=" + id);
        defaultEspDataShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllEspDataBySensorIdIsEqualToSomething() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where sensorId equals to DEFAULT_SENSOR_ID
        defaultEspDataShouldBeFound("sensorId.equals=" + DEFAULT_SENSOR_ID);

        // Get all the espDataList where sensorId equals to UPDATED_SENSOR_ID
        defaultEspDataShouldNotBeFound("sensorId.equals=" + UPDATED_SENSOR_ID);
    }

    @Test
    @Transactional
    void getAllEspDataBySensorIdIsInShouldWork() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where sensorId in DEFAULT_SENSOR_ID or UPDATED_SENSOR_ID
        defaultEspDataShouldBeFound("sensorId.in=" + DEFAULT_SENSOR_ID + "," + UPDATED_SENSOR_ID);

        // Get all the espDataList where sensorId equals to UPDATED_SENSOR_ID
        defaultEspDataShouldNotBeFound("sensorId.in=" + UPDATED_SENSOR_ID);
    }

    @Test
    @Transactional
    void getAllEspDataBySensorIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where sensorId is not null
        defaultEspDataShouldBeFound("sensorId.specified=true");

        // Get all the espDataList where sensorId is null
        defaultEspDataShouldNotBeFound("sensorId.specified=false");
    }

    @Test
    @Transactional
    void getAllEspDataBySensorIdContainsSomething() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where sensorId contains DEFAULT_SENSOR_ID
        defaultEspDataShouldBeFound("sensorId.contains=" + DEFAULT_SENSOR_ID);

        // Get all the espDataList where sensorId contains UPDATED_SENSOR_ID
        defaultEspDataShouldNotBeFound("sensorId.contains=" + UPDATED_SENSOR_ID);
    }

    @Test
    @Transactional
    void getAllEspDataBySensorIdNotContainsSomething() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where sensorId does not contain DEFAULT_SENSOR_ID
        defaultEspDataShouldNotBeFound("sensorId.doesNotContain=" + DEFAULT_SENSOR_ID);

        // Get all the espDataList where sensorId does not contain UPDATED_SENSOR_ID
        defaultEspDataShouldBeFound("sensorId.doesNotContain=" + UPDATED_SENSOR_ID);
    }

    @Test
    @Transactional
    void getAllEspDataByTemperatureIsEqualToSomething() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where temperature equals to DEFAULT_TEMPERATURE
        defaultEspDataShouldBeFound("temperature.equals=" + DEFAULT_TEMPERATURE);

        // Get all the espDataList where temperature equals to UPDATED_TEMPERATURE
        defaultEspDataShouldNotBeFound("temperature.equals=" + UPDATED_TEMPERATURE);
    }

    @Test
    @Transactional
    void getAllEspDataByTemperatureIsInShouldWork() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where temperature in DEFAULT_TEMPERATURE or UPDATED_TEMPERATURE
        defaultEspDataShouldBeFound("temperature.in=" + DEFAULT_TEMPERATURE + "," + UPDATED_TEMPERATURE);

        // Get all the espDataList where temperature equals to UPDATED_TEMPERATURE
        defaultEspDataShouldNotBeFound("temperature.in=" + UPDATED_TEMPERATURE);
    }

    @Test
    @Transactional
    void getAllEspDataByTemperatureIsNullOrNotNull() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where temperature is not null
        defaultEspDataShouldBeFound("temperature.specified=true");

        // Get all the espDataList where temperature is null
        defaultEspDataShouldNotBeFound("temperature.specified=false");
    }

    @Test
    @Transactional
    void getAllEspDataByTemperatureIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where temperature is greater than or equal to DEFAULT_TEMPERATURE
        defaultEspDataShouldBeFound("temperature.greaterThanOrEqual=" + DEFAULT_TEMPERATURE);

        // Get all the espDataList where temperature is greater than or equal to UPDATED_TEMPERATURE
        defaultEspDataShouldNotBeFound("temperature.greaterThanOrEqual=" + UPDATED_TEMPERATURE);
    }

    @Test
    @Transactional
    void getAllEspDataByTemperatureIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where temperature is less than or equal to DEFAULT_TEMPERATURE
        defaultEspDataShouldBeFound("temperature.lessThanOrEqual=" + DEFAULT_TEMPERATURE);

        // Get all the espDataList where temperature is less than or equal to SMALLER_TEMPERATURE
        defaultEspDataShouldNotBeFound("temperature.lessThanOrEqual=" + SMALLER_TEMPERATURE);
    }

    @Test
    @Transactional
    void getAllEspDataByTemperatureIsLessThanSomething() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where temperature is less than DEFAULT_TEMPERATURE
        defaultEspDataShouldNotBeFound("temperature.lessThan=" + DEFAULT_TEMPERATURE);

        // Get all the espDataList where temperature is less than UPDATED_TEMPERATURE
        defaultEspDataShouldBeFound("temperature.lessThan=" + UPDATED_TEMPERATURE);
    }

    @Test
    @Transactional
    void getAllEspDataByTemperatureIsGreaterThanSomething() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where temperature is greater than DEFAULT_TEMPERATURE
        defaultEspDataShouldNotBeFound("temperature.greaterThan=" + DEFAULT_TEMPERATURE);

        // Get all the espDataList where temperature is greater than SMALLER_TEMPERATURE
        defaultEspDataShouldBeFound("temperature.greaterThan=" + SMALLER_TEMPERATURE);
    }

    @Test
    @Transactional
    void getAllEspDataByHumidityIsEqualToSomething() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where humidity equals to DEFAULT_HUMIDITY
        defaultEspDataShouldBeFound("humidity.equals=" + DEFAULT_HUMIDITY);

        // Get all the espDataList where humidity equals to UPDATED_HUMIDITY
        defaultEspDataShouldNotBeFound("humidity.equals=" + UPDATED_HUMIDITY);
    }

    @Test
    @Transactional
    void getAllEspDataByHumidityIsInShouldWork() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where humidity in DEFAULT_HUMIDITY or UPDATED_HUMIDITY
        defaultEspDataShouldBeFound("humidity.in=" + DEFAULT_HUMIDITY + "," + UPDATED_HUMIDITY);

        // Get all the espDataList where humidity equals to UPDATED_HUMIDITY
        defaultEspDataShouldNotBeFound("humidity.in=" + UPDATED_HUMIDITY);
    }

    @Test
    @Transactional
    void getAllEspDataByHumidityIsNullOrNotNull() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where humidity is not null
        defaultEspDataShouldBeFound("humidity.specified=true");

        // Get all the espDataList where humidity is null
        defaultEspDataShouldNotBeFound("humidity.specified=false");
    }

    @Test
    @Transactional
    void getAllEspDataByHumidityIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where humidity is greater than or equal to DEFAULT_HUMIDITY
        defaultEspDataShouldBeFound("humidity.greaterThanOrEqual=" + DEFAULT_HUMIDITY);

        // Get all the espDataList where humidity is greater than or equal to UPDATED_HUMIDITY
        defaultEspDataShouldNotBeFound("humidity.greaterThanOrEqual=" + UPDATED_HUMIDITY);
    }

    @Test
    @Transactional
    void getAllEspDataByHumidityIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where humidity is less than or equal to DEFAULT_HUMIDITY
        defaultEspDataShouldBeFound("humidity.lessThanOrEqual=" + DEFAULT_HUMIDITY);

        // Get all the espDataList where humidity is less than or equal to SMALLER_HUMIDITY
        defaultEspDataShouldNotBeFound("humidity.lessThanOrEqual=" + SMALLER_HUMIDITY);
    }

    @Test
    @Transactional
    void getAllEspDataByHumidityIsLessThanSomething() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where humidity is less than DEFAULT_HUMIDITY
        defaultEspDataShouldNotBeFound("humidity.lessThan=" + DEFAULT_HUMIDITY);

        // Get all the espDataList where humidity is less than UPDATED_HUMIDITY
        defaultEspDataShouldBeFound("humidity.lessThan=" + UPDATED_HUMIDITY);
    }

    @Test
    @Transactional
    void getAllEspDataByHumidityIsGreaterThanSomething() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        // Get all the espDataList where humidity is greater than DEFAULT_HUMIDITY
        defaultEspDataShouldNotBeFound("humidity.greaterThan=" + DEFAULT_HUMIDITY);

        // Get all the espDataList where humidity is greater than SMALLER_HUMIDITY
        defaultEspDataShouldBeFound("humidity.greaterThan=" + SMALLER_HUMIDITY);
    }

    @Test
    @Transactional
    void getAllEspDataByUserIsEqualToSomething() throws Exception {
        User user;
        if (TestUtil.findAll(em, User.class).isEmpty()) {
            espDataRepository.saveAndFlush(espData);
            user = UserResourceIT.createEntity(em);
        } else {
            user = TestUtil.findAll(em, User.class).get(0);
        }
        em.persist(user);
        em.flush();
        espData.setUser(user);
        espDataRepository.saveAndFlush(espData);
        Long userId = user.getId();

        // Get all the espDataList where user equals to userId
        defaultEspDataShouldBeFound("userId.equals=" + userId);

        // Get all the espDataList where user equals to (userId + 1)
        defaultEspDataShouldNotBeFound("userId.equals=" + (userId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultEspDataShouldBeFound(String filter) throws Exception {
        restEspDataMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(espData.getId().intValue())))
            .andExpect(jsonPath("$.[*].sensorId").value(hasItem(DEFAULT_SENSOR_ID)))
            .andExpect(jsonPath("$.[*].temperature").value(hasItem(DEFAULT_TEMPERATURE.doubleValue())))
            .andExpect(jsonPath("$.[*].humidity").value(hasItem(DEFAULT_HUMIDITY.doubleValue())));

        // Check, that the count call also returns 1
        restEspDataMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultEspDataShouldNotBeFound(String filter) throws Exception {
        restEspDataMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restEspDataMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingEspData() throws Exception {
        // Get the espData
        restEspDataMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingEspData() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        int databaseSizeBeforeUpdate = espDataRepository.findAll().size();

        // Update the espData
        EspData updatedEspData = espDataRepository.findById(espData.getId()).get();
        // Disconnect from session so that the updates on updatedEspData are not directly saved in db
        em.detach(updatedEspData);
        updatedEspData.sensorId(UPDATED_SENSOR_ID).temperature(UPDATED_TEMPERATURE).humidity(UPDATED_HUMIDITY);
        EspDataDto espDataDto = espDataMapper.toDto(updatedEspData);

        restEspDataMockMvc
            .perform(
                put(ENTITY_API_URL_ID, espDataDto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(espDataDto))
            )
            .andExpect(status().isOk());

        // Validate the EspData in the database
        List<EspData> espDataList = espDataRepository.findAll();
        assertThat(espDataList).hasSize(databaseSizeBeforeUpdate);
        EspData testEspData = espDataList.get(espDataList.size() - 1);
        assertThat(testEspData.getSensorId()).isEqualTo(UPDATED_SENSOR_ID);
        assertThat(testEspData.getTemperature()).isEqualTo(UPDATED_TEMPERATURE);
        assertThat(testEspData.getHumidity()).isEqualTo(UPDATED_HUMIDITY);
    }

    @Test
    @Transactional
    void putNonExistingEspData() throws Exception {
        int databaseSizeBeforeUpdate = espDataRepository.findAll().size();
        espData.setId(count.incrementAndGet());

        // Create the EspData
        EspDataDto espDataDto = espDataMapper.toDto(espData);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEspDataMockMvc
            .perform(
                put(ENTITY_API_URL_ID, espDataDto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(espDataDto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EspData in the database
        List<EspData> espDataList = espDataRepository.findAll();
        assertThat(espDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEspData() throws Exception {
        int databaseSizeBeforeUpdate = espDataRepository.findAll().size();
        espData.setId(count.incrementAndGet());

        // Create the EspData
        EspDataDto espDataDto = espDataMapper.toDto(espData);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEspDataMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(espDataDto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EspData in the database
        List<EspData> espDataList = espDataRepository.findAll();
        assertThat(espDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEspData() throws Exception {
        int databaseSizeBeforeUpdate = espDataRepository.findAll().size();
        espData.setId(count.incrementAndGet());

        // Create the EspData
        EspDataDto espDataDto = espDataMapper.toDto(espData);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEspDataMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(espDataDto)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the EspData in the database
        List<EspData> espDataList = espDataRepository.findAll();
        assertThat(espDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEspDataWithPatch() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        int databaseSizeBeforeUpdate = espDataRepository.findAll().size();

        // Update the espData using partial update
        EspData partialUpdatedEspData = new EspData();
        partialUpdatedEspData.setId(espData.getId());

        restEspDataMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEspData.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEspData))
            )
            .andExpect(status().isOk());

        // Validate the EspData in the database
        List<EspData> espDataList = espDataRepository.findAll();
        assertThat(espDataList).hasSize(databaseSizeBeforeUpdate);
        EspData testEspData = espDataList.get(espDataList.size() - 1);
        assertThat(testEspData.getSensorId()).isEqualTo(DEFAULT_SENSOR_ID);
        assertThat(testEspData.getTemperature()).isEqualTo(DEFAULT_TEMPERATURE);
        assertThat(testEspData.getHumidity()).isEqualTo(DEFAULT_HUMIDITY);
    }

    @Test
    @Transactional
    void fullUpdateEspDataWithPatch() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        int databaseSizeBeforeUpdate = espDataRepository.findAll().size();

        // Update the espData using partial update
        EspData partialUpdatedEspData = new EspData();
        partialUpdatedEspData.setId(espData.getId());

        partialUpdatedEspData.sensorId(UPDATED_SENSOR_ID).temperature(UPDATED_TEMPERATURE).humidity(UPDATED_HUMIDITY);

        restEspDataMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEspData.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEspData))
            )
            .andExpect(status().isOk());

        // Validate the EspData in the database
        List<EspData> espDataList = espDataRepository.findAll();
        assertThat(espDataList).hasSize(databaseSizeBeforeUpdate);
        EspData testEspData = espDataList.get(espDataList.size() - 1);
        assertThat(testEspData.getSensorId()).isEqualTo(UPDATED_SENSOR_ID);
        assertThat(testEspData.getTemperature()).isEqualTo(UPDATED_TEMPERATURE);
        assertThat(testEspData.getHumidity()).isEqualTo(UPDATED_HUMIDITY);
    }

    @Test
    @Transactional
    void patchNonExistingEspData() throws Exception {
        int databaseSizeBeforeUpdate = espDataRepository.findAll().size();
        espData.setId(count.incrementAndGet());

        // Create the EspData
        EspDataDto espDataDto = espDataMapper.toDto(espData);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEspDataMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, espDataDto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(espDataDto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EspData in the database
        List<EspData> espDataList = espDataRepository.findAll();
        assertThat(espDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEspData() throws Exception {
        int databaseSizeBeforeUpdate = espDataRepository.findAll().size();
        espData.setId(count.incrementAndGet());

        // Create the EspData
        EspDataDto espDataDto = espDataMapper.toDto(espData);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEspDataMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(espDataDto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EspData in the database
        List<EspData> espDataList = espDataRepository.findAll();
        assertThat(espDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEspData() throws Exception {
        int databaseSizeBeforeUpdate = espDataRepository.findAll().size();
        espData.setId(count.incrementAndGet());

        // Create the EspData
        EspDataDto espDataDto = espDataMapper.toDto(espData);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEspDataMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(espDataDto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EspData in the database
        List<EspData> espDataList = espDataRepository.findAll();
        assertThat(espDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEspData() throws Exception {
        // Initialize the database
        espDataRepository.saveAndFlush(espData);

        int databaseSizeBeforeDelete = espDataRepository.findAll().size();

        // Delete the espData
        restEspDataMockMvc
            .perform(delete(ENTITY_API_URL_ID, espData.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EspData> espDataList = espDataRepository.findAll();
        assertThat(espDataList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
