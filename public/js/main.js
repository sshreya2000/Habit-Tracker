// anime  on landing Page
var textWrapper = document.querySelector(".ml12");
if (textWrapper)
  textWrapper.innerHTML = textWrapper.innerHTML.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml12 .letter",
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 30 * i,
  })
  .add({
    targets: ".ml12 .letter",
    translateX: [0, -30],
    opacity: [1, 0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 60 * i,
  });

let weeksContainer = document.getElementsByClassName("weekly__container");

async function showWeeklyData(button) {
  if (button.textContent == "Weekly") {
    const res = await fetch("/users/changeView/weekly", {
      method: "POST",
    });
    if (res.ok) location.replace("/habits/homePage");
  } else {
    const res = await fetch("/users/changeView/daily", {
      method: "POST",
    });
    if (res.ok) location.replace("/habits/homePage");
  }
}
