import { gql } from '@apollo/client';

export const Role = {
    ETUDIANT: 'ETUDIANT',
    ENSEIGNANT: 'ENSEIGNANT',
    ADMIN: 'ADMIN',
};

export const Grade = {
    DOCTORANT: 'DOCTORANT',
    DOCTEUR: 'DOCTEUR',
    MAITRE_DE_CONFERENCE: 'MAITRE_DE_CONFERENCE',
    PROFESSEUR: 'PROFESSEUR',
};

export const GET_FILIERES_QUERY = gql`
    {
        getFilieres {
            nom
            ufr
            semestres {
                nom
                promotions {
                    id
                    nom
                    annee
                }
            }
        }
    }
`;

export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export const INSCRIPTION_MUTATION = gql`
    mutation inscription(
        $id: String!
        $nom: String!
        $prenom: String!
        $email: String!
        $motDePasse: String!
        $confirmMotDePasse: String!
        $role: Role!
        $anneeBac: String
        $idPromotion: ID
        $noTelephone: String
    ) {
        inscription(
            inscriptionInput: {
                id: $id
                nom: $nom
                prenom: $prenom
                email: $email
                motDePasse: $motDePasse
                confirmMotDePasse: $confirmMotDePasse
                noTelephone: $noTelephone
                anneeBac: $anneeBac
                role: $role
                idPromotion: $idPromotion
            }
        ) {
            id
        }
    }
`;
