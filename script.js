// ---------- TYPEWRITER EFFECT ----------
const roles = [
  "Data Scientist",
  "Data Analyst",
  "Machine Learning Engineer"
];

let i = 0;
let j = 0;
let currentRole = "";
let isDeleting = false;

function typeEffect() {
  const typingEl = document.getElementById("typing");
  currentRole = roles[i];

  if (isDeleting) {
    typingEl.textContent = currentRole.substring(0, j--);
    if (j < 0) {
      isDeleting = false;
      i = (i + 1) % roles.length;
    }
  } else {
    typingEl.textContent = currentRole.substring(0, j++);
    if (j > currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? 80 : 150);
}

document.addEventListener("DOMContentLoaded", typeEffect);


// ---------- DARK MODE TOGGLE ----------
const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('i');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const darkMode = document.body.classList.contains('dark-mode');
  icon.classList = darkMode ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('dark-mode', darkMode);
});

if (localStorage.getItem('dark-mode') === 'true') {
  document.body.classList.add('dark-mode');
  icon.classList = 'fas fa-sun';
}


// ---------- MOBILE NAV TOGGLE ----------
const nav = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.innerHTML = nav.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});


// ---------- SCROLL FADE-IN ----------
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".timeline-content, .project-card, .edu-card").forEach(el => observer.observe(el));


// ---------- SKILLS BAR ANIMATION ----------
const skillBars = document.querySelectorAll(".skill-bar");

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const level = bar.getAttribute("data-level");
      bar.style.setProperty('--level', level + '%');
      bar.querySelector('::after');
      bar.style.width = level + "%";
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));


// ---------- PROJECT FILTER ----------
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block";
        card.classList.add("fade-in");
      } else {
        card.style.display = "none";
        card.classList.remove("fade-in");
      }
    });
  });
});
