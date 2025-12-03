import { Link } from "react-router";



export const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-light">
        <img src="/logos/logo_acortado.svg" alt="Error 404" className="w-64 h-64 mb-8"/>
      <p className="text-2xl font-regular">Página no encontrada</p>
        <p className="mt-4 text-lg">Lo sentimos, la página que buscas no existe.</p>
        <Link to="/" className="bg-light text-primary px-4 py-2 mt-8">Volver al inicio</Link>
    </div>
  );
};