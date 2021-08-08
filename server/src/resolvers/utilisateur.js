const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {
    validateRegisterInput,
    validateLoginInput,
    validateUserUpdateInput,
} = require('../util/validators');

const {ETUDIANT, ENSEIGNANT, ADMIN} = require('../util/roleEnum');
const checkAuth = require('../util/check-auth');
const roles = require("../util/roleEnum");

/**
 * Genere un Web Token pour l'utilisateur.
 * @param {Object} user 'Utilisateur' model
 * @returns The JSON Web Token string.
 */
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
            email: user.email,
            idProp: user.idProp,
        },
        process.env.JWT_SECRET
    );
};

module.exports = {
    Utilisateur: {
        /**
         * Genere le nom de l'utilisateur.
         */
        nom: async (parent, _arg, context) => {
            const {prisma} = context;
            const user = checkAuth(context);
            let owner = {};
            if (user.role === roles.ETUDIANT) {
                owner = await prisma.etudiant.findUnique({
                    where: {id: parent.idProp},
                });
            } else if (user.role === roles) {
                owner = await prisma.enseignant.findUnique({
                    where: {id: parent.idProp},
                });
            }
            return `${owner.nom} ${owner.prenom}`;
        },
    },
    Mutation: {
        /**
         * Connexion a son compte en fournissant l'email, le mot depasse et le role.
         */
        async connexion(_, {email, motDePasse, role}, {prisma}) {
            // Validation des informations
            const {errors, valid} = validateLoginInput(
                email,
                motDePasse,
                role
            );

            if (!valid) {
                return new UserInputError('Errors', {errors});
            }

            // Verifier que l'utilsateur existe dans la base de donnees
            const user = await prisma.utilisateur.findUnique({
                where: {email_role: {email, role}},
            });

            if (!user) {
                errors.general = 'Adresse mail ou mot de passe incorrecte';
                return new UserInputError(
                    'Adresse mail ou mot de passe incorrecte',
                    {errors}
                );
            }

            // Comparer le mot de passe a celui dans la base de donnees
            const match = await bcrypt.compare(motDePasse, user.motDePasse);
            if (!match) {
                errors.general = 'Adresse mail ou mot de passe incorrecte';
                return new UserInputError(
                    'Adresse mail ou mot de passe incorrecte',
                    {errors}
                );
            }

            // Hash du mot de passe et generation du web token
            const token = generateToken(user);

            return {
                id: user.id,
                role: user.role,
                email: user.email,
                idProp: user.idProp,
                token: token,
            };
        },

        /**
         * Inscription d'un nouvel utilisateur, il peut etre un etudiant ou un enseignant.
         */
        async inscription(_, {inscriptionInput}, {prisma}) {
            // Valider les informations
            const {valid, errors} = validateRegisterInput(inscriptionInput);
            if (!valid) {
                return new UserInputError('Errors', {errors});
            }
            let {id, nom, prenom, email, motDePasse, role} = inscriptionInput;

            // Verifier que l'utilisateur n'existe pas deja
            const userExists = await prisma.utilisateur.findUnique({
                where: {email_role: {email, role}},
            });
            if (userExists) {
                return new UserInputError(
                    'Adresse mail deja utilisée pour ce role',
                    {
                        errors: {
                            email: 'Cette adresse mail est deja utilisée pour le role choisi',
                        },
                    }
                );
            }

            if (role === ETUDIANT) {
                const {idPromotion, anneeBac, noTelephone} = inscriptionInput;
                const studentExists = await prisma.etudiant.findUnique({
                    where: {id: id},
                });

                if (studentExists) {
                    return new UserInputError(
                        'Vous êtes déja enregistré avec ce numero matricule',
                        {
                            errors: {
                                id: 'Ce numero matricule est déja associé à un étudiant',
                            },
                        }
                    );
                }

                await prisma.etudiant.create({
                    data: {
                        id,
                        nom,
                        prenom,
                        email,
                        noTelephone,
                        anneeBac,
                        promotion: {connect: {id: Number(idPromotion)}},
                    },
                });
            } else if (role === ENSEIGNANT) {
                const {grade, specialite} = inscriptionInput;

                const teacherExists = await prisma.enseignant.findUnique({
                    where: {id: id},
                });

                if (teacherExists) {
                    return new UserInputError(
                        'Vous êtes déja enregistré avec ce numero matricule',
                        {
                            errors: {
                                id: 'Ce numero matricule est déja associé à un enseignant',
                            },
                        }
                    );
                }
                await prisma.enseignant.create({
                    data: {
                        id,
                        nom,
                        prenom,
                        email,
                        grade,
                        specialite,
                    },
                });
            }

            // TODO: Gerer le cas du role ADMIN

            // Hash du mot de passe et generation du web token
            motDePasse = await bcrypt.hash(motDePasse, 12);
            const user = await prisma.utilisateur.create({
                data: {email, motDePasse, role, idProp: id},
            });

            const token = generateToken(user);

            return {
                id: user.id,
                email: user.email,
                role: user.role,
                idProp: user.idProp,
                token: token,
            };
        },

        /**
         * Mettre a jour le profil d'utilisateur existant.
         */
        async updateUser(_, {updateUserInput}, context) {
            // Valider les informations
            const {valid, errors} = validateUserUpdateInput(updateUserInput);
            if (!valid) {
                return new UserInputError('Errors', {errors});
            }
            const {prisma} = context;
            let newUsVal = {};
            let newVal = {};
            let ancienMotDePasse;
            for (const [k, v] of Object.entries(updateUserInput)) {
                if (v !== '') {
                    if (k === 'confirmMotDePasse') continue;
                    if (k === 'ancienMotDePasse') ancienMotDePasse = v;
                    else if (k === 'motDePasse') newUsVal[k] = v;
                    else if (k === 'email') {
                        newUsVal[k] = v;
                        newVal[k] = v;
                    } else newVal[k] = v;
                }
            }
            const user = checkAuth(context);
            let upUser;

            // Changer de mot de passse
            if (ancienMotDePasse) {
                upUser = await prisma.utilisateur.findUnique({
                    where: {id: user.id},
                });
                // Comparer l'ancien mot de passe saisi a celui dans la base de donnees
                const match = await bcrypt.compare(
                    ancienMotDePasse,
                    upUser.motDePasse
                );
                if (!match) {
                    errors.general = 'Mot de passe incorrect';
                    return new UserInputError(
                        "L'ancien mot de passe est incorrect",
                        {errors}
                    );
                }
                // Hash du nouveau mot de passe
                newUsVal.motDePasse = await bcrypt.hash(
                    newUsVal.motDePasse,
                    12
                );
            }

            if (Object.keys(newUsVal).length > 0) {
                try {
                    upUser = await prisma.utilisateur.update({
                        where: {
                            id: user.id,
                        },
                        data: {...newUsVal},
                    });
                } catch (error) {
                    const errStr = String(error);
                    if (
                        errStr.includes(
                            'Unique constraint failed on the constraint: `email_role_unique'
                        )
                    )
                        return new UserInputError(
                            'Address mail deja utilisée',
                            {
                                errors: {
                                    email: 'Email déjà utilisée, veuillez en choisir une autre',
                                },
                            }
                        );

                    return new Error(error);
                }
            }
            if (Object.keys(newVal).length > 0) {
                newVal = {
                    where: {id: user.idProp},
                    data: {...newVal},
                };

                if (user.role === ETUDIANT) {
                    await prisma.etudiant.update(newVal);
                } else if (user.role === ENSEIGNANT) {
                    await prisma.enseignant.update(newVal);
                }
            }

            if (upUser) {
                const token = generateToken(upUser);
                return {
                    id: upUser.id,
                    email: upUser.email,
                    role: upUser.role,
                    idProp: upUser.idProp,
                    token: token,
                };
            } else {
                const token = generateToken(user);
                return {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    idProp: user.idProp,
                    token: token,
                };
            }
        },
    },
};
