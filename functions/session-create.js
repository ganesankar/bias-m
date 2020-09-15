import faunadb from "faunadb"; /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

/* export our lambda function as named "handler" export */
exports.handler = (session, context, callback) => {
  /* parse the string body into a useable JS object */

  const data = JSON.parse(session.body);

  // console.log('Function `session-create` invoked', data)
  const sessionItem = {
    data: data
  };

  return client
    .query(q.Paginate(q.Match(q.Ref("indexes/all_session"))))
    .then(response => {
      const sessionRefs = response.data;
      const sessionReds = [];
      console.log(" ");
      console.log("session");
      console.log(sessionRefs);

      const getAllTodoDataQuery = sessionRefs.map(ref => {
        console.log(" ret 0");
        console.log(q.Get(ref));
        return q.Get(ref);
      });
      // then query the refs
      client.query(getAllTodoDataQuery).then(ret => {
        console.log(" ret 1");

        if (ret.length > 0) {
          console.log(" ret 2");
          const firstlist = ret;
          const finalList = [];

          firstlist.forEach(function(item) {
            if (
              Number(item.data.googleID) == Number(sessionItem.data.googleID)
            ) {
              console.log("  id must be ", Object.values(item.ref)[0].id);
              const findId = Number(Object.values(item.ref)[0].id) || 0;
              console.log("item");
              // console.log(item.ref);

              if (findId > 0) {
                console.log(" ??", findId);
                const oldData = item.data;
                oldData.lastlogin = new Date().getTime() * 10000;
                const totalCont = oldData.total || 0;
                oldData.total = totalCont + 1;
                return client
                  .query(
                    q.Update(q.Ref(`classes/session/${findId}`), { oldData })
                  )
                  .then(response => {
                    console.log("update success", response);
                    return callback(null, {
                      statusCode: 200,
                      headers: {
                        "content-type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                      },
                      body: JSON.stringify(response)
                    });
                  })
                  .catch(error => {
                    console.log("updateerror", error);
                    return callback(null, {
                      statusCode: 400,
                      headers: {
                        "content-type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                      },
                      body: JSON.stringify(error)
                    });
                  });
              } else {
                console.log(" ");
                console.log("user not  found");
                sessionItem.data.firstlogin = new Date().getTime() * 10000;
                sessionItem.data.total == 0;
                return client
                  .query(q.Create(q.Ref("classes/session"), sessionItem))
                  .then(response => {
                    console.log("create success", response);
                    /* Success! return the response with statusCode 200 */
                    return callback(null, {
                      statusCode: 200,
                      headers: {
                        "content-type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                      },
                      body: JSON.stringify(response)
                    });
                  })
                  .catch(error => {
                    console.log("create error", error);
                    /* Error! return the error with statusCode 400 */
                    return callback(null, {
                      statusCode: 400,
                      headers: {
                        "content-type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                      },
                      body: JSON.stringify(error)
                    });
                  });
              }
            }
          });

          console.log("findId");
          console.log(findId);
        } else {
          console.log(" ");
          console.log("user not  found");
          sessionItem.data.firstlogin = new Date().getTime() * 10000;
          sessionItem.data.total == 0;
          return client
            .query(q.Create(q.Ref("classes/session"), sessionItem))
            .then(response => {
              console.log("create success", response);
              /* Success! return the response with statusCode 200 */
              return callback(null, {
                statusCode: 200,
                headers: {
                  "content-type": "application/json",
                  "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(response)
              });
            })
            .catch(error => {
              console.log("create error", error);
              /* Error! return the error with statusCode 400 */
              return callback(null, {
                statusCode: 400,
                headers: {
                  "content-type": "application/json",
                  "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(error)
              });
            });
        }
      });

      /* construct the fauna query */
    })
    .catch(error => {
      // console.log('error', error)
      return callback(null, {
        statusCode: 400,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(error)
      });
    });
};
