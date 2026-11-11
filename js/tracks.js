/**
 * F1 Paddock & Spoiler Shield — схемы трасс и названия поворотов.
 *
 * Изображения: официальные карты сезона-2026 с formula1.com (номера поворотов
 * соответствуют официальной схеме). Названия поворотов собраны из открытых
 * источников: Formula 1 (Hungaroring-2026), Wikipedia, RacingCircuits.info,
 * JetPunk «Formula 1 – Corner Names» (данные проверены по ходу сезона).
 *
 * Для трасс без устоявшихся названий оставлен пустой список: в интерфейсе
 * показывается подсказка ориентироваться по номерам.
 */
(function () {
  'use strict';

  window.F1_TRACKS = {
    australia: {
      image: 'assets/tracks/australia.webp',
      corners: [],
      note: 'У поворотов Альберт-Парка нет единых официальных названий — ориентируйтесь по номерам.'
    },
    china: {
      image: 'assets/tracks/china.webp',
      corners: [],
      note: 'Исторические названия поворотов Шанхая не закреплены официально — используйте номера.'
    },
    japan: {
      image: 'assets/tracks/japan.webp',
      corners: [
        { turns: '1–2', name: 'First' },
        { turns: '3–7', name: 'Esses' },
        { turns: '6', name: 'Gyaku Bank' },
        { turns: '7', name: 'Dunlop' },
        { turns: '8–9', name: 'Degner' },
        { turns: '11', name: 'Hairpin' },
        { turns: '12', name: '200R' },
        { turns: '13–14', name: 'Spoon' },
        { turns: '15', name: '130R' },
        { turns: '16–17', name: 'Casio Triangle' },
        { turns: '18', name: 'Last' }
      ]
    },
    miami: {
      image: 'assets/tracks/miami.webp',
      corners: [],
      note: 'У Майами нет исторических названий поворотов — используйте номера на схеме.'
    },
    canada: {
      image: 'assets/tracks/canada.webp',
      corners: [
        { turns: '3', name: 'Virage Senna' },
        { turns: '7', name: 'Point de la Concorde' },
        { turns: '11', name: "L'Épingle / Pits Hairpin" },
        { turns: '14–15', name: 'Wall of Champions' }
      ]
    },
    monaco: {
      image: 'assets/tracks/monaco.webp',
      corners: [
        { turns: '1', name: 'Sainte Dévote' },
        { turns: '2', name: 'Beau Rivage' },
        { turns: '3', name: 'Massenet' },
        { turns: '4', name: 'Casino' },
        { turns: '5', name: 'Mirabeau Haute' },
        { turns: '6', name: 'Grand Hotel / Loews' },
        { turns: '7', name: 'Mirabeau Bas' },
        { turns: '8', name: 'Portier' },
        { turns: '9', name: 'Tunnel' },
        { turns: '10–11', name: 'Nouvelle Chicane' },
        { turns: '12', name: 'Tabac' },
        { turns: '13', name: 'Louis Chiron' },
        { turns: '14', name: 'Piscine' },
        { turns: '16', name: 'La Rascasse' },
        { turns: '17', name: 'Anthony Noghes' }
      ]
    },
    'barcelona-catalunya': {
      image: 'assets/tracks/barcelona-catalunya.webp',
      corners: [
        { turns: '1', name: 'Elf' },
        { turns: '3', name: 'Renault' },
        { turns: '4', name: 'Repsol' },
        { turns: '5', name: 'Seat' },
        { turns: '7', name: 'Würth' },
        { turns: '9', name: 'Campsa' },
        { turns: '10', name: 'La Caixa' },
        { turns: '11', name: 'Banc Sabadell' },
        { turns: '12', name: 'Europcar' },
        { turns: '13', name: 'New Holland' }
      ],
      note: 'Названия поворотов исторически связаны со спонсорами и могут меняться.'
    },
    austria: {
      image: 'assets/tracks/austria.webp',
      corners: [
        { turns: '1', name: 'Niki Lauda' },
        { turns: '2', name: 'Münzer' },
        { turns: '4', name: 'Rauch' },
        { turns: '7', name: 'Graz' },
        { turns: '9', name: 'Jochen Rindt' }
      ]
    },
    'great-britain': {
      image: 'assets/tracks/great-britain.webp',
      corners: [
        { turns: '1', name: 'Abbey' },
        { turns: '2', name: 'Farm' },
        { turns: '3', name: 'Village' },
        { turns: '4', name: 'The Loop' },
        { turns: '5', name: 'Aintree' },
        { turns: '6', name: 'Brooklands' },
        { turns: '7', name: 'Luffield' },
        { turns: '8', name: 'Woodcote' },
        { turns: '9', name: 'Copse' },
        { turns: '10–12', name: 'Maggotts' },
        { turns: '13', name: 'Becketts' },
        { turns: '14', name: 'Chapel' },
        { turns: '15', name: 'Stowe' },
        { turns: '18', name: 'Club' }
      ]
    },
    belgium: {
      image: 'assets/tracks/belgium.webp',
      corners: [
        { turns: '1', name: 'La Source' },
        { turns: '3', name: 'Eau Rouge' },
        { turns: '4', name: 'Raidillon' },
        { turns: '5–6', name: 'Les Combes' },
        { turns: '7', name: 'Malmedy' },
        { turns: '8', name: 'Rivage / Bruxelles' },
        { turns: '9', name: 'Speakers' },
        { turns: '10–11', name: 'Pouhon' },
        { turns: '12–13', name: 'Fagnes' },
        { turns: '14', name: 'Campus / Stavelot' },
        { turns: '17', name: 'Blanchimont' },
        { turns: '18–19', name: 'Bus Stop' }
      ]
    },
    hungary: {
      image: 'assets/tracks/hungary.webp',
      corners: [
        { turns: '1', name: 'Piquet' },
        { turns: '2', name: 'Hamilton' },
        { turns: '3', name: 'Spring' },
        { turns: '4', name: 'Mansell' },
        { turns: '5', name: 'Mogyoród' },
        { turns: '6–7', name: 'Driving Center' },
        { turns: '8–9', name: 'Buda / Pest' },
        { turns: '10', name: 'Danube' },
        { turns: '11', name: 'Alesi' },
        { turns: '12', name: 'Schumacher' },
        { turns: '13', name: 'Senna' },
        { turns: '14', name: 'Szisz' }
      ],
      note: 'Официальные названия всех 14 поворотов утверждены к 40-летию Хунгароринга в 2026 году.'
    },
    netherlands: {
      image: 'assets/tracks/netherlands.webp',
      corners: [
        { turns: '1', name: 'Tarzanbocht' },
        { turns: '2', name: 'Gerlachbocht' },
        { turns: '3', name: 'Hugeholzbocht' },
        { turns: '6', name: 'Rob Slotemakerbocht' },
        { turns: '7', name: 'Scheivlak' },
        { turns: '8', name: 'Mastersbocht' },
        { turns: '11–12', name: 'Hans Ernst Bocht' },
        { turns: '13', name: 'Kumho' },
        { turns: '14', name: 'Arie Luyendijk Bocht' }
      ]
    },
    italy: {
      image: 'assets/tracks/italy.webp',
      corners: [
        { turns: '1–2', name: 'Prima Variante / Rettifilio' },
        { turns: '3', name: 'Curva Grande / Biassono' },
        { turns: '4–5', name: 'Seconda Variante / Roggia' },
        { turns: '6–7', name: 'Lesmo' },
        { turns: '8–10', name: 'Variante Ascari' },
        { turns: '11', name: 'Parabolica / Alboreto' }
      ]
    },
    spain: {
      image: 'assets/tracks/spain.webp',
      corners: [],
      note: 'Мадринг — новая трасса 2026 года; устоявшихся названий поворотов пока нет. Используйте номера.'
    },
    azerbaijan: {
      image: 'assets/tracks/azerbaijan.webp',
      corners: [
        { turns: '8–11', name: 'Castle' }
      ],
      note: 'Основное историческое название — замковый комплекс Castle; остальные повороты известны по номерам.'
    },
    bahrain: {
      image: 'assets/tracks/bahrain.webp',
      corners: [],
      note: 'Гран-при Бахрейна-2026 проходит в Сепанге; единых названий поворотов нет — ориентируйтесь по номерам.'
    },
    singapore: {
      image: 'assets/tracks/singapore.webp',
      corners: [
        { turns: '1', name: 'Sheares' },
        { turns: '7', name: 'Memorial' },
        { turns: '8', name: 'Stamford' },
        { turns: '9', name: 'Padang' },
        { turns: '10', name: 'Singapore Sling' },
        { turns: '14', name: 'Connaught' }
      ]
    },
    'united-states': {
      image: 'assets/tracks/united-states.webp',
      corners: [
        { turns: '1', name: 'Big Red' },
        { turns: '2–10', name: 'Esses' },
        { turns: '11', name: 'Hairpin' },
        { turns: '12–15', name: 'Esses' }
      ]
    },
    mexico: {
      image: 'assets/tracks/mexico.webp',
      corners: [
        { turns: '1–3', name: 'Esses Moisés Solana' },
        { turns: '4–5', name: 'Ese del Lago' },
        { turns: '6', name: 'Horquilla' },
        { turns: '7–11', name: 'Esses' },
        { turns: '13–15', name: 'Foro Sol' },
        { turns: '16', name: 'Peraltada' }
      ]
    },
    brazil: {
      image: 'assets/tracks/brazil.webp',
      corners: [
        { turns: '1–2', name: 'S do Senna' },
        { turns: '3', name: 'Curva do Sol' },
        { turns: '4–5', name: 'Descida do Lago' },
        { turns: '6', name: 'Ferradura' },
        { turns: '7', name: 'Laranjinha' },
        { turns: '8', name: 'Esse' },
        { turns: '9', name: 'Pinheirinho' },
        { turns: '10', name: 'Bico de Pato' },
        { turns: '11', name: 'Mergulho' },
        { turns: '12', name: 'Junção' }
      ]
    },
    'las-vegas': {
      image: 'assets/tracks/las-vegas.webp',
      corners: [],
      note: 'Лас-Вегас использует городские улицы; устойчивых исторических названий поворотов нет — используйте номера.'
    },
    qatar: {
      image: 'assets/tracks/qatar.webp',
      corners: [],
      note: 'У Лусаила нет устоявшихся названий поворотов — ориентируйтесь по номерам на схеме.'
    },
    'united-arab-emirates': {
      image: 'assets/tracks/united-arab-emirates.webp',
      corners: [],
      note: 'У Яс-Марины нет единых исторических названий поворотов — используйте номера.'
    }
  };
})();
