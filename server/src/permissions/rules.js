const { rule } = require("graphql-shield");
const checkAuth = require("../util/check-auth");
const roles = require("../util/roleEnum");

module.exports = {
  /**
   * Verifie si l'utilisateur est connecte.
   */
  isAuthenticatedUser: rule()((_parent, _args, context) => {
    const user = checkAuth(context);
    return Boolean(user);
  }),

  /**
   * Verifie si l'utilisateur actuellement connecte est l'auteur du contenu educatif.
   */
  isContEdOwner: rule()(async (_parent, { idContenuEducatif }, { prisma }) => {
    const user = checkAuth(context);
    const contEd = await prisma.contenuEducatif.findUnique({
      where: { id: Number(idContenuEducatif) },
      select: {
        enseignants: {
          where: { id: Number[user.idProp] },
          select: { id: true },
        },
      },
    });

    return contEd.enseignants.length > 0;
  }),

  /**
   * Verifie si l'utilisateur actuellement connecte est un etudiant.
   */
  isStudent: rule()((_parent, _args, context) => {
    const user = checkAuth(context);
    return user.role === roles.ETUDIANT;
  }),

  /**
   * Verifie si l'utilisateur actuellement connecte est un enseignant.
   */
  isTeacher: rule()((_parent, _args, context) => {
    const user = checkAuth(context);
    return user.role === roles.ENSEIGNANT;
  }),

  /**
   * Verifie si l'utilisateur actuellement connecte est un admin.
   */
  isAdmin: rule()((_parent, _args, context) => {
    const user = checkAuth(context);
    return user.role === roles.ADMIN;
  }),
  /**
   * Verifie si l'utilisateur actuellemt peut commenter le contenu educatif.
   * Il doit pour cela soit etre l'auteur de ce contenu ou etre un etudiant qui suis ce contenu.
   */
  canComment: rule()(async (_p, { idContenuEducatif }, context) => {
    const user = checkAuth(context);
    const { prisma } = context;

    if (user.role === roles.ENSEIGNANT) {
      const ens = await prisma.enseignant.findUnique({
        where: { id: user.idProp },
        select: {
          contenuEducatif: {
            where: { id: Number(idContenuEducatif) },
            select: { id: true },
          },
        },
      });

      return ens.contenuEducatif.length > 0;
    } else if (user.role === roles.ETUDIANT) {
      const etud = await prisma.etudiant.findUnique({
        where: { id: user.idProp },
      });

      const contEd = await prisma.contenuEducatif.findUnique({
        where: {
          id: Number(idContenuEducatif),
        },
        select: {
          module: {
            select: {
              semestre: {
                select: {
                  promotions: {
                    where: {
                      id: Number(etud.idPromotion),
                    },
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return contEd.module.semestre.promotions.length > 0;
    }
  }),

  /**
   *Verifie si l'utilisateur actuellement connecte est l'auteur du commentaire.
   */
  isCommentOwner: rule()(async (_par, { idCommentaire }, context) => {
    const { prisma } = context;
    const user = checkAuth(context);
    const commUser = await prisma.utilisateur.findUnique({
      where: { id: Number(user.id) },
      select: {
        commentaires: {
          where: {
            id: Number(idCommentaire),
          },
          select: {
            id: true,
          },
        },
      },
    });
    return commUser.commentaires.length > 0;
  }),
};
