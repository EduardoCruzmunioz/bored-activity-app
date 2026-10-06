import type { CardOptions } from "./trivia";

export async function createCard(
  options: CardOptions,
): Promise<HTMLDivElement> {
  const card = document.createElement("div");
  card.className = "card";

  const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
  const query = encodeURIComponent(options.subcategoria);
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=all&per_page=3&safesearch=true`;

  let imgUrl = "https://placehold.co/400x250?text=Sin+Imagen";

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.hits && data.hits.length > 0) {
      imgUrl = data.hits[0].webformatURL;
    }
  } catch (error) {
    console.error("Error cargando la imagen de Pixabay:", error);
  }

  const simbolosPrecio = "$".repeat(options.priceLevel);
  const safeDifficulty = options.difficulty
    ? options.difficulty.toLowerCase()
    : "easy";

  card.innerHTML = `
    <div class="card-header">
      <span class="card-category">${options.subcategoria}</span>
      <span class="card-badge">${safeDifficulty}</span>
    </div>

    <div class="card-image-container">
      <img 
        src="${imgUrl}" 
        alt="${options.subcategoria}" 
        class="card-image"
        onerror="this.src='https://placehold.co/400x250?text=Sin+Imagen';"
      />
    </div>

    <p class="card-question">${options.questionText}</p>

    <div class="card-metrics">
      <div><strong>Precio:</strong> <span class="price-symbol">${simbolosPrecio}</span></div>
      <div><strong>Accesibilidad:</strong> Nivel ${options.accessibilityLevel}</div>
      <div><strong>Personas:</strong> ${options.participants}</div>
    </div>

    <div class="card-footer">
      <button id="btnVolver" class="btn-secondary">Volver al Inicio</button>
    </div>
  `;

  card.querySelector("#btnVolver")?.addEventListener("click", options.onVolver);

  return card;
}
