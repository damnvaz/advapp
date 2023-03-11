export function Title(text) {
  return `<p class="title">${text}</p>`;
}

export function Subtitle(text) {
  return `<p class="subtitle">${text}</p>`;
}

export function Description(text) {
  return `<h5 class="description">${text}</h5>`;
}

export function Link(link, text) {
  return `<a class="link" href="${link}">${text}</a>`;
}