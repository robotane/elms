const { UserInputError } = require('apollo-server');

const checkAuth = require('../util/check-auth');
const roles = require('../util/roleEnum');

module.exports = {
    Commentaire: {
        /**
         * Retrouve le nom de l'utilisateur qui a creer ce commentaire.
         */
        nomUtilsateur: async (_parent, _arg, context) => {
            const { prisma } = context;
            const user = checkAuth(context);
            let owner = {};
            if (user.role === roles.ETUDIANT) {
                owner = await prisma.etudiant.findUnique({
                    where: { id: user.idProp },
                });
            } else if (user.role === roles.ENSEIGNANT) {
                owner = await prisma.enseignant.findUnique({
                    where: { id: user.idProp },
                });
            }
            return `${owner.nom} ${owner.prenom}`;
        },
    },

    Mutation: {
        /**
         * Publier un commentaire sur un contenu educatif.
         */
        async commenter(_, { idContenuEducatif, contenu }, context) {
            if (contenu.trim === '') {
                return new UserInputError('Errors', {
                    errors: {
                        contenu: 'Saisissez un contenu',
                    },
                });
            }

            const { prisma } = context;
            const user = checkAuth(context);

            return await prisma.commentaire.create({
                data: {
                    contenu,
                    contenuEducatif: {
                        connect: {id: Number(idContenuEducatif)},
                    },
                    utilisateur: {
                        connect: {
                            id: Number(user.id),
                        },
                    },
                },
            });
        },

        /**
         * Mettre a jour un commentaire deja publie.
         */
        async updateCommentaire(_, { idCommentaire, contenu }, context) {
            if (contenu.trim === '') {
                return new UserInputError('Errors', {
                    errors: {
                        contenu: 'Saisissez un contenu',
                    },
                });
            }
            const { prisma } = context;

            return await prisma.commentaire.update({
                where: {id: Number(idCommentaire)},
                data: {
                    contenu,
                },
            });
        },

        /**
         * Supprimer un commentaire deja publie.
         */
        async supprimerCommentaire(_, { idCommentaire }, context) {
            const { prisma } = context;
            return await prisma.commentaire.delete({
                where: {id: Number(idCommentaire)},
            });
        },
    },
};
