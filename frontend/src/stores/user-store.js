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

  /*#################################################### Hojas de asignatura ####################################################*/

  const careerFind = async ()=>{
    try {
      const res=await api({
      url:"/auth/getCareer",
      method:"GET",
      headers:{
        Authorization: "Bearer " + token.value,
      },
    });
    return res.data
  } catch (error) {
    console.log(error)
  }
  }

  const subjectFind = async (name_career)=>{
    try {
      const res=await api({
      url:"/auth/getSubject",
      method:"GET",
      headers:{
        Authorization: "Bearer " + token.value,
      },
      data: {
        name_career,
      },
    });
    console.log("Parametro", name_career.data)
    console.log("Entra a esta de aqui",res.data)
    return res.data
  } catch (error) {
    console.log(error)
  }
  }

  const updateSheets = async (name_subject,unit_number, unit_name, theme_name, theoretical_hours, practical_hours)=>{
    try{
      const res= await api({
        url:"/auth/updateSheets",
        method:"POST",
        headers:{
        "Content-Type": "application/json",
          Authorization: "Bearer " + token.value,
        },
        data:{
          name_subject,
          unit_number, 
          unit_name, 
          theme_name, 
          theoretical_hours, 
          practical_hours
      }
    });
      console.log(res)
      return res
    } catch (error) {
      console.error("Error al actualizar la materia:", error);

      if (error.response) {
          // Error en la respuesta del servidor
          throw error.response.data;
      } else if (error.request) {
          // Error de red
          throw { error: "Error de red al comunicarse con el servidor" };
      } else {
          // Otros errores
          throw { error: "Error desconocido" };
      }
  }
  }

  /*#################################################### Materias ####################################################*/
  const newSubject = async (name_subject, name_career, short_name, objetive,period)=>{
    try{
      const res= await api({
        url:"/auth/registerSubject",
        method:"POST",
        headers:{
        "Content-Type": "application/json",
          Authorization: "Bearer " + token.value,
        },
        data:{
        name_subject,
        name_career,
        short_name,
        objetive,
        period
      }
    });
      console.log(res)
      return res
    } catch (error) {
      console.error("Error al registrar la materia:", error);

      if (error.response) {
          // Error en la respuesta del servidor
          throw error.response.data;
      } else if (error.request) {
          // Error de red
          throw { error: "Error de red al comunicarse con el servidor" };
      } else {
          // Otros errores
          throw { error: "Error desconocido" };
      }
  }
};

  
  return {
    user,
    token,
    expiresIn,
    access,
    refreshToken,
    logout,
    register,
    careerFind,
    newSubject,
    subjectFind,
    updateSheets
  };
});