/* ════════════════════════════════════════════════════════════════
   PHD125 · Tutorial 2 Data File
   How to add content:
   1. Copy this file as template for a new tutorial
   2. Change the id, tutorialNo, sections, and questions
   3. Add <script src="data/tutorial-X.js"></script> in index.html
   4. Update sw.js DATA_FILES array
════════════════════════════════════════════════════════════════ */
'use strict';
window.TUTORIALS = window.TUTORIALS || {};

/* ── SVG Helpers (used inline in answerHTML) ── */
const SVG = {
  // Benzene ring at cx,cy radius r
  benzene: (cx, cy, r) => {
    const pts = Array.from({length:6}, (_,i) => {
      const a = (i*60-90)*Math.PI/180;
      return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;
    }).join(' ');
    return `<polygon points="${pts}" fill="none" stroke="#333" stroke-width="1.5"/>
            <circle cx="${cx}" cy="${cy}" r="${r*0.6}" fill="none" stroke="#333" stroke-width="1.2"/>`;
  },
  // Standard double bond C=O (vertical up from x,y)
  co: (x, y, len=22) =>
    `<line x1="${x}" y1="${y}" x2="${x}" y2="${y-len}" stroke="#333" stroke-width="1.5"/>
     <line x1="${x+3}" y1="${y}" x2="${x+3}" y2="${y-len}" stroke="#333" stroke-width="1.5"/>
     <text x="${x-3}" y="${y-len-3}" font-family="Arial" font-size="11" fill="#C62828">O</text>`,
  // O–H bond
  oh: (x1,y1,x2,y2) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#333" stroke-width="1.5"/>
     <text x="${x2}" y="${y2+4}" font-family="Arial" font-size="11" fill="#C62828">OH</text>`,
  // NH2 group
  nh2: (x1,y1,x2,y2) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#333" stroke-width="1.5"/>
     <text x="${x2-8}" y="${y2+4}" font-family="Arial" font-size="12" fill="#1565C0">NH₂</text>`,
  // Carboxyl group complete: bond from (x1,y1) to C at (x2,y2), =O up, OH down-right
  cooh: (x1,y1,cx,cy) => `
    <line x1="${x1}" y1="${y1}" x2="${cx}" y2="${cy}" stroke="#333" stroke-width="1.5"/>
    <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy-22}" stroke="#333" stroke-width="1.5"/>
    <line x1="${cx+3}" y1="${cy}" x2="${cx+3}" y2="${cy-22}" stroke="#333" stroke-width="1.5"/>
    <text x="${cx-4}" y="${cy-25}" font-family="Arial" font-size="11" fill="#C62828">O</text>
    <line x1="${cx}" y1="${cy}" x2="${cx+16}" y2="${cy+12}" stroke="#333" stroke-width="1.5"/>
    <text x="${cx+15}" y="${cy+17}" font-family="Arial" font-size="10" fill="#C62828">OH</text>`,
};

/* ── Quick diagram card builder ── */
function diagCard(svgContent, name, formula, badgeClass, badgeText, width=115, height=85) {
  return `<div class="diagram-card">
    <svg viewBox="0 0 ${width} ${height}" width="${width-5}" height="${height-5}">${svgContent}</svg>
    <div class="d-name">${name}</div>
    ${formula ? `<div class="d-formula">${formula}</div>` : ''}
    ${badgeClass ? `<span class="d-badge ${badgeClass}">${badgeText}</span>` : ''}
  </div>`;
}

