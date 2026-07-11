# DOCUMENT: agent 7 kb3.pdf



Isı Bilimi ve Tekniği Dergisi, 33, 1, 101-109, 2013 J. of Thermal Science and Technology ©2013 TIBTD Printed in Turkey ISSN 1300-3615 

# **FSI ANALYSIS OF WIRE SWEEP IN ENCAPSULATION PROCESS OF PLASTIC BALL GRID ARRAY PACKAGING** 

## **D. RAMDAN*,**<sup>**1**</sup> **C.Y. KHOR* ,**<sup>**1**</sup> **M. ABDUL MUJEEBU*,**<sup>**1**</sup> **M. Z. ABDULLAH*,** 

## 2 **W. K. LOH** and** 2 **C. K. OOI**** 

***** Universiti Sains Malaysia, School of Mechanical Engineering, Universiti Sains Malaysia, Engineering Campus, 14300 Nibong Tebal, Penang, Malaysia, dadan.usm@hotmail.com 

****** Intel Technology Sdn. Bhd., Kulim Industrial Technology Park, Kedah, Malaysia 

(Geliş Tarihi :18.04.2011 Kabul Tarihi:17.10.2011) 

**Abstract:** This paper presents the three-dimensional (3D) fluid-structure interaction (FSI) analysis of wire sweep during the encapsulation process of the plastic ball grid array (PBGA) packaging. 3D model of the mold and wires are created using GAMBIT, and the fluid/structure analysis is simulated using FLUENT and ABAQUS software which integrated with Mesh based Parallel Code Coupling Interface (MpCCI) in real time calculations. The Castro-Macosko model is used to describe the polymer rheology effects and volume of fluid (VOF) method is applied for the flow front tracking. Appropriate user-defined functions (UDFs) are written to model the viscosity and curing kinetics of the epoxy-molding compound (EMC). The wire sweep profile and pressure distribution around the wire region are presented. The numerical results of the flow front patterns and filled volume are compared with the previous experimental results and found in good conformity. Therefore, the strength of MpCCI code coupling in handling the FSI problems is proven to be excellent. 

**Keywords:** Fluid structure interaction, Mesh based parallel code coupling interface, Castro-Macosko model, Epoxy molding compound, Volume of fluid, Wire sweep. 

# **PLASTİK TOPLARIN KAPLANMASI İŞLEMİ SIRASINDAKİ TEL KAYMASININ AKE ANALİZİ** 

**Özet:** Bu makalede, plastik top ağlarının (PBGA) kaplanması işlemi sırasındaki tel kaymasının (deformasyonunun) üç boyutlu (3D) akışkan-katı etkileşimi (AKE) analizi sunulmuştur. Kalıbın ve tellerin 3D modeli GAMBIT kullanılarak oluşturulmuştur ve akışkan/katı analizi gerçek zamanlı hesaplamalarda Mesh based Parallel Code Coupling Interface (MpCCI) ile FLUENT ve ABACUS kullanılarak simüle edilmiştir. Polimer reoloji etkilerini - tanımlamak için Castro Macosko modeli kullanılmış ve akış ön cephe takibi için akışkan hacmi (VOF) yöntemi uygulanmıştır. Viskozite ve epoksikalıplama bileşeninin (EMC) kürleme kinetiğini modellemek için uygun kullanıcıtanımlı fonksiyonlar (UDF) yazılmıştır. Tel kayması profilleri (deformasyonunun) ve tel bölgesi etrafındaki basınç dağılımı sunulmuştur. Sayısal simülasyonlarla belirlenen, ön cephe yapıları ve dolan hacimler, daha önceki deneysel sonuçlar ile kıyaslanmış ve iyi bir uyum içinde olduğu görülmüştür. Bu sonuçlar ile, AKE problemlerinin çözümünde MpCCI kod birleştirmesinin gücünün mükemmel olduğu ispatlanmıştır. 

