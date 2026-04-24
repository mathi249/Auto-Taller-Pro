<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Maikels Pizzería — Catering</title>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --gold:#F5B800; --gold-dark:#C49400; --gold-dim:rgba(245,184,0,0.12);
      --black:#0D0D0D; --surface:#161616; --surface2:#1E1E1E; --surface3:#262626;
      --border:rgba(255,255,255,0.07); --border-gold:rgba(245,184,0,0.28);
      --text:#F0F0F0; --muted:#666; --muted2:#999;
      --green:#22C55E; --red:#EF4444; --blue:#60A5FA;
      --r:10px; --rl:14px;
    }
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    body{background:var(--black);color:var(--text);font-family:'DM Sans',system-ui,sans-serif;font-size:14px;line-height:1.5;min-height:100vh;}
    ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:var(--surface);} ::-webkit-scrollbar-thumb{background:var(--gold-dark);border-radius:4px;}

    /* NAV */
    .nav{background:var(--surface);border-bottom:2px solid var(--gold);display:flex;align-items:center;justify-content:space-between;padding:0 1.5rem;height:60px;position:sticky;top:0;z-index:100;}
    .logo{display:flex;align-items:center;gap:12px;}
    .logo-mark{width:40px;height:40px;background:var(--gold);border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--black);}
    .logo-name{font-family:'Bebas Neue',sans-serif;font-size:18px;color:var(--gold);letter-spacing:1.5px;line-height:1;}
    .logo-sub{font-size:10px;color:var(--muted);letter-spacing:0.5px;margin-top:2px;}
    .tabs{display:flex;gap:3px;}
    .tab{background:none;border:none;color:var(--muted2);font-family:'DM Sans',sans-serif;font-size:13px;padding:7px 13px;border-radius:7px;cursor:pointer;transition:all .15s;}
    .tab.active{background:var(--gold);color:var(--black);font-weight:600;}
    .tab:hover:not(.active){background:var(--surface3);color:var(--text);}
    .nbadge{display:inline-flex;align-items:center;justify-content:center;background:var(--red);color:#fff;font-size:10px;font-weight:600;width:16px;height:16px;border-radius:50%;margin-left:4px;vertical-align:middle;}

    /* MAIN */
    .main{flex:1;padding:1.5rem;max-width:1200px;margin:0 auto;width:100%;}
    .screen{display:none;} .screen.active{display:block;animation:fi .2s ease;}
    @keyframes fi{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}

    /* HEADERS */
    .ph{margin-bottom:1.25rem;}
    .pt{font-family:'Bebas Neue',sans-serif;font-size:26px;color:var(--text);letter-spacing:1px;line-height:1;}
    .pt span{color:var(--gold);}
    .ps{font-size:12px;color:var(--muted);margin-top:3px;}

    /* CARD */
    .card{background:var(--surface);border:0.5px solid var(--border);border-radius:var(--rl);padding:1.25rem;margin-bottom:1rem;}
    .ct{font-size:10px;color:var(--gold);font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:1rem;}

    /* STATS */
    .sgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin-bottom:1rem;}
    .sc{background:var(--surface2);border:0.5px solid var(--border);border-radius:var(--r);padding:.9rem;position:relative;overflow:hidden;}
    .sc::before{content:'';position:absolute;top:0;left:0;width:3px;height:100%;background:var(--gold);}
    .sl{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.4px;margin-bottom:5px;}
    .sv{font-size:22px;font-weight:600;color:var(--gold);line-height:1;}
    .sv.g{color:var(--green);} .sv.r{color:var(--red);} .sv.w{color:var(--text);}
    .ss{font-size:11px;color:var(--muted);margin-top:3px;}

    /* FORM */
    .fg{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
    .fg.c3{grid-template-columns:1fr 1fr 1fr;}
    .fg.c4{grid-template-columns:1fr 1fr 1fr 1fr;}
    .fg.c1{grid-template-columns:1fr;}
    .fg > .full{grid-column:1/-1;}
    .fgroup{display:flex;flex-direction:column;gap:4px;}
    label{font-size:10px;color:var(--muted2);text-transform:uppercase;letter-spacing:.5px;}
    input,select,textarea{background:var(--surface3);border:0.5px solid var(--border);border-radius:7px;color:var(--text);font-size:14px;font-family:'DM Sans',sans-serif;padding:8px 11px;outline:none;transition:border-color .15s;width:100%;}
    input:focus,select:focus,textarea:focus{border-color:var(--gold);}
    select option{background:var(--surface3);}
    textarea{resize:vertical;min-height:70px;}
    input[type="number"]{-moz-appearance:textfield;}
    input[type="number"]::-webkit-outer-spin-button,input[type="number"]::-webkit-inner-spin-button{-webkit-appearance:none;}

    /* SECTION DIVIDER */
    .sdiv{display:flex;align-items:center;gap:10px;margin:1.2rem 0 .8rem;}
    .sdiv-label{font-size:10px;color:var(--gold);text-transform:uppercase;letter-spacing:.8px;font-weight:700;white-space:nowrap;}
    .sdiv-line{flex:1;height:1px;background:var(--border-gold);}

    /* COST ROWS */
    .cost-table{width:100%;border-collapse:collapse;}
    .cost-table tr td{padding:7px 10px;border-bottom:0.5px solid var(--border);font-size:13px;vertical-align:middle;}
    .cost-table tr:last-child td{border-bottom:none;}
    .cost-table .label-cell{color:var(--muted2);width:55%;}
    .cost-table .input-cell{width:45%;}
    .cost-table input{text-align:right;}
    .cost-total-row td{background:var(--surface2);font-weight:600;}
    .cost-total-row .label-cell{color:var(--text);}
    .cost-total-row .val{color:var(--gold);font-size:15px;}

    /* BTNS */
    .btn{border:none;border-radius:8px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;padding:9px 18px;transition:all .15s;white-space:nowrap;}
    .btn-gold{background:var(--gold);color:var(--black);font-weight:700;}
    .btn-gold:hover{background:var(--gold-dark);}
    .btn-out{background:transparent;border:0.5px solid var(--gold);color:var(--gold);}
    .btn-out:hover{background:var(--gold);color:var(--black);}
    .btn-ghost{background:transparent;border:0.5px solid var(--border);color:var(--muted2);}
    .btn-ghost:hover{border-color:var(--muted2);color:var(--text);}
    .btn-del{background:transparent;border:0.5px solid var(--red);color:var(--red);}
    .btn-del:hover{background:var(--red);color:#fff;}
    .btn-sm{padding:5px 10px;font-size:12px;}
    .btn:disabled{opacity:.5;cursor:not-allowed;}
    .brow{display:flex;gap:8px;margin-top:1rem;flex-wrap:wrap;}

    /* TABLE */
    .tw{overflow-x:auto;}
    table{width:100%;border-collapse:collapse;font-size:13px;min-width:700px;}
    th{text-align:left;color:var(--gold);font-size:10px;text-transform:uppercase;letter-spacing:.6px;padding:9px 12px;border-bottom:1px solid var(--border-gold);font-weight:700;white-space:nowrap;}
    td{padding:10px 12px;border-bottom:0.5px solid var(--border);color:var(--text);vertical-align:middle;}
    tr:last-child td{border-bottom:none;} tr:hover td{background:var(--surface2);}

    /* BADGE */
    .badge{display:inline-block;padding:3px 8px;border-radius:5px;font-size:11px;font-weight:600;white-space:nowrap;}
    .bg{background:rgba(245,184,0,.12);color:var(--gold);border:0.5px solid var(--border-gold);}
    .bgr{background:rgba(34,197,94,.1);color:var(--green);border:0.5px solid rgba(34,197,94,.3);}
    .br{background:rgba(239,68,68,.1);color:var(--red);border:0.5px solid rgba(239,68,68,.3);}
    .bb{background:rgba(96,165,250,.1);color:var(--blue);border:0.5px solid rgba(96,165,250,.3);}
    .bgy{background:var(--surface3);color:var(--muted2);border:0.5px solid var(--border);}

    /* MENU CATS */
    .cat-label{font-size:10px;color:var(--gold);text-transform:uppercase;letter-spacing:.7px;font-weight:700;margin:12px 0 6px;}
    .menu-row{display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--surface2);border:0.5px solid var(--border);border-radius:8px;margin-bottom:5px;}
    .menu-row .mn{flex:1;font-size:13px;font-weight:500;}
    .menu-row .mcat{font-size:11px;color:var(--muted);}
    .menu-row .mp{font-size:13px;color:var(--gold);font-weight:600;min-width:90px;text-align:right;}

    /* DETAIL */
    .dhero{background:var(--surface);border:0.5px solid var(--border-gold);border-radius:var(--rl);padding:1.5rem;margin-bottom:1rem;}
    .dclient{font-family:'Bebas Neue',sans-serif;font-size:30px;color:var(--text);letter-spacing:1px;line-height:1;}
    .dmeta{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;}
    .mpill{font-size:12px;color:var(--muted2);background:var(--surface3);padding:4px 10px;border-radius:20px;}

    /* SUMMARY BOX */
    .sumbox{background:var(--surface2);border:1px solid var(--border-gold);border-radius:var(--r);padding:1rem;}
    .sumrow{display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:0.5px solid var(--border);font-size:13px;}
    .sumrow:last-child{border-bottom:none;}
    .sumrow.total{padding-top:10px;font-size:15px;font-weight:600;color:var(--gold);border-top:1px solid var(--border-gold);}
    .sumrow.resta{font-size:15px;font-weight:700;color:var(--green);}

    /* FILTER */
    .filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1rem;align-items:center;}
    .filters select{width:auto;font-size:12px;padding:5px 9px;}
    .filters input{width:170px;}

    /* LOADING / EMPTY */
    .loading{display:flex;align-items:center;justify-content:center;gap:10px;padding:2rem;color:var(--muted);font-size:13px;}
    .spin{width:20px;height:20px;border:2px solid var(--surface3);border-top-color:var(--gold);border-radius:50%;animation:sp .6s linear infinite;}
    @keyframes sp{to{transform:rotate(360deg)}}
    .empty{text-align:center;padding:3rem 1rem;color:var(--muted);}
    .empty-ico{font-size:44px;margin-bottom:.75rem;opacity:.4;}
    .empty-t{font-size:14px;} .empty-s{font-size:12px;margin-top:5px;}

    /* TOAST */
    .toast{position:fixed;bottom:22px;right:22px;background:var(--gold);color:var(--black);padding:10px 18px;border-radius:10px;font-size:13px;font-weight:600;opacity:0;transform:translateY(8px);transition:opacity .25s,transform .25s;pointer-events:none;z-index:9999;}
    .toast.show{opacity:1;transform:translateY(0);}
    .toast.err{background:var(--red);color:#fff;}

    .back-btn{display:flex;align-items:center;gap:6px;background:none;border:0.5px solid var(--border);border-radius:7px;color:var(--muted2);font-size:12px;font-family:'DM Sans',sans-serif;padding:5px 12px;cursor:pointer;transition:all .15s;}
    .back-btn:hover{border-color:var(--gold);color:var(--gold);}
    .ssel{background:var(--surface3);border:0.5px solid var(--border);border-radius:6px;color:var(--text);font-size:12px;padding:4px 8px;cursor:pointer;font-family:'DM Sans',sans-serif;}

    @media(max-width:700px){
      .tabs{gap:2px;} .tab{padding:6px 8px;font-size:11px;}
      .fg,.fg.c3,.fg.c4{grid-template-columns:1fr 1fr;}
      .sgrid{grid-template-columns:1fr 1fr;}
      .main{padding:1rem;}
    }
  </style>
</head>
<body>
<div style="display:flex;flex-direction:column;min-height:100vh;">
<div class="toast" id="toast"></div>

<nav class="nav">
  <div class="logo">
    <div class="logo-mark">M</div>
    <div><div class="logo-name">Maikels Pizzería</div><div class="logo-sub">Sistema de Catering</div></div>
  </div>
  <div class="tabs">
    <button class="tab active" onclick="go('dashboard')">Resumen</button>
    <button class="tab" onclick="go('nuevo')">+ Evento</button>
    <button class="tab" onclick="go('eventos')">Eventos <span class="nbadge" id="nbadge" style="display:none">0</span></button>
    <button class="tab" onclick="go('menu')">Menú</button>
  </div>
</nav>

<div class="main">

  <!-- ===== DASHBOARD ===== -->
  <div class="screen active" id="screen-dashboard">
    <div class="ph"><div class="pt">Panel de <span>Control</span></div><div class="ps" id="dash-date"></div></div>
    <div class="sgrid" id="dash-stats"><div class="loading"><div class="spin"></div> Cargando...</div></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
      <div class="card"><div class="ct">Próximos eventos</div><div id="dash-up"><div class="loading"><div class="spin"></div></div></div></div>
      <div class="card"><div class="ct">Resumen financiero</div><div id="dash-fin"><div class="loading"><div class="spin"></div></div></div></div>
    </div>
  </div>

  <!-- ===== NUEVO EVENTO ===== -->
  <div class="screen" id="screen-nuevo">
    <div class="ph"><div class="pt">Nuevo <span>Evento</span></div><div class="ps">Registra todos los detalles del catering</div></div>

    <!-- DATOS DEL EVENTO -->
    <div class="card">
      <div class="ct">Datos del evento</div>
      <div class="fg c3">
        <div class="fgroup full"><label>Nombre del evento *</label><input type="text" id="f-nombre" placeholder="Ej. Casamiento García"></div>
        <div class="fgroup"><label>Tipo de evento</label>
          <select id="f-tipo">
            <option value="social">Social</option>
            <option value="corporativo">Corporativo</option>
            <option value="cumpleanos">Cumpleaños</option>
            <option value="casamiento">Casamiento</option>
            <option value="graduacion">Graduación</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div class="fgroup"><label>Fecha del evento *</label><input type="date" id="f-fecha"></div>
        <div class="fgroup"><label>Cant. invitados</label><input type="number" id="f-invitados" placeholder="0" min="0" oninput="calcTotal()"></div>
      </div>

      <div class="sdiv"><div class="sdiv-line"></div><div class="sdiv-label">Horarios</div><div class="sdiv-line"></div></div>
      <div class="fg c4">
        <div class="fgroup"><label>Inicio del evento</label><input type="time" id="f-h-inicio"></div>
        <div class="fgroup"><label>Llegada al evento</label><input type="time" id="f-h-llegada-ev"></div>
        <div class="fgroup"><label>Horario de partida</label><input type="time" id="f-h-partida"></div>
        <div class="fgroup"><label>Llegada en Maikels</label><input type="time" id="f-h-llegada-mk"></div>
      </div>

      <div class="sdiv"><div class="sdiv-line"></div><div class="sdiv-label">Lugar</div><div class="sdiv-line"></div></div>
      <div class="fg">
        <div class="fgroup"><label>Nombre del lugar</label><input type="text" id="f-lugar" placeholder="Ej. Salón Los Pinos"></div>
        <div class="fgroup"><label>Dirección</label><input type="text" id="f-direccion" placeholder="Calle, número, ciudad"></div>
      </div>

      <div class="sdiv"><div class="sdiv-line"></div><div class="sdiv-label">Cliente y extras</div><div class="sdiv-line"></div></div>
      <div class="fg">
        <div class="fgroup"><label>Nombre del cliente</label><input type="text" id="f-cliente" placeholder="Nombre completo"></div>
        <div class="fgroup"><label>Teléfono</label><input type="tel" id="f-tel" placeholder="+54 000 000 0000"></div>
        <div class="fgroup full"><label>Extras (alérgicos / veganos)</label><input type="text" id="f-extras-info" placeholder="Ej. 3 celíacos, 2 veganos, alergia al maní..."></div>
      </div>

      <div class="sdiv"><div class="sdiv-line"></div><div class="sdiv-label">Producción</div><div class="sdiv-line"></div></div>
      <div class="fg c3">
        <div class="fgroup"><label>Cant. pizzas</label><input type="number" id="f-pizzas" placeholder="0" min="0"></div>
        <div class="fgroup"><label>Cant. personal</label><input type="number" id="f-personal-cant" placeholder="0" min="0"></div>
        <div class="fgroup"><label>Notas internas</label><input type="text" id="f-notas" placeholder="Observaciones..."></div>
        <div class="fgroup full"><label>Nombres del personal</label><input type="text" id="f-personal-nombres" placeholder="Juan, María, Carlos..."></div>
      </div>
    </div>

    <!-- COSTOS -->
    <div class="card">
      <div class="ct">Costos y cobros</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        <!-- Costos -->
        <div>
          <div class="sdiv" style="margin-top:0;"><div class="sdiv-line"></div><div class="sdiv-label">Desglose de costos</div><div class="sdiv-line"></div></div>
          <table class="cost-table">
            <tr><td class="label-cell">Total que se cobra el evento</td><td class="input-cell"><input type="number" id="c-total-cobrado" placeholder="0.00" step="0.01" oninput="calcTotal()"></td></tr>
            <tr><td class="label-cell">Costo materia prima (pizzas)</td><td class="input-cell"><input type="number" id="c-mat-prima" placeholder="0.00" step="0.01" oninput="calcTotal()"></td></tr>
            <tr><td class="label-cell">Celíacos</td><td class="input-cell"><input type="number" id="c-celiacos" placeholder="0.00" step="0.01" oninput="calcTotal()"></td></tr>
            <tr><td class="label-cell">Entradas</td><td class="input-cell"><input type="number" id="c-entradas" placeholder="0.00" step="0.01" oninput="calcTotal()"></td></tr>
            <tr><td class="label-cell">Tortas</td><td class="input-cell"><input type="number" id="c-tortas" placeholder="0.00" step="0.01" oninput="calcTotal()"></td></tr>
            <tr><td class="label-cell">Personal</td><td class="input-cell"><input type="number" id="c-personal" placeholder="0.00" step="0.01" oninput="calcTotal()"></td></tr>
            <tr><td class="label-cell">Nafta / Traslado</td><td class="input-cell"><input type="number" id="c-nafta" placeholder="0.00" step="0.01" oninput="calcTotal()"></td></tr>
            <tr><td class="label-cell">Bebida</td><td class="input-cell"><input type="number" id="c-bebida" placeholder="0.00" step="0.01" oninput="calcTotal()"></td></tr>
            <tr><td class="label-cell">Otros</td><td class="input-cell"><input type="number" id="c-otros" placeholder="0.00" step="0.01" oninput="calcTotal()"></td></tr>
            <tr class="cost-total-row"><td class="label-cell">Extras (total)</td><td class="input-cell"><div class="val" id="extras-total-disp">$0.00</div></td></tr>
          </table>
        </div>
        <!-- Cobros y resumen -->
        <div>
          <div class="sdiv" style="margin-top:0;"><div class="sdiv-line"></div><div class="sdiv-label">Cobros / señas</div><div class="sdiv-line"></div></div>
          <table class="cost-table">
            <tr><td class="label-cell">Seña</td><td class="input-cell"><input type="number" id="c-seña" placeholder="0.00" step="0.01" oninput="calcTotal()"></td></tr>
            <tr><td class="label-cell">Fecha seña abonada</td><td class="input-cell"><input type="date" id="c-fecha-seña"></td></tr>
            <tr class="cost-total-row"><td class="label-cell">Resta abonar</td><td class="input-cell"><div class="val" id="resta-disp" style="color:var(--green)">$0.00</div></td></tr>
            <tr><td class="label-cell">Fecha pago restante</td><td class="input-cell"><input type="date" id="c-fecha-resto"></td></tr>
          </table>

          <div class="sdiv"><div class="sdiv-line"></div><div class="sdiv-label">Resumen</div><div class="sdiv-line"></div></div>
          <div class="sumbox" id="sumbox">
            <div class="sumrow"><span>Total cobrado</span><span id="s-cobrado" style="color:var(--gold)">$0.00</span></div>
            <div class="sumrow"><span>Costo materia prima</span><span id="s-mp" style="color:var(--red)">$0.00</span></div>
            <div class="sumrow"><span>Extras (costos)</span><span id="s-extras" style="color:var(--red)">$0.00</span></div>
            <div class="sumrow total"><span>Ganancia estimada</span><span id="s-ganancia">$0.00</span></div>
            <div class="sumrow resta"><span>Resta abonar</span><span id="s-resta">$0.00</span></div>
          </div>
        </div>
      </div>
      <div class="brow">
        <button class="btn btn-gold" id="btn-save" onclick="guardarEvento()">Guardar evento</button>
        <button class="btn btn-ghost" onclick="limpiarForm()">Limpiar</button>
      </div>
    </div>
  </div>

  <!-- ===== EVENTOS ===== -->
  <div class="screen" id="screen-eventos">
    <div class="ph"><div class="pt">Todos los <span>Eventos</span></div></div>
    <div class="filters">
      <select id="fil-e" onchange="renderEventos()" style="width:auto;">
        <option value="">Todos los estados</option>
        <option value="pendiente">Pendiente</option>
        <option value="confirmado">Confirmado</option>
        <option value="completado">Completado</option>
        <option value="cancelado">Cancelado</option>
      </select>
      <select id="fil-t" onchange="renderEventos()" style="width:auto;">
        <option value="">Todos los tipos</option>
        <option value="social">Social</option>
        <option value="corporativo">Corporativo</option>
        <option value="casamiento">Casamiento</option>
        <option value="cumpleanos">Cumpleaños</option>
        <option value="graduacion">Graduación</option>
      </select>
      <input type="text" id="fil-b" placeholder="Buscar evento..." oninput="renderEventos()" style="width:180px;">
    </div>
    <div class="card" style="padding:0;overflow:hidden;">
      <div class="tw">
        <table>
          <thead><tr>
            <th>Evento</th><th>Tipo</th><th>Fecha</th><th>Invitados</th>
            <th>Total cobrado</th><th>Costos</th><th>Ganancia</th><th>Resta</th><th>Estado</th><th></th>
          </tr></thead>
          <tbody id="ev-tbody"></tbody>
        </table>
      </div>
      <div id="ev-loading" class="loading"><div class="spin"></div> Cargando...</div>
      <div id="ev-empty" class="empty" style="display:none;"><div class="empty-ico">📋</div><div class="empty-t">Sin eventos registrados</div><div class="empty-s">Crea tu primer evento de catering</div></div>
    </div>
  </div>

  <!-- ===== DETALLE ===== -->
  <div class="screen" id="screen-detalle"><div id="det-body"></div></div>

  <!-- ===== MENÚ ===== -->
  <div class="screen" id="screen-menu">
    <div class="ph"><div class="pt">Gestión de <span>Menú</span></div><div class="ps">Administra tu catálogo de productos y precios</div></div>
    <div class="card">
      <div class="ct">Agregar producto</div>
      <div class="fg c4">
        <div class="fgroup full" style="grid-column:span 2"><label>Nombre del producto</label><input type="text" id="mi-nom" placeholder="Ej. Mozzarella especial"></div>
        <div class="fgroup"><label>Categoría</label>
          <select id="mi-cat">
            <option value="pizza">Pizza</option>
            <option value="entrada">Entrada</option>
            <option value="postre">Postre</option>
            <option value="bebida">Bebida</option>
            <option value="celiaco">Celíacos / Sin TACC</option>
            <option value="vegano">Vegano</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div class="fgroup"><label>Precio ($)</label><input type="number" id="mi-precio" placeholder="0.00" step="0.01" min="0"></div>
      </div>
      <div class="brow"><button class="btn btn-gold" onclick="addItem()">Agregar producto</button></div>
    </div>
    <div class="card"><div class="ct">Productos actuales</div><div id="menu-body"><div class="loading"><div class="spin"></div></div></div></div>
  </div>

</div>
</div>

<script>
const SB = 'https://oajmytptnivekxjawjow.supabase.co';
const SK = 'sb_publishable_uP2fZf9XP6a9AQAb1UZdYg_rwCO2jPT';
const H = {'Content-Type':'application/json','apikey':SK,'Authorization':'Bearer '+SK};

async function GET(t,q=''){const r=await fetch(`${SB}/rest/v1/${t}?${q}`,{headers:H});if(!r.ok)throw new Error(await r.text());return r.json();}
async function POST(t,d){const r=await fetch(`${SB}/rest/v1/${t}`,{method:'POST',headers:{...H,'Prefer':'return=representation'},body:JSON.stringify(d)});if(!r.ok)throw new Error(await r.text());return r.json();}
async function PATCH(t,id,d){const r=await fetch(`${SB}/rest/v1/${t}?id=eq.${id}`,{method:'PATCH',headers:{...H,'Prefer':'return=representation'},body:JSON.stringify(d)});if(!r.ok)throw new Error(await r.text());return r.json();}
async function DEL(t,id){const r=await fetch(`${SB}/rest/v1/${t}?id=eq.${id}`,{method:'DELETE',headers:H});if(!r.ok)throw new Error(await r.text());}

let menu=[], eventos=[];

function toast(m,t=''){const el=document.getElementById('toast');el.textContent=m;el.className='toast show'+(t?' '+t:'');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('show'),2500);}

