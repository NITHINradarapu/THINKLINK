# DOCUMENT: agent-5_1 cld.pdf

# RSC Applied Interfaces 



## PAPER 

Published on 20 February 2026 <u>Licensed under CC-BY 4.0</u> 



Cite this: RSC Appl. Interfaces, 2026, 3, 706 

## HfxZr1−xO2 thin films from chemical vapor deposition of fluorinated β-ketoenamine precursors 

Billy Oktora Abdilah Fauzi, a Andreas Lichtenberg, a Corinna Hegemann,a Thomas Fischer, a Marcel Schmickler,b Harish Parala,b Anjana Devi b and Sanjay Mathur *<sup>a</sup> 

Received 15th November 2025, Accepted 9th February 2026 DOI: 10.1039/d5lf00360a rsc.li/RSCApplInter 

New Zr(IV) and Hf(IV) complexes were synthesized and applied as molecular precursors for chemical vapor deposition (CVD) of zirconium-, hafnium-, and mixed hafnium–zirconium–oxide (HZO) coatings. Reaction of tetrakis(diethylamido)metal(IV) complexes (M = Zr, Hf) with the fluorinated β-ketoenamine ligand (Z)-4-(tertbutylamino)-1,1,1-trifluorobut-3-en-2-one (H-TFB-tBuA) and tert-butyl alcohol produced new heteroleptic [M(TFB-tBuA)2(O<sup>t</sup> Bu)2] zirconium (Zr-1, M = Zr) and hafnium (Hf-1, M = Hf) complexes. Both compounds possess excellent thermal stability up to 250 °C and exhibit volatility suitable for chemical vapor deposition of ZrO2 and HfO2 thin films in a low-pressure (10<sup>−2</sup> mbar) chemical vapor deposition reactor. The vapor pressure and thermal stabilities of both Zr-1 and Hf-1 are compatible for the co-deposition of individual metal oxides, enabling direct synthesis of phase-pure HZO films with a tunable Zr: Hf ratio. The coevaporation without preferential decomposition of either precursor was attributed to the matched decomposition profiles of Zr-1 and Hf-1, enabling the single-step deposition of mixed-metal HZO films. 

### 1. Introduction 

Hafnium–zirconium–oxide (HZO), HfxZr1−xO2 (with x = 0 > x > 1), has emerged as an important material for semiconductor technologies due to its robust ferroelectric properties, high dielectric constant, and excellent thermal stability.<sup>1,2</sup> In contrast to conventional ferroelectrics, HZO is fully compatible with standard complementary metal-oxidesemiconductor (CMOS) fabrication processes, making it particularly attractive for integration into advanced CMOS devices.<sup>3</sup> The distinctive combination of its switchable polarization and scalability supports a wide range of applications, including low-power non-volatile memories, ferroelectric field-effect transistors (FeFETs), and nextgeneration logic and neuromorphic computing devices.<sup>4,5</sup> The electrical properties of HZO can be finely tuned through compositional variations and processing parameters, further enhancing its versatility as an important electronic material. Achieving high-quality HZO thin films with precise control over both composition and thickness often relies on atomic layer deposition (ALD).<sup>6</sup> 

Atomic layer deposition (ALD) of ZrO2 and HfO2 thin films is commonly performed using metal–organic precursors such 

> a Institute of Inorganic and Materials Chemistry, University of Cologne, 50939 Cologne, Germany. E-mail: sanjay.mathur@uni-koeln.de 

> b Leibniz Institute for Solid State and Materials Research, IFW Dresden, 01069 Dresden, Germany 

as tetrakis(dimethylamido)zirconium (TDMAZr),<sup>7</sup> tetrakis(ethylmethylamido)zirconium (TEMAZr),<sup>8–10</sup> Zr[Cp(NMe2)3],<sup>11,12</sup> and their hafnium analogues TDMAHf,<sup>13</sup> TEMAHf,<sup>14</sup> and Hf[Cp(NMe2)3],<sup>15</sup> in combination with oxidizing co-reactants including O2, O3, or H2O. Beyond amide-based chemistries, metal alkoxides serve as attractive precursors to high-purity oxides due to their well-defined molecular structures and relatively high volatility, which facilitate efficient gas-phase transport and controlled surface reactions rendering them well suited for both CVD and ALD processes.<sup>16</sup> For instance, pure MgAl2O4 thin films can be obtained through gas-phase transformation of [MgAl(OR)8] molecular precursors (R = O<sup>t</sup> Bu or O<sup>i</sup> Pr), followed by their transport to the substrate surface, where deposition and subsequent thermal decomposition lead to the formation of the MgAl2O4 thin films.<sup>17</sup> 

These precursor//co-reactant systems enable sequential, self-limiting surface reactions, providing precise control over growth rate, film composition, density, and interfacial quality, as well as excellent conformality on complex substrates. Consequently, ALD has been widely employed to produce high-quality ZrO2 and HfO2 thin films for nanoelectronics and gate dielectric applications. However, most ALD studies to date have focused on the individual deposition of ZrO2 and HfO2, while reports on the direct ALD growth of mixed HfxZr1−xO2 (HZO) thin films remain limited. 

More recently, Nishida et al. reported the development of a novel liquid ALD precursor system composed of an 

706 | RSC Appl. Interfaces, 2026, 3, 706–720 

© 2026 The Author(s). Published by the Royal Society of Chemistry 

RSC Applied Interfaces 

Paper 

equimolar mixture of Hf(dmap)4 and Zr(dmap)4, used together with O3 as the oxidizing coreactant, for the deposition of highquality HZO thin films targeted for ferroelectric memory applications. This mixed-precursor approach exhibits enhanced thermal stability, with decomposition temperatures reaching approximately 371 °C, as well as closely matched vapor pressures for the hafnium and zirconium components. These characteristics enable improved compositional control and uniform incorporation of Hf and Zr during the ALD process, resulting in films with superior structural integrity and functional performance.<sup>18</sup> Despite the demonstrated advantages of ALD in achieving excellent thickness uniformity, conformality, and reproducibility in HZO thin films, the technique remains subject to several inherent limitations. In particular, relatively low growth rates, high capital and operational costs associated with ALD equipment, and stringent requirements on precursor volatility, thermal stability, and reactivity can pose significant challenges for process throughput and scalability. These factors may ultimately constrain the adoption of ALD for largearea or high-volume manufacturing of ferroelectric HZObased devices.<sup>19,20</sup> 

Metal–organic chemical vapor deposition (MOCVD) is an industrially relevant and adaptable method for producing high-quality thin films from volatile metal–organic precursors. In comparison to ALD, MOCVD achieves substantially higher deposition rates and lower operational costs while accommodating a broader range of materials, making it particularly suitable for large-scale manufacturing. While ALD excels in atomic-level precision, thickness control, and conformity, MOCVD provides an optimal balance of throughput, compositional flexibility, and film quality.<sup>21</sup> Realizing the processing benefits of MOCVD requires chemically engineered precursors with high vapor pressure and adequate thermal stability. Recent advances in precursor chemistry have demonstrated enhanced volatility and thermal stability with fluorinated N^O chelating ligands.<sup>22–30</sup> For instance, the fluorinated bis(pyridylalkenolato) palladium(II) complex, Pd[PyCHC(CF3)O]2, shows higher volatility and thermal stability than its non-fluorinated analogue, Pd[PyCHC(CH3)O]2, as indicated by EI-MS and TG/DTA analyses. This improvement is attributed to the steric effect of the –CF3 group, which increases intermolecular distances. EI-MS results also show that Pd–ligand bond cleavage occurs earlier in Pd[PyCHC(CH3)O]2, whereas Pd[PyCHC(CF3)O]2 first undergoes –CF3 loss, with metal–ligand bond cleavage occurring at higher energies. Despite this, π–π stacking from the aromatic ligand may enhance intermolecular interactions in Pd[PyCHC(CF3)O]2.<sup>27</sup> 

Fluorinated β-ketoenamine ligands (Fig. 1) are particularly attractive for metal–organic precursors due to their aliphatic backbone, which contrasts with the aromatic frameworks typically found in related ligand systems. The absence of aromatic rings lowers molecular weight and prevents π–π stacking interactions, reducing intermolecular interactions that hinder volatility and thermal characteristics. Heteroleptic metal complexes (Fig. 1) with fluorinated β-ketoenamine ligands have 



Fig. 1 General chemical structures of octahedral metal complexes containing fluorinated β-ketoenamine ligands (Z)-4(tert-butylamino)-1,1,1-trifluorobut-3-en-2-one (H-TFB-tBuA),<sup>37,38</sup> (Z)-1,1,1-trifluoro-4-((2,2,2-trifluoroethyl)amino)but-3-en-2-one (H-TFB-TFEA),<sup>33</sup> (Z)-4-((2-(dimethylamino)ethyl)amino)-1,1,1trifluorobut-3-en-2-one (H-TFB-DMEDA),<sup>31</sup> (Z)-4-((3-(dimethylamino) propyl)amino)-1,1,1-trifluorobut-3-en-2-one (H-TFB-DMPDA),<sup>32</sup> and (Z)-1,1,1-trifluoro-4-((2-methoxyethyl)amino)but-3-en-2-one (H-TFBMEA)<sup>35</sup> (M = metal center). 