**Anahtar Kelimeler:** Akışkan katı etkileşimi, Mesh based Parallel Code Coupling Interface (MpCCI), CastroMacosko yöntemi, Epoksi kalıplama bileşeni, Akışkan hacmi, Tel kayması. 

## **INTRODUCTION** 

The continuous reduction of chip size in the modern electronic industry has a significant impact on the circuit design and assembly process of IC packages. Reduced chip size with increased I/O counts result in serious wire deflection during the transfer molding process. If the deformation of wire is too large, it can cause a short circuit due to touching of the adjacent wires or open circuit due to wire break off (Su _et al._ , 2003). Wire sweep has been recognized as one of the major defects in the encapsulation of microelectronic chips during the transfer molding process (Jong _et al._ , 2005). Computer-aided engineering (CAE) has recently 

been applied by many researchers that could obtain excellent predictions on wire sweep problems. 

Yang _et al._ (2001) developed two-way coupling computational technique consisted of a CFD code that computed the transient flow field during molding, and a structural dynamic’s code (FEM-STRESS) that computed the transient deformations and stresses in wires. The proposed technique could describe how wire sweep evolved with time throughout a package.  Su _et al._ (2003) introduced the wire sweep analysis  ‘In-Pack’ that combined global flow analysis (C-MOLD) and structure analysis (ANSYS), and  the results had shown better trend and accuracy than the C-MOLD microchip encapsulation solution. In the integrated CAE of wire sweep proposed by Yang _et al._ (2004), the epoxy- 

molding compound (EMC) flow was calculated by a true 3D thermal flow solver based on a highly flexible prismatic element generation technique; the flow analysis was linked with structure analysis to provide the total solution for wire sweep assessment. Jong _et al._ (2005) implemented the modified C-MOLD reactive molding solution to study the effect of wire density during encapsulation, by controlling the shape factor. The results showed realistic predictions for flow front advancement and wire-sweep phenomena, and well validated by the experiment on a typical high pin-count package (BGA 492L).  Pie and Hwang (2005) studied the effect of wire density by including wires in the mesh model for three-dimensional EMC filling analysis;   the solid mesh models were generated by the stacking method.  A thin small outline package (TSOP) with 53 wires was used as the demonstration example.  Yao _et al._ (2005) conducted experiments to determine the threshold of wire span of 23 μm diameter wire. A 3D finite-element analysis was applied to explain the wire deformation under the action of mold flow. It was found that the wire diameter had a significant role in wire deflection when the loop height and wire span were fixed. A non-sweep encapsulation technology that combined glob top, and conventional transfer molding processes was presented for long wire-span with little wire sweep. 

Ishiko _et al._ (2006) presented the thermoelectric simulation for optimizing the wire bonding position in IGBT (insulated gate bipolar transistor) modules, using the SOLIDIS 3D simulator. They demonstrated the wire-bonding optimizations by the thermoelectric simulation could contribute not only to realize more compact power modules but also to improve the module reliability. Kung _et al_ . (2006) proposed a sweep deflection model based on the evaluation of bending and twisting moments using ANSYS and experiments. The model predicted that the percentages of sweep deflection from the twisting and bending moments depended closely on the ratio of bond height and bond span. They (Kung _et al_ ., 2008) also derived a method to evaluate the sweep resistance of wire bonds and to obtain the load displacement curves. Brand _et al_ . (2008) studied a single die package using MOLDFLOW simulation, and experimenting with different stacking configurations.  The effects of varying loop height, stack height and type of mold compound were quantified in terms of maximum wire sweep induced. The wire sweep could be reduced by reducing the loop height; however, higher stacking of dies increased the wire sweep phenomena. 

In fact, the wire sweep during encapsulation is a typical fluid-structure interaction (FSI) problem. The drag force resulted from the fluid flow caused the wire deformation or normally known as the wire sweep. The use of finite volume method (FVM) for the flow analysis and the finite-element method (FEM) for the structure analysis, coupled with MpCCI was reported in various works (Yigit _et al_ ., 2008; Thiriafay and Geuzaine, 2008; Gatzhammer _et al._ , 2010). However, as far as the 

authors are aware, the use of FSI has not been reported so far in the wire sweep problems. In the present study, a 3D computational analysis is used to predict the wire sweep problems in the plastic ball grid array (PBGA) encapsulation process. The FVM-based and FEM-based software with MpCCI coupling method are utilized as the modeling tools to perform the FSI analysis for the package. The Castro-Macosko model is used to describe the polymer rheology with curing effect in the viscosity behavior of the epoxy-molding compound (EMC).  The program is written in C language has been employed in UDF to calculate the curing kinetics of EMC. The volume of fluid (VOF) technique is also applied to track the flow front of the EMC. Wire sweep profiles and pressure field are analyzed and presented. The EMC flow front advancement and wire sweep phenomena can be visualized simultaneously through this FSI simulation. The simulation results are also compared with the previous experimental results available in literature and found in good agreement. 

## **GOVERNING EQUATIONS** 

## **Fluid Flow Analysis** 

In the encapsulation process, the EMC and air are treated as the two phases. They are assumed as incompressible and laminar. The governing equations describing the fluid flow are the conservation of mass, conservation of momentum and conservation of energy, as listed below: 

The conservation of mass or continuity equation in generalized terms: 



Conservation of momentum in _i_ -th direction in an inertial (non-accelerating) reference frame is described by: 



where, _ρ_ is the density, _u_ is a velocity vector, _p_ is the static pressure, _τij_ is the viscous stress tensor and _gi_ and _Fi_ are the gravitational acceleration and external body force in the _i_ direction, respectively. 

The energy equation cast in terms of _h_ (static enthalpy) can be written as, 



where, _k_ is the thermal conductivity, _T_ is the absolute temperature, and Φ is the energy source term. However, a modification in the conservation of energy has been made by inserting energy source term and two 

102 

contributions of polymer properties. The energy source term, Φ is as follows: 



where, _η_ is the viscosity and  is the shear rate the source. 



The EMC is assumed to be a generalized Newtonian fluid (GNF). The Castro-Macosko model (Yang _et al_ . 2001; Nguyen _et al._ , 2000) is used for predicting the relationship between viscosity and the degree of polymerization was applied to describe the viscosity of EMC: 



_B_ is an exponential-fitted constant, _Tb_ is a temperature fitted-constant, _n_ is the power law index, _ηo_ is the zero shear viscosity and _τ_<sup>_*_</sup> is the parameter that describes the transition region between zero shear rate and power law region of the viscosity curve, is the chemical conversion of reaction, _α_ g is the conversion at the gel point and _C1_ and _C2_ are fitting constants. 

Kamal’s equation (Yang _et al_ . 2001; Nguyen _et al._ , 2000) is coupled with Castro-Macosko model in this study. The rate of chemical conversion of the compound of this model is predicts as follows: 

|**Table 1.**Material<br>analysis(Nguyen_e_|properties of EM<br>_t al_.,2000).<br>Parameter|C used in the<br>Value|mold filling<br>Unit|
|---|---|---|---|
|Castro Macosko<br>Model|_αg _<br>_B_<br>_Tb_<br>_n_<br>_τ_<br>_C1_<br>_C2_<br>_m1_|0.17<br>0.000381<br>5230<br>0.7773<br>0.0001<br>1.03<br>1.50<br>1.21|-<br>kg/m/s<br>K<br>-<br>N/m<sup>2</sup><br>-<br>-<br>-|
|Curing Kinetics|_m2_<br>_A1_<br>_A2_<br>_E1_<br>_E2_<br>_α_|1.57<br>33530<br>30540000<br>7161<br>8589<br>0.05|-<br>1/s<br>1/s<br>K<br>K<br>-|
|Density|_ρ_|2000|kg/m<sup>3</sup>|
|Specific Heat|_Cp_|1079|J/kg-K|
|Thermal<br>Conductivity|-|0.97|W/m-K|
|Reference<br>Temperature|_T_|298|K|



