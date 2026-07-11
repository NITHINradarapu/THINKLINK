# DOCUMENT: Metis247721 agent 6.pdf



## Threshold voltage mismatch and intra-die leakage current in digital CMOS circuits 

### Citation for published version (APA): 

Pineda de Gyvez, J., & Tuinhout, H. P. (2004). Threshold voltage mismatch and intra-die leakage current in digital CMOS circuits. IEEE Journal of Solid-State Circuits, 39(1), 157-168. https://doi.org/10.1109/JSSC.2003.820873 

### DOI: 

10.1109/JSSC.2003.820873 

Document status and date: Published: 01/01/2004 

### Document Version: 

Publisher’s PDF, also known as Version of Record (includes final page, issue and volume numbers) 

### Please check the document version of this publication: 

• A submitted manuscript is the version of the article upon submission and before peer-review. There can be important differences between the submitted version and the official published version of record. People interested in the research are advised to contact the author for the final version of the publication, or visit the DOI to the publisher's website. 

- The final author version and the galley proof are versions of the publication after peer review. 

- The final published version features the final layout of the paper including the volume, issue and page numbers. 

Link to publication 

#### General rights 

Copyright and moral rights for the publications made accessible in the public portal are retained by the authors and/or other copyright owners and it is a condition of accessing publications that users recognise and abide by the legal requirements associated with these rights. 

- Users may download and print one copy of any publication from the public portal for the purpose of private study or research. 

- You may not further distribute the material or use it for any profit-making activity or commercial gain 

- You may freely distribute the URL identifying the publication in the public portal. 

If the publication is distributed under the terms of Article 25fa of the Dutch Copyright Act, indicated by the “Taverne” license above, please follow below link for the End User Agreement: 

www.tue.nl/taverne 

#### Take down policy 

If you believe that this document breaches copyright please contact us at: openaccess@tue.nl 

providing details and we will investigate your claim. 

Download date: 08. Jul. 2026 

157 

IEEE JOURNAL OF SOLID-STATE CIRCUITS, VOL. 39, NO. 1, JANUARY 2004 

# Threshold Voltage Mismatch and Intra-Die Leakage Current in Digital CMOS Circuits 

José Pineda de Gyvez _, Member, IEEE,_ and Hans P. Tuinhout 

**_Abstract—_ Due to device and voltage scaling scenarios for present and future deep-submicron CMOS technologies, it is inevitable that the off-state current (** o<sup>**) of MOSFET transistors**</sup> **increases as the technology minimum dimensions scale down. Experimental evidence shows that the leakage current distribution of modern deep-submicron designs not only has a higher mean value but it also presents a larger variability as well. In this paper, we investigate the impact of threshold voltage mismatch as one plausible source for this increased variability. In digital circuit design, it is commonly assumed that the threshold voltage difference (mismatch) of static CMOS cells is negligible. However, threshold voltage mismatch ( ) has a two-sided effect on the off-state current. Namely, the total cell’s current can increase or decrease depending upon the direction of the** t<sup>**mismatchshift.**</sup> **This effect can be so severe that** o<sup>**canincreasebymorethan**</sup> **one order of magnitude with respect to its nominal value due only to mismatch. We further show through experimental results that the mismatch of paired transistors working in the subthreshold regime can be worse by a factor of two as compared to transistors working in the saturation or linear regions. A factor of two larger spread is obviously quite devastating in terms of area, speed, and power consumption, should it be desired to attain the same** o<sup>**level as for a**</sup> **mismatch characterized out of the subthreshold regime.** 

**_Index Terms—_ Leakage current, mismatch, subthreshold, threshold voltage.** 

### I. INTRODUCTION 

N A SEMICONDUCTOR manufacturing environment, it is **I** conventionally assumed that parametric yield is high and stable and that the main yield losses are due to functional failures. Although functional yield remains the main focus of attention, modern and future circuits may not have the presumed high parametric yield [1]. In fact, due to the use of submicron transistor dimensions, modern circuits become quite sensitive to intra-die (process) device variations. Intra-die differences, such as random local fluctuations are often not considered during the circuit design process. Moreover, while the leakage current of modern deep-submicron circuits has increased as expected, we have also noticed that the variance to mean ratio of measured leakage current distributions has increased as well. This is a clear indication of the impact of process variability on modern circuit designs. Unfortunately, many CAD tools or digital design flows cannot take intra-die fluctuations into account. For designs based on low-voltage low-power premises, this can re- 

Manuscript received September 27, 2002; revised July 5, 2003. The authors are with Philips Research Laboratories, 5656 AA Eindhoven, The Netherlands (e-mail: jose.pineda.de.gyvez@philips.com; hans.tuinhout@ philips.com). 

sult in unexpected clock skews, excessive leakage currents, out of spec critical-path delays, etc. 

In this work, we study the above-mentioned leakage current variability in relation to threshold voltage mismatch. Most of the published work on 1 mismatch consists of device and technology characterization and is intended primarily for analog and mixed-signal circuits and systems [2]–[4]. Worth stressing is that while the detrimental effects of mismatch in analog circuits are well described [11], [12], little is known in comparison for digital circuits. Previous works on digital-design variability focus primarily on global effects [13]–[16], i.e., they consider a common augmenting or decreasing value of the nominal . This means that fundamental device limitations such as differences (mismatch) among transistors are not accounted for [6]–[10]. A statistical approach for intra-die variability for critical-path delay analysis was performed in [17], a study of the impact of process variability on leakage current levels was done in [5] and a statistical estimation of a chip’s global leakage current was shown in [31]. Here, we carry out a thorough analytical investigation to demonstrate the effect of mismatch on the leakage current of a single digital cell. Our results explain why for some cases, despite the presence of mismatch, the leakage current can be less than the nominal expected value, or why the leakage current behavior appears to be random. Also, we show that in the presence of mismatch the off-state current can span more than 1.5 orders of magnitude and in some cases the total off-state current of a cell simulated with nominal global parameters can be comparable to that of the same cell employing fast-process devices. The latter result is particularly important for the design and testing of low-power circuits and systems and partly explains the excessive variability of measured leakage distributions. 

