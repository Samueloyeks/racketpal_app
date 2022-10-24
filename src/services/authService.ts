import api from './api';

const login = async () => {
    try {
        let response = await api.post("auth/login", {});

        return response?.data?.data?.user || null;
    } catch (ex: any) {
        console.log(ex)
    }
}

const updateRatingLastShown = async (id: string | number) => {
    try {
        await api.post("auth/update-rating-last-shown", { id: id });
    } catch (ex: any) {
        console.log(ex)
    }
}

const updateRatingStatus = async (id: string | number) => {
    try {
        await api.post("auth/update-rating-status", { id: id });
    } catch (ex: any) {
        console.log(ex)
    }
}

export default { login, updateRatingStatus, updateRatingLastShown };