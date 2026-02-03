const btn = document.getElementById("menu-btn");
const menu = document.querySelector(".menu");

if (btn && menu) {
  btn.addEventListener('click', () => {
    btn.classList.toggle("active");
    menu.classList.toggle("active");
  });
}

// ===== АНИМАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.why-item');

  items.forEach((item, index) => {
    // направление
    if (index % 2 === 0) {
      item.classList.add('from-left');
    } else {
      item.classList.add('from-right');
    }

    // задержка
    item.style.transitionDelay = `${index * 120}ms`;
  });

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  items.forEach(item => observer.observe(item));
});