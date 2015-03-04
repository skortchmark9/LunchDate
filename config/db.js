var mongoLocation = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL
|| 'mongodb://localhost/test';


module.exports = {
	url : mongoLocation;
}
