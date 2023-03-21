import { getOnlyTime } from "../../queries/base.js";

export function ChatMessage(props, userid, show = true) {
  let messages = "";

  for (let i = 0; i < props.length; i++) {
    let username =
      props[i].username.length > 18
        ? props[i].username.substring(0, 18) + "..."
        : props[i].username;

    let datetime = props[i].time.includes("T")
      ? getOnlyTime(props[i].time)
      : props[i].time;

    messages += `
        <div class="chat-message"
          style="
            background-color: ${
              props[i].userid === userid ? "#CBF5C4" : "#C4D2F5"
            };
            position: relative; 
            margin: ${
              props[i].userid === userid
                ? "10px 5px 5px auto"
                : "10px auto 5px 5px"
            };
          "
          >
            <span style="display: none;" class="chat-message-user-id">${
              props[i].userid
            }</span>
            
            <div class="chat-message-user-container">
                <span 
                  class="chat-message-username" 
                  style="text-decoration: ${
                    show === false ? "none" : "underline"
                  }"
                  
                  onclick="window.location.href='${
                    show === true
                      ? "user-profile.html?id=" + props[i].userid
                      : "#"
                  }'"
                >${username}</span>
                <span class="chat-message-message">${props[i].message}</span>
            </div>
            <span class="chat-message-time">${datetime}</span>
        </div>
    `;
  }

  return messages;
}
