import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@lib/prisma'

const AssetsListAPI: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })

  if (!session || req.method !== 'GET') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  const { search, page, pageSize } = req.query

  const take = pageSize ? parseInt(pageSize as string) : 20
  const pageNo = page ? parseInt(page as string) : 1
  const skip = (pageNo - 1) * take

  let query = {}
  console.log(req.query)
  if (search) {
    query = {
      filename: { contains: search },
    }
  }

  console.log(query)
  const assets = await prisma.asset.findMany({
    where: {
      ...query,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take,
    skip,
  })
  // console.log(assets)
  return res.json(assets)
}

export default AssetsListAPI
