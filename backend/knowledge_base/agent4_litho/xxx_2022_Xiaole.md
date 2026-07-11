# DOCUMENT: xxx_2022_Xiaole.pdf

# Cassette-like peeling system for testing the adhesion of soft-to-rigid assemblies 

Xiaole Li<sup>_∗_</sup> , Ran Tao, Yangyang Xin, Gilles Lubineau<sup>_∗∗_</sup> 

_Mechanics of Composites For Energy and Mobility Lab, Mechanical Engineering Program, Physical Science and Engineering Division, King Abdullah University of Science and Technology (KAUST), Thuwal 23955-6900, Kingdom of Saudi Arabia_ 

## **Abstract** 

A novel cassette-like peeling system is developed to address the limitations of current peeling standards when evaluating bonding quality of soft-to-rigid assemblies. The system transforms the translation of a specimen in the conventional peeling configuration to rotation via a cassette-like spool clamping the specimen. The peeled film is loaded by tension to drive the winding of the spool, thus achieving self-similar crack propagation and a stationary peeling front unrelated to the stiffness of the film. These features enable the system’s compatibility with most universal testers and in situ observation of crack tip morphology with optical instruments. Analysis to derive the intrinsic fracture energy when peeling a soft film is conducted based on Griffith energy balance, making use of which, a parametric study is performed to clarify the related mechanisms. We carry out a comprehensive validation of the cassette-like peeling system by performing a series of peeling tests using our in-house prototype and by comparing the results with those from the conventional system. Owing to its universality and ease-of-use, the proposed cassette-like peeling system can potentially be applied to the development of the next generation of peel test standards. 

_Keywords:_ Peel test, Adhesion, soft film bonding, Work of adhesion 

> _∗_ Xiaole Li 

> _∗∗_ Gilles Lubineau, Tel: +966-(0)12-808-2983 

> _Email addresses:_ `xiaole.li@kaust.edu.sa` (Xiaole Li), `gilles.lubineau@kaust.edu.sa` (Gilles Lubineau) 

_Preprint submitted to IJSS_ 

_May 24, 2022_ 

## 1 **1. Introduction** 

2 The peel test is a common approach to evaluate the adhesion of flexible-to-flexible 3 and flexible-to-rigid bonded assemblies, usually by using a dedicated frame mounted on 4 a tensile universal loading machine (Kinloch & Williams, 2002). To render a self-similar 5 fracture process zone, the peeling arm is generally loaded at a constant angle (i.e., the 6 peeling angle ). Different protocols have been established to guide the practice of peeling 7 tests. Representatives are ASTM D3167 for measuring the floating-roller peel resistance 8 of adhesives (ASTM, 2017), ASTM D1781 for measuring the climbing drum peeling 9 resistance (ASTM, 2012) and ASTM D6862 for measuring 90 ° peel resistance (ASTM, 10 2021). The ideal configuration for peeling tests assumes that the peeling arm has infinite 11 tensile stiffness and zero bending stiffness, which gives a test equivalent to peeling away a 12 material behaving as a piece of ’infinitely-rigid string’. Generally, peeling tests produce a 13 saturation of peel force during steady crack propagation. Under this condition, Kendall’s 14 formula (Kendall, 1975) can be used to determine fracture toughness. Classical peeling 15 frames include a driving wire directly linking the traveling head of the arm to the peeling 16 bed such that the peeling angle remains constant. However, this configuration assumes 17 infinite stiffness or limited extension of the delaminated coating. In practice, classical 18 peeling frames are unsuitable for evaluating the bond between a substrate and highly 19 stretchable coating that experiences considerable amount of extension when it tears. 20 The peel test has found its application in multiple disciplines such as electrochem21 istry coating (Karbhari & Engineer, 1996), biomimetic adhesives (Ponce et al., 2015), 22 battery electrodes (Huang et al., 2021), 2D materials (Zhang et al., 2017). However, 23 new industrial applications pose challenges to the applicability of peel test standards 24 for evaluating interfacial toughness. Note that in the fields of flexible electronics (Liu 25 et al., 2020b; Gao et al., 2019) and bio-mechanics (Labonte & Federle, 2016; Zhang 26 et al., 2021), the soft adherend film (e.g., elastomeric polymer) is highly stretchable. 27 The conventional configuration for the peel test produces a continuously changing peel28 ing angle during crack propagation owing to the elongation of the flexible peeling arm. 29 This may induce an inconsistent crack process that can lead to measurement errors. Yuk 

2 

30 et al. (2016a,b), Takahashi et al. (2018) and Liu et al. (2020a) performed 90<sup>_◦_</sup> peel test 31 to measure the interfacial toughness between a hydrogel and solid substrate. To avoid 32 the abovementioned issues, they introduced a stiff backing to prevent the elongation of 33 the hydrogel sheet along the peeling direction. Although such reinforcement can be an 34 effective solution, the change in stiffness of the adherend may alter the delamination 35 behavior of the specimen. Ponce et al. (2015) used a peel test with a lap-shear configu36 ration (i.e., peeling force applied in the direction of the tape) to identify the important 37 role of friction during the peeling process, which demonstrated another limitation of 38 conventional peeling configurations for dealing with the real response of flexible-to-rigid 39 systems. 

40 New optical measurement techniques such as scanning electron microscopy can effi41 ciently probe the fracture process at the microscale. Using environment scanning elec42 tron microscope (ESEM), Neggers et al. (2015a,b) performed an in situ micromechanical 43 analysis on the delamination of thermoplastic urethane–copper and PDMS–Copper in44 terfaces to explore the mechanisms of the fibrillar microstructure, which is important to a 45 high fracture toughness at these interfaces. The same group examined the delamination 46 behavior of metal–polymer interfaces in stretchable electronic interconnects through in 47 situ microscale experiments and achieved piezoelectric force sensing (Kleinendorst et al., 48 2020). Nase et al. (2016) observed the formation of similar fibrils with (Neggers et al., 49 2015b) and identified the cohesive zone of bonded self-adhesive polymeric films by using 50 ESEM. The abovementioned studies highlight the potential and viability of in situ opti51 cal–mechanical experimental techniques to understand the mechanisms that improve the 52 adhesion performance at the microscale. For the application of these optical instruments 53 to the peel test, a stationary crack front is required for high-resolution measurement of 54 the crack propagation. 

