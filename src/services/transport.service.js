import { Transport } from "../models/models.js";
import { BadRequest, NotFoundError } from "../utils/errors.js";

class TransportService {
  create = async (req) => {
    try {
      const { branch, model, color, image, price } = req.body;
      const result = await Transport.create({
        branch,
        model,
        color,
        image,
        price,
      });
      return { status: 201, data: result };
    } catch (error) {
      throw error;
    }
  };
  getAll = async () => {
    try {
      const result = await Transport.find();
      return { status: 200, data: result };
    } catch (error) {
      throw error;
    }
  };
  getById = async (req) => {
    try {
      const result = await Transport.findById(id);
      if (!result) {
        throw new NotFoundError("Transport not found");
      }
      return { status: 200, data: result };
    } catch (error) {
      throw error;
    }
  };
  delete = async (req) => {
    try {
      const result = await Transport.findById(id);
      if (!result) {
        throw new NotFoundError("Transport not found");
      }
      return { status: 200, data: result };
    } catch (error) {
      throw error;
    }
  };
  update = async (req) => {
    try {
      const { id } = req.params;
      const result = await Transport.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!result) {
        throw new NotFoundError("Transport not found");
      }
      return { status: 200, data: result };
    } catch (error) {
      throw error;
    }
  };
}

export default new TransportService()