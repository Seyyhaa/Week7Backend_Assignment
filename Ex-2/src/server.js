import sequelize from "./db/database.js"; 
// import "./models/user.js"; // 👈 this line is critical
import author from "./models/author.js"; // 👈 this line is critical
import book from "./models/book.js"; // 👈 this line is critical

//associations
author.hasMany(book);
book.belongsTo(author);


try {
  // TODO - Call sequelize.sync()
    const result = await sequelize.sync({force:true});
  // TODO -  Print the result of the sync on console
    console.log(result);
     const ronan = await author.create({
    name: "Ronan The Best",
    birthYear: 1990,
  });

  const kim = await author.create({
    name: "Kim Ang",
    birthYear: 1995,
  });

  const hok = await author.create({
    name: "Hok Tim",
    birthYear: 2015,
  });
  
  await ronan.createBook({ title: "Sky World", publicationYear: 2020, pages: 220 });
  await ronan.createBook({ title: "Ocean Deep", publicationYear: 2022, pages: 180 });

  await kim.createBook({ title: "Love You", publicationYear: 2021, pages: 150 });
  await kim.createBook({ title: "Angkor Life", publicationYear: 2023, pages: 170 });

  await hok.createBook({ title: "Baby Hero", publicationYear: 2024, pages: 100 });
  await hok.createBook({ title: "Cartoon Night", publicationYear: 2025, pages: 120 });



  // === Step 4: Queries ===

  // 1. Fetch all books by one author (e.g., Ronan)
  const ronanBooks = await ronan.getBooks();
  console.log("Ronan's Books:", ronanBooks.map(b => b.title));

  // 2. Create a new book for Kim
  await kim.createBook({ title: "New World", publicationYear: 2025, pages: 200 });

  // 3. List all authors with their books
  const authors = await author.findAll({ include: book });
  authors.forEach(author => {
    console.log(`Author: ${author.name}`);
    author.Books.forEach(book => {
      console.log(`    ${book.title} (${book.publicationYear})`);
    });
  });
 
} catch (error) {
  console.error("Unable to connect to the database:", error);
}