export function Accordion(title, details, id) {
  return `
        <div class='accordion'>
            <div 
                class='d-flex row justify-content-between'
                id='accordiontitle${id}'
            >
                <span class='accordion-title'>${title}</span>
                <img src='assets/icons/chevron-right.svg' 
                    id='accordionimg${id}' 
                    alt='arrow icon' 
                    class='icon accordion-img' 
                />
            </div>
            <span class='accordion-description hide-details' id='accordioncontent${id}'>${details}</span>
        </div>
    `;
}
