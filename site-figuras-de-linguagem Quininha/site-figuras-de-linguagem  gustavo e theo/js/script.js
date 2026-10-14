/* ===== DADOS: edite aqui para mudar textos e perguntas ===== */
const FIG={
 comparacao:{n:'Comparação',i:'🏃‍♂️🚀',e:'Compara duas coisas usando a palavrinha COMO.',x:'Você é rápido <b>como</b> um foguete!',d:'Procure a palavrinha COMO!'},
 metafora:{n:'Metáfora',i:'👦🚀',e:'Diz que uma coisa É outra coisa. Sem a palavra COMO!',x:'Meu irmão <b>é</b> um foguete!',d:'Sem COMO, a coisa vira outra!'},
 personificacao:{n:'Personificação',i:'☀️😊',e:'Dá jeito de gente para bichos e coisas.',x:'O sol está <b>sorrindo</b>.',d:'Coisa fazendo o que só gente faz!'},
 hiperbole:{n:'Hipérbole',i:'🍽️😋',e:'É dizer MUITO, exagerando de propósito!',x:'Estou <b>morrendo</b> de fome!',d:'Exagero! É só um jeito de dizer muito.'}};
const FRASES=[['Você é rápido como um foguete!','comparacao'],['Meu irmão é um foguete!','metafora'],
 ['O sol está sorrindo.','personificacao'],['Estou morrendo de fome!','hiperbole'],
 ['Ela é doce como mel.','comparacao'],['Meu pai é um leão!','metafora'],
 ['A lua dorme no céu.','personificacao'],['Chorei um rio de lágrimas!','hiperbole']];
const COMPLETE=[['O sol está ___.',['sorrindo','quadrado','de ferro'],0],
 ['Ele é veloz ___ um raio.',['como','mas','dentro'],0],
 ['Esperei ___ anos pelo meu lanche!',['mil','dois','pouco'],0],
 ['O vento está ___ uma canção.',['cantando','pesado','azedo'],0]];
const ACERTO=['Isso mesmo! 🎉','Muito bem! ⭐','Você é demais! 🌟','Boa! Continue assim! 👏'];
const MSG=[[8,'Uau! Você é um craque das palavras! 🏆'],[5,'Muito bem! Você aprendeu bastante! 🌈'],[0,'Bom começo! Vamos treinar de novo? 💪']];

/* ===== AJUDANTES ===== */
const $=s=>document.querySelector(s);
const emb=a=>[...a].sort(()=>Math.random()-.5);
const sorte=a=>a[Math.floor(Math.random()*a.length)];
const txt=h=>h.replace(/<[^>]+>/g,'');
function fala(t,e){$('#fala').textContent=t;const l=$('#lp');l.textContent=e||'🐺';l.classList.remove('pula');void l.offsetWidth;l.classList.add('pula')}
function ouvir(t){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(txt(t));u.lang='pt-BR';u.rate=.85;speechSynthesis.speak(u)}catch(_){}}
const semVoz=!('speechSynthesis' in window);
if(semVoz)['#a-ouvir','#q-ouvir'].forEach(s=>$(s).hidden=true);
let rec=0;try{rec=+localStorage.getItem('lupi-rec')||0}catch(_){}

/* ===== NAVEGAÇÃO ===== */
const MSGINI={inicio:['Oi! Eu sou o Lupi, o Explorador das Palavras!','🐺'],aprenda:['Vamos descobrir as figuras de linguagem!','🧐'],
 jogue:['Brinque sem pressa. Não tem nota aqui!','😄'],quiz:['Hora do Quiz! Ganhe estrelas!','🤩'],resultado:['Olha o que você conquistou!','🥳']};
function ir(id){
 document.querySelectorAll('main section').forEach(s=>s.hidden=s.id!==id);
 document.querySelectorAll('#menu button').forEach(b=>b.setAttribute('aria-current',b.dataset.go===id));
 fala(...MSGINI[id]);window.scrollTo(0,0);
 if(id==='aprenda')aprenda(0);if(id==='jogue')jogue();if(id==='quiz')quizIniciar();if(id==='resultado')mostraRes();
}
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>ir(b.dataset.go));

/* ===== APRENDA ===== */
const chaves=Object.keys(FIG);let ai=0;
function aprenda(i){ai=Math.max(0,Math.min(chaves.length-1,i));const f=FIG[chaves[ai]];
 $('#a-nome').textContent=f.n;$('#a-ilu').textContent=f.i;$('#a-exp').textContent=f.e;$('#a-ex').innerHTML=f.x;
 $('#a-pts').textContent=chaves.map((_,k)=>k===ai?'●':'○').join(' ');
 $('#a-ant').disabled=ai===0;$('#a-prox').textContent=ai===chaves.length-1?'Ir brincar 🎮':'Próximo ▶';
 fala(f.d,'💡')}
