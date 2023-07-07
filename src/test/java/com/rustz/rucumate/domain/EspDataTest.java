package com.rustz.rucumate.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.rustz.rucumate.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EspDataTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EspData.class);
        EspData espData1 = new EspData();
        espData1.setId(1L);
        EspData espData2 = new EspData();
        espData2.setId(espData1.getId());
        assertThat(espData1).isEqualTo(espData2);
        espData2.setId(2L);
        assertThat(espData1).isNotEqualTo(espData2);
        espData1.setId(null);
        assertThat(espData1).isNotEqualTo(espData2);
    }
}
