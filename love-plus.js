/* love-plus.js — extra magic for the birthday page.
   Put this file next to index.html and add ONE line just before </body>
   (after the existing <script> blocks):
       <script src="love-plus.js"></script>
   Remove that line any time and the page goes back to exactly how it was. */
(()=>{
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const cl=(v,a,b)=>Math.min(b,Math.max(a,v));
const rnd=(a,b)=>a+Math.random()*(b-a);
const E=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const REDUCE=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============ EDIT YOUR WORDS HERE ============ */
const CFG={
  name:'Sandhiya',
  link:'',                       /* paste your GitHub link here (or keep editing it in index.html) */
  lead:'close your eyes… make a wish',
  hint:'press & hold to blow out the candles',
  done:'your wish is safe with me ♥',
  wishes:[
    'may this year be as gentle with you as you are with everyone',
    'may every little wish you whisper come true out loud',
    'and may I be right there to watch every single one happen ♥'
  ],
  button:'open your surprise ♥',
  taps:['you + me','my favourite person','forever yours','my happy place','still falling for you','you are my home','my sunshine','smile for me ♥'],
  sign:'with all my love, Niranjan ♥',
  away:'come back… I miss you ♥',
  vol:'turn your volume up ♥',
  tip:'tip: turn your phone sideways for the full view'
};

/* ============ STYLES ============ */
const st=document.createElement('style');
st.textContent=`
.content{text-align:center}
#pf{font-family:'Great Vibes','Cormorant Garamond',cursive;font-size:clamp(34px,7vw,64px);line-height:1.1;margin-bottom:18px;color:#ffc2d6;text-shadow:0 0 14px rgba(255,105,180,.85),0 0 34px rgba(255,20,147,.55);opacity:0;animation:kin 1.6s ease .3s forwards}
#ph,#pt{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:600;letter-spacing:.05em;color:rgba(255,200,220,.78);margin-top:20px;font-size:clamp(15px,2.6vw,20px);opacity:0;animation:kin 1.6s ease 1.1s forwards}
#pt{display:none;margin-top:8px;font-size:14px}
@media (orientation:portrait){#pt{display:block}}
@keyframes kin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes kfl{from{transform:scale(1,1) rotate(-2deg)}to{transform:scale(.93,1.08) rotate(2.5deg)}}
@keyframes kgp{from{opacity:.65}to{opacity:1}}

#mu{position:fixed;left:14px;bottom:14px;z-index:31;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.65);background:rgba(196,23,95,.62);color:#fff;font:600 20px/1 Georgia,serif;cursor:pointer;display:none;align-items:center;justify-content:center;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);box-shadow:0 2px 12px rgba(196,23,95,.45)}
#mu.on{display:flex}
#mu.off::after{content:"";position:absolute;width:26px;height:2px;background:#fff;transform:rotate(-45deg)}

#fxl{position:fixed;inset:0;z-index:14;pointer-events:none;overflow:hidden}
.th{position:absolute;line-height:1;color:#e8408a;text-shadow:0 0 8px rgba(255,255,255,.7);will-change:transform,opacity}
.tp{position:absolute;white-space:nowrap;font:italic 600 clamp(17px,3vw,24px)/1 'Cormorant Garamond',Georgia,serif;color:#c4175f;text-shadow:0 0 10px rgba(255,255,255,.95),0 1px 2px rgba(255,255,255,.8)}

#sg{font-family:'Great Vibes','Cormorant Garamond',cursive;font-size:clamp(26px,5vw,40px);color:#c4175f;opacity:0;transform:translateY(8px);transition:opacity 1.2s ease,transform 1.2s ease;text-shadow:0 0 10px rgba(255,120,170,.4)}
#sg.v{opacity:1;transform:none}

#sk{position:fixed;inset:0;z-index:4;opacity:0;visibility:hidden;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(6px,1.6vh,16px);padding:12px;text-align:center;background:radial-gradient(ellipse at 50% 62%,#5a0a30 0%,#2a0016 55%,#12000a 100%);transition:opacity .9s ease,visibility 0s .9s;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;--lit:1;--ln:0;--sq:0}
#sk.on{opacity:1;visibility:visible;transition:opacity .9s ease,visibility 0s}
#kg{position:absolute;left:50%;top:56%;width:min(120vw,900px);height:min(120vw,900px);transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(255,190,110,.5),rgba(255,120,80,.18) 40%,transparent 66%);opacity:var(--lit);transition:opacity .5s ease;pointer-events:none}
#kc{position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none}
.kt{position:relative;z-index:2;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:600;color:#ffd9e6;text-shadow:0 0 16px rgba(255,105,180,.7);letter-spacing:.03em;opacity:0;transition:opacity .9s ease}
.kt.v{opacity:1}
#k1{font-size:clamp(24px,5vw,44px);line-height:1.15}
#k2{min-height:2.7em;max-width:min(90vw,560px);font-size:clamp(16px,2.8vw,24px);line-height:1.35;color:#ffc2d6;display:flex;align-items:center;justify-content:center}
#ck{position:relative;z-index:1;width:min(74vw,52vh,380px);height:auto;overflow:visible}
#ck .cn{font-family:'Great Vibes','Cormorant Garamond',cursive}
.fl,.fk{transform-box:fill-box;transform-origin:50% 100%}
.fl{transform:skewX(calc(var(--ln,0)*-1deg)) scaleY(calc(1 - var(--sq,0)*.3))}
.fk{animation:kfl .18s ease-in-out infinite alternate}
.gw{animation:kgp 2.4s ease-in-out infinite alternate}
.lt{transition:opacity .3s ease}
.cd.out .lt{opacity:0}
#kn{position:relative;z-index:4;padding:10px 30px;border-radius:40px;border:1px solid rgba(255,255,255,.6);cursor:pointer;font:italic 600 18px 'Cormorant Garamond',Georgia,serif;letter-spacing:.06em;color:#fff;background:linear-gradient(135deg,#f0588f,#c4175f);box-shadow:0 4px 18px rgba(196,23,95,.55);opacity:0;pointer-events:none;transform:translateY(8px);transition:opacity .9s ease,transform .9s ease,box-shadow .3s ease}
#kn.v{opacity:1;pointer-events:auto;transform:none}
#kn.v:hover{box-shadow:0 6px 26px rgba(255,80,150,.85)}
#kn:focus-visible,#mu:focus-visible{outline:2px solid #fff;outline-offset:3px}
body.wish #rp{color:#ffd0e0}
body.wish .tp{color:#ffd9e6;text-shadow:0 0 12px rgba(255,80,150,.9)}
@media (prefers-reduced-motion:reduce){.fk,.gw{animation:none}}
`;
document.head.appendChild(st);

/* ============ START PAGE: her name + small tips ============ */
const ct=$('#start .content');
if(ct){
  ct.insertAdjacentHTML('afterbegin',`<p id="pf">for ${E(CFG.name)}</p>`);
  ct.insertAdjacentHTML('beforeend',`<p id="ph">${E(CFG.vol)}</p><p id="pt">${E(CFG.tip)}</p>`);
}
if(CFG.link&&$('#lk'))$('#lk').href=CFG.link;

/* ============ BROWSER TAB TITLE ============ */
const T0=document.title='for '+CFG.name+' ♥';
document.addEventListener('visibilitychange',()=>{document.title=document.hidden?CFG.away:T0});

/* ============ MUSIC ON/OFF BUTTON ============ */
const bgm=$('#bgm');
if(bgm){
  const mu=document.createElement('button');
  mu.id='mu';mu.type='button';mu.textContent='♪';mu.setAttribute('aria-label','Music on or off');
  document.body.appendChild(mu);
  bgm.addEventListener('play',()=>mu.classList.add('on'));
  bgm.addEventListener('error',()=>mu.classList.remove('on'));
  bgm.addEventListener('volumechange',()=>mu.classList.toggle('off',bgm.muted));
  mu.onclick=()=>{bgm.muted=!bgm.muted};
}

/* ============ TAP ANYWHERE: hearts + a little love note ============ */
const fxl=document.createElement('div');fxl.id='fxl';document.body.appendChild(fxl);
let ti=Math.floor(Math.random()*CFG.taps.length);
const act=()=>!$('#sk.on')&&($('#s3.on')||$('#s4.on'));
function tapFx(x,y){
  for(let i=0;i<7;i++){
    const h=document.createElement('span'),a=-Math.PI/2+rnd(-1.3,1.3),d=rnd(45,105);
    h.className='th';h.textContent='♥';h.style.cssText=`left:${x}px;top:${y}px;font-size:${rnd(10,22).toFixed(0)}px`;
    fxl.appendChild(h);
    h.animate([
      {transform:'translate(-50%,-50%) scale(.4)',opacity:1},
      {transform:`translate(-50%,-50%) translate(${(Math.cos(a)*d).toFixed(1)}px,${(Math.sin(a)*d-30).toFixed(1)}px) rotate(${rnd(-40,40).toFixed(0)}deg)`,opacity:0}
    ],{duration:rnd(700,1100),easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish=()=>h.remove();
  }
  const p=document.createElement('span');
  p.className='tp';p.textContent=CFG.taps[ti++%CFG.taps.length];
  p.style.left=cl(x,95,innerWidth-95)+'px';p.style.top=y+'px';
  fxl.appendChild(p);
  p.animate([
    {transform:'translate(-50%,-50%)',opacity:0},
    {transform:'translate(-50%,-110%)',opacity:1,offset:.25},
    {transform:'translate(-50%,-230%)',opacity:0}
  ],{duration:1900,easing:'ease-out'}).onfinish=()=>p.remove();
}
document.addEventListener('pointerdown',e=>{
  if(REDUCE||!act()||!e.target.closest||e.target.closest('button,a,#scr'))return;
  tapFx(e.clientX,e.clientY);
},true);

/* ============ SIGN-OFF UNDER THE SCRATCH CARD ============ */
{
  const card=$('#card'),s4=$('#s4');
  if(card&&s4){
    const sg=document.createElement('p');sg.id='sg';sg.textContent=CFG.sign;s4.appendChild(sg);
    const ob=new MutationObserver(()=>{
      if(!card.classList.contains('open'))return;
      ob.disconnect();setTimeout(()=>sg.classList.add('v'),1800);
    });
    ob.observe(card,{attributes:true,attributeFilter:['class']});
  }
}

/* ============ NEW SCENE: the birthday cake & wish ============ */
const nx=$('#nx');
if(!nx)return;
const CX=[108,150,192],COL=['#ff8fb8','#ffd25e','#ffffff','#f06a96','#ffb3d1','#7fd1c8'];
const candles=CX.map((x,i)=>`<g class="cd" transform="translate(${x} 0)"><rect x="-5" y="58" width="10" height="36" rx="3" fill="#fff6f0"/><rect x="-5" y="68" width="10" height="5" fill="#f06a96"/><rect x="-5" y="80" width="10" height="5" fill="#f06a96"/><line x1="0" y1="58" x2="0" y2="51" stroke="#3a2222" stroke-width="2" stroke-linecap="round"/><g class="lt"><circle class="gw" cx="0" cy="42" r="30" fill="url(#kgw)"/><g class="fl"><path class="fk" style="animation-delay:-${(i*.07).toFixed(2)}s" d="M0 29C7 37 8.5 45 0 53C-8.5 45 -7 37 0 29Z" fill="url(#kf)"/></g></g></g>`).join('');
const cake=`<svg id="ck" viewBox="0 0 300 260" aria-hidden="true"><defs>
<linearGradient id="kb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7b6cd"/><stop offset="1" stop-color="#d9568a"/></linearGradient>
<linearGradient id="kt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3ea"/><stop offset="1" stop-color="#f6c3d4"/></linearGradient>
<radialGradient id="kf" cx=".5" cy=".7" r=".6"><stop offset="0" stop-color="#fff9d6"/><stop offset=".45" stop-color="#ffd25e"/><stop offset="1" stop-color="#ff7a2f"/></radialGradient>
<radialGradient id="kgw"><stop offset="0" stop-color="#ffc878" stop-opacity=".6"/><stop offset="1" stop-color="#ffc878" stop-opacity="0"/></radialGradient>
<symbol id="kh" viewBox="0 0 32 29"><path d="M16 28C5 20 0 14 0 8.5 0 3.5 3.5 0 8 0c3.4 0 6.2 2 8 5 1.8-3 4.6-5 8-5 4.5 0 8 3.5 8 8.5C32 14 27 20 16 28Z"/></symbol></defs>
<ellipse cx="150" cy="238" rx="140" ry="16" fill="#f1d3de"/><ellipse cx="150" cy="233" rx="140" ry="16" fill="#fff4f8"/>
<rect x="30" y="150" width="240" height="82" rx="14" fill="url(#kb)"/>
<rect x="30" y="148" width="240" height="18" rx="9" fill="#fff7f2"/>
<rect x="48" y="160" width="14" height="26" rx="7" fill="#fff7f2"/><rect x="96" y="160" width="14" height="18" rx="7" fill="#fff7f2"/><rect x="142" y="160" width="14" height="30" rx="7" fill="#fff7f2"/><rect x="190" y="160" width="14" height="20" rx="7" fill="#fff7f2"/><rect x="238" y="160" width="14" height="28" rx="7" fill="#fff7f2"/>
<text class="cn" x="150" y="219" text-anchor="middle" font-size="34" fill="#fff">${E(CFG.name)}</text>
<use href="#kh" x="44" y="203" width="16" height="14" fill="#fff" opacity=".85"/><use href="#kh" x="240" y="203" width="16" height="14" fill="#fff" opacity=".85"/>
<rect x="70" y="92" width="160" height="62" rx="12" fill="url(#kt)"/>
<rect x="70" y="92" width="160" height="14" rx="7" fill="#ec6f9b"/>
<rect x="86" y="100" width="12" height="22" rx="6" fill="#ec6f9b"/><rect x="140" y="100" width="12" height="14" rx="6" fill="#ec6f9b"/><rect x="196" y="100" width="12" height="26" rx="6" fill="#ec6f9b"/>
<use href="#kh" x="106" y="128" width="12" height="11" fill="#ec6f9b"/><use href="#kh" x="182" y="136" width="12" height="11" fill="#ec6f9b"/>
<circle cx="130" cy="134" r="2.4" fill="#f06a96"/><circle cx="154" cy="144" r="2.4" fill="#ffd25e"/><circle cx="168" cy="128" r="2.4" fill="#7fd1c8"/><circle cx="96" cy="144" r="2.4" fill="#ffd25e"/><circle cx="206" cy="144" r="2.4" fill="#f06a96"/>
${candles}</svg>`;

const sk=document.createElement('section');
sk.id='sk';
sk.innerHTML=`<div id="kg"></div><canvas id="kc"></canvas><p class="kt" id="k1">${E(CFG.lead)}</p>${cake}<p class="kt" id="k2"></p><button id="kn" type="button">${E(CFG.button)}</button>`;
document.body.appendChild(sk);
const k1=$('#k1'),k2=$('#k2'),kn=$('#kn'),kc=$('#kc'),ctx=kc.getContext('2d'),cds=$$('#sk .cd');

let on=0,kon=0,fin=0,hold=0,prog=0,out=0,wished=0,last=0,D=1,stars=[];
const P=[];
function size(){
  D=Math.min(devicePixelRatio||1,2);kc.width=innerWidth*D;kc.height=innerHeight*D;ctx.setTransform(D,0,0,D,0,0);
  stars=Array.from({length:Math.round(innerWidth*innerHeight/9000)},()=>({x:rnd(0,innerWidth),y:rnd(0,innerHeight*.8),r:rnd(.5,1.6),p:rnd(0,6.28)}));
}
addEventListener('resize',()=>{if(kon)size()});
const fxy=i=>{const r=cds[i].querySelector('.fk').getBoundingClientRect();return[r.left+r.width/2,r.top+r.height*.25]};
async function say(el,txt){el.classList.remove('v');await sleep(800);el.textContent=txt;if(txt)el.classList.add('v')}

function snuff(i){
  cds[i].classList.add('out');
  const[x,y]=fxy(i);
  for(let j=0;j<8;j++)P.push({k:1,x:x+rnd(-3,3),y:y+rnd(0,6),vx:rnd(-10,14),vy:-rnd(25,50),g:-8,d:.6,l:rnd(1.3,2.2),s:rnd(3,6),t:0});
  sk.style.setProperty('--lit',(.08+.92*(2-i)/3).toFixed(2));
  if(navigator.vibrate)navigator.vibrate(15);
  if(i===2)finish();
}
async function finish(){
  fin=1;hold=0;
  sk.style.setProperty('--ln',0);sk.style.setProperty('--sq',0);
  const r=$('#ck').getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height*.3;
  for(let i=0;i<110;i++){
    const a=-Math.PI/2+rnd(-1.25,1.25),v=rnd(150,440),h=Math.random()<.35;
    P.push({k:h?3:2,x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,g:330,d:.9,l:rnd(2.2,3.8),s:h?rnd(11,20):rnd(5,9),r:rnd(0,6.28),w:rnd(-8,8),c:COL[i%COL.length],t:0});
  }
  await sleep(700);
  say(k1,CFG.done);
  for(let i=0;i<CFG.wishes.length;i++){
    await say(k2,CFG.wishes[i]);
    await sleep(i<CFG.wishes.length-1?3000:1400);
  }
  kn.classList.add('v');
}

function kstep(t){
  if(!kon)return;
  const dt=Math.min(.05,(t-last)/1e3);last=t;
  if(!fin){
    prog=cl(prog+(hold?dt/1.6:-dt),out/3,1);
    while(out<3&&prog>=(out+1)/3-.001)snuff(out++);
    sk.style.setProperty('--ln',(prog*34).toFixed(1));
    sk.style.setProperty('--sq',prog.toFixed(2));
    for(let i=out;i<3;i++)if(Math.random()<dt*5){const[x,y]=fxy(i);P.push({k:0,x:x+rnd(-4,4),y,vx:rnd(-6,6),vy:-rnd(18,40),g:-10,d:.5,l:rnd(.8,1.6),s:rnd(.8,1.8),t:0})}
  }
  ctx.clearRect(0,0,innerWidth,innerHeight);
  ctx.fillStyle='#ffe6ef';
  for(const s of stars){ctx.globalAlpha=.25+.6*(.5+.5*Math.sin(t/800+s.p));ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,6.283);ctx.fill()}
  for(let i=P.length;i--;){
    const p=P[i];p.t+=dt;
    if(p.t>=p.l){P.splice(i,1);continue}
    p.vx*=Math.max(0,1-p.d*dt);p.vy+=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;
    const a=1-p.t/p.l;
    if(p.k===0){ctx.globalAlpha=a;ctx.fillStyle='#ffd27a';ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,6.283);ctx.fill()}
    else if(p.k===1){ctx.globalAlpha=.3*a;ctx.fillStyle='#e8d6de';ctx.beginPath();ctx.arc(p.x,p.y,p.s*(1+p.t*1.6),0,6.283);ctx.fill()}
    else{
      p.r+=p.w*dt;ctx.globalAlpha=Math.min(1,a*2);ctx.fillStyle=p.c;
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);
      if(p.k===2)ctx.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6);
      else{ctx.font=p.s+'px Georgia,serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('♥',0,0)}
      ctx.restore();
    }
  }
  ctx.globalAlpha=1;
  requestAnimationFrame(kstep);
}

/* hold to blow */
sk.addEventListener('pointerdown',e=>{if(on&&!fin&&!e.target.closest('button'))hold=1});
['pointerup','pointercancel','blur'].forEach(n=>addEventListener(n,()=>{hold=0}));
sk.addEventListener('contextmenu',e=>e.preventDefault());
addEventListener('keydown',e=>{if(on&&!fin&&(e.key===' '||e.key==='Enter')&&!(e.target.closest&&e.target.closest('button'))){e.preventDefault();hold=1}});
addEventListener('keyup',e=>{if(e.key===' '||e.key==='Enter')hold=0});

async function wishScene(){
  if(on)return;on=1;
  nx.classList.remove('on');
  document.body.classList.add('wish');
  const cvs=$('#cv');if(cvs)cvs.style.opacity=0;      /* tree fades out */
  size();kon=1;last=performance.now();requestAnimationFrame(kstep);
  sk.classList.add('on');
  await sleep(900);k1.classList.add('v');
  await sleep(1800);say(k2,CFG.hint);
}
/* "next page" now opens the cake first; the cake's own button then opens the surprise */
document.addEventListener('click',e=>{
  if(wished||!e.target.closest||!e.target.closest('#nx'))return;
  e.stopPropagation();e.preventDefault();wishScene();
},true);
kn.onclick=()=>{
  if(wished)return;wished=1;kn.classList.remove('v');
  nx.click();                                            /* runs your original "scene 4" */
  sleep(1300).then(()=>{sk.classList.remove('on');document.body.classList.remove('wish');kon=0});
};
})();