import { Link } from "react-router-dom"

function Home() {
  return (
    <div>
      <h2 className="bg-violet-300 mt-60 font-extrabold text-2xl">Opina sobre tus libros favoritos</h2>
      <div className="mt-10">
        <Link to="/register">
          <button type="button" className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-1">Registrate aquí</button>
        </Link>
        <Link to="/login">
          <button type="button" className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Si ya tienes cuenta, logueate</button>
        </Link>
      </div>
    </div>
  )
}

export default Home