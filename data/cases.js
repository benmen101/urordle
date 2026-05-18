// Urordle Case Library
// Each case: id, dx (canonical diagnosis), aliases (accepted alternates), clues[6], teaching (post-solve explainer)
// Clues are revealed progressively: clue[0] always shown; clue[i] revealed after the i-th wrong/skipped guess.
// Aliases should be lowercase, alphanumeric+spaces only. The matcher normalizes input the same way.

window.URORDLE_CASES = [
  {
    id: 1,
    dx: "Testicular torsion",
    aliases: ["testicular torsion", "torsion of testis", "torsion of the testicle", "spermatic cord torsion", "torsion"],
    clues: [
      "A 15-year-old boy presents to the ED with sudden, severe right-sided scrotal pain that woke him from sleep 2 hours ago.",
      "He reports associated nausea and one episode of vomiting. No dysuria, no urethral discharge, no recent trauma.",
      "On exam, the right testis is high-riding with a horizontal lie. The cremasteric reflex is absent on the right.",
      "Elevating the testis does not relieve the pain (negative Prehn sign).",
      "Bedside scrotal Doppler ultrasound shows absent intratesticular arterial flow on the right.",
      "Urology is consulted emergently for surgical exploration within the 6-hour window."
    ],
    teaching: "A surgical emergency. The hallmark is acute scrotal pain with absent cremasteric reflex and a high-riding testis. Doppler shows decreased/absent flow. Detorsion + bilateral orchiopexy is the treatment; salvage rate drops sharply after 6 hours.",
    category: "Emergency"
  },
  {
    id: 2,
    dx: "Benign prostatic hyperplasia",
    aliases: ["benign prostatic hyperplasia", "bph", "benign prostatic hypertrophy", "prostatic hyperplasia", "enlarged prostate"],
    clues: [
      "A 68-year-old man presents with a 2-year history of urinary frequency, nocturia 3-4 times per night, and a weak urinary stream.",
      "He describes hesitancy, intermittency, and a sensation of incomplete emptying. No hematuria. No weight loss.",
      "DRE reveals a smooth, symmetrically enlarged, non-tender prostate without nodules.",
      "PSA is 3.2 ng/mL (within age-adjusted reference). Urinalysis is unremarkable.",
      "Post-void residual is 180 mL. Uroflowmetry shows Qmax of 8 mL/s with a flattened curve.",
      "He is started on tamsulosin with significant symptomatic improvement; finasteride is added for prostate volume >40 mL."
    ],
    teaching: "Classic LUTS in an older man with a smooth enlarged prostate. Treatment ladder: behavioral → alpha-blocker (tamsulosin) → 5-alpha-reductase inhibitor (finasteride) for larger glands → surgery (TURP, HoLEP, UroLift).",
    category: "Common"
  },
  {
    id: 3,
    dx: "Renal cell carcinoma",
    aliases: ["renal cell carcinoma", "rcc", "renal cell cancer", "kidney cancer", "renal carcinoma", "hypernephroma"],
    clues: [
      "A 62-year-old smoker presents with 3 months of painless gross hematuria and unintentional 15-lb weight loss.",
      "He reports a dull right flank ache and intermittent low-grade fevers.",
      "On exam, a palpable right flank mass is appreciated. A left-sided varicocele is also noted that does not decompress when supine.",
      "Labs: hemoglobin 10.2, calcium 11.6, ESR 88. UA shows 50+ RBCs/hpf.",
      "CT with contrast shows a 7 cm heterogeneously enhancing right renal mass with tumor thrombus extending into the IVC.",
      "Biopsy is deferred; he proceeds to radical nephrectomy with IVC thrombectomy."
    ],
    teaching: "The classic triad (flank pain, hematuria, palpable mass) is present in <10% of cases. Paraneoplastic features (hypercalcemia, polycythemia or anemia, Stauffer syndrome) are common. A new left-sided varicocele that doesn't decompress raises suspicion for left renal vein obstruction. Most are clear cell histology.",
    category: "Oncology"
  },
  {
    id: 4,
    dx: "Bladder cancer",
    aliases: ["bladder cancer", "urothelial carcinoma", "transitional cell carcinoma", "tcc", "urothelial cancer", "carcinoma of the bladder"],
    clues: [
      "A 70-year-old man with a 50-pack-year smoking history presents with painless gross hematuria.",
      "He worked for 30 years in a chemical dye manufacturing plant. No dysuria, no flank pain.",
      "UA: too numerous to count RBCs, no pyuria. Urine culture is negative.",
      "Urine cytology shows atypical cells suspicious for high-grade malignancy.",
      "CT urogram reveals a 3 cm papillary filling defect along the right lateral bladder wall.",
      "Cystoscopy confirms a papillary lesion; TURBT pathology returns high-grade non-muscle invasive urothelial carcinoma."
    ],
    teaching: "Painless gross hematuria in a smoker is bladder cancer until proven otherwise. Major risk factors: smoking, aromatic amines (dyes, rubber), cyclophosphamide, pelvic radiation. Workup: cystoscopy + upper tract imaging (CT urogram) + urine cytology. NMIBC managed with TURBT ± intravesical BCG; MIBC with neoadjuvant chemo + radical cystectomy.",
    category: "Oncology"
  },
  {
    id: 5,
    dx: "Nephrolithiasis",
    aliases: ["nephrolithiasis", "kidney stone", "kidney stones", "renal calculus", "renal calculi", "ureterolithiasis", "ureteral stone", "urolithiasis"],
    clues: [
      "A 35-year-old man presents with sudden-onset severe left flank pain radiating to the groin, with associated nausea and vomiting.",
      "The pain comes in waves; he cannot find a comfortable position and is writhing on the gurney.",
      "UA shows microscopic hematuria (20 RBCs/hpf) without pyuria or nitrites. He is afebrile.",
      "He has had one prior similar episode 3 years ago that resolved spontaneously.",
      "Non-contrast CT abdomen/pelvis shows a 4 mm stone at the left UVJ with mild proximal hydroureter.",
      "He is managed conservatively with hydration, NSAIDs, and tamsulosin (medical expulsive therapy)."
    ],
    teaching: "Colicky flank pain radiating to the groin with hematuria = stone until proven otherwise. NCCT is the gold-standard imaging. Stones <5 mm usually pass spontaneously; 5-10 mm at the UVJ benefit from tamsulosin. Indications for intervention: obstruction with infection (urgent decompression!), intractable pain, AKI, stone >10 mm.",
    category: "Common"
  },
  {
    id: 6,
    dx: "Pyelonephritis",
    aliases: ["pyelonephritis", "acute pyelonephritis", "kidney infection", "upper urinary tract infection", "complicated uti with pyelonephritis"],
    clues: [
      "A 28-year-old sexually active woman presents with 2 days of fever to 39.4°C, rigors, and right flank pain.",
      "She also reports dysuria, frequency, and urgency that began 5 days ago and was untreated.",
      "On exam, she has marked right costovertebral angle tenderness. She appears ill but hemodynamically stable.",
      "UA: large leukocyte esterase, positive nitrites, 100+ WBCs/hpf, WBC casts. Pregnancy test negative.",
      "Urine culture grows >100,000 CFU/mL of E. coli, pan-sensitive.",
      "She is admitted for IV ceftriaxone with transition to oral fluoroquinolone after defervescence."
    ],
    teaching: "Fever + flank pain + CVA tenderness + pyuria = pyelonephritis. WBC casts on UA support upper tract involvement. Outpatient management possible for stable patients with PO fluoroquinolone; admit if pregnant, vomiting, septic, or with comorbidities. Imaging (CT) if no improvement at 48-72h to rule out abscess or obstruction.",
    category: "Infection"
  },
  {
    id: 7,
    dx: "Prostate cancer",
    aliases: ["prostate cancer", "prostatic adenocarcinoma", "carcinoma of the prostate", "adenocarcinoma of the prostate", "ca prostate"],
    clues: [
      "A 67-year-old man is referred after his screening PSA rose from 2.1 to 5.8 ng/mL over the past year.",
      "He is asymptomatic without LUTS. No hematuria, no bone pain.",
      "DRE reveals a firm, irregular nodule in the right peripheral lobe.",
      "MRI prostate shows a PI-RADS 5 lesion in the right peripheral zone, 1.4 cm.",
      "MRI-fusion targeted biopsy returns Gleason 4+3=7 (Grade Group 3) adenocarcinoma in 4/12 cores.",
      "After multidisciplinary discussion, he elects radical prostatectomy; staging bone scan and CT are negative for metastases."
    ],
    teaching: "Most prostate cancers are asymptomatic and detected by PSA screening. Workup: confirmatory PSA → MRI prostate → targeted + systematic biopsy. Risk stratification uses PSA, Gleason/Grade Group, and clinical T stage. Treatment options: active surveillance (low risk), surgery, radiation ± ADT. Most are peripheral zone adenocarcinomas.",
    category: "Oncology"
  },
  {
    id: 8,
    dx: "Acute bacterial prostatitis",
    aliases: ["acute bacterial prostatitis", "acute prostatitis", "bacterial prostatitis", "prostatitis"],
    clues: [
      "A 45-year-old man presents with 3 days of fever, chills, perineal pain, and dysuria.",
      "He has urinary frequency, urgency, and a sensation of incomplete emptying with painful ejaculation.",
      "He is febrile to 38.9°C. Abdominal exam is unremarkable. He is in moderate distress.",
      "On gentle DRE, the prostate is exquisitely tender, boggy, and warm. (Vigorous massage is avoided.)",
      "UA shows pyuria and bacteriuria. Urine culture grows E. coli.",
      "He is started on ciprofloxacin for a 4-6 week course given the prostate's poor antibiotic penetration."
    ],
    teaching: "Acute febrile illness + tender boggy prostate + pyuria. Avoid prostate massage (bacteremia risk). E. coli is most common pathogen. Treat with fluoroquinolone or TMP-SMX for 4-6 weeks (long course due to poor prostate penetration). Rule out abscess if no improvement in 48-72 hours.",
    category: "Infection"
  },
  {
    id: 9,
    dx: "Testicular seminoma",
    aliases: ["seminoma", "testicular seminoma", "germ cell tumor seminoma", "pure seminoma"],
    clues: [
      "A 32-year-old man presents with a painless, gradually enlarging right testicular mass that he noticed 2 months ago.",
      "He has a history of cryptorchidism that was surgically corrected at age 4. No fevers, no weight loss.",
      "On exam, the right testis is firm, non-tender, and does not transilluminate. The left testis is normal.",
      "Scrotal ultrasound shows a 3 cm hypoechoic, well-circumscribed intratesticular mass with internal vascularity.",
      "Tumor markers: beta-hCG 12 (mildly elevated), AFP normal, LDH 280. Inguinal radical orchiectomy is performed.",
      "Pathology returns pure classical seminoma. Staging CT shows no retroperitoneal lymphadenopathy."
    ],
    teaching: "Painless testicular mass in a young man = germ cell tumor until proven otherwise. NEVER biopsy through the scrotum - perform inguinal orchiectomy. AFP elevation excludes pure seminoma (indicates NSGCT). Pure seminomas may have mildly elevated hCG. Highly curable - even with metastases (radiosensitive, chemo-sensitive with BEP).",
    category: "Oncology"
  },
  {
    id: 10,
    dx: "Testicular non-seminomatous germ cell tumor",
    aliases: ["nsgct", "non seminomatous germ cell tumor", "nonseminomatous germ cell tumor", "non-seminoma", "nonseminoma", "mixed germ cell tumor", "embryonal carcinoma", "yolk sac tumor"],
    clues: [
      "A 24-year-old man presents with right testicular swelling and a dull ache for the past 6 weeks.",
      "He has also noticed gynecomastia and reports mild dyspnea on exertion.",
      "Right testis is enlarged with a firm, irregular intratesticular mass; left testis is normal.",
      "Tumor markers: AFP 850 ng/mL (markedly elevated), beta-hCG 4,200, LDH 720.",
      "Scrotal ultrasound: heterogeneous 5 cm intratesticular mass with cystic and solid components.",
      "CT chest/abdomen/pelvis shows bulky retroperitoneal lymphadenopathy and pulmonary metastases. Inguinal orchiectomy followed by BEP chemotherapy is planned."
    ],
    teaching: "AFP elevation is the giveaway - pure seminomas DO NOT make AFP. Mixed germ cell tumors are common (embryonal, yolk sac, choriocarcinoma, teratoma). Even with metastases, NSGCT is highly curable with cisplatin-based chemo (BEP regimen). Post-chemo residual masses often need surgical resection (post-chemo RPLND).",
    category: "Oncology"
  },
  {
    id: 11,
    dx: "Epididymitis",
    aliases: ["epididymitis", "acute epididymitis", "epididymo-orchitis", "epididymoorchitis", "epididymitis orchitis"],
    clues: [
      "A 22-year-old sexually active man presents with a 3-day history of progressive left scrotal pain and swelling.",
      "He reports urethral discharge and dysuria that began a week ago. He has a new sexual partner.",
      "On exam, the left epididymis is tender and indurated. The testis itself is non-tender. Cremasteric reflex is intact.",
      "Elevating the testis relieves the pain (positive Prehn sign).",
      "Urethral NAAT is positive for Chlamydia trachomatis. UA shows pyuria.",
      "He is treated with ceftriaxone IM plus doxycycline x 10 days. Partner notification and treatment are arranged."
    ],
    teaching: "Acute scrotal pain in a young sexually active man with gradual onset, urethral symptoms, and positive Prehn sign suggests epididymitis (vs torsion which is sudden, has negative Prehn, and absent cremasteric reflex). <35 yo: cover GC/Chlamydia (ceftriaxone + doxycycline). >35 yo or insertive anal: cover enteric organisms (add fluoroquinolone).",
    category: "Infection"
  },
  {
    id: 12,
    dx: "Varicocele",
    aliases: ["varicocele", "varicoceles", "scrotal varices", "pampiniform plexus varicocele"],
    clues: [
      "A 26-year-old man presents to the urology clinic for evaluation of primary infertility after 18 months of trying to conceive.",
      "He reports a dull, dragging sensation in the left scrotum that worsens with prolonged standing.",
      "On exam in the standing position, a soft mass is palpable above the left testis, described as a 'bag of worms.'",
      "The finding decompresses when he lies supine. The left testis is mildly smaller than the right.",
      "Semen analysis shows oligoasthenospermia. Scrotal ultrasound confirms dilated veins of the pampiniform plexus >3 mm with reversal of flow on Valsalva.",
      "He undergoes left subinguinal microsurgical varicocelectomy."
    ],
    teaching: "Classic 'bag of worms' that decompresses supine, almost always left-sided (left gonadal vein drains into left renal vein at right angle). Causes pain, testicular atrophy, and infertility. A right-sided or non-decompressible varicocele warrants imaging for retroperitoneal mass (e.g., RCC compressing the IVC).",
    category: "Common"
  },
  {
    id: 13,
    dx: "Hydrocele",
    aliases: ["hydrocele", "communicating hydrocele", "noncommunicating hydrocele", "hydrocoele"],
    clues: [
      "A 55-year-old man presents with painless, gradually enlarging right scrotal swelling over the past year.",
      "He denies fever, dysuria, hematuria, or weight loss. No trauma. No history of inguinal hernia repair.",
      "On exam, the right hemiscrotum is markedly enlarged. The mass is soft, non-tender, and the testis is not separately palpable.",
      "The swelling transilluminates brightly with a penlight.",
      "Scrotal ultrasound confirms a large anechoic fluid collection surrounding a normal-appearing testis. No solid component.",
      "Given the size and symptoms, he undergoes hydrocelectomy."
    ],
    teaching: "Painless scrotal swelling that transilluminates = hydrocele. Fluid collection between layers of tunica vaginalis. Adults: often idiopathic, can be reactive (infection, tumor, trauma) - so ALWAYS image with ultrasound to exclude underlying testicular pathology. Children: usually communicating with peritoneum (patent processus vaginalis).",
    category: "Common"
  },
  {
    id: 14,
    dx: "Priapism",
    aliases: ["priapism", "ischemic priapism", "low flow priapism", "low-flow priapism"],
    clues: [
      "A 28-year-old man with sickle cell disease presents to the ED with a painful, persistent erection lasting 6 hours.",
      "The erection was not preceded by sexual stimulation and has not detumesced despite ice and ambulation.",
      "On exam, the corpora cavernosa are rigid and tender; the glans and corpus spongiosum are soft.",
      "Corporal blood gas shows pH 7.10, pO2 25 mmHg, pCO2 70 mmHg, consistent with ischemia.",
      "Penile Doppler ultrasound shows absent cavernosal arterial flow.",
      "He undergoes corporal aspiration and irrigation with diluted phenylephrine, achieving detumescence."
    ],
    teaching: "Painful priapism >4 hours = ischemic (low-flow) priapism = COMPARTMENT SYNDROME of the penis = EMERGENCY. Risk factors: sickle cell, leukemia, intracavernosal injections, trazodone, cocaine. Treatment: aspiration → phenylephrine irrigation → surgical shunt. Non-ischemic (high-flow) priapism is painless, usually post-trauma, less urgent.",
    category: "Emergency"
  },
  {
    id: 15,
    dx: "Paraphimosis",
    aliases: ["paraphimosis"],
    clues: [
      "An 82-year-old uncircumcised man with dementia is brought to the ED by his nursing home aide.",
      "He has been agitated and pulling at his groin for several hours. He had a Foley catheter placed yesterday.",
      "On exam, the foreskin is retracted proximal to the coronal sulcus, with marked edema of the glans.",
      "The foreskin cannot be reduced back over the glans. The glans is dusky and tender.",
      "Manual compression of the glans for 10 minutes is performed, followed by successful manual reduction.",
      "Catheter is replaced with foreskin reduced. Circumcision is recommended electively."
    ],
    teaching: "Paraphimosis = trapped retracted foreskin causing venous congestion → arterial compromise → necrosis. Emergency. Often iatrogenic (catheter placement without reducing foreskin). Manage with compression to reduce edema, then manual reduction; dorsal slit or emergency circumcision if reduction fails. Don't confuse with phimosis (foreskin can't be retracted forward).",
    category: "Emergency"
  },
  {
    id: 16,
    dx: "Phimosis",
    aliases: ["phimosis", "pathologic phimosis", "balanitis xerotica obliterans", "bxo", "lichen sclerosus"],
    clues: [
      "A 40-year-old uncircumcised man presents with progressive difficulty retracting his foreskin over the past year.",
      "He reports painful erections, splayed urinary stream, and recurrent balanitis.",
      "He has type 2 diabetes with HbA1c of 9.4%.",
      "On exam, a white, scarred, fibrotic ring is seen at the tip of the foreskin, which cannot be retracted.",
      "The glans, when partially visible, shows white patches with loss of pigmentation.",
      "Circumcision is performed; pathology confirms lichen sclerosus (balanitis xerotica obliterans)."
    ],
    teaching: "Inability to retract the foreskin. Pathologic phimosis in adults is often due to lichen sclerosus (BXO) - a dermatologic condition presenting with whitish, sclerotic patches. Associated with diabetes and increased risk of penile SCC. Treatment: topical steroids for early disease; circumcision for established phimosis or BXO.",
    category: "Common"
  },
  {
    id: 17,
    dx: "Erectile dysfunction",
    aliases: ["erectile dysfunction", "ed", "impotence", "vasculogenic erectile dysfunction"],
    clues: [
      "A 58-year-old man presents with a 2-year history of progressively worsening difficulty achieving and maintaining erections.",
      "He has hypertension, type 2 diabetes, hyperlipidemia, and a 30-pack-year smoking history.",
      "He has lost morning erections. The onset was gradual. Libido is preserved.",
      "Labs: total testosterone 410 ng/dL (normal), HbA1c 8.6%, LDL 165.",
      "He has reduced lower extremity pulses and an ABI of 0.85 bilaterally.",
      "He is counseled on cardiovascular risk reduction and started on sildenafil 50 mg PRN with good response."
    ],
    teaching: "ED is often the canary in the coal mine for cardiovascular disease - penile arteries (1-2 mm) clog before coronaries (3-4 mm). Workup: history, hormones (testosterone, prolactin if hypogonadal), screen for cardiometabolic disease. First-line: PDE5 inhibitors (sildenafil, tadalafil). Avoid with nitrates.",
    category: "Common"
  },
  {
    id: 18,
    dx: "Peyronie disease",
    aliases: ["peyronie disease", "peyronies disease", "peyronies", "peyronie", "penile fibrosis", "induratio penis plastica"],
    clues: [
      "A 55-year-old man presents with a 9-month history of painful erections and a progressive penile curvature.",
      "He noticed a firm 'lump' on the dorsal aspect of his penile shaft 6 months ago.",
      "His penis curves 45 degrees dorsally with erection, making intercourse difficult.",
      "He has a history of Dupuytren contractures of both hands.",
      "On exam, a palpable, indurated plaque is present on the dorsal midline of the penile shaft.",
      "Penile ultrasound confirms a calcified tunical plaque. He is started on intralesional collagenase clostridium histolyticum injections."
    ],
    teaching: "Acquired fibrotic plaque of the tunica albuginea causing curvature, pain, and ED. Often associated with Dupuytren contractures (same fibrosing diathesis). Two phases: active (painful, evolving curvature, ~12-18 months) → stable. Treatment: intralesional collagenase (CCH/Xiaflex), traction, surgery (plication or grafting) for stable, severe deformity.",
    category: "Common"
  },
  {
    id: 19,
    dx: "Overactive bladder",
    aliases: ["overactive bladder", "oab", "urge incontinence", "urgency incontinence", "detrusor overactivity"],
    clues: [
      "A 62-year-old woman presents with 1 year of urinary urgency, frequency (12 times daily), and nocturia x3.",
      "She has had 4 episodes of urge incontinence in the past month, with a sudden need to void she cannot defer.",
      "She denies dysuria, hematuria, or pelvic pain. No history of recurrent UTI. No prior pelvic surgery.",
      "UA is unremarkable. Post-void residual is 30 mL. Bladder diary confirms her voiding pattern.",
      "Behavioral modification and pelvic floor therapy provide partial benefit.",
      "She is started on mirabegron with significant symptomatic improvement."
    ],
    teaching: "Urgency ± urge incontinence in the absence of obvious cause (infection, stone, malignancy). Workup: UA, PVR, bladder diary; cystoscopy/urodynamics if red flags. Stepwise: behavioral → antimuscarinics (oxybutynin, solifenacin) or beta-3 agonist (mirabegron) → onabotulinumtoxinA → neuromodulation (PTNS, sacral neuromodulation).",
    category: "Common"
  },
  {
    id: 20,
    dx: "Stress urinary incontinence",
    aliases: ["stress urinary incontinence", "sui", "stress incontinence", "genuine stress incontinence"],
    clues: [
      "A 48-year-old woman, G3P3 (all vaginal deliveries), presents with 3 years of urinary leakage.",
      "She leaks small amounts of urine with coughing, sneezing, laughing, and during her exercise classes.",
      "She denies urgency, frequency, or nocturia. She empties her bladder completely with normal stream.",
      "Cough stress test in lithotomy is positive for immediate leakage with cough.",
      "PVR is 20 mL. UA is unremarkable. Urodynamics confirms urodynamic stress incontinence with normal detrusor function.",
      "After failing pelvic floor PT, she undergoes midurethral sling placement with resolution of symptoms."
    ],
    teaching: "Leakage with effort/exertion or sneezing/coughing = SUI. Pathophys: urethral hypermobility ± intrinsic sphincter deficiency. Risk: childbirth, age, menopause, obesity. Treatment: pelvic floor PT (first-line) → pessary → midurethral sling (TVT/TOT) → urethral bulking agents. NOT helped by antimuscarinics.",
    category: "Common"
  },
  {
    id: 21,
    dx: "Posterior urethral valves",
    aliases: ["posterior urethral valves", "puv", "urethral valves", "posterior valves"],
    clues: [
      "A male newborn is noted on prenatal ultrasound at 22 weeks to have bilateral hydronephrosis and a thickened bladder wall.",
      "Postnatally, he has a poor urinary stream described as 'dribbling' rather than a forceful arc.",
      "Abdominal exam reveals a palpable distended bladder.",
      "Creatinine at 48 hours of life is elevated at 1.4 mg/dL (reflecting maternal level, but persistently high).",
      "Voiding cystourethrogram demonstrates a dilated and elongated posterior urethra with a transition point and trabeculated bladder.",
      "Cystoscopy confirms obstructing valves; transurethral valve ablation is performed."
    ],
    teaching: "Most common cause of bladder outlet obstruction in male infants. Antenatal hallmarks: oligohydramnios, megacystis, bilateral hydroureteronephrosis. Postnatal: poor stream, palpable bladder, elevated Cr. VCUG is diagnostic (dilated posterior urethra = 'keyhole sign'). Treatment: catheter decompression → cystoscopic valve ablation. Long-term sequelae include CKD and bladder dysfunction.",
    category: "Pediatric"
  },
  {
    id: 22,
    dx: "Vesicoureteral reflux",
    aliases: ["vesicoureteral reflux", "vur", "ureteral reflux", "vesicoureteric reflux"],
    clues: [
      "A 3-year-old girl presents to the pediatrician with her third febrile UTI in 12 months.",
      "Each prior UTI grew E. coli and responded promptly to antibiotics. Growth and development have been normal.",
      "Renal/bladder ultrasound shows mild left hydronephrosis without scarring.",
      "Voiding cystourethrogram demonstrates retrograde filling of the left ureter and renal pelvis with calyceal blunting during voiding.",
      {
        text: "On the VCUG, the degree of dilation and tortuosity matches the schematic below.",
        image: "/images/cases/vur-grades.svg",
        alt: "Schematic of vesicoureteral reflux grades I–V",
        caption: "Reference: International Reflux Grading I–V (schematic, not a real VCUG)."
      },
      "She is started on continuous antibiotic prophylaxis with TMP-SMX. DMSA later shows a small photopenic upper-pole area consistent with scarring."
    ],
    teaching: "Recurrent febrile UTIs in a young child → image for VUR. Pathophys: short submucosal ureteral tunnel allows retrograde flow. Graded I-V on VCUG. Risk for pyelonephritis → renal scarring → HTN, CKD. Management: low-grade often resolves; prophylactic antibiotics; surgical reimplantation (ureteroneocystostomy) or endoscopic Deflux for high-grade or breakthrough infections.",
    category: "Pediatric"
  },
  {
    id: 23,
    dx: "Wilms tumor",
    aliases: ["wilms tumor", "wilms tumour", "nephroblastoma", "wilms"],
    clues: [
      "A 3-year-old boy is brought in by his mother who felt a firm abdominal mass while bathing him.",
      "He is otherwise asymptomatic. No hematuria, no fever, no weight loss. He has mild hypertension on exam.",
      "He has aniridia and macroglossia (notable features on physical exam).",
      "Abdominal exam reveals a smooth, large, non-tender right-sided mass that does NOT cross midline.",
      "Abdominal ultrasound shows a 9 cm solid right renal mass; CT confirms a heterogeneous renal mass without lymphadenopathy or pulmonary metastases.",
      "He undergoes radical nephrectomy with retroperitoneal lymph node sampling, followed by adjuvant chemotherapy."
    ],
    teaching: "Most common renal tumor in children (peak 2-5 years). May be associated with WAGR (Wilms, Aniridia, GU anomalies, Retardation), Beckwith-Wiedemann, Denys-Drash syndromes. KEY: mass does NOT cross midline (vs neuroblastoma which does). Treatment: surgery + chemotherapy ± radiation. Excellent prognosis (~90% cure).",
    category: "Pediatric"
  },
  {
    id: 24,
    dx: "Cryptorchidism",
    aliases: ["cryptorchidism", "undescended testis", "undescended testicle", "undescended testes"],
    clues: [
      "A 9-month-old boy is brought in for a well-child visit. His mother reports that 'one of his testicles never came down.'",
      "He was born at 36 weeks gestation. The right testis was noted as 'not palpable' at every prior exam.",
      "On exam in a warm room, the left testis is in the scrotum. The right scrotum is empty and underdeveloped.",
      "The right testis is palpable in the inguinal canal but cannot be brought into the scrotum.",
      "Hormonal evaluation is normal. He is referred to pediatric urology.",
      "He undergoes right orchiopexy at 11 months of age."
    ],
    teaching: "Undescended testis is most common GU anomaly in male newborns (~3% term, ~30% preterm). Most descend spontaneously by 6 months; after that, surgical correction (orchiopexy) is indicated, ideally by 12 months. Risks if untreated: infertility, testicular malignancy (~4-10x increased risk, even in the contralateral descended testis), torsion, hernia.",
    category: "Pediatric"
  },
  {
    id: 25,
    dx: "Ureteropelvic junction obstruction",
    aliases: ["ureteropelvic junction obstruction", "upj obstruction", "ureteropelvic obstruction", "upjo", "pelvi-ureteric junction obstruction"],
    clues: [
      "A 14-year-old boy presents with intermittent right flank pain, especially after drinking large amounts of fluid.",
      "Episodes are sometimes accompanied by nausea and vomiting. He has no dysuria or hematuria.",
      "Prenatal ultrasound 14 years ago had shown right hydronephrosis that was thought to have resolved.",
      "Renal ultrasound shows marked right hydronephrosis with a dilated renal pelvis but a non-dilated ureter.",
      "MAG3 renogram with Lasix shows delayed drainage on the right with a t1/2 >20 minutes, indicating obstruction.",
      "He undergoes laparoscopic pyeloplasty (Anderson-Hynes) with resolution of symptoms."
    ],
    teaching: "Most common cause of pediatric hydronephrosis. Functional or anatomic narrowing at the UPJ. 'Dietl crisis' = intermittent flank pain triggered by diuresis. Imaging: ultrasound (hydronephrosis without hydroureter) → diuretic renogram (MAG3 with Lasix). Treatment: pyeloplasty (open or laparoscopic/robotic Anderson-Hynes dismembered pyeloplasty).",
    category: "Pediatric"
  },
  {
    id: 26,
    dx: "Autosomal dominant polycystic kidney disease",
    aliases: ["polycystic kidney disease", "adpkd", "autosomal dominant polycystic kidney disease", "pkd", "adult polycystic kidney disease"],
    clues: [
      "A 42-year-old man presents with new-onset hypertension and recurrent left flank pain.",
      "His father required dialysis at age 55 and died of a 'brain bleed.'",
      "He has had two episodes of gross hematuria, often after vigorous exercise.",
      "On exam, both flanks have palpable, bilateral, irregular masses.",
      "Abdominal ultrasound shows numerous bilateral renal cysts (>10 per kidney) and multiple hepatic cysts.",
      "MR angiogram of the brain shows a 5 mm anterior communicating artery aneurysm; he is referred to neurosurgery."
    ],
    teaching: "Most common inherited renal disease (1:400-1:1000). PKD1 (chr 16, 85%) and PKD2 (chr 4) mutations. Manifestations: HTN, flank pain, hematuria, kidney stones, progressive CKD, hepatic cysts, intracranial aneurysms (~10%), MV prolapse, diverticulosis. Treatment: BP control, tolvaptan (slows progression), screen for aneurysms if family history of SAH.",
    category: "Genetic"
  },
  {
    id: 27,
    dx: "Fournier gangrene",
    aliases: ["fournier gangrene", "fourniers gangrene", "fournier's gangrene", "necrotizing fasciitis of the perineum", "perineal necrotizing fasciitis"],
    clues: [
      "A 58-year-old man with poorly controlled type 2 diabetes and obesity presents with 2 days of severe scrotal pain.",
      "He reports fever to 39.5°C, chills, malaise, and 'pain out of proportion' to exam findings initially.",
      "He is tachycardic (HR 122), hypotensive (BP 88/52), and ill-appearing with WBC 22,000 and lactate 4.2.",
      "On exam, there is marked scrotal erythema, swelling, and crepitus extending to the perineum.",
      "A dusky area with overlying bullae and foul-smelling discharge is now visible. CT shows subcutaneous gas.",
      "He is taken emergently to the OR for wide surgical debridement and started on broad-spectrum antibiotics."
    ],
    teaching: "Necrotizing fasciitis of the perineum/scrotum/genitalia. Polymicrobial (aerobes + anaerobes). Risk: DM, immunosuppression, alcoholism, perineal trauma. CLINICAL DIAGNOSIS - do not delay surgery for imaging. Pain out of proportion → crepitus → bullae → necrosis. Treatment: aggressive surgical debridement + broad-spectrum antibiotics (piperacillin-tazobactam + vanc + clindamycin) + resuscitation. Mortality 20-40%.",
    category: "Emergency"
  },
  {
    id: 28,
    dx: "Renal artery stenosis",
    aliases: ["renal artery stenosis", "ras", "renovascular hypertension", "fibromuscular dysplasia of the renal artery", "atherosclerotic renal artery stenosis"],
    clues: [
      "A 38-year-old woman presents with new-onset hypertension (BP 178/104) that is resistant to 3 antihypertensives.",
      "She has no family history of HTN. No smoking. BMI is normal.",
      "On exam, a high-pitched abdominal bruit is auscultated in the right upper quadrant.",
      "She develops AKI (Cr rising from 0.9 to 1.6) within 1 week of starting lisinopril, which is then discontinued.",
      "CT angiogram of the renal arteries shows a 'string of beads' appearance of the mid-distal right renal artery.",
      "She undergoes percutaneous transluminal angioplasty without stenting with normalization of blood pressure."
    ],
    teaching: "Two flavors: atherosclerotic (older, smokers, comorbid CV disease, ostial lesions) and fibromuscular dysplasia (young women, mid-distal renal artery, 'string of beads'). Clues: resistant HTN, AKI on ACEi/ARB, abdominal bruit, asymmetric kidneys. Treatment: BP control; angioplasty (FMD - usually no stent) or stenting (atherosclerotic - controversial).",
    category: "Common"
  },
  {
    id: 29,
    dx: "Interstitial cystitis",
    aliases: ["interstitial cystitis", "bladder pain syndrome", "ic", "ic bps", "painful bladder syndrome"],
    clues: [
      "A 34-year-old woman presents with 2 years of suprapubic pain, urinary frequency, and urgency.",
      "She voids 18 times per day and 4 times at night. Pain worsens with bladder filling and is relieved with voiding.",
      "Multiple urine cultures over 2 years have been negative. She has been treated empirically with antibiotics without lasting improvement.",
      "She has comorbid fibromyalgia and irritable bowel syndrome.",
      "Cystoscopy with hydrodistention reveals glomerulations and one Hunner lesion.",
      "She is managed with dietary modification, amitriptyline, and intravesical DMSO instillations."
    ],
    teaching: "Chronic bladder pain syndrome - pain perceived as bladder origin worsening with filling, relieved by voiding, with urinary frequency/urgency, in absence of infection. Highly associated with other chronic pain syndromes. Diagnosis is clinical; cystoscopy may show Hunner lesions in a subset. Treatment is multimodal: behavioral, oral (amitriptyline, pentosan polysulfate), intravesical, neuromodulation.",
    category: "Chronic"
  },
  {
    id: 30,
    dx: "Pheochromocytoma",
    aliases: ["pheochromocytoma", "pheo", "phaeochromocytoma", "adrenal pheochromocytoma"],
    clues: [
      "A 35-year-old woman presents with episodic headaches, palpitations, and profuse sweating.",
      "During these episodes, her blood pressure spikes to 220/130 mmHg. Between episodes, BP is normal.",
      "She reports significant anxiety and a recent 10-lb unintentional weight loss.",
      "Her brother had medullary thyroid cancer at age 28 (raises suspicion for MEN 2).",
      "Plasma free metanephrines and 24-hour urine metanephrines are markedly elevated (>4x ULN).",
      "CT abdomen reveals a 4 cm right adrenal mass with HU >20. After alpha-blockade with phenoxybenzamine, she undergoes laparoscopic adrenalectomy."
    ],
    teaching: "Catecholamine-secreting tumor of adrenal medulla (or extra-adrenal paraganglioma). Classic triad: episodic headache, sweating, palpitations + paroxysmal HTN. 'Rule of 10s' (10% bilateral, extra-adrenal, malignant, familial, etc.) - though hereditary now thought to be ~30%. Workup: plasma free or 24h urine metanephrines → CT/MRI → consider MIBG. CRITICAL: alpha-blockade BEFORE beta-blockade BEFORE surgery to prevent hypertensive crisis. Associations: MEN 2A/2B, VHL, NF1.",
    category: "Endocrine"
  },
  {
    id: 31,
    dx: "Renal abscess",
    aliases: ["renal abscess", "perinephric abscess", "intrarenal abscess", "renal carbuncle", "kidney abscess"],
    clues: [
      "A 52-year-old woman with type 2 diabetes presents with 7 days of right flank pain and fever to 39.2°C.",
      "She was treated 10 days ago for a UTI with oral cephalexin without improvement.",
      "She appears toxic. Labs: WBC 19,000 with left shift, glucose 380, HbA1c 11.2%.",
      "UA: pyuria, bacteriuria. Blood cultures grow E. coli.",
      "CT abdomen with contrast shows a 4 cm rim-enhancing fluid collection within the right renal parenchyma.",
      "She undergoes CT-guided percutaneous drainage and is treated with prolonged IV antibiotics with full recovery."
    ],
    teaching: "Suspect renal abscess in a patient with pyelonephritis not improving on antibiotics in 48-72 hours, especially with diabetes or obstruction. CT or US for diagnosis. Treatment: antibiotics alone for <3-5 cm; percutaneous drainage for larger or non-responsive lesions. Surgical drainage rarely needed. Don't miss perinephric abscess (collection in Gerota fascia) - often needs drainage.",
    category: "Infection"
  },
  {
    id: 32,
    dx: "Bladder rupture",
    aliases: ["bladder rupture", "intraperitoneal bladder rupture", "extraperitoneal bladder rupture", "bladder injury", "traumatic bladder rupture"],
    clues: [
      "A 25-year-old intoxicated man is brought to the trauma bay after a high-speed MVC. He was the restrained driver.",
      "On primary survey, he has a pelvic fracture (open book). He complains of suprapubic pain and inability to void.",
      "A Foley catheter is placed and returns 50 mL of gross hematuria.",
      "FAST exam shows fluid in the pelvis. Vitals are stable after 2 L crystalloid.",
      "CT cystogram with retrograde filling demonstrates contrast extravasation into the perivesical space without intraperitoneal spread.",
      "Given extraperitoneal rupture, he is managed with Foley drainage for 10-14 days; intraperitoneal rupture would require operative repair."
    ],
    teaching: "Gross hematuria + pelvic fracture = think bladder. CT cystogram is the diagnostic test (NOT regular CT - need retrograde filling). Extraperitoneal rupture (~80%, often pelvic fracture spike) → catheter drainage; Intraperitoneal rupture (~20%, blunt blow to full bladder) → surgical repair. Iatrogenic injury during gyn/uro surgery also common.",
    category: "Trauma"
  },
  {
    id: 33,
    dx: "Urethral stricture",
    aliases: ["urethral stricture", "urethral strictures", "stricture", "anterior urethral stricture", "posterior urethral stricture", "urethral stenosis"],
    clues: [
      "A 67-year-old man presents with progressively worsening weak urinary stream and post-void dribbling over 2 years.",
      "He underwent transurethral resection of the prostate 5 years ago and had a prolonged catheterization for 3 months after a CABG.",
      "He reports straining to void, splaying of the stream, and recurrent UTIs.",
      "Post-void residual is 350 mL. Uroflowmetry shows Qmax of 4 mL/s with a plateau-shaped curve.",
      "Retrograde urethrogram demonstrates a 2.5 cm narrowed segment in the bulbar urethra.",
      "Given length and prior failed dilations, he undergoes buccal mucosa graft urethroplasty."
    ],
    teaching: "Causes: iatrogenic (catheter, TURP), trauma (pelvic fracture posterior stricture, straddle injury bulbar stricture), inflammation (lichen sclerosus), infection (gonorrhea historically). Diagnosis: retrograde urethrogram ± VCUG. Treatment ladder: dilation/DVIU for short, first-time strictures → urethroplasty (gold standard for recurrent or long strictures, with buccal mucosa graft for long anterior strictures).",
    category: "Common"
  },
  {
    id: 34,
    dx: "Neurogenic bladder",
    aliases: ["neurogenic bladder", "detrusor sphincter dyssynergia", "neurogenic lower urinary tract dysfunction", "neuropathic bladder"],
    clues: [
      "A 32-year-old woman with multiple sclerosis presents with new urinary incontinence, urgency, and recurrent UTIs.",
      "She also reports incomplete bladder emptying and a sense of urinary retention between incontinence episodes.",
      "She has spastic lower extremity weakness, hyperreflexia, and a positive Babinski sign on neuro exam.",
      "PVR is 350 mL. UA shows pyuria; culture grows mixed flora.",
      "Urodynamics show detrusor overactivity with simultaneous involuntary external sphincter contraction during voiding.",
      "She is taught clean intermittent catheterization and started on an antimuscarinic, with referral for botulinum toxin if uncontrolled."
    ],
    teaching: "Bladder dysfunction from neurologic disease (MS, spinal cord injury, spina bifida, diabetes, Parkinson's). Suprapontine lesions → urgency/UUI; spinal cord lesions above T12 → detrusor sphincter dyssynergia (high pressures → upper tract damage!) → 'hostile bladder'. Goals: protect upper tracts, achieve continence, prevent UTIs. Modalities: CIC, antimuscarinics, botox, neuromodulation, augmentation cystoplasty.",
    category: "Chronic"
  },
  {
    id: 35,
    dx: "Penile cancer",
    aliases: ["penile cancer", "penile squamous cell carcinoma", "penile scc", "carcinoma of the penis", "squamous cell carcinoma of the penis"],
    clues: [
      "A 64-year-old uncircumcised man with phimosis presents with a 6-month history of a non-healing ulcer on the glans.",
      "He has a history of smoking and prior treatment for HPV-related anogenital warts.",
      "He retracted his foreskin for the first time in years recently, revealing the lesion.",
      "Exam: 1.5 cm ulcerated, indurated lesion at the glans with palpable left inguinal lymphadenopathy.",
      "Punch biopsy returns invasive, moderately differentiated squamous cell carcinoma.",
      "He undergoes partial penectomy with bilateral inguinal lymph node dissection and HPV testing of the specimen."
    ],
    teaching: "Rare in circumcised men. Risk factors: phimosis (#1 modifiable), HPV (esp. 16, 18), smoking, lichen sclerosus, poor hygiene. Presents as a non-healing ulcer or exophytic lesion. Workup: biopsy + MRI penis (T staging) + inguinal nodal evaluation. Treatment: organ-preserving when possible (topical chemo, laser, glansectomy) for small/superficial, partial/total penectomy for invasive; inguinal LND for higher-risk disease.",
    category: "Oncology"
  },
  {
    id: 36,
    dx: "Hypospadias",
    aliases: ["hypospadias", "distal hypospadias", "proximal hypospadias"],
    clues: [
      "A newborn boy is noted on exam to have an abnormal-appearing penis. The pediatrician defers circumcision.",
      "On closer inspection, the urethral meatus is located on the ventral surface of the penis just proximal to the glans.",
      "The foreskin is incomplete on the ventral side (dorsal hood) and excess on the dorsal side.",
      "A subtle ventral curvature of the penis (chordee) is appreciated when the penis is stretched.",
      "Testes are bilaterally descended. There are no other anomalies on exam.",
      "He is referred to pediatric urology; surgical repair is planned at 6-12 months of age."
    ],
    teaching: "Ventral meatus + dorsal hooded foreskin + chordee (the triad). 1:200 male births. Classified by meatal location (glanular, coronal, penile, scrotal, perineal). DO NOT CIRCUMCISE - foreskin is used for the repair. Repair at 6-12 months. If proximal hypospadias + cryptorchidism → think DSD, get karyotype.",
    category: "Pediatric"
  },
  {
    id: 37,
    dx: "Bladder exstrophy",
    aliases: ["bladder exstrophy", "exstrophy", "exstrophy of the bladder", "exstrophy epispadias complex"],
    clues: [
      "A newborn is delivered at term. On initial exam, the abdominal wall and bladder are visibly abnormal.",
      "The bladder mucosa is exposed on the lower abdominal wall as a red, glistening, everted plate.",
      "The umbilicus is low-set. The pubic symphysis is widely separated on palpation.",
      "In this male infant, the penis is short and broad with an epispadiac urethra (dorsal opening).",
      "Renal ultrasound shows normal kidneys without hydronephrosis.",
      "He is transferred to a tertiary pediatric urology center for staged closure beginning within 72 hours of birth."
    ],
    teaching: "Failure of midline closure: exposed bladder plate + epispadias + pubic diastasis. Part of the exstrophy-epispadias complex. Rare (1:30,000-50,000). Repair is staged (modern staged repair of exstrophy = MSRE) or in some centers, complete primary repair. Goals: continence, fertility, sexual function, cosmesis.",
    category: "Pediatric"
  },
  {
    id: 38,
    dx: "Xanthogranulomatous pyelonephritis",
    aliases: ["xanthogranulomatous pyelonephritis", "xgp", "xanthogranulomatous"],
    clues: [
      "A 58-year-old woman with poorly controlled diabetes presents with 3 months of low-grade fevers, malaise, and a 20-lb weight loss.",
      "She has chronic left flank pain and has had recurrent UTIs and a history of staghorn calculus.",
      "On exam, she is cachectic with a palpable left flank mass and CVA tenderness.",
      "Labs: WBC 14, hemoglobin 8.2, ESR 110. Urine culture grows Proteus mirabilis.",
      "CT shows a large staghorn calculus, a non-functioning enlarged left kidney with multiple low-attenuation 'bear paw' regions, and perinephric stranding.",
      "Open nephrectomy is performed; pathology shows lipid-laden foamy macrophages replacing renal parenchyma."
    ],
    teaching: "Chronic granulomatous infection of the kidney, classically with obstruction (staghorn calculus) and chronic infection (often Proteus). Mimics malignancy clinically and radiographically. CT 'bear paw' sign with central staghorn. Treatment: nephrectomy (often technically challenging due to inflammation). Histology: lipid-laden foamy macrophages (xanthoma cells).",
    category: "Infection"
  },
  {
    id: 39,
    dx: "Angiomyolipoma",
    aliases: ["angiomyolipoma", "aml", "renal angiomyolipoma", "renal aml"],
    clues: [
      "A 38-year-old woman with tuberous sclerosis is being followed for known bilateral renal masses.",
      "She presents to the ED with sudden severe left flank pain, hypotension (BP 84/50), and tachycardia.",
      "Hematocrit has dropped from a baseline of 38% to 24% over hours.",
      "CT abdomen shows a 7 cm fat-containing left renal mass (HU -40 in foci) with active extravasation of contrast and a large perinephric hematoma (Wunderlich syndrome).",
      "She is resuscitated and undergoes emergent selective renal artery embolization with hemostasis.",
      "Subsequent imaging confirms shrinkage of multiple bilateral fat-containing renal masses on sirolimus therapy."
    ],
    teaching: "Benign mesenchymal tumor of fat, smooth muscle, and abnormal vessels (PEComa family). 80% sporadic, 20% with tuberous sclerosis (often bilateral, multifocal). Fat-containing on CT is pathognomonic. Risk of spontaneous hemorrhage (Wunderlich syndrome) rises with size >4 cm. Management: surveillance if small; intervention (embolization, partial nephrectomy, mTOR inhibitor for TSC) for large or symptomatic.",
    category: "Oncology"
  },
  {
    id: 40,
    dx: "Urinary tract infection",
    aliases: ["urinary tract infection", "uti", "acute cystitis", "uncomplicated uti", "cystitis", "lower urinary tract infection", "bladder infection"],
    clues: [
      "A 24-year-old sexually active woman presents with 2 days of dysuria, frequency, and urgency.",
      "She also reports suprapubic discomfort. No fever, no flank pain, no vaginal discharge.",
      "She has had one prior similar episode that responded to nitrofurantoin.",
      "On exam, she is afebrile with mild suprapubic tenderness. No CVA tenderness.",
      "UA: positive leukocyte esterase and nitrites, 50 WBCs/hpf, few RBCs.",
      "She is treated empirically with nitrofurantoin 100 mg BID x 5 days without need for culture."
    ],
    teaching: "Uncomplicated cystitis in a young, non-pregnant woman with dysuria/frequency/urgency. E. coli causes ~80%. Treat empirically. First-line agents: nitrofurantoin x 5d, TMP-SMX x 3d (if local resistance <20%), fosfomycin single dose. Avoid fluoroquinolones for uncomplicated UTI. Complicated UTI (men, pregnant, immunocompromised, anatomic abnormality) requires culture and longer courses.",
    category: "Common"
  },
  {
    id: 41,
    dx: "Chronic pelvic pain syndrome",
    aliases: ["chronic pelvic pain syndrome", "cpps", "chronic prostatitis", "chronic nonbacterial prostatitis", "prostatitis category iii", "chronic prostatitis chronic pelvic pain syndrome"],
    clues: [
      "A 38-year-old man presents with 8 months of intermittent perineal and pelvic pain.",
      "He reports pain with ejaculation, mild voiding symptoms, and decreased libido. No fever.",
      "Multiple urine cultures over the past year have been negative.",
      "He has been treated with three courses of antibiotics without lasting benefit.",
      "On exam, the prostate is non-tender. UA, urethral swab, and expressed prostatic secretions cultures are all negative.",
      "He is managed with pelvic floor physical therapy, alpha-blockers, and SNRI for pain modulation."
    ],
    teaching: "NIH category III prostatitis: chronic pelvic pain without identifiable infection. Diagnosis of exclusion. UPOINT phenotyping (urinary, psychosocial, organ-specific, infection, neurologic, tenderness of skeletal muscles) guides multimodal treatment. Antibiotics not helpful unless cultures positive. High rates of co-existing fibromyalgia, IBS, and depression.",
    category: "Chronic"
  },
  {
    id: 42,
    dx: "Mumps orchitis",
    aliases: ["mumps orchitis", "viral orchitis", "orchitis"],
    clues: [
      "A 22-year-old unvaccinated male graduate student presents with 4 days of bilateral parotid swelling, malaise, and fever.",
      "Two days into the illness he develops severe right testicular pain and swelling.",
      "There is no dysuria or urethral discharge.",
      "He recently returned from a study-abroad program during an outbreak of mumps in his university dormitory.",
      "On exam, parotid glands are tender and enlarged. The right testis is markedly swollen, tender, and erythematous.",
      "Mumps IgM is positive. Treatment is supportive: ice, scrotal elevation, NSAIDs. He is counseled on the ~10% risk of subfertility from atrophy."
    ],
    teaching: "Viral orchitis (most commonly mumps) typically follows or accompanies parotitis by 4-8 days. Often bilateral in mumps. Treatment is supportive — antibiotics do not help. Sequelae include testicular atrophy and subfertility in ~30-50% of involved testes, though bilateral infertility is uncommon. MMR vaccination is highly preventive.",
    category: "Infection"
  },
  {
    id: 43,
    dx: "Spermatocele",
    aliases: ["spermatocele", "epididymal cyst", "spermatic cyst"],
    clues: [
      "A 48-year-old man presents with a painless, slowly growing right scrotal mass that he discovered 6 months ago.",
      "It is not painful and has not interfered with daily activities. No fever, no urinary symptoms.",
      "On exam, a 1.5 cm soft, cystic, non-tender mass is palpable separately from and superior to the right testis.",
      "The testis itself is normal in size and consistency. The mass transilluminates brightly.",
      "Scrotal ultrasound shows a 1.5 cm anechoic cystic lesion arising from the head of the epididymis.",
      "He is reassured. Surveillance only; surgery reserved for symptomatic or large lesions."
    ],
    teaching: "Cystic dilation of the epididymal duct, usually at the head. Painless, separately palpable from testis, transilluminates (vs solid mass = malignancy concern). Often incidental. Most managed expectantly; spermatocelectomy if pain, large size, or cosmetic concern (with risk of post-op infertility from epididymal scarring).",
    category: "Common"
  },
  {
    id: 44,
    dx: "Adrenal incidentaloma",
    aliases: ["adrenal incidentaloma", "incidental adrenal adenoma", "non functioning adrenal adenoma", "nonfunctioning adrenal adenoma", "adrenal adenoma"],
    clues: [
      "A 59-year-old woman has a CT abdomen for nonspecific abdominal pain.",
      "Imaging shows a 2.2 cm well-circumscribed, homogeneous lesion in the left adrenal gland.",
      "She is asymptomatic and has no history of malignancy. BP is 124/78. No virilization or Cushingoid features.",
      "The lesion measures -8 Hounsfield units on non-contrast CT with >60% absolute washout on delayed phase.",
      "Workup: plasma free metanephrines, 1-mg dexamethasone suppression test, and aldosterone:renin ratio are all normal.",
      "She is followed clinically. No additional imaging is required given benign features and biochemical inactivity."
    ],
    teaching: "Found in ~5% of abdominal CTs. Workup answers two questions: (1) is it functioning? (cortisol, catecholamines/metanephrines, aldosterone if hypertensive); (2) is it benign? CT features favoring benign adenoma: <4 cm, smooth borders, <10 HU on non-contrast (lipid-rich), high washout. Surgery for: functioning, >4 cm, suspicious imaging features, or significant growth on surveillance.",
    category: "Endocrine"
  },
  {
    id: 45,
    dx: "Primary hyperaldosteronism",
    aliases: ["primary hyperaldosteronism", "conn syndrome", "conns syndrome", "aldosteronoma", "primary aldosteronism"],
    clues: [
      "A 44-year-old woman with resistant hypertension (3-drug regimen, BP still 168/102) presents for evaluation.",
      "She reports muscle cramps, weakness, and excessive nocturnal urination.",
      "Labs: potassium 2.9 mmol/L, sodium 144, bicarbonate 30. Metabolic alkalosis present.",
      "Plasma aldosterone is 35 ng/dL, plasma renin activity is suppressed at <0.2 ng/mL/hr (ARR > 100).",
      "Saline suppression test fails to suppress aldosterone, confirming the diagnosis.",
      "CT shows a 1.4 cm left adrenal nodule. Adrenal vein sampling confirms unilateral lateralization. She undergoes laparoscopic left adrenalectomy with HTN resolution."
    ],
    teaching: "Most common secondary cause of HTN (~5-10% of hypertensives, more in resistant HTN). Hallmarks: HTN + hypokalemia (though K may be normal) + metabolic alkalosis. Screen with aldosterone:renin ratio (>20-30). Confirm with salt-loading. Subtype: AVS distinguishes unilateral adenoma (surgery) from bilateral hyperplasia (mineralocorticoid receptor antagonist).",
    category: "Endocrine"
  },
  {
    id: 46,
    dx: "Cushing syndrome",
    aliases: ["cushing syndrome", "cushings syndrome", "adrenal cushing", "hypercortisolism", "cortisol producing adenoma"],
    clues: [
      "A 38-year-old woman presents with 18 months of weight gain, easy bruising, and proximal muscle weakness.",
      "On exam: central obesity, moon facies, dorsocervical fat pad, wide purple abdominal striae, and thin extremities.",
      "BP 158/94, fasting glucose 178 mg/dL. New-onset hirsutism and acne.",
      "Late-night salivary cortisol is elevated; 24-hour urine free cortisol is 4x ULN; 1-mg overnight dexamethasone fails to suppress cortisol.",
      "ACTH is suppressed at <5 pg/mL, indicating an ACTH-independent (adrenal) source.",
      "CT abdomen reveals a 3.5 cm right adrenal mass. She undergoes right adrenalectomy with perioperative glucocorticoid replacement."
    ],
    teaching: "Cushing SYNDROME = hypercortisolism from any source; Cushing DISEASE = pituitary ACTH-secreting adenoma. Steps: confirm hypercortisolism (24h UFC, late-night salivary cortisol, dex suppression — need 2 abnormal) → measure ACTH (suppressed = adrenal; elevated = pituitary or ectopic) → image. Most common etiology overall is exogenous steroids — always check medications first.",
    category: "Endocrine"
  },
  {
    id: 47,
    dx: "Horseshoe kidney",
    aliases: ["horseshoe kidney", "fused kidneys", "horseshoe"],
    clues: [
      "A 28-year-old man presents with his second episode of left-sided renal colic in 18 months.",
      "He reports a long-standing history of vague abdominal pain and recurrent UTIs since childhood.",
      "On non-contrast CT, both kidneys are abnormally low-lying, and their lower poles are connected by a band of renal tissue crossing the midline anterior to the great vessels.",
      "Multiple renal arteries are noted on CT angiography.",
      "An obstructing 5 mm calculus is seen in the left renal pelvis, with mild hydronephrosis above an aberrant configuration of the renal pelvis.",
      "He undergoes flexible ureteroscopy with laser lithotripsy; long-term he is at increased risk of stones, UTIs, UPJ obstruction, and Wilms tumor (in pediatric cases)."
    ],
    teaching: "Most common renal fusion anomaly (~1:400). Lower poles fused by isthmus, blocked from normal ascent by IMA. Higher rates of: UPJ obstruction, stones, UTI, Wilms tumor (in children), renal cancer (slight). Often incidental but symptoms relate to anatomic distortion. Associated with Turner syndrome, trisomy 18.",
    category: "Genetic"
  },
  {
    id: 48,
    dx: "Renal vein thrombosis",
    aliases: ["renal vein thrombosis", "rvt"],
    clues: [
      "A 52-year-old man with known membranous nephropathy and nephrotic-range proteinuria (8 g/day) presents with sudden severe left flank pain.",
      "He also reports gross hematuria and new-onset leg swelling.",
      "Serum albumin is 1.8 g/dL; antithrombin III is low. He has no recent trauma or surgery.",
      "Ultrasound Doppler shows an enlarged left kidney with absent venous flow in the renal vein.",
      "CT venography confirms thrombus extending from the left renal vein into the IVC.",
      "He is started on therapeutic anticoagulation. Long-term anticoagulation is recommended while nephrotic syndrome is active."
    ],
    teaching: "Nephrotic syndrome — especially membranous nephropathy — is highly thrombogenic from urinary loss of antithrombin III and protein S. RVT can be acute (flank pain, hematuria, AKI) or chronic (asymptomatic). Other causes: tumor invasion (RCC), trauma, hypercoagulable state. Treatment: anticoagulation; thrombolysis or thrombectomy for severe cases.",
    category: "Common"
  },
  {
    id: 49,
    dx: "Post-streptococcal glomerulonephritis",
    aliases: ["post streptococcal glomerulonephritis", "poststreptococcal glomerulonephritis", "psgn", "post strep gn", "acute glomerulonephritis"],
    clues: [
      "A 7-year-old boy presents with 1 week of tea-colored urine and periorbital swelling.",
      "He had a strep pharyngitis 3 weeks ago that was treated with a 7-day course of amoxicillin.",
      "BP is 142/92 (elevated for age). He has mild bilateral lower extremity edema.",
      "UA: 3+ blood, 1+ protein, RBC casts on microscopy.",
      "Complement studies: C3 markedly decreased, C4 normal. Anti-streptolysin O (ASO) titer elevated.",
      "He is managed supportively with salt restriction, diuresis for hypertension and edema. Renal function normalizes over weeks."
    ],
    teaching: "Classic 'nephritic syndrome' in a child 1-3 weeks after strep pharyngitis or impetigo. Hallmarks: hematuria with RBC casts, mild proteinuria, HTN, edema, low C3 (normal C4) — immune complex deposition. Self-limited; supportive care. Adults can also develop PSGN with poorer prognosis.",
    category: "Common"
  },
  {
    id: 50,
    dx: "IgA nephropathy",
    aliases: ["iga nephropathy", "iga gn", "berger disease", "bergers disease", "iga"],
    clues: [
      "A 27-year-old man presents with episodes of painless gross hematuria, each lasting 1-3 days.",
      "The first episode occurred 24 hours after a viral upper respiratory infection. He has had 3 similar episodes over 2 years.",
      "Between episodes he has persistent microscopic hematuria and mild proteinuria (0.6 g/day).",
      "Serum creatinine is 1.0 mg/dL. Complement (C3/C4) and ANA are normal.",
      "Renal biopsy shows mesangial proliferation with IgA-dominant immune complex deposition on immunofluorescence.",
      "He is started on optimized blood pressure control with an ACEi and counseled on long-term renal follow-up; ~25-30% progress to ESRD over decades."
    ],
    teaching: "Most common primary glomerulonephritis worldwide. Classic 'synpharyngitic hematuria' — gross hematuria within 1-2 days of URI (vs PSGN's 1-3 week lag). Biopsy: mesangial IgA deposits. Variable course — half stable, ~25-30% progress. Treatment: BP/proteinuria control (ACEi/ARB); immunosuppression for high-risk disease.",
    category: "Common"
  },
  {
    id: 51,
    dx: "Renal trauma",
    aliases: ["renal trauma", "renal injury", "blunt renal trauma", "kidney laceration", "renal laceration"],
    clues: [
      "A 22-year-old woman is brought to the trauma bay after a high-speed MVC. She is hemodynamically stable after 1 L crystalloid.",
      "She has left flank pain, ecchymosis, and gross hematuria.",
      "Hemoglobin is 11.4. She has lower rib fractures on the left.",
      "CT abdomen with delayed (excretory) phase shows a deep parenchymal laceration extending into the collecting system with perinephric hematoma but no active extravasation.",
      "Injury is graded AAST Grade IV. She remains hemodynamically stable on observation.",
      "Non-operative management with bed rest, serial hemoglobins, and follow-up imaging. Selective angioembolization is held in reserve for delayed bleeding."
    ],
    teaching: "Most common GU trauma. Mechanism: blunt (~90% — MVC, sports) or penetrating. AAST grading I-V. Indications for imaging in blunt: gross hematuria, microscopic hematuria with shock, deceleration injury, penetrating mechanism. Most are managed non-operatively even at high grades if stable. Operative indications: hemodynamic instability not responsive to resuscitation, expanding/pulsatile hematoma at laparotomy.",
    category: "Trauma"
  },
  {
    id: 52,
    dx: "Posterior urethral injury",
    aliases: ["posterior urethral injury", "membranous urethral disruption", "urethral disruption", "pelvic fracture urethral injury"],
    clues: [
      "A 31-year-old man is brought to the trauma bay after a fall from height; pelvic exam reveals an open-book pelvic fracture.",
      "He reports inability to urinate, with blood at the urethral meatus.",
      "On rectal exam, the prostate is high-riding and not well-defined.",
      "Foley catheterization is deferred; suprapubic catheter is placed for urinary diversion.",
      "Retrograde urethrogram shows complete disruption of the membranous urethra with extravasation of contrast.",
      "Delayed urethroplasty is planned at 3 months when the pelvic hematoma has resolved."
    ],
    teaching: "Blood at meatus + pelvic fracture = posterior urethral injury until proven otherwise. DO NOT pass a Foley — get retrograde urethrogram first. Urinary diversion: SP tube. Management: primary realignment vs delayed urethroplasty (most common modern approach for complete disruption). Long-term sequelae: stricture (very common), ED, incontinence.",
    category: "Trauma"
  },
  {
    id: 53,
    dx: "Urinary schistosomiasis",
    aliases: ["urinary schistosomiasis", "schistosoma haematobium", "schistosomiasis", "bilharzia", "bilharziasis"],
    clues: [
      "A 19-year-old man who recently immigrated from rural Egypt presents with intermittent painless terminal gross hematuria over 6 months.",
      "He spent his childhood swimming and bathing in irrigation canals from the Nile River.",
      "He reports mild dysuria and a sensation of incomplete emptying. No fever, no flank pain.",
      "UA: numerous RBCs and eosinophils. Urine microscopy shows ova with a terminal spine.",
      "Cystoscopy shows yellowish 'sandy patches' and granulomas of the bladder mucosa. Biopsy shows chronic inflammation with calcified ova.",
      "He is treated with praziquantel; long-term surveillance is planned for the increased risk of bladder squamous cell carcinoma."
    ],
    teaching: "Schistosoma haematobium infestation from freshwater contact. Endemic in sub-Saharan Africa and Middle East. Eggs (terminal spine — vs S. mansoni's lateral spine) lodge in bladder mucosa causing inflammation, fibrosis, and 'sandy patches.' Long-term: contracted bladder, calcifications, hydroureteronephrosis, and #1 risk factor for bladder SQUAMOUS cell carcinoma (vs urothelial in the West).",
    category: "Infection"
  },
  {
    id: 54,
    dx: "Genitourinary tuberculosis",
    aliases: ["genitourinary tuberculosis", "gu tb", "renal tuberculosis", "urinary tb", "urogenital tuberculosis"],
    clues: [
      "A 42-year-old man who emigrated from India 4 years ago presents with 3 months of sterile pyuria, low-grade fevers, and weight loss.",
      "He has had recurrent UTI symptoms unresponsive to multiple antibiotic courses.",
      "Repeat urine cultures are negative for routine bacteria despite >10 WBCs/hpf.",
      "He has a history of pulmonary tuberculosis treated 10 years ago — completion of therapy is uncertain.",
      "CT shows a calcified, scarred right kidney with multiple irregular cavities and 'putty kidney' appearance. The right ureter shows beaded strictures.",
      "Urine acid-fast bacilli smears are negative, but Mycobacterium tuberculosis is grown on culture and PCR-positive. He starts 4-drug RIPE therapy."
    ],
    teaching: "Sterile pyuria + scarring/calcified kidney + ureteral strictures in a patient from a TB-endemic area = think GU TB. Diagnosis: urine AFB smear (low yield), culture (gold standard, slow), PCR (NAAT). Imaging: parenchymal scarring, calcifications, 'beaded' ureters, autonephrectomy/'putty kidney'. Treatment: standard anti-TB regimen 6+ months ± surgery for non-functioning kidney or obstruction.",
    category: "Infection"
  },
  {
    id: 55,
    dx: "Gonococcal urethritis",
    aliases: ["gonococcal urethritis", "gonorrhea", "gonorrhoea", "gc urethritis", "neisseria gonorrhoeae urethritis"],
    clues: [
      "A 23-year-old sexually active man presents with 2 days of dysuria and a thick, purulent urethral discharge.",
      "He has had three new sexual partners in the past 2 months. No condom use.",
      "On exam, a copious yellow-green discharge is expressed from the urethral meatus. The testes are non-tender.",
      "Gram stain of discharge shows abundant intracellular gram-negative diplococci within neutrophils.",
      "NAAT is positive for Neisseria gonorrhoeae; also positive for Chlamydia trachomatis (~30% co-infection rate).",
      "He receives a single dose of ceftriaxone 500 mg IM plus doxycycline 100 mg BID x 7 days for the chlamydial co-infection. Partners are notified and treated."
    ],
    teaching: "Profuse purulent discharge with abrupt onset (vs the watery/scant discharge of nongonococcal urethritis, which is more often Chlamydia). Diagnosis: NAAT (urine or swab). Treatment: ceftriaxone IM single dose; co-treat for Chlamydia (doxy x 7d) unless NAAT-excluded. Expedited partner therapy. Screen for syphilis and HIV.",
    category: "Infection"
  },
  {
    id: 56,
    dx: "Renal papillary necrosis",
    aliases: ["renal papillary necrosis", "papillary necrosis", "rpn"],
    clues: [
      "A 34-year-old man with sickle cell trait presents with right flank pain and gross hematuria.",
      "He has chronic low back pain treated with daily ibuprofen for years. He also has poorly controlled diabetes.",
      "UA: numerous RBCs, mild proteinuria. UA microscopy shows necrotic papillary tissue.",
      "He has a recent history of pyelonephritis 6 weeks ago.",
      "CT urogram shows a 'ring sign' — contrast outlining a sloughed papilla in the right collecting system, with associated hydronephrosis.",
      "Management: treat the underlying causes (DM, NSAIDs), relieve obstruction if present, supportive care."
    ],
    teaching: "Sloughing of renal papillae from vasa recta compromise. Classic mnemonic POSTCARDS: Pyelonephritis, Obstruction, Sickle cell, TB, Cirrhosis/Cancer, Analgesic abuse (NSAIDs, phenacetin), Renal vein thrombosis, Diabetes, Systemic vasculitis. Triad of analgesic nephropathy, sickle cell, and diabetes is classic. Imaging: 'ring sign,' 'lobster claw' deformity of papilla.",
    category: "Common"
  },
  {
    id: 57,
    dx: "Oncocytoma",
    aliases: ["oncocytoma", "renal oncocytoma"],
    clues: [
      "A 64-year-old woman has a 3.5 cm right renal mass discovered incidentally on a CT done for diverticulitis.",
      "She is asymptomatic. No hematuria, no weight loss, no flank pain.",
      "Family history is unremarkable. No history of smoking or aniline dye exposure.",
      "CT shows a well-circumscribed enhancing renal mass with a central stellate scar.",
      "MRI confirms the central scar and homogeneous enhancement; however, imaging cannot reliably distinguish from chromophobe RCC.",
      "Renal mass biopsy returns oncocytoma. Active surveillance is offered with serial imaging; partial nephrectomy is held in reserve."
    ],
    teaching: "Benign renal neoplasm of intercalated cell origin. Classic CT/MRI feature: central stellate scar (~30%, NOT pathognomonic — chromophobe RCC can mimic). Cannot be reliably distinguished from RCC by imaging alone → biopsy or surgery often needed. Hybrid oncocytic-chromophobe tumors exist in Birt-Hogg-Dubé. Management: surveillance for biopsy-proven oncocytoma in select cases; otherwise partial nephrectomy.",
    category: "Oncology"
  },
  {
    id: 58,
    dx: "Von Hippel-Lindau disease",
    aliases: ["von hippel lindau", "vhl", "von hippel lindau disease", "vhl syndrome"],
    clues: [
      "A 32-year-old man presents for surveillance. His father died at age 48 of metastatic kidney cancer; his sister has a pancreatic neuroendocrine tumor.",
      "He has had two retinal hemangioblastomas treated with laser, and a cerebellar mass resected at age 27.",
      "He is currently asymptomatic but is found on screening MRI to have bilateral, multifocal renal cysts and small enhancing renal masses.",
      "He also has a small pheochromocytoma noted on biochemical screening (elevated metanephrines).",
      "Genetic testing confirms a pathogenic VHL gene mutation on chromosome 3p25.",
      "Renal lesions are managed with nephron-sparing surgery once any solid component reaches 3 cm (the '3 cm rule'). The pheochromocytoma is managed with alpha-blockade and adrenalectomy."
    ],
    teaching: "Autosomal dominant cancer syndrome (VHL gene, 3p25). Hallmarks: CNS/retinal hemangioblastomas, clear cell renal cell carcinoma (often bilateral/multifocal), pheochromocytoma, pancreatic cysts and NETs, endolymphatic sac tumors. '3 cm rule': resect solid renal lesions ≥3 cm (nephron-sparing). HIF pathway dysregulation drives tumorigenesis.",
    category: "Genetic"
  },
  {
    id: 59,
    dx: "Bladder diverticulum",
    aliases: ["bladder diverticulum", "vesical diverticulum", "bladder diverticula"],
    clues: [
      "A 72-year-old man with long-standing untreated BPH presents with recurrent UTIs and an unusual voiding pattern.",
      "He describes 'two-stage voiding' — needing to void again 10 minutes after he finishes his first stream.",
      "UA shows pyuria; culture grows E. coli. PVR is 250 mL.",
      "Cystoscopy reveals a heavily trabeculated bladder with multiple cellules and a 4 cm posterolateral wall outpouching.",
      "VCUG demonstrates retention of contrast within the outpouching after voiding. Biopsy of the diverticulum lining is negative for malignancy.",
      "He undergoes TURP for outlet obstruction; the diverticulum is surveilled for malignancy and surgical excision is considered for persistent symptoms."
    ],
    teaching: "Acquired diverticula from chronic bladder outlet obstruction (BPH most commonly). 'Two-stage voiding' is classic. Lack a muscular wall → urinary stasis → infection, stones, and increased risk of urothelial cancer arising within. Treatment: relieve obstruction; diverticulectomy for symptomatic, large (>5 cm), or harboring tumor/stone.",
    category: "Common"
  },
  {
    id: 60,
    dx: "Upper tract urothelial carcinoma",
    aliases: ["upper tract urothelial carcinoma", "utuc", "transitional cell carcinoma of the renal pelvis", "renal pelvis tcc", "ureteral cancer", "upper urinary tract urothelial carcinoma"],
    clues: [
      "A 68-year-old former smoker presents with 2 weeks of painless gross hematuria.",
      "Cystoscopy is negative for bladder lesions, but urine cytology is positive for malignant cells.",
      "He has a history of Lynch syndrome (HNPCC).",
      "CT urogram shows a 2.5 cm filling defect in the right renal pelvis with mild hydronephrosis.",
      "Retrograde ureteropyelography confirms a filling defect; ureteroscopy with biopsy returns high-grade urothelial carcinoma of the renal pelvis.",
      "He undergoes radical nephroureterectomy with bladder cuff excision and pelvic lymph node sampling."
    ],
    teaching: "Urothelial cancer of the renal pelvis/ureter. <10% of all urothelial cancers but presents at higher stage. Risk factors include smoking, aristolochic acid (Balkan nephropathy), and Lynch syndrome (think hereditary in young patients). Workup: CT urogram + cystoscopy + ureteroscopy. Standard surgery: radical nephroureterectomy with bladder cuff (because urothelial tumors seed downstream). Kidney-sparing options for select low-grade, low-stage cases.",
    category: "Oncology"
  },
  {
    id: 61,
    dx: "Pelvic organ prolapse",
    aliases: ["pelvic organ prolapse", "pop", "cystocele", "uterine prolapse", "vaginal prolapse", "vault prolapse"],
    clues: [
      "A 64-year-old G4P4 postmenopausal woman presents with 'a bulge in my vagina that I can feel and see.'",
      "She reports a sensation of pelvic pressure that worsens by the end of the day and with prolonged standing.",
      "She also has stress urinary incontinence and difficulty emptying her bladder, sometimes requiring her to 'splint' the bulge to void.",
      "On exam in the standing position with Valsalva, the anterior vaginal wall protrudes 2 cm beyond the hymen.",
      "POP-Q examination is consistent with Stage III anterior compartment prolapse (cystocele).",
      "She is fit for a pessary and offered surgical sacrocolpopexy if conservative management fails."
    ],
    teaching: "Descent of pelvic organs through weakened pelvic floor. Risk: parity, vaginal delivery, age, menopause, obesity, chronic straining. Compartments: anterior (cystocele), posterior (rectocele), apical (uterine/vault). POP-Q quantifies severity. Treatment: pelvic floor PT, pessary, surgery (native tissue repair, sacrocolpopexy). FDA pulled transvaginal mesh for POP in 2019.",
    category: "Common"
  },
  {
    id: 62,
    dx: "Vesicovaginal fistula",
    aliases: ["vesicovaginal fistula", "vvf", "bladder vaginal fistula"],
    clues: [
      "A 48-year-old woman is referred 3 weeks after total abdominal hysterectomy for fibroids.",
      "She reports constant urinary leakage from the vagina, soaking through pads, day and night.",
      "She voids normally per urethra in between but is never dry.",
      "On exam, urine pooling is seen in the vaginal vault; a tampon dye test (intravesical methylene blue) shows blue staining of the tampon.",
      "Cystoscopy demonstrates a 5 mm defect at the bladder trigone communicating with the vaginal apex.",
      "After an initial trial of catheter drainage, she undergoes transvaginal fistula repair with omental interposition."
    ],
    teaching: "Continuous leakage in a patient with intact urethral function after pelvic surgery or obstetric trauma. In the developed world, most are iatrogenic post-hysterectomy. In low-resource settings, prolonged obstructed labor is the most common cause. Workup: tampon dye test, cystoscopy, retrograde imaging. Treatment: small fresh fistulas may close with catheter drainage; most require surgical repair (transvaginal or transabdominal) with tissue interposition.",
    category: "Common"
  },
  {
    id: 63,
    dx: "Female urethral diverticulum",
    aliases: ["urethral diverticulum", "female urethral diverticulum", "uretheral diverticulum female"],
    clues: [
      "A 41-year-old woman presents with 18 months of recurrent UTIs, dyspareunia, and post-void dribbling.",
      "She has been treated empirically multiple times for UTI; cultures have been inconsistent.",
      "She also reports a tender anterior vaginal wall mass that occasionally expresses purulent fluid with pressure.",
      "On exam, a tender, fluctuant mass is palpated along the anterior vaginal wall, and gentle pressure expresses cloudy fluid from the urethra.",
      "MRI pelvis shows a 1.5 cm fluid-filled outpouching of the mid-urethra (the classic '3 Ds': dysuria, dribbling, dyspareunia).",
      "She undergoes transvaginal urethral diverticulectomy with multilayered closure."
    ],
    teaching: "Localized outpouching of the urethra into the anterior vaginal wall. Classic '3 Ds': dribbling, dysuria, dyspareunia. Also recurrent UTI, urethral mass on exam. MRI is the imaging of choice. Risk of malignancy (adenocarcinoma) within ~6-9% of diverticula. Treatment: transvaginal diverticulectomy.",
    category: "Common"
  },
  {
    id: 64,
    dx: "Emphysematous pyelonephritis",
    aliases: ["emphysematous pyelonephritis", "ep", "gas forming pyelonephritis"],
    clues: [
      "A 61-year-old woman with poorly controlled type 2 diabetes (HbA1c 11.8%) presents with fever, severe right flank pain, and nausea for 3 days.",
      "She appears toxic with HR 128, BP 88/50, glucose 482, lactate 5.1.",
      "UA: large LE, positive nitrites, pyuria. Urine culture later grows E. coli.",
      "She has been resistant to antibiotic therapy initiated 24 hours ago and continues to deteriorate.",
      "CT abdomen reveals gas within the right renal parenchyma extending into the perinephric space — a finding consistent with severe gas-forming infection.",
      "She receives aggressive resuscitation, IV broad-spectrum antibiotics, and percutaneous drainage. Emergent nephrectomy is considered if she fails to improve."
    ],
    teaching: "Life-threatening necrotizing infection of the kidney with gas production, almost exclusively in patients with diabetes (~90%) and/or obstruction. Mortality historically ~40%, lower with aggressive modern management. CT classification (Huang/Tseng) guides therapy: percutaneous drainage + antibiotics for limited disease; nephrectomy for extensive parenchymal destruction.",
    category: "Emergency"
  },
  {
    id: 65,
    dx: "Penile fracture",
    aliases: ["penile fracture", "fractured penis", "fracture of penis"],
    clues: [
      "A 29-year-old man presents to the ED 2 hours after a sudden 'popping' sound during vigorous intercourse.",
      "He experienced immediate loss of erection, severe pain, and rapid penile swelling.",
      "On exam, the penis is markedly ecchymotic and deformed in an 'eggplant' configuration with deviation away from the side of injury.",
      "There is no blood at the urethral meatus. He is able to void without difficulty.",
      "MRI confirms a 1.5 cm transverse rupture of the right tunica albuginea of the corpus cavernosum.",
      "He is taken to the OR within 6 hours for surgical exploration, evacuation of hematoma, and primary closure of the tunica albuginea."
    ],
    teaching: "Traumatic rupture of the tunica albuginea of an erect corpus cavernosum. Classic story: audible 'pop' + immediate detumescence + 'eggplant deformity.' Surgical emergency — early repair prevents ED, curvature, and chronic pain. MRI if diagnosis uncertain. ~10-20% have concomitant urethral injury — evaluate with retrograde urethrogram if blood at meatus, hematuria, or inability to void.",
    category: "Emergency"
  },
  {
    id: 66,
    dx: "Bladder stones",
    aliases: ["bladder stones", "bladder stone", "vesical calculus", "vesical calculi", "vesicolithiasis", "bladder calculus"],
    clues: [
      "A 75-year-old man with long-standing untreated BPH presents with 6 months of worsening LUTS and intermittent hematuria.",
      "He notes occasional sudden interruption of his urinary stream that resolves with positional changes.",
      "He has recurrent UTIs and reports suprapubic discomfort relieved by lying flat.",
      "PVR is 320 mL. KUB radiograph shows a 3 cm radio-opaque density in the bladder.",
      "Cystoscopy confirms two large stones in the bladder; the trabeculated bladder and significant median lobe of the prostate are also noted.",
      "He undergoes simultaneous cystolitholapaxy (laser fragmentation) and TURP."
    ],
    teaching: "Vesical calculi in adults are almost always secondary to outlet obstruction, stasis, foreign body (catheters, sutures), or neurogenic bladder. Classic: intermittent obstruction relieved by position change. Treatment: relieve underlying obstruction (e.g., TURP) AND remove the stones (cystolitholapaxy via laser or pneumatic lithotrite). Pure cystotomy reserved for very large stones.",
    category: "Common"
  },
  {
    id: 67,
    dx: "Ureterocele",
    aliases: ["ureterocele", "intravesical ureterocele", "ectopic ureterocele"],
    clues: [
      "A 4-year-old girl presents with her third febrile UTI.",
      "Renal ultrasound is performed for workup of recurrent UTI.",
      "Imaging shows a duplicated collecting system on the right with severe hydroureteronephrosis of the upper pole moiety.",
      "Within the bladder, a thin-walled cystic dilation is seen at the ureteral orifice, intermittently 'ballooning' during filling.",
      "VCUG confirms a ureterocele with associated VUR into the lower pole moiety. Functional study shows poor function of the upper pole moiety.",
      "She undergoes endoscopic incision of the ureterocele for initial decompression; definitive management may include heminephrectomy or ureteral reimplantation."
    ],
    teaching: "Cystic dilation of the distal intravesical ureter, often with stenotic orifice. Classic association: duplex collecting system, with the ureterocele draining the upper pole (Weigert-Meyer rule: upper pole ureter inserts more inferior/medial → prone to obstruction/ureterocele; lower pole ureter inserts more superior/lateral → prone to reflux). Treatment varies by function and reflux: endoscopic puncture, upper pole partial nephrectomy, or reconstruction.",
    category: "Pediatric"
  },
  {
    id: 68,
    dx: "Multicystic dysplastic kidney",
    aliases: ["multicystic dysplastic kidney", "mcdk"],
    clues: [
      "A pregnant woman is referred at 24 weeks gestation after fetal ultrasound shows a unilateral enlarged left kidney replaced by multiple non-communicating cysts.",
      "The contralateral right kidney appears normal. Amniotic fluid volume is normal.",
      "Postnatally, ultrasound confirms multiple non-communicating cysts replacing the left renal parenchyma with no normal-functioning tissue.",
      "DMSA renal scan shows no function in the left kidney; the right kidney is normal.",
      "VCUG is performed because of the increased risk of VUR in the contralateral kidney (~15%); this is normal.",
      "Conservative management with periodic ultrasound. Most MCDKs involute spontaneously over years."
    ],
    teaching: "Non-functioning kidney replaced by non-communicating cysts. Differentiate from hydronephrosis (cysts in MCDK don't communicate) and ADPKD (always bilateral, often hepatic cysts). Usually unilateral; bilateral is incompatible with life. Most involute spontaneously. Contralateral kidney must be normal — VUR is screened in some centers. Nephrectomy rarely indicated.",
    category: "Pediatric"
  },
  {
    id: 69,
    dx: "Bladder neck contracture",
    aliases: ["bladder neck contracture", "bnc", "bladder neck stenosis", "vesicourethral anastomotic stenosis"],
    clues: [
      "A 70-year-old man presents 6 months after radical prostatectomy with progressively worsening urinary stream and incomplete emptying.",
      "He notes hesitancy, straining, and a sense of obstruction. He has no flank pain.",
      "Uroflowmetry shows a Qmax of 4 mL/s with a plateau-shaped curve. PVR is 280 mL.",
      "Cystoscopy reveals a stenotic vesicourethral anastomosis that does not admit the 16F cystoscope.",
      "He undergoes endoscopic incision of the bladder neck (cold knife at 5 and 7 o'clock positions).",
      "After incision, voiding returns to normal; he is monitored for recurrence (~20-30%)."
    ],
    teaching: "Scarring at the vesicourethral anastomosis after radical prostatectomy or at the bladder neck after TURP. Presents as obstructive LUTS in a previously prostatectomized patient. Diagnosis: cystoscopy. Treatment: endoscopic dilation or incision (DVIU). Recurrent cases: deeper bladder neck incision, intralesional steroid, mitomycin C, or rarely UroLume / artificial sphincter complications.",
    category: "Common"
  },
  {
    id: 70,
    dx: "Asymptomatic bacteriuria",
    aliases: ["asymptomatic bacteriuria", "asb", "bacteriuria without symptoms", "asymptomatic uti"],
    clues: [
      "A 28-year-old woman at 14 weeks of her first pregnancy is seen for routine prenatal care.",
      "She is entirely asymptomatic — no dysuria, frequency, urgency, suprapubic pain, fever, or flank pain.",
      "Routine prenatal urine culture grows >100,000 CFU/mL of Group B Streptococcus.",
      "UA shows mild pyuria but otherwise unremarkable.",
      "She is treated with a 5-day course of cephalexin per pregnancy guidelines, and a test-of-cure culture is performed 1-2 weeks later.",
      "She is also flagged for intrapartum GBS prophylaxis given GBS bacteriuria in pregnancy."
    ],
    teaching: "Positive urine culture WITHOUT symptoms. Important point: treat ONLY in pregnancy or before urologic surgery involving mucosal trauma. Do NOT treat in nonpregnant adults, the elderly, or catheterized patients — antibiotics don't help and breed resistance. GBS bacteriuria in pregnancy is also an indication for intrapartum prophylaxis regardless of later GBS swab.",
    category: "Common"
  }
];
