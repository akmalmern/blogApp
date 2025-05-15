// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getOnePost } from "../pages/features/postSlice";
// import { addComment } from "../pages/features/commentSlice";
// import api from "../api/api";
// import { formatDistanceToNow } from "date-fns";
// import { uz } from "date-fns/locale";

// const SinglePost = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);

//   const { singlePost, status } = useSelector((state) => state.posts);
//   const { user } = useSelector((state) => state.auth); // agar user Reduxda bo‘lsa

//   // Postni olish
//   useEffect(() => {
//     if (id) {
//       dispatch(getOnePost(id));
//     }
//   }, [dispatch, id]);

//   // Kommentlar holatini yangilash
//   useEffect(() => {
//     if (singlePost?.comments) {
//       setComments(singlePost.comments);
//     }
//   }, [singlePost]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!comment.trim()) return;

//     try {
//       const res = await dispatch(addComment({ postId: id, comment })).unwrap();
//       setComments((prev) => [...prev, res.comment]);
//       setComment("");
//     } catch (err) {
//       console.log(err);
//       console.error("Komment qo‘shishda xatolik:", err);
//     }
//   };

//   if (status === "loading")
//     return <p className="text-center mt-10">Yuklanmoqda...</p>;
//   if (!singlePost) return <p className="text-center mt-10">Post topilmadi.</p>;

//   const { title, content, image, category, author, createdAt, views } =
//     singlePost;

//   return (
//     <div className="max-w-3xl mx-auto my-8 px-4">
//       {/* Post */}
//       <div className="rounded overflow-hidden shadow-lg">
//         <div className="relative">
//           <img
//             className="w-full object-cover h-64"
//             src={`${api.defaults.baseURL}/uploads/${image}`}
//             alt={title}
//           />
//           <div className="absolute bottom-0 bg-indigo-600 text-white px-3 py-1 text-xs right-0 m-3 rounded">
//             {category?.name}
//           </div>
//         </div>
//         <div className="p-6">
//           <h1 className="text-2xl font-bold mb-2">{title}</h1>
//           <p className="text-gray-700 mb-4">{content}</p>

//           {/* Author */}
//           <div className="flex items-center mb-4">
//             <img
//               className="w-10 h-10 rounded-full mr-3"
//               src={`${api.defaults.baseURL}/uploads/${author?.image}`}
//               alt={author?.userName}
//             />
//             <div>
//               <p className="text-sm font-semibold">{author?.userName}</p>
//               <p className="text-xs text-gray-500">
//                 {formatDistanceToNow(new Date(createdAt), {
//                   addSuffix: true,
//                   locale: uz,
//                 })}
//               </p>
//             </div>
//           </div>

//           {/* Likes */}
//           <div className="flex items-center text-sm text-gray-600">
//             <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-gray-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                 />
//               </svg>
//             </span>
//             <span className="ml-1">{views}</span>
//           </div>
//         </div>
//       </div>

//       {/* Kommentlar */}
//       <div className="mt-8">
//         <h2 className="text-lg font-semibold mb-4">
//           Kommentlar ({comments.length})
//         </h2>

//         {comments.length > 0 ? (
//           comments.map((c) => (
//             <div key={c._id} className="flex items-start mb-4">
//               <img
//                 className="w-8 h-8 rounded-full mr-3"
//                 src={`${api.defaults.baseURL}/uploads/${c.author?.image}`}
//                 alt="Commenter"
//               />
//               <div>
//                 <p className="text-sm font-semibold">{c.author?.userName}</p>
//                 <p className="text-sm text-gray-700">{c.comment}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-sm text-gray-500">Hozircha kommentlar yo‘q.</p>
//         )}

//         {/* Komment formasi */}
//         {user && (
//           <form onSubmit={handleCommentSubmit} className="mt-6">
//             <textarea
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               rows="4"
//               placeholder="Komment yozing..."
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
//             >
//               Yuborish
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SinglePost;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnePost } from "../pages/features/postSlice";
import {
  addComment,
  updateComment,
  deleteComment,
} from "../pages/features/commentSlice";
import api from "../api/api";
import { formatDistanceToNow } from "date-fns";
import { uz } from "date-fns/locale";

const SinglePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const { singlePost, status } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(getOnePost(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (singlePost?.comments) {
      setComments(singlePost.comments);
    }
  }, [singlePost]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const res = await dispatch(addComment({ postId: id, comment })).unwrap();
      setComments((prev) => [...prev, res.comment]);
      setComment("");
    } catch (err) {
      console.error("Komment qo‘shishda xatolik:", err);
    }
  };

  const handleEdit = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.comment);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editText.trim()) return;

    try {
      const res = await dispatch(
        updateComment({ commentId: editingId, comment: editText })
      ).unwrap();

      setComments((prev) =>
        prev.map((c) =>
          c._id === editingId ? { ...c, comment: res.comment.comment } : c
        )
      );
      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error("Tahrirlashda xatolik:", err);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Rostdan ham o‘chirmoqchimisiz?")) return;

    try {
      await dispatch(deleteComment(commentId)).unwrap();
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("O‘chirishda xatolik:", err);
    }
  };

  if (status === "loading")
    return <p className="text-center mt-10">Yuklanmoqda...</p>;
  if (!singlePost) return <p className="text-center mt-10">Post topilmadi.</p>;

  const { title, content, image, category, author, createdAt, views } =
    singlePost;

  return (
    <div className="max-w-3xl mx-auto my-8 px-4">
      {/* Post */}
      <div className="rounded overflow-hidden shadow-lg">
        <div className="relative">
          <img
            className="w-full object-cover h-64"
            src={`${api.defaults.baseURL}/uploads/${image}`}
            alt={title}
          />
          <div className="absolute bottom-0 bg-indigo-600 text-white px-3 py-1 text-xs right-0 m-3 rounded">
            {category?.name}
          </div>
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-gray-700 mb-4">{content}</p>

          <div className="flex items-center mb-4">
            <img
              className="w-10 h-10 rounded-full mr-3"
              src={`${api.defaults.baseURL}/uploads/${author?.image}`}
              alt={author?.userName}
            />
            <div>
              <p className="text-sm font-semibold">{author?.userName}</p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(createdAt), {
                  addSuffix: true,
                  locale: uz,
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
            <span className="ml-1">{views}</span>
          </div>
        </div>
      </div>

      {/* Kommentlar */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">
          Kommentlar ({comments.length})
        </h2>

        <div className="max-h-[300px] overflow-y-scroll pr-2">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c._id} className="flex items-start mb-4">
                <img
                  className="w-8 h-8 rounded-full mr-3"
                  src={`${api.defaults.baseURL}/uploads/${c.author?.image}`}
                  alt="Commenter"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{c.author?.userName}</p>

                  {editingId === c._id ? (
                    <form onSubmit={handleEditSubmit} className="mt-1">
                      <textarea
                        className="w-full border rounded p-2"
                        rows="2"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <div className="flex gap-2 mt-1">
                        <button
                          type="submit"
                          className="text-sm px-3 py-1 bg-green-600 text-white rounded"
                        >
                          Saqlash
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="text-sm px-3 py-1 bg-gray-400 text-white rounded"
                        >
                          Bekor qilish
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-700">{c.comment}</p>
                      {user?._id === c.author?._id && (
                        <div className="flex gap-2 ml-2">
                          <button
                            onClick={() => handleEdit(c)}
                            className="text-xs text-blue-600"
                          >
                            Tahrirlash
                          </button>
                          <button
                            onClick={() => handleDelete(c._id)}
                            className="text-xs text-red-600"
                          >
                            O‘chirish
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Hozircha kommentlar yo‘q.</p>
          )}
        </div>

        {/* Komment qo‘shish formasi */}
        {user && (
          <form onSubmit={handleCommentSubmit} className="mt-6">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              placeholder="Komment yozing..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Yuborish
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
