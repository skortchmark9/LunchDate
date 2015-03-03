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
			res.json(makePairs(people));
		});
	});

	function makePairs(people) {
		people = sortNeediest(people);
		var pairs = [];
		if (people.length % 2 === 1) {
			pairs.push([_.first(people), null]);
			people = _.rest(people);
		}

		var leftovers = [];

		while (people.length > 0) {
			var current = people.pop();
			var teammates = findTeammates(current, people);

			if (_.isEmpty(teammates)) {
				leftovers.push(current);
			} else {
				pairs.push([current, findBestTeammate(current, teammates)]);
			}
		}

		console.log(leftovers);
		return pairs;



	}

	function weeksSinceLastDate(p1, p2, weeks) {
		var totalWeeks = weeks || p1.pairs.length;
		if (p2.pairs.length !== p1.pairs.length) {
			console.error("THERE IS A PROBLEM!");
		}
		return totalWeeks - _.lastIndexOf(p1.pairs, p2.email);
	}

	function findTeammates(person, people) {
		var teammates = _.filter(people, function(person2) {
			return teamsMatch(person, person2);
		});
		return teammates;
	}

	function findBestTeammate(person, teammates) {
		if (_.isEmpty(teammates)) return null;

		return _.max(teammates, function(tm) {
			return weeksSinceLastDate(person, tm);
		});
	}

	function teamsMatch(p1, p2) {
		return _.intersection(p1.teams, p2.teams).length > 0;
	}

	function missedDates(person) {
		return _.filter(person.pairs, function(pair) {
			return !!pair;
		}).length;
	}

	function sortNeediest(people) {
		return _.sortBy(people, missedDates);
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

};
