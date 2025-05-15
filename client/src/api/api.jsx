// // // // import axios from "axios";
// // // // import { toast } from "react-toastify";

// // // // const api = axios.create({
// // // //   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
// // // //   withCredentials: true,
// // // // });

// // // // api.interceptors.response.use(
// // // //   (response) => response,
// // // //   async (error) => {
// // // //     const originalRequest = error.config;

// // // //     // Faqat bir marta refresh qilishga harakat qilamiz
// // // //     if (
// // // //       error.response?.status === 401 &&
// // // //       !originalRequest._retry &&
// // // //       !originalRequest.url.includes("/user/refresh-token")
// // // //     ) {
// // // //       originalRequest._retry = true;

// // // //       try {
// // // //         const { data } = await axios.post(
// // // //           `${import.meta.env.VITE_API_URL}/user/refresh-token`,
// // // //           {},
// // // //           { withCredentials: true }
// // // //         );

// // // //         // Agar refresh ishlasa, so‘rovni qayta yuboramiz
// // // //         return api(originalRequest);
// // // //       } catch (refreshError) {
// // // //         // Refresh ham ishlamasa - userni tozalash va login sahifaga yo'naltirish
// // // //         console.error("Refresh token ishlamadi:", refreshError);

// // // //         toast.error("Sessiya tugadi. Qayta kiring.");
// // // //         // localStorage.clear(); // Agar localStorage ishlatilsa
// // // //         window.location.href = "/login"; // Login sahifasiga redirect

// // // //         return Promise.reject(refreshError);
// // // //       }
// // // //     }

// // // //     return Promise.reject(error);
// // // //   }
// // // // );

// // // // export default api;
// // // import axios from "axios";
// // // import { toast } from "react-toastify";

// // // const api = axios.create({
// // //   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
// // //   withCredentials: true,
// // // });

// // // // Interceptor
// // // api.interceptors.response.use(
// // //   (response) => response,
// // //   async (error) => {
// // //     const originalRequest = error.config;

// // //     // 401 bo‘lsa, faqat bir marta refresh qilishga harakat qilamiz
// // //     if (
// // //       error.response?.status === 401 &&
// // //       !originalRequest._retry &&
// // //       !originalRequest.url.includes("/user/refresh-token") &&
// // //       !originalRequest.url.includes("/user/logout") // <-- logout so‘rovi bo‘lsa ham urinishmasin
// // //     ) {
// // //       originalRequest._retry = true;

// // //       try {
// // //         const { data } = await axios.post(
// // //           `${import.meta.env.VITE_API_URL}/user/refresh-token`,
// // //           {},
// // //           { withCredentials: true }
// // //         );

// // //         // optional: api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
// // //         return api(originalRequest); // Asl so‘rovni qayta yuborish
// // //       } catch (refreshError) {
// // //         // Refresh token ham yo‘q bo‘lsa — foydalanuvchini tozalab yuboramiz
// // //         console.error("Sessiya tugagan. Login sahifasiga o‘tamiz.");

// // //         toast.error("Sessiya tugadi. Qayta kiring.");
// // //         localStorage.clear(); // yoki redux store tozalansa ham bo‘ladi
// // //         window.location.href = "/login";
// // //         return Promise.reject(refreshError);
// // //       }
// // //     }

// // //     return Promise.reject(error);
// // //   }
// // // );

// // // export default api;
// // // import axios from "axios";
// // // import { toast } from "react-toastify";

// // // const api = axios.create({
// // //   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
// // //   withCredentials: true, // Cookie orqali tokenlar ishlatiladi
// // // });

// // // api.interceptors.response.use(
// // //   (response) => response,
// // //   async (error) => {
// // //     const originalRequest = error.config;

// // //     // 401 va bu refresh-token so'rovi emasligini tekshiramiz
// // //     if (
// // //       error.response?.status === 401 &&
// // //       !originalRequest._retry &&
// // //       !originalRequest.url.includes("/refresh-token") &&
// // //       !originalRequest.url.includes("/logout")
// // //     ) {
// // //       originalRequest._retry = true;

// // //       try {
// // //         // refresh-token orqali yangi access-token olish
// // //         await axios.post(
// // //           `${import.meta.env.VITE_API_URL}/user/refresh-token`,
// // //           {},
// // //           { withCredentials: true }
// // //         );

// // //         // Agar refresh token ishlasa, original requestni qayta yuboramiz
// // //         return api(originalRequest);
// // //       } catch (refreshError) {
// // //         // Refresh token ham yaroqsiz bo‘lsa
// // //         console.error("Refresh token ishlamadi:", refreshError);

// // //         toast.error("Sessiya tugadi. Qayta kiring.");

// // //         window.location.href = "/"; // Login sahifasiga yo‘naltirish
// // //         return Promise.reject(refreshError);
// // //       }
// // //     }

// // //     return Promise.reject(error);
// // //   }
// // // );

// // // export default api;
// // // import axios from "axios";
// // // import { toast } from "react-toastify";

// // // let logoutAlreadyTriggered = false; // Global flag

// // // const api = axios.create({
// // //   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
// // //   withCredentials: true,
// // // });

// // // api.interceptors.response.use(
// // //   (response) => response,
// // //   async (error) => {
// // //     const originalRequest = error.config;

// // //     if (
// // //       error.response?.status === 401 &&
// // //       !originalRequest._retry &&
// // //       !originalRequest.url.includes("/refresh-token")
// // //     ) {
// // //       originalRequest._retry = true;

