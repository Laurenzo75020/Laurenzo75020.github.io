# Notes de projet — site de Laurent Bourdoiseau et film « Faces »

Dernière mise à jour : 14 octobre 2026. Ce fichier sert à reprendre le travail dans une nouvelle session sans rien perdre.

---

## 0. Avant toute chose : ouvrir la session dans le bon dossier

**Le projet se trouve ici, et nulle part ailleurs :**

```
/Users/bourdoiseau/Desktop/Laurenzo75020.github.io
```

- C'est un dépôt Git (branche `main`, dépôt distant `https://github.com/Laurenzo75020/Laurenzo75020.github.io`), publié
  automatiquement sur `https://www.laurentbourdoiseau.com` à chaque `git push`.
- **La session doit être ouverte dans ce dossier** (dans l'application Claude : choisir ce dossier comme dossier de travail).
  Si la session est ouverte ailleurs, elle ne voit ni le site, ni ce fichier, ni les scripts, ni l'historique Git.
- **Ne pas confondre avec les dossiers de rushes du Bureau** (`~/Desktop/FACES/` : `11111`, `11111/_PL1`, `2222`, `Blood`, `rimmel`,
  `French FLAG`, `Packshot`, `EDITs` ; et `~/Desktop/___`). Ce ne sont **que des sources vidéo** (fichiers `.mp4` de plans générés par IA),
  pas des dépôts Git, pas le site. Une session ouverte dans `Desktop/FACES/11111` ne peut rien faire sur le site.
- Si une session est ouverte au mauvais endroit : demander à l'utilisateur de rouvrir la session dans
  `/Users/bourdoiseau/Desktop/Laurenzo75020.github.io`, ou d'y ajouter ce dossier.

**Au démarrage d'une session, dans cet ordre :**

1. Vérifier le dossier : `pwd` doit afficher `/Users/bourdoiseau/Desktop/Laurenzo75020.github.io`, et `git status -sb`
   doit afficher `## main...origin/main`.
2. Lire ce fichier en entier, puis `CLAUDE.local.md` (règles, à la racine, non publié) et `_atelier-video/LISEZ-MOI.md`
   (ateliers vidéo ; ses parties anciennes sont dépassées par ce fichier-ci, notamment la règle « demander avant de pousser »,
   remplacée par « pousser tout de suite »).
3. Regarder les derniers commits (`git log --oneline -15`) : chaque commit décrit en anglais ce qui a changé.
4. Reprendre à la section 8 (« Prochaines étapes »).

**Ce fichier est public** : il est dans le dépôt GitHub et lisible à `https://www.laurentbourdoiseau.com/NOTES-PROJET.md`.
Ne jamais y écrire de mot de passe, de clé ou de jeton. Si l'utilisateur préfère le garder privé, l'ajouter à
`.gitignore` (comme `CLAUDE.local.md`) et le retirer du dépôt avec `git rm --cached NOTES-PROJET.md` ; il restera alors
seulement sur son Mac.

---

## 1. Objectif du projet

Deux chantiers liés :

1. **Le site** `www.laurentbourdoiseau.com` (dépôt GitHub `Laurenzo75020/Laurenzo75020.github.io`, GitHub Pages, HTML/CSS/JS
   statiques, sans outil de construction). Laurent Bourdoiseau est artiste et réalisateur : photographie, cinéma, images et
   films générés par IA. Pages : accueil, IA (mur de films et d'images), Photo, Portfolio.
2. **Le film « Faces »** (51 s) et son **teaser** : montage de visages de femmes générés par IA, à la manière d'un film de
   parfum, calé sur la bande-son d'une bande-annonce de référence (« Les Diables »). Le film est sur Vimeo (« TRUTH_2 »,
   id `1235091825`) ; le teaser est la première vidéo de la page IA.

---

## 2. Règles de travail (fixées par l'utilisateur, toujours en vigueur)

- Répondre en français, simplement et honnêtement : dire ce qui a été vérifié et ce qui ne l'a pas été.
- **Site** : committer après chaque modification sans demander ; quand il demande d'exécuter une tâche, **pousser tout de
  suite** (`git push`), vérifier en ligne, et ne rapporter que le résultat vu en ligne.
- **Choix créatifs** (montage, sélection, rythme, placement) : demander d'abord ce qu'il veut. Il répond souvent « je te
  laisse faire, je réagis après » : alors proposer une version et l'envoyer.
- Une question (« peux-tu… », « y a-t-il un moyen… », « qu'en penses-tu ? ») est une question : répondre, proposer, attendre
  le feu vert. Ne pas exécuter.
- Ne jamais refaire le montage du film sans qu'il le demande.
- Ne jamais intégrer d'image d'un enfant ou d'un adolescent nu. Ne rien écrire sur le Bureau ni dans Téléchargements sans
  permission (lire y est permis). Jamais de clé ou de jeton (Vimeo…) dans le chat ni dans le dépôt.
- Ne pas changer le format d'une vidéo pour arranger la grille (Moon reste carrée, Air garde son format d'origine).
- Tests dans le navigateur intégré : **jamais de son** (couper, mettre en pause, fermer l'onglet à la fin). Il a déjà
  entendu de la musique tourner sur son Mac à cause d'un test.
- Messages de commit terminés par `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

---

## 3. Environnement technique

- Dépôt local : `/Users/bourdoiseau/Desktop/Laurenzo75020.github.io`. Branche `main`, publiée par GitHub Pages
  (`.nojekyll` présent : les fichiers sont servis tels quels). La mise en ligne prend 1 à 4 minutes après le push.
- `.gitignore` : `*.mp4`, `_atelier-video/`, `.claude/`, `CLAUDE.local.md`. Les vidéos publiées sont donc en **`.mov`**
  (H.264 + AAC, `-movflags +faststart` obligatoire, sinon le téléphone télécharge tout avant d'afficher). Après tout
  changement de fichier vidéo ou image, incrémenter le `?v=N` dans la page.
- ffmpeg : `python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"`. Python avec numpy, PIL, imageio
  (pas d'OpenCV ni de scipy).
- Vérifier en ligne : `curl -s "https://www.laurentbourdoiseau.com/ia/?x=$RANDOM" | grep -q "<texte nouveau>"` en boucle.
- Le serveur d'aperçu local (`.claude/launch.json`, port 8008) ne sert plus le bon dossier et ne peut pas être relancé dans
  cet environnement. Pour tester sans risque : publier une **copie d'essai non liée** (ex. `ia/essai.html`), tester en
  ligne, puis la retirer.
- Navigateur intégré : la fenêtre est souvent cachée (`innerWidth` à 0, `requestAnimationFrame` arrêté, vidéos muettes
  refusées). Dans les tests : fixer la taille (`resize_window`), forcer `document.hidden=false`, remplacer
  `requestAnimationFrame` par un `setTimeout`, appeler `mesurer()` / `arbitrer(false)` à la main. Il n'affiche pas le
  lecteur Vimeo dans une iframe (écran noir) ; on peut ouvrir `player.vimeo.com/video/<id>` directement pour l'inspecter.
- Le navigateur d'Instagram (sur son iPhone) garde les pages en mémoire environ 10 minutes : beaucoup de « ça ne marche
  pas » juste après une mise en ligne venaient de là. La page IA se recharge désormais seule si sa copie est périmée.

---

## 4. Ce qui a été fait (état actuel en ligne)

### Accueil — `index.html`
- Une seule photo plein écran : `accueil-colonne.jpg` (la colonne de la Bastille et le génie, 1723 × 1444), peinte en fond
  d'un bloc (`.scene.still.plein::before`) qui ne dépasse jamais de la fenêtre.
- Calage : la pointe de l'aile du génie (35,3 % de la hauteur, 44,7 % de la largeur de l'image) tombe juste sous le nom
  (variables CSS `--gy`, `--gx`, `--iw`). Ordinateur : génie à 38 % de la largeur, sous « BOURDOISEAU ». Téléphone : génie
  à 39 %, sous le nom et le menu.
- Nom en blanc ; le haut du premier onglet du menu est aligné sur le haut des capitales du nom (0,1365 corps sur
  ordinateur, 0,267 sur téléphone). Barre du navigateur forcée en blanc (`theme-color`).
- Un clic sur la photo ou sur « IA » ouvre la page IA, préchargée dans une iframe cachée (`entrerAvecSon`,
  `sortirEnSilence`). La série « split screen » est mise de côté dans un `<template>`.
- Ancien portrait `accueil-visage-large.jpg` encore dans le dépôt, non affiché.

### Page IA — `ia/index.html` (le gros du travail)
- Grille construite depuis le tableau `CONFIG` (types `image | vimeo | series | hidden | video`). Ordre visible : Faces
  (teaser), film « Sans titre » 0:30, Mirror seul, structure + split screen, Shore Stories seul, puis la mosaïque (Air,
  L'Oréal, Moon carré, Human Bomb…).
- **Sept films avec version complète** sur Vimeo : Faces `1235091825` (0:51), Sans titre `1233706459` (0:30), Mirror
  `1189011702` (1:03), Shore Stories `1136094996` (2:11), Breaking-Up `1189011706` (0:38), Air `248891650` (5:45),
  L'Oréal Gold `248889179` (1:15). Moon et Human Bomb n'ont pas de lien (`noLink`).
- **Aperçus (teasers)** : une seule lecture quand on les regarde (au centre de l'écran), puis **image figée** et ne
  repartent plus, même si on revient dessus (`enApercu`, `figer`). Sur l'image figée, en blanc, typo du nom, à 70 % de la
  hauteur : « Voir la version complète ? » / « Watch the full video? ». Sous chaque cadre : « Voir la version complète ·
  m:ss → » (« Watch the full video · m:ss → »), qui s'efface pendant le blanc.
- **Son** : une seule vidéo sonore à la fois, celle dont le centre est dans le tiers central de l'écran ; montée du son
  d'une seconde intégrée aux fichiers ; aucun bouton de son. Le premier toucher sur téléphone autorise le son.
- **Mode isolement (le « blanc »)** : après 0,5 s sans geste, tout s'efface autour de la vidéo centrée (`body.calme`), sauf
  sur les photos, les cases `noIso` et les aperçus figés. Un clic (ordinateur) ou un toucher bref (téléphone) sur le blanc
  fait sortir du mode pour le reste de la visite.
- **Enchaînements** : à la fin d'un aperçu sonore, l'image figée reste 1 s (3 s pour Faces), puis la page glisse jusqu'à la
  vidéo suivante, sur ordinateur et téléphone, si le visiteur n'a pas défilé lui-même. À la sortie de la version complète
  de Faces, la page descend jusqu'au deuxième film, centré.
- **Visionneuse des films** : fond noir plein, page en pause derrière ; lecteur Vimeo sans titre, nom ni portrait, avec une
  bande noire de 64 px au-dessus et au-dessous. Elle se referme **toujours** à la fin du film, un quart de seconde avant la
  dernière image (pas de vignettes Vimeo). La fin est détectée par messages directs avec le lecteur Vimeo, plus la
  bibliothèque `player.js` quand elle est chargée. Échap ferme. Pas de navigation aux flèches (essayée puis retirée).
- **Faces sur téléphone** : le film complet est lu par le site lui-même (`images/faces_film.mov`, 12,7 Mo, version 31 =
  `TRUTH_2.mp4`), sans barre de commande, pour que le sous-titre « I had a vision » reste visible. Toucher = pause /
  reprise ; fermeture à la fin.
- Air affiché dans son format d'origine (676 × 540, 8 colonnes noires masquées), avec du blanc à gauche et à droite.
- Correctifs mobiles : liens qui s'ouvrent au toucher (`auToucher`), trois vidéos réécrites avec l'index en tête,
  affiche de départ et vraie image figée pour le teaser Faces (plus de rectangle noir).

### Page Photo — `photos/index.html`
- Les photos sont lues dans le dossier `photo/` via l'API GitHub (47 photos ; la première, `-1.jpg`, a été retirée).
- Mise en page en **bandes composées**, sans recadrage ni trou : des rangées où toutes les images ont la même hauteur, avec
  des piles d'images ; largeurs du simple au triple ; un paysage est toujours plus large qu'un portrait. Les fichiers de
  760 px de large ou moins restent petits (350 px au plus à l'écran, sur ordinateur). Téléphone : bandes de 1 à 4 images.

### Portfolio — `portfolio/`
- Version ordinateur : 25 pages (`photo/book/Page_1.jpg` à `Page_25.jpg`, numéro du fichier = numéro affiché ; à l’origine copiées de `~/Desktop/___/__BOOKS/site`) ; la dernière page
  ramène à l'accueil. La version mobile (`photo/book-mobile/`) n'a pas été touchée.

### Le film « Faces » (atelier, non publié)
- Versions `_atelier-video/faces/montage_faces_cale_reference_v2.mp4` à `_v31.mp4`, une par script
  `_atelier-video/scripts/make_faces_cale_reference_vN.py`. **La version 31 est celle de Vimeo** (identique à
  `~/Desktop/FACES/EDITs/TRUTH_2.mp4`).
- Structure de la v31 : partie 1A (plan 1 de la même femme en trois parties : cuts avec noirs, cuts rapides, doigt pointé
  en boucles de 2 / 3 images ; bouches ; blonde pâle en plan long ; larmes de sang sous « Laissez-moi vous dire. »),
  partie 1B (cils rouges, tête renversée de femme en femme, mascara bleu, gouttes de sang en cuts rapides, bouche tordue,
  langues, drapeau en plan fantôme alterné avec le regard bleu), cartons « I AM THE WAY » (8 images avant la blonde
  pâle), « THERE IS NO ALTERNATIVE » (sur l'image), « I AM THE TRUTH » (16 images avant la partie 2), partie 2 très cut
  avec les flacons, voix « Et j'ai peur. », dernier plan du flacon rouge.
- Cartons dessinés d'après ses maquettes (Helvetica gras, composition à quatre lignes). Sous-titres français des voix.
- Rushes utilisés : uniquement ses dossiers de sélection, tous dans `/Users/bourdoiseau/Desktop/FACES/` (rangés là le 14 octobre 2026) : `11111` (et
  `11111/_PL1` pour le plan 1), `2222`, `Blood`, `rimmel`, `French FLAG`, `Packshot`. Les scripts les lisent à ces
  chemins (variable `DOSSIERS`). **Ne jamais reprendre ceux du dossier `___`** (plans écartés).

### Le teaser Faces (sur le site)
- Version en ligne : n° 12 (15,4 s), script `_atelier-video/scripts/make_teasing_faces_v12.py`, fichier
  `images/teasing_faces_v12.mov`. Musique : celle qu'il a fournie (`_atelier-video/reglages/teaser_musique_v8.wav`, copie
  de `Téléchargements/EC1C149E-….MP4`), posée depuis le début.
- Déroulé : plan 1 (0 s), bouches, doigts pointés en boucles, rouge étalé, tête renversée de femme en femme, gouttes de
  sang et bouche tordue suivie d'elle-même retournée et à l'envers, carton « THERE IS NO ALTERNATIVE » au moment où la
  musique se lance (13,4 s), chaîne de raccords dans le mouvement (gestes de mains gauche/droite, haut/bas), fondu au noir
  de 7 images.
- Les images viennent d'un rendu du film sans sous-titres : `python3 make_faces_v31_sans_sous_titres.py <sortie.mp4>`,
  puis `python3 make_teasing_faces_v12.py <ce rendu> [sortie]`. Pour le site : réencoder en `.mov`
  (`-crf 26`, `-af afade=t=in:st=0:d=1`, `+faststart`).

---

## 5. Décisions prises et pourquoi

- **Aperçus lus une seule fois puis figés** : il trouvait oppressant d'entendre deux fois la même bande-son, et voulait que
  le visiteur aille voir la version complète.
- **Aucun bouton de son** : il les trouvait trop présents ; le son est piloté par la position de la vidéo à l'écran.
- **Fermeture automatique de la visionneuse et refermeture avant la fin** : il ne veut ni vignettes Vimeo ni enchaînement
  automatique sur un autre film (l'enchaînement et les flèches ont été essayés puis retirés à sa demande).
- **Faces lu par le site sur téléphone** : sur mobile, Vimeo dessine sa barre de commande sur l'image elle-même (vérifié) ;
  agrandir la bande noire ne servait à rien. Masquer la barre via Vimeo (`controls=0`, permis par son compte) supprimerait
  aussi le bouton de lecture, et le démarrage avec le son sur iPhone serait incertain.
- **Le toucher sur le blanc n'est jamais « avalé »** sur téléphone : c'est aussi le geste qui autorise le son. L'avaler a
  empêché le teaser de démarrer (corrigé le 13 octobre).
- **Les aperçus ne sont plus comptés comme des boucles** : le retour au début qui ouvre le son était pris pour une reprise
  de boucle et faisait tomber le volume d'un quart dans la première seconde (l'accroc sonore).
- **Image figée en vraie image** (`teasing_faces_fige.jpg`) pour Faces : sur iPhone, la vidéo arrêtée sur du noir ne
  revenait pas toujours en arrière.
- **Photo : bandes composées plutôt que colonnes** : il trouvait tout « trop homothétique » ; il voulait du simple au
  triple et un vrai écart entre portrait et paysage, sans recadrer les photos.
- **Montage** : jamais de zoom fort ni d'image retournée sur le plan 1 (le visage doit rester de face, dans l'axe) ; pas de
  plan qui se répète ; drapeau seulement en plan fantôme et bref ; on évite les rushes trop agrandis (flous).

---

## 6. Fichiers importants

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil (photo plein écran, menu, préchargement de la page IA) |
| `ia/index.html` | Page IA : `CONFIG`, grille, son (`sonores`, `arbitrer`, `mesurer`, `demarrerSon`), aperçus (`enApercu`, `figer`), blanc (`calmer`, `reveiller`, sortie par le blanc), glissements (`glisserJusqua`, `glisserVersSuivante`, `apresLeFilm`), visionneuse (`openLbVideo`, `lireVimeo`, `lireSurLeSite`, `closeLb`), contrôle de fraîcheur |
| `photos/index.html` | Page Photo (bandes composées : `MODELES`, `composer`, `tracer`) |
| `portfolio/index.html` | Portfolio (`BACK_URL` vers l'accueil) |
| `lang.js` | Bascule français / anglais (attributs `data-en` / `data-fr`, `window.t`) |
| `images/teasing_faces_v12.mov`, `teasing_faces_debut.jpg`, `teasing_faces_fige.jpg` | Teaser Faces, son affiche, son image figée |
| `images/faces_film.mov` | Film Faces complet, lu par le site sur téléphone |
| `images/*.mov` | Aperçus des autres films (Mirror allongé à 15 s, Shore Stories baissé de 3 dB…) |
| `accueil-colonne.jpg` | Photo d'accueil |
| `photo/` | Photos de la page Photo ; `photo/book/` et `photo/book-mobile/` : pages du portfolio |
| `_atelier-video/scripts/` | Scripts du film (`make_faces_cale_reference_v2…v31.py`) et des teasers (`make_teasing_faces_v2…v12.py`) |
| `_atelier-video/faces/` | Rendus du film et des teasers (non publiés) |
| `_atelier-video/reglages/` | Timeline de référence, son de référence, musique du teaser, police Barlow Condensed |
| `CLAUDE.local.md`, `_atelier-video/LISEZ-MOI.md` | Règles et passation (non publiés) |

Sources hors dépôt, toutes dans `~/Desktop/FACES/` : `11111` (+ `_PL1`), `2222`, `Blood`, `rimmel`, `French FLAG`, `Packshot`, `EDITs`
(exports, dont `TRUTH_2.mp4`), et, resté sur le Bureau, `~/Desktop/___` (archives et plans écartés) ; film Mirror d'origine :
`~/Documents/___Mid/_AI_film_demo/Mon film_Mirror.mp4`.

---

## 7. Problèmes en cours

- **Glissement vers le deuxième film après la version complète, sur téléphone** : il n'a vu « qu'un petit mouvement ».
  Corrigé le 13 octobre (descente complète, vérifiée en émulation), mais **non confirmé sur son iPhone** ; probablement une
  ancienne page gardée en mémoire. Le contrôle de fraîcheur ajouté ensuite doit l'éviter.
- **Accroc sonore dans la première seconde du teaser** : cause trouvée et corrigée (fausse reprise de boucle), **non
  confirmé à l'écoute**.
- **Démarrage du teaser sur téléphone** : il a confirmé que ça fonctionne (« c'est parfait »), après la correction du
  toucher sur le blanc.
- **Barre Vimeo sur ordinateur** : elle se pose aussi sur l'image (pas dans la bande noire) ; il trouve le sous-titre
  visible sur ordinateur, donc rien n'est prévu. La bande de 64 px n'a pas d'utilité réelle et réduit un peu l'image.
- **Poids** : il a demandé de ne plus s'en occuper. Pour mémoire : Mirror 4,3 Mo, Shore Stories 9,2 Mo, L'Oréal en
  1920 × 1080, plusieurs aperçus vers 7 Mb/s.
- **Air** : l'aperçu ne fait que 540 px de haut ; un original de meilleure définition permettrait de le refaire.
- **Photo d'accueil** : 1723 px de large seulement ; un original plus grand serait plus net sur grand écran et sur iPhone.

---

## 8. Prochaines étapes

0. **Entrée temporaire du site (14 → 21 octobre 2026)** : l'adresse du site ouvre l'écran ENTER de la page IA
   (`index.html`, script en tête, fin automatique le 22 octobre à 0 h, heure de Paris). Les boutons « Accueil » mènent à
   `index.html?accueil`. Après cette date, proposer de retirer le script (les liens `?accueil` peuvent rester).

1. **Attendre sa réponse sur la coupure du son par le blanc.** Proposition faite le 13 octobre, non réalisée : un clic ou
   un toucher sur le blanc ferait sortir du mode isolement **et** couperait le son, la vidéo continuant en muet ; le son
   reviendrait à la vidéo suivante quand on fait défiler la page. Autre piste évoquée (ordinateur seulement) : son
   uniquement quand la souris est sur la vidéo.
2. **Lui faire confirmer sur son iPhone**, après avoir fermé et rouvert la page dans Instagram : (a) la descente jusqu'au
   deuxième film à la fin de la version complète de Faces ; (b) la disparition de l'accroc sonore au début du teaser ;
   (c) le sous-titre « I had a vision » visible dans la version complète.
3. Si la descente ne marche toujours pas sur iPhone : lui demander s'il arrive par l'accueil ou directement sur la page
   IA, et si le film s'est terminé seul ou a été fermé ; vérifier dans `apresLeFilm` que la case « suivante » est bien le
   film de 0:30 sur iPhone.
4. Points laissés en suspens, à lui rappeler s'il le souhaite :
   - l'image figée du teaser (aujourd'hui le visage du plan 1) : en vouloir une autre ?
   - point d'interrogation aussi sous le cadre (« Voir la version complète ? · 0:51 → ») ?
   - baisser aussi l'aperçu d'Air (le plus fort : −14,8 dB de niveau moyen) ? Shore Stories peut descendre de 2 dB de plus ;
   - Photo sur téléphone : deux portraits occupent seuls toute la largeur ; les accompagner ?
   - page Photo : choisir lui-même quelles photos sont les grandes (aujourd'hui, c'est le rythme des bandes qui décide).
5. Ménage possible (avec son accord) : anciens fichiers non utilisés (`accueil-visage-large.jpg`, `images/teasing_faces_boucle.mov`,
   anciennes scènes split screen), réparer le serveur d'aperçu local.
6. À chaque nouvelle modification du teaser ou du film : partir du dernier script (`make_teasing_faces_v12.py`,
   `make_faces_cale_reference_v31.py`), créer une nouvelle version numérotée, envoyer le fichier, et ne mettre en ligne
   que s'il le demande ou valide.
