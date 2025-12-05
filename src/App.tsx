import { Outlet } from 'react-router'
import './App.css'
import Navbar from './components/Layout/Navbar/Navbar'


function App() {
  return (
    <Navbar>
      <Outlet />
    </Navbar>
  );
}


export default App
