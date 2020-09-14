const items = Object.assign(
  [] as HTMLElement[],
  document.querySelectorAll(".bread li")
);

const icon = document.createElement("i");
icon.classList.add("fas");
icon.classList.add("fa-angle-right");

// document.querySelector(".bread").innerHTML = "";
let i = 1;
for (const item of items) {
  item.style.opacity = `${i}`;
  i = i - 0.12;
  //   item.appendChild(icon);
  //   document.querySelector(".bread").innerHTML += item;
}
