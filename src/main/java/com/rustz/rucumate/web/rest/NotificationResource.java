package com.rustz.rucumate.web.rest;

import com.rustz.rucumate.repository.NotificationRepository;
import com.rustz.rucumate.service.NotificationQueryService;
import com.rustz.rucumate.service.NotificationService;
import com.rustz.rucumate.service.criteria.NotificationCriteria;
import com.rustz.rucumate.service.dto.NotificationDto;
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
 * REST controller for managing {@link com.rustz.rucumate.domain.Notification}.
 */
@RestController
@RequestMapping("/api")
public class NotificationResource {

    private final Logger log = LoggerFactory.getLogger(NotificationResource.class);

    private static final String ENTITY_NAME = "notification";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NotificationService notificationService;

    private final NotificationRepository notificationRepository;

    private final NotificationQueryService notificationQueryService;

    public NotificationResource(
        NotificationService notificationService,
        NotificationRepository notificationRepository,
        NotificationQueryService notificationQueryService
    ) {
        this.notificationService = notificationService;
        this.notificationRepository = notificationRepository;
        this.notificationQueryService = notificationQueryService;
    }

    /**
     * {@code POST  /notifications} : Create a new notification.
     *
     * @param notificationDto the notificationDto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new notificationDto, or with status {@code 400 (Bad Request)} if the notification has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/notifications")
    public ResponseEntity<NotificationDto> createNotification(@RequestBody NotificationDto notificationDto) throws URISyntaxException {
        log.debug("REST request to save Notification : {}", notificationDto);
        if (notificationDto.getId() != null) {
            throw new BadRequestAlertException("A new notification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NotificationDto result = notificationService.save(notificationDto);
        return ResponseEntity
            .created(new URI("/api/notifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /notifications/:id} : Updates an existing notification.
     *
     * @param id the id of the notificationDto to save.
     * @param notificationDto the notificationDto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated notificationDto,
     * or with status {@code 400 (Bad Request)} if the notificationDto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the notificationDto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/notifications/{id}")
    public ResponseEntity<NotificationDto> updateNotification(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody NotificationDto notificationDto
    ) throws URISyntaxException {
        log.debug("REST request to update Notification : {}, {}", id, notificationDto);
        if (notificationDto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, notificationDto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!notificationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        NotificationDto result = notificationService.update(notificationDto);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, notificationDto.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /notifications/:id} : Partial updates given fields of an existing notification, field will ignore if it is null
     *
     * @param id the id of the notificationDto to save.
     * @param notificationDto the notificationDto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated notificationDto,
     * or with status {@code 400 (Bad Request)} if the notificationDto is not valid,
     * or with status {@code 404 (Not Found)} if the notificationDto is not found,
     * or with status {@code 500 (Internal Server Error)} if the notificationDto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/notifications/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<NotificationDto> partialUpdateNotification(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody NotificationDto notificationDto
    ) throws URISyntaxException {
        log.debug("REST request to partial update Notification partially : {}, {}", id, notificationDto);
        if (notificationDto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, notificationDto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!notificationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<NotificationDto> result = notificationService.partialUpdate(notificationDto);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, notificationDto.getId().toString())
        );
    }

    /**
     * {@code GET  /notifications} : get all the notifications.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of notifications in body.
     */
    @GetMapping("/notifications")
    public ResponseEntity<List<NotificationDto>> getAllNotifications(NotificationCriteria criteria) {
        log.debug("REST request to get Notifications by criteria: {}", criteria);
        List<NotificationDto> entityList = notificationQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /notifications/count} : count all the notifications.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/notifications/count")
    public ResponseEntity<Long> countNotifications(NotificationCriteria criteria) {
        log.debug("REST request to count Notifications by criteria: {}", criteria);
        return ResponseEntity.ok().body(notificationQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /notifications/:id} : get the "id" notification.
     *
     * @param id the id of the notificationDto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the notificationDto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/notifications/{id}")
    public ResponseEntity<NotificationDto> getNotification(@PathVariable Long id) {
        log.debug("REST request to get Notification : {}", id);
        Optional<NotificationDto> notificationDto = notificationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(notificationDto);
    }

    /**
     * {@code DELETE  /notifications/:id} : delete the "id" notification.
     *
     * @param id the id of the notificationDto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/notifications/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        log.debug("REST request to delete Notification : {}", id);
        notificationService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
