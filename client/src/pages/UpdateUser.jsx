// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { updateUser } from "./features/authSlice";

// // const UpdateUser = () => {
// //   const dispatch = useDispatch();
// //   const { user, isLoading } = useSelector((state) => state.auth);
// //   const [userName, setUserName] = useState("");
// //   //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [newPassword, setNewPassword] = useState("");
// //   const [image, setImage] = useState(null);

// //   useEffect(() => {
// //     if (user) {
// //       setUserName(user.userName);
// //       //   setEmail(user.email);
// //       setImage(user.image);
// //     }
// //   }, [user]);

// //   const handleSubmit = (e) => {
// //     try {
// //       e.preventDefault();
// //       const formData = new FormData();
// //       formData.append("userName", userName);
// //       //   formData.append("email", email);
// //       formData.append("password", password);
// //       formData.append("newPassword", newPassword);
// //       if (image) formData("image", image);
// //       dispatch(updateUser(formData));
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   if (isLoading) return <p>Loading...</p>;
// //   return (
// //     <>
// //       <div className="mt-5">
// //         <h1 className="text-center text-2xl font-bold">Ro'yxatdan o'tish</h1>
// //         <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
// //           {/* Foydalanuvchi nomi */}
// //           <div className="relative z-0 w-full mb-6 group">
// //             <input
// //               type="text"
// //               name="userName"
// //               placeholder="Username"
// //               value={userName}
// //               onChange={(e) => setUserName(e.target.value)}
// //               id="userName"
// //               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
// //               required
// //             />
// //             <label
// //               htmlFor="userName"
// //               className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               Foydalanuvchi nomi
// //             </label>
// //           </div>

// //           {/* Email */}
// //           {/* <div className="relative z-0 w-full mb-6 group">
// //             <input
// //               type="email"
// //               name="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               id="email"
// //               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
// //               placeholder=" "
// //               required
// //             />
// //             <label
// //               htmlFor="email"
// //               className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               Email manzil
// //             </label>
// //           </div> */}

// //           {/* Parol */}
// //           <div className="relative z-0 w-full mb-6 group">
// //             <input
// //               type="password"
// //               name="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               id="password"
// //               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
// //               placeholder=" "
// //             />
// //             <label
// //               htmlFor="password"
// //               className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               Parol
// //             </label>
// //           </div>

// //           {/* Parolni tasdiqlash */}
// //           <div className="relative z-0 w-full mb-6 group">
// //             <input
// //               type="password"
// //               name="newPassword"
// //               value={newPassword}
// //               onChange={(e) => setNewPassword(e.target.value)}
// //               id="confirmPassword"
// //               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
// //               placeholder=" "
// //             />
// //             <label
// //               htmlFor="confirmPassword"
// //               className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
// //             >
// //               Parolni tasdiqlang
// //             </label>
// //           </div>

// //           {/* Rasm yuklash */}
// //           <div className="mb-6">
// //             <label className="block mb-2 text-sm font-medium text-gray-900">
// //               Profil rasmi (ixtiyoriy)
// //             </label>
// //             <input
// //               className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
// //               id="image"
// //               name="image"
// //               placeholder="image"
// //               value={image}
// //               onChange={(e) => setImage(e.target.value)}
// //               type="file"
// //               accept="image/*"
// //             />
// //           </div>

// //           {/* Yuborish tugmasi */}
// //           <button
// //             type="submit"
// //             disabled={isLoading}
// //             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
// //           >
// //             {isLoading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
// //           </button>
// //         </form>
// //       </div>
// //     </>
// //   );
// // };

// // export default UpdateUser;
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUser } from "./features/authSlice";

// const UpdateUser = () => {
//   const dispatch = useDispatch();
//   const { user, isLoading } = useSelector((state) => state.auth);
//   const [userName, setUserName] = useState("");
//   // const [email, setEmail] = useState(""); // Emailni o'zgartirishni o'chirib qo'ydik
//   const [password, setPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [image, setImage] = useState(null);
//   console.log("userImage", user.image);
//   useEffect(() => {
//     if (user) {
//       setUserName(user.userName);
//       // setEmail(user.email); // Emailni o'zgartirishni o'chirib qo'ydik
//       setImage(user.image); // Oldingi rasmni o'rnatish
//     }
//   }, [user]);

