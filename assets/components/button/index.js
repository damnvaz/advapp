export function Button(text, event, id) {
  return `
        <button
            class="button"
            type="button"
            onclick="${event}"
            id="${id}"
        >
            ${text}
        </button>
    `;
}

export function ButtonLink(text, event) {
  return `
        <span class="button-link">
            <a href="${event}">
                ${text}
            </a>
        </span>
    `;
}
