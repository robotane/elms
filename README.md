# ELMS - Frontend

Ce dépôt contient le client frontend pour la plateforme **ELMS (E-Learning Management System)**. C'est une Single-Page Application (SPA) développée avec React qui consomme l'API GraphQL du backend.

## Fonctionnalités

-   Interface utilisateur pour l'inscription et la connexion.
-   Tableau de bord pour les utilisateurs connectés.
-   Interaction avec le backend via des requêtes GraphQL.
-   Gestion de l'état d'authentification côté client.

## Technologies utilisées

-   **Framework :** React.js
-   **Client GraphQL :** Apollo Client
-   **Routage :** React Router
-   **Bibliothèque UI :** Semantic UI React
-   **Gestion d'état :** React Context

## Démarrage rapide

### Prérequis

-   Node.js et npm
-   Le [serveur backend ELMS](https://github.com/robotane/elms) doit être en cours d'exécution.

### Installation et configuration

1.  **Cloner le dépôt et installer les dépendances :**
    ```bash
    git clone https://github.com/robotane/elms.git
    cd elms
    # La branche 'client' est généralement la branche par défaut
    npm install
    ```

2.  **Configurer l'endpoint de l'API :**
    L'application doit savoir où se trouve le serveur GraphQL. Par défaut, elle cherche sur `http://localhost:4000`. Si votre serveur tourne sur une autre adresse, vous pouvez créer un fichier `.env` pour la spécifier :
    ```
    REACT_APP_GRAPHQL_ENDPOINT=http://VOTRE_ADRESSE_BACKEND
    ```

3.  **Lancer l'application :**
    ```bash
    npm start
    ```

L'application sera accessible à l'adresse `http://localhost:3000`.