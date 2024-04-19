import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Home } from './Home';
import { CreateUser } from './CreateUser';
import { Login } from './Login';
import { MessageBoard } from './MessageBoard';
import { Courses } from './Courses';

function Content() {
  return (
    <>
      <Routes>
        <Route path='/CreateUser' element={<CreateUser />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/MessageBoard' element={<MessageBoard />} />
        <Route path="/Courses" element={<Courses />} />
      </Routes>
      <Header />
      <Home />
      <Footer />
    </>
  )
}

export default Content;
