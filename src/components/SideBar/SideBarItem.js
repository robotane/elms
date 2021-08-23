import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

const SideBarItem = ({
    icon,
    label,
    path,
    location: { pathname },
    miniSideBar,
    onClick,
}) => {
    return (
        <Menu.Item
            as={Link}
            to={path}
            active={path === pathname}
            name={label}
            onClick={onClick}
        >
            <span>
                <Icon size='large' name={icon} />
            </span>
            {!miniSideBar && <span>{label}</span>}
        </Menu.Item>
    );
};

export default withRouter(SideBarItem);
