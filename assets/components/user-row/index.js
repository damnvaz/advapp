export function UserRow(props) {
  let messages = "";

  for (let i = 0; i < props.length; i++) {
    let username =
      props[i].name.length > 22
        ? props[i].name.substring(0, 23) + "..."
        : props[i].name;

    messages += `
        <div class="user-row"
          onclick="window.location.href='user-edit.html?id=${props[i].id}'"
          >
            <span style="display: none;" class="user-row-user-id">
              ${props[i].id}
            </span>
            <img
                class="user-row-user-image" 
                src="${props[i].img || "assets/icons/no-user.svg"}" 
                alt="user profile image"
            />
            <div class="user-row-user-container">
                <span class="user-row-username">${username}</span>
                <div class="user-row-user-time">
                    <span class="user-row-document">${props[i].document}</span>
                    <span class="user-row-status
                     ${
                       props[i].status === "1" ? "user-active" : "user-inactive"
                     }
                    ">${props[i].status === "1" ? "Ativo" : "Inativo"}</span>
                </div>
            </div>
        </div>
    `;
  }

  return messages;
}
