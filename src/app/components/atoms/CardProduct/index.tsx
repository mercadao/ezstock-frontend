interface CardProductProps {
    isActive: boolean;
    name: string;
    price: number;
    id: number;
}

export default function CardProduct( {isActive, name, price, id}: CardProductProps ) {
    return(
        <>
        <div className="w-full h-[100px] bg-primary-900">
            <h1 className="text-black ">teste</h1>
        </div>
        </>
        
    )
}