shown to possess high thermal stability, adequate volatility, and intramolecular ligand elimination mechanisms.<sup>31,32</sup> For example, the fluorinated β-ketoenamine ligand (Z)-1,1,1trifluoro-4-((2,2,2-trifluoroethyl)amino)but-3-en-2-one (H-TFBTFEA) has been utilized to synthesize copper- and iridiumcontaining heteroleptic complexes, which served as efficient low-pressure MOCVD precursors to grow CuOx (ref. 33) and IrOx (ref. 34) thin films. Similarly, (Z)-1,1,1-trifluoro-4-((2methoxyethyl)amino)but-3-en-2-one (H-TFB-MEA) has enabled the preparation of volatile thorium complexes [Th(OR)2(TFBMEA)2] (R =<sup>i</sup> Pr,<sup>t</sup> Bu) suitable for ThO2 thin film deposition via low-pressure MOCVD.<sup>35</sup> Besides, fluorinated β-ketoenamine ligands have shown to possess the ability to act as a clean leaving agent during the thin film deposition process,<sup>31–35</sup> unlike fluorinated aminoalcohol ligands.<sup>36</sup> 

Notably, the fluorinated β-ketoenamine ligand (Z)-4-(tertbutylamino)-1,1,1-trifluorobut-3-en-2-one (H-TFB-tBuA) has previously been investigated in uranium(IV) coordination chemistry, where it afforded a seven-coordinate heteroleptic complex, [UCl2(TFB-tBuA)2(THF)]. However, this uranium-based complex was found to be unsuitable for low-pressure MOCVD applications due to its low volatility and air sensitivity.<sup>37</sup> Building on these earlier observations and motivated by the need to overcome such limitations through alternative metal–ligand combinations, we herein report two novel zirconium- and hafnium-alkoxide derivatives incorporating the same fluorinated β-ketoenamine ligand and describe their application as precursors for the chemical vapor deposition (CVD) of ZrO2, HfO2, and HZO thin films. 

RSC Appl. Interfaces, 2026, 3, 706–720 | 707 

© 2026 The Author(s). Published by the Royal Society of Chemistry 

RSC Applied Interfaces 

Paper 

### 2. Materials and methods 

#### 2.1. Reagents, precursor syntheses, and characterization 

Chemicals were obtained from commercial suppliers (SigmaAldrich Co., Ltd., Thermo Fisher Scientific Inc., USA; Tokyo Chemical Industry Co., Ltd., Japan) and used without further purification unless stated otherwise. The fluorinated β-ketoenamine ligand H-TFB-tBuA was synthesized following a reported procedure<sup>38</sup> and purified by vacuum sublimation (1 mbar) on a cold finger. Zirconium and hafnium complexes were prepared under an inert nitrogen atmosphere using Schlenk techniques. Solvents were distilled over sodium prior to use: toluene and THF were stored over sodium wire, while n-pentane and n-heptane were stored over 4 Å molecular sieves, all under nitrogen. The precursors [Zr(NEt2)4] and [Hf(NEt2)4] were synthesized according to modified literature procedures<sup>39</sup> and purified by vacuum distillation (1 mbar). Nuclear magnetic resonance (NMR) spectra were recorded at room temperature on a Bruker Avance NEO 400 spectrometer using C6D6:<sup>1</sup> H NMR at 400 MHz,<sup>13</sup> C {<sup>1</sup> H,<sup>19</sup> F} NMR at 101 MHz, and<sup>19</sup> F NMR at 376 MHz. Spectra were analyzed with MestReNova 15.0.1. Elemental analyses were performed using a HEKAtech CHNS Euro EA 3000, with samples prepared under argon in a glovebox (H2O, O2 < 0.1 ppm). Thermal analysis was carried out on a Seiko TGA/DTA 6300S11 instrument with ∼10 mg samples in aluminum crucibles sealed with vented lids (1.5 mm<sup>2</sup> ), heated at 5 °C min<sup>−1</sup> under a 300 mL min<sup>−1</sup> flow of high-purity nitrogen. Vapor pressure measurement was carried out using vapor pressure analyzer. The measurements were performed using a Knudsen cell and under vacuum conditions (7 × 10<sup>−4</sup> Torr). Each temperature step is measured for 180 minutes. For Zr-1, the sample was measured from 60 °C to 180 °C with measurements every 10 °C and a sample mass of 20.7309 mg. For Hf-1, the sample was measured from 60 °C to 160 °C with measurements every 10 °C and a sample mass of 11.4722 mg. Single-crystal X-ray diffraction (SC-XRD) data were collected on a Bruker D8 Venture instrument and processed with APEX2. Structure solutions and refinement were performed using ShelXT and ShelXL,<sup>40</sup> and CIF editing, bond visualization, and structural analysis were conducted with PLATON, Olex2,<sup>41</sup> and VESTA.<sup>42</sup> 

2.1.1. Synthesis of bis((Z)-tert-butyl(4,4,4-trifluoro-3oxobut-1-en-1-yl)amido)bis(tert-butoxo)zirconium(IV) (Zr-1). [Zr(NEt2)4] (2.00 g, 5.27 mmol) was dissolved in n-heptane (25 mL) and stirred at room temperature. Tert-butyl alcohol (0.78 g, 10.53 mmol) was then added dropwise to the [Zr(NEt2)4] solution, when an exothermic reaction occurred. The resulting reaction mixture was stirred for 1 hour. Following this, a solution of the ligand (Z)-4-(tert-butylamino)-1,1,1-trifluorobut-3-en-2-one (H-TFB-tBuA) (2.06 g, 10.53 mmol) in toluene (25 mL) was prepared and added slowly to the reaction mixture. The solution turned yellowish, indicating complex formation, and was stirred overnight at room temperature. The solvent was removed under reduced pressure (1 mbar) to obtain a yellow powder that was purified by sublimation at 130–135 °C, yielding [Zr(TFBtBuA)2(O<sup>t</sup> Bu)2] (Zr-1) in form of a colorless crystalline sublimate with a mass of 2.97 g (90.06% yield). 

> 1H NMR (400 MHz, C6D6) δ 7.23 (H6, d, 2H), 5.45 (H5, d, 2H), 1.31 (H2, s, 18H), 1.08 (H8, s, 18H). 

> 13C {1H, 19F} NMR (101 MHz, C6D6) δ 158.48 (C6), 156.47 (C4), 120.66 (C3), 97.28 (C5), 78.11 (C1), 62.41 (C7), 32.11 (C2), 30.53 (C8). 

> 19F NMR (376 MHz, C6D6) δ −74.48 (CF3 of C3). 

Anal. Calcd. for ZrC24H40O4N2F6: C, 46.06; H, 6.46; N, 4.48. Found: C, 45.98; H, 6.67; N, 4.51. 

2.1.2. Synthesis of bis((Z)-tert-butyl(4,4,4-trifluoro-3oxobut-1-en-1-yl)amido)bis(tert-butoxo)hafnium(IV) (Hf-1). The synthesis of Hf-1 was carried out following the same procedure used for Zr-1. In this case, the hafnium precursor [Hf(NEt2)4] (3.00 g, 6.42 mmol) was used in place of [Zr(NEt2)4], the tert-butyl alcohol (0.95 g, 12.85 mmol) was used, and the fluorinated β-ketoenamine ligand H-TFB-tBuA (2.50 g, 12.85 mmol) was employed accordingly, yielding a yellow powder that was purified by sublimation at 135–139 °C to afford [Hf(TFBtBuA)2(O<sup>t</sup> Bu)2] (Hf-1) in form of a colorless crystalline sublimate with a mass of 3.80 g (82.96% yield). 

> 1H NMR (400 MHz, C6D6) δ 7.22 (H6, d, 2H), 5.43 (H5, d, 2H), 1.33 (H2, s, 18H), 1.07 (H8, s, 18H). 

> 13C {1H, 19F} NMR (101 MHz, C6D6) δ 159.23 (C6), 156.70 (C4), 120.75 (C3), 97.99 (C5), 77.11 (C1), 62.69 (C7), 32.36 (C2), 30.61 (C8). 

> 19F NMR (376 MHz, C6D6) δ −74.58 (CF3 of C3). 

Anal. Calcd for HfC24H40O4N2F6: C, 40.40; H, 5.67; N, 3.93. Found: C, 40.74; H, 5.79; N, 4.02. 

#### 2.2. FTO substrate preparation 

Fluorine-doped tin oxide (FTO) coated glass substrates (TEC 8, 300 mm × 300 mm × 3.2 mm, surface resistivity ∼8 Ω sq<sup>−1</sup> , Sigma-Aldrich, USA) were used to evaluate the optical transparency of the deposited films. FTO substrates were cut into uniform sizes (1.0 cm × 1.5 cm). The substrates were cleaned sequentially by ultrasonication for 15 minutes each in deionized water, acetone, ethyl acetate, and isopropyl alcohol to remove surface contaminants. Following the cleaning process, the substrates were dried using a nitrogen stream. 

#### 2.3. MOCVD of ZrO2, HfO2, and HZO films 

The film depositions were conducted in a horizontally configured cold-wall chemical vapor deposition (CVD) reactor equipped with a glass tube, as illustrated in Fig. 2 and described in our previous work.<sup>24,31,33,35,43–48</sup> The thin films were deposited onto FTO-coated glass substrates at 600 °C. The deposition process lasted approximately two hours, during which the precursor was maintained at a sublimation temperature of 125 °C, corresponding to the sublimation onset of Zr-1 and Hf-1 under the specified low-pressure condition (10<sup>−2</sup> mbar). 

