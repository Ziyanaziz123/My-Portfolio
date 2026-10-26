const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const cv=$('#bg'),cx=cv.getContext('2d');let W,H,mode=document.body.dataset.page||'home',mx=-999,my=-999,raf;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;init()}
const CH='01{}[]<>/;=()$#&*+-'.split(''),SN=['const','async','await','return','@Injectable()','SELECT *','npm run dev','git push','JWT.sign()','socket.on()','POST /api','try{}catch','import','export default','while(true)','200 OK'];
let cols=[],fl=[],pts=[];
function init(){
 cols=Array.from({length:Math.floor(W/18)},()=>Math.random()*H/18);
 fl=Array.from({length:Math.max(14,W/70|0)},()=>({x:Math.random()*W,y:Math.random()*H,s:.2+Math.random()*.6,t:SN[Math.random()*SN.length|0],z:11+Math.random()*8}));
 pts=Array.from({length:Math.min(90,W/16|0)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5}));
 cx.fillStyle='#04070d';cx.fillRect(0,0,W,H)}
function draw(){
 if(mode==='home'){cx.fillStyle='rgba(4,7,13,.14)';cx.fillRect(0,0,W,H);cx.font='15px JetBrains Mono';
  cols.forEach((y,i)=>{cx.fillStyle=Math.random()>.97?'#e0ffff':'rgba(34,211,238,.55)';cx.fillText(CH[Math.random()*CH.length|0],i*18,y*18);
  cols[i]=y*18>H&&Math.random()>.975?0:y+.45})}
 else if(mode==='about'){cx.fillStyle='rgba(4,7,13,.35)';cx.fillRect(0,0,W,H);
  fl.forEach(f=>{cx.font=f.z+'px JetBrains Mono';cx.fillStyle='rgba(74,222,128,'+(.1+f.s*.3)+')';cx.fillText(f.t,f.x,f.y);f.y-=f.s;if(f.y<-20){f.y=H+20;f.x=Math.random()*W}});
  cx.strokeStyle='rgba(74,222,128,.04)';for(let x=0;x<W;x+=60){cx.beginPath();cx.moveTo(x,0);cx.lineTo(x,H);cx.stroke()}}
 else{cx.fillStyle='rgba(4,7,13,.4)';cx.fillRect(0,0,W,H);
  pts.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
   const dm=Math.hypot(p.x-mx,p.y-my);if(dm<140){p.x+=(p.x-mx)*.01;p.y+=(p.y-my)*.01}
   cx.fillStyle='rgba(34,211,238,.8)';cx.fillRect(p.x-1.5,p.y-1.5,3,3);
   for(let j=i+1;j<pts.length;j++){const q=pts[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<130){cx.strokeStyle='rgba(34,211,238,'+(.22*(1-d/130))+')';cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}})}
 raf=requestAnimationFrame(draw)}
addEventListener('resize',rs);rs();draw();
/* typing */
const L=['whoami → Muhammad Ziyan','role   → Backend Developer','stack  → NestJS · Node.js · PostgreSQL · MongoDB','status → open_to_work = true'];let tk=0;
async function type(){const id=++tk,el=$('#tw');el.innerHTML='';
 for(const l of L){if(id!==tk)return;const d=document.createElement('div');d.innerHTML='<span style="color:#4ade80">$ </span><span></span>';el.appendChild(d);
  for(const c of l){if(id!==tk)return;d.lastChild.textContent+=c;await new Promise(r=>setTimeout(r,28))}
  await new Promise(r=>setTimeout(r,260))}
 el.lastChild.insertAdjacentHTML('beforeend',' <span class="cur"></span>')}
/* reveal */
const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('s')),{threshold:.12});
function rv(){$$('.rv,.card').forEach(e=>{if(!e.classList.contains('rv'))e.classList.add('rv');io.observe(e)})}
/* progress bar */
addEventListener('scroll',()=>{const h=document.documentElement;$('#bar').style.width=(scrollY/(h.scrollHeight-innerHeight||1)*100)+'%'});
/* cursor + card glow/tilt */
const c1=$('#c1'),c2=$('#c2');let rx=0,ry=0;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;c1.style.transform='translate('+mx+'px,'+my+'px)';
 const cd=e.target.closest&&e.target.closest('.card');
 if(cd){const r=cd.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;cd.style.setProperty('--x',x+'px');cd.style.setProperty('--y',y+'px');
  cd.style.transform='perspective(800px) rotateX('+((y/r.height-.5)*-7)+'deg) rotateY('+((x/r.width-.5)*7)+'deg)'}});
addEventListener('mouseout',e=>{const cd=e.target.closest&&e.target.closest('.card');if(cd)cd.style.transform=''});
addEventListener('mouseover',e=>{const h=e.target.closest('a,button');c2.classList.toggle('h',!!h);c2.textContent=h?'</>':''});
(function f(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;c2.style.transform='translate('+rx+'px,'+ry+'px)';requestAnimationFrame(f)})();
/* form */
const form=$('#contect-form'),res=$('#result');
if(form)form.addEventListener('submit',e=>{e.preventDefault();res.textContent='Sending...';
 fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))})
 .then(async r=>{const j=await r.json();if(r.status==200){res.textContent='Message sent successfully! ✅';form.reset()}else res.textContent=j.message})
 .catch(()=>{const d=Object.fromEntries(new FormData(form));res.innerHTML='Couldn’t send from here. <a target="_blank" rel="noopener" style="color:#4ade80" href="mailto:ziyanazizz23@gmail.com?subject='+encodeURIComponent('Portfolio message from '+d.name)+'&body='+encodeURIComponent(d.message+'\n\nReply to: '+d.email)+'">Click to email me directly</a>'}).then(()=>setTimeout(()=>res.textContent='',20000))});
if($('#tw'))type();rv();
