const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/")
    .get(booksController.getBooks)
    .post(booksController.saveBook);

// Matches with "/api/books/:id"
router
    .route("/:id")
    .delete(booksController.deleteBook);

module.exports = router;
