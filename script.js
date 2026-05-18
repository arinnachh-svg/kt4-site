var menuBtn = document.getElementById('menu-btn');
var navLinks = document.getElementById('nav-links');

if (menuBtn) {
  menuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('open');
  });
}

var slides = document.querySelectorAll('.slide');
var dots = document.querySelectorAll('.dot');
var prevBtn = document.querySelector('.prev');
var nextBtn = document.querySelector('.next');
var currentSlide = 0;

function showSlide(index) {
  slides.forEach(function(slide) {
    slide.classList.remove('active');
  });
  dots.forEach(function(dot) {
    dot.classList.remove('active');
  });
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

if (slides.length > 0) {
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      showSlide(currentSlide - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      showSlide(currentSlide + 1);
    });
  }
  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() {
      showSlide(i);
    });
  });
}

var tabs = document.querySelectorAll('.tab');
var tabContents = document.querySelectorAll('.tab-content');

if (tabs.length > 0) {
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      tabContents.forEach(function(c) { c.classList.remove('active'); });
      tab.classList.add('active');
      var target = document.getElementById(tab.getAttribute('data-target'));
      if (target) target.classList.add('active');
    });
  });
}

var contactForm = document.getElementById('contact-form');
var formMsg = document.getElementById('form-msg');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var message = document.getElementById('message');
    var valid = true;

    [name, email, message].forEach(function(field) {
      field.style.borderColor = '';
    });

    if (!name.value.trim()) { name.style.borderColor = '#c0392b'; valid = false; }
    if (!email.value.trim()) { email.style.borderColor = '#c0392b'; valid = false; }
    if (!message.value.trim()) { message.style.borderColor = '#c0392b'; valid = false; }

    if (valid) {
      formMsg.style.color = '#5a4a3a';
      formMsg.textContent = 'Заявка отправлена. Свяжемся с вами в течение дня.';
      contactForm.reset();
    } else {
      formMsg.style.color = '#c0392b';
      formMsg.textContent = 'Пожалуйста, заполните все обязательные поля.';
    }
  });
}
