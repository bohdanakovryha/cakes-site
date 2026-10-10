// =====================================================================
//  ТОРТИ — редагуйте цей список, щоб змінити каталог.
//  category має збігатися з однією з назв у categories нижче.
//  Фото кладіть у images/cakes/ (вертикальні, приблизно 800×1000).
//  tag — необов'язкова позначка ("Хіт", "Новинка") або "".
// =====================================================================
const categories = ["Усі", "День народження", "Дитячі", "Весільні", "Бенто"];

const cakes = [
  { name: "Ягідний нейкед",  category: "День народження", price: "від 850 грн/кг", tag: "Хіт",
    description: "Відкриті коржі, вершковий крем і багато свіжих ягід зверху.", image: "images/cakes/naked.jpg" },
  { name: "Шоколадні патьоки", category: "День народження", price: "від 900 грн/кг", tag: "",
    description: "Гладкий крем, шоколадні патьоки, макарон і безе на ваш колір.", image: "images/cakes/drip.jpg" },
  { name: "Динозаврики",      category: "Дитячі", price: "від 950 грн/кг", tag: "",
    description: "Яскравий торт із фігурками та пряниками. Тема будь-яка: космос, принцеси, машинки.", image: "images/cakes/kids.jpg" },
  { name: "Перший рік",       category: "Дитячі", price: "від 900 грн/кг", tag: "",
    description: "Ніжні кольори, ім'я та цифра 1. Можна з окремим мінітортиком для малюка.", image: "images/cakes/first-year.jpg" },
  { name: "Білі квіти",       category: "Весільні", price: "від 1100 грн/кг", tag: "",
    description: "Два-три яруси, текстурний крем і живі квіти під ваш букет.", image: "images/cakes/wedding.jpg" },
  { name: "Бенто з написом",  category: "Бенто", price: "450 грн за торт", tag: "Новинка",
    description: "Мінітортик на 2–3 людини в коробочці. Напис і малюнок на ваш вибір.", image: "images/cakes/bento.jpg" }
];

// =====================================================================
//  НАЧИНКИ — layers: кольори шарів знизу вгору (корж, крем, начинка…)
// =====================================================================
const fillings = [
  { name: "Ваніль і полуниця", price: "850 грн/кг", text: "Ванільний бісквіт, крем-чиз, полуничне конфі.",
    layers: ["#f6e2b3", "#fff7f2", "#d9384f", "#fff7f2", "#f6e2b3", "#fff7f2"] },
  { name: "Шоколад і вишня", price: "900 грн/кг", text: "Шоколадний бісквіт, вишневе конфі, шоколадний ганаш.",
    layers: ["#4a2a22", "#7a1e30", "#4a2a22", "#6b3b2e", "#4a2a22", "#3a201b"] },
  { name: "Фісташка й малина", price: "1000 грн/кг", text: "Фісташковий бісквіт, малиновий мус, фісташковий крем.",
    layers: ["#b7c58b", "#f3ecd8", "#c8325a", "#b7c58b", "#f3ecd8", "#c9d6a3"] },
  { name: "Солона карамель", price: "920 грн/кг", text: "Карамельний бісквіт, солона карамель, арахіс.",
    layers: ["#d9a066", "#f6ead6", "#b8732e", "#d9a066", "#f6ead6", "#c98a45"] },
  { name: "Морквяний", price: "880 грн/кг", text: "Морквяні коржі з волоським горіхом, крем-чиз, апельсин.",
    layers: ["#c4703a", "#fbf3e8", "#c4703a", "#fbf3e8", "#c4703a", "#fbf3e8"] },
  { name: "Червоний оксамит", price: "900 грн/кг", text: "Класичний red velvet і вершковий крем-чиз.",
    layers: ["#a3182f", "#fffaf5", "#a3182f", "#fffaf5", "#a3182f", "#fffaf5"] }
];

// ===== Каталог з фільтром =====
const filterBox = document.querySelector(".filters");
const cakeList = document.getElementById("cake-list");

function renderCakes(cat) {
  cakeList.innerHTML = "";
  cakes.filter(c => cat === "Усі" || c.category === cat).forEach(c => {
    const el = document.createElement("article");
    el.className = "cake-card";
    el.innerHTML = `
      <div class="cake-card__photo">
        <img src="${c.image}" alt="Торт «${c.name}»" loading="lazy" onerror="this.parentElement.classList.add('empty')">
        ${c.tag ? `<span class="cake-card__tag">${c.tag}</span>` : ""}
      </div>
      <h3>${c.name}</h3>
      <p>${c.description}</p>
      <div class="cake-card__meta">
        <span class="cake-card__price">${c.price}</span>
        <a href="#order">Замовити такий</a>
      </div>`;
    cakeList.appendChild(el);
  });
}

categories.forEach((cat, i) => {
  const b = document.createElement("button");
  b.textContent = cat;
  b.setAttribute("aria-pressed", i === 0);
  b.addEventListener("click", () => {
    filterBox.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
    renderCakes(cat);
  });
  filterBox.appendChild(b);
});
renderCakes("Усі");

// ===== Начинки =====
const fillingList = document.getElementById("filling-list");
fillings.forEach(f => {
  const el = document.createElement("article");
  el.className = "filling";
  const layers = [...f.layers].reverse().map(c => `<span style="background:${c}"></span>`).join("");
  el.innerHTML = `<div class="slice">${layers}</div><h3>${f.name}</h3><p>${f.text}</p><small>${f.price}</small>`;
  fillingList.appendChild(el);
});

// ===== Мобільне меню =====
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  burger.setAttribute("aria-expanded", false);
}));

document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());
