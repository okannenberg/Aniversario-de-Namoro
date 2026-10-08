package br.com.brunoalice.amor.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(SiteConfig.class)
public class AppConfig {}
