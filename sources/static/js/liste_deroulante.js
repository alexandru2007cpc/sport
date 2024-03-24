// Sélection des éléments HTML
// Sélection des éléments du DOM pour les tranches d'âge
const bouton_dropdown = document.querySelector(".class1");
const choix_btn_age = document.getElementById("choix-btn_age");
const options_age = document.getElementById("options_age");
const rechercherInput_age = document.getElementById("input_age");

// Sélection des éléments du DOM pour les quartiers
const bouton_dropdown3 = document.querySelector(".class3");
const choix_btn_quartier = document.getElementById("choix-btn_quartier");
const options_quartier = document.getElementById("options_quartier");
const rechercherInput_quartier = document.getElementById("input_quartier");

// Sélection des éléments du DOM pour les disciplines
const bouton_dropdown1 = document.querySelector(".class2");
const choix_btn_discipline = document.getElementById("choix-btn_discipline");
const options_discipline = document.getElementById("options_discipline");
const rechercherInput_discipline = document.getElementById("input_discipline");


// Données pour les tranches d'âge, quartiers et disciplines
let tranches_age = ["0-3ans", "3-6ans", "6-12ans", "12-15ans", "juniors16-20ans", "adultes", "seniors"];
let quartiers = ['Rangueil - CHR - Facultés', 'Juncasse - Argoulets', 'Les Pradettes', 'Minimes', '', 'Arnaud Bernard', 'Sauzelong - Rangueil', 'Côte Pavée', "Patte d'Oie", 'Sept Deniers', 'Casselardit', 'Ramier', 'Montaudran Lespinet', 'Matabiau', 'Saint Aubin - Dupuy', 'Les Izards', 'Roseraie', 'Pont des Demoiselles', 'Ginestous', 'Barrière de Paris', "Château de L'Hers", 'Saint Cyprien', 'Gramont', 'Bonnefoy', 'Jules Julien', 'Croix Daurade', 'Croix de Pierre', 'Le Busca', 'Guilheméry', 'Bellefontaine', 'Saint Michel', 'La Fourguette', 'Saint Simon', 'La Terrasse', 'Purpan', 'Bagatelle', 'Mirail Université', 'Faourette', 'Papus', 'Amidonniers', 'Lalande', 'Les Chalets', 'Lardenne', 'Empalot', 'Compans', 'Marengo Jolimont', 'Reynerie', 'Fontaine Lestang', 'La Cépière', 'Saint Martin du Touch', "Zones d'activités sud", 'Pouvourville', 'Carmes'];
let disciplines = ['VOL RADIO COMMANDE', 'AIKIDO', 'BASKET-BALL', 'BOWLING', 'CYCLOTOURISME', 'gymnastique volontaire', 'équitation', 'plongée', 'FOOTBALL', 'gymnastique artistique', 'karaté', 'NIHON TAI-JITSU', 'randonnée', 'BOXE THAILANDAISE / MUAY THAI', 'pelote basque', 'pétanque', 'randonnée Pédestre', 'BOULES LYONNAISES', 'BEACH VOLLEY', 'POLO', 'MUSCULATION - HALTEROPHILIE', 'JUDO ADAPTE', 'Karting handisport', 'lutte', 'ESCALADE', 'AQUAGYM', 'retraite sportive', 'tae kwon do', 'taï chi chuan/Qi Gong', 'tennis', 'tennis de table', 'planche à voile', 'YOGA', 'ATHLETISME hors stade', 'CYCLISME SUR ROUTE', 'CAPOEIRA', "COURSE D'ORIENTATION", 'éveil à la danse', 'FOOTBALL GAELIQUE', 'full contact', 'handball', 'NATATION', 'WATER-POLO', 'jeu provençal', 'roller', 'BOXE FRANCAISE', 'ski nautique', 'tir sportif', 'duathlon et triathlon', 'wushu', 'VIET VO DAO', 'DANSE INDIENNE - BOLLYWOOD', 'quilles de huit', 'CIRQUE', 'ATHLETISME ADAPTE (EN STADE)', 'kung-Fu', 'éveil aquatique', 'rugby', 'savate', 'ski de fond', 'BADMINTON', 'escrime', 'football américain', 'ALPINISME', 'NATATION SYNCHRONISEE', 'snowboard (surf des neiges)', 'patinage artistique', 'VOLLEY BALL', 'AVIRON', 'CANOE-KAYAK', 'VTT', 'échecs', 'frisbee', 'VOILE', 'JUDO', 'CANYONISME', 'CANNE SPORTIVE ET BATON', 'kick boxing', 'spéléologie', 'AUTOMOBILE', 'squash', 'ULM et voltige', 'DANSE DE SALON / DANSE PAR COUPLES', 'KINOMICHI METHODE NORO', 'Raquette à neige', 'sauvetage et secourisme', 'SHINTAIDO/KENKO TAISO', 'DANSE SUR GLACE', 'BOJUTSU', 'VOL LIBRE', 'nage avec palmes', 'éveil à la gym', 'hochey sur gazon', 'hockey sur glace', 'marche', 'PATINAGE ARTISTIQUE A ROULETTES', 'hockey', 'ski alpin', "tir à l'arc", 'DANSE AFRICAINE', 'danses artistiques', 'football féminin', 'gymnastique forme et loisirs', 'gymnastique rytmique', 'TORBALL', 'kendo', 'sambo', 'BALLET SUR GLACE', 'taiso', 'AEROMODELISME', 'COURSE A PIED', 'FOOT EN SALLE', 'gymnastique acrobatique', 'Football adapté', 'rugby à XIII', 'Qi Gong', 'Télémark', 'MODERN JAZZ', 'OMNISPORT', 'BALL-TRAP', 'BILLARD', 'DANSE ORIENTALE', 'SPORT EN MILIEU RURAL', 'golf', 'KENJUTSU', 'BOXE ANGLAISE', 'BASEBALL', 'motocyclisme', 'parapente', 'TRAMPOLINE', 'DANSE ADAPTEE', 'handbike', 'footing', 'SONMUDO', 'paintball', 'CHEERLEADING', 'hockey subaquatique', 'ski de randonnée', 'DAMES', 'CHASSE SOUS-MARINE', 'football australien', 'Skate board', 'CYCLO-CROSS', 'KALARIPPAYAT', 'TUMBLING', 'taichindo']

