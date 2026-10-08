'use client';

import { useState } from 'react';
import styles from './PrivateAlbum.module.css';

const photos = [
  ['01', 'o começo', 'photo tall photoOne', '/media/photo-01.jpg'], ['02', 'um dia comum', 'photo photoTwo', '/media/photo-02.jpg'], ['03', 'risadas', 'photo photoThree', '/media/photo-03.jpg'],
  ['04', 'o nosso lugar', 'photo wide photoFour', '/media/photo-04.jpg'], ['05', 'fora da rotina', 'photo photoFive', '/media/photo-05.jpg'], ['06', 'olhares', 'photo tall photoSix', '/media/photo-06.jpg'],
  ['07', 'domingos', 'photo photoSeven', '/media/photo-07.jpg'], ['08', 'detalhes', 'photo photoEight', '/media/photo-08.jpg'], ['09', 'a nossa bagunça', 'photo wide photoNine', '/media/photo-09.jpg'],
  ['10', 'pôr do sol', 'photo photoTen', '/media/photo-10.jpg'], ['11', 'café para dois', 'photo photoEleven', '/media/photo-11.jpg'], ['12', 'sempre juntos', 'photo tall photoTwelve', '/media/photo-12.jpg'],
  ['13', 'planos futuros', 'photo photoThirteen', '/media/photo-13.jpg'], ['14', 'uma pausa', 'photo photoFourteen', '/media/photo-14.jpg'], ['15', 'até aqui', 'photo wide photoFifteen', '/media/photo-15.jpg'],
];

const videos = [
  ['01', 'filme do nosso ano', 'video videoOne', '/media/video-01.mp4'],
  ['02', 'uma mensagem para você', 'video videoTwo', '/media/video-02.mp4'],
  ['03', 'o nosso making of', 'video videoThree', '/media/video-03.mp4'],
];

