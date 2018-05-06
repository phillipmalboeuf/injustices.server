const express = require('express')
import { Application, Request, Response, NextFunction } from 'express'
import * as bodyparser from 'body-parser'

import { CONF } from '../config'


export const server: Application = express()
server.use(bodyparser.json())

server.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')
  res.header('Access-Control-Allow-Origin', '*')
  next()
})



require('./models')


server.get('/', (req: Request, res: Response) => {
  return res.send('HI!')
})



const port = process.env.PORT || 8889
server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});