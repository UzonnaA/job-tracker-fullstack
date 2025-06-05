package uzonna.JobTracker;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;

import org.springframework.test.web.servlet.MockMvc;

import uzonna.JobTracker.model.JobApplication;
import uzonna.JobTracker.model.User;
import uzonna.JobTracker.repository.JobApplicationRepository;
import uzonna.JobTracker.security.UserDetailsImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class JobApplicationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JobApplicationRepository repository;

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    private User user;
    private UserDetailsImpl userDetails;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setUsername("testuser");

        userDetails = new UserDetailsImpl(user);
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities()));
        SecurityContextHolder.setContext(context);
    }

    @Test
    void testCreateApplication() throws Exception {
        JobApplication app = new JobApplication("Dev", "Company", "APPLIED", LocalDate.now(), List.of("remote"));
        app.setUser(user);
        repository.save(app);

        mockMvc.perform(post("/api/applications")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(app)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.jobTitle").value("Dev"));
    }

    @Test
    void testGetApplications_noFilters() throws Exception {
        JobApplication app = new JobApplication("Dev", "Company", "APPLIED", LocalDate.now(), List.of("remote"));
        app.setUser(user);
        repository.save(app);

        mockMvc.perform(get("/api/applications"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].company").value("Company"));
    }

    @Test
    void testDeleteAllApplications() throws Exception {
        mockMvc.perform(delete("/api/applications"))
                .andExpect(status().isOk())
                .andExpect(content().string("All applications deleted."));
    }

    @Test
    void testGetStats() throws Exception {
        JobApplication app = new JobApplication("Dev", "Company", "APPLIED", LocalDate.now(), List.of("remote"));
        app.setUser(user);
        repository.save(app);

        mockMvc.perform(get("/api/applications/stats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.total").value(1))
                .andExpect(jsonPath("$.byStatus.APPLIED").value(1));
    }
}
