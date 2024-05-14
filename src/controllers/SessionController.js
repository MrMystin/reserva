/*
  index (listAll): listagem de sessões
  store (add): criar uma sessão
  show (list): quando queremos listar uma unica sessão
  update: quando queremos alterar alguma sessão
  destroy (delete): quando queremos deletar uma sessão
*/

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
      user = await User.create({ email })
    }
  }
}

export default new SessionController()