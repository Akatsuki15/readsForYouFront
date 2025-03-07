import { ChangeEvent, useEffect, useState } from "react";
import Book from "../models/Book";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BookService } from "../services/bookService";

function BookList() {
    const [books, setBooks] = useState<Book[]>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
  
    const [queryParams, setQueryParams] = useSearchParams();
    const titleQuery = queryParams.get("title") || "";
  
    useEffect(() => {
      BookService.search(titleQuery)
        .then(setBooks)
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    }, [titleQuery]);
  
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      setQueryParams(newTitle ? { title: newTitle } : {});
    };
  
    const handleDelete = async (id: number) => {
      if (!window.confirm("¿Estás seguro que quieres borrar esta opinion?"))
        return;
  
      try {
        await BookService.delete(id);
        setBooks(books?.filter((book) => book.id !== id));
        toast.success("Opinion borrada correctamente!");
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      }
    };
  
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-bold">
          Lista de Opiniones de libros
        </h2>
  
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-cyan-500 focus:border-cyan-500"
            value={titleQuery}
            onChange={handleSearchChange}
            placeholder="Buscar por título"
          />
  
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
  
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {books?.length === 0 && <p>No hay opiniones disponibles</p>}
        <div className="flex flex-wrap flex-row gap-4 items-center justify-center">
  
        {books?.map((book) => (
          <div key={book.id} className="">
            <div
    
              className="block max-w-sm p-6 bg-gradient-to-r from-violet-200 to-violet-400 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
                {book.title}
              </h5>
              <p className="font-normal text-gray-500">
                {book.opinion}
              </p>
              <div className="flex items-center justify-center gap-4 mt-4">
  
              <Link className="px-3 py-2 text-sm font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300" to={`/books/${book.id}`}>Ver</Link>
              <Link className="px-3 py-2 text-sm font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300" to={`/books/edit/${book.id}`}>Editar</Link>
              <button className="px-3 py-2 text-sm font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300" onClick={() => handleDelete(book.id)}>Borrar</button>
              </div>
            </div>
          </div>
        ))}
              </div>
  
      </div>
    );
  }
  
  export default BookList;