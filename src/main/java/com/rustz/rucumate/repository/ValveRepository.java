package com.rustz.rucumate.repository;

import com.rustz.rucumate.domain.Valve;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Valve entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ValveRepository extends JpaRepository<Valve, Long>, JpaSpecificationExecutor<Valve> {
    @Query("select valve from Valve valve where valve.user.login = ?#{principal.username}")
    List<Valve> findByUserIsCurrentUser();
}
