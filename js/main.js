// main.js
// Handles mobile nav, project filtering, and form validation

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

// Project filtering
const filterButtons = document.querySelectorAll('.filters button');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.tags.includes(filter)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Contact form validation
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    if (!name.value || !email.value || !message.value) {
      e.preventDefault();
      alert('Please fill in all fields.');
    }
  });
}
