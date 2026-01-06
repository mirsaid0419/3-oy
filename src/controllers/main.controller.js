import pool from "../db/db_connect.js";

class Crud {
  create = async (req, res) => {
    const tb_name = req.originalUrl.split("/")[1];
    try {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
          message: "malumotlar yetarli emas",
        });
      }
      const str = Object.keys(req.body).join(", ");
      // console.log(tb_name);
      const str1 = Object.values(req.body)
        .map((_, index) => `$${index + 1}`)
        .join(", ");
      const values = Object.values(req.body);
      await pool.query(
        `insert into ${tb_name}(${str}) values(${str1})`,
        values
      );
      return res.status(201).json({
        status: 201,
        message: `${tb_name} succes created`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error ${tb_name} creating ${error.message}`,
      });
    }
  };
  update = async (req, res) => {
    const tb_name = req.originalUrl.split("/")[1];
    try {
      const id = Number(req.params.id);
      if (!id || isNaN(id)) {
        return res.status(400).json({
          message: "invalid id",
        });
      }
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
          message: "yangilash uchun malumot mavjud emas",
        });
      }
      const str = Object.keys(req.body)
        .map((el, index) => `${el}=$${index + 1}`)
        .join(", ");
      const { rows } = await pool.query(
        `update ${tb_name} set ${str} where id=$${
          Object.keys(req.body).length + 1
        } returning *`,
        [...Object.values(req.body), id]
      );
      return res.status(201).json({
        status: 201,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error ${tb_name} updating ${error.message}`,
      });
    }
  };
  getAll = async (req, res) => {
    const tb_name = req.originalUrl.split("/")[1];
    try {
      const { rows } = await pool.query(`select * from ${tb_name}`);
      if (!rows.length) {
        return res.status(200).json({
          message: `${tb_name} teyblida hali malumot mavjud emas`,
        });
      }
      return res.status(200).json({
        message: "succes",
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error ${tb_name} get ${error.message}`,
      });
    }
  };
  createOrder = async (req, res) => {
    const tb_name = req.originalUrl.split("/")[1];
    try {
      const amount = req.body.amount;
      delete req.body.amount;
      const price = await pool.query(`select price from cars where id=$1`, [
        req.body.car_id,
      ]);
      if (!amount || amount < price.rows[0].price * 0.2) {
        return res.status(400).json({
          message: "boshlang'ich to'lov mavjud emas yoki yetarli emas",
        });
      }
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
          message: "malumotlar yetarli emas",
        });
      }
      const str = Object.keys(req.body).join(", ");
      const str1 = Object.values(req.body)
        .map((_, index) => `$${index + 1}`)
        .join(", ");
      const values = Object.values(req.body);
      const newdata = await pool.query(
        `insert into ${tb_name}(${str}) values(${str1}) returning *`,
        values
      );
      await pool.query(
        `insert into payments(order_id,amount,created_at) values($1,$2,$3)`,
        [newdata.rows[0].id, amount, req.body.start_date]
      );
      return res.status(201).json({
        status: 201,
        message: `${tb_name} succes created`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error ${tb_name} create ${error.message}`,
      });
    }
  };
  smartQuerry = async (req, res) => {
    try {
      const { rows } = await pool.query(
        " select c.full_name,ca.name as car_name,o.id as order_id,sum(p.amount) as tolov,(ca.price-sum(p.amount)) as qoldiq, ca.price from orders o join customers c on o.customer_id=c.id join payments p on o.id=p.order_id join cars ca on ca.id=o.car_id group by o.id,c.full_name,o.id, ca.name,ca.price having sum(p.amount)<ca.price"
      );
      return res.status(200).json({ data: rows });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  orderGetAll = async (req, res) => {
    try {
      const { rows } = await pool.query(
        "select o.id, c.full_name,cars.name car_name, month, start_date, end_date, payment_date from orders o left join customers c on o.customer_id=c.id join cars on o.car_id=cars.id"
      );
      if (!rows.length) {
        return res.status(200).json({
          message: `orders teyblida hali malumot mavjud emas`,
        });
      }
      return res.status(200).json({
        message: "succes",
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error orders get ${error.message}`,
      });
    }
  };
  getById = async (req, res) => {
    const tb_name = req.originalUrl.split("/")[1];
    try {
      const id = Number(req.params.id);
      if (!id || isNaN(id)) {
        return res.status(400).json({
          message: "invalid id",
        });
      }
      const { rows } = await pool.query(
        `select * from ${tb_name} where id=$1`,
        [id]
      );
      if (!rows.length) {
        return res.status(404).json({
          message: "user topilmadi",
        });
      }
      return res.status(200).json({
        status: 200,
        user: rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        message: `error ${tb_name} creating :${error.message}`,
      });
    }
  };
  delete = async (req, res) => {
    const tb_name = req.originalUrl.split("/")[1];
    try {
      const id = Number(req.params.id);
      if (!id || isNaN(id)) {
        return res.status(400).json({
          message: "invalid id",
        });
      }
      const { rows } = await pool.query(`delete from ${tb_name} where id=$1`, [
        id,
      ]);
      return res.status(200).json({
        status: 200,
        message: `${tb_name} success deleted`,
      });
    } catch (error) {
      return res.status(500).json({
        message: `error ${tb_name} creating :${error.message}`,
      });
    }
  };
}
export default new Crud();
