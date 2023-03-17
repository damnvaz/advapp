export function Button(text, event) {
  return `
        <button
            class="button"
            type="button"
            onclick="${event}"
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
