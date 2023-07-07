package com.rustz.rucumate.service;

import com.rustz.rucumate.service.dto.EspDataDto;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.rustz.rucumate.domain.EspData}.
 */
public interface EspDataService {
    /**
     * Save a espData.
     *
     * @param espDataDto the entity to save.
     * @return the persisted entity.
     */
    EspDataDto save(EspDataDto espDataDto);

    /**
     * Updates a espData.
     *
     * @param espDataDto the entity to update.
     * @return the persisted entity.
     */
    EspDataDto update(EspDataDto espDataDto);

    /**
     * Partially updates a espData.
     *
     * @param espDataDto the entity to update partially.
     * @return the persisted entity.
     */
    Optional<EspDataDto> partialUpdate(EspDataDto espDataDto);

    /**
     * Get all the espData.
     *
     * @return the list of entities.
     */
    List<EspDataDto> findAll();

    /**
     * Get the "id" espData.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EspDataDto> findOne(Long id);

    /**
     * Delete the "id" espData.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
