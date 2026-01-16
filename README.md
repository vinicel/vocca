# Vocca

Plateforme d'orchestration d'agendas médicaux multi-fournisseurs (ex: Healthcare Pro, MedScheduler).

## Architecture
```
src/
  domain/schemas/         # Schémas Zod (validation, types)
  errors/                # Gestion des erreurs custom
  plugins/               # Plugins Fastify (ex: error handler)
  providers/             # Intégrations fournisseurs (clients, reshapers, auth, shared)
  routes/                # Endpoints Fastify (handlers, routes)
  services/              # Services transverses (ex: provider-registry)
  index.ts               # Entrée Fastify
```

## Installation

1. **Cloner le repo**
```sh
git clone <repo-url>
cd vocca
```
2. **Installer les dépendances**
```sh
yarn install
```

## Configuration

Créer un fichier `.env` à la racine avec les variables nécessaires :

```
# Healthcare Pro
HEALTHCARE_PRO_CLIENT_ID=...
HEALTHCARE_PRO_CLIENT_SECRET=...
HEALTHCARE_PRO_SCOPE=...

# MedScheduler
MEDSCHEDULER_API_KEY=...
MEDSCHEDULER_CLIENT_ID=...
```

## Démarrage

```sh
yarn build   # (optionnel, si TS strict)
yarn start
```

L'API sera disponible sur `http://localhost:3000/api`

## API

- `/patients` : gestion des patients
- `/appointments` : gestion des rendez-vous
- `/availabilities` : recherche de créneaux
- `/health` : healthcheck
- `/hl7` : endpoints HL7 (si supporté par le provider)

Chaque endpoint respecte le schéma de réponse :
```json
{
  "success": true,
  "data": ...
}
```
Ou, en cas d'erreur :
```json
{
  "success": false,
  "error": { "code": "...", "message": "..." }
}
```

---
