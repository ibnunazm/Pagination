import User from "../models/UserModels.js";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = page * limit;
  const totalRows = await User.count({
    where: {
      [Op.or]: [
        { name: { [Op.like]: "%" + search + "%" } },
        { email: { [Op.like]: "%" + search + "%" } },
      ],
    },    
  });
  const totalPages = Math.ceil(totalRows / limit);
  const result = await User.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: "%" + search + "%" } },
        { email: { [Op.like]: "%" + search + "%" } },
      ],
    },   
    offset,
    limit,
    order: [["id", "DESC"]],
  });
  res.json({
    result,
    page,
    limit,
    totalRows,
    totalPages,
  });
};
