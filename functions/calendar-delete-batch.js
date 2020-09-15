import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (calendar, context, callback) => {
  const data = JSON.parse(calendar.body)
  // console.log('data', data)
  // console.log('Function `calendar-delete-batch` invoked', data.ids)
  // construct batch query from IDs
  const deleteAllCompletedTodoQuery = data.ids.map((id) => {
    return q.Delete(q.Ref(`classes/calendar/${id}`))
  })
  // Hit fauna with the query to delete the completed items
  return client.query(deleteAllCompletedTodoQuery)
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
