export const addBookReducer = (state={bookItems:[]},action)=>{
    switch(action.type){
        case 'ADD_BOOK_REQUEST':
            return {...state , loading:true}    
        case 'ADD_BOOK_SUCCESS':
            return {...state,
                bookItems:[...state.bookItems ,action.payload ],
                loading:false
            }
       
           
       
        default:
            return state         
    }
}

export const getAllBookReducer = (state={books:[]},action)=>{
    switch(action.type){
        case 'GET_BOOKS_REQUEST':
            return {...state,loading:true}
        case 'GET_BOOKS_SUCCESS':
            return {
                books:action.payload,loading:false
            }    
        case 'GET_BOOKS_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}
// Add a new reducer to handle editing books
export const editBookReducer = (state = { books: [],loading: false, error: null }, action) => {
    switch (action.type) {
      case 'EDIT_BOOK_REQUEST':
        return { ...state, loading: true,error:null };
      case 'EDIT_BOOK_SUCCESS':
        return {
          ...state,
          loading: false,
          books: state.books.map(book =>
            book._id === action.payload.book._id ? action.payload : book
          ),
        };
      case 'EDIT_BOOK_FAILED':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };