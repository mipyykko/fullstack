const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  req.token = null

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7)
  }

  next()
}

module.exports = {
  tokenExtractor
}