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
			res.json(makePairs(people, 5));
		});
	});

	app.post('/api/pairs/create', function(req, res) {
		var documents = [];

		_.each(req.body, function(pair) {
			savePair(pair[0], pair[1]);
		});

		advanceWeek('IFTTT');

		res.send("success!");

	});

	function savePair(p1, p2) {
		if (p1 && p2) {
			updatePerson(p1._id, p2.email);
			updatePerson(p2._id, p1.email);
		} else if (p1) {
			updatePerson(p1._id, null);
		} else if (p2) {
			updatePerson(p2._id, null);
		}
	}

	function updatePerson(id, email, callback) {
		Person.findOneAndUpdate(
    {_id: id},
    {$push: {pairs: email}},
    {safe: true, upsert: true},
    function(err, model) {
    		if (err) console.log(err);
        if (callback) callback();
    });
	}

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


	function advanceWeek(orgName, callback) {
		Organization.findOneAndUpdate({name : orgName}, {$inc: {weeks: 1}}, function(err, org) {
			if (err) console.error(err);

			if (callback) callback();
		});
	}

	function makePairs(people, passes) {
		var leftovers = [];
		var pairs = [];
		while (people.length > 0) {
			people = sortNeediest(people);
			var toPair = people.pop();

			// console.log("PAIRING: ", toPair.email);


			var teammates = findTeammates(toPair, people);
			teammates = sortNeediest(teammates);

			var teammate = findBestTeammate(toPair, teammates);
			while (!(_.isEmpty(teammates)) &&
			       lastWeek(toPair, teammate)) {
				teammate = teammates.pop();
			}

			if (_.isEmpty(teammates)) {
				// console.log("EMPTY");
				leftovers.push(toPair);
			} else {
				// console.log("BEST TEAMMATE:", teammate);
				pairs.push([toPair, teammate]);
				people = _.without(people, teammate);
			}
		}

		leftovers = sortNeediest(leftovers);

		if (leftovers.length > 0) {
			if (passes > 0) {
				var rest = makePairs(leftovers, passes - 1);
			} else {
				var rest = dumbPairs(leftovers);
			}
		}

		return _.union(pairs, rest);
	}


	function lastWeek(person1, person2) {
		return _.last(person1.pairs) == person2.email;
	}

	function findBestTeammate(person, teammates) {
		if (_.isEmpty(teammates)) return null;

		return  _.max(teammates, function(tm) {
			return weeksSinceLastDate(person, tm);
		});
	}

	function sortNeediest(people) {
		console.log("SORTING");
		return _.sortBy(people, function(person) {
			return chanceToBePicked(person, people);
		});
	}

	function chanceToBePicked(person, people) {
		var teammates = findTeammates(person, people);

		//Last time w/currently free teammate
		var lrft = _.max(teammates, function(p) {
			return weeksSinceLastDate(person, p);
		});
		lrft = weeksSinceLastDate(person, lrft);

		var score = (lrft - teammates.length + missedDates(person));
		console.log(person.email, score);
		return 0 - score;
	}

	function weeksSinceLastDate(p1, p2, weeks) {
		var totalWeeks = weeks || p1.pairs.length;
		if (p2.pairs.length !== p1.pairs.length) {
			console.error("THERE IS A PROBLEM!");
		}
		var lastDate = _.lastIndexOf(p1.pairs, p2.email);
		return totalWeeks - lastDate;
	}

	function findTeammates(person, people) {
		var teammates = _.filter(people, function(person2) {
			return teamsMatch(person, person2);
		});
		return teammates;
	}

	function teamsMatch(p1, p2) {
		return _.intersection(p1.teams, p2.teams).length > 0;
	}

	function missedDates(person) {
		return _.filter(person.pairs, function(pair) {
			return !!pair;
		}).length;
	}


	function dumbPairs(people) {
		var pairs = [];
		people = _.shuffle(people)
		if (people.length % 2 === 1) {
			pairs.push([people[0], null]);
			people = _.without(people, people[0]);
		}

		while (people.length > 1) {
			pairs.push([people.pop(), people.pop()]);
		}

		return pairs;
	}

};
