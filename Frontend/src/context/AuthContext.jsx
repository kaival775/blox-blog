import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
    const navigate=useNavigate();
    const location=useLocation()
    const [auth,setAuth]=useState(null);
    
     useEffect(()=>{
       const stringyfyBlogData=window.localStorage.getItem("blog-data");
      //  console.log('AuthContext checking localStorage:', stringyfyBlogData);
       if(stringyfyBlogData){
        try {
          const blogData=JSON.parse(stringyfyBlogData)
          // console.log('Parsed blog data:', blogData);
          // If we have a token, decode it to get user info
          if(blogData.token) {
            try {
              const payload = JSON.parse(atob(blogData.token.split('.')[1]));
              // console.log('Decoded token payload:', payload);
              setAuth(payload);
            } catch (tokenError) {
              // console.error('Error decoding token:', tokenError);
              setAuth(blogData); // fallback to the whole object
            }
          } else if(blogData.user) {
            setAuth(blogData.user)
          
          } else {
            setAuth(blogData);
          }
        } catch (error) {
          console.error('Error parsing blog data:', error);
          setAuth(null);
        }
       }
       else{
        setAuth(null);
       }
     },[navigate,location]);
     
     return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}


export const useAuth=()=>{
    const auth=useContext(AuthContext)
    return auth
}