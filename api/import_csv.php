<?php

include "db_connect.php";

echo mysqli_query($db, "LOAD DATA LOCAL INFILE '../2017 cases.csv' INTO TABLE incidents (piirkond, kliendi_nr, keel, vanus, puue, lapsed, rasedus, elukoht, fuusiline_vagivald, vaimne_vagivald, majanduslik_vagivald, seksuaalne_vagivald, inimkaubandus, teadmata_vagivald, partner_vagivallatseja, ekspartner_vagivallatseja, vanem_vagivallatseja, laps_vagivallatseja, sugulane_vagivallatseja, tookaaslane_vagivallatseja, muu_vagivallatseja, vagivallatseja_vanus, vagivallatseja_sugu, laps_ohver, vana_ohver, muu_ohver, politsei, umarlauad, marac, perearst_kaasatud, emo_kaasatud, naistearst_kaasatud, politsei_kaasatud, prokuratuur_kaasatud, lastekaitse_kaasatud, kov_kaasatud, tsiviilkohus_kaasatud, kriminaalkohus_kaasatud, haridusasutus_kaasatud, mtu_kaasatud, tuttavad_kaasatud, rahastus);");
echo mysqli_query($db, "LOAD DATA LOCAL INFILE '../2017 sessions.csv' INTO TABLE sessions (incident_id, kuupaev, kirjeldus, sidevahendid, kriisinoustamine, juhutuminoustamine, vorgustikutoo, psuhhonoustamine, juuranoustamine, tegevused_lapsega, tugiteenused, naise_majutus, laste_arv, laste_majutus, markused);");

// Finish the current thing to just upload 2017 and 2018 files once

// PUT to upload
// LOAD DATA LOCAL INFILE
// https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-apache-on-ubuntu-14-04 for restricted downloads
// Alternatively an url-not-accessible folder
// Pls also put config files there
// Files beginning with .ht can't be accessed