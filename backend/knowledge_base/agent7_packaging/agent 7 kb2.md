# DOCUMENT: agent 7 kb2.pdf

2042 

IEEE TRANSACTIONS ON COMPONENTS, PACKAGING AND MANUFACTURING TECHNOLOGY, VOL. 4, NO. 12, DECEMBER 2014 

# Characterization Methods for Ultrathin Wafer and Die Quality: A Review 

Michael Raj Marks, Zainuriah Hassan, _Member, IEEE_ , and Kuan Yew Cheong, _Member, IEEE_ 

**_Abstract_ —Ultrathin silicon die is a key enabler for highperformance semiconductor devices and ultrathin packaging. The quality of ultrathin wafers and dies has a significant influence on packaging assembly yield and device reliability. The key quality characteristics of ultrathin wafers and dies are bow/warpage, total thickness variation (TTV), subsurface damage (SSD), surface roughness, and mechanical strength. Wafer and die bow/warpage cause handling and processing problems in manufacturing processes, and induce defects during various packaging assembly processes that eventually lead to device reliability issues. The wafer TTV requirement is becoming more stringent for new generations of thin and 3-D packages. SSD, surface roughness, and dicing defects have adverse effects on die mechanical strength and reliability. Therefore, characterization methods are needed for these quality characteristics to control the manufacturing processes for ultrathin wafers and dies to ensure good device performance and reliability. The following ultrathin wafer and die characterization techniques are discussed in this paper: noncontact bow/warp/TTV measurement, materialographic analysis with optical and electron microscopy, high-resolution X-ray diffraction, micro-Raman spectroscopy, scanning infrared depolarization, optical profilometry, atomic force microscopy, and uniaxial/biaxial bending tests.** 

**_Index Terms_ —Bow, die mechanical strength, subsurface damage (SSD), surface roughness, total thickness variation (TTV), ultrathin die, ultrathin wafer, warpage.** 

## I. INTRODUCTION 

**S** ILICONperformance of many semiconductor devices owing to thedie thickness plays an important role on the relatively low thermal conductivity and influence on parasitic effects [1]. In semiconductor devices, die thickness limits the thermal performance because of junction heating [2]. Ultrathin dies, defined as dies having thicknesses _<_ 100 _μ_ m, operate at a substantially reduced junction temperature, and lower the junction-to-case thermal resistance significantly [3], [4]. A large fraction of the junction-to-case thermal resistance of packaged devices originate from the temperature gradient 

Manuscript received July 8, 2014; revised September 9, 2014; accepted October 8, 2014. Date of publication November 4, 2014; date of current version December 5, 2014. Recommended for publication by Associate Editor P. McCluskey upon evaluation of reviewers’ comments. 

M. R. Marks is with Infineon Technologies (Kulim) Sdn. Bhd., Kulim 09000, Malaysia, and also with the School of Physics, Universiti Sains Malaysia, Penang 11800, Malaysia (e-mail: michaelraj.marks@infineon.com). Z. Hassan is with the School of Physics, Universiti Sains Malaysia, Penang 11800, Malaysia (e-mail: zai@usm.my). 

K. Y. Cheong is with the School of Materials and Mineral Resources Engineering, Universiti Sains Malaysia, Penang 11800, Malaysia (e-mail: srcheong@usm.my). Color versions of one or more of the figures in this paper are available online at http://ieeexplore.ieee.org. Digital Object Identifier 10.1109/TCPMT.2014.2363570 



Fig. 1. Trends for wafer thickness, wafer diameter, and die thickness [10]. 

across the die thickness itself. Electrically, this reduced junction temperature leads to higher output power and efficiency. In cases where contact to ground is made through the die backside, a lower die thickness can reduce the device resistance, parasitic effects, and increase RF efficiency [3], [4]. 

As electronics applications shrink in size, semiconductor packages must be reduced both in footprint and thickness. Thin silicon devices are a key-enabling factor for many advanced and emerging semiconductor packaging technology. Some advanced packages and applications requiring ultrathin dies are ultrathin packages, electronic labels, smart cards, 3-D stack packaging, and flexible electronics [5]. In 3-D stack packaging, using through-silicon-via (TSV) technology, it is possible to put more devices on the same footprint without the need to shrink the size of transistor [6], [7]. In smart card and flexible electronics, the silicon die must be able to withstand consistent mechanical stress mainly from bending. To prevent the silicon die from breaking, it needs to be flexible enough during thickness reduction [8], [9]. Fig. 1 shows the trend of decreasing die thickness in electronic packages [10]. 

A simplified ultrathin wafer preassembly process flow on the basis of a wafer carrier system is as shown in Fig. 2. A brief description of the process steps is as follows. Bonding to carrier: the thick wafer is temporarily bonded to a rigid carrier plate by using an adhesive. The carrier mechanically supports the wafer throughout the thinning process and maintains the flatness. The active frontside of the wafer is protected by the adhesive from mechanical and chemical damage during backgrinding and postgrinding treatment. Mounting to dicing tape: the thin wafer and carrier stack is mounted on a dicing tape. Debonding from carrier: the thin wafer is detached 

2156-3950 © 2014 IEEE. Personal use is permitted, but republication/redistribution requires IEEE permission. See http://www.ieee.org/publications_standards/publications/rights/index.html for more information. 

MARKS _et al._ : CHARACTERIZATION METHODS FOR ULTRATHIN WAFER AND DIE QUALITY 

2043 



Fig. 2. Simplified ultrathin wafer preassembly process flow. 

from the carrier by melting the adhesive, or by separating a release layer on the carrier surface through laser heating or mechanical means. The thin wafer remains constantly supported by the dicing tape on a vacuum chuck. Removal of adhesive: residual adhesive on the wafer surface is removed. The adhesive removal could be carried out by solvent cleaning before dicing tape mounting, or by mechanical peeling after carrier debonding, depending on the type of carrier/adhesive system. 

There are three commercialized temporary wafer bonding/debonding and adhesive systems for ultrathin wafer handling in the market: 3M’s Wafer Support System (WSS) [11], Brewer Science, Inc.’s WaferBOND HT10.10 [12], and Thin Materials AG’s T-MAT [13]. 

The key quality characteristics of ultrathin wafers and dies are bow/warpage, total thickness variation (TTV), subsurface damage (SSD), surface roughness, and mechanical strength. Ultrathin wafers with high bow/warpage cause wafer handling and processing difficulties in manufacturing processes [21], [22]. High bow/warpage also causes packaging assembly process defects during wafer dicing, flip-chip bonding, die attach, and wire bonding which subsequently lead to reliability issues [6], [8], [19], [23]–[26]. The TTV requirement for wafers is becoming more stringent for new generations of thin and 3-D packages [6], [80]. SSD and surface roughness induced by the wafer-backgrinding process lower the die fracture strength and reliability [14], [15]–[18], [47]–[54]. Die sidewall defects induced by the dicing process also reduce the die fracture strength and reliability [5], [79]–[91]. Therefore, characterization methods are needed for all these quality characteristics to optimize and control the manufacturing processes for ultrathin wafers and dies. With these characterization methods, good process quality, device performance, and reliability can be assured. 

This paper presents a review of ultrathin wafer and die quality characterization methods for bow/warpage, TTV, SSD, surface roughness, and mechanical strength. Such a comprehensive review is needed to appreciate the interdependencies 



Fig. 3. Definition of bow. 



Fig. 4. Definition of warp. 

between the various characteristics of ultrathin wafers and dies along the manufacturing process chain. To our knowledge, there is no similar comprehensive review being reported. The principles and applications of these characterization methods on ultrathin silicon wafers and dies will be discussed. 

## II. CHARACTERIZATION OF ULTRATHIN WAFER AND DIE QUALITY 

## _A. Bow, Warp, and TTV_ 

The abrasive removal of silicon during backgrinding leads to a layer of damaged silicon crystal structure which has high compressive stress [15]–[18]. Metallization deposition on the wafer backside induces large tensile stresses. On the other hand, the active layers on the frontside of the wafer are mainly under tensile stress. The combined effect of these residual stresses acting on the backside and frontside of the wafer results in wafer bow or warp. 

Bow and warp have different definitions [27], [28]. Bow is how concave or convex the deformation of the median surface of a free, unclamped wafer/die is at its center point (Fig. 3). Warp is the difference between the maximum positive and maximum negative distances of the median surface of a free, unclamped wafer/die from the least squares fit plane of the median surface (Fig. 4). A Japanese variant of warp, sori, is the difference between the maximum positive and maximum negative distances of the front surface of a free, unclamped wafer/die from the least squares fit plane of the front surface. There is a very small difference between warp and sori, depending on TTV [29]. 

TTV of the silicon wafer, is defined as the difference between maximum thickness and minimum thickness within the area of the wafer. TTV is an important indication of system performance of the wafer temporary bonding/debonding system because silicon wafers are ground with reference to the 

2044 

IEEE TRANSACTIONS ON COMPONENTS, PACKAGING AND MANUFACTURING TECHNOLOGY, VOL. 4, NO. 12, DECEMBER 2014 

TABLE I 

SUMMARY OF SILICON WAFER BOW/WARP/SORI/TTV MEASUREMENT METHODS FROM VARIOUS SEMI STANDARDS 





<!-- Start of picture text -->
carrier surface on the opposite side of the bonded silicon wafer.<br>The industry requires even better TTV as packaging technolo-<br>stacking advances and TTV of below 1–2  μ m, is<br>[6], [80].<br>from the contribution of wafer residual stresses to<br>bow/warp, another aspect is the gravitational force on<br>wafers in wafer cassettes. As final thickness<br>the wafer becomes progressively less able to<br>support its own weight. A thin wafer supported along the edges<br>cassette has a different shape and form compared<br>with one that is laying on a flat surface due to gravity-induced<br>[9].<br>bow/warp needs to be minimized in thin wafer pro-<br>because manual and automatic handling of deformed<br><!-- End of picture text -->

carrier surface on the opposite side of the bonded silicon wafer. The industry requires even better TTV as packaging technologies for 3-D stacking advances and TTV of below 1–2 _μ_ m, is being sought [6], [80]. 

Apart from the contribution of wafer residual stresses to wafer bow/warp, another aspect is the gravitational force on unsupported thin wafers in wafer cassettes. As final thickness is decreased, the wafer becomes progressively less able to support its own weight. A thin wafer supported along the edges in a wafer cassette has a different shape and form compared with one that is laying on a flat surface due to gravity-induced deflection [9]. 

