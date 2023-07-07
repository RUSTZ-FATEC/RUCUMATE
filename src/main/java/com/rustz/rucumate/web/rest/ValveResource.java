package com.rustz.rucumate.web.rest;

import com.rustz.rucumate.repository.ValveRepository;
import com.rustz.rucumate.service.ValveQueryService;
import com.rustz.rucumate.service.ValveService;
import com.rustz.rucumate.service.criteria.ValveCriteria;
import com.rustz.rucumate.service.dto.ValveDto;
import com.rustz.rucumate.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.rustz.rucumate.domain.Valve}.
 */
@RestController
@RequestMapping("/api")
public class ValveResource {

    private final Logger log = LoggerFactory.getLogger(ValveResource.class);

    private static final String ENTITY_NAME = "valve";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ValveService valveService;

    private final ValveRepository valveRepository;

    private final ValveQueryService valveQueryService;

    public ValveResource(ValveService valveService, ValveRepository valveRepository, ValveQueryService valveQueryService) {
        this.valveService = valveService;
        this.valveRepository = valveRepository;
        this.valveQueryService = valveQueryService;
    }

    /**
     * {@code POST  /valves} : Create a new valve.
     *
     * @param valveDto the valveDto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new valveDto, or with status {@code 400 (Bad Request)} if the valve has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/valves")
    public ResponseEntity<ValveDto> createValve(@Valid @RequestBody ValveDto valveDto) throws URISyntaxException {
        log.debug("REST request to save Valve : {}", valveDto);
        if (valveDto.getId() != null) {
            throw new BadRequestAlertException("A new valve cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ValveDto result = valveService.save(valveDto);
        return ResponseEntity
            .created(new URI("/api/valves/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /valves/:id} : Updates an existing valve.
     *
     * @param id the id of the valveDto to save.
     * @param valveDto the valveDto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated valveDto,
     * or with status {@code 400 (Bad Request)} if the valveDto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the valveDto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/valves/{id}")
    public ResponseEntity<ValveDto> updateValve(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ValveDto valveDto
    ) throws URISyntaxException {
        log.debug("REST request to update Valve : {}, {}", id, valveDto);
        if (valveDto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, valveDto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!valveRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ValveDto result = valveService.update(valveDto);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, valveDto.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /valves/:id} : Partial updates given fields of an existing valve, field will ignore if it is null
     *
     * @param id the id of the valveDto to save.
     * @param valveDto the valveDto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated valveDto,
     * or with status {@code 400 (Bad Request)} if the valveDto is not valid,
     * or with status {@code 404 (Not Found)} if the valveDto is not found,
     * or with status {@code 500 (Internal Server Error)} if the valveDto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/valves/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ValveDto> partialUpdateValve(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ValveDto valveDto
    ) throws URISyntaxException {
        log.debug("REST request to partial update Valve partially : {}, {}", id, valveDto);
        if (valveDto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, valveDto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!valveRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ValveDto> result = valveService.partialUpdate(valveDto);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, valveDto.getId().toString())
        );
    }

    /**
     * {@code GET  /valves} : get all the valves.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of valves in body.
     */
    @GetMapping("/valves")
    public ResponseEntity<List<ValveDto>> getAllValves(ValveCriteria criteria) {
        log.debug("REST request to get Valves by criteria: {}", criteria);
        List<ValveDto> entityList = valveQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /valves/count} : count all the valves.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/valves/count")
    public ResponseEntity<Long> countValves(ValveCriteria criteria) {
        log.debug("REST request to count Valves by criteria: {}", criteria);
        return ResponseEntity.ok().body(valveQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /valves/:id} : get the "id" valve.
     *
     * @param id the id of the valveDto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the valveDto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/valves/{id}")
    public ResponseEntity<ValveDto> getValve(@PathVariable Long id) {
        log.debug("REST request to get Valve : {}", id);
        Optional<ValveDto> valveDto = valveService.findOne(id);
        return ResponseUtil.wrapOrNotFound(valveDto);
    }

    /**
     * {@code DELETE  /valves/:id} : delete the "id" valve.
     *
     * @param id the id of the valveDto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/valves/{id}")
    public ResponseEntity<Void> deleteValve(@PathVariable Long id) {
        log.debug("REST request to delete Valve : {}", id);
        valveService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
