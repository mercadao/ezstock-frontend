import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardItem() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "https://villavitoriaapi-production.up.railway.app/api/Estoque/ListaUltimasTransacoes?limite=7",
          {
            headers: {
              accept: "text/plain",
            },
          }
        );

        // Log da resposta da API para depuração
        console.log("Resposta da API:", response.data);

        // Atualiza o estado com as transações
        setTransactions(response.data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []); // Executa apenas uma vez quando o componente é montado

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="w-full flex flex-col gap-2">
      {transactions.map((transaction) => (
        <div key={transaction.idTransacao} className="border p-4 rounded-md">
          <div className="text-brownText flex justify-between">
            <p className="font-semibold">Produto ID: {transaction.idProduto}</p>
            <p className="font-normal">
              R$ {transaction.valorTransacao.toFixed(3).replace('.', ',')}
            </p>
          </div>
          <div className="text-textGray flex justify-between text-sm">
            <p className="font-light">{transaction.quantidadeKG} itens</p>
            <p className="font-light">
              {new Date(transaction.dataTransacao).toLocaleDateString("pt-BR", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
