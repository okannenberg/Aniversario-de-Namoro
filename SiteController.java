package br.com.brunoalice.amor.api;

import br.com.brunoalice.amor.config.SiteConfig;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SiteController {
    private final SiteConfig config;

    public SiteController(SiteConfig config) { this.config = config; }

    @GetMapping("/status")
    public StatusResponse status() {
        long seconds = Math.max(0, Duration.between(OffsetDateTime.now(), config.releaseDate()).getSeconds());
        return new StatusResponse(config.isReleased(), config.releaseDate(), seconds);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> login(@RequestHeader(value = "X-Preview-Key", required = false) String previewKey, @Valid @RequestBody LoginRequest request) {
        if (!config.isReleased() && !config.isPreview(previewKey)) return ResponseEntity.status(HttpStatus.LOCKED).body(new LoginResponse(false, "O álbum ainda está fechado."));
        boolean valid = config.username().equalsIgnoreCase(request.username()) && config.password().equals(request.password());
        if (!valid) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(false, "Usuário ou senha inválidos."));
        return ResponseEntity.ok(new LoginResponse(true, "Login realizado."));
    }

    @GetMapping("/memories")
    public ResponseEntity<List<Memory>> memories(@RequestHeader(value = "X-Preview-Key", required = false) String previewKey) {
        if (!config.isReleased() && !config.isPreview(previewKey)) return ResponseEntity.status(HttpStatus.LOCKED).build();
        return ResponseEntity.ok(List.of(
            new Memory("01", "foto", "o começo", "27.10.2024", "media/photo-01.jpg"),
            new Memory("02", "foto", "um dia comum", "15.02.2025", "media/photo-02.jpg"),
            new Memory("03", "foto", "risadas", "27.04.2025", "media/photo-03.jpg"),
            new Memory("04", "foto", "o nosso lugar", "18.05.2025", "media/photo-04.jpg"),
            new Memory("05", "foto", "fora da rotina", "21.06.2025", "media/photo-05.jpg"),
            new Memory("06", "foto", "olhares", "12.07.2025", "media/photo-06.jpg"),
            new Memory("07", "foto", "domingos", "03.08.2025", "media/photo-07.jpg"),
            new Memory("08", "foto", "detalhes", "24.08.2025", "media/photo-08.jpg"),
            new Memory("09", "foto", "a nossa bagunça", "06.09.2025", "media/photo-09.jpg"),
            new Memory("10", "foto", "pôr do sol", "20.09.2025", "media/photo-10.jpg"),
            new Memory("11", "foto", "café para dois", "11.10.2025", "media/photo-11.jpg"),
            new Memory("12", "foto", "sempre juntos", "27.10.2025", "media/photo-12.jpg"),
            new Memory("13", "foto", "planos futuros", "15.02.2026", "media/photo-13.jpg"),
            new Memory("14", "foto", "uma pausa", "14.03.2026", "media/photo-14.jpg"),
            new Memory("15", "foto", "até aqui", "27.09.2026", "media/photo-15.jpg"),
            new Memory("16", "video", "filme do nosso ano", "27.10.2025", "media/video-01.mp4"),
            new Memory("17", "video", "uma mensagem para você", "27.10.2026", "media/video-02.mp4"),
            new Memory("18", "video", "o nosso making of", "27.10.2026", "media/video-03.mp4")
        ));
    }

    public record StatusResponse(boolean released, OffsetDateTime releaseDate, long remainingSeconds) {}
    public record LoginRequest(@NotBlank String username, @NotBlank String password) {}
    public record LoginResponse(boolean authenticated, String message) {}
    public record Memory(String id, String type, String title, String date, String media) {}
}
