// grab the mongoose module
var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Person', {
	email : {type : String, lowercase : true },
  team : [{type : String, lowercase : true }],
  pairs : [mongoose.Schema.Types.ObjectId]
});