// Variables pour stocker les sélections
let age_selectionné = " "; // Initialisation avec une valeur par défaut
let discipline_selectionnée = " "; // Initialisation avec une valeur par défaut
let quartier_selectionné = " "; // Initialisation avec une valeur par défaut


// Fonctions pour mettre à jour les sélections affichées
// Fonction pour afficher les tranches d'âge avec mise à jour de la sélection
function sélectionParamètreAge(age_selectionné) {
    options_age.innerHTML = '';
    tranches_age.forEach(age => {
        let estSélectionné = age == age_selectionné ? "sélectionné": "";
        let li = `<li onclick='majElement(this)' class="${estSélectionné}">${age}</li>`;
        options_age.insertAdjacentHTML("beforeend", li);
    });
}
// Fonction pour afficher les disciplines avec mise à jour de la sélection
function sélectionParamètreDiscipline(discipline_selectionnée) {
    options_discipline.innerHTML = '';
    disciplines.forEach(discipline => {
        let estSélectionné = discipline == discipline_selectionnée ? "sélectionné": "";
        let li = `<li onclick='majElement1(this)' class="${estSélectionné}">${discipline}</li>`;
        options_discipline.insertAdjacentHTML("beforeend", li);
    });
}
// Fonction pour afficher les quartiers avec mise à jour de la sélection
function sélectionParamètreQuartier(quartier_selectionné) {
    options_quartier.innerHTML = '';
    quartiers.forEach(quartier => {
        let estSélectionné = quartier == quartier_selectionné ? "sélectionné": "";
        let li = `<li onclick='majElement3(this)' class="${estSélectionné}">${quartier}</li>`;
        options_quartier.insertAdjacentHTML("beforeend", li);
    });
}


