const MongoClient = require("mongodb").MongoClient;
const settings = require("./mongoSettings");
const mongoConfig = settings.mongoConfig;

let fullMongoUrl = `${mongoConfig.serverUrl}${mongoConfig.database}`;
console.log(fullMongoUrl)
let _connection = undefined;

let connectDb = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(fullMongoUrl);
  }

  return _connection;
};



module.exports = connectDb;