export function PrivateAlbum({ previewMode = false }: { previewMode?: boolean }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [lightbox, setLightbox] = useState<{ label: string; type: 'photo' | 'video'; src: string } | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api';
    try {
      const response = await fetch(`${apiUrl}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(previewMode ? { 'X-Preview-Key': 'brunoalice-preview' } : {}) }, body: JSON.stringify({ username: user, password }) });
      if (response.ok) { setLoggedIn(true); setError(''); return; }
      const body = await response.json().catch(() => null);
      setError(body?.message ?? 'Usuário ou senha incorretos.');
    } catch {
      setError('Não foi possível conectar ao backend. Verifique se a API está rodando.');
    }
  };

  if (!loggedIn) return <LoginScreen user={user} password={password} error={error} onUser={setUser} onPassword={setPassword} onSubmit={handleLogin} />;

  return <main className={styles.site}>
    <header className={styles.header}><a href="/" className={styles.logo}>B <span>♥</span> A <small>est. 2024</small></a><nav><a href="#historia">história</a><a href="#fotos">fotos</a><a href="#filmes">filmes</a><a href="#carta">carta</a></nav><a href="/" className={styles.exit}>sair ↗</a></header>
    <section className={styles.hero}><div><p className={styles.eyebrow}>bruno <span>×</span> alice</p><h1>Dois anos,<br /><i>mil motivos.</i></h1><p className={styles.lead}>Um arquivo vivo dos detalhes que fizeram a gente chegar até aqui — e dos que ainda vamos colecionar.</p><a className={styles.darkButton} href="#fotos">ver nossas memórias ↓</a></div><div className={`${styles.heroPhoto} ${styles.photo} ${styles.heroImage}`}><img src="/media/cover.jpg" alt="Bruno e Alice" /><span>foto de capa</span><small>adicione cover.jpg em /public/media</small><b>27<br /><em>outubro</em></b></div></section>
    <section id="historia" className={styles.story}><div className={styles.sectionHeading}><p className={styles.eyebrow}>linha do tempo</p><h2>Foi assim que<br /><i>virou nós.</i></h2></div><div className={styles.timeline}><div><strong>27.10.2024</strong><span>o começo de tudo</span></div><p>Um encontro, uma conversa que demorou mais do que devia e a sensação de que tinha alguma coisa diferente acontecendo.</p><div><strong>15.02.2025</strong><span>fora da rotina</span></div><p>As pequenas aventuras começaram a virar nossa forma favorita de passar o tempo.</p><div><strong>27.10.2025</strong><span>um ano depois</span></div><p>365 dias, muitas histórias e a certeza tranquila de que ainda era só o começo.</p></div></section>
    <section id="fotos" className={styles.gallerySection}><div className={styles.sectionHeading}><p className={styles.eyebrow}>galeria principal · 15 fotos</p><h2>Recortes de uma<br /><i>vida inteira.</i></h2><p>Aqui cabem as viagens, os domingos, as selfies tremidas e tudo que merece ficar guardado.</p></div><div className={styles.masonry}>{photos.map(([number, label, className, src]) => <button key={number} className={styles.galleryCard} onClick={() => setLightbox({ label, type: 'photo', src })}><div className={`${styles[className.split(' ')[0]]} ${className.split(' ').slice(1).map((name) => styles[name]).join(' ')}`}>{src ? <img src={src} alt={label} /> : null}<span>foto {number}</span><small>adicione em /public/media</small></div><label>{number} / {label}</label></button>)}</div></section>
    <section id="filmes" className={styles.videoSection}><div className={styles.sectionHeading}><p className={styles.eyebrow}>filmes · 3 vídeos</p><h2>Alguns momentos<br /><i>em movimento.</i></h2></div><div className={styles.videoGrid}>{videos.map(([number, label, className, src]) => <button key={number} className={styles.videoCard} onClick={() => setLightbox({ label, type: 'video', src })}><div className={`${styles[className.split(' ')[0]]} ${styles[className.split(' ')[1]]}`}>{src ? <video src={src} muted playsInline preload="metadata" /> : null}<span className={styles.play}>▶</span><small>vídeo {number}</small></div><label>{label} <b>↗</b></label></button>)}</div></section>
    <section id="carta" className={styles.letter}><p className={styles.eyebrow}>uma carta para alice</p><h2>Se eu pudesse<br /><i>pausar o tempo...</i></h2><p>...eu escolheria qualquer um dos nossos dias. Até os bagunçados, até os que começaram tortos. Porque no fim sempre tem você — e isso já faz tudo ficar bonito.</p><p>Obrigado por ser meu lugar favorito, minha melhor companhia e a pessoa com quem eu quero continuar descobrindo o mundo.</p><strong>com amor, Bruno <span>♥</span></strong></section>
    <footer className={styles.footer}><span>bruno <i>♥</i> alice</span><span>27.10.2026</span><span>feito para guardar o que importa</span></footer>
    {lightbox && <div className={styles.lightbox} onClick={() => setLightbox(null)}><div className={styles.lightboxCard} onClick={(event) => event.stopPropagation()}><button onClick={() => setLightbox(null)}>×</button><div className={lightbox.type === 'photo' ? styles.modalPhoto : styles.modalVideo}>{lightbox.type === 'photo' ? <img src={lightbox.src} alt={lightbox.label} /> : <video src={lightbox.src} controls autoPlay playsInline />} {lightbox.type === 'video' && <span className={styles.play}>▶</span>}</div><p>{lightbox.label}</p><span>um pedacinho da nossa história</span></div></div>}
  </main>;
}

function LoginScreen({ user, password, error, onUser, onPassword, onSubmit }: { user: string; password: string; error: string; onUser: (value: string) => void; onPassword: (value: string) => void; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  return <main className={styles.login}><div className={styles.loginCircle} /><div className={styles.loginCard}><p className={styles.logo}>B <span>♥</span> A</p><p className={styles.eyebrow}>o álbum está aberto</p><h1>Entra, Alice.<br /><i>É nosso.</i></h1><p>Um cantinho para tudo aquilo que a gente não quer esquecer.</p><form onSubmit={onSubmit}><label>nosso usuário<input value={user} onChange={(event) => onUser(event.target.value)} placeholder="bruno.alice" /></label><label>nossa senha<input type="password" value={password} onChange={(event) => onPassword(event.target.value)} placeholder="••••••••" /></label>{error && <small className={styles.error}>{error}</small>}<button className={styles.darkButton}>abrir álbum <span>↗</span></button></form></div></main>;
}
