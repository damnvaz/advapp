export function Card(props) {
  return `
      <a href="${props.url}" class="outter-card" style="background-color: ${props.bg}">
            <div class='card-row'>
                <p class="card-title" style="color: ${props.color}">${props.title}</p>
            </div>
            <div class='card-row'>
                <span style="color: ${props.color}">${props.description1}</span>
                <span style="color: ${props.color}"><strong>${props.value1}</strong></span>
            </div>
            <div class='card-row'>
                <span style="color: ${props.color}">${props.description2}</span>
                <span style="color: ${props.color}"><strong>${props.value2}</strong></span>
            </div>
      </a>
    `;
}
