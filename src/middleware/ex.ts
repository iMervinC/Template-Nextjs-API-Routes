import { getSession } from 'next-auth/client'

export const ex = async (req, res, next) => {
  try {
    const session = await getSession({ req })

    req.user = session.user
    next()
  } catch (error) {}
}
