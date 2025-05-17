import "./style.css";
import "fslightbox";
import Glide, {
  Controls,
  Breakpoints,
} from "@glidejs/glide/dist/glide.modular.esm";

const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
  app.innerHTML = `
  <div>
    <div class="container">
        <h1>Entries</h1>
        <a href="/entries/new" class="btn">Create New Entry</a>
        <table id="entriesTable">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Timestamp</th>
                    <th>Images</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
  </div>
`;

  const table = app.querySelector<HTMLTableElement>("#entriesTable");
  if (table) {
    fetch("/entries.json")
      .then((response) => response.json())
      .then((entries) => {
        const template =
          document.querySelector<HTMLTemplateElement>("#template_row");
        const slideTemplate = template?.content.querySelector(".glide__slide");
        if (template && slideTemplate) {
          for (const entry of entries) {
            const row = template.content
              .querySelector("tr")
              ?.cloneNode(true) as HTMLTableRowElement;
            table.appendChild(row);

            const cells = row.querySelectorAll("td");
            cells[0].textContent = entry.title;
            cells[1].textContent = entry.timestamp;
            const slidesContainer = cells[2].querySelector(".glide__slides");
            if (slidesContainer) {
              slidesContainer.innerHTML = "";
              for (const [idx, image] of entry.images.entries()) {
                const slide = slideTemplate.cloneNode(true) as HTMLDivElement;
                slide.querySelectorAll("img").forEach((elm) => {
                  elm.src = image;
                });
                slide.querySelectorAll("a").forEach((elm) => {
                  elm.href = image;
                  elm.dataset.caption = entry.title;
                });
                slidesContainer.appendChild(slide);

                const button = document.createElement("button");
                button.className = "glide__bullet";
                button.dataset.glideDir = "=" + idx.toString();
                console.log("button", button);
                cells[2].querySelector(".glide__bullets")?.appendChild(button);
              }
            }
          }
        }
        if ("refreshFsLightbox" in window) {
          // @ts-expect-error it really does exist i swear
          window.refreshFsLightbox();
        }
        new Glide(".glide").mount({ Controls, Breakpoints });
      });
  }
}

if ("refreshFsLightbox" in window) {
  // @ts-expect-error it really does exist i swear
  window.refreshFsLightbox();
}
