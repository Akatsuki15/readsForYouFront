import { useEffect, useState } from "react";
import User from "../models/User";
import { UserService } from "../services/userService";
import Book from "../models/Book";
import { BookService } from "../services/bookService";
import toast from "react-hot-toast";
import BookOpinion from "../components/BookOpinion";

function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      UserService.getProfile()
        .then(setUser)
        .catch((err) => {
          setError(err instanceof Error ? err.message : "Error desconocido");
        })
        .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
      async function acountBooks() {
        try {
          await BookService.search();
          setBooks(books?.filter((book) => book.idCreator === user?.id));
        } catch (error) {
          setError(error instanceof Error ? error.message : "Error desconocido");
        }
      }

      acountBooks()
    },[books, user])

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
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold text-gray-900">
          Perfil de Usuario
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <p>Cargando...</p>
        ) : (
          user && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nombre</p>
                <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Apellidos</p>
                <p className="text-lg font-semibold text-gray-900">{user.surname}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
                <p className="text-lg font-semibold text-gray-900">{user.email}</p>
              </div>
            </div>
          )
        )}
        <h2 className="text-2xl font-bold text-gray-900">
          Tus opiniones
        </h2>
        <BookOpinion handleDelete={handleDelete} books={books}/>
      </div>
    );
  }
  
  export default Profile;
  