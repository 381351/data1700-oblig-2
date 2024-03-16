package com.example.oblig2;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class Controller {

    // Intialiserer billett-arrayet
    public List<Billett> billetter = new ArrayList<>();

    // Lagrer nye billetter til arrayet
    @PostMapping("/setBillett")
    public void setBillett(Billett billett) {
        billetter.add(billett);
    }

    // Returnerer arrayet til klienten
    @GetMapping("/hentAlleBilletter")
    public List<Billett> getBilletter() {
        return billetter;
    }

    // Tømmer arrayet
    @GetMapping("/slettAlleBilletter")
    public void slettBilletter() {
        billetter.clear();
    }
}
