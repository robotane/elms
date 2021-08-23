import React from 'react';
import { Menu } from 'semantic-ui-react';

const SideBarHeader = ({ hiden, title }) => {
    const heading = title ? title.toUpperCase() : '';
    return (
        <Menu.Item>
            <Menu.Header hiden={hiden}>{heading}</Menu.Header>
        </Menu.Item>
    );
};

export default SideBarHeader;
