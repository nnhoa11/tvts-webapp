'use client'
import recources from "@/recources";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

export default function Header(props: any) {
    const router = useRouter()

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: "row",
            width: "100%",
            justifyContent: "end",
        }}>
            <Image onClick={async () => {
                const cookies = new Cookies()
                const location = await localStorage.getItem('location')
                localStorage.clear()
                cookies.remove('id')
                cookies.remove('auth_token')
                router.push(`/?location=${location}`)
            }} style={{
                margin: "15x 30px",
                cursor: "pointer"

            }} alt='logout' src={recources.logout}></Image>
        </Box>
    )
}