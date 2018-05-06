
import { hashPassword, encrypt, decrypt } from '../helpers/encryption'
import { ObjectId } from 'mongodb'

import Model from './_model'
import Case from './case'

export default class People extends Model {
  static collection = 'people'

  static preprocess(data) {
    return super.preprocess({
      ...data,
      ...(data.password
      ? hashPassword(data.password)
      : {})
    })
  }

  static postprocess(data) {
    return super.postprocess({
      ...data
    })
  }

  static cases(people_id: string) {
    return Case.list({people: new ObjectId(people_id)})
  }

  static endpoints() {
    return [
      ...super.endpoints(),
      {
        method: 'GET',
        endpoint: `/${this.collection}/:id/cases`,
        function: req => this.cases(req.params.id)
      }
    ]
  }
}