(function(){
  var KEY = 'lb_lang';
  var lang = 'fr';
  try { if (localStorage.getItem(KEY) === 'en') lang = 'en'; } catch(e){}

  var style = document.createElement('style');
  style.textContent = '.lang-toggle{font-size:.72em;padding:.25rem .55rem !important;letter-spacing:.14em;cursor:pointer}';
  document.head.appendChild(style);

  window.t = function(fr, en){ return lang === 'en' ? en : fr; };
  window.onLangChange = window.onLangChange || [];

  function apply(){
    var els = document.querySelectorAll('[data-en]');
    for (var i = 0; i < els.length; i++){
      var el = els[i];
      if (!el.hasAttribute('data-fr')) el.setAttribute('data-fr', el.innerHTML);
      el.innerHTML = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-fr');
    }
    document.documentElement.lang = lang;
    var btns = document.querySelectorAll('.lang-toggle');
    for (var j = 0; j < btns.length; j++){
      btns[j].textContent = lang === 'en' ? 'FR' : 'ENG';
      btns[j].setAttribute('aria-label', lang === 'en' ? 'Passer en français' : 'Switch to English');
    }
    for (var k = 0; k < window.onLangChange.length; k++){
      try { window.onLangChange[k](lang); } catch(e){}
    }
  }

  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('.lang-toggle');
    if (!b) return;
    e.preventDefault();
    lang = lang === 'en' ? 'fr' : 'en';
    try { localStorage.setItem(KEY, lang); } catch(err){}
    apply();
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();
