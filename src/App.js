import { useState, useMemo, useCallback } from "react";

// ─── TALLERES ────────────────────────────────────────────────
const TALLERES = [
  { id: "taller1", nombre: "Taller El Motor",     clave: "motor123" },
  { id: "taller2", nombre: "Mecánica Los Andes",  clave: "andes456" },
  { id: "taller3", nombre: "Auto Service Norte",  clave: "norte789" },
  { id: "taller4", nombre: "Maty Passot",         clave: "maty123" },
];

const fmt = (n) =>
  n != null && n !== ""
    ? "$" + Number(n).toLocaleString("es-AR", { minimumFractionDigits: 0 })
    : "—";

const fmtDate = (d) => {
  if (!d) return "—";
  return new Date(d + "T12:00:00").toLocaleDateString("es-AR", {
    day: "2-digit", month: "short", year: "numeric",
  });
};

const ESTADOS = ["Pendiente", "En proceso", "Listo", "Entregado"];

const EC = {
  Pendiente:    { bg:"#2a2200", border:"#856404", text:"#ffd43b", dot:"#ffc107" },
  "En proceso": { bg:"#001a3a", border:"#084298", text:"#74b9ff", dot:"#0d6efd" },
  Listo:        { bg:"#002215", border:"#0a3622", text:"#6bcb8b", dot:"#198754" },
  Entregado:    { bg:"#1a1a1a", border:"#444",    text:"#aaa",    dot:"#666"    },
};

const SEED = [{
  id:1, cliente:"Carlos Mendoza", auto:"Toyota Corolla 2019", patente:"AB123CD",
  fecha:"2026-04-10", estado:"Entregado", presupuesto:35000, precioFinal:32000,
  arreglos:[
    {id:101,descripcion:"Cambio de frenos delanteros",horas:2.5,materiales:"Pastillas Brembo"},
    {id:102,descripcion:"Revisión suspensión",horas:1,materiales:"—"},
  ],
}];

const emptyOrden = () => ({
  cliente:"", auto:"", patente:"",
  fecha: new Date().toISOString().split("T")[0],
  estado:"Pendiente", presupuesto:"", precioFinal:"", arreglos:[],
});

const emptyArreglo = () => ({ id:Date.now(), descripcion:"", horas:"", materiales:"" });

const LS = {
  getData:    (id) => { try { const d=localStorage.getItem(`td_${id}`); return d?JSON.parse(d):SEED; } catch{ return SEED; } },
  setData:    (id,v) => { try { localStorage.setItem(`td_${id}`,JSON.stringify(v)); } catch{} },
  getSession: () => { try { return localStorage.getItem("t_sess")||null; } catch{ return null; } },
  setSession: (id) => { try { localStorage.setItem("t_sess",id); } catch{} },
  clrSession: () => { try { localStorage.removeItem("t_sess"); } catch{} },
};

const printReport = (orden, tallerNombre) => {
  const th=orden.arreglos.reduce((s,a)=>s+(Number(a.horas)||0),0);
  const html=`<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"/><title>Reporte</title>
<style>body{font-family:Arial,sans-serif;margin:40px;color:#111;font-size:13px}h1{font-size:22px;margin-bottom:2px}.tn{font-weight:700;color:#444;margin-bottom:24px}.g{display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;margin-bottom:24px}.l{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#888;margin-bottom:2px}.v{font-size:14px;font-weight:600}table{width:100%;border-collapse:collapse;margin-bottom:20px}th{background:#111;color:#fff;padding:8px 10px;text-align:left;font-size:11px;letter-spacing:1px;text-transform:uppercase}td{padding:8px 10px;border-bottom:1px solid #eee;vertical-align:top}.tots{display:flex;justify-content:flex-end;gap:40px}.tl{font-size:11px;color:#888;text-transform:uppercase}.tv{font-size:18px;font-weight:700}.fin{color:#155724}.foot{margin-top:40px;padding-top:16px;border-top:1px solid #ddd;font-size:11px;color:#aaa;text-align:center}</style>
</head><body>
<h1>⚙ AutoTaller Pro</h1><div class="tn">${tallerNombre}</div>
<p style="color:#666;font-size:12px;margin-bottom:24px">Orden — ${new Date().toLocaleDateString("es-AR",{day:"2-digit",month:"long",year:"numeric"})}</p>
<div class="g">
<div><div class="l">Cliente</div><div class="v">${orden.cliente}</div></div>
<div><div class="l">Vehículo</div><div class="v">${orden.auto}</div></div>
<div><div class="l">Patente</div><div class="v">${orden.patente||"—"}</div></div>
<div><div class="l">Fecha</div><div class="v">${fmtDate(orden.fecha)}</div></div>
<div><div class="l">Estado</div><div class="v">${orden.estado}</div></div>
<div><div class="l">Horas totales</div><div class="v">${th.toFixed(1)} hs</div></div>
</div>
<table><thead><tr><th>#</th><th>Descripción</th><th>Materiales</th><th>Horas</th></tr></thead><tbody>
${orden.arreglos.length?orden.arreglos.map((a,i)=>`<tr><td>${i+1}</td><td>${a.descripcion||"—"}</td><td>${a.materiales||"—"}</td><td style="text-align:right">${a.horas?Number(a.horas).toFixed(1)+" hs":"—"}</td></tr>`).join(""):'<tr><td colspan="4" style="color:#aaa;text-align:center">Sin arreglos</td></tr>'}
</tbody></table>
<div class="tots">
<div><div class="tl">Presupuesto</div><div class="tv">${fmt(orden.presupuesto)}</div></div>
<div><div class="tl">Precio Final</div><div class="tv fin">${fmt(orden.precioFinal)}</div></div>
</div>
<div class="foot">AutoTaller Pro — ${tallerNombre}</div>
</body></html>`;
  const w=window.open("","_blank","width=800,height=900");
  w.document.write(html); w.document.close(); w.focus(); setTimeout(()=>w.print(),400);
};