55 Certain efforts have been made toward evolving peel test methods. Ca˜nas et al. 56 (2018) developed a horizontal drum peel system that determines the interfacial toughness 57 using a torque cell to measure the torsional moment. This is suitable for in situ testing 58 of an aircraft production line and does not require extracting coupons for a laboratory 

3 

59 test. Daghia et al. (2018) evaluated a double drum peel (DDP) concept for testing the 60 delamination behavior of cylindrical laminates, which is related to the peel tests used 61 for adhesives or thin films. The system primarily consists of two drums, i.e. the motion 62 drum and the specimen drum. A couple load is applied on the motion drum which 63 drives the rotation of the other drum of clamping the specimen by pulling on the peel 64 arm and such that propagating the delamination. The specimen is pulled by the peeling 65 arm, which propagates delamination. To ensure a controlled peeling angle and fracture 66 mode, a reverse coupled load is applied to the specimen drum. However, the DDP 67 system requires sophisticated equipment, and the relatively complex loading system is 68 a bottleneck for its wider engineering application. 

69 Despite these efforts, an economical and easy-to-use system for testing the adhesion 70 between soft films and rigid substrates is missing. The present work aims at developing 71 a novel peel test system that facilitates the testing of peeling a highly stretchable film. 72 Similar to the conventional approach, a tensile load is used to drive the crack propagation 73 to ensure compatibility with a universal tester. Inspired by the DDP, the specimen is 74 pie-shaped for a cassette-like peeling process. The remainder of this study is organized 75 as follows. Sect.2 describes the concept of cassette-like peeling as well as the design 76 of a prototype. Sect.3 presents a derivation based on the Griffith theory of fracture to 77 provide an analytical model of the fracture energy for the peeling of a stretchable film. 78 Sect.4 validates the developed system by performing a series of peeling tests using both 79 the conventional peeling system and the cassette-like peeling system. Sect.5 summarizes 80 the results and presents some insights to conclude the study. 

81 **2. Cassette-like peeling system** 

82 

## _2.1. Concept_ 

The principle of designing a peel test system is to achieve a constant peeling angle and a self-similar peeling front during crack propagation. To ensure compatibility with universal testers, a vertical tensile load should be the driving force for delamination. Direct visualization and a stationary crack front are indispensable for in situ optical 

4 

observation. Considering all above requirements, here we propose a novel cassettelike peeling concept. Figure 1 compares our proposed system and the conventional peeling system. For the latter, the synchronized movement of the loading head along the vertical direction and specimen along the reverse direction of crack propagation is imposed through linkage by a rigid string. The translation of the specimen is equivalent to the vertical distance traveled by the loading point during the peeling process. When the material of the peeling arm is comparable in stiffness to the rigid string, the crack tip is directly below the loading point regardless of the peeling distance. However, the cassette-like peeling concept uses the self-adapting rotation of a spool to achieve an adaptable crack tip position. A spool with the radius _R_ is installed on a fixed axle, and the peeling load is applied on the arm of a film bonded onto the substrate that is clamped by the cassette spool. To maintain a self-similar peeling front, the following relation should be satisfied at any instant of the peeling process: 



where _δL_ is the delamination length and _δβ_ is the rotation angle of the spool. 



<!-- Start of picture text -->
Peeling force Peeling force<br>θ<br>δL<br>θ<br>δL δβ<br>(a) Conventional peeling configuration (b) Cassette-like peeling configuration<br><!-- End of picture text -->

Figure 1: Comparison between the conventional and proposed cassette-like peeling configurations. 

83 

5 

Because we expect a slow and constant peeling rate, the system should be in a quasi-static balance. Figure 2 shows an analysis of the forces and moments acting on the cassette-like peeling system. The peeling force is _P_ , therefore, the resultant of the reaction force applied on the axle of the spool is equivalent to _P_ in the opposite direction. To achieve a constant peeling angle _θ_ that is smaller than 90 ° , _P_ should not be loaded across the center of the spool. Therefore, a reverse torque is required to balance the moment _M_ because of the eccentric load _P_ : 



- 84 where _l_ is the distance between the loading line and the axle of the spool. Under this 

- 85 condition, the peeling arm stays vertical throughout the peeling process; therefore, _θ_ 86 remains constant as long as _M_ is set to a suitable value. 



<!-- Start of picture text -->
P<br>l<br>θ<br>M<br>-M<br>-P<br><!-- End of picture text -->

Figure 2: Static force and moment analysis of the cassette-like peeling system. 

- 87 The reverse torque load _M_ should be applied to the cassette spool to ensure the ver88 tical alignment of the peeled arm. Figure 3 presents two possible strategies for applying 89 the reverse load. The first strategy achieves the reverse torque by applying a constant 

- 90 tensile load on the edge of a coaxial winding spool with the specimen by either friction or 

6 

- 91 gravity. The second strategy is to apply a torque directly by installing a device such as 

- 92 a magnetic brake. The first strategy is obviously more economical; however, the second 93 strategy is more straightforward because the torque can be adjusted by changing the 94 setting of the brake. 



<!-- Start of picture text -->
p p<br>M<br>T<br>(a) strategy 1 (b) strategy 2<br><!-- End of picture text -->

Figure 3: Strategies to impose a reverse torque load 

- 95 The cassette-like peeling concept is similar to the DDP (Daghia et al., 2018). The 96 most significant difference is that we adopted a tensile load to drive the delamination, 97 while DDP uses the additional drum to impose a couple. For both systems, a test 98 with zero reverse torque corresponds to the peeling scenario in which _θ_ =90<sup>_◦_</sup> . It should 99 be noted, in this case, we should set _l_ = 0 in the cassette-like peeling. The proposed 

- 100 cassette-like peeling concept requires a proper design that facilitates compatibility with 101 universal testers. 

- 101 

102 

## _2.2. Prototype_ 

103 Figure 4 shows the design of a prototype based on the cassette-like peeling concept. 104 Gravity is deployed for applying the reverse tensile load and torque. The magnitude of 105 the torque can be adjusted by changing the suspended counterweight hanging tangential 106 to the coaxial spool with the radius _r_ . Thus, the torque is given by _M_ = _Tr_ . Figure A1 

7 

