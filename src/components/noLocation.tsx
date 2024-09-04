'use client'
import { Box } from "@mui/material";
import Image from "next/image";
import recources from "../recources";
export default function NoLocation() {
    return (
        <Box sx={{
            textAlign: 'center',
            gap: "70px",
            display: "grid",
            justifyItems: 'center',
        }}>
            <Image alt='TVTS Logo' style={{
                width: "260px",
                height: "auto"
            }} src={recources.logo}></Image>
            <h1>Bạn vui lòng truy cập trang web theo đường link được ban tổ chức cung cấp</h1>
        </Box>
    )
}