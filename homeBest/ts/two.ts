import { TimelineLite, Power2 } from "gsap";
import "gsap/CSSPlugin";
const btnOpen = document.querySelector(".nav-button") as HTMLElement;
const animationHeder = new TimelineLite({ paused: true });
animationHeder
  .to(".cover", 1, { width: "60%", ease: Power2.easeOut })
  .to(".cover-date", 0.5, { x: 900 })
  .to("nav", 1, { height: "100%", ease: Power2.easeIn })
  .fromTo(
    ".nav-open",
    0.5,
    { opacity: 0, x: -50, ease: Power2.easeOut },
    { x: 0, opacity: 1 }
  );
btnOpen.addEventListener("click", () => {
  toogleAnimation();
});

const toogleAnimation = () => {
  animationHeder.reversed() ? animationHeder.play() : animationHeder.reverse();
};
