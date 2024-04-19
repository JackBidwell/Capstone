import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Home } from './Home';
import { CreateUser } from './CreateUser';
import { Login } from './Login';

function Content() {
  return (
    <>
      <Routes>
        <Route path='/CreateUser' element={<CreateUser />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
      <Header />
      <Home />
      <Footer />
    </>
  )
}

export default Content;