#### 2.4. Characterization of ZrO2, HfO2, and HZO films 

Qualitative analyses of metal constituents in films obtained from the decomposition of individual Zr-1, Hf-1 precursors, and their equimolar mixture was performed using X-ray fluorescence 

708 | RSC Appl. Interfaces, 2026, 3, 706–720 

© 2026 The Author(s). Published by the Royal Society of Chemistry 

RSC Applied Interfaces 

Paper 



Fig. 2 Cold-wall, low-pressure metal–organic chemical vapor deposition (MOCVD) reactor consisting of (1) water-cooled RF-amplifier, (2) pressure sensor, (3) oven, (4) inert gas supply, (5) overpressure valve, (6) induction coil, (7) substrate, (8) thermocouple, (9) quartz glass reactor tube, (10) bypass valve, (11) main vacuum valve, (12) graphite susceptor, (13) precursor, (14) pressure sensor, (15) exhaust valve, (16) gas exhaust, (17) pre-vacuum pump, (18) high-vacuum pump, (19) liquid nitrogen cooled trap, (20) vacuum controller, (21) temperature controller, (22) RFgenerator, (23) cooling water supply. 

(XRF) spectroscopy with a Fischerscope X-ray XDL 240 instrument. The resulting spectra were analyzed with WinFTM EDXRF software. Phase composition and crystallinity of the resulting ZrO2, HfO2, and HZO films were performed using X-ray diffraction (XRD) using a STOE-STADI MP (vertical) diffractometer in reflection mode, set up in Bragg–Brentano geometry, and using molybdenum (Mo) Kα radiation with a wavelength of 0.70930 Å. Fourier transform infrared (FTIR) spectroscopy was performed to characterize the vibrational features of the thin films using a PerkinElmer Spectrum 400 spectrometer. Surface morphology and elemental distribution were analyzed by field emission scanning electron microscopy (FESEM; Zeiss Sigma 300 VP RISE) coupled with an energydispersive X-ray spectrometer (EDX; Oxford Instruments Xplore 30). Transmission electron microscopy (TEM) was performed on a FEG-type JEOL JEM2200FS instrument equipped with a UHR pole piece and operated at 200 kV, allowing nanoscale characterization of the samples' morphology and dimensions. The TEM pictures were analyzed using Fiji (ImageJ) software,<sup>49</sup> while the selected area electron diffraction (SAED) patterns were analyzed using CrysTBox software.<sup>50</sup> X-ray photoelectron spectroscopy (XPS) measurements were performed using a PHI 5600 spectrometer equipped with a monochromatic Al Kα source (200 W). Survey and high-resolution spectra were acquired at a pass energy of 29.35 eV using a 7 mm X-ray beam (aperture 4, spot size 0.8 mm) and an emission angle of 45°, with charge neutralization applied (settings 18/5) and all spectra charge-corrected by referencing the C 1s peak to 284.8 eV. 

### 3. Results and discussion 

#### 3.1. Syntheses and characterizations of Zr-1 and Hf-1 precursors 

Heteroleptic zirconium and hafnium complexes featured sixfold coordination around the metal centers constituted by two 

monodentate dialkylamido and two bidentate β-ketoiminato ligands have been identified in the reaction of one equivalent of zirconium (or hafnium) tetrakis(dialkylamide), [M(NR2)4] (M = Zr or Hf; R = Me and/or Et), with two equivalents of β-ketoimine ligands.<sup>51–53</sup> This reactivity prompted exploration of analogous reactions involving a fluorinated β-ketoenamine ligand H-TFBtBuA with [M(NEt2)4] (M = Zr or Hf) in a 2 : 1 mole ratio. Additionally, zirconium complexes containing bis-dialkylamido ligands often exhibit poor thermal stability,<sup>53,55</sup> rendering them of limited application for vapor-phase deposition processes. Therefore, reactions between zirconium (or hafnium) tetrakis(dialkylamide) precursors, [M(NR2)4] (M = Zr or Hf; R = Me and/or Et), and H-TFB-tBuA in the presence of an additional monodentate ligand, such as an alcohol, were necessary to fully replace the dialkylamide ligands. This ligand exchange strategy was employed to improve the volatility and thermal stability of the resulting zirconium and hafnium complexes. 

The reaction of one equivalent of [M(NEt2)4] (M = Zr or Hf) with two equivalents each of tert-butyl alcohol and the H-TFBtBuA ligand at room temperature resulted in the formation of colorless crystalline compounds, Zr-1 and Hf-1 (Scheme 1), which could be purified by sublimation at 130–135 °C and 135–139 °C ( p = 1 mbar), respectively. The diethylamido ligands of [M(NEt2)4] (M = Zr or Hf) were replaced with tert-butoxo ligands via proton transfer from tert-butyl alcohol, releasing diethylamine. Subsequent addition of two equivalents of H-TFB-tBuA ligands to the intermediate bis(diethylamido)bis(tert-butoxo)metal complex led to further substitution of the remaining diethylamido ligands. The substitution of all four diethylamido ligands was driven by the strong oxophilicity of zirconium and hafnium and their propensity to increase the coordination number, forming thermodynamically more stable complexes with strongly coordinating tert-butoxo and chelating TFB-tBuA ligands. 

Although [M(NEt2)4] (M = Zr or Hf) can serve as precursors for ZrO2 and HfO2 in MOCVD, these compounds are liquids at room temperature, which makes handling difficult, particularly for accurate mass measurement, and leads to material losses during sample preparation. In contrast, Zr-1 and Hf-1 are solid, crystalline materials with sufficient volatility to allow sublimation, enabling accurate weighing, convenient handling, and reproducible deposition. In addition, the objective of this reaction is to fabricate thin films using the single-source precursor concept, which requires the presence of predefined metal–oxygen bonds that are absent in the initial starting materials. Overall, the designed precursors demonstrate that rational ligand modification can produce thermally robust, easy-to-handle metal complexes suitable for controlled thin-film deposition. 

Single-crystal X-ray diffraction (SC-XRD) analyses revealed that both Zr-1 and Hf-1 crystallize in the monoclinic space group P21/n (Table S1), confirming that they are isostructural and exhibit a similar coordination environment around the metal centers (Fig. 3a and b). In both complexes, the metal atom adopts a distorted octahedral geometry, with two axial oxygen atoms defining nearly linear O–M–O angles of 

RSC Appl. Interfaces, 2026, 3, 706–720 | 709 

© 2026 The Author(s). Published by the Royal Society of Chemistry 

RSC Applied Interfaces 

Paper 



Scheme 1 General reaction scheme for the syntheses of [M(TFB-tBuA)2(O<sup>t</sup> Bu)2], Zr-1 (M = Zr) and Hf-1 (M = Hf) complexes. 

166.70(13)° for Zr (Fig. S1a) and 167.47(7)° for Hf (Fig. S1b). The equatorial plane in each complex is composed of two nitrogen atoms from the chelating TFB-tBuA ligands and two oxygen atoms from tert-butoxo ligands, resulting in a wellbalanced coordination sphere. 

The Zr–O and Hf–O bond lengths involving the TFB-tBuA ligands fall within the ranges of 2.0728(17)–2.097(3) Å (Table 1), while the corresponding Zr–N and Hf–N bond distances are between 2.460(2) and 2.496(4) Å (Table 1). These values are consistent with those reported for related heteroleptic group 4 metal complexes, indicating similar bonding characteristics and comparable ligand–metal interactions.<sup>51–54</sup> In addition, the M–O bonds associated with the tert-butoxo ligands are slightly shorter, ranging from 1.9022(17) to 1.916(3) Å (Table 1), reflecting the stronger σ-donor nature of the alkoxide group. The close structural resemblance between Zr-1 and Hf-1 demonstrates that the replacement of Zr by Hf does not significantly alter the overall geometry or bonding environment, which is expected to be given the nearly identical ionic radii and electronic configurations of the two metals. This structural equivalence highlights the stability and predictability of such heteroleptic architectures across the group 4 metal series. 

The solution behavior of Zr-1 and Hf-1 was characterized using<sup>1</sup> H nuclear magnetic resonance (NMR) spectroscopy. For Zr-1 (Fig. S2), a singlet (s) at 1.08 ppm, integrating for eighteen protons, was attributed to the six methyl groups of two TFB-tBuA ligands. Two doublets (d) at 5.44–5.46 ppm and 7.22–7.24 ppm were assigned to four protons at C5 and C6 of two TFB-tBuA ligands, respectively, with a 2 : 2 proton ratio. Additionally, two tert-butoxo ligands exhibited a singlet 



Fig. 3 The single crystal X-ray crystal structures of (a) Zr-1 and (b) Hf1 possessing C2 symmetry. Hydrogen atoms are omitted for clarity. 

(s) at 1.31 ppm, corresponding to eighteen protons from their six methyl groups. The<sup>1</sup> H NMR spectra of Hf-1 (Fig. S5) showed similarities to those of Zr-1. The six methyl groups in the TFB-tBuA ligands were identified by a singlet (s) at 1.07 ppm, which integrated to eighteen protons. Two different doublets (d) with a 2 : 2 ratio, at 5.42–5.43 ppm and 7.21–7.22 ppm, respectively, represented four protons at C5 and C6 of two TFB-tBuA ligands. The six methyl groups of two tert-butoxo ligands were also linked to a singlet (s) at 1.33 ppm, which integrated for eighteen protons. Although complexes of this type may, in principle, exist as enantiomeric or diastereoisomeric forms depending on ligand arrangement around the metal center, the observation of single, well-defined resonances for each ligand environment indicates that any such stereoisomers are either NMR-equivalent or undergo rapid interconversion on the NMR timescale. Likewise, potential fluxional processes involving ligand rearrangement appear to be fast at room temperature, resulting in time-averaged NMR signals. Consequently, the spectra are consistent with an effective C2symmetric solution structure, in agreement with the solidstate molecular symmetry. 