Wafer bow/warp needs to be minimized in thin wafer production because manual and automatic handling of deformed wafers during processing is difficult or even impossible. Wafer bow/warp and the wafer mechanical strength directly affect handling of thin wafers. Wafer bow/warp increases significantly while its mechanical strength decreases significantly with the reduction of wafer thickness [8], [15], [19], [21]. As wafer thickness is reduced to _<_ 100 _μ_ m, the gravityinduced wafer deflection becomes very high and handling of these ultrathin wafers by using conventional wafer handling methods becomes very challenging. Therefore, a rigid wafer support system is required to handle ultrathin wafers in the wafer fabrication and packaging assembly processes [21], [22]. High wafer bow/warp due to residual stresses also increases the risk of die chippage and cracks during the wafer dicing process, thus, weakening the mechanical and electrical properties of the singulated die [40]. 

Fig. 5. Optical surface profile of 10 × 10 mm silicon dies with various thicknesses [8]. 

connections and open failures [6], [8], [19], [23]. In conventional die attachment using solder or epoxy adhesive, die bow/warp will lead to nonuniform bond-line thickness and die attach voids, which can result in die cracks owing to high stress concentrations in the silicon at the edges of the voids [24], [25]. In severe bow/warp cases, this can cause an overhanging of the die edges making wire bonding at peripheral bond pads impossible owing to lack of support at the bottom of the ultrathin die [26]. 

_1) Wafer Bow, Warp, and TTV Measurement:_ Table I shows a summary of silicon wafer bow/warp/sori/TTV measurement methods from various Semiconductor Equipment and Materials International (SEMI) standards. The wafer thickness requirement is 100 _μ_ m and above and therefore these methods are not applicable for ultrathin wafers. In the ultrathin wafer manufacturing flow, the SEMI methods are recommended for monitoring bow/warp/sori/TTV of wafers in process steps before the wafers are bonded on rigid carriers for thinning. Once a wafer is bonded on a rigid carrier, the 

Any stress-induced bow/warp at wafer level will translate to bow/warp at die level after the wafer dicing process (Fig. 5). The amount of the die bow/warp depends on the product, its active layers, and the die size. Major challenges are faced in the packaging assembly processes of ultrathin dies associated with bow/warp. The attachment of ultrathin dies onto substrates by flip-chip bonding can result in uneven gaps between the solder bumps and pads on the substrate due to bow/warp, which would cause nonuniform solder joint 

2045 

MARKS _et al._ : CHARACTERIZATION METHODS FOR ULTRATHIN WAFER AND DIE QUALITY 

wafer cannot be measured as a free and unclamped body, and measurement of wafer bow/warp/sori is not possible. However, monitoring of residual stress induced in a wafer because of the backgrinding and postgrinding treatment processes on rigid carrier could be done indirectly by measuring the bow/warp of ultrathin dies. Measurement methods for ultrathin die bow/warp will be discussed in the next section. 

The TTV of ultrathin wafers that are thinned on rigid carriers depends significantly on how parallel the bonded wafer surface is related to the carrier surface. If the wafer has an excessive bow/warp before bonding on a carrier, the wafer surface may not be bonded completely parallel to the carrier surface due to the limitation of the carrier bonding process and tool. This will result in a higher TTV after backgrinding. Wafer bow/warp, owing to residual stresses from the active layers on the wafer frontside, should be minimized not only to improve the TTV of ultrathin wafers, but also to improve the bow/warp of ultrathin dies. Therefore, it is important to monitor and control the bow/warp of wafers before bonding to carriers. 

Because of the low stiffness of silicon wafers, bow/warp/ sori/TTV measurement accuracy is affected by the method of supporting the wafer and gravity [32], [33]. SEMI has recommended bow/warp/sori/TTV measurement methods using a three-point support or a small-area chuck support to minimize the contact area of the support system to the wafer [27]–[32]. The disadvantage of these types of support is that gravity strongly influences the results. SEMI has proposed three gravity cancellation methods [28]–[30] based on the principles of reference wafer inversion, sample wafer inversion, and theoretical modeling. New wafer support methods to minimize gravity-induced deflection during bow/warp/sori measurement have been developed by other workers. Kuroda Precision developed a vertical support system to minimize gravity effects [34]. The wafer is supported at three positions at the periphery and rotated during the measurement. However, wafer position shift during measurement and wafer distortion due to clamping force cause inaccuracies in warp/sori measurements. Natsu _et al._ [34] proposed a new warp/sori measurement method using a horizontal three-point support on the vertices of a equilateral triangle at the wafer edge. Gravity cancellation by wafer inversion method was applied. It was found that the three-point support method has better repeatability and antivibration ability than that of a one-point support method. The precise positioning of the supports is crucial to obtain accurate sori results. Moreover, Natsu _et al._ [34] reported a dependency of the maximum gravity-induced deflection on the crystal orientation of the wafer. Dunn _et al._ [33] developed a wire support methodology consisting of a series of very thin wires. It was reported that the wire support substantially reduced bow and warp induced by gravity, and was able to significantly reduce the wafer-towafer variance in bow and warp measurements compared with a three-point support. 

Noncontact measuring methods for bow and warp are recommended for silicon wafers, because methods requiring physical contact will cause deflection of the wafer because 

of its low stiffness. A noncontact probe measures the distance between probe and wafer surface by using capacitance, optical, or other noncontact sensors [28]–[30]. Noncontact probes based on capacitance sensors are mostly used owing to its high measurement resolution of 0.1 _μ_ m at a fraction of the cost of other high-performance sensors [36], [37]. In the SEMI methods for measuring warp/sori, both wafer surfaces are simultaneously scanned along a prescribed pattern by an opposed pair of probes [28]–[30]. The distances between each probe and the nearest surface of the wafer are determined in pairs at intervals along the scan pattern. This data is then used in the calculations for warp/sori and gravity cancellation. Most instruments used for bow and warp measurements will also provide measurements of the wafer flatness, thickness, and TTV, which are bulk properties of the wafer not influenced by wafer deflection [31], [36], [37]. The accuracy of bow/warp/TTV measurement systems are constrained by the resolution of the noncontact sensor and the limited number of data points on the wafer with extensive interpolation. Commercial measurement systems using capacitive sensors typically have a ±2 _μ_ m bow/warp accuracy and a ±0.25 _μ_ m TTV accuracy [36], [37]. 

Optical interferometry technology can improve the accuracy of the bow/warp/TTV measurements to ±0.05 _μ_ m, because it enables full wafer characterization with a measurement resolution of 0.015 _μ_ m at a spatial resolution _<_ 1 mm [33]. Phase-measuring infrared interferometers operating at a wavelength of 1550 nm are typically used for measuring thickness and TTV of low-doped silicon wafers [38], [39]. The Fizeau or Haidinger interferometer configurations are used for wafers which are polished on both sides, but the Twyman-Green configuration is used for nonpolished wafers [38], [39]. As thickness and TTV measurements of silicon wafer with infrared interferometry require light to be transmitted through the silicon and reflected from both the front and back surfaces, this method has the disadvantage that it cannot be applied for high-doped silicon, and for wafers with reflective layers on both sides. 

Computer-aided reflection moiré has gained popularity for wafer bow/warp measurements because of its relatively fast full-field measurement, compared with current optical pointby-point measurement methods [40], [41]. Another advantage of this method is the simple equipment setup and easy implementation. The main disadvantage of this method is the requirement for a specular reflection of the wafer surface. In reflection moiré, a sinusoidal pattern of horizontal and vertical gratings is generated and displayed on a liquid crystal display. A beam-splitter is used to project the grating onto the wafer surface. The image of the grating reflected from the wafer surface is captured using a charge-coupled device camera. The reflected grating images from the specular wafer surface in deformed and reference states are superimposed to create a moiré pattern which is analyzed with a phasemeasuring algorithm. This pattern provides the information on the out-of-plane slope. Reflection moiré has an out-of-plane resolution of _<_ 0.15 _μ_ m but the spatial resolution (0.25 mm for 8-in wafer) is low because the entire wafer is imaged in a single shot [41]. 

2046 

IEEE TRANSACTIONS ON COMPONENTS, PACKAGING AND MANUFACTURING TECHNOLOGY, VOL. 4, NO. 12, DECEMBER 2014 

_2) Die Bow/Warp Measurement:_ Ultrathin wafers need to be supported on rigid carriers during thinning and mounted on tape during dicing. As the wafer is mechanically constrained on the carrier or tape, wafer bow/warp measurement is not applicable anymore. However, once the ultrathin wafer has been diced, it will be possible to detach individual dies from the dicing tape for bow/warp measurements. Monitoring of combined residual stresses induced in ultrathin wafers due to active layers on the wafer frontside, and due to backgrinding and postgrinding treatment on the wafer backside, is possible indirectly through bow/warp measurement of ultrathin dies. Bow/warp control for ultrathin dies is necessary to ensure the manufacturability and reliability of the dies as discussed in Section II-A. 

Noncontact optical profilometry methods by confocal imaging and interferometry can be used to measure the bow/warp of ultrathin dies [42]. A confocal microscope has a spatial resolution of _<_ 0.15 _μ_ m while the out-of-plane resolution is _<_ 1 nm with a 150× objective lens. Phase-measuring and white-light interferometry can achieve a spatial resolution of _<_ 0.25 _μ_ m and an out-of-plane resolution of _<_ 1 nm with an objective lens of 100×. Confocal imaging and interferometry require vertical and in-plane scanning of the sample. 

Temperature-dependent warpage is an important issue for the manufacturing yield and reliability of ultrathin dies. For example, ultrathin dies will warp during flip-chip bonding, die attach soldering, or die attach adhesive curing due to mismatch in the coefficients of thermal expansion (CTE) of the different materials in the die. The die warpage will result in quality and reliability issues as discussed in Section II-A. There is a need to characterize variations in the die warpage during a temperature excursion, and to find solutions for minimizing the warpage. Confocal and interferometry methods are not suitable for dynamic temperature-dependent measurements because the time delay caused by sample scanning cannot cope with the rapid temperature ramp rate. 

Noncontact, full-field optical methods, that is, shadow moiré, fringe projection, and digital image correlation (DIC), have been used for real-time temperature-dependent warpage measurements of electronic components [43]–[46]. In temperature-dependent measurements, samples are uniformly heated in an enclosed chamber with a transparent quartz window [43], [44]. The temperature range can be set from room temperature up to 300 °C with a programmable ramp rate. These methods could be explored for ultrathin dies. Shadow moiré uses geometric interference between a reference grating and its shadow on a sample to measure outof-plane displacement at each pixel position in the resulting interference pattern image. In fringe projection, a fringe pattern is projected onto a sample surface through a set of projection lenses. A camera above the sample acquires the distorted fringe patterns, which are then used to calculate the out-of-plane displacement at each pixel position from its reference plane. In DIC, the sample surface is viewed through two cameras at different angles. A software identifies the same random pattern on the sample surface from both camera perspectives using pattern recognition within a small pixel window. Using stereo triangulation, the spatial position of 



