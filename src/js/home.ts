import Hammer from "../../libs/Hammer";
const animationUp = [
  { transform: "scale3d(0.2, 0.2, 0.1)", opacity: 1, offset: 0 },
  { opacity: 1, offset: 0.5 },
];

const zoomInUp = [
  {
    opacity: "0",
    transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)",
    animationTimingFunction: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  },
  {
    opacity: "1",
    transform: "scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",
    animationTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1)",
    offset: 0.6,
  },
];

const zoomOutOp = [
  {
    opacity: 1,
    transform: "scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",
    animationTtimingFunction: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    offset: 0.4,
  },
  {
    opacity: 0,
    transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",
    animationTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1)",
  },
];

//animations two
const entranceAnimation = [
  { opacity: 0, height: "0%", transforms: "scale(0.2)" },
  { opacity: 0.5, height: "50%", transforms: "scale(0.5)" },
  { opacity: 1, height: "100%", transforms: "scale(1)" },
];
const exitAnimation = [
  { opacity: 1, height: "100%", transforms: "scale(1)" },
  { opacity: 0.5, height: "50%", transforms: "scale(0.5)" },
  { opacity: 0, height: "0%", y: 50, transforms: "scale(0.2)" },
];

//animation simple
const simpleEntrance = [{ offset: 0.4 }, { opacity: 1 }];
const simpleExit = [{ offet: 0.5 }, { opacity: 0 }];

const enterAnimationRight = [];

class SlideLeobar {
  private ref: HTMLElement;
  private items: HTMLElement[] = [];
  private count: number;
  private points: HTMLElement[];
  private currentElement: HTMLElement;
  private contSpan: HTMLElement;
  private indexInitial: number;
  constructor(opt: {
    ref: string | HTMLElement;
    loop?: boolean;
    zIndex?: number;
  }) {
    if (typeof opt.ref == "string") {
      this.ref = document.querySelector(opt.ref) as HTMLElement;
    } else {
      this.ref = opt.ref;
    }
    this.indexInitial = opt.zIndex || 5;
    this.count = 0;
    this.initItems();
    this.initHammerEvents();
    this.ref.classList.add("container_galery");
  }

  private initLoop() {
    setInterval(() => {
      this.initItem();
    }, 5000);
  }

  private initItems() {
    this.items = [];
    this.points = [];
    let i = 0;
    this.contSpan = document.createElement("div");
    const contSlide = document.createElement("div");
    contSlide.classList.add("contain_slides");
    contSlide.style.zIndex = "" + this.indexInitial;
    this.contSpan.classList.add("contSpan");
    const childrens = Object.assign([], this.ref.children);
    this.indexInitial = this.indexInitial + childrens.length;
    childrens.forEach((element) => {
      const initCall = (el: HTMLElement) => {
        el.classList.add("slide");
        el.style.zIndex = "" + (this.indexInitial - i);
        el.dataset.index = "" + (this.indexInitial - i);
        this.items.push(element as HTMLElement);
        const span = document.createElement("a") as HTMLElement;
        span.classList.add("point");
        span.dataset.id = "" + i;
        this.contSpan.appendChild(span);
        contSlide.appendChild(el);
        this.points.push(span);
        i++;
      };
      initCall(element as HTMLElement);
    });
    this.ref.appendChild(contSlide);
    this.contSpan.style.zIndex = "" + (this.indexInitial + this.items.length);
    this.ref.appendChild(this.contSpan);
    this.initOptions();
    this.centerSpans();
    this.configureResize();
    this.initItem();
  }
  private initOptions() {
    this.points.forEach((point) => {
      point.addEventListener("click", (e) => {
        const pos = Number((e.target as HTMLElement).dataset.id);
        this.count = pos;
        this.initItem();
      });
    });
  }
  private configureResize() {
    window.addEventListener("resize", () => {
      this.centerSpans();
    });
  }

  private centerSpans() {
    const widthSpan = this.contSpan.getBoundingClientRect().width;
    const widthContainer = this.ref.getBoundingClientRect().width;
    const res = (widthContainer - widthSpan) / 2;
    this.contSpan.style.left = `${res}px`;
  }
  get indexSupr() {
    const index =
      Number(
        (document.querySelector(".contain_slides") as HTMLElement).style.zIndex
      ) + this.items.length;
    return index;
  }
  private async initItem() {
    this.points.forEach((span) => span.classList.remove("active"));
    if (this.count >= this.items.length || this.count <= 0) {
      this.count = 0;
    }
    let idexRef = 1;
    this.currentElement = this.items[this.count];
    this.currentElement.style.opacity = "1";
    if (this.currentElement) {
      this.items.forEach((item) => {
        if (item !== this.currentElement) {
          item.style.zIndex = "" + (this.indexSupr - idexRef);
          item.style.opacity = "0";
          idexRef++;
        }
      });
    }
    this.points[this.count].classList.add("active");
    this.currentElement.style.zIndex = "" + this.indexSupr;
    await this.addAnimation(animationUp, this.currentElement);
  }
  private addAnimation(animation: any[], element: HTMLElement): Promise<any> {
    return new Promise((resolve, reject) => {
      if (element) {
        element.animate(animation, {
          duration: 200,
          easing: "ease",
        }).onfinish = () => {
          return resolve();
        };
      } else {
        return resolve();
      }
    });
  }
  initHammerEvents() {
    const elhamer = Hammer(this.ref, { velocity: 0.4 });
    elhamer.on("swipeleft swiperight", (ev) => {
      switch (ev.type) {
        case "swipeleft": {
          this.count = this.count + 1;
          this.initItem().then((res) => {});
          break;
        }
        case "swiperight": {
          this.count = this.count - 1;
          this.initItem().then((res) => {});
          break;
        }
      }
    });
  }
}
const slide = new SlideLeobar({ ref: ".bg_galery" });
