const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');
if(menuBtn && nav){
  menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

/* ---------- Settings ---------- */
const WHATSAPP_NUMBER = '27659676396'; // international format, no + or spaces
const WHATSAPP_GREETING = 'Hi Iverflow Global, I would like to enquire about a project.';

/* ---------- Floating WhatsApp bubble (all pages) ---------- */
(function(){
  const a = document.createElement('a');
  a.className = 'wa-bubble';
  a.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_GREETING);
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label','Chat with us on WhatsApp');
  a.innerHTML = '<span class="wa-tip">Chat with us on WhatsApp</span><svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><path fill="currentColor" d="M16 3C9 3 3.3 8.6 3.3 15.5c0 2.4.7 4.7 1.9 6.6L3 29l7.1-2.1c1.9 1 4 1.6 6.2 1.6 7 0 12.7-5.6 12.7-12.5S23 3 16 3zm0 22.9c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.2 1.2 1.3-4-.3-.4a10.2 10.2 0 0 1-1.6-5.4C5.3 9.9 10.1 5.2 16 5.2s10.7 4.7 10.7 10.3S21.9 25.9 16 25.9zm5.9-7.7c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.200-.2.200-.4.200-.7.100-.3-.2-1.400-.5-2.600-1.600-1-.9-1.600-1.900-1.800-2.200-.2-.3 0-.5.100-.7l.5-.5c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1 1-1 2.400s1 2.800 1.200 3c.1.200 2 3.100 4.900 4.300.7.300 1.200.5 1.600.6.7.2 1.300.2 1.800.1.600-.1 1.900-.8 2.100-1.500.3-.7.300-1.400.2-1.500-.1-.1-.3-.2-.6-.4z"/></svg>';
  document.body.appendChild(a);
})();

/* ---------- Contact form ---------- */
const form = document.querySelector('#contact-form');
if(form){
  const message = document.querySelector('#form-message');
  const show = (text, ok) => { message.textContent = text; message.style.color = ok ? '#26734d' : '#b3261e'; };

  // Send by email (via FormSubmit)
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const label = btn.innerHTML;
    btn.disabled = true; btn.textContent = 'Sending...';
    show('', true);
    try{
      const res = await fetch(form.action, {
        method:'POST',
        headers:{'Accept':'application/json'},
        body:new FormData(form)
      });
      const data = await res.json();
      if(res.ok && (data.success === true || data.success === 'true')){
        show('Thank you! Your enquiry has been sent. We will get back to you shortly.', true);
        form.reset();
      }else{
        throw new Error(data.message || 'Request failed');
      }
    }catch(err){
      show('Sorry, your enquiry could not be sent. Please try again, or message us on WhatsApp or at iverny26@gmail.com.', false);
    }finally{
      btn.disabled = false; btn.innerHTML = label;
    }
  });

  // Send via WhatsApp (opens chat with details pre-filled)
  const waBtn = document.querySelector('#wa-send');
  if(waBtn){
    waBtn.addEventListener('click', () => {
      if(!form.reportValidity()) return;
      const v = n => (form.elements[n] && form.elements[n].value.trim()) || '-';
      const text = 'New enquiry from the website\n\n' +
        'Name: ' + v('name') + '\n' +
        'Email: ' + v('email') + '\n' +
        'Phone: ' + v('phone') + '\n' +
        'Business: ' + v('company') + '\n' +
        'Service: ' + v('service') + '\n\n' +
        'Project: ' + v('message');
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  }
}