Fig. 6. Silicon removal mechanisms. (a) Brittle mode. (b) Ductile mode [18]. 

the pixel window can be determined and is used to calculate the in-plane and out-of-plane displacements. Pan _et al._ [43] found that shadow moiré has better out-of-plane resolution for large samples ( _>_ 10 mm), whereas fringe projection is better for small samples ( _<_ 10 mm), and DIC is recommended where in-plane strain is important. Ding _et al._ [45] similarly concluded that fringe projection has better out-of-plane resolution when used to measure small samples. 

One potential issue in using shadow moiré, fringe projection, and DIC for warpage measurement of ultrathin dies is the need to coat the sample surface with a thin layer of high-temperature white paint to increase the signal-to-noise ratio. The thickness, stiffness, and CTE of this coating could have an influence on the warpage behavior of ultrathin dies. Therefore, thermomechanical properties of various types of coating material need to be evaluated, as well as the methods of application to minimize the coating thickness. 

## _B. Subsurface Damage_ 

Backgrinding is the standard method for wafer thinning and today’s production limit for grinding reduces wafers from an average starting thickness of 725 _μ_ m to less than 10 _μ_ m. One of the biggest issues for ultrathin dies is die fracture during packaging assembly, reliability testing, or field application. Many studies of die mechanical strength have attributed low fracture strength to SSD in silicon induced by the backgrinding process [15]–[18], [47]–[54]. Ductile and brittle modes of grinding can happen in single crystal silicon and the transition between them can be controlled by changing the machining conditions [18]. Fig. 6 shows the brittle and ductile silicon removal mechanisms using an abrasive grain. The preferred regime in which silicon removal and deformation takes place is the ductile mode. 

From investigations by Hadamovsky [50] and Gert _et al._ [51], two models to characterize the surface integrity of machined single crystals have been proposed (Fig. 7). The subsurface regions shown in Fig. 7 consist of polycrystalline layer, a region of microcracks, dislocations, 

MARKS _et al._ : CHARACTERIZATION METHODS FOR ULTRATHIN WAFER AND DIE QUALITY 

2047 



Fig. 7. Models of SSD [50], [51]. 

and residual stresses. Different types of damaged surface layers occur depending on the mechanical treatment, size of abrasive, and other factors. The depth of damaged surface varies approximately from 1 to 50 _μ_ m [48]. The Hadamovsky model has a better agreement with observed SSD in single crystal silicon induced by the backgrinding process [15]–[18], [47]–[54]. Microcrack configurations caused by indentation and grinding of silicon have been studied and documented by various workers [18], [52]–[54]. 

Many techniques have been developed to observe and measure SSD in silicon wafers. These techniques can be classified into destructive evaluation and nondestructive evaluation methods. 

_1) Destructive Evaluation Methods:_ Destructive techniques require the localized area of the specimen or the entire specimen to be mechanically and/or chemically prepared using appropriate procedures before the actual SSD observation or measurement. 

Many of the techniques used by SSD investigators [18], [53], [54] are based on the principles of materialography [59], which is the science and art of preparing a material surface for analysis by grinding and polishing, and chemical etching to reveal the structure of the specimen. Materialographic techniques generally involve precision polishing of the specimen to the plane of interest, either at a perpendicular angle or at a low angle (Fig. 8) to geometrically enlarge the depth dimension of the SSD. Once the plane of interest has been reached, a chemical polishing or chemical etching step is required to reveal the SSD structure. Young _et al._ [18] and Gao _et al._ [54] employed low-angle cross sections to study the effects of various wafer grinding parameters on the structure and depth of subsurface cracks. Planar polishing and etching of the wafer surface could be done using similar to the materialographic procedures that used for cross-sectional specimens to study the lateral SSD morphology and distribution on the wafer surface [18]. The observation and size measurement of the SSD are normally done with a high-power optical microscope or a scanning electron microscope (SEM) when higher imaging resolution is needed. 

The resolutions of high-power optical microscopy and the SEM are limited to observing microcracks in the SSD layer. 



Fig. 8. Principle of low-angle materialography [54]. 

To observe crystalline defects in the SSD layer such as lattice disorders and dislocation defects, transmission electron microscopy (TEM) is required. Fig. 9 shows an SSD layer with polycrystalline structure and dislocation defects. Reiche and Wagner [16], Draney _et al._ [20], and Halahan _et al._ [47] showed using TEM analysis that even after fine grinding of silicon wafers, crystal damage from the previous course grinding could not be completely removed. Chen _et al._ [68] used TEM to confirm the presence of dislocations and stacking faults in the SSD layer after fine grinding of silicon wafers. Sandireddy and Jiang [100] compared various silicon wafer-thinning techniques and found by TEM measurements that the SSD depths after backgrinding, backgrinding + poligrind, and backgrinding + chemical–mechanical polishing (CMP) were 0.2, 0.1, and 0 _μ_ m, respectively. 

TEM sample preparation by using focused ion beam (FIB) significantly simplifies and shortens the time for the sample preparation procedure compared to conventional TEM sample preparation techniques [60]. Another advantage of using FIB is the ability to precisely select a sample location for TEM analysis. Li _et al._ [88] used FIB extensively for TEM sample preparation to analyze the sidewall damage of ultrathin dies after blade dicing and laser dicing, and subsequent XeF2 dry etching to remove the sidewall damage. 

2048 

IEEE TRANSACTIONS ON COMPONENTS, PACKAGING AND MANUFACTURING TECHNOLOGY, VOL. 4, NO. 12, DECEMBER 2014 



Fig. 9. SSD layer after fine grinding as shown by cross-sectional TEM. 

_2) Nondestructive Evaluation Methods:_ It is advantageous to have nondestructive evaluation methods to characterize SSD as there is none or little sample preparation required and the specimen remains intact for other types of analysis. 

_a) X-ray diffraction:_ X-ray diffraction (XRD) is a nondestructive method to determine residual stress from lattice deformation of a crystal. A crystal lattice is a regular 3-D distribution of atoms in space. When incident X-rays approach at a particular angle, they are reflected specularly from different planes of crystal atoms. For a particular set of planes with interplanar spacing _d_ , the reflected waves is only observed if Bragg’s condition is met for constructive interference [61]. Plastic deformation occurs in the SSD layer because of cracking and local elastic expansion or contraction of the crystal lattice [48]. As such, elastic strain is produced in the crystal lattice. Using elasticity theory, these strain components can be converted into stress values. The lattice constant change in a silicon SSD layer is detectable by a high-resolution X-ray diffractometer [48]. This type of diffractometer consists of a four-crystal monochromator that produces a highly parallel and monochromatic incident beam so that a high resolution of XRD can be achieved. Micro-XRD technology is capable of small analysis in areas up to 10 _μ_ m in diameter, owing to improvements made in the measurements by optical systems, detectors, and high-intensity X-ray sources [62], [63]. 

Bismayer _et al._ [48] found that the penetration depth of X-ray into silicon is 30–60 _μ_ m for conventional Bragg diffraction. Different peak positions and full-width at halfmaximum (FWHM) values occur owing to residual stresses and damage of the silicon lattice [48]. The XRD peak of ground silicon wafers measured with CuK _α_ radiation showed an increased FWHM compared with that of polished silicon wafers (Fig. 10). 

_b) Raman spectroscopy:_ Raman spectroscopy is a nondestructive technique for analyzing residual stress and phase transformation in a crystal. When photons are scattered from 



Fig. 10. High-resolution XRD patterns of polished and ground silicon wafers [48]. 

a molecule, most photons are elastically scattered, that is, most of the scattered photons have the same frequency and wavelength as the incident photons. However, few photons are scattered at optical frequencies different from, and usually lower than, the frequency of the incident photons, _ωi_ . This inelastic scattering of photons is called the Raman effect [64]. Inelastic scattering by the lattice vibrations, the phonons of the crystal with frequency _ω_ ph, leads to a shift of the excitation line according to _ωs_ = _ωi_ ± _ω_ ph, where _ωs_ is the scattered beam frequency. The signs − and + represent Stokes and anti-Stokes processes, respectively. Microscopic changes (long- and short-range disorders), impurities and residual strains strongly influence the Raman spectrum of a material. 

Micro-Raman spectroscopy can achieve a spatial resolution of 1 _μ_ m by focusing a monochromatic laser beam through an optical microscope [48], [65]–[68]. The scattered photons are then focused with a lens on the entrance slit of a spectrometer. Sparks and Paesler [70] found that the light penetration deep into silicon changes with different excitation wavelengths. Verhey _et al._ [65] reported an analysis depth range of 1–40 _μ_ m in silicon depending on the wavelength. Thus, it is possible to probe different depths of the silicon sample by varying the wavelength. 

Bismayer _et al._ [48] studied the stress-depth profiles of ground silicon wafers with micro-Raman spectroscopy. Compared with polished silicon, different Raman peak positions and FWHM were observed for ground silicon attributed to SSD (Fig. 11). The peak shift to higher frequencies is caused by compressive stresses in the wafer surface related to the Gruneisen effect [48]. The broadened line shape with FWHM = 16.5 cm<sup>−1</sup> can be explained by the density of states effect of a polycrystalline layer with grain size of 6–10 nm, according to the calculations by Fauchet and Campbell [71]. 

Sparks and Paesler [70] found that a Raman peak shift of 1 cm<sup>−1</sup> in crystalline silicon corresponds to a stress of 250 MPa. The ability of micro-Raman spectroscopy to measure residual stresses in silicon was further demonstrated by Srikar _et al._ [72] and Jeon _et al._ [106], where the relationship between uniaxial ( _σxx_ ) or biaxial stress ( _σxx_ + _σyy)_ in the 

MARKS _et al._ : CHARACTERIZATION METHODS FOR ULTRATHIN WAFER AND DIE QUALITY 

2049 





Fig. 12. Depolarization decay curves for ground silicon wafers [49]. 

Fig. 11. Raman peaks of polished and ground silicon wafers [48]. 

(100) plane and the Raman scattering frequency was found to be as follows: 







where _σxx_ is the residual stress and expressed in unit of MPa, _�ω_ is the Raman shift as expressed in (3), _ωs_ is the measured Raman frequency from the experiment, and _ωo_ is the silicon’s Raman peak. Compressive stress will result in an increase of the measured Raman frequency, whereas tensile stress will result in a decrease. 

