// Course cards — navigate on click anywhere on available cards
document.querySelectorAll('.course-card.available').forEach(card => {
  const link = card.querySelector('.card-link');
  if (!link || link.classList.contains('disabled')) return;
  card.addEventListener('click', e => {
    if (e.target.closest('.card-link')) return;
    window.location.href = link.href;
  });
});
