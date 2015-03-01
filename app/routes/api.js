var _              = require('underscore');
module.exports = function(app, Organization, Person) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	app.get('/api/people', function(req, res) {
		Person.find(function(err, people) {
			if (err) {
				res.send(err);
			}
		});
	});

	function mergePeople(people) {
		//If people get put in twice on different teams
		var peopleDict = _.reduce(people, function(unique, person){
			oldTeams = (person.email in unique) ? unique[person.email] : [];
			unique[person.email] = _.union(oldTeams, person.teams);
			return unique
		}, {});

		return _.map(peopleDict, function(value, key) {
			return {email : key, teams : value};
		});
	}

	app.post('/api/people', function(req, res) {
		var newPeople = mergePeople(req.body);

		Organization.findOne({name : 'IFTTT'}, function(err, org) {
			if (err) console.error(err);

			//Init array with null for previous weeks.
			var prevWeeks = _.map(new Array(org ? org.weeks : 0), function() {return null;});

			var documents = _.map(newPeople, function(person) {
				return new Person({
					email : person.email,
					teams : person.teams,
					pairs : prevWeeks
				});
			});
			Person.create(documents, function(err, people) {
				if (err) res.send("Could not create people");
				res.send("SUCCESS");
			});
		});
	});

	app.post('/api/todos', function(req, res) {
		console.log('hit route');

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

				// get and return all the todos after you create another
				Todo.find(function(err, todos) {
					if (err)
						res.send(err)
					res.json(todos);
				});
			});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		console.log('hit route');
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

					// get and return all the todos after you create another
					Todo.find(function(err, todos) {
						if (err)
							res.send(err)
						res.json(todos);
					});
				});
	});

};
