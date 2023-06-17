/** @type {import('next').NextConfig} */

const protocol = {
    "development" : "http",
    "production" : "https"
}

const hostname = {
    "development" : "localhost",
    "production" : "images.aromasdutyfree.com"
}

const port = {
    "development" : "3001",
    "production" : ""
}

const environment = "development";

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: protocol[environment],
                hostname: hostname[environment],
                port: port[environment],
            },
        ]
    },
}

module.exports = nextConfig