**Table 1.** Material properties of EMC used in the mold filling analysis (Nguyen _et al_ ., 2000). 

Thus, _f_ takes the value of 1 ( _f_ = 1, represent in red color) in cell, which contains only resin, the value 0 ( _f_ = 0, represent in white color) in cells, which are voids of compound, and a value between 0 and 1 (0< _f_ <1) in “interface” cells or referred as the EMC flow front. 

The EMC flow front over time is governed by the following transport equation: 



The momentum equation used in FEM (ABAQUS) for solving the structural deformation as: 





where and are Arrhenius pre-exponential factors, and are the activation energies, _m1_ and _m2_ are the reaction orders. Table 1 summarized the material properties of the EMC considered in the current study. 

The function of VOF scheme is to locate and evolve the distribution of the liquid phase by assigning for each cell in the computational grid a scalar, _f_ , which specifies the fraction of the cell’s volume occupied by the EMC. 

where, is density of solid, is velocity of solid in _x, y_ and _z_ axis, is recoverable stresses and is gravitational acceleration. 

## **Wire Sweep Analysis** 

The drag force exerted on the wire by the EMC flow can be calculated using the Lamb’s model, the value of velocity and viscosity has been determined from the mold filling simulation. Then, the Lamb’s model is described as (Su _et al._ , 2003; Pei and Hwang, 2005; Han and Huh, 2000): 

(13) where _D_ is the drag force per unit length, _ρ_ is the fluid density, _U_ is the undistributed  upstream velocity, d is the wire diameter and _CD_ is the drag coefficient can be 

103 

determined by (Su _et al._ , 2003; Pei and Hwang, 2005; Han and Huh, 2000): 



where Re is the Reynolds number. 

In order to assist the designer of a wire profile to obtain a reasonable allowed sweep, a sweep deflection model based on the contribution of the bending and twisting moments have been proposed by Kung _et al_ . (2006). According to the model, the sweep deflection of a wire bond δ can be calculated using: 



where _S_ is the length of the wire bond, _fB_ is the bending geometry factor for the bending moment, _fT_ is the twisting geometry factor for the twisting moment, _H_ is the height of wire, _L_ is the length of wire span, _G_ is the shear modulus of wire, _E_ is the elastic modulus of wire, _I_ is the momentum of inertia of the wire, _Ip_ is the polar momentum of inertia of the wire. 

## **NUMERICAL SIMULATION** 

## **Simulation Model and Boundary Conditions in FLUENT** 





**Figure 1.** Boundary conditions for FLUENT analysis. 

The VOF equation in FLUENT 6.3.26 is utilized to simulate the encapsulation process (Khor _et al._ , 2010a; Khor _et al._ , 2010b). In the VOF, a single set of momentum equations is shared by the fluids, and the volume fraction of each of the fluids in each computational cell is tracked throughout the domain (Khor _et al._ , 2010b). Air and EMC are defined as the phases in the analysis. Implicit solution and time dependent formulation is applied for the volume fraction in every time step. The volume fraction of the EMC is defined as one and zero value for air phase. 

The programme was written in C language in order to consider the Castro-Macosko viscosity model with curing kinetics using Microsoft VISUAL Studio 2005 and compiled as an UDF in FLUENT code. The mold cavity used, and the boundary conditions set up are shown in Figure 1. The dimension of mold cavity and die are 100 mm x 100 mm x 4 mm and 30 mm x 30 mm x 1 mm (Han and Huh, 2000), respectively. The dimension of the inlet gate is 8 mm x 8 mm used in the present study. The flow direction is diagonal of x and z directions to the un-deformed wire axis, and the properties are approximately the same as those used by previous work (Han and Huh, 2000). The model is created by using GAMBIT software and meshed with the tetrahedral elements of 395,000 (Figure 2) for better accuracy and computational cost. In the present modeling, the wire consists of surfaces of the ball bond and wire body. The total unstructured meshing of the 



