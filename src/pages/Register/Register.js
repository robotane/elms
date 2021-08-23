import { useQuery } from '@apollo/client';
import React from 'react';
import { Container, Tab } from 'semantic-ui-react';
import { GET_FILIERES_QUERY } from '../../graphql/queries';
import { RegForm } from './RegForm';

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
