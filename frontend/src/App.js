import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path='/'  element={<Signup/>} ></Route>  
            <Route path='/login'  element={<Login/>} ></Route>  

</Routes>
</div>
</BrowserRouter>
  );
}

export default App;
