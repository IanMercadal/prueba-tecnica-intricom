# Prueba Técnica Intricom

Prueba técnica orientada a resolver un patrón repository, uso de DTO, interface y componentes reutilizables en front.

## Estructura

- `backend/` — API en NestJS.
- `frontend/` — React + Vite.
- `db/` — script SQL (`db.sql`) para crear la base de datos.

## Guía para lanzar el programa

### 1. Base de datos (solo si vas a usar `DATA_TYPE=DB`)

Ejecuta `db/db.sql` en tu servidor MySQL. Crea la base `prueba_tecnica_intricom` y las tablas `Hotel`, `CLIENT` y `HotelBooking`.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edita `.env` según tu entorno. `DATA_TYPE` controla la persistencia:
- `FS` — guarda los datos como archivos JSON en `FS_FOLDER` (por defecto `./data`).
- `DB` — usa MySQL, con los datos de conexión `DB_HOST`/`DB_PORT`/`DB_USER`/`DB_PASSWORD`/`DB_NAME`.

```bash
npm run start:dev
```

Levanta la API en `http://localhost:3000`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Levanta la app en `http://localhost:5173`.
