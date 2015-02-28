// grab the mongoose module
var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
module.organization = mongoose.model('Organization', {
  name : String,
  week : Number,
  people : [mongoose.Schema.Types.ObjectId]
});
