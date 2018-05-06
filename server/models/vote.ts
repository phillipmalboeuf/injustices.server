import { ObjectId } from 'mongodb'
import Model from './_model'
import People from './people'

export default class Vote extends Model {
  static collection = 'votes'
}