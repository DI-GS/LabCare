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



/*#################################################### REGISTRO DE USUARIOS INTERNOS ####################################################*/
  const createNewUser= async (name, lastname, email, password, repassword, rol)=>{
    try {
        const res=await api({
        url:"/auth/registerUser",
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.value,
        },
        data:{
          name,
          lastname, 
          email, 
          password, 
          repassword, 
          rol, 
        }
      });
      console.log(res)
      return res
      
    } catch (error) {
      console.log(error)
    }
  }

  const updateUser= async (userId, name, lastname, email, rol)=>{
    try {
        const res=await api({
          url:"/auth/updateUser",
        method:"PATCH",
        headers:{
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.value,
        },
        data:{
          userId,
          name,
          lastname, 
          email, 
          rol, 
        }
      });
      console.log(res)
      return res
    } catch (error) {
      console.log("HMMMMMMMMMMMMMMM",error)
    }
  }
  

  const getusers= async ()=>{
    try {
        const res=await api({
        url:"/auth/getUser",
        method:"GET",
        headers:{
          Authorization: "Bearer " + token.value,
        }
      });
     
      return res.data
      
    } catch (error) {
      console.log(error)
    }
  }

  const deleteInternUser= async (userId)=>{
    try {
        const res=await api({
        url:"/auth/deleteUser",
        method:"DELETE",
        headers:{
          Authorization: "Bearer " + token.value,
        },
        data:{
          userId,
        }
      });
      return res.data
      
    } catch (error) {
      console.log(error)
    }
  }

  const getUsuario= async (userId)=>{
    try {
        const res=await api({
          url: `/auth/getUsuario/${userId}`,
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.value,
        },
      });
     
      return res.data
      
    } catch (error) {
      console.log(error)
    }
  }

   /*#################################################### Materias ####################################################*/
   const newSubject = async (name_subject, name_career, short_name, objetive, period) => {
    try {
        const res = await api({
            url: "/auth/newSubject",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token.value,
            },
            data: {
                name_subject,
                name_career,
                short_name,
                objetive,
                period
            }
        });
        console.log(res);
        console.log('estra a user-store',name_career,short_name);
        return res;
    } catch (error) {
        console.error("Error al registrar la materia:", error);

        if (error.response) {
            throw error.response.data;
        } else if (error.request) {
            throw { error: "Error de red al comunicarse con el servidor" };
        } else {
            throw { error: "Error desconocido" };
        }
    }
};
  const getSubjects= async ()=>{
    try {
      const res=await api({
        url:"/auth/getSubjects",
        method:"GET",
        headers:{
        Authorization: "Bearer " + token.value,
        } 
      });
      return res.data
    
    } catch (error) {
      console.log(error)
    }
  };

  const getSubject= async (subjectId)=>{
    try {
        const res=await api({
          url: `/auth/getSubject/${subjectId}`,
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.value,
        },
      });
      console.log("Entra a userstore", subjectId)
     
      return res.data
      
    } catch (error) {
      console.log(error)
    }
  };

  const updateSubject= async (subjectId, name_subject, period,  name_career, short_name,objetive,)=>{
    try {
        const res=await api({
          url:"/auth/updateSubject",
        method:"PATCH",
        headers:{
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.value,
        },
        data:{
          subjectId,
          name_subject,
          period,
          name_career,
          short_name,  
          objetive
        }
      });
      console.log(res)
      return res
    } catch (error) {
      console.log("Error se servidor",error)
    }
  };

  const deleteSubject= async (subjectId)=>{
    try {
        const res=await api({
        url:"/auth/deleteSubject",
        method:"DELETE",
        headers:{
          Authorization: "Bearer " + token.value,
        },
        data:{
          subjectId,
        }
      });
      return res.data
      
    } catch (error) {
      console.log(error)
    }
  }

/////////Finaliza materias////////////////////////////////////////////////777

  const refreshToken = async () => {
    try {
      const res = await api.get("/auth/refresh");
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

  return {
    user,
    token,
    expiresIn,
    access,
    refreshToken,
    logout,
    register,
    createNewUser,
    getusers,
    updateUser,
    getUsuario,
    deleteInternUser,
    newSubject,
    getSubjects,
    getSubject,
    updateSubject,
    deleteSubject
  };
});