- 107 in Appendix A shows an exploded view of the assembly. The reverse tensile load can 108 be applied in other ways, such as a magnetic brake. Figure A2 of Appendix A presents 109 examples of such alternative strategies. For the prototype, the bearing unit was fitted 110 between the spool and axle to ensure low-friction rotation during the peeling process 111 and avoid unwanted energy dissipation. The spool was made from a very light Al alloy 112 to reduce the effect of inertia on the test. The axle was based on a platform fitted to a 113 slide rail. 





(a) A design to realize the cassette-like peeling concept 

Figure 4: Design and prototype of the cassette-like peeling system. 

For a cassette-like peeling system, the peeling angle _θ_ can be adjusted by changing the relative distance _l_ between the loading point and the axle of the spool: 



114 As long as a suitable reverse torque is applied to ensure the vertical alignment of the 115 peeling arm, _θ_ only depends on _l_ . A positioning line laser was installed to assist with 

116 assessment of the vertical alignment. The radius of the spool can be customized as per 

8 

117 the sample size. This design is more compact and economical than the ones presented 118 in Appendix A. The prototype, testing machine, and designs have been patented by 119 KAUST. 

## 120 **3. Energy conservation analysis** 

In a peel test, a gradual increase in force is typically observed during the crack initiation phase. The system then establishes a steady self-similar peeling process, and _P_ stabilizes (Kinloch & Williams, 2002). As per the Griffith theory, the energy dissipation related to the creation of new cracked surfaces can be characterized by the material parameter _Gc_ , which is defined as the fracture energy or work of adhesion (WOA), For a film with zero bending stiffness and infinite tensile stiffness, _Gc_ can be expressed as follows (Kendall, 1975) 



where _P_ is the steady-state peeling force, _b_ is the width of the peeling arm and _θ_ is the peeling angle. This is the classical equation to derive _Gc_ in peeling tests. Other sources of energy dissipation are generally lumped into the above equation because of the unrealistic assumptions for the properties of peeling arms. The most significant contribution may be the dissipation caused by the bending deformation of the peeling film when the material of the peeling arm is elasto-plastic, such as a metal (Kim & Aravas, 1988; Kinloch et al., 1994; Wei & Hutchinson, 1998). Considering all the possible sources of energy dissipation, the energy balance of the system, when peeling a film, can be expressed by (Kinloch et al., 1994) 



where Π is the total potential energy of the peeling system, _a_ is the crack length, _U_ ext is the external work, _Ue_ is the stored tensile strain energy, _Uft_ and _Ufb_ are the energy dissipation caused by film tension and film bending, respectively, and _Uloss_ is the energy loss because of friction, inertia and etc. Eq. 5 applies to any peeling system. Considering 

9 

the force balance of the system in Figure 2, the differential of the external load can be expressed by 



where _β_ is the rotation angle of the spool and _λ_ is the stretch ratio of the peeled film subjected to _P_ . Then, 



Thus we can write 



The differential of the stored tensile elastic energy and energy dissipation caused by tension can be calculated by the following equation: 



where **_F_** is the deformation gradient and **P** is the first Piola-Kirchhoff stress tensor. **_F_** _λ_ Under uniaxial tension, the term �0<sup>**P**:d</sup><sup>**_F_**canbecalculatedby</sup> �0<sup>_σe·_d</sup><sup>_λ_where</sup><sup>_σe_</sup> is the nominal stress in the tensile direction. This term represents the strain energy density with respective to the reference configuration if the material is not damaged (i.e., no tensile energy dissipation). By substituting Eq. 8 and Eq. 9 into Eq. 5, _Gc_ of the cassette-like peeling system is given by 



Kinloch et al. (1994) theoretically identified the energy dissipation caused by elastoplastic deformation from local bending of the film near the crack tip in peeling tests. Li & Lubineau (2022) used Sobol’s approach to examine the effect of the adhesion properties on the energy dissipation mechanisms when peeling an elasto-plastic film, and they demonstrated that the energy dissipation associated with film bending was significant. If _h_ is negligible compared to _R_ , we can derive _Gc_ by ignoring the energy loss and assuming a zero bending stiffness of the film, which is generally true for flexible 



121 Clearly, Eq. 11 is identical with Kendall’s classical peeling equation if the term<sup>_<u>P</u>_</sup> _b_<sup>(</sup><sup>_λ −_1)</sup><sup>_−_</sup> _λ_ 122 _h_ �0<sup>_σe ·_d</sup><sup>_λ_,i.e.,thecomplementarystrainenergyperareaofthepeeledfilm,isnegli-</sup> 123 gible compared to _Gc_ . For a soft film with high stretchability, such as an elastomeric 124 polymeric film, the large deformation experienced by the peeling arm indicates that the 125 complementary energy density is significant and cannot be neglected. In this case, using 126 classical analysis to derive _Gc_ may lead to an underestimation of the intrinsic fracture 127 energy. Thus, to accurately determine _Gc_ of soft-to-rigid bonded assemblies, the energy 128 consumption caused by the tensile deformation of the soft film during a peel test re129 quires to be considered. The above discussion is in line with the results of Eremeyev & 130 Naumenko (2015) 

## 131 **4. Validation** 

132 To validate the developed cassette-like peeling system, peeling tests were performed 133 using both the prototype and a conventional peeling kit. All tests were preformed on 134 the universal tester (ZwickRoell TN0.5). The peeling force and the displacement of the 135 peeling head were recorded throughout the loading process. 

136 _4.1. Peeling a tape_ 

137 Before applying our system to the configurations that cannot be tested with classical 138 systems, we realized a benchmark with peeling an almost inextensible Kapton<sup>®</sup> tape 139 with a width of 20 mmm. The test kit TH50+SW1 (Grip Engineering, Germany) was 140 adopted to test the conventional peeling method. Since the almost inextensible tape 141 experiences small tensile strain during peeling, we expected similar responses from both 142 systems in this context. 

143 We kept a small amount of pre-tension in the peeling arm to ensure its straightness 144 without jeopardizing the measured peeling response. Figure 5 shows the responses to the 145 90 ° and 60 ° peeling tests. Good agreements were obtained between the corresponding 146 peeling curves. Thus, the cassette-like peeling system was validated for measuring _Gc_ 147 of flexible-to-rigid assemblies where the peeled adherend is subjected to small strain. It 

11 

