package com.mediflow.api.controller;

import com.mediflow.api.service.AiService;
import com.mediflow.api.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private AiService aiService;

    @PostMapping
    public ResponseEntity<?> chat(@RequestBody Map<String, Object> request) {
        try {
            List<Map<String, String>> messages = (List<Map<String, String>>) request.get("messages");
            Map<String, String> userContext = (Map<String, String>) request.get("userContext");

            if (messages == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        Map.of("error", "Invalid request body. Expected an array of messages.")
                );
            }

            // Fallback checking of authorization context if userContext doesn't supply role/name
            String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (userContext == null) {
                userContext = new HashMap<>();
            }
            
            if (!userContext.containsKey("name") && email != null && !email.equals("anonymousUser")) {
                userContext.put("name", email.split("@")[0]);
                userContext.put("role", "Clinician");
            }

            String replyText = aiService.generateAssistantChat(messages, userContext);
            return ResponseEntity.ok(Map.of("reply", replyText));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}