The 13C {1H, 19F} nuclear magnetic resonance (NMR) spectra of Zr-1 (Fig. S3) and Hf-1 (Fig. S6) each exhibited eight distinct resonances, consistent with the carbon 

Table 1 Bond lengths [Å] and angles [°] for Zr-1 and Hf-1 

||Zr-1|Hf-1|
|---|---|---|
|M–O1 [Å]<br>|2.091(2)|2.0816(17)|
|M–O1′[Å]<br>|2.098(2)|2.0728(17)|
|M–O2 [Å]<br>|1.913(2)|1.9022(17)|
|M–O2′[Å]<br>|1.910(2)|1.9069(18)|
|M–N1 [Å]<br>|2.499(3)|2.460(2)|
|M–N1′[Å]|2.489(3)|2.465(2)|
|O1–M–N1 [°]|79.02(9)|79.71(7)|
|O1–M–N1′[°]|90.80(9)|92.23(7)|
|O1′–M–O1 [°]|166.68(10)|167.47(7)|
|O1′–M–N1 [°]|92.43(9)|90.59(7)|
|O1′–M–N1′[°]|79.03(9)|79.85(7)|
|O2–M–O1 [°]|96.37(11)|94.72(7)|
|O2–M–O1′[°]|92.85(11)|92.20(7)|
|O2–M–O2′[°]|101.43(11)|101.91(8)|
|O2–M–N1 [°]|84.18(10)|84.55(7)|
|O2–M–N1′[°]|170.29(10)|170.61(7)|
|O2′–M–O1 [°]|92.77(10)|92.47(8)|
|O2′–M–O1′[°]|94.79(10)|96.31(8)|
|O2′–M–N1 [°]|170.60(10)|170.32(7)|
|O2′–M–N1′[°]|84.69(10)|84.06(7)|
|N1–M–N1′[°]|90.81(9)|90.51(7)|



710 | RSC Appl. Interfaces, 2026, 3, 706–720 

© 2026 The Author(s). Published by the Royal Society of Chemistry 

RSC Applied Interfaces 

Paper 

environments in the molecular structures, allowing unambiguous assignment of all carbon atoms. The<sup>19</sup> F NMR spectra confirmed the presence of the trifluoromethyl group, showing characteristic singlets at −74.48 ppm for Zr-1 (Fig. S4) and −74.61 ppm for Hf-1 (Fig. S7). CHNS elemental analysis further corroborated the molecular compositions, with experimental values closely matching theoretical calculations based on the molecular formulas. These combined spectroscopic and elemental data validate the structural integrity and purity of both precursors. 

#### 3.2. Thermal analyses of Zr-1 and Hf-1 precursors 

Preliminary thermal analysis of Zr-1 and Hf-1 was performed via sublimation under reduced pressure ( p = 1 mbar) using a Schlenk line. Both precursors sublimed above 130 °C, depositing colorless crystalline material on the cold finger, which confirmed adequate thermal stability (>100 °C) and volatility for low-pressure MOCVD. Thermogravimetric (TG) analyses (Fig. 4) under nitrogen atmosphere were performed to assess the potential decomposition products. The TG data revealed a multistep decomposition process, with initial weight losses at ∼115 °C for Zr-1 and 118 °C for Hf-1. A major decomposition occurred near 250 °C, resulting in ∼66% mass loss, accompanied by pronounced endothermic peaks in differential thermal analysis (DTA) (Fig. 4), consistent with ligand breakdown and volatilization. Residual masses at this stage were 23% for Zr-1 and 28% for Hf-1, in reasonable agreement with theoretical oxide contents (ZrO2: 19.68%; HfO2: 29.52%), with slight deviations attributed to incomplete ligand degradation or volatilization of metal intermediates. Final residues at 547.5 °C were 17.7% (Zr-1) and 24.4% (Hf-1), which are lower than the theoretical oxide yields, likely due to partial volatilization of the samples. These results confirm that both Zr-1 and Hf-1 exhibit sufficient thermal stability and volatility for MOCVD deposition of ZrO2 and HfO2 films. Their analogous decomposition behavior and structural similarity further support the use of equimolar mixtures for co-deposition of 

HfxZr1−xO2 films, offering a reliable route to engineer mixedmetal oxide films with controlled composition and microstructure. 

#### 3.3. Vapor pressure analyses of Zr-1 and Hf-1 precursors 

Considering that Zr-1 and Hf-1 exhibit different sublimation onset temperatures ( p = 1 mbar) despite their closely related molecular structures, a detailed vapor pressure analysis was carried out to better understand the sublimation and transport behavior of the two precursors. Vapor pressure measurements for both Zr-1 and Hf-1 were performed starting from 80 °C, with temperature increments of 10 °C for each measurement step. As summarized in Table 2, the results clearly show that at the same temperature, Hf-1 consistently exhibits a higher vapor pressure than Zr-1 over the entire investigated temperature range. This observation is directly supported by the mass loss rate data, which show systematically higher mass loss values for Hf-1 compared to Zr-1 at equivalent temperatures, indicating that a larger amount of Hf-1 is transferred into the gas phase once sublimation is active. 

However, further insight is obtained by analyzing the vapor pressure data using the Clausius–Clapeyron relationship, ln(P) = A − B/T, as shown in Fig. 5a and b. From the slopes of the ln(P) versus 1/T plots, the sublimation enthalpy of Hf-1 (ΔHsub = 121.607 kJ mol<sup>−1</sup> ) is found to be significantly higher than that of Zr-1 (ΔHsub = 114.237 kJ mol<sup>−1</sup> ), indicating stronger solid-state interactions and a greater energetic barrier for molecular desorption in the case of Hf-1. As a consequence, although Hf-1 exhibits higher equilibrium vapor pressure and higher mass loss rates at a given temperature once sublimation is established, a higher thermal energy input is required to initiate efficient sublimation of Hf-1 under practical conditions. This explains the experimentally observed higher sublimation onset temperature of Hf-1 compared to Zr-1 at 1 mbar and demonstrates that precursor sublimation behavior cannot be described by vapor pressure alone, but rather results from 



Fig. 4 TG (black) and DTA (red) profiles of (a) Zr-1 and (b) Hf-1 under N2 flow at atmospheric pressure from 20–550 °C. 

RSC Appl. Interfaces, 2026, 3, 706–720 | 711 

© 2026 The Author(s). Published by the Royal Society of Chemistry 

RSC Applied Interfaces 

Paper 

Table 2 Vapor pressure measurement results of Zr-1 and Hf-1 

||Vapor pressur|e [Pa]|Mass loss [mg min<sup>−1</sup>]||Consumpti<br>[min]|on time|
|---|---|---|---|---|---|---|
|Temperature [°C]|Zr-1|Hf-1|Zr-1|Hf-1|Zr-1|Hf-1|
|80|—|0.3877|—|6.6021×10<sup>−4</sup>|—|80|
|90|0.82787|1.2419|1.3024×10<sup>−3</sup>|2.0855×10<sup>−3</sup>|50|110|
|100|2.2948|4.2623|3.5614×10<sup>−3</sup>|7.0611×10<sup>−3</sup>|80|120|
|110|6.0932|11.043|9.3322×10<sup>−3</sup>|1.8054×10<sup>−2</sup>|70|90|
|120|15.072|24.955|2.2789×10<sup>−2</sup>|4.0276×10<sup>−2</sup>|70|50|
|130|35.145|—|5.2475×10<sup>−2</sup>|—|60|—|



the combined effects of equilibrium volatility, sublimation enthalpy, and surface desorption kinetics. 

#### 3.4. Syntheses of ZrO2, HfO2, and HZO films through MOCVD using Zr-1 and Hf-1 precursors 

Zr-1 and Hf-1 (without co-reactant gas such as O2) were employed as precursors for the deposition of ZrO2, HfO2, and HfxZr1−xO2 (HZO) films by low-pressure MOCVD ( p ≈ 1.4 × 10<sup>−2</sup> mbar) with the precursor reservoirs maintained at 125 °C. Individual depositions of ZrO2 and HfO2 



Fig. 5 Vapor pressure integration analyses of (a) Zr-1 and (b) Hf-1 based on Clausius–Clapeyron relationship, ln(P) = A − B/T. 

conducted for 2 h resulted in precursor consumptions of 0.80 g for Zr-1 and 0.66 g for Hf-1, respectively. For the co-deposition of HZO, an equimolar mixture of Zr-1 and Hf-1 was used to target a composition of Hf0.5Zr0.5O2, with a total precursor consumption of approximately 0.88 g, indicating comparable volatility and efficient co-delivery of both precursors under identical conditions. 

