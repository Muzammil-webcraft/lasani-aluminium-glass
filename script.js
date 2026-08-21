/* =========================================
   LASANI ALUMINIUM GLASS & SS STEEL
   FINAL MAIN JAVASCRIPT
   Animations + Formspree Integration
========================================= */


/* =========================================
   DOM READY
========================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =========================================
     MOBILE MENU
  ========================================= */

  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

      navMenu.classList.toggle("active");
      menuBtn.classList.toggle("active");

      const isOpen =
        navMenu.classList.contains("active");

      menuBtn.setAttribute(
        "aria-expanded",
        isOpen
      );

    });


    /* Close menu after clicking a link */

    const navLinks =
      navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

      link.addEventListener("click", () => {

        navMenu.classList.remove("active");
        menuBtn.classList.remove("active");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =========================================
     FOOTER YEAR
  ========================================= */

  const year =
    document.getElementById("year");

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =========================================
     FORMspree CONTACT FORM
  ========================================= */

  const contactForm =
    document.getElementById("contactForm");

  const formMessage =
    document.getElementById("formMessage");


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();


        /* Prevent multiple submissions */

        const submitButton =
          contactForm.querySelector(
            'button[type="submit"], input[type="submit"]'
          );


        const originalButtonText =
          submitButton
            ? submitButton.textContent
            : "";


        if (submitButton) {

          submitButton.disabled = true;
          submitButton.textContent =
            "Sending...";

        }


        if (formMessage) {

          formMessage.textContent =
            "Sending your enquiry...";

          formMessage.classList.remove(
            "error",
            "success"
          );

        }


        try {

          const formData =
            new FormData(contactForm);


          const response =
            await fetch(
              "https://formspree.io/f/xkjwybkk",
              {
                method: "POST",
                body: formData,
                headers: {
                  "Accept":
                    "application/json"
                }
              }
            );


          if (response.ok) {

            /* =========================
               SUCCESS
            ========================= */

            if (formMessage) {

              formMessage.textContent =
                "Thank you! Your enquiry has been sent successfully.";

              formMessage.classList.add(
                "success"
              );

            }


            contactForm.reset();


          } else {

            /* =========================
               FORM ERROR
            ========================= */

            let errorMessage =
              "Something went wrong. Please try again.";


            try {

              const data =
                await response.json();


              if (
                data &&
                data.errors &&
                data.errors.length
              ) {

                errorMessage =
                  data.errors
                    .map(error => error.message)
                    .join(" ");

              }

            } catch (error) {

              /* Keep default error message */

            }


            if (formMessage) {

              formMessage.textContent =
                errorMessage;

              formMessage.classList.add(
                "error"
              );

            }

          }


        } catch (error) {

          /* =========================
             NETWORK ERROR
          ========================= */

          if (formMessage) {

            formMessage.textContent =
              "Unable to send your enquiry. Please check your internet connection and try again.";

            formMessage.classList.add(
              "error"
            );

          }

        }


        /* Restore button */

        if (submitButton) {

          submitButton.disabled = false;

          submitButton.textContent =
            originalButtonText ||
            "Send Enquiry";

        }

      }
    );

  }


  /* =========================================
     SCROLL REVEAL
  ========================================= */

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
      .contact-grid,
      .showcase-content,
      .showcase-image,
      .glass-grid > div,
      .steel-grid > div,
      .cta-content,
      section h2,
      section .section-title,
      .center-title
      `
    );


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "show"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },

        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -50px 0px"
        }

      );


    revealElements.forEach(
      element => {

        element.classList.add(
          "reveal"
        );

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    /* Browser fallback */

    revealElements.forEach(
      element => {

        element.classList.add(
          "show"
        );

      }
    );

  }


  /* =========================================
     STAGGER CARD ANIMATION
  ========================================= */

  const animationGroups = [
    ".aluminium-card",
    ".product",
    ".service-card",
    ".project-card",
    ".gallery-item",
    ".process-grid div"
  ];


  animationGroups.forEach(
    selector => {

      const items =
        document.querySelectorAll(
          selector
        );


      items.forEach(
        (item, index) => {

          item.style.transitionDelay =
            `${index * 0.08}s`;

        }
      );

    }
  );


  /* =========================================
     ACTIVE NAVBAR LINK
  ========================================= */

  const sections =
    document.querySelectorAll(
      "section[id]"
    );

  const navigationLinks =
    document.querySelectorAll(
      '#navMenu a[href^="#"]'
    );


  function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 160;

      const sectionHeight =
        section.offsetHeight;


      if (
        window.scrollY >= sectionTop &&
        window.scrollY <
          sectionTop + sectionHeight
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });


    navigationLinks.forEach(link => {

      link.classList.remove(
        "active"
      );


      if (
        link.getAttribute("href") ===
        `#${currentSection}`
      ) {

        link.classList.add(
          "active"
        );

      }

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
      passive: true
    }
  );


  updateActiveNavigation();


  /* =========================================
     NAVBAR SCROLL EFFECT
  ========================================= */

  const navbar =
    document.querySelector(
      ".header"
    ) ||
    document.querySelector(
      ".navbar"
    ) ||
    document.querySelector(
      "nav"
    );


  function updateNavbar() {

    if (!navbar) return;


    if (window.scrollY > 50) {

      navbar.classList.add(
        "scrolled"
      );

    } else {

      navbar.classList.remove(
        "scrolled"
      );

    }

  }


  window.addEventListener(
    "scroll",
    updateNavbar,
    {
      passive: true
    }
  );


  updateNavbar();


  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  navigationLinks.forEach(
    link => {

      link.addEventListener(
        "click",
        function (event) {

          const targetId =
            this.getAttribute(
              "href"
            );


          if (
            !targetId ||
            targetId === "#" ||
            !targetId.startsWith("#")
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) return;


          event.preventDefault();


          const navbarHeight =
            navbar
              ? navbar.offsetHeight
              : 0;


          const targetPosition =
            target.getBoundingClientRect()
              .top +
            window.scrollY -
            navbarHeight;


          window.scrollTo({

            top:
              targetPosition,

            behavior:
              "smooth"

          });

        }
      );

    }
  );


  /* =========================================
     BUTTON RIPPLE EFFECT
  ========================================= */

  const buttons =
    document.querySelectorAll(
      "button, .btn, .button, .cta-button"
    );


  buttons.forEach(
    button => {

      button.addEventListener(
        "click",
        function (event) {

          const ripple =
            document.createElement(
              "span"
            );


          ripple.classList.add(
            "ripple"
          );


          const rect =
            button.getBoundingClientRect();


          const size =
            Math.max(
              rect.width,
              rect.height
            );


          ripple.style.width =
            `${size}px`;

          ripple.style.height =
            `${size}px`;


          ripple.style.left =
            `${
              event.clientX -
              rect.left -
              size / 2
            }px`;


          ripple.style.top =
            `${
              event.clientY -
              rect.top -
              size / 2
            }px`;


          this.appendChild(
            ripple
          );


          setTimeout(
            () => {

              ripple.remove();

            },
            600
          );

        }
      );

    }
  );


  /* =========================================
     IMAGE HOVER EFFECT
  ========================================= */

  const images =
    document.querySelectorAll(
      `
      .product img,
      .gallery-item img,
      .about-image img,
      .showcase-image img
      `
    );


  images.forEach(
    image => {

      image.addEventListener(
        "mouseenter",
        () => {

          image.classList.add(
            "image-hover"
          );

        }
      );


      image.addEventListener(
        "mouseleave",
        () => {

          image.classList.remove(
            "image-hover"
          );

        }
      );

    }
  );


  /* =========================================
     COUNTER ANIMATION
     
     Example:
     <strong data-counter="15">0</strong>
  ========================================= */

  const counters =
    document.querySelectorAll(
      "[data-counter]"
    );


  if (
    counters.length &&
    "IntersectionObserver" in window
  ) {

    const counterObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            const counter =
              entry.target;


            const target =
              parseInt(
                counter.getAttribute(
                  "data-counter"
                ),
                10
              );


            if (isNaN(target)) {

              return;

            }


            let current = 0;

            const duration = 1500;

            const startTime =
              performance.now();


            function updateCounter(
              currentTime
            ) {

              const elapsed =
                currentTime -
                startTime;


              const progress =
                Math.min(
                  elapsed /
                    duration,
                  1
                );


              const easedProgress =
                1 -
                Math.pow(
                  1 - progress,
                  3
                );


              current =
                Math.floor(
                  target *
                  easedProgress
                );


              counter.textContent =
                current;


              if (
                progress < 1
              ) {

                requestAnimationFrame(
                  updateCounter
                );

              } else {

                counter.textContent =
                  target;

              }

            }


            requestAnimationFrame(
              updateCounter
            );


            counterObserver.unobserve(
              counter
            );

          });

        },

        {
          threshold: 0.7
        }

      );


    counters.forEach(
      counter => {

        counterObserver.observe(
          counter
        );

      }
    );

  }


  /* =========================================
     BACK TO TOP BUTTON
  ========================================= */

  let backToTop =
    document.getElementById(
      "backToTop"
    );


  if (!backToTop) {

    backToTop =
      document.createElement(
        "button"
      );


    backToTop.id =
      "backToTop";


    backToTop.setAttribute(
      "aria-label",
      "Back to top"
    );


    backToTop.type =
      "button";


    backToTop.innerHTML =
      "↑";


    document.body.appendChild(
      backToTop
    );

  }


  function updateBackToTop() {

    if (
      window.scrollY > 500
    ) {

      backToTop.classList.add(
        "visible"
      );

    } else {

      backToTop.classList.remove(
        "visible"
      );

    }

  }


  window.addEventListener(
    "scroll",
    updateBackToTop,
    {
      passive: true
    }
  );


  updateBackToTop();


  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }
  );


  /* =========================================
     HERO PARALLAX
  ========================================= */

  const hero =
    document.querySelector(
      ".hero"
    );


  if (hero) {

    window.addEventListener(
      "scroll",
      () => {

        const scrollPosition =
          window.scrollY;


        if (
          scrollPosition <
          window.innerHeight
        ) {

          hero.style.backgroundPosition =
            `center ${
              scrollPosition * 0.35
            }px`;

        }

      },
      {
        passive: true
      }
    );

  }


  /* =========================================
     TYPING EFFECT
     
     Example:
     <h2 data-typing="Lasani Aluminium">
     ========================================= */

  const typingElements =
    document.querySelectorAll(
      "[data-typing]"
    );


  typingElements.forEach(
    element => {

      const text =
        element.getAttribute(
          "data-typing"
        );


      if (!text) return;


      element.textContent =
        "";


      let index = 0;


      function typeText() {

        if (
          index <
          text.length
        ) {

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

    }
  );


  /* =========================================
     MOUSE GOLD GLOW
  ========================================= */

  let mouseTicking =
    false;


  document.addEventListener(
    "mousemove",
    event => {

      if (mouseTicking) return;


      mouseTicking = true;


      requestAnimationFrame(
        () => {

          document.documentElement
            .style
            .setProperty(
              "--mouse-x",
              `${event.clientX}px`
            );


          document.documentElement
            .style
            .setProperty(
              "--mouse-y",
              `${event.clientY}px`
            );


          mouseTicking =
            false;

        }
      );

    }
  );


  /* =========================================
     CONTACT FORM INPUT ANIMATION
  ========================================= */

  const formInputs =
    document.querySelectorAll(
      `
      #contactForm input,
      #contactForm textarea,
      #contactForm select
      `
    );


  formInputs.forEach(
    input => {

      input.addEventListener(
        "focus",
        () => {

          input.parentElement?.classList.add(
            "focused"
          );

        }
      );


      input.addEventListener(
        "blur",
        () => {

          input.parentElement?.classList.remove(
            "focused"
          );

        }
      );

    }
  );


  /* =========================================
     PAGE LOAD
  ========================================= */

  document.body.classList.add(
    "page-loaded"
  );

});


/* =========================================
   FULL PAGE LOAD
========================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "fully-loaded"
    );

  }
);