**Figure 2.** Meshed model for FLUENT analysis of two outlet vents. 

face elements for wire surface and ball bond are 1466 and 28 respectively. The total unstructured mesh of cavity is 5 nodes along the thickness and 75 nodes along the edges. 

In addition, the time step size is also tested and 0.001 s is found to be the optimum. The governing equations are discretized by the first-order upwind scheme, and solved by the SIMPLE algorithm to save the computational cost. The boundary and initial conditions used in the calculation are as follows (Khor _et al._ , 2010b): 

104 

- (a) On Wall : 

(b) On centre line : 

(c) On melt front : _p_ = 0 

(d) At inlet : _v_ = _vin_ ( _x,y,z_ ); _T_ = _Tin_ 

The mold temperature was heated to 175<sup>o</sup> C and the package inlet velocity was 0.6 mm/s. The simulation is performed on an Intel Core 2 Duo processor E7500, 2.93 GHz with 2 GB of RAM. The calculations took around 74 hours for each case to complete 15,000 iterations for a time step of 0.001 s. 

## **Wire Model and Boundary Conditions in ABAQUS** 

A FEM based software ABAQUS is used in this study to calculate the wire deformation. The structures of the wires are imported from the GAMBIT in ACIS ‘.sat’ format. The dimension of the wire is built according to Yang _et al._ , (2000). The wire bond span has a length, _L_ = 20 mm and wire height, _H_ = 3.5 mm. The wire bond is divided into 10,191 tetrahedral elements as shown in Figure 3. The shape of the wire also classified as typical Q-auto loop wire bond (Brand _et al_ ., 2008). The ball bond boundary conditions of wire are set as fixed in ABAQUS as shown in Figure 3. The wires mechanical properties used are: elastic modulus, _E_ =50 GPa (Yang _et al_ ., 2004), density, ρ=1800 kg/m<sup>3</sup> , Poisson’s ratio, _ν_ = 0.42 and reference temperature, _T_ =175°C. 



**Figure 3.** Boundary condition of wires and Meshed wire for ABAQUS analysis. 

## **Code Coupling with MpCCI** 

In the present study, the fluid-structure interaction during the encapsulation process is visualized by using the virtual model that created and simulated in FLUENT and ABAQUS codes. During the simulation analysis, the two ways coupling method is implemented parallel for FSI as shown in Figure 4. The pressure data generated from the flow (FLUENT) is transferred to ABAQUS for structure analysis by MpCCI. The deformation of the structure in ABAQUS will give the feedback to the flow analysis in the FLUENT in the real time calculations. The deformed wire bonds may cause unstable on the flow front profile.  The extreme deformation of wire bond during the encapsulation process could cause failure for the package during the process due to the short circuit problem. Therefore, the deformation of wire bonds during the encapsulation is also crucial for the packaging design. 



**Figure 4.** Data exchange from FLUENT and ABAQUS by MpCCI. 

## **RESULT AND DISCUSSION** 

Figure 5 illustrates the flow front advancement for the PBGA package obtained from FLUENT and the phenomenon of wire deformation as predicted by ABAQUS. At initial filling stage for two outlets vent as shown in Figure 5(a), no wire deforms is observed. However, the wire starts to deform when EMC fills and covers the die. The interaction of EMC flow and solid surface of the wire caused the wire sweep phenomenon. The deflection of the wire is clearly observed at wires 1 and 4 (which nearer to the inlet gate) just after the EMC flow passed the wires. In Figure 5(b), the slightly deformation was observed when wires 2 and 3 covered by EMC in the encapsulation. Figure 5(c) illustrates the detail view of initial and deformed wires in an isometric view. 



