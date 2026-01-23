import { User } from "../models/student.js"
class UserService{
    create=async (req) => {
        try {
            const result=await User.create(req.body)
            return {status:201,message:"succes"}
        } catch (error) {
            throw error
        }
    }
    
    getOne=async (req) => {
        try {
            const result=await User.findById(req.params.id)
            return {status:200,data:result}
        } catch (error) {
            throw error
        }
    }
}

export default new UserService()