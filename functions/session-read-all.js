import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (session, context, callback) => {
  // console.log('Function `session-read-all` invoked')
  return client.query(q.Paginate(q.Match(q.Ref('indexes/all_session'))))
    .then((response) => {
      const sessionRefs = response.data
      // console.log('Todo refs', sessionRefs)
      // console.log(`${sessionRefs.length} sessions found`)
      // create new query out of session refs. http://bit.ly/2LG3MLg
      const getAllTodoDataQuery = sessionRefs.map((ref) => {
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
