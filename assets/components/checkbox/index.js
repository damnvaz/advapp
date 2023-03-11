export function CheckboxWithLink(id, text1, text2, text3, text4, url) {
  return `
    <label class="checkbox-with-link" id=${id}>
        ${text1}
        <a href="${url}">${text2}</a> ${text3}
        <a href="${url}">${text4}</a>.
    </label>
  `;
}
