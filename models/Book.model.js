const Book = function (book) {
  this.name = book.name
  this.author_id = book.author_id
  this.book_cover = book.book_cover
  this.total_readers = book.total_readers
  this.read_time = book.read_time
  this.synopsis = book.synopsis
  this.release_date = book.release_date
  this.category_id = book.category_id
  this.rating = book.rating
}

module.exports = Book
