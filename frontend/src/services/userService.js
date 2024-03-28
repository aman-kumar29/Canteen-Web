import axios from 'axios';

export const getUser = () =>{
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
};
export const login = async (email,password) =>{
    const {data} = await axios.post('/api/users/login', {email,password});
    localStorage.setItem('user', JSON.stringify(data));
    return data;
}
export const logout = async ()=>{
    return localStorage.removeItem('user');
}