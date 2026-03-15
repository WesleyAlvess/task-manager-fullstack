const Estatisticas = ({ tasks }) => {

  const total = tasks.length;
  const concluidas = tasks.filter(task => task.completed).length;
  const pendentes = total - concluidas;

  return (
    <div className="flex items-center gap-3">

      <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
        📊 Estatísticas
      </span>

      <div className="flex gap-2">

        <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
          Total
          <span className="font-bold w-5 text-center tabular-nums">
            {total}
          </span>
        </span>

        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
          Concluídas
          <span className="font-bold w-5 text-center tabular-nums">
            {concluidas}
          </span>
        </span>

        <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
          Pendentes
          <span className="font-bold w-5 text-center tabular-nums">
            {pendentes}
          </span>
        </span>

      </div>

    </div>
  );
};

export default Estatisticas;