148 should be noted that, for the response of the 60 ° peel test by the cassette-like system, 149 the first plateau followed by a force climbing corresponds to the practice of reverse 150 torque adjustment for achieving the target angle of peeling. For both testing scenarios, 151 the cassette-like peeling system produces a more stable response. Using the classical 152 derivation of fracture energy (i.e., Eq. 4 ), _Gc_ was slightly greater in the 90 ° peel test 153 than in the 60 ° peel test. This is consistent with the results of Gent & Kaang (1987). 154 The tape tests results confirmed that the system can handle the scenarios where the film 155 experiences small deformation. 



<!-- Start of picture text -->
����������<br> C t i o l 9 ° ����������<br> C t i o l 6 °<br> C t t e l i k e 9 °<br> C t t e l i k e 6 °<br>i s l a t (<br>e (<br>g f o<br>l i n<br><!-- End of picture text -->

Figure 5: Tape test results using conventional peeling and the cassette-like peeling system 

### 156 

## _4.2. Peeling a highly stretchable film_ 

157 Here we report the tests of peeling a soft film from a rigid substrate in order to 158 demonstrate the advantage of the cassette-like peeling system in measuring _Gc_ of such 159 bonded assemblies. 

159 

### 160 

## _4.2.1. Theoretical responses_ 

161 Polystyrene-block-polyisoprene-block-polystyrene (SIS) is a commercially available 162 triblock copolymer that has been applied to mechanical sensors, electronic products, soft 163 robotics and medical devices. In this study, we used it to fabricate the soft films to be 164 peeled. To accurately determine the _Gc_ of soft-to-rigid systems, the contribution of the 165 complementary energy density from the tensile deformation of the flexible film required 

12 

166 to be quantified. Therefore, before the peeling tests, a uniaxial test was performed on SIS 167 dog-bone specimens with a thickness of 2 mm, which were cut from a larger sheet using an 168 ASTM D638-V die. The dog-bone specimens, in addition to the films used for the peeling 169 tests, were unconditioned, implying the involvement of tensile dissipation due to the 170 Mullins’ effect (Dorfmann & Ogden, 2004). The nominal stress _σe_ in uniaxial tests was 171 deployed to present the experimental data because it is the most easily accessible stress 172 metric in peeling tests. Figure 6a shows the _σe_ versus _λ_ response of the uniaxial tests. 173 During the unloading process, the observed stress softening and residual strain from 174 the virgin state (Mullins effect) could be attributed to the combined effect of damage 175 and time-dependent characteristics (Khan & Zhang, 2001). For uniaxial tension, _λ_ can 176 be written as a function of nominal stress _σe_ in the loading direction, i.e., _λ_ = _f_ ( _σe_ ). 177 Therefore, we can express the complementary energy density as a function of _σe_ , as 178 shown in Figure 6b. 



<!-- Start of picture text -->
2.5<br>1<br>2<br>0.8<br>1.5<br>0.6<br>1<br>0.4<br>0.2 0.5<br>0 0<br>1 1.5 2 2.5 3 3.5 4 4.5 5 5.5 0 0.2 0.4 0.6 0.8 1 1.2<br>Stretch ( ) Nominal stress (Mpa)<br>(a) Nominal stress vs. Stretch (b) Complementary energy density vs. Nominal stress<br>2)<br>Nominal stress (Mpa)<br>Complementary energy density (KJ/mm<br><!-- End of picture text -->

Figure 6: Uniaxial test results of SIS elastomer. 

179 Making use of the complementary energy data, Figure 7a plots the theoretical value 180 of _P_ corresponding to the stable crack propagation as a function of peeling angle for 181 different film thicknesses _h_ , resulting from Eq. 11. Generally, fracture toughness has a 182 dependence on fracture mode. Here, to simplify the discussion, we assumed a bonding 183 system whose fracture toughness, _Gc_ , is independent of the fracture mode. Thicker 

13 

184 films require greater peeling forces, which indicates that peeling is easier for thinner 185 films in terms of force magnitude. Certainly, to peel the same delamination length, 186 the displacement of peeling head should be greater for a system with a thinner film 187 than with a thicker film. Larger peeling angles require smaller loads and the difference 188 in required loads decreases with increasing peeling angle. Figure 7b shows the plot 189 of the ratio between _Gc_ and the total external work, denoted by _γ_ , as a function of 190 peeling angle. Accordingly, (1 _− γ_ ) quantifies the energy consumption caused by large 191 deformation of soft films. To summarize, the fraction of the external work contributing 192 to the formation of crack surfaces increases with _θ_ . The effect of _h_ on _γ_ varies as 193 peeling angle increases. A positive correlation between _h_ and _γ_ can be observed in the 194 range of _θ ∈_ [0<sup>_◦_</sup> _,_ 30<sup>_◦_</sup> ]. However, a negative correlation can be identified at larger _θ_ . 195 This variation strongly depends on the concavity and convexity of the film material’s 196 constitutive responses. Daghia et al. (2018) highlighted the effect of _γ_ on the relative 197 importance of the membrane strain energy stored in the peeling arm for determining the 198 WOA. The theoretical results presented here support their conclusions. 



<!-- Start of picture text -->
h=1.0 mm<br>h=1.0 mm<br>h=0.2 mm<br>h=0.2 mm<br>(a) Peeling force vs. peeling angle (b) Energy ratio vs. peeling angle<br><!-- End of picture text -->

Figure 7: Theoretical peeling behavior of a SIS film with varying thicknesses _h_ . The film width _b_ is 20 mm and _Gc_ is 0.3 N/mm for all the curves. 

199 Figure 8a plots the theoretical value of _P_ as a function of _θ_ for a constant _h_ and vary- 

200 ing _Gc_ . While still maintaining the assumption that _Gc_ is independent of mode-mixity, 

14 

201 _P_ shows a positive correlation with the fracture toughness, and _P_ decreases with an in202 creasing _θ_ . This agrees with the results in Figure 7a. The discrepancy between solutions 203 with different _Gc_ shows no significant change with increasing _θ_ . Figure 8b plots the same 204 energy ratio as in Figure 7b for various _Gc_ . Similarly, different features are observed for 205 the effect of _Gc_ on _γ_ with the change of _θ_ . For smaller _θ_ , the effect is not significant, 206 although a positive correlation can be identified. As _θ_ increases, the correlation becomes 207 negative. For larger _θ_ , the external work makes a smaller contribution to the formation of 208 new fracture surfaces because the deformation may be greater for a system with a larger 209 _Gc_ . The significant effect of _Gc_ manifests with the larger values of _γ_ as _θ_ approaches to 210 90<sup>_◦_</sup> . For the system with the weakest interface, i.e. _Gc_ =0.1 N/mm, _γ_ can be as high as 211 0.91, which indicates that 9% of the external work is stored/dissipated because of the 212 tensile deformation of the film. This value is still significant, which demonstrates the 213 necessity of considering the strain energy when deriving _Gc_ of such bonding systems. 



<!-- Start of picture text -->
Gc=0.9 N/mm<br>Gc=0.1 N/mm<br>Gc=0.1 N/mm<br>Gc=0.9 N/mm<br>(a) Peeling force vs. peeling angle (b) Energy ratio vs. peeling angle<br><!-- End of picture text -->

Figure 8: Theoretical predictions of peeling a SIS film in cases of various fracture energy. Film width _b_ is 20 mm and thickness _h_ is kept to be 500 _µ_ m for all the curves. 

214 _4.2.2. Results of the conventional peeling system_ 

215 Here we performed tests of peeling a SIS film using the conventional peeling frame. 216 Before loading, the specimen was tilted to obtain the required peeling angle. The peeling 217 arm was vertically gripped by the loading head jaw. The length of the free arm was 50 

15 

218 mm. Figure 9 shows the peeling process starting from elastic elongation of the peeling 219 arm to the final detachment of the thin film. In the initial stage, the peeling arm 220 experienced elastic elongation without crack propagation. Because of the synchronized 221 movements of peeling head and the specimen, the elongation of peeling arm led to a 222 misalignment between the peeling head and crack tip. This misalignment generally 223 occurs when peeling any materials using the conventional approach. Figure 10 shows 224 a schematic of the process, where points _O_ and _P_ correspond to the crack tip and 225 loading head, respectively. If the tensile stiffness of the peeling arm is comparable to 226 that of the rigid string linking the peeling head and the specimen, this misalignment is 227 negligible. However, if the peeling arm has high elasticity as in this case, the vertical 228 misalignment is considerable and gradually accumulates; therefore, the real-time peeling angle _θ_<sup>_′_</sup> accordingly increases. 







Figure 9: Side view of a 60 ° peel test using the conventional peeling system. 

229 

Assuming that the specimen is responding quasi-statically throughout the peeling process shown in Figure 10, we have the following equations to describe the system’s status prior to crack propagation, 



16 

and to describe the crack propagation, we have 



230 where _L_ 0 is the initial length of the free arm, _d_ is the displacement of loading head, ∆ _L_ 231 is the crack length, and _θ_ 0 and _θ_<sup>_′_</sup> are the peeling angles before and during the loading 232 process, respectively. Using the constitutive data of the SIS elastomer, we solve above 233 equations to obtain the response of peeling a SIS film with high stretchability when the 234 conventional test frame is adopted. 



<!-- Start of picture text -->
A<br>A<br>θ'<br>d<br>d θ'<br>A<br>O’<br>O<br>θ0<br>L0 O d<br>d<br>O<br>Propagation<br>Prior to propagation<br>Initial state<br><!-- End of picture text -->

Figure 10: Schematic of the specimen configuration when peeling a highly stretchable film using the conventional method. 

235 As indicated by the analytical force response in Figure 11a, during the loading stage 236 prior to crack propagation, _P_ increases with the displacement. This process is actually 237 pulling the free film uniaxially. Once the crack starts to propagate, _P_ starts decreasing 

17 

238 with an increasing ∆ _L_ . The reason is that the misalignment between the string for 239 driving the specimen’s translation and the soft peeling arm is significant, which induces 240 a misalignment between the crack tip and the loading point. Figure 11b shows that the 241 peeling angle keeps changing throughout the peeling process, implying that the exact 242 loading conditions seen by the tip of crack is varying. the real-time peeling angle has 243 changed from its initial value, i.e., 60 ° , to around 72.5 ° at the instant of crack initiation. 244 During the propagation, change of peeling angle can still be observed with a relatively ° 245 slow rate, approaching to 90 . We observed similar results with other _θ_ 0 values. These 246 analytical predictions are consistent with the experimental observations shown in Figure 247 10. 





Figure 11: The analytical responses of peeling a rubber film from a rigid substrate by using a conventional peel test frame. The inputs are _b_ =20 mm, _Gc_ =0.1 N/mm, _h_ =500 _µ_ m. (The regime of crack propagation is highlighted in pink.) 

248 

## _4.2.3. Results of the cassette-like peeling system_ 

249 Adopting the prototype of cassette-like system, we conducted a series of tests on 250 peeling SIS elastomer bonded to metal substrates covering campaigns of different _h_ 251 and _θ_ . The sample preparation process is given in Appendix B. Because we directly 252 deposited SIS onto the metal substrate, fracture occurred at the SIS-metal interface in all 253 the tests, and the peeled films behaved exactly as per the constitutive data obtained from 

18 

254 the uniaxial test shown in Figure 6. We ignored the rate dependency of the constitutive 255 behavior of SIS. 

256 Before loading, the cassette spool was adjusted along the sliding rail to a position 257 predetermined according to Eq. 3 and was then fixed. A positioning line laser was 258 adopted to assist with alignment, as shown in Figure 12. To establish a steady crack 259 propagation, the reverse torque was adjusted by changing the counterweight to ensure 260 that the peeling arm was perpendicular to the base platform. Once the peeling film was 261 vertical as per the positioning line laser, the expected peeling angle was achieved. 



Figure 12: Positioning line laser for assisting with film alignment. 

262 Two batches of SIS/Stainless steel bonding samples were fabricated. The SIS films 263 in batches 1 and 2 had average thicknesses _h_ of 575 _µ_ m and 635 _µ_ m, respectively. At 264 least five coupons were tested for all the following testing scenarios. In all peeling tests, 265 after stable crack propagation was established, _θ_ remained at the expected value. This 266 indicates a consistent crack tip and self-similar crack propagation. Figure 13 shows the 267 representative peeling force versus displacement responses. The delamination speed for 268 all the tests was controlled to be _∼_ 4 mm/min to eliminate the effect of the delamination 269 speed on the measured _Gc_ . The climbing regime of the curves indicates the establishment 270 of steady crack propagation. The random jumps and oscillations of the force responses 271 correspond to the adjustment of the reverse torque to maintain the alignment of the 

19 



<!-- Start of picture text -->
. 0 θ=90 ο . 0 θ=90 ο<br>θ=60 ο θ=60 ο<br>. 5 θ=30 ο . 5 θ=45 ο<br>θ=30 ο<br>. 0 . 0<br>. 5 . 5<br>. 0 . 0<br>. 5 . 5<br>. 0 . 0<br>. 5 . 5<br>i s l a t ( i s l a t (<br>(a) Batch 1 (b) Batch 2<br>e ( e (<br><!-- End of picture text -->

Figure 13: Representative peeling response of the SIS–Stainless steel bonded samples with the cassettelike system. The average film thickness is 575 _µ_ m for Batch 1 and 635 _µ_ m for Batch 2. 

272 peeled film. Then, the system produced a steady force-displacement response. A stable 273 peeling force was observed for all the tests. _P_ decreased with increasing _θ_ and exhibited 274 a positive correlation with _h_ at all _θ_ . The consistent _θ_ and steady response with a 275 stable _P_ are unlike the response with the conventional peeling system shown in Figure 276 11. Because _Gc_ depends purely on the material and adhesion, it should be obtainable 277 by substituting the average _P_ during propagation into Eq.11. Figure 14a shows the 278 derived _Gc_ with error bar for each testing scenario. The measured _Gc_ decreased linearly 279 with increasing _θ_ . This contradicts the assumption of a constant _Gc_ that we used to 280 derive the theoretical predictions presented in Figure 7 and 8. The dependency on _θ_ 281 also contradicts the observed results for peeling the Kapton<sup>®</sup> tape (Figure 5) and the 282 literature (Gent & Kaang, 1987). To our knowledge, we are the first to report this 283 dependency on _θ_ for the elastomer–metal interface. We expect that all samples had the 284 same Van der Waals force and chemical bonding properties. Therefore, this difference 285 must be from the energy dissipation from the SIS film, which may be attributed to the 286 failure of polymer fibrils as identified by Neggers et al. (2015a). The scale of fibrillation 287 within the crack propagation zone may vary with _θ_ (essentially the change of fracture 288 mode). As shown in Figure 14a, the measured _Gc_ was greater when a thicker film was 

20 

289 being peeled than when a thinner film was being peeled. This observation can possibly 290 also be attributed to different scales of polymer fibrillation formed in the two batches of 291 samples. 

292 We measured _Gc_ of the SIS-Stainless steel interface at different delamination speeds 293 to investigate the rate dependency. Based on the measured nominal stress, the stretch 294 ratios of the peeled film were all less than 1.5, which indicates relatively little stretching. 295 Thus we ignore the rate dependence of the constitutive model of SIS when deriving the 296 interface fracture energy. In other words, we can use the constitutive response for SIS 297 as shown in Figure 6 to derive _Gc_ for all the peeling tests. As shown by the fitted curve 298 in Figure 14b, _Gc_ scaled exponentially with the delamination speed. 299 To further confirm the reliability of the measurements, we performed peeling tests 300 on a bonding assembly whose substrate is made from metals other than stainless steel. 301 Here, SIS-Steel bonding samples were tested. The results are summarized in Figure 302 15. Overall, _Gc_ was greater for the SIS-Steel interface than for the SIS-Stainless steel 303 interface. The possible reason is multifold, can be the difference of either the surface 304 characteristics or the chemical properties of substrate materials, e.g., the surface energy 305 of stainless steel is relatively higher than steel, which may result in a higher molecular 306 attraction to polymer. The effects of _h_ and _θ_ on the _Gc_ measurements of SIS–steel 307 samples agreed well with the observations for the SIS–stainless steel samples. 308 The above results demonstrate the advantage of the cassette-like peeling system over 309 the conventional frame when peeling a highly stretchable film. These results give us great 310 confidence that our proposed cassette-like peeling concept may provide an objective 311 evaluation on the adhesion quality of soft-to-rigid assemblies. Note that there is no 312 contact between the peeled film and substrate with the cassette-like peeling system, 313 which eliminates the effect of friction on the debonding behaviors in the case of 0 ° 314 peeling (Ponce et al., 2015). In this study, we did not consider the effect of pre-stress 315 in the film, in other words, we assumed zero residual stress in the film prior to peeling. 316 Moreover, all the discussions above concern peeling systems whose quality of adhesion is 317 homogeneous and uniform throughout the bonded area. However, as long as the reverse 

21 



<!-- Start of picture text -->
. 3<br> B t c h 1 . 3  B t c h 1<br>. 2  B t c h 2  F i t t e d e t i a l f u t i o<br>. 3 y = A ) + y<br>4 ± 0<br>. 2<br>9 ± 0<br>. 2 5 ± 0<br>. 2 e (<br>. 2<br>. 1<br>. 1 . 2<br>. 1 . 1<br>. 0<br>. 1<br>. 0<br>l i n g a l e ( l a i n t i o n s d ( / m i n<br>(a) Fracture energy vs. peeling angle (b) Fracture energy vs. delamination speed ( θ = 30 ◦ )<br>/ m / m<br>y ( y (<br>e e e e<br>t u t u<br><!-- End of picture text -->

Figure 14: Fracture energy measurements demonstrating the effect of film thickness, peeling angle and delamination speed on the fracture energy of elastomer/metal interface. 



<!-- Start of picture text -->
. 4<br> B t c h 1<br> B t c h 2<br>. 3<br>. 3<br>. 2<br>. 2<br>. 1<br>. 1<br>. 0<br>l i n g a l e (<br>/ m<br>y (<br>e e<br>t u<br><!-- End of picture text -->

Figure 15: Measured fracture energy _Gc_ of the SIS–Steel bonded samples. The average film thickness was 450 _µ_ m for Batch 1 and 595 _µ_ m for Batch 2. 

318 torque can be adjusted quickly, the cassette-like peeling system should be able to cope 319 with systems having heterogeneous adhesion. 

320 

## **5. Conclusion** 

321 The large deformation of the peeling film poses challenges to the conventional peeling 322 system when the film adherend is with high stretchablity. In this study, we clarified the 

22 

- 323 limitation of the conventional peeling system by experiment and theoretical analysis 324 accounting for the complex deformation behavior of the film. The results with the 325 conventional peeling system showed a continuous change in peeling angle during the 326 peeling process, which was associated with a decrease in peeling force. By virtue of 327 the transformation from translation to rotation, we developed a novel peeling system. 328 Delamination is driven by a tensile load, which makes the system compatible with most 329 universal testers. In comparison to the conventional method, the simple yet versatile 330 cassette-like peeling system has the following advantages: 

- 331  The peeling angle/crack tip configuration is independent on the tensile stiffness 332 of the peeling arm; it is generally applicable for peeling any flexible films, and 333 it is especially suitable for measuring the adhesion of systems with ultra-elastic 334 adherends. 

334 

- 335  The stationary crack front during peeling favors in situ visual observation of the 336 crack with high-resolution optical instruments. 

- 337  The configuration of the system is naturally applicable to evaluating the delamina338 tion resistance of curved structures such as composite pipelines and curved panels. 

339 The demonstration with the prototype validated the proposed concept and proved that it 340 is an innovative enhancement compared with conventional test systems. The developed 341 prototype was used to demonstrate the effects of _θ_ and _h_ on _Gc_ of the elastomer–metal 342 interface for the first time. Possible mechanisms of these effect is that the scale of 343 fibrillation is varying for different fracture mode due to the film bending around the 344 crack tip. However, this requires further clarification in a forthcoming paper. Our results 345 indicate a quantifiable link between the global fracture toughness and possible energy 346 dissipation mechanisms at the microscale for bonded systems with rubberlike adherends. 347 They shed light on developing strategies for increasing the toughness of bonded systems. 348 The developed cassette-like peeling system facilitates an objective evaluation on the 349 adhesion quality of bonded systems and has great potential for application in the field 350 of flexible electronics. The newly developed system is considered a promising candidate 

23 

- 351 for next-generation peel test standards owing to its advantages over existing peeling 352 methods and its easy implementation. This is particularly true once an automatic feed353 back mechanism has been added to continuously control the required reverse moment in 354 order to produce a stationary crack front. 

### 355 

## **Acknowledgments** 

- 356 The research reported herein was supported by King Abdullah University of Science 357 and Technology (KAUST), under award number BAS/1/1315-01-01. 

- 358 

## **References** 

- 359 ASTM (2012). _Standard Test Method for Climbing Drum Peel for Adhesives_ . Stan360 dard ASTM International West Conshohocken, PA. URL: `https://www.astm.org/` 361 `Standards/D1781.htm` . 

- 362 ASTM (2017). _Standard Test Method for Floating Roller Peel Resistance of Adhesives_ . 363 Standard ASTM International West Conshohocken, PA. URL: `https://www.astm.` 364 `org/Standards/D3167.htm` . 

- 365 ASTM (2021). _Standard Test Method for 90 Degree Peel Resistance of Adhesives_ . Stan366 dard ASTM International West Conshohocken, PA. URL: `https://www.astm.org/` 367 `Standards/D6862.htm` . 

- 368 Ca˜nas, J., T´avara, L., Bl´azquez, A., Estefani, A., & Santacruz, G. (2018). A new in 369 situ peeling test for the characterisation of composite bonded joints. _Composites Part_ 370 _A: Applied Science and Manufacturing_ , _113_ , 298–310. doi: `10.1016/j.compositesa.` 371 `2018.07.014` . 

- 372 Daghia, F., Cluzel, C., H´ebrard, L., Churlaud, F., & Courtemanche, B. (2018). The 373 double drum peel (ddp) test: a new concept to evaluate the delamination fracture 374 toughness of cylindrical laminates. _Composites Part A: Applied Science and Manu-_ 375 _facturing_ , _113_ , 83–94. doi: `10.1016/j.compositesa.2018.07.020` . 

24 

- 376 Dorfmann, A., & Ogden, R. W. (2004). A constitutive model for the mullins effect 377 with permanent set in particle-reinforced rubber. _International Journal of Solids and_ 378 _Structures_ , _41_ , 1855–1878. doi: `10.1016/j.ijsolstr.2003.11.014` . 

- 379 Eremeyev, V. A., & Naumenko, K. (2015). A relationship between effective work of adhe380 sion and peel force for thin hyperelastic films undergoing large deformation. _Mechanics_ 381 _Research Communications_ , _69_ , 24–26. doi: `10.1016/j.mechrescom.2015.06.001` . 

- 382 Gao, Y., Jia, F., & Gao, G. (2019). Transparent and conductive amino acid-tackified 383 hydrogels as wearable strain sensors. _Chemical Engineering Journal_ , _375_ , 121915. 

- 383 

- 384 Gent, A., & Kaang, S. (1987). Effect of peel angle upon peel force. _The Journal of_ 385 _Adhesion_ , _24_ , 173–181. doi: `10.1080/00218468708075425` . 

- 386 Huang, P., Liu, C., Guo, Z., & Feng, J. (2021). Analytical model and experimental 387 verification of the interfacial peeling strength of electrodes. _Experimental Mechanics_ , 388 _61_ , 321–330. 

- 389 Karbhari, V., & Engineer, M. (1996). Investigation of bond between concrete and com390 posites: use of a peel test. _Journal of Reinforced Plastics and Composites_ , _15_ , 208–227. 391 doi: `10.1177/073168449601500206` . 

- 392 Kendall, K. (1975). Thin-film peeling-the elastic term. _Journal of Physics D: Applied_ 393 _Physics_ , _8_ , 1449. 

- 394 Khan, A., & Zhang, H. (2001). Finite deformation of a polymer: experiments and model395 ing. _International Journal of Plasticity_ , _17_ , 1167–1188. doi: `10.1016/S0749-6419(00)` 396 `00073-5` . 

- 397 Kim, K. S., & Aravas, N. (1988). Elastoplastic analysis of the peel test. _International_ 398 _Journal of Solids and Structures_ , _24_ , 417–435. doi: `10.1016/0020-7683(88)90071-6` . 

- 399 Kinloch, A., & Williams, J. (2002). Chapter 8 - The mechanics of peel tests. In D. Dillard, 400 A. Pocius, & M. Chaudhury (Eds.), _Adhesion Science and Engineering_ (pp. 273–301). 

- 401 Amsterdam: Elsevier Science B.V. doi: `10.1016/B978-0-444-51140-9.50035-4` . 

25 

- 402 Kinloch, A. J., Lau, C. C., & Williams, J. G. (1994). The peeling of flexible laminates. 403 _International Journal of Fracture_ , _66_ , 45–70. doi: `10.1007/bf00012635` . 

- 404 Kleinendorst, S. M., Fleerakkers, R., Cattarinuzzi, E., Vena, P., Gastaldi, D., Maris, M. 405 P. F. H. L., & Hoefnagels, J. P. M. (2020). Micron-scale experimental-numerical char406 acterization of metal-polymer interface delamination in stretchable electronics inter407 connects. _International Journal of Solids and Structures_ , . doi: `10.1016/j.ijsolstr.` 408 `2020.08.011` . 

- 409 Labonte, D., & Federle, W. (2016). Biomechanics of shear-sensitive adhesion in climb410 ing animals: peeling, pre-tension and sliding-induced changes in interface strength. 411 _Journal of The Royal Society Interface_ , _13_ , 20160373. doi: `10.1098/rsif.2016.0373` . 

- 412 Li, X., & Lubineau, G. (2022). Learning from global sensitivity analysis about iden413 tification of adhesion properties between an elastoplastic film and a rigid substrate. 414 _Submitted_ , . 

- 415 Liu, J., Lin, S., Liu, X., Qin, Z., Yang, Y., Zang, J., & Zhao, X. (2020a). Fatigue416 resistant adhesion of hydrogels. _Nature communications_ , _11_ , 1–9. doi: `10.1038/` 417 `s41467-020-14871-3` . 

- 418 Liu, X., Liu, J., Wang, J., Wang, T., Jiang, Y., Hu, J., Liu, Z., Chen, X., & Yu, J. 419 (2020b). Bioinspired, microstructured silk fibroin adhesives for flexible skin sensors. 420 _ACS applied materials & interfaces_ , _12_ , 5601–5609. 

- 421 Nase, M., Rennert, M., Naumenko, K., & Eremeyev, V. A. (2016). Identifying traction– 422 separation behavior of self-adhesive polymeric films from in situ digital images under 423 t-peeling. _Journal of the Mechanics and Physics of Solids_ , _91_ , 40–55. doi: `10.1016/` 424 `j.jmps.2016.03.001` . 

- 425 Neggers, J., Hoefnagels, J. P. M., van der Sluis, O., & Geers, M. G. D. (2015a). Multi426 scale experimental analysis of rate dependent metal–elastomer interface mechanics. 427 _Journal of the Mechanics and Physics of Solids_ , _80_ , 26–36. doi: `10.1016/j.jmps.` 428 `2015.04.005` . 

26 

- 429 Neggers, J., Hoefnagels, J. P. M., van der Sluis, O., Sedaghat, O., & Geers, M. G. D. 430 (2015b). Analysis of the dissipative mechanisms in metal–elastomer interfaces. _En-_ 431 _gineering Fracture Mechanics_ , _149_ , 412–424. doi: `10.1016/j.engfracmech.2015.06.` 432 `056` . 

- 433 Ponce, S., Bico, J., & Roman, B. (2015). Effect of friction on the peeling test at zero434 degrees. _Soft matter_ , _11_ , 9281–9290. doi: `10.1039/C5SM01203A` . 

- 435 Takahashi, R., Shimano, K., Okazaki, H., Kurokawa, T., Nakajima, T., Nonoyama, T., 436 King, D. R., & Gong, J. P. (2018). Tough particle-based double network hydrogels for 437 functional solid surface coatings. _Advanced Materials Interfaces_ , _5_ , 1801018. doi: `10.` 438 `1002/admi.201801018` . 

- 439 Wei, Y., & Hutchinson, J. W. (1998). Interface strength, work of adhesion and plasticity 440 in the peel test. In _Recent Advances in Fracture Mechanics_ (pp. 315–333). Springer. 441 doi: `https://doi.org/10.1023/A:1007545200315` . 

- 442 Yuk, H., Zhang, T., Lin, S., Parada, G. A., & Zhao, X. (2016a). Tough bonding of 443 hydrogels to diverse non-porous surfaces. _Nature materials_ , _15_ , 190–196. doi: `10.` 444 `1038/nmat4463` . 

- 445 Yuk, H., Zhang, T., Parada, G. A., Liu, X., & Zhao, X. (2016b). Skin-inspired hydrogel– 446 elastomer hybrids with robust interfaces and functional microstructures. _Nature com-_ 447 _munications_ , _7_ , 1–11. doi: `10.1038/ncomms12028` . 

- 448 Zhang, Y., Liu, Q., & Xu, B. (2017). Liquid-assisted, etching-free, mechanical peeling of 449 2d materials. _Extreme Mechanics Letters_ , _16_ , 33–40. doi: `10.1016/j.eml.2017.08.` 450 `005` . 

- 451 Zhang, Y., Ma, S., Li, B., Yu, B., Lee, H., Cai, M., Gorb, S. N., Zhou, F., & Liu, W. 452 (2021). Gecko’s feet-inspired self-peeling switchable dry/wet adhesive. _Chemistry of_ 453 _Materials_ , _33_ , 2785–2795. doi: `10.1021/acs.chemmater.0c04576` . 

27 

454 **Appendix A. Design sketch of the proposed system** 

Figure A1 shows an exploded view of the prototype design. 



Figure A1: Exploded view of the prototype design. 

455 

456 Figure A2 presents two alternative designs of the cassette-like peeling concept. The 457 reverse torque can be adjusted by setting the brake. A force meter can be implemented 458 to measure the tensile load of the flexible steel string in the design of Figure A2a. More 459 conveniently, the settings can be calibrated to match the exact magnitude of the torque. 

28 





Figure A2: Two alternative designs to realize the cassette-like peeling concept. The black component is a magnet brake for applying reverse torque. 

29 

460 **Appendix B. Elastomer/metal bonded sample preparation** 

461 To guarantee the objectivity of bonding properties for all the soft-to-rigid assemblies 462 we tested, we directly deposited the dissolved SIS onto a metal sheet, after curing we 463 bonded this flexible laminate onto a plastic rim using strong adhesives. The adhesion 464 should be good enough to prevent any failure between the metal sheet and plastic rim. 465 Ideally, the van der Vaals force and chemical bonds between SIS and the metal should 466 be the same for all the samples. Figure B1 shows the sample preparation. 



<!-- Start of picture text -->
Deposited SIS film<br>Peeled SIS film<br>Metal sheet<br>Plastic rim<br><!-- End of picture text -->

Figure B1: Preparation of the soft-to-rigid bonding samples 

30 

