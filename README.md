# Sharecipe

Sharecipe est une application Angular permettant de consulter, ajouter et partager des recettes de cuisine.

## Fonctionnalités

- Inscription / Connexion / Déconnexion
- Affichage de toutes les recettes et de celles en favoris uniquement
- Consultation du détail d’une recette
- Ajout d’une recette
- Mise en favoris d'une recette

## Installation et lancement

Cloner le projet
```bash
git clone https://github.com/iPrisc/sharecipe.git
cd sharecipe
```

Installer les dépendances
```bash
npm install
```

Lancer le backend JSON Server
```bash
npx json-server --watch backend/db.json --port 3000
```

Lancer l'application Angular
```bash
ng serve
```
