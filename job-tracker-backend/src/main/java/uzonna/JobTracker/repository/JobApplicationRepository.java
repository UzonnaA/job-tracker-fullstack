package uzonna.JobTracker.repository;

import uzonna.JobTracker.model.JobApplication;
import uzonna.JobTracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    // Get all applications for a specific user
    List<JobApplication> findByUser(User user);

    // We love automatic functions
    void deleteByUser(User user);

    // Get filtered applications belonging to a specific user
    @Query("SELECT j FROM JobApplication j WHERE j.user = :user AND " +
           "(:company IS NULL OR j.company = :company) AND " +
           "(:status IS NULL OR j.status = :status) AND " +
           "(:tag IS NULL OR :tag MEMBER OF j.tags)")
    List<JobApplication> findByUserAndFilters(
        @Param("user") User user,
        @Param("company") String company,
        @Param("status") String status,
        @Param("tag") String tag
    );
}

