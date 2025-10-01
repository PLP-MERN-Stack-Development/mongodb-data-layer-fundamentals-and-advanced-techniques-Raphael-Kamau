// Find all books in the 'Fiction' genre
db.books.find({ genre: "Fiction" })

// Find books published after 2010
db.books.find({ published_year: { $gt: 2010 } })

// Find books by 'George Orwell'
db.books.find({ author: "George Orwell" })

// Update the price of '1984'
db.books.updateOne({ title: "1984" }, { $set: { price: 15.99 } })

// Delete 'Big Little Lies'
db.books.deleteOne({ title: "Big Little Lies" })

// Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Projection: Only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// Sorting by price
db.books.find().sort({ price: 1 })    // Ascending
db.books.find().sort({ price: -1 })   // Descending

// Pagination: 5 books per page
db.books.find().skip(0).limit(5)      // Page 1
db.books.find().skip(5).limit(5)      // Page 2

// Aggregation: Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// Aggregation: Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// Aggregation: Group books by publication decade and count them
db.books.aggregate([
  { $project: { decade: { $concat: [ { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } }, "s" ] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } }
])

// Create index on title
db.books.createIndex({ title: 1 })

// Compound index on author & published_year
db.books.createIndex({ author: 1, published_year: 1 })

// Use explain() for index performance
db.books.find({ title: "1984" }).explain("executionStats")
