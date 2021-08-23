import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';

const SidebarExampleSidebar = () => {
    const { user } = useContext(AuthContext);
    return <div>{user.email}</div>;
};

export default SidebarExampleSidebar;
