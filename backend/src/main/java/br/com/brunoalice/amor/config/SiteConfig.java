package br.com.brunoalice.amor.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.OffsetDateTime;

@ConfigurationProperties(prefix = "site")
public record SiteConfig(OffsetDateTime releaseDate, String username, String password, String previewKey) {
    public boolean isReleased() { return !OffsetDateTime.now().isBefore(releaseDate); }
    public boolean isPreview(String key) { return previewKey.equals(key); }
}
