# hunaJS

HunaJS is a service for collecting data from your javascript fromtend applications.

## Development mode

First, make sure you've installed nodemon

	npm install -g nodemon

Right now we're not in production so the only way to run this is in development mode. Make sure you have mongodb running of provide configuration to run it elsewhere or configure a disk-db and start the server:

    nodemon -w api -w config

If you have mongo installed locally you can boot up the backend with gulp:

    gulp bakcend

will boot the local mongo (simply starts `mongod`).
If you just want to start the server you can use `gulp backend-server` to boot without starting mongo.

You can start the frontend with the following command:

    gulp start --dev

##API Endpoints
The Huna API is running on a generic endpoint: `/api/`

There are three main endpoints:

###**Users**

####Create
	curl -i -X POST -d 'name=Theo de Wit' http://localhost:1337/api/user
	curl -i -X POST -d 'name=Jos van de Parre' http://localhost:1337/api/user
####Retrieve
	curl -i -X GET http://localhost:1337/api/user
	curl -i -X GET http://localhost:1337/api/user/552e520f87c50bda647051e8
####Update
	curl -i -X PUT -d 'name=Joe Doe' http://localhost:1337/api/user/552e520f87c50bda647051e8
####Delete
	curl -i -X DELETE http://localhost:1337/api/user/552e520f87c50bda647051e8

###**Hosts**

####Create
	curl -i -X POST -d 'name=tuvok.nl' http://localhost:1337/api/host
	curl -i -X POST -d 'name=whatever.com' http://localhost:1337/api/host
####Retrieve
	curl -i -X GET http://localhost:1337/api/host
	curl -i -X GET http://localhost:1337/api/host/5533768de79e5dc33818d20a
####Update
	curl -i -X PUT -d 'name=Joe' http://localhost:1337/api/host/5533768de79e5dc33818d20a
####Delete
	curl -i -X DELETE http://localhost:1337/api/host/5533768de79e5dc33818d20a

###**Data**
	curl -i -X GET http://localhost:1337/api/data/forhost?name=elgervanboxtel.nl

For questions and suggestions you can find us @ [![Join the chat at https://gitter.im/TuvokVersatileKolinahr/Huna_Server](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/TuvokVersatileKolinahr/Huna_Server?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
