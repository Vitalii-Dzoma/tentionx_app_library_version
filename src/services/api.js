import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/students"

const getAllStudents = async () => {
  const {data} = await axios.get('')
  return data
}

const getStudentsTests = async (id) => {
  const {data} = await axios.get(`/${id}/tests`)
  return data
}

export {getAllStudents, getStudentsTests}
