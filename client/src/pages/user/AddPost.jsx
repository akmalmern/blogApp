import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/postSlice";
import { getCategory } from "../features/categorySlice";
import { Link } from "react-router-dom";

const AddPost = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    dispatch(addPost(formData));

    // Tozalash
    setTitle("");
    setContent("");
    setCategory("");
    setImage(null);
    setPreview(null);
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <>
      <div className="p-4 ">
        <div className="min-h-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-full relative">
          <Link
            to="/"
            className="absolute top-4 right-4 bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Ortga Qaytish
          </Link>

          <div className="flex items-center justify-center min-h-[calc(100vh-2rem)] mb-4 rounded-sm">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg w-full">
              <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Yangi Post Yaratish
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="title"
                  >
                    Sarlavha
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Post sarlavhasini kiriting"
                  />
                </div>

                <div className="mb-6">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="content"
                  >
                    Kontent
                  </label>
                  <textarea
                    id="content"
                    rows="6"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Post kontentini kiriting"
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="category"
                  >
                    Kategoriya
                  </label>
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    id="category"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Kategoriya tanlang</option>
                    {categories &&
                      categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="image"
                  >
                    Rasm
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {preview && (
                    <div className="mt-4">
                      <img
                        src={preview}
                        alt="Image Preview"
                        className="w-32 h-32 object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Postni Yaratish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
