
let list = document.querySelector("ul#list");
let litag = list.getElementsByTagName("li"); // tüm li leri al

let liveToastSuccess = document.querySelector(".toast.success");
let liveToastError = document.querySelector(".toast.error");

let arr = JSON.parse(localStorage.getItem("arr")) ? JSON.parse(localStorage.getItem("arr")) : new Array();

if (!JSON.parse(localStorage.getItem("arr"))) {
  for (let index = 0; index < litag.length; index++) {
    arr.push(litag[index].innerHTML);
    litag[index].innerHTML += `<span class="close">x</span>`;
  }
} else {
  createList(arr, litag);
}

function newElement() {
  if (!document.querySelector("#task").value.trim()) {
    new bootstrap.Toast(liveToastError).show();
    return;
  }

  let newLi = document.createElement("li");
  newLi.innerHTML = document.querySelector("#task").value + `<span class="close">x</span>`;
  list.appendChild(newLi);
  
  arr.push(document.querySelector("#task").value);
  localStorage.setItem("arr", JSON.stringify(arr));

  document.querySelector("#task").value = ""
  new bootstrap.Toast(liveToastSuccess).show();
}

function removeElement(event) {
  list.removeChild(event.path[1]);

  arr.splice(arr.indexOf(event.path[1].childNodes[0].data), 1);
  localStorage.setItem("arr", JSON.stringify(arr));
}

function done(event) {
  event.target.classList.toggle("checked");
}

list.addEventListener("click", function (event) {
  if (event.target.nodeName === "LI") {
    done(event);
  } else {
    removeElement(event);
  }
});

function createList(arr, litag) {
  while (litag.length !== 0) {
    for (let index = 0; index < litag.length; index++) {
      list.removeChild(litag[index]);
    }
  }
  for (let index = 0; index < arr.length; index++) {
    let newLi = document.createElement("li");
    newLi.innerHTML = arr[index] + `<span class="close">x</span>`;
    list.appendChild(newLi);
  }
}
