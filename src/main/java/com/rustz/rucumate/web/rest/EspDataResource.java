package com.rustz.rucumate.web.rest;

import com.rustz.rucumate.repository.EspDataRepository;
import com.rustz.rucumate.service.EspDataQueryService;
import com.rustz.rucumate.service.EspDataService;
import com.rustz.rucumate.service.criteria.EspDataCriteria;
import com.rustz.rucumate.service.dto.EspDataDto;
import com.rustz.rucumate.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.rustz.rucumate.domain.EspData}.
 */
@RestController
@RequestMapping("/api")
public class EspDataResource {

    private final Logger log = LoggerFactory.getLogger(EspDataResource.class);

    private static final String ENTITY_NAME = "espData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EspDataService espDataService;

    private final EspDataRepository espDataRepository;

    private final EspDataQueryService espDataQueryService;

    public EspDataResource(EspDataService espDataService, EspDataRepository espDataRepository, EspDataQueryService espDataQueryService) {
        this.espDataService = espDataService;
        this.espDataRepository = espDataRepository;
        this.espDataQueryService = espDataQueryService;
    }

    /**
     * {@code POST  /esp-data} : Create a new espData.
     *
     * @param espDataDto the espDataDto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new espDataDto, or with status {@code 400 (Bad Request)} if the espData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/esp-data")
    public ResponseEntity<EspDataDto> createEspData(@RequestBody EspDataDto espDataDto) throws URISyntaxException {
        log.debug("REST request to save EspData : {}", espDataDto);
        if (espDataDto.getId() != null) {
            throw new BadRequestAlertException("A new espData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EspDataDto result = espDataService.save(espDataDto);
        return ResponseEntity
            .created(new URI("/api/esp-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /esp-data/:id} : Updates an existing espData.
     *
     * @param id the id of the espDataDto to save.
     * @param espDataDto the espDataDto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated espDataDto,
     * or with status {@code 400 (Bad Request)} if the espDataDto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the espDataDto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/esp-data/{id}")
    public ResponseEntity<EspDataDto> updateEspData(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody EspDataDto espDataDto
    ) throws URISyntaxException {
        log.debug("REST request to update EspData : {}, {}", id, espDataDto);
        if (espDataDto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, espDataDto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!espDataRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        EspDataDto result = espDataService.update(espDataDto);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, espDataDto.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /esp-data/:id} : Partial updates given fields of an existing espData, field will ignore if it is null
     *
     * @param id the id of the espDataDto to save.
     * @param espDataDto the espDataDto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated espDataDto,
     * or with status {@code 400 (Bad Request)} if the espDataDto is not valid,
     * or with status {@code 404 (Not Found)} if the espDataDto is not found,
     * or with status {@code 500 (Internal Server Error)} if the espDataDto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/esp-data/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<EspDataDto> partialUpdateEspData(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody EspDataDto espDataDto
    ) throws URISyntaxException {
        log.debug("REST request to partial update EspData partially : {}, {}", id, espDataDto);
        if (espDataDto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, espDataDto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!espDataRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<EspDataDto> result = espDataService.partialUpdate(espDataDto);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, espDataDto.getId().toString())
        );
    }

    /**
     * {@code GET  /esp-data} : get all the espData.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of espData in body.
     */
    @GetMapping("/esp-data")
    public ResponseEntity<List<EspDataDto>> getAllEspData(EspDataCriteria criteria) {
        log.debug("REST request to get EspData by criteria: {}", criteria);
        List<EspDataDto> entityList = espDataQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /esp-data/count} : count all the espData.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/esp-data/count")
    public ResponseEntity<Long> countEspData(EspDataCriteria criteria) {
        log.debug("REST request to count EspData by criteria: {}", criteria);
        return ResponseEntity.ok().body(espDataQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /esp-data/:id} : get the "id" espData.
     *
     * @param id the id of the espDataDto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the espDataDto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/esp-data/{id}")
    public ResponseEntity<EspDataDto> getEspData(@PathVariable Long id) {
        log.debug("REST request to get EspData : {}", id);
        Optional<EspDataDto> espDataDto = espDataService.findOne(id);
        return ResponseUtil.wrapOrNotFound(espDataDto);
    }

    /**
     * {@code DELETE  /esp-data/:id} : delete the "id" espData.
     *
     * @param id the id of the espDataDto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/esp-data/{id}")
    public ResponseEntity<Void> deleteEspData(@PathVariable Long id) {
        log.debug("REST request to delete EspData : {}", id);
        espDataService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
