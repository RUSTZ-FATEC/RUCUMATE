package com.rustz.rucumate.service.impl;

import com.rustz.rucumate.domain.EspData;
import com.rustz.rucumate.repository.EspDataRepository;
import com.rustz.rucumate.service.EspDataService;
import com.rustz.rucumate.service.dto.EspDataDto;
import com.rustz.rucumate.service.mapper.EspDataMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link EspData}.
 */
@Service
@Transactional
public class EspDataServiceImpl implements EspDataService {

    private final Logger log = LoggerFactory.getLogger(EspDataServiceImpl.class);

    private final EspDataRepository espDataRepository;

    private final EspDataMapper espDataMapper;

    public EspDataServiceImpl(EspDataRepository espDataRepository, EspDataMapper espDataMapper) {
        this.espDataRepository = espDataRepository;
        this.espDataMapper = espDataMapper;
    }

    @Override
    public EspDataDto save(EspDataDto espDataDto) {
        log.debug("Request to save EspData : {}", espDataDto);
        EspData espData = espDataMapper.toEntity(espDataDto);
        espData = espDataRepository.save(espData);
        return espDataMapper.toDto(espData);
    }

    @Override
    public EspDataDto update(EspDataDto espDataDto) {
        log.debug("Request to update EspData : {}", espDataDto);
        EspData espData = espDataMapper.toEntity(espDataDto);
        espData = espDataRepository.save(espData);
        return espDataMapper.toDto(espData);
    }

    @Override
    public Optional<EspDataDto> partialUpdate(EspDataDto espDataDto) {
        log.debug("Request to partially update EspData : {}", espDataDto);

        return espDataRepository
            .findById(espDataDto.getId())
            .map(existingEspData -> {
                espDataMapper.partialUpdate(existingEspData, espDataDto);

                return existingEspData;
            })
            .map(espDataRepository::save)
            .map(espDataMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EspDataDto> findAll() {
        log.debug("Request to get all EspData");
        return espDataRepository.findAll().stream().map(espDataMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<EspDataDto> findOne(Long id) {
        log.debug("Request to get EspData : {}", id);
        return espDataRepository.findById(id).map(espDataMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete EspData : {}", id);
        espDataRepository.deleteById(id);
    }
}
