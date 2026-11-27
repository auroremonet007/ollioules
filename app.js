/* Ollioules : le passé vous défie ! — moteur de jeu et écrans (français / anglais).
   Contenu : window.CONTENU (généré depuis le tableur par outils/maj.sh).
   Règles : la réponse valide l'étape, jamais le GPS ; aucun chronomètre ;
   une partie n'expire jamais ; tout reste sur le téléphone. */
(function () {
  "use strict";

  var D = window.CONTENU;
  var CLE = "jdp-ollioules-v2";
  var CLE_LANGUE = "jdp-langue";
  var app = document.getElementById("app");
  var N = D.etapes.length;

  /* ----------------------------------------------------------------- langue */

  // Textes de l'interface. Le contenu du parcours (titres, questions, explications…)
  // vient du tableur : colonnes _fr et _en. Sans traduction, on retombe sur le français.
  var TXT = {
    fr: {
      siteSous: "Jeux de piste en famille ou en classe",
      choisir: "Choisissez votre parcours",
      nbEtapes: function (n) { return n + " étapes"; },
      nbQuestions: function (n) { return n + " questions"; },
      enCours: function (n) { return "Partie en cours · étape " + n; },
      termine: "Parcours terminé",
      decouvrir: "Découvrir",
      reprendre: "Reprendre",
      retourAccueil: "‹ Accueil", retourAccueilAria: "Retour à l'accueil",
      retourParcours: "‹ Parcours", retourParcoursAria: "Retour au parcours",
      partieEnCours: "Votre partie en cours",
      etapeSur: function (n, m) { return "Étape " + n + " sur " + m; },
      pts: " pts",
      commencee: function (q) { return "Partie commencée " + q + ". Rien n'est perdu : vous repartez exactement là où vous vous étiez arrêtés."; },
      reprendreEtape: function (n) { return "Reprendre à l'étape " + n; },
      recommencer: "Recommencer depuis le début",
      confirmRecommencer: "Votre progression actuelle sera perdue. Recommencer ?",
      recemment: "récemment", aujourdhui: "aujourd'hui", hier: "hier",
      ilYaJours: function (j) { return "il y a " + j + " jours"; },
      etapesMeta: "étapes", questionsMeta: "questions", minMeta: "min",
      depart: "Point de départ", departAConfirmer: "[Lieu de départ à confirmer]",
      commencer: "Commencer le parcours", revoir: "Revoir mon dernier score",
      pitch: "En famille ou en classe · un seul écran pour tout le groupe",
      avant: "Avant de partir",
      avantDefaut: "Restez attentifs à la circulation. Un adulte doit accompagner les enfants en permanence.",
      compris: "J'ai compris, c'est parti",
      pourYAller: "Pour y aller",
      seuleEtape: "Seule l'étape suivante est révélée",
      agrandir: "Agrandir", reduire: "Réduire", recentrer: "Recentrer",
      agrandirAria: "Agrandir la carte", reduireAria: "Réduire la carte",
      vaut: function (p, maint) { return (maint ? "Vaut maintenant " : "Vaut ") + p + " point" + (p > 1 ? "s" : ""); },
      questionSur: function (i, n) { return "Question " + i + " sur " + n; },
      votreReponse: "Votre réponse", valider: "Valider",
      pasTout: "Pas tout à fait.",
      indice: function (i, txt) { return "Indice " + i + " : " + txt; },
      reveler: "Révéler la réponse (0 point) et continuer",
      manqueQuestion: "Aucune question n'est encore rédigée pour cette étape.",
      manqueQcm: "Ce QCM n'a pas assez de choix dans le tableur.",
      laReponseGras: function (b) { return "La réponse : " + b + "."; },
      laReponseReste: "0 point pour celle-ci, on continue.",
      bonneGras: function (b) { return "Bonne réponse : " + b + "."; },
      bonneReste: function (quand, gain) { return quand + ", +" + gain + " points."; },
      premierCoup: "Du premier coup",
      essaiOrdinal: function (n) { return "Au " + (n === 2 ? "deuxième" : n === 3 ? "troisième" : n + "e") + " essai"; },
      savoir: "Ce qu'il faut savoir",
      questionSuivante: "Question suivante", etapeSuivante: "Étape suivante", voirScore: "Voir mon score",
      finTitre: "Parcours terminé",
      surPoints: function (m) { return "/ " + m + " points"; },
      detail: "Détail par étape", revelee: "révélée",
      essai: function (n) { return n + " essai" + (n > 1 ? "s" : ""); },
      rejouer: "Rejouer le parcours",
      badgeAlt: "Badge de l'olivier d'Ollioules",
      carteOff: "Carte indisponible : connexion perdue. Le jeu reste jouable.",
      posInconnue: "position inconnue", locRefusee: "localisation refusée",
      caps: ["nord", "nord-est", "est", "sud-est", "sud", "sud-ouest", "ouest", "nord-ouest"],
      photoAVenir: function (l) { return "Photo à venir · " + l; },
      altAccueil: "vue d'Ollioules",
      altEtape: function (n) { return "étape " + n; },
      grouperLangue: "Langue"
    },
    en: {
      siteSous: "Trail games for families and classes",
      choisir: "Choose your trail",
      nbEtapes: function (n) { return n + " stops"; },
      nbQuestions: function (n) { return n + " questions"; },
      enCours: function (n) { return "Game in progress · stop " + n; },
      termine: "Trail completed",
      decouvrir: "Discover",
      reprendre: "Resume",
      retourAccueil: "‹ Home", retourAccueilAria: "Back to home",
      retourParcours: "‹ Trail", retourParcoursAria: "Back to the trail",
      partieEnCours: "Your game in progress",
      etapeSur: function (n, m) { return "Stop " + n + " of " + m; },
      pts: " pts",
      commencee: function (q) { return "Game started " + q + ". Nothing is lost: you pick up exactly where you left off."; },
      reprendreEtape: function (n) { return "Resume at stop " + n; },
      recommencer: "Start over from the beginning",
      confirmRecommencer: "Your current progress will be lost. Start over?",
      recemment: "recently", aujourdhui: "today", hier: "yesterday",
      ilYaJours: function (j) { return j + " days ago"; },
      etapesMeta: "stops", questionsMeta: "questions", minMeta: "min",
      depart: "Starting point", departAConfirmer: "[Starting point to be confirmed]",
      commencer: "Start the trail", revoir: "See my last score",
      pitch: "As a family or a class · one screen for the whole group",
      avant: "Before you set off",
      avantDefaut: "Stay alert to traffic. An adult must accompany the children at all times.",
      compris: "Understood, let's go",
      pourYAller: "How to get there",
      seuleEtape: "Only the next stop is revealed",
      agrandir: "Enlarge", reduire: "Shrink", recentrer: "Recenter",
      agrandirAria: "Enlarge the map", reduireAria: "Shrink the map",
      vaut: function (p, maint) { return (maint ? "Now worth " : "Worth ") + p + " point" + (p !== 1 ? "s" : ""); },
      questionSur: function (i, n) { return "Question " + i + " of " + n; },
      votreReponse: "Your answer", valider: "Submit",
      pasTout: "Not quite.",
      indice: function (i, txt) { return "Hint " + i + ": " + txt; },
      reveler: "Reveal the answer (0 points) and continue",
      manqueQuestion: "No question has been written for this stop yet.",
      manqueQcm: "This multiple-choice question does not have enough choices in the spreadsheet.",
      laReponseGras: function (b) { return "The answer: " + b + "."; },
      laReponseReste: "0 points for this one, let's move on.",
      bonneGras: function (b) { return "Correct: " + b + "."; },
      bonneReste: function (quand, gain) { return quand + ", +" + gain + " points."; },
      premierCoup: "First try",
      essaiOrdinal: function (n) { return "On the " + (n === 2 ? "second" : n === 3 ? "third" : n + "th") + " try"; },
      savoir: "Good to know",
      questionSuivante: "Next question", etapeSuivante: "Next stop", voirScore: "See my score",
      finTitre: "Trail completed",
      surPoints: function (m) { return "/ " + m + " points"; },
      detail: "Breakdown by stop", revelee: "revealed",
      essai: function (n) { return n + " " + (n > 1 ? "attempts" : "attempt"); },
      rejouer: "Play the trail again",
      badgeAlt: "Ollioules olive tree badge",
      carteOff: "Map unavailable: connection lost. The game is still playable.",
      posInconnue: "position unknown", locRefusee: "location denied",
      caps: ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"],
      photoAVenir: function (l) { return "Photo coming soon · " + l; },
      altAccueil: "view of Ollioules",
      altEtape: function (n) { return "stop " + n; },
      grouperLangue: "Language"
    }
  };

  var lang = langueInitiale();
  var repliFR = (window.__repliFR = []);   // textes affichés en français faute de traduction (sert aux tests)

  function langueInitiale() {
    try {
      var l = localStorage.getItem(CLE_LANGUE);
      if (l === "fr" || l === "en") return l;
    } catch (e) {}
    var n = String(navigator.language || "fr").toLowerCase();
    return n.indexOf("fr") === 0 ? "fr" : "en";
  }
  function fixerLangue(l) {
    lang = l;
    try { localStorage.setItem(CLE_LANGUE, l); } catch (e) {}
    document.documentElement.lang = l;
    document.title = T(D.parcours, "titre");
  }
  function t(cle) {
    var v = TXT[lang][cle];
    if (typeof v === "function") return v.apply(null, Array.prototype.slice.call(arguments, 1));
    return v;
  }
  // Texte du contenu dans la langue choisie ; retombe sur le français si la traduction manque.
  function T(o, base) {
    if (lang === "en") {
      var v = o[base + "_en"];
      if (v != null && String(v).trim() !== "") return v;
      if (o[base + "_fr"]) repliFR.push(base);
    }
    return o[base + "_fr"];
  }
  // Tableaux du contenu (réponses, choix, indices) dans la langue choisie.
  function A(q, base) {
    if (lang === "en") {
      var en = q[base + "_en"];
      if (en && en.length) return en;
      if ((q[base] || []).length) repliFR.push(base);
    }
    return q[base] || [];
  }

  /* ------------------------------------------------------------ utilitaires */

  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // Typographie française : espace insécable avant « : ; ! ? », pour qu'ils restent accrochés au mot.
  function typo(txt) {
    var s = esc(txt);
    return lang === "fr" ? s.replace(/ ([:;!?])/g, " $1") : s;
  }

  // Tolérance aux réponses : casse, accents, ponctuation, articles (français et anglais).
  // Doit rester identique à outils/import_parcours.py.
  function norm(t) {
    if (t == null) return "";
    var s = String(t).trim().toLowerCase().replace(/[‘’ʼ]/g, "'");  // apostrophes de l'iPhone
    s = s.normalize("NFD").replace(/[̀-ͯ]/g, "");
    s = s.replace(/^(le |la |les |l'|un |une |des |du |de la |de |d'|the |an |a )/, "");
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

  // En QCM, seules les réponses de la langue choisie comptent. En texte libre, on accepte aussi
  // celles de l'autre langue (un joueur anglophone qui tape « donjon » ne doit pas être refusé).
  function reponsesAcceptees(q) {
    var liste = A(q, "reponses");
    if (String(q.type).trim() !== "qcm") {
      liste = liste.concat(lang === "en" ? (q.reponses || []) : (q.reponses_en || []));
    }
    return liste;
  }
  function estJuste(q, saisie) {
    var n = norm(saisie);
    return n !== "" && reponsesAcceptees(q).some(function (r) { return norm(r) === n; });
  }
  // Après 3 essais, ou quand tous les indices sont donnés, on peut passer
  // pour qu'un groupe bloqué ne reste jamais coincé.
  function peutReveler(q, essais) {
    return essais >= Math.max(3, 1 + A(q, "indices").length);
  }
  function scoreMax() {
    return D.etapes.reduce(function (tot, e) {
      return tot + e.questions.reduce(function (s, q) { return s + bareme(q)[0]; }, 0);
    }, 0);
  }

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
    return t("caps")[Math.round(ang / 45) % 8];
  }

  /* ----------------------------------------------------------------- état */

  var S = null;      // partie en cours
  var pos = null;    // position du joueur {lat, lng, prec}, si disponible
  var gps = "attente";  // attente | ok | refuse | absent

  function neuve() {
    return { etape: 0, question: 0, essais: 0, faux: [], fauxIdx: [], score: 0, detail: [],
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
    if (surveillance) return;
    if (!navigator.geolocation) { gps = "absent"; return; }
    surveillance = true;
    navigator.geolocation.watchPosition(function (p) {
      gps = "ok";
      pos = { lat: p.coords.latitude, lng: p.coords.longitude, prec: p.coords.accuracy };
      majPosition();
    }, function (err) {
      // Le jeu reste jouable sans GPS : seule la carte perd votre position.
      if (err && err.code === 1) { gps = "refuse"; majLegende(); }
    }, { enableHighAccuracy: true, maximumAge: 15000, timeout: 20000 });
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
    return '<div class="photo-vide">' + ICONE_PHOTO + '<div>' + esc(t("photoAVenir", legende)) + '</div></div>';
  }

  function jauge() {
    var h = "";
    for (var i = 0; i < N; i++) h += '<i class="' + (i < S.etape ? "fait" : i === S.etape ? "ici" : "") + '"></i>';
    return '<div class="jauge" aria-hidden="true">' + h + "</div>";
  }

  function lienAccueil() {
    return '<button class="lien-accueil" data-act="home" aria-label="' + esc(t("retourAccueilAria")) + '">' + esc(t("retourAccueil")) + '</button>';
  }
  function lienParcours() {
    return '<button class="lien-accueil" data-act="intro" aria-label="' + esc(t("retourParcoursAria")) + '">' + esc(t("retourParcours")) + '</button>';
  }

  function entete(e) {
    return lienParcours() + '<header class="entete"><div><p class="surtitre">' + esc(t("etapeSur", S.etape + 1, N)) +
      '</p><h2 class="titre-etape">' + esc(T(e, "titre")) + '</h2></div><p class="points">' + S.score + esc(t("pts")) + "</p></header>" + jauge();
  }

  function quand(ts) {
    if (!ts) return t("recemment");
    var j = Math.floor((Date.now() - ts) / 86400000);
    return j <= 0 ? t("aujourdhui") : j === 1 ? t("hier") : t("ilYaJours", j);
  }

  /* ----------------------------------------------------------------- écrans */

  // Page d'accueil : choix de la langue, puis du parcours.
  // (Un seul parcours pour l'instant : la liste « COURS » accueillera les suivants.)
  function accueilGlobal() {
    var P = D.parcours, sauve = charger();
    var COURS = [{ id: "ollioules", P: P, etapes: N }];

    var boutonsLangue = [["fr", "Français"], ["en", "English"]].map(function (l) {
      return '<button data-act="langue" data-l="' + l[0] + '" lang="' + l[0] + '" aria-pressed="' + (lang === l[0]) + '"' +
        (lang === l[0] ? ' class="actif"' : "") + ">" + l[1] + "</button>";
    }).join("");

    var cartes = COURS.map(function (c) {
      var puce = "", cta = t("decouvrir");
      if (sauve && sauve.fini) puce = '<span class="puce">' + esc(t("termine")) + "</span>";
      else if (sauve) { puce = '<span class="puce">' + esc(t("enCours", sauve.etape + 1)) + "</span>"; cta = t("reprendre"); }
      return '<button class="cours" data-act="parcours" data-id="' + esc(c.id) + '">' +
        (c.P.photo_accueil ? '<img class="cours-photo" src="photos/' + esc(c.P.photo_accueil) + '" alt="">' : "") +
        '<span class="cours-corps">' +
        '<span class="surtitre">' + esc(c.P.ville) + " · Var</span>" +
        '<span class="cours-titre">' + typo(T(c.P, "titre")) + "</span>" +
        '<span class="cours-meta">' + esc(t("nbEtapes", c.etapes)) + " · ≈ " + esc(c.P.duree_estimee_min || "?") + " " + esc(t("minMeta")) + "</span>" +
        puce +
        '<span class="cours-cta">' + esc(cta) + " ›</span></span></button>";
    }).join("");

    montrer('<header class="accueil-haut"><img src="olivier-badge.svg" width="64" height="64" alt="">' +
      '<p class="surtitre">' + esc(t("siteSous")) + "</p></header>" +
      '<section class="bloc-langue"><p class="surtitre">Langue · Language</p>' +
      '<div class="langues" role="group" aria-label="Langue · Language">' + boutonsLangue + "</div></section>" +
      '<section class="bloc-cours"><h1 class="titre-section">' + esc(t("choisir")) + "</h1>" + cartes + "</section>");
  }

  // Présentation d'un parcours : reprise de partie, ou photo, durée et départ.
  function parcoursIntro() {
    var P = D.parcours, sauve = charger();
    var nbQ = D.etapes.reduce(function (a, e) { return a + e.questions.length; }, 0);
    var h = lienAccueil();

    if (sauve && !sauve.fini) {
      var cran = "";
      for (var i = 0; i < N; i++) cran += '<i class="' + (i < sauve.etape ? "fait" : i === sauve.etape ? "ici" : "") + '"></i>';
      h += '<div class="entete-accueil"><p class="surtitre">' + esc(P.ville) + ' · Var</p><h1 class="titre-accueil">' + typo(T(P, "titre")) + "</h1></div>" +
        '<section class="partie"><p class="surtitre">' + esc(t("partieEnCours")) + "</p>" +
        '<div class="partie-ligne"><p class="grand">' + esc(t("etapeSur", sauve.etape + 1, N)) + '</p><p class="points">' + sauve.score + esc(t("pts")) + "</p></div>" +
        '<div class="jauge" aria-hidden="true">' + cran + "</div>" +
        '<p class="doux">' + esc(t("commencee", quand(sauve.demarre))) + "</p></section>" +
        '<div class="pousse"></div><div class="pile">' +
        '<button class="bouton" data-act="reprendre">' + esc(t("reprendreEtape", sauve.etape + 1)) + "</button>" +
        '<button class="bouton-2" data-act="recommencer">' + esc(t("recommencer")) + "</button></div>";
    } else {
      var desc = T(P, "description");
      h += '<div class="entete-accueil"><p class="surtitre">' + esc(P.ville) + ' · Var</p><h1 class="titre-accueil">' + typo(T(P, "titre")) + "</h1></div>" +
        photo(P.photo_accueil, t("altAccueil")).replace('class="photo"', 'class="photo photo-accueil"') +
        (desc ? '<p class="doux" style="color:#33424A">' + esc(desc) + "</p>" : "") +
        '<div class="meta"><span><b>' + N + "</b> " + esc(t("etapesMeta")) + "</span><span><b>≈ " + esc(P.duree_estimee_min || "?") + "</b> " + esc(t("minMeta")) + "</span><span><b>" + nbQ + "</b> " + esc(t("questionsMeta")) + "</span></div>" +
        '<div class="depart">' + ICONE_LIEU + '<div><p class="surtitre">' + esc(t("depart")) + "</p><p>" + esc(T(P, "depart_description") || t("departAConfirmer")) + "</p></div></div>" +
        '<div class="pousse"></div><div class="pile">' +
        '<button class="bouton" data-act="commencer">' + esc(t("commencer")) + "</button>" +
        (sauve && sauve.fini ? '<button class="bouton-2" data-act="revoir">' + esc(t("revoir")) + "</button>" : "") +
        '<p class="petit doux" style="text-align:center">' + esc(t("pitch")) + "</p></div>";
    }
    montrer(h);
  }

  function avertissement() {
    var texte = T(D.parcours, "avertissement_securite") || t("avantDefaut");
    var lignes = texte.split(/(?<=[.!?])\s+/).filter(Boolean).map(function (l) {
      return '<p class="alerte-ligne">' + esc(l) + "</p>";
    }).join("");
    document.body.classList.add("ecran-bleu");
    app.innerHTML = '<div class="alerte">' +
      '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5 2.8 19.5h18.4z"/><path d="M12 10v4.5"/><circle cx="12" cy="17" r="0.6" fill="#FFFFFF"/></svg>' +
      "<h1>" + esc(t("avant")) + "</h1>" + lignes +
      '<div class="pousse"></div><button class="bouton-blanc" data-act="demarrer">' + esc(t("compris")) + "</button></div>";
    window.scrollTo(0, 0);
  }

  function etape() {
    var e = D.etapes[S.etape], q = e.questions[S.question];
    var h = entete(e);

    h += '<section class="carte-cadre"><div id="carte"></div><button id="agrandir" class="carte-agrandir" data-act="agrandir" aria-label="' + esc(t("agrandirAria")) + '">' + esc(t("agrandir")) +
      '</button><button id="recentrer" class="carte-recentrer" data-act="recentrer" hidden>' + esc(t("recentrer")) +
      '</button><div class="carte-legende"><span>' + esc(t("seuleEtape")) + '</span><strong id="dist">' + esc(t("posInconnue")) + "</strong></div></section>";

    var chemin = T(e, "chemin_description");
    if (chemin) {
      h += '<div class="chemin"><div><p class="surtitre">' + esc(t("pourYAller")) + "</p><p>" + typo(chemin) + "</p></div></div>";
    }

    if (!q) {
      h += '<div class="manque">' + esc(t("manqueQuestion")) + "</div>" +
        '<div class="pousse"></div><button class="bouton" data-act="passer">' + esc(S.etape >= N - 1 ? t("voirScore") : t("etapeSuivante")) + "</button>";
      montrer(h);
      return;
    }

    var qcm = String(q.type).trim() === "qcm";
    var pts = valeur(q, S.essais);
    h += '<section class="panneau"><div><p class="surtitre vert">' + esc(t("vaut", pts, S.essais > 0)) + "</p>" +
      (e.questions.length > 1 ? '<p class="surtitre" style="margin-top:2px">' + esc(t("questionSur", S.question + 1, e.questions.length)) + "</p>" : "") +
      '<h3 class="question" style="margin-top:8px">' + typo(String(T(q, "enonce") || "").trim()) + "</h3></div>";

    if (qcm) {
      var choix = A(q, "choix"), faux = S.fauxIdx || [];
      h += '<div class="choix">' + choix.map(function (c, i) {
        var rate = faux.indexOf(i) !== -1;
        return '<button data-act="choix" data-i="' + i + '"' + (rate ? ' class="faux" disabled' : "") + ">" + esc(c.trim()) + (rate ? ICONE_X : "") + "</button>";
      }).join("") + "</div>";
      if (choix.length < 2) h += '<div class="manque">' + esc(t("manqueQcm")) + "</div>";
    } else {
      h += '<form class="saisie" data-act="valider"><input id="reponse" type="text" placeholder="' + esc(t("votreReponse")) + '" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" aria-label="' + esc(t("votreReponse")) + '"><button type="submit">' + esc(t("valider")) + "</button></form>";
    }

    if (S.essais > 0) {
      var indicesQ = A(q, "indices");
      var indices = indicesQ.slice(0, Math.min(S.essais, indicesQ.length));
      h += '<div class="retour indice"><b>' + esc(t("pasTout")) + "</b></div>";
      indices.forEach(function (txt, i) {
        h += '<div class="retour indice">' + typo(t("indice", i + 1, txt)) + "</div>";
      });
      if (peutReveler(q, S.essais)) {
        h += '<button class="bouton-2" data-act="reveler">' + esc(t("reveler")) + "</button>";
      }
    }
    h += "</section>";
    montrer(h);
  }

  function explication() {
    var e = D.etapes[S.etape], q = e.questions[S.question];
    var dernier = S.question >= e.questions.length - 1;
    var d = S.derniere || { gain: 0, revele: false, essais: 1 };
    var bonne = A(q, "reponses")[0] || "";
    var h = entete(e);

    if (d.revele) {
      h += '<div class="retour juste">' + ICONE_OK + "<div><b>" + esc(t("laReponseGras", bonne)) + "</b> " + esc(t("laReponseReste")) + "</div></div>";
    } else {
      var quand_ = d.essais <= 1 ? t("premierCoup") : t("essaiOrdinal", d.essais);
      h += '<div class="retour juste">' + ICONE_OK + "<div><b>" + esc(t("bonneGras", bonne)) + "</b> " + esc(t("bonneReste", quand_, d.gain)) + "</div></div>";
    }

    // La photo et l'explication appartiennent à la question : elles suivent chaque réponse.
    h += photo(q.image, t("altEtape", S.etape + 1));
    var expl = T(q, "explication");
    if (expl) {
      h += '<section><p class="surtitre vert">' + esc(t("savoir")) + '</p><p class="lecture" style="margin-top:8px">' + typo(expl) + "</p></section>";
    }
    h += '<div class="pousse"></div><button class="bouton" data-act="suite">' +
      esc(!dernier ? t("questionSuivante") : S.etape >= N - 1 ? t("voirScore") : t("etapeSuivante")) + "</button>";
    montrer(h);
  }

  function fin() {
    var lignes = S.detail.map(function (d) {
      // Les parties enregistrées avant la version bilingue gardent le titre français.
      var titre = d.ei != null && D.etapes[d.ei] ? T(D.etapes[d.ei], "titre") : d.etape;
      return '<div class="detail-ligne"><span>' + esc(titre) + (d.nq > 1 ? " · q" + d.q : "") + "</span><span>" +
        esc(d.revele ? t("revelee") : t("essai", d.essais)) + " · <b>" + d.pts + "</b></span></div>";
    }).join("");
    montrer(lienParcours() + '<div class="fin-haut">' +
      '<img class="badge-olivier" src="olivier-badge.svg" width="132" height="132" alt="' + esc(t("badgeAlt")) + '">' +
      "<h1>" + esc(t("finTitre")) + "</h1>" +
      '<div class="score-grand"><b>' + S.score + "</b><span>" + esc(t("surPoints", scoreMax())) + "</span></div></div>" +
      '<section class="detail"><p class="surtitre" style="padding-bottom:8px">' + esc(t("detail")) + "</p>" + lignes + "</section>" +
      '<div class="pousse"></div><button class="bouton" data-act="rejouer">' + esc(t("rejouer")) + "</button>");
  }

  /* ----------------------------------------------------------------- carte */

  var carte = null, marqueurMoi = null, halo = null, cible = null, precedent = null;
  var manuel = false;        // le joueur a déplacé ou zoomé la carte lui-même
  var cadrageAuto = false;   // vrai pendant un recadrage fait par le jeu
  var dernierCadrage = 0;
  var delaiCadrage = null;   // recadrage différé, pour ne pas bouger la carte à chaque point GPS

  function point(e) { return [Number(e.latitude), Number(e.longitude)]; }

  function monterCarte() {
    var el = document.getElementById("carte");
    if (carte) { carte.remove(); carte = null; marqueurMoi = null; halo = null; }
    clearTimeout(delaiCadrage); delaiCadrage = null;
    if (!el) return;
    if (!window.L) { el.innerHTML = '<p class="carte-off">' + esc(t("carteOff")) + "</p>"; return; }

    var P = D.parcours, e = D.etapes[S.etape];
    var depart = (P.depart_latitude != null && P.depart_longitude != null)
      ? [Number(P.depart_latitude), Number(P.depart_longitude)] : null;
    cible = { lat: Number(e.latitude), lng: Number(e.longitude) };
    // Le point de départ du parcours est la première étape : on ne dessine pas un départ à part.
    var premiere = D.etapes[0];
    if (depart && distance({ lat: depart[0], lng: depart[1] }, { lat: Number(premiere.latitude), lng: Number(premiere.longitude) }) < 15) depart = null;
    precedent = S.etape > 0 ? point(D.etapes[S.etape - 1]) : depart;
    manuel = false;
    montrerRecentrer(false);

    carte = L.map(el, { zoomControl: false, attributionControl: true });
    carte.attributionControl.setPrefix(false);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(carte);

    if (depart) {
      L.circleMarker(depart, { radius: 6, color: "#25577F", weight: 3, fillColor: "#FFFFFF", fillOpacity: 1 }).addTo(carte);
    }
    // Seules les étapes déjà franchies et la suivante apparaissent. Les trajets faits sont en trait
    // plein pâle ; le trajet à faire est en pointillé bleu épais, calé sur les rues.
    for (var i = 0; i <= S.etape; i++) {
      var s = D.etapes[i], courante = i === S.etape;
      var avant = i > 0 ? point(D.etapes[i - 1]) : depart;
      var ligne = (s.trace && s.trace.length > 1) ? s.trace : (avant ? [avant, point(s)] : null);
      if (ligne) {
        L.polyline(ligne, courante
          ? { color: "#25577F", weight: 5, opacity: 0.95, dashArray: "1 9", lineCap: "round" }
          : { color: "#9DB7CC", weight: 4 }).addTo(carte);
      }
      L.marker(point(s), { icon: L.divIcon({
        className: "", iconSize: [28, 28], iconAnchor: [14, 14],
        html: courante ? '<div class="pin pin-cible">' + (i + 1) + "</div>" : '<div class="pin pin-ok">✓</div>'
      }), keyboard: false, zIndexOffset: courante ? 1000 : 0 }).addTo(carte);
    }

    // Dès que le joueur touche la carte, on cesse de la recadrer à sa place.
    // Seuls les vrais gestes comptent (glisser, molette, double toucher, pincement) : le zoom
    // automatique de la carte, lui, ne doit jamais faire apparaître « Recentrer ».
    function geste() { manuel = true; montrerRecentrer(true); }
    carte.on("dragstart", geste);
    el.addEventListener("wheel", geste, { passive: true });
    el.addEventListener("dblclick", geste);
    el.addEventListener("touchstart", function (ev) { if (ev.touches && ev.touches.length > 1) geste(); }, { passive: true });
    carte.on("moveend", function () { cadrageAuto = false; });

    cadrer(false);
    majPosition();
  }

  // Cadre la carte sur le trajet à faire : de la position du joueur (si elle est dans le village)
  // ou de l'étape précédente, jusqu'au lieu de la question.
  function cadrer(anime) {
    if (!carte || !cible) return;
    var pts;
    if (pos && distance(pos, cible) < 800) {
      pts = [[pos.lat, pos.lng], [cible.lat, cible.lng]];
    } else {
      var trace = D.etapes[S.etape].trace;
      pts = (trace && trace.length > 1) ? trace.slice() : (precedent ? [precedent] : []);
      pts.push([cible.lat, cible.lng]);
    }
    carte.invalidateSize(false);   // la taille a pu changer (rotation, barre d'adresse) : on la relit avant de cadrer
    var taille = carte.getSize();
    if (!taille.x || !taille.y) return;   // carte pas encore affichée : un cadrage ici dézoomerait sur le monde entier
    cadrageAuto = true;
    dernierCadrage = Date.now();
    setTimeout(function () { cadrageAuto = false; }, 800);   // filet : si la vue ne bouge pas, moveend ne vient pas
    if (pts.length === 1) carte.setView(pts[0], 18, { animate: !!anime });
    else carte.fitBounds(L.latLngBounds(pts).pad(0.35), { maxZoom: 19, animate: !!anime });
  }

  // Carte en grand : elle prend tout l'écran, avec un bouton pour revenir.
  var plein = false;
  function basculerPlein(oui) {
    var cadre = document.querySelector(".carte-cadre");
    if (!cadre) return;
    plein = oui === undefined ? !plein : oui;
    cadre.classList.toggle("plein", plein);
    document.body.classList.toggle("carte-ouverte", plein);
    var b = document.getElementById("agrandir");
    if (b) { b.textContent = plein ? t("reduire") : t("agrandir"); b.setAttribute("aria-label", plein ? t("reduireAria") : t("agrandirAria")); }
    if (carte) setTimeout(function () { carte.invalidateSize(); if (!manuel) cadrer(false); }, 60);
  }
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && plein) basculerPlein(false); });

  function montrerRecentrer(oui) {
    var b = document.getElementById("recentrer");
    if (b) b.hidden = !oui;
  }

  function formaterDistance(m) {
    if (m >= 1000) {
      var km = (m / 1000).toFixed(1);
      return (lang === "fr" ? km.replace(".", ",") : km) + " km";
    }
    return Math.round(m) + " m";
  }

  function majLegende() {
    var d = document.getElementById("dist");
    if (!d) return;
    if (pos && cible) d.textContent = formaterDistance(distance(pos, cible)) + " · " + cap(pos, cible);
    else if (gps === "refuse") d.textContent = t("locRefusee");
    else d.textContent = t("posInconnue");
  }

  function majPosition() {
    majLegende();
    if (!pos || !carte) return;
    var ll = [pos.lat, pos.lng], rayon = Math.max(8, Math.min(pos.prec || 0, 80));
    if (!marqueurMoi) {
      halo = L.circle(ll, { radius: rayon, stroke: false, fillColor: "#25577F", fillOpacity: 0.16 }).addTo(carte);
      marqueurMoi = L.circleMarker(ll, { radius: 7, color: "#FFFFFF", weight: 3, fillColor: "#25577F", fillOpacity: 1 }).addTo(carte);
      if (!manuel) cadrer(true);   // première position : on cadre tout de suite
    } else {
      marqueurMoi.setLatLng(ll);
      halo.setLatLng(ll);
      halo.setRadius(rayon);
      if (!manuel) {
        var ecoule = Date.now() - dernierCadrage;
        if (ecoule > 5000) cadrer(true);
        else if (!delaiCadrage) {
          // trop tôt : on recadrera sur la dernière position connue dès que le délai est écoulé
          delaiCadrage = setTimeout(function () { delaiCadrage = null; if (!manuel && carte) cadrer(true); }, 5000 - ecoule);
        }
      }
    }
  }

  /* ------------------------------------------------------------ navigation */

  function montrer(html) {
    document.body.classList.remove("ecran-bleu");
    plein = false;
    document.body.classList.remove("carte-ouverte");
    app.innerHTML = html;
    if (document.getElementById("carte")) monterCarte();
    window.scrollTo(0, 0);
  }

  function aller(ecran) { S.ecran = ecran; sauver(); rendre(); }

  function rendre() {
    if (!S) return parcoursIntro();
    if (S.ecran === "explication") return explication();
    if (S.ecran === "fin") return fin();
    return etape();
  }

  function finQuestion(gain, revele, essais) {
    S.derniere = { gain: gain, revele: revele, essais: essais };
    aller("explication");
  }

  function repondre(texte, idx) {
    var e = D.etapes[S.etape], q = e.questions[S.question];
    if (!String(texte).trim()) return;
    if (estJuste(q, texte)) {
      var gain = valeur(q, S.essais);
      S.score += gain;
      S.detail.push({ ei: S.etape, etape: e.titre_fr, q: S.question + 1, nq: e.questions.length, pts: gain, essais: S.essais + 1 });
      finQuestion(gain, false, S.essais + 1);
    } else {
      S.essais += 1;
      S.faux.push(norm(texte));
      if (idx != null) { S.fauxIdx = S.fauxIdx || []; S.fauxIdx.push(idx); }   // par rang : reste juste si la langue change
      sauver();
      etape();
    }
  }

  function suite() {
    var e = D.etapes[S.etape];
    S.essais = 0; S.faux = []; S.fauxIdx = []; S.derniere = null;
    if (S.question < e.questions.length - 1) { S.question += 1; return aller("etape"); }
    passer();
  }

  function passer() {
    S.question = 0; S.essais = 0; S.faux = []; S.fauxIdx = []; S.derniere = null;
    S.etape += 1;
    if (S.etape >= N) { S.etape = N - 1; S.fini = true; return aller("fin"); }
    aller("etape");
  }

  /* ----------------------------------------------------------- événements */

  app.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-act]");
    if (!b || b.tagName === "FORM") return;
    var act = b.getAttribute("data-act");

    if (act === "langue") { fixerLangue(b.getAttribute("data-l")); return accueilGlobal(); }
    if (act === "parcours") { return parcoursIntro(); }
    if (act === "home") { return accueilGlobal(); }        // la partie reste sauvegardée
    if (act === "intro") { return parcoursIntro(); }       // retour à la présentation du parcours (reprise de partie)
    if (act === "agrandir") { return basculerPlein(); }
    if (act === "recentrer") { manuel = false; montrerRecentrer(false); return cadrer(true); }
    if (act === "commencer") { return avertissement(); }
    if (act === "demarrer") { S = neuve(); sauver(); suivre(); return aller("etape"); }
    if (act === "reprendre") { S = charger(); suivre(); return rendre(); }
    if (act === "recommencer") {
      if (window.confirm(t("confirmRecommencer"))) { oublier(); return avertissement(); }
      return;
    }
    if (act === "revoir") { S = charger(); return rendre(); }
    if (act === "choix") {
      var q = D.etapes[S.etape].questions[S.question];
      var i = Number(b.getAttribute("data-i"));
      return repondre(A(q, "choix")[i], i);
    }
    if (act === "reveler") {
      var e = D.etapes[S.etape];
      S.detail.push({ ei: S.etape, etape: e.titre_fr, q: S.question + 1, nq: e.questions.length, pts: 0, essais: S.essais, revele: true });
      return finQuestion(0, true, S.essais);
    }
    if (act === "suite") return suite();
    if (act === "passer") return passer();
    if (act === "rejouer") { oublier(); S = null; return parcoursIntro(); }
  });

  app.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var champ = document.getElementById("reponse");
    if (champ) repondre(champ.value);
  });

  /* ------------------------------------------------------------- démarrage */

  S = null;
  fixerLangue(lang);
  accueilGlobal();
})();
