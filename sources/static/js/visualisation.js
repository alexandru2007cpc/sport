// Fonction pour basculer l'affichage des options en fonction de leur état actuel (affiché ou caché)
function basculerOptions(nomOption) {
    var optionsDiv = document.getElementById(nomOption + "_options");
    if (optionsDiv.style.display === "none") {
        optionsDiv.style.display = "block"; // Afficher l'option si elle est cachée
    } else {
        optionsDiv.style.display = "none"; // Cacher l'option si elle est affichée
    }
}

// Fonction pour basculer la sélection d'une option et gérer son état (actif ou inactif)
function basculerSelectionOption(idBouton, nomOption) {
    var bouton = document.getElementById(idBouton);
    if (!bouton.classList.contains("actif")) { // Vérifier si le bouton n'est pas déjà actif
        // Si le bouton cliqué est "Ensemble X", masquer les autres boutons
        if (idBouton === "ensemble_x_btn") {
            document.querySelectorAll('.toggle-btn').forEach(function(btn) {
                if (btn.id !== idBouton) {
                    btn.style.display = "none"; // Masquer les autres boutons
                    btn.classList.remove("actif"); // Retirer la classe "actif"
                    var autreNomOption = btn.id.slice(0, -4) + "_options"; // Nom de l'autre option à cacher
                    var autreOptionDiv = document.getElementById(autreNomOption);
                    if (autreOptionDiv) {
                        autreOptionDiv.style.display = "none"; // Cacher l'autre option
                    }
                }
            });
        }
        bouton.classList.add("actif"); // Ajouter la classe "actif" au bouton cliqué
        basculerOptions(nomOption); // Appeler la fonction pour basculer l'affichage des options
    } else {
        // Si le bouton cliqué est "Ensemble X" et maintenant désactivé, afficher les autres boutons
        if (idBouton === "ensemble_x_btn") {
            document.querySelectorAll('.toggle-btn').forEach(function(btn) {
                if (btn.id !== idBouton) {
                    btn.style.display = "inline-block"; // Afficher les autres boutons
                    btn.classList.remove("inactif"); // Retirer la classe "inactif"
                    var autreNomOption = btn.id.slice(0, -4) + "_options"; // Nom de l'autre option à afficher
                    var autreOptionDiv = document.getElementById(autreNomOption);
                    if (autreOptionDiv) {
                        autreOptionDiv.style.display = "none"; // Cacher l'autre option
                    }
                }
            });
        }
        bouton.classList.remove("actif"); // Retirer la classe "actif" du bouton cliqué
        basculerOptions(nomOption); // Appeler la fonction pour basculer l'affichage des options
    }
}

// Écouteurs d'événements pour chaque bouton d'option
document.getElementById("ensemble_x_btn").addEventListener("click", function() {
    basculerSelectionOption("ensemble_x_btn", "ensemble_x");
});

document.getElementById("critere_age_btn").addEventListener("click", function() {
    basculerSelectionOption("critere_age_btn", "critere_age");
    if (!document.getElementById("critere_age_btn").classList.contains("actif")) {
        document.getElementById("categorie_age").value = ""; // Effacer la valeur de la catégorie d'âge si le bouton n'est pas actif
    }
});

document.getElementById("critere_sexe_btn").addEventListener("click", function() {
    basculerSelectionOption("critere_sexe_btn", "critere_sexe");
    if (!document.getElementById("critere_sexe_btn").classList.contains("actif")) {
        document.getElementById("sexe").value = ""; // Effacer la valeur du sexe si le bouton n'est pas actif
    }
});

document.getElementById("critere_federation_btn").addEventListener("click", function() {
    basculerSelectionOption("critere_federation_btn", "critere_federation");
    if (!document.getElementById("critere_federation_btn").classList.contains("actif")) {
        document.getElementById("federation").value = ""; // Effacer la valeur de la fédération si le bouton n'est pas actif
    }
});

document.getElementById("critere_region_btn").addEventListener("click", function() {
    basculerSelectionOption("critere_region_btn", "critere_region");
    if (!document.getElementById("critere_region_btn").classList.contains("actif")) {
        document.getElementById("region").value = ""; // Effacer la valeur de la région si le bouton n'est pas actif
    }
});

// Activer les options sélectionnées dans la sélection de proportion lorsque les options sont désélectionnées dans la sélection d'ensemble
document.querySelectorAll('.toggle-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var ensembleSelectionne = document.querySelector('.toggle-btn.actif');
        if (!ensembleSelectionne) {
            document.querySelectorAll('#categorie_proportions option').forEach(function(option) {
                option.disabled = false; // Activer toutes les options si aucun ensemble n'est sélectionné
            });
        } else {
            document.querySelectorAll('#categorie_proportions option').forEach(function(option) {
                if (option.value === btn.id.slice(8, -4)) {
                    option.disabled = true; // Désactiver les options correspondant aux critères sélectionnés
                }
            });
        }
    });
});

// Activer toutes les options dans la sélection de proportion lorsque "Ensemble X" est sélectionné
document.getElementById('ensemble_x_btn').addEventListener('click', function() {
    document.querySelectorAll('#categorie_proportions option').forEach(function(option) {
        option.disabled = false; // Activer toutes les options si "Ensemble X" est sélectionné
    });
});

// Réinitialiser les valeurs des critères et inverser le booléen pour "Ensemble X" lorsqu'il est cliqué
document.getElementById('ensemble_x_btn').addEventListener('click', function () {
    document.getElementById('categorie_age').value = ''; // Réinitialiser la valeur de la catégorie d'âge
    document.getElementById('sexe').value = ''; // Réinitialiser la valeur du sexe
    document.getElementById('federation').value = ''; // Réinitialiser la valeur de la fédération
    document.getElementById('region').value = ''; // Réinitialiser la valeur de la région

    var ensembleXInput = document.getElementById('ensemble_x_selected');
    if (ensembleXInput.value === 'true') {
        ensembleXInput.value = 'false'; // Inverser la valeur du booléen pour "Ensemble X"
    } else {
        ensembleXInput.value = 'true';
    }
});
