"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let sideNavOpen = false;

  const sideBar = document.getElementById("sideBar");
  const sideNav = document.getElementById("sideNav");
  const checkbox = document.getElementById("checkbox");
  const canvas = document.getElementById("matrix-rain");
  const context = canvas.getContext("2d");
  const sequence = "SAFECSS ";
  let currentCharIndex = 0;
  let fontSize = 16;
  let columns = Math.floor(window.innerWidth / fontSize);
  let raindrops = Array(columns).fill(0);

  canvas.width = window.innerWidth;
  canvas.height = 300;

  const openNav = () => {
    if (window.innerWidth < 750) {
      sideBar.style.width = "100%";
      sideNav.style.width = "100%";
    } else {
      sideBar.style.width = "100%";
      sideNav.style.width = "60%";
    }
    sideNavOpen = true;
  };

  const exitNav = () => {
    sideBar.style.width = "0";
    sideNav.style.width = "0";
    sideNavOpen = false;
  };

  const adjustNav = () => {
    if (sideNavOpen) {
      if (window.innerWidth < 750) {
        sideBar.style.width = "100%";
        sideNav.style.width = "100%";
      } else {
        sideBar.style.width = "100%";
        sideNav.style.width = "60%";
      }
    }
  };

  const closeNavOnClickOutside = (event) => {
    if (
      sideNavOpen &&
      !sideNav.contains(event.target) &&
      !event.target.closest("#openNav")
    ) {
      exitNav();
    }
  };

  document.getElementById("openNav").addEventListener("click", openNav);
  document.getElementById("exitNav").addEventListener("click", exitNav);
  window.addEventListener("resize", adjustNav);
  document.addEventListener("click", closeNavOnClickOutside);

  document.querySelectorAll("#sideNav a").forEach((link) => {
    link.addEventListener("click", exitNav);
  });

  const isDarkMode = localStorage.getItem("darkMode") === "true";

  if (isDarkMode) {
    document.documentElement.classList.add("dark");
    checkbox.checked = true;
  }

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
    draw();
  };

  checkbox.addEventListener("change", toggleDarkMode);

  const updateCanvasForDarkMode = () => {
    context.fillStyle = document.documentElement.classList.contains("dark")
      ? "rgba(0, 0, 0, 0.05)"
      : "rgba(255, 255, 255, 0.20)";
  };

  const draw = () => {
    updateCanvasForDarkMode();
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#4080bf";
    context.font = `${fontSize}px monospace`;

    for (let i = 0; i < raindrops.length; i++) {
      if (raindrops[i] * fontSize < canvas.height) {
        const text = sequence.charAt((currentCharIndex + i) % sequence.length);
        context.fillText(text, i * fontSize, raindrops[i] * fontSize);
        raindrops[i]++;
      } else if (Math.random() > 0.975) {
        raindrops[i] = 0;
        currentCharIndex = (currentCharIndex + 1) % sequence.length;
      }
    }
  };

  let previousWidth = window.innerWidth;

  const resizeCanvas = () => {
    if (window.innerWidth !== previousWidth) {
      canvas.width = window.innerWidth;
      canvas.height = 300;
      columns = Math.floor(window.innerWidth / fontSize);
      raindrops = Array(columns).fill(0);
      previousWidth = window.innerWidth;
    }
  };

  window.addEventListener("resize", () => {
    resizeCanvas();
    draw();
  });

  setInterval(draw, 36); // Slow down by about 20%

  // Reset the animation every 5 seconds
  setInterval(() => {
    raindrops = Array(columns).fill(0);
    currentCharIndex = 0;
  }, 5000);

  const cards = [
    {
      image: "./assets/images/tailwindcss.svg",
      title: "Built on Tailwind CSS",
      description:
        "SafeCSS retains the simplicity and ease of use of Tailwind CSS, making it familiar to developers who are already familiar with the framework.",
    },
    {
      image: "./assets/images/security.svg",
      title: "Regular Security Audits",
      description:
        "Our team conducts regular security audits to identify and address any vulnerabilities in the SafeCSS codebase.",
    },
    {
      image: "./assets/images/fix.svg",
      title: "Custom Security Fixes",
      description:
        "In cases where third-party dependencies are abandoned or insecure, the SafeCSS team rewrites the code from scratch, following the latest security best practices.",
    },
  ];

  const cardContainer = document.getElementById("card-container");

  cards.forEach((card) => {
    const cardHtml = `
            <div class="bg-white p-6 rounded-lg shadow-2xl flex flex-col text-center md:hover:scale-105 transition duration-150 ease-in dark:bg-sky-400 justify-center">
                <img src="${card.image}" alt="${card.title}" class="mb-4 max-h-52">
                <h3 class="text-xl font-play mb-2">${card.title}</h3>
                <p class="text-black font-titilium">${card.description}</p>
            </div>
        `;
    cardContainer.innerHTML += cardHtml;
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
