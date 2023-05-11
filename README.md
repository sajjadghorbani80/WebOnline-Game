# :video_game: Web Online Game Project
The Web Online Game is an exercise project to learn programming with the JavaScript stack and related technologies. In this project, the user can play a game (Guess Number Game) and earn points after registering and entering the site.

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
4. Go to Client folder
```bash
cd client
```
5. Install requirements
```bash
npm i
```
6. Compile TS files to JS
```bash
npx tsc
```
7. Go to Server floder
```bash
cd ../server
```
8. Install requirements
```bash
npm i
```
9. Compile TS files to JS
```bash
npx tsc
```
10. In the root folder of project you can find a config file named .env.
11. Configure file to your needs or just use the default settings.
12. In the server folder, you can find .env file that contains the PostgreSql connection string. Change its value according to your configuration.
13. Also in client > src > assets > js path you can find config.js file that contains API_URL and Token_Header_Key, If you have changed .env file, you must change config.js file accordingly.
14. To start the application just use the command below:
```bash
docker compose up -d
```
15. Intialize DataBase
15.1. Create DataBase
```bash
npx prisma db push
```
15.2. Add sample Data
```bash
npx prisma db seed
```
16. After successful building go to http://localhost:8080 (with default settings).
