import axios from "axios";

const api=axios.create(
    {
        baseURL:"http://localhost:27017/api/v1",
        withCredentials:true,
    }
    );
export {api}



