import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const api = axios.create({
    baseURL: BASE_URL,
});

export const getUsers = async (activePage) => {
    const response = await api.get(`${BASE_URL}/api/users?page=${activePage}`)
    return response.data
    
}

export const getUser = async (id) => {
    const { data } = await api.get(`${BASE_URL}/api/users/${id}`);
    return data
}

export const userLogin = async (loginInput) => {
    const response = await api.post(`${BASE_URL}/api/login`, loginInput)
    return response.data

}