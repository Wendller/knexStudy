const knex = require("../database/");

module.exports = {

  async index(req, res, next) {
    try {
      const { user_id, page = 1 } = req.query;

      const query = knex("projects")
                      .limit(5)
                      .offset((page - 1) * 5);

      const countObject = knex("projects").count();

      if (user_id) {
        query
        .where({ user_id: user_id }) //? outra forma de fazer
        .join("users", "users.id", "=", "projects.user_id")
        .select("projects.*", "users.username")
        .where("users.deleted_at", null);

        countObject.where({ user_id });
      }

      const [count] = await countObject;

      res.header("X-Total-Count", count["count"]);

      const results = await query;

      return res.json(results);
    } catch (error) {
      next(error);
    }
  },
  async create(req, res, next) {
    try {

      const { title, user_id } = req.body;

      await knex("projects").insert({ title, user_id });

      return res.status(201).send();
      // return res.json({username})
    } catch (error) {
      next(error);
    }
  }

}