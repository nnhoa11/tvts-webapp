'use client'
import { useRouter } from "next/navigation"
import { isLoggedIn } from "../../utils/auth"
import Login from "@/components/login"

export default function SignIn() {
    const router = useRouter()
    if (!isLoggedIn()) return <Login />
    else router.push('/home')
    // if (typeof location !== "undefined") {
    // }
}