import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const FiliereList = () => (
    <Dropdown>
        <Dropdown.Menu>
            {filieres.map(({ ufr, nom, semestres, key }) => (
                <Dropdown.Item key={key}>{nom}</Dropdown.Item>
            ))}
        </Dropdown.Menu>
    </Dropdown>
);

export default FiliereList;