const printAll = (registros, tallerNombre) => {
  const rows=registros.map(o=>{
    const h=o.arreglos.reduce((s,a)=>s+(Number(a.horas)||0),0);
    return `<tr><td>${o.cliente}</td><td>${o.auto}</td><td>${o.patente||"—"}</td><td>${fmtDate(o.fecha)}</td><td>${o.estado}</td><td>${o.arreglos.length}</td><td style="text-align:right">${h.toFixed(1)} hs</td><td style="text-align:right">${fmt(o.presupuesto)}</td><td style="text-align:right;font-weight:700;color:#155724">${fmt(o.precioFinal)}</td></tr>`;
  }).join("");
  const total=registros.reduce((s,r)=>s+(Number(r.precioFinal)||0),0);
  const html=`<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"/><title>Reporte General</title>
<style>body{font-family:Arial,sans-serif;margin:32px;color:#111;font-size:12px}h1{font-size:20px;margin-bottom:2px}.sub{color:#666;font-size:11px;margin-bottom:24px}table{width:100%;border-collapse:collapse}th{background:#111;color:#fff;padding:7px 8px;text-align:left;font-size:10px;letter-spacing:1px;text-transform:uppercase}td{padding:7px 8px;border-bottom:1px solid #eee}.fr td{font-weight:700;border-top:2px solid #111;background:#f9f9f9}.foot{margin-top:32px;padding-top:12px;border-top:1px solid #ddd;font-size:10px;color:#aaa;text-align:center}</style>
</head><body>
<h1>⚙ AutoTaller Pro — Reporte General</h1>
<div class="sub"><strong>${tallerNombre}</strong> · ${new Date().toLocaleDateString("es-AR",{day:"2-digit",month:"long",year:"numeric"})} · ${registros.length} órdenes</div>
<table><thead><tr><th>Cliente</th><th>Vehículo</th><th>Patente</th><th>Fecha</th><th>Estado</th><th>Arreglos</th><th>Horas</th><th>Presupuesto</th><th>Precio Final</th></tr></thead>
<tbody>${rows}<tr class="fr"><td colspan="8" style="text-align:right">TOTAL INGRESOS</td><td style="text-align:right;color:#155724">${fmt(total)}</td></tr></tbody></table>
<div class="foot">AutoTaller Pro — ${tallerNombre}</div>
</body></html>`;
  const w=window.open("","_blank","width=1000,height=800");
  w.document.write(html); w.document.close(); w.focus(); setTimeout(()=>w.print(),400);
};

// ─── UI atoms ────────────────────────────────────────────────
function Badge({estado}){
  const e=EC[estado]||EC["Pendiente"];
  return(<span style={{background:e.bg,border:`1px solid ${e.border}`,color:e.text,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:600,display:"inline-flex",alignItems:"center",gap:5}}>
    <span style={{width:5,height:5,borderRadius:"50%",background:e.dot,display:"inline-block"}}/>{estado}
  </span>);
}

const LBL={display:"block",fontSize:10,color:"#c8a84b",letterSpacing:1.5,textTransform:"uppercase",marginBottom:5};
const LBL2={display:"block",fontSize:10,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:4};
const INP={width:"100%",background:"#141414",border:"1px solid #2a2a2a",borderRadius:7,padding:"9px 13px",color:"#f0ece0",fontSize:14,outline:"none",boxSizing:"border-box"};
const INP2={width:"100%",background:"#141414",border:"1px solid #2a2a2a",borderRadius:6,padding:"8px 12px",color:"#f0ece0",fontSize:13,outline:"none",boxSizing:"border-box"};

