import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { YearInput } from 'semantic-ui-calendar-react-17';
import { Button, Container, Form, Select, Tab } from 'semantic-ui-react';
import {
    GET_FILIERES_QUERY,
    Grade,
    INSCRIPTION_MUTATION,
    Role,
} from '../../graphql/queries';

const RegForm = ({ filieres, isStudent }) => {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        id: '',
        nom: '',
        prenom: '',
        email: '',
        motDePasse: '',
        confirmMotDePasse: '',
        role: '',
        idPromotion: '',
        anneeBac: '',
        noTelephone: '',
        grade: '',
        specialite: '',
        indexFiliere: undefined,
    });

    const [addUser, { loading }] = useMutation(INSCRIPTION_MUTATION, {
        update(proxy, result) {
            console.log(result);
        },
        variables: ((v) => {
            const { indexFiliere, ...ret } = v;
            console.log(v);
            return ret;
        })({ ...values, role: isStudent ? Role.ETUDIANT : Role.ENSEIGNANT }),
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
            /*             console.log(
                JSON.stringify(
                    error.graphQLErrors[0].extensions.errors,
                    null,
                    2
                )
            ); */
            /* if (error.networkError) {
                console.log(error.networkError.result.errors);
                return new Error(error.networkError.result.errors);
            } else {
                console.log(JSON.stringify(error, null, 2));
            } */
        },
    });

    const onSubmit = (event) => {
        event.preventDefault();
        addUser();
    };
    const onChange = (event, { name, value }) => {
        console.log(name, value);
        setValues({ ...values, [name]: value });
    };
    return (
        <Form noValidate onSubmit={onSubmit} loading={loading}>
            <h1>Inscription</h1>
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
                    onChange={onChange}
                />
                <Form.Input
                    label='Prénom'
                    placeholder='Prénom..'
                    name='prenom'
                    type='text'
                    icon='user'
                    iconPosition='left'
                    value={values.prenom}
                    error={errors.prenom}
                    onChange={onChange}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input
                    label='Numero matricule'
                    placeholder='Numero matricule...'
                    name='id'
                    type='text'
                    icon='hashtag'
                    iconPosition='left'
                    value={values.id}
                    error={errors.id}
                    onChange={onChange}
                />
                {isStudent ? (
                    <Form.Field
                        control={YearInput}
                        label='Année du Bac'
                        placeholder='Année du Bac..'
                        name='anneeBac'
                        value={values.anneeBac}
                        closable
                        icon='calendar alternate outline'
                        iconPosition='left'
                        error={errors.anneeBac}
                        onChange={onChange}
                    />
                ) : (
                    <Form.Field
                        control={Select}
                        label='Grade'
                        name='grade'
                        onChange={onChange}
                        value={values.grade}
                        error={errors.grade}
                        options={[
                            {
                                key: '0',
                                text: 'Doctorant',
                                value: Grade.DOCTORANT,
                            },
                            { key: '1', text: 'Docteur', value: Grade.DOCTEUR },
                            {
                                key: '2',
                                text: 'Maitre de conferance',
                                value: Grade.MAITRE_DE_CONFERENCE,
                            },
                            {
                                key: '3',
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
                        label='Filiere'
                        placeholder='Filiere'
                        onChange={onChange}
                        name='indexFiliere'
                        value={values.indexFiliere}
                        options={
                            filieres
                                ? filieres.map(({ ufr, nom }, key) => ({
                                      key: key,
                                      text: nom,
                                      description: `UFR/${ufr}`,
                                      value: key,
                                  }))
                                : []
                        }
                    />
                    <Form.Dropdown
                        selection
                        label='Promotion'
                        placeholder='Promotion'
                        name='idPromotion'
                        value={values.idPromotion}
                        onChange={onChange}
                        error={errors.idPromotion}
                        disabled={values.indexFiliere === undefined}
                        options={
                            values.indexFiliere !== undefined
                                ? filieres[values.indexFiliere].semestres
                                      .map(({ nom: semestre, promotions }) =>
                                          promotions.map(
                                              ({ nom, annee, id }) => ({
                                                  text: nom,
                                                  description: `${semestre}-${annee}`,
                                                  value: id,
                                              })
                                          )
                                      )
                                      .flat()
                                : []
                        }
                    />
                </Form.Group>
            )}
            <Form.Group widths='equal'>
                <Form.Input
                    label='Email'
                    placeholder='Email..'
                    name='email'
                    type='email'
                    icon='at'
                    iconPosition='left'
                    value={values.email}
                    error={errors.email}
                    onChange={onChange}
                />
                {isStudent ? (
                    <Form.Input
                        label='Numero de telephone'
                        placeholder='Numero de telephone...'
                        name='noTelephone'
                        type='tel'
                        pattern='[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}'
                        icon='phone'
                        iconPosition='left'
                        value={values.noTelephone}
                        error={errors.noTelephone}
                        onChange={onChange}
                    />
                ) : (
                    <Form.Input
                        label='Spécialité'
                        name='specialite'
                        onChange={onChange}
                        icon='briefcase'
                        iconPosition='left'
                        value={values.specialite}
                        error={errors.specialite}
                        placeholder='Spécialité...'
                    />
                )}
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input
                    label='Mot de passe'
                    placeholder='Mot de passe..'
                    name='motDePasse'
                    type='password'
                    icon='lock'
                    iconPosition='left'
                    value={values.motDePasse}
                    error={errors.motDePasse}
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
                    onChange={onChange}
                />
            </Form.Group>

            <Button type='submit' primary>
                Inscription
            </Button>
        </Form>
    );
};

const RegisterForm = () => {
    let filieres;
    const { data } = useQuery(GET_FILIERES_QUERY);
    if (data) {
        filieres = data.getFilieres;
    }

    const panes = [
        {
            menuItem: { key: 'student', icon: 'student', content: 'Etudiant' },
            render: () => (
                <Tab.Pane>
                    <RegForm filieres={filieres} isStudent={true} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: {
                key: 'teacher',
                icon: 'briefcase',
                content: 'Enseignant',
            },
            render: () => (
                <Tab.Pane>
                    <RegForm isStudent={false} />
                </Tab.Pane>
            ),
        },
    ];
    return (
        <div className='register-form-container'>
            <Container>
                <Tab menu={{ pointing: true }} panes={panes} />
            </Container>
        </div>
    );
};

export default RegisterForm;
