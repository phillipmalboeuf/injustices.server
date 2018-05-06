
import { randomPassword, hashPassword } from '../helpers/encryption'
import { ObjectId } from 'mongodb'

import Model from './_model'
import People from './people'

export default class Session extends Model {
  static collection = 'sessions'

  static preprocess(data) {
    return super.preprocess({
      ...data
    })
  }

  static postprocess(data) {
    return super.postprocess({
      ...data
    })
  }

  static endpoints() {
    return [
      {
        method: 'POST',
        endpoint: `/${this.collection}`,
        function: req => this.create(req.body)
      },
      {
        method: 'GET',
        endpoint: `/${this.collection}/:id`,
        function: req => this.get(req.params.id)
      }
    ]
  }

  static create(data) {

    return People.get_where({email: data.email}).then(people => {
      if (people && people.password === hashPassword(data.password, people.salt).password) {
        const secret = randomPassword()
        const hash = hashPassword(secret)

        return super.create({
          secret_hash_salt: hash.salt,
          secret_hash: hash.password,
          people_id: people._id
        }).then(session => ({
          _id: session._id,
          secret: secret,
          people_id: people._id
        }))
      }
        
    })

  }
}