Low-pressure MOCVD of Zr-1 at a substrate temperature of 600 °C yielded films, analyzed by X-ray fluorescence (XRF) spectroscopy, which confirmed the presence of zirconium through characteristic signals (Fig. S8b). The X-ray diffraction (XRD) pattern of as-deposited films showed no peaks (Fig. 6), indicating amorphous or poorly crystalline CVD deposits. ZrO2 films were calcined and annealed in air at 450, 550, and 600 °C for 8 h to improve crystallinity (Fig. S9). XRD analysis showed that films calcined at 450 °C crystallized in the tetragonal ZrO2 phase (JCPDS no. 50-1089), dominated by the (011) facet, whereas those treated at 550–600 °C exhibited phase transition to tetragonal and monoclinic modifications (JCPDS no. 371484) with prominent XRD peaks corresponding to (−111) and (111) facets (Fig. 6). This evolution reflects the tetragonal-tomonoclinic transition typical of ZrO2, where nanoscale grains stabilize the tetragonal phase at lower temperatures. In comparison, grain growth at higher temperatures favors the thermodynamically stable monoclinic phase.<sup>55–60</sup> 



Fig. 6 The XRD pattern of ZrO2 films obtained from Zr-1 via MOCVD. 

712 | RSC Appl. Interfaces, 2026, 3, 706–720 

© 2026 The Author(s). Published by the Royal Society of Chemistry 

RSC Applied Interfaces 

Paper 

Scanned electron microscope (SEM) images and energydispersive X-ray (EDX) analyses (Fig. 7) revealed that asdeposited films consisted primarily of Zr and O in an approximate 1:2 ratio, consistent with ZrO2, along with minor C and F impurities originating from undecomposed precursor residues. Post-annealing at 550 °C preserved the overall morphology but induced small surface cracks. Importantly, EDX confirmed the complete removal of F and a substantial reduction of C, while maintaining the expected Zr:O stoichiometry. The residual carbon impurities observed in the films were attributed to amorphous carbon originating from incomplete decomposition of the organic ligands in the Zr-1 precursor, rather than from the formation of carbonized phases such as zirconium carbide. This finding was supported by XRD analysis, which showed no diffraction features corresponding to zirconium carbide (c-ZrC, JCPDS no. 35-0784) in the deposited films (Fig. 5). In addition, Fourier transform infrared (FTIR) – spectroscopy further confirmed the absence of Zr C bonding, as no characteristic Zr–C vibrational modes, typically observed in the range of 1010 and 1383 cm<sup>−1</sup> ,<sup>61,62</sup> were detected in the spectra (Fig. S10). 

ZrO2 films calcined at 600 °C (Fig. 7c) exhibited surface features similar to films treated at 550 °C, while showing a flatter and more consolidated morphology compared to both the as-deposited film and the film calcined at 550 °C. This increased surface smoothness was likely associated with enhanced atomic diffusion and structural rearrangement at elevated temperatures. In comparison with the as-deposited film, the film calcined at 600 °C displayed a higher density of surface cracks, which were attributed to the removal and oxidation of residual organic species during the calcination and annealing processes. The resulting film densification, volume shrinkage, and associated thermal and mechanical stresses are considered the primary factors responsible for crack formation at higher calcination temperatures. EDX analyses confirmed complete removal of organic contaminants following calcination and annealing, demonstrating thorough purification of the films. These 

observations are consistent with previous reports<sup>59,60</sup> and highlight the effectiveness of thermal treatment in eliminating residual impurities from low-pressure MOCVDderived metal oxide films.<sup>35</sup> 

The films deposited via low-pressure MOCVD from Hf-1 were confirmed to contain hafnium by X-ray fluorescence (XRF) analysis (Fig. S11b). As-deposited films were poorly crystalline or amorphous according to X-ray diffraction (XRD) analysis. Calcination and annealing in air at 450, 550, and 600 °C for 8 h induced a visual color change from black to colorless and improved crystallinity (Fig. S12). XRF confirmed hafnium retention (Fig. S11c), while XRD revealed the formation of monoclinic HfO2 (JCPDS no. 43-1017), with the (111) facet as the preferred orientation (Fig. 8). 

A scanned electron microscope (SEM) image showed that HfO2 films deposited via low-pressure MOCVD from Hf-1 were uniformly distributed on the FTO substrate. Energydispersive X-ray (EDX) analysis confirmed an Hf : O atomic ratio of approximately 1 : 2, consistent with HfO2 stoichiometry, with residual C, F, and N from incomplete precursor decomposition in the as-deposited films (Fig. 9a). After calcination and annealing at 550 °C, the overall morphology remained largely unchanged, though the surface appeared slightly rougher. EDX revealed complete removal of F and a significant reduction of C (Fig. 9b), demonstrating effective elimination of ligand-derived impurities during thermal treatment. In the case of the HfO2 films, the detected carbon residues are most reasonably assigned to amorphous carbon produced by partial decomposition of the organic ligands associated with the Hf-1 precursor, rather than to the formation of carbide phases such as hafnium carbide. This conclusion was supported by XRD measurements, which did not show any reflections attributable to hafnium carbide (c-HfC, JCPDS no. 73-0475) in the deposited films (Fig. 8). To date, there are no reported infrared spectral assignments for Hf–C bonding. The FTIR spectrum of the HfO2 film calcined at 550 °C (Fig. S13) exhibited features that closely resemble those observed for the ZrO2 film treated under the same 



Fig. 7 Top-view SEM and EDX images of (a) as-deposited, (b) calcined (Tcalcination = 550 °C), and (c) calcined ZrO2 films (Tcalcination = 600 °C) synthesized from Zr-1 via MOCVD. 

RSC Appl. Interfaces, 2026, 3, 706–720 | 713 

© 2026 The Author(s). Published by the Royal Society of Chemistry 

RSC Applied Interfaces 

Paper 



Fig. 8 XRD pattern of HfO2 films obtained from Hf-1 via MOCVD. 

conditions. This similarity, together with the absence of any additional absorption bands that could be attributed to metal–carbon interactions, indicates that hafnium carbide is not present in the calcined HfO2 film. 

Upon calcination at 600 °C (Fig. 9c), the HfO2 films developed a surface morphology closely resembling that of films treated at 550 °C, consistent with trends observed for ZrO2. However, the surface appeared noticeably smoother and more compact than in the as-deposited or calcined films at 550 °C. The improved uniformity was likely the result of enhanced atomic diffusion and structural reorganization during high-temperature treatment. Additionally, the 600 °C calcined films displayed an increased number of surface cracks compared with the as-deposited material, which can be attributed to densification and the buildup of thermal stresses as residual organic species were removed and oxidized. EDX analysis confirmed that all organic contaminants were removed after calcination and annealing, 

yielding fully purified films. The observed monoclinic HfO2 morphology agrees with previously reported results.<sup>63,64</sup> 

X-ray fluorescence (XRF) analysis of as-deposited films from the thermal decomposition of mixed Zr-1 and Hf-1 precursors confirmed the presence of both zirconium and hafnium (Fig. S14b), verifying successful deposition of HZO via MOCVD. X-ray diffraction (XRD) showed that the as-deposited films were amorphous (Fig. 10). Following calcination and annealing at 450, 550, and 600 °C, XRF confirmed retention of both elements (Fig. S14c), while XRD analysis revealed the formation of a single-phase monoclinic structure closely matching m-HfO2 (JCPDS no. 43-1017), rather than t-ZrO2. This indicates that Zr and Hf were incorporated into a homogeneous monoclinic lattice, consistent with their chemical similarity and nearly identical ionic radii, allowing formation of a solid solution. The appearance of HZO films has also altered from black to colorless after calcination (Fig. S15). 

Scanned electron microscope (SEM) images and energydispersive X-ray (EDX) analysis of ZrO2 and HfO2 films confirmed that calcination and annealing at 600 °C effectively removed all organic impurities. Accordingly, only as-deposited and 600 °C-calcined HZO films were characterized. SEM images showed similar morphology for both, although cracks were visible in the calcined films (Fig. 11a). EDX confirmed complete impurity removal and an (Hf, Zr) : O atomic ratio of approximately 1 : 2, with an Hf : Zr ratio of approximately 0.63 : 0.37. Importantly, EDX elemental mapping demonstrates a uniform spatial distribution of Hf, Zr, and O across the film surface, indicating homogeneous incorporation of both metal species within the HZO lattice and the formation of a single-phase solid solution rather than phase-segregated domains (Fig. 11a). Furthermore, the cross-sectional SEM image of the HZO films indicated a uniform film thickness of approximately 1.6 μm (Fig. 11b), with a film growth rate is approximately 13 nm min<sup>−1</sup> , demonstrating good film continuity and adhesion to the substrate. 



Fig. 9 Top-view SEM images of (a) as-deposited, (b) calcined (Tcalcination = 550 °C), and (c) calcined HfO2 films (Tcalcination = 600 °C) synthesized from Hf-1 via MOCVD. 

714 | RSC Appl. Interfaces, 2026, 3, 706–720 

© 2026 The Author(s). Published by the Royal Society of Chemistry 

RSC Applied Interfaces 

Paper 



Fig. 10 XRD pattern of HZO films obtained from Hf-1 and Zr-1 with a 1 : 1 mole ratio via MOCVD. 

