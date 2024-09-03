interface DividerProps {
    color?: string;
}

export default function Divider({color = "primary-400"}:DividerProps){
    return(
        <div className={`w-full h-[1px] bg-${color}`} />
    )
}