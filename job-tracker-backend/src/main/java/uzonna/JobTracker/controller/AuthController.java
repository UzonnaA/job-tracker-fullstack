package uzonna.JobTracker.controller;

import uzonna.JobTracker.model.User;
import uzonna.JobTracker.repository.UserRepository;
import uzonna.JobTracker.security.JwtService;
import uzonna.JobTracker.dto.LoginRequest;
import uzonna.JobTracker.dto.LoginResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired private UserRepository userRepository;
    @Autowired private JwtService jwtService;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername());
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(new LoginResponse(token, user.getUsername()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest request) {
        if (userRepository.findByUsername(request.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(newUser);

        String token = jwtService.generateToken(newUser);
        return ResponseEntity.ok(new LoginResponse(token, newUser.getUsername()));
    }

}