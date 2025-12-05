export const Loader = () => {
  return (
    <div className="fixed inset-0 bg-primary z-99999 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6 md:space-y-8">
        <img
          src="/logos/tifosi_logo.svg"
          alt="Logo de carga"
          className="h-20 w-auto md:h-32 lg:h-40 animate-pulse"
        />
        {/* Contenedor de los puntos animados */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 bg-white rounded-full opacity-0"
              style={{
                animation: `pulse 1.5s infinite ease-in-out`,
                animationDelay: `${i * 0.3}s`, // Escalonamos la animación
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};