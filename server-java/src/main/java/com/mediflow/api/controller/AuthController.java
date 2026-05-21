package com.mediflow.api.controller;

import com.mediflow.api.model.User;
import com.mediflow.api.repository.UserRepository;
import com.mediflow.api.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Clinician Passkey Mapping to easily login standard roles in demo mode
    private final Map<String, String[]> keyMap = new HashMap<>() {{
        put("MED-ADM-777", new String[]{"admin@mediflow.com", "admin123"});
        put("MED-DOC-888", new String[]{"doctor@mediflow.com", "doctor123"});
        put("MED-NUR-999", new String[]{"nurse@mediflow.com", "nurse123"});
        put("MED-STF-111", new String[]{"staff@mediflow.com", "staff123"});
    }};

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");
            String role = request.get("role");
            String name = request.get("name");

            if (userRepository.findByEmail(email).isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Email already exists in system"));
            }

            String passwordHash = passwordEncoder.encode(password);
            User user = new User(email, passwordHash, role, name);
            User saved = userRepository.save(user);

            Map<String, Object> response = new HashMap<>();
            response.put("id", saved.getId());
            response.put("email", saved.getEmail());
            response.put("role", saved.getRole());
            response.put("name", saved.getName());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            String emailInput = request.get("email");
            String passwordInput = request.get("password");

            // Check if Clinician Passkey bypass is used
            if (emailInput != null && keyMap.containsKey(emailInput.toUpperCase())) {
                String[] mapped = keyMap.get(emailInput.toUpperCase());
                emailInput = mapped[0];
                passwordInput = mapped[1];
            }

            Optional<User> userOpt = userRepository.findByEmail(emailInput);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
            }

            User user = userOpt.get();
            if (!passwordEncoder.matches(passwordInput, user.getPasswordHash())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
            }

            // Generate token
            String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", Map.of(
                    "id", user.getId(),
                    "role", user.getRole(),
                    "name", user.getName(),
                    "email", user.getEmail()
            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe() {
        try {
            String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (email == null || email.equals("anonymousUser")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized"));
            }

            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
            }

            User user = userOpt.get();
            Map<String, Object> response = new HashMap<>();
            response.put("user", Map.of(
                    "id", user.getId(),
                    "role", user.getRole(),
                    "name", user.getName(),
                    "email", user.getEmail()
            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}
