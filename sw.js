<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MACHINGA BOY VIC - V4 FULL SQUAD 28</title>
<style>
body{font-family:Arial;background:#001428;color:white;padding:6px;margin:0}
.header{background:linear-gradient(90deg,gold,#ffcc00);color:#000;padding:14px;text-align:center;font-weight:900;font-size:17px;border-radius:12px;border:3px solid #fff}
.logos{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:12px 0}
.logo-card{background:linear-gradient(180deg,#0a3d8f,#001428);border:3px solid gold;border-radius:16px;padding:12px;text-align:center;cursor:pointer}
.logo-circle{width:70px;height:70px;background:radial-gradient(gold,#ffcc00);border-radius:50%;margin:0 auto 6px;display:flex;align-items:center;justify-content:center;font-size:32px;border:3px solid white}
.card{background:#fff;color:#000;border-radius:12px;padding:12px;margin-bottom:12px;border-left:6px solid gold}
table{width:100%;border-collapse:collapse} th{background:#0a3d8f;color:white;padding:6px;font-size:11px} td{padding:6px;text-align:center;border-bottom:1px solid #ddd;font-size:12px}
.modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:999;overflow:auto}
.modal-content{background:white;color:black;margin:3% auto;width:94%;max-width:520px;border-radius:16px;border:4px solid gold;padding:15px;max-height:85vh;overflow:auto}
.close{float:right;font-size:28px;font-weight:bold;cursor:pointer;color:red}
.chip{background:linear-gradient(gold,#ffcc00);padding:4px 8px;border-radius:12px;font-size:10px;font-weight:bold;margin:2px;display:inline-block;border:1px solid #000}
.chip.gk{background:linear-gradient(#ff4444,#ff8844);color:white}
.chip.reserve{background:#e6f0ff;border:1px solid #0a3d8f}
.match-row{display:flex;justify-content:space-between;align-items:center;background:#f0f6ff;padding:6px;border-radius:7px;margin-bottom:4px;font-size:12px}
button{background:gold;font-weight:bold;padding:10px;border-radius:8px;border:2px solid #000;width:100%;cursor:pointer}
.live-input{width:28px;text-align:center;font-weight:bold;border:2px solid gold;border-radius:4px}
</style>
</head>
<body>
<div class="header">🏆 MACHINGA BOY VIC - FULL SQUAD 28 - V4 🏆<br><small>Dinani Logo Kuti Muone Players Onse</small></div>

<div class="logos">
<div class="logo-card" onclick="showTeam('manCity')"><div class="logo-circle">🔵</div><b>MAN CITY VIC</b><br><small>28 Players - TAP</small></div>
<div class="logo-card" onclick="showTeam('tbo')"><div class="logo-circle">🏙️</div><b>TBO CITY</b><br><small>19 Players - TAP</small></div>
<div class="logo-card" onclick="showTeam('crazy')"><div class="logo-circle">🎮</div><b>CRAZY GAME</b><br><small>20 Players - TAP</small></div>
<div class="logo-card" onclick="showTeam('gunman')"><div class="logo-circle">🔫</div><b>GUNMAN</b><br><small>19 Players - TAP</small></div>
</div>

<div class="card"><h3>📊 LOG TABLE</h3><table id="logTable"></table></div>
<div class="card"><h3>⚔️ LIVE SCORE</h3><div id="matches"></div><button onclick="saveScores()">💾 Save</button></div>

<div id="playerModal" class="modal"><div class="modal-content"><span class="close" onclick="closeModal()">&times;</span><h3 id="modalTitle" style="color:#0a3d8f;border-bottom:2px solid gold"></h3><div id="modalBody"></div><button onclick="closeModal()" style="margin-top:10px">Tsekani</button></div></div>

<script>
const squads={
 manCity:{
  name:"MAN CITY FC - MACHINGA BOY VIC - FULL 28",
  formation:"4-3-3 Attack - 28 Players",
  starting:["91 Yamal RW","90 Kvaratskhelia LW","90 Ziyech RW","89 Mendes LB","88 Valverde CM","85 Szoboszlai AM","92 Rodri DM","85 Van Dijk CB","91 Cannavaro CB","89 Dias CB","95 Donnarumma GK"],
  subs:["93 Mbappe CF","91 Haaland CF","87 Dembele CF","87 Aubameyang CF","86 De Bruyne AM","86 Pedri CM","85 Bellingham AM","85 Caicedo DM"],
  reserves:["87 Saliba CB","87 Raya GK","88 Hakimi RB","84 Semenyo RW","82 Cherki RW","82 Foden AM","82 Fernandez CM","81 Simon GK","80 Cucurella LB","79 Ndiaye RW","79 Anderson DM","79 Ait-Nouri LB","79 Khusanov CB","79 Nunes RB","75 Bouaddi CM"]
 },
 tbo:{name:"TBO CITY FC - HANEEF",formation:"4-2-3-1",starting:["93 Haaland CF","87 Doku LW","86 Cherki RW","92 Yamal RW","94 Rodri DM","87 Anderson DM","88 O'Reilly LB","87 Gvardiol CB","83 Khusanov CB","89 Hakimi RB","90 Donnarumma GK"],subs:["89 Guler AM","86 Foden AM","82 Ndiaye RW","89 Mendes LB","79 Rulli GK","89 Pedri CM","80 Yildiz SS","86 Kounde LB"],reserves:[]},
 crazy:{name:"CRAZY GAME FC - CFC",formation:"ULTRA 99",starting:["99 Dembele CF","99 Haaland CF","98 Fernandes AM","99 Vini Jr LW","98 Olise RW","98 Valverde CM","89 Balde LB","95 Dias CB","95 Hakimi RB","94 Courtois GK"],subs:["98 Vitinha CM","96 Mbappe CF","90 Yamal RW","82 Cancelo RB","91 Palmer AM","88 Williams LM","93 Raphinha LW","89 Cannavaro CB"],reserves:["95 Pedri CM","94 Calhanoglu DM","94 Mendes LB","90 Martinelli LW"]},
 gunman:{name:"GUNMAN FC - LAHEEMU",formation:"4-3-3",starting:["86 Raphinha LW","90 Haaland CF","90 Yamal RW","90 Dimarco LWB","82 Camavinga CM","87 Caicedo DM","91 Hakimi RB","88 Mendes LB","88 Gabriel CB","83 Alexander-Arnold RB","87 Donnarumma GK"],subs:["86 Szczesny GK","81 Huijsen CB","81 Guehi CB","85 Van Dijk CB","82 Rudiger CB","85 Bellingham AM","82 Modric CM","90 Dembele CF"],reserves:[]}
};

let fixtures=[
 {home:"Crazy Game FC",away:"Man City FC",hg:2,ag:1},
 {home:"Man City FC",away:"TBO City FC",hg:2,ag:1},
 {home:"Crazy Game FC",away:"Gunman FC",hg:3,ag:0},
 {home:"TBO City FC",away:"Gunman FC",hg:1,ag:1},
 {home:"Man City FC",away:"Gunman FC",hg:4,ag:0},
 {home:"TBO City FC",away:"Crazy Game FC",hg:2,ag:2}
];

function showTeam(k){
 let s=squads[k];
 document.getElementById("modalTitle").innerHTML=s.name+"<br><small>"+s.formation+"</small>";
 let h="<b style='color:#0a3d8f'>STARTING XI (11):</b><br>";
 s.starting.forEach(p=>{let cls=p.includes("GK")?"chip gk":"chip"; h+=`<span class="${cls}">${p}</span>`});
 h+="<br><br><b style='color:#0a3d8f'>SUBS BENCH (8/8):</b><br>";
 s.subs.forEach(p=>{h+=`<span class="chip">${p}</span>`});
 if(s.reserves.length>0){h+="<br><br><b style='color:#0a3d8f'>RESERVES ("+s.reserves.length+"):</b><br>"; s.reserves.forEach(p=>{h+=`<span class="chip reserve">${p}</span>`});}
 h+="<br><br><small>Total: "+(s.starting.length+s.subs.length+s.reserves.length)+" Players</small>";
 document.getElementById("modalBody").innerHTML=h;
 document.getElementById("playerModal").style.display="block";
}
function closeModal(){document.getElementById("playerModal").style.display="none";}
function renderMatches(){let html=""; fixtures.forEach((f,i)=>{html+=`<div class="match-row"><span style="width:35%">${f.home}</span><span><input class="live-input" id="hg${i}" value="${f.hg}" type="number"> - <input class="live-input" id="ag${i}" value="${f.ag}" type="number"></span><span style="width:35%;text-align:right">${f.away}</span></div>`}); document.getElementById("matches").innerHTML=html;}
function calculateTable(){let teams={}; ["Man City FC","TBO City FC","Crazy Game FC","Gunman FC"].forEach(t=>{teams[t]={P:0,W:0,D:0,L:0,GF:0,GA:0,Pts:0}}); fixtures.forEach(f=>{teams[f.home].P++; teams[f.away].P++; teams[f.home].GF+=f.hg; teams[f.home].GA+=f.ag; teams[f.away].GF+=f.ag; teams[f.away].GA+=f.hg; if(f.hg>f.ag){teams[f.home].W++; teams[f.home].Pts+=3; teams[f.away].L++;} else if(f.hg<f.ag){teams[f.away].W++; teams[f.away].Pts+=3; teams[f.home].L++;} else{teams[f.home].D++; teams[f.away].D++; teams[f.home].Pts+=1; teams[f.away].Pts+=1;}}); let sorted=Object.entries(teams).sort((a,b)=>b[1].Pts-a[1].Pts); let t=`<tr><th>#</th><th>TEAM</th><th>P</th><th>W</th><th>Pts</th></tr>`; sorted.forEach((en,i)=>{let c=i==0?'#fff8dc':i==1?'#e6f7ff':'white'; t+=`<tr style="background:${c}"><td>${i+1}</td><td style="text-align:left">${en[0]}</td><td>${en[1].P}</td><td>${en[1].W}</td><td><b>${en[1].Pts}</b></td></tr>`}); document.getElementById("logTable").innerHTML=t;}
function saveScores(){fixtures.forEach((f,i)=>{f.hg=parseInt(document.getElementById("hg"+i).value)||0; f.ag=parseInt(document.getElementById("ag"+i).value)||0;}); localStorage.setItem("dls_v4",JSON.stringify(fixtures)); calculateTable(); alert("Zasungidwa!");}
let saved=localStorage.getItem("dls_v4"); if(saved){fixtures=JSON.parse(saved);} renderMatches(); calculateTable();
</script>
</body>
</html>
