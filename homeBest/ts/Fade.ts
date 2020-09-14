import highway, { Transition } from "@dogstudio/highway";
import { TimelineLite } from "gsap";

export default class Fade extends highway.Transition {
  in({ from, to, done }) {
    const tl = new TimelineLite();

    tl.fromTo(to, 0.5, { left: "-100%", top: "50%" }, { left: "0%" }).fromTo(
      to,
      0.5,
      { height: "2vh" },
      {
        height: "90vh",
        top: "10%",
        onComplete: () => {
          done();
          from.remove();
        },
      }
    );
  }
  out({ from, done }) {
    done();
  }
}
