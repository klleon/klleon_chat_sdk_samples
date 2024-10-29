import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    env: {
        SDK_KEY: process.env.SDK_KEY,
    },
};

export default nextConfig;