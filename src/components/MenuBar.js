import React from 'react';
import { Menu } from 'semantic-ui-react';

const MenuBar = ({ onToggleMenu }) => {
    return (
        <div className='attached'>
            <Menu pointing secondary size='massive' color='teal'>
                <Menu.Item onClick={onToggleMenu} icon='sidebar' />

                <Menu.Menu position='right'>
                    <Menu.Item name='Logout' />
                    <Menu.Item name='Login' />
                </Menu.Menu>
            </Menu>
        </div>
    );
};

export default MenuBar;