/* ════════════════════════════════════════════════════════════════
   TUTORIAL DEFINITION
════════════════════════════════════════════════════════════════ */
window.TUTORIALS['phd125-t2'] = {
  id: 'phd125-t2',
  code: 'PHD125',
  subject: 'Pharmaceutical Organic Chemistry',
  tutorialNo: 2,
  topicShort: 'Carbonyl, Acids, Aldehydes, Ketones, Esters, Amides, Amines',
  sections: [

/* ════════════════════════════════════════════════════════════════
   SECTION 1: CARBONYL COMPOUNDS
════════════════════════════════════════════════════════════════ */
{
  id: 'carbonyl',
  title: 'Carbonyl Compounds',
  shortTitle: 'Carbonyl Compounds',
  icon: '⚗️',
  questions: [
    {
      id: 'cc-a1',
      num: 'A',
      type: 'Identification',
      navLabel: '[A] Identify Carbonyl Compounds',
      question: 'Identify the six carbonyl compounds as aldehyde, ketone, or carboxylic acid.',
      searchText: 'propanal cyclohexanone acetophenone carboxylic acid identification functional group',
      tags: ['identification','aldehyde','ketone','acid'],
      answerHTML: `
        ${R.diag([
          { svg: `<text x="2" y="50" font-family="Arial" font-size="11" fill="#555">CH₃</text>
            <line x1="26" y1="46" x2="52" y2="28" stroke="#333" stroke-width="1.5"/>
            <line x1="52" y1="28" x2="78" y2="46" stroke="#333" stroke-width="1.5"/>
            <line x1="78" y1="46" x2="78" y2="20" stroke="#333" stroke-width="1.5"/>
            <line x1="81" y1="46" x2="81" y2="20" stroke="#333" stroke-width="1.5"/>
            <text x="74" y="17" font-family="Arial" font-size="12" fill="#C62828">O</text>
            <line x1="78" y1="46" x2="100" y2="60" stroke="#333" stroke-width="1.5"/>
            <text x="102" y="64" font-family="Arial" font-size="11" fill="#777">H</text>`,
            name:'Propanal', formula:'CH₃CH₂CHO', badge:'Aldehyde', bc:'tag-ald' },
          { svg: `<polygon points="60,47 49,66 27,66 16,47 27,28 49,28" fill="none" stroke="#333" stroke-width="1.5"/>
            <line x1="60" y1="47" x2="83" y2="47" stroke="#333" stroke-width="1.5"/>
            <line x1="83" y1="47" x2="83" y2="23" stroke="#333" stroke-width="1.5"/>
            <line x1="86" y1="47" x2="86" y2="23" stroke="#333" stroke-width="1.5"/>
            <text x="79" y="20" font-family="Arial" font-size="11" fill="#C62828">O</text>
            <line x1="83" y1="47" x2="100" y2="60" stroke="#333" stroke-width="1.5"/>
            <text x="99" y="65" font-family="Arial" font-size="10" fill="#C62828">OH</text>`,
            name:'Cyclohexanecarboxylic acid', formula:'C₆H₁₁COOH', badge:'Carboxylic Acid', bc:'tag-acid' },
          { svg: `<polygon points="60,52 49,71 27,71 16,52 27,33 49,33" fill="none" stroke="#333" stroke-width="1.5"/>
            <circle cx="38" cy="52" r="13" fill="none" stroke="#333" stroke-width="1.2"/>
            <line x1="60" y1="52" x2="82" y2="52" stroke="#333" stroke-width="1.5"/>
            <line x1="82" y1="52" x2="82" y2="28" stroke="#333" stroke-width="1.5"/>
            <line x1="85" y1="52" x2="85" y2="28" stroke="#333" stroke-width="1.5"/>
            <text x="78" y="25" font-family="Arial" font-size="12" fill="#C62828">O</text>
            <line x1="82" y1="52" x2="108" y2="52" stroke="#333" stroke-width="1.5"/>
            <text x="109" y="56" font-family="Arial" font-size="11" fill="#555">CH₃</text>`,
            name:'Acetophenone', formula:'C₆H₅COCH₃', badge:'Ketone', bc:'tag-ket' },
          { svg: `<line x1="47" y1="16" x2="70" y2="30" stroke="#333" stroke-width="1.5"/>
            <line x1="70" y1="30" x2="70" y2="60" stroke="#333" stroke-width="1.5"/>
            <line x1="70" y1="60" x2="47" y2="74" stroke="#333" stroke-width="1.5"/>
            <line x1="47" y1="74" x2="24" y2="60" stroke="#333" stroke-width="1.5"/>
            <line x1="24" y1="60" x2="24" y2="30" stroke="#333" stroke-width="1.5"/>
            <line x1="24" y1="30" x2="47" y2="16" stroke="#333" stroke-width="1.5"/>
            <line x1="47" y1="16" x2="47" y2="3" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="16" x2="50" y2="3" stroke="#333" stroke-width="1.5"/>
            <text x="42" y="2" font-family="Arial" font-size="12" fill="#C62828">O</text>`,
            name:'Cyclohexanone', formula:'C₆H₁₀=O', badge:'Ketone', bc:'tag-ket' },
          { svg: `<text x="2" y="28" font-family="Arial" font-size="11" fill="#555">CH₃</text>
            <text x="2" y="68" font-family="Arial" font-size="11" fill="#555">CH₃</text>
            <line x1="27" y1="25" x2="52" y2="45" stroke="#333" stroke-width="1.5"/>
            <line x1="27" y1="62" x2="52" y2="45" stroke="#333" stroke-width="1.5"/>
            <line x1="52" y1="45" x2="78" y2="45" stroke="#333" stroke-width="1.5"/>
            <line x1="78" y1="45" x2="78" y2="22" stroke="#333" stroke-width="1.5"/>
            <line x1="81" y1="45" x2="81" y2="22" stroke="#333" stroke-width="1.5"/>
            <text x="74" y="19" font-family="Arial" font-size="12" fill="#C62828">O</text>
            <line x1="78" y1="45" x2="96" y2="58" stroke="#333" stroke-width="1.5"/>
            <text x="95" y="63" font-family="Arial" font-size="10" fill="#C62828">OH</text>`,
            name:'2-Methylpropanoic acid', formula:'(CH₃)₂CHCOOH', badge:'Carboxylic Acid', bc:'tag-acid' },
          { svg: `<text x="2" y="50" font-family="Arial" font-size="11" fill="#555">CH₃</text>
            <line x1="27" y1="46" x2="53" y2="28" stroke="#333" stroke-width="1.5"/>
            <line x1="53" y1="28" x2="53" y2="7" stroke="#333" stroke-width="1.5"/>
            <line x1="56" y1="28" x2="56" y2="7" stroke="#333" stroke-width="1.5"/>
            <text x="49" y="5" font-family="Arial" font-size="12" fill="#C62828">O</text>
            <line x1="53" y1="28" x2="79" y2="46" stroke="#333" stroke-width="1.5"/>
            <line x1="79" y1="46" x2="105" y2="28" stroke="#333" stroke-width="1.5"/>
            <text x="106" y="32" font-family="Arial" font-size="11" fill="#555">CH₃</text>`,
            name:'Butanone (2-Butanone)', formula:'CH₃COCH₂CH₃', badge:'Ketone', bc:'tag-ket' },
        ])}
        ${R.note('<strong>Rules:</strong> Aldehyde = C=O with H on carbonyl C (–CHO). Ketone = C=O between two carbon groups. Carboxylic Acid = –COOH (C=O and –OH on same C).')}
      `,
    },
    {
      id: 'cc-b1',
      num: 'B1',
      type: 'Nomenclature',
      navLabel: '[B1] Name the Compounds (a–n)',
      question: 'Name the following compounds: a) CH₃CH₂CH₂COOH, b) H₃C–C(=O)–OH, c–n) various structures.',
      searchText: 'butanoic acid ethanoic acid hexanoic aldehyde ketone nomenclature IUPAC name',
      tags: ['naming','acid','aldehyde','ketone'],
      answerHTML: `
        ${R.table(
          ['#','Structure','IUPAC Name','Type'],
          [
            ['a','<code>CH₃CH₂CH₂COOH</code>','<strong>Butanoic acid</strong>','<span class="q-tag tag-acid">Acid</span>'],
            ['b','<code>H₃C–C(=O)–OH</code>','<strong>Ethanoic acid</strong> (acetic acid)','<span class="q-tag tag-acid">Acid</span>'],
            ['c','Branched C5 chain + COOH','<strong>4-methylpentanoic acid</strong>','<span class="q-tag tag-acid">Acid</span>'],
            ['d','Cyclohexane ring + COOH','<strong>Cyclohexanecarboxylic acid</strong>','<span class="q-tag tag-acid">Acid</span>'],
            ['e','Branched chain with Cl + COOH','<strong>3-chloro-2-ethylpentanoic acid</strong>','<span class="q-tag tag-acid">Acid</span>'],
            ['f','Cyclohexane + ethyl + COOH','<strong>4-ethylcyclohexanecarboxylic acid</strong>','<span class="q-tag tag-acid">Acid</span>'],
            ['g','C7 chain; C=O at C4','<strong>4-heptanone</strong>','<span class="q-tag tag-ket">Ketone</span>'],
            ['h','Benzene ring–CHO','<strong>Benzaldehyde</strong> (benzenecarbaldehyde)','<span class="q-tag tag-ald">Aldehyde</span>'],
            ['i','<code>C₆H₅CH₂CHO</code>','<strong>2-Phenylethanal</strong>','<span class="q-tag tag-ald">Aldehyde</span>'],
            ['j','<code>CH₃CH₂COOH</code>','<strong>Propanoic acid</strong>','<span class="q-tag tag-acid">Acid</span>'],
            ['k','<code>CH₂=CHCH₂COOH</code>','<strong>But-3-enoic acid</strong>','<span class="q-tag tag-acid">Acid</span>'],
            ['l','<code>(CH₃)₂CHCOOH</code>','<strong>2-methylpropanoic acid</strong>','<span class="q-tag tag-acid">Acid</span>'],
            ['m','Cyclopentanone ring','<strong>Cyclopentanone</strong>','<span class="q-tag tag-ket">Ketone</span>'],
            ['n','Cyclohexane ring–CHO','<strong>Cyclohexanecarbaldehyde</strong>','<span class="q-tag tag-ald">Aldehyde</span>'],
          ]
        )}
      `,
    },
    {
      id: 'cc-b2',
      num: 'B2',
      type: 'Drawing',
      navLabel: '[B2] Draw Structural Formulas',
      question: 'Draw structural formulas for: Hexanoic acid, chloroethanoic acid, formaldehyde, butanone, 2-pentanone, 1-phenylpropanone, 2-methylbutanal, benzoic acid, cyclohexanone, and more.',
      searchText: 'draw structural formula hexanoic acid formaldehyde butanone cyclohexanone benzene',
      tags: ['drawing','acid','ketone','aldehyde'],
      answerHTML: `
        <div class="diagram-row">
          ${diagCard(`<text x="2" y="50" font-family="Arial" font-size="10" fill="#555">CH₃</text>
            <line x1="24" y1="46" x2="50" y2="28" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="28" x2="76" y2="46" stroke="#333" stroke-width="1.5"/>
            <line x1="76" y1="46" x2="102" y2="28" stroke="#333" stroke-width="1.5"/>
            <line x1="102" y1="28" x2="128" y2="46" stroke="#333" stroke-width="1.5"/>
            <line x1="128" y1="46" x2="128" y2="22" stroke="#333" stroke-width="1.5"/>
            <line x1="131" y1="46" x2="131" y2="22" stroke="#333" stroke-width="1.5"/>
            <text x="124" y="19" font-family="Arial" font-size="11" fill="#C62828">O</text>
            <line x1="128" y1="46" x2="146" y2="58" stroke="#333" stroke-width="1.5"/>
            <text x="145" y="63" font-family="Arial" font-size="10" fill="#C62828">OH</text>`,
            'Hexanoic acid','CH₃(CH₂)₄COOH','tag-acid','Acid',160,70)}

          ${diagCard(`<text x="5" y="46" font-family="Arial" font-size="13" fill="#777">H</text>
            <line x1="14" y1="42" x2="38" y2="42" stroke="#333" stroke-width="1.5"/>
            <line x1="38" y1="42" x2="38" y2="16" stroke="#333" stroke-width="1.5"/>
            <line x1="41" y1="42" x2="41" y2="16" stroke="#333" stroke-width="1.5"/>
            <text x="33" y="13" font-family="Arial" font-size="13" fill="#C62828">O</text>
            <line x1="38" y1="42" x2="62" y2="42" stroke="#333" stroke-width="1.5"/>
            <text x="63" y="46" font-family="Arial" font-size="13" fill="#777">H</text>`,
            'Formaldehyde (Methanal)','HCHO','tag-ald','Aldehyde',85,70)}

          ${diagCard(`<text x="2" y="48" font-family="Arial" font-size="11" fill="#555">CH₃</text>
            <line x1="27" y1="44" x2="53" y2="26" stroke="#333" stroke-width="1.5"/>
            <line x1="53" y1="26" x2="53" y2="6" stroke="#333" stroke-width="1.5"/>
            <line x1="56" y1="26" x2="56" y2="6" stroke="#333" stroke-width="1.5"/>
            <text x="49" y="4" font-family="Arial" font-size="12" fill="#C62828">O</text>
            <line x1="53" y1="26" x2="79" y2="44" stroke="#333" stroke-width="1.5"/>
            <line x1="79" y1="44" x2="105" y2="26" stroke="#333" stroke-width="1.5"/>
            <text x="106" y="30" font-family="Arial" font-size="11" fill="#555">CH₃</text>`,
            'Butanone (2-Butanone)','CH₃COCH₂CH₃','tag-ket','Ketone',130,65)}

          ${diagCard(`<line x1="47" y1="16" x2="70" y2="30" stroke="#333" stroke-width="1.5"/>
            <line x1="70" y1="30" x2="70" y2="60" stroke="#333" stroke-width="1.5"/>
            <line x1="70" y1="60" x2="47" y2="74" stroke="#333" stroke-width="1.5"/>
            <line x1="47" y1="74" x2="24" y2="60" stroke="#333" stroke-width="1.5"/>
            <line x1="24" y1="60" x2="24" y2="30" stroke="#333" stroke-width="1.5"/>
            <line x1="24" y1="30" x2="47" y2="16" stroke="#333" stroke-width="1.5"/>
            <line x1="47" y1="16" x2="47" y2="3" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="16" x2="50" y2="3" stroke="#333" stroke-width="1.5"/>
            <text x="42" y="2" font-family="Arial" font-size="12" fill="#C62828">O</text>`,
            'Cyclohexanone','Cyclic ketone','tag-ket','Ketone',95,82)}

          ${diagCard(`<polygon points="57,55 46,74 24,74 13,55 24,36 46,36" fill="none" stroke="#333" stroke-width="1.5"/>
            <circle cx="35" cy="55" r="13" fill="none" stroke="#333" stroke-width="1.2"/>
            <line x1="57" y1="55" x2="79" y2="55" stroke="#333" stroke-width="1.5"/>
            <line x1="79" y1="55" x2="79" y2="31" stroke="#333" stroke-width="1.5"/>
            <line x1="82" y1="55" x2="82" y2="31" stroke="#333" stroke-width="1.5"/>
            <text x="75" y="28" font-family="Arial" font-size="12" fill="#C62828">O</text>
            <line x1="79" y1="55" x2="96" y2="67" stroke="#333" stroke-width="1.5"/>
            <text x="95" y="72" font-family="Arial" font-size="10" fill="#C62828">OH</text>`,
            'Benzoic acid','C₆H₅COOH','tag-acid','Acid',120,90)}
        </div>
        ${R.note('Zigzag representation: each vertex/bend represents a carbon atom. Always show functional groups (=O, –OH, –CHO) explicitly.')}
      `,
    },
    {
      id: 'cc-c1',
      num: 'C1',
      type: 'Properties',
      navLabel: '[C1] Boiling Point Explanation',
      question: 'Methyl methanoate (HCOOCH₃) and ethanoic acid (CH₃COOH) are isomers (C₂H₄O₂). Explain why ethanoic acid has a higher boiling point.',
      searchText: 'boiling point ethanoic acid methyl methanoate hydrogen bond isomer intermolecular',
      tags: ['acid','reaction'],
      answerHTML: `
        ${R.table(
          ['Property','Ethanoic acid (CH₃COOH)','Methyl methanoate (HCOOCH₃)'],
          [
            ['O–H group?','✅ Has –COOH with O–H','❌ No O–H (ester)'],
            ['H-bond','Donates AND accepts; forms cyclic dimers','Can only accept; cannot donate'],
            ['Energy needed','High — must break 2 H-bonds per dimer','Low — dipole–dipole only'],
            ['Boiling point','≈ 118°C','≈ 32°C'],
          ]
        )}
        ${R.ans('<strong>Conclusion:</strong> Ethanoic acid forms strong intermolecular hydrogen bonds (including cyclic dimers via –COOH), requiring much more energy to vaporise. Methyl methanoate, being an ester, lacks O–H and cannot donate H-bonds.')}
      `,
    },
    {
      id: 'cc-c2',
      num: 'C2',
      type: 'Properties',
      navLabel: '[C2] Boiling Point Order',
      question: 'a) Arrange in increasing BP: Pentanoic acid, 2-methylbutanoic acid, 3-methylbutanoic acid, 2,2-dimethylpropanoic acid. b) Arrange: Butanone, pentane, 1-butanol, propanoic acid.',
      searchText: 'boiling point order arrange increasing branching van der Waals hydrogen bond',
      tags: ['acid','reaction'],
      answerHTML: `
        ${R.ans('<strong>a)</strong> 2,2-dimethylpropanoic acid &lt; 3-methylbutanoic acid &lt; 2-methylbutanoic acid &lt; Pentanoic acid')}
        ${R.note('All four are C₅H₁₀O₂ isomers. More branching → more spherical → less surface area → weaker van der Waals forces → lower BP. Unbranched pentanoic acid has the largest surface area and highest BP.')}
        ${R.ans('<strong>b)</strong> Pentane &lt; Butanone &lt; 1-Butanol &lt; Propanoic acid')}
        ${R.table(
          ['Compound','Intermolecular Force','Approx. BP'],
          [
            ['Pentane','Van der Waals only (nonpolar)','36°C'],
            ['Butanone','Dipole–dipole (no H-bond donation)','80°C'],
            ['1-Butanol','H-bonding via –OH','117°C'],
            ['Propanoic acid','H-bonds + dimer formation via –COOH','141°C'],
          ]
        )}
      `,
    },
    {
      id: 'cc-c3',
      num: 'C3',
      type: 'Properties',
      navLabel: '[C3] Acidity Order — Nitrobenzoic vs Benzoic',
      question: 'Arrange in increasing acidity: Compound A (nitrobenzoic acid) and Compound B (benzoic acid). Explain.',
      searchText: 'acidity nitro benzoic acid electron withdrawing resonance substituent inductive',
      tags: ['acid','reaction'],
      answerHTML: `
        <div class="diagram-row">
          ${diagCard(`<polygon points="57,50 46,69 24,69 13,50 24,31 46,31" fill="none" stroke="#333" stroke-width="1.5"/>
            <circle cx="35" cy="50" r="13" fill="none" stroke="#333" stroke-width="1.2"/>
            <line x1="57" y1="50" x2="78" y2="50" stroke="#333" stroke-width="1.5"/>
            <line x1="78" y1="50" x2="78" y2="28" stroke="#333" stroke-width="1.5"/>
            <line x1="81" y1="50" x2="81" y2="28" stroke="#333" stroke-width="1.5"/>
            <text x="74" y="25" font-family="Arial" font-size="11" fill="#C62828">O</text>
            <line x1="78" y1="50" x2="94" y2="62" stroke="#333" stroke-width="1.5"/>
            <text x="93" y="67" font-family="Arial" font-size="10" fill="#C62828">OH</text>`,
            'B: Benzoic acid','C₆H₅COOH','tag-acid','Less acidic',115,90)}
          ${diagCard(`<polygon points="57,52 46,71 24,71 13,52 24,33 46,33" fill="none" stroke="#333" stroke-width="1.5"/>
            <circle cx="35" cy="52" r="13" fill="none" stroke="#333" stroke-width="1.2"/>
            <line x1="57" y1="52" x2="79" y2="52" stroke="#333" stroke-width="1.5"/>
            <line x1="79" y1="52" x2="79" y2="30" stroke="#333" stroke-width="1.5"/>
            <line x1="82" y1="52" x2="82" y2="30" stroke="#333" stroke-width="1.5"/>
            <text x="75" y="27" font-family="Arial" font-size="11" fill="#C62828">O</text>
            <line x1="79" y1="52" x2="95" y2="64" stroke="#333" stroke-width="1.5"/>
            <text x="94" y="69" font-family="Arial" font-size="10" fill="#C62828">OH</text>
            <line x1="24" y1="71" x2="12" y2="85" stroke="#333" stroke-width="1.5"/>
            <text x="4" y="84" font-family="Arial" font-size="10" fill="#1565C0">N</text>
            <line x1="10" y1="84" x2="22" y2="94" stroke="#333" stroke-width="1.5"/>
            <line x1="10" y1="81" x2="22" y2="91" stroke="#333" stroke-width="1.2"/>
            <text x="22" y="97" font-family="Arial" font-size="9" fill="#C62828">O</text>
            <line x1="7" y1="86" x2="0" y2="96" stroke="#333" stroke-width="1.5"/>
            <text x="0" y="101" font-family="Arial" font-size="9" fill="#C62828">O⁻</text>`,
            'A: Nitrobenzoic acid','o-NO₂C₆H₄COOH','tag-acid','More acidic',115,105)}
        </div>
        ${R.ans('<strong>Order (increasing acidity):</strong> B (benzoic acid) &lt; A (nitrobenzoic acid)')}
        ${R.note('<strong>Reason:</strong> The –NO₂ group is strongly electron-withdrawing (by both inductive and resonance effects). It withdraws electron density from the ring and stabilises the carboxylate anion (COO⁻) formed after proton donation. Greater stability of COO⁻ = stronger acid. Benzoic acid has no such EW substituent and is less acidic by comparison.')}
      `,
    },
    {
      id: 'cc-d1',
      num: 'D1',
      type: 'Synthesis',
      navLabel: '[D1] Synthesis — Carboxylic Acids',
      question: 'a) Prepare ethanoic acid from: i) ethanol, ii) ethanonitrile. b) Prepare butanoic acid from: i) propene, ii) 1-butanol. c) Synthesise 2-methylpropanoic acid from aldehyde X and alcohol Y.',
      searchText: 'synthesis carboxylic acid ethanol nitrile hydrolysis Grignard CO2 oxidation propene butanol',
      tags: ['acid','reaction','synthesis'],
      answerHTML: `
        <strong style="font-size:13px;">a) Ethanoic acid (CH₃COOH):</strong>
        ${R.eq(`i) CH₃CH₂OH  →[K₂Cr₂O₇/H₂SO₄, excess, Δ]→  CH₃COOH
   Oxidation of primary alcohol (excess oxidant gives acid, not aldehyde)

ii) CH₃CN + 2H₂O  →[H₂SO₄(aq), Δ]→  CH₃COOH + NH₄⁺
   Hydrolysis of nitrile: CN → CONH₂ → COOH`)}
        <strong style="font-size:13px;">b) Butanoic acid (CH₃CH₂CH₂COOH):</strong>
        ${R.eq(`i) From propene — via Grignard + CO₂:
   Step 1: CH₃CH=CH₂ + HBr (peroxide)  →  CH₃CH₂CH₂Br  [anti-Markovnikov]
   Step 2: CH₃CH₂CH₂Br + Mg/ether  →  CH₃CH₂CH₂MgBr  [Grignard reagent]
   Step 3: CH₃CH₂CH₂MgBr + CO₂  →  CH₃CH₂CH₂COOMgBr
   Step 4: + H₃O⁺  →  CH₃CH₂CH₂COOH  [butanoic acid; chain +1C]

ii) From 1-butanol:
   CH₃CH₂CH₂CH₂OH + K₂Cr₂O₇/H₂SO₄ (excess, Δ)  →  CH₃CH₂CH₂COOH`)}
        <strong style="font-size:13px;">c) 2-Methylpropanoic acid from X and Y:</strong>
        ${R.grid2([
          R.lbl('Compound X (Aldehyde)','2-Methylpropanal: (CH₃)₂CHCHO'),
          R.lbl('Compound Y (Alcohol)','2-Methyl-1-propanol: (CH₃)₂CHCH₂OH'),
        ])}
        ${R.eq(`Step 1: (CH₃)₂CHCH₂OH →[K₂Cr₂O₇/H₂SO₄ controlled or PCC]→ (CH₃)₂CHCHO [X]
Step 2: (CH₃)₂CHCHO →[K₂Cr₂O₇/H₂SO₄ excess]→ (CH₃)₂CHCOOH`)}
      `,
    },
    {
      id: 'cc-e1',
      num: 'E1',
      type: 'Reactions',
      navLabel: '[E1] Common Carbonyl Reactions',
      question: 'Name two most common reactions of carbonyl groups. (March 2014)',
      searchText: 'nucleophilic addition acyl substitution carbonyl group reaction',
      tags: ['reaction','mechanism'],
      examYear: '2014',
      answerHTML: `
        ${R.grid2([
          `${R.lbl('Reaction 1','Nucleophilic Addition')}<div style="font-size:12px;color:var(--text2);margin-top:4px;">A nucleophile (Nu:) attacks the electrophilic carbonyl C (C=O). The π bond breaks; Nu bonds to C. Typical for aldehydes and ketones.</div>`,
          `${R.lbl('Reaction 2','Nucleophilic Acyl Substitution')}<div style="font-size:12px;color:var(--text2);margin-top:4px;">A nucleophile replaces a leaving group on the carbonyl compound. Typical for carboxylic acid derivatives (acyl chlorides, esters, amides).</div>`,
        ])}
        ${R.note('Other common reactions include: condensation (e.g. hydrazone formation), oxidation (aldehydes → acids), and reduction (C=O → C–OH).')}
      `,
    },
    {
      id: 'cc-e2',
      num: 'E2',
      type: 'Reactions',
      navLabel: '[E2] C₅H₁₁Cl → 2-Pentanone Sequence',
      question: 'Consider: C₅H₁₁Cl →A→ B →C→ 2-pentanone. a) Name A, B, C. b) When could pentanal form instead? (March 2014)',
      searchText: 'C5H11Cl pentanol 2-pentanone reaction sequence oxidation hydrolysis',
      tags: ['reaction','ketone'],
      examYear: '2014',
      answerHTML: `
        ${R.eq(`2-Chloropentane  →[A: NaOH(aq)]→  B: 2-Pentanol  →[C: K₂Cr₂O₇/H₂SO₄]→  2-Pentanone`)}
        ${R.table(
          ['Compound/Reagent','Identity','Notes'],
          [
            ['A (reagent)','NaOH(aq)','Nucleophilic substitution (SN2): Cl replaced by OH'],
            ['B (product)','2-Pentanol (pentan-2-ol)<br><code>CH₃CH(OH)CH₂CH₂CH₃</code>','Secondary alcohol'],
            ['C (reagent)','K₂Cr₂O₇/H₂SO₄, Δ','Oxidation of 2° alcohol → ketone'],
          ]
        )}
        ${R.note('<strong>Pentanal possibility:</strong> If C₅H₁₁Cl is <em>1-chloropentane</em> (primary), hydrolysis gives 1-pentanol. Controlled mild oxidation (PCC) of 1-pentanol → <strong>pentanal</strong> (an aldehyde, not ketone). Thus, the structural isomer 1-chloropentane can ultimately lead to pentanal.')}
      `,
    },
    {
      id: 'cc-e3',
      num: 'E3',
      type: 'Reactions',
      navLabel: '[E3] Benzyl Chloride → Phenylethanoic acid',
      question: 'Show reagents X, Y and intermediate Z to produce phenylethanoic acid from benzyl chloride. (March 2016)',
      searchText: 'benzyl chloride phenylethanoic acid KCN nitrile hydrolysis intermediate',
      tags: ['acid','reaction','synthesis'],
      examYear: '2016',
      answerHTML: `
        ${R.eq(`PhCH₂Cl  →[X: KCN, SN2]→  Z: PhCH₂CN  →[Y: H₂O/H₂SO₄, Δ]→  PhCH₂COOH`)}
        ${R.grid3([
          R.lbl('X','KCN (potassium cyanide)<br>SN2 substitution — Cl replaced by CN⁻'),
          R.lbl('Z','PhCH₂CN — Phenylacetonitrile (benzyl cyanide)'),
          R.lbl('Y','H₂O/H₂SO₄ (dilute acid), heat — nitrile hydrolysis to COOH'),
        ])}
        ${R.note('This route extends the chain by one carbon: –CH₂Cl → –CH₂CN → –CH₂COOH. The nitrile acts as the key intermediate.')}
      `,
    },
    {
      id: 'cc-e5',
      num: 'E5',
      type: 'Reactions',
      navLabel: '[E5] Pentanoic Acid + Reagents',
      question: 'Predict the products when pentanoic acid (CH₃(CH₂)₃COOH) reacts with: a) Na, b) NaOH, c) SOCl₂, d) LiAlH₄ then H₃O⁺, e) 2-propanol/H₂SO₄.',
      searchText: 'pentanoic acid sodium hydroxide thionyl chloride LiAlH4 reduction esterification products',
      tags: ['acid','reaction'],
      answerHTML: `
        ${R.table(
          ['Reagent','Product','Reaction Type'],
          [
            ['a) Na metal','<code>CH₃(CH₂)₃COONa + ½H₂↑</code><br><strong>Sodium pentanoate</strong>','Acid + metal'],
            ['b) NaOH','<code>CH₃(CH₂)₃COONa + H₂O</code><br><strong>Sodium pentanoate</strong>','Neutralisation'],
            ['c) SOCl₂','<code>CH₃(CH₂)₃COCl + SO₂↑ + HCl↑</code><br><strong>Pentanoyl chloride</strong>','Substitution: –OH → –Cl'],
            ['d) LiAlH₄, then H₃O⁺','<code>CH₃(CH₂)₃CH₂OH</code><br><strong>1-Pentanol</strong>','Reduction: acid → 1° alcohol'],
            ['e) 2-Propanol + H₂SO₄','<code>CH₃(CH₂)₃COOCH(CH₃)₂ + H₂O</code><br><strong>Isopropyl pentanoate</strong>','Fischer esterification'],
          ]
        )}
      `,
    },
    {
      id: 'cc-e-reactivity',
      num: 'E-Ex',
      type: 'Exam Question',
      navLabel: '[Exam] Carbonyl Reactivity Order',
      question: 'Arrange the reactivity of HCHO, CH₃CHO, and (CH₃)₂CO toward nucleophiles. Justify.',
      searchText: 'reactivity order formaldehyde ethanal propanone steric electronic nucleophilic attack',
      tags: ['reaction','mechanism','exam'],
      examYear: '2014',
      answerHTML: `
        <div class="diagram-row" style="justify-content:center;align-items:flex-end;gap:20px;">
          ${diagCard(`<text x="5" y="45" font-family="Arial" font-size="13" fill="#777">H</text>
            <line x1="14" y1="41" x2="36" y2="41" stroke="#333" stroke-width="1.5"/>
            <line x1="36" y1="41" x2="36" y2="16" stroke="#333" stroke-width="1.5"/>
            <line x1="39" y1="41" x2="39" y2="16" stroke="#333" stroke-width="1.5"/>
            <text x="32" y="13" font-family="Arial" font-size="13" fill="#C62828">O</text>
            <line x1="36" y1="41" x2="58" y2="41" stroke="#333" stroke-width="1.5"/>
            <text x="59" y="45" font-family="Arial" font-size="13" fill="#777">H</text>`,
            'HCHO','Formaldehyde','tag-ald','MOST reactive',82,65)}
          ${diagCard(`<text x="2" y="50" font-family="Arial" font-size="11" fill="#555">CH₃</text>
            <line x1="26" y1="46" x2="52" y2="28" stroke="#333" stroke-width="1.5"/>
            <line x1="52" y1="28" x2="52" y2="7" stroke="#333" stroke-width="1.5"/>
            <line x1="55" y1="28" x2="55" y2="7" stroke="#333" stroke-width="1.5"/>
            <text x="48" y="5" font-family="Arial" font-size="12" fill="#C62828">O</text>
            <line x1="52" y1="28" x2="68" y2="40" stroke="#333" stroke-width="1.5"/>
            <text x="69" y="44" font-family="Arial" font-size="11" fill="#777">H</text>`,
            'CH₃CHO','Ethanal','tag-ald','Intermediate',90,65)}
          ${diagCard(`<text x="2" y="50" font-family="Arial" font-size="11" fill="#555">CH₃</text>
            <line x1="27" y1="46" x2="53" y2="28" stroke="#333" stroke-width="1.5"/>
            <line x1="53" y1="28" x2="53" y2="7" stroke="#333" stroke-width="1.5"/>
            <line x1="56" y1="28" x2="56" y2="7" stroke="#333" stroke-width="1.5"/>
            <text x="49" y="5" font-family="Arial" font-size="12" fill="#C62828">O</text>
            <line x1="53" y1="28" x2="79" y2="46" stroke="#333" stroke-width="1.5"/>
            <text x="80" y="50" font-family="Arial" font-size="11" fill="#555">CH₃</text>`,
            '(CH₃)₂CO','Propanone','tag-ket','LEAST reactive',110,65)}
        </div>
        ${R.ans('<strong>Order (most → least reactive):</strong> HCHO > CH₃CHO > (CH₃)₂CO')}
        ${R.note('<strong>Two reasons:</strong><br>① <em>Steric effect:</em> More alkyl groups around the carbonyl C → more hindered → Nu⁻ harder to approach. HCHO has no alkyl groups (most accessible).<br>② <em>Electronic effect:</em> Alkyl groups donate electrons (+I effect), increasing electron density on carbonyl C → less δ⁺ electrophilicity → less reactive toward nucleophiles.')}
      `,
    },
  ],
},