Since the transistor’s off-state (leakage) current is due to its operation in the subthreshold domain, it makes sense to investigate the corresponding mismatch in this region as well. The subject of matching of MOS transistors in the subthreshold region has been addressed several times in the literature [18]–[22]. Forti and Wright [20] presented the first fairly qualitative study on drain current mismatch fluctuations for N- and P-MOSTs from four different CMOS processes. Pavasovic _et al._ [18] demonstrated that mismatch characterization in the subthreshold regime can be used as an accurate and powerful technique for CMOS process evaluation. Chen _et al._ [21] studied drain current mismatch for MOSFETs in weak inversion as a function of gate voltage and back-gate bias. They derive a model that relates the drain current mismatch fluctuations in weak inversion to fluctuations of the flat-band 

> 1To simplify the notation, we will henceforth use V instead of V . 

Digital Object Identifier 10.1109/JSSC.2003.820873 

0018-9200/04$20.00 © 2004 IEEE 

158 

IEEE JOURNAL OF SOLID-STATE CIRCUITS, VOL. 39, NO. 1, JANUARY 2004 

voltage and the body effect parameters. Denison _et al._ [22] proposed a prediction of weak inversion drain current mismatch fluctuations based on threshold voltage fluctuations as observed in the strong inversion regime. One of the justifications for this approach is that they claim that measuring mismatch in weak inversion is “a difficult exercise.” They show however, a perfect correlation between calculated weak inversion drain current mismatch fluctuations as based on strong inversion threshold voltage mismatch observations when compared to actual measured drain current mismatch variances. Bastos [19] also observed a good correlation between the mismatch as observed in the weak inversion and the saturation regimes and concluded that one model or characterization technique is sufficient to describe the mismatch behavior of a transistor in all regions of operation. In Section VI we demonstrate, however, that this correlation does not necessarily hold for MOS transistor device architectures in deep-submicron CMOS technologies. By correlating strong inversion mismatch measurements with gate voltage mismatch measurements in deep subthreshold, we demonstrate that off-state current fluctuations can even be significantly larger than what is predicted using conventional modeling approaches. 

### II. SOURCES OF THRESHOLD VOLTAGE VARIABILITY 

In essence, it is possible to identify two sources of variations. One of them due to _global_ manufacturing variations and the other due to _local_ random fluctuations. Let us first illustrate how varies as a function of the transistor size and global process fluctuation. Fig. 1 shows a typical example plot of threshold voltage versus channel length for an arbitrary CMOS 0.18m technology. The three curves correspond to nominal, fast and slow values. Basically, Fig. 1 depicts the typical behavior of the state-of-the-art of deep-submicron devices where the traditional reduction due to short channel effects (SCEs) is partly compensated by local channel implants (pockets) that result in an increase of (reverse short channel effect, or RSCE). In long channel transistors variations are mainly due to _global_ variations on ion implantation dose, gate dielectric thickness, etc. For short channel transistors, on the other hand, variability is predominantly determined by the transistor’s geometries, in particular . Although this is a deterministic phenomenon (physically well understood and properly modeled), for circuit simulation purposes this can be treated as a global variation as well. 

Let us now consider a pair of transistors. Experimental results have shown that there can be random (mismatch) differences between two closely placed “identical” transistors of the order of about 100 V to 100 mV [22]. This is a _local_ effect that becomes extremely important in deep-submicron transistors as the mismatch magnitude is generally observed to be inversely proportional to the square root of the transistor’s area. This local effect is random and is among other things due to a statistical fluctuation of dopant atoms per unit volume [20], [21]. Usually the standard deviation of the mismatch scales with the inverse square root of the active device area. The proportionality constant in mV m units is a characteristic parameter for a technology. A simple rule of thumb to estimate 



Fig. 1. Threshold voltage versus channel length. V = 1:8 V, V = 0:1 . 



Fig. 2. Experimental results for typical threshold voltage distributions of small and big transistors. 

threshold voltage mismatch is to assume a variation of 1 mV m of square root of active area per nanometer of gate-oxide thickness. For a technology with 4 nm of oxide thickness and minimum channel length and width of 0.18 m, this corresponds to a threshold voltage standard deviation of approximately 22 mV. Experimental measurements of threshold voltage due to (global) inter-die variations show that it can be considered as normally distributed with a mean and standard deviation . Threshold voltage mismatch observations based on transistor pairs can be described as well with a normal distribution with mean and standard deviation . We therefore let the latter terms describe the intra-die variations. If we assume that global and intra-die variations are independent, it follows that the total variation of a single transistor can be calculated as [2] 





























with 



















where is a technology conversion constant (in mV m), and denotes the product of the transistor’s active area. The 0.5 factor in (1) arises because only one transistor from the pair is considered at a time. This paper presents results of a 0.18m CMOS process that yields an value of 7 mV m for the NMOS transistors provided they do not operate in the subthreshold regime. Thus, for NMOS transistors with minimum dimensions, e.g., m m, the estimated statistical mismatch is mV. It is worth 



159 

PINEDA DE GYVEZ AND TUINHOUT: THRESHOLD VOLTAGE MISMATCH AND INTRA-DIE LEAKAGE CURRENT IN DIGITAL CMOS CIRCUITS 



Fig. 3. Typical schematics of a digital gate. (a) N and P sections. (b) Two series-connected n-channel transistors in a NAND gate. (c) Two series-connected p-channel transistors in a NOR gate. 

pointing out that is of the order of 30 mV. It follows then that threshold voltage mismatch is very important for deepsubmicron technologies. 

Fig. 2 illustrates the typical inter-die threshold voltage distributions of large and small area NMOS transistors in CMOS18. The spread of is obvious for small area transistors. 

