const db = require('./../models/db');
const helper = require("./../models/helper");

const BookController = {
  async getAll() {
    const rows = await db.query(`
      SELECT 'book'.*, 'author'.'name' as 'author_name', 'author'.'surname' as 'author_surname',
      'author'.'initials' as 'author_initials' FROM 'book' 
      INNER JOIN 'author' 
      ON 'book'.'author_id' = 'author'.'author_id' 
      WHERE 'book_id' = 1
    `)
    return {
      data: helper.emptyOrRows(rows)
    }
  },

  async create(book) {
    const rows = await db.query(`
    INSERT INTO book SET name = ?, author_id = ?,
    book_cover = ?, total_readers = ?, read_time: ?,
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
    DELETE FROM 'book' WHERE 'book_id' = ?
    `,
    [book_id])

    return {
      meta: { 
        book_id,
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
    book.total_readers,
    book.read_time,
    book.synopsis,
    book.release_date,
    book.category_id,
    book.rating
  ]
}