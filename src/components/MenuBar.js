import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sidebar } from 'semantic-ui-react';
import MenuItems from './MenuItems';

const DefaultNavBar = ({ onToggled, mobile }) => {
    return (
        <Menu
            pointing
            color='blue'
            inverted
            size='massive'
            borderless
            fixed='top'
            className='nav-bar'
        >
            {mobile && <Menu.Item onClick={onToggled} icon='sidebar' />}
            <Menu.Item
                as={Link}
                to='/'
                name={mobile ? '' : 'ELMS'}
                icon='student'
                className={mobile ? '' : 'nav-bar-site-logo'}
            />
            {!mobile && <Menu.Item onClick={onToggled} icon='sidebar' />}

            <Menu.Menu position='right'>
                <Menu.Item name='Logout' />
                <Menu.Item name='Login' />
            </Menu.Menu>
        </Menu>
    );
};

const MobileNavBar = ({ visible, handlePusher, children, onToggled }) => {
    return (
        <React.Fragment>
            <DefaultNavBar mobile={true} onToggled={onToggled} />
            <Sidebar.Pushable className='mobile-app-content'>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    inverted
                    borderless
                    onHide={handlePusher}
                    vertical
                    visible={visible}
                    className='mobile-side-bar'
                >
                    <MenuItems onClick={handlePusher} />
                </Sidebar>
                <Sidebar.Pusher dimmed={visible} style={{ minHeight: '100vh' }}>
                    {children}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </React.Fragment>
    );
};

export { MobileNavBar, DefaultNavBar };
