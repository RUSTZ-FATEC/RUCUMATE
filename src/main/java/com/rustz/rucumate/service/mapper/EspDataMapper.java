package com.rustz.rucumate.service.mapper;

import com.rustz.rucumate.domain.EspData;
import com.rustz.rucumate.domain.User;
import com.rustz.rucumate.service.dto.EspDataDto;
import com.rustz.rucumate.service.dto.UserDto;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EspData} and its DTO {@link EspDataDto}.
 */
@Mapper(componentModel = "spring")
public interface EspDataMapper extends EntityMapper<EspDataDto, EspData> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userId")
    EspDataDto toDto(EspData s);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDto toDtoUserId(User user);
}
