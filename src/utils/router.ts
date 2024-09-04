import { useRouter } from "next/navigation";

export function router(props: any){
    const router = useRouter()
    router.push(props)
}

