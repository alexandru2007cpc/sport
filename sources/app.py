import json
import csv
from flask import Flask, render_template, request, redirect, session, url_for
import json
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt


app = Flask(__name__)
app.secret_key = 'trophe_nsi2024'  


def filtrage(discipline, tranche_age, quartier, table):
    """
    Recoit en paramètre les critère de l'utilisateur pour son club de sport sur Toulouse et la table de donnees des clubs de sport de Toulouse
    Renvoie sous la forme d une liste, les listes d informations des villes répondant à ses critères
    """
    clubs_potentiels = []

    for i in range(1,len(table)):
        discipline_copie = discipline
        if discipline_copie == " ":
            discipline_copie = table[i][0]

        quartier_copie = quartier
        if quartier_copie == " ":
            quartier_copie = table[i][3]

        if tranche_age != " ":
            if table[i][0].lower() == discipline_copie.lower() and table[i][3].lower() == quartier_copie.lower() and table[i][11][tranche_age] == "Oui":
                clubs_potentiels.append(table[i])
        else:
            if table[i][0].lower() == discipline_copie.lower() and table[i][3].lower() == quartier_copie.lower():
                clubs_potentiels.append(table[i])

    return clubs_potentiels


def creationGrapheCirculaire(fed, age, sexe, region, tt_licensie, prop, table):

    #Compte ensemble
    #creation de dictionnaire ou on compte le nombre de licensies pour chaque categorie pour faire la proportion par la suite avec nbrEnsemble 
    ensemble = {}
    nbrEnsemble = 0
    id_prop = 0

    if prop == 'age':
        id_prop = 8
    if prop == 'region':
        id_prop = 9
    if prop == 'sexe':
        id_prop = 5
    
    if tt_licensie == 'true':
        for typeLicensie in range(1, len(table)):
            nbrEnsemble += int(table[typeLicensie][11])
            option_prop = table[typeLicensie][id_prop]
            if option_prop not in ensemble.keys():
                ensemble[option_prop] = int(table[typeLicensie][11])
            else:
                ensemble[option_prop] += int(table[typeLicensie][11])
    else:
        for typeLicensie in range(1, len(table)):
            if (table[typeLicensie][5] == sexe or sexe == '') and (table[typeLicensie][8] == age or age == '') and (table[typeLicensie][9] == region or region == '') and (table[typeLicensie][3] == fed or fed == ''):
                nbrEnsemble += int(table[typeLicensie][11])
                option_prop = table[typeLicensie][id_prop]
                if option_prop not in ensemble.keys():
                    ensemble[option_prop] = int(table[typeLicensie][11])
                else:
                    ensemble[option_prop] += int(table[typeLicensie][11])

    categories = ensemble.keys()
    proportions = [value / nbrEnsemble for value in ensemble.values()]
    
    plt.figure(figsize=(10, 10))
    plt.pie(proportions, labels=categories, autopct='%1.1f%%', startangle=140)
    plt.axis('equal')
    plt.title('Répartition des licences par {}'.format(prop))
    plt.savefig('static/mon_plot.png')


def creationVisualisation( fed, age, sexe, region, tt_licensie, prop, table):
    """
    Recoit en paramètre le type de graphe et les parametres choisit par l'utilisateur
    Renvoi la visualisation demandee avec pyplot
    """
    creationGrapheCirculaire(fed, age, sexe, region, tt_licensie, prop, table)



# Construction d une table de données a partir d un fichier au format csv
f = open("csv/l'annuaire-des-associations-et-clubs-sportifs@toulouse-metropole.csv","r",encoding="utf8")
leslignes = csv.reader(f)

# Construction de la liste qui contient les lignes du fichier csv
table = []
for lignes in leslignes:
    table.append(lignes)
f.close()

# transformation des colonnes 9 à 15 en une seule colonne tranche d age qui est un dictionnaire 
# avec comme cle les differentes tranches d age (0-3ans, 3-6ans, 6-12ans...)
# avec comme valeur "Oui" ou "Non"
tranche_age = {"0-3ans":" ", "3-6ans":" ", "6-12ans":" ", "12-15ans":" ", "juniors16-20ans":" ", "adultes":" ", "seniors":" "}

for ligne in range(1,len(table)):
    tranche_age = {
        "0-3ans": table[ligne][9],
        "3-6ans": table[ligne][10],
        "6-12ans": table[ligne][11],
        "12-15ans": table[ligne][12],
        "juniors16-20ans": table[ligne][13],
        "adultes": table[ligne][14],
        "seniors": table[ligne][15]
    }
    del table[ligne][9:17]
    table[ligne].append(tranche_age)


f2 = open("csv/Lics_2022.csv", "r", encoding="utf8")
leslignes2 = csv.reader(f2, delimiter=';')
table2 = []
for lignes in leslignes2:
    table2.append(lignes)
f2.close()


# Creation routes Flask
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test', methods=['POST'])
def test():
    output = request.get_json()
    parametres = json.loads(output)
    age, discipline, quartier = parametres["age"], parametres["discipline"], parametres["quartier"]
    resultatRecherche = filtrage(discipline, age, quartier, table)
    session['resultatRecherche'] = resultatRecherche
    return redirect(url_for('choixClub'))
    
@app.route('/choixClub')
def choixClub():
    resultatRecherche = session.get('resultatRecherche')  # Retrieve the result from session
    return render_template('choixClub.html', resultatRecherche=resultatRecherche)

@app.route('/',  methods=['POST'])
def club_details():
    discipline = request.form["discipline"]
    nom = request.form["nom"]
    quartier = request.form["quartier"]
    complexe = request.form["complexe"]
    rue = request.form["rue"]
    geolocalisation = request.form["geolocalisation"]
    site = request.form["site"]
    return render_template('clubDetails.html', club=[discipline, nom, site, quartier, complexe, rue, geolocalisation ])

@app.route('/visualise',methods = ['GET', 'POST'] )
def visualise():

    #obtenir les options
    regions = []
    federations = []
    age = []

    for licensie in table2:
        if licensie[3] not in federations:
            federations.append(licensie[3])
        if licensie[9] not in regions:
            regions.append(licensie[9])
        if licensie[8] not in age:
            age.append(licensie[8]) 

    if request.method == 'POST':
        categorie_age = request.form['categorie_age']
        sexe = request.form['sexe']
        federation = request.form['federation']
        region = request.form['region']
        tt_licensies = request.form['ensemble_x_selected']
        proportions_en_fonction_de = request.form['categorie_proportions']

        creationVisualisation(federation, categorie_age, sexe, region, tt_licensies, proportions_en_fonction_de, table2)
        return render_template('visualise.html', plot_url = 'static/mon_plot.png', listeRegions = regions, listeFed = federations, listeAge = age,  )
    else:
        return render_template('visualise.html',listeRegions = regions, listeFed = federations, listeAge = age,  )


if __name__ == '__main__':
    app.run(debug=True)

