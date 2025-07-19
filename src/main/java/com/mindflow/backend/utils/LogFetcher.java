package com.mindflow.backend.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

public class LogFetcher {
    private static final String RENDER_API_URL = "https://api.render.com/v1/services/";
    private static final String SERVICE_NAME = "mindflow-backend";

    public static void fetchLogs() {
        String token = System.getenv("RENDER_TOKEN");
        if (token == null) {
            System.out.println("Error: RENDER_TOKEN environment variable not set");
            return;
        }

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Accept", "application/json");

        // Calculate start time (last hour)
        LocalDateTime startTime = LocalDateTime.now().minusHours(1);
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        String startTimeStr = startTime.format(formatter);

        // Build request URL with query parameters
        String url = UriComponentsBuilder
            .fromHttpUrl(RENDER_API_URL + SERVICE_NAME + "/logs")
            .queryParam("startTime", startTimeStr)
            .build()
            .toUriString();

        try {
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                Map.class
            );

            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("\n=== Render Logs ===");
                Map logs = response.getBody();
                // Process logs as needed
            } else {
                System.out.println("Failed to fetch logs: " + response.getStatusCode());
            }
        } catch (Exception e) {
            System.out.println("Error fetching logs: " + e.getMessage());
        }
    }
}
