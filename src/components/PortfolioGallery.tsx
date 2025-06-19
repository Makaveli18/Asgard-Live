import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImageViewer } from './ui/ImageViewer';
import captions from '../data/portfolio-captions';

interface PortfolioImage {
  src: string;
  alt: string;
  filename: string;
}

interface PortfolioSection {
  title: string;
  images: PortfolioImage[];
}

interface PortfolioGalleryProps {
  style: string;
}

// Mapping for folder name to display name
const folderDisplayNames: Record<string, string> = {
  'animals': 'Animals',
  'portraits': 'Portraits',
  'custom ink': 'Custom Ink',
  'floral': 'Floral',
  'symbolic - iconic': 'Symbolic & Iconic',
  'dark-mythic': 'Dark Mythic',
  'realistic-portraits': 'Realistic Portraits',
  'symbolic - minimal ink': 'Symbolic & Minimal Ink',
  'mandala': 'Mandala',
  'realism-dotwork': 'Realism & Dotwork',
  'mythic': 'Mythic',
  'pop culture': 'Pop Culture',
  'memento-mori': 'Memento Mori'
};

// Style mapping for URL to folder name
const styleMapping: Record<string, string> = {
  'realism': 'realism',
  'fine-line': 'fine line',
  'norse': 'norse',
  'blackwork': 'blackwork',
  'neo-traditional': 'neo-traditional',
  'ornamental': 'ornamental',
  'custom-fine-art': 'custom fine art',
  'abstract': 'abstract',
  'studio': 'studio-bts'
};

