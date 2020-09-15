import faunadb from 'faunadb'
import getId from './utils/getId'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (session, context, callback) => {
  const data = JSON.parse(session.body)
  const id = getId(session.path)
  // console.log(`Function 'session-update' invoked. update id: ${id}`)
  return client.query(q.Update(q.Ref(`classes/session/${id}`), {data}))
    .then((response) => {
      // console.log('success', response)
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    }).catch((error) => {
      // console.log('error', error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
}
