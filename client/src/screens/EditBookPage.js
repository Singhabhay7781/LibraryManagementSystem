import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBook } from '../actions/book_action';
import { useParams, useHistory } from 'react-router-dom';

const EditBookPage = () => {
  const { id } = useParams(); // Get book ID from the URL
  
  const dispatch = useDispatch();
  const history = useHistory();
  
  const books = useSelector(state => state.getAllBookReducer.books);
  const book = books.find(book => book._id === id);
  
  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [publisher, setPublisher] = useState(book?.publisher || '');
  const [year, setYear] = useState(book?.year || '');
  const [copies, setCopies] = useState(book?.copies || '');

  useEffect(() => {
    if (!book) {
      history.push('/'); // Redirect if the book is not found
    }
  }, [book, history]);

  const handleSave = () => {
    const updatedBook = { title, author, publisher, year, copies };
    dispatch(editBook(id, updatedBook));
    history.push('/dashboard/allBook'); // Redirect to the All Books page after saving
  };
 // Don't render the form until the book is found
 if (!book) {
    return <div>Loading...</div>; // Or you can show a different loading state
  }
  return (
    <div className="edit-book-page">
      <h2>Edit Book</h2>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Author</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <label>Publisher</label>
        <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
      </div>
      <div>
        <label>Year</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      <div>
        <label>Copies</label>
        <input type="number" value={copies} onChange={(e) => setCopies(e.target.value)} />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => history.push('/dashboard/allBook')}>Cancel</button>
    </div>
  );
};

export default EditBookPage;
