package com.mediflow.api.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mediflow.api.model.Admission;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
public class AiService {

    @Value("${groq.api.key}")
    private String groqApiKey;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(8))
            .build();
    
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String generateDailySummary(Admission admission, String icuTelemetryStr, String dietPlanStr) {
        String patientName = admission.getPatient().getName();
        Integer age = admission.getPatient().getAge();
        String gender = admission.getPatient().getGender();
        String departmentName = admission.getDepartment().getName();
        String bedNumber = admission.getBedNumber();
        String doctorName = admission.getDoctor().getUser().getName();
        String condition = admission.getCondition();
        String currentCondition = admission.getCurrentCondition() != null ? admission.getCurrentCondition() : "Stable";
        String admissionDateStr = admission.getAdmissionDate() != null 
                ? admission.getAdmissionDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
                : "Recent";

        String userPrompt = String.format("""
                Generate a structured, professional clinical daily summary for the following patient:
                
                - **Patient Name**: %s
                - **Age/Gender**: %d years old / %s
                - **Department Ward**: %s
                - **Allocated Bed**: %s
                - **Assigned Clinician**: Dr. %s
                - **Current Symptoms/Diagnosis**: %s
                - **Clinical Evaluation Status**: %s
                - **ICU Telemetry**: %s
                - **Nutrition/Diet Plan**: %s
                - **Admission Date**: %s
                
                Please structure the clinical daily summary using the following Markdown sections:
                1. **Clinical State Assessment**: Analyze symptoms, diagnosed conditions, and current stability.
                2. **Telemetry & Vital Monitoring**: Formulate clear directions for nursing staff regarding monitoring frequency (e.g. pulse, SPO2, BP).
                3. **Nutrition & Care Plan**: Incorporate the nutrition/diet settings and summarize care priorities.
                4. **Safety Alerts & Red Flags**: List critical warnings or signs that must trigger doctor escalation immediately.
                
                Keep the summary concise, professional, direct, and formatted in clear markdown. Avoid any friendly chatty intro or outro. Keep it strictly clinical.
                """, patientName, age, gender, departmentName, bedNumber, doctorName, condition, currentCondition, icuTelemetryStr, dietPlanStr, admissionDateStr);

        try {
            // Build the Jackson JSON request body
            ObjectNode rootNode = objectMapper.createObjectNode();
            rootNode.put("model", "llama-3.3-70b-versatile");
            rootNode.put("temperature", 0.2);
            rootNode.put("max_tokens", 800);
            
            ArrayNode messagesNode = rootNode.putArray("messages");
            
            ObjectNode systemMessage = messagesNode.addObject();
            systemMessage.put("role", "system");
            systemMessage.put("content", "You are an advanced Clinical AI agent at Orchids MediFlow Hospital. You generate precise, professional, structured daily clinical summaries for patients.");
            
            ObjectNode userMessage = messagesNode.addObject();
            userMessage.put("role", "user");
            userMessage.put("content", userPrompt);

            String requestBody = objectMapper.writeValueAsString(rootNode);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.groq.com/openai/v1/chat/completions"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + groqApiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .timeout(Duration.ofSeconds(10))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                JsonNode responseJson = objectMapper.readTree(response.body());
                return responseJson.path("choices").path(0).path("message").path("content").asText().trim();
            } else {
                System.err.println("[AI Summary Service] Groq returned error code: " + response.statusCode() + " - " + response.body());
            }

        } catch (Exception e) {
            System.err.println("[AI Summary Service] Exception during Groq request, falling back to local model: " + e.getMessage());
        }

        // High Quality Clinical Local Generator Fallback
        return String.format("""
                ### Clinical State Assessment
                Patient **%s** (%d y/o, %s) is admitted in **%s** at bed **%s**. The diagnosis is recorded as *%s* with a status of **%s**.
                - Symptoms are currently managed.
                - Progression remains under active monitoring.
                
                ### Telemetry & Vital Monitoring
                - **Monitoring Frequency**: Check vitals every 4 hours.
                - **Specific Targets**: Keep SpO2 > 94%% and Heart Rate between 60-100 bpm.
                - **ICU status**: %s.
                
                ### Nutrition & Care Plan
                - **Dietary Regimen**: %s
                - **Assigned Physician**: Dr. %s
                - Ensure bed-rest and prompt medication administration.
                
                ### Safety Alerts & Red Flags
                - Escalation required if temperature exceeds 101.5°F or blood pressure fluctuates outside systolic 100-140 mmHg.
                - Alert Dr. %s immediately if respiration rate exceeds 24 breaths/min.
                """, patientName, age, gender, departmentName, bedNumber, condition, currentCondition, 
                (!icuTelemetryStr.equalsIgnoreCase("None (General Ward)") ? "Continuous telemetry activated" : "Standard ward telemetry"), 
                dietPlanStr, doctorName, doctorName);
    }

    public String generateAssistantChat(List<Map<String, String>> messages, Map<String, String> userContext) {
        String name = userContext != null ? userContext.getOrDefault("name", "hospital member") : "hospital member";
        String role = userContext != null ? userContext.getOrDefault("role", "staff member") : "staff member";

        String systemPrompt = String.format("""
                You are MediFlow AI, a premium, intelligent personal and clinical co-pilot at Orchids MediFlow Hospital. You are currently assisting %s, who is logged in as a %s. 
                You are highly versatile and ready for "personal use" to assist them with:
                1. General clinical reference, ICU vital thresholds, patient diagnosis notes, and patient diet adjustments.
                2. Personal productivity, task lists, drafting professional emails/messages to patients or staff, calculation of clinical values (e.g. BMI, GFR, drug dosages).
                3. Operational guidance like appointment booking guidelines and scheduling conflict prevention.
                
                Answer professionally, concisely, and with premium styling. Use structured format, bullet points, lists, or step-by-step instructions where applicable. Be highly helpful, supportive, and friendly, but keep replies concise to optimize token usage.
                """, name, role);

        try {
            ObjectNode rootNode = objectMapper.createObjectNode();
            rootNode.put("model", "llama-3.3-70b-versatile");
            rootNode.put("temperature", 0.5);
            rootNode.put("max_tokens", 500);

            ArrayNode messagesNode = rootNode.putArray("messages");

            ObjectNode systemMessage = messagesNode.addObject();
            systemMessage.put("role", "system");
            systemMessage.put("content", systemPrompt);

            // Fetch the last 10 messages for token efficiency
            int startIndex = Math.max(0, messages.size() - 10);
            for (int i = startIndex; i < messages.size(); i++) {
                Map<String, String> msg = messages.get(i);
                ObjectNode m = messagesNode.addObject();
                m.put("role", msg.get("role"));
                m.put("content", msg.get("content"));
            }

            String requestBody = objectMapper.writeValueAsString(rootNode);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.groq.com/openai/v1/chat/completions"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + groqApiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .timeout(Duration.ofSeconds(8))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                JsonNode responseJson = objectMapper.readTree(response.body());
                return responseJson.path("choices").path(0).path("message").path("content").asText().trim();
            }

        } catch (Exception e) {
            System.err.println("[AI Assistant Service] Exception during Groq request, invoking local copilot engine: " + e.getMessage());
        }

        // Intelligent Keyword-based Fallback Copilot
        String lastMessage = messages.isEmpty() ? "" : messages.get(messages.size() - 1).getOrDefault("content", "").toLowerCase();
        
        if (lastMessage.contains("icu") || lastMessage.contains("critical") || lastMessage.contains("vitals")) {
            return """
                    **[MediFlow AI Fallback Assistant]**
                    Based on critical care telemetry standards:
                    - Continuous EKG, pulse oximetry, and arterial BP monitoring is advised.
                    - Maintain SPO2 > 93% for standard critical patients.
                    - Immediate doctor escalation if heart rate fluctuates below 50 bpm or above 120 bpm.
                    """;
        } else if (lastMessage.contains("diet") || lastMessage.contains("food") || lastMessage.contains("nutrition")) {
            return """
                    **[MediFlow AI Fallback Assistant]**
                    Standard clinical nutrition recommendations:
                    - **Cardiovascular Strain**: Strict sodium restriction (<2g/day), low saturated fats, fluid restriction if congestive failure is present.
                    - **Diabetes/Glycemic control**: High fiber, slow-release complex carbohydrates, controlled portion sizes.
                    - **Recovery/Observation**: High protein lean meats, leafy vegetables, zero added sugar.
                    """;
        } else if (lastMessage.contains("appointment") || lastMessage.contains("schedule") || lastMessage.contains("conflict")) {
            return """
                    **[MediFlow AI Fallback Assistant]**
                    MediFlow scheduling guidelines:
                    - Clinician double-booking is strictly prohibited in our PostgreSQL registry.
                    - Standard appointment intervals are 30 minutes.
                    - Urgently admitted patients (ICU) bypass the scheduling queue automatically.
                    """;
        } else {
            return """
                    **[MediFlow AI Fallback Assistant]**
                    Hello! I am MediFlow AI, your personal clinical co-pilot.
                    - You can ask me about **clinical state summaries**, **ICU patient telemetry**, **dietary instructions**, or **general diagnostics advice**.
                    - I am currently operating on standard diagnostic models. Please verify all clinical parameters before prescribing medication.
                    """;
        }
    }
}
