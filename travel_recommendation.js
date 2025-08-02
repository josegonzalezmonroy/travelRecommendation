let travelData = null;

fetch("travel_recommendation_api.json")
  .then((res) => res.json())
  .then((data) => {
    travelData = data;
    console.log("Dados carregados:", travelData);
  })
  .catch((err) => console.error("Erro ao carregar JSON:", err));

const searchInput = document.querySelector('.search-bar input[type="text"]');
const searchButton = document.querySelector(
  '.search-bar button[type="submit"]'
);
const clearButton = document.querySelector(".search-bar .clear-search");

const sideResults = document.querySelector("#side-results");

function showRecommendations(keyword) {
  if (!travelData) {
    alert("Dados ainda não carregados. Tente novamente.");
    return;
  }

  keyword = keyword.toLowerCase();
  let filtered = [];

  if (keyword.includes("beach") || keyword.includes("beaches")) {
    filtered = travelData.beaches;
  } else if (keyword.includes("temple") || keyword.includes("temples")) {
    filtered = travelData.temples;
  } else if (keyword.includes("country") || keyword.includes("countries")) {
    filtered = travelData.countries.flatMap((country) => country.cities);
  } else {
    filtered = [];
  }

  sideResults.innerHTML = "";
  sideResults.classList.remove("active");

  if (filtered.length === 0) {
    sideResults.innerHTML = "<p>Nenhuma recomendação encontrada.</p>";
    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("recommendation-card");

    card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}" 
            class="img-card" />
        <div class='card-info'>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <button class="visit-btn">Visit</button>
        </div>
    `;

    sideResults.appendChild(card);
  });

  sideResults.classList.add("active");
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const keyword = searchInput.value.trim();
  if (!keyword) {
    alert("Digite uma palavra-chave para buscar.");
    return;
  }
  showRecommendations(keyword);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const keyword = searchInput.value.trim();
    if (!keyword) {
      alert("Digite uma palavra-chave para buscar.");
      return;
    }
    showRecommendations(keyword);
  }
});

clearButton.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  sideResults.innerHTML = "";
  sideResults.classList.remove("active");
});

  const form = document.querySelector('.contact-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    setTimeout(() => {
      alert('Mensagem enviada com sucesso!');
      form.reset();
    }, 500); 
  });
