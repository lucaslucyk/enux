import axios from 'axios'


class LoginError extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "LoginError";
    }
}

class SignupError extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "SignupError";
    }
}

class TokenError extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "TokenError";
    }
}

export const tokenCreate = async (data) => {
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

export const tokenVerify = async (token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/jwt/verify/`,
            {token},
            config
        );
        return res.status === 200
    } catch (err){
        if (err.response && err.response.status >= 400 && err.response.status < 500){
            return false;
        }
        else {
            throw new TokenError("Something was wrong.")
        }
    }
}

export const userCreate = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/users/`,
            data,
            config
        );
        if (res.status === 201) {
            return res.data
        } else {
            throw new SignupError(res.data.detail)
        }
    } catch (error){
        if (error instanceof SignupError) { throw error }
        if (error.response && error.response.status >= 400 && error.response.status < 500){
            throw new SignupError(JSON.stringify(error.response.data))
        }
        else {
            throw new SignupError("Signup error. Try again later.")
        }
    }
}