// Initialisation des sélections 
sélectionParamètreAge()
sélectionParamètreDiscipline()
sélectionParamètreQuartier()


// Fonctions pour mettre à jour les sélections et les champs d'entrée
function majElement(li_sélectionné){
    rechercherInput_age.value = "";
    age_sélectionné = li_sélectionné.innerText;
    sélectionParamètreAge(li_sélectionné.innerText);
    bouton_dropdown.classList.remove("active");
    choix_btn_age.firstElementChild.innerText = li_sélectionné.innerText;
}
function majElement1(li_sélectionné){
    rechercherInput_discipline.value = "";
    discipline_selectionnée = li_sélectionné.innerText;
    sélectionParamètreDiscipline(li_sélectionné.innerText);
    bouton_dropdown1.classList.remove("active");
    choix_btn_discipline.firstElementChild.innerText = li_sélectionné.innerText;
}
function majElement3(li_sélectionné){
    rechercherInput_quartier.value = "";
    quartier_selectionné = li_sélectionné.innerText;
    sélectionParamètreQuartier(li_sélectionné.innerText);
    bouton_dropdown3.classList.remove("active");
    choix_btn_quartier.firstElementChild.innerText = li_sélectionné.innerText;
}


// Écouteurs d'événements pour les champs de recherche
rechercherInput_age.addEventListener("keyup", () => {
    let liste = [];
    let valRechercher = rechercherInput_age.value.toLowerCase();
    liste = tranches_age.filter(data => {
        return data.toLowerCase().startsWith(valRechercher);
    }).map(data => `<li onclick="majElement(this)">${data}</li>`).join("");
    options_age.innerHTML = liste ? liste : `<p>Ooops tranche d'age pas trouvée</p>` ;
});
rechercherInput_discipline.addEventListener("keyup", () => {
    let liste = [];
    let valRechercher = rechercherInput_discipline.value.toLowerCase();
    liste = disciplines.filter(data => {
        return data.toLowerCase().startsWith(valRechercher);
    }).map(data => `<li onclick="majElement1(this)">${data}</li>`).join("");
    options_discipline.innerHTML = liste ? liste : `<p>Ooops tranche d'age pas trouvée</p>` ;
});
rechercherInput_quartier.addEventListener("keyup", () => {
    let liste = [];
    let valRechercher = rechercherInput_quartier.value.toLowerCase();
    liste = quartiers.filter(data => {
        return data.toLowerCase().startsWith(valRechercher);
    }).map(data => `<li onclick="majElement3(this)">${data}</li>`).join("");
    options_quartier.innerHTML = liste ? liste : `<p>Ooops tranche d'age pas trouvée</p>` ;
});


// Écouteurs d'événements pour les boutons de sélection
choix_btn_age.addEventListener("click", () => {
    bouton_dropdown.classList.toggle("active");
});
choix_btn_discipline.addEventListener("click", () => {
    bouton_dropdown1.classList.toggle("active");
});
choix_btn_quartier.addEventListener("click", () => {
    bouton_dropdown3.classList.toggle("active");
});


// Fonction pour rediriger vers une autre page après la sélection
function redirectionnerAutrePage() {
    // Appeler la fonction pour envoyer les valeurs
    envoyerValeursSelectionneesPython();
}

// Fonction pour envoyer les valeurs sélectionnées au serveur via une requête AJAX
function envoyerValeursSelectionneesPython() {
    // Création d'un objet contenant les valeurs sélectionnées
    const valeursSelectionnees = {
        age: age_selectionné,
        discipline: discipline_selectionnée,
        quartier: quartier_selectionné,
    };

    // Conversion de l'objet en chaîne JSON
    const s = JSON.stringify(valeursSelectionnees);
    console.log(s);

    // Configuration de la requête AJAX
    $.ajax({
        url: "/test",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(s),
        success: function(response) {
            // Rediriger vers une autre page après une requête AJAX réussie
            window.location.href = "/choixClub"; 
        },
        error: function(xhr, status, error) {
            // Gérer les erreurs si nécessaire
            console.error(xhr, status, error);
        }
    });
}



