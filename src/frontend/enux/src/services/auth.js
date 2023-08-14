import axios from 'axios'


class LoginError extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "LoginError";
    }
}

export const createToken = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try {
        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/jwt/create/`,
            data,
            config
        );
        if (res.status === 200) {
            return res.data
        } else {
            console.error(res)
            throw new LoginError(res.data.detail)
        }
    } catch (error) {
        if (error instanceof LoginError) { throw error }
        if (error.response && error.response.status >= 400 && error.response.status < 500){
            throw new LoginError(error.response.data.detail)
        }
        else {
            throw new LoginError("Login error. Try again later.")
        }
    }
}