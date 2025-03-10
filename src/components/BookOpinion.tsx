import { Link } from 'react-router-dom'
import Book from '../models/Book';

interface BookOpinionProps{
    handleDelete: (id: number) => void
    books: Book[] | undefined
}

function BookOpinion({handleDelete, books}: BookOpinionProps) {
    
  return (
    <div className="flex flex-wrap flex-row gap-4 items-center justify-center">
        {books?.map((book) => (
          <div key={book.id}>
            <div
              className="block max-w-sm p-6 bg-gradient-to-r from-violet-200 to-violet-400 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
                {book.title}
              </h5>
              <p className="font-normal text-gray-500">
                {book.opinion}
              </p>
              <div className="flex items-center justify-end gap-4 mt-4">
                <Link className="px-3 py-2 text-sm font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300" to={`/books/${book.id}`}>Ver</Link>
                <Link className="px-3 py-2 text-sm font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300" to={`/books/edit/${book.id}`}>Editar</Link>
                <button className="px-3 py-2 text-sm font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300" onClick={() => handleDelete(book.id)}>Borrar</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default BookOpinion