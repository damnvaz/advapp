export function UserRow(props) {
  let messages = "";

  for (let i = 0; i < props.length; i++) {
    let username =
      props[i].username.length > 22
        ? props[i].username.substring(0, 23) + "..."
        : props[i].username;

    messages += `
        <div class="user-row"
          onclick="window.location.href='user-edit.html?id=${props[i].userid}'"
          >
            <span style="display: none;" class="user-row-user-id">
              ${props[i].userid}
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
                       props[i].status === "Ativo"
                         ? "user-active"
                         : "user-inactive"
                     }
                    ">${props[i].status}</span>
                </div>
            </div>
        </div>
    `;
  }

  return messages;
}
