/* ===== DADOS DO CONTEÚDO ===== */
const KEY = 'gp07-denotacao-conotacao';
const $ = s => document.querySelector(s);

// Níveis: [pontos mínimos, ícone, nome]
const LV = [[0,'🌱','Iniciante'],[200,'📚','Aprendiz'],[400,'🧠','Conhecedor'],[600,'🔥','Especialista'],[800,'🏆','Mestre dos Sentidos']];
// Mensagens ao atingir pontuações
const MSG = {100:'⭐ Boa! Você está começando a dominar o conteúdo!',300:'⭐ Mandou bem! Continue assim!',500:'⭐ Você está ficando fera em Português!',800:'🏆 Mestre dos Sentidos!'};
// Conquistas
const ACH = [
  {id:'first',i:'🏅',n:'Primeiro Passo',d:'Respondeu sua primeira questão.'},
  {id:'streak',i:'🎯',n:'Acertou em Cheio',d:'Acertou 3 questões seguidas.'},
  {id:'learn',i:'📚',n:'Estudioso',d:'Completou a seção Aprenda.'},
  {id:'chal',i:'🔥',n:'Desafiante',d:'Completou o Desafio Final.'},
  {id:'master',i:'🏆',n:'Mestre dos Sentidos',d:'Alcançou 800 pontos.'}
];
// Exemplos interativos: [frase, tipo, explicação]
const EX = [
  ['João está com a cabeça nas nuvens.','CONOTAÇÃO','significa que João está distraído ou pensando em outra coisa.'],
  ['A água do rio está gelada.','DENOTAÇÃO','a frase descreve a temperatura real da água.'],
  ['Ela chorou um oceano de lágrimas.','CONOTAÇÃO','é exagero: ela chorou muito.'],
  ['O aluno abriu o caderno.','DENOTAÇÃO','ação real e direta, sem figura de linguagem.'],
  ['Esse trabalho é um abacaxi.','CONOTAÇÃO','“abacaxi” indica um problema difícil de resolver.'],
  ['Estou morrendo de rir.','CONOTAÇÃO','ninguém está morrendo: a pessoa está rindo muito.']
];
// Quiz: [pergunta, alternativas, índice da correta, explicação]
const QZ = [
  ['Na frase “O menino quebrou o copo.”, o sentido predominante é:',['Conotativo','Denotativo','Poético','Ambíguo'],1,'Denotativo: “quebrou” e “copo” estão no sentido literal, sem figura de linguagem.'],
  ['“Maria tem um coração de ouro.” Isso significa que Maria:',['Usa joias no peito','Sofre do coração','É generosa e bondosa','É muito rica'],2,'Conotação: “coração de ouro” é expressão figurada para uma pessoa boa e generosa.'],
  ['Qual frase foi escrita em sentido conotativo?',['O gato dorme no sofá.','A água ferveu na panela.','Abri a janela do quarto.','Aquela prova foi um bicho de sete cabeças.'],3,'“Bicho de sete cabeças” é figurado: indica algo muito difícil, não um animal real.'],
  ['Reescreva em sentido denotativo: “Ele está com a cabeça nas nuvens.”',['Ele está distraído.','Ele viaja de avião.','Ele tem nuvens na cabeça.','Ele é muito alto.'],0,'A versão literal e direta é “Ele está distraído”, sem imagem figurada.'],
  ['Qual frase é a versão conotativa de “Ela é muito calma”?',['Ela dorme tranquilamente.','Ela é um mar de calmaria.','Ela mora numa rua calma.','Ela fala baixo.'],1,'“Mar de calmaria” compara a pessoa a um mar tranquilo: é figurado.'],
  ['Em “Ele é uma raposa nos negócios”, o efeito de sentido é de:',['Pessoa peluda','Animal selvagem','Pessoa esperta e astuta','Pessoa assustada'],2,'A raposa simboliza esperteza; por isso, a frase é conotativa.'],
  ['Em uma propaganda de refrigerante: “Abra a felicidade!”. O efeito pretendido é:',['Ensinar a abrir a garrafa','Descrever um objeto','Informar o preço','Associar o produto à alegria'],3,'A propaganda usa conotação: felicidade não se “abre”, mas o produto é ligado à alegria.'],
  ['No verso de Camões “Amor é fogo que arde sem se ver”, a palavra “fogo” indica:',['Incêndio real','Calor do sol','Paixão intensa que queima por dentro','Perigo físico'],2,'No poema, “fogo” é metáfora da paixão: uso conotativo.'],
  ['Em qual frase a palavra “doce” está em sentido denotativo?',['Ela tem uma voz doce.','O café está doce demais.','Ele é um doce de pessoa.','Que doce lembrança!'],1,'Só em “O café está doce demais” a palavra indica o sabor, ou seja, o sentido literal.'],
  ['A expressão “pagar o pato” significa:',['Comprar um pato','Ser culpado pelo erro dos outros','Alimentar as aves','Pagar uma dívida em dinheiro'],1,'É expressão popular conotativa: sofrer as consequências de algo que não fez.']
];
// Desafio Final (mais difíceis)
const CH = [
  ['No verso “O tempo é um rio que leva tudo”, qual leitura está correta?',['Descreve um rio de verdade','Compara o tempo a um rio: ele passa e leva tudo','É um texto científico sobre geografia','Não há sentido figurado'],1,'Metáfora: como o rio, o tempo corre sem parar e leva as coisas.'],
  ['“Que ótimo, perdi o ônibus de novo!” Qual é o efeito de sentido?',['Ironia: o sentido real é o contrário do que foi dito','Alegria literal','Descrição técnica','Informação neutra'],0,'A pessoa diz “ótimo”, mas quer dizer que está chateada.'],
  ['Em “O ônibus engoliu a multidão”, o verbo “engolir” cria o efeito de:',['Ação literal de comer','Informação científica','Exagero: o ônibus parece devorar as pessoas','Erro gramatical'],2,'É figura de linguagem que dá força e imagem à cena.'],
  ['Em qual frase o verbo “queimar” aparece em sentido denotativo?',['Ele queimou a largada.','Ela queimou o filme dele.','Vou queimar neurônios com esse problema.','O fósforo queimou meu dedo.'],3,'Só na última há queimadura real; as outras são expressões figuradas.'],
  ['Um anúncio diz: “Nosso colchão abraça você.” Por que a propaganda usa conotação?',['Para ser técnica','Para evitar interpretações','Porque colchões abraçam','Para criar emoção e ligar o produto a conforto'],3,'A linguagem figurada emociona e convence, o que é típico da publicidade.']
];
const CH_RESULT = ['🌱 Hora de revisar: releia a seção Aprenda e veja os Exemplos.','🌱 Hora de revisar: releia a seção Aprenda e veja os Exemplos.','📚 Você está no caminho! Revise os exemplos para fixar melhor.','👏 Muito bom! Você já domina boa parte do conteúdo.','🔥 Quase perfeito! Excelente desempenho!','🏆 Perfeito! Você é um Mestre dos Sentidos!'];
const TOTAL = EX.length + QZ.length + CH.length + 1; // itens que contam para o progresso

