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
          role: 'Développeuse Full Stack · Cheffe de projet',
          company: 'CME Electronic',
          description: 'Évolution au sein de CME Electronic, de stagiaire en ingénierie à développeuse Full Stack et cheffe de projet, avec la responsabilité de concevoir et piloter des solutions métier web, mobile et desktop.',
          details: [
            'Conception d’architectures full stack évolutives et d’API REST sécurisées avec Spring Boot, Symfony, Express.js et Angular.',
            'Développement de fonctionnalités temps réel avec Socket.io et intégration d’applications web, mobile et desktop.',
            'Pilotage des tâches techniques : clarification des besoins, planification, coordination de l’équipe et suivi des livrables.',
            'Réalisation de solutions métier, notamment une plateforme de contrôle d’accès et un site e-commerce complet.'
          ],
          tags: ['Spring Boot', 'Angular', 'Symfony', 'Express.js', 'Socket.io', 'PHP', 'Twig', 'Doctrine ORM']
        },
        {
          date: 'Août 2023',
          role: 'Développeuse Full Stack PHP/Symfony · Stage',
          company: 'ESPRIT',
          description: 'Conception d’une plateforme de mobilité internationale centralisant les offres, les candidatures et les comptes étudiants et partenaires. Développement du workflow de candidature, de l’historique des dépôts et d’un système de scoring facilitant l’évaluation et la priorisation des dossiers.',
          tags: ['Symfony 5', 'PHP', 'Twig', 'Doctrine ORM', 'MySQL']
        },
        {
          date: 'Jan. — Mai 2022',
          role: 'Ingénieure Réseaux & Monitoring · Stage PFE',
          company: 'Société de Nutrition Animale',
          description: 'Conception et déploiement d’une solution de supervision réseau avec Zabbix afin de centraliser le suivi de la disponibilité des équipements, analyser les performances système et renforcer la fiabilité opérationnelle de l’infrastructure.',
          tags: ['Zabbix', 'GNS3', 'Linux']
        },
        {
          date: 'Août 2021',
          role: 'Développeuse d’application Web · Stage',
          company: 'Ciments de Bizerte',
          description: 'Analyse des besoins, conception et développement d’une plateforme web centralisant la gestion des stagiaires et de leurs données, avec une interface structurée et une base de données dédiée.',
          tags: ['Développement web', 'UI', 'Base de données']
        }
      ],
      projects: [
        {
          type: 'Application web · Freelance',
          year: '2026',
          name: 'RideShare · Covoiturage',
          description: 'Conception et développement d’une plateforme de covoiturage reliant conducteurs et passagers. Les conducteurs gèrent leurs véhicules, publient leurs trajets et valident les demandes, tandis que les passagers recherchent, réservent et évaluent leurs voyages. La solution intègre également une messagerie et un espace d’administration pour gérer les utilisateurs, les trajets, les signalements et les statistiques.',
          tags: ['PHP', 'HTML', 'CSS', 'JavaScript', 'SQL', 'MySQL'],
          image: '',
          video: 'assets/Covoiturage.mp4'
        },
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
          role: 'Full Stack Developer · Project Lead',
          company: 'CME Electronic',
          description: 'Progressed from engineering intern to Full Stack Developer and Project Lead, taking ownership of the design and delivery of business solutions across web, mobile and desktop platforms.',
          details: [
            'Designed scalable full stack architectures and secure REST APIs using Spring Boot, Symfony, Express.js and Angular.',
            'Built real-time features with Socket.io and integrated web, mobile and desktop applications.',
            'Led technical delivery through requirements clarification, task planning, team coordination and milestone tracking.',
            'Delivered business solutions including an access-control platform and a complete e-commerce website.'
          ],
          tags: ['Spring Boot', 'Angular', 'Symfony', 'Express.js', 'Socket.io', 'PHP', 'Twig', 'Doctrine ORM']
        },
        {
          date: 'Aug. 2023',
          role: 'PHP/Symfony Full Stack Developer · Internship',
          company: 'ESPRIT',
          description: 'Designed a platform centralizing international mobility offers, applications, and student and partner accounts. Implemented the application workflow, submission history and a scoring system supporting candidate assessment and prioritization.',
          tags: ['Symfony 5', 'PHP', 'Twig', 'Doctrine ORM', 'MySQL']
        },
        { date: 'Jan. — May 2022', role: 'Network & Monitoring Engineer · Graduation Internship', company: 'Société de Nutrition Animale', description: 'Designed and deployed a Zabbix-based network monitoring solution to centralize equipment availability, analyze system performance and improve the operational reliability of the infrastructure.', tags: ['Zabbix', 'GNS3', 'Linux'] },
        { date: 'Aug. 2021', role: 'Web Application Developer · Internship', company: 'Ciments de Bizerte', description: 'Gathered requirements, designed and developed a web platform centralizing intern records through a structured interface and a dedicated database.', tags: ['Web development', 'UI', 'Database'] }
      ],
      projects: [
        {
          type: 'Web application · Freelance',
          year: '2026',
          name: 'RideShare · Carpooling',
          description: 'Designed and developed a carpooling platform connecting drivers and passengers. Drivers manage their vehicles, publish trips and approve booking requests, while passengers search, book and review their journeys. The solution also includes messaging and an administration area for managing users, trips, reports and statistics.',
          tags: ['PHP', 'HTML', 'CSS', 'JavaScript', 'SQL', 'MySQL'],
          image: '',
          video: 'assets/Covoiturage.mp4'
        },
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
          role: 'Full-Stack-Entwicklerin · Projektleiterin',
          company: 'CME Electronic',
          description: 'Weiterentwicklung von der Engineering-Praktikantin zur Full-Stack-Entwicklerin und Projektleiterin mit Verantwortung für Konzeption und Umsetzung von Geschäftslösungen für Web, Mobile und Desktop.',
          details: [
            'Konzeption skalierbarer Full-Stack-Architekturen und sicherer REST-APIs mit Spring Boot, Symfony, Express.js und Angular.',
            'Entwicklung von Echtzeitfunktionen mit Socket.io sowie Integration von Web-, Mobile- und Desktop-Anwendungen.',
            'Steuerung der technischen Umsetzung: Anforderungsklärung, Aufgabenplanung, Teamkoordination und Terminverfolgung.',
            'Umsetzung von Geschäftslösungen, darunter eine Zutrittskontrollplattform und eine vollständige E-Commerce-Website.'
          ],
          tags: ['Spring Boot', 'Angular', 'Symfony', 'Express.js', 'Socket.io', 'PHP', 'Twig', 'Doctrine ORM']
        },
        { date: 'Aug. 2023', role: 'PHP/Symfony Full-Stack-Entwicklerin · Praktikum', company: 'ESPRIT', description: 'Konzeption einer Plattform zur zentralen Verwaltung internationaler Mobilitätsangebote, Bewerbungen sowie Studierenden- und Partnerkonten. Umsetzung des Bewerbungsworkflows, der Einreichungshistorie und eines Scoring-Systems zur Bewertung und Priorisierung von Bewerbungen.', tags: ['Symfony 5', 'PHP', 'Twig', 'Doctrine ORM', 'MySQL'] },
        { date: 'Jan. — Mai 2022', role: 'Netzwerk- & Monitoring-Ingenieurin · Abschlusspraktikum', company: 'Société de Nutrition Animale', description: 'Konzeption und Einführung einer Zabbix-basierten Monitoring-Lösung zur zentralen Überwachung der Geräteverfügbarkeit, Analyse der Systemleistung und Verbesserung der betrieblichen Infrastrukturzuverlässigkeit.', tags: ['Zabbix', 'GNS3', 'Linux'] },
        { date: 'Aug. 2021', role: 'Webanwendungsentwicklerin · Praktikum', company: 'Ciments de Bizerte', description: 'Anforderungsanalyse, Konzeption und Entwicklung einer Webplattform zur zentralen Verwaltung von Praktikantendaten mit strukturierter Benutzeroberfläche und eigener Datenbank.', tags: ['Webentwicklung', 'UI', 'Datenbank'] }
      ],
      projects: [
        {
          type: 'Webanwendung · Freelance',
          year: '2026',
          name: 'RideShare · Mitfahrgelegenheit',
          description: 'Konzeption und Entwicklung einer Mitfahrplattform, die Fahrer und Fahrgäste verbindet. Fahrer verwalten ihre Fahrzeuge, veröffentlichen Fahrten und bestätigen Buchungsanfragen, während Fahrgäste Fahrten suchen, buchen und bewerten. Die Lösung bietet außerdem Nachrichten sowie einen Administrationsbereich zur Verwaltung von Nutzern, Fahrten, Meldungen und Statistiken.',
          tags: ['PHP', 'HTML', 'CSS', 'JavaScript', 'SQL', 'MySQL'],
          image: '',
          video: 'assets/Covoiturage.mp4'
        },
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