//   const handleSubmit = (e) => {
//     try {
//       e.preventDefault();
//       const formData = new FormData();
//       formData.append("userName", userName);
//       // formData.append("email", email); // Emailni o'zgartirishni o'chirib qo'ydik
//       formData.append("password", password);
//       formData.append("newPassword", newPassword);
//       if (image) formData.append("image", image); // Yangilangan rasm

//       dispatch(updateUser(formData)); // Yangilangan foydalanuvchi ma'lumotlarini yuborish
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="mt-5">
//       <h1 className="text-center text-2xl font-bold">
//         Foydalanuvchi ma'lumotlarini yangilash
//       </h1>
//       <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
//         {/* Foydalanuvchi nomi */}
//         <div className="relative z-0 w-full mb-6 group">
//           <input
//             type="text"
//             name="userName"
//             placeholder="Username"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             id="userName"
//             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//             required
//           />
//           <label
//             htmlFor="userName"
//             className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             Foydalanuvchi nomi
//           </label>
//         </div>

//         {/* Rasmni ko'rsatish (Eski rasm) */}
//         {user.image && (
//           <div className="mb-6">
//             <label className="block mb-2 text-sm font-medium text-gray-900">
//               Hozirgi Profil rasmi
//             </label>
//             <img
//               src={`http://localhost:5000/user/${image}`} // Eski rasmni ko'rsatish
//               alt="Current Profile"
//               className="w-32 h-32 object-cover rounded-full mb-3"
//             />
//           </div>
//         )}

//         {/* Rasm yuklash */}
//         <div className="mb-6">
//           <label className="block mb-2 text-sm font-medium text-gray-900">
//             Profil rasmi (ixtiyoriy)
//           </label>
//           <input
//             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
//             id="image"
//             name="image"
//             placeholder="image"
//             onChange={(e) => setImage(e.target.files[0])}
//             type="file"
//             accept="image/*"
//           />
//         </div>

//         {/* Parol */}
//         <div className="relative z-0 w-full mb-6 group">
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             id="password"
//             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//             placeholder=" "
//           />
//           <label
//             htmlFor="password"
//             className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             Eski Parol
//           </label>
//         </div>

//         {/* Yangi parol */}
//         <div className="relative z-0 w-full mb-6 group">
//           <input
//             type="password"
//             name="newPassword"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             id="confirmPassword"
//             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//             placeholder=" "
//           />
//           <label
//             htmlFor="confirmPassword"
//             className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             Yangi Parolni kiriting
//           </label>
//         </div>

//         {/* Yuborish tugmasi */}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
//         >
//           {isLoading ? "Yuklanmoqda..." : "Yangilash"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateUser;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSuccess, updateUser } from "./features/authSlice";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, success } = useSelector((state) => state.auth);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      setImage(user.image); // Oldingi rasmni o'rnatish
    }
    if (success) {
      navigate("/profile");
    }
    dispatch(clearSuccess());
  }, [user, success, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("password", password);
    formData.append("newPassword", newPassword);

    if (image) formData.append("image", image); // Yangilangan rasmni yuborish

    dispatch(updateUser(formData)); // Yangilangan foydalanuvchi ma'lumotlarini yuborish
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mt-5">
      <h1 className="text-center text-2xl font-bold">
        Foydalanuvchi ma'lumotlarini yangilash
      </h1>
      <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
        {/* Foydalanuvchi nomi */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            id="userName"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
          />
          <label
            htmlFor="userName"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Foydalanuvchi nomi
          </label>
        </div>

        {/* Rasmni ko'rsatish (Eski rasm) */}
        {user && user.image ? (
          <img
            className="w-8 h-8 rounded-full"
            src={`${api.defaults.baseURL}/uploads/${user.image}`}
            alt="user photo"
          />
        ) : (
          <img
            className="w-8 h-8 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
            alt="default photo"
          />
        )}
        {/* Rasm yuklash */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Profil rasmi (ixtiyoriy)
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])} // Faylni to'g'ri tanlash
            type="file"
            accept="image/*"
          />
        </div>
        {/* Parol */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Eski Parol
          </label>
        </div>
        {/* Yangi parol */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            id="confirmPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="confirmPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Yangi Parolni kiriting
          </label>
        </div>
        {/* Yuborish tugmasi */}
        <button
          type="submit"
          disabled={isLoading}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          {isLoading ? "Yuklanmoqda..." : "Yangilash"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
