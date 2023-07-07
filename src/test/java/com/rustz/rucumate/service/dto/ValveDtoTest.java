package com.rustz.rucumate.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.rustz.rucumate.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ValveDtoTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ValveDto.class);
        ValveDto valveDto1 = new ValveDto();
        valveDto1.setId(1L);
        ValveDto valveDto2 = new ValveDto();
        assertThat(valveDto1).isNotEqualTo(valveDto2);
        valveDto2.setId(valveDto1.getId());
        assertThat(valveDto1).isEqualTo(valveDto2);
        valveDto2.setId(2L);
        assertThat(valveDto1).isNotEqualTo(valveDto2);
        valveDto1.setId(null);
        assertThat(valveDto1).isNotEqualTo(valveDto2);
    }
}
