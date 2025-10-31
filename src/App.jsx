import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import {Menu} from "./components/Menu";
import {BlogPage} from "./components/BlogPage";
import {HomePage} from "./components/HomePage";
import {ProfilePage} from "./components/ProfilePage";
import {BlogPost} from './components/BlogPost'
import {LoginPage} from "./components/LoginPage";
import {LogoutPage} from "./components/LogoutPage"

function App() {
  return (
    <>
      <HashRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/logout" element={<LogoutPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/blog" element={<BlogPage/>} >
            <Route path=":slug" element={<BlogPost />} />  
          </Route>
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
