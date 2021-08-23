import React from 'react';
import { Menu } from 'semantic-ui-react';
// import { Subscriptions } from './Subscriptions/Subscriptions';

const SideBar = ({ miniSideBar, children }) => {
    return (
        <Menu
            borderless={!miniSideBar}
            vertical
            inverted
            icon={miniSideBar}
            fixed='left'
            className='sideBar'
        >
            {children}
        </Menu>
    );
};

export default SideBar;
