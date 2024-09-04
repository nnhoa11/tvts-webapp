'use client'
import recources from '../recources'
import { Box, Button, FormControl, FormLabel, TextField, TextareaAutosize, Typography } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import EastIcon from '@mui/icons-material/East';
import { jwtDecode } from 'jwt-decode'
import Cookies from 'universal-cookie'
import Textarea from '@mui/joy/Textarea';
import SyncLoader from "react-spinners/SyncLoader"
import Header from './header'

export default function Login(props: any) {
    const [email, getEmail] = useState<string>('')
    const [pwd, getPwd] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [showSpinner, setShowSpinner] = useState<boolean>(false)
    const router = useRouter()
    return (
        <Box sx={{
            textAlign: 'center',
            gap: "70px",
            display: "grid",
            justifyItems: 'center',
            padding: "30px 0"
        }}>

            <Image alt='TVTS Logo' style={{
                width: "260px",
                height: "auto"
            }} src={recources.logo}></Image>
            {!showSpinner ?
                <FormControl sx={{
                    gap: "30px",
                    width: "85vw",
                    textAlign: 'left',
                }}>
                    <Typography color='error'>{error}</Typography>
                    <TextField onFocus={() => setError('')} onChange={(e: any) => { getEmail(e.target.value) }} label='Email' required sx={{
                        ".MuiInputBase-input": {
                            border: "none"
                        },
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"

                    }} ></TextField>
                    <TextField type='password' onFocus={() => setError('')} onChange={(e: any) => { getPwd(e.target.value) }} label="Mật khẩu" required sx={{
                        ".MuiInputBase-input": {
                            border: "none"
                        },
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"

                    }} ></TextField>
                    <Box>
                        <FormLabel>Nguyện vọng của bạn khi đến với chương trình</FormLabel>
                        <Textarea minRows={4} onChange={(e: any) => { localStorage.setItem('nv', e.target.value); }} required sx={{
                            ".MuiInputBase-input": {
                                border: "none"
                            },
                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"

                        }} ></Textarea>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        // gridTemplateColumns: "auto 1fr",
                        gap: "10px",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <div />
                        <Box onClick={() => {
                            router.push('/signUp')
                        }} sx={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            cursor: "pointer",
                        }}>
                            <Typography>Tạo tài khoản </Typography>
                            <EastIcon sx={{
                                color: "#DB3022"
                            }} />
                        </Box>
                    </Box>
                    <Button onClick={() => {
                        if (localStorage.getItem('nv')) {
                            setShowSpinner(old => old = !old)
                            axios.post(`${process.env.API_URL}/api/Auth/login`, {
                                userName: email,
                                password: pwd
                            })
                                .then((res: any) => {
                                    const cookies = new Cookies()
                                    cookies.set('auth_token', res.data.auth_token)
                                    localStorage.setItem('auth_token', res.data.auth_token)
                                    localStorage.setItem('loggedInUser', JSON.stringify(jwtDecode(res.data.auth_token)));
                                    router.push("/home")
                                })
                                .catch((err: any) => {
                                    setShowSpinner(old => old = !old)
                                    setError(err.response.data.login_failure[0])
                                })
                        }
                        else setError('Hãy điền nguyện vọng của bạn')
                    }} type='submit' value='' sx={{
                        ".MuiInputBase-input": {
                            border: "none"
                        },
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        background: "#DB3022",
                        color: "white",
                        fontSize: "15px",
                        fontWeight: "700",
                        padding: "15px",
                        borderRadius: "50px",
                        border: "solid 2px #DB3022",
                        ":hover": {
                            color: "#DB3022"
                        },
                        textTransform: "capitalize",
                    }} >Đăng nhập</Button>
                </FormControl>
                :
                <Box>
                    <SyncLoader color="#DB3022" />
                </Box>
            }
        </Box >
    )
}