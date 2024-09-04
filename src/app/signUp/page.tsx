'use client'
import Register from "@/components/register";
import { isLoggedIn } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function SignUp(props: any) {
    const router = useRouter()
    if (!isLoggedIn()) {
        return <Register />
    }
    else router.push('/home')
}