Micro-Raman spectroscopy has been widely used for nondestructive SSD studies in silicon wafers. Verhey _et al._ [65] and Chen _et al._ [68] observed that the peak shifts and line broadening in ground silicon wafers were reduced or eliminated by chemical etching of the SSD layer. Chen _et al._ [68] found that Raman spectroscopy is very sensitive to residual stresses rather than to microcracks induced by wafer grinding. Yan [69] detected the presence of amorphous silicon and residual stresses in silicon wafers machined by single-point diamond. Takyu _et al._ [90], [97] compared the stress-depth profiles in ultrathin silicon wafers subjected to various waferthinning methods. 

_c) Scanning infrared depolarization:_ Scanning infrared depolarization (SIRD) can be applied to measure SSD qualitatively. The stress due to the damaged surface layer of the silicon induces birefringence in the silicon crystal [49]. This stress can be visualized by examining silicon wafers between cross polarizers by using infrared laser beam. A helium–neon laser beam with a wavelength of 1152 nm is transmitted through the wafer to measure the depolarization due to SSD. The wafer is located between a pair of crossed polarizers and a pair of quarter wave plates. The quarter wave plates were employed to obtain circularly polarized light to determine the depolarization without depending on the angle between the plane of polarization of the incident beam and the wafer orientation. From the measured light intensities, the depolarization _DP_ = _Lc/L p_ can be calculated, 

where _Lc_ is the light intensity with crossed polarizers, and _L p_ is the light intensity with parallel polarizers. The amount of depolarization of the laser beam is a qualitative measure of the SSD. A damage map can be generated by scanning the wafer with the laser beam at a spatial resolution of 1 mm. 

As the infrared beam needs to be transmitted through the silicon sample, the application of SIRD is limited to lowdoped silicon and samples without reflective layers on the front and back surfaces. The depth of the SSD cannot be determined directly by SIRD. To investigate a depth profile of the SSD, the sample has to be chemically etched is steps, with depolarization measurement taken after each etching step. Unfortunately, this becomes a destructive evaluation. Lundt _et al._ [49] investigated the effects of diamond abrasive mesh size on grinding wheels on the SSD depth in silicon wafers by using SIRD (Fig. 12). It was found that the SSD depth decreases with smaller abrasive size, and that it is possible to minimize the SSD depth below 1 _μ_ m. 

_d) Other nondestructive methods:_ There are other nondestructive evaluation techniques for SSD that are still at experimental and development stages. These are briefly discussed here. 

Zhang _et al._ [55] developed a laser scattering system to measure subsurface cracks in grounded silicon wafers. When a laser beam is focused on the surface of a silicon wafer, it can penetrate beneath the surface for a certain depth. Zhang and Sun [56] found that the depth of penetration in silicon was increased from 9 to 120 _μ_ m by increasing the laser wavelength from 630 to 900 nm. The basic principle of laser scattering technology is that subsurface cracks cause a random polarization of the scattered/reflected light, and this is detected using polarizing beam-splitters. Laser scattering has the potential to be a high-resolution and full-wafer method for measuring the spatial and depth distributions of subsurface cracks in silicon wafers. 

Karabutov and Podymova [57] studied the depth of SSD in silicon by using laser-induced ultrasonic signal. This method is based on the different mechanisms of laser generation of ultrasonic signal in undamaged and damaged layers in silicon wafers. A pulsed laser at a wavelength of 1064 nm and pulse 

2050 

IEEE TRANSACTIONS ON COMPONENTS, PACKAGING AND MANUFACTURING TECHNOLOGY, VOL. 4, NO. 12, DECEMBER 2014 

width of 10<sup>−8</sup> s was used. The minimum reliably detected depth of SSD was estimated at the level of 0.15–0.2 _μ_ m. Laser-induced ultrasonic signal has the potential of being a full-wafer and economical SSD depth measurement method due to its simple setup. 

Ishikawa _et al._ [58] used a reflection acoustic microscope to estimate the thickness of SSD layers in silicon wafers. In this method, acoustic waves are generated by applying high-voltage pulses (300–600 MHz) to a piezoelectric film mounted on an acoustic lens. The acoustic lens focuses the acoustic waves on a sample via water as the coupling medium. The reflected acoustic waves from the sample return to the piezoelectric film by the same route, and converted to voltage signal. By analyzing the voltage signal, it is possible to determine the velocity of surface acoustic waves (SAWs) in the sample surface layer which is influenced by the SSD level. It was found that surface roughness also has an influence to the SAW velocity and this is a problem that needs to be resolved. 

## _C. Surface Roughness_ 

Any surface when suitably magnified will reveal itself as a series of peaks and valleys which may vary both in height and spacing. The wafer’s back surface as produced by grinding is of no exception. It is by these irregularities that the surface finishing is determined. Thus, to control the grinding process it is useful to employ surface quality parameters such as _Ra_ , _R_ max, and _Rt_ as a measure of its roughness. The definition of these parameters and measurement methods will be discussed later in this section. 

Surface roughness causes microscopic stress concentrations that lower the mechanical strength of a wafer and singulated die [73]. Lim [14] has conducted die strength experiments by using a simply supported beam test on singulated dies and impact test on packaged dies. An inversely proportional relationship was seen between the fracture strength and the surface finish parameters—the die weakens as the degree of surface roughness is increased. However, the experiments by Lim [14] did not take into account the combined effect of both roughness and the underlying SSD on mechanical strength. 

Higher roughness can be an indication of deeper SSD, because the wafer surface roughness can sometimes be correlated with SSD and is more amenable to routine measurement [74]. Therefore, it is desirable that the surface roughness on ground wafers is low. 

In the context of ultrathin wafers and dies, this means that it is critical for the postgrinding treatment of wafers to significantly lower the surface roughness and SSD to a level where the ultrathin wafers and dies are robust enough for subsequent processing and to withstand packaging stresses. 

The most commonly quoted surface roughness parameters in case of silicon are _Ra_ , _R_ max, and _Rt_ (Fig. 13) [14], [75]. The _Ra_ value is the arithmetic mean surface roughness measured along a sampling length and is commonly used as a general purpose surface finish parameter. These are mean values and do not fully reflect the extent of local surface defects. The root-mean-square (rms) roughness value, or _Rq_ , is generally 11% higher than the _Ra_ value for the same surface roughness. 



Fig. 13. Definitions of surface roughness parameters. 

The _R_ max value gives the maximum individual peak-to-valley height along the measured length and thus measure the largest surface defect. The distance between the highest peak and the lowest valley along the measured length is represented by the _Rt_ value. The _R_ max parameter is recommended as a wafer grinding roughness control parameter as it is a measure of the maximum surface defect [14]. 

Typical roughness measurements are performed using stylus profilers, noncontact optical profilers, or atomic force microscopes (AFMs) [75], [76]. Stylus measurements are widely used for surface roughness, but they lack lateral resolution due to the tip geometry. They also may cause surface damage owing to high forces exerted on the surface and is therefore not recommended for ultrathin wafers and dies. 

White-light interferometry and confocal scanning microscopy are well-established methods in optical profilometry [77]. Optical profilers offer quick measurement of surface features without surface contact, but they are limited in resolution owing to the wavelength of light used. AFM extends the resolution to atomic dimensions and is nondamaging in the noncontact and tapping modes [75]–[78]. Typical vertical and lateral resolutions of an optical profiler are 0.1 nm and _<_ 1 _μ_ m (depending on lens type) respectively, whereas that of an AFM are 30 pm and _<_ 20 nm (depending on probe tip radius), respectively [78]. Information about the principles and operation of optical profilometry and AFM can be found elsewhere [75], [78]. If the surface topography does not have features smaller than the nominal resolution of the optical profilers, measurements obtained with the optical profilers are indicative of the true surface roughness. Having microfeatures, an AFM should be used to provide accurate roughness data [76]. 

Sudani _et al._ [87] used an optical profiler to measure the sidewall roughness of ultrathin dies in comparing the quality of ultrashort-pulse laser dicing with different parameters and assist gases. They found that the best die sidewall _Ra_ value of 0.35 _μ_ m was obtained at a pulse width of 214 fs and a repetition rate of 4.33 MHz by using an average laser power of 15.5 W with nitrogen gas assist. Wu _et al._ [104] evaluated the backside surface roughness of ultrathin wafers with different postgrinding treatments using optical profilometry. Their experimental work showed that the _Ra_ values of backgrinding and plasma etching were, respectively, three and 

2051 

MARKS _et al._ : CHARACTERIZATION METHODS FOR ULTRATHIN WAFER AND DIE QUALITY 



Fig. 14. Influence of processing methods on the mechanical strength of a silicon die. 

six times higher than wet chemical etching. AFM has been widely used for roughness measurement of ultrathin wafers and dies because of its higher resolution. AFM has been extensively employed in studies on backgrinding and postgrinding damage removal by Sun _et al._ [99], Sheng _et al._ [9], Sandireddy and Jiang [100], and Chong _et al._ [79]. In laser dicing experiments proposed by Haupt _et al._ [101], the effects of laser wavelength and pulse width on the sidewall roughness of ultrathin dies were investigated using AFM. Their study revealed that continuous wave laser produced a much lower die sidewall _Ra_ value than _μ_ s, ns, and ps laser pulse widths. 

## _D. Mechanical Strength_ 

With the reduction of die thickness to less than 100 _μ_ m, the requirement for die strength is becoming more stringent. Studies have shown that as die thickness becomes lower, the value of fracture load also reduces [79]. Die strength is not only dependent on die thickness and size, but it could be affected by backside and sidewall defects induced by the thinning and dicing processes respectively [5], [80]–[91]. There are two major factors affecting the die strength, namely backside surface strength and sidewall fracture strength (Fig. 14). The backside surface fracture strength is generally improved by postgrinding and stress-relief processes such as CMP, wet chemical etching, and plasma etching. These processes reduce the wafer backside surface roughness and residual stress, hence improves the die strength. The sidewall fracture strength can be improved if the die sidewalls are smooth and free of crystalline damage and residual stress after wafer dicing. For ultrathin dies, maximizing the die strength is important as it improves the ability of the dies to withstand the mechanical and thermomechanical stresses in the assembly process and packaging. 

Uniaxial and biaxial bending tests in various configurations are used to evaluate the mechanical strength of silicon dies. The standard testing system typically utilizes a screw-driven crosshead and load cell assembly to apply a load to the die sample at a fixed loading rate and displacement rate until the die is fractured. The maximum load at the point of fracture is then used to calculate the die mechanical strength. 

_1) Uniaxial Bending Tests:_ The three-point bend test setup is shown in Fig 15(a). In this setup, the die sample is placed on parallel support rods with the die backside facing down. The distance between the support rods is variable depending on the length of the die sample. A third rod places a load from the frontside of the die along the die centerline. This will result in a uniaxial stress state with compressive stress 



