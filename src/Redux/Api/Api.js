import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:5000'
})


api.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });

 // console.log(JSON.parse(localStorage.getItem("profile")).token)

export const userRegister = (formData) => api.post("/register", formData);
export const userLogin = (formData) => api.post("/login", formData);
export const getAllTours = (page) =>api.get(`/getalltour?page=${page}`)
export const getSingleTour =(id)=>api.get(`/singletour/${id}`)
export const createTour = (formData) =>api.post('/createtour',formData)
export const getToursByUserId =(id)=>api.get(`/gettoursbyuserid/${id}`)
export const deleteTours = (id) =>api.delete(`/deletetour/${id}`)
export const editTours =(id,formData)=>api.put(`/updatetour/${id}`,formData)
export const searchTours =(search)=>api.get(`/search?search=${search}`)
export const likeTour =(id)=>api.put(`/liketour/${id}`)
export const commenttour =(id,comments)=>api.put(`/commenttour/${id}`,comments)
export const userChats = (userId)=>api.get(`/userchat/${userId}`)
export const singleUser = (id) => api.get(`/singleuser/${id}`)
export const addMessage = (data) =>api.post('/createmessage',data)
export const getMessages = (chatId) =>api.get(`/getmessage/${chatId}`)