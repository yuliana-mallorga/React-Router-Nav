import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Menu } from "./components/Menu";
import { AuthProvider } from "./components/auth/AuthProvider";
import { BlogPage } from "./components/BlogPage";
import { HomePage } from "./components/HomePage";
import { ProfilePage } from "./components/ProfilePage";
import { BlogPost } from "./components/BlogPost";
import { LoginPage } from "./components/LoginPage";
import { LogoutPage } from "./components/LogoutPage";
import { AuthRoute } from "./components/auth/AuthRoute";

function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Menu />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/logout"
              element={
                <AuthRoute>
                  <LogoutPage />
                </AuthRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthRoute>
                  <ProfilePage />
                </AuthRoute>
              }
            />
            <Route path="/blog" element={<BlogPage />}>
              <Route path=":slug" element={<BlogPost />} />
            </Route>
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;
