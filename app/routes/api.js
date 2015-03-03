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
			res.json(people);
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

	app.get('/api/pairs', function(req, res) {
		Person.find(function(err, people) {
			if (err) {
				res.send(err);
			}
			res.json(dumbPairs(people));
		});
	});

	function teamsMatch(p1, p2) {
		return _.intersection(p1.teams, p2.teams).length > 0;
	}

	function findTeammates(person, people) {
		var teammates = _.filter(people, function(person2) {
			return teamsMatch(person, person2);
		})
		console.log(teammates);
		return teammates;
	}

	function dumbPairs(people) {
		var pairs = [];
		if (people.length % 2 === 1) {
			pairs.push([people.pop(), null]);
		}

		while (people.length > 1) {
			pairs.push([people.pop(), people.pop()]);
		}

		return pairs;
	}

	function makeTeamPair(people) {
		var current = people.pop();
		var teammates = findTeammates(current, people);
		var teammate = null;
		if (teammates.length > 0) {
			teammate = teammates[0];
		}

		var pair = [];

		if (teammate) {
			var numPeople = people.length;
			people = _.without(people, teammate);
			if (numPeople == people.length) {
				console.error("WITHOUT DOESN'T WORK");
			}
			pair = [current, teammate];
		} else {
			return false;
		}
	}


};
