import { getOnlyTime } from "../../queries/base.js";

export function ChatRow(props) {
  let messages = "";

  for (let i = 0; i < props.length; i++) {
    let username =
      props[i].username.length > 22
        ? props[i].username.substring(0, 23) + "..."
        : props[i].username;
    let message =
      props[i].message.length > 22
        ? props[i].message.substring(0, 23) + "..."
        : props[i].message;

    let datetime = getOnlyTime(props[i].time);

    messages += `
        <div class="chat-row" onclick="window.location.href='chat.html?id=${
          props[i].userid
        }'">
            <img
                class="chat-row-user-image" 
                src="${props[i].img || "assets/icons/no-user.svg"}" 
                alt="user profile image"
                />
            <div class="chat-row-user-container">
                <div class="chat-row-user-time">
                    <span class="chat-row-username">${username}</span>
                    <span class="chat-row-time">${datetime}</span>
                </div>
                <span class="chat-row-message">${message}</span>
            </div>
        </div>
    `;
  }

  return messages;
}
