module.exports = {
    Promotion: {
        /**
         * L'effectif de la promotion.
         */
        effectif: async (parent, _, context) => {
            const { prisma } = context;
            const etud = await prisma.promotion
                .findUnique({
                    where: { id: parent.id },
                })
                .etudiants();
            return etud.length;
        },
    },
    Query: {
        /**
         * Retourne la liste de toutes les promotions.
         */
        async getPromotions(_par, _args, context) {
            const { prisma } = context;
            return await prisma.filiere.findMany({
                include: {
                    semestres: {
                        include: {
                            modules: true,
                            promotions: true,
                        },
                    },
                },
            });
        },
        /**
         * Retourne la promtion d'ID idPromotion.
         */
        async getPromotion(_par, { idPromotion }, context) {
            const { prisma } = context;
            return await prisma.promotion.findUnique({
                where: {id: idPromotion},
                include: {
                    etudiants: true,
                },
            });
        },
    },
};
