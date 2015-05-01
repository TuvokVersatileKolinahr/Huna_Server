# HunaJS
HunaJS is a service for collecting data from your javascript fromtend applications.

##API Endpoints
The Huna API is running on a generic endpoint: `/api/`

There are three main endpoints:

###**Users**

####Create
	curl -i -X POST -d 'name=Theo de Wit' http://localhost:1337/user
	curl -i -X POST -d 'name=Jos van de Parre' http://localhost:1337/user
####Retrieve
	curl -i -X GET http://localhost:1337/user
	curl -i -X GET http://localhost:1337/user/1
####Update
	curl -i -X PUT -d 'name=Joe' http://localhost:1337/user/1
####Delete
	curl -i -X DELETE http://localhost:1337/user/1

###**Hosts**

####Create
  curl -i -X POST -d 'name=Theo de Wit' http://localhost:1337/user
  curl -i -X POST -d 'name=Jos van de Parre' http://localhost:1337/user
####Retrieve
  curl -i -X GET http://localhost:1337/user
  curl -i -X GET http://localhost:1337/user/1
####Update
  curl -i -X PUT -d 'name=Joe' http://localhost:1337/user/1
####Delete
  curl -i -X DELETE http://localhost:1337/user/1
