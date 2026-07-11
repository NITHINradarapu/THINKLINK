# DOCUMENT: agent-5_1 ald.pdf



##### RESEARCH ARTICLE | JANUARY 22 2025 

## **Atomic layer deposition of nanofilms on porous polymer substrates: Strategies for success** 

###### **Special Collection: Atomic Layer Deposition (ALD)** 







Brian C. Welch  ; Jeanne Casetta ; Rajesh Pathak ; Jeffrey W. Elam ; Céline Pochat-Bohatier ; Philippe Miele ; Tamar Segal-Peretz 



_J. Vac. Sci. Technol. A_ 43, 022402 (2025) 

https://doi.org/10.1116/6.0004187 

 View Export Online<sup></sup> Citation 

### **Articles You May Be Interested In** 

Area-selective atomic layer deposition of Al2O3 on SiN _x_ with SiO2 as the nongrowth surface 

_J. Vac. Sci. Technol. A_ (December 2021) 

The size effect of nanoindentation on ZnO nanofilms 

_J. Appl. Phys._ (December 2007) 

Thermal Stress Behavior of Aluminum Nanofilms under Heat Cycling 

_AIP Conf. Proc._ (December 2004) 



pubs.aip.org/avs/jva 



<!-- Start of picture text -->
ARTICLE<br><!-- End of picture text -->

# Atomic layer deposition of nanofilms on porous polymer substrates: Strategies for success 





Cite as: J. Vac. Sci. Technol. A 43, 022402 (2025); doi: 10.1116/6.0004187 Submitted: 1 November 2024 · Accepted: 18 December 2024 · Published Online: 22 January 2025 





Brian C. Welch,<sup>1,2,a)</sup> Jeanne Casetta,<sup>3</sup> Rajesh Pathak,<sup>2</sup> Jeffrey W. Elam,<sup>2</sup> Céline Pochat-Bohatier,<sup>3</sup> Philippe Miele,<sup>3</sup> and Tamar Segal-Peretz<sup>1</sup> 





#### AFFILIATIONS 

1Department of Chemical Engineering Technion, Israel Institute of Technology, Haifa 3200003, Israel 

2Applied Materials Division, Argonne National Laboratory, Lemont, Illinois 60439 

3Institut Européen des Membranes, IEM, UMR 5635, Univ. Montpellier, CNRS, ENSCM Place Eugène Bataillon, Montpellier cedex 5 34095, France 

Note: This paper is part of the 2025 Special Topic Collection on Atomic Layer Deposition (ALD). 

a)Author to whom correspondence should be addressed: bw@campus.technion.ac.il 

#### ABSTRACT 

Atomic layer deposition (ALD) is a versatile technique for engineering the surfaces of porous polymers, imbuing the flexible, high-surfacearea substrates with inorganic and hybrid material properties. Previously reported enhancements include fouling resistance, electrical conductance, thermal stability, photocatalytic activity, hydrophilicity, and oleophilicity. However, there are many poorly understood phenomena that introduce challenges in applying ALD to porous polymers. In this paper, we address five common challenges and ways to overcome them: (1) entrapped precursor, (2) embrittlement, (3) film fracture, (4) deformation, and (5) pore collapse. These challenges are often interrelated and can exacerbate one another. To investigate these phenomena, we applied various ALD chemistries to porous polymers including polyethersulfone, polysulfone, polyvinylidene fluoride, and polycarbonate track-etched membranes. Reaction-diffusion modeling revealed why certain precursors and processing conditions result in embrittling subsurface material growth, entrapment of unreacted precursors, and nongrowth. We quantify the limits of ALD processing temperatures that are dictated by thermal expansion mismatch and can lead to fractured ALD films. The results herein allow us to make recommendations to avoid, mitigate, or overcome the difficulties encountered when performing ALD and plasma-enhanced ALD on porous polymers. We intend this article to serve as a “lessons learned” guide informed by previous experience to provide a better understanding of the difficulties and limitations of ALD on porous polymers and knowledge-based guidelines for successful depositions. This knowledge can accelerate future research and help experimentalists navigate and troubleshoot as they expose porous polymers to reactive precursor vapors. 

