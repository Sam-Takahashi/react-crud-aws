import Navbar from './components/NavBar';
import Home from './Home';
import Create from './crud/Create';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogDetails from './crud/BlogsDetails';
import NotFound from './components/NotFound';
import Update from './crud/Update';

function App() {
  // const title = 'Welcome to the Metis Blog';
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes> {/* Switch */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/blogs/:theId" element={<BlogDetails />}></Route>
            <Route path="/update/:theId" element={<Update />}></Route>
            {/* path="*" catches ALL routes, so this Route needs to come AFTER all other routes */}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
