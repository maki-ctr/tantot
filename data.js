// Tantôt — content. Edit freely: everything the app shows comes from this file.
window.DATA = {

  profile: {
    name: "Malick",
    level: { comprehension: "B1", production: "A2+", target: "B1" },
    // Used in every AI prompt so corrections target the right things.
    summary: "Malick Manso, chef de projet digital (15+ ans, OLX, Moza Banco, Crossmedia depuis 2014), vit à Sint-Truiden, travaille chez Toyota à Diest (poste de transition). Langue maternelle : portugais. Anglais courant. Français : B1 en compréhension, A2+ en production. Objectif : entretiens et travail de chef de projet en Belgique, puis DELF B1.",
    knownErrors: "interférences du portugais (orthographe : -cional → -tionnel, consonnes doubles, accents) ; être/avoir au passé composé ; conjugaison de l'imparfait ; subjonctif après il faut que / bien que ; prépositions à/en/chez/au ; dont ; accords genre/nombre ; mots anglais qui s'infiltrent."
  },

  speakers: {
    M: "Malick",
    R: "Sophie Lambert, recruteuse",
    A: "Anne Claes, responsable du recrutement",
    T: "Thomas Leclercq, lead développeur",
    F: "Fatima El Amrani, business analyst",
    D: "Dirk Vandenberghe, sponsor",
    C: "Caroline Dubois, cliente"
  },

  scenarios: [
    // ───────────── ENTRETIENS ─────────────
    {
      id: "appel-recruteur", group: "entretien", title: "Le premier appel du recruteur",
      situation: "A recruiter calls about a PM mission at a Brussels insurer. After two minutes in English she switches to French to check your level. This happens a lot in Belgium.",
      lines: [
        ["R", "Bonjour Monsieur Manso, Sophie Lambert du cabinet de recrutement. Vous avez deux minutes ?", "Hello Mr Manso, Sophie Lambert from the recruitment firm. Do you have two minutes?"],
        ["M", "Bonjour Madame Lambert. Oui, bien sûr, je vous écoute.", "Hello Ms Lambert. Yes, of course, I'm listening."],
        ["R", "Si ça ne vous dérange pas, on continue en français. Le client travaille dans les deux langues.", "If you don't mind, let's continue in French. The client works in both languages."],
        ["M", "Pas de problème. Mon français est intermédiaire, mais je le pratique tous les jours.", "No problem. My French is intermediate, but I practise it every day."],
        ["R", "Très bien. Quelle est votre disponibilité ?", "Very good. When are you available?"],
        ["M", "J'ai un préavis de quatre semaines.", "I have four weeks' notice."],
        ["R", "Vous préférez un contrat de salarié ou le statut d'indépendant ?", "Do you prefer an employee contract or self-employed status?"],
        ["M", "Je suis ouvert aux deux. J'ai aussi ma propre société de conseil, Crossmedia, depuis 2014.", "I'm open to both. I've also had my own consultancy, Crossmedia, since 2014."],
        ["R", "Et votre tarif journalier ?", "And your day rate?"],
        ["M", "Je préfère en discuter quand j'aurai plus de détails sur la mission.", "I'd rather discuss it once I have more details about the assignment."],
        ["R", "D'accord. Je vous envoie la description du poste endéans la journée.", "OK. I'll send you the job description within the day."],
        ["M", "Parfait, merci. Bonne fin de journée !", "Perfect, thank you. Have a good rest of the day!"]
      ],
      phrases: [
        ["je vous écoute", "I'm listening (polite phone phrase)"],
        ["un préavis de quatre semaines", "four weeks' notice"],
        ["le statut d'indépendant", "self-employed status"],
        ["le tarif journalier", "day rate"],
        ["endéans la journée", "within the day (Belgian)"],
        ["bonne fin de journée", "have a good rest of the day"]
      ],
      tasks: [
        { id: "ar1", prompt: "« Pourquoi cherchez-vous un nouveau poste en ce moment ? » Répondez en 3 ou 4 phrases.",
          hint: "Present Toyota honestly as a transitional role, then bring it back to your PM experience.",
          model: "En ce moment, je travaille chez Toyota à Diest. C'est un poste de transition depuis mon arrivée en Belgique en 2024. Mon vrai métier, c'est la gestion de projets digitaux : j'ai plus de quinze ans d'expérience. Je cherche maintenant un poste où je peux utiliser ces compétences." },
        { id: "ar2", prompt: "« Quel est votre niveau de français, honnêtement ? »",
          hint: "Be honest and specific, then show momentum.",
          model: "Je dirais que j'ai un niveau intermédiaire. Je comprends bien les réunions et les documents. À l'écrit, je fais encore quelques erreurs, mais je progresse chaque semaine. Mon objectif est d'obtenir le DELF B1." }
      ],
      roleplay: "Tu es Sophie Lambert, recruteuse dans un cabinet à Bruxelles. Tu appelles Malick pour une mission de chef de projet chez un assureur bruxellois (transformation digitale, IA). Tu vérifies son niveau de français, sa disponibilité, son statut (salarié ou indépendant), son tarif et sa motivation."
    },
    {
      id: "presentez-vous", group: "entretien", title: "« Présentez-vous »",
      situation: "First question of almost every interview. You need a smooth 60-second pitch in French, in the past tense, in the right order.",
      lines: [
        ["A", "Merci d'être venu. Pour commencer, pouvez-vous vous présenter ?", "Thank you for coming. To start, could you introduce yourself?"],
        ["M", "Bien sûr. Je m'appelle Malick Manso. Je suis chef de projet digital depuis plus de quinze ans.", "Of course. My name is Malick Manso. I've been a digital project manager for more than fifteen years."],
        ["M", "J'ai commencé dans l'e-commerce, chez OLX, où j'étais chef de produit pour l'Angola et le Mozambique.", "I started in e-commerce, at OLX, where I was product manager for Angola and Mozambique."],
        ["M", "Ensuite, j'ai travaillé chez Moza Banco, une banque au Mozambique, dans un environnement très réglementé.", "Then I worked at Moza Banco, a bank in Mozambique, in a highly regulated environment."],
        ["M", "Depuis 2014, je dirige aussi ma société de conseil, Crossmedia.", "Since 2014, I've also run my consultancy, Crossmedia."],
        ["A", "Et pourquoi la Belgique ?", "And why Belgium?"],
        ["M", "Je suis arrivé en Belgique en 2024 avec ma famille. Nous habitons à Sint-Truiden, et je souhaite construire ma carrière ici.", "I arrived in Belgium in 2024 with my family. We live in Sint-Truiden, and I want to build my career here."]
      ],
      phrases: [
        ["j'ai commencé dans...", "I started in..."],
        ["ensuite", "then"],
        ["depuis 2014, je dirige...", "since 2014, I've been running..."],
        ["un environnement réglementé", "a regulated environment"],
        ["je souhaite construire ma carrière ici", "I want to build my career here"]
      ],
      tasks: [
        { id: "pv1", prompt: "Présentez-vous en 5 ou 6 phrases (environ 60 secondes à l'oral). Utilisez : « j'ai commencé », « ensuite », « depuis ».",
          hint: "Chronological order. Passé composé for events, imparfait for what you were doing (j'étais, je gérais).",
          model: "Je m'appelle Malick Manso et je suis chef de projet digital. J'ai commencé dans l'e-commerce chez OLX, où je gérais le produit pour l'Angola et le Mozambique. Ensuite, j'ai travaillé chez Moza Banco sur des projets digitaux dans un environnement réglementé. Depuis 2014, je dirige aussi ma société de conseil, Crossmedia. Je suis arrivé en Belgique en 2024 et je prépare ma certification PRINCE2." },
        { id: "pv2", prompt: "« Qu'est-ce qui vous intéresse dans ce poste ? »",
          hint: "Link the role to something concrete from your past.",
          model: "Ce poste m'intéresse parce qu'il combine la gestion de projet et la transformation digitale. J'aime travailler avec des équipes et des parties prenantes différentes. En plus, le secteur de l'assurance ressemble beaucoup au secteur bancaire, que je connais bien." }
      ],
      roleplay: "Tu es Anne Claes, responsable du recrutement dans une grande entreprise belge. Tu mènes un entretien d'embauche pour un poste de chef de projet digital. Commence par « Pouvez-vous vous présenter ? », puis pose des questions de suivi sur son parcours et sa motivation."
    },
    {
      id: "projet-difficile", group: "entretien", title: "« Parlez-moi d'un projet difficile »",
      situation: "The classic behavioural question. Answer with STAR: Situation, Task, Action, Result. This is exactly where imparfait vs passé composé matters.",
      lines: [
        ["A", "Pouvez-vous me parler d'un projet difficile ?", "Can you tell me about a difficult project?"],
        ["M", "Oui. Chez Moza Banco, nous préparions le lancement d'un nouveau produit digital.", "Yes. At Moza Banco, we were preparing the launch of a new digital product."],
        ["M", "Le problème, c'était que chaque changement devait être approuvé par la conformité, les risques et le service juridique.", "The problem was that every change had to be approved by compliance, risk and legal."],
        ["M", "J'ai préparé des demandes de changement écrites et je les ai enregistrées dans un registre d'approbation.", "I prepared written change requests and recorded them in an approval register."],
        ["M", "Comme ça, tout le monde savait où en était chaque demande.", "That way, everyone knew the status of each request."],
        ["A", "Qu'est-ce que vous avez appris ?", "What did you learn?"],
        ["M", "J'ai appris que, dans un environnement réglementé, la traçabilité est aussi importante que la vitesse.", "I learned that in a regulated environment, traceability matters as much as speed."]
      ],
      phrases: [
        ["nous préparions", "we were preparing (imparfait: background)"],
        ["le problème, c'était que...", "the problem was that..."],
        ["une demande de changement", "a change request"],
        ["savoir où en est...", "to know the status of..."],
        ["la traçabilité", "traceability"]
      ],
      tasks: [
        { id: "pd1", prompt: "Racontez un autre projet difficile avec la méthode STAR. Utilisez l'imparfait pour le contexte et le passé composé pour vos actions.",
          hint: "Suggestion: Mulala, where you wrote functional requirements and tested each build on device. Only claim what you really did.",
          model: "Chez Mulala, nous développions une application mobile. Les versions livrées ne correspondaient pas toujours aux besoins. J'ai rédigé des exigences fonctionnelles claires, puis j'ai testé chaque version sur téléphone. J'ai noté les anomalies et j'ai validé les mises en production. Résultat : l'équipe savait exactement ce qui était attendu." },
        { id: "pd2", prompt: "« Le client raccourcit votre délai de deux semaines. Que faites-vous ? »",
          hint: "Structure: analyse, options, recommendation, who decides. Present tense is fine.",
          model: "D'abord, j'analyse l'impact sur le planning et les livrables. Ensuite, je propose des options : réduire le périmètre, ajouter des ressources ou garder la date initiale. Je présente les risques de chaque option. La décision revient au sponsor, mais il doit décider en connaissant les conséquences." }
      ],
      roleplay: "Tu es Anne Claes, responsable du recrutement. Tu poses des questions comportementales à Malick, candidat chef de projet : un projet difficile, un conflit avec une partie prenante, un échec. Demande des exemples concrets et relance s'il reste vague."
    },
    {
      id: "point-faible", group: "entretien", title: "Le point faible : la langue",
      situation: "In Belgium the language question will come up. The honest-gap answer (name it, show the plan, pivot to a strength) works better than bluffing.",
      lines: [
        ["A", "Le poste demande le français et le néerlandais. Comment voyez-vous ça ?", "The role requires French and Dutch. How do you see that?"],
        ["M", "Je vais être honnête : mon français est intermédiaire et mon néerlandais est débutant.", "I'll be honest: my French is intermediate and my Dutch is beginner level."],
        ["M", "Mais j'apprends vite. J'étudie le néerlandais tous les jours et je réactive mon français.", "But I learn fast. I study Dutch every day and I'm reactivating my French."],
        ["M", "Et je travaille dans des équipes multilingues depuis quinze ans.", "And I've been working in multilingual teams for fifteen years."],
        ["A", "Vous seriez à l'aise en réunion en français ?", "Would you be comfortable in meetings in French?"],
        ["M", "Je comprends bien les réunions. Au début, pour les documents importants, je ferais relire un collègue.", "I understand meetings well. At first, for important documents, I'd have a colleague proofread."]
      ],
      phrases: [
        ["je vais être honnête", "I'll be honest"],
        ["j'apprends vite", "I learn fast"],
        ["des équipes multilingues", "multilingual teams"],
        ["être à l'aise", "to be comfortable"],
        ["faire relire", "to have something proofread"]
      ],
      tasks: [
        { id: "pf1", prompt: "« Quel est votre plus grand défaut ? » Donnez un vrai défaut et ce que vous faites pour vous améliorer.",
          hint: "A real weakness, a concrete fix, a result.",
          model: "Parfois, je veux tout contrôler moi-même, surtout quand un projet est en retard. J'ai appris à déléguer davantage et à faire confiance à l'équipe. Maintenant, je fixe des points de contrôle réguliers au lieu de tout vérifier." },
        { id: "pf2", prompt: "« Pourquoi devrions-nous vous choisir, malgré la langue ? »",
          hint: "Two concrete strengths the other candidates probably don't have.",
          model: "Parce que j'apporte une expérience que peu de candidats ont : quinze ans de projets digitaux, dans des environnements réglementés comme la banque. Je sais gérer des parties prenantes exigeantes. Pour la langue, je progresse chaque semaine, et mon expérience ne dépend pas de la langue." }
      ],
      roleplay: "Tu es Anne Claes. Le poste demande le français et le néerlandais. Tu testes Malick sur ses faiblesses, son niveau de langue et sa capacité à travailler dans un environnement belge multilingue. Sois poli mais exigeant."
    },
    {
      id: "fin-entretien", group: "entretien", title: "Fin d'entretien : vos questions et le salaire",
      situation: "« Avez-vous des questions ? » and the salary question. Belgian packages include things you need to name: company car, meal vouchers, group insurance.",
      lines: [
        ["A", "Avez-vous des questions pour nous ?", "Do you have any questions for us?"],
        ["M", "Oui. Comment se passe une semaine type dans l'équipe ?", "Yes. What does a typical week look like in the team?"],
        ["A", "Nous avons un point hebdomadaire le lundi et un comité de pilotage chaque mois.", "We have a weekly check-in on Monday and a steering committee every month."],
        ["M", "Et quelle méthode de gestion de projet utilisez-vous ?", "And which project management method do you use?"],
        ["A", "Un mélange : PRINCE2 pour la gouvernance, agile pour les développements.", "A mix: PRINCE2 for governance, agile for development."],
        ["M", "Très bien. Je prépare justement ma certification PRINCE2 Foundation.", "Great. I'm actually preparing my PRINCE2 Foundation certification."],
        ["A", "Quelles sont vos prétentions salariales ?", "What are your salary expectations?"],
        ["M", "Cela dépendra de l'ensemble du package : voiture de société, chèques-repas, assurance groupe.", "It will depend on the whole package: company car, meal vouchers, group insurance."],
        ["A", "Je comprends. Nous revenons vers vous endéans la semaine.", "I understand. We'll get back to you within the week."]
      ],
      phrases: [
        ["une semaine type", "a typical week"],
        ["le comité de pilotage (COPIL)", "steering committee"],
        ["les prétentions salariales", "salary expectations"],
        ["la voiture de société", "company car"],
        ["les chèques-repas", "meal vouchers"],
        ["revenir vers quelqu'un", "to get back to someone"]
      ],
      tasks: [
        { id: "fe1", prompt: "Écrivez trois questions à poser au recruteur à la fin de l'entretien.",
          hint: "About the team, the first 90 days, how success is measured.",
          model: "Quelles seront mes priorités pendant les trois premiers mois ? Comment mesurez-vous la réussite dans ce poste ? Avec quelles équipes est-ce que je travaillerais le plus ?" },
        { id: "fe2", prompt: "Mission en indépendant : « Quel est votre tarif journalier ? » Répondez avec tact.",
          hint: "Give a range or a condition, stay polite, keep room to negotiate.",
          model: "Mon tarif dépend de la durée et de la complexité de la mission. Pour une mission de ce type, je me situe généralement dans une fourchette que je peux vous préciser par écrit. Je suis ouvert à la discussion si la mission est longue." }
      ],
      roleplay: "Tu es Anne Claes. C'est la fin de l'entretien. Demande à Malick s'il a des questions, réponds-y brièvement, puis aborde ses prétentions salariales et sa disponibilité."
    },

    // ───────────── AU TRAVAIL ─────────────
    {
      id: "kickoff", group: "travail", title: "Réunion de lancement",
      situation: "Your first meeting with the team. You set the objective, handle a first estimate, and deal with a sponsor who only cares about the date.",
      lines: [
        ["M", "Bonjour à tous, merci d'être là. Je suis Malick, le nouveau chef de projet.", "Hello everyone, thanks for being here. I'm Malick, the new project manager."],
        ["M", "L'objectif de cette réunion, c'est de nous mettre d'accord sur le périmètre, le planning et les rôles.", "The goal of this meeting is to agree on scope, schedule and roles."],
        ["T", "Côté développement, on a déjà une première estimation : environ douze semaines.", "On the development side, we already have a first estimate: about twelve weeks."],
        ["M", "Merci Thomas. On la validera avec Fatima après l'atelier des exigences.", "Thanks Thomas. We'll validate it with Fatima after the requirements workshop."],
        ["F", "L'atelier est prévu jeudi. Je vous envoie l'invitation.", "The workshop is planned for Thursday. I'll send you the invite."],
        ["D", "Pour moi, la priorité, c'est la date. On doit être prêts avant la fin du trimestre.", "For me, the priority is the date. We need to be ready before the end of the quarter."],
        ["M", "Bien noté. Je prépare un planning détaillé et je vous le présente vendredi.", "Noted. I'll prepare a detailed schedule and present it to you on Friday."]
      ],
      phrases: [
        ["se mettre d'accord sur", "to agree on"],
        ["le périmètre", "scope"],
        ["côté développement", "on the development side"],
        ["l'atelier des exigences", "requirements workshop"],
        ["bien noté", "noted"]
      ],
      tasks: [
        { id: "ko1", prompt: "Ouvrez une réunion : accueillez l'équipe, donnez l'objectif et annoncez l'ordre du jour en trois points.",
          hint: "D'abord... ensuite... enfin...",
          model: "Bonjour à tous et merci d'être là. L'objectif aujourd'hui est de lancer officiellement le projet. D'abord, on fera un tour de table. Ensuite, on présentera le périmètre et le planning. Enfin, on parlera des risques principaux." },
        { id: "ko2", prompt: "Thomas estime douze semaines, mais Dirk en veut huit. Répondez aux deux.",
          hint: "Don't promise. Offer options with consequences.",
          model: "Je comprends que la date est importante, Dirk. Avec le périmètre actuel, l'estimation de Thomas est de douze semaines. Pour tenir huit semaines, on peut réduire le périmètre ou ajouter des ressources. Je vous propose de comparer ces options vendredi." }
      ],
      roleplay: "Tu joues deux rôles en réunion de lancement : Thomas Leclercq (lead développeur, prudent) et Dirk Vandenberghe (sponsor néerlandophone, parle français avec des phrases simples, veut une date rapide). Indique qui parle. Malick anime la réunion."
    },
    {
      id: "copil-retard", group: "travail", title: "Le COPIL : annoncer un retard",
      situation: "A supplier issue pushes you past the stage tolerance. In PRINCE2 terms: escalate to the Project Board with options and a recommendation. Same situation as your diagnostic email, now done properly.",
      lines: [
        ["D", "Malick, où en est le projet ?", "Malick, where is the project at?"],
        ["M", "Je dois vous signaler un dépassement de tolérance. Le fournisseur a rencontré un problème de sécurité.", "I have to report a tolerance breach. The supplier ran into a security issue."],
        ["M", "Nous avons une semaine de retard, ce qui dépasse la tolérance de trois jours fixée pour cette phase.", "We're a week late, which exceeds the three-day tolerance set for this stage."],
        ["D", "Quelles sont les options ?", "What are the options?"],
        ["M", "J'en vois deux. Option A : on garde le périmètre et on décale la mise en production d'une semaine.", "I see two. Option A: we keep the scope and push go-live back by a week."],
        ["M", "Option B : on garde la date, mais on reporte deux fonctionnalités à la phase suivante.", "Option B: we keep the date, but move two features to the next stage."],
        ["M", "Je recommande l'option A, parce que ces deux fonctionnalités sont critiques pour les utilisateurs.", "I recommend option A, because those two features are critical for users."],
        ["D", "D'accord pour l'option A. Envoyez-moi le rapport d'exception endéans les deux jours.", "Agreed on option A. Send me the exception report within two days."],
        ["M", "C'est noté. Vous l'aurez mercredi.", "Noted. You'll have it on Wednesday."]
      ],
      phrases: [
        ["signaler un dépassement de tolérance", "to report a tolerance breach"],
        ["décaler la mise en production", "to push back go-live"],
        ["reporter à la phase suivante", "to move to the next stage"],
        ["je recommande... parce que...", "I recommend... because..."],
        ["le rapport d'exception", "exception report"]
      ],
      tasks: [
        { id: "cr1", prompt: "Écrivez l'email au COPIL : le retard, la cause, les deux options, votre recommandation, la demande de décision.",
          hint: "Bonjour à tous, ... Bien cordialement. Use: a rencontré, est reporté, je recommande, je vous propose.",
          model: "Bonjour à tous,\n\nJe dois vous signaler un retard d'une semaine sur le projet de migration. Notre fournisseur a rencontré un problème technique lié à la sécurité. Ce retard dépasse la tolérance fixée pour cette phase. Nous avons deux options : décaler la mise en production d'une semaine, ou garder la date en reportant deux fonctionnalités. Je recommande la première option. Pourriez-vous valider cette décision d'ici mercredi ?\n\nBien cordialement,\nMalick" },
        { id: "cr2", prompt: "Le budget dépasse de 10 %. Présentez la situation au sponsor en 4 phrases (à l'oral).",
          hint: "Fact, cause, options, recommendation.",
          model: "Nous avons un dépassement de budget de dix pour cent. La cause principale, ce sont des licences plus chères que prévu. Nous pouvons négocier avec le fournisseur ou réduire le nombre d'utilisateurs la première année. Je recommande de négocier d'abord, et je vous fais un retour vendredi." }
      ],
      roleplay: "Tu es Dirk Vandenberghe, sponsor du projet, néerlandophone qui parle un français simple et direct. Tu présides le COPIL. Malick doit t'annoncer un retard. Pose des questions sur la cause, les options, les coûts et demande une recommandation claire."
    },
    {
      id: "point-hebdo", group: "travail", title: "Le point hebdomadaire",
      situation: "A quick round-table. Short sentences, done / next / blocked. Very useful everyday French.",
      lines: [
        ["M", "On fait un tour de table rapide. Thomas, tu commences ?", "Let's do a quick round-table. Thomas, do you want to start?"],
        ["T", "Cette semaine, on a terminé le module de connexion. Par contre, on est bloqués sur l'API de paiement.", "This week we finished the login module. However, we're blocked on the payment API."],
        ["M", "Qu'est-ce qui vous bloque exactement ?", "What exactly is blocking you?"],
        ["T", "On attend les accès de l'équipe sécurité depuis mardi.", "We've been waiting for access from the security team since Tuesday."],
        ["M", "Je m'en occupe. Je les relance aujourd'hui.", "I'll handle it. I'll chase them today."],
        ["F", "De mon côté, les exigences du prochain sprint sont prêtes.", "On my side, the requirements for the next sprint are ready."],
        ["M", "Super. On se revoit lundi. Bon week-end à tous !", "Great. See you Monday. Have a good weekend, everyone!"]
      ],
      phrases: [
        ["faire un tour de table", "to go round the table"],
        ["par contre", "however / on the other hand"],
        ["être bloqué sur", "to be blocked on"],
        ["je m'en occupe", "I'll take care of it"],
        ["relancer", "to chase / follow up"],
        ["de mon côté", "on my side"]
      ],
      tasks: [
        { id: "ph1", prompt: "Donnez votre propre point : ce que vous avez fait, ce que vous allez faire, ce qui vous bloque.",
          hint: "Passé composé (j'ai terminé), futur proche (je vais préparer), présent (j'attends).",
          model: "Cette semaine, j'ai mis à jour le planning et j'ai préparé le rapport pour le COPIL. La semaine prochaine, je vais organiser l'atelier avec le client. Par contre, j'attends encore la validation du budget." },
        { id: "ph2", prompt: "Écrivez un message Teams court pour relancer l'équipe sécurité.",
          hint: "Polite, direct, with a deadline.",
          model: "Bonjour, je me permets de vous relancer au sujet des accès à l'API de paiement pour l'équipe de Thomas. Ils sont bloqués depuis mardi. Serait-il possible de les donner aujourd'hui ? Merci d'avance !" }
      ],
      roleplay: "Tu joues Thomas Leclercq et Fatima El Amrani pendant le point hebdomadaire. Indique qui parle. Donnez vos avancements, un blocage, et posez une question à Malick."
    },
    {
      id: "demande-changement", group: "travail", title: "Négocier une demande de changement",
      situation: "A client asks for a 'small' extra. You protect the process without sounding bureaucratic.",
      lines: [
        ["C", "Malick, on aimerait ajouter un export Excel dans le tableau de bord. C'est rapide, non ?", "Malick, we'd like to add an Excel export to the dashboard. That's quick, right?"],
        ["M", "C'est une bonne idée. Mais tout changement passe par une demande de changement.", "It's a good idea. But every change goes through a change request."],
        ["C", "Même pour une petite chose ?", "Even for something small?"],
        ["M", "Oui, pour évaluer l'impact sur le coût, le délai et la qualité. Je vous envoie le formulaire.", "Yes, to assess the impact on cost, time and quality. I'll send you the form."],
        ["C", "Et ça prend combien de temps ?", "And how long does it take?"],
        ["M", "L'analyse d'impact prend deux jours. Ensuite, le comité décide.", "The impact analysis takes two days. Then the board decides."],
        ["C", "D'accord, je le remplis aujourd'hui.", "OK, I'll fill it in today."]
      ],
      phrases: [
        ["passer par", "to go through (a process)"],
        ["évaluer l'impact sur", "to assess the impact on"],
        ["le délai", "timeframe / deadline"],
        ["l'analyse d'impact", "impact analysis"],
        ["remplir un formulaire", "to fill in a form"]
      ],
      tasks: [
        { id: "dc1", prompt: "Un manager vous demande directement d'ajouter une fonctionnalité, sans passer par le processus. Refusez poliment.",
          hint: "Say yes to the idea, no to the shortcut, offer the fast path.",
          model: "Merci pour la proposition, c'est intéressant. Pour la traçabilité, je dois passer par une demande de changement. Si c'est urgent, je peux faire l'analyse d'impact dès demain. Vous auriez une réponse du comité cette semaine." },
        { id: "dc2", prompt: "L'analyse est terminée : +3 jours et +2 000 €. Expliquez le résultat à Caroline.",
          hint: "Numbers first, then what she needs to decide.",
          model: "Caroline, l'analyse d'impact est terminée. L'export Excel demande trois jours de travail et coûte environ deux mille euros. Le lancement serait décalé de trois jours. Le comité doit décider jeudi : voulez-vous maintenir la demande ?" }
      ],
      roleplay: "Tu es Caroline Dubois, cliente francophone, sympathique mais insistante. Tu veux ajouter des fonctionnalités sans passer par le processus de changement. Malick doit te convaincre de suivre le processus."
    },
    {
      id: "machine-cafe", group: "travail", title: "À la machine à café",
      situation: "Small talk is where colleagues decide if they like working with you. Includes Belgian French you'll hear every day.",
      lines: [
        ["F", "Salut Malick ! Tu as passé un bon week-end ?", "Hi Malick! Did you have a good weekend?"],
        ["M", "Oui, très bien, merci. Samedi, mon fils avait un match de foot.", "Yes, very good, thanks. On Saturday my son had a football match."],
        ["F", "Ah sympa ! Ils ont gagné ?", "Oh nice! Did they win?"],
        ["M", "Oui, trois à un ! Il était très content. Et toi ?", "Yes, three-one! He was really happy. And you?"],
        ["F", "Rien de spécial. Il a draché tout le week-end, donc je suis restée à la maison.", "Nothing special. It poured all weekend, so I stayed home."],
        ["M", "Ah, la drache… Je commence à m'habituer !", "Ah, the Belgian downpour... I'm starting to get used to it!"],
        ["F", "Tu viens dîner avec nous à midi ?", "Are you coming to lunch with us at noon?"],
        ["M", "Avec plaisir. On se retrouve à l'accueil ?", "With pleasure. Shall we meet at reception?"],
        ["F", "Parfait. À tantôt !", "Perfect. See you later!"]
      ],
      phrases: [
        ["il avait un match (imparfait)", "he had a match (background)"],
        ["il a draché", "it poured (Belgian: dracher)"],
        ["je commence à m'habituer", "I'm starting to get used to it"],
        ["dîner à midi", "to have lunch (in Belgium, dîner = lunch!)"],
        ["à tantôt", "see you later today (Belgian)"]
      ],
      tasks: [
        { id: "mc1", prompt: "Racontez votre week-end en 4 phrases. Mélangez passé composé et imparfait.",
          hint: "Il faisait beau / il pleuvait (imparfait) + on est allés / j'ai regardé (passé composé).",
          model: "Samedi, il faisait beau, donc on est allés au parc avec les enfants. Le soir, j'ai regardé un match de foot. Dimanche, il pleuvait, alors je suis resté à la maison. J'ai étudié un peu le néerlandais." },
        { id: "mc2", prompt: "Proposez à un collègue d'aller dîner ensemble demain (à la belge).",
          hint: "Tu veux...? On pourrait...? Remember: dîner = lunch here.",
          model: "Dis, tu es libre demain à midi ? On pourrait aller dîner ensemble à la brasserie en face. J'ai envie de te poser quelques questions sur le projet." }
      ],
      roleplay: "Tu es Fatima El Amrani, collègue bruxelloise sympathique. Petite conversation à la machine à café : week-end, famille, météo, football, projets pour le midi. Utilise naturellement quelques belgicismes (à tantôt, dîner, septante, GSM, drache)."
    }
  ],

  tenses: [
    {
      id: "present", name: "Le présent", drill: null,
      summary: "What is true now, what you do regularly, and what is happening right now.",
      uses: [
        ["Facts and current status", "Le projet avance bien.", "The project is going well."],
        ["Habits and routines", "On fait un point tous les lundis.", "We do a check-in every Monday."],
        ["Right now (French has no -ing form)", "Je prépare le rapport.", "I'm preparing the report."],
        ["With « depuis »: started in the past, still true", "Je travaille chez Toyota depuis 2024.", "I have been working at Toyota since 2024."],
        ["Near future, when the time is stated", "Je vous envoie le planning demain.", "I'll send you the schedule tomorrow."]
      ],
      how: "Regular -er verbs drop -er and add -e, -es, -e, -ons, -ez, -ent. The endings -e, -es, -ent all sound the same. The five most useful verbs are irregular: learn them by heart.",
      table: { head: ["", "parler", "être", "avoir", "aller", "faire"], rows: [
        ["je / j'", "parle", "suis", "ai", "vais", "fais"],
        ["tu", "parles", "es", "as", "vas", "fais"],
        ["il / elle / on", "parle", "est", "a", "va", "fait"],
        ["nous", "parlons", "sommes", "avons", "allons", "faisons"],
        ["vous", "parlez", "êtes", "avez", "allez", "faites"],
        ["ils / elles", "parlent", "sont", "ont", "vont", "font"]
      ]},
      trap: "English says « I have been working since 2024 ». French uses the present: « je travaille depuis 2024 », never « j'ai travaillé depuis ». And never drop the verb: « je besoin » → « j'ai besoin »."
    },
    {
      id: "passe-compose", name: "Le passé composé", drill: "etre-avoir",
      summary: "Completed actions and events: what happened, what you did.",
      uses: [
        ["A finished action at a specific moment", "Hier, j'ai envoyé le rapport au sponsor.", "Yesterday, I sent the report to the sponsor."],
        ["A sequence of events", "J'ai analysé l'impact, puis j'ai proposé deux options.", "I analysed the impact, then proposed two options."],
        ["An event that explains the current situation", "Le fournisseur a rencontré un problème de sécurité.", "The supplier ran into a security issue."],
        ["Your actions in a STAR answer", "J'ai rédigé des exigences claires et j'ai testé chaque version.", "I wrote clear requirements and tested each version."]
      ],
      how: "Avoir or être in the present + past participle. Participles: -er → -é (envoyé), -ir → -i (fini), and irregular ones to learn: fait, pris, mis, dit, vu, eu, été, pu, voulu, dû, venu. Most verbs take avoir. Être is used with movement and change-of-state verbs (aller, venir, arriver, partir, entrer, sortir, rester, tomber, devenir, retourner, naître, mourir) and with all reflexive verbs (je me suis trompé). With être, the participle agrees like an adjective: elle est partie, ils sont venus.",
      table: { head: ["", "envoyer (avoir)", "aller (être)"], rows: [
        ["je / j'", "ai envoyé", "suis allé(e)"],
        ["tu", "as envoyé", "es allé(e)"],
        ["il / elle", "a envoyé", "est allé / est allée"],
        ["nous", "avons envoyé", "sommes allé(e)s"],
        ["vous", "avez envoyé", "êtes allé(e)(s)"],
        ["ils / elles", "ont envoyé", "sont allés / sont allées"]
      ]},
      trap: "From your diagnostic: « j'ai entré » → « je suis entré » (movement verb). « à été retardé » → « a été retardé »: « a » is the verb avoir, « à » is a preposition."
    },
    {
      id: "imparfait", name: "L'imparfait", drill: "imparfait",
      summary: "The background: how things were, what was going on, what used to happen.",
      uses: [
        ["Context and description", "Le client était mécontent et le budget était serré.", "The client was unhappy and the budget was tight."],
        ["Past habits (« used to »)", "Chez OLX, je travaillais avec des équipes en Angola.", "At OLX, I used to work with teams in Angola."],
        ["An action in progress when something happened", "Je préparais le COPIL quand Dirk a appelé.", "I was preparing the steering committee when Dirk called."],
        ["Feelings, weather, age, time", "Il faisait beau et tout le monde était content.", "The weather was nice and everyone was happy."],
        ["Polite softening", "Je voulais vous demander votre avis.", "I wanted to ask your opinion."]
      ],
      how: "Take the « nous » form of the present, remove -ons, and add -ais, -ais, -ait, -ions, -iez, -aient. So nous faisons → je faisais, nous prenons → je prenais. Only one exception: être → j'étais.",
      table: { head: ["", "travailler", "faire", "être"], rows: [
        ["je / j'", "travaillais", "faisais", "étais"],
        ["tu", "travaillais", "faisais", "étais"],
        ["il / elle", "travaillait", "faisait", "était"],
        ["nous", "travaillions", "faisions", "étions"],
        ["vous", "travailliez", "faisiez", "étiez"],
        ["ils / elles", "travaillaient", "faisaient", "étaient"]
      ]},
      contrast: "Passé composé or imparfait? Think of a film: the imparfait is the scenery, the passé composé is the action. « Nous préparions le lancement (scenery) quand le régulateur a changé les règles (action). » Quick test: if English would say « was ...ing » or « used to », use the imparfait. If it happened once and finished, use the passé composé.",
      trap: "From your diagnostic: « quand j'étais jeune, je jouais au football », not « je suis… j'ai joué ». Also, -ais, -ait and -aient all sound the same, so when speaking only the subject tells them apart."
    },
    {
      id: "futur-proche", name: "Le futur proche", drill: null,
      summary: "Plans and things about to happen. The easiest future and the most common when speaking.",
      uses: [
        ["Something you plan to do soon", "Je vais relancer l'équipe sécurité cet après-midi.", "I'm going to chase the security team this afternoon."],
        ["Something clearly about to happen", "On va dépasser le budget si on ne réagit pas.", "We're going to go over budget if we don't act."],
        ["Next steps in a stand-up", "La semaine prochaine, je vais organiser l'atelier.", "Next week, I'm going to organise the workshop."]
      ],
      how: "Aller in the present + infinitive. In the negative, « ne… pas » goes around aller: « je ne vais pas changer la date ».",
      table: { head: ["", "aller", "+ infinitif"], rows: [
        ["je", "vais", "préparer"],
        ["tu", "vas", "préparer"],
        ["il / elle", "va", "préparer"],
        ["nous", "allons", "préparer"],
        ["vous", "allez", "préparer"],
        ["ils / elles", "vont", "préparer"]
      ]},
      trap: "No « à » or « de » after aller: « je vais à préparer » is wrong. Portuguese works the same way (vou preparar), so this one should be easy for you."
    },
    {
      id: "futur-simple", name: "Le futur simple", drill: null,
      summary: "Commitments, formal promises and written plans. More formal than the futur proche.",
      uses: [
        ["Formal commitments in emails and meetings", "Vous aurez le rapport mercredi.", "You will have the report on Wednesday."],
        ["Planning documents", "La mise en production aura lieu le 12 octobre.", "Go-live will take place on 12 October."],
        ["After « quand » about the future", "Quand le fournisseur sera prêt, nous reprendrons les tests.", "When the supplier is ready, we will resume testing."],
        ["« Si » + present, then future", "Si le COPIL valide, nous commencerons lundi.", "If the steering committee approves, we'll start on Monday."]
      ],
      how: "Infinitive + -ai, -as, -a, -ons, -ez, -ont. Verbs ending in -re drop the final e: prendre → je prendrai. Irregular stems to learn: être → ser-, avoir → aur-, aller → ir-, faire → fer-, pouvoir → pourr-, vouloir → voudr-, devoir → devr-, venir → viendr-, voir → verr-, envoyer → enverr-, savoir → saur-.",
      table: { head: ["", "envoyer", "être", "avoir"], rows: [
        ["je / j'", "enverrai", "serai", "aurai"],
        ["tu", "enverras", "seras", "auras"],
        ["il / elle", "enverra", "sera", "aura"],
        ["nous", "enverrons", "serons", "aurons"],
        ["vous", "enverrez", "serez", "aurez"],
        ["ils / elles", "enverront", "seront", "auront"]
      ]},
      trap: "After « quand » about the future, French uses the future: « quand je serai chef de projet », not « quand je suis ». Portuguese uses the future subjunctive here (quando eu for), so it will feel strange at first."
    },
    {
      id: "conditionnel", name: "Le conditionnel", drill: null,
      summary: "Politeness, options and hypotheses. The PM's most useful tense in meetings and emails.",
      uses: [
        ["Polite requests", "Pourriez-vous valider le planning d'ici mercredi ?", "Could you approve the schedule by Wednesday?"],
        ["Softened wishes", "Je voudrais faire le point sur le budget.", "I'd like to review the budget."],
        ["Suggesting options", "On pourrait reporter deux fonctionnalités.", "We could postpone two features."],
        ["Advice", "Vous devriez prévenir le sponsor aujourd'hui.", "You should inform the sponsor today."],
        ["Hypotheses: « si » + imparfait, then conditionnel", "Si nous avions plus de ressources, nous finirions en huit semaines.", "If we had more resources, we would finish in eight weeks."]
      ],
      how: "Futur simple stem + imparfait endings (-ais, -ais, -ait, -ions, -iez, -aient). pouvoir → pourr- → je pourrais. If you know the futur simple stem, you already know the conditionnel.",
      table: { head: ["", "pouvoir", "vouloir", "devoir"], rows: [
        ["je", "pourrais", "voudrais", "devrais"],
        ["tu", "pourrais", "voudrais", "devrais"],
        ["il / elle", "pourrait", "voudrait", "devrait"],
        ["nous", "pourrions", "voudrions", "devrions"],
        ["vous", "pourriez", "voudriez", "devriez"],
        ["ils / elles", "pourraient", "voudraient", "devraient"]
      ]},
      trap: "Never use the conditionnel right after « si »: « si j'aurais le temps » → « si j'avais le temps ». And the stem keeps the infinitive: apprendre → j'apprendrais (you wrote « apprenderais » in the diagnostic)."
    }
  ],

  // Quick chooser shown on the tenses page: [situation, tense, example]
  tenseChooser: [
    ["Current status, routine, « depuis »", "présent", "On attend les accès depuis mardi."],
    ["Something that happened and finished", "passé composé", "J'ai envoyé le rapport."],
    ["Background, habits, « was ...ing »", "imparfait", "Nous préparions le lancement."],
    ["Your plan, spoken", "futur proche", "Je vais relancer le fournisseur."],
    ["A commitment, written or formal", "futur simple", "Vous l'aurez mercredi."],
    ["A polite request or an option", "conditionnel", "Pourriez-vous valider ?"]
  ],

  drills: [
    { id: "etre-avoir", title: "Être ou avoir ?", why: "Your most frequent error: movement verbs take être.", items: [
      { q: "Hier, je ___ arrivé en retard.", options: ["suis", "ai"], a: "suis", ex: "arriver is a movement verb → être." },
      { q: "Nous ___ terminé le module.", options: ["avons", "sommes"], a: "avons", ex: "terminer → avoir." },
      { q: "Elle ___ partie à 17 heures.", options: ["est", "a"], a: "est", ex: "partir → être, and the participle agrees: partie." },
      { q: "Le fournisseur ___ rencontré un problème.", options: ["a", "est"], a: "a", ex: "rencontrer → avoir." },
      { q: "Je ___ entré dans l'e-commerce très tôt.", options: ["suis", "ai"], a: "suis", ex: "entrer → être (you wrote « j'ai entré » in the diagnostic)." },
      { q: "Le projet ___ été retardé.", options: ["a", "est"], a: "a", ex: "Passive past: a été + participle." },
      { q: "Ils ___ venus à la réunion.", options: ["sont", "ont"], a: "sont", ex: "venir → être, plural agreement: venus." },
      { q: "J'___ travaillé chez Moza Banco.", options: ["ai", "suis"], a: "ai", ex: "travailler → avoir." },
      { q: "Tu ___ resté combien de temps ?", options: ["es", "as"], a: "es", ex: "rester → être." },
      { q: "Nous ___ allés au client.", options: ["sommes", "avons"], a: "sommes", ex: "aller → être." }
    ]},
    { id: "imparfait", title: "L'imparfait", why: "You know it exists but can't conjugate it yet. Rule: nous-stem minus -ons + ais/ais/ait/ions/iez/aient.", items: [
      { q: "Quand j'___ jeune, je jouais au football. (être)", a: "étais", ex: "être is the only irregular stem: ét-." },
      { q: "Avant, nous ___ au Portugal. (habiter)", a: "habitions", ex: "nous habitons → habit- + ions." },
      { q: "Chez OLX, je ___ avec des équipes en Angola. (travailler)", a: "travaillais", ex: "nous travaillons → travaill- + ais." },
      { q: "Le projet ___ bien, mais le fournisseur a eu un problème. (avancer)", a: "avançait", ex: "nous avançons → avanç- + ait (keep the ç before a)." },
      { q: "Il y ___ beaucoup de réunions. (avoir)", a: "avait", ex: "nous avons → av- + ait." },
      { q: "Tu ___ quoi, avant ? (faire)", a: "faisais", ex: "nous faisons → fais- + ais." },
      { q: "Les clients ___ des résultats rapides. (vouloir)", a: "voulaient", ex: "nous voulons → voul- + aient." },
      { q: "Je lisais mes emails quand le directeur ___ .", options: ["est entré", "entrait"], a: "est entré", ex: "Background action (imparfait) interrupted by a single event (passé composé)." },
      { q: "Samedi, il ___ beau, donc on est allés au parc.", options: ["faisait", "a fait"], a: "faisait", ex: "Weather as background → imparfait." }
    ]},
    { id: "prepositions", title: "À, en, au, chez", why: "Cities, countries and companies each take a different word.", items: [
      { q: "Je travaille ___ Toyota.", options: ["chez", "à", "en"], a: "chez", ex: "Companies → chez." },
      { q: "J'habite ___ Sint-Truiden.", options: ["à", "en", "au"], a: "à", ex: "Cities → à." },
      { q: "Je vis ___ Belgique.", options: ["en", "au", "à"], a: "en", ex: "Feminine countries → en." },
      { q: "Je suis né ___ Mozambique.", options: ["au", "en", "à"], a: "au", ex: "Masculine countries → au." },
      { q: "J'ai étudié ___ Lisbonne.", options: ["à", "en", "au"], a: "à", ex: "Cities → à." },
      { q: "Mes parents habitent ___ Portugal.", options: ["au", "en", "à"], a: "au", ex: "le Portugal is masculine → au." },
      { q: "Demain, je vais ___ le client.", options: ["chez", "à", "en"], a: "chez", ex: "Going to a person or company → chez." },
      { q: "J'ai vécu ___ Angola ? (careful)", options: ["en", "au", "à"], a: "en", ex: "Countries starting with a vowel → en (en Angola, en Irlande)." }
    ]},
    { id: "portugais", title: "Pièges du portugais", why: "Spelling and false friends that come from Portuguese.", items: [
      { q: "Choose the correct spelling:", options: ["professionnel", "profissionel", "professionel"], a: "professionnel", ex: "Double s, double n in French." },
      { q: "Choose the correct spelling:", options: ["malheureusement", "maillereusement", "malheuresement"], a: "malheureusement", ex: "mal + heureux + -ement." },
      { q: "Choose the correct spelling:", options: ["opportunités", "oportunitées", "opportunitées"], a: "opportunités", ex: "Double p; -té nouns take no extra e in the plural." },
      { q: "Choose the correct spelling:", options: ["sécurité", "securité", "segurité"], a: "sécurité", ex: "Accent on the first é." },
      { q: "PT « educacional » → FR:", options: ["éducatif", "éducationnel", "educacionel"], a: "éducatif", ex: "Most -cional words become -tionnel, but here French uses éducatif." },
      { q: "« I intend to apply »", options: ["J'ai l'intention de postuler.", "Je prétends postuler."], a: "J'ai l'intention de postuler.", ex: "prétendre means 'to claim' in French, not 'to intend' (PT pretender)." },
      { q: "« I understand the problem »", options: ["Je comprends le problème.", "J'entends le problème."], a: "Je comprends le problème.", ex: "entendre = to hear (PT entender = understand)." },
      { q: "« I attended the meeting »", options: ["J'ai assisté à la réunion.", "J'ai attendu la réunion."], a: "J'ai assisté à la réunion.", ex: "attendre = to wait. assister à = to attend." },
      { q: "« Currently, I work at Toyota »", options: ["Actuellement, je travaille chez Toyota.", "Actualement, je travaille chez Toyota."], a: "Actuellement, je travaille chez Toyota.", ex: "actuel + -lement." }
    ]},
    { id: "subjonctif", title: "Le subjonctif", why: "Learn the triggers first, then être / avoir / faire.", items: [
      { q: "Il faut que tu ___ tes devoirs. (faire)", a: "fasses", ex: "il faut que → subjonctif. faire → fass-." },
      { q: "Bien qu'il ___ compétent, il n'a pas eu le poste. (être)", a: "soit", ex: "bien que always takes the subjonctif." },
      { q: "Je veux que vous ___ les accès demain. (avoir)", a: "ayez", ex: "vouloir que → subjonctif. avoir → ayez." },
      { q: "Il faut que nous ___ prêts vendredi. (être)", a: "soyons", ex: "être → soyons." },
      { q: "Je vous envoie le planning pour que vous ___ le valider. (pouvoir)", a: "puissiez", ex: "pour que → subjonctif. pouvoir → puiss-." },
      { q: "Je pense qu'il ___ raison.", options: ["a", "ait"], a: "a", ex: "penser que (affirmative) → indicatif. Only « je ne pense pas que » takes the subjonctif." },
      { q: "Il est important que le client ___ informé. (être)", a: "soit", ex: "il est important que → subjonctif." }
    ]},
    { id: "relatifs", title: "Qui, que, dont, où", why: "« dont » replaces « de + something ».", items: [
      { q: "C'est le projet ___ je t'ai parlé.", options: ["dont", "que", "où"], a: "dont", ex: "parler DE quelque chose → dont." },
      { q: "La personne ___ gère le budget est absente.", options: ["qui", "que", "dont"], a: "qui", ex: "Subject of the verb → qui." },
      { q: "Le rapport ___ tu m'as envoyé est clair.", options: ["que", "qui", "dont"], a: "que", ex: "Direct object → que." },
      { q: "La salle ___ nous faisons le COPIL est au troisième étage.", options: ["où", "dont", "que"], a: "où", ex: "Place → où." },
      { q: "C'est l'outil ___ nous avons besoin.", options: ["dont", "que", "qui"], a: "dont", ex: "avoir besoin DE → dont." },
      { q: "L'entreprise ___ je travaille est à Diest.", options: ["où", "dont", "que"], a: "où", ex: "Place → où." }
    ]}
  ],

  vocab: [
    // Gestion de projet
    { id: "v1", cat: "Gestion de projet", fr: "le chef de projet", en: "project manager" },
    { id: "v2", cat: "Gestion de projet", fr: "le comité de pilotage (COPIL)", en: "steering committee / Project Board" },
    { id: "v3", cat: "Gestion de projet", fr: "le périmètre", en: "scope" },
    { id: "v4", cat: "Gestion de projet", fr: "le livrable", en: "deliverable" },
    { id: "v5", cat: "Gestion de projet", fr: "l'échéance", en: "deadline" },
    { id: "v6", cat: "Gestion de projet", fr: "le jalon", en: "milestone" },
    { id: "v7", cat: "Gestion de projet", fr: "la demande de changement", en: "change request" },
    { id: "v8", cat: "Gestion de projet", fr: "l'analyse d'impact", en: "impact analysis" },
    { id: "v9", cat: "Gestion de projet", fr: "la partie prenante", en: "stakeholder" },
    { id: "v10", cat: "Gestion de projet", fr: "le retour d'expérience", en: "lessons learned" },
    { id: "v11", cat: "Gestion de projet", fr: "la mise en production", en: "go-live" },
    { id: "v12", cat: "Gestion de projet", fr: "la recette", en: "acceptance testing" },
    { id: "v13", cat: "Gestion de projet", fr: "le cahier des charges", en: "requirements specification" },
    { id: "v14", cat: "Gestion de projet", fr: "le dépassement de tolérance", en: "tolerance breach" },
    { id: "v15", cat: "Gestion de projet", fr: "le rapport d'exception", en: "exception report" },
    { id: "v16", cat: "Gestion de projet", fr: "le rapport d'avancement", en: "highlight / progress report" },
    { id: "v17", cat: "Gestion de projet", fr: "décaler / reporter", en: "to postpone / push back" },
    { id: "v18", cat: "Gestion de projet", fr: "relancer quelqu'un", en: "to chase / follow up with someone" },
    { id: "v19", cat: "Gestion de projet", fr: "faire le point", en: "to take stock / catch up" },
    { id: "v20", cat: "Gestion de projet", fr: "le tour de table", en: "round-table" },
    { id: "v21", cat: "Gestion de projet", fr: "l'ordre du jour", en: "agenda" },
    { id: "v22", cat: "Gestion de projet", fr: "le compte rendu", en: "meeting minutes" },
    { id: "v23", cat: "Gestion de projet", fr: "le risque / atténuer un risque", en: "risk / to mitigate a risk" },
    { id: "v24", cat: "Gestion de projet", fr: "valider", en: "to approve / sign off" },
    // Entretien
    { id: "v30", cat: "Entretien", fr: "postuler à un poste", en: "to apply for a job" },
    { id: "v31", cat: "Entretien", fr: "la candidature", en: "application" },
    { id: "v32", cat: "Entretien", fr: "le préavis", en: "notice period" },
    { id: "v33", cat: "Entretien", fr: "le statut d'indépendant", en: "self-employed status" },
    { id: "v34", cat: "Entretien", fr: "le tarif journalier", en: "day rate" },
    { id: "v35", cat: "Entretien", fr: "la mission", en: "assignment (freelance)" },
    { id: "v36", cat: "Entretien", fr: "les prétentions salariales", en: "salary expectations" },
    { id: "v37", cat: "Entretien", fr: "le CDI (contrat à durée indéterminée)", en: "permanent contract" },
    { id: "v38", cat: "Entretien", fr: "la voiture de société", en: "company car" },
    { id: "v39", cat: "Entretien", fr: "les chèques-repas", en: "meal vouchers" },
    { id: "v40", cat: "Entretien", fr: "l'assurance groupe", en: "group insurance (pension)" },
    { id: "v41", cat: "Entretien", fr: "les points forts / les points faibles", en: "strengths / weaknesses" },
    { id: "v42", cat: "Entretien", fr: "le parcours", en: "career path / background" },
    { id: "v43", cat: "Entretien", fr: "revenir vers vous", en: "to get back to you" },
    // Belgicismes
    { id: "v50", cat: "Belgicismes", fr: "septante / nonante", en: "seventy / ninety (France: soixante-dix / quatre-vingt-dix)" },
    { id: "v51", cat: "Belgicismes", fr: "le GSM", en: "mobile phone" },
    { id: "v52", cat: "Belgicismes", fr: "à tantôt", en: "see you later (today)" },
    { id: "v53", cat: "Belgicismes", fr: "endéans", en: "within (a time limit): endéans la semaine" },
    { id: "v54", cat: "Belgicismes", fr: "le dîner / le souper", en: "lunch / dinner (in Belgium!)" },
    { id: "v55", cat: "Belgicismes", fr: "la farde", en: "folder / binder" },
    { id: "v56", cat: "Belgicismes", fr: "la drache / il drache", en: "downpour / it's pouring" },
    { id: "v57", cat: "Belgicismes", fr: "je ne sais pas venir", en: "I can't come (savoir = pouvoir)" },
    { id: "v58", cat: "Belgicismes", fr: "s'il vous plaît (en donnant quelque chose)", en: "here you are" },
    { id: "v59", cat: "Belgicismes", fr: "la mutuelle", en: "health insurance fund" },
    { id: "v60", cat: "Belgicismes", fr: "le pécule de vacances", en: "holiday pay" },
    // Email
    { id: "v70", cat: "Email", fr: "Suite à notre réunion,", en: "Following our meeting," },
    { id: "v71", cat: "Email", fr: "Je me permets de vous relancer", en: "I'm following up (polite)" },
    { id: "v72", cat: "Email", fr: "Vous trouverez ci-joint", en: "Please find attached" },
    { id: "v73", cat: "Email", fr: "N'hésitez pas à revenir vers moi", en: "Don't hesitate to get back to me" },
    { id: "v74", cat: "Email", fr: "Dans l'attente de votre retour", en: "Looking forward to hearing from you" },
    { id: "v75", cat: "Email", fr: "Merci de votre compréhension", en: "Thank you for your understanding" },
    { id: "v76", cat: "Email", fr: "Bien cordialement", en: "Kind regards" },
    { id: "v77", cat: "Email", fr: "Pourriez-vous valider... d'ici mercredi ?", en: "Could you approve... by Wednesday?" }
  ],

  // Seeded from the September 2026 diagnostic.
  seedErrors: [
    ["je besoin de méliorer", "j'ai besoin d'améliorer", "avoir besoin de is a fixed expression"],
    ["je suis a project manager", "je suis chef de projet", "no article before a profession"],
    ["je travaile a Toyota en Diest", "je travaille chez Toyota à Diest", "chez + company, à + city"],
    ["beaucoup des oportunités", "beaucoup d'opportunités", "beaucoup de + noun, no article; double p"],
    ["j'ai entré dans d'ecommerce", "je suis entré dans l'e-commerce", "entrer takes être"],
    ["profissionelle / educacionelles", "professionnelle / éducatives", "Portuguese spelling interference"],
    ["suis, joué (quand j'étais jeune)", "étais, jouais", "imparfait for background and habits"],
    ["il faut que tu fait", "il faut que tu fasses", "il faut que → subjonctif"],
    ["c'est le projet que je t'ai parlé", "c'est le projet dont je t'ai parlé", "parler de → dont"],
    ["à ettés retardé", "a été retardé", "a été + participle"],
    ["se trouvé avec d'une problème", "a rencontré un problème", "problème is masculine; rencontrer un problème"],
    ["Que me dites vous de prenez une reunion", "Que diriez-vous d'organiser une réunion", "que diriez-vous de + infinitive"]
  ]
};