/* ===== ESTADO E LOCALSTORAGE ===== */
const fresh = () => ({pts:0, ok:0, err:0, streak:0, best:0, done:{}, ach:{}});
let S = fresh();
try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

/* ===== UTILIDADES ===== */
const lvlIndex = () => LV.filter(l => S.pts >= l[0]).length - 1;
const percent = () => Math.round(Object.keys(S.done).length / TOTAL * 100);

function toast(t) {
  const d = document.createElement('div'); d.className = 'toast'; d.textContent = t;
  $('#toasts').append(d); setTimeout(() => d.remove(), 4500);
}
function pop(n) { // animação "🎉 +100 XP"
  const d = document.createElement('div'); d.className = 'pop'; d.textContent = '🎉 +' + n + ' XP';
  document.body.append(d); setTimeout(() => d.remove(), 1400);
}
function confetti() {
  const c = ['#ffd54a','#4ee3b5','#ff6b95','#7cc4ff','#ffffff'];
  for (let i = 0; i < 80; i++) {
    const e = document.createElement('i'); e.className = 'conf';
    e.style.cssText = `left:${Math.random()*100}vw;background:${c[i%5]};animation-duration:${2+Math.random()*2.5}s;animation-delay:${Math.random()*.8}s`;
    document.body.append(e); setTimeout(() => e.remove(), 5500);
  }
}
function unlock(id) { // desbloqueia conquista
  if (S.ach[id]) return;
  S.ach[id] = 1; toast('🏅 Conquista desbloqueada: ' + ACH.find(a => a.id === id).n);
}
function addPts(n) { // soma pontos, mostra mensagens e sobe de nível
  const old = S.pts, oldLv = lvlIndex();
  S.pts += n; pop(n);
  for (const t in MSG) if (old < t && S.pts >= t) toast(MSG[t]);
  if (lvlIndex() > oldLv) toast('🚀 Novo nível: ' + LV[lvlIndex()][1] + ' ' + LV[lvlIndex()][2]);
}

