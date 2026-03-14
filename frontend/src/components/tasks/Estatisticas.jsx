const Estatisticas = ({ tasks }) => {

  const total = tasks.length;
  const concluidas = tasks.filter(task => task.completed).length;
  const pendentes = total - concluidas;

  return (
    <div className="mt-15 text-gray-700 font-sans">

      <h2 className="font-bold mb-3 flex items-center gap-2">
        📊 Estatísticas
      </h2>

      <div className="grid grid-cols-3 gap-2">

        <div className="bg-white shadow rounded p-2 text-center">
          <p className="text-lg font-bold">{total}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>

        <div className="bg-green-100 shadow rounded p-2 text-center">
          <p className="text-lg font-bold">{concluidas}</p>
          <p className="text-xs text-gray-500">Concluídas</p>
        </div>

        <div className="bg-yellow-100 shadow rounded p-2 text-center">
          <p className="text-lg font-bold">{pendentes}</p>
          <p className="text-xs text-gray-500">Pendentes</p>
        </div>

      </div>

    </div>
  );
};

export default Estatisticas;
