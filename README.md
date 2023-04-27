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
4. In the root folder of project you can find a config file named .env.
5. Configure file to your needs or just use the default settings.
6. In the server folder, you can find .env file that contains the PostgreSql connection string. Change its value according to your configuration.
7. Also in client > src > assets > js path you can find config.js file that contains API_URL and Token_Header_Key, If you have changed .env file, you must change config.js file accordingly.
8. To start the application just use the command below:
```bash
docker compose up -d
```
9. After successful building go to http://localhost:8080 (with default settings).
