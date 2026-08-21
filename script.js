/* =========================================
   LASANI ALUMINIUM GLASS & SS STEEL
   Main JavaScript
========================================= */


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

  navMenu.classList.toggle("active");

});


/* Close menu after clicking a link */

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(link => {

  link.addEventListener("click", () => {

    navMenu.classList.remove("active");

  });

});


/* ================= FOOTER YEAR ================= */

const year = document.getElementById("year");

if (year) {

  year.textContent = new Date().getFullYear();

}


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");


contactForm.addEventListener("submit", function(event) {

  event.preventDefault();


  const name =
    document.getElementById("name").value.trim();

  const phone =
    document.getElementById("phone").value.trim();

  const email =
    document.getElementById("email").value.trim();

  const project =
    document.getElementById("project").value;

  const message =
    document.getElementById("message").value.trim();


  if (!name || !phone) {

    formMessage.textContent =
      "Please enter your name and phone number.";

    return;

  }


  /*
    Replace this email address with
    your actual business email.
  */

  const businessEmail =
    "info@lasanialuminium.com";


  const subject =
    encodeURIComponent(
      "New Lasani Website Enquiry - " + project
    );


  const body =
    encodeURIComponent(

`NEW WEBSITE ENQUIRY

Name:
${name}

Phone:
${phone}

Email:
${email || "Not provided"}

Project:
${project}

Message:
${message || "No message provided"}

--------------------------------
Lasani Aluminium Glass & SS Steel
`
    );


  const mailto =
    `mailto:${businessEmail}?subject=${subject}&body=${body}`;


  window.location.href = mailto;


  formMessage.textContent =
    "Opening your email application...";

});


/* ================= SCROLL REVEAL ================= */

const revealElements =
  document.querySelectorAll(
    ".aluminium-card, .product, .process-grid div"
  );


const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

        }

      });

    },

    {
      threshold: 0.15
    }

  );


revealElements.forEach(element => {

  element.classList.add("reveal");

  observer.observe(element);

});