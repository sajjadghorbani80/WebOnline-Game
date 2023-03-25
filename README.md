# :video_game: Web Online Game Project
In previous versions, you could run the project by cloning it. But now you can use Docker for the process of creating, implementing, and running the program with the help of containers. Therefore, the goal of this version was to dockerize the project.

<br>

## :seedling: Development stages of this version
1. Install Docker
2. Create Docker file
3. Create Dockerignore
4. Create Image
5. Add to DockerHub


<br>

## :hammer_and_wrench: Requirements for run project
1. Node.js
2. npm
3. Docker (for run project with Docker)
<br>

## :arrow_forward: Run the project

<br>

### :dolphin: Run with Docker
1. install [docker](https://www.docker.com/)
2. run docker desktop
3. open cmd/terminal
4. pull project with this command:
```bash
docker run -dp 3000:80 sajjadr2001/webonline-game
```
Note: You can use any port instead of port 3000

5. Go to "localhost:your arbitrary port" and here we go:smiley::muscle:

<br><br>


### :green_square: Run with Nodejs
1. Download and install Node.js from [here](https://nodejs.org/en/download/)</li>
2. Clone the project in your system with this command in terminal:
```bash
git clone https://github.com/sajjadghorbani80/WebOnline-Game.git
```
3. Open Project folder in terminal
4. then go to the v3 brench:
```bash
git checkout v3
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
7-1. Create a file named ".env" (Pay attention to its starting dot) in the server folder.<br>
7-2. Open it with a Text Editor, then paste the following value inside it and save:<br>

```bash
PORT=your arbitrary port
```
example:
```bash
PORT=3000
```
8. after that for run project write this command:
```bash
node app.js
```
9. Go to "localhost" or "localhost:your arbitrary port" and here we go:smiley::muscle:
