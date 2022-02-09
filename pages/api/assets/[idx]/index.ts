import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@lib/prisma'

const AssetsListAPI: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })

  if (!session || req.method !== 'GET') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  const { idx } = req.query

  const asset = await prisma.asset.findFirst({
    where: {
      assetId: idx as string,
    },
    include: {
      User: true,
    },
  })

  return res.json(asset)
}

export default AssetsListAPI
