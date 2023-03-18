export function Button(text, event, id, color = "") {
  return `
        <button
            class="button"
            style="${
              color === ""
                ? ""
                : "background-color: var(--button-green); color: #fff; border: 1px solid var(--button-green) !important;"
            }"
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