### III. OFF-STATE CURRENT MODEL BASED ON MISMATCH 



The typical schematics of a digital cell consist of either a P-section of parallel connected p-channel transistors with a common node tied to an N-section of series connected n-channel transistors, or _vice versa_ (see Fig. 3). In the absence of transistor tapering, it is expected that the dimensions of the transistors are equal in their corresponding N or P sections. Moreover, in a typical layout, these transistors are closely spaced from each other and hence can be supposed to be _matched_ . Naturally, it is also expected that their intrinsic ’s are the same in either the N or P sections. Also, for purposes of high speed and maximum packaging density, these cells are designed typically with minimum channel length transistors. 

Let us now investigate the role of threshold voltage mismatch on the off-state current of a typical digital CMOS cell. Assume without loss of generality a cell with two inputs. Let us further assume a local random variation in ’s of two transistors M1 and M2, e.g., one arising from fluctuation of random dopant diffusion, dopant clustering, interface states, etc. Since , their mismatch and average values can be expressed as in (3) and (4), respectively: 







































After some algebraic manipulation, it is possible to express individual ’s as a function of their mismatch and average values as indicated in (5) and (6): 













































Based on this definition of mismatch and a common description of subthreshold conduction (after [25]) we can derive an 



Fig. 4. (a) Two series-connected (stacked) NMOS transistors. (b) Two parallelconnected transistors. 

analytical estimation of the leakage current of a CMOS cell, as will be shown next. Without loss of generality, let us consider a series-connected (stack) of NMOS transistors as shown in Fig. 4(a). They could, for instance, be the NMOS transistors of a two-input NAND cell. 

For the circuit of Fig. 4(a), let us further assume that the path from to ground is open and that a current equal to the off-state current of the series-connected transistors is flowing. This off-state current is primarily formed by the subthreshold current since the junction and gate leakage currents are mostly negligible in 0.18m MOS circuits. Let us denote the subthreshold current in the drain of M1 as , and correspondingly, for M2. Making use of a qualitative subthreshold current model based on BSIM [25] and introducing now the mismatch between M1 and M2 as found in (3) and (4), we can express and as follows: 



















































































































































































in which is the drain-induced barrier lowering (DIBL) coefficient, is the linearized body effect factor, is the so-called 

160 

IEEE JOURNAL OF SOLID-STATE CIRCUITS, VOL. 39, NO. 1, JANUARY 2004 

TABLE I 

PARAMETERS FOR ESTIMATING I (0.18- m CMOS PROCESS, W=L = 10 m =0:18 m) 



subthreshold slope ideality factor, is , and is the so-called saturation current given as [25] 

































where is the electron mobility and the gate-oxide capacitance per unit area. Typical values for the previous parameters in a CMOS 0.18m technology are given in Table I for m m. Before proceeding any further, it is worth noting that (7) and (8) predict an off-state current that has high and low values depending upon the shift in mismatch. For equal , one can see that if then and _vice versa_ . 

### _A. Analysis of for -Mismatched Stacked Transistors_ 

Let us return now to the circuit of Fig. 4(a) and consider the following cases: 1) _, ;_ 2) _,_ ; and 3) _,_ . Fig. 5(a) shows simulated results of the off-state current as a function of mismatch obtained through PSTAR, which is an internal SPICE-like simulator that uses Philips’ MOS-9 compact transistor model [26]. Furthermore, simulations were carried out using a full CMOS 0.18m process description. Transistor sizes used in the simulation were m m. For comparison, Fig. 5(b) shows the same qualitative behavior based on (7) and (8). The difference between the two plots arises from the fact that (7) and (8) are simplified models that do not consider all short channel effects. 

Fig. 5 shows the known behavior of many digital cells, i.e., there is an obvious dependence of the leakage current on the cell’s inputs. For nominal conditions, e.g., , the input state that shuts off all the transistors of a digital cell is the one that renders the lowest leakage current; for other input states the off-state current level is simply higher. Putting this aside, what is really new about this plot is the dependence of the leakage current on the mismatch between the cell’s transistors. In the presence of mismatch, i.e., , the cell’s leakage current has a significant spread of approximately 1.5 orders of magnitude. This situation is not uncommon in modern digital ICs since a voltage mismatch of mV amounts to an expected 

tolerance window from the fabrication process, and this is just considering only intra-die variations. Needless to say, the larger this current is, the larger the chip’s power consumption will be. This shows the relevance of threshold voltage mismatch in modern deep-submicron low-power designs. 

The focus of this work is, thus, to understand the leakage behavior of digital cells in the presence of mismatch, such as the one of Fig. 5. In the rest of this section, we will present simulationresultsbasedonthefullCMOSprocessdescriptionandqualitatively explain the results using (7) and (8). Subsequently, we will show simplified analytical solutions of as a function of mismatch for each case study to explain the observed results. 



Fig. 5. Off-state current for different voltages at the inputs of two series-connected transistors simulated (a) using a complete process description of a 0.18- m CMOS technology and (b) using (9) and (10). 

_Case 1: and :_ Observe first that , , and . Notice also that since , there is no channel formed and thus the impedance between drain and source is large, rendering a . For , we have that . Now making and solving for , we have that 































































Notice that this model is valid only for , otherwise becomes negative. Assuming that geometrical variations are negligible, i.e., neglecting the term, and noting that is in the order of , this equation shows that is highly sensitive and directly proportional to . Inserting (10) into (8), we obtain 













































































































































































































(11) 

161 

PINEDA DE GYVEZ AND TUINHOUT: THRESHOLD VOLTAGE MISMATCH AND INTRA-DIE LEAKAGE CURRENT IN DIGITAL CMOS CIRCUITS 



when and , and noting that for small, we will have that the expression within curly brackets can be approximated as a term asymptotically converging to a very small value given by . Because of its small value, this expression dominates the other exponential. Consequently, the total off-state current remains more or less constant for . On the other hand, for the exponential within curly brackets approaches zero and thus its effect is negligible, i.e., we see that the total off-state current is dominated by the mismatch in the other exponential. Despite this mismatch and because of the exponential decaying behavior of the current, the off-state current is lower than the nominal value without mismatch. This is one of the rare situations in which a circuit can benefit from a usually undesired mismatch. 

