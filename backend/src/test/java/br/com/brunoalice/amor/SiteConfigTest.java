package br.com.brunoalice.amor;

import br.com.brunoalice.amor.config.SiteConfig;
import org.junit.jupiter.api.Test;

import java.time.OffsetDateTime;

import static org.junit.jupiter.api.Assertions.assertFalse;

class SiteConfigTest {
    @Test
    void keepsAlbumLockedBeforeReleaseDate() {
        var config = new SiteConfig(OffsetDateTime.parse("2099-10-27T00:00:00-03:00"), "bruno.alice", "alice2709", "preview-key");
        assertFalse(config.isReleased());
    }
}
