package com.rustz.rucumate.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.rustz.rucumate.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NotificationDtoTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(NotificationDto.class);
        NotificationDto notificationDto1 = new NotificationDto();
        notificationDto1.setId(1L);
        NotificationDto notificationDto2 = new NotificationDto();
        assertThat(notificationDto1).isNotEqualTo(notificationDto2);
        notificationDto2.setId(notificationDto1.getId());
        assertThat(notificationDto1).isEqualTo(notificationDto2);
        notificationDto2.setId(2L);
        assertThat(notificationDto1).isNotEqualTo(notificationDto2);
        notificationDto1.setId(null);
        assertThat(notificationDto1).isNotEqualTo(notificationDto2);
    }
}
