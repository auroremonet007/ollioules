/* Sur les traces d'Ollioules — moteur de jeu et écrans.
   Contenu : window.CONTENU (généré depuis le tableur par outils/maj.sh).
   Règles : la réponse valide l'étape, jamais le GPS ; aucun chronomètre ;
   une partie ne expire jamais ; tout reste sur le téléphone. */
(function () {
  "use strict";

  var D = window.CONTENU;
  var CLE = "jdp-ollioules-v2";
  var app = document.getElementById("app");
  var N = D.etapes.length;
  var LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  /* ------------------------------------------------------------ utilitaires */

  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Tolérance aux réponses : casse, accents, ponctuation, articles.
  // Doit rester identique à outils/import_parcours.py.
  function norm(t) {
    if (t == null) return "";
    var s = String(t).trim().toLowerCase();
    s = s.normalize("NFD").replace(/[̀-ͯ]/g, "");
    s = s.replace(/^(le |la |les |l'|un |une |des |du |de la |de |d')/, "");
    s = s.replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
    return s;
  }

  function bareme(q) {
    return [
      Number(q.points_essai_1 != null ? q.points_essai_1 : 100),
      Number(q.points_essai_2 != null ? q.points_essai_2 : 60),
      Number(q.points_essai_3 != null ? q.points_essai_3 : 30),
      Number(q.points_essai_4_et_plus != null ? q.points_essai_4_et_plus : 10)
    ];
  }
  function valeur(q, essais) { return bareme(q)[Math.min(essais, 3)]; }
  function estJuste(q, saisie) {
    var n = norm(saisie);
    return n !== "" && (q.reponses || []).some(function (r) { return norm(r) === n; });
  }
  // Après 3 essais, ou quand tous les indices sont donnés, on peut passer
  // pour qu'un groupe bloqué ne reste jamais coincé.
  function peutReveler(q, essais) {
    return essais >= Math.max(3, 1 + (q.indices || []).length);
  }
  function scoreMax() {
    return D.etapes.reduce(function (t, e) {
      return t + e.questions.reduce(function (s, q) { return s + bareme(q)[0]; }, 0);
    }, 0);
  }
  function ordinal(n) { return n === 2 ? "deuxième" : n === 3 ? "troisième" : n + "e"; }

  function distance(a, b) {
    var R = 6371000, r = function (x) { return x * Math.PI / 180; };
    var dp = r(b.lat - a.lat), dl = r(b.lng - a.lng);
    var h = Math.sin(dp / 2) * Math.sin(dp / 2) +
      Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dl / 2) * Math.sin(dl / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function cap(a, b) {
    var r = function (x) { return x * Math.PI / 180; };
    var dl = r(b.lng - a.lng);
    var y = Math.sin(dl) * Math.cos(r(b.lat));
    var x = Math.cos(r(a.lat)) * Math.sin(r(b.lat)) - Math.sin(r(a.lat)) * Math.cos(r(b.lat)) * Math.cos(dl);
    var ang = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
    return ["nord", "nord-est", "est", "sud-est", "sud", "sud-ouest", "ouest", "nord-ouest"][Math.round(ang / 45) % 8];
  }

  /* ----------------------------------------------------------------- état */

  var S = null;      // partie en cours
  var pos = null;    // position du joueur {lat, lng}, si disponible

  function neuve() {
    return { etape: 0, question: 0, essais: 0, faux: [], score: 0, detail: [],
             demarre: Date.now(), fini: false, ecran: "etape", derniere: null };
  }
  function charger() {
    try { var b = localStorage.getItem(CLE); return b ? JSON.parse(b) : null; } catch (e) { return null; }
  }
  function sauver() { try { localStorage.setItem(CLE, JSON.stringify(S)); } catch (e) {} }
  function oublier() { try { localStorage.removeItem(CLE); } catch (e) {} }

  /* ----------------------------------------------------------- géolocalisation */

  var surveillance = false;
  function suivre() {
    if (surveillance || !navigator.geolocation) return;
    surveillance = true;
    navigator.geolocation.watchPosition(function (p) {
      pos = { lat: p.coords.latitude, lng: p.coords.longitude };
      majPosition();
    }, function () { /* le jeu reste jouable sans GPS */ },
    { enableHighAccuracy: true, maximumAge: 15000, timeout: 20000 });
  }

  /* ---------------------------------------------------------- éléments communs */

  var ICONE_PHOTO = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1F4A6B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';
  var ICONE_LIEU = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#55672B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg>';
  var ICONE_OK = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#34421A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>';
  var ICONE_X = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7A2F14" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function photo(src, legende) {
    if (src) {
      return '<img class="photo" src="photos/' + esc(src) + '" alt="' + esc(legende) + '">';
    }
    return '<div class="photo-vide">' + ICONE_PHOTO + '<div>Photo à venir · ' + esc(legende) + '</div></div>';
  }

  function jauge() {
    var h = "";
    for (var i = 0; i < N; i++) h += '<i class="' + (i < S.etape ? "fait" : i === S.etape ? "ici" : "") + '"></i>';
    return '<div class="jauge" aria-hidden="true">' + h + "</div>";
  }

  var LIEN_ACCUEIL = '<button class="lien-accueil" data-act="accueil" aria-label="Retour à l\'accueil">‹ Accueil</button>';

  function entete(e) {
    return LIEN_ACCUEIL + '<header class="entete"><div><p class="surtitre">Étape ' + (S.etape + 1) + " sur " + N +
      '</p><h2 class="titre-etape">' + esc(e.titre_fr) + '</h2></div><p class="points">' + S.score + " pts</p></header>" + jauge();
  }

  /* ----------------------------------------------------------------- écrans */

  function accueil() {
    var P = D.parcours, sauve = charger();
    var nbQ = D.etapes.reduce(function (a, e) { return a + e.questions.length; }, 0);
    var h = "";

    if (sauve && !sauve.fini) {
      var cran = "";
      for (var i = 0; i < N; i++) cran += '<i class="' + (i < sauve.etape ? "fait" : i === sauve.etape ? "ici" : "") + '"></i>';
      h += '<div class="entete-accueil"><p class="surtitre">' + esc(P.ville) + ' · Var</p><h1 class="titre-accueil">' + esc(P.titre_fr) + "</h1></div>" +
        '<section class="partie"><p class="surtitre">Votre partie en cours</p>' +
        '<div class="partie-ligne"><p class="grand">Étape ' + (sauve.etape + 1) + " sur " + N + '</p><p class="points">' + sauve.score + " pts</p></div>" +
        '<div class="jauge" aria-hidden="true">' + cran + "</div>" +
        '<p class="doux">Partie commencée ' + quand(sauve.demarre) + ". Rien n'est perdu : vous repartez exactement là où vous vous étiez arrêtés.</p></section>" +
        '<div class="pousse"></div><div class="pile">' +
        '<button class="bouton" data-act="reprendre">Reprendre à l\'étape ' + (sauve.etape + 1) + "</button>" +
        '<button class="bouton-2" data-act="recommencer">Recommencer depuis le début</button></div>';
    } else {
      h += '<div class="entete-accueil"><p class="surtitre">' + esc(P.ville) + ' · Var</p><h1 class="titre-accueil">' + esc(P.titre_fr) + "</h1></div>" +
        photo(P.photo_accueil, "vue d'Ollioules") +
        (P.description_fr ? '<p class="doux" style="color:#33424A">' + esc(P.description_fr) + "</p>" : "") +
        '<div class="meta"><span><b>' + N + "</b> étapes</span><span><b>≈ " + esc(P.duree_estimee_min || "?") + "</b> min</span><span><b>" + nbQ + "</b> questions</span></div>" +
        '<div class="depart">' + ICONE_LIEU + '<div><p class="surtitre">Point de départ</p><p>' + esc(P.depart_description_fr || "[Lieu de départ à confirmer]") + "</p></div></div>" +
        '<div class="pousse"></div><div class="pile">' +
        '<button class="bouton" data-act="commencer">Commencer le parcours</button>' +
        (sauve && sauve.fini ? '<button class="bouton-2" data-act="revoir">Revoir mon dernier score</button>' : "") +
        '<p class="petit doux" style="text-align:center">En famille ou en classe · un seul écran pour tout le groupe</p></div>';
    }
    montrer(h);
  }

  function quand(t) {
    if (!t) return "récemment";
    var j = Math.floor((Date.now() - t) / 86400000);
    return j <= 0 ? "aujourd'hui" : j === 1 ? "hier" : "il y a " + j + " jours";
  }

  function avertissement() {
    var texte = D.parcours.avertissement_securite_fr || "Restez attentifs à la circulation. Un adulte doit accompagner les enfants en permanence.";
    var lignes = texte.split(/(?<=[.!?])\s+/).filter(Boolean).map(function (l) {
      return '<p class="alerte-ligne">' + esc(l) + "</p>";
    }).join("");
    document.body.classList.add("ecran-bleu");
    app.innerHTML = '<div class="alerte">' +
      '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5 2.8 19.5h18.4z"/><path d="M12 10v4.5"/><circle cx="12" cy="17" r="0.6" fill="#FFFFFF"/></svg>' +
      "<h1>Avant de partir</h1>" + lignes +
      '<div class="pousse"></div><button class="bouton-blanc" data-act="demarrer">J\'ai compris, c\'est parti</button></div>';
    window.scrollTo(0, 0);
  }

  function etape() {
    var e = D.etapes[S.etape], q = e.questions[S.question];
    var h = entete(e);

    h += '<section class="carte-cadre"><div id="carte"></div><div class="carte-legende"><span>Seule l\'étape suivante est révélée</span><strong id="dist">position inconnue</strong></div></section>';

    if (e.chemin_description_fr) {
      h += '<div class="chemin"><div><p class="surtitre">Pour y aller</p><p>' + esc(e.chemin_description_fr) + "</p></div></div>";
    }

    if (!q) {
      h += '<div class="manque">Aucune question n\'est encore rédigée pour cette étape.</div>' +
        '<div class="pousse"></div><button class="bouton" data-act="passer">' + (S.etape >= N - 1 ? "Voir mon score" : "Étape suivante") + "</button>";
      montrer(h);
      return;
    }

    var qcm = String(q.type).trim() === "qcm";
    var pts = valeur(q, S.essais);
    h += '<section class="panneau"><div><p class="surtitre vert">' + (S.essais > 0 ? "Vaut maintenant " : "Vaut ") + pts + " point" + (pts > 1 ? "s" : "") + "</p>" +
      (e.questions.length > 1 ? '<p class="surtitre" style="margin-top:2px">Question ' + (S.question + 1) + " sur " + e.questions.length + "</p>" : "") +
      '<h3 class="question" style="margin-top:8px">' + esc(String(q.enonce_fr || "").trim()) + "</h3></div>";

    if (qcm) {
      h += '<div class="choix">' + (q.choix || []).map(function (c, i) {
        var rate = S.faux.indexOf(norm(c)) !== -1;
        return '<button data-act="choix" data-i="' + i + '"' + (rate ? ' class="faux" disabled' : "") + ">" + esc(c.trim()) + (rate ? ICONE_X : "") + "</button>";
      }).join("") + "</div>";
      if ((q.choix || []).length < 2) h += '<div class="manque">Ce QCM n\'a pas assez de choix dans le tableur.</div>';
    } else {
      h += '<form class="saisie" data-act="valider"><input id="reponse" type="text" placeholder="Votre réponse" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" aria-label="Votre réponse"><button type="submit">Valider</button></form>';
    }

    if (S.essais > 0) {
      var indices = (q.indices || []).slice(0, Math.min(S.essais, (q.indices || []).length));
      h += '<div class="retour indice"><b>Pas tout à fait.</b></div>';
      indices.forEach(function (t, i) {
        h += '<div class="retour indice">Indice ' + (i + 1) + " : " + esc(t) + "</div>";
      });
      if (peutReveler(q, S.essais)) {
        h += '<button class="bouton-2" data-act="reveler">Révéler la réponse (0 point) et continuer</button>';
      }
    }
    h += "</section>";
    montrer(h);
  }

  function explication() {
    var e = D.etapes[S.etape], q = e.questions[S.question];
    var dernier = S.question >= e.questions.length - 1;
    var d = S.derniere || { gain: 0, revele: false, essais: 1 };
    var bonne = (q.reponses || [""])[0];
    var h = entete(e);

    if (d.revele) {
      h += '<div class="retour juste">' + ICONE_OK + "<div><b>La réponse : " + esc(bonne) + ".</b> 0 point pour celle-ci, on continue.</div></div>";
    } else {
      var quand_ = d.essais <= 1 ? "Du premier coup" : "Au " + ordinal(d.essais) + " essai";
      h += '<div class="retour juste">' + ICONE_OK + "<div><b>Bonne réponse : " + esc(bonne) + ".</b> " + quand_ + ", +" + d.gain + " points.</div></div>";
    }

    // La photo accompagne chaque bonne réponse ; le texte d'explication ne vient qu'à la fin de l'étape.
    h += photo(q.image, "étape " + (S.etape + 1));

    if (dernier) {
      var texte = e.explication_fr;
      var provisoire = !texte;
      h += '<section><p class="surtitre vert">Ce qu\'il faut savoir</p><p class="lecture" style="margin-top:8px">' + esc(texte || LOREM) + "</p>" +
        (provisoire ? '<p class="petit doux" style="margin-top:8px">Texte provisoire en attendant la rédaction définitive.</p>' : "") + "</section>";
    }
    h += '<div class="pousse"></div><button class="bouton" data-act="suite">' +
      (!dernier ? "Question suivante" : S.etape >= N - 1 ? "Voir mon score" : "Étape suivante") + "</button>";
    montrer(h);
  }

  function fin() {
    var lignes = S.detail.map(function (d) {
      return '<div class="detail-ligne"><span>' + esc(d.etape) + (d.nq > 1 ? " · q" + d.q : "") + "</span><span>" +
        (d.revele ? "révélée" : d.essais + " essai" + (d.essais > 1 ? "s" : "")) + " · <b>" + d.pts + "</b></span></div>";
    }).join("");
    montrer(LIEN_ACCUEIL + '<div class="fin-haut">' +
      '<svg width="132" height="132" viewBox="0 0 120 120" role="img" aria-label="Badge d\'Ollioules"><circle cx="60" cy="60" r="56" fill="#E4EAD3" stroke="#25577F" stroke-width="3"/><circle cx="60" cy="60" r="48" fill="none" stroke="#55672B" stroke-width="1.5"/><path d="M60 24c-12 10-18 20-18 30 0 10 8 17 18 17s18-7 18-17c0-10-6-20-18-30z" fill="#55672B"/><path d="M60 40v36" stroke="#E4EAD3" stroke-width="2" stroke-linecap="round"/><text x="60" y="96" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="11" font-weight="700" letter-spacing="2" fill="#1F4A6B">OLLIOULES</text></svg>' +
      "<h1>Parcours terminé</h1>" +
      '<div class="score-grand"><b>' + S.score + "</b><span>/ " + scoreMax() + " points</span></div></div>" +
      '<section class="detail"><p class="surtitre" style="padding-bottom:8px">Détail par étape</p>' + lignes + "</section>" +
      '<div class="pousse"></div><button class="bouton" data-act="rejouer">Rejouer le parcours</button>');
  }

  /* ----------------------------------------------------------------- carte */

  var carte = null, marqueurMoi = null, halo = null, cible = null;

  function monterCarte() {
    var el = document.getElementById("carte");
    if (carte) { carte.remove(); carte = null; marqueurMoi = null; halo = null; }
    if (!el) return;
    if (!window.L) { el.innerHTML = '<p class="carte-off">Carte indisponible : connexion perdue. Le jeu reste jouable.</p>'; return; }

    var e = D.etapes[S.etape];
    cible = { lat: Number(e.latitude), lng: Number(e.longitude) };
    carte = L.map(el, { zoomControl: false, attributionControl: true });
    carte.attributionControl.setPrefix(false);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(carte);

    var pts = [];
    var P = D.parcours;
    if (P.depart_latitude != null && P.depart_longitude != null) {
      var dep = [Number(P.depart_latitude), Number(P.depart_longitude)];
      pts.push(dep);
      L.circleMarker(dep, { radius: 6, color: "#25577F", weight: 3, fillColor: "#FFFFFF", fillOpacity: 1 }).addTo(carte);
    }
    // Seules les étapes déjà franchies et la suivante apparaissent.
    for (var i = 0; i <= S.etape; i++) {
      var s = D.etapes[i], p = [Number(s.latitude), Number(s.longitude)], courante = i === S.etape;
      var avant = pts.length ? pts[pts.length - 1] : null;
      if (avant) {
        L.polyline([avant, p], courante
          ? { color: "#25577F", weight: 4, dashArray: "1 8", lineCap: "round" }
          : { color: "#9DB7CC", weight: 4 }).addTo(carte);
      }
      pts.push(p);
      L.marker(p, { icon: L.divIcon({
        className: "", iconSize: [28, 28], iconAnchor: [14, 14],
        html: courante ? '<div class="pin pin-cible">' + (i + 1) + "</div>" : '<div class="pin pin-ok">✓</div>'
      }), keyboard: false }).addTo(carte);
    }
    carte.fitBounds(L.latLngBounds(pts).pad(0.35), { maxZoom: 18 });
    majPosition();
  }

  function majPosition() {
    var d = document.getElementById("dist");
    if (!pos || !cible) return;
    if (carte) {
      if (!marqueurMoi) {
        halo = L.circleMarker([pos.lat, pos.lng], { radius: 13, stroke: false, fillColor: "#25577F", fillOpacity: 0.18 }).addTo(carte);
        marqueurMoi = L.circleMarker([pos.lat, pos.lng], { radius: 6, color: "#FFFFFF", weight: 2.5, fillColor: "#25577F", fillOpacity: 1 }).addTo(carte);
      } else {
        marqueurMoi.setLatLng([pos.lat, pos.lng]);
        halo.setLatLng([pos.lat, pos.lng]);
      }
    }
    if (d) d.textContent = Math.round(distance(pos, cible)) + " m · " + cap(pos, cible);
  }

  /* ------------------------------------------------------------ navigation */

  function montrer(html) {
    document.body.classList.remove("ecran-bleu");
    app.innerHTML = html;
    if (document.getElementById("carte")) monterCarte();
    window.scrollTo(0, 0);
  }

  function aller(ecran) { S.ecran = ecran; sauver(); rendre(); }

  function rendre() {
    if (!S) return accueil();
    if (S.ecran === "explication") return explication();
    if (S.ecran === "fin") return fin();
    return etape();
  }

  function finQuestion(gain, revele, essais) {
    S.derniere = { gain: gain, revele: revele, essais: essais };
    aller("explication");
  }

  function repondre(texte) {
    var e = D.etapes[S.etape], q = e.questions[S.question];
    if (!String(texte).trim()) return;
    if (estJuste(q, texte)) {
      var gain = valeur(q, S.essais);
      S.score += gain;
      S.detail.push({ etape: e.titre_fr, q: S.question + 1, nq: e.questions.length, pts: gain, essais: S.essais + 1 });
      finQuestion(gain, false, S.essais + 1);
    } else {
      S.essais += 1;
      S.faux.push(norm(texte));
      sauver();
      etape();
    }
  }

  function suite() {
    var e = D.etapes[S.etape];
    S.essais = 0; S.faux = []; S.derniere = null;
    if (S.question < e.questions.length - 1) { S.question += 1; return aller("etape"); }
    passer();
  }

  function passer() {
    S.question = 0; S.essais = 0; S.faux = []; S.derniere = null;
    S.etape += 1;
    if (S.etape >= N) { S.etape = N - 1; S.fini = true; return aller("fin"); }
    aller("etape");
  }

  /* ----------------------------------------------------------- événements */

  app.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-act]");
    if (!b || b.tagName === "FORM") return;
    var act = b.getAttribute("data-act");

    if (act === "accueil") { return accueil(); }   // la partie reste sauvegardée
    if (act === "commencer") { return avertissement(); }
    if (act === "demarrer") { S = neuve(); sauver(); suivre(); return aller("etape"); }
    if (act === "reprendre") { S = charger(); suivre(); return rendre(); }
    if (act === "recommencer") {
      if (window.confirm("Votre progression actuelle sera perdue. Recommencer ?")) { oublier(); return avertissement(); }
      return;
    }
    if (act === "revoir") { S = charger(); return rendre(); }
    if (act === "choix") {
      var q = D.etapes[S.etape].questions[S.question];
      return repondre(q.choix[Number(b.getAttribute("data-i"))]);
    }
    if (act === "reveler") {
      var e = D.etapes[S.etape];
      S.detail.push({ etape: e.titre_fr, q: S.question + 1, nq: e.questions.length, pts: 0, essais: S.essais, revele: true });
      return finQuestion(0, true, S.essais);
    }
    if (act === "suite") return suite();
    if (act === "passer") return passer();
    if (act === "rejouer") { oublier(); S = null; return accueil(); }
  });

  app.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var champ = document.getElementById("reponse");
    if (champ) repondre(champ.value);
  });

  /* ------------------------------------------------------------- démarrage */

  S = null;
  accueil();
})();
