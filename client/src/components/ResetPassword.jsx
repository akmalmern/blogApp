import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../pages/features/authSlice";

const ResetPassword = () => {
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      dispatch(resetPassword({ resetToken, newPassword }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="mt-5 w-full px-4">
          <h1 className="text-center text-2xl font-bold">
            Yangi paro'l yaratish
          </h1>
          <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="Number"
                name="resetToken"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                id="resetToken"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="Tasdiqlash paro'li"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Tasdiqlash paro'lini kiriting
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                required
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Yangi paro'lni kiriting
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
              Qayta tiklash
            </button>
            <div className="mt-4 text-center">
              <Link to="/login">
                <span className="text-blue-500 hover:text-blue-700 text-sm">
                  Login ga qaytish
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
