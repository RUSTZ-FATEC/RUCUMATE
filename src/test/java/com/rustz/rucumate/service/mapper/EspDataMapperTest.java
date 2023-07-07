package com.rustz.rucumate.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EspDataMapperTest {

    private EspDataMapper espDataMapper;

    @BeforeEach
    public void setUp() {
        espDataMapper = new EspDataMapperImpl();
    }
}
