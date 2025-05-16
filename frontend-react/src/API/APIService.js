import axios from "axios"

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
    static async startChat(ticketNumber) {
        const response = await axios.post('http://82.202.156.164:8080/client/v1/chat/', {}, {
            headers: {
                'X-TradeUnion-ID': ticketNumber
            }
        })
        return response
    }
}