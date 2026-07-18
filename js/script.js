// Nav scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
function closeMob() { document.getElementById('mobMenu').classList.remove('open'); }

// Notification bar dismiss (stays hidden for the rest of the browsing session)
function closeNotif() {
  const bar = document.getElementById('notifBar');
  if (bar) bar.style.display = 'none';
  try { sessionStorage.setItem('notifClosed', '1'); } catch (e) {}
}
if (window.sessionStorage && sessionStorage.getItem('notifClosed') === '1') {
  document.addEventListener('DOMContentLoaded', () => {
    const bar = document.getElementById('notifBar');
    if (bar) bar.style.display = 'none';
  });
}

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
// FORM SUBMISSION → Formspree (https://formspree.io)
// Each form posts to the URL in its own `action` attribute, so you
// only manage the endpoint in the HTML. On success the form is
// hidden and its success message is shown, without leaving the page.
// (First time: submit once, then confirm the email Formspree sends
//  you, so future submissions arrive automatically.)
// ─────────────────────────────────────────────────────────────
async function submitForm(e, formId, successId) {
  e.preventDefault();
  const form = document.getElementById(formId);
  const btn = form.querySelector('button[type="submit"]');
  const originalLabel = btn.innerHTML;

  btn.disabled = true;
  btn.innerHTML = "Sending…";

  try {
    const res = await fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    });
    if (res.ok) {
      form.style.display = "none";
      document.getElementById(successId).style.display = "block";
    } else {
      const result = await res.json().catch(() => ({}));
      throw new Error((result.errors && result.errors[0] && result.errors[0].message) || "Submission failed");
    }
  } catch (err) {
    btn.disabled = false;
    btn.innerHTML = originalLabel;
    alert("Sorry, something went wrong sending your message. Please try again, or email us directly at contact@resiliofoundation.in.");
  }
}

function handleVolSubmit(e) {
  submitForm(e, "volForm", "volSuccess");
}
function handleContactSubmit(e) {
  submitForm(e, "contactForm", "contactSuccess");
}
