let toggleState = false;

browser.storage.local.get("toggleState").then((result) => {
  if (result.toggleState !== undefined) {
    toggleState = result.toggleState;
    console.log("Начальное состояние переключателя:", toggleState);
  }
});

browser.runtime.onMessage.addListener((message) => {
  if (message.toggleState !== undefined) {
    toggleState = message.toggleState;
    console.log("Состояние переключателя обновлено:", toggleState);
  }
});

browser.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (details.requestBody) {
      const body = details.requestBody.formData.code[0];
      if (body.includes("API.messages.markAsRead") && toggleState) {
        console.log("Запрос отменен");
        return { cancel: true };
      }
    } else {
      console.log("Тело запроса отсутствует.");
    }

    return { cancel: false };
  },
  {
    urls: ["https://api.vk.com/method/execute*"],
  },
  ["blocking", "requestBody"]
);
