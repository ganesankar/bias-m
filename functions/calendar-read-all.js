import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (calendar, context, callback) => {
  // console.log('Function `calendar-read-all` invoked')
  return client.query(q.Paginate(q.Match(q.Ref('indexes/all_calendar'))))
    .then((response) => {
      const calendarRefs = response.data
      // console.log('Todo refs', calendarRefs)
      // console.log(`${calendarRefs.length} calendars found`)
      // create new query out of calendar refs. http://bit.ly/2LG3MLg
      const getAllTodoDataQuery = calendarRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllTodoDataQuery).then((ret) => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(ret)
        })
      })
    }).catch((error) => {
      // console.log('error', error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
}
