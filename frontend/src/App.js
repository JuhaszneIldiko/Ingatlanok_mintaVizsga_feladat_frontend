import "bootstrap/dist/css/bootstrap.min.css";
import './assets/openpage.css'
import Home from './views/Home';
import  {BrowserRouter,Routes, Route} from 'react-router-dom';
import Ads from './views/Ads';
import NewAd from './views/NewAd';

function App() {
  return (
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<Home />}/>
        <Route path="/offers" element={<Ads />}/>
        <Route path="/newad" element={<NewAd />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
