import jwt from 'jsonwebtoken'

class TokenService {

  constructor() {

  }

  issue(s) {

    if(typeof s == 'number') s = s.toString()
    if(typeof s != 'string') return false

    var token = jwt.sign(s, cert, {
      //expiresInMinutes: 1440 // 24 hours
    })

    return token

  }

  verify(token) {

    return jwt.verify(token, process.env.JWT_SECRET)

  }

}

export default TokenService