/* ════════════════════════════════════════════════════════════════
   SECTION 2: CARBOXYLIC ACID
════════════════════════════════════════════════════════════════ */
{
  id: 'carboxylic',
  title: 'Carboxylic Acid',
  shortTitle: 'Carboxylic Acid',
  icon: '🧪',
  questions: [
    {
      id: 'ca-q1',
      num: 'Q1',
      type: 'Nomenclature',
      navLabel: '[Q1] IUPAC Names (a–l)',
      question: 'Give IUPAC names for: a) CH₃CH₂CH(CH₃)COOH, b) CH₃CHBrCOOH, c) C₆H₅CH₂COOH, d) PhCH₂CH₂COOH, and more.',
      searchText: 'IUPAC name carboxylic acid methylbutanoic bromopropanoic phenylethanoic valproic',
      tags: ['acid','naming'],
      answerHTML: `
        ${R.table(
          ['#','Formula','IUPAC Name','Key Feature'],
          [
            ['a','<code>CH₃CH₂CH(CH₃)COOH</code>','<strong>2-methylbutanoic acid</strong>','CH₃ branch at C2 of 4C acid'],
            ['b','<code>CH₃CHBrCOOH</code>','<strong>2-bromopropanoic acid</strong>','Br at C2 of propanoic acid'],
            ['c','<code>C₆H₅CH₂COOH</code>','<strong>2-phenylethanoic acid</strong>','Phenylacetic acid'],
            ['d','<code>PhCH₂CH₂COOH</code>','<strong>3-phenylpropanoic acid</strong>','Hydrocinnamic acid'],
            ['e','<code>CH₃CH(CH₃)CHBrCOOH</code>','<strong>2-bromo-3-methylbutanoic acid</strong>','Br at C2, CH₃ at C3'],
            ['f','<code>HOOCCH₂CH(CH₃)CH₂COOH</code>','<strong>3-methylpentanedioic acid</strong>','Dicarboxylic acid'],
            ['g','Unsaturated branched acid','<strong>4-methylpent-3-enoic acid</strong>','Alkene + COOH'],
            ['h','Iodo-substituted acid','<strong>3-iodo-2-methylpentanoic acid</strong>','I and CH₃ substituents'],
            ['i','Benzene + COOH + Cl (meta)','<strong>3-chlorobenzoic acid</strong>','Aromatic acid'],
            ['j','Benzene + COOH + 2×NO₂','<strong>2,4-dinitrobenzoic acid</strong>','Two nitro groups'],
            ['k','Long dicarboxylic acid','<strong>3-ethyl-6-methyloctanedioic acid</strong>','Complex chain'],
            ['l','<code>(CH₃CH₂CH₂)₂CHCOOH</code>','<strong>2-propylpentanoic acid</strong>','= Valproic acid (drug!)'],
          ]
        )}
        ${R.pharma('<strong>Valproic acid</strong> (2-propylpentanoic acid) — antiepileptic and mood stabiliser used in Malaysia. Brand names: <strong>Epilim®, Depakene®</strong>. Key drug to know in Pharmacy practice.')}
      `,
    },
    {
      id: 'ca-q2',
      num: 'Q2',
      type: 'Drawing',
      navLabel: '[Q2] Draw Structures',
      question: 'Draw molecular structures for: a) 2-hydroxy-3,4-dimethylpentanoic acid, b) o-hydroxybenzoic acid (salicylic acid), c) 3-amino-4-chloro-6-phenylhexanoic acid, d) 2,4-hexadienoic acid (sorbic acid).',
      searchText: 'salicylic acid sorbic acid hydroxy draw structure',
      tags: ['acid','drawing'],
      answerHTML: `
        <div class="diagram-row">
          ${diagCard(`<polygon points="62,55 51,74 29,74 18,55 29,36 51,36" fill="none" stroke="#333" stroke-width="1.5"/>
            <circle cx="40" cy="55" r="13" fill="none" stroke="#333" stroke-width="1.2"/>
            <line x1="62" y1="55" x2="84" y2="55" stroke="#333" stroke-width="1.5"/>
            <line x1="84" y1="55" x2="84" y2="32" stroke="#333" stroke-width="1.5"/>
            <line x1="87" y1="55" x2="87" y2="32" stroke="#333" stroke-width="1.5"/>
            <text x="80" y="29" font-family="Arial" font-size="11" fill="#C62828">O</text>
            <line x1="84" y1="55" x2="100" y2="67" stroke="#333" stroke-width="1.5"/>
            <text x="99" y="72" font-family="Arial" font-size="10" fill="#C62828">OH</text>
            <line x1="51" y1="36" x2="66" y2="22" stroke="#333" stroke-width="1.5"/>
            <text x="65" y="18" font-family="Arial" font-size="11" fill="#C62828">OH</text>`,
            'o-Hydroxybenzoic acid (Salicylic acid)','C₇H₆O₃','tag-acid','Acid',130,92)}

          ${diagCard(`<text x="2" y="50" font-family="Arial" font-size="11" fill="#555">CH₃</text>
            <line x1="28" y1="46" x2="52" y2="28" stroke="#333" stroke-width="1.5"/>
            <line x1="52" y1="28" x2="78" y2="46" stroke="#333" stroke-width="1.5"/>
            <line x1="52" y1="26" x2="78" y2="44" stroke="#333" stroke-width="1.2"/>
            <line x1="78" y1="46" x2="104" y2="28" stroke="#333" stroke-width="1.5"/>
            <line x1="104" y1="28" x2="130" y2="46" stroke="#333" stroke-width="1.5"/>
            <line x1="104" y1="26" x2="130" y2="44" stroke="#333" stroke-width="1.2"/>
            <line x1="130" y1="46" x2="130" y2="24" stroke="#333" stroke-width="1.5"/>
            <line x1="133" y1="46" x2="133" y2="24" stroke="#333" stroke-width="1.5"/>
            <text x="126" y="21" font-family="Arial" font-size="11" fill="#C62828">O</text>
            <line x1="130" y1="46" x2="148" y2="58" stroke="#333" stroke-width="1.5"/>
            <text x="147" y="63" font-family="Arial" font-size="10" fill="#C62828">OH</text>`,
            'Sorbic acid (2,4-Hexadienoic acid)','CH₃CH=CHCH=CHCOOH — food preservative E200','tag-acid','Acid',162,72)}
        </div>
        ${R.pharma('<strong>Salicylic acid</strong> (o-hydroxybenzoic acid) is the precursor to aspirin (acetylsalicylic acid). It is also used in acne treatment products available in Malaysian pharmacies. <strong>Sorbic acid</strong> is used as a food preservative (E200) in Malaysian food products.')}
      `,
    },
    {
      id: 'ca-q4',
      num: 'Q4',
      type: 'Properties',
      navLabel: '[Q4] Acidity Order — para-Substituted Benzoic Acids',
      question: 'Arrange with respect to increasing acidity: p-bromobenzoic acid, p-hydroxybenzoic acid, p-nitrobenzoic acid.',
      searchText: 'acidity order para bromo hydroxy nitro benzoic acid electron withdrawing donating substituent',
      tags: ['acid','reaction'],
      answerHTML: `
        ${R.ans('<strong>Increasing acidity:</strong> p-Hydroxybenzoic acid &lt; p-Bromobenzoic acid &lt; p-Nitrobenzoic acid')}
        ${R.table(
          ['Compound','Substituent Effect','Effect on Acidity'],
          [
            ['p-Hydroxybenzoic acid','–OH: electron-donating (resonance EDG); destabilises COO⁻','Least acidic'],
            ['p-Bromobenzoic acid','–Br: weakly electron-withdrawing (net); slight stabilisation','Intermediate'],
            ['p-Nitrobenzoic acid','–NO₂: strongly electron-withdrawing (EWG); greatly stabilises COO⁻','Most acidic'],
          ]
        )}
        ${R.note('<strong>Principle:</strong> Acidity ∝ stability of conjugate base (COO⁻). EW groups stabilise COO⁻ → increase acidity. ED groups destabilise COO⁻ → decrease acidity.')}
      `,
    },
  ],
},

