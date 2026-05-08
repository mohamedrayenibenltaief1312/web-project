# NoteSwift - Application de Gestion de Notes Personnelles

NoteSwift est une application web moderne permettant de gérer des notes personnelles avec différents niveaux de priorité. Ce projet a été réalisé avec **Laravel 12** pour le backend et **React 18** pour le frontend.    ..

## 🚀 Fonctionnalités
- Authentification sécurisée par Token (Laravel Sanctum).
- CRUD complet des notes (Créer, Lire, Modifier, Supprimer).
- Niveaux de priorité (Basse, Moyenne, Haute) avec codes couleurs.
- Filtrage des notes par priorité (Bonus).
- Interface responsive et stylisée avec CSS moderne.

## 🛠 Installation

### 1. Backend (Laravel)
1. Allez dans le dossier `backend` : `cd backend`
2. Installez les dépendances : `composer install`
3. Créez le fichier d'environnement : `cp .env.example .env`
4. Générez la clé d'application : `php artisan key:generate`
5. Configurez votre base de données dans `.env` (Database: `notes_project`).
6. Lancez les migrations et le seeder : `php artisan migrate:fresh --seed`
7. Lancez le serveur : `php artisan serve`

### 2. Frontend (React)
1. Allez dans le dossier `frontend` : `cd ../frontend`
2. Installez les dépendances : `npm install`
3. Lancez l'application : `npm start`

## 👤 Utilisateur de Test
- **Email :** `rayen@example.com`
- **Mot de passe :** `password123`

## 📝 Auteur
- Développé par **Rayen** - Projet CPI2 2025/2026.
