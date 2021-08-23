import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import {
    Button,
    Container,
    Form,
    Header,
    Message,
    Select,
} from 'semantic-ui-react';
import * as Yup from 'yup';
import { AuthContext } from '../context/auth';
import { LOGIN_USER, Role } from '../graphql/queries';
import { setErrorsWrapper } from '../util/setErrors';

const LoginForm = ({ history }) => {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        email: '',
        motDePasse: '',
        role: undefined,
    });

    const context = useContext(AuthContext);

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { connexion: userData } }) {
            console.log(userData);
            context.login(userData);
            history.push('/');
        },
        variables: values,
        onError(error) {
            setErrorsWrapper(setErrors, error, errors);
        },
    });

    const onSubmit = (event) => {
        event.preventDefault();
        loginUser().then((r) => console.log(r));
    };

    const schema = Yup.object().shape({
        email: Yup.string()
            .email('Email invalide')
            .required("L'email ne peut être vide"),
        motDePasse: Yup.string().required('Le mot de passe ne peut être vide'),
        role: Yup.string().required('Le role ne peut être vide'),
    });

    const onBlur = ({ target: { name } }) => {
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
                setErrors({ ...errors, [name]: err.errors[0] });
            });
    };

    const onChange = (event, { name, value }) => {
        event.preventDefault();
        setValues({ ...values, [name]: value });
    };
    return (
        <Container>
            <Header size='large'>Connexion</Header>
            <Form onSubmit={onSubmit} loading={loading}>
                <Form.Input
                    fluid
                    label='Adresse email'
                    placeholder='Email...'
                    name='email'
                    type='email'
                    icon='at'
                    iconPosition='left'
                    required
                    value={values.email}
                    error={errors.email}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <Form.Input
                    fluid
                    label='Mot de passe'
                    placeholder='Mot de passe...'
                    name='motDePasse'
                    type='password'
                    icon='lock'
                    iconPosition='left'
                    required
                    value={values.password}
                    error={errors.password}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <Form.Field
                    control={Select}
                    label='Role'
                    name='role'
                    required
                    value={values.role}
                    error={errors.role}
                    onChange={onChange}
                    onBlur={onBlur}
                    options={[
                        {
                            key: 's',
                            text: 'Étudiant',
                            value: Role.ETUDIANT,
                        },
                        {
                            key: 'e',
                            text: 'Enseignant',
                            value: Role.ENSEIGNANT,
                        },
                    ]}
                    placeholder='Role'
                />
                <Message content="Vous n'êtes pas encore inscrit? Inscrivez vous ici" />
                {errors.general && (
                    <Message
                        negative
                        header='Erreur de connexion'
                        content={errors.general}
                    />
                )}
                <Button primary type='submit'>
                    Se connecter
                </Button>
            </Form>
        </Container>
    );
};

export default LoginForm;
