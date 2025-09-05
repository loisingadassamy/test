document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.querySelector("#about .text");
  aboutSection.style.opacity = "0";
  aboutSection.style.transform = "translateY(20px)";

  window.addEventListener("scroll", function () {
    let position = aboutSection.getBoundingClientRect().top;
    let screenPosition = window.innerHeight / 1.3;

    if (position < screenPosition) {
      aboutSection.style.transition = "all 0.8s ease-out";
      aboutSection.style.opacity = "1";
      aboutSection.style.transform = "translateY(0)";
    }
  });
});

const form = document.getElementById("contactForm");
const submitButton = document.getElementById("submitButton");
const successAlert = document.getElementById("successAlert");
const errorAlert = document.getElementById("errorAlert");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    event.stopPropagation();
    form.classList.add("was-validated");
    return;
  }

  submitButton.disabled = true;
  submitButton.classList.add("btn-loading");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      form.reset();
      form.classList.remove("was-validated");
      successAlert.classList.add("show");
      errorAlert.classList.remove("show");
    } else {
      throw new Error("Erreur réseau");
    }
  } catch (error) {
    errorAlert.classList.add("show");
    successAlert.classList.remove("show");
  } finally {
    submitButton.disabled = false;
    submitButton.classList.remove("btn-loading");
  }
});

$(document).ready(function () {
  $("#lightgallery").lightGallery();
});
