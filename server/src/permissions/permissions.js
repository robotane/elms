const { shield, and, allow, or } = require('graphql-shield');
const {
    isAuthenticatedUser,
    isCommentOwner,
    isContEdOwner,
    isTeacher,
    isStudent,
    isAdmin,
    canComment,
} = require('./rules');

module.exports = shield(
    {
        Query: {
            getModules: and(isAuthenticatedUser, isStudent),
            getContenuEducatif: and(isAuthenticatedUser, isTeacher),
        },

        Mutation: {
            updateUser: isAuthenticatedUser,

            creerContenuEducatif: and(isAuthenticatedUser, isTeacher),
            supprimerContenuEducatif: and(isAuthenticatedUser, isContEdOwner),
            updateContenuEducatif: and(isAuthenticatedUser, isContEdOwner),

            commenter: canComment,
            updateCommentaire: and(isAuthenticatedUser, isCommentOwner),
            supprimerCommentaire: and(
                isAuthenticatedUser,
                or(isCommentOwner, isAdmin)
            ),
        },
    } /* ,
    {
        fallbackRule: allow,
        allowExternalErrors: true,
        fallbackError: (err, parent, args, context, info) => {
            console.log('error: ', err, '\nparent: ', parent, '\nargs: ', args);
        },
    } */
);
