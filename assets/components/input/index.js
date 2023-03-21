export function InputLabel(text) {
  return `<span class="input-label">${text}</span>`;
}

export function Input(id, placeholder, type, maxlength, event) {
  return `
        <input
            type="${type}"
            placeholder="${placeholder !== "" ? placeholder : ""}"
            class="form-control input"
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
            class="form-control text-area"
            ${event !== "" ? JSON.parse(event) : ""}
            maxLength="${maxlength === "" ? "180" : maxlength}"
            id="${id}" 
            required ></textarea>
    `;
}

export function Select(id, event, options, width) {
  return `
    <select
      class="form-control select"
      id="${id}"
      ${event !== "" ? JSON.parse(event) : ""}
      dir="ltr"
      ${width !== "" ? 'style="width: 100%"' : ""}
      > 
        ${options !== "" ? options : ""}
    </select>
  `;
}

export function InputDataList(id, options, placeholder) {
  let opt = "";
  for (let i = 0; i < options.length; i++) {
    opt += `
      <option
        data-value="${options[i][1]}"
        value="${options[i][1]}"
      >
        ${options[i][0]}
      </option>
    `;
  }

  return `
        <input
            type="text"
            placeholder="${options.length === 0 ? placeholder : ""}"
            class="form-control input ${
              options.length === 0 ? "input-disabled" : ""
            }"
            maxLength="180"
            id="${id}"
            list="datalist-${id}"
            disabled="${options.length === 0 ? "true" : "false"}"
            required />
        <datalist id="datalist-${id}">
          ${opt}
        </datalist>
    `;
}
