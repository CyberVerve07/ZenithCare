package com.mediflow.api;

import com.mediflow.api.config.DotenvLoader;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MediflowApplication {

    public static void main(String[] args) {
        // Load local .env file before starting the Spring Context
        DotenvLoader.load();
        
        SpringApplication.run(MediflowApplication.class, args);
    }
}
