module.exports = {
    Query: {
        /**
         * Retourne la liste de tous les enseignants.
         */
        async getEnseignants(_par, _args, context) {
            const { prisma } = context;
            return await prisma.enseignant.findMany({});
        },
        /**
         * Retourne les information sur l'enseignant d'ID idEnseignant.
         */
        async getEnseignant(_, { idEnseignant }, { prisma }) {
            return await prisma.enseignant.findUnique({
                    where: {id: idEnseignant},
                });

        },
    },
};
