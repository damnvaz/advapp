export function Title(text, color = '') {
  return `<p class="title ${color !== '' ? 'text-white' : ''}">${text}</p>`;
}

export function Subtitle(text, color = '') {
  return `<p class="subtitle ${color !== '' ? 'text-white' : ''}">${text}</p>`;
}

export function Description(text, color = '') {
  return `<h5 class="description ${color !== '' ? 'text-white' : ''}">${text}</h5>`;
}

export function Link(link, text) {
  return `<a class="link" href="${link}">${text}</a>`;
}