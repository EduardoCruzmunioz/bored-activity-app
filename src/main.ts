import "./style.css";
import { cargarActividad, CATEGORIAS_MAP } from "./peticion";
import { createCard } from "./interface/cardActiviti";
import type { Difficulty, FiltrosUsuario } from "./interface/trivia";

function initApp() {
  const appContainer = document.querySelector<HTMLDivElement>("#app");

  if (!appContainer) {
    console.error("No se encontró el contenedor #app");
    return;
  }

  function mostrarPantallaInicio() {
    appContainer!.innerHTML = `
      <div class="form-container">
        <h2 class="form-title">Buscar Actividad</h2>

        <form id="filtroForm" class="form">
          <div class="form-group">
            <label for="difficultySelect">Dificultad:</label>
            <select id="difficultySelect" class="form-control">
              <option value="easy">Fácil (Easy)</option>
              <option value="medium" selected>Media (Medium)</option>
              <option value="hard">Difícil (Hard)</option>
            </select>
          </div>

          <div class="form-group">
            <label for="participantsInput">Participantes:</label>
            <input 
              type="number" 
              id="participantsInput" 
              class="form-control"
              min="1" 
              max="10" 
              value="2" 
            />
          </div>

          <button type="submit" class="btn-primary">
            Buscar Actividad
          </button>
        </form>
      </div>
    `;

    document.getElementById("filtroForm")?.addEventListener("submit", (e) => {
      e.preventDefault();

      const filtros: FiltrosUsuario = {
        difficulty: (
          document.getElementById("difficultySelect") as HTMLSelectElement
        ).value as Difficulty,
        participants: Number(
          (document.getElementById("participantsInput") as HTMLInputElement)
            .value,
        ),
      };

      mostrarPantallaResultado(filtros);
    });
  }

  async function mostrarPantallaResultado(filtros: FiltrosUsuario) {
    appContainer!.innerHTML = `
      <div class="status-message">
        <p>Buscando la actividad perfecta...</p>
      </div>
    `;

    try {
      const { data, categoryId } = await cargarActividad(filtros.difficulty);

      if (data.results && data.results.length > 0) {
        const item = data.results[0];

        const priceLevelRandom = Math.floor(Math.random() * 3) + 1;
        const accessibilityLevelRandom = Math.floor(Math.random() * 3) + 1;

        const cardElement = await createCard({
          subcategoria: CATEGORIAS_MAP[categoryId] || item.category,
          difficulty: item.difficulty,
          questionText: item.question,
          priceLevel: priceLevelRandom,
          accessibilityLevel: accessibilityLevelRandom,
          participants: filtros.participants,
          onVolver: mostrarPantallaInicio,
        });

        appContainer!.innerHTML = "";
        appContainer!.appendChild(cardElement);
      } else {
        appContainer!.innerHTML = `
          <div class="status-message error">
            <p>No se encontraron actividades.</p>
            <button id="btnErrorVolver" class="btn-secondary">Volver</button>
          </div>
        `;
        document
          .getElementById("btnErrorVolver")
          ?.addEventListener("click", mostrarPantallaInicio);
      }
    } catch (error) {
      console.error("Error:", error);
      appContainer!.innerHTML = `
        <div class="status-message error">
          <p>Ocurrió un error al realizar la petición.</p>
          <button id="btnErrorVolver" class="btn-secondary">Volver al Inicio</button>
        </div>
      `;
      document
        .getElementById("btnErrorVolver")
        ?.addEventListener("click", mostrarPantallaInicio);
    }
  }

  mostrarPantallaInicio();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
