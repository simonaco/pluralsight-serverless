const MongoClient = require('mongodb').MongoClient;
const auth = require('../shared/index');
module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  MongoClient.connect(
    process.env.CosmosDBURL,
    { auth: auth },
    (err, database) => {
      if (err) throw err;
      const db = database.db('admin');
      const hero = ({ id, name, saying } = req.body);
      db
        .collection('Heroes')
        .insertOne(
          { id: hero.id, name: hero.name, saying: hero.saying },
          (err, result) => {
            if (err) throw err;
            context.res = {
              body: hero
            };
            database.close();
            context.done();
          }
        );
    }
  );
};
