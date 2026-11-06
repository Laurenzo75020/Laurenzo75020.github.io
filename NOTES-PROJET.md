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
- Depuis le 4 novembre 2026 : `accueil-baigneurs.jpg` (les baigneurs, version sombre qu'il a mise sur le Bureau,
  999 × 1421), peinte en fond d'un bloc (`.scene.still.plein::before`) qui ne dépasse jamais de la fenêtre.
  Téléphone (écran vertical) : plein cadre (`cover`, calé à 38 % de la hauteur). Ordinateur (`min-aspect-ratio:1/1`) :
  depuis le 4 novembre 2026 (après-midi), une autre photo : `accueil-velo.jpg` (le vélo bleu au coucher de soleil sur la
  Seine, « IMG_8468b copie 3 » du Bureau, 2219 × 1543), en `cover` calé à droite (il privilégie le vélo, la gauche peut
  être coupée). Avant : son recadrage des baigneurs `accueil-baigneurs-large.jpg` (gardé), calé à « center 40% », avec une bande noire à droite pour
  le menu. Avec la photo du vélo, plus de bande noire (sa demande) : la photo remplit tout l'écran, le menu est posé dessus.
- Ancienne image gardée de côté : `accueil-colonne.jpg` (la colonne de la Bastille, calage par `--gy`, `--gx`, `--iw`,
  en commentaire dans le CSS).
- Page Photo, 4 novembre 2026 (fin d'après-midi) : il a remplacé dans `photo/` `12b` par `12c` (les baigneurs, version sombre) et `28` par `28b` (deux garçons, ciel d'orage), et tagué `24.jpg` (affichée en grand). `28c.jpg` posé à la racine du dépôt (variante de 28b) n'est pas sur le site. Puis, à sa demande, `25.jpg` (la barrière rouge et blanche) et `46.jpg` (les cannes) retirés du dossier (51 photos), et la dernière ligne limitée à 5 photos (au-delà, deux rangées). 5 novembre 2026 : le bloc baigneurs + garçons au soleil + épaule remonté juste sous la première ligne, en renommant les fichiers (`12c` → `04a`, `13` → `04b`, `13b` → `04c`, tag gardé) : l'ordre de la page est l'ordre des noms. Il veut le bloc tel quel (deux photos empilées à gauche, épaule non réduite) : une photo taguée précédée de deux photos ordinaires ne prend plus de voisines après elle. Puis le bloc 09 (garçon au tee-shirt bleu, en grand) + 10, 11 2, 12 2, 12 remonté juste dessous : renommés `04d` à `04h`. 5 novembre : `04c` (l'épaule) remplacé par sa version horizontale (« IMG_6674_horiz copie » du Bureau, 1467 × 1033), pour qu'elle prenne environ un quart de place en moins ; tag gardé. Puis recadrée moins large (1125 × 1033, même fichier du Bureau) pour agrandir les deux photos de gauche. Finalement (sa demande) : la version large (1467 × 1033) remise, seule sur toute sa ligne (règle : une photo taguée horizontale sans voisines d'avant occupe seule la largeur) ; les baigneurs et les garçons au soleil descendent dans le bas de page (`04a` → `39b`, `04b` → `42b`). Le bas de page (après la dernière photo taguée) n'est plus fait de rangées de cinq : compositions imbriquées préférées aux simples rangées, grandes cases permises pour les photos non taguées, un carré n'impose plus de rangée, et les petits fichiers peuvent y aller jusqu'à 440 px de large (350 ailleurs).
- Menu de l'accueil (5 novembre 2026) : Photo, Portfolio, IA, Macro IA, Bombek, Santé mentale (le même que les autres pages, sans
  « ← Accueil »), en colonne à droite.
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

