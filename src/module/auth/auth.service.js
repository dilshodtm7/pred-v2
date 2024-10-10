import { LoginModel } from "./auth.model.js";

class LoginService {
    #_loginModel;

    constructor() {
        this.#_loginModel = new LoginModel();
    }

    async getAll() {
        const data = await this.#_loginModel.getAll();
        return data;
    }

    async signIn(id) {
        const data = await this.#_loginModel.signIn(id);
        try {
            if (data[0]) {
                return {
                    data:data[0].id,
                    message: "User Successfully logged in",
                    status: 201,
                };
            }
            else {
                return {
                    message: "User not found",
                    status: 404,
                };
            }
            
        } catch (error) {
            console.log(error);      
            
            
        }


    }

    async signUp(id) {
        const userRetrive = await this.#_loginModel.userRetrieve(id);
        try {
            if (userRetrive[0]) {
                return {
                    message: "User already exists",
                    status: 204,
                };
            }
            else {
                const data = await this.#_loginModel.signUp(id);
                return {
                    data:data[0].id,
                    message: "User Successfully created",
                    status: 201,
                }
            }

        } catch (error) {
            console.log(error);      
        }
        
        

    }

    async updateUser( id, status ) {
        const data = await this.#_loginModel.updateUser( id, status );
        const [user] = await this.#_loginModel.userRetrieve(
            id  
        );

        if (user) {
            return {
                 data:data[0].id,
                message: "User Successfully activated",
                
                status: 201,
            };
        }

        return {
            message: "User not found",
            status: 201,
        };
    }
}

export default new LoginService();
