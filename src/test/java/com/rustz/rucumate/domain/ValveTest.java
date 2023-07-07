package com.rustz.rucumate.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.rustz.rucumate.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ValveTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Valve.class);
        Valve valve1 = new Valve();
        valve1.setId(1L);
        Valve valve2 = new Valve();
        valve2.setId(valve1.getId());
        assertThat(valve1).isEqualTo(valve2);
        valve2.setId(2L);
        assertThat(valve1).isNotEqualTo(valve2);
        valve1.setId(null);
        assertThat(valve1).isNotEqualTo(valve2);
    }
}
