package com.rustz.rucumate.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.rustz.rucumate.IntegrationTest;
import com.rustz.rucumate.domain.User;
import com.rustz.rucumate.domain.Valve;
import com.rustz.rucumate.repository.ValveRepository;
import com.rustz.rucumate.service.criteria.ValveCriteria;
import com.rustz.rucumate.service.dto.ValveDto;
import com.rustz.rucumate.service.mapper.ValveMapper;
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
 * Integration tests for the {@link ValveResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ValveResourceIT {

    private static final Boolean DEFAULT_STATUS = false;
    private static final Boolean UPDATED_STATUS = true;

    private static final String ENTITY_API_URL = "/api/valves";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ValveRepository valveRepository;

    @Autowired
    private ValveMapper valveMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restValveMockMvc;

    private Valve valve;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Valve createEntity(EntityManager em) {
        Valve valve = new Valve().status(DEFAULT_STATUS);
        return valve;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Valve createUpdatedEntity(EntityManager em) {
        Valve valve = new Valve().status(UPDATED_STATUS);
        return valve;
    }

    @BeforeEach
    public void initTest() {
        valve = createEntity(em);
    }

    @Test
    @Transactional
    void createValve() throws Exception {
        int databaseSizeBeforeCreate = valveRepository.findAll().size();
        // Create the Valve
        ValveDto valveDto = valveMapper.toDto(valve);
        restValveMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(valveDto)))
            .andExpect(status().isCreated());

        // Validate the Valve in the database
        List<Valve> valveList = valveRepository.findAll();
        assertThat(valveList).hasSize(databaseSizeBeforeCreate + 1);
        Valve testValve = valveList.get(valveList.size() - 1);
        assertThat(testValve.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void createValveWithExistingId() throws Exception {
        // Create the Valve with an existing ID
        valve.setId(1L);
        ValveDto valveDto = valveMapper.toDto(valve);

        int databaseSizeBeforeCreate = valveRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restValveMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(valveDto)))
            .andExpect(status().isBadRequest());

        // Validate the Valve in the database
        List<Valve> valveList = valveRepository.findAll();
        assertThat(valveList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = valveRepository.findAll().size();
        // set the field null
        valve.setStatus(null);

        // Create the Valve, which fails.
        ValveDto valveDto = valveMapper.toDto(valve);

        restValveMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(valveDto)))
            .andExpect(status().isBadRequest());

        List<Valve> valveList = valveRepository.findAll();
        assertThat(valveList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllValves() throws Exception {
        // Initialize the database
        valveRepository.saveAndFlush(valve);

        // Get all the valveList
        restValveMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(valve.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())));
    }

    @Test
    @Transactional
    void getValve() throws Exception {
        // Initialize the database
        valveRepository.saveAndFlush(valve);

        // Get the valve
        restValveMockMvc
            .perform(get(ENTITY_API_URL_ID, valve.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(valve.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.booleanValue()));
    }

    @Test
    @Transactional
    void getValvesByIdFiltering() throws Exception {
        // Initialize the database
        valveRepository.saveAndFlush(valve);

        Long id = valve.getId();

        defaultValveShouldBeFound("id.equals=" + id);
        defaultValveShouldNotBeFound("id.notEquals=" + id);

        defaultValveShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultValveShouldNotBeFound("id.greaterThan=" + id);

        defaultValveShouldBeFound("id.lessThanOrEqual=" + id);
        defaultValveShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllValvesByStatusIsEqualToSomething() throws Exception {
        // Initialize the database
        valveRepository.saveAndFlush(valve);

        // Get all the valveList where status equals to DEFAULT_STATUS
        defaultValveShouldBeFound("status.equals=" + DEFAULT_STATUS);

        // Get all the valveList where status equals to UPDATED_STATUS
        defaultValveShouldNotBeFound("status.equals=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllValvesByStatusIsInShouldWork() throws Exception {
        // Initialize the database
        valveRepository.saveAndFlush(valve);

        // Get all the valveList where status in DEFAULT_STATUS or UPDATED_STATUS
        defaultValveShouldBeFound("status.in=" + DEFAULT_STATUS + "," + UPDATED_STATUS);

        // Get all the valveList where status equals to UPDATED_STATUS
        defaultValveShouldNotBeFound("status.in=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllValvesByStatusIsNullOrNotNull() throws Exception {
        // Initialize the database
        valveRepository.saveAndFlush(valve);

        // Get all the valveList where status is not null
        defaultValveShouldBeFound("status.specified=true");

        // Get all the valveList where status is null
        defaultValveShouldNotBeFound("status.specified=false");
    }

    @Test
    @Transactional
    void getAllValvesByUserIsEqualToSomething() throws Exception {
        User user;
        if (TestUtil.findAll(em, User.class).isEmpty()) {
            valveRepository.saveAndFlush(valve);
            user = UserResourceIT.createEntity(em);
        } else {
            user = TestUtil.findAll(em, User.class).get(0);
        }
        em.persist(user);
        em.flush();
        valve.setUser(user);
        valveRepository.saveAndFlush(valve);
        Long userId = user.getId();

        // Get all the valveList where user equals to userId
        defaultValveShouldBeFound("userId.equals=" + userId);

        // Get all the valveList where user equals to (userId + 1)
        defaultValveShouldNotBeFound("userId.equals=" + (userId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultValveShouldBeFound(String filter) throws Exception {
        restValveMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(valve.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())));

        // Check, that the count call also returns 1
        restValveMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultValveShouldNotBeFound(String filter) throws Exception {
        restValveMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restValveMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingValve() throws Exception {
        // Get the valve
        restValveMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingValve() throws Exception {
        // Initialize the database
        valveRepository.saveAndFlush(valve);

        int databaseSizeBeforeUpdate = valveRepository.findAll().size();

        // Update the valve
        Valve updatedValve = valveRepository.findById(valve.getId()).get();
        // Disconnect from session so that the updates on updatedValve are not directly saved in db
        em.detach(updatedValve);
        updatedValve.status(UPDATED_STATUS);
        ValveDto valveDto = valveMapper.toDto(updatedValve);

        restValveMockMvc
            .perform(
                put(ENTITY_API_URL_ID, valveDto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(valveDto))
            )
            .andExpect(status().isOk());

        // Validate the Valve in the database
        List<Valve> valveList = valveRepository.findAll();
        assertThat(valveList).hasSize(databaseSizeBeforeUpdate);
        Valve testValve = valveList.get(valveList.size() - 1);
        assertThat(testValve.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void putNonExistingValve() throws Exception {
        int databaseSizeBeforeUpdate = valveRepository.findAll().size();
        valve.setId(count.incrementAndGet());

        // Create the Valve
        ValveDto valveDto = valveMapper.toDto(valve);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restValveMockMvc
            .perform(
                put(ENTITY_API_URL_ID, valveDto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(valveDto))
            )
            .andExpect(status().isBadRequest());

        // Validate the Valve in the database
        List<Valve> valveList = valveRepository.findAll();
        assertThat(valveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchValve() throws Exception {
        int databaseSizeBeforeUpdate = valveRepository.findAll().size();
        valve.setId(count.incrementAndGet());

        // Create the Valve
        ValveDto valveDto = valveMapper.toDto(valve);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restValveMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(valveDto))
            )
            .andExpect(status().isBadRequest());

        // Validate the Valve in the database
        List<Valve> valveList = valveRepository.findAll();
        assertThat(valveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamValve() throws Exception {
        int databaseSizeBeforeUpdate = valveRepository.findAll().size();
        valve.setId(count.incrementAndGet());

        // Create the Valve
        ValveDto valveDto = valveMapper.toDto(valve);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restValveMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(valveDto)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Valve in the database
        List<Valve> valveList = valveRepository.findAll();
        assertThat(valveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateValveWithPatch() throws Exception {
        // Initialize the database
        valveRepository.saveAndFlush(valve);

        int databaseSizeBeforeUpdate = valveRepository.findAll().size();

        // Update the valve using partial update
        Valve partialUpdatedValve = new Valve();
        partialUpdatedValve.setId(valve.getId());

        restValveMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedValve.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedValve))
            )
            .andExpect(status().isOk());

        // Validate the Valve in the database
        List<Valve> valveList = valveRepository.findAll();
        assertThat(valveList).hasSize(databaseSizeBeforeUpdate);
        Valve testValve = valveList.get(valveList.size() - 1);
        assertThat(testValve.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void fullUpdateValveWithPatch() throws Exception {
        // Initialize the database
        valveRepository.saveAndFlush(valve);

        int databaseSizeBeforeUpdate = valveRepository.findAll().size();

        // Update the valve using partial update
        Valve partialUpdatedValve = new Valve();
        partialUpdatedValve.setId(valve.getId());

        partialUpdatedValve.status(UPDATED_STATUS);

        restValveMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedValve.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedValve))
            )
            .andExpect(status().isOk());

        // Validate the Valve in the database
        List<Valve> valveList = valveRepository.findAll();
        assertThat(valveList).hasSize(databaseSizeBeforeUpdate);
        Valve testValve = valveList.get(valveList.size() - 1);
        assertThat(testValve.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void patchNonExistingValve() throws Exception {
        int databaseSizeBeforeUpdate = valveRepository.findAll().size();
        valve.setId(count.incrementAndGet());

        // Create the Valve
        ValveDto valveDto = valveMapper.toDto(valve);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restValveMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, valveDto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(valveDto))
            )
            .andExpect(status().isBadRequest());

        // Validate the Valve in the database
        List<Valve> valveList = valveRepository.findAll();
        assertThat(valveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchValve() throws Exception {
        int databaseSizeBeforeUpdate = valveRepository.findAll().size();
        valve.setId(count.incrementAndGet());

        // Create the Valve
        ValveDto valveDto = valveMapper.toDto(valve);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restValveMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(valveDto))
            )
            .andExpect(status().isBadRequest());

        // Validate the Valve in the database
        List<Valve> valveList = valveRepository.findAll();
        assertThat(valveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamValve() throws Exception {
        int databaseSizeBeforeUpdate = valveRepository.findAll().size();
        valve.setId(count.incrementAndGet());

        // Create the Valve
        ValveDto valveDto = valveMapper.toDto(valve);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restValveMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(valveDto)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Valve in the database
        List<Valve> valveList = valveRepository.findAll();
        assertThat(valveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteValve() throws Exception {
        // Initialize the database
        valveRepository.saveAndFlush(valve);

        int databaseSizeBeforeDelete = valveRepository.findAll().size();

        // Delete the valve
        restValveMockMvc
            .perform(delete(ENTITY_API_URL_ID, valve.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Valve> valveList = valveRepository.findAll();
        assertThat(valveList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
