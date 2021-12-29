const mongoose = require("mongoose");
const { seedDB } = require("../seeds");

mongoose.promise = global.Promise;

// async function removeAllCollections() {
//   const collections = Object.keys(mongoose.connection.collections);
//   for (const collectionName of collections) {
//     const collection = mongoose.connection.collections[collectionName];
//     await collection.deleteMany();
//   }
// }

async function dropAll() {
  const collections = Object.keys(mongoose.connection.collections);

  for (const c of collections) {
    const collection = mongoose.connection.collections[c];

    try {
      await collection.drop();
    } catch (error) {
      if (error.message === "ns not found") return;
      if (error.message.includes("a background operation is currently running"))
        return;
      console.log(error.message);
    }
  }
}

module.exports = {
  setUpDB(dbName) {
    // connect to monoose
    beforeAll(async () => {
      const url = `mongodb://127.0.0.1/${dbName}`;
      mongoose.connect(url, { useNewUrlParser: true });
      await seedDB();
    });

    // afterEach(async () => {
    //   await removeAllCollections();
    // });

    // disconnect mongoose
    afterAll(async () => {
      await dropAll();
      await mongoose.connection.close();
    });
  },
};
