/* =========================================
   LASANI ALUMINIUM GLASS & SS STEEL
   Main JavaScript
========================================= */


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

  menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

  });

}


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

if (contactForm) {

  contactForm.addEventListener("submit", async function(event) {

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


    /* Basic validation */

    if (!name || !phone) {

      if (formMessage) {

        formMessage.textContent =
          "Please enter your name and phone number.";

      }

      return;

    }


    /* Disable button while sending */

    const submitButton =
      contactForm.querySelector('button[type="submit"]');

    const originalButtonText =
      submitButton ? submitButton.textContent : "Send Enquiry";


    if (submitButton) {

      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

    }


    try {

      /*
        Formspree Endpoint
      */

      const response = await fetch(
        "https://formspree.io/f/xkjwybkk",
        {
          method: "POST",

          body: new FormData(contactForm),

          headers: {
            "Accept": "application/json"
          }
        }
      );


      if (response.ok) {

        if (formMessage) {

          formMessage.textContent =
            "Thank you! Your enquiry has been sent successfully.";

        }

        /* Clear form */

        contactForm.reset();

      } else {

        if (formMessage) {

          formMessage.textContent =
            "Something went wrong. Please try again.";

        }

      }

    } catch (error) {

      if (formMessage) {

        formMessage.textContent =
          "Unable to send your enquiry. Please try again.";

      }

      console.error("Formspree Error:", error);

    }


    /* Restore button */

    if (submitButton) {

      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;

    }

  });

}


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

          observer.unobserve(entry.target);

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