import branchService from "../services/branch.service.js";

class BranchController{
    create=async (req,res,next) => {
        try {
            const resolve=await branchService.create(req)
            return res.status(resolve.status).json(resolve)
        } catch (error) {
            next(error)
        }
    }
    update=async (req,res,next) => {
        try {
            const result = await branchService.update(req)
            return res.status(result.status).json(result)
        } catch (error) {
            next(error)
        }
    }
    getAll=async (req,res,next) => {
        try {
            const result= await branchService.getAll()
            return res.status(result.status).json(result)
        } catch (error) {
            next(error)
        }
    }
    getById=async (req,res,next) => {
        try {
            const result = await branchService.getById(req)
            return res.status(result.status).json(result)
        } catch (error) {
            next(error)
        }
    }
    delete=async (req,res,next) => {
        try {
            const result = await branchService.delete(req)
            return res.status(result.status).json(result)
        } catch (error) {
            next(error)
        }
    }
}

export default new BranchController()