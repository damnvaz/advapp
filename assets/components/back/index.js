export function ArrowBack(color = '') {
  return `
      <span 
        onclick="history.back();" 
        class="arrow-back ${color !== '' ? 'text-white' : ''}"
      >
        < voltar
      </span>`;
}
