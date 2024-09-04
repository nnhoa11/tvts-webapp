'use client'
import recources from '../recources'
import { Box, Button, FormControl, Input, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import EastIcon from '@mui/icons-material/East';
import { useRouter } from 'next/navigation'
import SyncLoader from 'react-spinners/SyncLoader'
import Header from './header'

export default function Register(props: any) {
    const [email, getEmail] = useState<string>('')
    const [pwd, getPwd] = useState<string>('')
    const [phone, getPhoneNum] = useState<string>('')
    const [name, getName] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [bday, getBday] = useState<any>()
    const [showSpinner, setShowSpinner] = useState<boolean>(false)
    const registerClickHandler = async (e: any) => {
        if (pwd === "") setError('Vui lòng cung cấp đầy đủ các thông tin')
        else
            if (phone === "") setError('Vui lòng cung cấp đầy đủ các thông tin')
            else
                if (email === "") setError('Vui lòng cung cấp đầy đủ các thông tin')
                else
                    if (name === "") setError('Vui lòng cung cấp đầy đủ các thông tin')

        if (error === "") {
            await setShowSpinner(old => old = !old)
            axios.post(`${process.env.API_URL}/api/Accounts`, {
                email: email,
                password: pwd,
                fullName: name,
                phoneNumber: phone,
                birthDay: bday
            })
                .then(async (res: any) => {
                    await setShowSpinner(old => old = !old)
                    router.push('/signIn')
                })
                .catch(async (error: any) => {
                    await setShowSpinner(old => old = !old)
                    // console.log(error.response.data)

                    setError(error.response.data.DuplicateUserName[0])
                })
        }
    }
    const router = useRouter()
    return (
        <Box style={{
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
            {showSpinner ?
                <Box>
                    <SyncLoader color="#DB3022" />
                </Box>
                :
                <FormControl sx={{
                    gap: "30px",
                    width: "85vw",
                    textAlign: 'left',
                }}>
                    <TextField onChange={(e: any) => { getEmail(e.target.value) }} label='Email' required sx={{
                        ".MuiInputBase-input": {
                            border: "none"
                        },
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"

                    }} ></TextField>
                    <TextField type='password' onChange={(e: any) => { getPwd(e.target.value) }} label="Mật khẩu" required sx={{
                        ".MuiInputBase-input": {
                            border: "none"
                        },
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"

                    }} ></TextField>
                    <TextField type='password' onChange={(e: any) => { if (e.target.value !== pwd) setError('Mật khẩu nhập lại không giống'); else setError('') }} label="Nhập lại mật khẩu" required sx={{
                        ".MuiInputBase-input": {
                            border: "none"
                        },
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"

                    }} />
                    <TextField onChange={(e: any) => { getName(e.target.value) }} label="Họ và tên" required sx={{
                        ".MuiInputBase-input": {
                            border: "none"
                        },
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"

                    }} />
                    <TextField onChange={(e: any) => { getPhoneNum(e.target.value) }} label="Số điện thoại" required sx={{
                        ".MuiInputBase-input": {
                            border: "none"
                        },
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"

                    }} />
                    <Input type='date' onChange={(e: any) => { getBday(e.target.value) }} />
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px",
                        justifyItems: "end"
                    }}>
                        <div />
                        <Box onClick={() => {
                            router.push('/signIn')
                        }} sx={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            cursor: "pointer",
                        }}>
                            <Typography>Bạn đã có tài khoản?</Typography>
                            <EastIcon sx={{
                                color: "#DB3022"
                            }} />
                        </Box>
                    </Box>
                    <Typography color='error'>{error}</Typography>
                    <Button onClick={registerClickHandler} type='submit' value='' sx={{
                        ".MuiInputBase-input": {
                            border: "none"
                        },
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        background: "#DB3022",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "700",
                        padding: "10px",
                        borderRadius: "50px",
                        border: "solid 2px #DB3022",
                        ":hover": {
                            color: "#DB3022"
                        },
                        textTransform: "capitalize",
                    }} >Đăng kí</Button>
                </FormControl>
            }
        </Box >
    )
}