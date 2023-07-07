package com.rustz.rucumate.repository;

import com.rustz.rucumate.domain.EspData;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the EspData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EspDataRepository extends JpaRepository<EspData, Long>, JpaSpecificationExecutor<EspData> {
    @Query("select espData from EspData espData where espData.user.login = ?#{principal.username}")
    List<EspData> findByUserIsCurrentUser();
}
