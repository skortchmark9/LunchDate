module.exports = function(app, Todo) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	app.get('/api/todos', function(req, res) {
		Todo.find(function(err, todos) {
			if (err) {
				res.send(err);
			}
			res.json(todos);
		});
	});

	app.post('/api/submitPeople', function(req, res) {
		console.log(req.body);
		res.send("YOU DID IT!");
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
