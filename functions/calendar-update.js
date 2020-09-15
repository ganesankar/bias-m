import faunadb from 'faunadb'
import getId from './utils/getId'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (calendar, context, callback) => {
  const data = JSON.parse(calendar.body)
  const id = getId(calendar.path)
  // console.log(`Function 'calendar-update' invoked. update id: ${id}`)
  return client.query(q.Update(q.Ref(`classes/calendar/${id}`), {data}))
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
