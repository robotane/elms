import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { YearInput } from 'semantic-ui-calendar-react-17';
import { Button, Form, Header, Select } from 'semantic-ui-react';
import * as Yup from 'yup';
import { Grade, INSCRIPTION_MUTATION, Role } from '../../graphql/queries';

export const RegForm = ({ filieres, isStudent }) => {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        id: '',
        nom: '',
        prenom: '',
        email: '',
        motDePasse: '',
        confirmMotDePasse: '',
        role: undefined,
        idPromotion: '',
        anneeBac: '',
        noTelephone: '',
        grade: undefined,
        specialite: '',
        indexFiliere: undefined,
    });

    const schema = Yup.object().shape({
        id: Yup.string().required('Le matricule ne peut être vide'),
        nom: Yup.string().required('Le nom ne peut être vide'),
        prenom: Yup.string().required('Le prénom ne peut être vide'),
        email: Yup.string()
            .email('Email invalide')
            .required("L'email ne peut être vide"),
        motDePasse: Yup.string().required('Le mot de passe ne peut être vide'),
        confirmMotDePasse: Yup.string() /* .test(
            'passwords-match',
            'Les mots de passe doivent être identiques',
            (value, context) => {
                console.log(context.parent.password);
                if (!value) {
                    return false;
                }
                return context.parent.password === value;
            }
        ) */,
        role: Yup.string().required('Le role ne peut être vide'),
        idPromotion: Yup.string().required('Veuillez choisir une promotion'),
        anneeBac: Yup.string().required("L'année du Bac ne peut être vide"),
        noTelephone: Yup.string().required(
            'Le numéro de téléphone ne peut être vide'
        ),
        grade: Yup.string().required('Le grade ne peut être vide'),
        specialite: Yup.string().required('La  spécialité ne peut être vide'),
        indexFiliere: Yup.number(),
    });

    const [addUser, { loading }] = useMutation(INSCRIPTION_MUTATION, {
        update(result) {
            console.log(result);
        },
        variables: ((v) => {
            const { indexFiliere, ...ret } = v;
            return ret;
        })({
            ...values,
            role: isStudent ? Role.ETUDIANT : Role.ENSEIGNANT,
        }),
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
        },
    });

    const onSubmit = (event) => {
        event.preventDefault();
        addUser();
    };

    const onBlur = (e) => {
        const name = e ? e.target.name : 'anneeBac';

        Yup.reach(schema, name)
            .validate(values[name])
            .then(() => {
                setErrors(
                    ((v) => {
                        const { [name]: _, ...ret } = v;
                        return ret;
                    })(errors)
                );
            })
            .catch((err) => {
                console.log(err);
                setErrors({ ...errors, [name]: err.errors[0] });
            });
    };
    const onChange = (event, { name, value }) => {
        event.preventDefault();
        setValues({ ...values, [name]: value });
    };

    const getFilieres = () =>
        filieres
            ? filieres.map(({ ufr, nom }, key) => ({
                  key: key,
                  text: nom,
                  description: `UFR/${ufr}`,
                  value: key,
              }))
            : [];

    const getPromotions = () =>
        values.indexFiliere !== undefined
            ? filieres[values.indexFiliere].semestres
                  .map(({ nom: semestre, promotions }) =>
                      promotions.map(({ nom, annee, id }) => ({
                          text: nom,
                          description: `${semestre}-${annee}`,
                          value: id,
                      }))
                  )
                  .flat()
            : [];

    return (
        <Form noValidate onSubmit={onSubmit} loading={loading}>
            <Header size='large'>Inscription</Header>
            <Form.Group widths='equal'>
                <Form.Input
                    label='Nom'
                    placeholder='Nom...'
                    name='nom'
                    type='text'
                    icon='user'
                    iconPosition='left'
                    value={values.nom}
                    error={errors.nom}
                    onBlur={onBlur}
                    onChange={onChange}
                />
                <Form.Input
                    label='Prénom'
                    placeholder='Prénom...'
                    name='prenom'
                    type='text'
                    icon='user'
                    iconPosition='left'
                    value={values.prenom}
                    error={errors.prenom}
                    onBlur={onBlur}
                    onChange={onChange}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input
                    label='Numéro matricule'
                    placeholder='Numéro matricule...'
                    name='id'
                    type='text'
                    icon='hashtag'
                    iconPosition='left'
                    value={values.id}
                    error={errors.id}
                    onBlur={onBlur}
                    onChange={onChange}
                />
                {isStudent ? (
                    <Form.Field
                        control={YearInput}
                        label='Année du Bac'
                        placeholder='Année du Bac...'
                        name='anneeBac'
                        value={values.anneeBac}
                        closable
                        icon='calendar alternate outline'
                        iconPosition='left'
                        error={errors.anneeBac}
                        onBlur={onBlur}
                        onChange={onChange}
                    />
                ) : (
                    <Form.Field
                        control={Select}
                        label='Grade'
                        name='grade'
                        onBlur={onBlur}
                        onChange={onChange}
                        value={values.grade}
                        error={errors.grade}
                        options={[
                            {
                                key: 0,
                                text: 'Doctorant',
                                value: Grade.DOCTORANT,
                            },
                            { key: 1, text: 'Docteur', value: Grade.DOCTEUR },
                            {
                                key: 2,
                                text: 'Maitre de conference',
                                value: Grade.MAITRE_DE_CONFERENCE,
                            },
                            {
                                key: 3,
                                text: 'Professeur',
                                value: Grade.PROFESSEUR,
                            },
                        ]}
                        placeholder='Grade...'
                    />
                )}
            </Form.Group>
            {isStudent && (
                <Form.Group widths='equal'>
                    <Form.Dropdown
                        selection
                        label='Filière'
                        placeholder='Filière...'
                        onBlur={onBlur}
                        onChange={onChange}
                        name='indexFiliere'
                        value={values.indexFiliere}
                        options={getFilieres()}
                    />
                    <Form.Dropdown
                        selection
                        label='Promotion'
                        placeholder='Promotion...'
                        name='idPromotion'
                        value={values.idPromotion}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={errors.idPromotion}
                        disabled={values.indexFiliere === undefined}
                        options={getPromotions()}
                    />
                </Form.Group>
            )}
            <Form.Group widths='equal'>
                <Form.Input
                    label='Email'
                    placeholder='Email...'
                    name='email'
                    type='email'
                    icon='at'
                    iconPosition='left'
                    value={values.email}
                    error={errors.email}
                    onBlur={onBlur}
                    onChange={onChange}
                />
                {isStudent ? (
                    <Form.Input
                        label='Numéro de téléphone'
                        placeholder='Numéro de téléphone...'
                        name='noTelephone'
                        type='tel'
                        pattern='[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}'
                        icon='phone'
                        iconPosition='left'
                        value={values.noTelephone}
                        error={errors.noTelephone}
                        onBlur={onBlur}
                        onChange={onChange}
                    />
                ) : (
                    <Form.Input
                        label='Spécialité'
                        name='specialite'
                        placeholder='Spécialité...'
                        onBlur={onBlur}
                        onChange={onChange}
                        icon='briefcase'
                        iconPosition='left'
                        value={values.specialite}
                        error={errors.specialite}
                    />
                )}
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input
                    label='Mot de passe'
                    placeholder='Mot de passe...'
                    name='motDePasse'
                    type='password'
                    icon='lock'
                    iconPosition='left'
                    value={values.motDePasse}
                    error={errors.motDePasse}
                    onBlur={onBlur}
                    onChange={onChange}
                />
                <Form.Input
                    label='Confirmez le mot de passe'
                    placeholder='Confirmez le mot de passe...'
                    name='confirmMotDePasse'
                    type='password'
                    icon='lock'
                    iconPosition='left'
                    value={values.confirmMotDePasse}
                    error={errors.confirmMotDePasse}
                    onBlur={onBlur}
                    onChange={onChange}
                />
            </Form.Group>

            <Button
                type='submit'
                primary
                // disabled={Object.keys(errors).length > 0}
            >
                Inscription
            </Button>
        </Form>
    );
};