Although Zr-1 and Hf-1 were introduced in a 1 : 1 mole ratio and exhibit comparable volatility under reduced pressure, the resulting HZO films display a slightly Hf-rich composition (Hf : Zr ≈ 0.63 : 0.37). This deviation can be partly attributed to differences in vapor pressures between the two precursors. After achieving sublimation, Hf-1 evaporates at approximately twice the rate of Zr-1 at the same temperature, favoring its incorporation into the growing film. However, vapor-phase transport alone cannot fully account for the observed composition. Surface reaction kinetics and adsorption behavior also play a significant role in determining the final Hf/Zr ratio.<sup>65</sup> Hafnium species typically form stronger M–O bonds<sup>66</sup> and may possess higher sticking coefficients on oxide surfaces, leading to preferential incorporation during deposition. In addition, subtle differences in precursor decomposition pathways, ligand dissociation rates, and surface diffusion dynamics can further influence incorporation efficiency. Such effects are well documented in dual-source MOCVD processes and highlight the critical importance of surface chemistry, beyond simple volatility considerations, in controlling film 

composition. Taken together, these factors explain why Hf is consistently enriched in the HZO films, even under conditions intended to produce a 1 : 1 Hf : Zr ratio. Understanding these mechanisms provides valuable guidance for tuning precursor delivery, substrate temperature, and deposition conditions to achieve precise compositional control in multicomponent oxide films. 

A detailed examination of XRD patterns of ZrO2, HfO2, and HZO thin films calcined at 600 °C revealed a distinct shift in the monoclinic (111) diffraction peak, as shown in Fig. 12. The HZO thin film exhibited a 2θ value of 14.434°, which lies between those of pure HfO2 (14.479°) and pure ZrO2 (14.314°), indicating the formation of a homogeneous solid solution incorporating both Hf<sup>4+</sup> and Zr<sup>4+</sup> cations within a single-phase lattice. This intermediate peak position provides strong evidence for successful cation intermixing at the atomic scale. The observed peak shift toward lower angles can be attributed to the partial substitution of larger Zr<sup>4+</sup> ions (ionic radius = 0.72 Å for sixfold coordination) for smaller Hf<sup>4+</sup> ions (ionic radius = 0.71 Å for sixfold coordination) within the HfO2 crystal lattice. This slight size mismatch, originating from the lanthanide contraction that causes 5d elements such as Hf to exhibit nearly the same ionic size as their 4d analogues,<sup>67</sup> leads to a measurable lattice expansion. According to Vegard's Law,<sup>68</sup> such substitutional alloying results in a linear variation of lattice parameters with composition, which in turn increases the interplanar spacing (d) and shifts the diffraction peak to lower 2θ values, as observed in the HZO film. 

Calculating d(111) from 2θ (Mo Kα λ = 0.70930 Å) All FTO peaks observed are at 12.109° 

HFO2 measured 2θ max = 14.479° → d(111)(HFO2) = 2.815 Å 

ZrO2 measured 2θ max = 14.314° → d(111)(ZrO2) = 2.849 Å 

HZO measured 2θ max = 14.434° → d(111)(HZO, measured) = 2.822 Å 



Fig. 11 (a) Top-view SEM images of as-deposited (left) and calcined HZO films with EDX analysis (right), synthesized from a mixed Zr-1 and Hf-1 with a 1 : 1 mole ratio via MOCVD, (b) cross-section SEM image of HZO films. 

RSC Appl. Interfaces, 2026, 3, 706–720 | 715 

© 2026 The Author(s). Published by the Royal Society of Chemistry 

RSC Applied Interfaces 

Paper 



Fig. 12 XRD patterns of ZrO2, HfO2, and HZO thin films specific for the monoclinic (111) facet. 

Vegard interpolation for HZO thin films (with ratio of Hf : Zr in HZO = 0.63 : 0.37) 



Strain relative to Vegard 

higher 2θ angles in accordance with Bragg's law. This compressive strain suggests a minor lattice distortion arising from cation substitution and local structural relaxation within the HfxZr1−xO2 solid solution. 

Analysis of HZO films calcined and annealed at 600 °C revealed a dense polycrystalline microstructure composed of closely packed, randomly oriented grains averaging just over 10 nm (Fig. 13). High-resolution transmission electron microscope (TEM) showed (111) lattice spacings of 0.281–0.287 nm, and selected area electron diffraction (SAED) patterns confirmed the monoclinic (111) facet, consistent with reported parameters for HfxZr1−xO2 thin films.<sup>69–72</sup> These results indicate that thermal treatment promotes uniform nucleation and crystallite growth while preserving nanoscale dimensions. The dense, randomly oriented grains suggest minimal porosity and high structural homogeneity, features critical for optimizing the dielectric and ferroelectric performance of HZO films. 

X-ray photoelectron spectroscopy (XPS) was employed to examine the chemical states and elemental composition of the HZO film. The Zr 3d core-level spectrum exhibits a single, welldefined spin–orbit doublet with the Zr 3d5/2 peak located at approximately 182 eV and a splitting of ∼2.4 eV (Fig. 14c), which is characteristic of Zr<sup>4+</sup> in zirconium oxide environments. Similarly, the Hf 4f spectrum shows a corresponding spin–orbit doublet with the Hf 4f7/2 peak centered at ∼17 eV and a splitting of ∼1.7 eV (Fig. 14a), indicative of Hf<sup>4+</sup> . The observed binding energies and line shapes of both Zr 3d and Hf 4f spectra are consistent with previously reported values for HZO thin films, confirming the 



The negative strain (ε = −0.21%) indicates a slight lattice contraction relative to the Vegard's law prediction, leading to a subtle shift of the HfxZr1−xO2 diffraction peak toward 

fully oxidized states of both cations.<sup>18,69,71,73–75</sup> No additional components associated with metallic Hf or Zr, or reduced suboxide species, are detected within the sensitivity of the 



Fig. 13 TEM analysis of HZO films deposited via MOCVD on FTO at 600 °C from a 1 : 1 mole ratio mixture of Zr-1 and Hf-1, followed by calcination and annealing at 600 °C for 8 h. (a) High-magnification TEM image showing well-defined lattice planes of HfxZr1−xO2 with spacings of 0.281–0.287 nm corresponding to the monoclinic (111) facet. (b) SAED pattern confirming the polycrystalline nature and indexing to the monoclinic (111) facet (compared to ICSD PDF no. 01-090-5786 of Hf0.567Zr0.432O2 monoclinic (111) facet). 

716 | RSC Appl. Interfaces, 2026, 3, 706–720 

© 2026 The Author(s). Published by the Royal Society of Chemistry 

Paper 

#### RSC Applied Interfaces 

measurement. The oxidation state of hafnium is further corroborated by the Hf 4d core-level spectrum, which displays a well-defined spin–orbit doublet at binding energies of ∼213– 215 eV and ∼224–226 eV (Fig. 14b), in good agreement with reported values for stoichiometric HfO2 films and providing additional confirmation of the Hf<sup>4+</sup> chemical state.<sup>76</sup> The O 1s spectrum consists of a single broad peak centered at approximately 532 eV (Fig. 14d), which is attributed to overlapping contributions from lattice oxygen and surfacerelated oxygen species, such as hydroxyl groups or adsorbed oxygen, as commonly observed in HZO and related oxide thin films.<sup>18,69,71,73–75</sup> Taken together, the XPS results indicate the formation of a chemically homogeneous HZO mixed oxide with both Hf and Zr present exclusively in the +4 oxidation state and no evidence of metallic phases or oxygen-deficient suboxides. 

Elemental concentrations estimated from sensitivity-factorcorrected XPS peak areas confirm oxygen as the dominant element and indicate a Hf-rich mixed oxide composition, with an approximate cation ratio of Hf:Zr ≈ 0.7:0.3 as derived from the Hf 4f and Zr 3d core levels. Minor variations between concentrations obtained from different core levels are attributed to differences in photoionization cross sections, inelastic mean free paths, and surface sensitivity inherent to XPS analysis. Despite these variations, the overall compositional trends are consistent across the analyzed regions. Taken together with the chemical-state analysis, the XPS results confirm the formation of a chemically homogeneous HfxZr1−xO2 solid solution, in which both cations are present exclusively in the +4 oxidation state and no evidence of metallic phases or oxygen-deficient suboxides is observed. 

### 4. Conclusion 

The transformation of molecular precursors into thin films via low-pressure MOCVD has attracted considerable attention 

due to its simplicity, scalability, and ability to produce uniform, high-quality films suitable for semiconductor applications. A key requirement of this process is the availability of precursors with both high thermal stability and sufficient volatility, as film growth proceeds through gasphase transport and decomposition. Precursors lacking these properties often result in uncontrolled decomposition, poor coverage, or inhomogeneous films. In this work, we successfully synthesized two novel fluorinated β-ketoenaminebased precursors, Zr-1 and Hf-1, which exhibit sublimation temperatures above 130 °C ( p = 1 mbar) and major decomposition above 250 °C (as determined from TG-DTA analyses), making them suitable for low-pressure MOCVD. Deposition experiments demonstrated that Hf-1 produced monoclinic HfO2 thin films, while Zr-1 yielded mixed-phase ZrO2 consisting of both tetragonal and monoclinic domains after calcination and annealing. These results are consistent with the well-documented crystallographic behavior of ZrO2, in which the tetragonal phase is metastable at the nanoscale but transforms into the thermodynamically stable monoclinic phase with increasing grain size and thermal treatment. Owing to the structural and thermal similarities of Zr-1 and Hf-1, a 1 : 1 mole mixture of the two precursors enabled the successful co-deposition of HfxZr1−xO2 films. Achieving a HZO film with a stoichiometric 1 : 1 Zr : Hf ratio requires careful control of deposition parameters to equalize the vapor pressures of Zr-1 and Hf-1. The necessary temperature and pressure conditions can be derived from the Clausius– Clapeyron relationship using experimentally measured vapor pressures for each precursor. Maintaining these conditions necessitates a well-regulated vacuum system, as the relative sublimation rates of the precursors are highly sensitive to pressure. Even minor deviations in temperature or ambient pressure can result in preferential evaporation of Hf-1 or Zr-1, leading to compositional inhomogeneity in the deposited 



