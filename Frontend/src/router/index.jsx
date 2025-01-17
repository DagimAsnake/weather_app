import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import NonProtectedRoute from './NonProtectedRoute.jsx';
import NotFound from '../pages/NotFound.jsx';
import SignIn from '../components/Auth/SignIn.jsx';
import SignUp from '../components/Auth/SignUp.jsx';
import Home from '../components/home/Home.jsx';
import About from '../components/About/About.jsx';
import Contact from '../components/Contact/Contact.jsx';
import Favourite from '../pages/Favourite.jsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<NonProtectedRoute />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path='/favourite' element={<Favourite />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
