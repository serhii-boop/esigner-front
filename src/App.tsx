import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {AuthComponent} from './AuthComponent';
import {WelcomePage} from './WelcomePage';

export const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/" element={<AuthComponent />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