// Static image database with CORRECT file extensions (no double extensions)
const imageDatabase: Record<string, PortfolioImage[]> = {
  'realism': [
    // Animals
    { src: '/images/Portfolio/realism/animals/realism-owl-shoulder-animal-tattoo.jpg', alt: 'Realistic owl shoulder animal tattoo', filename: 'realism-owl-shoulder-animal-tattoo.jpg' },
    { src: '/images/Portfolio/realism/animals/realistic-viper-snake-chest-tattoo.jpg', alt: 'Realistic viper snake chest tattoo', filename: 'realistic-viper-snake-chest-tattoo.jpg' },
    { src: '/images/Portfolio/realism/animals/realism-dog-portrait-forearm-tattoo.jpg', alt: 'Realistic dog portrait forearm tattoo', filename: 'realism-dog-portrait-forearm-tattoo.jpg' },
    { src: '/images/Portfolio/realism/animals/realistic-wasp-blackwork-neck-tattoo.jpg', alt: 'Realistic wasp blackwork neck tattoo', filename: 'realistic-wasp-blackwork-neck-tattoo.jpg' },
    { src: '/images/Portfolio/realism/animals/realism-cheetah-floral-splash-leg-tattoo.jpg', alt: 'Realistic cheetah floral splash leg tattoo', filename: 'realism-cheetah-floral-splash-leg-tattoo.jpg' },
    { src: '/images/Portfolio/realism/animals/realism-gorilla-sleeve-tattoo-with-geometry.jpg', alt: 'Realistic gorilla sleeve tattoo with geometry', filename: 'realism-gorilla-sleeve-tattoo-with-geometry.jpg' },
    { src: '/images/Portfolio/realism/animals/realistic-tiger-blackwork-cover-up-chest-tattoo.jpg', alt: 'Realistic tiger blackwork cover up chest tattoo', filename: 'realistic-tiger-blackwork-cover-up-chest-tattoo.jpg' },
    { src: '/images/Portfolio/realism/animals/realism-lion-bicep-tattoo-with-honeycomb-pattern.png', alt: 'Realistic lion bicep tattoo with honeycomb pattern', filename: 'realism-lion-bicep-tattoo-with-honeycomb-pattern.png' },
    // Custom Ink
    { src: '/images/Portfolio/realism/custom ink/realistic-cheshire-cat-tattoo-thigh.jpg', alt: 'Realistic cheshire cat tattoo thigh', filename: 'realistic-cheshire-cat-tattoo-thigh.jpg' },
    { src: '/images/Portfolio/realism/custom ink/dark-realism-reaper-cemetery-full-backpiece.jpg', alt: 'Dark realism reaper cemetery full backpiece', filename: 'dark-realism-reaper-cemetery-full-backpiece.jpg' },
    { src: '/images/Portfolio/realism/custom ink/realistic-anchor-forearm-splash-design-tattoo.jpg', alt: 'Realistic anchor forearm splash design tattoo', filename: 'realistic-anchor-forearm-splash-design-tattoo.jpg' },
    { src: '/images/Portfolio/realism/custom ink/realism-jesus-christ-crucifixion-forearm-tattoo.jpg', alt: 'Realistic jesus christ crucifixion forearm tattoo', filename: 'realism-jesus-christ-crucifixion-forearm-tattoo.jpg' },
    { src: '/images/Portfolio/realism/custom ink/realism-mountain-forest-father-son-half-sleeve-tattoo.jpg', alt: 'Realistic mountain forest father son half sleeve tattoo', filename: 'realism-mountain-forest-father-son-half-sleeve-tattoo.jpg' },
    { src: '/images/Portfolio/realism/custom ink/custom-samurai-armor-tattoo-full-sleeve-female-warrior.png', alt: 'Custom samurai armor tattoo full sleeve female warrior', filename: 'custom-samurai-armor-tattoo-full-sleeve-female-warrior.png' },
    // Portraits
    { src: '/images/Portfolio/realism/portraits/realistic-lemmy-kilmister-portrait-arm-tattoo.jpg', alt: 'Realistic lemmy kilmister portrait arm tattoo', filename: 'realistic-lemmy-kilmister-portrait-arm-tattoo.jpg' },
    { src: '/images/Portfolio/realism/portraits/hyperrealistic-queen-of-earh-afro-sleeve-tattoo3.jpg', alt: 'Hyperrealistic queen of earth afro sleeve tattoo', filename: 'hyperrealistic-queen-of-earh-afro-sleeve-tattoo3.jpg' },
    { src: '/images/Portfolio/realism/portraits/hyperrealistic-queen-of-earh-elephant-afro-sleeve-tattoo2.jpg', alt: 'Hyperrealistic queen of earth elephant afro sleeve tattoo 2', filename: 'hyperrealistic-queen-of-earh-elephant-afro-sleeve-tattoo2.jpg' },
    { src: '/images/Portfolio/realism/portraits/hyperrealistic-queen-of-earth-elephant-afro-sleeve-tattoo.jpg', alt: 'Hyperrealistic queen of earth elephant afro sleeve tattoo', filename: 'hyperrealistic-queen-of-earth-elephant-afro-sleeve-tattoo.jpg' }
  ],
  'fine line': [
    // Floral
    { src: '/images/Portfolio/fine line/floral/lotus-flowers-leg-tattoo.jpg', alt: 'Lotus flowers leg tattoo', filename: 'lotus-flowers-leg-tattoo.jpg' },
    { src: '/images/Portfolio/fine line/floral/flowers-fineline-arm-tattoo.jpg', alt: 'Flowers fineline arm tattoo', filename: 'flowers-fineline-arm-tattoo.jpg' },
    { src: '/images/Portfolio/fine line/floral/roses-fineline-chest-tattoo.jpg', alt: 'Roses fineline chest tattoo', filename: 'roses-fineline-chest-tattoo.jpg' },
    { src: '/images/Portfolio/fine line/floral/peony-flowers-fineline-arm-tattoo.jpg', alt: 'Peony flowers fineline arm tattoo', filename: 'peony-flowers-fineline-arm-tattoo.jpg' },
    { src: '/images/Portfolio/fine line/floral/fineline-floral-forearm-blackwork1.jpg', alt: 'Fineline floral forearm blackwork 1', filename: 'fineline-floral-forearm-blackwork1.jpg' },
    { src: '/images/Portfolio/fine line/floral/fineline-floral-forearm-blackwork2.jpg', alt: 'Fineline floral forearm blackwork 2', filename: 'fineline-floral-forearm-blackwork2.jpg' },
    { src: '/images/Portfolio/fine line/floral/fineline-floral-forearm-blackwork3.jpg', alt: 'Fineline floral forearm blackwork 3', filename: 'fineline-floral-forearm-blackwork3.jpg' },
    { src: '/images/Portfolio/fine line/floral/peony-flowers-fineline-side-tattoo.jpg', alt: 'Peony flowers fineline side tattoo', filename: 'peony-flowers-fineline-side-tattoo.jpg' },
    { src: '/images/Portfolio/fine line/floral/iris-flowers-fineline-clavicle-tattoo.jpg', alt: 'Iris flowers fineline clavicle tattoo', filename: 'iris-flowers-fineline-clavicle-tattoo.jpg' },
    { src: '/images/Portfolio/fine line/floral/lotus-rose-floral-fineline-leg-tattoo.jpg', alt: 'Lotus rose floral fineline leg tattoo', filename: 'lotus-rose-floral-fineline-leg-tattoo.jpg' },
    { src: '/images/Portfolio/fine line/floral/fineline-snake-floral-forearm-blackwork.jpg', alt: 'Fineline snake floral forearm blackwork', filename: 'fineline-snake-floral-forearm-blackwork.jpg' },
    { src: '/images/Portfolio/fine line/floral/snake-flowers-fineline-stomach-side-tattoo.jpg', alt: 'Snake flowers fineline stomach side tattoo', filename: 'snake-flowers-fineline-stomach-side-tattoo.jpg' },
    { src: '/images/Portfolio/fine line/floral/snake-flowers-fineline-abdominal-side-tattoo.jpg', alt: 'Snake flowers fineline abdominal side tattoo', filename: 'snake-flowers-fineline-abdominal-side-tattoo.jpg' },
    // Symbolic & Iconic
    { src: '/images/Portfolio/fine line/symbolic - iconic/fine-line-sacred-owl-back-tattoo.jpg', alt: 'Fine line sacred owl back tattoo', filename: 'fine-line-sacred-owl-back-tattoo.jpg' },
    { src: '/images/Portfolio/fine line/symbolic - iconic/fineline-colibri-bird-forearm-tattoo.jpg', alt: 'Fineline colibri bird forearm tattoo', filename: 'fineline-colibri-bird-forearm-tattoo.jpg' },
    { src: '/images/Portfolio/fine line/symbolic - iconic/symbolic-mother-child-sketch-arm-tattoo.jpg', alt: 'Symbolic mother child sketch arm tattoo', filename: 'symbolic-mother-child-sketch-arm-tattoo.jpg' },
    { src: '/images/Portfolio/fine line/symbolic - iconic/deathly-hallows-custom-fineline-arm-tattoo1.jpg', alt: 'Deathly hallows custom fineline arm tattoo 1', filename: 'deathly-hallows-custom-fineline-arm-tattoo1.jpg' },
    { src: '/images/Portfolio/fine line/symbolic - iconic/deathly-hallows-custom-fineline-arm-tattoo2.jpg', alt: 'Deathly hallows custom fineline arm tattoo 2', filename: 'deathly-hallows-custom-fineline-arm-tattoo2.jpg' },
    { src: '/images/Portfolio/fine line/symbolic - iconic/phoenix-minimal-abstract-watercolor-red-forearm.jpg', alt: 'Phoenix minimal abstract watercolor red forearm', filename: 'phoenix-minimal-abstract-watercolor-red-forearm.jpg' },
    { src: '/images/Portfolio/fine line/symbolic - iconic/forearm-butterfly-fragment-abstract-fine-line-tattoo.jpg', alt: 'Forearm butterfly fragment abstract fine line tattoo', filename: 'forearm-butterfly-fragment-abstract-fine-line-tattoo.jpg' }
  ],
  'norse': [
    // Dark Mythic
    { src: '/images/Portfolio/norse/dark-mythic/horror-full-back-demon-skull-tattoo.jpg', alt: 'Horror full back demon skull tattoo', filename: 'horror-full-back-demon-skull-tattoo.jpg' },
    { src: '/images/Portfolio/norse/dark-mythic/norse-runic-antler-skull-forearm-tattoo.jpg', alt: 'Norse runic antler skull forearm tattoo', filename: 'norse-runic-antler-skull-forearm-tattoo.jpg' },
    { src: '/images/Portfolio/norse/dark-mythic/vegvisir-nordic-rune-chest-symbol-tattoo.jpg', alt: 'Vegvisir nordic rune chest symbol tattoo', filename: 'vegvisir-nordic-rune-chest-symbol-tattoo.jpg' },
    { src: '/images/Portfolio/norse/dark-mythic/odin-ravens-chest-tattoo-norse-blackwork-style.png', alt: 'Odin ravens chest tattoo norse blackwork style', filename: 'odin-ravens-chest-tattoo-norse-blackwork-style.png' },
    { src: '/images/Portfolio/norse/dark-mythic/norse-valknut-vegvisir-custom-symbols-arm-tattoo.jpg', alt: 'Norse valknut vegvisir custom symbols arm tattoo', filename: 'norse-valknut-vegvisir-custom-symbols-arm-tattoo.jpg' },
    { src: '/images/Portfolio/norse/dark-mythic/nordic-odin-raven-skull-viking-blackwork-timeless-tattoo.jpg', alt: 'Nordic odin raven skull viking blackwork timeless tattoo', filename: 'nordic-odin-raven-skull-viking-blackwork-timeless-tattoo.jpg' },
    // Realistic Portraits
    { src: '/images/Portfolio/norse/realistic-portraits/odin-viking-god-realism-sleeve-tattoo.jpg', alt: 'Odin viking god realism sleeve tattoo', filename: 'odin-viking-god-realism-sleeve-tattoo.jpg' },
    { src: '/images/Portfolio/norse/realistic-portraits/custom-raven-viking-design-arm-tattoo.jpg', alt: 'Custom raven viking design arm tattoo', filename: 'custom-raven-viking-design-arm-tattoo.jpg' },
    { src: '/images/Portfolio/norse/realistic-portraits/custom-viking-raven-design-arm-tattoo.jpg', alt: 'Custom viking raven design arm tattoo', filename: 'custom-viking-raven-design-arm-tattoo.jpg' },
    { src: '/images/Portfolio/norse/realistic-portraits/viking-raven-timeless-sleeve-cover-up-tattoo.jpg', alt: 'Viking raven timeless sleeve cover up tattoo', filename: 'viking-raven-timeless-sleeve-cover-up-tattoo.jpg' },
    { src: '/images/Portfolio/norse/realistic-portraits/ragnar-realism-viking-side-torso-finished.jpg', alt: 'Ragnar realism viking side torso finished', filename: 'ragnar-realism-viking-side-torso-finished.jpg' },
    { src: '/images/Portfolio/norse/realistic-portraits/ragnar-realism-viking-side-torso-session1.jpg', alt: 'Ragnar realism viking side torso session 1', filename: 'ragnar-realism-viking-side-torso-session1.jpg' },
    { src: '/images/Portfolio/norse/realistic-portraits/realistic-vikings-portrait-tattoo-floki-arm-design1.png', alt: 'Realistic vikings portrait tattoo floki arm design 1', filename: 'realistic-vikings-portrait-tattoo-floki-arm-design1.png' },
    { src: '/images/Portfolio/norse/realistic-portraits/realistic-vikings-portrait-tattoo-floki-arm-design2.png', alt: 'Realistic vikings portrait tattoo floki arm design 2', filename: 'realistic-vikings-portrait-tattoo-floki-arm-design2.png' }
  ],
  'blackwork': [
    { src: '/images/Portfolio/blackwork/calf-capybara-flower-sacred-geometry-tattoo.jpg', alt: 'Calf capybara flower sacred geometry tattoo', filename: 'calf-capybara-flower-sacred-geometry-tattoo.jpg' },
    { src: '/images/Portfolio/blackwork/expressionist-crow-duo-shoulderblade-tattoo.jpg', alt: 'Expressionist crow duo shoulderblade tattoo', filename: 'expressionist-crow-duo-shoulderblade-tattoo.jpg' },
    { src: '/images/Portfolio/blackwork/dark-surreal-winged-skeleton-shoulder-tattoo.jpg', alt: 'Dark surreal winged skeleton shoulder tattoo', filename: 'dark-surreal-winged-skeleton-shoulder-tattoo.jpg' },
    { src: '/images/Portfolio/blackwork/nature-themed-bear-forest-mountain-leg-tattoo.jpg', alt: 'Nature themed bear forest mountain leg tattoo', filename: 'nature-themed-bear-forest-mountain-leg-tattoo.jpg' },
    { src: '/images/Portfolio/blackwork/satyr-pan-horned-god-folklore-black-grey-side-tattoo.jpg', alt: 'Satyr pan horned god folklore black grey side tattoo', filename: 'satyr-pan-horned-god-folklore-black-grey-side-tattoo.jpg' },
    // Symbolic & Minimal Ink
    { src: '/images/Portfolio/blackwork/symbolic - minimal ink/symbolic-g59-leg-tattoo-punk-style.jpg', alt: 'Symbolic g59 leg tattoo punk style', filename: 'symbolic-g59-leg-tattoo-punk-style.jpg' },
    { src: '/images/Portfolio/blackwork/symbolic - minimal ink/tribal-blackwork-full-sleeve-tattoo.jpg', alt: 'Tribal blackwork full sleeve tattoo', filename: 'tribal-blackwork-full-sleeve-tattoo.jpg' },
    { src: '/images/Portfolio/blackwork/symbolic - minimal ink/baby-footprint-name-date-side-tattoo.jpg', alt: 'Baby footprint name date side tattoo', filename: 'baby-footprint-name-date-side-tattoo.jpg' },
    { src: '/images/Portfolio/blackwork/symbolic - minimal ink/tribal-maori-polynesian-sleeve-chest.jpg', alt: 'Tribal maori polynesian sleeve chest', filename: 'tribal-maori-polynesian-sleeve-chest.jpg' },
    { src: '/images/Portfolio/blackwork/symbolic - minimal ink/blackwork-asgard-logo-skull-head-tattoo.jpg', alt: 'Blackwork asgard logo skull head tattoo', filename: 'blackwork-asgard-logo-skull-head-tattoo.jpg' },
    { src: '/images/Portfolio/blackwork/symbolic - minimal ink/custom-spiders-blackwork-design-back-tattoo.jpg', alt: 'Custom spiders blackwork design back tattoo', filename: 'custom-spiders-blackwork-design-back-tattoo.jpg' }
  ],
  'neo-traditional': [
    // Mythic
    { src: '/images/Portfolio/neo-traditional/mythic/neo-traditional-pheonix-back-tattoo.jpg', alt: 'Neo traditional phoenix back tattoo', filename: 'neo-traditional-pheonix-back-tattoo.jpg' },
    { src: '/images/Portfolio/neo-traditional/mythic/neo-traditional-bull-skull-biceps-tattoo.jpg', alt: 'Neo traditional bull skull biceps tattoo', filename: 'neo-traditional-bull-skull-biceps-tattoo.jpg' },
    { src: '/images/Portfolio/neo-traditional/mythic/neo-traditional-realistic-dragon-arm-tattoo.jpg', alt: 'Neo traditional realistic dragon arm tattoo', filename: 'neo-traditional-realistic-dragon-arm-tattoo.jpg' },
    { src: '/images/Portfolio/neo-traditional/mythic/neo-traditional-archangel-michael-arm-tattoo1.jpg', alt: 'Neo traditional archangel michael arm tattoo 1', filename: 'neo-traditional-archangel-michael-arm-tattoo1.jpg' },
    { src: '/images/Portfolio/neo-traditional/mythic/neo-traditional-archangel-michael-arm-tattoo2.jpg', alt: 'Neo traditional archangel michael arm tattoo 2', filename: 'neo-traditional-archangel-michael-arm-tattoo2.jpg' },
    { src: '/images/Portfolio/neo-traditional/mythic/neo-traditional-archangel-michael-arm-tattoo3.jpg', alt: 'Neo traditional archangel michael arm tattoo 3', filename: 'neo-traditional-archangel-michael-arm-tattoo3.jpg' },
    { src: '/images/Portfolio/neo-traditional/mythic/crazy-medusa-tattoo-tongue-out-snakes-thigh-realism.png', alt: 'Crazy medusa tattoo tongue out snakes thigh realism', filename: 'crazy-medusa-tattoo-tongue-out-snakes-thigh-realism.png' },
    { src: '/images/Portfolio/neo-traditional/mythic/medusa-snake-hair-tattoo-witchy-blackwork-thigh-design.png', alt: 'Medusa snake hair tattoo witchy blackwork thigh design', filename: 'medusa-snake-hair-tattoo-witchy-blackwork-thigh-design.png' },
    // Main Neo-Traditional
    { src: '/images/Portfolio/neo-traditional/neo-traditional-blackwork-roses-shoulder-tattoo.jpg', alt: 'Neo traditional blackwork roses shoulder tattoo', filename: 'neo-traditional-blackwork-roses-shoulder-tattoo.jpg' },
    { src: '/images/Portfolio/neo-traditional/neo-traditional-hungarian-coat-of-arms-calf-tattoo.jpg', alt: 'Neo traditional hungarian coat of arms calf tattoo', filename: 'neo-traditional-hungarian-coat-of-arms-calf-tattoo.jpg' },
    { src: '/images/Portfolio/neo-traditional/neo-traditional-blackwork-roses-shoulder-tattoo2.jpg', alt: 'Neo traditional blackwork roses shoulder tattoo 2', filename: 'neo-traditional-blackwork-roses-shoulder-tattoo2.jpg' },
    { src: '/images/Portfolio/neo-traditional/neo-traditional-female-portrait-floral-sleeve-tattoo.jpg', alt: 'Neo traditional female portrait floral sleeve tattoo', filename: 'neo-traditional-female-portrait-floral-sleeve-tattoo.jpg' },
    // Pop Culture
    { src: '/images/Portfolio/neo-traditional/pop culture/neo-traditional-teddy-bear-arm-tattoo.jpg', alt: 'Neo traditional teddy bear arm tattoo', filename: 'neo-traditional-teddy-bear-arm-tattoo.jpg' },
    { src: '/images/Portfolio/neo-traditional/pop culture/realistic-dobby-portrait-forearm-tattoo.jpg', alt: 'Realistic dobby portrait forearm tattoo', filename: 'realistic-dobby-portrait-forearm-tattoo.jpg' },
    { src: '/images/Portfolio/neo-traditional/pop culture/stitch-voodoo-doll-cute-disney-color-tattoo.jpg', alt: 'Stitch voodoo doll cute disney color tattoo', filename: 'stitch-voodoo-doll-cute-disney-color-tattoo.jpg' },
    { src: '/images/Portfolio/neo-traditional/pop culture/dobby-is-free-color-tattoo-harry-potter-fanart.jpg', alt: 'Dobby is free color tattoo harry potter fanart', filename: 'dobby-is-free-color-tattoo-harry-potter-fanart.jpg' },
    { src: '/images/Portfolio/neo-traditional/pop culture/gon-vs-pitou-hunterxhunter-forearm-anime-tattoo.jpg', alt: 'Gon vs pitou hunterxhunter forearm anime tattoo', filename: 'gon-vs-pitou-hunterxhunter-forearm-anime-tattoo.jpg' },
    { src: '/images/Portfolio/neo-traditional/pop culture/las-vegas-themed-sleeve-tattoo-neon-retro-graffiti-style.png', alt: 'Las vegas themed sleeve tattoo neon retro graffiti style', filename: 'las-vegas-themed-sleeve-tattoo-neon-retro-graffiti-style.png' },
    { src: '/images/Portfolio/neo-traditional/pop culture/neo-traditional-shenron-dragonballz-forearm-color-tattoo.jpg', alt: 'Neo traditional shenron dragonballz forearm color tattoo', filename: 'neo-traditional-shenron-dragonballz-forearm-color-tattoo.jpg' },
    { src: '/images/Portfolio/neo-traditional/pop culture/avenged-sevenfold-winged-skull-iconic-chest-tattoo.jpg', alt: 'Avenged sevenfold winged skull iconic chest tattoo', filename: 'avenged-sevenfold-winged-skull-iconic-chest-tattoo.jpg' },
    { src: '/images/Portfolio/neo-traditional/pop culture/blackwork-jason-voorhees-horror-sleeve-tattoo.jpg', alt: 'Blackwork jason voorhees horror sleeve tattoo', filename: 'blackwork-jason-voorhees-horror-sleeve-tattoo.jpg' },
    { src: '/images/Portfolio/neo-traditional/pop culture/punisher-inspired-custom-blackwork-arm-tattoo.jpg', alt: 'Punisher inspired custom blackwork arm tattoo', filename: 'punisher-inspired-custom-blackwork-arm-tattoo.jpg' },
    { src: '/images/Portfolio/neo-traditional/pop culture/custom-design-blackwork-ryuk-deathnote-arm-tattoo.jpg', alt: 'Custom design blackwork ryuk deathnote arm tattoo', filename: 'custom-design-blackwork-ryuk-deathnote-arm-tattoo.jpg' },
    // Memento Mori - CORRECT extension without double extension
    { src: '/images/Portfolio/neo-traditional/memento-mori-tattoo-skull-inside-hourglass-forearm-realism.png', alt: 'Memento mori tattoo skull inside hourglass forearm realism', filename: 'memento-mori-tattoo-skull-inside-hourglass-forearm-realism.png' }
  ],
  'ornamental': [
    // Mandala
    { src: '/images/Portfolio/ornamental/mandala/fine-line-sacred-owl-back-mandala-tattoo.jpg', alt: 'Fine line sacred owl back mandala tattoo', filename: 'fine-line-sacred-owl-back-mandala-tattoo.jpg' },
    { src: '/images/Portfolio/ornamental/mandala/lotus-mandala-sacred-geometry-back-tattoo.jpg', alt: 'Lotus mandala sacred geometry back tattoo', filename: 'lotus-mandala-sacred-geometry-back-tattoo.jpg' },
    { src: '/images/Portfolio/ornamental/mandala/mandala-ornamental-neck-feminine-floral-dotwork.jpg', alt: 'Mandala ornamental neck feminine floral dotwork', filename: 'mandala-ornamental-neck-feminine-floral-dotwork.jpg' },
    // Realism & Dotwork
    { src: '/images/Portfolio/ornamental/realism-dotwork/lion-geometry-dotwork-arm-tattoo.jpg', alt: 'Lion geometry dotwork arm tattoo', filename: 'lion-geometry-dotwork-arm-tattoo.jpg' },
    { src: '/images/Portfolio/ornamental/realism-dotwork/ornamental-dotwork-flower-half-sleeve-tattoo.jpg', alt: 'Ornamental dotwork flower half sleeve tattoo', filename: 'ornamental-dotwork-flower-half-sleeve-tattoo.jpg' },
    { src: '/images/Portfolio/ornamental/realism-dotwork/ornamental-dotwork-roses-back-tattoo.jpg', alt: 'Ornamental dotwork roses back tattoo', filename: 'ornamental-dotwork-roses-back-tattoo.jpg' },
    { src: '/images/Portfolio/ornamental/realism-dotwork/ornamental-back-floral-mandala-dotwork-realism-tattoo.jpg', alt: 'Ornamental back floral mandala dotwork realism tattoo', filename: 'ornamental-back-floral-mandala-dotwork-realism-tattoo.jpg' },
    { src: '/images/Portfolio/ornamental/realism-dotwork/ornamental-female-portrait-mandala-dotwork-arm-tattoo.jpg', alt: 'Ornamental female portrait mandala dotwork arm tattoo', filename: 'ornamental-female-portrait-mandala-dotwork-arm-tattoo.jpg' },
    { src: '/images/Portfolio/ornamental/realism-dotwork/feminine-mandala-portrait-tattoo-lotus-and-roses-forearm.png', alt: 'Feminine mandala portrait tattoo lotus and roses forearm', filename: 'feminine-mandala-portrait-tattoo-lotus-and-roses-forearm.png' }
  ],
  'custom fine art': [
    { src: '/images/Portfolio/custom fine art/arm-angel-dna-raven-geometric-fine-line-tattoo.jpg', alt: 'Arm angel dna raven geometric fine line tattoo', filename: 'arm-angel-dna-raven-geometric-fine-line-tattoo.jpg' },
    { src: '/images/Portfolio/custom fine art/calf-cheetah-heart-tree-geometric-fine-line-tattoo.jpg', alt: 'Calf cheetah heart tree geometric fine line tattoo', filename: 'calf-cheetah-heart-tree-geometric-fine-line-tattoo.jpg' },
    { src: '/images/Portfolio/custom fine art/greek-statue-dual-portrait-surreal-family-code-thigh-tattoo1.jpg', alt: 'Greek statue dual portrait surreal family code thigh tattoo 1', filename: 'greek-statue-dual-portrait-surreal-family-code-thigh-tattoo1.jpg' },
    { src: '/images/Portfolio/custom fine art/greek-statue-dual-portrait-surreal-family-code-thigh-tattoo-process.jpg', alt: 'Greek statue dual portrait surreal family code thigh tattoo process', filename: 'greek-statue-dual-portrait-surreal-family-code-thigh-tattoo-process.jpg' }
  ],
  'abstract': [
    { src: '/images/Portfolio/abstract/abstract-moonburst-neckline-black-tattoo.jpg', alt: 'Abstract moonburst neckline black tattoo', filename: 'abstract-moonburst-neckline-black-tattoo.jpg' },
    { src: '/images/Portfolio/abstract/watercolor-dog-pawprint-abstract-forearm.jpg', alt: 'Watercolor dog pawprint abstract forearm', filename: 'watercolor-dog-pawprint-abstract-forearm.jpg' },
    { src: '/images/Portfolio/abstract/phoenix-minimal-abstract-watercolor-red-forearm.jpg', alt: 'Phoenix minimal abstract watercolor red forearm', filename: 'phoenix-minimal-abstract-watercolor-red-forearm.jpg' },
    { src: '/images/Portfolio/abstract/geometric-abstract-bionic-spine-tech-tattoo-back.jpg', alt: 'Geometric abstract bionic spine tech tattoo back', filename: 'geometric-abstract-bionic-spine-tech-tattoo-back.jpg' },
    { src: '/images/Portfolio/abstract/black-ink-phoenix-tattoo-side-ribcage-paintbrush-style.png', alt: 'Black ink phoenix tattoo side ribcage paintbrush style', filename: 'black-ink-phoenix-tattoo-side-ribcage-paintbrush-style.png' }
  ],
  'studio-bts': [
    { src: '/images/Portfolio/studio-bts/asgard-studio-outside-view.jpg', alt: 'Asgard studio outside view', filename: 'asgard-studio-outside-view.jpg' },
    { src: '/images/Portfolio/studio-bts/asgard-tattoo-process-bts-1.jpg', alt: 'Asgard tattoo process bts 1', filename: 'asgard-tattoo-process-bts-1.jpg' },
    { src: '/images/Portfolio/studio-bts/asgard-tattoo-process-bts-2.jpg', alt: 'Asgard tattoo process bts 2', filename: 'asgard-tattoo-process-bts-2.jpg' },
    { src: '/images/Portfolio/studio-bts/asgard-tattoo-process-bts-3.jpg', alt: 'Asgard tattoo process bts 3', filename: 'asgard-tattoo-process-bts-3.jpg' },
    { src: '/images/Portfolio/studio-bts/asgard-tattoo-process-bts-4.jpg', alt: 'Asgard tattoo process bts 4', filename: 'asgard-tattoo-process-bts-4.jpg' },
    { src: '/images/Portfolio/studio-bts/asgard-tattoo-process-bts-5.jpg', alt: 'Asgard tattoo process bts 5', filename: 'asgard-tattoo-process-bts-5.jpg' },
    { src: '/images/Portfolio/studio-bts/asgard-tattoo-process-bts-6.jpg', alt: 'Asgard tattoo process bts 6', filename: 'asgard-tattoo-process-bts-6.jpg' },
    { src: '/images/Portfolio/studio-bts/asgard-thor-loki-airbrush-wall.jpg', alt: 'Asgard thor loki airbrush wall', filename: 'asgard-thor-loki-airbrush-wall.jpg' },
    { src: '/images/Portfolio/studio-bts/eszter-self-tattooing-process-bts.jpg', alt: 'Eszter self tattooing process bts', filename: 'eszter-self-tattooing-process-bts.jpg' },
    { src: '/images/Portfolio/studio-bts/eszter-self-tattooing-process-bts-2.jpg', alt: 'Eszter self tattooing process bts 2', filename: 'eszter-self-tattooing-process-bts-2.jpg' },
    { src: '/images/Portfolio/studio-bts/asgard-post-tattoo-process-family-member.jpg', alt: 'Asgard post tattoo process family member', filename: 'asgard-post-tattoo-process-family-member.jpg' }
  ]
};

