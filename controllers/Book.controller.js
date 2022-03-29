const db = require('./../models/db');
const helper = require("./../models/helper");

const BookController = {
  async getAll() {
    const rows = await db.query(`
    SELECT * FROM getAllBooks
    `)
    return {
      data: helper.emptyOrRows(rows)
    }
  },

  async getById(id) {
    const rows = await db.query(`SELECT * FROM getAllBooks WHERE book_id = ?`, [id])
    return {
      data: helper.emptyOrRows(rows)
    }
  },

  async create(book) {
    const rows = await db.query(`
    INSERT INTO book SET name = ?, author_id = ?,
    book_cover = ?, total_reads = ?, read_time = ?,
    synopsis = ?, release_date = ?, category_id = ?,
    rating = ?`,
    prepareForInsert(book)
    )
    return {
      data: book,
      meta: {
        insertId: rows.insertId
      }
    }
  },

  async delete(book_id) {
    const rows = await db.query(`
    DELETE FROM book WHERE book_id = ?
    `,[book_id]
    )

    return {
      meta: { 
        book_id,
        affectedRows: rows.affectedRows,
        changedRows: rows.changedRows,
      }
    }
  },

  async update(book) {
    const rows = await db.query(`
    UPDATE book SET name = ?, author_id = ?,
    book_cover = ?, total_reads = ?, read_time = ?,
    synopsis = ?, release_date = ?, category_id = ?,
    rating = ?
    WHERE book_id = ?
    `, prepareForUpdate(book))

    return {
      data: { book },
      meta: {
        book_id: book.page_id,
        affectedRows: rows.affectedRows,
        changedRows: rows.changedRows,
      }
    }
  }
}

module.exports = BookController

function prepareForInsert(book) {
  return [
    book.name,
    book.author_id,
    book.book_cover,
    book.total_reads,
    book.read_time,
    book.synopsis,
    book.release_date,
    book.category_id,
    book.rating
  ]
}

function prepareForUpdate(book) {
  return [...prepareForInsert(book), book.book_id]
}