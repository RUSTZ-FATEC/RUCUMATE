package com.rustz.rucumate.service.impl;

import com.rustz.rucumate.domain.Valve;
import com.rustz.rucumate.repository.ValveRepository;
import com.rustz.rucumate.service.ValveService;
import com.rustz.rucumate.service.dto.ValveDto;
import com.rustz.rucumate.service.mapper.ValveMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Valve}.
 */
@Service
@Transactional
public class ValveServiceImpl implements ValveService {

    private final Logger log = LoggerFactory.getLogger(ValveServiceImpl.class);

    private final ValveRepository valveRepository;

    private final ValveMapper valveMapper;

    public ValveServiceImpl(ValveRepository valveRepository, ValveMapper valveMapper) {
        this.valveRepository = valveRepository;
        this.valveMapper = valveMapper;
    }

    @Override
    public ValveDto save(ValveDto valveDto) {
        log.debug("Request to save Valve : {}", valveDto);
        Valve valve = valveMapper.toEntity(valveDto);
        valve = valveRepository.save(valve);
        return valveMapper.toDto(valve);
    }

    @Override
    public ValveDto update(ValveDto valveDto) {
        log.debug("Request to update Valve : {}", valveDto);
        Valve valve = valveMapper.toEntity(valveDto);
        valve = valveRepository.save(valve);
        return valveMapper.toDto(valve);
    }

    @Override
    public Optional<ValveDto> partialUpdate(ValveDto valveDto) {
        log.debug("Request to partially update Valve : {}", valveDto);

        return valveRepository
            .findById(valveDto.getId())
            .map(existingValve -> {
                valveMapper.partialUpdate(existingValve, valveDto);

                return existingValve;
            })
            .map(valveRepository::save)
            .map(valveMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ValveDto> findAll() {
        log.debug("Request to get all Valves");
        return valveRepository.findAll().stream().map(valveMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ValveDto> findOne(Long id) {
        log.debug("Request to get Valve : {}", id);
        return valveRepository.findById(id).map(valveMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Valve : {}", id);
        valveRepository.deleteById(id);
    }
}
