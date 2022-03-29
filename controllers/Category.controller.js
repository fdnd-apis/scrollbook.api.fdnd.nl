const db = require('./../models/db')
const helper = require('./../models/helper')

const CategoryController = {
  async getAll() {
    const rows = await db.query('SELECT * FROM category')
    return {
      data: helper.emptyOrRows(rows),
    }
  },

  async create(category) {
    const rows = await db.query(
      `INSERT INTO category SET type = ?`,
      prepareForInsert(category)
    )
    return {
      data: author,
      meta: {
        insertId: rows.insertId,
      },
    }
  },

  async delete(category_id) {
    const rows = await db.query(`
    DELETE FROM 'category' WHERE 'category_id' = ?
    `,
    [category_id])

    return {
      meta: { 
        category_id,
        affectedRows: rows.affectedRows,
        changedRows: rows.changedRows,
      }
    }
  }
}

module.exports = CategoryController

function prepareForInsert(category) {
  return [category.type]
}
