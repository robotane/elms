# ELMS - Backend

Ce dépôt contient le serveur backend pour la plateforme **ELMS (E-Learning Management System)**. Il s'agit d'une API GraphQL qui gère la logique métier, l'accès aux données et l'authentification des utilisateurs.

## Fonctionnalités

-   API GraphQL complète pour la gestion des cours, utilisateurs, etc.
-   Authentification basée sur JSON Web Tokens (JWT).
-   Gestion des permissions avec `graphql-shield`.
-   Interaction avec la base de données via l'ORM Prisma.

## Technologies utilisées

-   **Runtime :** Node.js
-   **Serveur API :** Apollo Server
-   **ORM :** Prisma
-   **Authentification :** `jsonwebtoken`, `bcryptjs`

## Démarrage rapide

### Prérequis

-   Node.js et npm
-   Une base de données (ex: PostgreSQL, MySQL) supportée par Prisma.

### Installation et configuration

1.  **Cloner le dépôt et installer les dépendances :**
    ```bash
    git clone https://github.com/robotane/elms.git
    cd elms
    git checkout main
    npm install
    ```

2.  **Configurer la base de données :**
    Créez un fichier `.env` à la racine du projet et ajoutez votre chaîne de connexion à la base de données.
    ```
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

3.  **Appliquer les migrations de la base de données :**
    Cette commande va créer les tables nécessaires dans votre base de données.
    ```bash
    npx prisma migrate dev
    ```

4.  **Lancer le serveur :**
    ```bash
    # En mode développement (avec rechargement automatique)
    npm run dev

    # En mode production
    npm start
    ```

Le serveur GraphQL sera accessible à l'adresse `http://localhost:4000`.
