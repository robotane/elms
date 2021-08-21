import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

const SideBarItem = ({ icon, label, path, location: pathname }) => {
    /* const shouldBeHighlighted = () => {
        // const { pathname } = this.props.location;
        if (path === '/') {
            return pathname === path;
        }
        return pathname.includes(path);
    }; */
    // React will ignore custom boolean attributes, therefore we pass a string
    // we use this attribute in our SCSS for styling
    const highlight = null;
    return (
        <Menu.Item to={path} className={['sidebar-item', highlight].join(' ')}>
            <div className='sidebar-item-alignment-container'>
                <span>
                    <Icon size='large' name={icon} />{' '}
                </span>
                <span>{label}</span>
            </div>
        </Menu.Item>
    );
};

export default SideBarItem;
