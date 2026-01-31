import Transport from "../services/transport.service.js";

class TransportController{
    create=async (req,res,next) => {
        try {
            const resolve=await Transport.create(req)
            return res.status(resolve.status).json(resolve)
        } catch (error) {
            next(error)
        }
    }
    update=async (req,res,next) => {
        try {
            const result = await Transport.update(req)
            return res.status(result.status).json(result)
        } catch (error) {
            next(error)
        }
    }
    getAll=async (req,res,next) => {
        try {
            const result= await Transport.getAll()
            return res.status(result.status).json(result)
        } catch (error) {
            next(error)
        }
    }
    getById=async (req,res,next) => {
        try {
            const result = await Transport.getById(req)
            return res.status(result.status).json(result)
        } catch (error) {
            next(error)
        }
    }
    delete=async (req,res,next) => {
        try {
            const result = await Transport.delete(req)
            return res.status(result.status).json(result)
        } catch (error) {
            next(error)
        }
    }
}

export default new TransportController()