Fig. 14 The X-ray photoelectron spectra (XPS) of (a) Hf 4f, (b) Hf 4d, (c) Zr 3d, and (d) O 1s for calcined HZO films. 

RSC Appl. Interfaces, 2026, 3, 706–720 | 717 

© 2026 The Author(s). Published by the Royal Society of Chemistry 

RSC Applied Interfaces 

Paper 

films. Therefore, precise control over both vapor-phase transport and precursor delivery is critical to achieving the target film stoichiometry, highlighting the interplay between thermodynamic vapor pressures and kinetic transport phenomena in dual-source MOCVD processes. X-ray diffraction (XRD) and transmission electron microscope (TEM) analyses confirmed that these films crystallized predominantly in the monoclinic phase, with zirconium and hafnium incorporated into a single homogeneous lattice, consistent with the formation of a solid solution. This mixedprecursor approach demonstrates a versatile strategy for engineering the microstructure and phase composition of HZO films, providing a pathway to optimize their dielectric and ferroelectric properties for advanced electronic applications. 

While the present study employed a dual-source precursor strategy, the synthesis of heterobimetallic Zr–Hf complexes containing pre-organized –Zr–(OR)–Hf– structural units present a promising yet unexplored strategy for achieving atomic-level mixing of both metals. Such molecular design could enable uniform incorporation of Zr and Hf within a single precursor, facilitating controlled co-decomposition and oxide network formation during deposition. This approach has the potential to yield compositionally homogeneous HZO thin films with improved phase uniformity and stoichiometric precision. Although no reports on Zr–Hf heterobimetallic precursors have been reported for HZO materials, similar heterobimetallic complexes containing fluorinated ligands have been demonstrated as effective starting materials for the synthesis of other bimetallic oxides,<sup>77,78</sup> supporting the feasibility of this concept. 

### Conflicts of interest 

The authors declare no conflicts of interest. 

### Data availability 

The data supporting this article have been included as part of the supplementary information (SI) and any other raw data will be available upon request. 

Supplementary information: the data underlying the results reported in this study are provided in the SI of this article. See DOI: https://doi.org/10.1039/d5lf00360a. 

CCDC 2496179 and 2496180 contain the supplementary crystallographic data for this paper.<sup>79a,b</sup> 

### Acknowledgements 

The authors gratefully acknowledge the University of Cologne and the German Research Foundation (DFG) for their infrastructural and financial support. Mr. Billy Oktora Abdilah Fauzi also acknowledges the German Academic Exchange Service (DAAD) for awarding the PhD scholarship ‘Research Grants – Doctoral Programmes in Germany’ (Funding No. 91832264). The authors acknowledge Ms. Silke Kremer (University of Cologne) for conducting the single-crystal XRD 

measurements of Zr-1 and Hf-1 precursors. The authors acknowledge Mr. Dirk Pullem (University of Cologne) for performing the elemental analysis of Zr-1 and Hf-1 precursors. The authors acknowledge Mr. Ziyaad Aytuna, Mr. Tom-Jonas Schneider, and Ms. Jessica Kirchhartz (University of Cologne) for conducting SEM/EDX measurements for ZrO2, HfO2, and HZO thin films. The authors acknowledge Mr. Simon Diel (University of Cologne) for conducting XRD measurements for ZrO2, HfO2, and HZO thin films. The authors acknowledge Ms. Nurgül Tosun and Mr. Lukas Rryci (University of Cologne) for the TEM measurements. 

### References 

- 1 A. Kashir and H. Hwang, Phys. Status Solidi A, 2021, 218, 2000819. 

- 2 D. Lehninger, A. Prabhu, A. Sünbül, T. Ali, F. Schöne, T. Kämpfe, K. Biedermann, L. Roy, K. Seidel, M. Lederer and L. M. Eng, Adv. Phys. Res., 2023, 2, 2200108. 

- 3 Q. Luo, Y. Cheng, J. Yang, R. Cao, H. Ma, Y. Yang, R. Huang, W. Wei, Y. Zheng, T. Gong and J. Yu, Nat. Commun., 2020, 11, 1391. 

- 4 Q. Li, S. Wang, Z. Li, X. Hu, Y. Liu, J. Yu, Y. Yang, T. Wang, J. Meng, Q. Sun and D. W. Zhang, Nat. Commun., 2024, 15, 2686. 

- 5 X. Yu, N. Zhong, Y. Cheng, T. Xin, Q. Luo, T. Gong, J. Chen, J. Wu, R. Cheng, Z. Fu and K. Tang, Zhongguo Kexue Xinxi Kexue, 2025, 68, 160401. 

- 6 S. M. George, Chem. Rev., 2010, 110, 111–131. 

- 7 J. Liu, J. Li, J. Wu and J. Sun, Nanoscale Res. Lett., 2019, 14, 154. 

- 8 M. Jang, J. Jeon, W. C. Lim, K. H. Chae, S. H. Baek and S. K. Kim, Ceram. Int., 2024, 50, 47910–47915. 

- 9 B. Lee, K. J. Choi, A. Hande, M. J. Kim, R. M. Wallace, J. Kim, Y. Senzaki, D. Shenai, H. Li, M. Rousseau and J. Suydam, Microelectron. Eng., 2009, 86, 272–276. 

- 10 I. Kärkkänen, A. Shkabko, M. Heikkilä, J. Niinistö, M. Ritala, M. Leskelä, S. Hoffmann-Eifert and R. Waser, Phys. Status Solidi A, 2014, 211, 301–309. 

- 11 A. R. Choi, S. Seo, S. Kim, D. Kim, S. W. Ryu, W. J. Lee and I. K. Oh, Appl. Surf. Sci., 2023, 624, 157104. 

- 12 L. Aarik, H. Alles, A. Aidla, T. Kahro, K. Kukli, J. Niinistö, H. Mändar, A. Tamm, R. Rammula, V. Sammelselg and J. Aarik, Thin Solid Films, 2014, 565, 37–44. 

- 13 G. D'Acunto, R. Tsyshevsky, P. Shayesteh, J. J. Gallet, F. Bournel, F. Rochet, I. Pinsard, R. Timm, A. R. Head, M. Kuklja and J. Schnadt, Chem. Mater., 2023, 35, 529–538. 

- 14 K. Karavaev, K. Kolanek, M. Tallarida, D. Schmeißer and E. Zschech, Adv. Eng. Mater., 2009, 11, 265–268. 

- 15 J. Niinistö, M. Mäntymäki, K. Kukli, L. Costelle, E. Puukilainen, M. Ritala and M. Leskelä, J. Cryst. Growth, 2010, 312, 245–249. 

- 16 M. Veith, S. Mathur and C. Mathur, Polyhedron, 1998, 17, 1005–1034. 

- 17 S. Mathur, M. Veith, T. Ruegamer, E. Hemmer and H. Shen, Chem. Mater., 2004, 16, 1304–1312. 

718 | RSC Appl. Interfaces, 2026, 3, 706–720 

© 2026 The Author(s). Published by the Royal Society of Chemistry 

RSC Applied Interfaces 

Paper 

- 18 A. Nishida, T. Katayama, T. Endo and Y. Matsuo, ACS Appl. Mater. Interfaces, 2025, 17, 11036–11044. 

- 19 M. Knez, K. Nielsch and L. Niinistö, Adv. Mater., 2007, 19, 3425–3438. 

- 20 M. Leskelä and M. Ritala, Angew. Chem., Int. Ed., 2003, 42, 5548–5554. 

- 21 T. J. Kunene, L. K. Tartibu, K. Ukoba and T. C. Jen, Mater. Today: Proc., 2022, 62, S95–S109. 

- 22 L. Czympiel, M. Frank, A. Mettenbörger, S. M. Hühne and S. Mathur, C. R. Chim., 2018, 21, 943–951. 

- 23 L. Czympiel, J. M. Lekeu, C. Hegemann and S. Mathur, Inorg. Chim. Acta, 2017, 455, 197–203. 

- 24 L. Jürgensen, M. Frank, M. Pyeon, L. Czympiel and S. Mathur, Organometallics, 2017, 36, 2331–2337. 

- 25 L. Czympiel, J. Pfrommer, W. Tyrra, M. Schäfer and S. Mathur, Inorg. Chem., 2015, 54, 25–37. 

- 26 J. Leduc, R. Ravithas, L. Rathgeber and S. Mathur, New J. Chem., 2015, 39, 7571–7574. 

- 27 L. Brückmann, W. Tyrra, S. Stucky and S. Mathur, Inorg. Chem., 2012, 51, 536–542. 

- 28 L. Brückmann, W. Tyrra, S. Mathur, G. Berden, J. Oomens, A. J. Meijer and M. Schäfer, ChemPhysChem, 2012, 13, 2037–2045. 

- 29 C. K. Amadi, T. Karimpour, M. Jafari, Z. Peng, D. Van Gerven, V. Brune and S. Mathur, Dalton Trans., 2024, 53, 9874–9886. 