export function PortfolioGallery({ style }: PortfolioGalleryProps) {
  const [sections, setSections] = useState<PortfolioSection[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolioImages = async () => {
      try {
        // Map URL style to actual folder name
        const folderName = styleMapping[style] || style;
        
        // Get images from our static database
        const styleImages = imageDatabase[folderName] || [];
        
        if (styleImages.length === 0) {
          console.warn(`No images found for style: ${folderName}`);
          setSections([]);
          setLoading(false);
          return;
        }

        // Group images by logical sections based on folder structure
        const sectionMap = new Map<string, PortfolioImage[]>();

        styleImages.forEach(image => {
          // Extract subfolder from the path
          const pathParts = image.src.split('/');
          let subfolder = 'Main Gallery';
          
          // For images in subfolders, use the subfolder name
          if (pathParts.length >= 6) {
            subfolder = pathParts[5];
          }

          if (!sectionMap.has(subfolder)) {
            sectionMap.set(subfolder, []);
          }

          sectionMap.get(subfolder)?.push(image);
        });

        // Convert map to sections array
        const sectionsArray: PortfolioSection[] = Array.from(sectionMap.entries()).map(([folder, images]) => ({
          title: folderDisplayNames[folder] || folder.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          images: images.sort((a, b) => a.filename.localeCompare(b.filename))
        }));

        // Sort sections by title
        sectionsArray.sort((a, b) => a.title.localeCompare(b.title));

        setSections(sectionsArray);
      } catch (error) {
        console.error('Error loading portfolio images:', error);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioImages();
  }, [style]);

  const getAllImages = () => {
    return sections.flatMap(section => section.images);
  };

  const getGlobalImageIndex = (sectionIndex: number, imageIndex: number) => {
    let globalIndex = 0;
    for (let i = 0; i < sectionIndex; i++) {
      globalIndex += sections[i].images.length;
    }
    return globalIndex + imageIndex;
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-metallic-gold text-xl mb-4">Loading gallery...</div>
          <div className="w-16 h-16 border-4 border-metallic-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-metallic-gold mb-4">Gallery Coming Soon</h2>
          <p className="text-gray-300">We're currently updating this gallery with fresh artwork.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {sections.map((section, sectionIndex) => (
        <motion.section
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-cinzel text-metallic-gold text-center">
            {section.title}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {section.images.map((image, imageIndex) => {
              const fileName = image.filename;
              const caption = captions[fileName] || "";
              // Enhanced regex to handle all image extensions properly including PNG
              const imageId = fileName.replace(/\.(jpg|jpeg|png|webp)$/i, "");
              
              return (
                <motion.figure
                  key={image.src}
                  id={imageId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: imageIndex * 0.05 }}
                  className="portfolio-figure aspect-square overflow-hidden rounded-lg cursor-pointer relative group bg-viking-navy/20"
                  onClick={() => {
                    setSelectedSection(sectionIndex);
                    setSelectedImageIndex(getGlobalImageIndex(sectionIndex, imageIndex));
                  }}
                >
                  <img
                    src={image.src}
                    alt={`Norse tattoo of ${fileName.replace(/-/g, " ").replace(/\.(jpg|jpeg|png|webp)$/i, "")}`}
                    fetchPriority="high"
                    loading="lazy"
                    className="portfolio-image w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    decoding="async"
                    onError={(e) => {
                      console.error('Image failed to load in gallery:', image.src);
                      const target = e.currentTarget as HTMLImageElement;
                      // Hide the entire portfolio figure when image fails
                      const figure = target.closest('.portfolio-figure') as HTMLElement;
                      if (figure) {
                        figure.style.display = 'none';
                      }
                    }}
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="w-full">
                      <p className="text-white text-sm font-medium mb-1">{image.alt}</p>
                      {caption && (
                        <figcaption className="text-gray-300 text-xs italic leading-relaxed">
                          {caption}
                        </figcaption>
                      )}
                      <p className="text-gray-400 text-xs mt-2">Click to view full size</p>
                    </div>
                  </div>

                  {/* Loading placeholder */}
                  <div className="absolute inset-0 bg-viking-navy/40 animate-pulse opacity-0 group-hover:opacity-0" />
                </motion.figure>
              );
            })}
          </div>
        </motion.section>
      ))}

      {/* Image Viewer */}
      {selectedImageIndex !== null && (
        <ImageViewer
          images={getAllImages().map(img => img.src)}
          currentIndex={selectedImageIndex}
          onClose={() => {
            setSelectedImageIndex(null);
            setSelectedSection(null);
          }}
          onNavigate={setSelectedImageIndex}
        />
      )}
    </div>
  );
}