### Écran ENTER (arrivée directe sur la page IA)
- `ia/index.html` ouverte directement renvoie vers `/?entree` : l'accueil affiche l'écran ENTER et charge la page IA en arrière-plan ; le clic l'affiche (même chemin que depuis l'accueil, pour le son et les vidéos dans Safari). Déplacé là le 30 octobre 2026.
- **Cadres noirs dans Safari (30 octobre 2026), cause non prouvée** : le déplacement de l'écran n'a pas suffi, le défaut persistait. Après avoir quitté Safari (Cmd + Q), tout remarche : accueil → IA, et Macro → IA → ENTER. La page de test (`test-video.html`, sans lien, noindex) lit aussi les vidéos, donc fichiers et serveur sont hors de cause. Piste la plus probable : Safari bloqué après une longue session. Si cela revient : avant de quitter Safari, ouvrir `test-video.html` dans un nouvel onglet. Vidéos normales = défaut dans la page IA ; vidéos absentes = Safari bloqué.

### Page Macro — `macro/index.html`
- **4 novembre 2026** : dossier source sur le Bureau, `_Macro_Select` (le site suit ce dossier : remplacer ou enlever d'après lui). 18 images (dernière mise à jour le 4 novembre en fin d'après-midi : 2 ajoutées, 1 retirée), `macro/images/macro_01..18.jpg` dans l'ordre du dossier, renumérotées à chaque mise à jour (les deux originaux en 2688 px ramenés à 2000 px). Mise en page Tetris comme `serie/essai.html` (compositions H/V, aucune case vide), adresse des images en `?v=N` (4 aujourd'hui), à augmenter à chaque mise à jour car les noms sont repris. `_Macro_ALL` sur le Bureau : toutes ses macros, pas utilisé par le site.
- Première mise en page (11 images, `macro/images/`), accessible seulement depuis les menus de la page IA (en haut et en bas), sous le nom « Macro IA » (anglais : « AI Macro »). Retirée du menu de l'accueil le 3 novembre 2026.

- Page IA, 5 novembre 2026 : l'image « Corps » (`images/image10.jpg`, deux femmes aux fleurs, gants bleu et rouge) retirée à sa demande (passée en `type:'hidden'`, la numérotation des images suivantes ne bouge pas ; le fichier reste dans `images/`).

