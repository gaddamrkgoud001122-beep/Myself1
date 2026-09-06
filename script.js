const roles=[
  "Outpatient Coding Education Analyst",
  "Revenue Cycle Analyst",
  "Health Informatics Professional",
  "Medical Coding & Compliance Specialist"
];
let roleIndex=0;
const roleText=document.getElementById("roleText");
function rotateRole(){
  roleText.style.opacity="0";
  roleText.style.transform="translateY(8px)";
  setTimeout(()=>{
    roleIndex=(roleIndex+1)%roles.length;
    roleText.textContent=roles[roleIndex];
    roleText.style.opacity="1";
    roleText.style.transform="translateY(0)";
  },280);
}
setInterval(rotateRole,3200);

const revealObserver=new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12,rootMargin:"0px 0px -40px 0px"});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

document.getElementById("exploreBtn").addEventListener("click",()=>{
  document.getElementById("about").scrollIntoView({behavior:"smooth"});
});

const progress=document.getElementById("progressBar");
window.addEventListener("scroll",()=>{
  const scrollTop=window.scrollY;
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(max>0?(scrollTop/max)*100:0)+"%";
},{passive:true});

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",e=>{
    const target=document.querySelector(link.getAttribute("href"));
    if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth"});}
  });
});
