package com.rustz.rucumate.service;

import com.rustz.rucumate.service.dto.ValveDto;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.rustz.rucumate.domain.Valve}.
 */
public interface ValveService {
    /**
     * Save a valve.
     *
     * @param valveDto the entity to save.
     * @return the persisted entity.
     */
    ValveDto save(ValveDto valveDto);

    /**
     * Updates a valve.
     *
     * @param valveDto the entity to update.
     * @return the persisted entity.
     */
    ValveDto update(ValveDto valveDto);

    /**
     * Partially updates a valve.
     *
     * @param valveDto the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ValveDto> partialUpdate(ValveDto valveDto);

    /**
     * Get all the valves.
     *
     * @return the list of entities.
     */
    List<ValveDto> findAll();

    /**
     * Get the "id" valve.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ValveDto> findOne(Long id);

    /**
     * Delete the "id" valve.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
