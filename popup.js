document.addEventListener("DOMContentLoaded", function () {
  browser.storage.local.get("toggleState").then((result) => {
    const toggle = document.getElementById("toggle");
    if (result.toggleState !== undefined) {
      toggle.checked = result.toggleState;
    }
  });

  document.getElementById("toggle").addEventListener("change", function () {
    const isChecked = this.checked;
    browser.storage.local.set({ toggleState: isChecked });

    if (isChecked) {
      console.log("Переключатель включен");
    } else {
      console.log("Переключатель выключен");
    }
    browser.runtime.sendMessage({ toggleState: isChecked });
  });
});
