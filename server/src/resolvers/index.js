const etudiantResolvers = require('./etudiant');
const utilisateurResolvers = require('./utilisateur');
const moduleResolvers = require('./module');
const filierResolvers = require('./filiere');
const contenuEducatifResolvers = require('./contenuEducatif');
const commentaireResolvers = require('./commentaire');
const promotionResolvers = require('./promotion');
const enseignantResolvers = require('./enseignant');

module.exports = {
    ContenuEducatif: contenuEducatifResolvers.ContenuEducatif,
    Module: moduleResolvers.Module,
    Etudiant: etudiantResolvers.Etudiant,
    Commentaire: commentaireResolvers.Commentaire,
    Utilisateur: utilisateurResolvers.Utilisateur,
    Promotion: promotionResolvers.Promotion,
    Query: {
        ...etudiantResolvers.Query,
        ...moduleResolvers.Query,
        ...filierResolvers.Query,
        ...contenuEducatifResolvers.Query,
        ...promotionResolvers.Query,
		...enseignantResolvers.Query,
        // ...commentaireResolvers.Query,
    },
    Mutation: {
        ...utilisateurResolvers.Mutation,
        ...contenuEducatifResolvers.Mutation,
        ...commentaireResolvers.Mutation,
    },
    /*
    Subscription: {
        ...postsResolvers.Subscription,
    }, */
};
