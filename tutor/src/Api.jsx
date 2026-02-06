import axios from "axios";

const Api=axios.create({
    baseURL:'http://localhost:8000',
    header:{
        "Content-Type":"multipart/form-data"
    }
});

export default Api;