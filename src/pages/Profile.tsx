import { useEffect, useState } from "react";
import User from "../models/User";
import { UserService } from "../services/userService";

function Profile() {
    const [user, setUser] = useState<User | null>(null);
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
      </div>
    );
  }
  
  export default Profile;
  