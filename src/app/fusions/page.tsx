interface FusionProps {
    demon: string
}

interface Demon {
    Race: string;
    Name: string;
    Level: number;
    Range: (number | null)[] | string[] | null;
    Special: string[][] | null;
    Plugin: boolean[]
}


export default function Fusions({demon}:FusionProps){
    
}