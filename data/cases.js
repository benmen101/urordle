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
      "DMSA renal scan shows a small photopenic area in the upper pole of the left kidney consistent with scarring.",
      "She is started on continuous antibiotic prophylaxis with TMP-SMX."
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
  }
];