$('#a-ant').onclick=()=>aprenda(ai-1);
$('#a-prox').onclick=()=>ai===chaves.length-1?ir('jogue'):aprenda(ai+1);
$('#a-ouvir').onclick=()=>{const f=FIG[chaves[ai]];ouvir(f.n+'. '+f.e+' '+f.x)};

/* ===== JOGUE ===== */
let sel=null,faltam=0;
function jogue(){
 const fr=emb(FRASES).slice(0,4);faltam=fr.length;sel=null;
 $('#chips').innerHTML='';$('#caixas').innerHTML='';
 fr.forEach(([t,f])=>{const c=document.createElement('button');c.className='chip';c.textContent=t;c.draggable=true;c.dataset.f=f;
  c.onclick=()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('sel'));sel=c;c.classList.add('sel');ouvir(t)};
  c.ondragstart=e=>{sel=c;e.dataTransfer.setData('text','x')};$('#chips').append(c)});
 chaves.forEach(k=>{const b=document.createElement('button');b.className='caixa';b.innerHTML=FIG[k].i+'<br>'+FIG[k].n;
  b.onclick=()=>colocar(b,k);b.ondragover=e=>e.preventDefault();b.ondrop=e=>{e.preventDefault();colocar(b,k)};$('#caixas').append(b)});
 completar(0)}
function colocar(b,k){
 if(!sel){fala('Primeiro toque em uma frase!','👆');return}
 if(sel.dataset.f===k){const s=document.createElement('span');s.className='feito';s.textContent=sel.textContent;b.append(s);
  sel.remove();sel=null;faltam--;fala(faltam?sorte(ACERTO):'Você acertou todas! Que incrível! 🏅','🎉')}
 else fala('Quase! Vamos tentar de novo? Dica: '+FIG[sel.dataset.f].d,'🤔')}
function completar(i){
 const [f,ops,c]=COMPLETE[i%COMPLETE.length];$('#c-frase').textContent=f;$('#c-ops').innerHTML='';
 emb(ops.map((o,k)=>[o,k])).forEach(([o,k])=>{const b=document.createElement('button');b.className='btn';b.textContent=o;
  b.onclick=()=>{if(k===c){$('#c-frase').textContent=f.replace('___',o);fala(sorte(ACERTO),'🎉');
   $('#c-ops').innerHTML='';const n=document.createElement('button');n.className='btn ok';n.textContent='Outra frase ▶';n.onclick=()=>completar(i+1);$('#c-ops').append(n)}
   else{b.disabled=true;fala('Quase! Vamos tentar de novo?','🤔')}};$('#c-ops').append(b)})}

/* ===== QUIZ ===== */
let qs,qi,pts,tent;
function quizIniciar(){qs=emb(FRASES);qi=0;pts=0;quizPergunta()}
function quizPergunta(){
 tent=0;const [f,c]=qs[qi];$('#q-tit').textContent=`Pergunta ${qi+1} de ${qs.length}`;
 $('#q-frase').textContent=f;$('#q-prox').hidden=true;$('#q-ops').innerHTML='';
 const outras=emb(chaves.filter(k=>k!==c)).slice(0,2);
 emb([c,...outras]).forEach(k=>{const b=document.createElement('button');b.className='btn';b.textContent=FIG[k].i.slice(-2)+' '+FIG[k].n;
  b.onclick=()=>{
   if(k===c){if(!tent)pts++;b.classList.add('ok');travar();fala(sorte(ACERTO),'🎉');proxima()}
   else if(!tent){tent=1;b.disabled=true;fala('Quase! Vamos tentar de novo? Dica: '+FIG[c].d,'🤔')}
   else{travar();[...$('#q-ops').children].forEach(x=>{if(x.textContent.includes(FIG[c].n))x.classList.add('ok')});fala('A resposta é '+FIG[c].n+'. '+FIG[c].d,'💡');proxima()}};
  $('#q-ops').append(b)})}
const travar=()=>[...$('#q-ops').children].forEach(x=>x.disabled=true);
function proxima(){const p=$('#q-prox');p.hidden=false;p.textContent=qi===qs.length-1?'Ver resultado 🏆':'Próxima ▶';p.focus()}
$('#q-prox').onclick=()=>{qi++;qi<qs.length?quizPergunta():(guardar(),ir('resultado'))};
$('#q-ouvir').onclick=()=>ouvir($('#q-frase').textContent);
function guardar(){if(pts>rec){rec=pts;try{localStorage.setItem('lupi-rec',rec)}catch(_){}}}

/* ===== RESULTADO ===== */
function mostraRes(){const t=qs?qs.length:8,p=pts||0;
 $('#r-est').textContent='⭐'.repeat(p)+'☆'.repeat(t-p);$('#r-est').setAttribute('aria-label',`${p} de ${t} estrelas`);
 $('#r-msg').textContent=MSG.find(m=>p>=m[0])[1];$('#r-rec').textContent=rec?`Seu recorde: ${rec} estrelas`:''}
$('#r-again').onclick=()=>ir('quiz');
ir('inicio');
