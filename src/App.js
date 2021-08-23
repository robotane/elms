import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Segment, SegmentGroup } from 'semantic-ui-react';
import './App.css';
import { DefaultNavBar, MobileNavBar } from './components/MenuBar';
import MenuItems from './components/MenuItems';
import SideBar from './components/SideBar';
import { AuthProvider } from './context/auth';
import Home from './pages/Home';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import { Media } from './util/Media';
import updateStyle from './util/updateStyle';

const AppRoute = () => {
    return (
        <AuthProvider>
            <Route exact path='/' component={Home} />
            <Route exact path='/connexion' component={LoginForm} />
            <Route exact path='/inscription' component={RegisterForm} />
        </AuthProvider>
    );
};

function App() {
    const [visible, setVisible] = useState(false);
    const onToggled = () => {
        setVisible(!visible);
        updateStyle(visible);
    };
    const onMobileToggled = () => {
        setVisible(!visible);
    };
    const handlePusher = () => {
        if (visible) setVisible(false);
    };
    return (
        <Router>
            <Media at='sm'>
                <MobileNavBar
                    handlePusher={handlePusher}
                    onToggled={onMobileToggled}
                    visible={visible}
                >
                    <AppRoute />
                </MobileNavBar>
            </Media>
            <Media greaterThan='sm'>
                <SegmentGroup>
                    <Segment>
                        <DefaultNavBar onToggled={onToggled} />
                    </Segment>

                    <SegmentGroup horizontal>
                        <Segment>
                            <SideBar miniSideBar={visible}>
                                <MenuItems miniSideBar={visible} />
                            </SideBar>
                        </Segment>

                        <Segment className='app-content'>
                            <AppRoute />
                        </Segment>
                    </SegmentGroup>
                </SegmentGroup>
            </Media>
        </Router>
    );
}

export default App;
