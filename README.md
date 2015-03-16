# HunaJS
HunaJS is a servie for collecting data from your applications.

##API Endpoints

###Users

####Create
	curl -i -X POST -d 'name=Theo de Wit' http://localhost:3000/user
	curl -i -X POST -d 'name=Jos van de Parre' http://localhost:3000/user
####Retrieve
	curl -i -X GET http://localhost:3000/user
	curl -i -X GET http://localhost:3000/user/1
####Update
	curl -i -X PUT -d 'name=Joe' http://localhost:3000/user/1
####Delete
	curl -i -X DELETE http://localhost:3000/user/1
