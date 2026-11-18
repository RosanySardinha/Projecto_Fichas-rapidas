const $=s=>document.querySelector(s),e=s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const ls=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k)||'';localStorage.setItem(k,v)}catch(x){return''}};
const M=['1','X','2','1X','12','X2','+2.5','-2.5','GG','NG'];
const L=[
{id:'pl',n:'Premier League',s:'Futebol - Inglaterra',f:'🇬🇧',b:1000,g:'Arsenal|Chelsea,Liverpool|Man. City,Man. United|Tottenham,Newcastle|Aston Villa,Brighton|West Ham,Everton|Fulham,Brentford|Crystal Palace,Wolves|Bournemouth,Nottm Forest|Leeds,Sunderland|Burnley,Chelsea|Liverpool,Man. City|Arsenal,Tottenham|Newcastle,Aston Villa|Man. United,West Ham|Everton'},
{id:'ll',n:'LaLiga',s:'Futebol - Espanha',f:'🇪🇸',b:2000,g:'Real Madrid|Barcelona,Atlético Madrid|Sevilha,Valência|Villarreal,Real Sociedad|Athletic Bilbau,Betis|Girona,Celta Vigo|Osasuna,Getafe|Mallorca,Rayo Vallecano|Alavés,Espanyol|Levante,Elche|Oviedo,Barcelona|Atlético Madrid,Sevilha|Real Madrid,Villarreal|Betis,Athletic Bilbau|Valência,Girona|Real Sociedad'},
{id:'sa',n:'Liga Italiana (Serie A)',s:'Futebol - Itália',f:'🇮🇹',b:3000,g:'Inter|Milan,Juventus|Napoli,Roma|Lazio,Atalanta|Fiorentina,Bolonha|Torino,Udinese|Génova,Sassuolo|Cagliari,Parma|Como,Lecce|Verona,Cremonese|Pisa,Milan|Juventus,Napoli|Inter,Lazio|Atalanta,Fiorentina|Roma,Torino|Udinese'},
{id:'uc',n:'Liga dos Campeões UEFA',s:'Futebol - Clubes Internacionais',f:'🌍',b:4000,g:'Real Madrid|Man. City,Bayern|PSG,Barcelona|Inter,Liverpool|Atlético Madrid,Arsenal|Dortmund,Benfica|Juventus,Sporting|Chelsea,Napoli|Ajax,Porto|Milan,Leverkusen|Newcastle,Galatasaray|Tottenham,Celtic|Atalanta,Marselha|Club Brugge,PSV|Villarreal,Salzburgo|Copenhaga'},
{id:'gi',n:'Girabola',s:'Futebol - Angola',f:'🇦🇴',b:5000,g:'Petro de Luanda|1.º de Agosto,Sagrada Esperança|Interclube,Kabuscorp|Académica do Lobito,Recreativo do Libolo|Bravos do Maquis,Desportivo da Huíla|Wiliete,Académica do Soyo|Cuando Cubango,Santa Rita de Cássia|Mavinga,Domant|Sporting de Cabinda,FC Bravos|Petro de Luanda,1.º de Agosto|Interclube,Kabuscorp|Sagrada Esperança,Libolo|Huíla,Wiliete|Soyo,Interclube|Libolo,Petro de Luanda|Kabuscorp'},
{id:'nb',n:'NBA',s:'Basquetebol - EUA',f:'🏀',b:6000,sp:'bas',g:'Lakers|Celtics,Warriors|Bucks,Heat|Knicks,Nuggets|Suns,Mavericks|Thunder,76ers|Cavaliers,Spurs|Rockets,Timberwolves|Clippers'},
{id:'at',n:'ATP Masters',s:'Ténis - Internacional',f:'🎾',b:7000,sp:'ten',g:'Alcaraz|Sinner,Djokovic|Zverev,Medvedev|Rune,Ruud|Fritz,Tsitsipas|De Minaur,Draper|Rublev,Musetti|Dimitrov,Tiafoe|Shelton'},
{id:'bx',n:'Combates Profissionais',s:'Boxe - Internacional',f:'🥊',b:8000,sp:'box',g:'Usyk|Fury,Canelo|Crawford,Inoue|Nery,Beterbiev|Bivol,Joshua|Dubois,Haney|Garcia,Fundora|Tszyu,Benavidez|Morrell'}];
const G={};
const FG={pl:'<rect width="30" height="20" fill="#fff"/><rect x="13" width="4" height="20" fill="#ce1124"/><rect y="8" width="30" height="4" fill="#ce1124"/>',
ll:'<rect width="30" height="20" fill="#aa151b"/><rect y="5" width="30" height="10" fill="#f1bf00"/>',
sa:'<rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ce2b37"/>',
uc:'<rect width="30" height="20" fill="#039"/>'+Array.from({length:12},(_,k)=>`<circle cx="${(15+6*Math.sin(k*Math.PI/6)).toFixed(1)}" cy="${(10-6*Math.cos(k*Math.PI/6)).toFixed(1)}" r="1" fill="#fc0"/>`).join(''),
gi:'<rect width="30" height="10" fill="#cc092f"/><rect y="10" width="30" height="10" fill="#000"/><circle cx="15" cy="10" r="4" fill="none" stroke="#ffcb00" stroke-width="1.2"/><path d="M15 7.6l.7 1.9h2l-1.6 1.2.6 1.9-1.7-1.2-1.7 1.2.6-1.9-1.6-1.2h2z" fill="#ffcb00"/>'};
const fg=id=>FG[id]?`<svg class="fg" viewBox="0 0 30 20" role="img" aria-hidden="true">${FG[id]}</svg>`:`<span class="fe">${L.find(l=>l.id==id).f}</span>`;
L.forEach(l=>l.sp=l.sp||'fut');const TM=[13.5,16,18.5,20.75,21];
L.forEach((l,li)=>{l.j=l.g.split(',').map((t,i)=>{const[h,a]=t.split('|');let s=(li+1)*97+i*31;const r=()=>(s=(s*9301+49297)%233280)/233280;
const o=x=>Math.max(1.05,Math.round(.92/x*100)/100),c=String(l.b+i+1);let od,m,x;
if(l.sp=='fut'){let p1=.26+r()*.4+(l.id=='gi'?.1:0),px=.2+r()*.1,p2=Math.max(.1,1-p1-px);const T=p1+px+p2;p1/=T;px/=T;p2/=T;const po=.38+r()*.32,pg=.4+r()*.28;
od={'1':o(p1),X:o(px),'2':o(p2),'1X':o(p1+px),'12':o(p1+p2),X2:o(px+p2),'+2.5':o(po),'-2.5':o(1-po),GG:o(pg),NG:o(1-pg)};m=['1','X','2'];x=['1X','12','X2','+2.5','-2.5','GG','NG']}
else{const p1=.2+r()*.6,po=.4+r()*.2,ln={bas:200+Math.floor(r()*30)+.5,ten:20+Math.floor(r()*6)+.5,box:6+Math.floor(r()*5)+.5}[l.sp];
if(l.sp=='box'){const px=.04+r()*.04,q=(1-px)*p1;od={'1':o(q),X:o(px),'2':o(1-px-q)};m=['1','X','2']}else{od={'1':o(p1),'2':o(1-p1)};m=['1','2']}
od['+'+ln]=o(po);od['-'+ln]=o(1-po);x=['+'+ln,'-'+ln]}
const d=new Date();d.setDate(d.getDate()+1+i%6);const hh=TM[(i+li)%5];d.setHours(Math.floor(hh),(hh%1)*60);
return G[c]={c,h,a,l:l.n,sp:l.sp,m,x,t:d.toLocaleDateString('pt-PT',{weekday:'short',day:'2-digit',month:'2-digit'})+' · '+d.toLocaleTimeString('pt-PT',{hour:'2-digit',minute:'2-digit'}),od}})});
const np=p=>{p=String(p||'').toUpperCase().replace(/\s|\u2212/g,'').replace(/,/g,'.');
let m=p.match(/^(?:\+|MAIS|O)(\d+\.5)$/);if(m)return'+'+m[1];m=p.match(/^(?:-|MENOS|U)(\d+\.5)$/);if(m)return'-'+m[1];return({X1:'1X','2X':'X2',21:'12'})[p]||p};
const fx=n=>(+n).toFixed(2),kz=n=>Math.round(n).toLocaleString('pt-PT')+' Kz';
const SPS=[['fut','⚽','Futebol'],['bas','🏀','Basquetebol'],['ten','🎾','Ténis'],['box','🥊','Boxe']],LS=()=>L.filter(l=>l.sp==SP);
let F=[],SP='fut',V='home',Q='',open=new Set(),modal=null,S={ph:[],txt:'',busy:'',err:''},stake=1000,T=null;
const st=(x,i)=>{if(!G[x.c])return['er','Código inválido'];if(!Object.prototype.hasOwnProperty.call(G[x.c].od,np(x.p)))return['er','Prognóstico inválido'];
if(F.some((y,j)=>j<i&&y.c==x.c))return['er','Jogo repetido'];if(x.conf<.85)return['wa','Rever'];return['ok','OK']};
const info=()=>{let o=1;F.forEach(x=>{const g=G[x.c],p=np(x.p);if(g&&g.od[p])o*=g.od[p]});return{o,gain:stake*o}};
const parse=t=>t.split(/[;\n]+/).map(s=>s.trim()).filter(Boolean).map(s=>{const i=s.indexOf('.');return i<0?{c:s.replace(/\D/g,''),p:'',conf:1}:{c:s.slice(0,i).replace(/\D/g,''),p:s.slice(i+1),conf:1}});
function gameH(g){const sel=p=>F.some(x=>x.c==g.c&&np(x.p)==p),o=open.has(g.c);
const b=p=>`<button class="od${sel(p)?' on':''}" data-a="pick" data-c="${g.c}" data-p="${p}"><i>${p}</i>${fx(g.od[p])}</button>`;
return`<div class="gm"><div class="gh"><b>${g.h} – ${g.a}</b><span class="cd">${g.c}</span></div><div class="tm">${g.t} · ${g.l}</div><div class="g3" style="grid-template-columns:repeat(${g.m.length},1fr)">${g.m.map(b).join('')}</div>${o?`<div class="g4">${g.x.map(b).join('')}</div>`:''}<button class="mr" data-a="more" data-c="${g.c}">${o?'Menos mercados':'Mais '+g.x.length+' mercados'}</button></div>`}
function res(){const q=Q.trim().toLowerCase();if(!q)return`<h3>Melhores Competições</h3><div class="card">${LS().map(l=>`<div class="lr" data-a="lg" data-id="${l.id}" tabindex="0">${fg(l.id)}<div><b>${l.n}</b><small>${l.s}</small></div><span class="cn"><b>${l.j.length}</b> ${l.sp=='fut'?'jogos':'eventos'}</span></div>`).join('')}</div>
<h3>Melhores Apostas</h3>${(SP=='fut'?['4001','4002','2001','1001'].map(c=>G[c]):LS().flatMap(l=>l.j.slice(0,3))).map(gameH).join('')}<h3>Como escrever a ficha</h3><div class="card hw">Cada selecção é <b>código.prognóstico</b> e cada jogo da combinação ocupa uma linha, terminado com <b>ponto e vírgula</b>.<br>Exemplo:<br><b>1001.1;</b><br><b>2004.X;</b><br><b>4007.+2.5;</b><br>Prognósticos: 1, X, 2, 1X, 12, X2, +2.5, -2.5, GG, NG.<br>Códigos: Premier League 1001–1015, LaLiga 2001–2015, Serie A 3001–3015, Champions 4001–4015, Girabola 5001–5015, NBA 6001–6008, ATP 7001–7008, Boxe 8001–8008.<br>No basquetebol, ténis e boxe os prognósticos são 1, 2 (no boxe também X) e mais/menos pontos, jogos ou rounds, por exemplo <b>+214.5</b>.<br><small style="color:var(--mu)">Demonstração: jogos e odds fictícios.</small></div>`;
const l=Object.values(G).filter(g=>g.c.startsWith(q)||(g.h+' '+g.a).toLowerCase().includes(q)).slice(0,30);return l.length?l.map(gameH).join(''):'<p class="em">Nenhum jogo encontrado.</p>'}
const home=()=>`<input id="q" class="sr" placeholder="Procurar por código ou equipa" value="${e(Q)}" aria-label="Procurar"><div id="res">${res()}</div>`;
const leagueV=()=>{const l=L.find(x=>x.id==V);return`<div class="chips">${L.filter(y=>y.sp==l.sp).map(x=>`<button class="chip${x.id==V?' on':''}" data-a="lg" data-id="${x.id}">${fg(x.id)}${x.n.replace(' (Serie A)','')}</button>`).join('')}</div><div class="bk" data-a="home" tabindex="0">← Competições</div><h3 style="margin:10px 0 2px">${fg(l.id)} ${l.n}</h3><p class="em" style="margin:0 0 14px">${l.s} · ${l.j.length} ${l.sp=='fut'?'jogos':'eventos'}</p>`+l.j.map(gameH).join('')};
function fichaV(){const rows=F.map((x,i)=>{const[c,t]=st(x,i),g=G[x.c],p=np(x.p);
return`<div class="ln"><button class="bd ${c}" ${c=='wa'?`data-a="okl" data-i="${i}" title="Toca para confirmar a leitura"`:'tabindex="-1"'}>${t}</button><input class="ed" data-a="edit" data-i="${i}" value="${e(x.c+'.'+x.p)}" aria-label="Selecção ${i+1}"><button class="x" data-a="del" data-i="${i}" aria-label="Remover">×</button><div class="lg">${g?`${g.h} – ${g.a}${g.od[p]?' · '+fx(g.od[p]):''}`:'Sem jogo com este código'} ${x.src?`<small>(${x.src})</small>`:''}</div></div>`}).join('');
return`<h3>A tua ficha</h3>${F.length?`<p class="em" style="margin:-6px 0 12px"><b>${F.length>1?'Combinação de '+F.length+' jogos':'Aposta simples'}</b></p>`:''}`+(F.length?`<div class="card">${rows}</div>`:`<p class="em">Ainda sem selecções. Toca na câmara ou escolhe odds nos jogos.</p>`)+
`<button class="b1 w" data-a="scan">📷 Adicionar foto a esta ficha</button><div class="card sm"><label>Valor da aposta (Kz)<input id="stk" type="number" min="0" value="${stake}"></label><div id="nums"></div><button class="cf" id="cf" data-a="conf">Confirmar ficha</button></div>`}
function nums(){const n=$('#nums');if(!n)return;const{o,gain}=info();n.innerHTML=`<div><span>Odds totais</span><b>${fx(o)}</b></div><div><span>Ganho possível</span><b>${kz(gain)}</b></div>`;
$('#cf').disabled=!(F.length&&stake>0&&F.every((x,i)=>st(x,i)[0]=='ok'))}
function modalH(){if(modal=='scan'){const n=S.ph.length;return`<div class="ov"><div class="sh"><div class="sth"><b>Ler ficha</b><button class="x" data-a="close" aria-label="Fechar">×</button></div>
${n?'':'<p class="hint">Tira uma foto da ficha escrita à mão. Se a combinação ocupa várias folhas, poderás adicionar mais fotos a seguir.</p>'}
<div class="ph">${S.ph.map((u,i)=>`<div class="th"><img src="${u}" alt="Foto ${i+1}"><button data-a="rm" data-i="${i}" aria-label="Remover foto">×</button><span>${i+1}</span></div>`).join('')}</div>
${n?`<div class="stp"><b>${n==1?'1 foto adicionada':n+' fotos adicionadas'}</b><br>A ficha tem mais selecções noutra folha? Adiciona outra foto: todas são lidas como uma única ficha.</div>`:''}
<div class="bt"><label class="b1">${n?'➕ Adicionar mais uma foto':'📷 Tirar foto da ficha'}<input id="cam" type="file" accept="image/*" capture="environment" hidden></label></div>
<button class="cf" data-a="read" ${n&&!S.busy?'':'disabled'}>${S.busy||(n?'✅ Ler ficha ('+n+(n==1?' foto)':' fotos)'):'Ler ficha')}</button>
<label class="gl">ou escolher da galeria<input id="gal" type="file" accept="image/*" multiple hidden></label>${S.err?`<p class="erm">${e(S.err)}</p>`:''}
<hr><b>Ou escreve a ficha</b><textarea id="mtxt" class="k" rows="5" style="margin-top:8px" placeholder="1001.1;&#10;2004.X;&#10;4007.+2.5;">${e(S.txt)}</textarea><button class="b2 w" data-a="addtxt">Adicionar à ficha</button></div></div>`}
if(modal=='cfg')return`<div class="ov"><div class="sh"><div class="sth"><b>Definições</b><button class="x" data-a="close" aria-label="Fechar">×</button></div>
<p class="hint">A leitura das fotos é feita no servidor, que guarda a chave Groq. Se o administrador definiu um código de acesso, escreve-o aqui.</p>
<label>Código de acesso (opcional)<input id="gk" class="k" type="password" value="${e(ls('zfr_pass'))}"></label><button class="cf" data-a="savecfg">Guardar</button></div></div>`;
if(modal=='tk')return`<div class="ov"><div class="sh tk"><div class="sth"><b>Ficha ${T.no}</b></div><p class="hint">${T.L.length>1?'Combinação de '+T.L.length+' jogos':'Aposta simples'} · ${T.when} · Demonstração: nenhuma aposta real foi feita.</p>
${T.L.map(x=>{const g=G[x.c],p=np(x.p);return`<div><span>${x.c}.${p} ${g.h} – ${g.a}</span><b>${fx(g.od[p])}</b></div>`}).join('')}<hr><div><span>Valor</span><b>${kz(T.stake)}</b></div><div><span>Odds totais</span><b>${fx(T.o)}</b></div><div class="t"><span>Ganho possível</span><b>${kz(T.gain)}</b></div>
<button class="cf" data-a="new">Nova ficha</button></div></div>`;return''}
function render(){$('#sp').innerHTML=SPS.map(([k,ic,n])=>`<button class="${SP==k?'a':''}" data-a="sp" data-id="${k}" aria-label="${n}" title="${n}">${ic}</button>`).join('');const m=$('#main');m.innerHTML=V=='home'?home():V=='ficha'?fichaV():leagueV();$('#nb').textContent=F.length;$('#nb').hidden=!F.length;
document.querySelectorAll('nav [data-a=home],nav [data-a=ficha]').forEach(b=>b.classList.toggle('a',b.dataset.a==(V=='ficha'?'ficha':'home')));if(V=='ficha')nums();$('#modal').innerHTML=modalH()}
const rs=f=>new Promise(r=>{const u=URL.createObjectURL(f),i=new Image();i.onload=()=>{const k=Math.min(1,1280/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);URL.revokeObjectURL(u);r(c.toDataURL('image/jpeg',.85))};i.src=u});
async function lerFoto(url){const r=await fetch('/api/ler',{method:'POST',headers:{'Content-Type':'application/json','x-app-pass':ls('zfr_pass')},body:JSON.stringify({imagem:url})});
if(r.status==401)throw Error('Código de acesso errado. Define-o em Definições.');if(r.status==429)throw Error('Demasiados pedidos. Espera um minuto.');if(!r.ok)throw Error('O servidor respondeu com erro '+r.status+'.');return r.json()}
async function ler(){S.err='';try{for(let i=0;i<S.ph.length;i++){S.busy=`A ler foto ${i+1} de ${S.ph.length}…`;$('#modal').innerHTML=modalH();const d=await lerFoto(S.ph[i]);
(d.linhas||[]).forEach(l=>F.push({c:String(l.c||'').replace(/\D/g,''),p:String(l.p??''),conf:+l.conf||.5,src:'Foto '+(i+1)}));const v=parseInt(String(d.valor||'').replace(/\D/g,''));if(v)stake=v}
S.ph=[];S.busy='';modal=null;V='ficha'}catch(x){S.busy='';S.err=x.message=='Failed to fetch'?'Sem ligação ao servidor. Verifica a internet.':x.message}render()}
document.addEventListener('click',ev=>{const t=ev.target.closest('[data-a]');if(!t||t.tagName=='INPUT')return;const a=t.dataset.a,i=+t.dataset.i;
if(a=='home'){V='home'}else if(a=='ficha')V='ficha';else if(a=='lg')V=t.dataset.id;else if(a=='sp'){SP=t.dataset.id;V='home';Q=''}
else if(a=='sr'){V='home';render();$('#q').focus();return}
else if(a=='pick'){const c=t.dataset.c,p=t.dataset.p,k=F.findIndex(x=>x.c==c);if(k>=0&&np(F[k].p)==p)F.splice(k,1);else if(k>=0)F[k]={c,p,conf:1,src:'Jogos'};else F.push({c,p,conf:1,src:'Jogos'})}
else if(a=='more'){open.has(t.dataset.c)?open.delete(t.dataset.c):open.add(t.dataset.c)}
else if(a=='del')F.splice(i,1);else if(a=='okl')F[i].conf=1;
else if(a=='clr'){F=[]}else if(a=='scan'){modal='scan';S.err=''}else if(a=='cfg')modal='cfg';else if(a=='close')modal=null;
else if(a=='rm')S.ph.splice(i,1);else if(a=='read'){ler();return}
else if(a=='addtxt'){const l=parse(S.txt);if(!l.length){S.err='Escreve pelo menos uma selecção, por exemplo 1001.1';render();return}l.forEach(x=>F.push({...x,src:'Texto'}));S.txt='';S.err='';modal=null;V='ficha'}
else if(a=='savecfg'){ls('zfr_pass',$('#gk').value.trim());modal=null}
else if(a=='conf'){const o=info();T={no:'ZFR-'+Math.random().toString(36).slice(2,10).toUpperCase(),L:F.map(x=>({...x})),stake,...o,when:new Date().toLocaleString('pt-PT')};modal='tk'}
else if(a=='new'){F=[];modal=null;T=null;V='home'}else return;
const sy=a=='lg'||a=='home'||a=='sp'?0:$('#main').scrollTop;render();$('#main').scrollTop=sy});
document.addEventListener('keydown',ev=>{if(ev.key=='Enter'&&ev.target.dataset.a=='lg')ev.target.click()});
document.addEventListener('change',async ev=>{const t=ev.target;
if(t.dataset.a=='edit'){const v=t.value,k=v.indexOf('.'),i=+t.dataset.i;F[i]={...F[i],c:(k<0?v:v.slice(0,k)).replace(/\D/g,''),p:k<0?'':v.slice(k+1),conf:1};render()}
if(t.id=='cam'||t.id=='gal'){for(const f of t.files)S.ph.push(await rs(f));t.value='';S.err='';$('#modal').innerHTML=modalH()}});
document.addEventListener('input',ev=>{const t=ev.target;if(t.id=='q'){Q=t.value;$('#res').innerHTML=res()}
else if(t.id=='stk'){stake=+t.value||0;nums()}else if(t.id=='mtxt')S.txt=t.value});
render();
