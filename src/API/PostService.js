import axios from "axios";

export default class PostService {

    static async getAll(week = "", day = "") {
        const response = await axios.get("http://localhost:3333/data", {
            params: {
                week: week,
                day: day
            }
        })
        console.log(response)
        return response
    }
}