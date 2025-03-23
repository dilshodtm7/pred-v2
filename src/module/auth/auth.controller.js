import LoginService from "./auth.service.js";
class LoginController{


    async getAll(req,res){
        const data = await LoginService.getAll()
        res.status(200).json(data)
    }
    async signIn(req,res){
        const {id,lang} = req.body
        console.log(req.body);
        const data = await LoginService.signIn(id,lang)
        res.status(200).json(data)
    }

    async signUp(req,res){
        const {id} = req.body
        const data = await LoginService.signUp(id)
        res.status(200).json(data)
    }

    async updateUser(req,res){
        const {id,status} = req.body

        const data = await LoginService.updateUser(id,status)
        res.status(200).json(data)
    }

   

}

export default new LoginController();
