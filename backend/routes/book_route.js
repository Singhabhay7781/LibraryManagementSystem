const express = require("express");
const router = express.Router();



const Book = require("../models/book");
const Issue = require("../models/issue");


router.post("/addBook", async (req, res) => {

   const { title,author,publisher,year,copies } = req.body ;
     console.log("req.body",req.body)





    if(req.body._id){
        const obj = await Issue.find({_id:req.body._id})
        obj[0].isRecom = false 
        await obj[0].save()
    }
    const book = await new Book({ title,author,publisher,year,copies});
    await book.save()

   
 
})
router.get("/allBook", (req, res) => {
    Book.find().sort({ createdAt: -1 }).then(data => {
        res.status(200).json(
           data
        );
        
        
    });
});
   router.post("/deleteBook",async(req,res)=>{

    try {
        await Book.findByIdAndDelete({_id:req.body.bookId});
        res.send("you successfully remove the book");
  
    }
    catch (error) {
        console.log(error);
      }

   });

// Edit a book
router.put("/editBook", async (req, res) => {
    
    const { bookId,title, author, publisher, year, copies } = req.body; // Get the updated book details
  

    

    try {
       // Trim bookId to remove unwanted spaces
       const trimmedBookId = bookId.trim();

      // Find the book by ID and update its details
      const updatedBook = await Book.findByIdAndUpdate(
        trimmedBookId,
        { title, author, publisher, year, copies },
        { new: true } // Return the updated document
      );

      if (!updatedBook) {
        return res.status(404).send("Book not found");
      }
  
      res.status(200).send(updatedBook);
      console.log(updatedBook);
    } catch (error) {
        console.error("Error updating book:", error); // Log the error
        res.status(500).send("Internal server error");
    }
  });
module.exports = router;