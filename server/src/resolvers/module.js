const checkAuth = require('../util/check-auth');

module.exports = {
    Module: {
        /**
         * Le nombre de contenu educatif que ce module possede.
         */
        nmbrDeContEduc: async ({ id }, _a, { prisma }) => {
            const mod = await prisma.module.findUnique({
                where: { id },
                select: {
                    contenuEducatif: true,
                },
            });
            return mod.contenuEducatif.length;
        },
    },
    Query: {
        /**
         * Obtenir la liste de tous les modules que l'etudiant actuellement connecte suit.
         */
        async getModules(_par, _args, context) {
            const { prisma } = context;
            const user = checkAuth(context);
            const etud = await prisma.etudiant.findUnique({
                where: {
                    id: user.idProp,
                },
                select: {
                    promotion: {
                        select: {
                            semestre: {
                                select: {
                                    modules: {
                                        include: {
                                            contenuEducatif: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            return etud.promotion.semestre.modules;
        },
        async getModule(_par, { idModule }, context) {
            const { prisma } = context;
            return await prisma.module.findUnique({
                where: {id: idModule},
                include: {
                    contenuEducatif: true,
                },
            });
        },
    },
};
