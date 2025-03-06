import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Book from "../models/Book";
import { useNavigate, useParams } from "react-router-dom";
import { BookService } from "../services/bookService";
import toast from "react-hot-toast";
import Genre from "../models/Genre";
import { GenreService } from "../services/genreService";
import ErrorMsgData from "../utils/ErrorMsgData";
import InputForm from "../components/InputForm";
import TextAreaInputForm from "../components/TextAreaInputForm";

function BookForm() {

    const [form, setForm] = useState<Partial<Book>>({
      title: '',
      author: '',
      description: '',
      opinion: '',
      published: new Date().toISOString().slice(0,16), //2007-11-03T16:18:05Z ->  2007-11-03T16:18
      idCreator: undefined,
      idGenre: undefined
    })
    const [genres, setGenres] = useState<Genre[]>()
  
    const {id} = useParams()
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
  
    useEffect(()=>{
      if(id){
        
        setLoading(true)
        BookService.getById(Number(id))
        .then(data => setForm({
          ...data,
          published: new Date(data.published || '').toISOString().slice(0,16)
        }))
        .catch((error) => setErrors(error.message))
        .finally(()=>setLoading(false))
  
      }
    }, [id])
  
    useEffect(()=>{
      GenreService.getAll()
        .then(setGenres)
        .catch(error => setErrors(error.message))
    },[])
  
    const handleSubmit=async (e: FormEvent) =>{
      try{
        setLoading(true)
        setErrors({});
        e.preventDefault()
        const formData = {
          ...form,
          idGenre: form.idGenre ? Number(form.idGenre) : null,
          published: new Date(form.published || '').toISOString()
        }
        console.log(formData)
        if(id) await BookService.update(Number(id), formData)
          else await BookService.create(formData)
        toast.success('Opinion guardada correctamente!')
        navigate('/books')
      }catch(error){
        toast.error('Error al guardar la opinion!')
         if(Array.isArray(error)){
                const errorObj: Record<string, string> = error?.reduce((acc: Record<string, string>, err: unknown) => {
                  const errorDetail = err as ErrorMsgData;
                  acc[errorDetail.path] = errorDetail.msg;
                  return acc;
                }, {});
                setErrors(errorObj);
              }else if(error instanceof Error){
                const msg = error instanceof Error ? error.message : "Error desconocido"
                setErrors({message: msg || 'Error desconocido'});
              }else{
                setErrors({message: error as string || 'Error desconocido'});
              }
      }finally{
        setLoading(false)
      }
    }
  
    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
      const {value, name} = e.target
      setForm({ ...form, [name]:value,  }) 
    }
  
    if(loading) return <p>Loading...</p>
  
    return (
      <div className='text-white flex flex-col'>
        <h2 className="text-4xl font-extrabold dark:text-white">{id?'Edición de oferta':'Inserción de nueva oferta'}</h2>
  
        <form className="max-w-sm mx-auto min-w-sm" onSubmit={handleSubmit}>
        
        <InputForm text="Título" name="title" value={form.title || ''} handleChange={handleChange} error={errors.title} />
        <InputForm text="Autor" name="author" value={form.author || ''} handleChange={handleChange} error={errors.author} /> 
        <TextAreaInputForm type="textarea" rows={6} text="Descripción" name="description" value={form.description || ''} handleChange={handleChange} error={errors.description} /> 
        <TextAreaInputForm type="textarea" rows={6} text="Opinión" name="opinion" value={form.opinion || ''} handleChange={handleChange} error={errors.opinion} /> 
        
        <InputForm type="datetime-local" text="Fecha publicación:" name="published" value={form.published || ''} handleChange={handleChange} error={errors.published} />
  
        <label htmlFor="idGenre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Género:</label>
        <select id="idGenre" name='idGenre'  value={form.idGenre ?? ""}
              onChange={handleChange}
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <option value="" >Seleciona género</option>
            {genres?.map(genre => 
              <option  key={genre.id} value={genre.id}> {genre.name} </option>
            )}
        </select>
  
     
        {errors && errors.message && <p className="text-center mt-4 text-red-500">{errors.message}</p>}
  
        <button
          type="submit"
          className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Guardar
        </button>
        </form>
      </div>
    )
  }
  
  export default BookForm