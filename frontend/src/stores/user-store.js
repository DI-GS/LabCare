import { defineStore } from "pinia";
import {api} from '@/GlobalURL'
import { ref } from "vue";


export const store = defineStore("user", () => {
  const user = ref(null);
  const token = ref(null);
  const expiresIn = ref(null);

    /*#################################################### REGISTRO E INICIO DE SESION ####################################################*/

  const access = async (email, password) => {
    try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });
   
    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
    sessionStorage.setItem("user", "Sesion");
    setTime();
    return res.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request)
    throw { error: "error de servidor" };
  }
};

const register = async (name, lastname, email, password, repassword) => {
  try {
  const res = await api.post("/auth/register", {
    name,
    lastname,
    email,
    password,
    repassword
  });
 
  token.value = res.data.token;
  expiresIn.value = res.data.expiresIn;
  sessionStorage.setItem("user", "Sesion");
  setTime();
  return res.data;
} catch (error) {
  if (error.response) {
    throw error.response.data;
  } else if (error.request)
  throw { error: "error de servidor" };
}
};

  const setTime = () => {
    setTimeout(() => {
      refreshToken();
    }, expiresIn.value * 1000 - 6000);
  };

  const refreshToken = async () => {
    try {
      console.log("ANTES DE LA LLAMADA")
      const res = await api.get("/auth/refresh");
      console.log("DESPUES DE LA LLAMADA")
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      
      setTime();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    
    try {
      await api.get("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      resetStore();
    }
    
  };

  const resetStore = () => {
    user.value = null;
    token.value = null;
    expiresIn.value = null;
  };

  /*#################################################### Hojas de asignatura ####################################################*/

  const careerFind = async ()=>{
    try{
      console.log(token.value)
      const res=await api({
        url:"/auth/getCareer",
        method:"GET",
        headers:{
          Authorization: "Bearer" + token.value,
        }
      })
      return res.data
    }catch(error){
      console.log("No funciona x2",error)
    }
  }
  
  return {
    user,
    token,
    expiresIn,
    access,
    refreshToken,
    logout,
    register,
    careerFind,
  };
});