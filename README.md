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
13. Session manegement

<br>


## :hammer_and_wrench: Requirements for run project
1. Docker
2. PostgreSql image
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
5. In the root folder of project you can find a config file named .env.
6. Configure file to your needs or just use the default settings.
7. In the server folder, you can find .env file that contains the PostgreSql connection string. Change its value according to your configuration.
8. To start the application just use the command below:
```bash
docker compose up -d
```
8. After successful building go to http://localhost:8080 (with default settings).