function FInput({label,required,...p}){
  return(<div><label style={LBL}>{label}{required&&<span style={{color:"#e05c5c"}}> *</span>}</label><input {...p} style={INP}/></div>);
}
function FSelect({label,value,onChange,options}){
  return(<div><label style={LBL}>{label}</label><select value={value} onChange={onChange} style={{...INP,cursor:"pointer"}}>{options.map(o=><option key={o}>{o}</option>)}</select></div>);
}
function ArreglosEditor({arreglos,onChange}){
  const add=()=>onChange([...arreglos,emptyArreglo()]);
  const upd=(id,f,v)=>onChange(arreglos.map(a=>a.id===id?{...a,[f]:v}:a));
  const del=(id)=>onChange(arreglos.filter(a=>a.id!==id));
  return(
    <div style={{gridColumn:"1/-1"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <label style={LBL}>Arreglos realizados</label>
        <button type="button" onClick={add} style={{background:"#1a2a1a",border:"1px solid #2a4a2a",borderRadius:6,padding:"4px 12px",color:"#6bcb8b",cursor:"pointer",fontSize:12,fontWeight:600}}>+ Agregar arreglo</button>
      </div>
      {arreglos.length===0&&<div style={{background:"#111",border:"1px dashed #2a2a2a",borderRadius:8,padding:"16px",textAlign:"center",color:"#555",fontSize:13}}>Sin arreglos. Hacé clic en "+ Agregar arreglo".</div>}
      {arreglos.map((a,i)=>(
        <div key={a.id} style={{background:"#111",border:"1px solid #222",borderRadius:9,padding:"14px",marginBottom:10,position:"relative"}}>
          <div style={{fontSize:10,color:"#555",marginBottom:10}}>ARREGLO #{i+1}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div style={{gridColumn:"1/-1"}}><label style={LBL2}>Descripción</label><input value={a.descripcion} onChange={e=>upd(a.id,"descripcion",e.target.value)} placeholder="Ej: Cambio de correa" style={INP2}/></div>
            <div><label style={LBL2}>Horas de trabajo</label><input type="number" min="0" step="0.5" value={a.horas} onChange={e=>upd(a.id,"horas",e.target.value)} placeholder="Ej: 2.5" style={INP2}/></div>
            <div><label style={LBL2}>Materiales usados</label><input value={a.materiales} onChange={e=>upd(a.id,"materiales",e.target.value)} placeholder="Ej: Correa Gates" style={INP2}/></div>
          </div>
          <button type="button" onClick={()=>del(a.id)} style={{position:"absolute",top:10,right:10,background:"none",border:"none",color:"#555",cursor:"pointer",fontSize:16}}>×</button>
        </div>
      ))}
      {arreglos.length>0&&<div style={{textAlign:"right",fontSize:12,color:"#888",marginTop:4}}>Total horas: <strong style={{color:"#c8a84b"}}>{arreglos.reduce((s,a)=>s+(Number(a.horas)||0),0).toFixed(1)} hs</strong></div>}
    </div>
  );
}

// ─── LOGIN ───────────────────────────────────────────────────
function LoginScreen({onLogin}){
  const [nombre,setNombre]=useState("");
  const [clave,setClave]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const canSubmit=nombre.trim()&&clave.trim()&&!loading;
  const handleLogin=useCallback(()=>{
    setError(""); setLoading(true);
    setTimeout(()=>{
      const t=TALLERES.find(t=>t.nombre.toLowerCase()===nombre.trim().toLowerCase()&&t.clave===clave.trim());
      if(t){ onLogin(t); }
      else{ setError("Nombre de taller o clave incorrectos."); setLoading(false); }
    },400);
  },[nombre,clave,onLogin]);
  const inpSt={width:"100%",background:"#0f0f0f",border:"1px solid #2a2a2a",borderRadius:8,padding:"11px 14px",color:"#f0ece0",fontSize:14,outline:"none",boxSizing:"border-box"};
  return(
    <div style={{minHeight:"100vh",background:"#0a0a0a",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:400}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{width:64,height:64,background:"linear-gradient(135deg,#c8a84b,#e8c96b)",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 16px",boxShadow:"0 8px 32px rgba(200,168,75,0.3)"}}>⚙</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,letterSpacing:3,color:"#f0ece0",lineHeight:1}}>AutoTaller Pro</div>
          <div style={{fontSize:12,color:"#c8a84b",letterSpacing:2,textTransform:"uppercase",marginTop:6}}>Sistema de Gestión</div>
        </div>
        <div style={{background:"#141414",border:"1px solid #2a2a2a",borderRadius:16,padding:"32px 28px",boxShadow:"0 24px 64px rgba(0,0,0,0.6)"}}>
          <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>Iniciar sesión</div>
          <div style={{fontSize:13,color:"#666",marginBottom:28}}>Ingresá con los datos de tu taller</div>
          <div style={{marginBottom:18}}>
            <label style={LBL}>Nombre del taller</label>
            <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Ej: Taller El Motor" onKeyDown={e=>e.key==="Enter"&&canSubmit&&handleLogin()} style={inpSt}/>
          </div>
          <div style={{marginBottom:24}}>
            <label style={LBL}>Clave</label>
            <input type="password" value={clave} onChange={e=>setClave(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&canSubmit&&handleLogin()} style={inpSt}/>
          </div>
          {error&&<div style={{background:"#2a1010",border:"1px solid #5a2020",borderRadius:8,padding:"10px 14px",color:"#e05c5c",fontSize:13,marginBottom:18}}>⚠ {error}</div>}
          <button onClick={handleLogin} disabled={!canSubmit} style={{width:"100%",padding:"12px",background:!canSubmit?"#222":"linear-gradient(135deg,#c8a84b,#e8c96b)",border:"none",borderRadius:8,color:!canSubmit?"#555":"#0f0f0f",fontWeight:700,fontSize:15,cursor:canSubmit?"pointer":"default"}}>
            {loading?"Verificando...":"Ingresar →"}
          </button>
        </div>
        <div style={{textAlign:"center",marginTop:20,fontSize:12,color:"#444"}}>¿No tenés acceso? Contactá al administrador.</div>
      </div>
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────
export default function App(){
  // Un solo estado para sesion: evita renders intermedios con estado inconsistente
  const [sesion,setSesion]=useState(()=>{
    const sid=LS.getSession();
    if(!sid) return null;
    const taller=TALLERES.find(t=>t.id===sid);
    if(!taller){ LS.clrSession(); return null; }
    return { taller, registros:LS.getData(sid) };
  });

  const [modal,setModal]=useState(false);
  const [detalle,setDetalle]=useState(null);
  const [editId,setEditId]=useState(null);
  const [form,setForm]=useState(emptyOrden());
  const [busqueda,setBusqueda]=useState("");
  const [filtroEstado,setFiltroEstado]=useState("Todos");
  const [deleteConfirm,setDeleteConfirm]=useState(null);
  const [vista,setVista]=useState("lista");
  const [toast,setToast]=useState(null);

  // Hooks siempre se llaman, sin importar si hay sesión o no
  const registros = sesion ? sesion.registros : [];
  const tallerActivo = sesion ? sesion.taller : null;

  const filtered = useMemo(()=>{
    if(!registros.length) return [];
    const q=busqueda.toLowerCase();
    return registros.filter(r=>
      (!q||r.cliente.toLowerCase().includes(q)||r.auto.toLowerCase().includes(q)||r.patente.toLowerCase().includes(q))
      &&(filtroEstado==="Todos"||r.estado===filtroEstado)
    );
  },[registros,busqueda,filtroEstado]);

  const stats = useMemo(()=>{
    const ingresos=registros.reduce((s,r)=>s+(Number(r.precioFinal)||0),0);
    const horas=registros.reduce((s,r)=>s+r.arreglos.reduce((h,a)=>h+(Number(a.horas)||0),0),0);
    return{
      total:registros.length,ingresos,horas,
      enProceso:registros.filter(r=>r.estado==="En proceso").length,
      entregados:registros.filter(r=>r.estado==="Entregado").length,
    };
  },[registros]);

  const showToast=useCallback((msg,type="ok")=>{ setToast({msg,type}); setTimeout(()=>setToast(null),2800); },[]);

  const handleLogin=useCallback((taller)=>{
    const reg=LS.getData(taller.id);
    LS.setSession(taller.id);
    setSesion({taller,registros:reg});
  },[]);

  const handleLogout=useCallback(()=>{
    LS.clrSession();
    setSesion(null);
  },[]);

  const setRegistros=useCallback((fn)=>{
    setSesion(prev=>{
      if(!prev) return prev;
      const next=typeof fn==="function"?fn(prev.registros):fn;
      LS.setData(prev.taller.id,next);
      return{...prev,registros:next};
    });
  },[]);

  // Renderizar login si no hay sesión
  if(!sesion) return <LoginScreen onLogin={handleLogin}/>;

  const openNew=()=>{ setForm(emptyOrden()); setEditId(null); setModal(true); };
  const openEdit=(r)=>{ setForm({...r,presupuesto:r.presupuesto??"",precioFinal:r.precioFinal??""}); setEditId(r.id); setModal(true); setDetalle(null); };
  const saveOrden=()=>{
    if(!form.cliente||!form.auto||!form.fecha) return;
    const p={...form,presupuesto:form.presupuesto!==""?Number(form.presupuesto):null,precioFinal:form.precioFinal!==""?Number(form.precioFinal):null};
    if(editId){ setRegistros(prev=>prev.map(r=>r.id===editId?{...p,id:editId}:r)); showToast("Orden actualizada"); }
    else{ setRegistros(prev=>[...prev,{...p,id:Date.now()}]); showToast("Orden creada"); }
    setModal(false);
  };
  const doDelete=()=>{ setRegistros(p=>p.filter(r=>r.id!==deleteConfirm)); setDeleteConfirm(null); setDetalle(null); showToast("Orden eliminada","err"); };
  const ordenDetalle=registros.find(r=>r.id===detalle);
  const fi=(f)=>({value:form[f],onChange:e=>setForm({...form,[f]:e.target.value})});

  return(
    <div style={{fontFamily:"'DM Sans',sans-serif",background:"#0f0f0f",minHeight:"100vh",color:"#f0ece0"}}>
      {toast&&<div style={{position:"fixed",bottom:24,right:24,zIndex:9999,background:toast.type==="err"?"#2a1010":"#0d2a1a",border:`1px solid ${toast.type==="err"?"#c0392b":"#1a6b3a"}`,borderRadius:10,padding:"12px 20px",fontSize:14,color:"#f0ece0",boxShadow:"0 8px 32px rgba(0,0,0,0.5)"}}>
        {toast.type==="err"?"🗑 ":"✅ "}{toast.msg}
      </div>}

      <header style={{background:"#0f0f0f",borderBottom:"1px solid #c8a84b33",padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between",height:68,position:"sticky",top:0,zIndex:200}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:38,height:38,background:"linear-gradient(135deg,#c8a84b,#e8c96b)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:"#0f0f0f"}}>⚙</div>
          <div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:2,lineHeight:1}}>AutoTaller Pro</div>
            <div style={{fontSize:11,color:"#c8a84b"}}>📍 {tallerActivo.nombre}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <button onClick={()=>printAll(filtered,tallerActivo.nombre)} style={{background:"transparent",border:"1px solid #333",borderRadius:8,padding:"8px 14px",color:"#aaa",cursor:"pointer",fontSize:13}}>📄 Reporte General</button>
          <button onClick={openNew} style={{background:"linear-gradient(135deg,#c8a84b,#e8c96b)",border:"none",borderRadius:8,padding:"9px 18px",color:"#0f0f0f",fontWeight:700,fontSize:14,cursor:"pointer"}}>+ Nueva Orden</button>
          <button onClick={handleLogout} style={{background:"#1a1a1a",border:"1px solid #2a2a2a",borderRadius:8,padding:"9px 12px",color:"#888",cursor:"pointer",fontSize:13}}>🚪 Salir</button>
        </div>
      </header>

      <main style={{maxWidth:1180,margin:"0 auto",padding:"28px 20px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:28}}>
          {[
            {label:"Órdenes",value:stats.total,icon:"📋",color:"#c8a84b"},
            {label:"En Proceso",value:stats.enProceso,icon:"🔧",color:"#74b9ff"},
            {label:"Entregados",value:stats.entregados,icon:"✅",color:"#6bcb8b"},
            {label:"Horas totales",value:stats.horas.toFixed(1)+" hs",icon:"⏱",color:"#fd79a8"},
            {label:"Ingresos",value:fmt(stats.ingresos),icon:"💰",color:"#f9ca24"},
          ].map(s=>(
            <div key={s.label} style={{background:"#141414",border:`1px solid ${s.color}22`,borderRadius:12,padding:"18px 20px"}}>
              <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
              <div style={{fontSize:s.value.toString().length>8?18:26,fontWeight:700,color:s.color,lineHeight:1,letterSpacing:1}}>{s.value}</div>
              <div style={{fontSize:11,color:"#666",marginTop:4}}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
          <input placeholder="🔍  Buscar por cliente, vehículo o patente..." value={busqueda} onChange={e=>setBusqueda(e.target.value)}
            style={{flex:1,minWidth:240,background:"#141414",border:"1px solid #2a2a2a",borderRadius:8,padding:"9px 14px",color:"#f0ece0",fontSize:14,outline:"none"}}/>
          <select value={filtroEstado} onChange={e=>setFiltroEstado(e.target.value)}
            style={{background:"#141414",border:"1px solid #2a2a2a",borderRadius:8,padding:"9px 14px",color:"#f0ece0",fontSize:14,cursor:"pointer",outline:"none"}}>
            {["Todos",...ESTADOS].map(e=><option key={e}>{e}</option>)}
          </select>
          <div style={{display:"flex",gap:3,background:"#141414",borderRadius:8,padding:3,border:"1px solid #2a2a2a"}}>
            {[{v:"lista",icon:"☰"},{v:"cards",icon:"⊞"}].map(({v,icon})=>(
              <button key={v} onClick={()=>setVista(v)} style={{background:vista===v?"#c8a84b":"transparent",border:"none",borderRadius:5,padding:"6px 11px",color:vista===v?"#0f0f0f":"#888",cursor:"pointer",fontSize:15}}>{icon}</button>
            ))}
          </div>
        </div>

        {filtered.length===0&&(
          <div style={{textAlign:"center",padding:"70px 0"}}>
            <div style={{fontSize:52,marginBottom:14}}>🔧</div>
            <div style={{fontSize:17,color:"#555"}}>No hay órdenes todavía</div>
            <div style={{fontSize:13,color:"#444",marginTop:6}}>Creá la primera con "+ Nueva Orden"</div>
          </div>
        )}

        {filtered.length>0&&vista==="lista"&&(
          <div style={{background:"#141414",borderRadius:12,border:"1px solid #1e1e1e",overflow:"hidden"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr style={{background:"#111",borderBottom:"1px solid #c8a84b22"}}>
                  {["Cliente","Vehículo / Patente","Fecha","Arreglos","Horas","Presupuesto","Precio Final","Estado",""].map(h=>(
                    <th key={h} style={{padding:"12px 14px",textAlign:"left",fontSize:10,letterSpacing:1.5,color:"#c8a84b",textTransform:"uppercase",fontWeight:600}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r,i)=>{
                  const horas=r.arreglos.reduce((s,a)=>s+(Number(a.horas)||0),0);
                  return(
                    <tr key={r.id} style={{borderBottom:"1px solid #1e1e1e",background:i%2===0?"#141414":"#121212",cursor:"pointer"}}
                      onMouseEnter={e=>e.currentTarget.style.background="#1e1e1e"}
                      onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#141414":"#121212"}>
                      <td style={{padding:"13px 14px",fontWeight:600}} onClick={()=>setDetalle(r.id)}>{r.cliente}</td>
                      <td style={{padding:"13px 14px"}} onClick={()=>setDetalle(r.id)}><div style={{fontSize:13}}>{r.auto}</div><div style={{fontSize:11,color:"#c8a84b"}}>{r.patente}</div></td>
                      <td style={{padding:"13px 14px",color:"#888",fontSize:12}} onClick={()=>setDetalle(r.id)}>{fmtDate(r.fecha)}</td>
                      <td style={{padding:"13px 14px"}} onClick={()=>setDetalle(r.id)}><span style={{background:"#1a2a1a",border:"1px solid #2a4a2a",borderRadius:12,padding:"2px 10px",fontSize:12,color:"#6bcb8b"}}>{r.arreglos.length} {r.arreglos.length===1?"arreglo":"arreglos"}</span></td>
                      <td style={{padding:"13px 14px",color:"#fd79a8",fontSize:13}} onClick={()=>setDetalle(r.id)}>{horas>0?horas.toFixed(1)+" hs":"—"}</td>
                      <td style={{padding:"13px 14px",color:"#888",fontSize:13}} onClick={()=>setDetalle(r.id)}>{fmt(r.presupuesto)}</td>
                      <td style={{padding:"13px 14px",fontWeight:700,color:r.precioFinal?"#6bcb8b":"#444"}} onClick={()=>setDetalle(r.id)}>{fmt(r.precioFinal)}</td>
                      <td style={{padding:"13px 14px"}} onClick={()=>setDetalle(r.id)}><Badge estado={r.estado}/></td>
                      <td style={{padding:"13px 10px"}}>
                        <div style={{display:"flex",gap:5}}>
                          <button onClick={()=>printReport(r,tallerActivo.nombre)} style={{background:"#1a1a2a",border:"1px solid #2a2a3a",borderRadius:6,padding:"5px 8px",color:"#74b9ff",cursor:"pointer",fontSize:13}}>🖨</button>
                          <button onClick={()=>openEdit(r)} style={{background:"#2a2a1a",border:"1px solid #3a3a2a",borderRadius:6,padding:"5px 8px",color:"#c8a84b",cursor:"pointer",fontSize:13}}>✏️</button>
                          <button onClick={()=>setDeleteConfirm(r.id)} style={{background:"#2a1a1a",border:"1px solid #4a2a2a",borderRadius:6,padding:"5px 8px",color:"#e05c5c",cursor:"pointer",fontSize:13}}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length>0&&vista==="cards"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:18}}>
            {filtered.map(r=>{
              const horas=r.arreglos.reduce((s,a)=>s+(Number(a.horas)||0),0);
              return(
                <div key={r.id} style={{background:"#141414",border:"1px solid #1e1e1e",borderRadius:14,overflow:"hidden",cursor:"pointer",transition:"transform 0.2s,box-shadow 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 10px 40px rgba(0,0,0,0.5)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}
                  onClick={()=>setDetalle(r.id)}>
                  <div style={{background:"#111",padding:"14px 18px",borderBottom:"1px solid #1e1e1e",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div><div style={{fontWeight:700,fontSize:15}}>{r.cliente}</div><div style={{color:"#c8a84b",fontSize:12,marginTop:2}}>{r.auto}</div><div style={{color:"#555",fontSize:11,marginTop:1}}>🔑 {r.patente||"—"}</div></div>
                    <Badge estado={r.estado}/>
                  </div>
                  <div style={{padding:"14px 18px"}}>
                    <div style={{display:"flex",gap:10,marginBottom:14}}>
                      <span style={{background:"#1a2a1a",border:"1px solid #2a4a2a",borderRadius:10,padding:"3px 10px",fontSize:11,color:"#6bcb8b"}}>🔧 {r.arreglos.length} arreglo{r.arreglos.length!==1?"s":""}</span>
                      {horas>0&&<span style={{background:"#2a1a2a",border:"1px solid #4a2a4a",borderRadius:10,padding:"3px 10px",fontSize:11,color:"#fd79a8"}}>⏱ {horas.toFixed(1)} hs</span>}
                    </div>
                    <div style={{fontSize:11,color:"#555",marginBottom:10}}>📅 {fmtDate(r.fecha)}</div>
                    <div style={{display:"flex",gap:10}}>
                      <div style={{flex:1,background:"#111",borderRadius:8,padding:"9px 12px"}}><div style={{fontSize:9,color:"#555",letterSpacing:1,marginBottom:2}}>PRESUPUESTO</div><div style={{fontWeight:700,color:"#888"}}>{fmt(r.presupuesto)}</div></div>
                      <div style={{flex:1,background:"#111",borderRadius:8,padding:"9px 12px"}}><div style={{fontSize:9,color:"#555",letterSpacing:1,marginBottom:2}}>PRECIO FINAL</div><div style={{fontWeight:700,color:r.precioFinal?"#6bcb8b":"#444"}}>{fmt(r.precioFinal)}</div></div>
                    </div>
                    <div style={{display:"flex",gap:7,marginTop:12}} onClick={e=>e.stopPropagation()}>
                      <button onClick={()=>printReport(r,tallerActivo.nombre)} style={{flex:1,background:"#1a1a2a",border:"1px solid #2a2a3a",borderRadius:7,padding:"7px",color:"#74b9ff",cursor:"pointer",fontSize:12}}>🖨 Imprimir</button>
                      <button onClick={()=>openEdit(r)} style={{flex:1,background:"#2a2a1a",border:"1px solid #3a3a2a",borderRadius:7,padding:"7px",color:"#c8a84b",cursor:"pointer",fontSize:12}}>✏️ Editar</button>
                      <button onClick={()=>setDeleteConfirm(r.id)} style={{background:"#2a1a1a",border:"1px solid #4a2a2a",borderRadius:7,padding:"7px 10px",color:"#e05c5c",cursor:"pointer"}}>🗑</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {ordenDetalle&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"flex-start",justifyContent:"center",zIndex:500,padding:"24px 16px",overflowY:"auto"}} onClick={e=>e.target===e.currentTarget&&setDetalle(null)}>
          <div style={{background:"#141414",borderRadius:16,width:"100%",maxWidth:620,border:"1px solid #2a2a2a",boxShadow:"0 24px 80px rgba(0,0,0,0.7)"}}>
            <div style={{padding:"22px 24px 18px",borderBottom:"1px solid #1e1e1e",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:1}}>{ordenDetalle.cliente}</div><div style={{color:"#c8a84b",fontSize:13,marginTop:2}}>{ordenDetalle.auto} · {ordenDetalle.patente}</div></div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}><Badge estado={ordenDetalle.estado}/><button onClick={()=>setDetalle(null)} style={{background:"none",border:"none",color:"#555",fontSize:22,cursor:"pointer"}}>×</button></div>
            </div>
            <div style={{padding:"20px 24px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px 20px",marginBottom:22}}>
                {[["Fecha",fmtDate(ordenDetalle.fecha)],["Presupuesto",fmt(ordenDetalle.presupuesto)],["Precio Final",fmt(ordenDetalle.precioFinal)]].map(([l,v])=>(
                  <div key={l}><div style={{fontSize:9,color:"#555",letterSpacing:1.5,textTransform:"uppercase",marginBottom:3}}>{l}</div><div style={{fontWeight:600,fontSize:15}}>{v}</div></div>
                ))}
              </div>
              <div style={{fontSize:10,color:"#c8a84b",letterSpacing:1.5,textTransform:"uppercase",marginBottom:12}}>Arreglos ({ordenDetalle.arreglos.length})</div>
              {ordenDetalle.arreglos.length===0&&<div style={{color:"#444",fontSize:13,padding:"16px 0"}}>Sin arreglos registrados.</div>}
              {ordenDetalle.arreglos.map((a,i)=>(
                <div key={a.id} style={{background:"#111",border:"1px solid #1e1e1e",borderRadius:9,padding:"12px 16px",marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",gap:10}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:10,color:"#555",marginBottom:4}}>ARREGLO #{i+1}</div>
                      <div style={{fontWeight:600,fontSize:14,marginBottom:a.materiales?6:0}}>{a.descripcion||"—"}</div>
                      {a.materiales&&<div style={{fontSize:12,color:"#888"}}>🔩 {a.materiales}</div>}
                    </div>
                    {a.horas&&<div style={{background:"#2a1a2a",border:"1px solid #4a2a4a",borderRadius:8,padding:"6px 12px",textAlign:"center",flexShrink:0}}>
                      <div style={{fontSize:10,color:"#888"}}>HORAS</div>
                      <div style={{fontWeight:700,color:"#fd79a8",fontSize:16}}>{Number(a.horas).toFixed(1)}</div>
                    </div>}
                  </div>
                </div>
              ))}
              {ordenDetalle.arreglos.length>0&&<div style={{textAlign:"right",color:"#888",fontSize:12,marginTop:4}}>Total: <strong style={{color:"#fd79a8"}}>{ordenDetalle.arreglos.reduce((s,a)=>s+(Number(a.horas)||0),0).toFixed(1)} hs</strong></div>}
              <div style={{display:"flex",gap:10,marginTop:22}}>
                <button onClick={()=>printReport(ordenDetalle,tallerActivo.nombre)} style={{flex:1,background:"#1a1a2a",border:"1px solid #2a2a3a",borderRadius:8,padding:"10px",color:"#74b9ff",cursor:"pointer",fontSize:14,fontWeight:600}}>🖨 Imprimir reporte</button>
                <button onClick={()=>openEdit(ordenDetalle)} style={{flex:1,background:"#2a2a1a",border:"1px solid #3a3a2a",borderRadius:8,padding:"10px",color:"#c8a84b",cursor:"pointer",fontSize:14,fontWeight:600}}>✏️ Editar orden</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"flex-start",justifyContent:"center",zIndex:800,padding:"24px 16px",overflowY:"auto"}} onClick={e=>e.target===e.currentTarget&&setModal(false)}>
          <div style={{background:"#141414",borderRadius:16,width:"100%",maxWidth:600,border:"1px solid #c8a84b33",boxShadow:"0 24px 80px rgba(0,0,0,0.8)"}}>
            <div style={{padding:"22px 26px 18px",borderBottom:"1px solid #1e1e1e",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:1}}>{editId?"Editar Orden":"Nueva Orden"}</div><div style={{fontSize:12,color:"#c8a84b",marginTop:1}}>{tallerActivo.nombre}</div></div>
              <button onClick={()=>setModal(false)} style={{background:"none",border:"none",color:"#555",fontSize:24,cursor:"pointer"}}>×</button>
            </div>
            <div style={{padding:"22px 26px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div style={{gridColumn:"1/-1"}}><FInput label="Cliente" required {...fi("cliente")} placeholder="Nombre completo"/></div>
              <FInput label="Vehículo" required {...fi("auto")} placeholder="Marca, modelo y año"/>
              <FInput label="Patente" {...fi("patente")} placeholder="Ej: AB123CD"/>
              <FInput label="Fecha de ingreso" required type="date" {...fi("fecha")}/>
              <FSelect label="Estado" value={form.estado} onChange={e=>setForm({...form,estado:e.target.value})} options={ESTADOS}/>
              <FInput label="Presupuesto ($)" type="number" {...fi("presupuesto")} placeholder="0"/>
              <FInput label="Precio Final ($)" type="number" {...fi("precioFinal")} placeholder="0"/>
              <ArreglosEditor arreglos={form.arreglos} onChange={arreglos=>setForm({...form,arreglos})}/>
            </div>
            <div style={{padding:"0 26px 26px",display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button onClick={()=>setModal(false)} style={{background:"none",border:"1px solid #2a2a2a",borderRadius:8,padding:"9px 22px",color:"#666",cursor:"pointer",fontSize:14}}>Cancelar</button>
              <button onClick={saveOrden} disabled={!form.cliente||!form.auto||!form.fecha}
                style={{background:(!form.cliente||!form.auto||!form.fecha)?"#222":"linear-gradient(135deg,#c8a84b,#e8c96b)",border:"none",borderRadius:8,padding:"9px 26px",color:(!form.cliente||!form.auto||!form.fecha)?"#555":"#0f0f0f",fontWeight:700,fontSize:14,cursor:"pointer"}}>
                {editId?"Guardar Cambios":"Crear Orden"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:900,padding:20}}>
          <div style={{background:"#141414",borderRadius:14,padding:32,border:"1px solid #4a2a2a",maxWidth:340,width:"100%",textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:14}}>⚠️</div>
            <div style={{fontSize:18,fontWeight:700,marginBottom:8}}>¿Eliminar esta orden?</div>
            <div style={{color:"#666",fontSize:13,marginBottom:22}}>Esta acción no se puede deshacer.</div>
            <div style={{display:"flex",gap:10,justifyContent:"center"}}>
              <button onClick={()=>setDeleteConfirm(null)} style={{background:"none",border:"1px solid #2a2a2a",borderRadius:8,padding:"9px 22px",color:"#777",cursor:"pointer"}}>Cancelar</button>
              <button onClick={doDelete} style={{background:"#c0392b",border:"none",borderRadius:8,padding:"9px 22px",color:"#fff",fontWeight:700,cursor:"pointer"}}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
