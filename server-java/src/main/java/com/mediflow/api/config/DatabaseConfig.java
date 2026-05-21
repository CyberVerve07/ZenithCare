package com.mediflow.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DatabaseConfig {

    @Bean
    public DataSource dataSource() {
        String dbUrl = System.getProperty("DATABASE_URL");
        if (dbUrl == null || dbUrl.isEmpty()) {
            dbUrl = System.getenv("DATABASE_URL");
        }

        if (dbUrl == null || dbUrl.isEmpty()) {
            System.err.println("[DatabaseConfig] DATABASE_URL is not set! Using in-memory fallback defaults.");
            DriverManagerDataSource dataSource = new DriverManagerDataSource();
            dataSource.setDriverClassName("org.postgresql.Driver");
            dataSource.setUrl("jdbc:postgresql://localhost:5432/postgres");
            dataSource.setUsername("postgres");
            dataSource.setPassword("postgres");
            return dataSource;
        }

        try {
            System.out.println("[DatabaseConfig] Parsing DATABASE_URL...");
            // Standard parse: postgresql://username:password@host:port/database
            // In case postgresql:// has a pooler, URI parsing handles it beautifully
            
            // Remove 'postgresql://' or 'postgres://' prefix to prevent URI syntax errors with custom schemes
            String cleanUrl = dbUrl;
            if (cleanUrl.startsWith("postgresql://")) {
                cleanUrl = cleanUrl.replace("postgresql://", "http://"); // temporary fake scheme for parsing
            } else if (cleanUrl.startsWith("postgres://")) {
                cleanUrl = cleanUrl.replace("postgres://", "http://");
            }
            
            URI uri = new URI(cleanUrl);
            String userInfo = uri.getUserInfo();
            String username = "";
            String password = "";
            if (userInfo != null && userInfo.contains(":")) {
                String[] parts = userInfo.split(":", 2);
                username = parts[0];
                password = parts[1];
            }
            
            String host = uri.getHost();
            int port = uri.getPort();
            if (port == -1) {
                port = 5432; // Default postgres port
            }
            String path = uri.getPath(); // starts with '/'
            
            String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;
            
            System.out.println("[DatabaseConfig] Connecting to database at: jdbc:postgresql://" + host + ":" + port + path);
            
            DriverManagerDataSource dataSource = new DriverManagerDataSource();
            dataSource.setDriverClassName("org.postgresql.Driver");
            dataSource.setUrl(jdbcUrl);
            dataSource.setUsername(username);
            dataSource.setPassword(password);
            
            return dataSource;
        } catch (URISyntaxException e) {
            System.err.println("[DatabaseConfig] Failed to parse DATABASE_URL: " + e.getMessage());
            // Safe manual string manipulation fallback in case URI parsing fails
            try {
                String cleanUrl = dbUrl.substring(dbUrl.indexOf("://") + 3);
                int atIdx = cleanUrl.indexOf('@');
                String credentials = cleanUrl.substring(0, atIdx);
                String hostAndDb = cleanUrl.substring(atIdx + 1);

                int colonIdx = credentials.indexOf(':');
                String username = credentials.substring(0, colonIdx);
                String password = credentials.substring(colonIdx + 1);

                String jdbcUrl = "jdbc:postgresql://" + hostAndDb;
                
                DriverManagerDataSource dataSource = new DriverManagerDataSource();
                dataSource.setDriverClassName("org.postgresql.Driver");
                dataSource.setUrl(jdbcUrl);
                dataSource.setUsername(username);
                dataSource.setPassword(password);
                return dataSource;
            } catch (Exception ex) {
                throw new RuntimeException("Could not parse database URL: " + dbUrl, ex);
            }
        }
    }
}