/* ===== ATUALIZA A TELA (pontos, nível, progresso, conquistas) ===== */
function refresh() {
  if (S.pts >= 800) unlock('master');
  const p = percent(), L = LV[lvlIndex()];
  $('#pts').textContent = '⭐ Pontos: ' + S.pts;
  $('#lvl').textContent = L[1] + ' Nível ' + (lvlIndex() + 1) + ' — ' + L[2];
  $('#prg').textContent = 'Progresso: ' + p + '%';
  $('#topFill').style.width = $('#bigFill').style.width = p + '%';
  const st = [['⭐','Pontuação total',S.pts],['📊','Progresso',p+'%'],['🏆','Nível atual',L[2]],['✅','Questões corretas',S.ok],['❌','Questões erradas',S.err],['🔥','Maior sequência de acertos',S.best],['🏅','Conquistas',Object.keys(S.ach).length+'/'+ACH.length]];
  $('#statGrid').innerHTML = st.map(s => `<div class="card stat"><span>${s[0]} ${s[1]}</span><b>${s[2]}</b></div>`).join('');
  $('#achGrid').innerHTML = ACH.map(a => `<div class="card ach ${S.ach[a.id]?'on':''}"><div class="ic">${S.ach[a.id]?a.i:'🔒'}</div><b>${a.n}</b><p>${a.d}</p></div>`).join('');
  const lb = $('#learnBtn'); lb.disabled = !!S.done.learn;
  lb.textContent = S.done.learn ? '✅ Seção concluída!' : '✅ Concluí a leitura';
  save();
}

/* ===== NAVEGAÇÃO ENTRE SEÇÕES ===== */
function go(id) {
  document.querySelectorAll('.sec').forEach(s => s.classList.toggle('active', s.id === id));
  document.querySelectorAll('#menu button').forEach(b => b.classList.toggle('on', b.dataset.go === id));
  if (id !== 'inicio') document.body.classList.add('started');
  scrollTo({top: 0, behavior: 'smooth'});
}
document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));

/* ===== SEÇÃO APRENDA ===== */
$('#learnBtn').onclick = () => { S.done.learn = 1; unlock('learn'); toast('📚 Aprenda concluído!'); refresh(); };

/* ===== EXEMPLOS INTERATIVOS ===== */
function buildExamples() {
  const g = $('#exGrid'); g.innerHTML = '';
  EX.forEach((e, i) => {
    const d = document.createElement('article'); d.className = 'card';
    d.innerHTML = `<h3>“${e[0]}”</h3><button class="rev">🔍 VER SIGNIFICADO</button><div class="ans"><b>${e[1]}</b> — ${e[2]}</div>`;
    const btn = d.querySelector('.rev'), ans = d.querySelector('.ans');
    const open = () => { ans.classList.add('show'); btn.hidden = true; };
    btn.onclick = () => { open(); S.done['e' + i] = 1; refresh(); };
    if (S.done['e' + i]) open();
    g.append(d);
  });
}