// // //       try {
// // //         const { data } = await api.post(`/user/refresh-token`);
// // //         console.log("Refresh token javobi:", data);
// // //         return api(originalRequest);
// // //       } catch (refreshError) {
// // //         // Refresh ham ishlamasa va hali logout trigger qilinmagan bo‘lsa
// // //         if (!logoutAlreadyTriggered) {
// // //           logoutAlreadyTriggered = true; // Keyingi chaqiriqlarda ishlamasligi uchun

// // //           console.error("Refresh token ishlamadi:", refreshError);
// // //           toast.error("Sessiya tugadi. Qayta kiring.");

// // //           setTimeout(() => {
// // //             window.location.href = "/";
// // //           }, 9000);
// // //         }

// // //         return Promise.reject(refreshError);
// // //       }
// // //     }

// // //     return Promise.reject(error);
// // //   }
// // // );

// // // export default api;
// import axios from "axios";
// import { toast } from "react-toastify";

// let logoutAlreadyTriggered = false;

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
//   withCredentials: true,
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/refresh-token") &&
//       !originalRequest.url.includes("/login") &&
//       !originalRequest.url.includes("/logout")
//     ) {
//       originalRequest._retry = true;

//       try {
//         const { data } = await api.post(`/user/refresh-token`);
//         console.log("Refresh token javobi:", data);
//         return api(originalRequest);
//       } catch (refreshError) {
//         if (!logoutAlreadyTriggered) {
//           logoutAlreadyTriggered = true;
//           console.error("Refresh token ishlamadi:", refreshError);
//           toast.error("Sessiya tugadi. Qayta kiring.");
//         }

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
// +++++++++++++++++++++++++++++++++++++++++++
import axios from "axios";
import { toast } from "react-toastify";

let logoutAlreadyTriggered = false;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh-token") &&
      !originalRequest.url.includes("/login") &&
      !originalRequest.url.includes("/logout")
      // !originalRequest.url.includes("/")
      // !originalRequest.url.includes("/profile") // getProfile so‘rovini istisno qilish
    ) {
      originalRequest._retry = true;

      try {
        await api.post(`/user/refresh-token`);
        // console.log("Refresh token javobi:", data);
        return api(originalRequest); // Yangi cookie bilan asl so‘rovni qayta yuborish
      } catch (refreshError) {
        if (!logoutAlreadyTriggered) {
          logoutAlreadyTriggered = true;
          // console.error("Refresh token ishlamadi:", refreshError);
          toast.error("Sessiya tugadi. Qayta kiring.");

          // setTimeout(() => {
          //   // window.location.href = "/";
          //   logoutAlreadyTriggered = false;
          // }, 2000);
        }
        return Promise.reject(refreshError);
      }
    }

    // getProfile uchun xatolarni jim ushlash
    if (
      originalRequest.url.includes("/profile") &&
      error.response?.status === 401
    ) {
      return Promise.reject(error); // Xatoni authSlice ga qaytarish
    }

    return Promise.reject(error);
  }
);

export default api;
// import axios from "axios";
// import { toast } from "react-toastify";

// let logoutAlreadyTriggered = false;

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
//   withCredentials: true,
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/refresh-token") &&
//       !originalRequest.url.includes("/login") &&
//       !originalRequest.url.includes("/logout") &&
//       !originalRequest.url.includes("/profile") // getProfile so‘rovini istisno qilish
//     ) {
//       originalRequest._retry = true;

//       try {
//         const { data } = await api.post(`/user/refresh-token`);
//         console.log("Refresh token javobi:", data);
//         return api(originalRequest);
//       } catch (refreshError) {
//         if (!logoutAlreadyTriggered) {
//           logoutAlreadyTriggered = true;
//           console.error("Refresh token ishlamadi:", refreshError);
//           toast.error("Sessiya tugadi. Qayta kiring.");

//           setTimeout(() => {
//             window.location.href = "/login";
//             logoutAlreadyTriggered = false;
//           }, 2000);
//         }

//         return Promise.reject(refreshError);
//       }
//     }

//     // getProfile uchun xatolarni jim ushlash
//     if (
//       originalRequest.url.includes("/profile") &&
//       error.response?.status === 401
//     ) {
//       return Promise.reject(error); // Xatoni authSlice ga qaytarish
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
// import axios from "axios";
// import { toast } from "react-toastify";

// let logoutAlreadyTriggered = false;

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
//   withCredentials: true,
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/refresh-token") &&
//       !originalRequest.url.includes("/login") &&
//       !originalRequest.url.includes("/logout") &&
//       !originalRequest.url.includes("/profile")
//     ) {
//       originalRequest._retry = true;

//       try {
//         const { data } = await api.post(`/user/refresh-token`);
//         console.log("Refresh token javobi:", data);
//         // Backend yangi tokenni HttpOnly cookie sifatida o‘rnatadi
//         return api(originalRequest); // Asl so‘rovni qayta yuborish
//       } catch (refreshError) {
//         if (!logoutAlreadyTriggered) {
//           logoutAlreadyTriggered = true;
//           console.error("Refresh token ishlamadi:", refreshError);
//           toast.error("Sessiya tugadi. Qayta kiring.");

//           setTimeout(() => {
//             window.location.href = "/login";
//             logoutAlreadyTriggered = false;
//           }, 2000);
//         }
//         return Promise.reject(refreshError);
//       }
//     }

//     // getProfile uchun xatolarni jim ushlash
//     if (
//       originalRequest.url.includes("/profile") &&
//       error.response?.status === 401
//     ) {
//       return Promise.reject(error); // Xatoni authSlice ga qaytarish
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
