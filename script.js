/* =========================================
   LASANI ALUMINIUM GLASS & SS STEEL
   Enhanced Main JavaScript
========================================= */


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

  menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");
    menuBtn.classList.toggle("active");

  });

}


/* ================= CLOSE MOBILE MENU ================= */

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(link => {

  link.addEventListener("click", () => {

    if (navMenu) {
      navMenu.classList.remove("active");
    }

    if (menuBtn) {
      menuBtn.classList.remove("active");
    }

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

if (contactForm) {

  contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
      document.getElementById("name")?.value.trim();

    const phone =
      document.getElementById("phone")?.value.trim();

    const email =
      document.getElementById("email")?.value.trim();

    const project =
      document.getElementById("project")?.value;

    const message =
      document.getElementById("message")?.value.trim();


    if (!name || !phone) {

      if (formMessage) {

        formMessage.textContent =
          "Please enter your name and phone number.";

        formMessage.classList.add("error");

      }

      return;

    }


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


    if (formMessage) {

      formMessage.classList.remove("error");

      formMessage.textContent =
        "Opening your email application...";

    }


    window.location.href = mailto;

  });

}


/* ================= SCROLL REVEAL ================= */

const revealElements =
  document.querySelectorAll(
    `
    .aluminium-card,
    .product,
    .process-grid div,
    .service-card,
    .project-card,
    .gallery-item,
    .about-content,
    .about-image,
    .contact-box,
    .contact-form,
    section h2,
    section .section-title
    `
  );


const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

          revealObserver.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    }

  );


revealElements.forEach(element => {

  element.classList.add("reveal");

  revealObserver.observe(element);

});


/* ================= STAGGER ANIMATION ================= */

const animationGroups = [
  ".aluminium-card",
  ".product",
  ".service-card",
  ".project-card",
  ".gallery-item",
  ".process-grid div"
];


animationGroups.forEach(selector => {

  const items =
    document.querySelectorAll(selector);

  items.forEach((item, index) => {

    item.style.transitionDelay =
      `${index * 0.08}s`;

  });

});


/* ================= ACTIVE NAVBAR ON SCROLL ================= */

const sections =
  document.querySelectorAll("section[id]");

const navigationLinks =
  document.querySelectorAll(
    '#navMenu a[href^="#"]'
  );


window.addEventListener(
  "scroll",
  () => {

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 150;

      const sectionHeight =
        section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });


    navigationLinks.forEach(link => {

      link.classList.remove("active");

      if (
        link.getAttribute("href") ===
        `#${currentSection}`
      ) {

        link.classList.add("active");

      }

    });

  },
  { passive: true }
);


/* ================= NAVBAR SCROLL EFFECT ================= */

const navbar =
  document.querySelector("nav") ||
  document.querySelector(".navbar") ||
  document.querySelector("header");


function updateNavbar() {

  if (!navbar) return;

  if (window.scrollY > 50) {

    navbar.classList.add("scrolled");

  } else {

    navbar.classList.remove("scrolled");

  }

}


window.addEventListener(
  "scroll",
  updateNavbar,
  { passive: true }
);

updateNavbar();


/* ================= SMOOTH SCROLL ================= */

navigationLinks.forEach(link => {

  link.addEventListener("click", function (event) {

    const targetId =
      this.getAttribute("href");

    if (
      !targetId ||
      targetId === "#" ||
      !targetId.startsWith("#")
    ) {
      return;
    }


    const target =
      document.querySelector(targetId);

    if (!target) return;


    event.preventDefault();


    const navbarHeight =
      navbar ? navbar.offsetHeight : 0;


    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;


    window.scrollTo({

      top: targetPosition,

      behavior: "smooth"

    });

  });

});


/* ================= BUTTON RIPPLE EFFECT ================= */

const buttons =
  document.querySelectorAll(
    "button, .btn, .button, .cta-button"
  );


buttons.forEach(button => {

  button.addEventListener("click", function (event) {

    const ripple =
      document.createElement("span");

    ripple.classList.add("ripple");


    const rect =
      button.getBoundingClientRect();


    const size =
      Math.max(
        rect.width,
        rect.height
      );


    ripple.style.width =
      ripple.style.height =
      `${size}px`;


    ripple.style.left =
      `${event.clientX - rect.left - size / 2}px`;


    ripple.style.top =
      `${event.clientY - rect.top - size / 2}px`;


    this.appendChild(ripple);


    setTimeout(() => {

      ripple.remove();

    }, 600);

  });

});


/* ================= IMAGE HOVER EFFECT ================= */

const images =
  document.querySelectorAll(
    ".product img, .gallery-item img, .about-image img"
  );


images.forEach(image => {

  image.addEventListener("mouseenter", () => {

    image.classList.add("image-hover");

  });


  image.addEventListener("mouseleave", () => {

    image.classList.remove("image-hover");

  });

});


/* ================= COUNTER ANIMATION ================= */

const counters =
  document.querySelectorAll(
    "[data-counter]"
  );


const counterObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;


        const counter =
          entry.target;

        const target =
          parseInt(
            counter.getAttribute("data-counter"),
            10
          );


        if (isNaN(target)) return;


        let current = 0;

        const duration = 1500;

        const increment =
          target / (duration / 16);


        function updateCounter() {

          current += increment;


          if (current < target) {

            counter.textContent =
              Math.ceil(current);

            requestAnimationFrame(
              updateCounter
            );

          } else {

            counter.textContent =
              target;

          }

        }


        updateCounter();

        counterObserver.unobserve(counter);

      });

    },

    {
      threshold: 0.7
    }

  );


counters.forEach(counter => {

  counterObserver.observe(counter);

});


/* ================= BACK TO TOP BUTTON ================= */

let backToTop =
  document.getElementById("backToTop");


if (!backToTop) {

  backToTop =
    document.createElement("button");

  backToTop.id = "backToTop";

  backToTop.setAttribute(
    "aria-label",
    "Back to top"
  );

  backToTop.innerHTML = "↑";

  document.body.appendChild(backToTop);

}


window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 500) {

      backToTop.classList.add("visible");

    } else {

      backToTop.classList.remove("visible");

    }

  },
  { passive: true }
);


backToTop.addEventListener(
  "click",
  () => {

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }
);


/* ================= PAGE LOAD ANIMATION ================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    document.body.classList.add(
      "page-loaded"
    );

  }
);


/* ================= PARALLAX EFFECT ================= */

const hero =
  document.querySelector(".hero");


if (hero) {

  window.addEventListener(
    "scroll",
    () => {

      const scrollPosition =
        window.scrollY;

      if (scrollPosition < window.innerHeight) {

        hero.style.backgroundPosition =
          `center ${scrollPosition * 0.35}px`;

      }

    },
    { passive: true }
  );

}


/* ================= TYPING EFFECT ================= */

const typingElements =
  document.querySelectorAll(
    "[data-typing]"
  );


typingElements.forEach(element => {

  const text =
    element.getAttribute("data-typing");


  if (!text) return;


  element.textContent = "";

  let index = 0;


  function typeText() {

    if (index < text.length) {

      element.textContent +=
        text.charAt(index);

      index++;

      setTimeout(
        typeText,
        60
      );

    }

  }


  typeText();

});


/* ================= MOUSE GLOW EFFECT ================= */

document.addEventListener(
  "mousemove",
  event => {

    document.documentElement.style.setProperty(
      "--mouse-x",
      `${event.clientX}px`
    );

    document.documentElement.style.setProperty(
      "--mouse-y",
      `${event.clientY}px`
    );

  }
);


/* ================= PERFORMANCE SAFETY ================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "fully-loaded"
    );

  }
);
