const admin = require("firebase-admin");
const serviceAccount = require("./ecommerce-bd54d-firebase-adminsdk-l7oar-4974a0a100.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ecommerce-bd54d.firebaseio.com'
});