const STORAGE_KEY = "felvinmatugas-outputs";

const form = document.querySelector("#add-output");
const grid = document.querySelector("#output-grid");
const clearButton = document.querySelector("#clear-outputs");
const year = document.querySelector("#year");

const starterOutputs = [
  {
    title: "Work Output Files",
    category: "Drive Folder",
    link: "https://drive.google.com/drive/folders/1bxgIiQM3EXDRcyhEP2vcm0B2lLBmu44h?usp=sharing",
    description:
      "A Google Drive folder containing my work output files for portfolio review.",
  },
  {
    title: "Blog / Content Output",
    category: "Content",
    link: "https://docs.google.com/document/d/11L2M4TLZYaCKClUlRytY9z1T8u7Sr-yV9pu56HjAFSg/edit?usp=sharing",
    description:
      "A Google Docs sample of my blog or content output for portfolio review.",
  },
  {
    title: "Project Summary",
    category: "Project",
    link: "",
    description:
      "Use the form to save a title, category, short description, and optional link. Your entries stay in this browser.",
  },
];

function getOutputs() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : starterOutputs;
}

function saveOutputs(outputs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(outputs));
}

function createOutputCard(output) {
  const article = document.createElement("article");
  article.className = "output-card";

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = output.category || "Output";

  const title = document.createElement("h3");
  title.textContent = output.title;

  const description = document.createElement("p");
  description.textContent = output.description;

  article.append(tag, title, description);

  if (output.link) {
    const link = document.createElement("a");
    link.href = output.link;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "Open link";
    article.append(link);
  }

  return article;
}

function renderOutputs() {
  const outputs = getOutputs();
  grid.innerHTML = "";

  if (!outputs.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No outputs yet. Add your first work output using the form.";
    grid.append(empty);
    return;
  }

  outputs.forEach((output) => grid.append(createOutputCard(output)));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const output = {
    title: formData.get("title").trim(),
    category: formData.get("category").trim(),
    link: formData.get("link").trim(),
    description: formData.get("description").trim(),
  };

  const outputs = [output, ...getOutputs()];
  saveOutputs(outputs);
  form.reset();
  renderOutputs();
});

clearButton.addEventListener("click", () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  renderOutputs();
});

year.textContent = new Date().getFullYear();
renderOutputs();