**Figure 5.** (a) Initial filling stage, (b) Fluid flow and wire sweep profile in top view and (c) Wire deformation profile in isometric view (two-outlet vent configuration). 

Figure 6 shows the locations of pressure measurement for each wire during the encapsulation process. Figure 7 shows the corresponding plot as a function of time. The increase in pressure is due to the presence of EMC. The pressure distribution trends for P1 and P4 are identical to those of P2 and P3. During the filling time 3s to 6s, the pressures at P1 and P4 are higher than those at P2 and P3 because at this period the EMC covers only the locations P1 and P4. The pressures at P2 and P3 increase gradually from 6 to 11s compared to P1 and P4. After 11s the pressures P1 to P4 are found almost similar. 

105 



**Figure 6.** Location of measured pressure. 



**Figure 7.** Pressure distribution at P1, P2, P3 and P4 of two outlet vents. 



**Figure 8.** Detailed top view of wire deformation profile of two outlet vents. 

It is observed that the pressure directly influences the wire deformation, and the drag force is acting on the wire structure during the filling process. The drag force does influence the wire deformation as shown in Figure 8. The maximum deformation is concentrated around the middle of wire; it is obvious for the wires 1 and 4. 

Figure 9 shows the wire deflection in x, y and z directions for wires 1 and 2 of two-outlet vent arrangement. The deflection has been calculated at Point A (Figure 10). It can be clearly understood that the wires deformed to the horizontal (x) and vertical (y) axes (Yao _et al._ , 2005). For the wire 1, the deformation is the tendency in the z- 



**Figure 9.** Wire deflections in x, y and z direction for wires 1 and 2 of two outlets vent arrangement at Point A. 

106 

direction and wire 2 in the x-direction respectively. The comparison of deflection magnitudes of wires 1 to 4 are shown in Figure 11(d). It is found that wire 4 has the highest deflection in the x-direction (Figure 11(a)). However, wire 1 has larger deflection in y and z directions as shown Figures 11(b-c). These deflections are due to the positioning of wire and the directions of wire bond span. In Figure 11(d), wires 1 and 4 show, higher deflection compared to wires 2 and 3. This is due to their orientation and the direction of EMC flow during the encapsulation process. 



**Figure 10.** Measurement of wire deflection at Point A. 









**Figure 11.** Comparison of four wire deflection for two outlets vents in (a) x-direction, (b) y-direction, (c) z-direction and (d) Magnitude for all wires. 

## **MODEL VALIDATION** 

The present simulation results of EMC flow are validated with the experimental results of Yang et al. (2000) who investigated the flow behavior of EMC (D.E.R.331, Dow Chemical) in the encapsulation process. The wire deflection is validated with the analytical result that calculated using Eq. (15) as proposed by Kung _et al_ . (2006). 

Figure 12 shows the comparison of predicted and experimental flow profiles of the PBGA encapsulation process from 4 to 10 s. The simulation results show the wire and EMC flow profile in line contour is presented at different filling time. The predicted EMC flow profiles show good agreement with the experimental results for all time steps. Wire deflection phenomenon also has been observed when the EMC flow around the wire region. The EMC filled volume versus filling time for the simulation, and the experiment of the encapsulation process is plotted in Figure 13. The maximum discrepancy is found to be 6.7 %. 

The comparison of simulation and analytical results of wire deflection for wire 4 in the x-direction is shown in Figure 14. In the analytical calculation, the values of _fB_ and _fT_ used are 0.165 and 0.00165 respectively for _H_ / _L_ = 0.175 (Kung _et al_ ., 2006). The average deviation at maximum deflection (after 9 s) is found to be 6.5 %. The simulation demonstrates in good agreement with analytical results. 

Detailed view of Von-Mises stress distribution for wire 1 in maximum deflection is shown in Figure 15. The result demonstrates that the highest stress is around the fixed boundary, especially near to the ball bond. This means the wire sweep deflection is dominated by the twisting moment instead of the bending moment, similar results have been observed by the previous work (Kung _et al_ ., 2006). 

