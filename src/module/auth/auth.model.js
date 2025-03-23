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


async signIn(id, lang) {
    // Foydalanuvchini login jadvalidan tekshirish
    const loginData = await this.#db.fetch(`
        SELECT * FROM login WHERE id = $1`, id);

    if (loginData.length > 0) {
        // Agar foydalanuvchi login jadvalida bo'lsa, uni qaytarish
        return loginData;
    } else {
        // Agar foydalanuvchi login jadvalida topilmasa, unlogin jadvalini tekshirish
        const unloginData = await this.#db.fetch(`
            SELECT * FROM unlogin WHERE id = $1`, id);

        if (unloginData.length === 0) {
            // Agar foydalanuvchi unlogin jadvalida ham bo'lmasa, uni unlogin jadvaliga qo'shish
            await this.#db.fetch(`
                INSERT INTO unlogin (id, language) 
                VALUES ($1, $2)`, id, lang);

            return { status: 'User added to unlogin' };
        } else {
            // Agar foydalanuvchi unlogin jadvalida bo'lsa, hech narsa qilmaslik
            return { status: 'User already exists in unlogin' };
        }
    }
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
