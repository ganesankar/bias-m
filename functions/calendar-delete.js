import faunadb from 'faunadb'
import getId from './utils/getId'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (calendar, context, callback) => {
  const id = getId(calendar.path)
  // console.log(`Function 'calendar-delete' invoked. delete id: ${id}`)
  return client.query(q.Delete(q.Ref(`classes/calendar/${id}`)))
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
