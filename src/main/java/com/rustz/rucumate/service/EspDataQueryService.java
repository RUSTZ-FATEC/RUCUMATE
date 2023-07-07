package com.rustz.rucumate.service;

import com.rustz.rucumate.domain.*; // for static metamodels
import com.rustz.rucumate.domain.EspData;
import com.rustz.rucumate.repository.EspDataRepository;
import com.rustz.rucumate.service.criteria.EspDataCriteria;
import com.rustz.rucumate.service.dto.EspDataDto;
import com.rustz.rucumate.service.mapper.EspDataMapper;
import java.util.List;
import javax.persistence.criteria.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link EspData} entities in the database.
 * The main input is a {@link EspDataCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link EspDataDto} or a {@link Page} of {@link EspDataDto} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class EspDataQueryService extends QueryService<EspData> {

    private final Logger log = LoggerFactory.getLogger(EspDataQueryService.class);

    private final EspDataRepository espDataRepository;

    private final EspDataMapper espDataMapper;

    public EspDataQueryService(EspDataRepository espDataRepository, EspDataMapper espDataMapper) {
        this.espDataRepository = espDataRepository;
        this.espDataMapper = espDataMapper;
    }

    /**
     * Return a {@link List} of {@link EspDataDto} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<EspDataDto> findByCriteria(EspDataCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<EspData> specification = createSpecification(criteria);
        return espDataMapper.toDto(espDataRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link EspDataDto} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<EspDataDto> findByCriteria(EspDataCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<EspData> specification = createSpecification(criteria);
        return espDataRepository.findAll(specification, page).map(espDataMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(EspDataCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<EspData> specification = createSpecification(criteria);
        return espDataRepository.count(specification);
    }

    /**
     * Function to convert {@link EspDataCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<EspData> createSpecification(EspDataCriteria criteria) {
        Specification<EspData> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), EspData_.id));
            }
            if (criteria.getSensorId() != null) {
                specification = specification.and(buildStringSpecification(criteria.getSensorId(), EspData_.sensorId));
            }
            if (criteria.getTemperature() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getTemperature(), EspData_.temperature));
            }
            if (criteria.getHumidity() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getHumidity(), EspData_.humidity));
            }
            if (criteria.getUserId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getUserId(), root -> root.join(EspData_.user, JoinType.LEFT).get(User_.id))
                    );
            }
        }
        return specification;
    }
}
