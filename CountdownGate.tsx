'use client';

import { useEffect, useMemo, useState } from 'react';
import { siteConfig } from '@/config/site';
import styles from './CountdownGate.module.css';

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(): TimeLeft {
  const seconds = Math.max(0, Math.floor((new Date(siteConfig.releaseDate).getTime() - Date.now()) / 1000));
  return { days: Math.floor(seconds / 86400), hours: Math.floor((seconds % 86400) / 3600), minutes: Math.floor((seconds % 3600) / 60), seconds: seconds % 60 };
}

export function CountdownGate({ released }: { released: boolean }) {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft);
  const [canEnter, setCanEnter] = useState(released);

  useEffect(() => {
    const tick = () => {
      const next = getTimeLeft();
      setTime(next);
      if (next.days + next.hours + next.minutes + next.seconds === 0) setCanEnter(true);
    };
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const items = useMemo(() => [['dias', time.days], ['horas', time.hours], ['minutos', time.minutes], ['segundos', time.seconds]], [time]);

  return <main className={styles.page}>
    <div className={styles.aurora} aria-hidden="true" /><div className={styles.grain} aria-hidden="true" />
    <div className={styles.topline}><span>Bruno <b>♥</b> Alice</span><span>um segredo em forma de site</span><span>est. 27.10.2024</span></div>
    <section className={styles.content}>
      <p className={styles.kicker}>nosso próximo capítulo começa em</p>
      <h1>27 <i>/</i> 10 <i>/</i> 26</h1>
      <div className={styles.rule}><span>✦</span></div>
      <p className={styles.message}>{canEnter ? 'A porta está aberta. O nosso álbum espera por vocês.' : 'Este cantinho ainda está guardando uma surpresa.'}</p>
      <div className={styles.clock}>{items.map(([label, value], index) => <div className={styles.clockItem} key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span>{index < items.length - 1 && <em>:</em>}</div>)}</div>
      {canEnter ? <a className={styles.enter} href="/memories">abrir nosso álbum <span>↗</span></a> : <span className={styles.locked}>acesso liberado em {siteConfig.anniversaryLabel}</span>}
    </section>
    <div className={styles.footer}><span>feito com intenção e carinho</span><a href="/memories?preview=brunoalice-preview" aria-label="Abrir prévia privada" style={{ color: '#c87562', fontSize: 12, opacity: .22, textDecoration: 'none' }}>♥</a><span>volte quando o relógio zerar</span></div>
    <div className={`${styles.orbit} ${styles.orbitOne}`} aria-hidden="true" /><div className={`${styles.orbit} ${styles.orbitTwo}`} aria-hidden="true" />
  </main>;
}
