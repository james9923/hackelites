

	const express = require('express'),
	      ejs = require('ejs'),
	      urlscan = require('urlscan-api')
	      fs = require('fs'),
          app = express();



	app.use(express.urlencoded({extended:true}));
	app.set('view engine', 'ejs');

	app.use(express.static("public"));


	app.get('/', (req, res) => {
			res.render('index');
	})

	app.post('/', (req, res) => {
			
			let r1,r2;

			let ml = req.body.mal;

			let apikey = "4fad6c49-8a12-4b48-831e-788e8a5a9dff";
			
		const result1 =	 new urlscan().submit(apikey, ml).then(function(submitoutput) {
				
				// console.log(submitoutput);

				 r1 = submitoutput.uuid;
				 r2 = submitoutput.message;
	
			})	


			setTimeout(()=> {
				res.render('process', {r1});
			}, 15000);
			
	})


	app.get('/next', (req, res) => {
			res.render('process');
	})

	app.get('/details/:uid', (req, res) => {


			let uuid = req.params.uid;

			let overall, uscan, engines, links;

			new urlscan().result(uuid).then(function(resultoutput) {

				overall = resultoutput.verdicts.overall;
				uscan = resultoutput.verdicts.urlscan;
			    engines = resultoutput.verdicts.engines;
				links = resultoutput.data.links;
			})

			setTimeout(()=> {
				res.render('result', {overall, uscan,engines,links});
			}, 20000);


	})


	app.listen(5000, ()=> console.log('Server started on port 5000'))