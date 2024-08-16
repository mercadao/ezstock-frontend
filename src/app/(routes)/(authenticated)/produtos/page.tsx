import PainelHeader from "@/app/components/molecules/PainelHeader";
import Divider from "@/app/components/atoms/Divider";
import Table from "@/app/components/organisms/Table";
import SwitchPageHeader from "@/app/components/atoms/SwitchPageHeader";

const items = [
    { name: 'Item 1', route: '/item1' },
    { name: 'Item 2', route: '/item2' },
    { name: 'Item 3', route: '/item3' }
];

export default function Home() {

 

    return (
        <div className="w-full h-full flex flex-col p-8">
            <h1 className="text-primary-900 text-2xl font-extrabold">Gerencie seus produtos</h1>

            <SwitchPageHeader itemHeader="" items={items} />

            <PainelHeader />

            <Divider color="primary-900" />

            <Table />
        </div>
    );
}
