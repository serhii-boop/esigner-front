import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthComponent } from './pages/auth/AuthPage';
import { WelcomePage } from './pages/WelcomePage';
import { WorkersPage } from './pages/WorkersPage';
import { EditPage } from './pages/edit/EditPage';
import { Header } from './components/header/Header';
import './App.css';
import {AddWorker} from "./pages/addWorker/AddWorker";
export const App: React.FC = () => {
  
    return (
        <Router>
        <Header />
          <div className='mainContainer'>
                <Routes>
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/" element={<AuthComponent />} />
                    <Route path="/workers" element={<WorkersPage />} />
                  <Route path="/edit/:id" element={<EditPage />} />
                  <Route path="/add" element={<AddWorker />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