function ff(f){
  if(!f)return'—';
  const s=f.split('T')[0].split('-');
  const mn=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${s[2]} ${mn[parseInt(s[1])-1]} ${s[0]}`;
}
function tl(t){return{social:'Social',corporativo:'Corporativo',casamiento:'Casamiento',cumpleanos:'Cumpleaños',graduacion:'Graduación',otro:'Otro'}[t]||t;}
function eb(e){
  const c={pendiente:'bg',confirmado:'bb',completado:'bgr',cancelado:'br'};
  const l={pendiente:'Pendiente',confirmado:'Confirmado',completado:'Completado',cancelado:'Cancelado'};
  return `<span class="badge ${c[e]||'bgy'}">${l[e]||e}</span>`;
}
function $n(id){return parseFloat(document.getElementById(id)?.value)||0;}
function $v(id){return document.getElementById(id)?.value||'';}
function setV(id,v){const el=document.getElementById(id);if(el)el.value=v||'';}

function updateBadge(){
  const n=eventos.filter(e=>e.estado==='pendiente').length;
  const b=document.getElementById('nbadge');
  if(b){b.textContent=n;b.style.display=n?'inline-flex':'none';}
}

function go(name){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('screen-'+name).classList.add('active');
  const m={dashboard:0,nuevo:1,eventos:2,menu:3};
  const tabs=document.querySelectorAll('.tab');
  if(m[name]!==undefined)tabs[m[name]].classList.add('active');
  if(name==='dashboard')renderDash();
  if(name==='eventos')loadEventos();
  if(name==='menu')loadMenu();
}

// ===== CALC =====
function calcTotal(){
  const extras=['c-celiacos','c-entradas','c-tortas','c-personal','c-nafta','c-bebida','c-otros'];
  const extraSum=extras.reduce((s,id)=>s+$n(id),0);
  const mp=$n('c-mat-prima');
  const cobrado=$n('c-total-cobrado');
  const seña=$n('c-seña');
  const resta=Math.max(0,cobrado-seña);
  const ganancia=cobrado-mp-extraSum;

  document.getElementById('extras-total-disp').textContent='$'+extraSum.toFixed(2);
  document.getElementById('resta-disp').textContent='$'+resta.toFixed(2);
  document.getElementById('s-cobrado').textContent='$'+cobrado.toFixed(2);
  document.getElementById('s-mp').textContent='$'+mp.toFixed(2);
  document.getElementById('s-extras').textContent='$'+extraSum.toFixed(2);
  const gEl=document.getElementById('s-ganancia');
  gEl.textContent='$'+ganancia.toFixed(2);
  gEl.style.color=ganancia>=0?'var(--green)':'var(--red)';
  document.getElementById('s-resta').textContent='$'+resta.toFixed(2);
}

// ===== GUARDAR EVENTO =====
async function guardarEvento(){
  const nombre=$v('f-nombre').trim();
  const fecha=$v('f-fecha');
  if(!nombre||!fecha){toast('Nombre del evento y fecha son obligatorios','err');return;}

  const extras=['c-celiacos','c-entradas','c-tortas','c-personal','c-nafta','c-bebida','c-otros'];
  const extrasSum=extras.reduce((s,id)=>s+$n(id),0);
  const cobrado=$n('c-total-cobrado');
  const seña=$n('c-seña');

  const btn=document.getElementById('btn-save');
  btn.disabled=true;btn.textContent='Guardando...';
  try{
    await POST('eventos',{
      nombre_evento:nombre,
      tipo:$v('f-tipo'),
      fecha:fecha,
      horario_inicio:$v('f-h-inicio')||null,
      horario_llegada_evento:$v('f-h-llegada-ev')||null,
      horario_partida:$v('f-h-partida')||null,
      horario_llegada_maikels:$v('f-h-llegada-mk')||null,
      lugar:$v('f-lugar'),
      direccion:$v('f-direccion'),
      nombre_cliente:$v('f-cliente'),
      telefono:$v('f-tel'),
      cant_invitados:$n('f-invitados')||0,
      extras_info:$v('f-extras-info'),
      cant_pizzas:$n('f-pizzas')||0,
      cant_personal:$n('f-personal-cant')||0,
      nombres_personal:$v('f-personal-nombres'),
      notas:$v('f-notas'),
      total_cobrado:cobrado,
      costo_materia_prima:$n('c-mat-prima'),
      celiacos:$n('c-celiacos'),
      entradas:$n('c-entradas'),
      tortas:$n('c-tortas'),
      personal:$n('c-personal'),
      nafta:$n('c-nafta'),
      bebida:$n('c-bebida'),
      otros:$n('c-otros'),
      extras_total:extrasSum,
      seña:seña,
      fecha_seña:$v('c-fecha-seña')||null,
      resta_abonar:Math.max(0,cobrado-seña),
      fecha_resto:$v('c-fecha-resto')||null,
      estado:'pendiente'
    });
    toast('Evento guardado en Supabase ✓');
    limpiarForm();
    go('eventos');
  }catch(err){toast('Error: '+err.message,'err');console.error(err);}
  finally{btn.disabled=false;btn.textContent='Guardar evento';}
}

function limpiarForm(){
  const fields=['f-nombre','f-fecha','f-h-inicio','f-h-llegada-ev','f-h-partida','f-h-llegada-mk',
    'f-lugar','f-direccion','f-cliente','f-tel','f-invitados','f-extras-info','f-pizzas',
    'f-personal-cant','f-personal-nombres','f-notas','c-total-cobrado','c-mat-prima',
    'c-celiacos','c-entradas','c-tortas','c-personal','c-nafta','c-bebida','c-otros',
    'c-seña','c-fecha-seña','c-fecha-resto'];
  fields.forEach(id=>setV(id,''));
  calcTotal();
}

// ===== DASHBOARD =====
async function renderDash(){
  document.getElementById('dash-date').textContent=new Date().toLocaleDateString('es-ES',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  try{
    eventos=await GET('eventos','order=created_at.desc');
    updateBadge();
    const today=new Date().toISOString().split('T')[0];
    const comp=eventos.filter(e=>e.estado==='completado');
    const pend=eventos.filter(e=>e.estado==='pendiente'||e.estado==='confirmado');
    const ingresos=comp.reduce((s,e)=>s+(parseFloat(e.total_cobrado)||0),0);
    const costos=comp.reduce((s,e)=>s+(parseFloat(e.costo_materia_prima)||0)+(parseFloat(e.extras_total)||0),0);
    const margen=ingresos-costos;
    const porCobrar=eventos.filter(e=>e.estado!=='cancelado'&&e.estado!=='completado').reduce((s,e)=>s+(parseFloat(e.resta_abonar)||0),0);

    document.getElementById('dash-stats').innerHTML=`
      <div class="sc"><div class="sl">Total eventos</div><div class="sv w">${eventos.length}</div><div class="ss">registrados</div></div>
      <div class="sc"><div class="sl">Pendientes</div><div class="sv">${pend.length}</div><div class="ss">por completar</div></div>
      <div class="sc"><div class="sl">Por cobrar</div><div class="sv" style="color:var(--blue)">$${porCobrar.toFixed(2)}</div><div class="ss">señas pendientes</div></div>
      <div class="sc"><div class="sl">Ganancia neta</div><div class="sv ${margen>=0?'g':'r'}">$${margen.toFixed(2)}</div><div class="ss">eventos completados</div></div>
    `;

    const upcoming=eventos.filter(e=>e.fecha>=today&&e.estado!=='cancelado').sort((a,b)=>a.fecha.localeCompare(b.fecha)).slice(0,5);
    document.getElementById('dash-up').innerHTML=upcoming.length
      ?upcoming.map(e=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:0.5px solid var(--border);cursor:pointer;" onclick="verDet(${e.id})">
          <div><div style="font-size:13px;font-weight:500;">${e.nombre_evento}</div><div style="font-size:11px;color:var(--muted);margin-top:2px;">${ff(e.fecha)} · ${e.cant_invitados||0} invitados · ${tl(e.tipo)}</div></div>
          <div style="text-align:right;"><div style="font-size:12px;color:var(--gold);font-weight:600;">$${parseFloat(e.total_cobrado||0).toFixed(2)}</div>${eb(e.estado)}</div>
        </div>`).join('')
      :'<div class="empty" style="padding:1.5rem;"><div class="empty-t">Sin eventos próximos</div></div>';

    const cats={social:0,corporativo:0,casamiento:0,cumpleanos:0,graduacion:0,otro:0};
    eventos.forEach(e=>{if(cats[e.tipo]!==undefined)cats[e.tipo]++;});
    document.getElementById('dash-fin').innerHTML=`
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:0.5px solid var(--border);font-size:13px;"><span>Eventos sociales</span><span style="color:var(--gold)">${cats.social}</span></div>
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:0.5px solid var(--border);font-size:13px;"><span>Corporativos</span><span style="color:var(--gold)">${cats.corporativo}</span></div>
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:0.5px solid var(--border);font-size:13px;"><span>Casamientos</span><span style="color:var(--gold)">${cats.casamiento}</span></div>
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:0.5px solid var(--border);font-size:13px;"><span>Total facturado</span><span style="color:var(--green)">$${eventos.reduce((s,e)=>s+(parseFloat(e.total_cobrado)||0),0).toFixed(2)}</span></div>
      <div style="display:flex;justify-content:space-between;padding:10px 0;font-size:15px;font-weight:600;color:var(--gold);border-top:1px solid var(--border-gold);"><span>Ganancia total</span><span>$${margen.toFixed(2)}</span></div>
    `;
  }catch(err){
    document.getElementById('dash-stats').innerHTML=`<div style="color:var(--red);padding:1rem;font-size:13px;">⚠ Error conectando a Supabase. Ejecuta el archivo setup.sql primero.</div>`;
    console.error(err);
  }
}

