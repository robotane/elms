const { gql } = require('apollo-server');

module.exports = gql`
    type Commentaire {
        id: ID!
        idUtilisateur: ID!
        idContenuEducatif: ID!
        contenu: String!
        nomUtilsateur: String
    }

    type AuthPayload {
        id: ID!
        email: String!
        role: String!
        idProp: ID!
        token: String!
    }

    type Utilisateur {
        id: ID!
        email: String!
        nom: String
        motDePasse: String!
        role: Role!
    }

    enum Role {
        ETUDIANT
        ENSEIGNANT
        ADMIN
    }

    enum ContenuEducatifEnum {
        COURS
        TD
        EXERCICES
        DEVOIR
        EXPOSE
    }

    enum ReferenceEnum {
        LIVRE
        PDF
        SITEWEB
        VIDEO
    }

    enum RessourceEnum {
        PDF
        VIDEO
        IMAGE
        TEXTE
        DOC
        HTML
    }

    enum Grade {
        DOCTORANT
        DOCTEUR
        MAITRE_DE_CONFERENCE
        PROFESSEUR
    }

    type Filiere {
        id: ID!
        nom: String!
        description: String!
        ufr: String!
        lienweb: String!
        semestres: [Semestre]!
    }

    type Semestre {
        id: ID!
        nom: String!
        description: String!
        filiere: Filiere!
        promotions: [Promotion]
        modules: [Module]
    }

    type Promotion {
        id: ID!
        nom: String!
        annee: String!
        effectif: Int!
        modules: [Module]
        etudiants: [Etudiant]
        idSemestre: ID!
    }

    type Etudiant {
        id: ID!
        nom: String!
        prenom: String!
        email: String!
        noTelephone: String!
        anneeBac: String!
        idPromotion: ID!

        filiere: String
        promotion: String
        semestre: String
    }

    type Module {
        id: ID!
        nom: String!
        description: String
        coefficient: Int!
        nmbrDeContEduc: Int
        contenuEducatif: [ContenuEducatif]!
        idSemestre: ID!
    }

    type ContenuEducatif {
        id: ID!
        nom: String!
        description: String
        contenu: String!
        type: ContenuEducatifEnum!
        references: References
        duree: Int!
        nomModule: String
        commentaires: [Commentaire]
        ressources: Ressources
        nomEnseignant: String
        idModule: ID!
        idEnseignant: ID!
    }

    type ReferenceItem {
        nom: String!
        type: ReferenceEnum!
        lien: String!
        auteur: String!
        maisonEditon: String
        anneeParution: String
        noPage: String
    }

    input ReferenceInput {
        nom: String!
        type: ReferenceEnum!
        lien: String
        auteur: String!
        maisonEditon: String
        anneeParution: String
        noPage: String
    }
    type References {
        data: [ReferenceItem]
    }

    type RessourceItem {
        nom: String!
        description: String
        type: RessourceEnum!
        lien: String!
    }
    type Ressources {
        data: [RessourceItem]
    }

    input RessourceInput {
        nom: String!
        description: String
        type: RessourceEnum!
        lien: String!
    }

    type Enseignant {
        id: ID!
        nom: String!
        prenom: String!
        email: String!
        grade: Grade!
        specialite: String!
        contenuEducatif: [ContenuEducatif]
    }

    input InscriptionInput {
        id: String!
        nom: String!
        prenom: String!
        email: String!
        motDePasse: String!
        confirmMotDePasse: String!
        role: Role!

        anneeBac: String
        idPromotion: ID
        noTelephone: String

        grade: Grade
        specialite: String
    }

    input UpdateUserInput {
        nom: String
        prenom: String
        email: String
        ancienMotDePasse: String
        motDePasse: String
        confirmMotDePasse: String
        role: Role

        anneeBac: String
        idPromotion: ID
        noTelephone: String

        grade: Grade
        specialite: String
    }

    type Query {
        getEtudiants: [Etudiant]
        getEtudiant(idEtudiant: ID!): Etudiant
        getEnseignant(idEnseignant: ID!): Enseignant
        getPromotion(idPromotion: ID!): [Promotion]

        getModules: [Module]!
        getModule(idModule: ID!): Module

        getContenuEducatif: [ContenuEducatif]

        getFilieres: [Filiere]!
        getFiliere(idFiliere: ID!): Filiere
    }

    type Mutation {
        inscription(inscriptionInput: InscriptionInput): AuthPayload!
        updateUser(updateUserInput: UpdateUserInput): AuthPayload!
        connexion(
            email: String!
            motDePasse: String!
            role: String!
        ): AuthPayload!
        creerContenuEducatif(
            idModule: ID!
            nom: String!
            description: String
            contenu: String!
            type: ContenuEducatifEnum!
            ressources: [RessourceInput]
            references: [ReferenceInput]
            duree: Int!
        ): ContenuEducatif!
        updateContenuEducatif(
            idContenuEducatif: ID!
            idModule: ID
            nom: String
            description: String
            contenu: String
            type: ContenuEducatifEnum
            ressources: [RessourceInput]
            references: [ReferenceInput]
            duree: Int
        ): ContenuEducatif!
        supprimerContenuEducatif(idContenuEducatif: ID!): ContenuEducatif!
        commenter(idContenuEducatif: ID!, contenu: String): Commentaire!
        updateCommentaire(idCommentaire: ID!, contenu: String): Commentaire!
        supprimerCommentaire(idCommentaire: ID!): Commentaire!
    }

    type Subscription {
        creerContenuEducatif: ContenuEducatif!
    }
`;
