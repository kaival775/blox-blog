import './App.css'

import { Route, Routes} from 'react-router-dom'
import PrivateLayout from './components/layouts/PrivateLayout'
import Home from './pages/Home'
import Setting from './pages/Setting'
import Profile from './pages/Profile'
import PostList from './pages/post/PostList'
import CategoryList from './pages/category/CategoryList'
import PublicLayout from './components/layouts/PublicLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import "react-toastify/ReactToastify.css"
import { ToastContainer } from 'react-toastify'
import NewCategory from './pages/category/NewCategory'
import UpdateCategory from './pages/category/UpdateCategory'
import NewPost from './pages/post/NewPost'
import UpdatePost from './pages/post/UpdatePost'
import DetailsPost from './pages/post/DetailsPost'
import VerifyUser from './pages/VerifyUser';
import ForgotPassword from './pages/ForgotPassword'
function App() {
  return (
    <>
    <Routes>
      <Route element={<PrivateLayout/>}>
        <Route path="/" element={<Home/>} />
        <Route path='setting' element={<Setting/>} />
        <Route path='profile' element={<Profile/>} />
        <Route path='posts' element={<PostList/>}/>
        <Route path='posts/new-post' element={<NewPost/>}/>
        <Route path='/posts/update-post/:id' element={<UpdatePost/>}/>
        <Route path='/posts/post-details/:id' element={<DetailsPost/>}/>
        <Route path='category' element={<CategoryList/>}/>
        <Route path='category/new-category' element={<NewCategory/>}/>
        <Route path='Category/update-category/:id' element={<UpdateCategory/>}/>
        <Route path="verify-user" element={<VerifyUser/>}/>
      </Route>
      <Route element={<PublicLayout/>}>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='forgot-password' element={<ForgotPassword/>}/>
      </Route>
    </Routes>
     <ToastContainer/>   
    </>
  )
}

export default App
