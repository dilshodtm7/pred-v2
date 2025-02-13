import pg from 'pg'
import dotenv from 'dotenv'


export class PostgresModel {
    #pg

    constructor() {
        this.#pg = new pg.Pool({
            connectionString:'postgresql://forpredictor_user:aOIgsXdrgJ08sHFbmn2A2rrBpAMgMeSV@dpg-cumtkmpu0jms73b86540-a.oregon-postgres.render.com/forpredictor'
                // postgres://aevbuklb:R3WIbjMDum_lC4zc72WaBhYXpqaCJ3TQ@satao.db.elephantsql.com/aevbuklb
            
            
        })
    }

    async fetch(SQL, ...params) {
        const client = await this.#pg.connect()
        try {
            const { rows } = await client.query(SQL, params.length ? params : null)
            return rows
        } catch(err) {
            console.log(err)
        } finally {
            client.release()
        }
    }
}
