'use client'
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import recources from "@/recources";
import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import FileSaver, { saveAs } from "file-saver";
import useDownloader from "react-use-downloader";
import axios from "axios";
import { hl, tx, vd, dh } from '@/components/constants/eventId'
import Header from "@/components/header";

export default function Map() {
    if (typeof location !== 'undefined') {

        const [location, getLocation] = useState<string>('')
        const [qrString, getQRString] = useState<string>('')
        const [eventId, getEventId] = useState<string>()
        const [key, getKey] = useState<number>(1)
        const [mapURL, getMapURL] = useState<string>('https://prodhocgiblogstorage.blob.core.windows.net/certtemplates/dong-ha.jpg')
        const [checkProgress, getCheckProgress] = useState<boolean>(false)
        useEffect(() => {
            const located = localStorage.getItem('location')
            const user = JSON.parse(localStorage.getItem('loggedInUser') || "{}")
            if (user)
                getQRString("[" + user.user_id + "][" + user.full_name + "]")

            axios.get(`${process.env.PROFILE_API_URL}/api/Meeting/ticket/${eventId}/external-check-in-history/${user.user_id}/?key=89gR0sRwtK`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                }
            })
                .then(res => { getKey(old => old = res.data.histories.length); })
                .catch(err => { console.log(err); });
            switch (located) {
                case 'dh': {
                    getMapURL('https://prodhocgiblogstorage.blob.core.windows.net/certtemplates/dong-ha.jpg')
                    getLocation("THPT Đông Hà")
                    getEventId(dh)
                    return;
                };
                case 'tx': {
                    getLocation("THPT Thị Xã Quảng Trị");
                    getMapURL('https://prodhocgiblogstorage.blob.core.windows.net/certtemplates/thi-xa-qt.jpg')
                    getEventId(tx)
                    return;
                }
                case 'vd': {
                    getMapURL('https://prodhocgiblogstorage.blob.core.windows.net/certtemplates/vinh-dinh.jpg')
                    getLocation("THPT Vĩnh Định");
                    getEventId(vd)
                    return;
                }
                case 'hl': {
                    getMapURL('https://prodhocgiblogstorage.blob.core.windows.net/certtemplates/hai-lang.jpg')
                    getLocation("THPT Hải Lăng")
                    getEventId(hl)
                    return;
                }
            }
        })

        return (
            <Box sx={{
                textAlign: 'center',
                gap: "10px",
                display: "grid",
                justifyItems: 'center',
                padding: "30px",
            }}>
                <Header />

                <Image alt='TVTS Logo' style={{
                    width: "260px",
                    height: "auto"
                }} src={recources.logo}></Image>
                <Typography>Tại điểm trường: {location}</Typography>
                <Typography>STT của bạn là: {localStorage.getItem('checkin_order')} </Typography>
                {!checkProgress ?
                    <Box>
                        <Image alt='map' width={350} height={0} src={mapURL}
                            style={{
                                // width: "260px",
                                height: "auto"
                            }} />
                        <Typography sx={{
                            fontSize: "14px",
                            fontStyle: 'italic'
                        }}>Sơ đồ Ngày hội Tư vấn tuyển sinh - Hướng nghiệp </Typography>
                    </Box>
                    :
                    <Typography>Bạn đã thu thập được <b style={{
                        fontSize: "20px"
                    }}>{key}/3</b> chìa khóa, tiếp tục hoàn thành thử thách tại ít nhất 3/5 khu vực chính của ngày hội để nhận ngay kho báu là 01 phần quà tại khu vực check-out.</Typography>}

                <QRCode style={{
                    marginTop: "30px",
                    width: "200px",
                    height: "200px",
                    // border: "solid 10px white"
                }} id="qr" value={qrString} />
                <Typography sx={{
                    textAlign: "center",
                }}><b>ĐÂY LÀ MÃ QR CODE CỦA BẠN</b><br />
                    Nếu thu thập được từ 3 chìa khóa là 3 lần quét mã tại 3/5 khu vực chính của ngày hội, bạn sẽ nhận ngay kho báu là 01 phần quà
                    tại khu vực check-out.</Typography>
                {!checkProgress ?
                    <Button onClick={async () => {
                        const user = JSON.parse(localStorage.getItem('loggedInUser') || "{}")
                        await axios.get(`${process.env.PROFILE_API_URL}/api/Meeting/ticket/${eventId}/external-check-in-history/${user.user_id}/?key=89gR0sRwtK`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                            }
                        })
                            .then(res => { getKey(old => old = res.data.histories.length); })
                            .catch(err => { console.log(err); });
                        getCheckProgress(old => old = !old)
                    }} sx={{
                        ".MuiInputBase-input": {
                            border: "none",
                        },
                        // width: "50px",
                        padding: "20px",
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        background: "#DB3022",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "700",
                        borderRadius: "50px",
                        border: "solid 2px #DB3022",
                        ":hover": {
                            color: "#DB3022"
                        },
                        textTransform: "capitalize",
                        // height: "50px"
                    }} >KIỂM TRA TIẾN TRÌNH</Button>
                    :
                    <Button onClick={() => {
                        getCheckProgress(old => old = !old)
                    }} sx={{
                        ".MuiInputBase-input": {
                            border: "none"
                        },
                        // width: "50px",
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        background: "#DB3022",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "700",
                        padding: "20px",
                        borderRadius: "50px",
                        border: "solid 2px #DB3022",
                        ":hover": {
                            color: "#DB3022"
                        },
                        textTransform: "capitalize",
                        // height: "50px"
                    }} >TIẾP TỤC CHƯƠNG TRÌNH</Button>}
            </Box>
        )
    }
}