
function kjop() {
    //Inputfeltene
    const filmer = document.getElementById("filmer") // Gir et array av tilgjengelige filmer
    const filmInn = filmer.options[filmer.selectedIndex].value; //Henter valgt film
    const antallInn = $("#antall").val();
    const fornavnInn = $("#fornavn").val();
    const etternavnInn = $("#etternavn").val();
    const nrInn = $("#nr").val();
    const epostInn = $("#e-post").val();



    const inputVerdier = document.querySelectorAll("input");

    // Resetter hver inputfelt sin "output"-melding
    for (let verdi of inputVerdier) {
        $("#"+verdi.id + "-1").html("")
    }
    $('#filmer-1').html("")



    let feltFylt = true;

    // Sjekker om inputfeltene + dropdown er tomme, og om de er gyldige
    for (let verdi of inputVerdier) {
        let utFelt = $("#"+verdi.id + "-1") //Output "error" felt
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
        utFelt.html(ut) //Skriver error-melding ut om hva som må fikses
    }
    // Siden dropdown-listen for filmer er av en annen datatype enn de andre inputfeltene,
    // så skjer inputvalidering separert fra resten
    if (filmer.selectedIndex == 0) { // Sjekker om bruker har beholdt dropdown listen på standardalternativ
        $("#filmer-1").html("<span>Må velge én film</span>");
        feltFylt = false;
    }



    // Kjøres hvis inputverdiene har bestått validering
    if (feltFylt) {
        // Inputverdiene samles inn i et objekt
        let billettInn = {
            film : filmInn,
            antall : antallInn,
            fornavn : fornavnInn,
            etternavn : etternavnInn,
            tlf : nrInn,
            epost : epostInn
        }
        // Objektet lagres på array i server
        $.post('/setBillett', billettInn, function(data) { })

        // Billett-arrayet hentes fra server
        $.get('/hentAlleBilletter', function(data) {
            let ut = "<tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefon</th><th>E-post</th></tr>"
            // Skrives ut i tabell
            for (let billett of data) {
                ut+= "<tr><td>" + billett.film + "</td>"
                    + "<td>" + billett.antall + "</td>"
                    + "<td>" + billett.fornavn + "</td>"
                    + "<td>" + billett.etternavn + "</td>"
                    + "<td>" + billett.tlf + "</td>"
                    + "<td>" + billett.epost + "</td>"
                    + "</tr>";
            }
            $("#billetter").html(ut)
        })
        // Tømmer inputfeltene
        for (let verdi of inputVerdier) {
            verdi.value = "";
        }
        filmer.selectedIndex = 0; // Setter dropdown til standardverdi "Velg film"
    }
}

// Funksjon som tømmer arrayet og billettlisten
function slett() {
    $("#billetter").html("");
    // Viser til end-point som tømmer arrayet
    $.get("/slettAlleBilletter", function(data) { })
}