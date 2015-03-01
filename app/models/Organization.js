// grab the mongoose module
var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Organization', {
  name : String,
  weeks : Number,
  people : [mongoose.Schema.Types.ObjectId]
});
