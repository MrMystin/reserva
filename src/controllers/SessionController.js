import * as Yup from 'yup'
import User from '../models/User'

class SessionController {
  async store(req,res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required()
    })
    const { email } = req.body
    if (!(await schema.isValid(req.body))) {
      return req.status(400).json({ error: 'Falha na validação'})
    }
    let user = await User.findOne({ email })
    if (!user) {
      console.log('d')
      user = await User.create({ email })
    }
    return res.json(user)
  }
}

export default new SessionController()