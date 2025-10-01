const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';

const dbName = 'plp_bookstore';
const collectionName = 'books';

const books = [
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Fiction',
        published_year: 1925,
        price: 10.99,
        in_stock: true,
        pages: 180,
        publisher: 'Scribner'
    },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
        published_year: 1960,
        price: 7.99,
        in_stock: true, 
        pages: 281,
        publisher: 'J.B. Lippincott & Co.'
    },
    {
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
        published_year: 1949,
        price: 8.99,
        in_stock: false,
        pages: 328,
        publisher: 'Secker & Warburg'
    },
    {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        genre: 'Fiction',
        published_year: 1951,
        price: 6.99,
        in_stock: true,
        pages: 214,
        publisher: 'Little, Brown and Company'
    },
    {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        genre: 'Romance',
        published_year: 1813,   
        price: 5.99,
        in_stock: true,
        pages: 279,
        publisher: 'T. Egerton'
    },
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        published_year: 1937,
        price: 12.99,
        in_stock: false,
        pages: 310,
        publisher: 'George Allen & Unwin'
    },
    {
        title: 'Fahrenheit 451',
        author: 'Ray Bradbury',
        genre: 'Dystopian',
        published_year: 1953,
        price: 9.99,
        in_stock: true,
        pages: 194,
        publisher: 'Ballantine Books'
    },
    {
        title: 'Big Little Lies',
        author: 'Liane Moriarty',
        genre: 'Mystery',
        published_year: 2014,   
        price: 14.99,
        in_stock: true,
        pages: 460,
        publisher: 'Penguin Random House'
    },
    {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        genre: 'Adventure',
        published_year: 1988,
        price: 11.99,
        in_stock: true,
        pages: 208,
        publisher: 'HarperTorch'
    },
    {
        title: 'The Da Vinci Code',
        author: 'Dan Brown',
        genre: 'Thriller',
        published_year: 2003,
        price: 13.99,
        in_stock: false,
        pages: 454,
        publisher: 'Doubleday'
    }    
];


// insert books into MongoDB
async function insertBooks() {
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB server');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Check if collection has already documents
        const count = await collection.countDocuments();
        if (count > 0) {
            console.log(`Collection already has ${count} documents. Skipping insertion.`);
            await collection.drop();
            console.log('Existing collection dropped.');
        }
        
        // Insert books into the collection
        const result = await collection.insertMany(books);
        console.log(`${result.insertedCount} books were successfully inserted into the database`);
        
        // Display the inserted books
        console.log("\nInserted books: ");
        const insertedBooks = await collection.find({}).toArray();
        insertedBooks.forEach((book, index) => {
            console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
        });
    } catch (err) {
        console.error('Error occurred:', err);
    } finally {
        // close the connection
        await client.close();
        console.log('Connection  closed');
        }
    }
 
insertBooks().catch (console.error);
