import createHandler from '@/middleware'
import { ex } from '@/middleware/ex'
import { getFighters } from '@/controllers/fighterController'

const handler = createHandler()

handler.get(ex, getFighters)

export default handler
