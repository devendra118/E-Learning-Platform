document.addEventListener("DOMContentLoaded",()=>{
const menu=document.querySelector(".menu-toggle"), nav=document.querySelector(".nav-links");
if(menu&&nav) menu.addEventListener("click",()=>nav.classList.toggle("open"));

const cards=[...document.querySelectorAll(".catalog-card")], search=document.querySelector("#courseSearch"), filters=[...document.querySelectorAll(".filter")], empty=document.querySelector("#noCourses");
let active="All";
function render(){
 if(!cards.length)return;
 const q=(search?.value||"").trim().toLowerCase(); let shown=0;
 cards.forEach(c=>{const okCat=active==="All"||c.dataset.category===active;const okQ=!q||c.dataset.title.includes(q);const show=okCat&&okQ;c.style.display=show?"":"none";if(show)shown++});
 if(empty) empty.hidden=shown!==0;
}
filters.forEach(b=>b.addEventListener("click",()=>{filters.forEach(x=>x.classList.remove("active"));b.classList.add("active");active=b.dataset.filter;render()}));
search?.addEventListener("input",render);

const toggle=document.querySelector("#togglePassword"), pass=document.querySelector("#loginPassword");
toggle?.addEventListener("click",()=>{pass.type=pass.type==="password"?"text":"password";toggle.innerHTML=pass.type==="password"?'<i class="bi bi-eye"></i>':'<i class="bi bi-eye-slash"></i>'});
document.querySelector("#loginForm")?.addEventListener("submit",e=>{e.preventDefault();alert("Demo login: authentication is not connected to a backend yet.");});

const params=new URLSearchParams(location.search), course=params.get("course"), price=params.get("price");
if(document.querySelector("#courseName")&&course){document.querySelector("#courseName").textContent=course;document.querySelector("#coursePrice").textContent="₹"+(price||"0")}
document.querySelector("#paymentForm")?.addEventListener("submit",e=>{e.preventDefault();alert("Demo purchase completed. No real payment was processed.");});
document.querySelector("#paymentMethod")?.addEventListener("change",e=>{const f=document.querySelector("#cardFields");if(f)f.style.display=e.target.value==="Credit / Debit Card"?"block":"none"});
});
document.addEventListener("DOMContentLoaded",()=>{
  const revealTargets=document.querySelectorAll(".section,.course-card,.feature-list>div,.info-card,.form-card,.about-stats>div,.checkout-grid>*,.page-hero");
  revealTargets.forEach((el,i)=>{el.classList.add("reveal");el.style.transitionDelay=(Math.min(i%6,5)*60)+"ms"});
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}})
  },{threshold:.12});
  revealTargets.forEach(el=>observer.observe(el));

  document.querySelectorAll(".course-card").forEach(card=>{
    card.addEventListener("mousemove",e=>{
      if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
      const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`translateY(-5px) perspective(700px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*4).toFixed(2)}deg)`;
    });
    card.addEventListener("mouseleave",()=>card.style.transform="");
  });

  const hero=document.querySelector(".hero");
  if(hero){
    const glow=document.createElement("div");
    glow.style.cssText="position:absolute;width:240px;height:240px;border-radius:50%;pointer-events:none;opacity:0;background:radial-gradient(circle,rgba(124,92,255,.14),transparent 65%);transform:translate(-50%,-50%);transition:opacity .2s;z-index:-1";
    hero.appendChild(glow);
    hero.addEventListener("pointermove",e=>{
      const r=hero.getBoundingClientRect();glow.style.left=(e.clientX-r.left)+"px";glow.style.top=(e.clientY-r.top)+"px";glow.style.opacity=".8";
    });
    hero.addEventListener("pointerleave",()=>glow.style.opacity="0");
  }

  document.querySelectorAll(".hero-proof strong").forEach(el=>{
    const raw=el.textContent.trim(), m=raw.match(/(\d+)/);
    if(!m)return;
    const target=Number(m[1]), suffix=raw.replace(m[1],"");
    let start=0, began=false;
    const io=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!began){
      began=true;const t0=performance.now();
      const tick=now=>{const p=Math.min((now-t0)/900,1), eased=1-Math.pow(1-p,3);el.textContent=Math.floor(target*eased)+suffix;if(p<1)requestAnimationFrame(tick)};
      requestAnimationFrame(tick);io.disconnect();
    }});
    io.observe(el);
  });
});

document.addEventListener("DOMContentLoaded",()=>{
  const contactForm=document.querySelector("#contactForm");
  const contactStatus=document.querySelector("#contactStatus");
  contactForm?.addEventListener("submit",async e=>{
    e.preventDefault();
    if(!contactForm.reportValidity()) return;
    const btn=contactForm.querySelector("button[type=submit]");
    const old=btn.innerHTML; btn.disabled=true; btn.innerHTML='Sending <i class="bi bi-arrow-repeat"></i>';
    if(contactStatus) contactStatus.textContent="";
    try{
      const payload=Object.fromEntries(new FormData(contactForm).entries());
      const res=await fetch("/.netlify/functions/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const data=await res.json();
      if(!res.ok) throw new Error(data.error||"Unable to send message.");
      contactForm.reset();
      if(contactStatus){contactStatus.textContent="Message sent successfully.";contactStatus.className="form-status success";}
    }catch(err){
      if(contactStatus){contactStatus.textContent=err.message+" Please try again.";contactStatus.className="form-status error";}
    }finally{btn.disabled=false;btn.innerHTML=old;}
  });

  const paymentForm=document.querySelector("#paymentForm");
  const paymentStatus=document.querySelector("#paymentStatus");
  paymentForm?.addEventListener("submit",async e=>{
    e.preventDefault();
    if(!paymentForm.reportValidity()) return;
    const name=paymentForm.querySelector('input[placeholder="Your name"]')?.value.trim();
    const email=paymentForm.querySelector('input[type="email"]')?.value.trim();
    const selectedCourse=document.querySelector("#courseName")?.textContent.trim();
    const btn=paymentForm.querySelector("button[type=submit]"); const old=btn.innerHTML;
    btn.disabled=true; btn.innerHTML='Processing <i class="bi bi-arrow-repeat"></i>';
    try{
      const res=await fetch("/.netlify/functions/enroll",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,course:selectedCourse})});
      const data=await res.json(); if(!res.ok) throw new Error(data.error||"Enrollment failed.");
      if(paymentStatus){paymentStatus.textContent="Enrollment request received. This demo does not process real payments.";paymentStatus.className="form-status success";}
    }catch(err){if(paymentStatus){paymentStatus.textContent=err.message;paymentStatus.className="form-status error";}}
    finally{btn.disabled=false;btn.innerHTML=old;}
  });
});
