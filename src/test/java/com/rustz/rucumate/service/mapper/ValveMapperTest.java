package com.rustz.rucumate.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ValveMapperTest {

    private ValveMapper valveMapper;

    @BeforeEach
    public void setUp() {
        valveMapper = new ValveMapperImpl();
    }
}
