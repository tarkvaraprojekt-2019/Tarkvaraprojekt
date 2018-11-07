SELECT
piirkond,
COUNT(id) AS 'Juhtumeid',
COUNT(DISTINCT(kliendi_nr)) AS 'Unikaalseid kliente',
-- Keel
COUNT(IF(keel='eesti', 1, NULL)) AS 'Eestikeelseid',
COUNT(IF(keel='vene', 1, NULL)) AS 'Venekeelseid',
COUNT(IF(keel='inglise', 1, NULL)) AS 'Ingliskeelseid',
COUNT(IF(keel='muu', 1, NULL)) AS 'Muukeelseid',
-- Vanus
COUNT(IF(vanus='alla 18', 1, NULL)) AS 'Klient alla 18',
COUNT(IF(vanus='18-24', 1, NULL)) AS 'Klient 18-24',
COUNT(IF(vanus='25-49', 1, NULL)) AS 'Klient 25-49',
COUNT(IF(vanus='50-64', 1, NULL)) AS 'Klient 50-64',
COUNT(IF(vanus='65+', 1, NULL)) AS 'Klient 65+',
-- -- --
SUM(puue) AS 'Puudega',
SUM(lapsed) AS 'Alaealisi lapsi',
SUM(rasedus) AS 'Rasedaid',
-- Vägivald
SUM(fuusiline_vagivald) AS 'Füüsiline vägivald',
SUM(vaimne_vagivald) AS 'Vaimne vägivald',
SUM(majanduslik_vagivald) AS 'Füüsiline vägivald',
SUM(seksuaalne_vagivald) AS 'Füüsiline vägivald',
SUM(inimkaubandus) AS 'Inimkaubandus',
SUM(teadmata_vagivald) AS 'Teadmata vägivald',
-- Vägivallatseja
SUM(partner_vagivallatseja) AS 'Partner vägivallatseja',
SUM(ekspartner_vagivallatseja) AS 'Ekspartner vägivallatseja',
SUM(vanem_vagivallatseja) AS 'Vanem vägivallatseja',
SUM(laps_vagivallatseja) AS 'Laps vägivallatseja',
SUM(sugulane_vagivallatseja) AS 'Sugulane vagivallatseja',
SUM(tookaaslane_vagivallatseja) AS 'Töökaaslane vägivallatseja',
SUM(muu_vagivallatseja) AS 'Muu vägivallatseja',
-- Vanus
COUNT(IF(vagivallatseja_vanus='alla 18', 1, NULL)) AS 'Vägivallatseja alla 18',
COUNT(IF(vagivallatseja_vanus='18-24', 1, NULL)) AS 'Vägivallatseja 18-24',
COUNT(IF(vagivallatseja_vanus='25-49', 1, NULL)) AS 'Vägivallatseja 25-49',
COUNT(IF(vagivallatseja_vanus='50-64', 1, NULL)) AS 'Vägivallatseja 50-64',
COUNT(IF(vagivallatseja_vanus='65+', 1, NULL)) AS 'Vägivallatseja 65+',
-- Sugu
COUNT(IF(vagivallatseja_sugu='Mees', 1, NULL)) AS 'Vägivallatseja mees',
COUNT(IF(vagivallatseja_sugu='Naine', 1, NULL)) AS 'Vägivallatseja naine',
-- -- --
SUM(laps_ohver) AS 'Alaealine lisaohvriks',
SUM(vana_ohver) AS 'Eakas lisaohvriks',
SUM(muu_ohver) AS 'Muu lisaohver',
SUM(politsei) AS 'Politsei kaasatud',
COUNT(IF(rahastus='NTK rahastus', 1, NULL)) AS 'NTK rahastanud'
-- From incidents table
FROM (SELECT piirkond, incidents.id, kliendi_nr, keel, vanus, puue, lapsed, rasedus, fuusiline_vagivald, majanduslik_vagivald, vaimne_vagivald, seksuaalne_vagivald, inimkaubandus, teadmata_vagivald, partner_vagivallatseja, ekspartner_vagivallatseja, vanem_vagivallatseja, laps_vagivallatseja, sugulane_vagivallatseja, tookaaslane_vagivallatseja, muu_vagivallatseja, vagivallatseja_vanus, vagivallatseja_sugu, laps_ohver, vana_ohver, muu_ohver, politsei, rahastus FROM incidents, sessions WHERE sessions.incident_id=incidents.id GROUP BY incidents.id) AS new_incidents GROUP BY piirkond

SELECT
piirkond,
COUNT(id) AS 'Nõustamisi',
-- Teenused
SUM(sidevahendid) AS 'Nõustamisi sidevahenditega',
SUM(kriisinoustamine) AS 'Kriisinõustamiste aeg',
COUNT(IF(kriisinoustamise_aeg='08:00-22:00', 1, NULL)) AS 'Kriisinõustamisi päeval',
COUNT(IF(kriisinoustamise_aeg='22:00-08:00', 1, NULL)) AS 'Kriisinõustamisi öösel',
SUM(juhtuminoustamine) AS 'Juhtuminõustamiste aeg',
SUM(vorgustikutoo) AS 'Võrgustikutöö aeg',
SUM(psuhhonoustamine) AS 'Psühhonõustamiste aeg',
SUM(juuranoustamine) AS 'Juuranõustamiste aeg',
SUM(tegevused_lapsega) AS 'Lastega tegevuste aeg',
SUM(tugiteenused) AS 'Tugiteenuste aeg',
-- Majutus
SUM(naise_majutus) AS 'Naise majutuspäevade arv',
SUM(laste_arv) AS 'Laste arv majutuses',
SUM(laste_majutus) AS 'Laste majutuspäevade arv',
-- Võrgustikutöö
SUM(umarlaud) AS 'Ümarlauad',
SUM(marac) AS 'MARAC',
SUM(perearst_kaasatud) AS 'Perearst',
SUM(emo_kaasatud) AS 'EMO',
SUM(naistearst_kaasatud) AS 'Naistearst',
SUM(politsei_kaasatud) AS 'Politsei',
SUM(prokuratuur_kaasatud) AS 'Prokuratuur',
SUM(ohvriabi_kaasatud) AS 'Riiklik ohvriabi',
SUM(lastekaitse_kaasatud) AS 'Lastekaitse',
SUM(kov_kaasatud) AS 'KOV sotsiaalabi',
SUM(tsiviilkohus_kaasatud) AS 'Kohus (tsiviilasjas)',
SUM(kriminaalkohus_kaasatud) AS 'Kohus (kriminaalasjas)',
SUM(haridusasutus_kaasatud) AS 'Haridusasutus',
SUM(mtu_kaasatud) AS 'MTÜ-d',
SUM(tuttavad_kaasatud) AS 'Sõbrad, sugulased'
-- From sessions table
FROM (SELECT piirkond, sessions.id, sidevahendid, kriisinoustamine, kriisinoustamise_aeg, juhtuminoustamine, vorgustikutoo, psuhhonoustamine, juuranoustamine, tegevused_lapsega, tugiteenused, naise_majutus, laste_arv, laste_majutus, umarlaud, marac, perearst_kaasatud, emo_kaasatud, naistearst_kaasatud, politsei_kaasatud, prokuratuur_kaasatud, ohvriabi_kaasatud, lastekaitse_kaasatud, kov_kaasatud, tsiviilkohus_kaasatud, kriminaalkohus_kaasatud, haridusasutus_kaasatud, mtu_kaasatud, tuttavad_kaasatud FROM incidents, sessions WHERE sessions.incident_id=incidents.id) AS new_sessions GROUP BY piirkond