import { Component, HostListener } from '@angular/core';

type Lang = 'fr' | 'en' | 'de';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuOpen = false;
  photoAvailable = true;
  selectedProject: any = null;
  currentYear = new Date().getFullYear();
  currentLang: Lang = 'fr';

  languages = [
    { code: 'fr' as Lang, label: 'FR' },
    { code: 'en' as Lang, label: 'EN' },
    { code: 'de' as Lang, label: 'DE' }
  ];

  translations: Record<Lang, any> = {
    fr: {
      nav: { about: 'À propos', experience: 'Expérience', projects: 'Projets', contact: 'Contact' },
      hero: {
        status: 'Disponible en Allemagne et dans l’UE',
        eyebrow: 'Ingénieure logicielle · Développeuse Full Stack',
        title: 'Je transforme des idées en',
        highlight: 'solutions digitales.',
        copy: 'Je développe des applications web, mobiles et desktop performantes, avec une expertise particulière en backend et systèmes temps réel.',
        stats: ['Années d’expérience', 'Projets présentés', 'Langues parlées'],
        viewProjects: 'Voir mes projets',
        contact: 'Me contacter',
        cards: ['Full Stack', 'Backend', 'Temps réel']
      },
      about: {
        label: 'À propos',
        title: 'Une développeuse tournée vers les solutions.',
        location: 'Marburg, Allemagne',
        lead: 'Curieuse, rigoureuse et orientée résultats, j’aime construire des architectures fiables sans perdre de vue l’expérience utilisateur.',
        p1: 'Mon parcours m’a menée de la supervision réseau au développement d’écosystèmes full stack complets avec Spring Boot, Symfony, Express.js et Angular.',
        p2: 'Je recherche des projets où la qualité technique, la collaboration et l’impact produit avancent ensemble.',
        skillsLabel: 'Compétences principales',
        downloadCv: 'Télécharger mon CV'
      },
      sections: {
        journey: 'Mon parcours',
        experienceTitle: 'Expérience professionnelle',
        projectsLabel: 'Mes réalisations',
        projectsTitle: 'Des projets concrets, démonstration à l’appui.',
        projectsHint: 'Cliquez sur un aperçu pour ouvrir la démonstration complète.',
        expertiseLabel: 'Expertise',
        expertiseTitle: 'Une vision complète du produit numérique.',
        educationLabel: 'Formation',
        educationTitle: 'Parcours académique'
      },
      demo: {
        openVideo: 'Voir la démonstration',
        openProject: 'Voir le projet',
        openCta: 'Ouvrir la démonstration',
        close: 'Fermer la démonstration',
        aria: 'Démonstration du projet'
      },
      contact: {
        eyebrow: 'Un projet ou une opportunité ?',
        title: 'Construisons quelque chose d’utile ensemble.',
        location: 'Marburg, Allemagne · Ouverte à la relocalisation en Allemagne / UE'
      },
      primarySkills: ['Spring Boot', 'Angular', 'Symfony', 'PHP', 'Twig', 'Doctrine ORM', 'Express.js', 'MySQL', 'Docker', 'Socket.io'],
      experiences: [
        {
          date: 'Oct. 2022 — Nov. 2025',
          role: 'Développeuse Full Stack & Stagiaire',
          company: 'CME Electronic',
          description: 'Collaboration continue avec CME Electronic sur des projets full stack, incluant un stage d’ingénierie, un stage de Projet de Fin d’Études et le développement de solutions métier pour l’entreprise.',
          details: [
            'Stage PFE : développement d’applications full stack scalables avec Spring Boot, Symfony, Express.js et Angular, intégration de fonctionnalités temps réel avec Socket.io et conception d’une architecture backend avec Express.js.',
            'Développeuse Full Stack & Cheffe de projet : conception et intégration d’API REST performantes et sécurisées, participation aux architectures backend temps réel, coordination des tâches techniques, planification et suivi des livrables.',
            'Stage d’ingénierie : développement d’un système de contrôle d’accès, gestion des utilisateurs et mise en place des autorisations.',
            'Développement d’un site e-commerce pour CME Electronic avec Symfony, PHP, Twig, Doctrine ORM et MySQL.'
          ],
          tags: ['Spring Boot', 'Angular', 'Symfony', 'Express.js', 'Socket.io', 'PHP', 'Twig', 'Doctrine ORM']
        },
        {
          date: 'Août 2023',
          role: 'Développeuse Web · Stage',
          company: 'ESPRIT',
          description: 'Implémentation d’une plateforme web de gestion des offres de mobilité internationale pour ESPRIT. La faculté gère les comptes des étudiants et des partenaires, les partenaires publient les offres de mobilité, et les étudiants peuvent consulter les opportunités, postuler et suivre l’historique complet de leurs dépôts. Le processus de sélection repose sur un système de scoring permettant d’évaluer et de prioriser les candidatures.',
          tags: ['Symfony 5', 'PHP', 'Twig', 'Doctrine ORM', 'MySQL']
        },
        {
          date: 'Jan. — Mai 2022',
          role: 'Stage PFE · Licence en Télécommunications',
          company: 'Société de Nutrition Animale',
          description: 'Mise en place d’une solution de monitoring réseau permettant de superviser la disponibilité des équipements, de suivre les performances système et d’améliorer la fiabilité de l’infrastructure.',
          tags: ['Zabbix', 'GNS3', 'Linux']
        },
        {
          date: 'Août 2021',
          role: 'Développeuse Web · Stage',
          company: 'Ciments de Bizerte',
          description: 'Conception et développement d’une plateforme web dédiée à la gestion des stagiaires et de leurs données.',
          tags: ['Développement web', 'UI', 'Base de données']
        }
      ],
      projects: [
        {
          type: 'Application métier · Temps réel',
          year: '2025',
          name: 'CMETrack',
          description: 'Application complète de calcul intelligent des trajets et de tarification en temps réel. Le propriétaire gère ses taxis, associe les chauffeurs aux véhicules et supervise les compteurs avec un historique détaillé. Le chauffeur démarre et arrête son compteur depuis son interface et consulte ses recettes quotidiennes et hebdomadaires.',
          tags: ['Angular', 'Express.js', 'Socket.io', 'Electron.js', 'React Native'],
          image: 'assets/media/smart-taxi.png',
          video: 'assets/CMETrack.mp4'
        },
        {
          type: 'E-commerce',
          year: '2024',
          name: 'CME Electronic',
          description: 'Conception et développement d’un site e-commerce complet pour CME Electronic, incluant la présentation des produits, la gestion du catalogue, le parcours client et la structuration des données via Doctrine ORM.',
          tags: ['Symfony', 'PHP', 'Twig', 'Doctrine ORM', 'MySQL', 'MVC'],
          image: 'assets/media/cme-ecommerce.webp',
          video: 'assets/Ecommerce.mp4'
        },
        {
          type: 'Contrôle d’accès',
          year: '2024',
          name: 'DAMS',
          description: 'Plateforme web de gestion des accès intégrée au système existant, avec des fonctionnalités avancées de sécurité et de suivi. La solution permet de dématérialiser les badges et cartes d’accès via smartphone, d’ouvrir les portes à travers une connexion sécurisée et de consulter un historique détaillé des mouvements.',
          tags: ['Express.js', 'JavaScript', 'MySQL', 'Sécurité', 'Gestion des accès'],
          image: '',
          video: 'assets/DAMS.mp4'
        },
        {
          type: 'Web',
          year: '2024',
          name: 'Courzelo',
          description: 'Plateforme e-learning moderne et interactive permettant aux apprenants d’accéder à des cours en ligne, de suivre leur progression et d’interagir avec d’autres utilisateurs. Le projet intègre une interface intuitive ainsi que des outils d’analyse pour proposer des recommandations personnalisées.',
          tags: ['Spring Boot', 'Angular', 'Django', 'NoSQL', 'Analytics'],
          image: '',
          video: 'assets/Courzelo.mp4'
        },
        {
          type: 'Plateforme web',
          year: '2023',
          name: 'Mobilité Internationale',
          description: 'Plateforme de gestion des mobilités académiques internationales, couvrant les offres, les candidatures, le scoring, les comptes étudiants et partenaires ainsi que l’historique des dépôts.',
          tags: ['Symfony 5', 'PHP', 'Twig', 'Doctrine ORM', 'MySQL'],
          image: '',
          video: 'assets/ESPRIT-Mobilité Internationale .mp4'
        }
      ],
      expertise: [
        { title: 'Backend & Architecture', description: 'Conception de services fiables, maintenables et pensés pour évoluer avec les besoins métier.', items: ['Java · Spring Boot', 'Node.js · Express.js', 'Symfony · PHP', 'API REST · Microservices'] },
        { title: 'Interfaces & Apps', description: 'Création d’interfaces claires et cohérentes pour le web, le mobile et le desktop.', items: ['Angular', 'HTML · CSS · JavaScript', 'Twig', 'React Native · Electron.js'] },
        { title: 'Data & Livraison', description: 'Maîtrise de la donnée, des outils de développement et des pratiques de livraison.', items: ['MySQL · MongoDB', 'Doctrine ORM', 'Docker', 'Git · Postman · Swagger'] }
      ],
      education: [
        { date: '2025 — 2026', degree: 'Échange universitaire en Informatique', school: 'Philipps-Universität Marburg · Allemagne' },
        { date: '2022 — 2025', degree: 'Cycle d’ingénieur en Architecture Logicielle', school: 'ESPRIT · Ariana, Tunisie' },
        { date: '2018 — 2022', degree: 'Bachelor en Télécommunications', school: 'ISTIC · Borj Cedria, Tunisie' }
      ]
    },
    en: {
      nav: { about: 'About', experience: 'Experience', projects: 'Projects', contact: 'Contact' },
      hero: {
        status: 'Available in Germany and across the EU',
        eyebrow: 'Software Engineer · Full Stack Developer',
        title: 'I turn ideas into',
        highlight: 'digital solutions.',
        copy: 'I build performant web, mobile and desktop applications, with a strong focus on backend engineering and real-time systems.',
        stats: ['Years of experience', 'Featured projects', 'Languages spoken'],
        viewProjects: 'View my work',
        contact: 'Get in touch',
        cards: ['Full Stack', 'Backend', 'Real time']
      },
      about: {
        label: 'About',
        title: 'A developer focused on practical solutions.',
        location: 'Marburg, Germany',
        lead: 'Curious, rigorous and results-oriented, I build reliable architectures while keeping the user experience in mind.',
        p1: 'My background spans network monitoring and full stack ecosystems built with Spring Boot, Symfony, Express.js and Angular.',
        p2: 'I am looking for projects where technical quality, collaboration and product impact move forward together.',
        skillsLabel: 'Core skills',
        downloadCv: 'Download resume'
      },
      sections: {
        journey: 'My journey',
        experienceTitle: 'Professional experience',
        projectsLabel: 'Selected work',
        projectsTitle: 'Concrete projects with live demonstrations.',
        projectsHint: 'Click a preview to open the full demonstration.',
        expertiseLabel: 'Expertise',
        expertiseTitle: 'A complete view of digital product development.',
        educationLabel: 'Education',
        educationTitle: 'Academic background'
      },
      demo: { openVideo: 'Watch demo', openProject: 'View project', openCta: 'Open demonstration', close: 'Close demonstration', aria: 'Project demonstration' },
      contact: { eyebrow: 'A project or opportunity?', title: 'Let’s build something useful together.', location: 'Marburg, Germany · Open to relocation in Germany / EU' },
      primarySkills: ['Spring Boot', 'Angular', 'Symfony', 'PHP', 'Twig', 'Doctrine ORM', 'Express.js', 'MySQL', 'Docker', 'Socket.io'],
      experiences: [
        {
          date: 'Oct. 2022 — Nov. 2025',
          role: 'Full Stack Developer & Intern',
          company: 'CME Electronic',
          description: 'Continuous collaboration with CME Electronic on full stack projects, including an engineering internship, a graduation project internship and business applications for the company.',
          details: [
            'Graduation project: scalable full stack applications with Spring Boot, Symfony, Express.js and Angular, real-time features with Socket.io and backend architecture with Express.js.',
            'Full Stack Developer & Project Lead: design and integration of secure REST APIs, contribution to real-time backend architectures, task coordination, planning and delivery tracking.',
            'Engineering internship: development of an access control system, user management and permission management.',
            'Development of an e-commerce website for CME Electronic with Symfony, PHP, Twig, Doctrine ORM and MySQL.'
          ],
          tags: ['Spring Boot', 'Angular', 'Symfony', 'Express.js', 'Socket.io', 'PHP', 'Twig', 'Doctrine ORM']
        },
        {
          date: 'Aug. 2023',
          role: 'Web Developer · Internship',
          company: 'ESPRIT',
          description: 'Implemented a web platform for international mobility opportunities at ESPRIT. The faculty manages student and partner accounts, partners publish mobility offers, and students can browse opportunities, apply and track their complete application history. Selection is supported by a scoring system.',
          tags: ['Symfony 5', 'PHP', 'Twig', 'Doctrine ORM', 'MySQL']
        },
        { date: 'Jan. — May 2022', role: 'Graduation Internship · Telecommunications Bachelor', company: 'Société de Nutrition Animale', description: 'Implemented a network monitoring solution to supervise equipment availability, track system performance and improve infrastructure reliability.', tags: ['Zabbix', 'GNS3', 'Linux'] },
        { date: 'Aug. 2021', role: 'Web Developer · Internship', company: 'Ciments de Bizerte', description: 'Designed and developed a web platform for intern management and data handling.', tags: ['Web development', 'UI', 'Database'] }
      ],
      projects: [
        { type: 'Business app · Real time', year: '2025', name: 'CMETrack', description: 'A complete application for intelligent route calculation and real-time pricing. Owners manage taxis, assign drivers to vehicles and monitor meters with detailed history. Drivers start and stop the meter and track daily and weekly revenue.', tags: ['Angular', 'Express.js', 'Socket.io', 'Electron.js', 'React Native'], image: 'assets/media/smart-taxi.png', video: 'assets/CMETrack.mp4' },
        { type: 'E-commerce', year: '2024', name: 'CME Electronic', description: 'Designed and developed a complete e-commerce website for CME Electronic, including product presentation, catalog management, customer journey and data modeling with Doctrine ORM.', tags: ['Symfony', 'PHP', 'Twig', 'Doctrine ORM', 'MySQL', 'MVC'], image: 'assets/media/cme-ecommerce.webp', video: 'assets/Ecommerce.mp4' },
        { type: 'Access control', year: '2024', name: 'DAMS', description: 'Web platform for access management integrated with the existing system, adding advanced security and tracking features. It dematerializes badges through smartphones, enables secure door opening and provides detailed access history.', tags: ['Express.js', 'JavaScript', 'MySQL', 'Security', 'Access management'], image: '', video: 'assets/DAMS.mp4' },
        { type: 'Web', year: '2024', name: 'Courzelo', description: 'Modern interactive e-learning platform where learners access online courses, track progress and interact with others. The project includes an intuitive interface and analytics tools for personalized recommendations.', tags: ['Spring Boot', 'Angular', 'Django', 'NoSQL', 'Analytics'], image: '', video: 'assets/Courzelo.mp4' },
        { type: 'Web platform', year: '2023', name: 'International Mobility', description: 'Platform for international academic mobility, covering offers, applications, scoring, student and partner accounts, and complete submission history.', tags: ['Symfony 5', 'PHP', 'Twig', 'Doctrine ORM', 'MySQL'], image: '', video: 'assets/ESPRIT-Mobilité Internationale .mp4' }
      ],
      expertise: [
        { title: 'Backend & Architecture', description: 'Designing reliable, maintainable services aligned with business needs.', items: ['Java · Spring Boot', 'Node.js · Express.js', 'Symfony · PHP', 'REST APIs · Microservices'] },
        { title: 'Interfaces & Apps', description: 'Creating clear and consistent interfaces for web, mobile and desktop applications.', items: ['Angular', 'HTML · CSS · JavaScript', 'Twig', 'React Native · Electron.js'] },
        { title: 'Data & Delivery', description: 'Strong command of data, development tools and delivery practices.', items: ['MySQL · MongoDB', 'Doctrine ORM', 'Docker', 'Git · Postman · Swagger'] }
      ],
      education: [
        { date: '2025 — 2026', degree: 'Exchange Student in Computer Science', school: 'Philipps University Marburg · Germany' },
        { date: '2022 — 2025', degree: 'Engineering Degree in Software Architecture', school: 'ESPRIT · Ariana, Tunisia' },
        { date: '2018 — 2022', degree: 'Bachelor in Telecommunications', school: 'ISTIC · Borj Cedria, Tunisia' }
      ]
    },
    de: {
      nav: { about: 'Über mich', experience: 'Erfahrung', projects: 'Projekte', contact: 'Kontakt' },
      hero: {
        status: 'Verfügbar in Deutschland und der EU',
        eyebrow: 'Softwareingenieurin · Full-Stack-Entwicklerin',
        title: 'Ich verwandle Ideen in',
        highlight: 'digitale Lösungen.',
        copy: 'Ich entwickle leistungsfähige Web-, Mobile- und Desktop-Anwendungen mit Schwerpunkt auf Backend-Entwicklung und Echtzeitsystemen.',
        stats: ['Jahre Erfahrung', 'Ausgewählte Projekte', 'Sprachen'],
        viewProjects: 'Projekte ansehen',
        contact: 'Kontakt aufnehmen',
        cards: ['Full Stack', 'Backend', 'Echtzeit']
      },
      about: {
        label: 'Über mich',
        title: 'Eine Entwicklerin mit Fokus auf tragfähige Lösungen.',
        location: 'Marburg, Deutschland',
        lead: 'Neugierig, sorgfältig und ergebnisorientiert entwickle ich zuverlässige Architekturen, ohne die Nutzererfahrung aus dem Blick zu verlieren.',
        p1: 'Mein Weg reicht von Netzwerk-Monitoring bis zu Full-Stack-Systemen mit Spring Boot, Symfony, Express.js und Angular.',
        p2: 'Ich suche Projekte, in denen technische Qualität, Zusammenarbeit und Produktwirkung gemeinsam wachsen.',
        skillsLabel: 'Kernkompetenzen',
        downloadCv: 'Lebenslauf herunterladen'
      },
      sections: {
        journey: 'Mein Werdegang',
        experienceTitle: 'Berufserfahrung',
        projectsLabel: 'Ausgewählte Arbeiten',
        projectsTitle: 'Konkrete Projekte mit Demonstrationen.',
        projectsHint: 'Klicken Sie auf eine Vorschau, um die vollständige Demonstration zu öffnen.',
        expertiseLabel: 'Expertise',
        expertiseTitle: 'Ein ganzheitlicher Blick auf digitale Produktentwicklung.',
        educationLabel: 'Ausbildung',
        educationTitle: 'Akademischer Hintergrund'
      },
      demo: { openVideo: 'Demo ansehen', openProject: 'Projekt ansehen', openCta: 'Demonstration öffnen', close: 'Demonstration schließen', aria: 'Projektdemonstration' },
      contact: { eyebrow: 'Ein Projekt oder eine Gelegenheit?', title: 'Lassen Sie uns gemeinsam etwas Nützliches bauen.', location: 'Marburg, Deutschland · Offen für Umzug in Deutschland / EU' },
      primarySkills: ['Spring Boot', 'Angular', 'Symfony', 'PHP', 'Twig', 'Doctrine ORM', 'Express.js', 'MySQL', 'Docker', 'Socket.io'],
      experiences: [
        {
          date: 'Okt. 2022 — Nov. 2025',
          role: 'Full-Stack-Entwicklerin & Praktikantin',
          company: 'CME Electronic',
          description: 'Kontinuierliche Zusammenarbeit mit CME Electronic an Full-Stack-Projekten, einschließlich Engineering-Praktikum, Abschlussprojekt und Geschäftsanwendungen für das Unternehmen.',
          details: [
            'Abschlussprojekt: skalierbare Full-Stack-Anwendungen mit Spring Boot, Symfony, Express.js und Angular, Echtzeitfunktionen mit Socket.io und Backend-Architektur mit Express.js.',
            'Full-Stack-Entwicklerin & Projektleiterin: Entwurf und Integration sicherer REST-APIs, Mitarbeit an Echtzeit-Backend-Architekturen, Aufgabenkoordination, Planung und Lieferverfolgung.',
            'Engineering-Praktikum: Entwicklung eines Zutrittskontrollsystems, Benutzerverwaltung und Berechtigungsverwaltung.',
            'Entwicklung einer E-Commerce-Website für CME Electronic mit Symfony, PHP, Twig, Doctrine ORM und MySQL.'
          ],
          tags: ['Spring Boot', 'Angular', 'Symfony', 'Express.js', 'Socket.io', 'PHP', 'Twig', 'Doctrine ORM']
        },
        { date: 'Aug. 2023', role: 'Webentwicklerin · Praktikum', company: 'ESPRIT', description: 'Implementierung einer Webplattform für internationale Mobilitätsangebote bei ESPRIT. Die Fakultät verwaltet Konten für Studierende und Partner, Partner veröffentlichen Angebote, und Studierende können Angebote ansehen, sich bewerben und ihre vollständige Bewerbungshistorie verfolgen. Die Auswahl wird durch ein Scoring-System unterstützt.', tags: ['Symfony 5', 'PHP', 'Twig', 'Doctrine ORM', 'MySQL'] },
        { date: 'Jan. — Mai 2022', role: 'Abschlusspraktikum · Bachelor Telekommunikation', company: 'Société de Nutrition Animale', description: 'Einführung einer Netzwerk-Monitoring-Lösung zur Überwachung der Verfügbarkeit von Geräten, zur Analyse der Systemleistung und zur Verbesserung der Infrastrukturzuverlässigkeit.', tags: ['Zabbix', 'GNS3', 'Linux'] },
        { date: 'Aug. 2021', role: 'Webentwicklerin · Praktikum', company: 'Ciments de Bizerte', description: 'Konzeption und Entwicklung einer Webplattform zur Verwaltung von Praktikantinnen und Praktikanten sowie ihrer Daten.', tags: ['Webentwicklung', 'UI', 'Datenbank'] }
      ],
      projects: [
        { type: 'Business-App · Echtzeit', year: '2025', name: 'CMETrack', description: 'Vollständige Anwendung für intelligente Routenberechnung und Echtzeit-Tarifberechnung. Besitzer verwalten Taxis, weisen Fahrer Fahrzeugen zu und überwachen Taxameter mit detaillierter Historie. Fahrer starten und stoppen den Zähler und verfolgen tägliche sowie wöchentliche Einnahmen.', tags: ['Angular', 'Express.js', 'Socket.io', 'Electron.js', 'React Native'], image: 'assets/media/smart-taxi.png', video: 'assets/CMETrack.mp4' },
        { type: 'E-Commerce', year: '2024', name: 'CME Electronic', description: 'Konzeption und Entwicklung einer vollständigen E-Commerce-Website für CME Electronic mit Produktpräsentation, Katalogverwaltung, Customer Journey und Datenmodellierung mit Doctrine ORM.', tags: ['Symfony', 'PHP', 'Twig', 'Doctrine ORM', 'MySQL', 'MVC'], image: 'assets/media/cme-ecommerce.webp', video: 'assets/Ecommerce.mp4' },
        { type: 'Zutrittskontrolle', year: '2024', name: 'DAMS', description: 'Webplattform zur Zutrittsverwaltung, integriert in das bestehende System, mit erweiterten Sicherheits- und Tracking-Funktionen. Sie digitalisiert Ausweise über Smartphones, ermöglicht sicheres Öffnen von Türen und bietet eine detaillierte Zugriffshistorie.', tags: ['Express.js', 'JavaScript', 'MySQL', 'Sicherheit', 'Zugriffsverwaltung'], image: '', video: 'assets/DAMS.mp4' },
        { type: 'Web', year: '2024', name: 'Courzelo', description: 'Moderne interaktive E-Learning-Plattform, auf der Lernende Online-Kurse besuchen, ihren Fortschritt verfolgen und mit anderen interagieren können. Das Projekt umfasst eine intuitive Oberfläche und Analysewerkzeuge für personalisierte Empfehlungen.', tags: ['Spring Boot', 'Angular', 'Django', 'NoSQL', 'Analytics'], image: '', video: 'assets/Courzelo.mp4' },
        { type: 'Webplattform', year: '2023', name: 'Internationale Mobilität', description: 'Plattform für internationale akademische Mobilität mit Angeboten, Bewerbungen, Scoring, Konten für Studierende und Partner sowie vollständiger Einreichungshistorie.', tags: ['Symfony 5', 'PHP', 'Twig', 'Doctrine ORM', 'MySQL'], image: '', video: 'assets/ESPRIT-Mobilité Internationale .mp4' }
      ],
      expertise: [
        { title: 'Backend & Architektur', description: 'Entwicklung zuverlässiger und wartbarer Services, abgestimmt auf fachliche Anforderungen.', items: ['Java · Spring Boot', 'Node.js · Express.js', 'Symfony · PHP', 'REST-APIs · Microservices'] },
        { title: 'Interfaces & Apps', description: 'Entwicklung klarer und konsistenter Oberflächen für Web-, Mobile- und Desktop-Anwendungen.', items: ['Angular', 'HTML · CSS · JavaScript', 'Twig', 'React Native · Electron.js'] },
        { title: 'Daten & Delivery', description: 'Sicherer Umgang mit Daten, Entwicklungstools und Lieferprozessen.', items: ['MySQL · MongoDB', 'Doctrine ORM', 'Docker', 'Git · Postman · Swagger'] }
      ],
      education: [
        { date: '2025 — 2026', degree: 'Austauschstudentin in Informatik', school: 'Philipps-Universität Marburg · Deutschland' },
        { date: '2022 — 2025', degree: 'Ingenieurstudium Softwarearchitektur', school: 'ESPRIT · Ariana, Tunesien' },
        { date: '2018 — 2022', degree: 'Bachelor in Telekommunikation', school: 'ISTIC · Borj Cedria, Tunesien' }
      ]
    }
  };

  get t(): any {
    return this.translations[this.currentLang];
  }

  get cvPath(): string {
    return this.currentLang === 'fr'
      ? 'assets/Aya Aloui CV Fr.pdf'
      : 'assets/Aya Aloui CV ATS eng VF.pdf';
  }

  setLanguage(lang: Lang): void {
    this.currentLang = lang;
    this.closeMenu();
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  hidePhoto(): void {
    this.photoAvailable = false;
  }

  openDemo(project: any): void {
    this.selectedProject = project;
    document.body.classList.add('modal-open');
  }

  closeDemo(): void {
    this.selectedProject = null;
    document.body.classList.remove('modal-open');
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.selectedProject) {
      this.closeDemo();
    }
  }
}
