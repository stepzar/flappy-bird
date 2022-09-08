document.addEventListener("DOMContentLoaded", () => {
    const bird = document.querySelector(".bird");
    const gameContainer = document.querySelector(".game-container");
    const ground = document.querySelector(".ground");

    let birdLeft = 200;
    let birdBottom = 500;
    let gravity = 2;
    let isGameOver = false;
    const gap = 500;

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + "px";
        bird.style.left = birdLeft + "px";
    }
    let timerGravityId = setInterval(startGame, 7);

    async function jump() {
        if (birdBottom < 600) {
            clearInterval(timerGravityId);
            birdBottom += 100;
            bird.style.bottom = birdBottom + "px";
            await new Promise(r => setTimeout(r, 20));
            timerGravityId = setInterval(startGame, 7);
        }
    }

    function controlJump(e) {
        if (e.keyCode === 32) {
            jump();
        }
    }

    document.addEventListener("keyup", controlJump);


    function generateObstacle() {
        let obstacleLeft = 440;
        let randomHeight = Math.random() * 150;
        let obstacleBottom = randomHeight;

        let obstacle = document.createElement("div");
        let topObstacle = document.createElement("div");
        obstacle.classList.add("obstacle");
        topObstacle.classList.add("top-obstacle");
        gameContainer.appendChild(obstacle);
        gameContainer.appendChild(topObstacle);

        obstacle.style.left = obstacleLeft + "px";
        topObstacle.style.left = obstacleLeft + "px";
        obstacle.style.bottom = obstacleBottom + "px";
        topObstacle.style.bottom = obstacleBottom + gap + "px";

        function moveObstacle() {
            obstacleLeft -= 3;
            obstacle.style.left = obstacleLeft + "px";
            topObstacle.style.left = obstacleLeft + "px";

            if (obstacleLeft <= -60) {
                clearInterval(timerMoveObstacleId);
                gameContainer.removeChild(obstacle);
                gameContainer.removeChild(topObstacle);
            }

            if (birdBottom <= 150 || (obstacleLeft > 200 && obstacleLeft <= 250) && (obstacleBottom + 300 >= birdBottom || birdBottom >= obstacleBottom + gap)) {
                gameOver();
            }

        }

        timerMoveObstacleId = setInterval(moveObstacle, 5);
        timerGameObstacleId = setTimeout(generateObstacle, 1000);
    }
    generateObstacle();

    function gameOver() {
        clearInterval(timerGravityId);
        clearInterval(timerGameObstacleId);
        clearInterval(timerMoveObstacleId)
        isGameOver = true;
        document.removeEventListener("keyup", controlJump)
    }
})