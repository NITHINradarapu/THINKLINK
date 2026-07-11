# DOCUMENT: Effect of RF power on oxygen plasma-assisted surface cleaning and conditioning of crystalline silicon solar cells.pdf

Surfaces and Interfaces 91 (2026) 109255 



Contents lists available at ScienceDirect 

# Surfaces and Interfaces 

journal homepage: www.sciencedirect.com/journal/surfaces-and-interfaces 



## Effect of RF power on oxygen plasma-assisted surface cleaning and conditioning of crystalline silicon solar cells 



Jeong-Ho An<sup>a,b,1</sup> , Ji-Eun Hong<sup>a,1</sup> , Sung-In Mo<sup>a,b</sup> , Yimhyun Jo<sup>a</sup> , Minjin Kim<sup>a</sup> , Sungmin Kang<sup>a</sup> , Sinho Choi<sup>a</sup> , Soong Ju Oh<sup>b</sup> , Junghan Lee<sup>c</sup> , Hee-eun Song<sup>d,*</sup> , Ka-Hyun Kim<sup>e,*</sup> , Joon-Ho Oh<sup>a,*</sup> 

a _Ulsan Advanced Energy Technology R&D Center, Korea Institute of Energy Research, 44776 Ulsan, South Korea_ 

b _Department of Materials Science and Engineering, Korea University, 02841 Seoul, South Korea_ 

c _Semiconductor R&D Center, Samsung Electronics, 18448 Hwasung, South Korea_ 

d _Photovoltaics Research Department, Korea Institute of Energy Research, 34129 Daejeon, South Korea_ 

e _Department of Physics, Chungbuk National University, 28644 Cheongju, South Korea_ 

|A R T I C L E I N F O<br>A B S T R A C T|
|---|



> _Keywords:_ Crystalline silicon (c-Si) wafer cleaning and surface conditioning critically affect the performance of c-Si solar 

> Oxygen plasma treatment cells and semiconductor devices. Conventional wet chemical methods such as RCA cleaning suffer from high cost, 

> Silicon wafer cleaning long processing time, and environmental impact. Here, we propose a novel surface cleaning and conditioning Surface conditioning process integrating O2-plasma treatment (OPT) with minimal wet chemistry. We systematically investigate the Silicon oxide impact of OPT power on SiOx/c-Si samples using spectroscopic ellipsometry, quasi-steady-state photoSurface passivation quality Silicon heterojunction solar cells conductance and X-ray photoelectron spectroscopy. Higher OPT power increases SiOx thickness and oxidation state, improving surface cleaning and passivation quality up to an optimal power (350 W). The OPT effectiveness was evaluated via implied open-circuit voltage (i _V_ oc) measurements on symmetrically passivated wafers with hydrogenated intrinsic amorphous silicon layers, showing i _V_ oc of 700 mV at 350 W, surpassing conventionally cleaned wafers (680 mV). However, excessive OPT power (400 W) degraded i _V_ oc due to negative oxygen ioninduced defect formation and strain in the Si–Si bonds at the c-Si surface and subsurface. Our results highlight the importance of optimizing OPT parameters to balance cleaning efficiency and surface quality. This drycleaning-based OPT process reduces chemical usage and enhances process reliability, making it suitable for industrial solar cell and semiconductor manufacturing. 

### **1. Introduction** 

Surface cleaning and conditioning of crystalline silicon (c-Si) wafers are critical steps in the fabrication of high-performance c-Si solar cells and various semiconductor devices [1,2]. These processes influence key surface properties such as roughness and interface defect states, which directly affect the interfacial recombination behavior of the resulting c-Si solar cells [3–6]. Conventional methods are based on wet chemical treatments, involving repeated cycles of surface oxidation followed by oxide removal and hydrogen termination. A typical example is the standard Radio Corporation of America (RCA) cleaning process [7,8]. In the first step, a mixture of NH4OH, H2O, and H2O2 is used to remove organic contaminants and particles from the wafer surface. In the second 

step, a mixture of HCl, H2O, and H2O2 is applied to eliminate inorganic contaminants such as metallic residues. During these two processes, a thin SiOx layer forms on the wafer surface, encapsulating surface contaminants. After each of these steps, the wafer is treated with a diluted hydrogen fluoride (HF) solution, followed by a deionized (DI) water rinse, to remove the SiOx layer along with any residual chemicals and particles, resulting in a clean wafer surface with hydrogen termination. Another example is the IMEC-clean method [9]. The key feature of IMEC-clean is the use of Piranha solution, a mixture of H2SO4 and H2O2. In particular, IMEC-clean is well known for its effectiveness in removing metallic contaminants. However, conventional wet chemical-based approaches suffer from several drawbacks, including high processing costs, long processing durations, and increased surface roughness with 

* Corresponding authors. 

- _E-mail addresses:_ hsong@kier.re.kr (H.-e. Song), kahyunkim@chungbuk.ac.kr (K.-H. Kim), jh.oh@kier.re.kr (J.-H. Oh). 

- 1 These authors contributed equally. 

https://doi.org/10.1016/j.surfin.2026.109255 

Received 11 September 2025; Received in revised form 12 February 2026; Accepted 9 April 2026 Available online 10 April 2026 

