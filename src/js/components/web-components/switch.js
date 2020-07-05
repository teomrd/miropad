(() => {
  class Switch extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });

      const switchContainer = document.createElement("label");

      // get attribute values from getters
      const title = this.title;
      const id = this.id;

      switchContainer.title = title;
      // adding a class to our container for the sake of clarity
      switchContainer.classList.add("switch");
      // creating the inner HTML of the editable list element
      switchContainer.innerHTML = `
        <input id="${id}" type="checkbox">
        <span class="slider round"></span>
      `;

      // binding methods
      this.addListItem = this.addListItem.bind(this);

      // appending the container to the shadow DOM
      shadow.appendChild(switchContainer);
    }

    // gathering data from element attributes
    get id() {
      return this.getAttribute("id") || "";
    }

    get title() {
      return this.getAttribute("title") || "";
    }

    // fires after the element has been attached to the DOM
    connectedCallback() {
      const removeElementButtons = [
        ...this.shadowRoot.querySelectorAll(".editable-list-remove-item"),
      ];
      const addElementButton = this.shadowRoot.querySelector(
        ".editable-list-add-item"
      );
      const inputBox = this.shadowRoot.querySelector(
        ".add-new-list-item-input"
      );

      this.itemList = this.shadowRoot.querySelector(".item-list");

      this.handleRemoveItemListeners(removeElementButtons);
      addElementButton.addEventListener("click", this.addListItem, false);
      inputBox.addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
          this.addListItem(e);
        }
      });
    }
  }

  customElements.define("switch", Switch);
})();
