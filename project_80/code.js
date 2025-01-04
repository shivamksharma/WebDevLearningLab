Splitting();

var freq = document.querySelectorAll("feturbulence");
var displace = document.querySelectorAll("fedisplacementmap");
var frames = 0;
var rad = Math.PI / 180;
var bfxstart = 0.0;
var bfystart = 0.0;
var scale = [0, 0];
var scaletoggle = [0, 0];

function freqAnimation() {
  bfx = 0.005;
  bfy = 0.01;
  frames += 4;
  bfx += 0.001 * Math.cos(frames * rad);
  bfy += 0.005 * Math.sin(frames * rad);

  bf = bfx.toString() + " " + bfy.toString();

  displace.forEach((displaceNum, i) => {
    if (scale[i] < 60 && scaletoggle[i] == 1) {
      scale[i] += 2;
    }
    if (scale[i] > 0 && scaletoggle[i] == 0) {
      scale[i] -= 2;
    }
    displaceNum.setAttributeNS(null, "scale", scale[i]);
    freq[i].setAttributeNS(null, "baseFrequency", bf);
  });
  window.requestAnimationFrame(freqAnimation);
}

window.requestAnimationFrame(freqAnimation);

document.querySelectorAll("button").forEach((button, i) => {
  button.addEventListener("mouseover", function () {
    scaletoggle[i] = 1;
  });

  button.addEventListener("click", function () {
    document.body.classList.add("btn" + i);
    setTimeout(() => {
      document.body.classList.remove("btn" + i);
    }, 2000);
  });

  button.addEventListener("mouseleave", function () {
    scaletoggle[i] = 0;
  });
});
