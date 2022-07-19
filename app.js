document.addEventListener("DOMContentLoaded", function () {
  // DOM variables
  const $Word = $(".randomWord");
  const input = document.querySelector(".input");
  const $Score = $(".score");
  const $Stage = $(".stage");
  const $Timer = $(".timer");
  const $addTimer = $(".addTimer");
  const $Modal = $(".Modal");
  const $ModalCont = $(".Modal-cont");
  const $Btn = $(".button");
  const $ScoreMatch = $(".ScoreMatch");
  const $StageMatch = $(".StageMatch");

  const Words = [
    "console",
    "hello",
    "exe",
    "java",
    "becalm",
    "dapper",
    "amazon",
    "ebay",
    "gilt",
    "function",
    "batumi",
    "jambazi",
    "congrats",
    "order",
    "velocity",
    "unity",
    "javascript",
    "programming",
    "programmer",
    "mario",
    "resident",
    "chemi colis daqalebi",
    "spiderman",
    "github",
    "house",
    "minecraft",
    "vashaka",
    "saba",
    "macBook",
    "lenovo",
    "audio",
    "game",
    "Game Over",
    "git",
    "sourcetree",
    "barnyard",
    "cartoons",
    "georgia",
    "comaia",
    "samp",
    "Warzone",
    "samp",
    "online",
    "coding",
    "python",
    "FaceBoOk",
    "0001100111230",
    "deltatime",
    "pornhub",
    "lana rhoades",
    "Chicken",
    "xachapuri",
    "Xinkali",
    "gocha",
    "butka",
    "samsung",
    "XiAoMi",
    "nokia",
    "iphone",
    "tekla",
    "primehouse",
    "nazgaidze",
    "badri",
    "gela",
    "tyemali",
    "temo",
    "liza",
    "c sharp",
    "leqsikoni",
    "abdula",
    "Mia khalifa",
    "ganabi",
  ];

  // local variables
  let Score = 0;
  let Timer = 10;
  let timerInterval = 1000;
  let addTimer = 15;
  let Stage = 0;
  let musicInterval = 0.5;

  // Inner Text
  $Timer.html(Timer + "s");
  $addTimer.html("+" + addTimer);
  $Score.html("Score " + Score);
  $Stage.html("Stage " + Stage);

  // Audio
  const bgMusic = new Audio("/sounds/bgmusic.mp3");
  const countMusic = new Audio("/sounds/score.mp3");
  const loseMusic = new Audio("/sounds/lose.mp3");
  const stageMusic = new Audio("/sounds/count.mp3");

  $Btn.on("click", function () {
    document.location = "/";
  });

  const interval = setInterval(startTimer, timerInterval);
  // Start Timer
  function startTimer() {
    Timer--;
    bgMusic.play();
    bgMusic.playbackRate = musicInterval;
    $Timer.html(Timer + "s");
    if (Timer < 15) {
      $Timer.addClass("loseTimer");
    } else {
      $Timer.removeClass("loseTimer");
    }

    if (Timer === 0) {
      $Modal.addClass("enabledModal");
      $ModalCont.addClass("Modal-cont-enabled");
      $Timer.css({ display: "none" });
      $ScoreMatch.html("Your Score is " + Score);
      $StageMatch.html("Your Stage is " + Stage);
      GameOver();
    }
  }

  function addStage() {
    // Sound On Stage Increment
    stageMusic.play();
    musicInterval += 0.15;
    console.log(musicInterval);
    Stage++;
    $Stage.addClass("addScore");

    setTimeout(function () {
      $Stage.removeClass("addScore");
    }, 600);
    $Stage.html("Stage " + Stage);
    timerInterval -= 100;
    console.log(timerInterval);
    setInterval(startTimer, timerInterval);
  }

  function addScore() {
    countMusic.play();
    Score++;
    $Score.addClass("addScore");

    setTimeout(function () {
      $Score.removeClass("addScore");
    }, 600);

    // Add Stage function called
    if (Score % 10 === 0) {
      addStage();
    }
  }

  function GameOver() {
    bgMusic.pause();
    loseMusic.play();
    clearInterval(interval);
  }

  input.addEventListener("keyup", function (e) {
    let randomWord = Words[Math.floor(Math.random() * Words.length)];

    if (e.target.value === $Word.text()) {
      $Word.html(randomWord);
      input.value = "";
      addScore();
      $Score.html("Score " + Score);
      console.log(Score);
      Timer += addTimer;
      $addTimer.addClass("enabled");

      //   if (Score % 10 === 0) {
      //     Stage++;
      //     $Stage.html("Stage " + Stage);
      //   }

      setTimeout(() => {
        $addTimer.removeClass("enabled");
      }, 600);
    }
  });
});
