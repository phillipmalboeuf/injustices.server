import { randomPassword, encrypt, decrypt } from '../helpers/encryption'
import { ObjectId } from 'mongodb'

import Model from './_model'
import People from './people'
import Vote from './vote'

export default class Case extends Model {
  static collection = 'cases'

  static preprocess(data) {
    return super.preprocess(data)
  }

  static postprocess(data) {
    return super.postprocess(data)
  }

  static people(case_id: string) {
    return this.get(case_id).then(c => People.list({_id: {'$in': c.people}}))
  }

  static votes(case_id: string) {
    return Vote.list({case_id: new ObjectId(case_id)}, null)
  }

  static endpoints() {
    return [
      ...super.endpoints(),
      {
        method: 'GET',
        endpoint: `/${this.collection}/:id/people`,
        function: req => this.people(req.params.id)
      },
      {
        method: 'GET',
        endpoint: `/${this.collection}/:id/votes`,
        function: req => this.votes(req.params.id)
      }
    ]
  }
}