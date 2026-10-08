export const siteConfig = {
  couple: 'Bruno & Alice',
  releaseDate: '2026-10-27T00:00:00-03:00',
  anniversaryLabel: '27 de outubro de 2026',
};

export const isReleased = () => Date.now() >= new Date(siteConfig.releaseDate).getTime();
