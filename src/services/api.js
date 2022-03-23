import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/students";

const getAllStudents = async () => {
  const { data } = await axios.get(
    "https://test-task-j.herokuapp.com/data?page=1&size=20"
  );
  return data.data;
};

const getStudentsTests = async (id) => {
  const { data } = await axios.get(`/${id}/tests`);
  return data;
};

const fetchData = async (searchValue, page) => {
  const response = await fetch(
    `https://test-task-j.herokuapp.com/data?page=${page}&size=20&search=${searchValue}`
  );
  const data = await response.json();

  return data.data;
};

export { getAllStudents, getStudentsTests, fetchData };

// export const fetchData = async (searchValue, page = 1) => {
//   const response = await fetch(
//     `https://test-task-j.herokuapp.com/data?page=${page}&size=10&search=${searchValue}`
//   );
//   const data = await response.json();

//   return data;
// };
