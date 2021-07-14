import axios from "axios";

const baseURL = `http://localhost:8080/api/v1`;

export const http = axios.create({
  baseURL: `http://localhost:8080/api/v1`,
});
http.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (!config.url.includes("/login")) {
      if (!token) {
        localStorage.clear();
        window.location.replace("/login");
        return Promise.reject({ message: "Please login to your account" });
      }
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error && error.response.status === 401) {
      localStorage.clear();
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export const getSessionUser = () => {
  return http
    .get("/user/profile")
    .then((res) => res.data)
    .catch((err) => err);
};

export const login = (props) => {
  return http
    .post(`${baseURL}/login`, props)
    .then((res) => res.data)
    .catch((err) => err);
};

export const getUsers = () => {
  return http
    .get(`${baseURL}/user`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const logout = () => {
  return http
    .get(`${baseURL}/logout`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const createNewUser = (props) => {
  return http
    .post(`${baseURL}/user/create`, props)
    .then((res) => res.data)
    .catch((err) => err);
};

export const getProjects = () => {
  return http
    .get(`${baseURL}/user/projects`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const removeUser = (props) => {
  return http
    .post(`${baseURL}/user/destroy/${props}`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const getSingleUser = (props) => {
  return http
    .get(`${baseURL}/user?id=${props}`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const updateUser = (props, id) => {
  return http
    .post(`${baseURL}/user/edit/${Number(id)}`, props)
    .then((res) => res.data)
    .catch((err) => err);
};

export const addProject = (props, id) => {
  return http
    .post(`${baseURL}/project`, props)
    .then((res) => res.data)
    .catch((err) => err);
};

export const getProjectTasks = (id) => {
  return http
    .get(`${baseURL}/user/project/${id}/tasks`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const removeProject = (id) => {
  return http
    .post(`${baseURL}/project/destroy/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const addTask = (props) => {
  return http
    .post(`${baseURL}/tasks`, props)
    .then((res) => res.data)
    .catch((err) => err);
};
export const getSingleTask = (id) => {
  return http
    .get(`${baseURL}/tasks?id=${id}`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const taskEdit = (props, id) => {
  return http
    .post(`${baseURL}/tasks/edit/${id}`, props)
    .then((res) => res.data)
    .catch((err) => err);
};

export const dashboard = () => {
  return http
    .get(`${baseURL}/total`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const addUserstoProject = (props) => {
  return http
    .post(`${baseURL}/project/add-user`, props)
    .then((res) => res.data)
    .catch((err) => err);
};

export const getAllUsers = (id) => {
  return http
    .get(`${baseURL}/users-list/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const passwordReset = (id) => {
  return http
    .post(`${baseURL}/user/password-reset/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const getTaskUsers = (id) => {
  return http
    .get(`${baseURL}/tasks/current-users/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const allUsersProject = (id) => {
  return http
    .get(`${baseURL}/project/all-users/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
};
