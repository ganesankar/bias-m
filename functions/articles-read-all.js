import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (article, context, callback) => {
  // console.log('Function `article-read-all` invoked')
  return client.query(q.Paginate(q.Match(q.Ref('indexes/all_articles'))))
    .then((response) => {
      const articleRefs = response.data
      // console.log('Todo refs', articleRefs)
      // console.log(`${articleRefs.length} articles found`)
      // create new query out of article refs. http://bit.ly/2LG3MLg
      const getAllTodoDataQuery = articleRefs.map((ref) => {
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
