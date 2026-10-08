# Bruno & Alice · Amor em foco

Site privado para celebrar dois anos de namoro.

## Estrutura

- `frontend/` — Next.js + TypeScript, App Router e CSS modular global.
- `backend/` — Java 21 + Spring Boot, API de status, login e conteúdo.

## Regra de lançamento

Antes de `27/10/2026` o site exibe somente o cronômetro. Na data configurada, ele libera a entrada e o álbum. A data fica centralizada em `frontend/src/config/site.ts` e `backend/src/main/java/br/com/brunoalice/amor/config/SiteConfig.java`.

## Rodar localmente

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Abra `http://localhost:3000`.

### Backend

```bash
cd backend
mvn spring-boot:run
```

A API sobe em `http://localhost:8080`.

Credenciais de protótipo: usuário `bruno.alice`, senha `alice2709`. Para produção, o próximo passo é trocar o login em memória por banco e hash de senha.

## Mídias

As fotos e vídeos reais entram em `frontend/public/media/` com estes nomes:

- `cover.jpg` — foto de capa;
- `photo-01.jpg` até `photo-15.jpg` — galeria;
- `video-01.mp4` até `video-03.mp4` — filmes.

A galeria mantém um visual de reserva enquanto algum arquivo ainda não foi enviado. Fotos em `.jpg` funcionam melhor entre 1600 e 2400 px no lado maior; vídeos em `.mp4` com H.264/AAC têm a melhor compatibilidade no navegador.

## Publicação

Uma configuração simples é publicar o `frontend/` na Vercel e o `backend/` em um serviço Java como Render ou Railway.

No frontend, configure `NEXT_PUBLIC_API_URL` com a URL pública terminada em `/api`, por exemplo `https://minha-api.exemplo.com/api`.

No backend, configure `FRONTEND_URL` com a URL pública do frontend e, de preferência, substitua `SITE_USERNAME`, `SITE_PASSWORD` e `SITE_PREVIEW_KEY` por variáveis secretas do provedor.
