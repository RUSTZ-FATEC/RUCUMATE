package com.rustz.rucumate.service;

import com.rustz.rucumate.domain.*; // for static metamodels
import com.rustz.rucumate.domain.Valve;
import com.rustz.rucumate.repository.ValveRepository;
import com.rustz.rucumate.service.criteria.ValveCriteria;
import com.rustz.rucumate.service.dto.ValveDto;
import com.rustz.rucumate.service.mapper.ValveMapper;
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
 * Service for executing complex queries for {@link Valve} entities in the database.
 * The main input is a {@link ValveCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link ValveDto} or a {@link Page} of {@link ValveDto} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ValveQueryService extends QueryService<Valve> {

    private final Logger log = LoggerFactory.getLogger(ValveQueryService.class);

    private final ValveRepository valveRepository;

    private final ValveMapper valveMapper;

    public ValveQueryService(ValveRepository valveRepository, ValveMapper valveMapper) {
        this.valveRepository = valveRepository;
        this.valveMapper = valveMapper;
    }

    /**
     * Return a {@link List} of {@link ValveDto} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<ValveDto> findByCriteria(ValveCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Valve> specification = createSpecification(criteria);
        return valveMapper.toDto(valveRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link ValveDto} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<ValveDto> findByCriteria(ValveCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Valve> specification = createSpecification(criteria);
        return valveRepository.findAll(specification, page).map(valveMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ValveCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Valve> specification = createSpecification(criteria);
        return valveRepository.count(specification);
    }

    /**
     * Function to convert {@link ValveCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Valve> createSpecification(ValveCriteria criteria) {
        Specification<Valve> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Valve_.id));
            }
            if (criteria.getStatus() != null) {
                specification = specification.and(buildSpecification(criteria.getStatus(), Valve_.status));
            }
            if (criteria.getUserId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getUserId(), root -> root.join(Valve_.user, JoinType.LEFT).get(User_.id))
                    );
            }
        }
        return specification;
    }
}
