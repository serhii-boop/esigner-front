import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthComponent } from './pages/auth/AuthPage';
import { WelcomePage } from './pages/WelcomePage';
import { WorkersPage } from './pages/worker/WorkersPage';
import { EditPage } from './pages/edit/EditPage';
import { Header } from './components/header/Header';
import './App.css';

import {Courses} from "./pages/courses/Courses";
import {AddCourse} from "./pages/courses/AddCourse";
import {AddWorker} from "./pages/worker/AddWorker";
import {AddParticipant} from "./pages/courseParticipant/AddParticipant";
import {CourseParticipant} from "./pages/courseParticipant/CourseParticipant";
import {CertificatesPage} from "./pages/certificates/CertificatesPage";
export const App: React.FC = () => {
  
    return (
        <Router>
        <Header />
          <div className='mainContainer'>
                <Routes>
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/esigner-front/" element={<AuthComponent />} />
                    <Route path="/workers" element={<WorkersPage />} />
                  <Route path="/edit/:id" element={<EditPage />} />
                  <Route path="/add" element={<AddWorker/>} />
                  <Route path='/Certificates' element={<CertificatesPage/>} />
                  <Route path='/courses' element={<Courses />} />
                  <Route path='add-course' element={<AddCourse />} />
                  <Route path='add-course-participants/:id' element={<AddParticipant />} />
                  <Route path='course-participants/:id' element={<CourseParticipant />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