### Page Santé mentale — `sante-mentale/index.html`
- Créée le 5 novembre 2026 (anglais : « Mental health »), même modèle que Bombek (tableau `RANGS`, rangées sans recadrage). Première image : `sante-mentale/images/sante_01.jpg` (1344 × 1295, deux personnes dos à dos couvertes de plaquettes de médicaments, logo Santé publique France), copiée depuis l'image qu'il a envoyée dans la conversation. Mise en page à décider avec lui quand la série grandira. Le même jour, remplacée par les trois images du dossier `~/Desktop/___Medoc/zzdef` (dossier source de la page), dans l'ordre du dossier : `sante_11.jpg` (les deux dos à dos, sans logo, 1344 × 900) seule en pleine largeur, puis `sante_12.jpg` (1757 × 1536) et `sante_13.jpg` (1344 × 768) côte à côte. Noms nouveaux à chaque remplacement (pas de vieille image en cache). Le 5 novembre au soir : dossier source déplacé sur le Bureau, `~/Desktop/zzdef` (14 images). Mises en ligne dans l'ordre du dossier, `sante_21..31.jpg`, deux par rangée, la dernière seule : 11 images. Écartées : `creation_3791275968` (doublon de la chambre `creation_3791280117`, on garde celle-ci), `magnific…__4807` et `magnific…__4805` d'abord tenues à l'écart (personnes d'apparence très jeune, règle « jamais d'image d'un enfant ou adolescent nu »), puis ajoutées (`sante_32`, `sante_33`, avant-dernière rangée) après sa confirmation : ce sont des adultes. 13 images. 6 novembre 2026 : 16 images réalistes du dossier `~/Desktop/Chambre_étuidants` (chambres d'étudiants envahies de médicaments) ajoutées, `sante_41..56.jpg` dans l'ordre du dossier. Sa demande : alterner les plans sur fond bleu (studio) et les plans réalistes. Ordre de lecture : un plan studio, deux réalistes, et ainsi de suite (rangées de deux : studio + réaliste, réaliste + studio, réaliste + réaliste) ; studio dans l'ordre 24, 26, 25, 27, 32, 28, 33, 29, 23, 31 ; les images presque semblables (tiroirs, murs, étagères) sont écartées les unes des autres. 29 images, la dernière seule. Puis (6 novembre) : 5 images réalistes du dossier `~/Desktop/II` ajoutées (`sante_57..61`, trois tiroirs sous le lit, deux autoportraits au miroir), et toutes les photos sur fond bleu retirées à sa demande (`sante_23`, `24` dos à dos, `25`, `31`, `32` fond bleu-gris, `33`). Restent 24 réalistes et 4 plans studio sur fond clair (`26` à `29`), placés environ toutes les six images, à gauche puis à droite ; les tiroirs sont espacés. 28 images, 14 rangées de deux. Puis (6 novembre) : les 4 plans studio sur fond blanc retirés aussi à sa demande (`sante_26` à `29`, petits personnages et femmes dans les plaquettes). Ne restent que des images réalistes : 24 images, 12 rangées de deux, tiroirs toujours espacés (rangées 4, 7, 10). Puis (6 novembre) : retirées `sante_44` (placard de cuisine) et `sante_59` (tiroir près de la fenêtre) ; ajoutées deux images envoyées dans la conversation, `sante_62` (jeune femme allongée, éclairée par son téléphone) et `sante_63` (selfie à l'appareil jetable, chemise d'uniforme), pas l'une à la suite de l'autre (sa demande) : rangées 5 et 11. Les quatre autoportraits sont aux rangées 3, 5, 8, 11. 24 images, 12 rangées de deux. Puis : ajoutée `sante_64` (gros plan, plaquette glissée dans une culotte rose ; copie du Bureau, original dans `~/Desktop/étudiants_originaux`), au milieu de la page, loin de `sante_21` qui lui ressemble : rangée 7, à trois images (51, 64, 42) pour ne pas laisser d'image seule. 25 images. Puis, à sa demande : `sante_64` en première place, à gauche de `sante_21` (les deux culottes roses ensemble en ouverture) ; `sante_49` prend sa place dans la rangée de trois (51, 49, 42). Puis retirées à sa demande : `sante_41` (tiroir sous le lit, pieds nus), `sante_30` (chambre aux murs de boîtes) et `sante_63` (appareil jetable). 22 images, 11 rangées de deux (plus de rangée de trois) : 64+21, 49+47, 43+60, 45+57, 62+48, 53+22, 51+42, 61+50, 46+58, 52+54, 55+56. Puis (6 novembre), à sa demande (« pas trois images sur la même ligne », « une composition en Tetris, quitte à recadrer ») : la page passe au modèle de `serie/essai.html` (tableau `COMPO`, blocs H/V imbriqués calculés en JavaScript, une image par ligne sur téléphone). Toutes les images ayant la même forme (1,75), un bloc « une grande + deux petites empilées » tombe juste, sans recadrage. Blocs : 64 grande + (21, 49) ; 47+43 ; (45, 57) + 60 grande ; 48+53 ; 62 grande + (22, 51) ; 42+50 ; (46, 58) + 61 grande ; 52+54 ; 55+56. Grandes images alternées à gauche et à droite. Puis, à sa demande, `sante_60` (autoportrait au miroir, t-shirt rouge) remontée au deuxième bloc, toujours en grand à droite : (47, 43) + 60, puis 45+57. Puis : retirées `sante_56` (blonde derrière l'étagère) et `sante_62` (jeune femme au téléphone) ; ajoutée `sante_65` (deux jeunes femmes, lit et baignoire, pistolet, médicaments collés partout ; original `~/Desktop/magnific__des-mdicaments-colors-de-tout-type-colls-partoutte__38193.png`, 2688 × 1536, réduit à 1774 px ; le badge « 1/80 » et l'icône de profil font partie de l'image) en position 3 du deuxième bloc, en grand à droite ; `sante_60` passe en grand à gauche du troisième bloc. Blocs : 64 + (21, 49) ; (47, 43) + 65 ; 60 + (45, 57) ; 48+53 ; 22+51 ; 42+50 ; (46, 58) + 61 ; 55 + (52, 54). 21 images. Puis, à sa demande (« la disposition en Tetris ne me satisfait pas, reviens aux lignes avec deux images pour que j'y voie plus clair ») : retour aux rangées de deux (tableau `RANGS`), même ordre de lecture, et `sante_65` en position 3, c'est-à-dire juste après les deux premières (début de la deuxième rangée) — c'était le sens de sa demande. Ordre : 64, 21 / 65, 49 / 47, 43 / 60, 45 / 57, 48 / 53, 22 / 51, 42 / 50, 46 / 58, 61 / 55, 52 / 54 seule en pleine largeur (21 images). Puis, à sa demande, quatre images remontées juste après la position 3, dans l'ordre qu'il a donné : 60 (miroir, t-shirt rouge), 53 (étagère, tête brune), 46 (livres sur mur vert), 22 (chambre au bureau) ; les autres décalées vers le bas. Ordre : 64, 21 / 65, 60 / 53, 46 / 22, 49 / 47, 43 / 45, 57 / 48, 51 / 42, 50 / 58, 61 / 55, 52 / 54 seule. Puis : ajoutée `sante_66` (jeune femme nue de dos dans une cuisine années 80, poster derrière elle) en position 3, les autres décalées. Source : sa copie recadrée `~/Desktop/magnific__femme-photographie-de-troisquart-face-avec-un-80mm__38198 copie.jpg` (833 × 448, trop petite) ; le même recadrage (sans le cadre blanc) refait sur l'original PNG 2688 × 1536, réduit à 1774 × 964. 22 images, 11 rangées de deux : 64, 21 / 66, 65 / 60, 53 / 46, 22 / 49, 47 / 43, 45 / 57, 48 / 51, 42 / 50, 58 / 61, 55 / 52, 54. Puis retirées : `sante_49` (pièce aux piles de livres, blonde à droite) et `sante_61` (autoportrait à l'appareil jetable devant les boîtes). 20 images : 64, 21 / 66, 65 / 60, 53 / 46, 22 / 47, 43 / 45, 57 / 48, 51 / 42, 50 / 58, 55 / 52, 54. Puis : ajoutée `sante_67` (femme agenouillée, voile de mariée, couverte de gélules, revolver ; 1646 × 951, envoyée dans la conversation) en position 3, les autres décalées ; 21 images, `sante_54` seule à la fin. (Une image de jambes aux socquettes blanches et chaussures d'écolière, jupe relevée, a été refusée : codes de l'enfance dans une pose suggestive ; je lui ai indiqué quoi changer.)

### Page Bombek (ex « New série ») — `serie/index.html`
- 5 novembre 2026 : renommée « Bombek » (anglais aussi « Bombek ») dans tous les menus et le titre, **adresse `/serie/` inchangée** : il a envoyé ce lien à des contacts. Règle : ne jamais changer l'adresse d'une page sans le prévenir.
- Créée le 3 novembre 2026 : les 30 images du dossier `Def` du Bureau (série aux visages couverts de gélules), copiées dans `serie/images/serie_01..30.jpg` dans l'ordre du dossier, deux par rangée. Le 3 novembre il en a retiré 6 du dossier (11, 14, 19, 21, 23, 29), retirées aussi du site : 24 images, numéros d'origine gardés. Le 4 novembre, 12 originaux recadrés ou retouchés dans `Def` (06, 07, 12, 13, 15, 16, 17, 20, 22, 25, 26, 27) remplacent les anciens. Le 4 novembre, `serie_01` retiré du dossier, donc du site (23 images). Le 4 novembre (fin d'après-midi), à sa demande : `serie_18` (l'étreinte, manteau ocre) retiré du site (22 images), et le diptyque `serie_06` + `serie_07` (gants rouges, débardeur rose) remonté en première ligne, sur `index.html` et sur `essai.html` ; les paires suivantes sont refaites dans l'ordre (20+22, 24+25, 26+27, 28+30). Puis la paire `serie_16` + `serie_17` (le chapeau à rayures, l'étreinte au manteau rouge) en deuxième ligne. Puis `serie_22` (le couple aux fleurs, fond rose) retiré (21 images) ; fin de page : 20+24, 25+26, 27+28, puis 30 (la robe en satin) seule en grand sur la dernière ligne (sa demande). 5 novembre : `serie_05` (costume beige, fond turquoise) et `serie_08` (costume gris, fond bleu pétrole) retirés (19 images) ; 04 et 09 forment une paire. 6 novembre : ajoutée `serie_31.jpg` (jeune homme torse nu au collier de gélules, fond bleu, logo Santé publique France, 1014 × 1620, envoyée dans la conversation) en position 1 de la ligne 3 ; la suite décalée : 31+02, 03+04, 09+10, 12+13, 15+20, 24+25, 26+27, 28+30 (20 images, toutes par deux). Proposition de mise en page moins linéaire sur `serie/essai.html` (sans lien, noindex) : compositions imbriquées H/V calculées en JavaScript, chaque bloc remplit toute la largeur, sans case vide ni recadrage (sa demande : des marges oui, mais pas de cases manquantes) ; une image par ligne sur téléphone. En attente de son avis (même modèle que la page Macro, tableau `RANGS`). Onglet « New série » (anglais : « New series ») dans les menus de la page IA, après « Macro IA ». Première mise en page, ordre et paires à valider avec lui. Rangées dans le tableau `RANGS`.

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

0. Entrée temporaire du site (14 → 21 octobre 2026, l'adresse du site ouvrait l'écran ENTER de la page IA) : terminée,
   code retiré le 23 octobre. Les boutons « Accueil » mènent toujours à `index.html?accueil` (sans effet, laissé tel quel).

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

### Bandeau et retour vers la page IA (3 novembre 2026)
- Bandeau gris (titre de section + nombre d'images, entre deux filets) retiré des pages Photo, Macro et New série, à sa demande.
- `ia/index.html` : l'écran ENTER n'apparaît plus quand on vient d'une autre page du site (test sur `document.referrer`, même domaine avec ou sans www). Seule une arrivée directe (lien reçu, favori) passe encore par `/?entree`. Sans ENTER, les vidéos démarrent muettes et le son vient au premier clic ou toucher.

### Listes d'images Photo et Portfolio (3 novembre 2026)
- « Erreur de chargement » sur le Portfolio : les pages demandaient la liste des images à GitHub, limité à 60 demandes par heure et par visiteur. Elles lisent maintenant `photo/liste.json`, `photo/book/liste.json` et `photo/book-mobile/liste.json` (GitHub seulement en secours si la liste manque).
- **Après tout ajout, retrait ou remplacement d'image** dans `photo/`, `photo/book/` ou `photo/book-mobile/` : lancer `python3 _outils/listes.py` et committer les listes avec les images. Sinon l'image n'apparaît pas (ou l'ancienne version reste).

### Menu des pages intérieures (4 novembre 2026)
- Toutes les pages sauf l'accueil (qui a les mêmes onglets sans « ← Accueil ») ont le même menu, en haut et en bas, dans cet ordre : ← Accueil, Photo, Portfolio, IA, Macro IA, Bombek (adresse `/serie/`), Santé mentale (pages `ia`, `photos`, `macro`, `serie`, `serie/essai.html`, `sante-mentale`, `portfolio`). Sur sa propre page, l'onglet remonte en haut. Le menu du haut est **en ligne** (et non plus en colonne) sur toutes ces pages : six onglets en colonne couvraient le texte de présentation de la page IA, la mention « English version » et le haut des premières images. Le bouton Sound off/on de la page IA garde sa hauteur d'avant (150 px au moins).

### Photos « en grand » (4 novembre 2026)
- Il pose un tag du Finder (n'importe quelle couleur, aujourd'hui jaune) sur les photos de `photo/` qu'il veut voir en grand. `_outils/listes.py` lit ces tags et ajoute `"grand": true` dans `photo/liste.json` (le tag lui-même ne part pas en ligne) : relancer le script après tout changement de tag.
- Page Photo, ordinateur : la première ligne reste une simple rangée de quatre. Une photo taguée ouvre sa bande, à côté de quatre photos ordinaires en deux rangées de deux (à droite puis à gauche) ; deux taguées qui se suivent sont côte à côte. Téléphone : une taguée occupe seule la largeur.