## **EFFECT OF THE NUMBER OF OUTLET VENTS** 

Figure 16 is shown the effect of the number of outlet vent on the wire deflection. The results show that the deflection of all wires is lower for four outlet vent compared to two outlet vent arrangements. The results illustrated the drag force induced by the EMC flow is lower for the case of four outlet vent arrangement. The lower the drag force will provide less stress concentration on the wire and will reduce the tension on the wire. Thus, number of outlet vents does influence on the wire deflection during the encapsulation process. 

The results also shown the wires 2 and 3 has lower deflection compared to the wires 1 and 2 since the locations of wires 2 and 3 are behind the silicon die. The wires 1 and 4 are located near to the inlet gate have experienced higher induced drag force, thus, both wire has higher stress concentration. The phenomena will help the engineers to decide the appropriate location for the wire in order to avoid the wire overlap that might 

107 

cause a short circuit or failure during the encapsulation process. 



**Figure 12.** Comparison of simulation and experimental results (Yang _et al._ , 2000) for wire deformation and EMC flow profiles of two outlet vent. 



**Figure 14.** Comparison simulation and analytical results of wire deflection for wire 4 in x-direction. 



**Figure 15.** Detailed view of Von-Mises stress distribution for wire 1 of two outlet vents. 



**Figure 16.** Number of outlet vents effect to wire deflection. 



**Figure 13.** Comparison of EMC filled volume for experiment (Yang _et al._ , 2000) and simulation. 

## **CONCLUSION** 

The simulation of wire sweep phenomena during the PBGA package encapsulation process was presented, and a three-dimensional (3D) computational prediction of FSI has been investigated. The effects of outlet vent arrangements on the wire sweep have been studied. The wire sweep profiles have been validated by analytical calculations with 6.5% of maximum deviation. The results also show the four outlet vent arrangement is found to be lower on the wire deflection compared to the two outlet vent. The numerical results of flow front patterns and filled volume were compared with the previous experimental results and found in good agreement. The proposed method of MpCCI Code Coupling in handling FSI on the wire sweep during the encapsulation process is proven to be excellent. This present work is expected to be a reference and guideline for improvement and design consideration in microelectronics industry. 

108 

The future works will focus on the evaluation of various parameters inputting these correlations into an analytical numerical model in order to predict the maximum wire deflection. 

## **ACKNOWLEDGEMENTS** 

The authors gratefully acknowledged the Intel Tech. Sdn. Bhd., Penang for the financial support of this research work. The author would also like to thank DGHE National Education Dept. RI for the scholarship of PhD Program. Lastly, the author would also like to thank M. N. Abdul Hamid, M. K. Abdullah and M.F.M.A. Majid for the technical software advices in the present study. 

for microelectronic packaging, _Microelectronic Engineering_ , 85, 1902-1909. 

Nguyen L., Quentin C., Lee W., Bayyuk S., BidstrupAllen S. A. and Wang S. T., 2000, Computational modeling and validation of the encapsulation of plastic packages by transfer molding, _Transaction of the ASME_ , 122, 138-146. 

MpCCI 3.1.0-1 Documentation part I overview, Fraunhofer Institute for Algorithms and Scientific Computing SCIA, Germany, January 2009. 

Pei C-C. and Hwang S-J., 2005, Prediction of wire sweep during the encapsulation of IC packaging with wire density effect, _J. Electronic Packaging_ , 127, 335-339. 

## **REFERENCES** 

Brand J. M., Ruggero S. A. and Shah A. J., 2008, Wiresweep reduction via direct cavity injection during encapsulation of stacked chip-scale packages, _Journal of Electronics Packaging_ , 130, 011011-(1-6). 