© 2025 Author(s). All article content, except where otherwise noted, is licensed under a Creative Commons Attribution (CC BY) license (https://creativecommons.org/licenses/by/4.0/). https://doi.org/10.1116/6.0004187 

#### I. INTRODUCTION 

Atomic layer deposition (ALD) and plasma-enhanced ALD (PEALD) have emerged as effective techniques for enhancing the properties and performance of porous polymers. With its capability to deposit conformal films on high aspect ratio structures, ALD has been explored as a means to improve thermal stability, tune pore diameter, control hydrophilicity and oleophilicity, reduce surface roughness, optimize permselectivity, inhibit fouling, and resist dissolution.<sup>1–14</sup> Porous polymers are of great interest to many applications. They are flexible, economical, offer high surface areas, 

and are easy to process and handle. ALD has been performed on a wide variety of porous polymers across all ranges of pore diameters: microporous (<2 nm), mesoporous (2–50 nm), and macroporous (>50 nm).<sup>15</sup> The meso- and macroporous categories include porous polypropylene (PP), polytetrafluoroethylene (PTFE), polyvinylidene fluoride (PVDF), polycarbonate (PC) and polyethylene terephthalate (PET) track-etched membranes, polyethersulfone (PES) and polysulfone (PSF) phase inversion membranes, self-assembled block copolymers, and nonwoven and nanofibrous materials.<sup>1,2,16</sup> These polymers are typically formed into flat sheets but may also 

J. Vac. Sci. Technol. A 43(2) Mar/Apr 2025; doi: 10.1116/6.0004187 © Author(s) 2025 

43, 022402-1 

ARTICLE 

pubs.aip.org/avs/jva 

be made as hollow fibers. Examples of ALD-modified microporous polymers include polymers of intrinsic microporosity (PIMs) and polybenzimidazole (PBI).<sup>17</sup> 

Generally, ALD is considered an ideal way to apply a conformal, controlled coating on any substrate. The process is highly controlled and repeatable: sequentially expose a surface to two or more reactive precursors in isolation from each other. Each exposure results in uniform deposition of a single layer of material across the surface via self-limited reactions of adsorbed precursors.<sup>18</sup> This sequence may be repeated to achieve a target material thickness with Angstrom-level precision. A wide range of ALD material chemistries are possible—from ceramics to metals to polymers.<sup>18,19</sup> Furthermore, ALD can be used to conformally grow material on surfaces of complex topographies.<sup>18</sup> ALD has been used extensively to coat inorganic substrates—both porous and nonporous. However, recent growing interest in applying ALD films to porous polymers has revealed unique challenges. Ask an experimentalist about their experience, and they will anecdotally report porous polymer samples that have shrunk, broken, or combusted upon air exposure while attempting ALD. In practice, successful ALD on porous polymers requires special care and methods that cannot be extrapolated from experience with more conventional, inorganic substrates. 

There are significant differences in the film formation process between conventional substrates, such as silicon, and polymers, regardless of their porosity. For instance, polymers may lack reactive functional groups. The inert properties of polyethylene or polystyrene, for example, make nucleation of an ALD film difficult.<sup>20</sup> Unlike most inorganic materials, polymers are temperature sensitive and may melt or decompose at relatively low temperatures, which limits the ALD processing range.<sup>18</sup> Polymers are flexible, which presents challenges when compositing with brittle coatings.<sup>21</sup> Relative to ceramics, polymers have a large coefficient of thermal expansion (CTE), so moderate temperature changes can induce stress at the interface of the two materials.<sup>21</sup> Finally, unlike conventional ALD substrates, polymers can absorb precursor vapors, leading to uncontrolled precursor mixing and chemical vapor deposition (CVD) or vapor phase infiltration (VPI, also called sequential infiltration synthesis).<sup>22,23</sup> 

VPI describes the process by which ALD precursors diffuse into an absorbing substrate such as an organic polymer and interact with it, leading to inorganic material growth within the substrate volume.<sup>24</sup> While ALD leads to film growth exclusively on the polymer surface, VPI leads to material hybridization and/or the growth of inorganic clusters within the polymer.<sup>23</sup> During a precursor dose, the vapor species absorb into, then diffuse throughout the polymer substrate where they may become immobilized through chemical reaction or physical entrapment. The degree of VPI depends on many factors: system conditions such as temperature and precursor partial pressure; substrate-reactant properties such as solubility, diffusivity, and rate of reaction; and process parameters such as dose times and purge times.<sup>25</sup> Since ALD and VPI have a similar dosing scheme, VPI may occur simultaneously with ALD within absorbing materials. VPI may be an unintended side effect, but it has also been widely explored as a means to imbue materials with enhanced properties such as a higher modulus or solvent resistance.<sup>26</sup> 

Successful ALD on porous polymers requires a thorough understanding of the physical and chemical processes that occur in these hybrid inorganic-organic systems. While researchers invariably report the conditions and parameters leading to successful deposition, the conditions leading to undesired outcomes are rarely reported or described. Consequently, these phenomena are poorly understood. To rectify this shortcoming, we combine experimental observations with a precursor-polymer interaction model to address five common challenges and their underlying causes (Fig. 1): (1) precursor entrapment, (2) sample embrittlement, (3) film fracture, (4) sample deformation, and (5) pore collapse. Many of these challenges are interrelated and exacerbate one another. For instance, an ALD oxide film applied to the top of a polymeric membrane can lead to substantial sample curling due to intrinsic film stress. If the sample is uncurled, the ALD film is prone to fracture, or the sample may break apart due to embrittlement from VPI. The results herein provide an understanding of the mechanisms behind these challenges. Suggestions are made for how to avoid, mitigate, or overcome the difficulties involved with performing ALD on porous polymers. 

In this study, we focus on materials with pore diameters greater than a few nanometers, i.e., mesoporous and microporous polymers. However, these lessons may be equally applicable to microporous polymers as well as nonporous polymers. We will tackle questions such as: What caused my ALD film to crack? How do I control VPI in my sample? Why does my substrate disintegrate after ALD? How long should I purge the precursors? The insights obtained from this study will help accelerate future research and assist experimentalists in navigating and troubleshooting the difficulties encountered by applying ALD on porous polymers for emerging technologies. This knowledge extends to other systems, e.g., other vapor deposition techniques or ALD on biomaterials. 

#### II. EXPERIMENT AND MODELING 

#### A. Materials 

PES ultrafiltration membranes with a 20 nm nominal pore size were provided by MilliporeSigma. PSF hollow fiber membranes and PVDF hollow fiber membranes (S2F NEOPHIL, 15 nm nominal 



FIG. 1. Five common challenges for performing ALD on porous polymers. 

J. Vac. Sci. Technol. A 43(2) Mar/Apr 2025; doi: 10.1116/6.0004187 © Author(s) 2025 

43, 022402-2 

ARTICLE 

pubs.aip.org/avs/jva 

pore size) were acquired from Polymem. PC track-etched membranes were acquired from GVS Filter Technology (30 nm nominal pore size) and Sigma Aldrich (Isopore, 0.4 μm nominal pore size). 

Trimethylaluminum (TMA) (98%), cyclopentadienylindium(I) (InCp) (99.99+%), and tris(dimethylamino)gallium dimer [a.k.a. bis(μ-dimethylamino)tetrakis(dimethylamino)digallium, 

Ga2(NMe2)6] (98%) were purchased from Strem. Tetrakis(dimethylamino)tin (IV) (TDMASn) (95%–100%) was bought from Gelest. 3-Aminopropyl triethoxysilane (APTES) (99%), TMA (98%), and titanium (IV) chloride (TiCl4) (99.9%) were bought from Sigma Aldrich. 

#### B. Atomic layer deposition 

Thermal ALD of TiO2 and Al2O3 was performed in a custombuilt static reactor with an Ar purge gas (99.999%, Linde).<sup>27</sup> PEALD of Al2O3 was performed in static mode in a custom-built, remote plasma reactor.<sup>21</sup> Oxygen plasma was produced from a 3.0 standard cm<sup>3</sup> /min (SCCM) O2 (4.4 grade, AirGas) flow through a radio frequency plasma generator (Paramount HALO 3156300-000A, Advanced Energy) at 200 W with N2 purge gas (4.8 grade, AirGas). Thermal ALD of Al2O3, In2O3, SnO2, Ga2O3, and SiO2 was performed in a custom-built viscous flow reactor.<sup>28</sup> Nitrogen gas (99.999%, AirGas) flowed through the reactor at 225 SCCM for a base pressure of ∼0.7 Torr. O3 generation (8%, 0.75 Torr partial pressure) was performed by flowing O2 (99.999%, AirGas) through a Lab-113 ozone generator (Pacific Ozone) at 400 SCCM. O3 flow was introduced into the viscous flow reactor through a 200 μm diameter orifice at a backing pressure of 1 atm. The conditions for each system and chemistry are detailed in Table I. 

#### C. Characterization 

The mechanical properties of PVDF hollow fiber membranes were characterized with a Z005, 5 kN Proline dynamic mechanical analysis device (Zwick Roell) using a 10 N sensor and a tensile 

testing speed of 0.4 mm/min. Ten replicates were performed, and the error is reported as the standard deviation. 

Scanning electron microscope (SEM) images were made with a Hitachi S4800. Light microscope images were made with a 50PT7Z0 SCHU200 SCHUBAO from Perfex Sciences. For cross sectional imaging, samples were washed using ethanol (>95%, Carlo Erba Reagents) and n-hexane (>95%, Carlo Erba Reagents), oven-dried overnight at 50 °C, and fractured using liquid nitrogen. 

#### D. Reaction-diffusion transport model 

The reaction-diffusion transport model we utilized was developed by Ren et al. to describe the spatial transport and reaction of vapor phase precursors within absorbing materials.<sup>25</sup> This model assumes a second order rate of reaction and ignores swelling effects and byproducts. A version of the PYTHON code is publicly available on GitHub.<sup>29</sup> 

#### III. RESULTS AND DISCUSSION 

#### A. Lesson 1: Porous polymers require significant purging 

Typical recipes for ALD on conventional, inorganic substrates such as silicon use relatively short purge times of ∼5–30 s between precursor doses. Commercial tools reduce purge times below 1 s by reducing reactor volume and using an inert sweep gas. Porous substrates add complexity to the purge times owing to transport limitations from Knudsen diffusion inside the pores.<sup>30</sup> Polymeric substrates add further complexity due to VPI, where solution, diffusion, and reaction can occur within the bulk of the polymer. Diffusion of precursors into and out of the polymer bulk may take minutes or hours depending on the thickness and properties of the polymer specimen. Porous polymers combine the two effects and can readily absorb precursors as the pores magnify the surface area and provide high conductance pathways into the polymer bulk. Thus, the adsorption of ALD precursors within the polymer bulk 

TABLE I. ALD process conditions. 

|ALD<br>film|Temp<br>(°C)|Precursor 1|Dose<br>(s)|Pump<br>(s)|Purge<br>gas (s)|Precursor 2|Dose<br>(s)|Pump<br>(s)|Purge<br>gas (s)|Precursor<br>3|Dose<br>(s)|Purge<br>gas (s)|
|---|---|---|---|---|---|---|---|---|---|---|---|---|
|TiO2<br>a|100|TiCl4<br>|0.5|10|60|H2O|2|10|60|—|—|—|
|Al2O3<br>a<br>|100|TMA<sup>d</sup><br>|0.4|40|60|H2O|2|40|60|—|—|—|
|Al2O3<br>b|23|TMA<sup>d</sup>|3|45|25|Oxygen<br>|2|18|—|—|—|—|
|||||||plasma|||||||
|Al2O3<br>c|120|TMA<sup>e</sup>|0.2|—|75|H2O|0.2|—|75|—|—|—|
|In2O3<br>c|120|InCp|16|—|75|H2O|16|—|75|O2|20|75|
|SnO2<br>c|120|TDMASn|1|—|75|H2O|2|—|75|—|—|—|
|Ga2O3<br>c|120|Ga2(NMe2)6|10|—|300|H2O|10|—|300|—|—|—|
|SiO2<br>c|120|APTES|3|—|75|H2O|3|—|75|O3|6|75|



> aPerformed in static mode in a custom-built reactor. 

> bPerformed in static mode in a custom-built, remote plasma reactor. 

> cPerformed in a custom-built viscous flow reactor. 

> dTMA sourced from Sigma Aldrich. eTMA sourced from Strem. 

J. Vac. Sci. Technol. A 43(2) Mar/Apr 2025; doi: 10.1116/6.0004187 © Author(s) 2025 

43, 022402-3 

ARTICLE 

pubs.aip.org/avs/jva 

can greatly extend the purge times required. For example, Waldman et al. found that porous PES infiltrated with TMA required purges that were ∼100 times longer than the precursor dose times.<sup>31</sup> 

Insufficient purging is known to lead to uncontrolled, CVD-like growth at the surface.<sup>32</sup> Absorbed, unreacted precursors may also become entrapped beneath the deposited film. For example, we found that 2–3 h of purging was necessary for PES ultrafiltration membranes that were statically exposed to TMA at room temperature. Shorter purge times resulted in smoking or burning of the samples upon contact with air due to the rapid, exothermic reaction of ambient moisture with absorbed TMA (Fig. 2). In addition to ruining the polymer specimen, this phenomenon poses safety hazards. The amount of TMA remaining in the PES samples upon exposure to the atmosphere correlated with the degree of smoking. 

If extended purges are necessary, how much time is required? To quantitatively address this question, we utilized a reactiondiffusion model. A comprehensive model for porous polymers would account for vapor precursor diffusion throughout the pores as well as absorbed precursor diffusion within the polymer. So far, many models have been developed for porous, nonabsorbing systems as well as for nonporous, absorbing systems.<sup>33</sup> Here, we use the latter type of model, developed by Ren et al., to calculate the purge times required for porous, absorbing systems.<sup>25</sup> This model provides a conservative estimate as diffusion through the bulk polymer is slower than diffusion through pores. The development of a new model that combines the effects of a porous, absorbing system would be useful but is outside the scope of this work. 

The Ren–McGuinness model calculates the spatiotemporal distributions of reacted and unreacted precursors within an absorbing, one-dimensional film for a single given dose and subsequent purge. It simulates VPI in a nonporous polymer substrate but serves to estimate the time scale for porous polymeric substrates undergoing ALD. The nondimensionalized parameters in the 



FIG. 2. PES membrane sample subjected to Al2O3 plasma-enhanced ALD was destroyed upon exposure to atmosphere. Due to insufficient purging, unreacted TMA was trapped under the growing Al2O3 film. When the sample was removed from the vacuum chamber and the backside was exposed to air, the sample caught fire due to the rapid, exothermic reaction of TMA with atmospheric moisture. 

model are defined in Eqs. (1)–(4) and allow for generalized results that may be applied to any precursor-substrate system for which the basic parameters are known. These parameters include sample thickness (l), initial diffusivity (D0), rate of reaction (k), dose concentration (CS), substrate functional group density (Cpolymer<sup>0),and</sup> hindering constant (K<sup>0</sup> ). The hindering constant is an empirical value that describes the reduction in diffusivity due to the reaction of the precursor with functional groups within the bulk of the film.<sup>25</sup> 









The Damköhler number (Da) represents the ratio between rates of diffusion within the polymer and precursor-polymer reaction. Low Da indicates a reaction-limited system, whereas high Da indicates diffusion-limited conditions. Da may be controlled by changing the sample thickness, the precursor, or the polymer. כ (Hebrew letter “kaf”) is the ratio between the dose concentration and the substrate functional group density and may be controlled by the dose pressure.(ר Hebrew letter “resh”) represents the degree to which precursors reduce the diffusivity upon reaction. Time (t, s) is also nondimensionalized as τ, thefi fi fi ffi square of the ratio between characteristic diffusion length ðpD0tÞ and sample thickness (l).<sup>34</sup> The value of τ is typically 1–2 orders of magnitude smaller than time in seconds, depending on diffusivity and sample thickness. To contextualize these nondimensional numbers, parameters for a poly(methyl methacrylate) (PMMA) film exposed to TMA are shown in Table II based on data from Ref. 25. 

The necessary purge times for any given polymer-ALD system are shown in Fig. 3, based on an ∼1 s dose (τdose ¼ 0:01) of precursor and varied Da,,כ and ר values. This purge time (τpurge) was defined as the point at which the concentration of unreacted precursor was ≤0.1% of the dose concentration (CS). Results for 

TABLE II. Example parameters for a VPI system of TMA and PMMA. 

|Input param|eters|Nondi<br>para|mensional<br>meters|
|---|---|---|---|
|D0 (cm<sup>2</sup>/s)|1.65 × 10<sup>−10</sup>|Da|0.086|
|l (nm)|500|ר|6.5|
|Dose pressure (Torr)|8.7|כ|0.78|
|CS (mol/cm<sup>3</sup>)|4.436 × 10<sup>−3</sup>|τ|1.9|
|C<sup>0</sup><br>polymer <sup>(mol/cm3)</sup><br>|5.656 × 10<sup>−3</sup>|||
|K<sup>0 </sup>(cm<sup>3</sup>/mol)|1150|||
|k (cm<sup>3</sup>/mol s)|1|||
|t (s)|29|||



J. Vac. Sci. Technol. A 43(2) Mar/Apr 2025; doi: 10.1116/6.0004187 © Author(s) 2025 

43, 022402-4 

ARTICLE 

pubs.aip.org/avs/jva 



FIG. 3. Amount of time required to purge an absorbing substrate after an initial ∼1 s ALD precursor dose (τdose = 0.01). “Purge Time (τpurge)” is defined as the τ value (dimensionless time parameter, τ ¼ D0 � t � l<sup>�2</sup> ) for which the concentration of unreacted, absorbed precursors is 0.1% of the dose concentration. 

additional values of כ and ר are shown in Fig. S1 in the supplementary material. 

On the left side of Fig. 3, the systems have low Da values (reaction-limited) and converge to a purge time of τpurge ¼ 1:2. Convergence occurs because these systems display near-Fickian behavior: transport is determined by concentration gradients with negligible precursor depletion or hindrance from reaction. As Da increases, the extent of reaction increases, resulting in two general profiles: (1) a gradual decrease of τpurge or (2) a sharp increase of τpurge at a specific Da value. Systems in the first category are characterized by< כ 1 (few precursors per reactive group) or< ר 2.8 (low hindrance) for τdose � 0:01. Here, τpurge is lower than the near-Fickian systems due to precursor consumption, with little impact on the desorption of unreacted precursors. Systems in the latter category absorb more precursor per reactive group and have higher hindrance factors. We observed that each profile generally follows the first category until Da · τdose()כ*ר<sup>1.5</sup> reaches a value of ∼10, above which τpurge increases sharply. Above this value, reactions between the precursor and functional groups within the substrate create a significant diffusion barrier and entrap the absorbed, unreacted precursors. This pattern is demonstrated in Fig. S2 in the supplementary material for more values of כ and ר and τdose. In certain cases, such as =10כ and =5ר, τpurge decreases as Da increases after reaching a maximum value. This decrease is due to the increasing rate of reactions, which progressively hinders the absorption of additional unreacted precursors. The model predicts that for the TMA-PMMA system described in Table II, a 29 s purge is needed after a 1 s dose—a reasonable estimate based on prior QCM studies.<sup>22</sup> 



FIG. 4. (a) PC track-etched membrane as-received. (b) Brittle, fractured PC track-etched membrane after 50 ALD cycles of TMA and H2O in the viscous flow reactor. (c) Stress–strain response of PVDF hollow fiber membranes as received and after 100 cycles of TiCl4 and H2O. 

Because polymers may experience outgassing in hightemperature, low-pressure environments, it is recommended to perform a purge step before the first ALD dose.<sup>35</sup> The extent of outgassing depends on many factors including the polymer chemistry, its porosity, and how it was processed. While outgassing typically follows Fickian diffusion behavior, the actual time required to outgas will often exceed the purge time for low Da ALD (the left side of Fig. 2) because concentrations of absorbed volatiles are likely to exceed the amount of precursor that is absorbed during the ALD dose. Outgassing data for an extensive list of materials have been compiled by NASA and may be an excellent resource for anticipating the processing needs of a given porous polymer substrate.<sup>36</sup> 

To overcome the issues involved with purging, we make the following suggestions: 

- Dilute the precursor dose with a carrier gas [decrease Cs to reduce כ per Eq. (2) and use shorter dose times (reduce τdose)]; 

- Use thin samples [decrease l to reduce t per Eq. (4)]; 

J. Vac. Sci. Technol. A 43(2) Mar/Apr 2025; doi: 10.1116/6.0004187 © Author(s) 2025 

43, 022402-5 

ARTICLE 

pubs.aip.org/avs/jva 

- Monitor precursor concentrations within the reactor to determine proper purge times; 

- Minimize the amount of absorbing materials in the ALD chamber [e.g., molecular layer deposition (MLD) films on the chamber walls]; 

- Select less reactive precursors (e.g., dimethylaluminum isopropoxide instead of TMA), which will reduce k and Da per Eq. (1);<sup>32</sup> 

- Use elevated temperatures to accelerate precursor desorption [increase D0 to reduce t per Eq. (4)];<sup>37</sup> 

- Ensure that samples are thoroughly dried to prevent uncontrolled reactions with absorbed and adsorbed water.<sup>38</sup> 

#### B. Lesson 2: Precursor infiltration may embrittle samples 

In addition to surface film growth via ALD, polymeric substrates often experience subsurface deposition by VPI. This process often leads to undesirable embrittlement and fracture of samples. During VPI, precursors are absorbed, then react with, or form reversible adducts with functional groups within the bulk polymer.<sup>39</sup> Upon subsequent precursor exposures, the polymer may become crosslinked and densified due to inorganic material growth within the free volume.<sup>40</sup> The growth of inorganic material within the bulk polymer can lead to embrittlement of the samples. 

We experienced sample embrittlement when performing ALD of various metal oxides on PC track-etched membranes in a viscous flow reactor. Figures 4(a) and 4(b) show a porous PC membrane prior to and after 50 ALD cycles of 1 s exposures to TMA and water.<sup>28</sup> The coated sample became brittle and was too fragile to handle or utilize. We minimized the extent of VPI and produced more robust samples by reducing the precursor exposure times to 0.2 s. Short exposures minimized absorption and diffusion into the PC while still enabling ALD on the inner surfaces of the PC pores. However, the effectiveness of reducing exposure time has a limit: high aspect ratio pores require a minimum exposure time to achieve conformal ALD, and this minimum dose time might exceed the threshold where VPI becomes problematic.<sup>30</sup> Therefore, for applications in which ALD within the pores is desirable, it may be helpful to select precursors that are less likely to cause VPI. Large precursors often have low diffusion rates within the polymers, limiting VPI. For example, unlike TMA (144.2 g/mol), we found that samples modified with TDMASn (295.0 g/mol) and Ga2(NMe2)6 (403.9 g/mol) did not fracture due to embrittlement upon handling, even using longer exposure times of up to 1 and 10 s, respectively. 

VPI embrittlement occurs in many polymer-precursor systems. We have observed embrittlement of track-etched PC using APTES/H2O and InCp/H2O/O2 as well as PES using TMA/oxygen plasma. To further understand the effect of embrittlement, tensile tests were performed on PVDF hollow fiber membranes before and after 200 ALD cycles of TiCl4 and H2O at 100 °C [Fig. 4(c)]. While the as-received membrane could be strained over 237% ± 12% of its original length before fracturing, the modified membranes fractured at only 61% ± 13% elongation. Note for PEALD, both degradation due to plasma exposure and VPI embrittlement can contribute to the reduced mechanical properties as plasma exposure can cause oxidation and etching of the polymer surface.<sup>41</sup> The compromise of material integrity via VPI has been observed for other polymers 

including infiltrated nylon 6, PP, PET, polyurethane P55D, PIM-1, and poly(butylene succinate).<sup>42–45</sup> It is worth noting that the effects of VPI on material strength are dependent on specific polymerprecursor interactions and certain materials have had the opposite result. For instance, the fracture toughness increased for photoresist SU-8, spider silk, and collagen membranes following VPI.<sup>46–48</sup> Another notable exception is PMMA, which was shown to embrittle after five AlOx VPI cycles, yet became exceptionally ductile following a single VPI cycle.<sup>40</sup> 

If VPI commonly leads to sample embrittlement, what conditions will minimize VPI? To answer this question, we again employed the Ren–McGuinness model to calculate the extent of reaction between bulk polymer functional groups and absorbed precursors.<sup>25</sup> In Fig. 5, we modeled an ∼1 s dose (τdose = 0.01) and ∼120 s purge (τ = 1.2) and reported the extent of VPI, defined as the ratio of reacted functional groups to total accessible functional groups within the polymer substrate. At the left of the figure, the extent of VPI is near zero for all system parameters. Like Fig. 3, the low Da values represent reaction-limited systems in which precursor desorption outpaces reaction with functional groups [Eq. (1)]. As Da increases in Fig. 5, the extent of VPI is greatly influenced by.כ Systems with large כ values [Eq. (2)] have a greater extent of reaction due to the amount of precursor which is absorbed during the dose. Whereas for a low כ value of 0.1, there is a much less precursor available for reaction, and the low concentration gradient precludes diffusion beyond the near-surface of the substrate. Therefore, the extent of VPI is close to zero, even at high Da values. 



FIG. 5. Modeled results of VPI for τdose = 0.01 (∼1 s) and a purge of τ = 1.2 (∼120 s) with varied Da,,כ and ר parameters. The extent of VPI is defined as the ratio of reacted functional groups to total functional groups within the polymer substrate. 

J. Vac. Sci. Technol. A 43(2) Mar/Apr 2025; doi: 10.1116/6.0004187 © Author(s) 2025 

43, 022402-6 

ARTICLE 

pubs.aip.org/avs/jva 

The extent of VPI reaches a maximum at intermediate Da values due to the interplay between the reaction and the transport resistance caused by the reaction. We observe that these maxima occur when Da · ר ·כ · τdose is ∼4, evidenced in Fig. S3 in the supplementary material. As each system approaches a maximum from the left, the extent of VPI increases because the relative rate of reaction increases. To the right of the maximum, the rapid formation of reaction products hinders the mobility of unreacted precursor and decreases the extent of VPI. Systems with higher ר values [Eq. (3)] create greater hindrance upon reaction, and thus reach a maximum at lower Da values. Note that because these maxima exist, it is insufficient to evaluate a VPI system solely on whether it is more reaction-limited or diffusion-limited. In some cases, a greater extent of VPI occurs with larger Da, but in other cases the extent is less. The extent of VPI continues to increase for longer purges (τ > 1.2) than modeled in Fig. 5 for systems with= כ 10 (Fig. S4 in the supplementary material). This is due to persistent unreacted precursor absorbed in the substrate at τ = 1.2, as seen in Fig. 3. 

This model is in good agreement with our experimental amendments of reducing precursor exposure times (lower τdose) or changing precursors [altering Da and ר via differing rates of reaction, diffusivities, and hindering constants per Eqs. (1) and (3)]. The model produces quantitative insights into the reactiondiffusion effects of the initial precursor dose and is heuristic for conceptualizing subsequent precursor exposures. Further development of the model is required to quantitatively evaluate multiple ALD/VPI cycles. Such an extension would be useful for evaluating the contributions of ALD vs VPI in a given precursor-polymer system. 

We make the following suggestions to overcome the challenge of VPI embrittlement: 

- Decrease precursor dose by diluting with a carrier gas [decrease Cs to reduce כ per Eq. (2)] and using shorter dose times (decrease τdose); 

- Utilize alternative precursors and material chemistries that are less susceptible to VPI [e.g., Ga2(NMe2)6 in place of TMA]; 

- Utilize ALD or MLD chemistries that produce flexible materials rather than brittle materials; 

- Prior to film growth, nucleate and seal the sample surface with an ALD layer of chemistry that is not susceptible to VPI. 

In many precursor-substrate systems, the opposite problem occurs: reaction rates are slow, and nucleation is difficult. Such cases have low Da values and, as Fig. 5 shows, yield a low extent of reaction for all כ and ר values. In these systems, ALD may not take place except when using extremely long dose times. Extended dose times of such a reaction-limited (low Da) system, however, may cause VPI throughout the substrate thickness.<sup>25</sup> Since adjustment of process parameters cannot provide a remedy, ALD film nucleation should be accomplished by other approaches such as 

- Oxidize the substrate surface (e.g., via air plasma or nitric acid) to create reactive surface functional groups;<sup>49–52,74</sup> 

- Activate the surface with a solution-based coating such as tannic acid or polydopamine;<sup>53,54</sup> 

- Prior to depositing the desired material, activate the surface with a more reactive precursor such as APTES or TMA.<sup>28</sup> 

#### C. Lesson 3: Brittle films are prone to fracture on flexible substrates 

Film fracture is common with samples that have a mismatch in critical strain between the film and the substrate. Flexible substrates with oxide films are particularly vulnerable to cracking— this presents challenges in the development of composite systems such as flexible electronic devices and filtration membranes. Examples of film fracture are shown in the SEM images of Fig. 6. Figure 6(a) shows fractures of a 70-cycle PEALD Al2O3 film grown on PES that formed under the compression of an O-ring seal. Another Al2O3-PES sample is shown in Fig. 6(b), where the brittle PEALD film fractured as the sample was cut with scissors. 

Thermal expansion mismatch between the film and the substrate will produce stress on the ALD film when the sample changes temperature. The CTE values of metal oxide films are generally an order of magnitude smaller than those of polymers (Table III). Because of this large mismatch, even a moderate temperature change, such as cooling to room temperature after ALD, can lead to film fracture. We observed such compressive fracturing upon cooling TiO2 and Al2O3 films grown on polysulfone membranes at 100 °C [Figs. 6(c) and 6(d)]. 



FIG. 6. SEM micrographs show ALD film fractures atop polymeric membrane substrates. (a) Top view of sample shows compression fractures in the Al2O3 at the location of O-ring seal. (b) Cross sectional view shows fractures that formed while cutting with scissors. Both (a) and (b) samples were PES membrane substrates coated with Al2O3 using 70 cycles of TMA/oxygen plasma. (c) 50-cycle TiCl4/H2O and (d) 10-cycle TMA/H2O ALD films grown on PSF hollow fiber membranes in a static reactor fractured upon cooling due to thermal expansion mismatch. (a) and (b) Modified with permission from B. C. Welch, O. M. McIntee, A. B. Ode, B. B. McKenzie, A. R. Greenberg, V. M. Bright, and S. M. George, J. Vac. Sci. Technol. A 38(5), 052409 (2020). Copyright 2020 American Vacuum Society. (c) Modified with permission from J. Casetta, D. Gonzalez Ortiz, C. Pochat-Bohatier, M. Bechelany, and P. Miele, Sep. Purif. Technol. 312, 123377 (2023). Copyright 2023 Elsevier. 

J. Vac. Sci. Technol. A 43(2) Mar/Apr 2025; doi: 10.1116/6.0004187 © Author(s) 2025 

43, 022402-7 

ARTICLE 

pubs.aip.org/avs/jva 

TABLE III. CTE values for representative oxides and polymers. 

|Material|CTE<br>(×10<sup>−6 </sup>K<sup>−1</sup>)|Temperature<br>range (°C)|Reference|
|---|---|---|---|
|Al2O3 (amorphous<br>|4|25–500|55|
|ALD)||||
|HfO2 (monoclinic)|4–10|50–350|56|
|SiO2 (thermal<br>oxide)<br>|0.24|25|57|
|TiO2 (anatase)|8–12|25–300|58|
|ZnO (Ga-doped)|5|25–250|59|
|ZrO2 (monoclinic)|3–10|50–300|56|
|PC|68|−30 to 30|60|
|PES|49–55|−30 to 30|60|
|PET|65|−30 to 30|60|
|PMMA|50–90|−30 to 30|60|
|PP|81–100|−30 to 30|60|
|Polystyrene (PS)|50–85|−30 to 30|60|
|PSF|31|−30 to 30|60|
|PTFE|118–216|25–200|61|
|PVDF|70–142|−30 to 30|60|



The stress (σ) that an ALD film experiences due to thermal expansion mismatch can be expressed as follows:<sup>61</sup> 



E, υ, and CTEfilm are the elastic modulus, Poisson’s ratio, and coefficient of thermal expansion for the ALD film, respectively. CTEsubstrate is the coefficient of thermal expansion for the substrate across temperatures (T) ranging from T1 to T2. 

By utilizing critical strain measurements made by Jen et al., we estimated the maximum temperature difference that Al2O3 ALD films can endure before fracturing due to thermal stress (Fig. 7).<sup>61</sup> This model assumes constant CTE values and applies to ALD Al2O3 films of varying thickness with a Poisson ratio of 0.24, a CTEfilm of 4.2 × 10<sup>−6</sup> K<sup>−1</sup> , and a modulus of 180 GPa.<sup>61</sup> These results show that samples with higher CTEsubstrate and greater film thickness will experience film fracture at lower temperature drops. Figure 7 may be used as a guideline for determining the maximum film thickness and ALD chamber temperature that should be used for a given substrate. For example, when growing ALD Al2O3 on polysulfone (CTE ∼55 × 10<sup>−6</sup> K<sup>−1</sup> ) at 175 °C, films of 30 nm or thicker are susceptible to fracture upon cooling to room temperature of 20 °C (ΔTemperature = 155 K). This example is marked with a ★ in Fig. 7. Note that the model assumes that the substrate does not bend. However, thinner substrates may experience bending rather than film fracture due to the stress of thermal expansion mismatch (similar to a bimetallic strip). This phenomenon is discussed in Sec. III D. 

Film fracture can be mitigated or avoided with careful fabrication and sample handling. To avoid film fracturing, we suggest 



FIG. 7. Temperature drop at which ALD Al2O3 films will fracture due to a thermal expansion mismatch with substrates of varying coefficients of thermal expansion (CTEsubstrate), based on Eq. (5). Critical strain data were used from Ref. 61. This model assumes constant properties across the temperature range and a rigid substrate. ★ represents the critical stress temperature for a 30 nm Al2O3 film grown on polysulfone (CTEsubstrate ∼ 55 × 10<sup>−6</sup> K<sup>−1</sup> ). 

- Avoid sample bending; affix the sample to a rigid support such as glass or silicon; 

- If a compression seal is used on the sample (e.g., placing ALD-modified membranes in a membrane holder), use adhesive tape to create a rim around the sample and seal to the rim, rather than the sample itself; 

- Use ALD process temperatures close to room temperature and avoid subsequent temperature changes; 

- Grow thinner films; the critical strain of a film decreases with thicker films;<sup>61</sup> 

- Use a flexible thin film or nanolaminate structure that incorporates flexible layers;<sup>62–64</sup> 

- Utilize substrate and film materials with CTEs that are close in value (e.g., all-organic MLD on polymeric substrates). 

#### D. Lesson 4: Film stress deforms flexible substrates 

The shape and geometry of porous polymeric samples often change during ALD. These dimensional changes arise from forces introduced in the ALD process and can render the sample unusable. Samples may bend, crumple, and shrink due to intrinsic film stress, thermal expansion mismatch, and VPI. 

Intrinsic film stress is common in thin films, and oxide films are known to generally experience compressive stress.<sup>65</sup> Compressive film stress leads to convex bending (the ALD film on 

J. Vac. Sci. Technol. A 43(2) Mar/Apr 2025; doi: 10.1116/6.0004187 © Author(s) 2025 

43, 022402-8 

pubs.aip.org/avs/jva 



<!-- Start of picture text -->
ARTICLE<br><!-- End of picture text -->

the outside of the bend). As an example, Fig. 8(a) shows an as-received PES ultrafiltration membrane with a modest concave curl that matched the roll from which it was cut. The sample in Fig. 8(e), with a significant convex curl, was PES coated with an ∼16 nm Al2O3 top film by PEALD at room temperature. In addition to intrinsic film stress, stress may arise from thermal expansion mismatch between the substrate and the film, as discussed in Sec. III C. For this reason, bending is expected for samples with a top film that have undergone a temperature change. If the 



FIG. 8. Various polymeric membranes before and after ALD. (a) PES membrane sheet as-received and (e) after deposition of an ∼16 nm Al2O3 film by TMA and oxygen plasma. (b)–(d) PC membrane sheets and PVDF hollow fiber membranes as-received and (f)–(h) after 200 ALD cycles of TiCl4 and water in the static reactor. (d) and (h) Light microscopy images of sample cross sections. Scale bars in (e)–(h) also correspond to the respective images to their left (a)–(d). 

polymeric substrate has a greater CTE than the ALD top film, convex bending will occur during cooling while concave bending will occur upon heating. The greater the difference in CTE, the greater the degree of bending. The amount of bending will depend on the flexibility and thickness of the substrate. The use of rigid substrates may help prevent undesirable deformation but will increase the film stress. Similarly, flattening curled samples may stress a film to the point of fracture. Of course, some polymeric materials experience deformation under thermal treatment even without ALD, which necessitates testing prior to attempted film growth. 

Sample deformation may be more complex for samples with ALD films along their pore walls or for samples affected by VPI. For example, we performed 200 cycles of TiCl4/H2O on PC membrane sheets and PVDF hollow fiber membranes at 100 °C as shown in Figs. 8(b) and 8(c). After ALD, the PC membrane was crumpled and shrank by 8% [Fig. 8(f)]. For the PVDF hollow fibers, the overall length decreased by 20%, the outer diameter shrank by 32%, and the wall thickness was reduced by 37% [Figs. 8(g) and 8(h)]. In these cases, pore wall deposition occurred and VPI was evidenced by mechanical tests [see Fig. 4(c)]. The observed deformations are probably a convolution of intrinsic stress, thermal expansion, and VPI. It is clear, however, that these dimensional changes are material dependent, as we observed no deformation for polysulfone hollow fibers under the same ALD conditions.<sup>27</sup> Some polymeric materials deform when heated even without ALD, which necessitates testing prior to attempted film growth. The PES, PC, and PVDF control samples in Fig. 8 did not deform as a result of temperature and vacuum exposure only. To avoid sample deformation, we make the following suggestions: - Load the substrate with a curve that will counteract the stresses of the ALD film (e.g., load with an inward curve if ALD produces an outward curve); - Perform ALD on substrates that are already affixed in their final 

- Perform ALD on substrates that are already affixed in their final state to avoid manual flattening (e.g., hollow fibers preinstalled in their module); 

- Implement the suggestions of Lesson 3 to minimize VPI; 

- Implement the suggestions of Lesson 4 to reduce film stress. 

#### E. Lesson 5: Pore structures may collapse in vacuum 

When porous polymers are removed from a liquid environment, the pores may collapse due to high capillary forces exerted on the pore walls during drying.<sup>66</sup> Manufacturers of porous membranes typically apply a pore-filling agent such as glycerol before storing or transporting their product.<sup>66</sup> This practice prevents membrane drying and pore collapse. This presents a challenge for applying ALD, which typically requires elevated temperature and vacuum pressures—an environment that facilitates the vaporization of water and even glycerol. For instance, we removed glycerol via evaporation from PSF hollow fiber membranes by placing the samples in vacuum (∼10<sup>−2</sup> mbar) at 100 °C for 40 min.<sup>27</sup> Cross sectional micrographs showed evidence of pore collapse [bright regions in Fig. 9(b)] compared to an as-received sample [Fig. 9(a)]. We observed a greater degree of pore collapse when the glycerol was rinsed away with water followed by 10 ALD TiO2 cycles in the 

J. Vac. Sci. Technol. A 43(2) Mar/Apr 2025; doi: 10.1116/6.0004187 © Author(s) 2025 

43, 022402-9 

ARTICLE 

pubs.aip.org/avs/jva 



FIG. 9. SEM cross sectional images of PSF hollow fiber membranes (a) as-received, (b) after 40 min in the vacuum chamber at 100 °C, (c) after being rinsed, dried, and modified with 10 ALD cycles of TiCl4 and water at 100 °C, and (d) unrinsed and modified with 10 ALD cycles of TiCl4 and water after 15 min in the vacuum chamber at 100 °C. 

TABLE IV. Water permeability values of PSF hollow fiber membranes before and after ALD. Data from Ref. 27. 

|Sample|Residence<br>time prior to<br>ALD (min)|ALD process<br>time (min)|Permeability<br>(L/h m<sup>2 </sup>bar)|
|---|---|---|---|
|As-received|n/a|—|135 ± 14|
|Vacuum + 100 °C|40|—|5 ± 1|
|ALD without glycerol|15|25|4 ± 1|
|ALD with glycerol|15|25|170 ± 17|



static reactor [Fig. 9(c)]. Pore collapse is further evidenced in Table IV by the reduced water permeability compared to as-received samples. 

The timing of the sample residence time was key for successful deposition on glycerol-filled substrates. At long exposure time, the evaporation of glycerol led to pore collapse [Fig. 9(b)]. But with a short residence time, glycerol was largely removed without compromising the pore structure [Fig. 9(d)]. Any remaining glycerol residue would have reacted with initial doses of TiCl4 and H2O to form titanium alkoxide and titanium hydroxide beneath the TiO2 ALD layer.<sup>67,68</sup> This strategy produced membranes with improved permeability as well as fouling resistance compared to unmodified membranes.<sup>27</sup> 

Pore-filling agents such as glycerol pose a challenge for ALD because they contain reactive hydroxyls. This risks the unintended consequence of reactions between the precursors and a reservoir of condensed pore-filling liquid, which was demonstrated by Sengupta et al. using ethylene glycol.<sup>69</sup> Glycerol, in particular, has been used as a precursor for inorganic-organic hybrid MLD along with TMA, TiCl4, and diethyl zinc.<sup>67,70,71</sup> Addressing pore collapse is an ongoing challenge for researchers. Many have opted to use porous ceramic supports, thereby circumventing the challenges involved with porous polymeric supports including pore collapse. Brittle, costly, and difficult to scale, ceramic substrates are often used for proof-of-concept work or niche applications. For most applications, polymeric membranes remain the most scalable, economic platform for ALD research. 

The following suggestions may help to avoid pore collapse in porous polymer substrates: 

- Condition the porous substrate with low-vapor pressure liquids to preserve the pore structure (e.g., ionic liquids); 

- Prevent the drying of pore-filling agents by performing ALD at low temperatures and/or atmospheric pressures; 

- Avoid materials that rely on a filling material to maintain their pore structure; 

- Consider film growth techniques that do not require vacuum such as the solution-based molecular-layer-by-layer technique, also called solution ALD.<sup>72,73</sup> 

#### IV. SUMMARY AND CONCLUSIONS 

In this study, modeling, mechanical testing, and observations were used to describe, understand, and overcome five common 

J. Vac. Sci. Technol. A 43(2) Mar/Apr 2025; doi: 10.1116/6.0004187 © Author(s) 2025 

43, 022402-10 

ARTICLE 

pubs.aip.org/avs/jva 

challenges experienced when growing ALD films on porous polymer substrates. Porous polymers required extended purge times to adequately clear away precursors. Results from the Ren– McGuinness reaction-diffusion model showed that in systems with low dose concentrations (< כ 1) or hindrance factors (< ר 2.8), sufficient purging can be accomplished within minutes (τ ≤ 1.2). When Da · τdose()כ*ר<sup>1.5</sup> exceeds ∼10, unreacted precursors become entrapped, requiring excessive purge times (hours to days). In addition, porous polymer samples became embrittled during ALD due to subsurface inorganic material deposition from VPI. The extent of VPI reaches a maximum around Da ·· כ· ר τdose = ∼4. VPI could be avoided through use of alternative precursors such as TDMASn and Ga2(NMe2)6, which did not embrittle the PC track-etched membranes whereas TMA, APTES, and InCp did. 

Brittle ALD films were prone to fracture on flexible, porous substrates. In addition to fractures caused by handling and compression, we observed cracks in ALD films from mismatches in thermal expansion/contraction between the film and the substrate. The large differences in CTE led to significant compressive stress and fracture of Al2O3 and TiO2 films on PSF membranes upon moderate cooling. Film fracture could be avoided with lower ALD processing temperatures. We also discussed the susceptibility of polymeric membrane pores to collapse during ALD. The high-temperature, low-pressure conditions of ALD processing led to the evaporation of glycerol from the pores of PSF hollow fiber membranes. The resultant samples had compromised pore structures and significantly reduced water permeances. ALD was successfully performed by using low temperatures and minimal dwell time in the reactor. The lessons learned through negative and positive results presented in this paper serve to accelerate future research and guide researchers who aim to enhance porous polymers using vapor phase reactants. 

#### SUPPLEMENTARY MATERIAL 

See the supplementary material for reaction-diffusion model results for extended ranges of ר ,כ, τdose, and purge time. 

#### ACKNOWLEDGMENTS 

This work was partly supported by the Israel−U.S. Collaborative Water-Energy Research Center (CoWERC) via the Binational Industrial Research and Development Foundation (BIRD) Energy Center, Grant No. EC-15 and by the Israeli Ministry of Energy and Water, Grant No. 222-11-088. Work at Argonne was also supported by the Laboratory Directed Research and Development (LDRD) program. Some studies from this paper are part of INNOMEM and received funding from the European Union’s Horizon 2020 Research and Innovation Program under Grant Agreement No. 862330. B.C.W. acknowledges support at the Technion by a Zuckerman Fellowship. The authors thank Polymem for providing the PSF and PVDF HF membranes, Christina Carbrello of MilliporeSigma for supplying PES samples, Steve George of the University of Colorado for use of the PEALD system, Dan Carter of Advanced Energy for providing the RF plasma system, Victoria Welch for graphic design, D. Cot and B. Rebiere for their contributions in conducting SEM observations, and Mark Losego and Yi Ren for their helpful discussions on the reactiondiffusion model. 

#### AUTHOR DECLARATIONS 

#### Conflict of Interest 

The authors have no conflicts to disclose. 

#### Author Contributions 

Brian C. Welch: Conceptualization (lead); Formal analysis (lead); Visualization (lead); Writing – original draft (lead). Jeanne Casetta: Investigation (equal); Writing – original draft (supporting). Rajesh Pathak: Investigation (equal); Writing – original draft (supporting). Jeffrey W. Elam: Resources (equal); Writing – review & editing (supporting). Céline Pochat-Bohatier: Resources (equal); Validation (equal). Philippe Miele: Resources (equal); Validation (equal). Tamar Segal-Peretz: Validation (equal); Writing – review & editing (lead). 

#### DATA AVAILABILITY 

The data that support the findings of this study are available from the corresponding author upon reasonable request. 

#### REFERENCES 

- 1M. Weber, A. Julbe, A. Ayral, P. Miele, and M. Bechelany, Chem. Mater. 30, 7368 (2018). 

- 2S. Xiong, X. Qian, Z. Zhong, and Y. Wang, J. Membr. Sci. 658, 120740 (2022). 

- 3S. Xiong, X. Jia, K. Mi, and Y. Wang, J. Membr. Sci. 617, 118610 (2020). 4L. P. da Veiga, C. Jeanguenat, F. Lisco, H.-Y. Li, S. Nicolay, C. Ballif, A. Ingenito, and J. J. D. Leon, ACS Omega 7, 45582 (2022). 5J. Ahn, H. Park, T. Ryu, and J. Park, Sep. Purif. Technol. 309, 123012 (2023). 6J. Ahn, T. Ryu, and J. Park, J. Membr. Sci. 651, 120455 (2022). 7L. Keskiväli, P. Heikkilä, E. Kenttä, T. Virtanen, H. Rautkoski, A. Pasanen, M. Vähä-Nissi, and M. Putkonen, Coatings 11, 1028 (2021). 8R. Shevate, V. Rozyyev, R. Pathak, A. U. Mane, S. B. Darling, and J. W. Elam, ECS Meet. Abstr. MA2022-02, 1160 (2022). 9S.S. Hashemi Astaneh, H. Bhatia, B. E. Nagay, V. A. R. Barão, G. Jursich, 

- 9S.S. Hashemi Astaneh, H. Bhatia, B. E. Nagay, V. A. R. Barão, G. Jursich, C. Sukotjo, and C. G. Takoudis, Appl. Surf. Sci. 591, 153195 (2022). 10L. Zhang et al., Surf. Interfaces 30, 101826 (2022). 

- 11L. Zhang, X. Shi, M. Sun, C. J. Porter, X. Zhou, and M. Elimelech, ACS Appl. Mater. Interfaces 13, 9975 (2021). 

- 12T. Itzhak, N. Segev-Mark, A. Simon, V. Abetz, G. Z. Ramon, and T. Segal-Peretz, ACS Appl. Mater. Interfaces 13, 15591 (2021). 

- 13A. Simon, Z. Zhang, C. Abetz, V. Abetz, and T. Segal-Peretz, Nanoscale 15, 3219 (2023). 

- 14Z. Zhang, A. Simon, C. Abetz, M. Held, A.-L. Höhme, E. S. Schneider, T. Segal-Peretz, and V. Abetz, Adv. Mater. 33, 2105251 (2021). 15J. Rouquerol, D. Avnir, C. W. Fairbridge, D. H. Everett, J. M. Haynes, N. Pernicone, J. D. F. Ramsay, K. S. W. Sing, and K. K. Unger, Pure Appl. Chem. 66, 1739 (1994). 

- 16S. Vempati, K. S. Ranjith, F. Topuz, N. Biyikli, and T. Uyar, ACS Appl. Nano Mater. 3, 6186 (2020). 

- 17L. Hu, V. T. Bui, N. Esmaeili, and H. Lin, Carbon Capture Sci. Technol. 10, 100150 (2024). 

- 18S. M. George, Chem. Rev. 110, 111 (2010). 

- 19E. Kessels, see AtomicLimits.com for “ALD Database” (2024). 

- 20J. D. Ferguson, A. W. Weimer, and S. M. George, Chem. Mater. 16, 5602 (2004). 

- 21B. C. Welch, O. M. McIntee, A. B. Ode, B. B. McKenzie, A. R. Greenberg, V. M. Bright, and S. M. George, J. Vac. Sci. Technol. A 38, 052409 (2020). 

- 22C. A. Wilson, R. K. Grubbs, and S. M. George, Chem. Mater. 17, 5625 (2005). 

- 23C. Z. Leng and M. D. Losego, Mater. Horiz. 4, 747 (2017). 

24K. Gregorczyk and M. Knez, Prog. Mater. Sci. 75, 1 (2016). 

J. Vac. Sci. Technol. A 43(2) Mar/Apr 2025; doi: 10.1116/6.0004187 © Author(s) 2025 

43, 022402-11 

ARTICLE 

pubs.aip.org/avs/jva 

- 25Y. Ren, E. K. McGuinness, C. Huang, V. R. Joseph, R. P. Lively, and M. D. Losego, Chem. Mater. 33, 5210 (2021). 

- 26A. Subramanian, N. Tiwale, and C.-Y. Nam, JOM 71, 185 (2019). 

- 27J. Casetta, D. Gonzalez Ortiz, C. Pochat-Bohatier, M. Bechelany, and P. Miele, Sep. Purif. Technol. 312, 123377 (2023). 

- 28R. Pathak, V. Rozyyev, R. Shevate, A. U. Mane, and J. W. Elam, ACS Appl. Nano Mater. 6, 17869 (2023). 

- 29C. Huang et al., “Reaction-diffusion transport model,” computer code, Losego Lab, Atlanta, GA, 2023; available at https://github.com/Losego-Lab/ReactionDiffusion_Transport_Model. 

- 30J. W. Elam, D. Routkevitch, P. P. Mardilovich, and S. M. George, Chem. Mater. 15, 3507 (2003). 

- 31R. Z. Waldman, D. Choudhury, D. J. Mandia, J. W. Elam, P. F. Nealey, 

- A. B. F. Martinson, and S. B. Darling, JOM 71, 212 (2019). 

- 32H. Jain, M. Creatore, and P. Poodt, J. Vac. Sci. Technol. A 41, 012401 (2023). 

- 33V. Cremers, R. L. Puurunen, and J. Dendooven, Appl. Phys. Rev. 6, 021302 (2019). 

- 34S. A. Balogun, Y. Ren, R. P. Lively, and M. D. Losego, Phys. Chem. Chem. Phys. 25, 14064 (2023). 

- 35R. Pastore, A. Delfini, M. Albano, A. Vricella, M. Marchetti, F. Santoni, and F. Piergentili, Acta Astronaut. 170, 466 (2020). 

- 36N. A. Walter and J. J. Scialdone, Outgassing Data for Selecting Spacecraft Materials (National Aeronautics and Space Administration, Goddard Space Flight Center, Greenbelt, MD, 1997). 

- 37H. Jain and P. Poodt, Dalton Trans. 50, 5807 (2021). 

- 38I. Weisbord, M. Barzilay, R. Cai, E. Welter, A. Kuzmin, A. Anspoks, and 

- T. Segal-Peretz, ACS Nano 18, 18393 (2024). 

- 39M. Biswas, J. A. Libera, S. B. Darling, and J. W. Elam, Chem. Mater. 26, 6135 (2014). 

- 40S. Keren, C. Bukowski, M. Barzilay, M. Kim, M. Stolov, A. J. Crosby, N. Cohen, and T. Segal-Peretz, ACS Appl. Mater. Interfaces 15, 47487 (2023). 

- 41D. Cheneler and J. Bowen, Soft. Matter 9, 344 (2013). 

- 42A. Motta et al., ACS Appl. Polym. Mater. 4, 7191 (2022). 

- 43E. K. McGuinness, F. Zhang, Y. Ma, R. P. Lively, and M. D. Losego, Chem. Mater. 31, 5509 (2019). 

- 44C. D. McClure, C. J. Oldham, and G. N. Parsons, Surf. Coat. Technol. 261, 411 (2015). 

- 45R. P. Padbury and J. S. Jur, J. Vac. Sci. Technol. A 33, 01A (2014). 

- 46K. J. Dusoe, X. Ye, K. Kisslinger, A. Stein, S.-W. Lee, and C.-Y. Nam, Nano Lett. 17, 7416 (2017). 

- 47S.-M. Lee, E. Pippel, U. Gösele, C. Dresbach, Y. Qin, C. V. Chandran, T. Bräuniger, G. Hause, and M. Knez, Science 324, 488 (2009). 

- 48S.-M. Lee, E. Pippel, O. Moutanabbir, I. Gunkel, T. Thurn-Albrecht, and M. Knez, ACS Appl. Mater. Interfaces 2, 2436 (2010). 

- 49Q. Xu, J. Yang, J. Dai, Y. Yang, X. Chen, and Y. Wang, J. Membr. Sci. 448, 215 (2013). 

- 50H. Chen, L. Kong, and Y. Wang, J. Membr. Sci. 487, 109 (2015). 

- 51Q. Xu, Y. Yang, J. Yang, X. Wang, Z. Wang, and Y. Wang, J. Membr. Sci. 443, 62 (2013). 

- 52H. Chen, Q. Lin, Q. Xu, Y. Yang, Z. Shao, and Y. Wang, J. Membr. Sci. 458, 217 (2014). 

- 53X. Yang, P. Sun, H. Zhang, Z. Xia, R. Z. Waldman, A. U. Mane, J. W. Elam, 

- L. Shao, and S. B. Darling, Adv. Funct. Mater. 30, 1910062 (2020). 

- 54A. DeStefano, J. Yin, T. J. Kraus, B. A. Parkinson, and K. D. Li-Oakey, ACS Omega 3, 10493 (2018). 

- 55O. M. E. Ylivaara et al., J. Vac. Sci. Technol. A 40, 062414 (2022). 

- 56R. P. Haggerty, P. Sarin, Z. D. Apostolov, P. E. Driemeyer, and W. M. Kriven, 

J. Am. Ceram. Soc. 97, 2213 (2014). 

- 57C. Tsou, Y. Huang, H. Li, and T. Lai, Sensors Mater. 17, 441 (2005). 

- 58D. R. Hummer, P. J. Heaney, and J. E. Post, Powder Diffr. 22, 352 (2007). 

- 59N. Yamamoto, H. Makino, and T. Yamamoto, Adv. Mater. Sci. Eng. 2011, 136127 (2011). 

- 60Modern Plastics Handbook, edited by C. A. Harper, 1st ed. (McGraw-Hill Education, New York, NY, 2000). 

- 61S.-H. Jen, J. A. Bertrand, and S. M. George, J. Appl. Phys. 109, 084305 (2011). 

- 62S.-H. Jen, S. M. George, R. S. McLean, and P. F. Carcia, ACS Appl. Mater. Interfaces 5, 1165 (2013). 

- 63J.-P. Niemelä, N. Rohbeck, J. Michler, and I. Utke, Dalton Trans. 49, 10832 (2020). 

- 64F. Wang, Z. Yang, and C. Y. Tang, ACS ES&T Eng. 2, 2023 (2022). 

- 65S. Tamulevičius, Vacuum 51, 127 (1998). 

- 66M. A. M. Beerlage, Polyimide Ultrafiltration Membranes for Non-Aqueous Systems (University of Twente, Enschede, The Netherlands, 1994), p. 211. 67A. I. Abdulagatov, R. A. Hall, J. L. Sutherland, B. H. Lee, A. S. Cavanagh, and S. M. George, Chem. Mater. 24, 2854 (2012). 68H.H. Kim, J. Hyun, G. Kim, E. Lee, and Y.-S. Min, Chem. Mater. 36,, 247 (2024). 69B. Sengupta et al., Science 381, 1098 (2023). 70S. M. George, B. H. Lee, B. Yoon, A. I. Abdulagatov, and R. A. Hall, J. Nanosci. Nanotechnol. 11, 7948 (2011). 71J. J. Brown, R. A. Hall, P. E. Kladitis, S. M. George, and V. M. Bright, ACS Nano 7, 7812 (2013). 

- 68H.H. Kim, J. Hyun, G. Kim, E. Lee, and Y.-S. Min, Chem. Mater. 36,, 247 (2024). 

- 72Y. Wu, D. Döhler, M. Barr, E. Oks, M. Wolf, L. Santinacci, and J. Bachmann, Nano Lett. 15, 6379 (2015). 

- 73P. M. Johnson, J. Yoon, J. Y. Kelly, J. A. Howarter, and C. M. Stafford, J. Polym. Sci., Part B: Polym. Phys. 50, 168 (2012). 

> 74R. Shevate, V. Rozyyev, R. Pathak, A. U. Mane, K. Sankhala, F. Gao, T. SegalPeretz, S. B. Darling, and J. W. Elam, “Tailoring the interfacial interactions of porous polymer membranes to accelerate atomic layer deposition: The latent path to antifouling membranes,” Chem. Mater. 36, 3616 (2024). 

J. Vac. Sci. Technol. A 43(2) Mar/Apr 2025; doi: 10.1116/6.0004187 © Author(s) 2025 

43, 022402-12 

