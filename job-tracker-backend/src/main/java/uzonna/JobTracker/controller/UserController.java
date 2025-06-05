package uzonna.JobTracker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uzonna.JobTracker.model.User;
import uzonna.JobTracker.repository.JobApplicationRepository;
import uzonna.JobTracker.repository.UserRepository;
import uzonna.JobTracker.security.UserDetailsImpl;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;
    private final JobApplicationRepository jobApplicationRepository;

    public UserController(UserRepository userRepository, JobApplicationRepository jobApplicationRepository) {
        this.userRepository = userRepository;
        this.jobApplicationRepository = jobApplicationRepository;
    }

    @DeleteMapping("/delete-account")
    @Transactional
    public ResponseEntity<?> deleteAccount(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userDetails.getUser();

        // First delete all applications
        jobApplicationRepository.deleteByUser(user);

        // Then delete user
        userRepository.delete(user);

        return ResponseEntity.ok("Account and all associated applications deleted.");
    }

    @DeleteMapping("/delete-applications")
    public ResponseEntity<?> deleteApplications(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userDetails.getUser();
        jobApplicationRepository.deleteByUser(user);

        return ResponseEntity.ok("All applications deleted for user.");
    }
}
