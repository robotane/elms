module.exports = {
    Etudiant: {
        /**
         * Genere le nom de la filiere de l'etudiant.
         */
        filiere: async (parent, _, { prisma }) => {
            const promotion = await prisma.promotion.findUnique({
                where: { id: Number(parent.idPromotion) },
                select: {
                    semestre: {
                        select: {
                            filiere: {
                                select: {
                                    nom: true,
                                },
                            },
                        },
                    },
                },
            });
            return promotion.semestre.filiere.nom;
        },
        /**
         * Genere le nom de semestre de l'etudiant.
         */
        semestre: async (parent, _, { prisma }) => {
            const promotion = await prisma.promotion.findUnique({
                where: { id: Number(parent.idPromotion) },
                select: {
                    semestre: {
                        select: {
                            nom: true,
                        },
                    },
                },
            });
            return promotion.semestre.nom;
        },
        /**
         * Genere le nom de la promotion de l'etudiant.
         */
        promotion: async (parent, _, { prisma }) => {
            const promotion = await prisma.promotion.findUnique({
                where: { id: Number(parent.idPromotion) },
                select: {
                    nom: true,
                },
            });
            return promotion.nom;
        },
    },
    Query: {
        /**
         * Retourne la liste de tous les edutiants inscrits.
         */
        async getEtudiants(_par, _args, context) {
            const { prisma } = context;
            return await prisma.etudiant.findMany({});
        },
        /**
         * Retourne les information sur l'etudiant d'ID idEtudiant.
         */
        async getEtudiant(_, { idEtudiant }, { prisma }) {
            return await prisma.etudiant.findUnique({
                    where: {id: idEtudiant},
                });

        },
    },
};