/* ===== QUESTÕES (usadas no Quiz e no Desafio) ===== */
function show(d, q, i) { // mostra correção sem depender só de cor (ícones + texto)
  d.querySelectorAll('.opt').forEach((b, j) => {
    b.disabled = true;
    if (j === q[2]) b.classList.add('ok'); else if (j === i) b.classList.add('no');
  });
  const f = d.querySelector('.fb'), ok = i === q[2];
  f.className = 'fb show ' + (ok ? 'good' : 'bad');
  f.innerHTML = (ok ? '✅ Muito bem! Você acertou!' : '❌ Ops! Não foi dessa vez.') + '<br><small>' + q[3] + '</small>';
}
function pick(key, q, i, pts, d) {
  if (S.done[key]) return; // não pontua duas vezes a mesma pergunta
  S.done[key] = i + 1; show(d, q, i);
  if (i === q[2]) { S.ok++; S.streak++; S.best = Math.max(S.best, S.streak); d.classList.add('glow'); addPts(pts); }
  else { S.err++; S.streak = 0; d.classList.add('shake'); }
  unlock('first'); if (S.streak >= 3) unlock('streak');
  if (CH.every((_, k) => S.done['c' + k])) unlock('chal');
  refresh();
}
function qCard(key, q, pts, n, cb) {
  const d = document.createElement('article'); d.className = 'card q';
  d.innerHTML = `<h3>${n}. ${q[0]}</h3>` + q[1].map((o, i) => `<button class="opt">${'ABCD'[i]}) ${o}</button>`).join('') + '<div class="fb" role="status"></div>';
  d.querySelectorAll('.opt').forEach((b, i) => b.onclick = () => { pick(key, q, i, pts, d); if (cb) cb(); });
  if (S.done[key]) show(d, q, S.done[key] - 1);
  return d;
}

/* ===== QUIZ ===== */
function buildQuiz() {
  const b = $('#quizBox'); b.innerHTML = '';
  QZ.forEach((q, i) => b.append(qCard('q' + i, q, 100, i + 1)));
}

/* ===== DESAFIO FINAL ===== */
function buildChallenge(justFinished) {
  const b = $('#chBox'); b.innerHTML = '';
  const n = CH.findIndex((_, k) => !S.done['c' + k]); // primeira pergunta não respondida
  if (n < 0) { // tela de resultado
    const hits = CH.filter((q, k) => S.done['c' + k] - 1 === q[2]).length;
    b.innerHTML = `<div class="card result"><h3>🏆 DESAFIO CONCLUÍDO!</h3><p>Você fez ${hits} de ${CH.length}!</p><p class="num">${hits * 200} pontos</p><p>Pontuação final: ${hits * 200} pontos</p><p>${CH_RESULT[hits]}</p></div>`;
    if (justFinished) confetti();
    return;
  }
  b.innerHTML = `<div class="chbar">Pergunta ${n + 1}/${CH.length}</div><div class="track"><div class="fill" style="width:${n / CH.length * 100}%"></div></div>`;
  b.append(qCard('c' + n, CH[n], 200, n + 1, () => {
    b.querySelector('.fill').style.width = (n + 1) / CH.length * 100 + '%';
    const nb = document.createElement('button'); nb.className = 'big';
    nb.textContent = n < CH.length - 1 ? 'Próxima pergunta ➜' : 'Ver resultado 🏆';
    nb.onclick = () => buildChallenge(n === CH.length - 1);
    b.append(nb);
  }));
}

/* ===== REINICIAR PROGRESSO ===== */
$('#resetBtn').onclick = () => {
  if (!confirm('Tem certeza? Todo o seu progresso será apagado.')) return;
  try { localStorage.removeItem(KEY); } catch (e) {}
  S = fresh(); init(); document.body.classList.remove('started'); go('inicio');
};

/* ===== INÍCIO ===== */
function init() { buildExamples(); buildQuiz(); buildChallenge(false); refresh(); }
init();
