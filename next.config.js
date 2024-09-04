/** @type {import('next').NextConfig} */
const nextConfig = {

    output: "standalone",

    env: {
        // API_URL: "http://localhost:5000"
        API_URL: "https://api.hocgi.vn",
        PROFILE_API_URL :"https://api-profile.hocgi.vn"
    },
    images: {
        domains : ['prodhocgiblogstorage.blob.core.windows.net']
    }
}

//master key: LaAWCXssGO
module.exports = nextConfig