Gatzhammer B., Mehl M. and Neckel T., 2010, A coupling environment for portioned multiphysics simulations applied to fluid-structure interaction scenarios, _Procedia Computer Science_ , 1,.681-689. 

Han S-J. and Huh Y-J., 2000, A study of wire sweep during encapsulation of semiconductor chips, _Journal of the Microelectronics and Packaging Society_ , 7, 4, 17-22. 

Ishiko M., Usui M., Ohuchi T. and Shirai M., 2006, Design concept for wire bonding reliability improvement by optimizing position in power devices, _Microelectronics Journal_ , 37, 262 - 268. 

Jong W. R., Chen Y. R. and Kuo T. H., 2005, Wire density in CAE analysis of high pin count IC packages: Simulation and verification, _Int.Communications in Heat and Mass Transfer_ , 32, 1350-1359. 

Khor C. Y., Abdullah M. K., Abdullah M. Z., Abdul Mujeebu M., Ramdan D., Majid M. F. M. A. and Ariff Z. M., 2010a, Effect of vertical stacking dies on flow behavior of epoxy molding compound during encapsulation of stacked-chip scale packages, _Heat Mass Transfer_ , 46, 1315-1325. 

Khor C. Y., Abdul Mujeebu M., Abdullah M. Z. and Che Ani F., 2010b, Finite volume based CFD simulation of pressurized flip-chip underfill encapsulation process, _Journal of Microelectronics Reliability_ , 50, 98-105. 

Kung H-K., Lee J-N. and Wang C-Y., 2006, The wire sweep analysis based on the evaluation of the bending and twisting moments for semiconductor packaging, _Microelectronic Engineering_ , 83, 1931-1939. 

Kung H-K., Sun Y-P., Lee J-N. and Chen H-S., 2008, A method to determine the sweep resistance of wire bonds 

Scheiber A., Metsch T. and Kersken H-P., 2005, A problem solving environment for multidisciplinary couple simulations in computational grids, _Future Generation Computer System_ , 21, 942-952. 

Su J., Hwang S-J., Su F. and Chen S-K., 2003, An efficient solution for wire sweep analysis in ic packaging, _Journal of Electronic Packaging_ , 125, 139-143. 

Thirifay F. and Geuzaine P., 2008, Numerical simulations of fluid-structure interaction problem using MpCCI, [online] Available: <u>http://mecanique.in2p3.fr/JUsamtech/proceedings/03_16_CENAERO_Delanaye/03_ 16_CENAERO_Delanaye.pdf</u> 

Wolf K., 2007, MpCCI the general code coupling interface, LS-DYNA Anwenderforum, Frankenthal, IT/CAE Prozesse, Fraunhofer Institute SCAI, Schloss Birlinghoven, Germany, pp. 1-8. 

Yang S-Y., Jiang S-C. and Lu W-S., 2000, Ribbed package geometry for reducing thermal warpage and wire sweep during PBGA encapsulation, IEEE Transactions on Components and Packaging Technologies, Vol. 23, No.4, pp. 700-706. 

Yang H.-Q., Mazumder S., Lowry S., Krishnan A., Przekwas A. and Nguyen L., 2001, Time accurate, 3-D computation of wire sweep during plastic encapsulation of electronic components, _J. Pressure Vessel Technology_ , 123, 501-509. 

Yang W-H., Hsu D.C., Yang V., Chang R-Y., Su F. and Huang S-J., 2004, Three dimensional CAE of wiresweep in microchip encapsulation, _Technical Conference-ANTEC_ , Conference Proceeding, Brookfield, USA, 2, 1679-1683. 

Yao Y. F., Njoman B., Chua K. H. and Lin T. Y., 2005, new encapsulation development for fine pitch IC devices, _Microelectronics Reliability_ , 45, 1222 - 1229. 

Yigit S., Schafer, M. and Heck M., 2008, Grid movement techniques and their influence on laminar fluid-structure interaction computations, _Journal of Fluids and Structures_ , 24, 819-832. 

109 

