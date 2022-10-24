import api from "./api";

const create = async () => {
    try {
        let response = await api.post("/create", {});

        return response?.data || null;
    } catch (ex: any) {
        console.log(ex)
    }
}

const join = async () => {
    try {
        let response = await api.post("/join", {});

        return response?.data || null;
    } catch (ex: any) {
        console.log(ex)
    }
}

const invite = async () => {
    try {
        let response = await api.post("/invite", {});

        return response?.data || null;
    } catch (ex: any) {
        console.log(ex)
    }
}

const accept = async () => {
    try {
        let response = await api.post("/accept", {});

        return response?.data || null;
    } catch (ex: any) {
        console.log(ex)
    }
}

export default { create, join, invite, accept };