import axios from 'axios';

class Authservice {
    async login(username, password) {
        const response = await axios
            .post("/ramu/user/login", { username, password });
        if (response.status === 200 && response.data.token) {
            localStorage.setItem("token", response.data.token);
            console.log("Set token!");
            return localStorage.getItem("token");
        }
        return response;
    }

    isLoggedIn(){
        return localStorage.getItem("token") != null;
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    register(email, dateofbirth, username, passwordHash, createdDate) {
        return axios.post("ramu/user/register", {
            email,
            dateofbirth,
            username,
            passwordHash,
            createdDate
        });
    }
}

export default new Authservice();