Fig. 15. Setup of (a) three-point bend test and (b) four-point bend test with tensile stress distribution along the sample backside surface. 

on the die frontside and a tensile stress on the die backside. The tensile stress on the die backside varies linearly with its peak at the die centerline. The region of highest tensile stress is mainly on the die backside surface, which includes a minimal portion of the die sidewall. Therefore, three-point bend testing is highly sensitive to die backside defects closest to the centerline, namely damage caused by wafer-thinning processes. The maximum three-point bending stress can be calculated from the following equation [92]–[94]: 



where _l_ is the load span, _b_ and _h_ are the sample width and thickness respectively, and _P_ is the applied load. 

The four-point bend test setup is similar to that of the three-point bend test as shown in Fig. 15(b). The load is applied to the die frontside at two points which are equidistant from the die centerline. The maximum tensile stress on the die backside is constant in the region between the two loading rods. This region includes the backside surface of the die, and a significant portion of the die sidewall. Thus, four-point bend testing is more sensitive to die sidewall defects coming from the wafer dicing process, compared to three-point bend testing. The maximum four-point bending stress can be calculated from the following equation [95]: 



where _l_ 2 is the load span, _l_ 1 is the inner load span, _b_ and _h_ are the sample width and thickness respectively, and _P_ is the applied load. 

A limitation of analytical stress analysis based on (4) and (5) is that the sample deflection should be small to avoid nonlinear behavior between the applied load and stress [103]. However, the deflection of ultrathin dies in uniaxial bend tests can be large due to the flexibility of the die. ASTM C674-13 [92], ASTM D790 [94], and ASTM D6272-00 [95] recommend that the sample deflection should not exceed 10% of the support span. SEMI G86-0303 [93] recommends to use a support span ≤2 mm for samples with thickness _<_ 100 _μ_ m to prevent excessive deflection. Finite element analysis (FEA) is a useful tool to verify whether the calculated stress from (4) and (5) is still valid for larger deflection. For example, Wasmer _et al._ [108] used FEA to verify the validity of calculated four-point bend stresses due to excessive sample deflection. 

Three-point and four-point bend tests have been widely used for evaluating wafer dicing and wafer-thinning technologies for thin wafers (Table II). Although four-point bend test is theoretically more sensitive to wafer dicing damage, 

2052 

IEEE TRANSACTIONS ON COMPONENTS, PACKAGING AND MANUFACTURING TECHNOLOGY, VOL. 4, NO. 12, DECEMBER 2014 

TABLE II 

APPLICATIONS OF THREE-POINT BENDING (3PB), FOUR-POINT BENDING (4PB), BALL-ON-RING (BOR), AND RING-ON-RING (ROR) TESTING ON THIN SILICON DIES FOUND IN THE LITERATURE 











it can be seen that three-point bend test is still widely used for such evaluations because of the simpler setup. Schoenfelder _et al._ [96] found that for large sample deflections, the stress distribution in the inner load span of the four-point bend test becomes nonlinear and peaks at the centerline of the sample. Hence, there is no strong benefit in using the fourpoint bend test over the three-point bend test for samples with large deflection. In summary, the three-point bend test seems 

to be more robust for uniaxial stress measurements of ultrathin dies. 

_2) Biaxial Bending Tests:_ The ball-on-ring test setup is shown in Fig. 16(a). A square die sample with the backside surface facing down is placed on a support ring. A concentric ball is used to apply load from the frontside of the die. This will result in a biaxial stress state with compressive stress on the die frontside and tensile stress on the die backside. 

2053 

MARKS _et al._ : CHARACTERIZATION METHODS FOR ULTRATHIN WAFER AND DIE QUALITY 



Fig. 16. Setup of (a) ball-on-ring test and (b) ring-on-ring test. 

There is negligible stress on the die sidewalls. The maximum ball-on-ring stress can be calculated from the following equation [109], [110]: 



where _P_ is the applied load, _h_ is the sample thickness, _υ_ is the Poisson’s ratio, _R_ is the support radius, and _z_ is the contact radius. Shetty _et al._ [110] estimated the contact radius _z_ to be _h/_ 3 _r_ eq is the equivalent sample radius based on the sample length _L_ defined as follows: 



The ring-on-ring test setup is similar to that of ball-on-ring as shown in Fig. 16(b). A concentric ring is used to apply load from the frontside of the die. This will result in a biaxial stress state with compressive stress on the die frontside and tensile stress on the die backside. The maximum tensile stress on the die backside is constant in the region within the loading ring. There is negligible stress on the die sidewalls. The maximum ring-on-ring stress can be calculated from the following equation [109]–[111]: 



where _P_ is the applied load, _h_ is the sample thickness, _υ_ is the Poisson’s ratio, _R_ is the support radius, _R p_ is the loading radius, and _r_ eq is the equivalent sample radius according to the sample length _L_ with the same definition as in (7). 

Similar to uniaxial bend tests on thin dies, problems with large sample deflections in biaxial bend tests have to be dealt with to minimize nonlinearity. According to Schoenfelder _et al._ [96], biaxial bending is much more sensitive to large deflection than uniaxial bending, and that (6) and (8) are valid if the deflection does not exceed _h/_ 2. Jeon _et al._ [106], Liu _et al._ [107], Wasmer _et al._ [108], and Barredo _et al._ [109] have used FEA to verify the validity of analytical calculations for biaxial bend experiments with large deflection. In ball-on-ring tests, Jeon _et al._ [106] found that the analytical solution for die strength correlates well with FEA solution for die thicknesses between 22 and 31 _μ_ m. 

Ball-on-ring test and ring-on-ring test are widely used to evaluate wafer thinning and postthinning treatment processes where any influence of the sample edges is unwanted (Table II). The ball-on-ring test is more popular than ring-on-ring test due to the simpler setup. Additionally, the 



Fig. 17. Example of fractographic features on a die fracture surface indicating the direction of fracture propagation (arrows) and the fracture origin. 

ring-on-ring test loses its advantage of a constant biaxial stress field in the case of large deflections in ultrathin dies [96]. The ball-on-ring test seems to be more robust for biaxial bending test of ultrathin dies. 

_3) Fractographic Analysis:_ Fracture propagation path is determined by the physical properties, microstructure, stress configuration, and environment of the material. The combination of these conditions can vary in such a manner to create a significant range of fracture propagation path types. The resultant fracture topography is a record of the integration of the material, stress, and environmental factors. Fractography is the study of fracture topography and its relation to fracture propagation. It is basically an attempt to deconvolute topographical information on the fracture surface into information about the fracture propagation direction. 

Marks [112] described the technique of silicon fractography and the interpretation of macroscopic and microscopic fracture surface markings in monocrystalline silicon (Fig. 17). The careful application of fractographic analysis enables the determination of the fracture propagation direction, the stress pattern, and the fracture initiation site. The defect at the fracture origin can be identified and subsequently the root cause can be determined. 

Chong _et al._ [79], Bohm _et al._ [113], and Yeung and Lee [105] have applied fractographic analysis to determine the fracture origins and types of surface defect in silicon die bending test samples. The application of fractography in bend test samples is important to validate whether the test result is related to the objective of the test. For example, in a bend test to evaluate wafer dicing quality, the fracture origin should be at a die sidewall defect. Likewise, in a bend test to evaluate wafer-thinning quality, the fracture origin should be at a die backside surface defect. If the die fracture in a bend test is not originating from the region of interest, then the configuration and setup of the bend test is incorrect and need to be changed. 



Ultrathin die is a key enabler for higher electrical and thermal performance in semiconductor devices, as well as 

2054 

IEEE TRANSACTIONS ON COMPONENTS, PACKAGING AND MANUFACTURING TECHNOLOGY, VOL. 4, NO. 12, DECEMBER 2014 

for ultrathin and flexible semiconductor packaging. The key quality characteristics of ultrathin wafers and dies are bow/warpage, TTV, SSD, surface roughness, and mechanical strength. As the quality of ultrathin wafers and dies have a significant impact on packaging assembly yield and device reliability, it is essential to have characterization methods to control these quality characteristics in the manufacturing processes. 

The bow/warp of silicon wafers should be monitored before bonding to rigid carriers because this has an influence to the final wafer TTV after backgrinding, as well as to the final bow/warp of ultrathin dies. Noncontact measuring methods for bow/warp/TTV are recommended for silicon wafers, using a support system that minimizes wafer contact area and gravity-induced deflection. Noncontact probe technologies for bow/warp/TTV measurements utilize capacitance, optical, or other noncontact sensors. Optical interferometry technology enables full-wafer bow/warp/TTV characterization with improved measurement accuracy and spatial resolution. Computer-aided reflection moiré has gained popularity for wafer bow/warp measurements because of its relatively fast full-field measurement and simple setup. 

Monitoring of combined residual stresses induced in ultrathin wafers due to active layers on the wafer frontside, and due to backgrinding and postgrinding treatment on the wafer backside, is possible indirectly through bow/warp measurement of ultrathin dies. Noncontact optical profilometry methods such as confocal microscopy and interferometry are recommended for measuring bow/warp of ultrathin dies. One area that is gaining importance is temperature-dependent die warpage behavior during high-temperature assembly processes. The fringe projection method has the potential to be developed for this application. However, a white coating needs to be applied on the sample surface to enhance the signal-to-noise ratio. The effect of the white coating on the thermomechanical behavior of the ultrathin die needs to be investigated. 

SSD induced by backgrinding reduces the mechanical strength of the wafer and die. Destructive methods for characterizing SSD include materialographic and FIB crosssectioning, and high-magnification observation with optical microscopy, SEM, or TEM. Nondestructive evaluation methods for SSD can be performed by high-resolution XRD, microRaman spectroscopy, and SIRD. The ability of micro-Raman spectroscopy to quantify the residual stresses in the silicon at high spatial resolution is an advantage. 

Higher roughness can be an indication of deeper SSD, and is more amenable to routine measurement in production. Typical roughness measurements are performed using noncontact optical profilers or AFM to prevent any physical damage on ultrathin wafer and die samples. 

The mechanical strength of the die is affected by backside and sidewall defects due to thinning and dicing processes, respectively. For ultrathin dies with high flexibility, the threepoint bend test is a robust method for evaluating die sidewall strength, and the ball-on-ring test is a robust method for evaluating die backside surface strength. As the thickness of silicon dies goes below 20 _μ_ m, excessive deflection during standard uniaxial and biaxial bend tests will become a 

more significant problem for nonlinear analytical solutions. Hence, new techniques for measuring the die strength for such extremely low die thickness need to be developed. 

## ACKNOWLEDGEMENT 

This work was supported by Universiti Sains Malaysia’s RUI Grant No. 1001/PFIZIK/814189. 

## REFERENCES 

