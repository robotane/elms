const { ETUDIANT, ENSEIGNANT, ADMIN } = require('./roleEnum');

module.exports.validateRegisterInput = ({
    id,
    nom,
    prenom,
    email,
    motDePasse,
    confirmMotDePasse,
    role,
    idPromotion,
    anneeBac,
    noTelephone,
    grade,
    specialite,
}) => {
    const errors = {};
    if (id.trim() === '') {
        errors.id = 'Le matricule ne peut être vide';
    }

    if (nom.trim() === '') {
        errors.nom = 'Le nom ne peut être vide';
    }
    if (prenom.trim() === '') {
        errors.prenom = 'Le prenom ne peut être vide';
    }
    if (role.trim() === '') {
        errors.role = 'Le role ne peut être vide';
    } else {
        if (role === ETUDIANT) {
            if (!idPromotion || idPromotion.trim() === '') {
                errors.idPromotion = "L'ID de la promtion ne peut être vide";
            }
            if (!anneeBac || anneeBac.trim() === '') {
                errors.anneeBac = "L'année du Bac ne peut être vide";
            }
            if (!noTelephone || noTelephone.trim() === '') {
                errors.noTelephone = 'Le numero de téléphone ne peut être vide';
            }
        } else if (role === ENSEIGNANT) {
            if (!grade || grade.trim() === '') {
                errors.grade = 'Le grade ne peut être vide';
            }
            if (!specialite || specialite.trim() === '') {
                errors.specialite = 'La specialité ne peut être vide';
            }
        } else {
            // TODO: Gerer le cas du role ADMIN

            errors.role = 'Le role est invalide';
        }
    }

    if (email.trim() === '') {
        errors.email = "L'email ne peut être vide";
    } else {
        const emailRegEx =
            /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(emailRegEx)) {
            errors.email = 'Email invalide';
        }
    }
    if (motDePasse.trim() === '') {
        errors.motDePasse = 'Le mot de passe ne peut être vide';
    } else if (motDePasse !== confirmMotDePasse) {
        errors.confirmMotDePasse = 'Les mots de passe doivent être idenetiques';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};

module.exports.validateLoginInput = (email, motDePasse, role) => {
    const errors = {};
    if (email.trim() === '') {
        errors.email = "L'email ne peut être vide";
    } else {
        const regEx =
            /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Email invalide';
        }
    }
    if (motDePasse.trim() === '') {
        errors.motDePasse = 'Le mot de passe ne peut être vide';
    }
    if (role.trim() === '') {
        errors.role = 'Le role ne peut être vide';
    } else {
        if (!(role in { ETUDIANT, ADMIN, ENSEIGNANT })) {
            errors.role = 'Le role est invalide';
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};

module.exports.validateUserUpdateInput = ({
    email,
    ancienMotDePasse,
    motDePasse,
    confirmMotDePasse,
}) => {
    const errors = {};
    if (email && email.trim() !== '') {
        const emailRegEx =
            /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(emailRegEx)) {
            errors.email = 'Email invalide';
        }
    }
    if (ancienMotDePasse && ancienMotDePasse.trim() !== '') {
        if (!motDePasse || motDePasse.trim() === '') {
            errors.motDePasse = 'Le nouveau mot de passe ne peut être vide';
        } else if (motDePasse !== confirmMotDePasse) {
            errors.confirmMotDePasse =
                'Les nouveaux mots de passe doivent être identiques';
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};

module.exports.validateCreateContEdInput = (
    nom,
    contenu,
    type,
    duree,
    idModule
) => {
    const errors = {};
    if (nom.trim() === '') {
        errors.nom = 'Veuillez entrer un nom';
    }

    if (contenu.trim === '') {
        errors.contenu = 'Veuillez saisir du contenu';
    }

    if (type.trim === '') {
        errors.type = 'Choisissez un type';
    }
    if (duree.trim === '') {
        errors.duree = 'Entrez une durée';
    }
    if (idModule.trim === '') {
        errors.idModule = 'Choisissez une promotion';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};