/* ════════════════════════════════════════════════════════════════
   SECTION 3: ALDEHYDES
════════════════════════════════════════════════════════════════ */
{
  id: 'aldehydes',
  title: 'Aldehydes',
  shortTitle: 'Aldehydes',
  icon: '🔬',
  questions: [
    {
      id: 'ald-q1',
      num: 'Q1',
      type: 'Nomenclature',
      navLabel: '[Q1] IUPAC Names (a–g)',
      question: 'Give IUPAC names for: a) CH₃(CH₂)₅CHO, b) CH₃CH(CH₃)CH(Cl)CH₂CH₂CHO, c–g) various aldehyde structures.',
      searchText: 'heptanal hexanal chloro methyl aldehyde IUPAC naming',
      tags: ['aldehyde','naming'],
      answerHTML: `
        ${R.table(
          ['#','Formula','IUPAC Name'],
          [
            ['a','<code>CH₃(CH₂)₅CHO</code>','<strong>Heptanal</strong>'],
            ['b','<code>CH₃CH(CH₃)CH(Cl)CH₂CH₂CHO</code>','<strong>4-chloro-5-methylhexanal</strong>'],
            ['c','<code>CH₃CH₂CH(Br)CH₂CH(CH₃)CHO</code>','<strong>3-bromo-5-methylhexanal</strong>'],
            ['d','<code>CH₃C(=O)(CH₂)₃CHO</code>','<strong>6-oxoheptanal</strong>'],
            ['e','<code>CH₃CH₂CH₂CH=CHCHO</code>','<strong>hex-2-enal</strong>'],
            ['f','Cyclopentane with OH and CHO','<strong>1-hydroxycyclopentane-1-carbaldehyde</strong>'],
            ['g','<code>HCHO</code>','<strong>Methanal (formaldehyde)</strong>'],
          ]
        )}
      `,
    },
    {
      id: 'ald-q4',
      num: 'Q4',
      type: 'Reactions',
      navLabel: '[Q4] Propanal + 8 Reagents',
      question: 'Give the products when propanal (CH₃CH₂CHO) reacts with: i) NaBH₄, ii) K₂Cr₂O₇/H₂SO₄, iii) H₂O, iv) HCN, v) 2,4-DNP, vi) NaHSO₃, vii) Tollens\' reagent, viii) CH₃CH₂MgBr then H₃O⁺.',
      searchText: 'propanal NaBH4 K2Cr2O7 HCN DNP NaHSO3 Tollens silver Grignard products',
      tags: ['aldehyde','reaction'],
      answerHTML: `
        ${R.table(
          ['Reagent','Product','Reaction Type'],
          [
            ['i) NaBH₄','<code>CH₃CH₂CH₂OH</code> — <strong>1-propanol</strong>','Reduction → 1° alcohol'],
            ['ii) K₂Cr₂O₇/H₂SO₄','<code>CH₃CH₂COOH</code> — <strong>propanoic acid</strong>','Oxidation → carboxylic acid'],
            ['iii) H₂O','<code>CH₃CH₂CH(OH)₂</code> — <strong>gem-diol</strong> (unstable hydrate)','Nucleophilic addition of water'],
            ['iv) HCN','<code>CH₃CH₂CH(OH)CN</code> — <strong>2-hydroxybutanenitrile</strong>','Cyanohydrin formation'],
            ['v) 2,4-DNP','Orange/yellow precipitate — <strong>propanal 2,4-DNP hydrazone</strong>','Condensation; test for C=O'],
            ['vi) NaHSO₃','<code>CH₃CH₂CH(OH)SO₃Na</code> — <strong>bisulphite adduct</strong> (crystalline)','Nucleophilic addition'],
            ['vii) Ag(NH₃)₂OH (Tollens\')','<strong>Silver mirror deposited</strong> + propanoate (positive result)','Oxidation: Ag⁺ → Ag⁰'],
            ['viii) CH₃CH₂MgBr; H₃O⁺','<code>CH₃CH₂CH(OH)CH₂CH₃</code> — <strong>pentan-3-ol</strong>','Grignard → 2° alcohol'],
          ]
        )}
        ${R.note('<strong>Key distinction:</strong> Tollens\' and Fehling\'s tests are positive for <em>aldehydes only</em> (not ketones). 2,4-DNP reacts with ALL carbonyl compounds (aldehydes AND ketones).')}
      `,
    },
    {
      id: 'ald-q7',
      num: 'Q7',
      type: 'Chemical Tests',
      navLabel: '[Q7] Differentiate Pairs',
      question: 'Describe chemical tests to differentiate: a) ethanal vs. butanal, b) ethanal vs. propanone.',
      searchText: 'iodoform test Tollens Fehling ethanal butanal propanone chemical test distinguish',
      tags: ['aldehyde','reaction'],
      answerHTML: `
        <strong style="font-size:13px;">a) Ethanal (CH₃CHO) vs. Butanal (CH₃CH₂CH₂CHO)</strong>
        ${R.ans('<strong>Test:</strong> Iodoform test (I₂ + NaOH solution)')}
        ${R.table(
          ['Compound','Result','Reason'],
          [
            ['Ethanal (CH₃CHO)','✅ Yellow CHI₃ precipitate forms','Has CH₃CO– group → positive iodoform test'],
            ['Butanal (CH₃CH₂CH₂CHO)','❌ No yellow precipitate','Does NOT have CH₃CO– → negative iodoform test'],
          ]
        )}
        <strong style="font-size:13px;">b) Ethanal (CH₃CHO) vs. Propanone (CH₃COCH₃)</strong>
        ${R.note('Both give positive iodoform test — so iodoform does NOT differentiate them. Use Tollens\' or Fehling\'s test instead.')}
        ${R.table(
          ['Compound','Tollens\' (Ag(NH₃)₂OH)','Fehling\'s','Reason'],
          [
            ['Ethanal (aldehyde)','✅ Silver mirror','✅ Brick-red Cu₂O precipitate','Aldehydes are oxidised'],
            ['Propanone (ketone)','❌ No reaction','❌ No reaction','Ketones cannot be oxidised under mild conditions'],
          ]
        )}
      `,
    },
    {
      id: 'ald-q8',
      num: 'Q8',
      type: 'Identification',
      navLabel: '[Q8] Identify Compounds A–E',
      question: 'A=CH₃CHO, B=CH₃COCH₃, C=CH₂=CHCHO, D=C₆H₅CHO, E=C₆H₅COCH₃. Which: a) is oxidised to acid (no C loss), b) reacts with NaHSO₃, c) gives yellow ppt with I₂/NaOH, d) gives silver mirror, e) gives brick-red ppt with Fehling\'s, f) gives orange ppt with 2,4-DNP?',
      searchText: 'iodoform Tollens Fehling 2,4-DNP NaHSO3 oxidation carbonyl identification',
      tags: ['aldehyde','reaction','identification'],
      answerHTML: `
        ${R.table(
          ['Test','Compounds','Explanation'],
          [
            ['a) Oxidised to acid (no C loss)','<strong>A, C, D</strong> (all aldehydes)','Aldehydes → COOH without C–C cleavage. Ketones cannot.'],
            ['b) NaHSO₃ addition','<strong>A, B, D</strong>','Unhindered aldehydes and methyl ketones react; bulky ketones do not.'],
            ['c) Iodoform test (I₂/NaOH)','<strong>A, B, E</strong>','Must have CH₃CO– group: ethanal, propanone, acetophenone.'],
            ['d) Silver mirror (Tollens\')','<strong>A, C, D</strong> (all aldehydes)','Aldehydes reduce Ag⁺ → Ag⁰. Ketones do not react.'],
            ['e) Brick-red ppt (Fehling\'s)','<strong>A and C</strong> (aliphatic aldehydes only)','Benzaldehyde D is aromatic → negative Fehling\'s. Ketones negative.'],
            ['f) Orange ppt (2,4-DNP)','<strong>A, B, C, D, E</strong> (ALL)','2,4-DNP reacts with ALL carbonyl compounds (C=O), both aldehyde and ketone.'],
          ]
        )}
      `,
    },
  ],
},

