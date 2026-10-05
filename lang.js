(function(){
  var KEY = 'lb_lang';
  var lang = 'fr';
  try { if (localStorage.getItem(KEY) === 'en') lang = 'en'; } catch(e){}

  var st = document.createElement('style');
  st.textContent = '.lang-toggle{display:inline-flex;align-items:center;align-self:flex-end;gap:.55rem;margin:0 0 1.1rem;font-family:Barlow,sans-serif;font-weight:400;font-size:.82rem;letter-spacing:.06em;text-transform:none;color:inherit;text-decoration:none;cursor:pointer;background:none;border:0;padding:0;-webkit-appearance:none;appearance:none;text-align:right}.lang-toggle:hover{opacity:.6}.lang-toggle svg{display:block;width:24px;height:16px;flex:none;box-shadow:0 0 0 1px rgba(0,0,0,.2)}';
  document.head.appendChild(st);

  var FLAG_GB = '<svg width="24" height="16" viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#012169"/><path d="M0,0 60,40M60,0 0,40" stroke="#fff" stroke-width="8"/><path d="M0,0 60,40M60,0 0,40" stroke="#C8102E" stroke-width="3"/><path d="M30,0V40M0,20H60" stroke="#fff" stroke-width="13"/><path d="M30,0V40M0,20H60" stroke="#C8102E" stroke-width="8"/></svg>';
  var FLAG_FR = '<svg width="24" height="16" viewBox="0 0 3 2" aria-hidden="true"><rect width="1" height="2" fill="#0055A4"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#EF4135"/></svg>';

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
      btns[j].innerHTML = lang === 'en' ? FLAG_FR + '<span>(Version fran\u00e7aise)</span>' : FLAG_GB + '<span>(English version)</span>';
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
