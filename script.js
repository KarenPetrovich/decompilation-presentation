const progressBar = document.querySelector('#progressBar');
const chapterLabel = document.querySelector('#chapterLabel');
const scenes = [...document.querySelectorAll('[data-chapter]')];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const chapterObserver = new IntersectionObserver((entries) => {
  const active = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
  if (active) chapterLabel.textContent = active.target.dataset.chapter;
}, { threshold: [0.35,0.6] });
scenes.forEach((scene) => chapterObserver.observe(scene));

const updateProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
};
addEventListener('scroll', updateProgress, { passive: true });
addEventListener('resize', updateProgress);
updateProgress();

const sources = document.querySelector('#sources');
const sourcesButton = document.querySelector('#sourcesButton');
const sourcesClose = document.querySelector('#sourcesClose');
let previousFocus;
const openSources = () => {
  previousFocus = document.activeElement;
  sources.hidden = false;
  document.body.style.overflow = 'hidden';
  sourcesClose.focus();
};
const closeSources = () => {
  sources.hidden = true;
  document.body.style.overflow = '';
  previousFocus?.focus();
};
sourcesButton.addEventListener('click', openSources);
sourcesClose.addEventListener('click', closeSources);
sources.addEventListener('click', (event) => {
  if (event.target === sources) closeSources();
});
addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !sources.hidden) closeSources();
});
