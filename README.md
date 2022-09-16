# Kanban app

## objective

Realization of this kanban type application. This app is the Back-end part. The objective is to put into practice the methods for designing a secure REST API.


## steps

- realization of a MCD / MLD
- definition of user stories
- creation of a wireframe
- creation of a server with express
- creation of the database with PostgreSQL
- use of sequelize especially for connection to the database and for the models
- API implementation
- Add security parameter
- Putting this API online
oo

** Installation **


1. Create a database (I personnaly used PostgreSQL)
2. Import tables from added sql file.


3. Create a .env file in the backend root, copy paste the following and change with your infos:
```
DB_HOST=localhost
DB_USERNAME=your_database_user
DB_PASSWORD=your_user_password
DB_DATABASE=your_db_name

PORT=theOneYouWant
```


BACK-END SETUP  

clone the repo

```
npm install
```

and run the server

```
npm run dev
```

happy developpement !