var pass;
document.getElementById("ok").onclick = function () {
  let char = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "&",
    "*",
    "(",
    ")",
    "/",
    "|",
    ",",
    "'",
    ":",
    ";",
  ];
  let nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let alphas = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let Alphas = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  password(char, nums, alphas, Alphas);

  function password(char, nums, alphas, Alphas) {
    function randomChar(char) {
      let lengthc = char.length;
      let rchari = Math.floor(Math.random() * lengthc);
      let rchar = char[rchari];
      return rchar;
    }

    function randomNum(nums) {
      let lengthn = nums.length;
      let rnumi = Math.floor(Math.random() * lengthn);
      let rnum = nums[rnumi];
      return rnum;
    }

    function randomAlpha(alphas) {
      let lengtha = alphas.length;
      let ralphai = Math.floor(Math.random() * lengtha);
      let ralpha = alphas[ralphai];
      return ralpha;
    }

    function randomAlpha(Alphas) {
      let lengthA = Alphas.length;
      let rAlphai = Math.floor(Math.random() * lengthA);
      let rAlpha = Alphas[rAlphai];
      return rAlpha;
    }

    pass =
      randomAlpha(alphas) +
      randomAlpha(alphas) +
      randomAlpha(Alphas) +
      randomAlpha(alphas) +
      randomAlpha(alphas) +
      randomChar(char) +
      randomChar(char) +
      randomNum(nums) +
      randomNum(nums);

    document.getElementById("display").innerHTML = `${pass}`;
    document.getElementById("ok").innerHTML = "Generate new password";
    document.getElementById("ok").style.marginTop = "20px";
    document.getElementById("ok").style.fontSize = "1rem";
    document.getElementById("display").style.display = "flex";
    document.getElementById("display").style.textAlign = "center";
    document.getElementById("copy").style.display = "flex";
    document.getElementById("copy").style.alignSelf = "center";
    document.getElementById("copy").style.flexDirection = "row";
    document.getElementById("copy").style.justifyContent = "space-evenly";
  }

  document.getElementById("copy").onclick = function () {
    navigator.clipboard.writeText(pass);
    console.log("copied: " + pass);
    document.getElementById("display").innerHTML =
      "Password is copied to the clipboard";
    document.getElementById("copy").style.display = "none";
  };
};
