module.exports = {
    Query: {
        /**
         * Retourne la liste de toutes les filieres.
         */
        async getFilieres(_par, _args, context) {
            const {prisma} = context;
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
         * Retourne la filiere dont l'ID est idFiliere.
         */
        async getFiliere(_par, {idFiliere}, context) {
            const {prisma} = context;
            return await prisma.filiere.findUnique({
                    where: {id: idFiliere},
                });
        },
    },
};
