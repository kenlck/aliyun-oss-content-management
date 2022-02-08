import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@lib/prisma'

const CreateAssetsAPI: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })

  console.log(req.body)
  if (!session || req.method !== 'POST') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  const body = req.body
  await prisma.asset.create({
    data: {
      filename: body.filename,
      size: body.size,
      type: body.type,
      url: body.url,
      User: {
        connect: {
          email: session.user?.email as string,
        },
      },
    },
  })

  return res.json({ message: 'OK' })
}

export default CreateAssetsAPI
