import { Transport } from "../models/models.js";
import { BadRequest, NotFoundError } from "../utils/errors.js";
import { join, extname } from "path";
class TransportService {
  create = async (req) => {
    let fileName = null;
    try {
      const { branch, model, color, price } = req.body;
      const { file } = req.files;
      // console.log(file)
      if (!file) {
        throw new BadRequest("Image is required");
      }
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.mimetype)) {
        throw new ValidationsError(
          "Faqat rasm yuklash ruxsat etilgan (jpg, png, webp)!"
        );
      }
      fileName = `${Date.now()}${extname(file.name)}`;
      await file.mv(join(process.cwd(), "src", "uploads", fileName), (err) => {
        if (err) throw err;
      });
      const result = await Transport.create({
        branch,
        model,
        color,
        image: fileName,
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
      const {id}=req.params
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
      const {id}=req.params
      const result = await Transport.findByIdAndDelete(id);
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

export default new TransportService();
