import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

const sendScreenshot = (file) => {
    let formData = new FormData();
    formData.append('plate', file);
    return api.post('/api/ocr', formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
        .then(res => res.data);
}

export default {
    sendScreenshot
}