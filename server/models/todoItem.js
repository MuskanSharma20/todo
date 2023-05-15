const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
todoItem:{
    type:String,
    required:true
}
})
module.exports = mongoose.model("TodoItem", todoSchema);