/* ════════════════════════════════════════════════════════════════
   SECTION 4: KETONES
════════════════════════════════════════════════════════════════ */
{
  id: 'ketones',
  title: 'Ketones',
  shortTitle: 'Ketones',
  icon: '🔷',
  questions: [
    {
      id: 'ket-q4',
      num: 'Q4',
      type: 'Reactions',
      navLabel: '[Q4] 3-Pentanone + Reagents',
      question: 'Write products when 3-pentanone (CH₃CH₂COCH₂CH₃) reacts with: a) hydroxylamine (NH₂OH), b) 2,4-DNP, c) HCN, e) LiAlH₄, f) CH₃MgCl then H₃O⁺.',
      searchText: '3-pentanone hydroxylamine oxime 2,4-DNP HCN cyanohydrin LiAlH4 Grignard products',
      tags: ['ketone','reaction'],
      answerHTML: `
        ${R.table(
          ['Reagent','Product','Functional Group Formed'],
          [
            ['a) NH₂OH','<code>CH₃CH₂C(=NOH)CH₂CH₃</code> + H₂O<br><strong>3-pentanone oxime</strong>','C=N–OH (oxime)'],
            ['b) 2,4-DNP','Orange/yellow precipitate<br><strong>3-pentanone 2,4-DNP hydrazone</strong>','C=N–NHAr (hydrazone)'],
            ['c) HCN','<code>CH₃CH₂C(OH)(CN)CH₂CH₃</code><br><strong>cyanohydrin</strong>','C–OH and C–CN'],
            ['e) LiAlH₄, then H₃O⁺','<code>CH₃CH₂CH(OH)CH₂CH₃</code><br><strong>pentan-3-ol</strong>','C–OH (secondary alcohol)'],
            ['f) CH₃MgCl, then H₃O⁺','<code>CH₃CH₂C(OH)(CH₃)CH₂CH₃</code><br><strong>3-methylpentan-3-ol</strong>','Tertiary C–OH'],
          ]
        )}
        ${R.note('<strong>Key rule:</strong> Ketone + NaBH₄ or LiAlH₄ → secondary alcohol. Ketone + Grignard → tertiary alcohol.')}
      `,
    },
  ],
},

