const game = () => {
  let pScore = 0;
  let cScore = 0;
  let tScore = 0;

  const hitSound = new Audio("./sounds/swish.m4a");
  const winSound = new Audio("./sounds/cash.mp3");
  const lossSound = new Audio("./sounds/aww.mp3");

  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const scoreBoard = document.querySelector(".score");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");
    const tableContents = document.querySelector(".table-row");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      scoreBoard.classList.add("fadeIn");
      match.classList.add("fadeIn");
      tableContents.classList.add("fadeIn");
    });
  };

  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach((option) => {
      option.addEventListener("click", function () {
        hitSound.play();
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          //Here is where we call compare hands
          compareHands(this.textContent, computerChoice);
          //Update Images
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);
        //Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    // Variables for updateScore
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    const winScore = document.querySelector("#winner");
    const lossScore = document.querySelector("#loser");
    const tieScore = document.querySelector("#tied");

    // Score Board
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;

    // Score Table
    winScore.textContent = pScore;
    lossScore.textContent = cScore;
    tieScore.textContent = tScore;
  };

  const compareHands = (playerChoice, computerChoice) => {
    //Update Text
    const winner = document.querySelector(".winner");

    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie";
      tScore++;
      updateScore();
      return;
    }
    //Check for Rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "You are a Winner";
        pScore++;
        updateScore();
        winSound.play();
        return;
      } else {
        winner.textContent = "Sorry better luck next time";
        cScore++;
        updateScore();
        lossSound.play();
        return;
      }
    }
    //Check for Paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Sorry better luck next time";
        cScore++;
        updateScore();
        lossSound.play();
        return;
      } else {
        winner.textContent = "You are a Winner";
        pScore++;
        updateScore();
        winSound.play();
        return;
      }
    }
    //Check for Scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Sorry better luck next time";
        cScore++;
        updateScore();
        lossSound.play();
        return;
      } else {
        winner.textContent = "You are a Winner";
        pScore++;
        updateScore();
        winSound.play();
        return;
      }
    }
  };

  function tryAgain() {
    const nextRound = document.getElementById("next-round");

    //Set the hands to rock again
    nextRound.addEventListener("click", () => {
      const playerHand = document.querySelector(".player-hand");
      const computerHand = document.querySelector(".computer-hand");

      playerHand.src = `./assets/rock.png`;
      computerHand.src = `./assets/rock.png`;
    });
  }

  //Calling all the inner functions
  startGame();
  playMatch();
  tryAgain();
};

//start the game function
game();
