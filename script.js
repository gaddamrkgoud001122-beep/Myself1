(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const style = document.createElement('style');
  style.textContent = '.motion-cursor{position:fixed;width:280px;height:280px;border-radius:50%;pointer-events:none;z-index:20;opacity:.22;background:radial-gradient(circle,rgba(174,115,68,.28),transparent 67%);transform:translate(-50%,-50%);mix-blend-mode:multiply}.page-wipe{position:fixed;inset:0;z-index:30;pointer-events:none;background:#1f2933;opacity:0;transition:opacity .22s}.page-wipe.on{opacity:.13}.photo-panel img,.sticky-photo img,.expertise-image img{will-change:transform;transition:transform .65s cubic-bezier(.2,.65,.2,1)}.expertise-card,.credential-card,.timeline-item{transition:transform .35s,box-shadow .35s}.expertise-card:hover,.credential-card:hover,.timeline-item:hover{transform:translateY(-7px);box-shadow:0 18px 36px rgba(31,41,51,.1)}@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}.motion-cursor,.page-wipe{display:none}}';
  document.head.append(style);

  const roles = ['Outpatient Coding Education Analyst','Revenue Cycle Analyst','Health Informatics Professional','Medical Coding & Compliance Specialist'];
  const roleText = document.getElementById('roleText'); let roleIndex = 0;
  if (roleText && !reduce) setInterval(() => {
    roleText.style.opacity = '0'; roleText.style.transform = 'translateY(10px)';
    setTimeout(() => { roleIndex = (roleIndex + 1) % roles.length; roleText.textContent = roles[roleIndex]; roleText.style.opacity = '1'; roleText.style.transform = 'translateY(0)'; }, 260);
  }, 3200);

  const reveals = [...document.querySelectorAll('.reveal')];
  reveals.forEach((item, index) => item.style.transitionDelay = Math.min(index % 4 * 80, 240) + 'ms');
  if (reduce || !window.IntersectionObserver) reveals.forEach(item => item.classList.add('visible'));
  else { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold:.14,rootMargin:'0px 0px -55px 0px'}); reveals.forEach(item => observer.observe(item)); }

  const progress = document.getElementById('progressBar');
  const scrollEffects = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
    if (!reduce) document.querySelectorAll('.photo-panel img,.sticky-photo img,.expertise-image img').forEach((image, index) => { const box = image.getBoundingClientRect(); const shift = Math.max(-18, Math.min(18, (innerHeight / 2 - box.top - box.height / 2) * (index % 2 ? .025 : .04))); image.style.transform = 'scale(1.035) translateY(' + shift + 'px)'; });
  };
  addEventListener('scroll', scrollEffects, {passive:true}); scrollEffects();

  const wipe = document.createElement('div'); wipe.className = 'page-wipe'; document.body.append(wipe);
  const go = target => { wipe.classList.add('on'); setTimeout(() => { target.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}); setTimeout(() => wipe.classList.remove('on'), 280); }, 100); };
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => { const target = document.querySelector(link.getAttribute('href')); if (target) { event.preventDefault(); go(target); } }));
  const explore = document.getElementById('exploreBtn'); if (explore) explore.addEventListener('click', () => go(document.getElementById('about')));

  if (!reduce && matchMedia('(pointer:fine)').matches) { const cursor = document.createElement('div'); cursor.className = 'motion-cursor'; document.body.append(cursor); addEventListener('pointermove', event => { cursor.style.left = event.clientX + 'px'; cursor.style.top = event.clientY + 'px'; }, {passive:true}); }
})();