- [1] S. M. Sze, _Physics of Semiconductor Devices_ , 2nd ed. New York, NY, USA: Wiley, 1981. 

- [2] R. D. Lindsted and R. J. Surty, “Steady-state junction temperatures of semiconductor chips,” _IEEE Trans. Electron Devices_ , vol. ED-19, no. 1, pp. 41–44, Jan. 1972. 

- [3] J. A. Herbsommer _et al._ , “Improved electrical and thermal performance of ultra-thin RF LDMOS power transistors,” in _IEEE MTT-S Int. Microw. Symp. Dig._ , Jun. 2003, pp. 213–216. 

- [4] J. A. Herbsommer, H. Safar, W. Brown, P. Gammel, O. Lopez, and G. Terefenko, “Ultra-thin RF LDMOS power transistors,” in _Proc. 32nd Eur. Microw. Conf._ , Sep. 2002, pp. 1–4. 

- [5] R. Aschenbrenner _et al._ , “Concepts for ultra thin packaging technologies,” in _Proc. 4th Int. Conf. Adhes. Joining Coating Technol. Electron. Manuf._ , Jun. 2000, pp. 16–19. 

- [6] A. La Manna _et al._ , “Challenges and improvements for 3D-IC integration using ultra thin (25 _μ_ m) devices,” in _Proc. IEEE 62nd Electron. Compon. Technol. Conf. (ECTC)_ , May/Jun. 2012, pp. 532–536. 

- [7] A. La Manna _et al._ , “3D stacking using ultra thin dies,” in _Proc. IEEE Int. 3D Syst. Integr. Conf. (3DIC)_ , Jan./Feb. 2012, pp. 1–5. 

- [8] T. Zhang, Z. Hou, R. W. Johnson, H. K. Charles, and C. Banda, “Flip chip assembly of thinned silicon die on flex substrates,” _IEEE Trans. Electron. Packag. Manuf._ , vol. 31, no. 1, pp. 1–8, Jan. 2008. 

- [9] V. L. W. Sheng, N. Khan, and Y. Seung, “Ultra thinning of wafer for embedded module,” in _Proc. 8th Electron. Packag. Technol. Conf. (EPTC)_ , Singapore, Dec. 2006, pp. 837–842. 

- [10] S. Savastiouk. (Apr. 2001). _Moore’s Law: The Z Dimension_ , Tru-Si Technol. Rep. [Online]. Available: asia.stanford.edu/events/spring01/slides/savastioukslides.ppt, accessed Jul. 1, 2014. 

- [11] [Online]. Available: http://solutions.3m.com, accessed Jul. 1, 2014. 

- [12] [Online]. Available: http://www.brewerscience.com, accessed Jul. 1, 2014. 

- [13] [Online]. Available: http://www.thin-materials.com, accessed Jul. 1, 2014. 

- [14] T. B. Lim, “The impact of wafer back surface finish on chip strength,” in _Proc. IEEE 27th Int. Rel. Phys. Symp._ , Apr. 1989, pp. 131–136. 

- [15] W. Kroninger, “Thin die production,” in _Materials for Advanced Packaging_ , D. Lu and C. P. Wong, Eds. New York, NY, USA: Springer-Verlag, 2009, ch. 6, pp. 219–235. 

- [16] M. Reiche and G. Wagner, “Wafer thinning: Techniques for ultra-thin wafers,” _Adv. Packag._ , vol. 12, no. 3, pp. 29–30, 2003. 

- [17] W. J. Kroninger, F. Hecht, G. Lang, F. Mariani, S. Geyer, and L. Schneider, “Time for change in pre-assembly? The challenge of thin chips,” in _Proc. IEEE 51st Electron. Compon. Technol. Conf. (ECTC)_ , May 2001, pp. 1029–1033. 

- [18] H. T. Young, H. T. Liao, and H. Y. Huang, “Surface integrity of silicon wafers in ultra precision machining,” _Int. J. Adv. Manuf. Technol._ , vol. 29, nos. 3–4, pp. 372–378, Jun. 2006. 

- [19] A. S. Francomacaro, H. K. Charles, Jr., S. J. Lehtonen, A. C. Keeney, G. V. Clatterbaugh, and C. V. Banda, “Ultra-thin flexible microcircuit assemblies using thinned die and multilayer thin-film substrates,” in _Proc. IEEE 59th Electron. Compon. Technol. Conf. (ECTC)_ , May 2009, pp. 578–584. 

- [20] N. R. Draney, J. J. Liu, and T. Jiang, “Experimental investigation of bare silicon wafer warp,” in _Proc. IEEE Workshop Microelectron. Electron Devices_ , 2004, pp. 120–123. 

- [21] _Thin Wafers and Temporary Bonding Equipment and Materials Market_ , Yole Developpement, Lyon, France, Oct. 2012, pp. 150–238. 

- [22] J. Hermanowski, “Thin wafer handling—Study of temporary wafer bonding materials and processes,” in _Proc. IEEE Int. Conf. 3D Syst. Integr. (3DIC)_ , Sep. 2009, pp. 1–5. 

- [23] B. Holland _et al._ , “Ultra-thin flexible electronics,” _Proc. IEEE 58th Electron. Compon. Technol. Conf. (ECTC)_ , May 2008, pp. 1110–1116. 

- [24] C. V. Kessel, S. A. Gee, and J. Murphy, “The quality of die-attachment and its relationship to stresses and vertical die-cracking,” _IEEE Trans. Compon., Hybrids Manuf. Technol._ , vol. 6, no. 4, pp. 414–420, Dec. 1983. 

2055 

MARKS _et al._ : CHARACTERIZATION METHODS FOR ULTRATHIN WAFER AND DIE QUALITY 

- [25] G. Heinen, “Die attach reliability prediction,” in _Proc. 1st Int. SAMPE Electron. Conf._ , vol. 1. 1987, pp. 264–274. 

- [26] E. Napetschnig, _Personal Communication_ . Villach, Austria: Infineon Technologies, Jan. 2013. 

- [27] _Test Method for Bow of Silicon Wafers_ , Semicond. Equip. Mater. Int., San Jose, CA, USA, SEMI Standard MF534-0707, 2007. 

- [28] _Test Method for Measuring Warp and Total Thickness Variation on Silicon Wafers by a Noncontact Scanning_ , Semicond. Equip. Mater. Int., San Jose, CA, USA, SEMI Standard MF657-0707, 2007. 

- [29] _Test Method for Measuring Sori on Silicon Wafers by Automated NonContact Scanning_ , Semiconductor Equipment and Materials International, San Jose, CA, USA, SEMI Standard MF1451–0707, 2007. 

- [30] _Test Method for Measuring Warp on Silicon Wafers by Automated Non-Contact Scanning_ , Semiconductor Equipment and Materials International, San Jose, CA, USA, SEMI Standard MF1390–0707, 2007. 

- [31] _Test Method for Measuring Flatness, Thickness, and Total Thickness Variation on Silicon Wafers by Automatic Non-Contact Method_ , Semiconductor Equipment and Materials International, San Jose, CA, USA, SEMI Standard MF1530–0707, 2007. 

- [32] T. Bristow, “Wafer thickness, TTV, bow and warp for thin wafer application,” in _Proc. SEMATECH Workshop 3D Interconnect Metrol._ , San Francisco, CA, USA, Jul. 2012, p. 5. 

- [33] T. Dunn, C. Lee, M. Tronolone, and A. Shorey, “Metrology for characterization of wafer thickness uniformity during 3D-IC processing,” in _Proc. IEEE 62nd Electron. Compon. Technol. Conf. (ECTC)_ , 2012, pp. 1239–1244. 

- [34] W. Natsu, Y. Ito, M. Kunieda, K. Naoi, and N. Iguchi, “Effects of support method and mechanical property of 300 mm silicon wafer on sori measurement,” _Precis. Eng._ , vol. 29, no. 1, pp. 19–26, 2005. 

- [35] [Online]. Available: http://www.kuroda-precision.com/products/ Measuring%20Systems/Nanometro_top.htm, accessed Jul. 1, 2014. 

- [36] [Online]. Available: http://www.mtiinstruments.com/technology/, accessed Jul. 1, 2014. 

- [37] [Online]. Available: http://www.eh-metrology.com/products.html, accessed Jul. 1, 2014. 

- [38] T. L. Schmitz, A. Davies, C. J. Evans, and R. E. Parks, “Silicon wafer thickness variation measurements using the National Institute of Standards and Technology infrared interferometer,” _Opt. Eng._ , vol. 42, no. 8, pp. 2281–2290, Aug. 2003. 

- [39] Q. Wang, U. Griesmann, and R. Polvani, “Interferometric thickness calibration of 300 mm silicon wafers,” _Proc. SPIE, Opt. Devices Instrum._ , vol. 6024, pp. 602426.1–602426.5, Jul. 2005. 

- [40] C. S. Ng and A. K. Asundi, “Warpage measurement of thin wafers by reflectometry,” _Phys. Proc._ , vol. 19, pp. 9–20, 2011. 

- [41] [Online]. Available: http://www.3d-shape.com/produkte/pmd_e.php, accessed Jul. 1, 2014. 

- [42] [Online]. Available: http://www.sensofar.com/sensofar, accessed Jul. 1, 2014. 

- [43] J. Pan, R. Curry, N. Hubble, and D. Zwerner, “Comparing techniques for temperature-dependent warpage measurement,” in _Proc. Global SMT Packag._ , Feb. 2008, pp. 14–18. 

- [44] S. Ri, T. Muramatsu, M. Saka, H. Tanaka, Y. Okabe, and H. Suzuki, “Accurate measurement of temperature-dependent warpage distribution of electronic packaging using FLCOS-based fringe projection profilometry,” _J. Solid Mech. Mater. Eng._ , vol. 6, no. 6, pp. 721–730, 2012. 

- [45] H. Ding, R. E. Powell, C. R. Hanna, and I. C. Ume, “Warpage measurement comparison using shadow Moiré and projection Moiré methods,” _IEEE Trans. Compon. Packag. Technol._ , vol. 25, no. 4, pp. 714–721, Dec. 2002. 

- [46] [Online]. Available: http://www.dantecdynamics/docs/products-andservices/dic/T-Q-400-Basics-3DCOR, accessed Jul. 1, 2014. 

- [47] P. Halahan, P. Marcoux, and F. Kretz, _Backgrinding Technologies for Thin-Wafer Production_ . San Jose, CA, USA: Chip Scale Review, Jan./Feb. 2002. [Online]. Available: http://www.chipscalereview.com/ issues/ES/issues/0102/f6_01.html, accessed Jul. 1, 2014. 

