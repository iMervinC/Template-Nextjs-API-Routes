export const ex = (req, res, next) => {
  req.user = { name: 'mervin c' }
  next()
}
