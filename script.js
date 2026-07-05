// Nav scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
function closeMob() { document.getElementById('mobMenu').classList.remove('open'); }

// Scroll reveal + counters
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      e.target.querySelectorAll('[data-target]').forEach(animateNum);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Number counter
function animateNum(el) {
  const target = parseInt(el.dataset.target);
  if (!target) return;
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString('en-IN') + (target >= 1000 ? '+' : '');
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Smooth scroll with header offset
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const headerH = document.querySelector('.site-header')?.offsetHeight || 80;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - headerH - 12, behavior: 'smooth' });
    }
  });
});

// Modals
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
function handleBackdropClick(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m.id));
  }
});

// ─────────────────────────────────────────────────────────────
// FORM SUBMISSION → email via Web3Forms (https://web3forms.com)
// STEP 1: Get your free access key at https://web3forms.com
//         (enter kirtish1709@gmail.com, they email you a key).
// STEP 2: Paste that key between the quotes below. That's it —
//         both the volunteer and contact forms will start
//         emailing kirtish1709@gmail.com.
// ─────────────────────────────────────────────────────────────
const WEB3FORMS_ACCESS_KEY = "PASTE-YOUR-ACCESS-KEY-HERE";

async function submitForm(e, formId, successId, subject) {
  e.preventDefault();
  const form = document.getElementById(formId);
  const btn = form.querySelector('button[type="submit"]');
  const originalLabel = btn.innerHTML;

  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.startsWith("PASTE")) {
    alert("This form isn't connected yet. Add your Web3Forms access key in js/script.js.");
    return;
  }

  btn.disabled = true;
  btn.innerHTML = "Sending…";

  const data = new FormData(form);
  data.append("access_key", WEB3FORMS_ACCESS_KEY);
  data.append("subject", subject);
  data.append("from_name", "Resilio Foundation Website");

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data
    });
    const result = await res.json();
    if (result.success) {
      form.style.display = "none";
      document.getElementById(successId).style.display = "block";
    } else {
      throw new Error(result.message || "Submission failed");
    }
  } catch (err) {
    btn.disabled = false;
    btn.innerHTML = originalLabel;
    alert("Sorry, something went wrong sending your message. Please try again, or email us directly at contact@resiliofoundation.in.");
  }
}

function handleVolSubmit(e) {
  submitForm(e, "volForm", "volSuccess", "New Volunteer Interest — Resilio Foundation");
}
function handleContactSubmit(e) {
  submitForm(e, "contactForm", "contactSuccess", "New Contact Message — Resilio Foundation");
}
