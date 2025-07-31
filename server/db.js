const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/worKaffeDB";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`🦆 DB WorKaffe working en: ${DB_URI}`);
  } catch (err) {
    console.error(`😞 Error: ${err.message}`);
    process.exit(1); //sale del error
  }
};

connectDB();

module.exports = mongoose;
