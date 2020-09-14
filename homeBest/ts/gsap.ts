// declare var GSDevTools: any;
// GSDevTools.create();
import gsap from "gsap";
import "gsap/CSSPlugin";
const ins = gsap.to(".box", {
  rotation: 360,
  x: function (index, target, targets) {
    return index * 200;
  },
  y: function (index, target, targets) {
    return -(index * 50);
  },
  duration: 1,
});
// gsap.to(".box", { rotation: 360, y: 500, duration: 3, ease: "none" });

document.getElementById("pause").addEventListener("click", () => {
  if (ins.paused()) {
    ins.play();
  } else {
    ins.pause();
  }
  //   console.log();
});

document.getElementById("reverse").addEventListener("click", () => {
  if (ins.reversed()) {
    ins.play();
  } else {
    ins.reverse();
  }
});

gsap.set(".title", { scale: 0.1, opacity: 0.5 });
const time = gsap
  .timeline({ repeat: -1 })
  .to(".title", { opacity: 0.5, scale: 0.3, duration: 0.3 })
  .to(".title", { rotation: 360, duration: 0.2 })
  .to(".box", {
    y: 160,
    x: -10,
    stagger: 0.1,
    duration: 0.8,
    ease: "back",
    background: "black",
  })
  .to(".title", { opacity: 1, scale: 1, duration: 1, ease: "ease" });
time.reversed();
