# Guide pour pousser sur GitHub

## Étape 1: Ajouter tous les fichiers modifiés

```bash
git add .
```

## Étape 2: Faire un commit

```bash
git commit -m "Complete AI Career Mentor: Ollama integration, career path generation, and UI improvements"
```

## Étape 3: Créer un repository sur GitHub

1. Allez sur https://github.com
2. Cliquez sur le bouton "+" en haut à droite
3. Sélectionnez "New repository"
4. Donnez un nom (ex: `aicareermentor`)
5. Choisissez Public ou Private
6. **NE PAS** initialiser avec README, .gitignore, ou license (déjà présents)
7. Cliquez sur "Create repository"

## Étape 4: Lier votre repo local à GitHub

Si c'est la première fois:
```bash
git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git
```

Si le remote existe déjà:
```bash
git remote set-url origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git
```

## Étape 5: Pousser le code

```bash
git branch -M main
git push -u origin main
```

## Vérification

Après le push, vérifiez sur GitHub que tous les fichiers sont bien présents.

⚠️ **IMPORTANT**: Le fichier `.env.local` est dans `.gitignore` - vos clés API sont protégées!