- 30 S. Mishra and S. Daniele, Chem. Rev., 2015, 115, 8379–8448. 

- 31 U. Atamtürk, V. Brune, S. Mishra and S. Mathur, Molecules, 2021, 26, 5367. 

- 32 M. Frank, L. Jürgensen, J. Leduc, D. Stadler, D. Graf, I. Gessner, F. Zajusch, T. Fischer, M. A. Rose, D. N. Mueller and S. Mathur, Inorg. Chem., 2019, 58, 10408–10416. 

- 33 L. Jürgensen, D. Höll, M. Frank, T. Ludwig, D. Graf, A. K. Schmidt-Verma and S. Mathur, Dalton Trans., 2020, 49, 13317–13325. 

- 34 L. Jürgensen, M. Frank, D. Graf, I. Gessner, T. Fischer, K. Welter and S. Mathur, Z. Phys. Chem., 2020, 234, 911–924. 

- 35 A. Lichtenberg, K. Altuntas, T. Fischer, T. Karimpour, S. Diel, Z. Aytuna and S. Mathur, Z. Anorg. Allg. Chem., 2024, 650, e202400126. 

- 36 A. Verchère, S. Mishra, E. Jeanneau, H. Guillon, J. M. Decams and S. Daniele, Inorg. Chem., 2020, 59, 7167–7180. 

- 37 D. Grödler, P. Kaden, J. M. Sperling, B. M. Rotermund, B. Scheibe, N. B. Beck, A. Lichtenberg, T. E. Albrecht, S. Mathur and R. Gericke, Inorg. Chem., 2025, 64, 2321–2328. 

- 38 C. K. Amadi, U. Atamtürk, A. Lichtenberg, A. Raauf and S. Mathur, Molecules, 2023, 28, 2137. 

- 39 E. Dhaene, C. Seno and J. De Roo, Dalton Trans., 2024, 53, 11769–11777. 

- 40 G. M. Sheldrick, Acta Crystallogr., Sect. C:Struct. Chem., 2015, 71, 3–8. 

- 41 O. V. Dolomanov, L. J. Bourhis, R. J. Gildea, J. A. K. Howard and H. Puschmann, J. Appl. Crystallogr., 2009, 42, 339–341. 

- 42 K. Momma and F. Izumi, J. Appl. Crystallogr., 2011, 44, 1272–1276. 

- 43 R. Fiz, L. Appel, A. Gutiérrez-Pardo, J. Ramírez-Rico and S. Mathur, ACS Appl. Mater. Interfaces, 2016, 8, 21423–21430. 

- 44 D. Graf, J. Schläfer, S. Garbe, A. Klein and S. Mathur, Chem. Mater., 2017, 29, 5877–5885. 

- 45 J. Altmayer, S. Barth and S. Mathur, RSC Adv., 2013, 3, 11234–11239. 

- 46 S. Mathur, T. Ruegamer and I. Grobelsek, Chem. Vap. Deposition, 2007, 13, 42–47. 

- 47 R. Müller, F. Hernandez-Ramirez, H. Shen, H. Du, W. Mader and S. Mathur, Chem. Mater., 2012, 24, 4028–4035. 

- 48 D. Graf, M. Frank, O. Ojelere, I. Gessner, L. Juergensen, M. Grosch and S. Mathur, Mater. Today: Proc., 2020, 33, 2445–2450. 

- 49 J. Schindelin, I. Arganda-Carreras, E. Frise, V. Kaynig, M. Longair, T. Pietzsch, S. Preibisch, M. Rueden, C. Saalfeld, B. Schmid, J.-Y. Tinevez, D. J. White, V. Hartenstein, K. Eliceiri, P. Tomancak and A. Cardona, Nat. Methods, 2012, 9, 676–682. 

- 50 M. Klinger and A. Jäger, J. Appl. Crystallogr., 2015, 48, 2012–2018. 

- 51 P. L. Franceschini, M. Morstein, H. Berke and H. W. Schmalle, Inorg. Chem., 2003, 42, 7273–7282. 

- 52 D. Gonzalez-Flores, S. A. Patil, P. A. Medina, S. Dever, C. Uthaisar, L. W. Pineda and B. D. Fahlman, Inorg. Chim. Acta, 2013, 396, 60–65. 

- 53 M. Banerjee, R. W. Seidel, M. Winter, H. W. Becker, D. Rogalla and A. Devi, Dalton Trans., 2014, 43, 2384–2396. 

- 54 M. Al Hareri and D. J. Emslie, Eur. J. Inorg. Chem., 2023, 2023, e202200594. 

- 55 R. Garvie, R. Hannink and R. Pascoe, Nature, 1975, 258, 703–704. 

- 56 R. C. Garvie, R. H. Hannink and R. T. Pascoe, in Sintering Key Papers, Springer, Netherlands, Dordrecht, 1990, pp. 253–257. 

- 57 R. C. Garvie, J. Phys. Chem., 1965, 69, 1238–1243. 

- 58 X. Wu, D. Landheer, M. J. Graham, H. W. Chen, T. Y. Huang and T. S. Chao, J. Cryst. Growth, 2003, 250, 479–485. 

- 59 Z. Chen, B. Wang, N. Prud'homme, S. L. Ma, V. Ji and P. Ribot, Mater. Sci. Forum, 2011, 675, 1201–1204. 

- 60 Z. Chen, N. Prud'homme, B. Wang, P. Ribot and V. Ji, Surf. Coat. Technol., 2013, 218, 7–16. 

- 61 E. M. Huseynov, Spectrochim. Acta, Part A, 2023, 286, 122032. 

- 62 M. M. L. Guerrero, A. G. de Torres, E. V. Alonso, M. T. S. Cordero and J. M. C. Pavón, Ceram. Int., 2011, 37, 607–613. 

- 63 B. Aguirre, R. S. Vemuri, D. Zubia, M. H. Engelhard, V. Shutthananadan, K. K. Bharathi and C. V. Ramana, Appl. Surf. Sci., 2011, 257, 2197–2202. 

- 64 C. V. Ramana, K. K. Bharathi, A. Garcia and A. L. Campbell, J. Phys. Chem. C, 2012, 116, 9955–9960. 

- 65 J. H. Park, J. Kim, H. Oh, Y. Park and W. Jeon, Mater. Lett., 2025, 139581. 

- 66 W. Zheng, K. H. Bowen, J. Li, I. Dabkowska and M. Gutowski, J. Phys. Chem. A, 2005, 109, 11521–11525. 

- 67 R. D. Shannon, Acta Crystallogr., Sect. A, 1976, 32, 751–767. 

- 68 K. T. Jacob, S. Raj and L. Rannesh, Int. J. Mater. Res., 2007, 98, 776–779. 

RSC Appl. Interfaces, 2026, 3, 706–720 | 719 

© 2026 The Author(s). Published by the Royal Society of Chemistry 

RSC Applied Interfaces 

Paper 

- 69 W. Zhang, L. Huang, A. Li and D. Wu, J. Cryst. Growth, 2012, 346, 12–16. 

- 70 M. S. Song, K. Park, K. Lee, J. W. Cho, T. Y. Lee, J. Park and S. C. Chae, ACS Appl. Electron. Mater., 2023, 5, 117–122. 

- 71 T. Zhang, Y. Fan, Z. Xue, M. Si, Z. Wang, X. Li and Y. Cao, Mater. Today Electron., 2024, 10, 100124. 

- 72 K. Cao, Q. Zhao, J. Liao, F. Yan, K. Bao, S. Jia, J. Zhang, J. Luo, M. Liao and Y. Zhou, Microstructures, 2025, 5, 2025025. 

- 73 P. Xu, S. Yan, Y. Zhu, J. Zang, P. Luo, G. Li, Q. Yang, Z. Chen, W. Zhang, X. Zheng and M. Tang, J. Mater. Sci.: Mater. Electron., 2023, 34, 1915. 

- 74 M. A. Jenkins, K. E. Holden, S. W. Smith, M. T. Brumbach, M. D. Henry, C. Weiland, J. C. Woicik, S. T. Jaszewski, J. F. Ihlefeld and J. F. Conley Jr., ACS Appl. Mater. Interfaces, 2021, 13, 14634–14643. 

- 75 M. B. Hachemi, B. Salem, V. Consonni, H. Roussel, A. Garraud, G. Lefevre, S. Labau, S. Basrour and A. Bsiesy, AIP Adv., 2021, 11, 085004. 

- 76 D. Barreca, A. Milanov, R. A. Fischer, A. Devi and E. Tondello, Surf. Sci. Spectra, 2007, 14, 34–40. 

- 77 V. Nahrstedt, D. Stadler, T. Fischer, T. Duchon, D. N. Mueller, C. M. Schneider and S. Mathur, Inorg. Chem., 2021, 60, 3719–3728. 

- 78 A. Raauf, J. Schlaefer, I. Gessner, A. Lichtenberg, M. Zegke, T. Fischer and S. Mathur, J. Indian Chem. Soc., 2022, 99, 100347. 

- 79 (a) CCDC 2496179: Experimental Crystal Structure Determination, 2025, DOI: 10.5517/ccdc.csd.cc2psgxw; (b) CCDC 2496180: Experimental Crystal Structure Determination, 2025, DOI: 10.5517/ccdc.csd.cc2psgyx. 

720 | RSC Appl. Interfaces, 2026, 3, 706–720 

© 2026 The Author(s). Published by the Royal Society of Chemistry 

