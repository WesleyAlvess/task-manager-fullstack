const Estatisticas = ({ tasks }) => {

  const total = tasks.length;
  const concluidas = tasks.filter(task => task.completed).length;
  const pendentes = total - concluidas;

  return (
    <div className="mt-6 text-gray-700 font-sans">

      <h2 className="font-semibold mb-3 flex items-center gap-2">
        📊 Estatísticas
      </h2>

      <div className="grid grid-cols-3 gap-2">

        <div className="bg-white border border-gray-200 rounded-lg p-3 h-20 flex flex-col items-center justify-center text-center">
          <p className="text-lg font-bold text-gray-800 leading-none">
            {total}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Total
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3 h-20 flex flex-col items-center justify-center text-center">
          <p className="text-lg font-bold text-green-600 leading-none">
            {concluidas}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Concluídas
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 h-20 flex flex-col items-center justify-center text-center">
          <p className="text-lg font-bold text-yellow-600 leading-none">
            {pendentes}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Pendentes
          </p>
        </div>

      </div>

    </div>
  );
};

export default Estatisticas;
