import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Book from "../models/Book"
import { BookService } from "../services/bookService"

function BookDetail() {
    const {id} = useParams()
    const [book, setBook] = useState<Book>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
  
  
  
    useEffect(()=>{
      setLoading(true)
      //if(!id) return
      BookService
        .getById(Number(id))
        .then(setBook)
        .catch(error => setError(error.message))
        .finally(()=>setLoading(false))
    },[id])
  
  
  
  
    if(loading) return <div>Loading...</div>
    if(error) return <div>Error: {error}</div>
    if(!book) return <div>Opiniones no encontradas</div>
  
    return (
      <div className="text-black">
        <div className="text-4xl font-bold">{book.title}</div>
        <div className="text-2xl font-bold">{book.description}</div>
        <div className="text-2xl font-bold">{book.opinion}</div>
      </div>
    )
  }
  
  export default BookDetail