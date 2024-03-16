let billettArray = [];
let i=0;

function kjop() {
    //Inputfeltene
    const filmer = document.getElementById("filmer") // Gir et array av tilgjengelige filmer
    const filmInn = filmer.options[filmer.selectedIndex].value; //Henter valgt film
    const antallInn = document.getElementById("antall").value;
    const fornavnInn = document.getElementById("fornavn").value;
    const etternavnInn = document.getElementById("etternavn").value;
    const nrInn = document.getElementById("nr").value;
    const epostInn = document.getElementById("e-post").value;

    const inputVerdier = document.querySelectorAll("input");

    // Resetter hver inputfelt sin "output"-melding
    for (let verdi of inputVerdier) {
        document.getElementById(verdi.id + "-1").innerHTML = "";
    }
    document.getElementById("filmer-1").innerHTML = "";

    let feltFylt = true;

    // Sjekker om inputfeltene + dropdown er tomme, og om de er gyldige
    for (let verdi of inputVerdier) {
        let utFelt = document.getElementById(verdi.id + "-1") //Output "error" felt
        let ut = ""
        // Sjekker om antallet er mindre eller lik null
        if ((verdi.id == "antall" && verdi.value <= 0) ||
            // Sjekker blant annet om e-posten ikke begynner på @
            (verdi.id == "e-post" && !verdi.value.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)) ||
            //RegEx sjekker at nummeret ikke begynner på 0 og deretter etterfulgt av 7 sifre
            (verdi.id == "nr" && !verdi.value.match(/^[1-9]\d{7}/))) {
            ut = "Skriv inn gyldig " + verdi.id; // Utskriftsmelding for ugyldig felt
            feltFylt = false;
        }
        if (verdi.value == "") { // Sjekker om inputfeltene er tomme
            ut = "<span> Må skrive noe i " + verdi.id + "</span>";
            feltFylt = false;
        }
        utFelt.innerHTML = ut; //Skriver error-melding ut om hva som må fikses
    }

    // Siden dropdown-listen for filmer er av en annen datatype enn de andre inputfeltene,
    // så skjer inputvalidering separert fra resten
    if (filmer.selectedIndex == 0) { // Sjekker om bruker har beholdt dropdown listen på standardalternativ
        document.getElementById("filmer-1").innerHTML = "<span>Må velge én film</span>";
        feltFylt = false;
    }

    // Kjøres hvis inputverdiene har bestått validering
    if (feltFylt) {
        // Verdiene samles inn i ett objekt og legges i et array
        billettArray[i] = {
            film : filmInn,
            antall : antallInn,
            navn : fornavnInn,
            etternavn : etternavnInn,
            tlf : nrInn,
            epost : epostInn
        }
        let ut = "";
        // Hvis det er aller første billett, legges til tabelltittel på toppen
        if (i == 0) {
            ut = "<div><div>Film</div><div>Antall</div><div>Fornavn</div><div>Etternavn</div><div>Telefon</div><div>E-post</div></div>"
        }
        ut+= "<div><div>" + filmInn + "</div>"
            + "<div>" + antallInn + "</div>"
            + "<div>" + fornavnInn + "</div>"
            + "<div>" + etternavnInn + "</div>"
            + "<div>" + nrInn + "</div>"
            + "<div>" + epostInn + "</div>"
            + "</div>";
        document.getElementById("billetter").insertAdjacentHTML("beforeend", ut);
        i++;

        // Tømmer inputfeltene
        for (let verdi of inputVerdier) {
            verdi.value = "";
        }
        filmer.selectedIndex = 0; // Setter dropdown til standardverdi "Velg film"
    }
}
// Funksjon som tømmer arrayet og billettlisten
function slett() {
    document.getElementById("billetter").innerHTML = "";
    billettArray = []; // Resetter arrayet til et tomt et
    // Resetter i slik at objekter kan fremdeles legges inn i arrayet uten å laste inn siden på nytt
    i = 0;
}