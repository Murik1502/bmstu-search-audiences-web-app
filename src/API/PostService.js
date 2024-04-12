import axios from "axios";

export default class PostService {

    static async getAll(week = "", day = "") {
        const response = await axios.get("https://roscosmosmuseum.store/data", {
            params: {
                week: week,
                day: day
            }
        })
        return response
    }
}