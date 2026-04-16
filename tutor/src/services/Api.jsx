// import axios from "axios";

// const Api=axios.create({
//     baseURL:'http://localhost:8000',
//     header:{
//         "Content-Type":"multipart/form-data"
//     }
// });

// export default Api;


// services/Api.js

// import axios from "axios";

// const Api = axios.create({
//   baseURL: "http://localhost:8000",
// });

// // ✅ ADD THIS (MANDATORY)
// Api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   console.log("TOKEN FROM LS:", token); // ✅ DEBUG

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`; // ✅ IMPORTANT
//   }

//   return config;
// });

// export default Api;



import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // ✅ VERY IMPORTANT
});

export default Api;