import { useGetTeams } from "@/hooks/useGetTeams";

export const TeamsGrid = () => {

    const { data:teams, isPending, isError, error } = useGetTeams()
    console.log(teams);
    
  return (
    <section className="w-full bg-primary py-40">
      <h2 className="text-center text-light text-3xl font-bold mb-10">
        Equipos Destacados
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6">
        {teams && teams.map((t) => (
          <a
            key={t.text}
            href={t.url}
            className="bg-primary/30 hover:bg-primary/50 transition rounded-xl p-4 flex justify-center items-center border border-light/10"
          >
            <img src={t.image.secure_url} alt={t.text} className="w-20 h-20 object-contain" />
          </a>
        ))}
      </div>
    </section>
  );
};
