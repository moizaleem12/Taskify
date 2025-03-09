
import Navbar from './Components/Layout/Navbar';
import Register from './pages/Register'
import Signin from './pages/Signin'
import Sidebar from './Components/Layout/Sidebar'
import Home from './pages/Home'
import { Router,Routes,Route } from 'react-router-dom';
import Favourites from './pages/Favourties';
import Trash from './pages/Trash';
function App() {

  return (
    <>
    
  <div className="grid h-screen grid-cols-[1fr_4fr] space-x-6">
          <Sidebar />
          <div className="overflow-y-auto p-5">
        <Navbar />
        <Routes >
          <Route path='/register' element={<Register/>}/>
          <Route path="/signin" element={<Signin />} />
          <Route path='/' element={<Home />}></Route>
          <Route path='/favourites' element={<Favourites />}></Route>
          <Route path='/trash' element={<Trash />}></Route>
        </Routes>
           
          </div>
        </div>
    
     
    
    </>
  );
}

export default App;