_Case2: and :_ In this case, observe that and that because there is an inversion layer underneath the gate of M1. Since , it follows that . Thus, we have that . The off-state current of this series connection is primarily due to M2. Substituting into (8), we have 













































































































































The off-state current presents a pure decaying exponential behavior and is largely dependent on the DIBL effect . This nonnegligible contribution causes the asymmetry between cases 2 and 3. Due to the negative sign before , we will find that the off-state current increases as the mismatch shifts from negative to positive values (see Fig. 5). Consequently, we can see that depending upon the mismatch shift, the cell’s offstate current can be found in a very wide range covering more than 1.5 orders of magnitude. This wide range can be deleterious for low-power systems, not to mention the difficulty of attaining such a design. 

_Case 3: and :_ Since , we have that there is an inversion layer under the gate of M2 and thus its output resistance is low. In this case, observe that since , it is expected that as there is a direct path to ground. Thus, we have now that for practical purposes and most of the power supply voltage appears across . The current flowing in the circuit is due to M1, as follows: 



























































































































This expression is similar to (12). However, we can see that the off-state current behaves oppositely due to the positive (see Fig. 5). 

### _B. Analysis of for -Mismatched Parallel Transistors_ 

Consider now the parallel connected transistors of Fig. 4(b). Let us assume that both and are at 0 V. Then the total leakage current is the sum of the leakage current of each transistor. Observe that and . Then using (7) and (8), the total leakage current is obtained as 









































































































































Observe from (14) that when , M1 has a dominant effect because of the exponential nature of the current. The same holds for M2 when . The net result is that parallel networks always exhibit an increase in leakage current when there is a threshold voltage mismatch. Fig. 6 shows the corresponding simulation results. 

### IV. IMPACT OF INTER- AND INTRA-DIE VARIATIONS ON 





To evaluate the implications of the theory derived in Section III-A, it is interesting to compare the results of intra- and inter-die off-state currents for stacked transistors. In-house inspection of wafer maps reveals that devices close to the wafer’s edge have lower ’s and exhibit an obvious die-to-die variation. Therefore, we used a “fast” process as reference for inter-die variations. In our technology, the “fast-process” NMOS transistors have V. The top and bottom windows of Fig. 7 show the results of the nominal and fast processes, respectively. The curves are labeled as 1, 2, and 3 to correspond with each case study of Section III-A. We denote the intersection of the dotted vertical line with the curves of the fast process, at V, as the (worst-case) _inter-die_ off-state current. This is shown for each case through point **_A_** in Fig. 7. A couple of straightforward observations can be made from this plot. For case 1, the difference in off-state currents between the fast and nominal processes is about a factor of 20% at maximal negative mismatch. It can also be seen that this difference is greatly reduced for positive . Case 2 shows a difference of about 50% between inter- and intra-die off-state currents at maximal negative mismatch, and so does case 3. 

The aforementioned results are obvious and were expected. Let us now shift our attention to the plot of Fig. 8(a), which shows the intra-die variations of case 2 for both fast and nominal processes. The plot shows a current of about 150 pA for no 

mismatch for the fast process (inter-die off-state current reference); see point **_A_** . Following the horizontal trace, one can see that this current is equivalent to the off-state current of a nominal process with 85 mV of mismatch (about , calculated 

162 

IEEE JOURNAL OF SOLID-STATE CIRCUITS, VOL. 39, NO. 1, JANUARY 2004 



Fig. 6. I current of two parallel-connected transistors. 



Fig. 7. Off-state current projections versus V mismatch for two seriesconnected NMOS transistors. 

using mV m, based on m m); see point **_B_** . Thus, the level of in a nominal process is quite severe if mismatch is taken into account. Although not shown, a similar behavior was observed for case 3. Let us focus now on the fast process only and take into account the positive mismatch. The plot shows that the off-state current doubles (from 150 pA to about 300 pA) for mismatches equal to 42 mV , calculated using mV m. In other words, if no intra-die variations are considered the typical worst-case inter-die off-state current significantly underestimates the true value. Finally, let us investigate now the case of minimum transistor dimensions. Fig. 8(b) presents simulation results using NMOS transistors of m m. Except for the fact that the subthreshold current is smaller, the same trends as for a transistor of larger width can be observed. We can also see that when mV, the off-state current of the nominal process is comparable to the one of the fast process. However, observe that in this situation, 90 mV corresponds to a deviation of merely , calculated using mV m, rather than the previous . In other words, the impact of mismatch on has almost doubled compared to the one of a transistor with dimensions m m. 





The above examples illustrated the strong dependence of mismatch on modern deep-submicron designs. 



Fig. 8. Off-state current projections versus V mismatch for case 2. (a) W=L = 1:4 m =0:18 m. (b) W=L = 0:28 m =0:18 m. 

### V. STATISTICAL AND EXPERIMENTAL VERIFICATION OF THE OFF-STATE CURRENT 

To substantiate the analytical results of Section III-A and Fig. 5, statistical simulations were carried out to verify the impact of other parameters on the off-state current based on the same circuit of Fig. 3(a) for m m. These simulations involve parameter variations of up to of , , , and some sheet resistances. Results are shown in Fig. 9. Since the scatter plots follow the trends of Fig. 5, we can conclude that variability is indeed a dominant factor. The histograms show the distribution of off-state currents; worth noticing is a common current spread of about 40% with respect to the mean value. These large spreads make it more difficult for designers to keep the IC performance target within a tolerance window. 

### _A. Experimental Verification of Intra-Die Variation_ 

