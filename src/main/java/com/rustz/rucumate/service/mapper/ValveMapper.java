package com.rustz.rucumate.service.mapper;

import com.rustz.rucumate.domain.User;
import com.rustz.rucumate.domain.Valve;
import com.rustz.rucumate.service.dto.UserDto;
import com.rustz.rucumate.service.dto.ValveDto;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Valve} and its DTO {@link ValveDto}.
 */
@Mapper(componentModel = "spring")
public interface ValveMapper extends EntityMapper<ValveDto, Valve> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userId")
    ValveDto toDto(Valve s);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDto toDtoUserId(User user);
}
