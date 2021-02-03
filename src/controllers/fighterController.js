import Fighter from '@/models/Fighter'

//
//
//
export const getFighters = async (req, res) => {
  try {
    const fighters = await Fighter.find({})

    res.status(200).json({ success: true, data: fighters, user: req.user })
  } catch (error) {}
}