Leakage current measurements were carried out on six identical DSP-like cores within the same test chip. The DSPs have approximately 60 000 gates for a round total of 240 000 transistors. The experiments were done using the standard current measurement features of the Agilent 93000 tester, which has a resolution of 100 nA for 100A measurements. The measurement flow is simple: for each DSP, apply 75 input vectors and log the corresponding leakage current per vector; repeat the procedure 50 times to minimize measurement errors. This flow 

163 

PINEDA DE GYVEZ AND TUINHOUT: THRESHOLD VOLTAGE MISMATCH AND INTRA-DIE LEAKAGE CURRENT IN DIGITAL CMOS CIRCUITS 



Fig. 9. Monte Carlo simulations to estimate intra-die off-state current. Scatter plots present points for off-state current versus V mismatch. Histograms show the corresponding distribution of off-state currents. 

allows us to extract an average leakage current per vector and per DSP with minimized instrumentation error. Two independent sets of 50 measurements were performed for various dies on the wafer. 

Fig. 10(a) shows the normalized leakage current, sorted in ascending order, per vector and per DSP. The normalization is with respect to the average leakage current per DSP. The _min_ and _max_ boundaries were obtained from measuring four fault-free distinct dies. From this figure, one can observe the state dependence of the leakage current, e.g., a different current for each input vector, and a “tolerance window” with the intra-die leakage variations of the DSPs. Fig. 10(b) depicts a die for which, possibly, an excessive mismatch is present in various cells, giving origin to higher leakage currents. The excess in current is small enough to discard the possibility of low-resistance shorts. Observe that the magnitude of the outlying points is comparable to the width of the tolerance band. This excess can be attributed to a mismatch in the cells, such as the one hereby described, and from cell to cell. One can also notice points above and below the tolerance band. This can be ex- 

plained by recalling that the offstate current of a mismatched cell increases or decreases depending upon the mismatch shift and the input state. Let us carry out some simple calculations to infer the number of mismatched cells that would result in a current out of the tolerance window. Let us assume a normalized average leakage current per cell equal to 1/60 000. Let us also assume that there is a group of cells that have a deviation from their mean value, e.g., a hundredth of the average value, and also that they have the same input state. Let us now consider an outlying point with a normalized current of 1.004. A simple arithmetic calculation results in 239 gates with mismatch. This can be interpreted as an equivalent of 239 cells whose effect did not average out with all other cells and that yielded a current deviation of 0.004. The calculated number of cells actually defies the law of probabilities in the sense that if a _strict normal distribution_ of is considered along with a strict _uniform distribution_ of input states, then the number of cells equal or in excess of a deviation is only 162. Nevertheless, the doubt to consider is the possibility of abnormal process shifts, or a nonuniform switching state of the cells. 

164 

IEEE JOURNAL OF SOLID-STATE CIRCUITS, VOL. 39, NO. 1, JANUARY 2004 



Fig. 10. Impact of intra-die variations on leakage current. (a) Expected correct behavior. (b) Intra-die variations of DSPs with leakage out of the tolerance window. 

### VI. EXPERIMENTAL CHARACTERIZATION OF MISMATCH IN THE SUBTHRESHOLD REGIME 

So far, it has been shown that the off-state current variations of a digital cell are strongly affected by random threshold voltage fluctuations. This section demonstrates that fluctuations in deep-submicron transistors can even be significantly larger than what has been modeled and simulated so far. This is done by actually measuring offset fluctuations in the subthreshold regime (near ) as opposed to basing them on extrapolations from mismatch measurements in the strong inversion regime. This approach circumvents extrapolation errors due to limitations or imperfections of the models. Moreover, it can yield additional insights into the transistor behavior as the transistor current fluctuations are not necessarily caused by the same physical phenomena in the different operation regions of the device. As mentioned in Section I, this is in contradiction to some subthreshold MOSFET matching studies reported in the literature [19], [22], but in this section we show 

that certain device architectures can give rise to significantly larger fluctuations in subthreshold than those measured in strong inversion. 

Experimental mismatch fluctuation results, in both strong and weak inversion, were obtained using MOSFET matched-pair test structures that were fabricated in an industrial 0.18m CMOS technology. Ten populations (90 samples each) of matched pairs with a range of device dimensions (see Table II) were measured on a single wafer. Obviously, it is well accepted that any threshold voltage is a rather arbitrary physical quantity. In fact, there is no such thing as a “physical” threshold voltage. The reason the threshold voltage has become such a popular device parameter is that it can be incorporated quite conveniently into threshold-voltage-based compact models and does indeed – allow quite acceptable description of the macroscopic (dc ) device behavior. In the subthreshold regime, however, there is certainly no sensible definition of a threshold voltage, hence we chose to characterize the mismatch fluctuation near by determining the offset between the two transistors of a pair 

165 

PINEDA DE GYVEZ AND TUINHOUT: THRESHOLD VOLTAGE MISMATCH AND INTRA-DIE LEAKAGE CURRENT IN DIGITAL CMOS CIRCUITS 

TABLE II 

THRESHOLD VOLTAGE MISMATCH STANDARD DEVIATIONS IN STRONG INVERSION ( ) AND SUBTHRESHOLD V MISMATCH ( at I = 10 pA =(W=L) ) AND THE CORRELATIONS BETWEEN THE MISMATCH OBSERVATIONS FOR A RANGE OF TRANSISTOR DIMENSIONS 





at a fixed drain current of 10 pA . The relatively low target drain current results in a that is quite close to . Hence, the offset fluctuations that are derived from these measurements are more representative for calculations than those based on extrapolations from strong inversion mismatches. 

In this work, a standard fixed linear region three-point extraction technique was used to characterize the strong inversion mismatch. This method generally provides a well-defined threshold voltage indicator [22], [23]. Subsequently, the same populations of matched pairs were remeasured using a current-based subthreshold offset characterization algorithm. In this algorithm, we applied two gate voltages, respectively, 60 mV above and 60 mV below a target gate voltage that would yield approximately 10 pA drain current (see Fig. 11). The two measured currents with their respective gate biases above and below the target current are subsequently interpolated to a at using logarithmic interpolation. By executing exactly the same procedure for both transistors in a matched pair, a offset at pA can be determined. All measurements (in strong as well as in weak inversion) were performed with 0 V on the substrate. 