2468-0230/© 2026 The Authors. Published by Elsevier B.V. This is an open access article under the CC BY license ( http://creativecommons.org/licenses/by/4.0/ ). 

> _J.-H. An et al.                                                                                                                                                                                                                                   Surfaces and Interfaces 91 (2026) 109255_ 

NH4OH-containing solutions [10]. In addition, the environmental impact of the use and disposal of these chemicals remains also a significant issue, since conventional wastewater treatment processes often fail to completely eliminate the wide range of hazardous chemicals and contaminants, leading to potential risks to both the environment and human health [11,12]. 

Therefore, reducing the reliance on wet chemicals in conventional wafer cleaning processes, which involve multiple wet chemical-based steps, is of significant importance. In this regard, including dry cleaning step in the wafer cleaning process can be an attractive alternative to replace wet chemical-based steps. Owing to their inherent compatibility with in-line processing, dry cleaning processes can be directly integrated into existing in-line device fabrication systems, while maintaining throughput on the same order as conventional wet chemical cleaning steps [13]. Gas-phase cleaning, photochemically enhanced cleaning, thermally enhanced cleaning, ultraviolet (UV)-O3 cleaning and plasma-enhanced cleaning are representative dry-cleaning methods reported previously [14,15]. In particular, method such as plasma-enhanced cleaning was shown effective in removing organic contaminants. In plasma-enhanced cleaning, reactive species such as ions and energetic neutral particles in the plasma can react with organic contaminants, which were UV-excited by UV radiation from the plasma, therefore removing them. In particular, O2-plasma treatment (OPT) shows notifying effects on decomposing organic contaminants due to its strong oxidation capabilities [16,17]. Metallic contaminants on the c-Si substrate surface can also be oxidized during OPT, which is then etched away by subsequently dipping the wafers in diluted HF solution. In addition, the surface conditioning of the textured c-Si wafer surface achieved through repeated cycles of SiOx growth by OPT followed by removal can remove defects at the (111) facets, tips and valleys of textured c-Si wafers [6]. From the processing perspective, cleaning efficiency and wafer surface quality can be precisely tuned by controlling plasma processing parameters such as plasma power density and gas 

flow rates. These characteristics make OPT promising for applications in not only solar cells but also various microelectronic and sensor devices. 

In this study, we propose an integrated wafer cleaning and surface conditioning process that reduces reliance on wet chemicals compared to conventional methods. The process incorporates an OPT as a key step, while the solution-based step is limited to a diluted HF dip followed by rinsing in DI water. We observed that our new process comprising of multiple cycles of OPT followed by HF dipping and DI water rinsing showed effectiveness for both wafer cleaning and surface conditioning. The effectiveness of our integrated wafer cleaning and surface conditioning approach was evaluated by measuring the implied open-circuit voltage (i _V_ oc), a direct indicator of surface passivation quality, on symmetrically passivated wafers with hydrogenated intrinsic amorphous silicon ((i) a-Si:H) layers. To investigate reasons behind the variation in i _V_ oc for wafers processed with different OPT powers during the OPT process, we performed spectroscopic ellipsometry (SE) measurement with subsequent modeling, quasi-steady-state photoconductance (QSSPC) as well as x-ray photoelectron spectroscopy (XPS) on c-Si wafers after OPT treatment at various powers. 

### **2. Experimental** 

Fig. 1 shows a schematic of the proposed integrated wafer cleaning and surface conditioning process, which reduces reliance on wet chemicals and is followed by the sample fabrication process. Textured n- type c-Si (100) wafers, with a resistivity of 1.3 Ω⋅cm and thickness of 135 μm, which are comparable to those of commercially available n-type c-Si solar wafers, were used in this study, where texturing of the c-Si wafers was performed using a KOH solution diluted to 7% in DI water and isopropyl alcohol (Fig. 1(a)). Polished flat n-type c-Si (100) wafers with a resistivity of 1–50 Ω⋅cm and a thickness of 775 μm, which are typical of commercially available 12-inch c-Si wafers used in the semiconductor industry, were also used for analysis purposes. Both types of wafers were 



**Fig. 1.** Schematic of the proposed integrated wafer cleaning and surface conditioning process, which reduces reliance on wet chemicals: (a) Bare wafers with native oxide present on both sides. (b) The wafers were dipped in a 5% diluted hydrogen fluoride (HF) solution to remove the native oxide. (c) A SiOx layer was grown on both sides via O2-plasma treatment (OPT). In this study, the cycle—consisting of OPT on both sides followed by HF dipping—was repeated one to three times. (d) After the final OPT, the SiOx layers were removed from both sides using diluted HF acid solution, resulting in a hydrogen-terminated c-Si surface and thereby significantly suppressing the regrowth of native oxide for several hours. (e) Finally, hydrogenated intrinsic amorphous silicon ((i) a-Si:H) passivation layers were deposited on both sides using a plasma-enhanced chemical vapor deposition (PECVD) system. 

2 

_Surfaces and Interfaces 91 (2026) 109255_ 

dipped in 5% diluted HF acid solution for 45 s to remove the native oxide before OPT (Fig. 1(b)). This process also made the c-Si wafer surface hydrophobic (i.e., hydrogen-terminated). As described in Fig. 1(c), the SiOx layer was formed using an atmospheric-pressure plasma system with a capacitively coupled plasma configuration (AFS-A230, All For System). Ar (12 sccm) and O2 (10 sccm) gases were injected into the chamber under a radio frequency (RF, 13.56 MHz) power of 250–400 W for approximately 7 min, without applying any bias to the substrates. To examine the influence of OPT on integrated wafer cleaning and surface conditioning, along with the resulting passivation quality, textured wafers were subjected to one to three cycles of surface oxidation followed by diluted HF-based oxide removal (Fig. 1(b),(c)). As a reference, textured wafers were also cleaned with the conventional RCA method [18]. After going through a number of cycles of surface oxidation followed by final diluted HF-based oxide removal (Fig. 1(d)), which is known to result in a hydrogen-terminated surface and thereby significantly suppress the regrowth of native oxide for several hours [19], the textured wafers were loaded into a RF plasma-enhanced chemical vapor deposition (PECVD) system within a short transfer time to deposit a 10 nm-thick (i) a-Si:H layer on both sides, forming symmetric (i) a-Si:H/(n) c-Si/(i) a-Si:H structures (Fig. 1(e)). The (i) a-Si:H deposition was conducted using SiH4 and H2 gas flow rates of 28 sccm and 380 sccm, respectively, at a pressure of 1800 mTorr, an inter-electrode distance of 2 cm, a RF power of 50 W, and a substrate temperature of 220<sup>◦</sup> C. More 

details on the PECVD process in this study can be found in previous papers [18,20]. 

The thickness and optical constants of the SiOx layers and their interlayer with the polished flat c-Si wafer, as well as the thickness of the deposited (i) a-Si:H films, were determined by spectroscopic ellipsometry (SE, M-2000 U, J. A. Woollam) measurements and optical modelling over a wavelength range of 350–1000 nm. For SE measurements, the polished flat c-Si wafers diced into 2 × 2 cm<sup>2</sup> samples were used. The optical modeling of the (i) a-Si:H layers was performed using the Tauc–Lorentz (T–L) models [18,21]. The surface passivation quality of the fabricated (i) a-Si:H/(n) c-Si/(i) a-Si:H samples was evaluated by QSSPC (WCT-120, Sinton Instruments) system [22]. For QSSPC measurements, the textured wafers diced into 5 × 5 cm<sup>2</sup> samples were used. The chemical properties of the SiOx layers formed on the polished flat wafers with a dimension of 2 × 2 cm<sup>2</sup> , as well as changes in OPT-related microstructural change underneath the c-Si wafer surface were investigated using XPS. XPS measurements were performed using a system (PHI GENESIS, ULVAC-PHI) equipped with a monochromatic Al Kα (1486.6 eV) X-ray source with a spot size of 100 μm. Before measurements, calibration was performed by assigning the C 1 _s_ peak of adventitious carbon to a binding energy (BE) of 284.6 eV [23,24]. Si 2 _p_ spectra – were then collected over a BE range of 95 110 eV, with a pass energy of 55 eV, a channel step of 0.1 eV, 3 scans, and a dwell time of 600 ms. 



**Fig. 2.** (a) The optical model used in this study for deducing spectroscopic ellipsometry (SE) results of SiOx films. The model incorporates a SiOx layer described by using the Sellmeier function to fit the optical constants. An interlayer is also included, modeled using the Bruggeman Effective Medium Approximation (BEMA) based on the optical constants of SiO2 and amorphous silicon (a-Si). (b) the variation of SiOx thickness with O2-plasma treatment (OPT) power, deduced from the SE results. The SiOx thickness increase appears to saturate at higher OPT power, as illustrated by the red dashed guiding curve. (c) refractive index ( _n_ ) spectra deduced from the SE results in the 350–1000 nm wavelength range for the SiOx layers in this study. (d) Values of _n_ at a wavelength of 550 nm as a function of OPT power. For reference, _n_ of thermal SiO2 is also shown as a red dashed line. It is shown that _n_ at a wavelength of 550 nm approaches that of thermal SiO2 as the OPT power increases. 

3 

> _J.-H. An et al.                                                                                                                                                                                                                                   Surfaces and Interfaces 91 (2026) 109255_ 

### **3. Results and discussion** 

Fig. 2 presents SE results for SiOx layers grown on polished flat c-Si wafer surfaces using a single-step OPT under varying OPT powers. Fig. 2 (a) illustrates the optical model used in this study. The model incorporates a SiOx layer described using the Sellmeier function [25,26] to fit the optical constants of SiOx films produced by the OPT process. The – Sellmeier function, unlike the Cauchy formula, is Kramers Kronig consistent and thus more accurately represents the physical shape of optical dispersion relations of transparent films [25,26]. In the optical model, an interlayer is represented using the Bruggeman Effective Medium Approximation (BEMA), which is based on the optical constants of SiO2 [27] and amorphous silicon (a-Si) [28,29]. The Si lattice beneath the SiOx/c-Si interface can be slightly inhomogeneous and disordered, as revealed by cross-sectional TEM observations [30,31], which justifies the use of a-Si optical constants in our modeling approach. It should be noted that modeling artifacts may result if the interlayer at the SiOx/c-Si interface is not properly incorporated in the optical model [25]. Figs. 2 (b)–(d) illustrate the variation of SiOx thickness and refractive index ( _n_ ) respectively, with OPT power, based on the modeling results. As shown in Fig. 2(b), the SiOx film thickness increases from 9.77 Å at 250 W to 18.16 Å at 400 W with increasing OPT power. The observed increase in thickness with higher OPT power can be attributed to an enhanced SiOx growth rate, driven by a higher electron density in the plasma, which promotes the dissociation of O2 into energetically reactive species such as negative oxygen ions (O<sup>-</sup> ) and radicals [32,33]. In addition, the SiOx thickness increase appears to saturate at higher OPT power, as illustrated by the guiding curve. This may be due to the limited supply of energetically reactive species, such as O<sup>-</sup> ions and radicals, which must penetrate the thicker SiOx layer to reach the c-Si wafer and react with Si atoms to form SiOx. 

Fig. 2(c) shows the _n_ spectra deduced from SE results in the 350–1000 nm wavelength range for the SiOx layers described in Figs. 2 (a) and (b). To better visualize the effect of varying OPT power on _n_ of the SiOx layers, Fig. 2(d) presents the values of _n_ at a wavelength of 550 nm as a function of OPT power. As shown in the Fig. 2(d), _n_ decreases as the OPT power increases. For example, _n_ was 1.532 at an OPT power of 250 W, whereas it decreased to 1.467 at 400 W. In addition, _n_ at a wavelength of 550 nm approaches that of thermal SiO2 [34] as the OPT power increases. Therefore, the variation in _n_ for the SiOx layers suggests that their stoichiometry (i.e., the value of x in SiOx) and/or density changes with different OPT power levels [35–37]. Figure S1 (Supporting 

Information) shows stoichiometry of the SiOx layers corresponding to Fig. 2, deduced from SE results using BEMA of SiO and SiO2 phases [29, 38,39]. SiOx layers fabricated under low OPT power exhibited a higher _n_ (Fig. 2(d)), due to the formation of Si-rich SiOx (Figure S1) [29,40], which results from a lesser amount of energetically reactive species such as O<sup>-</sup> ions and radicals in the plasma. In contrast, SiOx layers grown at high OPT power may be denser, leading to higher _n_ , but this effect could be offset by the formation of a more stoichiometric SiOx (Figure S1) [29]. This compositional difference may influence not only the material properties of the SiOx layers themselves but also the interface characteristics of devices fabricated with OPT c-Si wafers. 

Fig. 3 presents SE results for the interlayers illustrated in Fig. 2(a), which were also formed during a single-step OPT process under varying powers. Fig. 3(a) presents the interlayer thicknesses deduced at various OPT power levels. The graph shows that the interlayer thickness tends to increase from 0.51 Å at an OPT power of 250 W to 2.08 Å at 350 W, and then decreases to 1.42 Å as the OPT power further increases to 400 W. Fig. 3(b) shows SiO2volumeric fraction (%) in the interlayer deduced at various OPT power levels. As the OPT power increases to 350 W, the SiO2 fraction increases from 12.7% to 58.6%. When the OPT power is further increased to 400 W, the fraction remains nearly similar. Some of ions in the plasma, such as O<sup>-</sup> ions, may be directed toward the c-Si substrate, leading to reaction with c-Si surfaces [41,42]. When OPT power increases, more O<sup>-</sup> ions in the plasma possess higher energy, allowing them to react more with Si atoms. This may have resulted in thicker SiOx (Fig. 2(b)) and interlayer (Fig. 3(a)) at an OPT power of 350 W, and also in the formation of SiOx and interlayer with a higher average oxidation state (Figs. 2(d), 3(b) and S1). The SiOx layer formed at higher OPT powers (e.g., 375 and 400 W) is thicker (Figs. 2(b)) and denser, potentially limiting O<sup>-</sup> ion supply towards the c-Si surface and preventing further interlayer growth [30]. 

Fig. 4 shows a comparison of i _V_ oc values for samples with the (i) a-Si: H/(n) c-Si/(i) a-Si:H structure, treated with different methods: RCA cleaning and OPT repeated one to three times at 350 W. None of the advanced (i) a-Si:H layer stacks [43,44], hydrogenation of (i) a-Si:H with hydrogen plasma [45], post-deposition annealing [37] or heat-assisted light-soaking [46] were applied in this study, in order to focus on the effect of the OPT process. Introducing any of these processes is expected to yield further improvement in i _V_ oc. As shown in the figure, samples with OPT showed higher average i _V_ oc values (681–700 mV) than those cleaned using the conventional RCA process (680 mV). This result suggests that OPT provides more effective cleaning and surface 



**Fig. 3.** (a) Interlayer thicknesses, illustrated in Figure 2(a) and determined by spectroscopic ellipsometry (SE) measurements and modeling, at various O2-plasma treatment (OPT) power levels. It is shown that the interlayer thickness tends to increase from 0.51 Å at an OPT power of 250 W to 2.08 Å at 350 W, and then decreases to 1.42 Å as the OPT power further increases to 400 W. (b) SiO2volumeric fraction in the interlayer, also determined by SE measurements and modeling, at various OPT power levels. As the OPT power increases to 350 W, the SiO2 fraction in the interlayer increases from 12.7% to 58.6%. When the OPT power is further increased to 400 W, the fraction remains nearly similar. 

4 

> _J.-H. An et al.                                                                                                                                                                                                                                   Surfaces and Interfaces 91 (2026) 109255_ 



**Fig. 4.** Comparison of the minimum (black), average (red), and maximum (blue) implied open-circuit voltage (i _V_ oc) values for sample sets with the same (i) a-Si:H/(n) c-Si/(i) a-Si:H structure, subjected to different methods: standard Radio Corporation of America (RCA) cleaning and O2-plasma treatment (OPT) repeated one to three times. Each sample set consists of five samples. The results indicate that the RCA-cleaned samples exhibited an average i _V_ oc of 680 mV, which was lower than that of the OPT-treated samples, with values ranging from 681 to 700 mV. Notably, samples that underwent three OPT cycles achieved an average i _V_ oc of 700 mV. 

conditioning of the c-Si surface than RCA cleaning. This enhanced surface cleaning and conditioning result from more effective reduction of contaminants (Figure S2, Supporting Information), surface roughness and defects (Figures S3 and S4, supporting information) on the c-Si surface, thereby improving the surface passivation quality at the a-Si: H/c-Si interface, as evidenced by the increased i _V_ oc. Indeed, average i _V_ oc values increased from 681 mV to 700 mV with repeated OPT (from the first to the third), indicating improved surface passivation quality through cumulative cleaning and surface conditioning effects. Figure S5 (Supporting Information) also shows comparison of the implied fill factor (i _FF_ ) values for the same sample sets shown in Fig. 4. As shown in Figure S5, the evolution of i _FF_ with increasing OPT cycles slightly differs from that of i _V_ oc (Fig. 4), for example, showing a slight decrease in the average i _FF_ for the samples processed with OPT three times. This difference may arise because, unlike i _V_ oc, i _FF_ is primarily limited by Shockley–Read–Hall (SRH) recombination dominated by surface defects rather than by Auger recombination. Also, under the assumption that the series resistance is negligible, the lower i _FF_ (Figure S5) compared to Richter’s FF limit [47] can be explained by the corresponding decrease in i _V_ oc at high c-Si doping concentrations [47,48], as observed in this study. Therefore, the lower i _FF_ in Figure S5 compared to Richter’s FF limit can be attributed to the absence of advanced a-Si:H layer stacks, hydrogenation of (i) a-Si:H with hydrogen plasma, post-deposition annealing, or heat-assisted light-soaking treatments. 

It is noteworthy that the standard deviation (SD) of i _V_ oc within each sample set (each consisting of five samples) also decreased following OPT. For example, the SD for OPT samples ranged from 6.78 to 2.61, which was lower than that of samples cleaned using the conventional 6.78 to 2.61 as the number of OPT repetitions increased from the first to RCA method (7.42). Moreover, the SD of i _V_ oc further decreased from the third cycle. This reduction in variability indicates that repeated OPT not only contributes to enhanced surface passivation quality but also improves the reproducibility and reliability of the OPT process. 

It is also noteworthy that parameters such as OPT power and the number of cycles are independent from a plasma-physics perspective. Rather, the combination of OPT power and cycle number is more appropriately considered in terms of process productivity and cleaning efficiency. In this context, Figure S2 also illustrates the effect of different OPT powers (250 and 350 W) on the removal of organic contaminants. As shown in Figure S2, treatment at 250 W for three cycles results in incomplete removal of organic contaminants, whereas treatment at 350 W for the same number of cycles leads to complete removal. This result indicates that a greater number of cycles is required to achieve the 

optimal processing condition with lower OPT power, which increases the processing time and thereby reduces throughput. 

Fig. 5 presents a box plot of the i _V_ oc values for sample sets treated with varying OPT powers. All samples have the same (i) a-Si:H/(n) c-Si/ (i) a-Si:H structure, and the OPT process was repeated three times for each set of five samples. For comparison purposes, i _V_ oc values from RCAcleaned samples are also included in the figure. None of the advanced concepts that were described above were applied in this study. Therefore, incorporating any of these is also expected to result in further improvements in i _V_ oc. OPT samples exhibited average i _V_ oc values of 681–700 mV, higher than that of RCA-cleaned samples (680 mV), in agreement with the results in Fig. 4. In addition, the OPT samples – showed smaller interquartile ranges (2 8 mV) compared to the RCAcleaned samples (12 mV), consistent with smaller SDs for OPT samples (Fig. 4). Increasing the OPT power from 250 W to 350 W increased the average i _V_ oc from 686 to 700 mV. Therefore, using the optimized OPT power (350 W) led to higher average i _V_ oc by 20 mV compared to the RCA-cleaned samples. As discussed in Figs. 2–4, higher OPT power generated more energetically reactive species, such as O<sup>-</sup> ions and radicals, and UV radiation in the plasma. Energetically reactive species and UV radiation in the OPT plasma contribute to the effective removal of organic contaminants (Figure S2, Supporting Information) [16,17]. Furthermore, repeated cycles of SiOx growth by OPT and subsequent removal effectively eliminated metallic contaminants and conditioned the surface of the textured c-Si wafer [6], thereby reducing surface defects (Figure S4) and improving i _V_ oc. It has been reported that (111) facets on textured c-Si wafers exhibit a higher defect density than (100) planes [6,49]. In addition, defects located at the tips and valleys of the pyramidal textures have been shown to cause parasitic epitaxial growth during a-Si:H passivation layer deposition [50,51]. Therefore, the surface conditioning of the textured c-Si wafer surface achieved through repeated cycles of SiOx growth by OPT followed by removal, as implemented in this study, contributed to the improved i _V_ oc. However, further increasing the OPT power to 400 W resulted in a reduced i _V_ oc of 681 mV, suggesting that surface passivation quality may begin to degrade beyond a certain OPT power. This is attributed to the excessive flux of energetic O<sup>-</sup> ions towards the c-Si substrate, which generates vacancy-related and passivation-related defects, and strain in the Si–Si bonds at the c-Si surface and subsurface region [41,42,52–54] Although atmospheric pressure shortens the mean free path relative to the low-pressure case, thereby reducing the kinetic energy of plasma species such as O<sup>-</sup> and Ar<sup>+</sup> ions to below 1 eV, O<sup>-</sup> ions are still transported towards the c-Si surface 



**Fig. 5.** Box plots of the implied open circuit voltage (i _V_ oc) for sample sets with the same (i) a-Si:H/(n) c-Si/(i) a-Si:H structure, under various O2-plasma treatment (OPT) powers. OPT samples exhibited average i _V_ oc values of 681–700 mV, higher than that of RCA-cleaned samples (680 mV). The i _V_ oc also increased with higher OPT power and reached its highest average value of 700 mV at 350 W. However, further increasing the OPT power to 400 W resulted in a reduced average i _V_ oc of 681 mV. 

5 

_Surfaces and Interfaces 91 (2026) 109255_ 

by the plasma potential distribution [42,55]. As a result, O<sup>-</sup> ions are able to interact with the c-Si surface. During this interaction, their potential energy is released through a neutralization process, which is exo-energetic [42,56], which is not the case for the Ar<sup>+</sup> ions [57]. Eberst et al. reported that this energy transfer to the c-Si interface via phonons can create vacancy-related and passivation-related defects, leading to degradation of passivation quality [41]. Figure S4 (Supporting Information) shows 1/effective carrier lifetime (1/ _τ_ eff) vs. excess carrier density (Δ _n_ ) for samples with different OPT powers. Because SRH recombination is mediated by surface defects, it is inversely related to the surface passivation quality [48]. It is worthy to note that the enhanced effect of SRH recombination at low Δ _n_ (typically below 5 × 10<sup>15</sup> cm<sup>-3</sup> ) is shown as anomalously low 1/ _τ_ eff values in the 1/ _τ_ eff versus Δ _n_ plot [58], which is also observed in Figure S4. Also, the measured _τ_ eff values at low Δ _n_ in Figure S4 exhibit the same trend as the i _V_ oc results shown in Fig. 5. Specifically, the sample treated with an OPT power of 350 W shows the highest _τ_ eff (580 µs at Δ _n_ of 2 × 10<sup>15</sup> cm<sup>-3</sup> ) and i _V_ oc (Fig. 5), indicating reduced surface-defect-mediated SRH recombination at the c-Si surface and subsurface. In contrast, samples treated with OPT powers of 250 W and 400 W exhibit lower _τ_ eff (398 and 338 µs) and i _V_ oc values (Fig. 5), indicating enhanced surface-defect-mediated SRH recombination at the c-Si surface and subsurface. Therefore, results shown in Fig. 5 and S4 highlight the importance of optimizing the OPT power, with 350 W the optimal condition in this study, for replacing 

conventional RCA cleaning with OPT. 

To explain the relationship between i _V_ oc evolution (Fig. 5) and the OPT power applied during the OPT, we conducted XPS analyses focusing on (1) the SiOx thin films formed by OPT and (2) the SiOx/c-Si interfaces which include a few nanometers beneath the c-Si surface [26]. Fig. 6(a) shows the Si 2 _p_ XPS spectra (96–106 eV) of SiOx/c-Si samples fabricated with varying OPT powers. The Si 2 _p_ spectra are generally divided into – two regions. The lower BE region (98 100 eV) corresponds to elemental Si from the bulk c-Si substrate (Si<sup>0</sup> ), comprising the Si 2 _p_ 1/2 and Si 2 _p_ 3/2 inner-shell lines [59]. The higher BE region (100–105 eV) is attributed to silicon suboxide states—Si<sup>1+</sup> (Si2O), Si<sup>2+</sup> (SiO), and Si<sup>3+</sup> (Si2O3)—as well as the fully oxidized state, Si<sup>4+</sup> (SiO2) [60]. As shown in Fig. 6(a), the intensity of Si<sup>0</sup> peaks decreases with increasing OPT power. Similar to SE, XPS is a highly surface-sensitive technique, detecting photoelectrons from only the top few nanometers of the sample surface [26,61, 62]. Therefore, for thicker SiOx, the effective sampling volume of c-Si may be reduced. Thicker SiOx layers on the c-Si substrate can also attenuate the photoelectron signal from the underlying c-Si. The higher BE region (100–105 eV) in Fig. 6(a) shows the differences in silicon oxidation states among the samples [63]. For the sample with an OPT power of 250 W, only a low-intensity and broad peak in the 101–104 eV range was observed, indicating the formation of a smaller amount of SiOx with lower oxidation states, consistent with the results shown in Figs. 2, 3, and S1. Fig. 6(b) shows the BE corresponding to the maximum counts/s within the 100–105 eV range (Fig. 6(a)) for SiOx/c-Si samples processed at different OPT powers. At an OPT power of 250 W, the BE was 102.6 eV, and it increased to 103.4 eV as the OPT power rose to 325 W. This indicates a shift in Si–O chemistry at the c-Si surface toward higher oxidation states with increasing OPT power. Given that the peak BEs of Si<sup>1+</sup> , Si<sup>2+</sup> , and Si<sup>3+</sup> are typically observed at 100.5–100.7 eV, 101.5–101.8 eV, and 102.5–103.0 eV, respectively [63,64], OPT powers of 275 W or higher can be regarded to have strong oxidation capability, resulting in BE values exceeding 103 eV in Fig. 6(b). Although further increasing the OPT power to 400 W, the BE saturated at approximately – 103.4 eV, which closely approaches the 103.5 104 eV range characteristic of the fully oxidized state of Si (Si<sup>4+</sup> ) [63,64]. Furthermore, the peak intensity of samples with higher OPT power tends to be greater in the higher BE region (Fig. 6(a)), suggesting an increased amount of SiOx within the XPS probing depth. These results clearly demonstrate that higher OPT power leads to the formation of thicker and more highly oxidized SiOx layers, in agreement with the results shown in Figs. 2, 3, and S1. These results are also linked to the results in the 250–350 W 



**Fig. 6.** (a) Si 2 _p_ X-ray photoelectron spectroscopy (XPS) spectra in the binding energy (BE) range of 96–106 eV for SiOx/c-Si samples fabricated with varying – OPT power. The lower BE region (98 100 eV) corresponds to elemental Si from the bulk c-Si substrate (Si<sup>0</sup> ). (b) The BE corresponding to the maximum counts/ s within the 100–105 eV range (Figure 6(a)) for SiOx/c-Si samples processed at different OPT powers. (c) Full width at half maximum (FWHM) of the Si 2 _p_ 3/2 peak from the c-Si subsurface as a function of OPT power. The FWHM of the bare c-Si wafer (0.45 eV) is indicated by a red dashed line. 

6 

> _J.-H. An et al.                                                                                                                                                                                                                                   Surfaces and Interfaces 91 (2026) 109255_ 

range in Fig. 5, showing impact of OPT on optimized surface cleaning and conditioning, leading to higher passivation quality. 

However, increasing the OPT power resulted in a higher flux of O<sup>-</sup> ions transported toward the c-Si substrate, leading to a reduction in average i _V_ oc from 700 mV at 350 W to 681 mV at 400 W (Fig. 5). The energy transfer from these O<sup>-</sup> ions to the c-Si surface via phonons can induce vacancy-related and passivation-related defects in the n-type c-Si surface and subsurface, such as vacancy–oxygen pairs ( _VO_ ), divacancies ( _V_ 2), vacancy–phosphorus pairs ( _VP_ ), and additional dangling bonds (DBs) such as isolated DBs at the SiOx/c-Si interface [52,53]. Furthermore, the energy transferred by O<sup>-</sup> ions can induce strain in the Si–Si bonds [41]. It is reported that changes in the first-neighbor distance and interbond angle affect the distribution of Si valence electrons [52,65]. Furthermore, it has been shown that the core-shell energy levels—measured in XPS analysis—are sensitive to valence shell charge distribution, such that charge fluctuations in the valence shell can lead to broadening of the core-level peaks [62]. In this manner, vacancy-related defects in the n-type c-Si subsurface—such as _VO, V_ 2, and _VP_ —along with strain in the Si–Si bonds, can induce local variations in the bonding environment of the c-Si lattice, which may contribute to broadening of the core-level peaks. In addition, these defects can capture or emit charge carriers, altering the local atomic arrangement, modifying energy levels [53], and contributing to core-level peak broadening. Therefore, monitoring changes in the full width at half maximum (FWHM) of XPS peaks of elemental Si (Si<sup>0</sup> ) can provide insight into the origin of the reduced i _V_ oc in samples subjected to higher OPT power, as observed in Fig. 5. Fig. 6(c) shows how the FWHM of the Si 2 _p_ 3/2 peak from the c-Si subsurface varies with OPT power. The FWHM of the bare c-Si wafer (0.45 eV) is indicated in the figure as a red dashed line. For samples treated with OPT power ranging from 250 to 325 W, the FWHM remains constant at 0.5 eV, slightly higher than that of bare c-Si, suggesting that the impact of O<sup>-</sup> ions was minimal. This slightly higher FWHM is also in line with the observation that the Si lattice beneath the SiOx/c-Si interface can be slightly inhomogeneous and disordered [30, 31]. However, further increase in OPT power results in a linear increase in FWHM, reaching 0.55 eV at 400 W. These observations, combined with the preceding discussion in Fig. 5, indicate that higher OPT power induces point defects, strain in the Si–Si bonds and DBs, which in turn degrade i _V_ oc for the symmetrically passivated samples, as shown in Fig. 5. 

As discussed above, energetically reactive species and UV radiation in the OPT plasma contribute to the effective removal of organic contaminants (Figure S2). Furthermore, repeated cycles of SiOx growth by OPT followed by removal effectively eliminated metallic contaminants and conditioned the surface of the textured c-Si wafer (Figure S3) [6]. All these effects led to fewer surface defects and subsequently improved i _V_ oc. In this context, the optimization of OPT power emerges as a critical parameter (Fig. 5), as it maximizes the cleaning and surface conditioning efficiency while minimizing the unwanted effects of excessive energy transfer from O<sup>-</sup> ions to the c-Si surface via phonons. This optimization ensures both the reliability and reproducibility of the overall process. From a practical and industrial standpoint, OPT offers several advantages. As a dry process step, it reduces chemical consumption, thereby lowering both environmental impact and processing costs. Additionally, it mitigates the risk of contamination from residual impurities typically introduced during wet cleaning, which is a known cause of degraded electrical performance in semiconductor devices [9, 66–68]. From an industrial perspective, the OPT process can be implemented as an in-line surface cleaning and conditioning step prior to (i) a-Si:H passivating layer deposition, with cleaning performance tunable via OPT power and cycle number to balance throughput and effectiveness. Owing to its low thermal budget, chemical-free nature, and scal— ability to high-throughput in-line systems potentially exceeding 12, — 000 wafers per hour the OPT process is compatible with existing c-Si PV manufacturing lines, although the present study focuses on demonstrating process feasibility at the laboratory scale [13]. Therefore, OPT 

represents a promising strategy for improving the performance and yield of various semiconductor devices, including not only c-Si solar cells but also microelectronic and sensor devices. To fully realize the potential of the proposed OPT approach, future work should focus on fine-tuning OPT process parameters and achieving larger-area uniformity compatible with high-throughput in-line processing for industry-standard c-Si wafer sizes. 

### **4. Conclusions** 

In this study, we demonstrated a novel wafer cleaning and conditioning process that integrates OPT, which reduces reliance on wet chemicals while achieving superior wafer cleaning and surface conditioning. OPT power critically influenced SiOx growth, defect formation in c-Si subsurface, and subsequently passivation quality of symmetrically passivated wafers. An optimized OPT power (350 W) yielded higher average i _V_ oc (700 mV) and smaller interquartile ranges (2–8 mV) than conventional RCA cleaning (680 mV and 12 mV, respectively). However, excessive OPT power led to defect-related i _V_ oc degradation. This i _V_ oc degradation was in line with a linear increase in FWHM of Si 2 _p_ 3/2 peak, increasing from 0.51 eV at 350 W to 0.55 eV at 400 W, indicating that higher OPT power induces point defects, strain in the Si–Si bonds and DBs, which in turn degrade i _V_ oc for the symmetrically passivated samples. The OPT process in this study offers environmental and economic advantages, and its integration into in-line fabrication systems holds promise for scalable, high-throughput applications in solar cells and semiconductor devices. 

### **Declaration of generative AI and AI-assisted technologies in the writing process** 

During the preparation of this work the authors used ChatGPT to improve language and readability. After using this service, the authors reviewed and edited the content as needed and take full responsibility for the content of the publication. 

### **CRediT authorship contribution statement** 

**Jeong-Ho An:** Writing – original draft, Visualization, Investigation, Formal analysis, Data curation. **Ji-Eun Hong:** Visualization, Investigation. **Sung-In Mo:** Investigation. **Yimhyun Jo:** Resources, Funding acquisition. **Minjin Kim:** Investigation. **Sungmin Kang:** Resources, Funding acquisition. **Sinho Choi:** Resources, Funding acquisition. **Soong Ju Oh:** Investigation. **Junghan Lee:** Resources. **Hee-eun Song:** Resources, Investigation, Funding acquisition. **Ka-Hyun Kim:** Resources, Investigation, Funding acquisition. **Joon-Ho Oh:** Writing – review & editing, Writing – original draft, Validation, Supervision, Resources, Project administration, Methodology, Investigation, Funding acquisition, Formal analysis, Data curation, Conceptualization. 

### **Declaration of competing interest** 

The authors declare that they have no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper. 

### **Acknowledgements** 

This work was supported by the Research and Development Program of the Korea Institute of Energy Research (KIER, Grant Nos. C6-2403-14 and C6-8105); the Global Joint Research Promotion Program, jointly managed by Forschungszentrum Jülich (FZJ) and the National Research Council of Science and Technology (NST) under the Ministry of Science and ICT (MSIT) of Korea (Grant No. NST-Global-24-001); the National Research Foundation of Korea (Grant No. RS-2024-00347775); and Samsung Electronics Co., Ltd. 

7 

_Surfaces and Interfaces 91 (2026) 109255_ 

_J.-H. An et al.                                                                                                                                                                                                                                   and_ 

### **Supplementary materials** 

Supplementary material associated with this article can be found, in the online version, at doi:10.1016/j.surfin.2026.109255. 

### **Data availability** 

Data will be made available on request. 

### **References** 

- [1] M. Chu, M.Q. Khokhar, F. Wang, M. Maqbool, A. Wahab, Z. Wang, Z. Lan, S. Wu, Improving the surface passivation and cleaning quality of c-Si wafers for the application of TOPCon solar cells, Silicon 16 (2024) 2245–2252, https://doi.org/ 10.1007/s12633-023-02831-7. 

- [2] G. Longoni, D. Assanelli, C. De Marco, Wet etching and cleaning, in: B. Vigna, P. Ferrari, F.F. Villa, E. Lasalandra, S. Zerbini (Eds.), Silicon Sensors and Actuators, Springer, Cham, 2022, https://doi.org/10.1007/978-3-030-80135-9_9. 

- [3] H. Angermann, Passivation of structured p-type silicon interfaces: effect of surface morphology and wet-chemical pre-treatment, Appl. Surf. Sci. 254 (2008) 8067–8074, https://doi.org/10.1016/j.apsusc.2008.03.022. 

- [4] A. Froitzheim, K. Brendel, L. Elstner, W. Fuhs, K. Kliefoth, Interface recombination in heterojunctions of amorphous and crystalline silicon, J. Non-Cryst. Solid. 299 

   - (2002) 663–667, https://doi.org/10.1016/S0022-3093(01)01029-8. 

- [5] H. Angermann, J. Rappich, Wet-chemical conditioning of silicon substrates for a-Si: h/c-Si heterojunctions, in: W.G.J.H.M. van Sark, L. Korte, F. Roca (Eds.), Physics and Technology of Amorphous-Crystalline Heterostructure Silicon Solar Cells, Engineering Materials, Physics and Technology of Amorphous-Crystalline Heterostructure Silicon Solar Cells, Engineering Materials, 0, Springer, Berlin, Heidelberg, 2012, https://doi.org/10.1007/978-3-642-22275-7_3. 

- [6] A. Moldovan, T. Dannenberg, J. Temmler, L. Kroely, M. Zimmer, J. Rentsch, Ozone-based surface conditioning focused on an improved passivation for silicon heterojunction solar cells, Energ. Proced. 92 (2016) 374–380, https://doi.org/ 10.1016/j.egypro.2016.07.115. 

- [7] W. Kern, The evolution of silicon wafer cleaning technology, J. Electrochem. Soc. 137 (1990) 1887, https://doi.org/10.1149/1.2086825. 

- [8] L. Zhang, W. Liu, R. Chen, J. Liu, F. Meng, Z. Liu, Effective interface pretreatment for amorphous-crystalline silicon, in: Proc. 43rd IEEE Photovoltaic Specialists Conf. (PVSC), Portland, OR, USA, 2016, pp. 0743–0746. https://doi.org/10.1109/PVSC. 2016.7749701. 

- [9] M. Meuris, P.W. Mertens, A. Opdebeeck, H.F. Schmidt, M. Depas, G. Vereecke, M. M. Heyns, A. Philipossian, The IMEC clean: a new concept for particle and metal removal on Si surfaces, Solid Stat. Technol.. 38 (1995) 109–113. 

- [10] S.H. Chen, S.L. Chen, L.T. Chung, W.K. Yeh, The new concept for particle remove in wet bench cleaning, in: Proc. 13th Int. Symp. Phys. Failure Anal. Integr. Circuits 

   - (IPFA), Singapore, 2006, p. 137–140. https://doi.org/10.1109/IPFA.2006.251015. 

- [11] S. Sandhu, A. Zumeit, Z. Tian, V. Vinciguerra, R. Dahiya, Semiconductor manufacturing wastewater challenges and the potential solutions via printed electronics, iScience 28 (2025) 113576, https://doi.org/10.1016/j. isci.2025.113576. 

- [12] J. Choi, H.J. Song, S.J. An, Development of eco-friendly cleaning solution for industrial silicon wafer solar cell, Mater. Sci. Semicond. Process. 106 (2020) 104764, https://doi.org/10.1016/j.mssp.2019.104764. 

- [13] International Technology Roadmap for Photovoltaic. https://www.vdma.eu/en 

   - -GB/international-technology-roadmap-photovoltaic, 2025. 

- [14] J.R. Vig, UV/ozone cleaning of semiconductor surfaces, in: W. Kern (Ed.), Handbook of Semiconductor Wafer Cleaning Technology: Science, Technology, and Applications, Noyes Publications, Park Ridge, NJ, 1993, pp. 233–263. 

- [15] H. Joh, W. Lee, M. Kang, M. Seong, H. Kim, J. Bang, S.W. Lee, M.A. Hossain, S. Oh, Surface design of nanocrystals for high-performance multifunctional sensors in wearable and attachable electronics, Chem. Mater. 31 (2019) 436–444, https:// doi.org/10.1021/acs.chemmater.8b03914. 

- [16] K. Choi, T.J. Eom, C. Lee, Comparison of the removal efficiency for organic contaminants on silicon wafers stored in plastic boxes between UV/O3 and ECR oxygen plasma cleaning methods, Thin. Solid. Films. 435 (2003) 227–231, https:// doi.org/10.1016/S0040-6090(03)00329-8. 

- [17] J. Jiang, Q. Wang, F. Zhang, L. Li, D. Zhou, Y. Liu, D. Wang, J.P. Ao, Reduction of leakage current by O2 plasma treatment for device isolation of AlGaN GaN heterojunction field-effect transistors, Appl. Surf. Sci. 351 (2015) 1155–1160, https://doi.org/10.1016/j.apsusc.2015.06.092. 

- [18] J.H. An, J.H. Oh, K.T. Jeong, O. Kwon, S.J. Oh, K.H. Kim, S.W. Kim, M.J. Keum, H. E. Song, K.H. Kim, Silicon–hydrogen bonding configuration modified by layer stacking sequence in silicon heterojunction solar cells, ACS. Appl. Energy Mater. 5 (2022) 15029–15037, https://doi.org/10.1021/acsaem.2c02668. 

- [19] J. Holovský, S. De Wolf, P. Jiˇríˇcek, C. Ballif, Attenuated total reflectance Fouriertransform infrared spectroscopic investigation of silicon heterojunction solar cells, Rev. Sci. Instrum. 86 (2015) 073108, https://doi.org/10.1063/1.4926749. 

- [20] J.H. Oh, T.K. Lee, R.Y. Kim, J.H. An, S.I. Mo, J.E. Hong, S.W. Kim, M.J. Keum, H. E. Song, K.H. Kim, Dynamics of plasma-assisted epitaxial silicon growth driven by a hydrogen-incorporated nanostructure for novel applications, Small. Struct. 5 (2024) 2300218, https://doi.org/10.1002/sstr.202300218. 

and microstructural evolution of sub-10-nm hydrogenated amorphous silicon films, ACS. Appl. Mater. Interfaces. 17 (2025) 49049–49057, https://doi.org/10.1021/ acsami.5c13561. 

- [22] S.I. Mo, S. Choi, J.H. An, B.J. Kim, K.H. Min, S. Park, J.E. Hong, S.J. Oh, H.E. Song, J.H. Oh, K.H. Kim, Design rule of electron- and hole-selective contacts for polycrystalline silicon-based passivating contact solar cells, ACS. Appl. Mater. Interfaces. 15 (2023) 46849–46860, https://doi.org/10.1021/acsami.3c08957. 

- [23] G.F. Cerofolini, C. Galati, L. Renna, Si 2p XPS spectrum of the hydrogen-terminated (100) surface of device-quality silicon, Surf. Interface Anal. 35 (2003) 968–973, https://doi.org/10.1002/sia.1632. 

- [24] G. Greczynski, L. Hultman, X-ray photoelectron spectroscopy: towards reliable binding energy referencing, Prog. Mater. Sci. 107 (2020) 100591, https://doi.org/ 10.1016/j.pmatsci.2019.100591. 

- [25] C.M. Herzinger, B. Johs, W.A. McGahan, J.A. Woollam, W. Paulson, Ellipsometric determination of optical constants for silicon and thermally grown silicon dioxide via a multi-sample, multi-wavelength, multi-angle investigation, J. Appl. Phys. 83 (1998) 3323–3336, https://doi.org/10.1063/1.367101. 

- [26] J.I. Polzin, S. Lange, S. Richter, A. Steinmetz, M. Bivour, C. Hagendorf, M. Hermle, S. Glunz, F. Feldmann, Temperature-induced stoichiometric changes in thermally grown interfacial oxide in tunnel-oxide passivating contacts, Sol. Energy Mater. Sol. Cells 218 (2020) 110713, https://doi.org/10.1016/j.solmat.2020.110713. 

- [27] E.D. Palik, Handbook of Optical Constants of Solids, 1, Academic, Press, 1985, pp. 749–763. 

- [28] E.D. Palik, Handbook of Optical Constants of Solids, 1, Academic Press, 1985, 

pp. 577–580. 

   - [29] F. Ge, L. Wang, G. Han, Y. Liu, S. Ma, Optical modeling of SiOx thin films for physicochemical property measurement by spectroscopic ellipsometry, Opt. Mater. 164 (2025) 117044, https://doi.org/10.1016/j.optmat.2025.117044. 

   - [30] S. Nunomura, T. Tsutsumi, M. Hori, SiO2/Si interface oxidation and defects in O2 plasma processing, Appl. Phys. Express. 18 (2025) 026002, https://doi.org/ 10.35848/1882-0786/adb007. 

   - [31] S. Richter, K. Kaufmann, V. Naumann, M. Werner, A. Graff, S. Großer, A. Moldovan, M. Zimmer, J. Rentsch, J. Bagdahn, C. Hagendorf, High-resolution structural investigation of passivated interfaces of silicon solar cells, Sol. Energy Mater. Sol. Cells 142 (2015) 128–133, https://doi.org/10.1016/j. solmat.2015.06.051. 

   - [32] K. Tanaka, A. Matsuda, Glow-discharge amorphous silicon: growth process and structure, Mater. Sci. Rep. 2 (1987) 139, https://doi.org/10.1016/S0920-2307(87) 80003-8. 

   - [33] J.C. Knights, Characterization of plasma-deposited amorphous Si:h thin films, Jpn. J. Appl. Phys. 18 (1979) 101, https://doi.org/10.7567/JJAPS.18S1.101. 

   - [34] H.R. Philipp, Handbook of Optical Constants of Solids, 1, Academic, New York, 1985, p. 749. 

   - [35] R.A. Synowicki, Spectroscopic ellipsometry characterization of indium tin oxide film microstructure and optical constants, Thin. Solid. Films. 313–314 (1998) 394, https://doi.org/10.1016/S0040-6090(97)00853-5. 

   - [36] K. Sangwal, W. Kucharczyk, Relationship between density and refractive index of inorganic solids, J. Phys. D 20 (1987) 522, https://doi.org/10.1088/0022-3727/ 20/4/019. 

   - [37] J.H. An, J.E. Hong, S.I. Mo, Y. Jo, S. Choi, T.H. Kim, S.J. Oh, K.T. Jeong, H.E. Song, J.H. Oh, K.H. Kim, Damage-free sputtering of a transparent conductive oxide using a triode plasma configuration, Sol. Energy Mater. Sol. Cells 283 (2025) 113457, https://doi.org/10.1016/j.solmat.2025.113457. 

   - [38] E.D. Palik, Handbook of Optical Constants of Solids, 1, Academic Press, 1985, p. 768. 

   - [39] E.D. Palik, Handbook of Optical Constants of Solids, 1, Academic Press, 1985, p. 759. 

   - [40] G.E. Jellison Jr., M.F. Chisholm, S.M. Gorbatkin, Parameterization of the optical functions of amorphous materials in the interband region, Appl. Phys. Lett. 69 (1996) 371–373, https://doi.org/10.1063/1.118064. 

   - [41] A. Eberst, B. Xu, K. Bittkau, W. Duan, A. Lambertz, A. Meise, M. Heggen, R. E. Dunin-Borkowski, U. Rau, K. Ding, Deeper insight into the mechanisms behind sputter damage in silicon solar cells based on the example of nanocrystalline silicon carbide, Adv. Phys. Res. 3 (2024) 2400036, https://doi.org/10.1002/ apxr.202400036. 

   - [42] F. Massines, C. Sarra-Bournet, F. Fanelli, N. Naude, N. Gherardi, Atmospheric pressure low temperature direct plasma technology: status and challenges for thin film deposition, Plasma Process. Polym. 9 (2012) 1041–1073, https://doi.org/ 10.1002/ppap.201200029. 

   - [43] B. Fischer, W. Beyer, A. Lambertz, M. Nuys, W. Duan, K. Ding, U. Rau, The microstructure of underdense hydrogenated amorphous silicon and its application to silicon heterojunction solar cells, Sol. RRL. 7 (2023) 2300103, https://doi.org/ 10.1002/solr.202300103. 

   - [44] H. Sai, P.W. Chen, H.J. Hsu, T. Matsui, S. Nunomura, K. Matsubara, Impact of intrinsic amorphous silicon bilayers in silicon heterojunction solar cells, J. Appl. Phys. 124 (2018) 103102, https://doi.org/10.1063/1.5045155. 

   - [45] A. Descoeudres, L. Barraud, S. De Wolf, B. Strahm, D. Lachenal, C. Guerin, Z. C. Holman, F. Zicarelli, B. Demaurex, J. Seif, J. Holovsky, C. Ballif, Improved amorphous/crystalline silicon interface passivation by hydrogen plasma treatment, Appl. Phys. Lett. 99 (2011) 123506, https://doi.org/10.1063/1.3641899. 

   - [46] W. Duan, T. Rudolph, H.T. Gebrewold, K. Bittkau, A. Lambertz, D. Qiu, M.A. Yaqin, X. Xu, K. Ding, U. Rau, Insights into the heat-assisted intensive light-soaking effect on silicon heterojunction solar cells, Curr. Appl. Phys. 8 (2024) 2400383, https:// doi.org/10.1002/solr.202400383. 

- [21] J.Y. Lee, J.H. An, S.W. Sim, D.H. Kim, Y. Kim, Y.T. Han, S.M. Park, S.H. Lee, K. J. Seong, S.J. Oh, J. Lee, H.E. Song, J.H. Oh, K.H. Kim, Initial growth mechanism 

8 

_Surfaces and Interfaces 91 (2026) 109255_ 

- [47] A. Richter, M. Hermle, S.W. Glunz, Reassessment of the limiting efficiency for crystalline silicon solar cells, IEEe J. Photovolt. 3 (2013) 1184–1191, https://doi. org/10.1109/JPHOTOV.2013.2270351. 

- [48] U. Chime, L. Wolf, V. Buga, D. Weigand, A. Gad, J. Kohler, A. Lambertz, W. Duan, ¨ K. Ding, T. Merdzhanova, U. Rau, O. Astakhov, How thin practical silicon heterojunction solar cells could be? Experimental study under 1 sun and under indoor illumination, Sol. RRL. 6 (2021) 2100594, https://doi.org/10.1002/ solr.202100594. 

- [49] E.H. Poindexter, P.J. Caplan, B.E. Deal, R.R. Razouk, Interface states and electron spin resonance centers in thermally oxidized (111) and (100) silicon wafers, J. Appl. Phys. 52 (1981) 879–884, https://doi.org/10.1063/1.328771. 

- [50] J.J.H. Gielis, P.J. van den Oever, B. Hoex, M.C.M. van de Sanden, W.M.M. Kessels, Real-time study of a-Si:h/c-Si heterointerface formation and epitaxial Si growth by spectroscopic ellipsometry, infrared spectroscopy, and second-harmonic generation, Phys. Rev. B 77 (2008) 205329, https://doi.org/10.1103/ PhysRevB.77.205329. 

- [51] M.G. Kang, S. Tark, J.C. Lee, C.S. Son, D. Kim, Changes in efficiency of a solar cell according to various surface-etching shapes of silicon substrate, J. Cryst. Growth 326 (2011) 14–18, https://doi.org/10.1016/j.jcrysgro.2011.01.042. 

- [52] N.M. Johnson, D.K. Biegelsen, M.D. Moyer, S.T. Chang, E.H. Poindexter, P. J. Caplan, Characteristic electronic defects at the Si–SiO2 interface, Appl. Phys. Lett. 43 (1983) 563, https://doi.org/10.1063/1.94420. 

- [53] D.H. Kim, J.H. Oh, T.K. Lee, Y. Kim, J.H. An, S.W. Sim, Y.T. Han, J.Y. Lee, M. Kim, K. Im, Y.J. Kim, U. Kim, K.T. Jeong, M.G. Kang, S.H. Lee, Y. Cho, H.E. Song, K. H. Kim, Unraveling mixed-defect transformations and passivation dynamics in silicon heterojunction solar cells, Adv. Funct. Mater. 35 (2025) e08814, https:// doi.org/10.1002/adfm.202508814. 

- [54] H. Jia, M. Tang, J. Ge, Investigation of field-effect passivation created by hydrogen plasma etching of Radio Corporation of America formed chemical oxides on crystalline silicon wafers, Phys. Status Solidi A 218 (2021) 2000586, https://doi. org/10.1002/pssa.202000586. 

- [55] K. Ellmer, Magnetron sputtering of transparent conductive zinc oxide: relation between the sputtering parameters and the electronic properties, J. Phys. D 33 (2000) R17–R32, https://doi.org/10.1088/0022-3727/33/4/201. 

- [56] M.K. Kristiansson, K. Chartkunchand, G. Eklund, O.M. Hole, E.K. Anderson, N. de Ruette, M. KamiJ. Grumer, A. Simonsson, M. Bjnska, N. Punnakayathil, J.E. Navarro-Navarrete, S. Sigurdsson, ´ orkhage, S. Ros¨ ´en, P. Reinhed, M. Blom, A. K¨allberg, J.D. Alexander, H. Cederquist, H. Zettergren, H.T. Schmidt, D. Hanstorp, Highprecision electron affinity of oxygen, Nat. Commun. 13 (2022) 5906, https://doi. org/10.1038/s41467-022-33438-y. 

- [57] S.G. Bratsch, J.J. Lagowski, Predicted stabilities of monatomic anions in water and liquid ammonia at 298.15 K, Polyhedron 5 (1986) 1763–1770, https://doi.org/ 10.1016/S0277-5387(00)84854-8. 

- [58] R.A. Sinton, A. Cuevas, M. Stuckings, Quasi-steady-state photoconductance, a new method for solar cell material and device characterization, in: Proc. 25th IEEE Photovoltaic Specialists Conf. (PVSC), USA, 1996, p.457–460. https://doi.org/1 0.1109/PVSC.1996.564042. 

- [59] H. Shinotsuka, K. Nagata, H. Yoshikawa, S. Ogawa, A. Yoshigoe, Bayesian estimation analysis of X-ray photoelectron spectra: application to Si 2p spectrum analysis of oxidized silicon surfaces, Appl. Surf. Sci. 685 (2024) 162001, https:// doi.org/10.1016/j.apsusc.2024.162001. 

- [60] W.K. Choi, F.W. Poon, F.C. Loh, K.L. Tan, X-ray photoelectron spectroscopy study of rapid thermal annealed silicon–silicon oxide systems, J. Appl. Phys. 81 (1997) 7386–7391, https://doi.org/10.1063/1.365278. 

- [61] U.J. Nsofor, L. Zhang, A. Soman, C.M. Goodwin, H. Liu, K.D. Dobson, U.K. Das, T. P. Beebe Jr., S. Hegedus, Analysis of silicon wafer surface preparation for heterojunction solar cells using X-ray photoelectron spectroscopy and effective minority carrier lifetime, Sol. Energy Mater. Sol. Cells 183 (2018) 205–210, https://doi.org/10.1016/j.solmat.2018.03.006. 

- [62] Z.H. Lu, S.P. Tay, T. Miller, T.C. Chiang, Process dependence of the SiO2/Si(100) interface structure, J. Appl. Phys. 77 (1995) 4110–4112, https://doi.org/10.1063/ 1.359494. 

- [63] M.Y. Bashouti, J. Ristein, H. Haick, S. Christiansen, Silke, A. non-oxidative approach towards hybrid silicon nanowire-based solar cell heterojunctions, Hybrid. Mats. 1 (2013) 2–14. https://doi.org/10.2478/hyma-2013-0002. 

- [64] S. Jayachandran, A. Billen, B. Douhard, T. Conard, J. Meersschaut, A. Moussa, M. Caymax, H. Bender, W. Vandervorst, M. Heyns, A. Delabie, Growth mechanisms for Si epitaxy on O atomic layers: impact of O-content and surface structure, Appl. Surf. Sci. 384 (2016) 152–160, https://doi.org/10.1016/j.apsusc.2016.04.137. 

- [65] L. Guttman, W.Y. Ching, J. Rath, Charge-density variation in a model of amorphous silicon, Phys. Rev. Lett. 44 (1980) 1513, https://doi.org/10.1103/ PhysRevLett.44.1513. 

- [66] S.K.J. Jian, C.C. Jeng, W.S. Yoo, Monitoring metal contamination of silicon by multiwavelength room temperature photoluminescence spectroscopy, AIP. Adv. 2 (2012) 042164, https://doi.org/10.1063/1.4769746. 

- [67] A. Istratov, H. Hieslmair, E. Weber, Iron contamination in silicon technology, Appl. Phys. A 70 (2000) 489–534, https://doi.org/10.1007/s003390000458. 

- [68] P.Y. Chen, Characteristics of spontaneous reaction occurred by metal contamination and silicon substrate for ultralarge-scale integration semiconductor process, J. Electrochem. Soc. 155 (2008) H682–H687, https://doi.org/10.1149/ 1.2953520. 

9 

