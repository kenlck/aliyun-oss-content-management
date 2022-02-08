This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Tech
1. NextJS
2. Prisma.IO
3. Next Auth
4. TailwindCSS
5. SWR
6. [ali-oss](https://github.com/ali-sdk/ali-oss)

## Getting Started

1. Create an account at OSS Website. [Instruction](https://github.com/ali-sdk/ali-oss#create-account)
2. Setup up the bucket to allow CORS. [Instruction](https://github.com/ali-sdk/ali-oss#bucket-setup)
3. Copy .env file and update value accordingly
```bash
cp .env.example .env
```
4. Run migration for database
```bash
npx prisma migrate deploy
```
5. Run server
```bash
yarn dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
