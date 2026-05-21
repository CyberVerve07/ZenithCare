package com.mediflow.api.config;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class DotenvLoader {

    public static void load() {
        // Look for .env in standard locations
        File envFile = new File(".env");
        if (!envFile.exists()) {
            envFile = new File("../.env");
        }
        if (!envFile.exists()) {
            // Absolute fallback path based on project structure
            envFile = new File("c:/Users/lenovo/orchids-mediflow-hospital-management/.env");
        }

        if (envFile.exists()) {
            System.out.println("[DotenvLoader] Loading environment variables from " + envFile.getAbsolutePath());
            try (BufferedReader reader = new BufferedReader(new FileReader(envFile))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    line = line.trim();
                    if (line.isEmpty() || line.startsWith("#")) {
                        continue;
                    }
                    int equalsIdx = line.indexOf('=');
                    if (equalsIdx > 0) {
                        String key = line.substring(0, equalsIdx).trim();
                        String value = line.substring(equalsIdx + 1).trim();
                        // Strip quotes if any
                        if (value.startsWith("\"") && value.endsWith("\"")) {
                            value = value.substring(1, value.length() - 1);
                        } else if (value.startsWith("'") && value.endsWith("'")) {
                            value = value.substring(1, value.length() - 1);
                        }
                        
                        // Set standard System property and Environment property
                        System.setProperty(key, value);
                    }
                }
            } catch (IOException e) {
                System.err.println("[DotenvLoader] Failed to read .env file: " + e.getMessage());
            }
        } else {
            System.out.println("[DotenvLoader] No .env file found in standard locations. Relying on System environment.");
        }
    }
}
