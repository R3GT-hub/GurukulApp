import "./App.css";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider} from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import CreateResources from "./pages/CreateResources";
import Resources from "./pages/Resources"
import ResourcePage from "./pages/ResourcePage"
import ContactAdmin from "./pages/ContactAdmin";
function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<IndexPage />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/create" element={<CreatePost/>}/>
      <Route path="/post/:id" element={<PostPage/>}/>
      <Route path="/createresource" element={<CreateResources/>}/>
      <Route path="/resources" element={<Resources/>}/>
      <Route path="/resources/:id" element={<ResourcePage/>}/>
      <Route path="/contactadmin" element={<ContactAdmin/>}/>

      </Route>
    </Routes>
    </UserContextProvider>
    
  );
}

export default App;