/* ════════════════════════════════════════════════════════════════
   SECTION 5: ESTERS
════════════════════════════════════════════════════════════════ */
{
  id: 'esters',
  title: 'Esters',
  shortTitle: 'Esters',
  icon: '🌸',
  questions: [
    {
      id: 'est-q2',
      num: 'Q2',
      type: 'Drawing',
      navLabel: '[Q2] Acid + Alcohol Components',
      question: 'Give the acid and alcohol needed to produce: i) HCOOCH₃, ii) CH₃CH(CH₃)CH₂COOCH₂CH₂CH₃, iii) CH₃COOCH₃, iv) cyclohexane ester.',
      searchText: 'ester acid alcohol components methanoic ethanoic formate acetate',
      tags: ['ester','reaction'],
      answerHTML: `
        ${R.table(
          ['#','Ester','Acid','Alcohol'],
          [
            ['i','<code>HCOOCH₃</code> (methyl methanoate)','<strong>Methanoic acid (HCOOH)</strong>','<strong>Methanol (CH₃OH)</strong>'],
            ['ii','<code>CH₃CH(CH₃)CH₂COOCH₂CH₂CH₃</code>','<strong>3-Methylbutanoic acid</strong>','<strong>1-Propanol</strong>'],
            ['iii','<code>CH₃COOCH₃</code> (methyl ethanoate)','<strong>Ethanoic acid (CH₃COOH)</strong>','<strong>Methanol (CH₃OH)</strong>'],
            ['iv','Cyclohexanecarboxylate ester','<strong>Cyclohexanecarboxylic acid</strong>','<strong>Branched alcohol (per structure)</strong>'],
          ]
        )}
        ${R.note('<strong>Naming rule:</strong> Ester name = [alkyl from alcohol] [acyl from acid]-ate. E.g., methyl ethanoate = methanol + ethanoic acid.')}
      `,
    },
    {
      id: 'est-q3',
      num: 'Q3',
      type: 'Reactions',
      navLabel: '[Q3] Ester A Analysis',
      question: 'Given: CH₃CO₂H + Y → Ester A (CH₃CO₂CH₂CH₂CH₂CH₃) + H₂O. a) Formula of Y. b) Name Y. c) Name reaction. d) Products of Ester A with: i) H₂O/H⁺, ii) secondary amine, iii) sec-butanol, iv) excess CH₃CH₂MgBr.',
      searchText: 'ester A butyl ethanoate 1-butanol esterification hydrolysis Grignard aminolysis transesterification',
      tags: ['ester','reaction'],
      answerHTML: `
        ${R.grid3([
          R.lbl('a) Formula of Y','<code>CH₃CH₂CH₂CH₂OH</code> (1-butanol)'),
          R.lbl('b) Name of Y','Butan-1-ol (1-butanol)'),
          R.lbl('c) Reaction name','Fischer Esterification (conc. H₂SO₄ cat., heat; reversible ⇌)'),
        ])}
        <strong style="font-size:13px;display:block;margin-top:8px;">d) Products when Ester A reacts:</strong>
        ${R.table(
          ['Reagent','Product','Reaction'],
          [
            ['i) H₂O/H⁺','<code>CH₃COOH + CH₃CH₂CH₂CH₂OH</code><br>Ethanoic acid + 1-butanol','Acid hydrolysis (reverse esterification)'],
            ['ii) Secondary amine','Amide + 1-butanol','Aminolysis'],
            ['iii) sec-Butanol','<code>CH₃COOCH(CH₃)CH₂CH₃</code><br>sec-butyl ethanoate','Transesterification'],
            ['iv) Excess CH₃CH₂MgBr','<code>CH₃C(OH)(CH₂CH₃)₂</code><br><strong>3-methylpentan-3-ol</strong> (after H₃O⁺)','2 equiv. Grignard → tertiary alcohol'],
          ]
        )}
        ${R.note('<strong>Grignard + ester:</strong> Ester reacts with 2 equivalents of Grignard reagent. First addition gives a ketone intermediate, which reacts with the second equivalent to give a tertiary alcohol.')}
      `,
    },
    {
      id: 'est-q4c',
      num: 'Q4c',
      type: 'Synthesis',
      navLabel: '[Q4c] Benzyl Bromide → Benzyl Benzoate',
      question: 'Outline the conversion: benzyl bromide → benzyl benzoate. Include all steps and reagents.',
      searchText: 'benzyl bromide benzyl benzoate synthesis scabicide steps',
      tags: ['ester','reaction','synthesis'],
      answerHTML: `
        ${R.diag([
          {svg: `<polygon points="57,55 46,74 24,74 13,55 24,36 46,36" fill="none" stroke="#333" stroke-width="1.5"/>
            <circle cx="35" cy="55" r="13" fill="none" stroke="#333" stroke-width="1.2"/>
            <line x1="57" y1="55" x2="78" y2="55" stroke="#333" stroke-width="1.5"/>
            <text x="76" y="52" font-family="Arial" font-size="11" fill="#555">CH₂</text>
            <line x1="92" y1="55" x2="106" y2="55" stroke="#333" stroke-width="1.5"/>
            <text x="105" y="58" font-family="Arial" font-size="11" fill="#6A1B9A">Br</text>`,
           name:'Benzyl bromide', formula:'C₆H₅CH₂Br', badge:'Starting material', bc:'tag-reaction'},
          {svg: `<polygon points="40,62 29,81 7,81 0,62 7,43 29,43" fill="none" stroke="#333" stroke-width="1.5"/>
            <circle cx="20" cy="62" r="11" fill="none" stroke="#333" stroke-width="1.1"/>
            <line x1="40" y1="62" x2="60" y2="62" stroke="#333" stroke-width="1.5"/>
            <line x1="60" y1="62" x2="60" y2="38" stroke="#333" stroke-width="1.5"/>
            <line x1="63" y1="62" x2="63" y2="38" stroke="#333" stroke-width="1.5"/>
            <text x="57" y="35" font-family="Arial" font-size="11" fill="#C62828">O</text>
            <line x1="60" y1="62" x2="78" y2="74" stroke="#333" stroke-width="1.5"/>
            <text x="76" y="78" font-family="Arial" font-size="13" fill="#C62828">O</text>
            <line x1="89" y1="76" x2="103" y2="60" stroke="#333" stroke-width="1.5"/>
            <text x="94" y="57" font-family="Arial" font-size="10" fill="#555">CH₂</text>
            <polygon points="130,45 119,64 97,64 88,45 97,26 119,26" fill="none" stroke="#333" stroke-width="1.5"/>
            <circle cx="109" cy="45" r="11" fill="none" stroke="#333" stroke-width="1.1"/>
            <line x1="103" y1="62" x2="88" y2="45" stroke="#333" stroke-width="1.5"/>`,
           name:'Benzyl benzoate', formula:'C₆H₅COOCH₂C₆H₅', badge:'Product', bc:'tag-ester'},
        ])}
        ${R.eq(`Step 1: C₆H₅CH₂Br + KCN  →  C₆H₅CH₂CN  (SN2; nitrile intermediate)
Step 2: C₆H₅CH₂CN + H₂O/H⁺, Δ  →  C₆H₅CH₂COOH  (phenylacetic acid)
Step 3: C₆H₅CH₂COOH + C₆H₅CH₂OH  →[H₂SO₄, Δ]→  C₆H₅COOCH₂C₆H₅ + H₂O`)}
        ${R.pharma('<strong>Benzyl benzoate</strong> is a topical drug used as a <strong>scabicide</strong> (treatment for scabies caused by Sarcoptes scabiei). It is available in Malaysian pharmacies (e.g., Ascabiol®). Pharmacists must understand its chemistry for counselling patients on application.')}
      `,
    },
  ],
},

