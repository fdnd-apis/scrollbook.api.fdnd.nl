const db = require('../models/db')
const helper = require('../models/helper')

const AuthorController = {
  async getAll() {
    const rows = await db.query('SELECT * FROM author')
    return {
      data: helper.emptyOrRows(rows),
    }
  },

  async getById(id) {
    const rows = await db.query(`SELECT * FROM author WHERE author_id = ?`, [id])
    return {
      data: helper.emptyOrRows(rows)
    }
  },

  async create(author) {
    const rows = await db.query(
      `
        INSERT INTO author SET name = ?, surname = ?,
        initials = ?, date_of_birth = ?, created_at = ?, updated_at = ?
      `,
      prepareForInsert(author)
    )
    return {
      data: author,
      meta: {
        insertId: rows.insertId,
      }
    }
  },

  async delete(author_id) {
    const rows = await db.query(`
    DELETE FROM author WHERE author_id = ?
    `,
    [author_id])

    return {
      meta: { 
        author_id,
        affectedRows: rows.affectedRows,
        changedRows: rows.changedRows,
      }
    }
  },

  async update(author) {
    const rows = await db.query(`
    UPDATE author SET name = ?, surname = ?,
    initials = ?, date_of_birth = ?
    WHERE author_id = ?
    `, prepareForUpdate(author))

    return {
      data: { author },
      meta: {
        author_id: author.author_id,
        affectedRows: rows.affectedRows,
        changedRows: rows.changedRows,
      }
    }
  }
}

module.exports = AuthorController

function prepareForInsert(author) {
  return [
    author.name,
    author.surname,
    author.initials,
    author.date_of_birth
  ]
}

function prepareForUpdate(author) {
  return [...prepareForInsert(author), author.author_id]
}
