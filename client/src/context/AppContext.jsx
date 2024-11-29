import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext =createContext();

const AppContextProvider = (props)=>{

    const [user, setUser] = useState(null);
    const [showLogin,setshowLogin]=useState(false);
    const [token, setToken ] =useState(localStorage.getItem('token'))
    const [credit ,setCredit] =useState(false)
    //Relation to Backend 
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate  =useNavigate()
    //Fetch credit data

    const loadCreditData =async()=>{
        try {
           //call credit Api
           const { data } = await axios.get(backendUrl + "/api/user/credits",{headers: {token} })

           if(data.success){
            setCredit(data.credits)
            setUser(data.user)
           }
        } catch (error) {
            console,log(error )
            toast.error(error.message)
        }
    }
const generateImage =async(prompt)=>{
    try {
      const {data} = await axios.post(backendUrl + "/api/image/generate-image", {prompt},{headers : {token}});
      if(data.success){
        loadCreditData() 
        return data.resultImage
      }else{
            toast.error(data.message);
             loadCreditData()
             if(data.creditBalance === 0){
                navigate("/buycredit");
             }

      }
    } catch (error) {
        toast.error(error.message)
    }
}
//Logout Funfion
const logOut = ()=>{
    localStorage.removeItem('token')
    setToken('')
    setUser(null)
}
    useEffect(()=>{
        if(token){
           loadCreditData(); 
        }
    },[token])
    const value = {
      user,
      setUser,
      showLogin,
      setshowLogin,
      backendUrl,
      token,
      setToken,
      credit,
      loadCreditData,
      logOut,
      generateImage,
    };
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;