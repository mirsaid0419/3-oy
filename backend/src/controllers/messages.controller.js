import messagesService from "../services/messages.service.js";

class Message {
  getMessages = async (req, res, next) => {
    try {
      const data = await messagesService.getMessages(req);
      return res.status(data.status).json(data.messages);
    } catch (error) {
      next(error);
    }
  };
  createMessages=async (req,res,next) => {
    try {
        const data=await messagesService.createMessage(req)
        return res.status(data.status).json(data)
    } catch (error) {
        next(error)
    }
  }
}

export default new Message()