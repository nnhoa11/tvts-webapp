'use client'
import Image from 'next/image'
import recources from '@/recources'
import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import NoLocation from '../components/noLocation'
import background from '@/recources/background.png'
import CheckInApp from './checkInApp'
declare const window: any;
export default function Home() {

  const router = useRouter()
  const param = useSearchParams()
  const located = param.get('location')
  if (located)
    localStorage.setItem('location', located)

  useEffect(() => {
    // Your script or function to run when the component is mounted on the client side
    console.log('Script running on client load');

    // For example, if you want to load an external script
    const script = document.createElement('script');
    script.src = './check-browser.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup code if needed
      console.log('Cleanup code if needed');
    };
  }, []);


  if (located)
    return (
      <Box sx={{
        display: "grid",
        justifyItems: "center",
        gap: "30px",
        padding: "10px",
        height: "100vh"
      }}>
        <CheckInApp></CheckInApp>

        <Image alt='TVTS Logo' style={{
          width: "260px",
          height: "auto"
        }} src={recources.logo}></Image>
        <Image alt='Tập thể TVTS' src={recources.tvts}></Image>
        <Typography sx={{
          textAlign: "justify"
        }}>Chào mừng bạn đến với hành trình chọn nghề, ngành, trường của chương trình <b>“Ngày hội Tư vấn tuyển sinh - Hướng nghiệp Quảng Trị 2024”</b>. Để giải cứu bản thân ra khỏi mê cung ngành nghề, bạn hãy truy tìm ít nhất 3 chìa khóa là 3 anh chị quét mã QR code tại 3/5 khu vực chính trong ngày hội và nhận ngay kho báu là hơn 10.000 quà tặng tại khu vực check-out.</Typography>
        <Button onClick={() => {
          router.push('/signIn')
        }} sx={{
          width: "80%",
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
          height: "fit-content"
        }} >BẮT ĐẦU</Button>
      </Box>
    )
  else {
    return <NoLocation />
  }

}

