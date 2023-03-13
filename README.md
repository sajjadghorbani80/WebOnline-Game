# :video_game: Web Online Game Project
This is the second version of the number guessing game. Improvements have been made in starting, restarting and ending the game. Now you can use the start button to guess the number and if you lose the game, you can restart or end the game. Upon starting the game, a random number from 0 to 100 is generated, which you are allowed to guess up to 5 times. If you guess the number correctly, you will be shown the message of winning, otherwise, after the chance is over, it will show the message that you have lost. Also, every time you guess the wrong number, your chances decrease by one number.

<br>

## :seedling: Development stages of this version
1. Use linter (ESLint)
2. Add comment
3. Add readme version 1
4. Use env for config
5. Use express router
6. Use dto
7. Implementation of start, restart, exit events
8. Validation of entries
9. Translation of messages and errors in front-end
10. Use form/submit for old browsers
11. UI improvements+
12. Add readme version 2
13. Merge each item after completion with branch v2



<br>

## :hammer_and_wrench: Requirements for run project
1. Node.js
2. npm
<br>

## :arrow_forward: Run the project

1. Download and install Node.js from [here](https://nodejs.org/en/download/)</li>
2. Clone the project in your systeam with this command in terminal:
```bash
git clone https://github.com/sajjadghorbani80/WebOnline-Game.git
```
3. Open Project folder in terminal
4. then go to the v2 brench:
```bash
git checkout v2
```
5. Open Project folder in terminal
6. In terminal go to server folder with this command:
```bash
cd server
```
7. Install dependencies with this command on terminal:</li>
```bash
npm i
```

8. Change server port (optional)<br>
By default, the server uses port 80. Follow the steps below to change it:<br>
8-1. Create a file named ".env" (Pay attention to its starting dot) in the server folder.<br>
8-2. Open it with a Text Editor, then paste the following value inside it and save:<br>

```bash
PORT=your arbitrary port
```
example:
```bash
PORT=3000
```
9. after that for run project write this command:
```bash
node app.js
```
10. Go to "localhost" or "localhost:your arbitrary port" and here we go:smiley::muscle:
