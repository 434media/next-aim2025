export interface Presenter {
  id: string
  title: string
  authors: string
  category: string
  institution?: string
}

// Categories for filtering
export const categories = [
  "All Categories",
  "Airway Management",
  "Clinical Investigation",
  "Dental Research",
  "Emergency Medicine",
  "Emerging Technologies",
  "Environmental, Occupational Health & Safety",
  "Health Systems Research",
  "Human Performance",
  "Infectious Diseases",
  "Maternal Health",
  "Medication Use Evaluation",
  "Medication Utilization Review: Medication Safety",
  "Mental Health/Sleep",
  "Neuroscience",
  "Noise and Blast Exposure Effects on Hearing",
  "Nursing Research",
  "Pain Research",
  "Radiation Countermeasures",
  "Regenerative Medicine and Biomaterials",
  "Spinal Cord Injury",
  "Trauma Research",
  "Traumatic Brain Injury",
]

// Institutions for badges
const institutions = [
  { name: "Brooke Army Medical Center", color: "bg-blue-100 text-blue-800" },
  { name: "U.S. Army Institute of Surgical Research", color: "bg-green-100 text-green-800" },
  { name: "University of Texas at San Antonio", color: "bg-purple-100 text-purple-800" },
  { name: "UT Health San Antonio", color: "bg-indigo-100 text-indigo-800" },
  { name: "59th Medical Wing", color: "bg-sky-100 text-sky-800" },
  { name: "Texas Biomedical Research Institute", color: "bg-amber-100 text-amber-800" },
  { name: "The Geneva Foundation", color: "bg-rose-100 text-rose-800" },
  { name: "The Metis Foundation", color: "bg-emerald-100 text-emerald-800" },
  { name: "Lincoln Memorial University", color: "bg-yellow-100 text-yellow-800" },
  { name: "United States Air Force", color: "bg-cyan-100 text-cyan-800" },
  { name: "Wilford Hall Ambulatory Surgical Center", color: "bg-teal-100 text-teal-800" },
  { name: "University of Colorado School of Medicine", color: "bg-orange-100 text-orange-800" },
]

// Complete presenters data from the document
export const presentersData: Presenter[] = [
  // Airway Management
  {
    id: "airway-1",
    title:
      "Beyond the Tube: A Survey of Healthcare Provider Knowledge, Confidence, and Decision-Making for Airway Management in Military Prolonged Field Care",
    authors: "Jacob Provencio, Don Petersen, R. Lyle Hood, Connor J. Evans, Robert A. De Lorenzo",
    category: "Airway Management",
    institution: "University of Texas at San Antonio, UT Health San Antonio",
  },

  // Clinical Investigation
  {
    id: "clinical-1",
    title:
      "An Assessment of Laboratory Changes During Autologous Whole Blood Transfusion Training: A Prospective, Observational Study",
    authors:
      "Dayana Sifuentes, Fabiola Mancha, Melody A. Martinez, Jessica Mendez, Rocio J. Huaman, Brian J. Kirkwood, Michael A. Meledeo, Allyson A. Arana, Andrew D. Fisher, Jason B. Corley, Juliette M. Conte, Michael D. April, Ian L. Hudson, Steven G. Schauer",
    category: "Clinical Investigation",
    institution: "U.S. Army Institute of Surgical Research, The Metis Foundation, Brooke Army Medical Center",
  },
  {
    id: "clinical-2",
    title:
      "Comparing IV Securement Devices and Tape-Based Securement in Preventing IV Infiltration in Pediatric Patients at Brooke Army Medical Center",
    authors: "Kathryn McClure, Sadie Murphy",
    category: "Clinical Investigation",
    institution: "Brooke Army Medical Center",
  },
  {
    id: "clinical-3",
    title:
      "Experiences of Clinicians Caring for Patients Receiving Continuous Physiological Monitoring in a Remote Location",
    authors:
      "Mamie Tilbury, Lance J. McGinnis, Stephanie J. Raps, Angela K. Phillips, Rebecca E. Heyne, Patricia A. Patrician",
    category: "Clinical Investigation",
    institution: "59th Medical Wing, Air Force Medical Command, University of Alabama at Birmingham",
  },
  {
    id: "clinical-4",
    title: "Exploring Early Onset Parkinson's Disease: A Retrospective Chart Review of Active-Duty Military Personnel",
    authors:
      "Margaux M. Salas, Victoria T.P. Nguyen, Jessie R. Jacobsen, Christian J. Hernandez-Zegada, Zahari N. Tchopev, Elijah Miranda, Matthew Brock, William R. Hoffman",
    category: "Clinical Investigation",
    institution:
      "59th Medical Wing, Brooke Army Medical Center, Wilford Hall Ambulatory Surgical Center, The Geneva Foundation",
  },

  // Dental Research
  {
    id: "dental-1",
    title: "Exploring the Relationship Between Periodontal Diseases and Osteoporosis: Potential Role of Butyrate",
    authors: "Steven Quintero, Amal M. Sahyoun, Ammaar Abidi, Karima Ait-Aissa, Modar Kassan, Undral Munkhsaikhan",
    category: "Dental Research",
    institution: "Lincoln Memorial University",
  },
  {
    id: "dental-2",
    title: "Influences of L-PRF on Sleep, Healing and Quality of Life Following Periodontal Surgery",
    authors: "David Seiler, Jess Cayetano",
    category: "Dental Research",
    institution: "United States Air Force Post-Graduate Dental School",
  },

  // Emergency Medicine
  {
    id: "emergency-1",
    title: "End User Evaluation of Structured Handoff Didactic Training and Data Summary Tool for En Route Care",
    authors:
      "Kimberly Medellin, Cody Ashcroft, Kaitlin E. Beyrau, Elizabeth Mann-Salinas, Emily Lockamy, Joseph Lopreiato, William T. Davis",
    category: "Emergency Medicine",
    institution: "59th Medical Wing, Brooke Army Medical Center, Uniformed Services University",
  },
  {
    id: "emergency-2",
    title: "Insulin Administration and Safety Characteristics during Military En Route Critical Care Transports",
    authors:
      "Anna Garcia, William T. Davis, Lane Frasier, Mark Cheney, Joshua Burkhardt, Richard Strilka, Shelia Savell, Valerie Sams, Joseph Maddry",
    category: "Emergency Medicine",
    institution:
      "59th Medical Wing, Brooke Army Medical Center, University of Cincinnati Medical Center, United States Air Force School of Aerospace Medicine",
  },
  {
    id: "emergency-3",
    title: "Orientation-Independent Airway Suction for Battlefield Prolonged Field Care",
    authors: "Rakib Hasan, Saketh R. Peri, Maria J. Londono, R. Lyle Hood, Connor J. Evans, Robert A. De Lorenzo",
    category: "Emergency Medicine",
    institution: "University of Texas at San Antonio, UT Health San Antonio",
  },
  {
    id: "emergency-4",
    title:
      "Prehospital Factors Associated with Calcium Derangements on Arrival to the Trauma Center: A Preplanned Secondary Analysis",
    authors:
      "Melody Martinez, Steven G. Schauer, Susannah A. Nicholson, Julie A. Rizzo, Franklin L. Wright, James K. Aden, Michael D. April, Lauran Barry, Alex C. Cheng, Andrew D. Fisher, Jennifer M. Gurney, Isabel A. Hartwig, Brian J. Kirkwood, Brit J. Long, Jessica Mendez, Vikhyat S. Bebarta, Andrew P. Cap",
    category: "Emergency Medicine",
    institution: "The Metis Foundation, U.S. Army Institute of Surgical Research",
  },

  // Emerging Technologies
  {
    id: "emerging-1",
    title:
      "A Review of AI Applications for Sensory Processing Disorder Assessment: Advances, Challenges, and Future Directions",
    authors: "Yara Altarawneh, Omar Abbaas",
    category: "Emerging Technologies",
    institution: "University of Texas at San Antonio",
  },
  {
    id: "emerging-2",
    title: "A Review of Nasopharyngeal and Tympanic Membrane Thermometers for Potential Battlefield Use",
    authors:
      "Angeles Gomez Soto, Maria J. Londono, Connor J. Evans, R. Lyle Hood, Robert A. De Lorenzo, Brendon McDermott, Bryan Everitt",
    category: "Emerging Technologies",
    institution: "University of Texas at San Antonio, University of Arkansas, UT Health San Antonio",
  },
  {
    id: "emerging-3",
    title: "A System for Development, Testing, and Validation of Automated Ventilation Controllers",
    authors:
      "David Berard, Ben Alexander, David Owen, Isiah Mejia, Rachel Gathright, Sofia I. Hernandez Torres, Eric J. Snider",
    category: "Emerging Technologies",
    institution: "U.S. Army Institute of Surgical Research",
  },
  {
    id: "emerging-4",
    title: "Artificial Intelligent Modes for Detecting Trauma-Induced Thoracic Injuries Using Point of Care Ultrasound",
    authors: "Austin Ruiz, Eric J. Snider, Sofia I. Hernandez Torres",
    category: "Emerging Technologies",
    institution: "U.S. Army Institute of Surgical Research",
  },
  {
    id: "emerging-5",
    title: "Development of a Vasopressor Infusion Controller for Hemorrhagic Shock Resuscitation",
    authors:
      "Eric Snider, Caroline Gusson Shimoura, David Berard, Evan Ross, Jonathan Marrero Bermudez, Lawrence Holland, Michael Lopez, Rachel Gathright, Sofia I. Hernandez Torres",
    category: "Emerging Technologies",
    institution: "U.S. Army Institute of Surgical Research",
  },
  {
    id: "emerging-6",
    title:
      "Development of an EFAST Tissue Phantom Suitable for Modular Thoracic and Abdominal Injuries: Toward Automated Ultrasound Triage",
    authors:
      "Isiah Mejia, Carlos Bedolla, Eric J. Snider, Krysta-Lynn Amezcua, Rachel Gathright, Sofia I. Hernandez Torres, Theodore Winter",
    category: "Emerging Technologies",
    institution: "U.S. Army Institute of Surgical Research",
  },
  {
    id: "emerging-7",
    title:
      "Development of Artificial Intelligent Models for Ultrasound Guided Junctional Tourniquet Placement and Occlusion",
    authors:
      "Carlos Bedolla Avalos, Eric J. Snider, Isiah Mejia, James P. Collier III, Sofia I. Hernandez Torres, Theodore Winter",
    category: "Emerging Technologies",
    institution: "U.S. Army Institute of Surgical Research",
  },
  {
    id: "emerging-8",
    title: "Expanded Testbed for Evaluating Automated Shock Resuscitation Controllers Utilizing Vasopressors",
    authors: "Sofia Hernandez Torres, David Berard, Eddie Martinez, Eric J. Snider",
    category: "Emerging Technologies",
    institution: "U.S. Army Institute of Surgical Research",
  },
  {
    id: "emerging-9",
    title: "Expeditionary Medical and PPE Technologies for the Modern Warfighter",
    authors: "Girish Srinivas, Ph.D.; Ned Metcalf; David Eisenberg, Ph.D.; Denis Kissounko, Ph.D.",
    category: "Emerging Technologies",
    institution: "TDA Research, Inc.",
  },
  {
    id: "emerging-10",
    title: "Marvel: Magnetic Arteriovenous Lattice for Improved Kidney Dialysis",
    authors: "Joaquin Rodriguez, David Restrepo, Marlist Villegas Verschoyle, R. Lyle Hood, Cody Gonzalez",
    category: "Emerging Technologies",
    institution: "The University of Texas at San Antonio",
  },
  {
    id: "emerging-11",
    title:
      "Non-Invasive Prediction of Mean Arterial Pressure using Photoplethysmography in a Swine Hemorrhage and Resuscitation Study",
    authors: "Jose Gonzalez, Eric J. Snider",
    category: "Emerging Technologies",
    institution: "U.S. Army Institute of Surgical Research",
  },
  {
    id: "emerging-12",
    title:
      "Perceived Operational Efficacy of the MOVES SLC During Air Force Critical Care Air Transport Team Simulated Training Exercise",
    authors: "Luciana Torres, Lance McGinnis, Nina Hoskins, Gloria Rodriguez, Melissa Clemons, Amber Hadjis",
    category: "Emerging Technologies",
    institution: "59th Medical Wing, Brooke Army Medical Center",
  },
  {
    id: "emerging-13",
    title: "Repositionable Aortic Endograft Limb Twisting and Thrombosis",
    authors: "Linh Nguyen, Less Ochoa, Thomas Gianis, Wayne Causey",
    category: "Emerging Technologies",
    institution:
      "University of the Incarnate Word School of Osteopathic Medicine, San Antonio Vascular and Endovascular Clinic",
  },

  // Environmental, Occupational Health & Safety
  {
    id: "environmental-1",
    title: "Lead and Noise Exposure Assessment at an Indoor Shooting Range in Southern California",
    authors: "Emmanuel Iyiegbuniwe",
    category: "Environmental, Occupational Health & Safety",
    institution: "UT School of Public Health San Antonio, UT Health San Antonio",
  },

  // Health Systems Research
  {
    id: "health-systems-1",
    title: "Disparities in Care Experiences Among Children Enrolled in Medicaid Managed Care Plans",
    authors: "Sara Abu-Aridah",
    category: "Health Systems Research",
    institution: "University of Texas at San Antonio",
  },

  // Human Performance
  {
    id: "human-1",
    title:
      "Association of Nontechnical Skills and Cognitive Load with Technical Performance During Simulated EnRoute Critical Care Missions",
    authors:
      "Emily Lockamy, Allyson A. Arana, Elizabeth Mann-Salinas, William T. Davis, Roger D. Dias, Ryan E. Harari, Steven Yule, Vikhyat S. Bebarta, Benjamin Easter",
    category: "Human Performance",
    institution:
      "59th Medical Wing, Harvard Medical School, University of Edinburgh, University of Colorado School of Medicine",
  },
  {
    id: "human-2",
    title:
      "Cognitive and Personality Differences between Training Outcomes in an Air Force Special Warfare Training Course",
    authors: "Liliya Sakhan, Lily Sakhan, Cody Butler, Garrett Miyaoka, Amanda Patrick, Thomas Smith, Kaitlin Erickson",
    category: "Human Performance",
    institution: "United States Air Force",
  },
  {
    id: "human-3",
    title: "Exploring Freediving as a Tool for PTSD Treatment and Enhanced Warfighter Performance",
    authors: "Johnny Carabajal, Cerise Cisneros",
    category: "Human Performance",
    institution: "Dive Within",
  },
  {
    id: "human-4",
    title:
      "Nasogastric Tube Tune-Up: Surgical Residents and Med-Surg Nursing Achieve Proficiency in a Standardized Protocol",
    authors: "Richard Walsh",
    category: "Human Performance",
    institution: "UT Health San Antonio",
  },

  // Infectious Diseases
  {
    id: "infectious-1",
    title:
      "A Human H5N1 Influenza Virus Expressing Nluc for Real-time Tracking Viral Infection and Identification of Therapeutic Interventions",
    authors:
      "Ramya Smithaveni Barre, Ruby Escobedo, Esteban Castro, Nathaniel Jackson, Chengin Ye, Luis Martinez-Sobrido, Ahmed Mostafa, Mahmoud Bayoumi, Anastasija Cupic, Michael Piepenbrink, James J. Kobie, Mark R. Walter, Adolfo García-Sastre",
    category: "Infectious Diseases",
    institution:
      "Texas Biomedical Research Institute, National Research Centre, Cairo University, Icahn School of Medicine at Mount Sinai, University of Alabama at Birmingham",
  },
  {
    id: "infectious-2",
    title:
      "A Structural-Functional Platform to Identify Metabolite Antigens for Anti-Microbial or Anti-Cancer Mucosal-Associated Invariant T Cells",
    authors: "Nathalia Rodrigues de Almeida, Ariel Laub, Shouxiong Huang",
    category: "Infectious Diseases",
    institution: "Texas Biomedical Research Institute, University of Texas at San Antonio",
  },
  {
    id: "infectious-3",
    title: "Assessment of Antibiotic Overuse for Uncomplicated Cystitis at Hospital and Emergency Department Discharge",
    authors: "Brittany Santa Cruz, Kayla Scheps",
    category: "Infectious Diseases",
    institution: "Brooke Army Medical Center",
  },
  {
    id: "infectious-4",
    title:
      "Changes to Staphylococcus aureus Morphology, Biofilm Formation, and Adhesion in Response to Honey as an Antibiotic: An Atomic Force Microscopy Study",
    authors: "Anita Shayan, Nisabella Karais, Nehal Abu-Lail",
    category: "Infectious Diseases",
    institution: "The University of Texas at San Antonio",
  },
  {
    id: "infectious-5",
    title:
      "Characterizing Reporter-Expressing Recombinant SARS-CoV-2 to Identify Prophylactics and Therapeutics Against Variants of Concern",
    authors:
      "Esteban Castro, Chengjin Ye, Ramya S. Barre, Luis Martinez-Sobrido, Brian Imbiakha, Hector C. Aguilar, Ahmed Mostafa",
    category: "Infectious Diseases",
    institution:
      "Texas Biomedical Research Institute, UT Health San Antonio, Cornell University, National Research Centre",
  },
  {
    id: "infectious-6",
    title:
      "Development of Fluorescent Reduction Neutralization Tests (FRNTs) for Identifying Therapeutics Against Tier 1 Viral Threats",
    authors: "Nathaniel D. Jackson, Luis Martinez-Sobrido",
    category: "Infectious Diseases",
    institution: "Texas Biomedical Research Institute",
  },
  {
    id: "infectious-7",
    title:
      "Development of Reporter Mouse-Adapted SARS-CoV-2 for In Vitro and In Vivo Monitoring: Advancing Tools for Pathogenesis Studies and Therapeutic Evaluation",
    authors: "Sarah Hussein",
    category: "Infectious Diseases",
    institution: "Texas Biomedical Research Institute",
  },
  {
    id: "infectious-8",
    title:
      "Interferon Type Switching in Mycobacterium Tuberculosis Correlates with Disease Control and Immunological Memory",
    authors: "Caden Munson, Deepak Kaushal, Dhiraj Singh",
    category: "Infectious Diseases",
    institution: "The University of Texas at San Antonio, Texas Biomedical Research Institute",
  },
  {
    id: "infectious-9",
    title:
      "Phylogenomic Framework and Virulence Gene Boundaries of Emerging Shiga Toxin-Producing Escherichia coli O118",
    authors: "Irvin Rivera, Sara S.K. Konig, Mark Eppinger, Armando L. Rodriguez, Joseph M. Bosilevac",
    category: "Infectious Diseases",
    institution:
      "The University of Texas at San Antonio, South Texas Center for Emerging Infectious Diseases, U.S. Department of Agriculture",
  },
  {
    id: "infectious-10",
    title: "Role of the Alveolar Lung Environment on Susceptibility to Mycobacterium tuberculosis Infections",
    authors:
      "Nadine Chacon, Jordi Torrelles, Anna Allue-Guardia, Matthew Wall, Julia Scordo, Andreu Garcia-Villanova, Anwari Akhter",
    category: "Infectious Diseases",
    institution: "UT Health San Antonio, Texas Biomedical Research Institute",
  },

  // Maternal Health
  {
    id: "maternal-1",
    title:
      "Exploring the Health Habits of Pregnant TRICARE Beneficiaries at Risk for Excessive Gestational Weight Gain",
    authors:
      "Rosemary Estevez Burns, Victoria Hatchett, Caitlin Cox, Amanda Durbin, Xin-Qun Wang, Carol Copeland, Gabriella Tillman",
    category: "Maternal Health",
    institution: "Wilford Hall Ambulatory Surgical Center, University of Virginia, Northwest Vista College",
  },

  // Medication Use Evaluation
  {
    id: "medication-eval-1",
    title: "Hypocalcemia After the Administration of Denosumab (Prolia®) in Chronic Kidney Disease",
    authors: "Felix Akowuah",
    category: "Medication Use Evaluation",
    institution: "Brooke Army Medical Center",
  },

  // Medication Utilization Review: Medication Safety
  {
    id: "medication-safety-1",
    title:
      "An Evaluation of Opioid Prescribing Practices on Discharge From the Emergency Department at a Military Treatment Facility",
    authors: "Prerana Patel, Amber Brammer, Jacqueline Moya",
    category: "Medication Utilization Review: Medication Safety",
    institution: "Brooke Army Medical Center",
  },

  // Mental Health/Sleep
  {
    id: "mental-1",
    title: "Exploring Freediving as a Novel Treatment for Post-Traumatic Stress Disorder",
    authors: "Johnny Carabajal, Cerise Cisneros",
    category: "Mental Health/Sleep",
    institution: "Dive Within",
  },
  {
    id: "mental-2",
    title:
      "Psychometric Properties of the PROMIS - Sleep Disturbance - Short Form in a Naturalistic Sample of Active-Duty U.S. Service Members",
    authors: "Andrew Snell, Diane-Claire Villarreal, Ashton Dessert, Caley Kropp",
    category: "Mental Health/Sleep",
    institution: "Wilford Hall Ambulatory Surgical Center",
  },
  {
    id: "mental-3",
    title: "The Impact of Sleep on Graduation During the US Air Force Special Warfare Training Pipeline",
    authors: "Sarah Pesquera, Amanda Patrick, Thomas Smith, John D. Mata, Kathleen Hogan, Cody R. Butler",
    category: "Mental Health/Sleep",
    institution: "US Air Force Special Warfare Human Performance Squadron",
  },
  {
    id: "mental-4",
    title: "The Military-to-Civilian Questionnaire: A Factor Analysis",
    authors: "Allison Wright, Alicia A. Swan, Kelly Cheever, Michelle A. Salinas, Mary Jo Pugh",
    category: "Mental Health/Sleep",
    institution:
      "South Texas Veterans Health Care System, The University of Texas at San Antonio, VA Salt Lake City Health Care System, University of Utah School of Medicine",
  },

  // Neuroscience
  {
    id: "neuroscience-1",
    title:
      "A Protocol for Differentiating Human-Induced Pluripotent Stem Cells into Functional Suprachiasmatic Nucleus-Like Circadian Neurons",
    authors: "Sean Tritley, Eric Brey, Amina Qutub",
    category: "Neuroscience",
    institution: "The University of Texas at San Antonio",
  },

  // Noise and Blast Exposure Effects on Hearing
  {
    id: "noise-1",
    title: "Changes in Distortion-Product Otoacoustic Emissions in Response to Military Heavy Weapons Exposure",
    authors:
      "Quintin Hecht, Howard Greene, Nicole Larionova, Andrea Brzuska, Zafir Abutalib, Jeffrey Russell, Brianna Biel, Devon Kulinski, Douglas Brungart, Jessica Lanning, Christopher Smalt",
    category: "Noise and Blast Exposure Effects on Hearing",
    institution:
      "Defense Health Agency Hearing Center of Excellence, Naval Medical Center Camp Lejeune, Walter Reed National Military Medical Center, Massachusetts Institute of Technology",
  },

  // Nursing Research
  {
    id: "nursing-1",
    title:
      "Complementary and Alternative Medicine Pain Management: An Evidence-Based Practice Intervention for Same Day Surgery Patients",
    authors: "Rebecca Heyne, Nina Hoskins, Jessica Rangoonwala, Ashley Harper",
    category: "Nursing Research",
    institution: "59th Medical Wing",
  },
  {
    id: "nursing-2",
    title: "Copy of Veteran Reintegration: A Descriptive, Exploratory Analysis of Post-9/11 Veterans",
    authors: "Kirsten Verkamp",
    category: "Nursing Research",
    institution: "South Texas Veterans Healthcare System",
  },
  {
    id: "nursing-3",
    title:
      "Identifying the Impact of the Implementation of a Quick Reference Tool on an Inpatient Medical-Surgical Unit (7T)",
    authors:
      "Taylour Daubert, Dana Marie Bartko, Mi Jung Herren, Melody Giraldo, Thomas Martin, Kimberly More, Ann Marie Lazarus",
    category: "Nursing Research",
    institution: "Brooke Army Medical Center",
  },

  // Pain Research
  {
    id: "pain-1",
    title: "Analgesic Effects of Crocetin in a Rat Model of Extremity Trauma",
    authors:
      "Whitney Greene, Jemima Johnson, Cyndi Adkins Anderson, Alberto Mares, Tamara Weaver, Thomas Garza, Carmen Hinojosa-Laborde, Nathan Davidson, Natasha M. Sosanya",
    category: "Pain Research",
    institution: "United States Army Institute of Surgical Research",
  },
  {
    id: "pain-2",
    title: "Engaging Neurobehavioral and Molecular Assays to Advance Battlefield Appropriate Analgesics",
    authors:
      "Alberto Mares, Ann Friesenhahn, Michaela R. Priess, Miryam Pando, Thomas Garza, Roger Chavez, Keziah Floyd, Whitney Greene, Carmen Hinojosa-Laborde, Nathan Davidson, Bopaiah Cheppudira, Natasha M. Sosanya, Jeff Reich",
    category: "Pain Research",
    institution: "U.S. Army Institute of Surgical Research, Sparian Biosciences, Inc",
  },
  {
    id: "pain-3",
    title: "JAK Inhibitors: Novel Analgesics for Burn Pain",
    authors:
      "Taylor Hickman, Ann M. Friesenhahn, Connor N. Broyles, Alex V. Trevino, Thomas H. Garza, Carmen Hinojosa-Laborde, Nathan L. Davidson, Bopaiah P. Cheppudira",
    category: "Pain Research",
    institution: "U.S. Army Institute of Surgical Research",
  },
  {
    id: "pain-4",
    title:
      "Social Support Moderates the Relationship Between Chronic Pain and Academic Self-Efficacy in Student Service Members/Veterans",
    authors:
      "Stephanie Daau, Liliane Efinger, Sydney Lozada, Isabel DeLeon, Elizabeth Bolen, Sandra B. Morissette, Alexis Blessing",
    category: "Pain Research",
    institution: "The University of Texas at San Antonio, Rocky Mountain Regional VA Medical Center",
  },

  // Radiation Countermeasures
  {
    id: "radiation-1",
    title: "An In Vitro System Using Human Peripheral Blood Mononuclear Cells to Assess Radiation Countermeasures",
    authors: "Leslie L. Rivera-Lopez, Barbara Christy, Gema Barrera, Maryanne Herzig",
    category: "Radiation Countermeasures",
    institution: "U.S. Army Institute of Surgical Research, UT Health San Antonio",
  },

  // Regenerative Medicine and Biomaterials
  {
    id: "regenerative-1",
    title:
      "Improved Performance and Health Recovery of Skeletal Muscle Using Autophagy Modulators After Ischemia Reperfusion Injury",
    authors: "Hugo Giambini, Barrera Fernandez V, Rathbone C, Gonzalez Porras M, Denton T",
    category: "Regenerative Medicine and Biomaterials",
    institution: "The University of Texas at San Antonio, Washington State University Health Sciences",
  },
  {
    id: "regenerative-2",
    title: "In Vitro Evaluation of Antimicrobial Properties and Cytotoxicity of an Antimicrobial Zeolite Foam Dressing",
    authors: "Kameel Zuniga, Wesley Cohn, Jack Hutcheson, Sweta Shrestha, Prabir Dutta",
    category: "Regenerative Medicine and Biomaterials",
    institution: "59th Medical Wing Science and Technology, ZeoVation",
  },

  // Spinal Cord Injury
  {
    id: "spinal-1",
    title:
      "Implementation of a Bowel and Bladder Care Bundle for the Spinal Cord Injury Patient During Acute Recovery on a Surgical Trauma Inpatient Unit",
    authors: "Ann Marie Lazarus, Erin Wei, Kimberly Murphy, Alma Guerrero",
    category: "Spinal Cord Injury",
    institution: "Brooke Army Medical Center",
  },

  // Trauma Research
  {
    id: "trauma-1",
    title: "A Combat Relevant Polytrauma Model in Swine for Trauma Research",
    authors:
      "Maria Castaneda, Alex Nunnery, Dena Norouzi, Denise Manfrini, Mark Foster, Aaron Alindogan, Patrick C. Ng, Jae Choi, Kaysie Sachs, Katie Boutin, R. Madelaine Paredes, Joseph K. Maddry",
    category: "Trauma Research",
    institution:
      "The University of Texas Health Science Center at San Antonio, The Metis Foundation, 59th Medical Wing, Brooke Army Medical Center",
  },
  {
    id: "trauma-2",
    title: "A Rat Polytrauma Model of Whole-Body Irradiation and Blast Exposure",
    authors:
      "Whitney Greene, Matthew McCloskey, Jemima Johnson, Valeta Sanders, Dallas Golden, Michael Urban, Jeanine Badrak",
    category: "Trauma Research",
    institution: "U.S. Army Institute of Surgical Research, Augusta University",
  },
  {
    id: "trauma-3",
    title: "Antibiotic Concentrations after Massive Transfusion (ACME) study: Study methods and preliminary data",
    authors:
      "Fabiola Mancha, Rocio J. Huaman, Daniel A. Darlington, Brian J. Kirkwood, Jessica Mendez, Steven G. Schauer, Marisol S. Castaneto, Pucheng Ke, Michael D. April, Keith R. Glenn, Brit J. Long, Joseph K. Maddry, Allyson A. Mireles, Annabel L. Schumaker, Matthew D. Smith, Julie A. Rizzo, Erin L. Anderson, Vikhyat S. Bebarta, Uwe Christians, David J. Douin, Anne C. Ritter, Kristine E. Schauer, Franklin L. Wright, Adit A. Ginde",
    category: "Trauma Research",
    institution:
      "U.S. Army Institute of Surgical Research, U.S. Army Medical Center of Excellence, Brooke Army Medical Center, University of Colorado School of Medicine",
  },
  {
    id: "trauma-4",
    title: "Arterial Blood Gas Desynchronization as an Indicator of Multisystem Complexity Loss in Critical States",
    authors:
      "Lawrence Renna, Senthil M. Mudaliar, George T. Harea, Daniel S. Wendorff, Brendan M. Beely, Teryn R. Roberts, Andriy I. Batchinsky",
    category: "Trauma Research",
    institution:
      "The Geneva Foundation, United States Army Medical Research Institute of Chemical Defense, University of the Incarnate Word School of Osteopathic Medicine",
  },
  {
    id: "trauma-5",
    title:
      "Assessing Potential Adjunct Medications such as Hydroxocobalamin and Methylene Blue, with REBOA, in the Management of Hemorrhage",
    authors:
      "Patrick Ng, Maria Castaneda, Alex Nunnery, Dena Norouzi, Denise Manfrini, Mark Foster, R. Madelaine Paredes, Aaron Alindogan, Joseph K. Maddry, Jae Choi, Kaysie Sachs, Katie Boutin",
    category: "Trauma Research",
    institution: "UT Health San Antonio, 59th Medical Wing, Brooke Army Medical Center, The Metis Foundation",
  },
  {
    id: "trauma-6",
    title:
      "Characterizing the Use of Autologous Blood Transfusions for Resuscitation After Trauma: A Trauma Quality Improvement Program (TQIP) Analysis",
    authors: "Grant Gerstner, Brit Long, Julie Rizzo, Michael April, Hendrick Lategan, Andrew Fisher, Steven Schauer",
    category: "Trauma Research",
    institution:
      "Brooke Army Medical Center, Uniformed Services University, Stellenbosch University, University of New Mexico School of Medicine, University of Colorado School of Medicine",
  },
  {
    id: "trauma-7",
    title:
      "Conjugation of Short-Chain Fatty Acids to Bicyclic-Amines for Analysis by Liquid Chromatography Tandem Mass Spectroscopy",
    authors: "Reese Berger, Daniel N. Darlington",
    category: "Trauma Research",
    institution: "United States Army Institute of Surgical Research, UT Health San Antonio",
  },
  {
    id: "trauma-8",
    title:
      "Epidemiology, Risk Factors, and Outcomes Associated With Pediatric Acute Respiratory Distress Syndrome in the Setting of Trauma",
    authors: "Colby Walton, Hannah Gale, Julie Rizzo, Ashley Sam, Matthew Borgman, Steven Schauer",
    category: "Trauma Research",
    institution:
      "Brooke Army Medical Center, Washington University in Saint Louis School of Medicine, University of Texas Southwestern, University of Colorado School of Medicine",
  },
  {
    id: "trauma-9",
    title: "Evaluation of Coagulation Kinetics of TXA and its Derivatives Employing an In Vitro Absorbance-Based Assay",
    authors: "Kameel Zuniga, Nathan Gehrke, Martin Burke",
    category: "Trauma Research",
    institution: "59th Medical Wing Science and Technology, University of Illinois Urbana-Champaign",
  },
  {
    id: "trauma-10",
    title: "In Vitro Vascular Endothelial Response to Novel Whole Blood Analogue for Resuscitation",
    authors:
      "Juan Curbelo, Phylisia Dimas, Jenny Mendez, Bridney Lundquist, Joseph Macaitis, Anthony Pusateri, Clifford Morgan, Dao Ho, Darrin Frye",
    category: "Trauma Research",
    institution: "Naval Medical Research Unit – San Antonio",
  },
  {
    id: "trauma-11",
    title: "Long Term Use of the Intrepid Dynamic Exoskeletal Orthosis",
    authors: "Michelle Lockwood, Sarah N. Pierrie, Tyler J. Cagle, John Fergason, Walter L. Childers",
    category: "Trauma Research",
    institution: "Center for the Intrepid, Brooke Army Medical Center",
  },
  {
    id: "trauma-12",
    title: "Multidisciplinary Approach to Successful Hand Reattachment Following Traumatic Near Total Amputation",
    authors:
      "Jessica Rodriguez, Savannah L. Potter, Abdulaziz Shammaa, Richard W. Walsh, Ashley F. Patterson, Luke D. Perry, Susannah E. Nicholson, Ashley C. McGinity, Brian W. Sager, Jason R. Coffman, Matthew J. Sideman, Lori Pounds",
    category: "Trauma Research",
    institution: "University of the Incarnate Word School of Osteopathic Medicine, UT Health San Antonio",
  },
  {
    id: "trauma-13",
    title: "Novel Analgesic, AMT-143, does not alter Survival after Extremity Trauma and Hemorrhage in Rats",
    authors: "Miryam Pando, Tamara Weaver, Roger Chavez, Kathy Ryan, Nathan Davidson, Carmen Hinojosa-Laborde",
    category: "Trauma Research",
    institution: "U.S. Army Institute of Surgical Research",
  },
  {
    id: "trauma-14",
    title: "Platelet Receptor Shedding as a Mechanism of Platelet Clearance Following Polytrauma Managed with ECLS",
    authors:
      "Teryn Roberts, Yanyi Zang, Antoine Persello, Danielle Wendorff, Brendan Beely, George Harea, Andriy Batchinsky, Alex Do, Armaan Somany",
    category: "Trauma Research",
    institution: "The Geneva Foundation, University of the Incarnate Word School of Osteopathic Medicine",
  },
  {
    id: "trauma-15",
    title:
      "Portable Viscoelastic Coagulation Monitor for Pre-Hospital and Point-of-Care Application in Combat Polytrauma Managed With ECLS and Systemic Anticoagulation",
    authors:
      "Danielle K. Berninzoni, Teryn R. Roberts, Andriy I. Batchinsky, Ivan Slichko, Georgij Roschin, Serhii Korol, Kostjantyn Gumeniuk, Andriy Rusnak, Serhii Sudakevych, Igor Kuzmych, Borys Todurov",
    category: "Trauma Research",
    institution:
      "The Geneva Foundation, University of the Incarnate Word School of Osteopathic Medicine, Shupyk National Healthcare University, Military Medical Academy, Heart Institute of the Ministry of Health",
  },
  {
    id: "trauma-16",
    title: "Prognostic Values of Composite Lactate Metrics in ECMO Patients: A Retrospective Analysis",
    authors: "Seth Lawson, Marla Gutierrez, Ellynor Herico, Jason Thomas, Julie A. Rizzo",
    category: "Trauma Research",
    institution: "Brooke Army Medical Center, 59th Medical Wing, Uniformed Services University",
  },
  {
    id: "trauma-17",
    title: "Toward Open-Loop ECLS Control: Independent Determinants of Systemic Arterial Blood Gas Parameters",
    authors:
      "Lawrence Renna, George T. Harea, Daniel S. Wendorff, Brendan M. Beely, Teryn R. Roberts, Andriy I. Batchinsky",
    category: "Trauma Research",
    institution: "The Geneva Foundation, University of the Incarnate Word School of Osteopathic Medicine",
  },
  {
    id: "trauma-18",
    title: "Trauma and Hemorrhage Lead to Changes in Fecal Short-Chain Fatty Acids",
    authors: "Reese Berger, Daniel N. Darlington, Jeffrey D. Keesee, Xiaowu Wu, Susannah E. Nicholson",
    category: "Trauma Research",
    institution: "United States Army Institute of Surgical Research, UT Health San Antonio, University of Texas Health",
  },
  {
    id: "trauma-19",
    title: "Validation of Embedded PCL-5 Symptom Validity Indices in Active-Duty Military Population",
    authors: "Alexis Troili-Fletes, Cammy Chicota-Carroll, James Aden, Patrick Armistead-Jehle",
    category: "Trauma Research",
    institution: "United States Air Force, Brooke Army Medical Center, Munson Army Medical Center",
  },

  // Traumatic Brain Injury
  {
    id: "tbi-1",
    title: "Exploring the Diagnostic Potential of Photoplethysmography in Traumatic Brain Injuries",
    authors: "Morteza Seidi, Nazmul Islam Shuzan, Randee Hernandez, Carlos Cruz Garza, Peace Msengi, Marzieh Memar",
    category: "Traumatic Brain Injury",
    institution: "The University of Texas at San Antonio",
  },
  {
    id: "tbi-2",
    title: "Influence of Temperature on Impact Dynamics in Helmet Padding",
    authors: "Morteza Seidi, Alireza Abbasi Ghiri",
    category: "Traumatic Brain Injury",
    institution: "The University of Texas at San Antonio",
  },
  {
    id: "tbi-3",
    title: "Systemic Coagulation and Blunt Traumatic Brain Injury: Is There a Link?",
    authors: "Angela M. Mitchell, Teryn R. Roberts, Andriy Batchinsky, Yanyi Zang",
    category: "Traumatic Brain Injury",
    institution:
      "The Geneva Foundation, University of the Incarnate Word School of Osteopathic Medicine, Neurosurgery Education and Research Virtual Experience Group",
  },
  {
    id: "tbi-4",
    title: "The Effect of Environmental Hypothermia on Survival in Isolated Blunt Traumatic Brain Injury",
    authors:
      "Rebecca McCune, Brit J. Long, Julie A. Rizzo, Bradley A. Dengler, Geoffrey W. Peitz, Margaret A. Moran, Michael D. April, Steven G. Schauer",
    category: "Traumatic Brain Injury",
    institution:
      "Brooke Army Medical Center, Uniformed Services University, Walter Reed National Military Medical Center, University of Colorado School of Medicine",
  },
  {
    id: "tbi-5",
    title: "Trait and State Resilience Factors among Comorbidity Profiles of Veterans",
    authors: "Michelle Salinas, Samantha Eaton, Alicia Swan, Mary Jo Pugh",
    category: "Traumatic Brain Injury",
    institution:
      "South Texas Veterans Health Care System, The University of Texas at San Antonio, VA Salt Lake City Health Care System, University of Utah",
  },
]

// Function to get institution badge color
export const getInstitutionBadgeColor = (institution: string) => {
  for (const inst of institutions) {
    if (institution.includes(inst.name)) {
      return inst.color
    }
  }
  return "bg-gray-100 text-gray-800"
}

// Function to get category color
export const getCategoryColor = (category: string) => {
  const colorMap: { [key: string]: string } = {
    "Airway Management": "bg-red-100 text-red-800",
    "Clinical Investigation": "bg-blue-100 text-blue-800",
    "Dental Research": "bg-yellow-100 text-yellow-800",
    "Emergency Medicine": "bg-orange-100 text-orange-800",
    "Emerging Technologies": "bg-purple-100 text-purple-800",
    "Environmental, Occupational Health & Safety": "bg-green-100 text-green-800",
    "Health Systems Research": "bg-teal-100 text-teal-800",
    "Human Performance": "bg-indigo-100 text-indigo-800",
    "Infectious Diseases": "bg-pink-100 text-pink-800",
    "Maternal Health": "bg-rose-100 text-rose-800",
    "Medication Use Evaluation": "bg-amber-100 text-amber-800",
    "Medication Utilization Review: Medication Safety": "bg-lime-100 text-lime-800",
    "Mental Health/Sleep": "bg-cyan-100 text-cyan-800",
    Neuroscience: "bg-violet-100 text-violet-800",
    "Noise and Blast Exposure Effects on Hearing": "bg-sky-100 text-sky-800",
    "Nursing Research": "bg-emerald-100 text-emerald-800",
    "Pain Research": "bg-fuchsia-100 text-fuchsia-800",
    "Radiation Countermeasures": "bg-slate-100 text-slate-800",
    "Regenerative Medicine and Biomaterials": "bg-stone-100 text-stone-800",
    "Spinal Cord Injury": "bg-zinc-100 text-zinc-800",
    "Trauma Research": "bg-red-100 text-red-800",
    "Traumatic Brain Injury": "bg-orange-100 text-orange-800",
  }

  return colorMap[category] || "bg-gray-100 text-gray-800"
}
