import * as crypto from 'crypto'

import { Request, Response } from 'express'
import { MongoClient } from 'mongodb'
import { CONF } from '../../config'

import { server } from '../server'

import People from './people'
import Session from './session'
import Case from './case'
import Vote from './vote'

MongoClient.connect(CONF('MONGO_URI')).then(client => {
  const db = client.db(CONF('MONGO_DB'))
  const models = [People, Session, Case, Vote]

  models.forEach(model => {
    model.db = db
    model.endpoints().forEach(endpoint => server[endpoint.method.toLowerCase()](
      endpoint.endpoint,
      (req: Request, res: Response) => endpoint.function(req).then((response: Response) => res.json(response))
    ))
  })
})