- [48] U. Bismayer, E. Brinksmeier, B. Güttler, H. Seibt, and C. Menz, “Measurement of subsurface damage in silicon wafers,” _Precis. Eng._ , vol. 16, no. 2, pp. 139–144, 1994. 

- [49] H. Lundt, M. Kerstan, A. Huber, and P. O. Hahn, “Subsurface damage of abraded silicon wafers,” in _Proc. ECS 7th Int. Symp. Silicon Mater. Sci. Technol._ , vols. 94–10. 1994, pp. 218–224. 

- [50] H. F. Hadamovsky, “Mechanische Kristallbearbeitung,” in _Werkstoffe der Halbleitertechnik_ , Leipzig, Germany: Deutscher Verlag Grundstoffindustrie, 1985, pp. 74–110. 

- [51] L. M. Gert, D. S. Yornyi, and B. S. Kishmakhov, “Structure of the surface layers of molybdenum single crystals after machining,” _Phys., Chem., Mech. Surf._ , vol. 2, pp. 583–598, 1984. 

- [52] R. W. Armstrong, A. W. Ruff, and H. Shin, “Elastic, plastic and cracking indentation behavior of silicon crystals,” _Mater. Sci. Eng., A_ , vol. 209, nos. 1–2, pp. 91–96, 1996. 

- [53] Z. J. Pei, S. R. Billingsley, and S. Miura, “Grinding induced subsurface cracks in silicon wafers,” _Int. J. Mach. Tools Manuf._ , vol. 39, no. 7, pp. 1103–1116, 1999. 

- [54] S. Gao, R. K. Kang, D. M. Guo, and Q. S. Huang, “Study on the subsurface damage distribution of the silicon wafer ground by diamond wheel,” _Adv. Mater. Res._ , vols. 126–128, pp. 113–118, Aug. 2010. 

- [55] J. M. Zhang, J. G. Sun, and Z. J. Pei, “Subsurface damage measurement in silicon wafers by laser scattering,” in _Proc. 30th Trans. North Amer. Manuf. Res. Inst. SME_ , vol. 30. 2002, pp. 535–542. 

- [56] J. M. Zhang and J. G. Sun, “Quantitative assessment of subsurface damage depth in silicon wafers based on optical transmission properties,” _Int. J. Manuf. Technol. Manage._ , vol. 7, nos. 5–6, pp. 540–552, 2005. 

- [57] A. A. Karabutov and N. B. Podymova, “Study on the subsurface damage depth in machined silicon wafers by the laser-ultrasonic method,” _Case Studies Nondestruct. Test. Eval._ , vol. 1, pp. 7–12, Apr. 2014. 

- [58] I. Ishikawa, H. Kanda, K. Katakura, and T. Semba, “Measurement of a damaged layer thickness with reflection acoustic microscope,” _IEEE Trans. Ultrason., Ferroelectr., Freq. Control_ , vol. 36, no. 6, pp. 587–592, Nov. 1989. 

- [59] K. Geels, _Metallographic and Materialographic Specimen Preparation, Light Microscopy, Image Analysis, and Hardness Testing_ , 1st ed. West Conshohocken, PA, USA: ASTM Int., 2007. 

- [60] J. Li, “Advanced techniques in TEM specimen preparation,” in _The Transmission Electron Microscope_ , K. Maaz, Ed. Rijeka, Croatia: InTech, 2012, ch. 4, pp. 69–84. 

- [61] C. Suryanayarana and M. G. Norton, _X-Ray Diffraction: A Practical Approach_ , 1st ed. New York, NY, USA: Springer-Verlag, 1998. 

- [62] H. Araki, “Micro area X-ray diffraction techniques,” _Rigaku J._ , vol. 6, no. 2, pp. 34–42, 1989. 

- [63] [Online]. Available: http://www.rigaku.com/applications/microdiffraction, accessed Jul. 1, 2014. 

- [64] E. Smith and G. Dent, _Modern Raman Spectroscopy: A Practical Approach_ , 1st ed. New York, NY, USA: Wiley, 2005. 

- [65] J. Verhey, U. Bismayer, B. Guttler, and H. Lundt, “The surface of machined silicon wafers: Raman spectroscopic study,” _Semicond. Sci. Technol._ , vol. 9, no. 4, pp. 404–408, 1994. 

- [66] I. De Wolf, “Raman spectroscopy: Chips and stress,” _Spectrosc. Eur._ , vol. 15, no. 2, pp. 6–13, 2003. 

- [67] I. De Wolf, “Micro-Raman spectroscopy to study local mechanical stress in silicon integrated circuits,” _Semicond. Sci. Technol._ , vol. 11, no. 2, pp. 139–154, 1996. 

- [68] L.-Q. Chen, X. Zhang, T.-Y. Zhang, H. Y. Lin, and S. Lee, “MicroRaman spectral analysis of the subsurface damage layer in machined silicon wafers,” _J. Mater. Res._ , vol. 15, no. 7, pp. 1441–1444, Jul. 2000. 

- [69] J. Yan, “Laser micro-Raman spectroscopy of single-point diamond machined silicon substrates,” _J. Appl. Phys._ , vol. 95, no. 4, pp. 2094–2100, 2004. 

- [70] R. G. Sparks and M. A. Paesler, “Micro-Raman analysis of stress in machined silicon and germanium,” _Precis. Eng._ , vol. 10, no. 4, pp. 191–198, 1988. 

- [71] P. M. Fauchet and I. H. Campbell, “Raman spectroscopy of lowdimensional semiconductors,” _Critical Rev. Solid State Mater. Sci._ , vol. 14, no. 1, pp. S79–S101, 1988. 

- [72] V. T. Srikar, A. K. Swan, M. S. Unlu, B. B. Goldberg, and S. M. Spearing, “Micro-Raman measurement of bending stresses in micromachined silicon flexures,” _J. Microelectromech. Syst._ , vol. 12, no. 6, pp. 779–787, Dec. 2003. 

- [73] S. Timoshenko and J. N. Goodier, _Theory of Elasticity_ , 2nd ed. New York, NY, USA: McGraw-Hill, 1961. 

- [74] W. Sun, Z. J. Pei, and G. R. Fischer, “Fine grinding of silicon wafers: Machine configurations for spindle angle adjustments,” _Int. J. Mach. Tools Manuf._ , vol. 45, no. 1, pp. 51–61, 2005. 

- [75] B. Bhushan, “Surface roughness analysis and measurement techniques,” in _Modern Tribology Handbook_ , vol. 1, B. Bhushan, Ed. Boca Raton, FL, USA: CRC Press, 2001, ch. 2, pp. 49–120. 

- [76] J. Jahanmir and J. C. Wyant, “Comparison of surface roughness measured with an optical profiler and a scanning probe microscope (Invited Paper),” _Proc. SPIE_ , vol. 1720, pp. 111–118, Oct. 1992. 

- [77] A. Duparre, J. F. Borrull, S. Gliech, G. Notni, J. Steinert, and J. M. Bennett, “Surface characterization techniques for determining the root-mean-square roughness and power spectral densities of optical components,” _Appl. Opt._ , vol. 41, no. 1, pp. 154–171, Jan. 2002. 

- [78] [Online]. Available: http://www.bruker.com/, accessed Jul. 1, 2014. 

2056 

IEEE TRANSACTIONS ON COMPONENTS, PACKAGING AND MANUFACTURING TECHNOLOGY, VOL. 4, NO. 12, DECEMBER 2014 

- [79] D. Y. R. Chong, W. E. Lee, B. K. Lim, J. H. L. Pang, and T. H. Low, “Mechanical characterization in failure strength of silicon dice,” in _Proc. IEEE Inter Soc. Conf. Thermal Phenomena_ , Jun. 2004, pp. 203–210. 

- [80] C. Miyazaki, H. Shimamoto, T. Uematsu, and Y. Abe, “Development of wafer thinning and dicing technology for thin wafer,” in _Proc. IEEE Int. Conf. 3D Syst. Integr. (3DIC)_ , Sep. 2009, pp. 1–4. 

- [81] W. Kroninger and F. Mariani, “Thinning and singulation of silicon: Root causes of the damage in thin chips,” in _Proc. IEEE 56th Electron. Compon. Technol. Conf. (ECTC)_ , May/Jun. 2006, pp. 1317–1322. 

- [82] S. Takyu, T. Kurosawa, N. Shimizu, and S. Harada, “Novel wafer dicing and chip thinning technologies realizing high chip strength,” in _Proc. IEEE 56th Electron. Compon. Technol. Conf. (ECTC)_ , May/Jun. 2006, pp. 1623–1627. 

- [83] S. Chen, T.-Y. Kuo, H.-T. Hu, J.-R. Lin, and S.-P. Yu, “The evaluation of wafer thinning and singulating processes to enhance chip strength,” in _Proc. IEEE 55th Electron. Compon. Technol. Conf. (ECTC)_ , May/Jun. 2005, pp. 1526–1530. 

- [84] M. Y. Tsai and C. S. Lin, “Determination of silicon die strength,” in _Proc. IEEE 55th Electron. Compon. Technol. Conf. (ECTC)_ , May/Jun. 2005, pp. 1155–1162. 

- [85] V. R. Marinov, O. Swenson, Y. Atanasov, and N. Schneck, “Laser-assisted ultrathin die packaging: Insights from a process study,” _Microelectron. Eng._ , vol. 101, pp. 23–30, Jan. 2013. 

- [86] W.-S. Lei, A. Kumar, and R. Yalamanchili, “Die singulation technologies for advanced packaging: A critical review,” _J. Vac. Sci. Technol. B, Microelectron. Nanometer Struct._ , vol. 30, no. 4, pp. 040801-1–040801-27, Jul. 2012. 

- [87] N. Sudani, K. Venkatakrishnan, and B. Tan, “Laser singulation of thin wafer: Die strength and surface roughness analysis of 80 _μ_ m silicon dice,” _Opt. Laser Eng._ , vol. 47, nos. 7–8, pp. 850–854, 2009. 

- [88] J. Li _et al._ , “Laser dicing and subsequent die strength enhancement technologies for ultra-thin wafer,” in _Proc. IEEE 57th Electron. Compon. Technol. Conf. (ECTC)_ , May/Jun. 2007, pp. 761–766. 

- [89] M. Feil, C. Adler, D. Hemmetzberger, M. Konig, and K. Bock, “The challenge of ultra thin chip assembly,” in _Proc. IEEE 57th Electron. Compon. Technol. Conf. (ECTC)_ , May/Jun. 2007, pp. 35–40. 

