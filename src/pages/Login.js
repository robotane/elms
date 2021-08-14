import React from 'react';
import { Button, Container, Form, Select } from 'semantic-ui-react';

const LoginForm = () => (
    <div className='login-form-container'>
        <Container fluid>
            <Form>
                <Form.Input
                    fluid
                    label='Adresse email'
                    placeholder='Email...'
                    name='email'
                    type='email'
                    icon='at'
                    iconPosition='left'
                    /*  value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange} */
                />
                <Form.Input
                    fluid
                    label='Mot de passe'
                    placeholder='Mot de passe...'
                    name='motDePasse'
                    type='password'
                    icon='lock'
                    iconPosition='left' /*
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange} */
                />
                <Form.Field
                    control={Select}
                    label='Role'
                    name='role'
                    // action={{ icon: 'search' }}
                    options={[
                        { key: 's', text: 'Etudiant', value: 'etudiant' },
                        { key: 'e', text: 'Enseignant', value: 'enseignant' },
                    ]}
                    placeholder='Role'
                />
                <Button type='submit' color='primary'>
                    Se connceter
                </Button>
            </Form>
        </Container>
    </div>
);

export default LoginForm;
