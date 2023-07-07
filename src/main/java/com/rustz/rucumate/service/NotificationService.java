package com.rustz.rucumate.service;

import com.rustz.rucumate.service.dto.NotificationDto;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.rustz.rucumate.domain.Notification}.
 */
public interface NotificationService {
    /**
     * Save a notification.
     *
     * @param notificationDto the entity to save.
     * @return the persisted entity.
     */
    NotificationDto save(NotificationDto notificationDto);

    /**
     * Updates a notification.
     *
     * @param notificationDto the entity to update.
     * @return the persisted entity.
     */
    NotificationDto update(NotificationDto notificationDto);

    /**
     * Partially updates a notification.
     *
     * @param notificationDto the entity to update partially.
     * @return the persisted entity.
     */
    Optional<NotificationDto> partialUpdate(NotificationDto notificationDto);

    /**
     * Get all the notifications.
     *
     * @return the list of entities.
     */
    List<NotificationDto> findAll();

    /**
     * Get the "id" notification.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NotificationDto> findOne(Long id);

    /**
     * Delete the "id" notification.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
