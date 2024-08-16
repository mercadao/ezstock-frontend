import PainelHeader from "@/app/components/molecules/PainelHeader";
import Divider from "@/app/components/atoms/Divider";
import Table from "@/app/components/organisms/Table";

const products = [
    { id: 1, name: "Produto 1", price: "$10.00" },
    { id: 2, name: "Produto 2", price: "$20.00" },
    { id: 3, name: "Produto 3", price: "$30.00" },
];

export default function Home() {

 

    return (
        <div className="w-full h-full flex flex-col p-8">
            <h1 className="text-primary-900 text-2xl font-extrabold">Gerencie seus produtos</h1>

            <PainelHeader />

            <Divider color="primary-900" />

            <Table />
        </div>
    );
}
