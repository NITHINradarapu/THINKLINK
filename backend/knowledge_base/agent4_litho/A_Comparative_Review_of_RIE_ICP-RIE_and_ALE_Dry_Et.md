# DOCUMENT: A_Comparative_Review_of_RIE_ICP-RIE_and_ALE_Dry_Et.pdf

Proceedings of CONF-APMM 2025 Symposium: Controlling Robotic Manipulator Using PWM Signals with Microcontrollers DOI: 10.54254/2753-8818/2025.AD26235 

# **_A Comparative Review of RIE, ICP-RIE, and ALE: Dry Etching Technologies for Advanced Semiconductor Fabrication_** 

## **Qiange Ren** 

_School of Engineering, University of Glasgow, Glasgow, United Kingdom 18764594219@163.com_ 

**_Abstract._** As the semiconductor industry continues to evolve rapidly to meet the growing demand for high-performance, low-power chips driven by technologies such as artificial intelligence (AI) and 5G, process nodes have progressed to sub-nanometer scales. This advancement introduces increased challenges in terms of structural complexity, material diversity, and precision requirements. In this context, etching plays a critical role in enabling accurate pattern transfer and the formation of nanoscale structures throughout device fabrication. This paper reviews the development of semiconductor etching technologies by systematically introducing the working principles, key advantages, application scenarios, and inherent limitations of three mainstream dry etching methods: Reactive Ion Etching (RIE), Inductively Coupled Plasma Reactive Ion Etching (ICP-RIE), and Atomic Layer Etching (ALE). Through comparative analysis, ALE demonstrates significant advantages due to its atomic-level precision and low-damage characteristics. The paper highlights ALE’s unique strengths and its potential as a next-generation mainstream etching technology, while also discussing current limitations and future research directions. 

**_Keywords:_** dry etching, reactive ion etching, inductively coupled plasma reactive ion etching, atomic layer etching 

## **1. Introduction** 

As the cornerstone of today’s electronic information industry, semiconductors derive their core value from enabling the production of microelectronic devices and integrated circuits. With the rapid development of technologies such as artificial intelligence and 5G, the demand for highperformance and low-power chips continues to grow, driving steady progress in the semiconductor industry. Moore's Law, as the guiding principle of this process, drives the manufacturing process to approach 3 nanometers and even finer nodes, posing unprecedented challenges to structural design, material selection and processing accuracy [1]. 

Against this backdrop, the fabrication of semiconductor devices involves several critical processes, including material deposition, etching, ion implantation, and doping. Etching plays an irreplaceable and vital role in the overall process flow, as it selectively removes surface materials through physical or chemical means to enable pattern transfer and the construction of nanoscale 

> © 2025 The Authors. This is an open access article distributed under the terms of the Creative Commons Attribution License 4.0 (https://creativecommons.org/licenses/by/4.0/). 

205 

Proceedings of CONF-APMM 2025 Symposium: Controlling Robotic Manipulator Using PWM Signals with Microcontrollers DOI: 10.54254/2753-8818/2025.AD26235 

structures [2]. Conventional wet etching techniques, characterized by their strong isotropy and constrained precision, face challenges in meeting the rigorous demands of advanced process nodes with respect to pattern accuracy and three-dimensional structure control. Conversely, dry etching has gradually emerged as the mainstream approach in modern integrated circuit fabrication, owing to its superior anisotropy, higher etch rates, and enhanced process controllability [3]. 

Among the various methods developed, Reactive Ion Etching (RIE), Inductively Coupled Plasma Reactive Ion Etching (ICP-RIE), and Atomic Layer Etching (ALE) have emerged as the most widely adopted approaches. This article aims to provide a comprehensive overview of these three mainstream dry etching technologies, explore their working principles, core technical characteristics and practical applications, and focus on the challenges encountered in practical applications. In particular, ALE has attracted widespread attention in recent years due to its potential in precise atomic-level etching control, prompting people to conduct more in-depth research on its performance. This article will also evaluate the advantages and limitations of each technology through comparative analysis, and explore the future development prospects of dry etching in the field of next-generation semiconductor manufacturing. 

## **2. Overview of etching techniques and dry etching classification** 

Etching is a critical process in the semiconductor manufacturing industry. The process entails the disruption of chemical bonds at the material's surface through physical or chemical means, thereby enabling atoms or molecules to disengage from the crystal lattice and be selectively extracted. Precise control over etch depth, sidewall profile, surface roughness, and process uniformity is imperative to meet the stringent requirements of advanced chip fabrication [4]. 

In industrial practice, etching techniques are generally divided into two categories: wet etching and dry etching. These differ in mechanisms, equipment, anisotropy, and precision. Wet etching uses liquid-phase chemical reactions under atmospheric pressure, offering cost-effectiveness, ease of operation, and high selectivity. But it lacks directional control and precision, making it unsuitable for features below 1 μm. Dry etching, by contrast, uses gas-phase physical or chemical reactions— typically via plasma or ion bombardment in vacuum—achieving high etch rates and strong anisotropy, ideal for sub-100 nm patterning. Its properties also support automation and mass production. However, issues such as limited selectivity, lower throughput, hazardous gases, and potential plasma damage remain. In advanced semiconductor manufacturing, dry etching has become dominant due to its superior directionality and nanoscale capabilities [2]. From the perspective of etching mechanisms, involves the interaction of gas-phase reactive species such as atoms, ions, or radicals with the material surface. These species are transported to the substrate, adsorbed onto the surface, and subsequently activated by external energy sources to initiate surface reactions. This external energy triggers surface reactions that produce volatile byproducts. These byproducts then desorb, enabling selective removal of the target species. The classification of dry etching is determined by its energy sources and mechanism. The classification system includes the categories of physical, such as ion IBE, chemical, such as plasma etching, and combined, such as reactive ion etching (RIE). In the contemporary technological landscape, where precision demands are on the rise, there is a concomitant interest in novel methodologies such as ALE and neutral beam etching (NBE) [4]. 

Among the various dry etching methods, RIE, ICP-RIE and ALE have emerged as pivotal technologies in contemporary semiconductor manufacturing. This distinction is attributable to their representativeness, extensive applications, and considerable development potential [2]. The ensuing 

206 

Proceedings of CONF-APMM 2025 Symposium: Controlling Robotic Manipulator Using PWM Signals with Microcontrollers DOI: 10.54254/2753-8818/2025.AD26235 

sections offer a systematic review of these three processes, emphasizing their principles, technical advantages, and challenges. 

## **3. Representative dry etching techniques** 

## **3.1. Reactive Ion Etching (RIE)** 

## **3.1.1. Principle** 

RIE is a process that integrates physical sputtering and chemical reactions by employing plasmagenerated ions to deliver kinetic energy to the substrate surface, while reactive species etch the material, enabling precise, anisotropic etching [2]. 

The RIE process is comprised of six different steps: gas introduction, plasma dissociation, diffusion to the substrate, surface adsorption, chemical reaction, and by-product removal. The overall etch rate is constrained by the slowest step in the process. RIE generally utilizes halogenbased gases (e.g., F₂, Cl₂) to generate volatile products that are conducive to the specific material under consideration. A standard RIE system includes a vacuum chamber, mass flow controllers, and a chuck powered by a 13.56 MHz RF generator. The RF field produces low-temperature plasma, which enables directional ion bombardment and chemical etching, thereby rendering RIE suitable for anisotropic pattern transfer in semiconductor fabrication [3]. 

## **3.1.2. Strengths, applications, and limitations of RIE** 

Reactive Ion Etching (RIE) offers several significant advantages that make it widely applicable in semiconductor manufacturing. The material under consideration provides excellent depth uniformity and high mask selectivity. These properties are essential for achieving precise pattern transfer and dimensional control. In comparison with wet etching, RIE generates a reduced volume of chemical waste and functions under more pristine process conditions. The apparatus's compatibility with cassette-to-cassette wafer handling and automation facilitates high-throughput production, rendering it particularly well-suited for industrial-scale manufacturing. These attributes render RIE particularly advantageous in sophisticated applications such as CMOS technology, MEMS fabrication, and other nanoscale integrated circuits [5]. 

Despite its extensive utilization, RIE exhibits discernible limitations. Etch rates frequently decrease with depth due to limited diffusion and by-product buildup, such as in high-aspect-ratio features. Non-uniformity across the wafer can result from plasma distribution or loading effects, leading to depth variations. In addition, lateral etching, undercutting, and aspect ratio-dependent etching (ARDE) have been observed to reduce pattern fidelity and decelerate feature etching. These problems cause the precision and uniformity of RIE at the atomic scale [3]. 

## **3.2. Inductively Coupled Plasma Reactive Ion Etching (ICP-RIE)** 

## **3.2.1. Principle** 

Inductively Coupled Plasma Reactive Ion Etching (ICP-RIE) is a variant of RIE that combines chemical reactions with physical ion bombardment to achieve highly anisotropic etching. In this process, plasma is generated by exciting gases with a 13.56 MHz RF field, producing reactive species such as radicals and ions. Radicals react with the substrate to form volatile by-products, while ions physically remove surface atoms [6]. 

207 

Proceedings of CONF-APMM 2025 Symposium: Controlling Robotic Manipulator Using PWM Signals with Microcontrollers DOI: 10.54254/2753-8818/2025.AD26235 

An ICP-RIE system utilizes two RF power sources: one (P₍ICP₎) sustains plasma, and the other (P₍RIE₎) applies a bias to accelerate ions toward the substrate. The upper coil generates a magnetic field to confine plasma, while the lower electrode directs ion bombardment. This dual-power configuration allows for precise control of ion density, energy, etch rate, and anisotropy, thereby demonstrating ICP-RIE's status as a flexible, high-precision method for advanced semiconductor fabrication [3]. 

## **3.2.2. Strengths, applications, and limitations of ICP-RIE** 

ICP-RIE technology offers several significant advantages, contributing to its widespread use in both micro- and nanofabrication. The system is capable of generating stable, high-density plasma with sufficient ion flux and energy, which is essential for achieving high etch rates and anisotropy. This property enhances etch rates and directional control. The system's inherent bias power facilitates precise calibration of ion energy, thereby ensuring optimal anisotropic etching [3]. ICP-RIE has been shown to offer high material selectivity, which enhances mask durability and ensures compatibility with a wide range of materials. Through the precise modulation of parameters such as gas composition, flow rate, pressure, and RF power, this technique enables the customization of etching processes. Overall, ICP-RIE facilitates the fabrication of high aspect ratio structures, diverse structural profiles, and sidewalls with different angles, thereby meeting the needs of devices such as diodes, transistors, MEMS, and optoelectronics [6]. 

Despite its advantages, ICP-RIE has two key drawbacks. Microtrenching results from ion reflection at sidewalls, forming deep grooves and rough trench bottoms, especially in high-aspectratio structures. Micromasking is caused by non-volatile by-products, mask erosion, or surface contamination, leading to spike-like defects and uneven etch profiles. These issues degrade etch uniformity and sidewall quality, affecting device performance. Therefore, these phenomena pose significant challenges to achieving high-precision, defect-free etching in advanced microfabrication [6]. 

## **3.3. Atomic Layer Etching (ALE)** 

ALE is a precision technique capable of removing material at the atomic layer level. The mechanism of this phenomenon involves repetitive, self-limiting reactions that alternate between chemical adsorption and physical removal [7]. 

The process is comprised of two main steps: In the domain of surface modification, reactive gases (e.g., Cl2 or F2) undergo selective adsorption onto the substrate, thereby forming a selflimiting layer that gradually weakens bonds with underlying atoms. Then, the modified layer is removed via low-energy plasma ion bombardment (e.g., Ar+) or thermal reactions, enabling singlelayer removal while preserving the lattice. In accordance with the mechanisms of removal, ALE is divided into anisotropic plasma ALE, driven by ion bombardment for directional etching, and isotropic thermal ALE, characterized by low-energy thermal reactions and broad material compatibility [7]. To illustrate, in a Cl₂–Ar⁺ ALE system on silicon, Cl₂ forms Si–Cl bonds during the modification process. These bonds are then selectively removed by Ar⁺ ions, resulting in the etching of one atomic layer (see Figure 1). This controllable, stepwise, and anisotropic etching process renders ALE optimal for achieving atomic-level precision in advanced device fabrication [8]. 

208 

Proceedings of CONF-APMM 2025 Symposium: Controlling Robotic Manipulator Using PWM Signals with Microcontrollers DOI: 10.54254/2753-8818/2025.AD26235 



Figure 1. Schematic illustration of a Cl–Ar⁺ ALE process on a silicon surface [8] 

## **3.4. Unique advantages and current limitations of ALE** 

A comparison of ALE with traditional dry etching techniques, such as RIE and ICP, exposes several distinct advantages offered by ALE due to its alternating-reaction-based mechanism. The selflimiting nature of this process ensures that each reaction step halts once surface saturation is reached, thereby enabling atomic-scale etch precision. Instead, RIE and ICP depend on continuous plasma exposure, a process that has the potential to result in over-etching, substrate damage, or inadequate thickness control, particularly for materials of a delicate nature. Also, ALE operates via a cyclic etch mechanism that involves alternating chemical adsorption and physical or thermal desorption. This process has been shown to improve etching uniformity and reduce unwanted side reactions. RIE and ICP, in which chemical and physical processes occur in tandem, frequently encounter challenges such as etch non-uniformity, residue buildup, or micromasking in high-aspectratio structures. Furthermore, synergistic effects between sequential plasma steps in ALE have been demonstrated to enhance surface reactivity and etch efficiency. These characteristics render ALE particularly well-suited for advanced materials, including GaN, AlGaN, InAlN, metal nitrides, and high-k dielectrics. This compatibility facilitates precise patterning in high-performance nanoscale devices [2]. 

Despite the notable benefits offered by ALE, such as enhanced precision and controllability, it is important to acknowledge its inherent limitations. One key challenge is its high sensitivity to ion energy: insufficient energy results in incomplete removal of the modified layer, while excessive energy can cause surface damage and increased roughness. Consequently, ALE processes frequently necessitate optimization for each material, thereby augmenting development complexity and cost [7]. 

## **4. Discussion** 

ALE has become a pivotal technology in advanced device fabrication due to its atomic-scale precision and inherent self-limiting nature. Nevertheless, large-scale industrial adoption remains challenging. High equipment complexity, stringent process conditions, and extreme sensitivity to parameters such as energy and temperature hinder production efficiency. Furthermore, broader material compatibility is required, particularly for heterogeneous and emerging two-dimensional materials. To advance industrial application, future efforts should prioritize reducing system complexity and cost, enhancing etching uniformity and controllability, and developing novel plasma sources and energy regulation methods. Integrating intelligent control strategies, such as machine learning, can enable dynamic process optimization, while seamless integration with downstream processes like atomic layer deposition and packaging will be critical for improving overall manufacturing efficiency. Interdisciplinary collaboration in materials science, plasma physics, and 

209 

Proceedings of CONF-APMM 2025 Symposium: Controlling Robotic Manipulator Using PWM Signals with Microcontrollers DOI: 10.54254/2753-8818/2025.AD26235 

chemical engineering can drive new breakthroughs in ALE, enabling solutions for complex device structures. Emerging applications such as micro-LEDs, quantum chips, and high-speed optoelectronics demand higher accuracy, faster rates, and multifunctional integration. Meeting these challenges will require greener, more sustainable manufacturing approaches to support the transformation of micro-nano fabrication toward environmental responsibility. 

## **5. Conclusion** 

In conclusion, Etching technology plays a fundamental role in modern semiconductor fabrication, directly impacting device performance, yield, and scalability. This review has compared three representative dry etching techniques—RIE, ICP-RIE) and ALE—in terms of mechanisms, capabilities, and application scope. Among them, ALE has emerged as a mainstream technique for advanced node processing due to its atomic-level precision, self-limiting behavior, and low-damage characteristics. 

Despite reviewing the development and advantages of the three major dry etching techniques, this study still has several limitations. First, the discussion mainly focuses on the mechanism-level comparison, without delving into practical manufacturing challenges such as equipment cost, process complexity, throughput, and yield optimization. Second, it does not cover the full range of emerging or niche etching methods, such as Neutral Beam Etching (NBE) and selective etching, which are gaining importance in advanced applications. Third, broader issues like environmental sustainability, integration with backend processes (e.g., ALD, cleaning, packaging), and compatibility with diverse material systems are only briefly mentioned, despite their significant impact on industrial adoption. Future reviews should combine mechanistic analysis with processlevel perspectives to support the continued development and optimization of etching technologies. 

## **References** 

- [1] Kim, D. S., Kim, J. B., Ahn, D. W., & others. (2023). Atomic layer etching applications in nano-semiconductor device fabrication. Electronic Materials Letters, 19, 424–441. https: //doi.org/10.1007/s13391-023-00409-4 

- [2] Lee, T.-Y., Chen, P.-T., Huang, C.-C., & others. (2025). Advances in core technologies for semiconductor manufacturing: Applications and challenges of atomic layer etching, neutral beam etching and atomic layer deposition. Nanoscale Advances, 7, 2796. https: //doi.org/10.1039/D4NA00784K 

- [3] Huff, M. (2021). Recent advances in reactive ion etching and applications of high-aspect-ratio microfabrication. Micromachines, 12(8), 991. https: //doi.org/10.3390/mi12080991 

- [4] Lill, T. (2021). Fundamentals. In T. Lill (Ed.), Atomic layer processing (pp. 7–42). Wiley-VCH. https: //doi.org/10.1002/9783527824199.ch2 

- [5] Ran, S., Wen, K., Xie, L., Zhou, X., Tian, Y., Qiao, S., Shi, F., & Peng, X. (2024). Atomic depth image transfer of large-area optical quartz materials based on pulsed ion beam. Micromachines, 15(7), 914. https: //doi.org/10.3390/mi15070914 

- [6] Racka-Szmidt, K., Stonio, B., Żelazko, J., Filipiak, M., & Sochacki, M. (2022). A review: Inductively coupled plasma reactive ion etching of silicon carbide. Materials, 15(1), 123. https: //doi.org/10.3390/ma15010123 

- [7] Tsai, Y., Li, Z., & Hu, S. (2022). Recent progress of atomic layer technology in spintronics: Mechanism, materials and prospects. Nanomaterials, 12(4), 661. https: //doi.org/10.3390/nano12040661 

- [8] Vella, J. R., & Graves, D. B. (2023). Near-surface damage and mixing in Si-Cl₂-Ar atomic layer etching processes: Insights from molecular dynamics simulations. Journal of Vacuum Science & Technology A, 41(4), 042601. https: //doi.org/10.1116/6.0002719 

210 

