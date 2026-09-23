import './style.css'

const container = document.getElementById("test");

console.log("container:", container);
console.log("container id:", container?.id);
console.log("container tag:", container?.tagName);

const newDiv = document.createElement("div");
newDiv.classList.add("test-class");

container.appendChild(newDiv);

console.log("parent after append:", newDiv.parentElement);
console.log("container contains:", container.contains(newDiv));
console.log("container HTML:", container.outerHTML);