package com.rustz.rucumate.service.impl;

import com.rustz.rucumate.domain.Notification;
import com.rustz.rucumate.repository.NotificationRepository;
import com.rustz.rucumate.service.NotificationService;
import com.rustz.rucumate.service.dto.NotificationDto;
import com.rustz.rucumate.service.mapper.NotificationMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Notification}.
 */
@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final Logger log = LoggerFactory.getLogger(NotificationServiceImpl.class);

    private final NotificationRepository notificationRepository;

    private final NotificationMapper notificationMapper;

    public NotificationServiceImpl(NotificationRepository notificationRepository, NotificationMapper notificationMapper) {
        this.notificationRepository = notificationRepository;
        this.notificationMapper = notificationMapper;
    }

    @Override
    public NotificationDto save(NotificationDto notificationDto) {
        log.debug("Request to save Notification : {}", notificationDto);
        Notification notification = notificationMapper.toEntity(notificationDto);
        notification = notificationRepository.save(notification);
        return notificationMapper.toDto(notification);
    }

    @Override
    public NotificationDto update(NotificationDto notificationDto) {
        log.debug("Request to update Notification : {}", notificationDto);
        Notification notification = notificationMapper.toEntity(notificationDto);
        notification = notificationRepository.save(notification);
        return notificationMapper.toDto(notification);
    }

    @Override
    public Optional<NotificationDto> partialUpdate(NotificationDto notificationDto) {
        log.debug("Request to partially update Notification : {}", notificationDto);

        return notificationRepository
            .findById(notificationDto.getId())
            .map(existingNotification -> {
                notificationMapper.partialUpdate(existingNotification, notificationDto);

                return existingNotification;
            })
            .map(notificationRepository::save)
            .map(notificationMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationDto> findAll() {
        log.debug("Request to get all Notifications");
        return notificationRepository.findAll().stream().map(notificationMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<NotificationDto> findOne(Long id) {
        log.debug("Request to get Notification : {}", id);
        return notificationRepository.findById(id).map(notificationMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Notification : {}", id);
        notificationRepository.deleteById(id);
    }
}
