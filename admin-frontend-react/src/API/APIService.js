import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://82.202.156.164:8080',
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers["Authorization"] = `${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default class APIService {
    static async getAllNews() {
        const response = await axios.get('http://82.202.156.164:8080/client/v1/news/', {})
        return response
    }
    static async getNewsById(id) {
        const response = await axios.get('http://82.202.156.164:8080/client/v1/news/' + id)
        return response
    }
    static async getAllProjects() {
        const response = await axios.get('http://82.202.156.164:8080/client/v1/project/', {})
        return response
    }
    static async getAllGuides() {
        const response = await axios.get('http://82.202.156.164:8080/client/v1/guide/', {})
        return response
    }
    static async getAllDocuments() {
        const response = await axios.get('http://82.202.156.164:8080/client/v1/documents/', {})
        return response
    }
    static async deleteDocument(id) {
        const response = await apiClient.delete('/admin/v1/documents/' + id)
        return response
    }
    static async uploadDocuments(files, type) {
        const formData = new FormData();
    Array.from(files).forEach((file) => {
            formData.append('documents', file, file.name);
    });
    formData.append('type', type);

        try {
            const response = await apiClient.post(
                '/admin/v1/documents/',
                formData,
                {
                    headers: {

                    },
                }
            );
            return response;
        } catch (error) {
            console.error('Ошибка при загрузке документов:', error.response?.data || error.message);
            throw error;
        }
    }
    static async deleteGuide(id) {
        const response = await apiClient.delete('/admin/v1/guide/' + id);
        return response;
    }
    static async createGuide(data) {
        const response = await apiClient.post(
            '/admin/v1/guide/',
            [
                {
                    label: data.label,
                    themes: data.themes
                }
            ],
            {
                params: {
                    type: data.type
                }
            }
        );
        return response;
    }
    static async deleteTheme(themeId) {
        const response = await apiClient.delete(`/admin/v1/guide/theme/${themeId}`);
        return response;
    }

    static async addThemeToGuide(guide_id, title, content) {
        const response = await apiClient.post('/admin/v1/guide/theme/', {
            guide_id, title, content
        });
        return response;
    }
    
    static async deleteNews(id) {
        const response = await apiClient.delete('/admin/v1/news/' + id);
        return response;
    }
    
    static async createNews(data) {
        const response = await apiClient.post(
            '/admin/v1/news/',
            data
        );
        return response;
    }
    static async deleteProject(id) {
        const response = await apiClient.delete('/admin/v1/project/' + id);
        return response;
    }
    
    static async createProject(data) {
        const response = await apiClient.post(
            '/admin/v1/project/',
            data
        );
        return response;
    }
    static async login(login, password) {
        const response = await apiClient.post('/admin/v1/auth/sign-in/', {
            login,
            password
        });
        return response;
    }
    static async register(login, password, inviteToken) {
        const response = await apiClient.post('/admin/v1/auth/sign-up/', {
            login,
            password,
            invite_token: inviteToken
        });
        return response;
    }
    static async generateToken(role) {
        const response = await apiClient.post('/admin/v1/auth/token/', {
            role
        });
        return response;
    }
    static async enrichProfile(formData) {
        const response = await apiClient.post('/admin/v1/auth/enrich-profile/', formData);
        return response;
    }
    static async getUserChats() {
        const response = await apiClient.get('/admin/v1/chat/');
        return response;
    }
}