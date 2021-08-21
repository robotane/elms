import React from 'react';
import { Divider, Menu } from 'semantic-ui-react';
import { SideBarFooter } from './SideBarFooter';
import { SideBarHeader } from './SideBarHeader';
import SideBarItem from './SideBarItem';
// import { Subscriptions } from './Subscriptions/Subscriptions';

export default class SideBar extends React.Component {
    render() {
        return (
            <Menu stackable borderless vertical inverted fixed='left'>
                <SideBarItem path='/' label='Home' icon='home' />
                <SideBarItem
                    path='/feed/trending'
                    label='Trending'
                    icon='fire'
                />
                <SideBarItem label='Followers' icon='spy' />
                <Divider />
                <SideBarHeader title='Library' />
                <SideBarItem label='History' icon='history' />
                <SideBarItem label='Watch later' icon='clock' />
                <SideBarItem label='Liked videos' icon='thumbs up' />
                <Divider />
                {/* <Subscriptions /> */}
                <SideBarHeader title='More from Youtube' />
                <SideBarItem label='Movies and Shows' icon='film' />
                <Divider />
                <SideBarItem label='Report history' icon='flag' />
                <SideBarItem label='Help' icon='help circle' />
                <SideBarItem label='Send feedback' icon='comment' />
                <Divider />
                <SideBarFooter />
            </Menu>
        );
    }
}
