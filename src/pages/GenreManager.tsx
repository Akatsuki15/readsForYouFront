import { FormEvent, useEffect, useState } from "react"
import Genre from "../models/Genre"
import { GenreService } from "../services/genreService"

interface GenreFormProps{
    onSubmit: (e:FormEvent, name: string) => void
}
function GenreForm({onSubmit}:GenreFormProps) {
    const [name, setName] = useState('')
    return (
        <form onSubmit={(e)=>onSubmit(e, name)} className="text-black">
            <label htmlFor="name">Nombre:</label>
            <input id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <button className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Guardar</button>
        </form>
    )
}

interface GenreListProps{
    genres: Genre[]
    onDelete: (id: number) => void
}
function GenreList({genres, onDelete}: GenreListProps) {
    return (
        <div className="text-dark">
        {genres.map(genre =>  
            <div key={genre.id}>
                {genre.name} -
                <button onClick={()=>onDelete(genre.id)}>Borrar</button>
            </div>
        )}
        </div>
    )
}


function GenreManager() {
    const [genres, setGenres] = useState<Genre[]>([])

    useEffect(()=>{ // cargar las categorias de la BD
        GenreService
            .getAll()
            .then(setGenres)
    }, [])

    const handleCreate = async (e: FormEvent, name: string) => { // guardar una categoria
        e.preventDefault()
        const nuevoGenre = await GenreService.create({name})
        setGenres([...genres, nuevoGenre])
    }
    
    const handleDelete = (id: number) => { // borrar una categoria
        if (!window.confirm("¿Estás seguro que quieres borrar este género?"))
            return;
        GenreService.delete(id)
        setGenres(genres?.filter((genre) => genre.id !== id));
    }
    
    return (
        <div>
            <h1 className="text-4xl font-bold">Gestión de Géneros Literarios</h1>
            <GenreForm onSubmit={handleCreate}></GenreForm>
            <GenreList genres={genres} onDelete={handleDelete}></GenreList>
        </div>
    )
}

export default GenreManager