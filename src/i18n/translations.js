// Bilingual content for the Smart Multi Ripping Machine (SMRM) showcase.
// Arabic (ar) is the default language; English (en) is the secondary.
// Access with the t('section.key') helper from LanguageContext.

export const translations = {
  en: {
    dir: 'ltr',
    langName: 'English',

    nav: {
      overview: 'Overview',
      machine: 'Machine',
      components: 'Components',
      engineering: 'Engineering',
      software: 'Software',
      monitoring: 'Monitoring',
      analytics: 'Analytics',
      maintenance: 'Maintenance',
      line: 'Production Line',
      gallery: 'Gallery',
      docs: 'Documents',
      team: 'Team',
      contact: 'Contact',
      menu: 'Menu',
    },

    hero: {
      badge: 'Engineering Project · Damascus University',
      title1: 'Smart Multi Ripping',
      title2: 'Machine',
      abbr: 'SMRM',
      subtitle:
        'A smart, reverse-engineered double-arbor multi-rip saw that turns raw logs into finished planks — rebuilt from first principles and upgraded with live monitoring, engineering analytics, and predictive maintenance.',
      ctaExplore: 'Explore the machine',
      ctaSoftware: 'See the software',
      scroll: 'Scroll to explore',
      stat1: 'Circular blades',
      stat2: 'Cutting shafts',
      stat3: 'Planks per pass',
      stat4: 'Max log diameter',
    },

    overview: {
      label: 'Project Overview',
      heading: 'Reverse engineering, then going further',
      lead: 'A double-arbor wood multi-rip cutting machine, rebuilt and reimagined as a smart machine.',
      p1: 'This project began as a full reverse-engineering study of an industrial double-arbor multi-rip saw: measuring, modelling, and re-deriving the mechanics that let a single machine split a log into many planks at once. From that baseline we redesigned the critical components and added a layer of intelligence the original industrial design never had.',
      p2: 'The result is more than a mechanical rebuild. The SMRM — the Smart Multi Ripping Machine, where the S stands for the intelligence built into it — couples a rigorous engineering thesis with a desktop control application, a live monitoring system, production analytics, and an automated predictive-maintenance loop that can stop the machine before a failure happens.',
      pillars: [
        { title: 'Mechanical redesign', desc: 'Shafts, blades, spacers and feed system re-derived from cutting-force theory.' },
        { title: 'Control software', desc: 'A desktop application that computes every cutting parameter in real time.' },
        { title: 'Smart operation', desc: 'Live sensor monitoring, analytics, and self-protecting maintenance.' },
      ],
      dept: 'Department of Mechanical Design Engineering',
      university: 'Damascus University',
    },

    machine: {
      label: 'Machine Overview',
      heading: 'One log in, many planks out',
      p1: 'The Smart Multi Ripping Machine (SMRM) converts raw wooden logs into multiple dimensioned planks in a single pass. Two parallel cutting shafts — the double-arbor configuration — each carry a stack of circular saw blades, so the log is ripped along many parallel planes simultaneously as it is fed through.',
      p2: 'Precision spacers set the exact distance between blades, which defines plank width. A cantilever shaft holds the blade stack, and a locking bolt clamps it tight enough to transmit the full cutting torque through friction alone, with no slipping under load.',
      specs: [
        { k: 'Cutting shafts', v: '2 (double arbor)' },
        { k: 'Blades per shaft', v: 'up to 10' },
        { k: 'Maximum blades', v: '20 circular' },
        { k: 'Planks per pass', v: 'up to 10' },
        { k: 'Plank dimensions', v: '200 × 30 mm' },
        { k: 'Max log diameter', v: '540 mm' },
        { k: 'Min log length', v: '650 mm (610 mm theoretical)' },
        { k: 'Feed speed', v: '11 m/min' },
      ],
      diagram: {
        title: 'Cutting arbor assembly — side view',
        frontTitle: 'Front view',
        frontNote: 'Blades overlap — only one is visible',
        blade: 'Blade (edge view)',
        spacer: 'Spacers 5 / 2.5 / 32 mm',
        bolt: 'Locking bolt',
        coupling: 'Coupling',
        motor: '55 kW motor',
        shaft: 'Cantilever shaft',
      },
    },

    components: {
      label: 'Machine Components',
      heading: 'The anatomy of the cut',
      lead: 'Every subsystem was selected and sized from the engineering calculations — not copied from the original machine.',
      items: [
        {
          title: 'Double cutting shafts',
          desc: 'Two parallel arbors, each carrying up to ten circular saw blades. Running both shafts lets the machine rip a log into as many as ten planks in one pass.',
          tags: ['2 arbors', '20 blades max'],
        },
        {
          title: 'Circular blades & spacers',
          desc: 'Blades are separated by precision spacers of 5 mm, 2.5 mm and 32 mm. The spacer stack fixes plank width, keeps total shaft length constant, allows blades to be added or removed, and preserves clamping force.',
          tags: ['5 / 2.5 / 32 mm', 'interchangeable'],
        },
        {
          title: 'Cantilever clamping',
          desc: 'The blade stack is mounted on a cantilever shaft and tightened by a locking bolt. The clamp generates enough friction to transmit full torque and eliminate blade slip during cutting.',
          tags: ['friction drive', 'no slip'],
        },
        {
          title: 'Cutting motors',
          desc: 'Each shaft is driven through a coupling by a 55 kW motor spinning at 3550 RPM and delivering 150 N·m of steady-state torque — sized to sustain the peak cutting loads computed in the thesis.',
          tags: ['55 kW', '3550 RPM', '150 N·m'],
        },
        {
          title: 'Feeding system',
          desc: 'Four feed shafts, each with two rollers, drive the log through at a constant 11 m/min. Each shaft is powered by a 1.5 kW motor (1445 RPM, 9.92 N·m) through a V-belt with a 4.4 ratio.',
          tags: ['4 shafts', 'V-belt 4.4:1'],
        },
        {
          title: 'Spring-loaded feed arms',
          desc: 'Spring-loaded arms press the feed rollers against the log with controlled contact pressure, guaranteeing grip and eliminating slip while the timber is transported.',
          tags: ['constant grip', 'anti-slip'],
        },
        {
          title: 'Conveyors',
          desc: 'One input conveyor feeds raw logs into the cutting zone; a second conveyor carries the finished planks away, keeping the line moving continuously.',
          tags: ['input', 'output'],
        },
      ],
    },

    engineering: {
      label: 'Engineering Design',
      heading: 'Built on cutting theory, not guesswork',
      p1: 'Every load-bearing component was sized from a physical model of the cut. We modelled wood machining using Merchant’s orthogonal cutting theory together with fracture mechanics, calibrated against published research on wood cutting behaviour.',
      p2: 'These models give the cutting force, the forces acting on the wood, the shaft torque and the required motor power for each wood species and operating condition. Those numbers became the design inputs for the shafts, bearings, motors and feed system — the calculations literally shaped the hardware.',
      theoryTitle: 'The engineering thesis',
      theoryDesc:
        'The full engineering thesis documents the machine design, the calculations, component selection, engineering analysis, and the manufacturing and assembly drawings.',
      contents: [
        'Machine design',
        'Force & load calculations',
        'Component selection',
        'Manufacturing drawings',
        'Assembly drawings',
        'Engineering analysis',
      ],
      eqTitle: 'Core relationships',
      equations: [
        { name: 'Shear angle (Merchant)', formula: 'φ = π/4 − ½(β − α)', vars: 'β friction angle · α rake angle' },
        { name: 'Cutting force', formula: 'Fc = (τy·b·ε / C)·h + (ws·b / C)', vars: 'τy shear yield · b kerf · ε strain · h chip thickness · ws specific work' },
        { name: 'Chip thickness', formula: 'h = f · sin(θ)', vars: 'f feed per tooth · θ tooth angle in cut' },
        { name: 'Shaft torque', formula: 'M = Fc · R₀', vars: 'R₀ blade radius' },
        { name: 'Feed per tooth', formula: 'f = (Vf·π·D)/(Z·Vc)', vars: 'Vf feed · D diameter · Z teeth · Vc cutting speed' },
        { name: 'Volumetric rate', formula: 'Q = Vf · A · 3600', vars: 'A plank cross-section' },
      ],
      openThesis: 'Open thesis viewer',
    },

    software: {
      label: 'Desktop Application',
      heading: 'The brain of the machine',
      lead: 'A desktop application controls the machine and manages production, from live force calculation to full operation history.',
      p1: 'The application is organised into modules. The Home screen runs the complete cutting analysis; the Monitoring screen streams live machine data; History turns archived production into analytics; and Maintenance watches component lifetimes and protects the machine automatically.',
      homeTitle: 'Home — the calculation engine',
      homeDesc:
        'The Home screen performs the full cutting analysis. The operator selects a wood species and the software instantly computes the cutting parameters, mechanical loads, power requirements, the forces acting on the wood, and the machine parameters.',
      homeBasis:
        'The engineering calculations behind this screen are based on Merchant’s theory, fracture mechanics, and published research — the same models used to design the machine’s critical components.',
      homeOutputs: [
        'Cutting parameters',
        'Mechanical loads',
        'Power requirements',
        'Forces on the wood',
        'Machine parameters',
      ],
      videoTitle: 'Watch the application in action',
      videoCaption:
        'A full walkthrough of the SMRM controller — wood selection, force calculation, live monitoring, history analytics and PDF export. Playback is slightly accelerated for presentation.',
      screens: [
        {
          title: 'Home — the calculation engine',
          desc:
            'The operator selects a wood species and the software loads its material data — shear yield stress, specific cutting work and friction coefficient. One press of "Calculate Forces" resolves the complete cutting model: all seven force components (cutting, active, thrust, shear, friction on rake, normal to rake and normal to shear), the tool parameters (feed and cutting velocities, feed per tooth, spindle speed, teeth in cut, volumetric rate) and the derived angles. The lower charts plot cutting force Fc(h) and shaft moment T(h) against chip thickness, and a table lists every tooth angle currently engaged in the cut. Machine control — Start, Stop, End Process — and the run timer live on the same screen.',
          points: [
            '7 force components computed instantly',
            'Fc(h) and T(h) curves with fitted equations',
            'Teeth-in-cut angles with chip thicknesses',
            'Start / Stop / End Process control with timer',
          ],
        },
        {
          title: 'Monitoring — the live operator view',
          desc:
            'Four live chart groups stream the state of the machine: instantaneous torque on both cutting shafts with current, maximum and average values; cumulative production with current and average slice rates; input and output conveyor speeds tracking the fixed 11 m/min feed; and the individual torques of the four feed shafts. A status badge and operating-time clock confirm the machine is running — a flat line at zero on any shaft immediately flags a fault.',
          points: [
            'Shaft A / B torque with live statistics',
            'Production rate in slices per minute',
            'Input / output conveyor speed',
            'Per-shaft feed torque monitoring',
          ],
        },
        {
          title: 'History — production analytics',
          desc:
            'For any date range, the History screen aggregates the stored operations into economics: total fees, consumed energy, production volume and process count, alongside the average cutting force and cutting moment with their maxima, and the energy efficiency in m³ per kWh with the average cost per cubic metre. Interactive charts show the production trend across processes, the distribution of wood types, a force-component comparison per process, and a radar profile of the full force signature of the most recent cut.',
          points: [
            'KPIs over custom date ranges',
            'Energy efficiency and cost per m³',
            'Wood-type distribution and trends',
            'Force radar of the latest process',
          ],
        },
        {
          title: 'Process records — inspection & PDF export',
          desc:
            'Every cutting process is stored in the relational database and listed in the records table with its wood type, dimensions, volume, fees and energy. Selecting a row opens the inspection panel: the operation conditions (cutting speed, feed rate, shaft speed, consumed energy, friction, shear and centre angles, cutting moment) and a force-breakdown chart of all seven components. One click exports the selected operation as a PDF report.',
          points: [
            'Full operations table from the database',
            'Per-operation condition sheet',
            'Force breakdown of every component',
            'One-click PDF report export',
          ],
        },
        {
          title: 'Maintenance — configuration & status',
          desc:
            'The Maintenance screen keeps the machine configuration in view: the blade set (350 mm diameter, 20 teeth, 3.9 mm kerf, 10 blades per arbor), the operating parameters (11 m/min feed, 64 m/s cutting velocity, 20° rake angle, 100 mm depth of cut) and the live machine status with the last check and next scheduled service. Preventive-maintenance scheduling and blade-wear tracking dock into this screen.',
          points: [
            'Blade configuration at a glance',
            'Operating parameter snapshot',
            'Machine status and service schedule',
          ],
        },
      ],
    },

    monitoring: {
      label: 'Monitoring System',
      heading: 'Watch the machine think',
      lead: 'A live operator view of the machine — our long-term vision is fully remote operation.',
      p1: 'The monitoring module displays live machine data on interactive charts. It tracks the cutting shafts, the feed shafts, conveyor motion, motor behaviour, torque, loads and forces — so an operator can read the state of the machine at a glance.',
      p2: 'A live camera window shows the longitudinal view of the machine. Combined with the sensor charts, it lets operators catch abnormal behaviour before it becomes a failure — an oversized log, a feeding problem, or an unexpected load.',
      p3: 'The current system runs on simulated sensor data captured in advance, standing in for the physical PLC until it is integrated.',
      monitored: ['Cutting shafts', 'Feed shafts', 'Conveyor motion', 'Motor behaviour', 'Torque', 'Loads & forces'],
      catchTitle: 'Caught before failure',
      catch: ['Oversized logs', 'Feeding issues', 'Unexpected loads'],
      cameraTitle: 'Live camera — longitudinal view',
      cameraNote: 'Camera feed placeholder — longitudinal view of the machine.',
      chartTorque: 'Cutting shaft torque',
      chartConveyor: 'Conveyor belt speed',
      simNote: 'All sensor values are simulated until PLC integration.',
      running: 'RUNNING',
    },

    analytics: {
      label: 'History & Analytics',
      heading: 'Every cut becomes data',
      lead: 'Each cutting process is stored in a relational database and turned into production intelligence.',
      p1: 'The application records every operation. From that archive it computes energy consumption, machine productivity, production volume and profit estimates — the numbers that reveal how the machine actually performs and pays for itself.',
      p2: 'Operators can browse the full operation history, filter by custom date ranges, explore interactive charts, inspect any single operation in detail, and export a selected operation to a PDF report.',
      capabilities: [
        'Energy consumption',
        'Machine productivity',
        'Production volume',
        'Profit estimation',
        'Operation history',
        'Custom date ranges',
        'Interactive charts',
        'Per-operation PDF export',
      ],
      kpiFees: 'Total fees',
      kpiEnergy: 'Consumed energy',
      kpiVolume: 'Production volume',
      kpiProcesses: 'Total processes',
      trendTitle: 'Production history trend',
      distTitle: 'Wood type distribution',
    },

    maintenance: {
      label: 'Maintenance Intelligence',
      heading: 'A machine that protects itself',
      lead: 'The SMRM earns the "Smart" in its name here: it tracks the life of its own consumable parts and acts before they fail.',
      p1: 'The software continuously tracks the remaining lifetime of lifetime-limited components — bearings, belts, couplings and other consumable mechanical parts — comparing expected life against actual running time.',
      p2: 'When a component reaches the end of its expected life, two things happen at the same instant. The software emails the maintenance department a full replacement report, and it sends a command that stops the machine until maintenance is complete.',
      emailTitle: 'The automatic report includes',
      emailItems: ['Component location', 'Expected lifetime', 'Actual lifetime', 'Replacement report', 'Maintenance information'],
      tracked: ['Bearings', 'Belts', 'Couplings', 'Consumable parts'],
      stopTitle: 'Machine auto-stop',
      stopDesc:
        'At the same moment the email is sent, the software commands the machine to stop and keeps it stopped until maintenance is completed — turning a maintenance alert into a hard safety interlock.',
      highlight: 'One of the strongest engineering contributions of the project.',
      steps: [
        { title: 'Track', desc: 'Continuously monitor remaining life of every consumable component.' },
        { title: 'Detect', desc: 'Flag the moment a component reaches its expected lifetime.' },
        { title: 'Notify', desc: 'Email maintenance a full report with location and lifetime data.' },
        { title: 'Protect', desc: 'Stop the machine automatically until the part is replaced.' },
      ],
    },

    line: {
      label: 'Production Line',
      heading: 'One machine in a bigger line',
      p1: 'The SMRM does not work alone. It is one station inside a complete industrial sawmilling line, surrounded by machines that prepare the logs before cutting and handle the boards afterwards.',
      p2: 'The layout below shows that line end-to-end. Logs are staged on a heavy-duty loading deck, broken down into open-faced cants by a twin vertical saw, centred on a belt conveyor, ripped into boards by the SMRM — the multi-rip station at the heart of the line — and finally carried away on a sweep-chain conveyor for sorting and stacking.',
      caption:
        'Complete line layout: log loading deck → twin vertical saw → centring belt conveyor → SMRM multi-rip station → sweep-chain out-feed.',
      placeholder: 'Production-line layout — coming soon.',
    },

    gallery: {
      label: 'Gallery',
      heading: 'The project in pictures',
      lead: 'Photos, videos and CAD drawings of the machine and its subsystems.',
      placeholder: 'Media will be added here — photos, videos, CAD drawings and diagrams, each with a short engineering note.',
      video: 'Project video',
      photos: 'Photos',
      cad: 'CAD drawings',
    },

    docs: {
      label: 'Documents',
      heading: 'Read the engineering',
      lead: 'The engineering thesis and supporting documents, viewable in the browser.',
      thesisTitle: 'Engineering thesis',
      thesisDesc: 'Machine design, calculations, component selection, engineering analysis, and the manufacturing and assembly drawings.',
      viewer: 'Document viewer',
      viewerNote: 'The thesis PDF will be embedded here for in-browser viewing.',
      open: 'Open document',
      download: 'Download PDF',
    },

    references: {
      label: 'References',
      heading: 'Standing on published work',
      lead: 'The main engineering references used throughout the project, grouped by theme.',
      groups: [
        {
          title: 'Cutting mechanics & theory',
          items: [
            'M. E. Merchant — Mechanics of the metal cutting process (orthogonal cutting model).',
            'Fracture-mechanics approaches to wood machining.',
            'Published research on wood cutting forces and specific cutting work.',
          ],
        },
        {
          title: 'Wood machining & material properties',
          items: [
            'Studies on shear yield stress and friction of hardwood and softwood species.',
            'Data on modified woods (DMDHEU, Lignamon) and their machining behaviour.',
          ],
        },
        {
          title: 'Machine design & drives',
          items: [
            'Machine-element design references for shafts, bearings and couplings.',
            'V-belt drive selection and power-transmission design.',
          ],
        },
        {
          title: 'Smart machines & Industry 4.0',
          items: [
            'Predictive-maintenance and condition-monitoring literature.',
            'Industry 4.0 and intelligent-manufacturing principles.',
          ],
        },
      ],
      note: 'The full reference list is documented in the engineering thesis.',
    },

    team: {
      label: 'Team',
      heading: 'The engineers behind the machine',
      lead: 'An engineering project from the Department of Mechanical Design Engineering, Damascus University.',
      role: 'Role',
      responsibilities: 'Responsibilities',
      bio: 'Biography',
      tbd: 'To be completed.',
      members: [
        {
          name: 'Eng. Ghayath Ahmad Al Ali Al Razaj',
          role: 'Architect',
          resp: [
            'Supervised the development of the cutting subsystem and the feeding mechanism within the integrated engineering design, ensuring full system integration.',
            'Developed the desktop application and the project showcase website.',
            'Performed the analytical study and defined the engineering concept of the system.',
            'Coordinated and distributed the team\'s tasks across the project phases.',
          ],
          bio: 'A leader who combines engineering vision with software expertise to craft one integrated system.',
        },
        {
          name: 'Eng. Manar Muwaffaq Abdul Hadi',
          role: 'Designer',
          resp: [
            'Performed the analytical study and design concept for the feeding and transport systems.',
            'Designed the 3D engineering model using SolidWorks.',
            'Prepared the assembly and working drawings in line with manufacturing requirements.',
            'Ensured the design is manufacturable and easy to assemble for an efficient system.',
          ],
          bio: 'A creative engineer who turns vision into precise designs that unite elegance with efficiency.',
        },
        {
          name: 'Eng. Zukaa Abu Al-Khair',
          role: 'Analyst',
          resp: [
            'Performed the analytical study and design concept for the fixing mechanisms and the connection of the working parts.',
            'Reviewed and verified the engineering calculations to ensure design accuracy.',
            'Prepared the engineering thesis and documented the technical aspects of the project.',
            'Contributed to verifying that the mechanical solutions meet the operating requirements.',
          ],
          bio: 'Composed and analytically precise, she turns every engineering detail into a step toward a more reliable solution.',
        },
      ],
    },

    contact: {
      label: 'Contact',
      heading: 'Want to know more?',
      lead: 'This project lies at the intersection of Mechanical Design Engineering and Software Engineering. Reach out to learn more about the Smart Multi Ripping Machine (SMRM) or the software behind it.',
      github: 'View on GitHub',
      email: 'Email us',
    },

    footer: {
      tagline: 'Smart Multi Ripping Machine (SMRM) — an intelligent double-arbor multi-rip saw.',
      project: 'Engineering project · Department of Mechanical Design Engineering · Damascus University',
      rights: 'All rights reserved.',
      built: 'Engineered with precision.',
    },

    common: {
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      language: 'Language',
      close: 'Close',
      comingSoon: 'Coming soon',
      placeholder: 'Placeholder',
    },
  },

  // ──────────────────────────────────────────────────────────────────
  ar: {
    dir: 'rtl',
    langName: 'العربية',

    nav: {
      overview: 'نظرة عامة',
      machine: 'الآلة',
      components: 'المكوّنات',
      engineering: 'التصميم الهندسي',
      software: 'البرنامج',
      monitoring: 'المراقبة',
      analytics: 'التحليلات',
      maintenance: 'الصيانة',
      line: 'خط الإنتاج',
      gallery: 'المعرض',
      docs: 'الوثائق',
      team: 'الفريق',
      contact: 'تواصل',
      menu: 'القائمة',
    },

    hero: {
      badge: 'مشروع هندسي · جامعة دمشق',
      title1: 'آلة التشريح المتعدّدة',
      title2: 'الذكية',
      abbr: 'SMRM',
      subtitle:
        'آلة تشريح متعدّدة ذكية بمحورَي قطع، أُعيدت هندستها عكسياً لتحويل جذوع الخشب الخام إلى ألواح جاهزة — أُعيد بناؤها من المبادئ الأولى وطُوّرت بمراقبة حيّة وتحليلات هندسية وصيانة تنبّؤية.',
      ctaExplore: 'استكشف الآلة',
      ctaSoftware: 'شاهد البرنامج',
      scroll: 'مرّر للاستكشاف',
      stat1: 'شفرة دائرية',
      stat2: 'محورا قطع',
      stat3: 'ألواح في المرور الواحد',
      stat4: 'أقصى قطر جذع',
    },

    overview: {
      label: 'نظرة عامة على المشروع',
      heading: 'هندسة عكسية… ثم خطوة أبعد',
      lead: 'آلة تشريح خشب متعدّدة بمحورَي قطع، أُعيد بناؤها وتصوّرها كآلة ذكية.',
      p1: 'بدأ المشروع كدراسة هندسة عكسية كاملة لآلة تشريح خشب صناعية بمحورَي قطع: قياسٌ ونمذجةٌ وإعادة اشتقاق للميكانيك الذي يتيح لآلة واحدة أن تقسم الجذع إلى عدّة ألواح دفعةً واحدة. انطلاقاً من هذا الأساس أعدنا تصميم المكوّنات الحرجة وأضفنا طبقة من الذكاء لم يمتلكها التصميم الصناعي الأصلي.',
      p2: 'النتيجة أكثر من مجرّد إعادة بناء ميكانيكية. تجمع SMRM — آلة التشريح المتعدّدة الذكية، وحرف S فيها اختصار للذكاء المدمج في الآلة — بين أطروحة هندسية دقيقة وبرنامج تحكّم مكتبي، ونظام مراقبة حيّ، وتحليلات إنتاج، وحلقة صيانة تنبّؤية آلية قادرة على إيقاف الآلة قبل وقوع العطل.',
      pillars: [
        { title: 'إعادة تصميم ميكانيكية', desc: 'محاور وشفرات وفواصل ونظام تغذية أُعيد اشتقاقها من نظرية قوى القطع.' },
        { title: 'برنامج تحكّم', desc: 'برنامج مكتبي يحسب كل معامل قطع في الزمن الحقيقي.' },
        { title: 'تشغيل ذكي', desc: 'مراقبة حسّاسات حيّة وتحليلات وصيانة ذاتية الحماية.' },
      ],
      dept: 'قسم هندسة التصميم الميكانيكي',
      university: 'جامعة دمشق',
    },

    machine: {
      label: 'نظرة على الآلة',
      heading: 'جذعٌ يدخل… وألواحٌ تخرج',
      p1: 'تحوّل آلة التشريح المتعدّدة الذكية (SMRM) جذوع الخشب الخام إلى عدّة ألواح مقاسة في مرور واحد. يحمل كلٌّ من محورَي القطع المتوازيين — تكوين المحورين المزدوجين — رزمة من الشفرات الدائرية، فيُشرَّح الجذع على عدّة مستويات متوازية في آنٍ واحد أثناء تغذيته.',
      p2: 'تضبط الفواصل الدقيقة المسافة بين الشفرات، وهي التي تحدّد عرض اللوح. يحمل محورٌ كابولي رزمة الشفرات، ويشدّها برغي تثبيت بقوّة تكفي لنقل عزم القطع الكامل بالاحتكاك وحده دون أي انزلاق تحت الحمل.',
      specs: [
        { k: 'محاور القطع', v: '٢ (محور مزدوج)' },
        { k: 'الشفرات لكل محور', v: 'حتى ١٠' },
        { k: 'أقصى عدد شفرات', v: '٢٠ شفرة دائرية' },
        { k: 'ألواح في المرور', v: 'حتى ١٠' },
        { k: 'أبعاد اللوح', v: '٢٠٠ × ٣٠ مم' },
        { k: 'أقصى قطر جذع', v: '٥٤٠ مم' },
        { k: 'أدنى طول جذع', v: '٦٥٠ مم (٦١٠ نظرياً)' },
        { k: 'سرعة التغذية', v: '١١ م/د' },
      ],
      diagram: {
        title: 'مجموعة محور القطع — منظر جانبي',
        frontTitle: 'منظر أمامي',
        frontNote: 'الشفرات متطابقة — تظهر شفرة واحدة فقط',
        blade: 'شفرة (منظر حدّي)',
        spacer: 'فواصل ٥ / ٢٫٥ / ٣٢ مم',
        bolt: 'برغي التثبيت',
        coupling: 'قارنة',
        motor: 'محرّك ٥٥ ك.و',
        shaft: 'محور كابولي',
      },
    },

    components: {
      label: 'مكوّنات الآلة',
      heading: 'تشريح عمليّة القطع',
      lead: 'اختير كل نظام فرعي وحُسبت أبعاده من الحسابات الهندسية — لا نسخاً عن الآلة الأصلية.',
      items: [
        {
          title: 'محورا القطع المزدوجان',
          desc: 'محوران متوازيان يحمل كلٌّ منهما حتى عشر شفرات دائرية. تشغيل المحورين معاً يتيح تشريح الجذع إلى ما يصل إلى عشرة ألواح في مرور واحد.',
          tags: ['محوران', 'حتى ٢٠ شفرة'],
        },
        {
          title: 'الشفرات والفواصل',
          desc: 'تفصل الشفراتِ فواصلُ دقيقة بسماكات ٥ مم و٢٫٥ مم و٣٢ مم. تحدّد رزمة الفواصل عرض اللوح، وتحافظ على الطول الكلي للمحور، وتتيح إضافة الشفرات أو نزعها، وتصون قوّة الشدّ.',
          tags: ['٥ / ٢٫٥ / ٣٢ مم', 'قابلة للتبديل'],
        },
        {
          title: 'التثبيت الكابولي',
          desc: 'تُركَّب رزمة الشفرات على محور كابولي وتُشدّ ببرغي تثبيت يولّد احتكاكاً كافياً لنقل العزم الكامل ومنع انزلاق الشفرات أثناء القطع.',
          tags: ['نقل بالاحتكاك', 'دون انزلاق'],
        },
        {
          title: 'محرّكات القطع',
          desc: 'يُدار كل محور عبر قارنة بمحرّك قدرته ٥٥ كيلوواط يدور بسرعة ٣٥٥٠ د/د ويقدّم عزماً مستقراً قدره ١٥٠ نيوتن·متر — مُقاساً لتحمّل ذُرى أحمال القطع المحسوبة في الأطروحة.',
          tags: ['٥٥ كيلوواط', '٣٥٥٠ د/د', '١٥٠ ن·م'],
        },
        {
          title: 'نظام التغذية',
          desc: 'أربعة محاور تغذية، يحمل كلٌّ منها بكرتين، تدفع الجذع بسرعة ثابتة ١١ م/د. يُشغَّل كل محور بمحرّك ١٫٥ كيلوواط (١٤٤٥ د/د، ٩٫٩٢ ن·م) عبر سير مثلثي بنسبة نقل ٤٫٤.',
          tags: ['٤ محاور', 'سير ٤٫٤:١'],
        },
        {
          title: 'أذرع التغذية النابضية',
          desc: 'أذرع نابضية تضغط بكرات التغذية على الجذع بضغط تماس مضبوط، ما يضمن الإمساك ويمنع الانزلاق أثناء نقل الخشب.',
          tags: ['إمساك ثابت', 'مانع للانزلاق'],
        },
        {
          title: 'النواقل',
          desc: 'ناقلٌ عند المدخل يغذّي الجذوع الخام إلى منطقة القطع، وناقلٌ ثانٍ ينقل الألواح الجاهزة بعيداً ليبقى الخط في حركة متواصلة.',
          tags: ['مدخل', 'مخرج'],
        },
      ],
    },

    engineering: {
      label: 'التصميم الهندسي',
      heading: 'مبنيّ على نظرية القطع… لا على التخمين',
      p1: 'حُسبت أبعاد كل مكوّن حامل للحمل انطلاقاً من نموذج فيزيائي للقطع. نمذجنا تشغيل الخشب بنظرية القطع المتعامد لميرشانت مع ميكانيك الكسر، مُعايَرةً على أبحاث منشورة في سلوك قطع الخشب.',
      p2: 'تعطي هذه النماذج قوّة القطع، والقوى المؤثّرة في الخشب، وعزم المحور، والقدرة المطلوبة للمحرّك عند كل نوع خشب وشرط تشغيل. صارت هذه الأرقام مدخلاتِ تصميم المحاور والمحامل والمحرّكات ونظام التغذية — فالحسابات هي التي شكّلت العتاد فعلياً.',
      theoryTitle: 'الأطروحة الهندسية',
      theoryDesc:
        'توثّق الأطروحة الهندسية الكاملة تصميم الآلة، والحسابات، واختيار المكوّنات، والتحليل الهندسي، ومخطّطات التصنيع والتجميع.',
      contents: [
        'تصميم الآلة',
        'حسابات القوى والأحمال',
        'اختيار المكوّنات',
        'مخطّطات التصنيع',
        'مخطّطات التجميع',
        'التحليل الهندسي',
      ],
      eqTitle: 'العلاقات الأساسية',
      equations: [
        { name: 'زاوية القص (ميرشانت)', formula: 'φ = π/4 − ½(β − α)', vars: 'β زاوية الاحتكاك · α زاوية الميل' },
        { name: 'قوّة القطع', formula: 'Fc = (τy·b·ε / C)·h + (ws·b / C)', vars: 'τy إجهاد القص · b عرض الشقّ · ε الانفعال · h سماكة الرقاقة · ws الشغل النوعي' },
        { name: 'سماكة الرقاقة', formula: 'h = f · sin(θ)', vars: 'f التغذية لكل سنّ · θ زاوية السنّ في القطع' },
        { name: 'عزم المحور', formula: 'M = Fc · R₀', vars: 'R₀ نصف قطر الشفرة' },
        { name: 'التغذية لكل سنّ', formula: 'f = (Vf·π·D)/(Z·Vc)', vars: 'Vf التغذية · D القطر · Z الأسنان · Vc سرعة القطع' },
        { name: 'المعدّل الحجمي', formula: 'Q = Vf · A · 3600', vars: 'A مقطع اللوح' },
      ],
      openThesis: 'افتح عارض الأطروحة',
    },

    software: {
      label: 'البرنامج المكتبي',
      heading: 'دماغ الآلة',
      lead: 'برنامج مكتبي يتحكّم بالآلة ويدير الإنتاج، من حساب القوى الحيّ إلى سجلّ التشغيل الكامل.',
      p1: 'يُنظَّم البرنامج في وحدات. تُجري شاشة الرئيسية التحليل الكامل للقطع؛ وتبثّ شاشة المراقبة بيانات الآلة الحيّة؛ ويحوّل السجلّ الإنتاجَ المؤرشف إلى تحليلات؛ وتراقب الصيانة أعمار المكوّنات وتحمي الآلة تلقائياً.',
      homeTitle: 'الرئيسية — محرّك الحساب',
      homeDesc:
        'تُجري الشاشة الرئيسية التحليل الكامل للقطع. يختار المشغّل نوع الخشب فيحسب البرنامج فوراً معاملات القطع، والأحمال الميكانيكية، ومتطلّبات القدرة، والقوى المؤثّرة في الخشب، ومعاملات الآلة.',
      homeBasis:
        'تستند الحسابات الهندسية خلف هذه الشاشة إلى نظرية ميرشانت وميكانيك الكسر والأبحاث المنشورة — وهي النماذج نفسها التي صُمّمت بها مكوّنات الآلة الحرجة.',
      homeOutputs: [
        'معاملات القطع',
        'الأحمال الميكانيكية',
        'متطلّبات القدرة',
        'القوى على الخشب',
        'معاملات الآلة',
      ],
      videoTitle: 'شاهد البرنامج أثناء العمل',
      videoCaption:
        'جولة كاملة في برنامج التحكّم بآلة SMRM — اختيار الخشب، وحساب القوى، والمراقبة الحيّة، وتحليلات السجلّ، وتصدير PDF. سُرِّع العرض قليلاً لسلاسة التقديم.',
      screens: [
        {
          title: 'الرئيسية — محرّك الحساب',
          desc:
            'يختار المشغّل نوع الخشب فيحمّل البرنامج بياناته المادية — إجهاد القص، والشغل النوعي للقطع، ومعامل الاحتكاك. وبضغطة واحدة على «حساب القوى» يُحلّ نموذج القطع كاملاً: مكوّنات القوى السبعة (القطع، والفعّالة، والدفع، والقص، والاحتكاك على وجه الميل، والعمودية على الميل، والعمودية على القص)، ومعاملات الأداة (سرعتا التغذية والقطع، والتغذية لكل سنّ، ودوران المحور، والأسنان المشتبكة، والمعدّل الحجمي)، والزوايا المشتقّة. يرسم المخطّطان السفليان قوّة القطع Fc(h) وعزم المحور T(h) بدلالة سماكة الرقاقة، ويسرد جدولٌ زوايا الأسنان المشتبكة في القطع لحظياً. وتقبع أزرار التحكّم — تشغيل وإيقاف وإنهاء العملية — مع مؤقّت التشغيل في الشاشة نفسها.',
          points: [
            'مكوّنات القوى السبعة تُحسَب فوراً',
            'منحنيا Fc(h) وT(h) مع معادلات التوفيق',
            'زوايا الأسنان المشتبكة وسماكات رقائقها',
            'تشغيل / إيقاف / إنهاء العملية مع مؤقّت',
          ],
        },
        {
          title: 'المراقبة — واجهة المشغّل الحيّة',
          desc:
            'أربع مجموعات مخطّطات حيّة تبثّ حالة الآلة: العزم اللحظي على محورَي القطع مع القيم الحالية والقصوى والمتوسّطة؛ والإنتاج التراكمي مع معدّل الشرائح الحالي والمتوسّط؛ وسرعتا ناقلَي الدخول والخروج حول سرعة التغذية الثابتة ١١ م/د؛ وعزوم محاور التغذية الأربعة كلٌّ على حدة. وتؤكّد شارة الحالة وساعة زمن التشغيل أن الآلة تعمل — وأي خطّ مستوٍ عند الصفر على محورٍ ما ينذر فوراً بعطل.',
          points: [
            'عزم المحورين A وB مع إحصاءات حيّة',
            'معدّل الإنتاج بالشرائح في الدقيقة',
            'سرعة ناقلَي الدخول والخروج',
            'مراقبة عزم كل محور تغذية',
          ],
        },
        {
          title: 'السجلّ — تحليلات الإنتاج',
          desc:
            'لأي مجال تواريخ، تجمع شاشة السجلّ العمليات المخزّنة في أرقام اقتصادية: إجمالي الرسوم، والطاقة المستهلَكة، وحجم الإنتاج، وعدد العمليات، إلى جانب متوسّطي قوّة القطع وعزم القطع مع قيمهما القصوى، وكفاءة الطاقة بالمتر المكعّب لكل كيلوواط ساعي مع متوسّط كلفة المتر المكعّب. وتعرض المخطّطات التفاعلية اتجاه الإنتاج عبر العمليات، وتوزّع أنواع الخشب، ومقارنة مكوّنات القوى لكل عملية، ومخطّطاً راداريّاً لبصمة القوى الكاملة لآخر قطع.',
          points: [
            'مؤشّرات أداء لمجالات تواريخ مخصّصة',
            'كفاءة الطاقة وكلفة المتر المكعّب',
            'توزّع أنواع الخشب والاتجاهات',
            'رادار القوى لآخر عملية',
          ],
        },
        {
          title: 'سجلّ العمليات — الفحص وتصدير PDF',
          desc:
            'تُخزَّن كل عمليّة قطع في قاعدة البيانات العلائقية وتُسرَد في جدول السجلات مع نوع الخشب والأبعاد والحجم والرسوم والطاقة. اختيار أي صفّ يفتح لوحة الفحص: شروط التشغيل (سرعة القطع، ومعدّل التغذية، ودوران المحور، والطاقة المستهلَكة، وزوايا الاحتكاك والقص والمركز، وعزم القطع) مع مخطّط تفصيل القوى لمكوّناتها السبعة. وبنقرة واحدة تُصدَّر العملية المختارة تقريرَ PDF.',
          points: [
            'جدول العمليات الكامل من قاعدة البيانات',
            'ورقة شروط لكل عملية',
            'تفصيل القوى لكل مكوّن',
            'تصدير تقرير PDF بنقرة واحدة',
          ],
        },
        {
          title: 'الصيانة — الإعدادات والحالة',
          desc:
            'تُبقي شاشة الصيانة إعدادات الآلة في المتناول: طقم الشفرات (قطر ٣٥٠ مم، ٢٠ سنّاً، شقّ ٣٫٩ مم، ١٠ شفرات لكل محور)، ومعاملات التشغيل (تغذية ١١ م/د، سرعة قطع ٦٤ م/ثا، زاوية ميل ٢٠°، عمق قطع ١٠٠ مم)، وحالة الآلة الحيّة مع آخر فحص وموعد الخدمة القادم. وفي هذه الشاشة ترسو جدولة الصيانة الوقائية وتتبّع اهتراء الشفرات.',
          points: [
            'إعداد الشفرات بلمحة',
            'لقطة لمعاملات التشغيل',
            'حالة الآلة وجدول الخدمة',
          ],
        },
      ],
    },

    monitoring: {
      label: 'نظام المراقبة',
      heading: 'راقب الآلة وهي تعمل',
      lead: 'واجهة تشغيل حيّة للآلة — ورؤيتنا بعيدة المدى هي التشغيل عن بُعد بالكامل.',
      p1: 'تعرض وحدة المراقبة بيانات الآلة الحيّة على مخطّطات تفاعلية. تتتبّع محاور القطع، ومحاور التغذية، وحركة النواقل، وسلوك المحرّكات، والعزم، والأحمال، والقوى — ليقرأ المشغّل حالة الآلة بلمحة.',
      p2: 'تعرض نافذة كاميرا حيّة المنظر الطولي للآلة. وبدمجها مع مخطّطات الحسّاسات يستطيع المشغّلون التقاط السلوك الشاذّ قبل أن يتحوّل إلى عطل — جذعٌ أكبر من اللازم، أو مشكلة تغذية، أو حمل غير متوقّع.',
      p3: 'يعمل النظام الحالي على بيانات حسّاسات مُحاكاة جُمعت مسبقاً، نيابةً عن وحدة التحكّم المنطقي (PLC) ريثما تُدمَج.',
      monitored: ['محاور القطع', 'محاور التغذية', 'حركة النواقل', 'سلوك المحرّكات', 'العزم', 'الأحمال والقوى'],
      catchTitle: 'يُلتقَط قبل العطل',
      catch: ['جذوع كبيرة الحجم', 'مشكلات التغذية', 'أحمال غير متوقّعة'],
      cameraTitle: 'كاميرا حيّة — منظر طولي',
      cameraNote: 'مكان بثّ الكاميرا — المنظر الطولي للآلة.',
      chartTorque: 'عزم محور القطع',
      chartConveyor: 'سرعة سير النواقل',
      simNote: 'كل قيم الحسّاسات مُحاكاة ريثما يُدمَج الـ PLC.',
      running: 'قيد التشغيل',
    },

    analytics: {
      label: 'السجلّ والتحليلات',
      heading: 'كل عمليّة قطع تصبح بيانات',
      lead: 'تُخزَّن كل عمليّة قطع في قاعدة بيانات علائقية وتتحوّل إلى ذكاء إنتاجي.',
      p1: 'يسجّل البرنامج كل عملية. ومن هذا الأرشيف يحسب استهلاك الطاقة، وإنتاجية الآلة، وحجم الإنتاج، وتقديرات الربح — الأرقام التي تكشف أداء الآلة الفعلي وجدواها الاقتصادية.',
      p2: 'يستطيع المشغّلون تصفّح سجلّ العمليات الكامل، والتصفية بمجالات تواريخ مخصّصة، واستكشاف مخطّطات تفاعلية، وفحص أي عملية بالتفصيل، وتصدير عملية مختارة إلى تقرير PDF.',
      capabilities: [
        'استهلاك الطاقة',
        'إنتاجية الآلة',
        'حجم الإنتاج',
        'تقدير الربح',
        'سجلّ العمليات',
        'مجالات تواريخ مخصّصة',
        'مخطّطات تفاعلية',
        'تصدير PDF لكل عملية',
      ],
      kpiFees: 'إجمالي الرسوم',
      kpiEnergy: 'الطاقة المستهلَكة',
      kpiVolume: 'حجم الإنتاج',
      kpiProcesses: 'إجمالي العمليات',
      trendTitle: 'اتجاه سجلّ الإنتاج',
      distTitle: 'توزّع أنواع الخشب',
    },

    maintenance: {
      label: 'ذكاء الصيانة',
      heading: 'آلةٌ تحمي نفسها',
      lead: 'تتّبع الآلة مبادئ الآلات الذكية: تتتبّع أعمار أجزائها الاستهلاكية وتتصرّف قبل أن تتعطّل.',
      p1: 'يتتبّع البرنامج باستمرار العمر المتبقّي للمكوّنات محدودة العمر — المحامل والسيور والقارنات وسائر الأجزاء الميكانيكية الاستهلاكية — مقارِناً العمر المتوقّع بزمن التشغيل الفعلي.',
      p2: 'حين يبلغ مكوّنٌ نهاية عمره المتوقّع يحدث أمران في اللحظة نفسها: يرسل البرنامج إلى قسم الصيانة تقرير استبدال كاملاً بالبريد الإلكتروني، ويرسل أمراً يوقف الآلة حتى تكتمل الصيانة.',
      emailTitle: 'يتضمّن التقرير التلقائي',
      emailItems: ['موقع المكوّن', 'العمر المتوقّع', 'العمر الفعلي', 'تقرير الاستبدال', 'معلومات الصيانة'],
      tracked: ['المحامل', 'السيور', 'القارنات', 'الأجزاء الاستهلاكية'],
      stopTitle: 'إيقاف الآلة تلقائياً',
      stopDesc:
        'في اللحظة نفسها التي يُرسَل فيها البريد، يأمر البرنامج الآلةَ بالتوقّف ويُبقيها متوقّفة حتى تكتمل الصيانة — فيتحوّل تنبيه الصيانة إلى قفلٍ أماني صارم.',
      highlight: 'أحد أقوى الإسهامات الهندسية في المشروع.',
      steps: [
        { title: 'تتبّع', desc: 'مراقبة مستمرّة للعمر المتبقّي لكل مكوّن استهلاكي.' },
        { title: 'اكتشاف', desc: 'رصد اللحظة التي يبلغ فيها المكوّن عمره المتوقّع.' },
        { title: 'إبلاغ', desc: 'إرسال تقرير كامل بالبريد يتضمّن الموقع وبيانات العمر.' },
        { title: 'حماية', desc: 'إيقاف الآلة تلقائياً حتى يُستبدَل الجزء.' },
      ],
    },

    line: {
      label: 'خط الإنتاج',
      heading: 'آلةٌ ضمن خطٍّ أكبر',
      p1: 'لا تعمل الآلة بمعزل. هي محطّة واحدة ضمن خط نشرٍ صناعي متكامل، تحيط بها آلات تهيّئ الجذوع قبل القطع وتعالج الألواح بعده.',
      p2: 'يعرض المخطّط أدناه الخطّ من أوّله إلى آخره: تُهيَّأ الجذوع على منصّة تحميل ثقيلة، ثم يحوّلها منشار عمودي مزدوج إلى كتلٍ مستوية الوجه، تُوسَّط على ناقل سيري، فتشرّحها الآلة SMRM — محطّة التشريح المتعدّد في قلب الخط — إلى ألواح، وأخيراً يحملها ناقل سلسلي نحو الفرز والتكديس.',
      caption:
        'مخطّط الخط الكامل: منصّة تحميل الجذوع ← منشار عمودي مزدوج ← ناقل توسيط سيري ← محطّة التشريح المتعدّد SMRM ← ناقل الإخراج السلسلي.',
      placeholder: 'مخطّط خط الإنتاج — قريباً.',
    },

    gallery: {
      label: 'المعرض',
      heading: 'المشروع بالصور',
      lead: 'صور وفيديوهات ومخطّطات CAD للآلة وأنظمتها الفرعية.',
      placeholder: 'ستُضاف الوسائط هنا — صور وفيديوهات ومخطّطات CAD ورسوم، مع شرح هندسي مختصر لكلٍّ منها.',
      video: 'فيديو المشروع',
      photos: 'الصور',
      cad: 'مخطّطات CAD',
    },

    docs: {
      label: 'الوثائق',
      heading: 'اقرأ الهندسة',
      lead: 'الأطروحة الهندسية والوثائق الداعمة، قابلة للعرض داخل المتصفّح.',
      thesisTitle: 'الأطروحة الهندسية',
      thesisDesc: 'تصميم الآلة والحسابات واختيار المكوّنات والتحليل الهندسي ومخطّطات التصنيع والتجميع.',
      viewer: 'عارض الوثائق',
      viewerNote: 'ستُضمَّن أطروحة الـ PDF هنا للعرض داخل المتصفّح.',
      open: 'افتح الوثيقة',
      download: 'تنزيل PDF',
    },

    references: {
      label: 'المراجع',
      heading: 'استناداً إلى أعمال منشورة',
      lead: 'أهمّ المراجع الهندسية المعتمَدة في المشروع، مصنّفة حسب الموضوع.',
      groups: [
        {
          title: 'ميكانيك القطع والنظرية',
          items: [
            'م. إ. ميرشانت — ميكانيك عملية القطع المعدني (نموذج القطع المتعامد).',
            'مقاربات ميكانيك الكسر في تشغيل الخشب.',
            'أبحاث منشورة في قوى قطع الخشب والشغل النوعي للقطع.',
          ],
        },
        {
          title: 'تشغيل الخشب وخواصّ المواد',
          items: [
            'دراسات في إجهاد القص واحتكاك الأخشاب الصلبة واللينة.',
            'بيانات الأخشاب المعدّلة (DMDHEU، Lignamon) وسلوكها في التشغيل.',
          ],
        },
        {
          title: 'تصميم الآلات وأنظمة النقل',
          items: [
            'مراجع تصميم عناصر الآلات للمحاور والمحامل والقارنات.',
            'اختيار نقل الحركة بالسيور المثلثية وتصميم نقل القدرة.',
          ],
        },
        {
          title: 'الآلات الذكية والصناعة 4.0',
          items: [
            'أدبيات الصيانة التنبّؤية ومراقبة الحالة.',
            'مبادئ الصناعة 4.0 والتصنيع الذكي.',
          ],
        },
      ],
      note: 'قائمة المراجع الكاملة موثّقة في الأطروحة الهندسية.',
    },

    team: {
      label: 'الفريق',
      heading: 'المهندسون خلف الآلة',
      lead: 'مشروع هندسي من قسم هندسة التصميم الميكانيكي، جامعة دمشق.',
      role: 'الدور',
      responsibilities: 'المسؤوليات',
      bio: 'نبذة',
      tbd: 'يُستكمل لاحقاً.',
      members: [
        {
          name: 'م. غياث أحمد العلي الرزج',
          role: 'المعماري',
          resp: [
            'الإشراف على تطوير منظومة القطع وآلية التغذية ضمن التصميم الهندسي المتكامل للمنظومة بما يحقق تكامل النظام.',
            'تطوير التطبيق المكتبي وموقع عرض المشروع.',
            'إجراء الدراسة التحليلية وتحديد التصور الهندسي للمنظومة.',
            'تنسيق وتوزيع مهام الفريق خلال مراحل المشروع.',
          ],
          bio: 'قائدٌ يجمع بين الرؤية الهندسية والخبرة البرمجية لصياغة منظومة متكاملة.',
        },
        {
          name: 'م. منار موفّق عبد الهادي',
          role: 'المصمِّمة',
          resp: [
            'إجراء الدراسة التحليلية ووضع التصور التصميمي لمنظومتي التغذية والنقل.',
            'تصميم النموذج الهندسي ثلاثي الأبعاد باستخدام SolidWorks.',
            'إعداد المخططات التجميعية والتنفيذية وفق المتطلبات التصنيعية.',
            'ضمان قابلية التصميم للتصنيع والتجميع بما يحقق كفاءة المنظومة.',
          ],
          bio: 'مبدعةٌ تحوّل الرؤية الهندسية إلى تصاميم دقيقة تجمع بين الجمال والكفاءة.',
        },
        {
          name: 'م. ذُكاء أبو الخير',
          role: 'المحلِّلة',
          resp: [
            'إجراء الدراسة التحليلية ووضع التصور التصميمي لآليات التثبيت وربط الأجزاء العاملة.',
            'مراجعة وتدقيق الحسابات الهندسية لضمان دقة التصميم.',
            'إعداد الأطروحة الهندسية وتوثيق الجوانب الفنية للمشروع.',
            'المساهمة في التحقق من توافق الحلول الميكانيكية مع متطلبات التشغيل.',
          ],
          bio: 'رصينةُ التحليل، تجعل من كل تفصيلٍ هندسي خطوةً نحو حلٍّ أكثر موثوقية.',
        },
      ],
    },

    contact: {
      label: 'تواصل',
      heading: 'تريد معرفة المزيد؟',
      lead: 'يقع هذا المشروع عند تقاطع هندسة التصميم الميكانيكي وهندسة البرمجيات. تواصل معنا لمعرفة المزيد عن آلة التشريح المتعدّدة الذكية (SMRM) أو البرنامج الذي يقف خلفها.',
      github: 'عرض على GitHub',
      email: 'راسلنا',
    },

    footer: {
      tagline: 'آلة التشريح المتعدّدة الذكية (SMRM) — منشار تشريح مزدوج المحور بقدرات ذكية.',
      project: 'مشروع هندسي · قسم هندسة التصميم الميكانيكي · جامعة دمشق',
      rights: 'جميع الحقوق محفوظة.',
      built: 'صُنِعت بدقّة هندسية.',
    },

    common: {
      theme: 'المظهر',
      light: 'فاتح',
      dark: 'داكن',
      language: 'اللغة',
      close: 'إغلاق',
      comingSoon: 'قريباً',
      placeholder: 'عنصر نائب',
    },
  },
};

export const LANGS = ['ar', 'en'];
