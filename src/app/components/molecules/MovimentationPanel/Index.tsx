import React, { useEffect, useState } from "react";
import DashboardButton from "../../atoms/Button/DashboardButton/Index";
import dynamic from "next/dynamic";
import axios from "axios";

const MovimentationChart = dynamic(
  () => import("../../atoms/Charts/MovimentarionChart/Index"),
  {
    ssr: false,
  }
);

export default function MovimentationPanel() {
  const [lastMovimentation, setLastMovimentation] = useState(0);

  useEffect(() => {
    // Função para buscar a última movimentação
    const fetchLastMovimentation = async () => {
      try {
        const response = await axios.get(
          "https://villavitoriaapi-production.up.railway.app/api/Estoque/ListaUltimasTransacoes?limite=1",
          {
            headers: {
              accept: "text/plain",
            },
          }
        );

        // Log da resposta da API para depuração
        console.log("Resposta da API:", response.data);

        // Obter a última movimentação, se houver
        if (response.data.length > 0) {
          // Supondo que as transações são ordenadas por data
          const lastTransaction = response.data[0]; 
          setLastMovimentation(lastTransaction.quantidadeKG);
        } else {
          console.log("Nenhuma transação encontrada.");
        }
      } catch (error) {
        console.error("Erro ao buscar movimentações:", error);
      }
    };

    fetchLastMovimentation();
  }, []); // Executa apenas uma vez quando o componente é montado

  return (
    <div className="w-full h-full p-6 flex flex-col justify-between">
      <div className="flex justify-between items-end">
        <p className="text-2xl font-semibold">Movimentações</p>
      </div>
      <div className="h-[80%] flex justify-between items-center">
        <div className="w-[60%] h-full">
          <MovimentationChart />
        </div>
        <div className="w-[40%] flex flex-col justify-center items-center">
          <p className="mt-2 text-lg">Última movimentação</p>
          <p className="text-6xl font-bold">{lastMovimentation} kg</p>
        </div>
      </div>
    </div>
  );
}
