const dbConnect = require('../database/'); // Import dbConnect.js

const Util= {};
Util.getModel= async function (dbName, schema, modelName) {
  const connection = await dbConnect(dbName);
  return connection.model(modelName, schema);
}

module.exports= Util