The measurement system that was used is based on a standard high-precision semiconductor parameter analyzer (HP4156A) connected to a semi-automatic wafer prober (Cascade-Microtech 12k). The system is capable of characterizing transistor currents down to a level of about 10 fA without any special precautions. The short-term repeatability standard deviation for the strong inversion threshold voltage mismatch measurements is typically better than 200 V. This is more than sufficient to assure that the threshold voltage mismatch fluctuation observations as reported in this paper are not seriously affected by measurement noise. Contrary to what is suggested in [22], the weak inversion mismatch measurement algorithm proves quite easy and performs with good repeatability on our system. The short-term repeatability standard deviation of the mismatch determined using this approach is significantly below 100 V, which also means that the obtained weak inversion -mismatch standard deviations are not significantly affected 



Fig. 11. Example of 2/1 NMOSFET subthreshold characteristics. I = I at V = 0 V . Filled data points are used for the interpolation. Dashed line identifies V for I = 10 pA =W=L (20 pA for this transistor). This V is used in this work to calculate the subthreshold mismatch because it is more appropriate to quantify I fluctuations compared to the V mismatch. 



Fig. 12. Mismatch area scaling graph. Diamonds: strong inversion (linear region) V mismatch. Triangles: subthreshold V mismatch (at 10 pA/square). The 6 mV m and 12.5 mV m lines are estimates for the corresponding area scaling factors for the strong and weak inversion mismatch standard deviations, respectively. 

166 

IEEE JOURNAL OF SOLID-STATE CIRCUITS, VOL. 39, NO. 1, JANUARY 2004 



Fig. 13. Scatter plots of strong inversion V mismatch versus subthreshold V offset for four different transistor populations. Corresponding standard deviations are given in Table II. Note that axes have different scale for each plot. Axes are scaled with 1= sqrt (WL) . Lack of significant correlation indicates that the two mismatch observations are caused (partially) by different physical phenomena. 

by the measurement system. The resulting standard deviations for the mismatch as measured in strong inversion as well as in subthreshold for the experiment described above are listed in Table II. For all device dimensions, it is observed that the -mismatch fluctuations as encountered in the weak inversion regime ( ) are substantially larger than pA what would have been predicted using the strong inversion measurements. This is also depicted in Fig. 12. 

The effective mismatch fluctuation area scaling constants according to (2) were estimated using the devices geometries listed in Table II. For this case (n-channel devices; in a 0.18m CMOS technology), we found a quite acceptable strong inversion -factor of slightly below 6.5 mV m. However, Fig. 12 also shows that when the same populations of transistor pairs are characterized in the subthreshold regime, the corresponding mismatch area scaling factor turns out to be about a factor of two larger! Another noteworthy observation from Table II is associated with the remarkably low correlation factors as given in the last column. These correlation factors are the outcome of calculating the (point-by-point) correlation between the observed ’s and the corresponding ’s from all pairs. Whereas Bastos [19] reported a correlation factor of over 0.8, we found correlations that range from practically uncorrelated ( ) for the larger transistor dimensions to weakly correlated ( ) for the shortest and narrowest transistors. Some examples of these correlations are depicted in Fig. 13. This figure shows scatter plots of the strong inversion threshold voltage mismatches 

versus the corresponding offsets in weak inversion for the and populations of matched pairs. Note that the axes have different scales for each population. The vertically stretched shapes of the four clouds clearly illustrate the larger standard deviations for the 

offset observations as compared to the strong inversion mismatch fluctuations. Moreover, all four clouds clearly demonstrate the weak, down to even nonexisting, correlation between the two different types of mismatch observations. As the measurement repeatability for these measurements is better than a fraction of a millivolt, we cannot but come to the conclusion that the mismatch in strong inversion is (at least partly) due to another physical cause than the one in weak inversion! 

As mentioned in Section I, Denison _et al._ [22] and Bastos [19] observed no major differences between mismatch in the strong and weak inversion regions. In itself, this makes sense from a physical standpoint. Most models for both the threshold voltage and the subthreshold region behavior include the same physical device construction elements such as the channel doping, gate dielectric thickness, effective device dimensions, and mobility. Whereas these lead to fluctuations of the flat-band voltage and the body effect that combine to (strong inversion) threshold voltage fluctuations, the same flat-band voltage fluctuations, combined with fluctuations of the subthreshold swing (also determined by dielectric thickness and body effect), must be held responsible for the offset fluctuations in weak inversion [22]. One could argue, though, that microscopic device architec- 

167 

PINEDA DE GYVEZ AND TUINHOUT: THRESHOLD VOLTAGE MISMATCH AND INTRA-DIE LEAKAGE CURRENT IN DIGITAL CMOS CIRCUITS 



Fig. 14. Example of 2/1 NMOSFET subthreshold characteristics with hump. Different symbols represent measurements at different substrate biases. Dotted lines indicate the “traditional” behavior in absence of STI side channels. 

ture disturbances such as dopant fluctuations do not necessarily have exactly the same quantitative impact on the mismatch as observed in the different operation regions, but then one would at least expect a fair correlation between the two if they are caused by the same physical fluctuation cause. This, in fact, must be the reason why previous studies indeed found such good correlations between mismatch encountered in the subthreshold and strong inversion regimes. It is not the intention of this paper to suggest that these earlier works were wrong. In fact, we have observed similar agreements between subthreshold and strong inversion mismatch standard deviations for several device types in different process generations. On the other hand, it was also not the first time we encountered enhanced subthreshold voltage offset fluctuations, as shown in Table II and Fig. 12. As this paper specifically addresses the impact of fluctuation in a 0.18m CMOS technology that did show these additional fluctuations for the n-channel devices, we decided to pursue this phenomenon further. 

The question thus arises as to which additional device architecture fluctuation can be responsible for the much larger offset fluctuations in the subthreshold regime compared to strong inversion fluctuations in the case discussed in this paper. Although this cannot be proven completely using the information provided in this paper, we believe that these significantly larger fluctuations can be attributed to an effect in modern deep-submicron technologies that is referred to as the “subthreshold hump” [23]. The subthreshold hump can often be distinguished in the MOSFET subthreshold transfer characteristic (see Fig. 14). Instead of a smooth transition from the superthreshold region to the deep-subthreshold region, an additional current contribution can be distinguished. This additional current is generally attributed to the formation of side channels along the shallow-trench-isolation (STI) edges [24]. As exemplified in Fig. 14, these side channels are usually much more visible when a substrate bias is applied to the transistor. Although the hump is not so easily discernible at a substrate bias of 0 V (where the is determined), we think that the –offset fluctuations as encountered in this work suggest that the side 

channels are nevertheless there and, moreover, that they fluctuate significantly! In our opinion, this also explains why we are dealing with an entirely different mismatch mechanism in subthreshold compared to the (channel dopant fluctuation dominated) conventional mismatch, since the contribution of the side channels to the total current is practically negligible in strong inversion. 

The reported experimental subthreshold offset enhancements imply that all discussions on the impact of fluctuations can in practice be severely aggravated due to this additional fluctuation mechanism. It must be realized that due to the square-root area behavior shown in (2), a factor-of-four larger device area is required if a mismatch standard deviation must be reduced by a factor of two. A factor-of-two larger for is quite devastating in terms of area, speed, and power consumption, should the same level be required as for a transistor characterized conventionally in strong inversion. In principle, if the enhanced mismatch in subthreshold is indeed due to the suggested side-channel fluctuations, one could argue that the situation could even be worse. If one would assume that these side channels are independent of the channel width (as might be expected, though not conclusively confirmed in this work), their contribution to the offset fluctuation would rather result in a dependence. This implies that it would not help to increase the width to reduce the fluctuation. Although the standard deviations reported in Table II and Fig. 12 may suggest some enhanced dependence (particularly, the differences between the 2/0.2 and 0.4/1 populations are remarkable), there is not enough evidence in these data to substantiate this suggestion. The exact physical explanation of the observed effects is still a subject of further study. What stands firm, however, are the measurements as summarized in Fig. 12: the offset fluctuations are definitely larger than the mismatch fluctuations! 

### VII. CONCLUSION 

Through experimental and simulation results, we have evaluated the role of threshold voltage mismatch on the off-state current of digital cells. Experimental results show that mismatch characterized in the subthreshold regime can be significantly worse compared to other regions of operation. From the analytical results, the following can be concluded for a stack of transistors: 1) local variations of a fast process render results that are worse than the typical worst-case global variations estimated at V; 2) in a nominal process can reach the levels of its counterpart in a fast process depending upon the amount of mismatch; and 3) downscaling transistor sizes yields a higher dependence of on mismatch ( ). Parallel networks will always present an increment in leakage current. 

### ACKNOWLEDGMENT 

The authors would like to thank B. Kruseman for providing them with the experimental data on leakage current mismatch, and R. van Veen and K. van Kaam for doing the DSP leakage current measurements. 

168 

IEEE JOURNAL OF SOLID-STATE CIRCUITS, VOL. 39, NO. 1, JANUARY 2004 

### REFERENCES 

- [1] D. Schmitt-Landsiedel, “Yield analysis of CMOS IC’s,” in _Proc. Gettering and Defect Engineering in Semiconductor Technology_ , vol. 57, 1997, pp. 327–336. 

- [2] M. J. M. Pelgrom _et al._ , “Matching properties of MOS transistors,” _IEEE J. Solid-State Circuits_ , vol. 24, pp. 1433–1440, Oct. 1989. 

- [3] H. Tuinhout _et al._ , “Matching of MOS transistors,” presented at the Mead Microelectronics, Inc. Advanced Engineering Course, Laussane, Switzerland, Oct. 14, 1998. 

- [4] M. Niewczas, “Characterization of the threshold voltage variation: A test chip and the results,” in _IEEE Int. Conf. Microelectronics Test Structures_ , vol. 10, 1997, pp. 169–172. 

- [5] A. Ferre, “On estimating leakage power consumption for digital CMOS circuits,” Ph.D. dissertation, Universitat Politecnica de Catalunya, Spain, 1999. 

- [6] M. C. Johnson, D. Somasekhar, and K. Roy, “Models and algorithms for bounds on leakage in CMOS circuits,” _IEEE Trans. Computer-Aided Design_ , vol. 18, pp. 714–725, June 1999. 

- [7] Z. Chen, L. Wei, M. Johnson, and K. Roy, “Estimation of standby leakage power in CMOS circuits considering accurate modeling of transistor stacks,” _Proc. Int. Symp. Low Power Electronics and Design_ , pp. 239–244, 1998. 

- [8] R. X. Gu and M. I. Elmasry, “Power dissipation and optimization of deep-submicron CMOS digital circuits,” _IEEE J. Solid-State Circuits_ , vol. 31, pp. 707–713, May 1996. 

- [9] P. C. Maxwell and J. R. Rearick, “Estimation of defect-free IDDQ in submicron circuits using switch level simulation,” in _Proc. Int. Test Conf._ , 1997, pp. 80–84. 

- [10] J. Figueras, “Possibilities and limitations of I testing in submicron CMOS,” in _Proc. IEEE Conf. Innovative Systems in Silicon_ , 1997, pp. 174–185. 

- [11] C. Michael and M. Ismail, “Statistical modeling of device mismatch for analog integrated MOS circuits,” _IEEE J. Solid-State Circuits_ , vol. 27, pp. 154–166, Feb. 1992. 

- [12] M. Pelgrom, H. Tuinhout, and M. Vertregt, “Transistor matching in analog CMOS applications,” in _IEDM Tech. Dig._ , Dec. 1998, pp. 915–918. 

- [13] T. Kuroda, T. Fujita, T. Nagamatu, S. Yoshioka, T. Sei, and K. Matsuo, “A high speed low power 0.3 m CMOS gate array with variable threshold voltage ( V ) scheme,” in _Proc. IEEE Custom Integrated Circuits Conf._ , 1996, pp. 53–56. 

- [14] D. Burnett _et al._ , “Implications of fundamental threshold voltage variations for high-density SRAM and logic circuits,” in _Symp. VLSI Technology Dig. Papers_ , 1994, pp. 15–16. 

- [15] D. Burnet and A.-W. Sun, “Statistical threshold voltage variations and its impact on supply-voltage scaling,” in _Proc. SPIE_ , vol. 2636, pp. 83–90. 

- [16] S. W. Sun and P. G. Tsui, “Limitation of CMOS supply-voltage scaling by MOSFET threshold-voltage variation,” in _Proc. IEEE Custom Integrated Circuit Conf._ , 1994, pp. 267–270. 

- [17] M. Eisele _et al._ , “Intra-die device parameter variations and their impact on digital CMOS gates at low voltages,” in _IEDM Tech. Dig._ , 1995, pp. 67–70. 

- [18] A. Pavasovic, A. G. Andreou, and C. R. Westgate, “Characterization of subthreshold MOST mismatch in transistors for VLSI systems,” _Analog Integrat. Circuits Signal Process._ , no. 6, pp. 75–85, 1994. 

- [19] J. Bastos, “Characterization of MOS transistor mismatch for analog design,” Ph.D. dissertation, K.U. Leuven, Belgium, 1998. 

- [20] F. Forti and M. E. Wright, “Measurement of MOS current mismatch in the weak inversion region,” _IEEE J. Solid-State Circuits_ , vol. 29, pp. 138–142, Feb. 1994. 

- [21] M.-J. Chen, J.-S. Ho, and T.-H. Huang, “Dependence of current match on back-gate bias in weakly inverted MOS transistors and its modeling,” _IEEE J. Solid-State Circuits_ , vol. 31, pp. 259–262, Feb. 1996. 

- [22] M. Denison, A. Pergoot, and M. Tack, “Prediction of MOS matching IN weak AND moderate inversion FROM threshold matching in strong inversion,” in _Proc. Eur. Solid-State Device Research Conf. (ESSDERC)_ , Sept. 1998, pp. 648–651. 

- [23] J. A. Croon _et al._ , “A comparison of extraction techniques for threshold voltage mismatch,” in _Proc. Int. Conf. Microelectronic Test Structures (ICMTS)_ , 2002, pp. 235–240. 

- [24] T. Mizuno _et al._ , “Experimental study of threshold voltage fluctuation due to statistical variation of channel dopant number in MOSFET’s,” _IEEE Trans. Electron Devices_ , vol. 41, pp. 2216–2221, Nov. 1994. 

- [25] K. Nishinohara _et al._ , “Effects of microscopic fluctuations in dopant distributions on MOSFET threshold voltage,” _IEEE Trans. Electron Devices_ , vol. 39, pp. 634–639, Mar. 1992. 

- [26] H. Tuinhout, “Characterization of systematic MOSFET transconductance mismatch,” in _Proc. Int. Conf. Microelectronic Test Structures (ICMTS)_ , 2000, pp. 133–139. 

- [27] H. Brut and R. M. D. A. Velghe, “Contribution to the characterization of the Hump effect in MOSFET submicronic technologies,” in _Proc. Int. Conf. Microelectronic Test Structures (ICMTS)_ , 1999, pp. 188–193. 

- [28] P. Sallagoity, M. Ada-Hanifi, M. Paoli, and M. Haond, “Analysis of width edge effects in advanced isolation schemes for deep-submicron CMOS technologies,” _IEEE Trans. Electron Devices_ , vol. 43, pp. 1900–1906, Nov. 1996. 

- [29] Y. Cheng, M.-C. Jeng, Z. Liu, M. Chan, J.-H. Huang, K. Chen, P. K. Ko, and C. Hu, “A physical and scalable BSIM I – V model for analog/digital circuit simulation,” _IEEE Trans. Electron Devices_ , vol. 44, pp. 277–287, Feb. 1997. 

- [30] MOS Model 9 [Online]. Available: http://www.us-semiconductors.com/ Philips_Models/documentation/mosmodel9/ 

- [31] J. Pineda de Gyvez and E. van de Wetering, “Average leakage-current prediction of CMOS logic circuits,” in _Proc. 19th IEEE VLSI Test Symp._ , Los Angeles, CA, Apr. 2001, pp. 375–379. 



**José Pineda de Gyvez** (S’88–M’90) received the Ph.D. degree from the Eindhoven University of Technology, Eindhoven, The Netherlands, in 1991. 

From 1991 to 1999, he was a Faculty Member in the Department of Electrical Engineering, Texas A&M University, College Station. Since 1999, he has been a Principal Scientist with Philips Research Laboratories, Eindhoven. He was a co-editor of _IC Manufacturability: The Art of Process and Design Integration_ (New York: IEEE Press, 1975). His research interests are in the general areas of design for manufacturability and analog signal processing. 

Dr. Pineda has been an Associate Editor of the IEEE TRANSACTIONS ON CIRCUITS AND SYSTEMS—PART I and an Associate Editor for Technology of the IEEE TRANSACTIONS ON SEMICONDUCTOR MANUFACTURING. 



**Hans P. Tuinhout** received the M.Sc. degree in electrical engineering from Delft University of Technology, Delft, The Netherlands, in 1980. 

Since then, he has been with Philips Research, Eindhoven, The Netherlands, on process and device characterization for silicon CMOS and BiCMOS integrated circuit technologies. His current research activities are focused on high precision dc I – V measurements for characterization of device mismatch. 

