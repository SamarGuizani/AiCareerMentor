# Configuration de la Base de Données Supabase

## Problème
L'erreur `Could not find the table 'public.career_paths'` signifie que les tables n'existent pas encore dans votre base de données Supabase.

## Solution Rapide

### Étape 1: Accéder au SQL Editor
1. Allez sur https://supabase.com
2. Connectez-vous à votre projet
3. Cliquez sur **SQL Editor** dans le menu de gauche

### Étape 2: Exécuter le Script
1. Cliquez sur **New Query**
2. Ouvrez le fichier `scripts/003_complete_setup.sql` dans votre éditeur
3. Copiez tout le contenu
4. Collez-le dans le SQL Editor de Supabase
5. Cliquez sur **Run** (ou appuyez sur Ctrl+Enter)

### Étape 3: Vérifier
Après l'exécution, vous devriez voir:
- ✅ Table `quiz_results` créée
- ✅ Table `career_paths` créée
- ✅ RLS Policies configurées
- ✅ Indexes créés

## Tables Créées

### `quiz_results`
- Stocke les réponses du quiz et les résultats AI
- Colonnes: `id`, `user_id`, `quiz_answers` (JSONB), `ai_result` (TEXT)

### `career_paths`
- Stocke les career paths générés par AI
- Colonnes: `id`, `user_id`, `phase_1`, `phase_2`, `phase_3`, `phase_4` (tous JSONB)

## Après l'Exécution

Redémarrez votre serveur Next.js:
```bash
npm run dev
```

Le career path devrait maintenant fonctionner correctement!



