# Virtual Meeting Secretary

## Omschrijving
Ondernemers hebben vaak veel verschillende meetings. Verschillende projecten lopen door elkaar en er moet met vele verschillende mensen afgestemd, overlegd, overeengekomen, gebrainstormd... worden. Dit alles vereist een piekfijne organisatie. Het is lastig als je verschillende meetings, verschillende projecten en verschillende mensen met elkaar begint te verwarren. Een snelle 'heads-up' net voor de meeting kan daarom heel handig zijn!

Je bouwt een systeem dat ondernemers kunnen gebruiken net vóór een meeting. Het systeem is gekoppeld met hun kalender en toont zoveel mogelijk relevante info over de volgende meeting. Wie is die persoon? Waar werkt hij? Hoe oud is hij? Hoe ziet hij eruit? Over welk project wil hij praten? Heb ik hiervoor al meetings met hem gehad? Wanneer waren die vorige meetings? Wat is er gezegd in die vorige meetings? Deze info kan een heel nuttige opfrisser zijn om lastige situaties tijdens te meeting te voorkomen!

##Doelstellingen
In de backend zal het systeem verbinden met Microsoft Exchange om toegang te krijgen tot de kalender van de gebruikers. Voor elke meeting zal het dan zoveel mogelijk info vergaren. Over personen die aanwezig zullen zijn in de meeting, wordt zoveel mogelijk info automatisch online opgezocht. Verder wordt er in de kalender gezocht naar soortgelijke meetings in het verleden: is dit een follow-up meeting? Dan kunnen de notities die bij die vorige meeting horen ook getoond worden. Die notities kunnen bijgehouden worden door een "SlackBot". Slack is een communicatietool die in bedrijven veel gebruikt wordt. Dit platform staat open voor 'bots'. Het idee is dat gebruikers hun notities in Slack plaatsen en bijvoorbeeld '@secretary' vermelden. Dan worden automatisch de notities geüpload naar en opgeslagen in het systeem.

Bovenop dit systeem zal een mooie, overzichtelijke frontend gebouwd worden die al deze info op een duidelijke en overzichtelijke manier weergeeft. Verder kan er ook eventueel informatie opgehaald worden via Slack: "@secretary: geef info over mijn volgende meeting", waarop het systeem alle info die hij heeft teruggeeft in Slack.
