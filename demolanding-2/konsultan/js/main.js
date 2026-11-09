(function(){var d=document,$=function(i){return d.getElementById(i)},nb=$('nb'),bt=$('bt');
$('mb').onclick=function(){var o=nb.classList.toggle('open');this.setAttribute('aria-expanded',o)};
var t=0;addEventListener('scroll',function(){if(t)return;t=requestAnimationFrame(function(){t=0;var y=scrollY;nb.classList.toggle('stk',y>40);bt.classList.toggle('show',y>300)})},{passive:true});
bt.onclick=function(e){e.preventDefault();scrollTo({top:0,behavior:'smooth'})};
function demo(f,m){var e=$(f);if(e)e.addEventListener('submit',function(v){v.preventDefault();$(m).hidden=false;e.reset()})}demo('nf','nm');demo('cf','cm');
var b=$('mapb');if(b)b.onclick=function(){var i=d.createElement('iframe');i.src=b.dataset.src;i.loading='lazy';i.title='Peta lokasi kantor';$('map').innerHTML='';$('map').appendChild(i)}var dl=d.querySelectorAll('.faq details');dl.forEach(function(x){x.addEventListener('toggle',function(){if(x.open)dl.forEach(function(y){if(y!==x)y.open=false})})})})();