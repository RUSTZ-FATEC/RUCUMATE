package com.rustz.rucumate.service.mapper;

import com.rustz.rucumate.domain.Notification;
import com.rustz.rucumate.domain.User;
import com.rustz.rucumate.service.dto.NotificationDto;
import com.rustz.rucumate.service.dto.UserDto;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Notification} and its DTO {@link NotificationDto}.
 */
@Mapper(componentModel = "spring")
public interface NotificationMapper extends EntityMapper<NotificationDto, Notification> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userId")
    NotificationDto toDto(Notification s);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDto toDtoUserId(User user);
}