/* ════════════════════════════════════════════════════════════════
   SECTION 6: AMIDES
════════════════════════════════════════════════════════════════ */
{
  id: 'amides',
  title: 'Amides',
  shortTitle: 'Amides',
  icon: '💊',
  questions: [
    {
      id: 'amid-q4',
      num: 'Q4',
      type: 'Reaction Scheme',
      navLabel: '[Q4] Compound Q Reactions',
      question: 'CH₃CONH₂ (Q) undergoes two reactions. a) IUPAC names of P (CH₃NH₂), Q, R (CH₃CH₂NH₂). b) Reagents for Reaction I (Q→P) and Reaction II (Q→R). c) Name both reactions.',
      searchText: 'ethanamide acetamide methanamine ethanamine Hofmann degradation reduction',
      tags: ['amide','reaction'],
      answerHTML: `
        ${R.grid3([
          R.lbl('Compound P (CH₃NH₂)','<strong>Methanamine</strong> (methylamine)'),
          R.lbl('Compound Q (CH₃CONH₂)','<strong>Ethanamide</strong> (acetamide)'),
          R.lbl('Compound R (CH₃CH₂NH₂)','<strong>Ethanamine</strong> (ethylamine)'),
        ])}
        ${R.table(
          ['Reaction','Reagents','Name'],
          [
            ['I: Q → P (CH₃CONH₂ → CH₃NH₂)','<strong>Br₂ + NaOH (excess), heat</strong>','<strong>Hofmann Degradation</strong> — amide loses one C (as CO₂); amine has one fewer carbon'],
            ['II: Q → R (CH₃CONH₂ → CH₃CH₂NH₂)','<strong>i) LiAlH₄, dry ether  ii) H₃O⁺</strong>','<strong>Reduction</strong> — same carbon count; C=O reduced to CH₂'],
          ]
        )}
        ${R.note('<strong>Compare:</strong> Hofmann → amine has (n−1) carbons. Reduction → amine has same n carbons as original amide.')}
      `,
    },
    {
      id: 'amid-q7-paracetamol',
      num: 'Q7',
      type: 'Pharmaceutical',
      navLabel: '[Q7] Paracetamol — Functional Groups & Reactions',
      question: 'Paracetamol (HO–C₆H₄–NHCOCH₃): a) Name functional groups. b) Products with i) Br₂/NaOH and ii) LiAlH₄. c) Name the reactions.',
      searchText: 'paracetamol acetaminophen Panadol amide phenol aromatic Hofmann LiAlH4 reduction functional groups',
      tags: ['amide','reaction','identification'],
      answerHTML: `
        <div style="display:flex;justify-content:center;margin:10px 0;">
          <div style="background:linear-gradient(135deg,#FFF9F0,#FFF3E0);border:2px solid var(--gold);border-radius:8px;padding:14px 20px;text-align:center;display:inline-block;">
            <svg viewBox="0 0 330 145" width="310" height="135">
              <polygon points="162,82 149,108 123,108 110,82 123,56 149,56" fill="none" stroke="#333" stroke-width="2"/>
              <circle cx="136" cy="82" r="18" fill="none" stroke="#333" stroke-width="1.5"/>
              <line x1="123" y1="108" x2="100" y2="126" stroke="#C62828" stroke-width="2"/>
              <text x="80" y="131" font-family="Arial" font-size="14" fill="#C62828" font-weight="bold">OH</text>
              <text x="2" y="128" font-family="Arial" font-size="9" fill="#C62828" font-style="italic">① Phenol</text>
              <line x1="149" y1="56" x2="188" y2="40" stroke="#333" stroke-width="2"/>
              <text x="186" y="38" font-family="Arial" font-size="15" fill="#1565C0" font-weight="bold">N</text>
              <line x1="195" y1="30" x2="195" y2="17" stroke="#333" stroke-width="1.5"/>
              <text x="191" y="14" font-family="Arial" font-size="11" fill="#777">H</text>
              <line x1="200" y1="38" x2="228" y2="38" stroke="#333" stroke-width="2"/>
              <line x1="228" y1="38" x2="228" y2="14" stroke="#333" stroke-width="2"/>
              <line x1="232" y1="38" x2="232" y2="14" stroke="#333" stroke-width="2"/>
              <text x="224" y="11" font-family="Arial" font-size="15" fill="#C62828" font-weight="bold">O</text>
              <line x1="228" y1="38" x2="260" y2="38" stroke="#333" stroke-width="2"/>
              <text x="261" y="42" font-family="Arial" font-size="13" fill="#333">CH₃</text>
              <text x="184" y="62" font-family="Arial" font-size="9" fill="#1565C0" font-style="italic">② Amide (–NHCO–)</text>
              <text x="100" y="142" font-family="Arial" font-size="9" fill="#555" font-style="italic">③ Aromatic ring</text>
            </svg>
            <div style="font-size:13px;font-weight:700;color:#7B1C1C;margin-top:4px;">Paracetamol (Acetaminophen)</div>
            <div style="font-size:10px;color:var(--text3);">HO–C₆H₄–NHCOCH₃ · Panadol® / Uphamol® (Malaysia)</div>
          </div>
        </div>
        <strong>a) Functional groups:</strong>
        ${R.table(
          ['Functional Group','Location','Significance'],
          [
            ['① Phenol (–OH)','Para position on benzene ring','Can form H-bonds; weak acid'],
            ['② Amide (–NHCO–)','N–H attached to C=O','Key pharmacophore; undergoes Hofmann/reduction'],
            ['③ Aromatic ring','Central benzene ring','Resonance stabilisation'],
          ]
        )}
        <strong>b) Reaction products:</strong>
        <div class="diagram-row">
          ${diagCard(`<polygon points="62,55 51,74 29,74 18,55 29,36 51,36" fill="none" stroke="#333" stroke-width="1.5"/>
            <circle cx="40" cy="55" r="13" fill="none" stroke="#333" stroke-width="1.2"/>
            <line x1="29" y1="74" x2="14" y2="88" stroke="#C62828" stroke-width="1.5"/>
            <text x="2" y="94" font-family="Arial" font-size="12" fill="#C62828">HO</text>
            <line x1="51" y1="36" x2="66" y2="22" stroke="#1565C0" stroke-width="1.5"/>
            <text x="65" y="18" font-family="Arial" font-size="12" fill="#1565C0">H₂N</text>`,
            'Product of Br₂/NaOH','4-Aminophenol (HO–C₆H₄–NH₂)','tag-amide','Hofmann product',115,95)}
          ${diagCard(`<polygon points="62,55 51,74 29,74 18,55 29,36 51,36" fill="none" stroke="#333" stroke-width="1.5"/>
            <circle cx="40" cy="55" r="13" fill="none" stroke="#333" stroke-width="1.2"/>
            <line x1="29" y1="74" x2="14" y2="88" stroke="#C62828" stroke-width="1.5"/>
            <text x="2" y="94" font-family="Arial" font-size="12" fill="#C62828">HO</text>
            <line x1="51" y1="36" x2="71" y2="22" stroke="#333" stroke-width="1.5"/>
            <text x="69" y="18" font-family="Arial" font-size="14" fill="#1565C0">N</text>
            <line x1="73" y1="12" x2="73" y2="2" stroke="#333" stroke-width="1.5"/>
            <text x="69" y="1" font-family="Arial" font-size="10" fill="#777">H</text>
            <line x1="80" y1="18" x2="100" y2="10" stroke="#333" stroke-width="1.5"/>
            <line x1="100" y1="10" x2="122" y2="22" stroke="#333" stroke-width="1.5"/>
            <text x="123" y="26" font-family="Arial" font-size="10" fill="#555">CH₃</text>`,
            'Product of LiAlH₄','4-(Ethylamino)phenol','tag-amide','Reduction product',138,95)}
        </div>
        ${R.table(
          ['Reagent','Reaction Name','Change'],
          [
            ['Br₂/NaOH','<strong>Hofmann Degradation</strong>','–NHCOCH₃ → –NH₂ (amide loses one C as CO₂)'],
            ['LiAlH₄','<strong>Reduction</strong>','–NHCOCH₃ → –NHCH₂CH₃ (C=O reduced to CH₂)'],
          ]
        )}
        ${R.pharma('<strong>Paracetamol</strong> is one of the most widely used drugs in Malaysia — sold OTC as <strong>Panadol®</strong> and <strong>Uphamol®</strong> for pain and fever. The amide functional group is central to its reactivity, stability, and mechanism of action (COX inhibition in CNS).')}
      `,
    },
    {
      id: 'amid-q8-mechanism',
      num: 'Q8',
      type: 'Mechanism',
      navLabel: '[Q8] Mechanism — Ethanamide Synthesis',
      question: 'Write the mechanism for synthesis of ethanamide (CH₃CONH₂) from ethanoyl chloride and ammonia (NH₃).',
      searchText: 'mechanism ethanamide ethanoyl chloride ammonia nucleophilic acyl substitution tetrahedral intermediate',
      tags: ['amide','mechanism'],
      answerHTML: `
        <div style="display:flex;gap:12px;align-items:flex-start;justify-content:center;flex-wrap:wrap;margin:10px 0;">
          <div style="text-align:center;min-width:100px;">
            <svg viewBox="0 0 110 85" width="100" height="78">
              <text x="2" y="48" font-family="Arial" font-size="11" fill="#555">CH₃</text>
              <line x1="26" y1="44" x2="52" y2="44" stroke="#333" stroke-width="1.5"/>
              <line x1="52" y1="44" x2="52" y2="18" stroke="#333" stroke-width="1.5"/>
              <line x1="55" y1="44" x2="55" y2="18" stroke="#333" stroke-width="1.5"/>
              <text x="48" y="15" font-family="Arial" font-size="12" fill="#C62828">O</text>
              <line x1="52" y1="44" x2="76" y2="60" stroke="#333" stroke-width="1.5"/>
              <text x="74" y="65" font-family="Arial" font-size="12" fill="#6A1B9A">Cl</text>
              <text x="60" y="28" font-family="Arial" font-size="10" fill="#1565C0">NH₃ ↗</text>
            </svg>
            <div style="font-size:10px;color:var(--maroon);font-weight:700;">Step 1</div>
            <div style="font-size:9px;color:var(--text3);">NH₃ attacks C=O</div>
          </div>
          <div style="font-size:22pt;align-self:center;color:var(--text3);">→</div>
          <div style="text-align:center;min-width:110px;">
            <svg viewBox="0 0 120 90" width="110" height="82">
              <text x="2" y="52" font-family="Arial" font-size="11" fill="#555">CH₃</text>
              <line x1="26" y1="48" x2="58" y2="48" stroke="#333" stroke-width="1.5"/>
              <line x1="58" y1="48" x2="58" y2="24" stroke="#333" stroke-width="1.5"/>
              <text x="49" y="21" font-family="Arial" font-size="11" fill="#C62828">O⁻</text>
              <line x1="58" y1="48" x2="58" y2="74" stroke="#333" stroke-width="1.5"/>
              <text x="48" y="80" font-family="Arial" font-size="11" fill="#1565C0">NH₃⁺</text>
              <line x1="58" y1="48" x2="82" y2="60" stroke="#333" stroke-width="1.5"/>
              <text x="83" y="65" font-family="Arial" font-size="11" fill="#6A1B9A">Cl</text>
            </svg>
            <div style="font-size:10px;color:var(--maroon);font-weight:700;">Step 2</div>
            <div style="font-size:9px;color:var(--text3);">Tetrahedral intermediate</div>
          </div>
          <div style="font-size:22pt;align-self:center;color:var(--text3);">→</div>
          <div style="text-align:center;min-width:110px;">
            <svg viewBox="0 0 118 82" width="108" height="75">
              <text x="2" y="48" font-family="Arial" font-size="11" fill="#555">CH₃</text>
              <line x1="26" y1="44" x2="52" y2="44" stroke="#333" stroke-width="1.5"/>
              <line x1="52" y1="44" x2="52" y2="18" stroke="#333" stroke-width="1.5"/>
              <line x1="55" y1="44" x2="55" y2="18" stroke="#333" stroke-width="1.5"/>
              <text x="48" y="15" font-family="Arial" font-size="12" fill="#C62828">O</text>
              <line x1="52" y1="44" x2="78" y2="56" stroke="#333" stroke-width="1.5"/>
              <text x="76" y="60" font-family="Arial" font-size="14" fill="#1565C0">N</text>
              <line x1="86" y1="54" x2="100" y2="44" stroke="#333" stroke-width="1.5"/>
              <text x="101" y="40" font-family="Arial" font-size="10" fill="#777">H</text>
              <line x1="86" y1="60" x2="100" y2="70" stroke="#333" stroke-width="1.5"/>
              <text x="101" y="74" font-family="Arial" font-size="10" fill="#777">H</text>
              <text x="54" y="30" font-family="Arial" font-size="9" fill="#6A1B9A">Cl⁻ ↗ leaves</text>
            </svg>
            <div style="font-size:10px;color:var(--maroon);font-weight:700;">Steps 3–4</div>
            <div style="font-size:9px;color:var(--text3);">Cl⁻ leaves; proton transfer → CH₃CONH₂</div>
          </div>
        </div>
        ${R.mech([
          'Ammonia (NH₃) acts as a nucleophile. Its lone pair attacks the electrophilic carbonyl C (δ⁺) of ethanoyl chloride.',
          'A tetrahedral intermediate forms — C now has four single bonds. The O⁻ and NH₃⁺ are on the same carbon as CH₃ and Cl.',
          'The C–Cl bond breaks; Cl⁻ departs as the leaving group. The C=O π bond reforms.',
          'Proton transfer: Cl⁻ (or a second NH₃) removes H⁺ from the NH₃⁺ group → neutral ethanamide (CH₃CONH₂).',
        ])}
        ${R.eq(`Overall: CH₃COCl + 2NH₃  →  CH₃CONH₂ + NH₄Cl
(Second NH₃ neutralises the HCl produced)`)}
        ${R.ans('<strong>Reaction type: Nucleophilic Acyl Substitution</strong> — NH₃ replaces Cl⁻ at the carbonyl centre.')}
      `,
    },
  ],
},

