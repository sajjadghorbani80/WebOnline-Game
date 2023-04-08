# :video_game: Web Online Game Project
In this version, the user section and project features have been added for them. Therefore, there was requires to add a database to the project. The chosen database is Postgres, which is implemented with the Prisma client ORM.

<br>

## :seedling: Development stages of this version
1. Create Sing up, login pages, reset password
2. User menu
3. Top player pages
4. Database design
5. Add postgre 
6. Docker compose
7. Prisma setup
8. Implement Prisma models
9. Writing the necessary APIs
10. Writing services and queries
11. Using jwt token 
12. Add readme version 4


<br>


## :hammer_and_wrench: Requirements for run project
1. Node.js
2. npm
3. Docker (for run project with Docker)
4. PostgreSql
<br>

## :arrow_forward: Run the project

<br>

### :dolphin: Run with Docker
1. install [docker](https://www.docker.com/)
2. run docker desktop
3. clone the repo 
```bash
git clone https://github.com/sajjadghorbani80/WebOnline-Game.git
```
4. then go to the V4 brench:
```bash
git checkout V4
```
5. In the root folder of project you can find a docker-compose.yml and in the server folder a config file .env.
6. Configure all files to your needs or just use the default settings.
7. To start the application just use the command below:
```bash
docker compose up -d
```
8. After successful building go to http://localhost:8080 (with default settings).



### :green_square: Run with Nodejs
1. Download and install Node.js from [here](https://nodejs.org/en/download/)</li>
2. Clone the project in your system with this command in terminal:
```bash
git clone https://github.com/sajjadghorbani80/WebOnline-Game.git
```
3. Open Project folder in terminal
4. then go to the V4 brench:
```bash
git checkout V4
```
5. In terminal go to server folder with this command:
```bash
cd server
```
6. Install dependencies with this command on terminal:</li>
```bash
npm i
```

7. Change server port (optional)<br>
By default, the server uses port 80. Follow the steps below to change it:<br>
7-1. in the server folder you can find a config file named ".env".<br>
7-2. Open it with a Text Editor, then paste the following value inside it and save:<br>

```bash
PORT=your arbitrary port
```
example:
```bash
PORT=3000
```
9. also, change the database address section in the .env file according to the specifications of your database
8. after that for run project write this command:
```bash
node app.js
```
10. use this command to create tables in the database
```bash
cd server
npx prisma db push
```
9. Go to "localhost" or "localhost:your arbitrary port" and here we go:smiley::muscle:
