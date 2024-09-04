'use client'
import recources from "@/recources";
import { isLoggedIn } from "@/utils/auth";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { dh, tx, vd, hl } from "@/components/constants/eventId";
import Header from "@/components/header";
import SyncLoader from "react-spinners/SyncLoader";
import Script from 'next/script'

export default function Home(props: any) {
    if (typeof location !== "undefined") {
        const [location, getLocation] = useState<string>()
        const [eventId, getEventId] = useState<string>()
        const router = useRouter()
        const param = useSearchParams()
        const [job, getJob] = useState<string>()
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem('loggedInUser') || "{}")
            const cookies = new Cookies()
            await axios.get(`${process.env.API_URL}/api/user/${user.user_id}`, {
                headers: {
                    Authorization: `Bearer ${cookies.get('auth_token')}`
                }
            })
                .then(async res => {
                    console.log(res)
                    localStorage.setItem('userInfo', JSON.stringify(res.data));
                    if (res.data.lastMbti !== null) {
                        axios.post(`${process.env.PROFILE_API_URL}/api/meeting/ticket/${eventId}/client-external-check-in`, {
                            Key: "89gR0sRwtK",
                            UserId: user.user_id,
                            EventId: eventId,
                            Message: res.data.mbtiHistory[res.data.mbtiHistory.length - 1].mbti,
                            Value: localStorage.getItem('nv'),
                            Information: user.full_name,
                            Position: 20

                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                            }
                        })
                            .then((res) => {
                                console.log(res)
                                localStorage.setItem('checkin_order', res.data.checkInOrder)
                                router.push('/map')
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchData()
        useEffect(() => {
            const result = param.get('result') || ""
            const located = localStorage.getItem('location')
            const user = JSON.parse(localStorage.getItem('loggedInUser') || "{}")
            console.log(located)
            const cookies = new Cookies()
            if (result !== "")
                localStorage.setItem('testResult', result)
            switch (located) {
                case 'dh': {
                    getLocation("THPT Đông Hà")
                    getEventId(dh)
                    return;

                };
                case 'tx': {
                    getLocation("THPT Thị Xã Quảng Trị");
                    getEventId(tx)
                    return;
                }
                case 'vd': {
                    getLocation("THPT Vĩnh Định");
                    getEventId(vd)
                    return;

                }
                case 'hl': {
                    getLocation("THPT Hải Lăng")
                    getEventId(hl)
                    return;
                }
            }

        }, []);



        const [showSpinner, setShowSpinner] = useState<boolean>(false)
        if (isLoggedIn()) return (
            <Box sx={{
                textAlign: 'center',
                gap: "30px",
                display: "grid",
                justifyItems: 'center',
                padding: "30px ",
            }}>

                <Header/>

                <Image alt='TVTS Logo' style={{
                    width: "260px",
                    height: "auto"
                }} src={recources.logo}></Image>
                <Typography>Tại điểm trường: {location}</Typography>
                <Image alt="2 người" src={recources.question}></Image>
                {!showSpinner ?
                    <FormControl>
                        <Typography sx={{
                            textAlign: 'justify',
                        }}>Chúng mình tin rằng: một nghề nghiệp phù hợp phải là một nghề nghiệp phù hợp với tính cách, khả năng của bản thân và nhu cầu của xã hội. Quá trình tham vấn định hướng nghề nghiệp nên được bắt đầu từ <b>CHỌN NGHỀ</b>, sau đó là <b>CHỌN NGÀNH</b>, cuối cùng là <b>CHỌN TRƯỜNG</b>.<br />
                            Bạn hãy mở chìa khóa đầu tiên của mê cung ngành nghề với câu hỏi:<br />
                            <b>“Bạn thích nghề gì chưa?”</b></Typography>
                        <TextField onChange={(e) => getJob(e.target.value)}></TextField>
                        <Box sx={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: "120px 120px",
                            justifyContent: "space-between",
                            height: "20px",
                            marginTop: "10px",
                        }}>
                            <Button onClick={() => {
                                window.location.href = `https://hocgi.vn/account/app-login-redirect?token=${localStorage.getItem('auth_token')}>&&url=/trac-nghiem-onet`
                            }} sx={{
                                ".MuiInputBase-input": {
                                    border: "none"
                                },
                                height: "50px",
                                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                background: "#DB3022",
                                color: "white",
                                fontSize: "20px",
                                fontWeight: "700",
                                padding: "15px",
                                borderRadius: "50px",
                                border: "solid 2px #DB3022",
                                ":hover": {
                                    color: "#DB3022"
                                },
                                textTransform: "capitalize",
                            }} >CHƯA</Button>

                            <Button onClick={() => {
                                const user = JSON.parse(localStorage.getItem('loggedInUser') || "{}")
                                setShowSpinner(old => old = !old)
                                axios.post(`${process.env.PROFILE_API_URL}/api/meeting/ticket/${eventId}/client-external-check-in`, {
                                    Key: "89gR0sRwtK",
                                    UserId: user.user_id,
                                    EventId: eventId,
                                    Message: job,
                                    Value: localStorage.getItem('nv'),
                                    Information: user.full_name,
                                    Position: 20

                                }, {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                                    }
                                })
                                    .then((res) => {
                                        console.log(res)
                                        localStorage.setItem('checkin_order', res.data.checkInOrder)
                                        router.push('/map')
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                        setShowSpinner(old => old = !old)

                                    })
                            }} type='submit' value='' sx={{
                                ".MuiInputBase-input": {
                                    border: "none"
                                },
                                // width: "50px",
                                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                background: "#DB3022",
                                color: "white",
                                fontSize: "20px",
                                fontWeight: "700",
                                padding: "15px",
                                borderRadius: "50px",
                                border: "solid 2px #DB3022",
                                ":hover": {
                                    color: "#DB3022"
                                },
                                textTransform: "capitalize",
                                height: "50px"
                            }} >GỬI</Button>
                        </Box>
                    </FormControl>
                    :
                    <Box>
                        <SyncLoader color="#DB3022" />
                    </Box>
                }
            </Box>
        )
        else {
            router.push('/signIn')
        }
    }


}