- [90] S. Takyu _et al._ , “Novel flip chip technologies for ultra thin chip,” in _Proc. IEEE 57th Electron. Compon. Technol. Conf. (ECTC)_ , May/Jun. 2007, pp. 1326–1332. 

   - [102] B. Richerzhagen, D. Perrottet, R. Housh, and J. Manley, “Enhanced fracture strength of thin wafers and chips due to laser-microjet technology,” in _Proc. Thin Semiconductor Devices Manuf. Appl. Conf._ , Munich, Germany, 2004. 

   - [103] P. S. Huang and M. Y. Tsai, “Nonlinearities in thin-silicon die strength test,” in _Proc. IEEE 6th Int. Microsyst., Packag., Assembly, Circuits Technol. Conf. (IMPACT)_ , Taipei, Taiwan, Oct. 2011, pp. 91–95. 

   - [104] L. Wu, J. Chan, and C. S. Hsiao, “Cost-performance wafer thinning technology,” in _Proc. IEEE 53rd Electron. Compon. Technol. Conf. (ECTC)_ , May 2003, pp. 1463–1467. 

   - [105] B. Yeung and T.-Y. T. Lee, “An overview of experimental methodologies and their applications for die strength measurement,” _IEEE Trans. Compon. Packag. Technol._ , vol. 26, no. 2, pp. 423–428, Jun. 2003. 

   - [106] E.-B. Jeon, J.-D. Park, J. H. Song, H. J. Lee, and H.-S. Kim, “Bi-axial fracture strength characteristic of an ultra-thin flash memory chip,” _J. Micromech. Microeng._ , vol. 22, no. 10, p. 105014, 2012. 

   - [107] D.-S. Liu, Z.-H. Chen, and C.-Y. Lee, “Evaluate breaking strength of thin silicon die by ball-on-ring microforce tests and finite element analysis,” in _Proc. IEEE 6th Int. Microsyst., Packag., Assembly, Circuits Technol. Conf. (IMPACT)_ , Taipei, Taiwan, Oct. 2011, pp. 188–190. 

   - [108] K. Wasmer, A. Bidiville, J. Michler, C. Ballif, M. Van der Meer, and P. Nasch, “Effect of strength test methods on silicon wafer strength measurements,” in _Proc. 22nd Eur. Photovolt. Solar Energy Conf._ , Milan, Italy, 2007, pp. 1135–1140. 

   - [109] J. B. Egusquiza, L. Hermanns, A. Fraile, J. C. Jimeno, and E. Alarcón, “Study of the edge and surface cracks influence in the mechanical strength of silicon wafers,” in _Proc. 24th Eur. Photovolt. Solar Energy Conf._ , Hamburg, Germany, 2009, pp. 2116–2119. 

   - [110] D. K. Shetty, A. R. Rosenfield, P. McGuire, G. K. Basal, and W. H. Duckworth, “Biaxial flexure test for ceramics,” _Amer. Ceramics Soc. Bull._ , vol. 59, no. 12, pp. 1193–1197, 1980. 

   - [111] _Monotonic Equibiaxial Flexural Strength of Advanced Ceramics at Ambient Temperature_ , American Society for Testing and Materials, West Conshohocken, PA, USA, ASTM Standard C1499-09, 2013. 

   - [112] M. R. Marks, “Fracture analysis of silicon die and ceramic package using fractography,” _ISHM Int. J. Microcircuits Electron. Packag._ , vol. 14, no. 4, pp. 350–362, 1993. 

   - [113] C. Bohm, T. Hauck, A. Juritza, and W. H. Muller, “Weibull statistics of silicon die fracture,” in _Proc. IEEE 54th Electron. Compon. Technol. Conf. (ECTC)_ , Dec. 2004, pp. 782–786. 

- [91] S. Y. Luo and Z. W. Wang, “Studies of chipping mechanisms for dicing silicon wafers,” _Int. J. Adv. Manuf. Technol._ , vol. 35, nos. 11–12, pp. 1206–1218, 2008. 

- [92] _Standard Test Methods for Flexural Properties of Ceramic Whiteware Materials_ , American Society for Testing and Materials, West Conshohocken, PA, USA, ASTM Standard C674-13, 2013. 

- [93] _Test Method for Measurement of Die Strength by Mean of 3-Point Bending_ , Semiconductor Equipment and Materials International, San Jose, CA, USA, SEMI Standard G86-0303, 2003. 

- [94] _Standard Test Methods for Flexural Properties of Unreinforced and Reinforced Plastics and Electrical Insulating Materials_ , American Society for Testing and Materials, West Conshohocken, PA, USA, ASTM Standard D790, 2003. 

- [95] _Standard Test Method for Flexural Properties of Unreinforced and Reinforced Plastics and Electrical Insulating Materials by FourPoint Bending_ , American Society for Testing and Materials, West Conshohocken, PA, USA, ASTM Standard D6272-10, 2010. 

- [96] S. Schoenfelder, J. Bagdahn, and M. Petzold, “Mechanical characterisation and modelling of thin chips,” in _Ultra-Thin Chip Technology and Applications_ , J. Burghartz, Ed. New York, NY, USA: Springer-Verlag, 2011, ch. 17, pp. 195–218. 

- [97] S. Takyu, J. Sagara, and T. Kurosawa, “A study on chip thinning process for ultra thin memory devices,” in _Proc. IEEE 58th Electron. Compon. Technol. Conf. (ECTC)_ , May 2008, pp. 1511–1516. 

- [98] S. Chen, I. G. Shih, Y. N. Chen, C. Z. Tsai, J. W. Lin, and E. Wu, “How to improve chip strength to avoid die cracking in a package,” in _Proc. 9th Intersoc. Conf. Thermal Thermomech. Phenomena Electron. Syst._ , 2004, pp. 268–273. 

- [99] W. Sun, W. H. Zhu, F. X. Che, C. K. Wang, A. Y. S. Sun, and H. B. Tan, “Ultra-thin die characterization for stack-die packaging,” in _Proc. IEEE 57th Electron. Compon. Technol. Conf. (ECTC)_ , May/Jun. 2007, pp. 1390–1396. 

- [100] S. Sandireddy and T. Jiang, “Advanced wafer thinning technologies to enable multichip packages,” in _Proc. IEEE Workshop Microelectron. Electron Devices (WMED)_ , Apr. 2005, pp. 24–27. 

- [101] O. Haupt, F. Siegel, A. Schoonderbeek, L. Richter, R. Kling, and A. Ostendorf, “Laser dicing of silicon: Comparison of ablation mechanisms with a novel technology of thermally induced stress,” _J. Laser Micro/Nanoeng._ , vol. 3, no. 3, pp. 135–140, 2008. 

**Michael Raj Marks** received the B.Eng. degree in mechanical and production engineering from the National University of Singapore, Singapore, in 1989. 



He was with Advanced Micro Devices Pte. Ltd., Singapore, from 1989 to 1992, as a Failure Analysis and Reliability Engineer, where he was actively involved in the development of novel failure analysis techniques to address the challenges posed by advanced packaging technologies and materials. From 1992 to 2000, he was a pioneer member of the Institute of Microelectronics, Singapore, where he served as a Project Leader for many industrial research projects in advanced packaging reliability and assembly technologies involving various semiconductor multinational companies. From 2000 to 2007, he headed the Department of Research and Development for advanced packaging development in two semiconductor assembly companies in Malaysia. He was responsible for the startup and engineering qualification for an electroless wafer bumping plant in Malaysia from 2007 to 2008. He has been the Head of the Department of Frontend-Backend Integration with Infineon Technologies (Kulim) Sdn. Bhd., Kulim, Malaysia, since 2008, where he is involved in backend-ofline, preassembly, and assembly processes. He has authored widely in various leading international journals and conferences. His current research interests include ultrathin wafer technology, semiconductor materials characterization, advanced semiconductor packaging, and chip-to-package interactions. 

Mr. Marks has received several prestigious company awards for his work in understanding and resolving quality and reliability issues. 

2057 

MARKS _et al._ : CHARACTERIZATION METHODS FOR ULTRATHIN WAFER AND DIE QUALITY 

**Zainuriah Hassan** (M’05) received the B.Sc. ( _magna cum laude_ ) and master’s degrees in physics from Western Michigan University, Kalamazoo, MI, USA, in 1983 and 1985, respectively, and the Ph.D. degree in experimental condensed matter physics from Ohio University, Athens, OH, USA, in 1998. 



She was a Research Associate with Ohio University from 1997 to 1998, and a Visiting Research Scholar under the Fulbright Program with the Department of Electrical and Computer Engineering, University of Minnesota, Minneapolis, MN, USA, from 2004 to 2005. She was the Dean, Deputy Dean (Academic and Student Development), and Chair of the Engineering Physics Program with the School of Physics, Universiti Sains Malaysia (USM), Penang, Malaysia. She was promoted to Full Professor in 2009, and is attached to the Condensed Matter, Applied, and Engineering Physics Group. She is currently the Director of the Centre for Research Initiatives in Natural Sciences with USM. She has authored over 500 papers in international and national journals and proceedings. Her current research interests include materials growth, characterization, and fabrication of optoelectronic and electronic devices, such as sensors based on III-nitrides (GaN, InN, AlN, and related nitride alloys), and other wide bandgap semiconductors, such as ZnO, CdS, TiO2, CdO, and other metallic oxides. 

**Kuan Yew Cheong** (S’01–M’05) was born in Ipoh, Malaysia, in 1972. He received the B.Eng. (Hons.) and M.S. degrees in materials engineering from Universiti Sains Malaysia (USM), Penang, Malaysia, in 1997 and 2001, respectively, and the Ph.D. degree from the School of Microelectronic Engineering, Griffith University, Brisbane, QLD, Australia, in 2004. 



He was a Project Engineer and Quality Assurance Engineer in a project management company and a semiconductor device manufacturing factory in Malaysia from 1997 to 1999. He joined the School of Materials and Mineral Resources Engineering with USM as a fellow under the academic staff training scheme. He is currently a Full Professor with USM. Outside the university, he is very actively involved in professional and community activities. He has authored over 150 journals and four book chapters. His current research interests include semiconductor device fabrication technology and electronic packaging. 

Dr. Cheong has been an Executive Committee Member of the IEEE Components, Packaging, and Manufacturing Technology Society, and the Malaysian Chapter since 2005. He was the Chairman of the Electronic Engineering Technical Division with the Institution of Engineers Malaysia from 2010 to 2012 and a Council Member of the Institution. He received the Certificate of Teaching and Learning from USM in 2005. 

Dr. Hassan has received several national and international awards and scholarships, and served as a reviewer, jury, and member of various committees. She is currently an Editor of the _Journal of Physical Science_ , and a member of the Materials Research Society, the Optical Society of America, the Fulbright Association, the Malaysian Solid State Science and Technology Society, the Malaysian Institute of Physics, and the National Council of Professor. 

