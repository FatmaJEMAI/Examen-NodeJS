const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const personneSchema = new Schema(
    {
        id: String,
        nom: String,
        age: Number,
        email: String,
        moyenne :Number,
     

    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("etuduant", personneSchema);