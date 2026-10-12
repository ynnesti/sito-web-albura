// Albura - CSS scroll animations via IntersectionObserver
(function() {
  var style = document.createElement('style');
  style.textContent = [
    '.anim-slide{opacity:0;transform:translateY(20px);transition:opacity .5s ease,transform .5s ease}',
    '.anim-slide.visible{opacity:1;transform:translateY(0)}',
    '.anim-fade{opacity:0;transition:opacity .6s ease}',
    '.anim-fade.visible{opacity:1}'
  ].join('');
  document.head.appendChild(style);

  var DELAY = 200; // ms prima che parta l'animazione

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        observer.unobserve(el);
        setTimeout(function() { el.classList.add('visible'); }, DELAY);
      }
    });
  }, { threshold: 0 });

  document.querySelectorAll('.centro-punto-css').forEach(function(el) {
    el.classList.add('anim-slide');
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      // già in viewport al caricamento
      setTimeout(function() { el.classList.add('visible'); }, DELAY);
    } else {
      observer.observe(el);
    }
  });
})();