/* ════════════════════════════════════════════════════════════════
   SECTION 7: AMINES
════════════════════════════════════════════════════════════════ */
{
  id: 'amines',
  title: 'Amines',
  shortTitle: 'Amines',
  icon: '🧬',
  questions: [
    {
      id: 'amine-q1',
      num: 'Q1',
      type: 'Nomenclature',
      navLabel: '[Q1] IUPAC Names + Classification (a–j)',
      question: 'Give IUPAC names and classify as 1°, 2°, or 3° amine: a) (CH₃)₃CNH₂, b) cyclohexyl-NH₂, c) (C₆H₅)₂NH, d) (CH₃)₂NCH₂CH₂CH₃, and others.',
      searchText: 'amine primary secondary tertiary IUPAC name classify classification',
      tags: ['amine','naming','identification'],
      answerHTML: `
        ${R.table(
          ['#','Formula','IUPAC Name','Class'],
          [
            ['a','<code>(CH₃)₃C–NH₂</code>','<strong>2-methylpropan-2-amine</strong> (tert-butylamine)','1°'],
            ['b','Cyclohexyl ring + NH₂','<strong>Cyclohexanamine</strong>','1°'],
            ['c','<code>(C₆H₅)₂NH</code>','<strong>N-phenylaniline (diphenylamine)</strong>','2°'],
            ['d','<code>(CH₃)₂NCH₂CH₂CH₃</code>','<strong>N,N-dimethylpropan-1-amine</strong>','3°'],
            ['e','<code>NH₂(CH₂)₄NH₂</code>','<strong>Butane-1,4-diamine (putrescine)</strong>','1° (diamine)'],
            ['f','<code>CH₃CH₂CHCH₃ + NH₂</code>','<strong>Butan-2-amine</strong>','1°'],
            ['g','Benzene ring + N(CH₂CH₃)₂','<strong>N,N-diethylaniline</strong>','3°'],
            ['h','Benzene + NH₂ + NO₂ (para)','<strong>4-nitroaniline</strong>','1°'],
            ['i','Benzene + N(H)–CH₂CH₃','<strong>N-ethylaniline</strong>','2°'],
            ['j','Benzene (3-Br) + N(H)–CH₃','<strong>3-bromo-N-methylaniline</strong>','2°'],
          ]
        )}
        ${R.note('<strong>Classification rule:</strong> Count the number of carbon groups directly attached to N. 1° = one C group; 2° = two C groups; 3° = three C groups.')}
      `,
    },
    {
      id: 'amine-q3',
      num: 'Q3',
      type: 'Reactions',
      navLabel: '[Q3] n-Propylamine + 4 Reagents',
      question: 'Predict products when n-propylamine (CH₃CH₂CH₂NH₂) reacts with: a) HCl, b) methyl ethanoate, c) propanoyl chloride, d) acetic anhydride.',
      searchText: 'propylamine HCl methyl ethanoate propanoyl chloride acetic anhydride ammonium amide',
      tags: ['amine','reaction'],
      answerHTML: `
        ${R.table(
          ['Reagent','Product','Reaction Type'],
          [
            ['a) HCl','<code>CH₃CH₂CH₂NH₃⁺Cl⁻</code><br><strong>Propylammonium chloride</strong>','Acid-base (amine base + acid → ammonium salt)'],
            ['b) Methyl ethanoate (CH₃COOCH₃)','<code>CH₃CONHCH₂CH₂CH₃ + CH₃OH</code><br><strong>N-propylacetamide</strong>','Aminolysis of ester'],
            ['c) Propanoyl chloride (CH₃CH₂COCl)','<code>CH₃CH₂CONHCH₂CH₂CH₃ + HCl</code><br><strong>N-propylpropanamide</strong>','Nucleophilic acyl substitution'],
            ['d) Acetic anhydride ((CH₃CO)₂O)','<code>CH₃CONHCH₂CH₂CH₃ + CH₃COOH</code><br><strong>N-propylacetamide</strong>','Amine + anhydride → amide (milder than acyl chloride)'],
          ]
        )}
      `,
    },
    {
      id: 'amine-q8',
      num: 'Q8',
      type: 'Chemical Tests',
      navLabel: '[Q8] Distinguish Ethylamine vs Dimethylamine',
      question: 'Describe the chemical test to distinguish ethylamine (CH₃CH₂NH₂, 1°) from dimethylamine ((CH₃)₂NH, 2°).',
      searchText: 'ethylamine dimethylamine nitrous acid test NaNO2 HCl N2 gas nitrosamine distinguish primary secondary',
      tags: ['amine','reaction'],
      answerHTML: `
        ${R.ans('<strong>Test: Nitrous acid test</strong> — Add NaNO₂ + HCl (0–5°C) to each compound.')}
        <div class="diagram-row" style="justify-content:center;gap:20px;flex-wrap:wrap;">
          <div class="diagram-card" style="min-width:150px;">
            <div style="display:flex;align-items:center;gap:8px;margin:8px 0;justify-content:center;">
              <svg viewBox="0 0 90 58" width="82" height="52">
                <text x="2" y="38" font-family="Arial" font-size="11" fill="#555">CH₃</text>
                <line x1="26" y1="34" x2="52" y2="16" stroke="#333" stroke-width="1.5"/>
                <line x1="52" y1="16" x2="52" y2="40" stroke="#333" stroke-width="1.5"/>
                <text x="44" y="47" font-family="Arial" font-size="13" fill="#1565C0">NH₂</text>
              </svg>
              <div style="font-size:16pt;">→</div>
              <svg viewBox="0 0 72 55" width="65" height="50">
                <circle cx="20" cy="30" r="10" fill="none" stroke="#1565C0" stroke-width="2"/>
                <circle cx="36" cy="20" r="8" fill="none" stroke="#1565C0" stroke-width="2"/>
                <circle cx="52" cy="32" r="10" fill="none" stroke="#1565C0" stroke-width="2"/>
                <text x="12" y="35" font-family="Arial" font-size="9" fill="#1565C0">N₂</text>
                <text x="44" y="37" font-family="Arial" font-size="9" fill="#1565C0">N₂</text>
              </svg>
            </div>
            <div class="d-name">Ethylamine (1°)</div>
            <div class="d-formula">Vigorous N₂ gas effervescence</div>
            <span class="d-badge tag-amine">Primary</span>
          </div>
          <div class="diagram-card" style="min-width:150px;">
            <div style="display:flex;align-items:center;gap:8px;margin:8px 0;justify-content:center;">
              <svg viewBox="0 0 100 58" width="88" height="52">
                <text x="2" y="24" font-family="Arial" font-size="11" fill="#555">CH₃</text>
                <line x1="26" y1="22" x2="48" y2="36" stroke="#333" stroke-width="1.5"/>
                <text x="46" y="38" font-family="Arial" font-size="14" fill="#1565C0">N</text>
                <line x1="54" y1="32" x2="54" y2="18" stroke="#333" stroke-width="1.5"/>
                <text x="50" y="15" font-family="Arial" font-size="11" fill="#777">H</text>
                <line x1="60" y1="38" x2="82" y2="24" stroke="#333" stroke-width="1.5"/>
                <text x="83" y="20" font-family="Arial" font-size="11" fill="#555">CH₃</text>
              </svg>
              <div style="font-size:16pt;">→</div>
              <div style="background:#FFF59D;border:2px solid #F9A825;border-radius:6px;padding:6px 10px;font-size:10px;color:#555;text-align:center;">
                N–N=O<br><span style="color:#F9A825;font-weight:700;">yellow oil</span>
              </div>
            </div>
            <div class="d-name">Dimethylamine (2°)</div>
            <div class="d-formula">Yellow oily N-nitrosamine; no gas</div>
            <span class="d-badge tag-reaction">Secondary</span>
          </div>
        </div>
        ${R.table(
          ['Amine Type','With NaNO₂/HCl (0–5°C)','Interpretation'],
          [
            ['1° (Ethylamine)','Vigorous effervescence — N₂ gas released + alcohol formed','Unstable diazonium salt decomposes immediately'],
            ['2° (Dimethylamine)','Yellow oily N-nitrosamine: (CH₃)₂N–N=O forms (stable)','N-nitrosamine is a stable oil/precipitate — no gas'],
          ]
        )}
      `,
    },
    {
      id: 'amine-q6',
      num: 'Q6',
      type: 'Synthesis',
      navLabel: '[Q6] Synthesis — Phenyl-4-aminosalicylate (Anti-TB)',
      question: 'Phenyl-4-aminosalicylate is a drug for TB. Propose a synthesis starting from 4-nitrosalicylic acid.',
      searchText: 'phenyl-4-aminosalicylate anti-tuberculosis TB synthesis esterification nitro reduction',
      tags: ['amine','reaction','synthesis'],
      answerHTML: `
        ${R.eq(`Step 1: Esterification of –COOH with phenol:
4-NO₂-C₆H₃(OH)(COOH) + C₆H₅OH  →[conc. H₂SO₄ or SOCl₂/pyridine]→  4-NO₂-C₆H₃(OH)(COOC₆H₅)
[phenyl ester formed; –OH on ring retained]

Step 2: Reduction of –NO₂ to –NH₂:
4-NO₂-C₆H₃(OH)(COOC₆H₅) + H₂/Pd–C  →  4-NH₂-C₆H₃(OH)(COOC₆H₅)
Product: Phenyl-4-aminosalicylate`)}
        ${R.note('<strong>Order of steps matters:</strong> Esterification first (before reduction) prevents the –NH₂ from interfering with the esterification reaction. The –NO₂ is inert to esterification conditions.')}
        ${R.pharma('<strong>Phenyl-4-aminosalicylate</strong> is an anti-TB drug. Tuberculosis (TB) remains a significant public health concern in Malaysia, with the country recording thousands of new cases annually. Pharmacists must understand both the chemistry and clinical application of anti-TB agents, including patient counselling on adherence.')}
      `,
    },
  ],
},

  ], // end sections
}; // end tutorial definition
