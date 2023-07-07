package com.rustz.rucumate.repository;

import com.rustz.rucumate.domain.Notification;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Notification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>, JpaSpecificationExecutor<Notification> {
    @Query("select notification from Notification notification where notification.user.login = ?#{principal.username}")
    List<Notification> findByUserIsCurrentUser();
}
