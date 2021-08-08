const { UserInputError } = require('apollo-server');

const { validateCreateContEdInput } = require('../util/validators');
const checkAuth = require('../util/check-auth');

module.exports = {
    ContenuEducatif: {
        /**
         * Le nom du module dont ce contenu fait partie.
         */
        nomModule: async (parent, _, { prisma }) => {
            const module = await prisma.module.findUnique({
                where: { id: parent.idModule },
            });
            return module.nom;
        },
        /**
         * Le nom de l'enseignant ayant publie ce contenu.
         */
        nomEnseignant: async (parent, _, context) => {
            const { prisma } = context;
            checkAuth(context);
            const enseignant = await prisma.contenuEducatif
                .findUnique({
                    where: { id: Number(parent.id) },
                })
                .enseignants();

            return `${enseignant[0].nom} ${enseignant[0].prenom}`;
        },
    },
    Query: {
        /**
         * Obtenir la liste de tout le contenu educatif de l'Enseignant connecté.
         */
        async getContenuEducatif(_par, _args, context) {
            const { prisma } = context;
            const user = checkAuth(context);
            return await prisma.enseignant
                .findUnique({
                    where: {id: user.idProp},
                })
                .contenuEducatif();
        },
    },
    Mutation: {
        /**
         * Creer un contenu educatif, cela est fait par un enseignant.
         */
        async creerContenuEducatif(
            _,
            {
                idModule,
                nom,
                description,
                contenu,
                ressources,
                type,
                references,
                duree,
            },
            context
        ) {
            const { errors, valid } = validateCreateContEdInput(
                nom,
                contenu,
                type,
                duree,
                idModule
            );
            if (!valid) {
                return new UserInputError('Errors', { errors });
            }
            const { prisma } = context;
            const user = checkAuth(context);
            return await prisma.contenuEducatif.create({
                data: {
                    nom,
                    description,
                    contenu,
                    type,
                    references: {data: references},
                    duree,
                    module: {connect: {id: Number(idModule)}},
                    enseignants: {connect: {id: user.idProp}},
                    ressources: {data: ressources},
                },
            });
        },

        /**
         * Mettre a jour un contenu eucatif deja publie, seul les champs non vides seront inseres dans la base de donnees.
         */
        async updateContenuEducatif(_, args, context) {
            const { prisma } = context;

            let newVal = { where: {}, data: {} };
            for (const [k, v] of Object.entries(args)) {
                if (v !== '') {
                    if (k === 'idContenuEducatif') {
                        newVal.where = { id: Number(v) };
                    } else if (k === 'ressources') {
                        newVal.data.ressources = { data: v };
                    } else if (k === 'references') {
                        newVal.data.references = { data: v };
                    } else if (k === 'idModule') {
                        newVal.data.module = { connect: { id: Number(v) } };
                    } else {
                        newVal.data[k] = v;
                    }
                }
            }
            if (Object.keys(newVal.data).length < 1)
                return new Error('Entrez du texte!');
            return await prisma.contenuEducatif.update({
                ...newVal,
            });
        },

        /**
         * Supprimer un contenu educatif avec tous ces commentaires.
         */
        async supprimerContenuEducatif(_p, { idContenuEducatif }, context) {
            const { prisma } = context;

            const delComment = prisma.commentaire.deleteMany({
                where: {
                    idContenuEducatif: Number(idContenuEducatif),
                },
            });
            const delContEd = prisma.contenuEducatif.delete({
                where: { id: Number(idContenuEducatif) },
            });
            const [_, contEd] = await prisma.$transaction([
                delComment,
                delContEd,
            ]);
            return contEd;
        },
    },
};
