export function Bottombar(props) {
  let icons = "";
  for (let i = 0; i < props.length; i++) {
    icons += `
        <a href="${props[i].url}">
            <img src="assets/icons/${props[i].icon}.svg" alt="icon" class="bottombar-icon" />
        </a>
    `;
  }

  return `
        <div class="outter-bottombar">
            <div class="inner-bottombar">
                ${icons}
            </div>
        </div>
    `;
}
