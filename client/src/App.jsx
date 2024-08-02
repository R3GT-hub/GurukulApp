import "./App.css";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import CreateResources from "./pages/CreateResources";
import Resources from "./pages/Resources";
import ResourcePage from "./pages/ResourcePage";
import ContactAdmin from "./pages/ContactAdmin";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
function App() {
  return (
    <UserContextProvider>
      <div class="screen-container">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/opportunities" element={<IndexPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/createresource" element={<CreateResources />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:id" element={<ResourcePage />} />
            <Route path="/contactadmin" element={<ContactAdmin />} />
          </Route>
        </Routes>
      </div>
    </UserContextProvider>
  );
}

export default App;
