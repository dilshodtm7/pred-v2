import { PostgresModel } from "../../db/db.js";

export class LoginModel {
    #db
    constructor() {
        this.#db = new PostgresModel()
    }

    async getAll(){
        const data = await this.#db.fetch(`SELECT * FROM login`)
        return data
    }

    async userRetrieve(id) {
        const data = await this.#db.fetch(
            `
            SELECT * FROM login WHERE id = $1`,id
        );

        return data;
    }

    async signIn(id){
        const data = await this.#db.fetch(`
        SELECT * FROM login WHERE id = $1`,id)
        return data
    }

    async signUp(id){
        const data = await this.#db.fetch(`INSERT INTO login (id) VALUES ($1) RETURNING id`,id )
        return data
    }

    async updateUser({email,status}){
        const data = await this.#db.fetch(`UPDATE login SET status = $1 WHERE email = $2 RETURNING id`,status,email)
        return data
    }
}

export default new LoginModel();
