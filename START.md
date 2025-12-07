# Guide de Démarrage Rapide

## Pour démarrer le site une fois pour toutes

### 1. Installation initiale (une seule fois)

```bash
# Installer les dépendances
npm install
```

### 2. Configuration (une seule fois)

Créez un fichier `.env.local` avec vos identifiants:

```env
NEXT_PUBLIC_SUPABASE_URL=https://hqxbvyqyzudkpglcwqjw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_ici
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

### 3. Démarrer le serveur

**Option 1: Avec ouverture automatique du navigateur**
```bash
npm run dev:open
```

**Option 2: Mode standard**
```bash
npm run dev
```

Le site sera disponible sur: **http://localhost:3000**

### 4. Vérifier qu'Ollama fonctionne

Assurez-vous qu'Ollama est installé et que le modèle est téléchargé:
```bash
ollama list
ollama pull llama3.2
```

## Commandes utiles

- `npm run dev` - Démarrer en mode développement
- `npm run dev:open` - Démarrer et ouvrir le navigateur
- `npm run build` - Créer une version de production
- `npm start` - Démarrer la version de production

