import React from 'react';
import { Divider } from 'semantic-ui-react';
import SideBarHeader from './SideBar/SideBarHeader';
import SideBarItem from './SideBar/SideBarItem';

const MenuItems = ({ miniSideBar, onClick }) => {
    return (
        <React.Fragment>
            <SideBarItem
                onClick={onClick}
                miniSideBar={miniSideBar}
                path='/'
                label='Home'
                icon='home'
            />
            <SideBarItem
                onClick={onClick}
                miniSideBar={miniSideBar}
                path='/inscription'
                label='Register'
                icon='fire'
            />
            <SideBarItem
                onClick={onClick}
                miniSideBar={miniSideBar}
                label='Login'
                path='/connexion'
                icon='spy'
            />
            {!miniSideBar && (
                <React.Fragment>
                    <Divider />
                    <SideBarHeader title='Library' />
                </React.Fragment>
            )}
            <SideBarItem
                onClick={onClick}
                miniSideBar={miniSideBar}
                label='History'
                icon='history'
            />
            <SideBarItem
                onClick={onClick}
                miniSideBar={miniSideBar}
                label='Watch later'
                icon='clock'
            />
            <SideBarItem
                onClick={onClick}
                miniSideBar={miniSideBar}
                label='Liked videos'
                icon='thumbs up'
            />
            {!miniSideBar && (
                <div>
                    <Divider />
                    <SideBarHeader title='More from YouTube' />
                </div>
            )}
            <SideBarItem
                onClick={onClick}
                miniSideBar={miniSideBar}
                label='Movies and Shows'
                icon='film'
            />
            <SideBarItem
                onClick={onClick}
                miniSideBar={miniSideBar}
                label='Report history'
                icon='flag'
            />
            <SideBarItem
                onClick={onClick}
                miniSideBar={miniSideBar}
                label='Help'
                icon='help circle'
            />
            <SideBarItem
                onClick={onClick}
                miniSideBar={miniSideBar}
                label='Send feedback'
                icon='comment'
            />
        </React.Fragment>
    );
};

export default MenuItems;
