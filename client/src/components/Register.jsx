import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../pages/features/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Parollar mos kelmadi!");
      return;
    }

    if (!formData.userName || !formData.email || !formData.password) {
      toast.error("Maydonlarni to'liq to'ldiring");
      return;
    }

    const data = new FormData();
    data.append("userName", formData.userName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.image) {
      data.append("image", formData.image);
    }

    dispatch(registerUser(data));
  };
  useEffect(() => {
    if (error) {
      toast.error(error); // Backenddan kelgan xatolikni ko‘rsatish
    }
    // if (successMessage) {
    //   toast.success(successMessage); // Muvaffaqiyat xabari
    // }
  }, [error]);

  return (
    <div className="mt-5">
      <h1 className="text-center text-2xl font-bold">Ro'yxatdan o'tish</h1>
      <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
        {/* Foydalanuvchi nomi */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            disabled={isLoading}
            id="userName"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="userName"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Foydalanuvchi nomi
          </label>
        </div>

        {/* Email */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email manzil
          </label>
        </div>

        {/* Parol */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="password"
            value={formData.password}
            disabled={isLoading}
            onChange={handleChange}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Parol
          </label>
        </div>

        {/* Parolni tasdiqlash */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            id="confirmPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="confirmPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Parolni tasdiqlang
          </label>
        </div>

        {/* Rasm yuklash */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Profil rasmi (ixtiyoriy)
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            id="image"
            name="image"
            onChange={handleChange}
            disabled={isLoading}
            type="file"
            accept="image/*"
          />
        </div>

        {/* Yuborish tugmasi */}
        <button
          type="submit"
          disabled={isLoading}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          {isLoading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
        </button>
      </form>
    </div>
  );
};

export default Register;
