#!/usr/bin/env python3
# Écrit la liste des images de photo/, photo/book/ et photo/book-mobile/ dans un fichier liste.json de chaque dossier.
# Les pages Photo et Portfolio lisent ces listes au lieu de demander le contenu des dossiers à GitHub (limité à
# 60 demandes par heure et par visiteur : au-delà, « Erreur de chargement »). À relancer après tout ajout, retrait ou
# remplacement d'image dans ces dossiers.
import json, os, re, subprocess
RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = re.compile(r'\.(jpe?g|png|webp)$', re.I)
for dossier in ['photo', 'photo/book', 'photo/book-mobile']:
    chemin = os.path.join(RACINE, dossier)
    noms = sorted(n for n in os.listdir(chemin) if IMG.search(n) and os.path.isfile(os.path.join(chemin, n)))
    # même empreinte que celle que donnait GitHub (sha du fichier), pour que les adresses des images ne changent pas
    shas = subprocess.run(['git', 'hash-object'] + [os.path.join(chemin, n) for n in noms],
                          capture_output=True, text=True, check=True).stdout.split()
    liste = [{'name': n, 'type': 'file', 'sha': s} for n, s in zip(noms, shas)]
    with open(os.path.join(chemin, 'liste.json'), 'w', encoding='utf-8') as f:
        json.dump(liste, f, ensure_ascii=False, indent=0)
    print(dossier, len(liste))
