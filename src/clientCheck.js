import axios from 'axios'

const clientCheck = axios.create({
    baseURL: 'http://localhost:5000/'
})

clientCheck.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('userToken')
            alert('Session expired. Please login again.')
            window.location.reload()
        }
        return Promise.reject(error)
    }
);

export default clientCheck
