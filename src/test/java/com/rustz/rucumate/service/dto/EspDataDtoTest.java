package com.rustz.rucumate.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.rustz.rucumate.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EspDataDtoTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EspDataDto.class);
        EspDataDto espDataDto1 = new EspDataDto();
        espDataDto1.setId(1L);
        EspDataDto espDataDto2 = new EspDataDto();
        assertThat(espDataDto1).isNotEqualTo(espDataDto2);
        espDataDto2.setId(espDataDto1.getId());
        assertThat(espDataDto1).isEqualTo(espDataDto2);
        espDataDto2.setId(2L);
        assertThat(espDataDto1).isNotEqualTo(espDataDto2);
        espDataDto1.setId(null);
        assertThat(espDataDto1).isNotEqualTo(espDataDto2);
    }
}
