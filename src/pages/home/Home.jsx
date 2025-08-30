import axios from "axios";
import "../../App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [idx, setIdx] = useState(null);
  const [inpName, setInpName] = useState("");
  const [inpDesc, setInpDesc] = useState("");
  const [idxImage, setIdxImage] = useState(null);
  const [imageModal, setImageModal] = useState(false);

  async function get() {
    try {
      let response = await fetch("http://37.27.29.18:8001/api/to-dos");
      let data = await response.json();
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("description", event.target.description.value);
    for (let i = 0; i < event.target.images.files.length; i++) {
      formData.append("images", event.target.images.files[i]);
    }
    addUser(formData);
    event.target.reset();
  };

  async function addUser(newUser) {
    try {
      await axios.post("http://37.27.29.18:8001/api/to-dos", newUser, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      get();
      setModalAdd(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleModalEdit = (elem) => {
    setModalEdit(true);
    setIdx(elem.id);
    setInpName(elem.name);
    setInpDesc(elem.description);
  };

  async function editUser(newUser) {
    try {
      await axios.put(`http://37.27.29.18:8001/api/to-dos`, newUser);
      get();
      setModalEdit(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser(id) {
    try {
      await axios.delete(`http://37.27.29.18:8001/api/to-dos?id=${id}`);
      get();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickAddImage = (elem) => {
    setImageModal(true);
    setIdxImage(elem.id);
  };

  const handleSubmitImage = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < event.target.imageById.files.length; i++) {
      formData.append("images", event.target.imageById.files[i]);
    }
    addImage(formData);
  };

  async function addImage(formData) {
    try {
      await axios.post(
        `http://37.27.29.18:8001/api/to-dos/${idxImage}/images`,
        formData
      );
      get();
      setImageModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkedUser(elem) {
    elem.isCompleted = !elem.isCompleted;
    try {
      await axios.put(`http://37.27.29.18:8001/completed?id=${elem.id}`, elem);
      get();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteImg(id) {
    try {
      await axios.delete(`http://37.27.29.18:8001/api/to-dos/images/${id}`);
      get();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 p-6 bg-white rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-indigo-800">My To-Do List</h1>
          <button
            onClick={() => setModalAdd(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add New Task
          </button>
        </div>

        {/* Add Modal */}
        {modalAdd && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-bold text-indigo-800 text-center mb-6">
                Add New Task
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter task name"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Enter description"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Images
                  </label>
                  <input
                    multiple
                    type="file"
                    name="images"
                    className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer 
                             file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                             file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 
                             hover:file:bg-indigo-200"
                  />
                </div>

                <div className="flex justify-between gap-4 mt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all font-medium"
                  >
                    Add Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalAdd(false)}
                    className="flex-1 bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 transition-all font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {modalEdit && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-bold text-indigo-800 text-center mb-6">
                Edit Task
              </h2>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Name
                  </label>
                  <input
                    value={inpName}
                    type="text"
                    name="name"
                    placeholder="Enter task name"
                    onChange={(e) => setInpName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    value={inpDesc}
                    type="text"
                    name="description"
                    placeholder="Enter description"
                    onChange={(e) => setInpDesc(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-between gap-4 mt-4">
                  <button
                    onClick={() =>
                      editUser({ id: idx, name: inpName, description: inpDesc })
                    }
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all font-medium"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setModalEdit(false)}
                    className="flex-1 bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 transition-all font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {imageModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-bold text-indigo-800 text-center mb-6">
                Add Images
              </h2>

              <form
                onSubmit={handleSubmitImage}
                className="flex flex-col gap-5"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Images
                  </label>
                  <input
                    multiple
                    type="file"
                    name="imageById"
                    className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer 
                             file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                             file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 
                             hover:file:bg-indigo-200"
                  />
                </div>

                <div className="flex justify-between gap-4 mt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all font-medium"
                  >
                    Add Images
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageModal(false)}
                    className="flex-1 bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 transition-all font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Task List */}
        {data.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-indigo-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-600">
              No tasks yet
            </h3>
            <p className="text-gray-500 mt-2">
              Click the "Add New Task" button to create your first task
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((elem) => (
              <div
                key={elem.id}
                className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 ${
                  elem.isCompleted ? "border-green-500" : "border-indigo-500"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3
                    className={`text-lg font-semibold ${
                      elem.isCompleted
                        ? "text-gray-500 line-through"
                        : "text-gray-800"
                    }`}
                  >
                    {elem.name}
                  </h3>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={elem.isCompleted}
                      onChange={() => checkedUser(elem)}
                      className="hidden"
                    />
                    <span
                      className={`relative w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
                        elem.isCompleted ? "bg-green-400" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                          elem.isCompleted ? "translate-x-4" : ""
                        }`}
                      />
                    </span>
                  </label>
                </div>

                <p className="text-gray-600 mb-5">{elem.description}</p>

                {elem.images.length > 0 && (
                  <div className="mb-5">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Images:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {elem.images.map((item) => (
                        <div key={item.id} className="relative group">
                          <img
                            src={`http://37.27.29.18:8001/images/${item.imageName}`}
                            alt="Task preview"
                            className="w-20 h-20 object-cover rounded-lg shadow"
                          />
                          <button
                            onClick={() => deleteImg(item.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleModalEdit(elem)}
                    className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded-lg text-sm hover:bg-indigo-200 transition-all flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUser(elem.id)}
                    className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm hover:bg-red-200 transition-all flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </button>

                  <Link to={`/aboutById/${elem.id}`}>
                    <button className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 transition-all flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Details
                    </button>
                  </Link>

                  <button
                    onClick={() => handleClickAddImage(elem)}
                    className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm hover:bg-green-200 transition-all flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add Image
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