// ===== EVENTOS LIST =====
async function loadEventos(){
  document.getElementById('ev-loading').style.display='flex';
  document.getElementById('ev-empty').style.display='none';
  document.getElementById('ev-tbody').innerHTML='';
  try{
    eventos=await GET('eventos','order=fecha.desc');
    updateBadge();
    renderEventos();
  }catch(err){toast('Error cargando eventos','err');}
  finally{document.getElementById('ev-loading').style.display='none';}
}

function renderEventos(){
  const fE=document.getElementById('fil-e')?.value||'';
  const fT=document.getElementById('fil-t')?.value||'';
  const fB=(document.getElementById('fil-b')?.value||'').toLowerCase();
  let lista=eventos.filter(e=>{
    if(fE&&e.estado!==fE)return false;
    if(fT&&e.tipo!==fT)return false;
    if(fB&&!e.nombre_evento.toLowerCase().includes(fB)&&!(e.nombre_cliente||'').toLowerCase().includes(fB))return false;
    return true;
  });
  const tbody=document.getElementById('ev-tbody');
  const empty=document.getElementById('ev-empty');
  if(!lista.length){tbody.innerHTML='';empty.style.display='block';return;}
  empty.style.display='none';
  tbody.innerHTML=lista.map(e=>{
    const costos=(parseFloat(e.costo_materia_prima)||0)+(parseFloat(e.extras_total)||0);
    const gan=(parseFloat(e.total_cobrado)||0)-costos;
    return `<tr>
      <td style="font-weight:500;cursor:pointer;color:var(--gold);" onclick="verDet(${e.id})">${e.nombre_evento}</td>
      <td>${tl(e.tipo)}</td>
      <td style="white-space:nowrap">${ff(e.fecha)}</td>
      <td>${e.cant_invitados||0}</td>
      <td style="color:var(--green)">$${parseFloat(e.total_cobrado||0).toFixed(2)}</td>
      <td style="color:var(--red)">$${costos.toFixed(2)}</td>
      <td style="color:${gan>=0?'var(--green)':'var(--red)'}">$${gan.toFixed(2)}</td>
      <td style="color:var(--blue)">$${parseFloat(e.resta_abonar||0).toFixed(2)}</td>
      <td>${eb(e.estado)}</td>
      <td><div style="display:flex;gap:4px;">
        <button class="btn btn-out btn-sm" onclick="verDet(${e.id})">Ver</button>
        <select class="ssel" onchange="cambiarEstado(${e.id},this.value)">
          <option value="">Estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmado">Confirmado</option>
          <option value="completado">Completado</option>
          <option value="cancelado">Cancelado</option>
        </select>
        <button class="btn btn-del btn-sm" onclick="delEvento(${e.id})">✕</button>
      </div></td>
    </tr>`;
  }).join('');
}

