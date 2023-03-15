export function InputLabel(text) {
  return `<span class="input-label">${text}</span>`;
}

export function Input(id, placeholder, type, maxlength, event) {
  return `
        <input
            type="${type}"
            placeholder="${placeholder !== "" ? placeholder : ""}"
            class="form-control mr-2 input"
            ${event !== "" ? JSON.parse(event) : ""}
            maxLength="${maxlength === "" ? "180" : maxlength}"
            id="${id}"
            required />
    `;
}

export function InputPassword(id, placeholder, maxlength, show) {
  return `
      <div class="outter-input-password">
        <input
            type="${show === false ? "password" : "text"}"
            placeholder="${placeholder !== "" ? placeholder : ""}"
            class="input-password"
            maxLength="${maxlength === "" ? "180" : maxlength}"
            id="${id}"
            required />
          <img 
            class="input-password-icon"
            src="assets/icons/eye.svg" 
            alt="show/hide password" 
            id="password-icon" />
      </div>
    `;
}

export function TextArea(id, placeholder, type, maxlength, event) {
  return `
        <textarea 
            type="${type}" 
            placeholder="${placeholder !== "" ? placeholder : ""}"
            class="form-control mr-2 text-area"
            ${event !== "" ? JSON.parse(event) : ""}
            maxLength="${maxlength === "" ? "180" : maxlength}"
            id="${id}" 
            required ></textarea>
    `;
}

export function Select(id, event, options) {
  return `
    <select
      class="select"
      id="${id}"
      ${event !== "" ? JSON.parse(event) : ""}
      dir="ltr"
      > 
        ${options !== "" ? options : ""}
    </select>
  `;
}
