import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@lib/prisma'

const AssetDeleteAPI: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })

  if (!session || req.method !== 'DELETE') {
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

  if (asset?.User?.email !== session?.user?.email) {
    return res.status(403).json({ message: 'Forbidden - Cannot delete item' })
  }

  await prisma.asset.delete({
    where: {
      assetId: asset?.assetId,
    },
  })

  return res.json({ message: 'Delete success' })
}

export default AssetDeleteAPI
