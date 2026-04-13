import db from './connection.ts'
import { TradieData, Tradie } from '../../models/tradie.ts'

export async function getTradieByAuth0Id(auth0Id: string) {
  const tradie = await db('tradies').where({ auth0_id: auth0Id }).first()
  return tradie as Tradie
}

export async function addTradie({ auth0Id, name }: TradieData) {
  const [newTradie] = await db('tradies')
    .insert({ auth0_id: auth0Id, name })
    .returning('*')
  return newTradie as Tradie
}