async function cambiarEstado(id,estado){
  if(!estado)return;
  try{
    await PATCH('eventos',id,{estado});
    const e=eventos.find(ev=>ev.id===id);if(e)e.estado=estado;
    toast('Estado actualizado');renderEventos();updateBadge();
  }catch(err){toast('Error','err');}
}

async function delEvento(id){
  const e=eventos.find(ev=>ev.id===id);
  if(!e||!confirm(`¿Eliminar "${e.nombre_evento}"?`))return;
  try{await DEL('eventos',id);eventos=eventos.filter(ev=>ev.id!==id);toast('Eliminado');renderEventos();updateBadge();}
  catch(err){toast('Error al eliminar','err');}
}

// ===== DETALLE =====
async function verDet(id){
  let e=eventos.find(ev=>ev.id===id);
  if(!e){try{const r=await GET('eventos',`id=eq.${id}`);e=r[0];}catch(err){return;}}
  if(!e)return;
  const costos=(parseFloat(e.costo_materia_prima)||0)+(parseFloat(e.extras_total)||0);
  const gan=(parseFloat(e.total_cobrado)||0)-costos;

  document.getElementById('det-body').innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
      <button class="back-btn" onclick="go('eventos')">← Volver</button>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        ${['pendiente','confirmado','completado','cancelado'].map(s=>`<button class="btn btn-sm ${e.estado===s?'btn-gold':'btn-ghost'}" onclick="cambEstDet(${e.id},'${s}')">${s.charAt(0).toUpperCase()+s.slice(1)}</button>`).join('')}
      </div>
    </div>
    <div class="dhero">
      <div>
        <div class="dclient">${e.nombre_evento}</div>
        <div class="dmeta">
          <span class="mpill">📅 ${ff(e.fecha)}</span>
          <span class="mpill">👥 ${e.cant_invitados||0} invitados</span>
          <span class="mpill">${tl(e.tipo)}</span>
          ${e.lugar?`<span class="mpill">📍 ${e.lugar}</span>`:''}
          ${e.nombre_cliente?`<span class="mpill">👤 ${e.nombre_cliente}</span>`:''}
          ${e.telefono?`<span class="mpill">📞 ${e.telefono}</span>`:''}
        </div>
      </div>
      ${eb(e.estado)}
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;">

      <div class="card">
        <div class="ct">Horarios</div>
        <table class="cost-table">
          ${e.horario_inicio?`<tr><td class="label-cell">Inicio del evento</td><td>${e.horario_inicio}</td></tr>`:''}
          ${e.horario_llegada_evento?`<tr><td class="label-cell">Llegada al evento</td><td>${e.horario_llegada_evento}</td></tr>`:''}
          ${e.horario_partida?`<tr><td class="label-cell">Partida</td><td>${e.horario_partida}</td></tr>`:''}
          ${e.horario_llegada_maikels?`<tr><td class="label-cell">Llegada en Maikels</td><td>${e.horario_llegada_maikels}</td></tr>`:''}
          ${e.direccion?`<tr><td class="label-cell">Dirección</td><td>${e.direccion}</td></tr>`:''}
        </table>
      </div>

      <div class="card">
        <div class="ct">Producción</div>
        <table class="cost-table">
          <tr><td class="label-cell">Cant. pizzas</td><td>${e.cant_pizzas||0}</td></tr>
          <tr><td class="label-cell">Personal</td><td>${e.cant_personal||0} personas</td></tr>
          ${e.nombres_personal?`<tr><td class="label-cell">Nombres</td><td>${e.nombres_personal}</td></tr>`:''}
          ${e.extras_info?`<tr><td class="label-cell">Extras/alérgicos</td><td>${e.extras_info}</td></tr>`:''}
        </table>
      </div>

      <div class="card">
        <div class="ct">Costos detallados</div>
        <table class="cost-table">
          <tr><td class="label-cell">Materia prima</td><td>$${parseFloat(e.costo_materia_prima||0).toFixed(2)}</td></tr>
          ${parseFloat(e.celiacos)>0?`<tr><td class="label-cell">Celíacos</td><td>$${parseFloat(e.celiacos).toFixed(2)}</td></tr>`:''}
          ${parseFloat(e.entradas)>0?`<tr><td class="label-cell">Entradas</td><td>$${parseFloat(e.entradas).toFixed(2)}</td></tr>`:''}
          ${parseFloat(e.tortas)>0?`<tr><td class="label-cell">Tortas</td><td>$${parseFloat(e.tortas).toFixed(2)}</td></tr>`:''}
          ${parseFloat(e.personal)>0?`<tr><td class="label-cell">Personal</td><td>$${parseFloat(e.personal).toFixed(2)}</td></tr>`:''}
          ${parseFloat(e.nafta)>0?`<tr><td class="label-cell">Nafta</td><td>$${parseFloat(e.nafta).toFixed(2)}</td></tr>`:''}
          ${parseFloat(e.bebida)>0?`<tr><td class="label-cell">Bebida</td><td>$${parseFloat(e.bebida).toFixed(2)}</td></tr>`:''}
          ${parseFloat(e.otros)>0?`<tr><td class="label-cell">Otros</td><td>$${parseFloat(e.otros).toFixed(2)}</td></tr>`:''}
          <tr class="cost-total-row"><td class="label-cell">Extras total</td><td class="val">$${parseFloat(e.extras_total||0).toFixed(2)}</td></tr>
        </table>
      </div>

      <div class="card">
        <div class="ct">Cobros y ganancia</div>
        <div class="sumbox">
          <div class="sumrow"><span>Total cobrado</span><span style="color:var(--gold);font-weight:600;">$${parseFloat(e.total_cobrado||0).toFixed(2)}</span></div>
          <div class="sumrow"><span>Costos totales</span><span style="color:var(--red)">$${costos.toFixed(2)}</span></div>
          <div class="sumrow total"><span>Ganancia estimada</span><span style="color:${gan>=0?'var(--green)':'var(--red)'}">${gan>=0?'+':''}$${gan.toFixed(2)}</span></div>
          <div style="height:10px;"></div>
          <div class="sumrow"><span>Seña recibida</span><span style="color:var(--green)">$${parseFloat(e.seña||0).toFixed(2)}</span></div>
          ${e.fecha_seña?`<div class="sumrow"><span>Fecha seña</span><span>${ff(e.fecha_seña)}</span></div>`:''}
          <div class="sumrow resta"><span>Resta abonar</span><span>$${parseFloat(e.resta_abonar||0).toFixed(2)}</span></div>
          ${e.fecha_resto?`<div class="sumrow"><span>Fecha pago restante</span><span>${ff(e.fecha_resto)}</span></div>`:''}
        </div>
        ${e.notas?`<div style="margin-top:.75rem;padding:10px;background:var(--surface3);border-radius:8px;font-size:13px;color:var(--muted2);">${e.notas}</div>`:''}
      </div>

    </div>
  `;

  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-detalle').classList.add('active');
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
}

async function cambEstDet(id,estado){
  await cambiarEstado(id,estado);
  verDet(id);
}

// ===== MENÚ =====
async function loadMenu(){
  document.getElementById('menu-body').innerHTML='<div class="loading"><div class="spin"></div> Cargando...</div>';
  try{menu=await GET('ingredientes','order=cat.asc,nombre.asc');renderMenu();}
  catch(err){toast('Error cargando menú','err');}
}

const CATS={pizza:'🍕 Pizzas',entrada:'🥗 Entradas',postre:'🍰 Postres',bebida:'🥤 Bebidas',celiaco:'🌾 Celíacos / Sin TACC',vegano:'🌿 Vegano',otro:'📦 Otros'};

function renderMenu(){
  const order=['pizza','entrada','postre','bebida','celiaco','vegano','otro'];
  let html='';
  order.forEach(cat=>{
    const items=menu.filter(i=>i.cat===cat&&i.activo!==false);
    if(!items.length)return;
    html+=`<div class="cat-label">${CATS[cat]||cat}</div>`;
    items.forEach(i=>{
      html+=`<div class="menu-row">
        <div><div class="mn">${i.nombre}</div><div class="mcat">${CATS[i.cat]||i.cat}</div></div>
        <div class="mp">$${parseFloat(i.precio).toFixed(2)}</div>
        <button class="btn btn-out btn-sm" onclick="editItem(${i.id},'${i.nombre.replace(/'/g,"\\'")}',${i.precio})">Editar precio</button>
        <button class="btn btn-del btn-sm" onclick="delItem(${i.id})">Quitar</button>
      </div>`;
    });
  });
  document.getElementById('menu-body').innerHTML=html||'<div class="empty"><div class="empty-t">Sin productos en el menú</div></div>';
}

async function addItem(){
  const nombre=document.getElementById('mi-nom').value.trim();
  const cat=document.getElementById('mi-cat').value;
  const precio=parseFloat(document.getElementById('mi-precio').value);
  if(!nombre||!precio||precio<=0){toast('Completa nombre y precio','err');return;}
  try{
    const res=await POST('ingredientes',{nombre,cat,precio,activo:true});
    menu.push(res[0]);
    document.getElementById('mi-nom').value='';
    document.getElementById('mi-precio').value='';
    toast('Producto guardado ✓');
    renderMenu();
  }catch(err){toast('Error: '+err.message,'err');}
}

async function editItem(id,nombre,precioActual){
  const nuevo=prompt(`Nuevo precio para "${nombre}" (actual: $${parseFloat(precioActual).toFixed(2)}):`, parseFloat(precioActual).toFixed(2));
  if(nuevo===null)return;
  const p=parseFloat(nuevo);
  if(isNaN(p)||p<0){toast('Precio inválido','err');return;}
  try{
    await PATCH('ingredientes',id,{precio:p});
    const item=menu.find(i=>i.id===id);if(item)item.precio=p;
    toast('Precio actualizado ✓');
    renderMenu();
  }catch(err){toast('Error al actualizar','err');}
}

async function delItem(id){
  const item=menu.find(i=>i.id===id);
  if(!item||!confirm(`¿Quitar "${item.nombre}" del menú?`))return;
  try{
    await PATCH('ingredientes',id,{activo:false});
    menu=menu.filter(i=>i.id!==id);
    toast('Producto quitado');
    renderMenu();
  }catch(err){toast('Error','err');}
}

// ===== INIT =====
renderDash();
</script>
</body>
</html>
