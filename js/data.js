/**
 * F1 Paddock & Spoiler Shield — статические данные приложения.
 * Снимок сезона 2026: 23 этапа, расписание сессий в UTC,
 * официальные подиумы завершённых гонок по данным Formula 1.
 *
 * Это JS-файл, а не внешний JSON, чтобы приложение работало по file://
 * без CORS и без сервера. Структура полностью JSON-совместима.
 */
(function () {
  'use strict';

  var TEAMS = [
    {
      id: 'ferrari',
      name: 'Ferrari',
      fullName: 'Scuderia Ferrari',
      accent: '#E10600',
      accent2: '#FF4D4D',
      ink: '#FFFFFF',
      rgb: '225, 6, 0'
    },
    {
      id: 'mclaren',
      name: 'McLaren',
      fullName: 'McLaren Formula 1 Team',
      accent: '#FF8000',
      accent2: '#FFC46B',
      ink: '#1A1206',
      rgb: '255, 128, 0'
    },
    {
      id: 'redbull',
      name: 'Red Bull',
      fullName: 'Oracle Red Bull Racing',
      accent: '#3671C6',
      accent2: '#FF3B30',
      ink: '#FFFFFF',
      rgb: '54, 113, 198'
    },
    {
      id: 'mercedes',
      name: 'Mercedes',
      fullName: 'Mercedes-AMG Petronas',
      accent: '#00D2BE',
      accent2: '#8AF7EA',
      ink: '#052B28',
      rgb: '0, 210, 190'
    },
    {
      id: 'astonmartin',
      name: 'Aston Martin',
      fullName: 'Aston Martin Aramco',
      accent: '#00A38F',
      accent2: '#5CE0CC',
      ink: '#04231F',
      rgb: '0, 163, 143'
    },
    {
      id: 'williams',
      name: 'Williams',
      fullName: 'Atlassian Williams Racing',
      accent: '#005AFF',
      accent2: '#6FA0FF',
      ink: '#FFFFFF',
      rgb: '0, 90, 255'
    },
    {
      id: 'alpine',
      name: 'Alpine',
      fullName: 'BWT Alpine F1 Team',
      accent: '#FF87BC',
      accent2: '#4DA6FF',
      ink: '#34101F',
      rgb: '255, 135, 188'
    },
    {
      id: 'haas',
      name: 'Haas',
      fullName: 'MoneyGram Haas F1 Team',
      accent: '#C3C8CF',
      accent2: '#FF3B30',
      ink: '#12141A',
      rgb: '195, 200, 207'
    },
    {
      id: 'audi',
      name: 'Audi',
      fullName: 'Audi F1 Team',
      accent: '#E1063A',
      accent2: '#FF6B8A',
      ink: '#FFFFFF',
      rgb: '225, 6, 58'
    },
    {
      id: 'racingbulls',
      name: 'Racing Bulls',
      fullName: 'Visa Cash App Racing Bulls',
      accent: '#6E9BFF',
      accent2: '#FF4D5E',
      ink: '#08122B',
      rgb: '110, 155, 255'
    },
    {
      id: 'cadillac',
      name: 'Cadillac',
      fullName: 'Cadillac Formula 1 Team',
      accent: '#D4AF37',
      accent2: '#F5DE9B',
      ink: '#241B05',
      rgb: '212, 175, 55'
    }
  ];

  var DRIVERS = [
    { id: 'antonelli', code: 'ANT', number: 12, firstName: 'Andrea Kimi', lastName: 'Antonelli', teamId: 'mercedes', country: 'Италия', flag: '🇮🇹' },
    { id: 'russell', code: 'RUS', number: 63, firstName: 'George', lastName: 'Russell', teamId: 'mercedes', country: 'Великобритания', flag: '🇬🇧' },
    { id: 'norris', code: 'NOR', number: 4, firstName: 'Lando', lastName: 'Norris', teamId: 'mclaren', country: 'Великобритания', flag: '🇬🇧' },
    { id: 'piastri', code: 'PIA', number: 81, firstName: 'Oscar', lastName: 'Piastri', teamId: 'mclaren', country: 'Австралия', flag: '🇦🇺' },
    { id: 'leclerc', code: 'LEC', number: 16, firstName: 'Charles', lastName: 'Leclerc', teamId: 'ferrari', country: 'Монако', flag: '🇲🇨' },
    { id: 'hamilton', code: 'HAM', number: 44, firstName: 'Lewis', lastName: 'Hamilton', teamId: 'ferrari', country: 'Великобритания', flag: '🇬🇧' },
    { id: 'verstappen', code: 'VER', number: 3, firstName: 'Max', lastName: 'Verstappen', teamId: 'redbull', country: 'Нидерланды', flag: '🇳🇱' },
    { id: 'hadjar', code: 'HAD', number: 6, firstName: 'Isack', lastName: 'Hadjar', teamId: 'redbull', country: 'Франция', flag: '🇫🇷' },
    { id: 'alonso', code: 'ALO', number: 14, firstName: 'Fernando', lastName: 'Alonso', teamId: 'astonmartin', country: 'Испания', flag: '🇪🇸' },
    { id: 'stroll', code: 'STR', number: 18, firstName: 'Lance', lastName: 'Stroll', teamId: 'astonmartin', country: 'Канада', flag: '🇨🇦' },
    { id: 'gasly', code: 'GAS', number: 10, firstName: 'Pierre', lastName: 'Gasly', teamId: 'alpine', country: 'Франция', flag: '🇫🇷' },
    { id: 'colapinto', code: 'COL', number: 43, firstName: 'Franco', lastName: 'Colapinto', teamId: 'alpine', country: 'Аргентина', flag: '🇦🇷' },
    { id: 'albon', code: 'ALB', number: 23, firstName: 'Alexander', lastName: 'Albon', teamId: 'williams', country: 'Таиланд', flag: '🇹🇭' },
    { id: 'sainz', code: 'SAI', number: 55, firstName: 'Carlos', lastName: 'Sainz', teamId: 'williams', country: 'Испания', flag: '🇪🇸' },
    { id: 'lawson', code: 'LAW', number: 30, firstName: 'Liam', lastName: 'Lawson', teamId: 'racingbulls', country: 'Новая Зеландия', flag: '🇳🇿' },
    { id: 'lindblad', code: 'LIN', number: 41, firstName: 'Arvid', lastName: 'Lindblad', teamId: 'racingbulls', country: 'Великобритания', flag: '🇬🇧' },
    { id: 'ocon', code: 'OCO', number: 31, firstName: 'Esteban', lastName: 'Ocon', teamId: 'haas', country: 'Франция', flag: '🇫🇷' },
    { id: 'bearman', code: 'BEA', number: 87, firstName: 'Oliver', lastName: 'Bearman', teamId: 'haas', country: 'Великобритания', flag: '🇬🇧' },
    { id: 'hulkenberg', code: 'HUL', number: 27, firstName: 'Nico', lastName: 'Hülkenberg', teamId: 'audi', country: 'Германия', flag: '🇩🇪' },
    { id: 'bortoleto', code: 'BOR', number: 5, firstName: 'Gabriel', lastName: 'Bortoleto', teamId: 'audi', country: 'Бразилия', flag: '🇧🇷' },
    { id: 'perez', code: 'PER', number: 11, firstName: 'Sergio', lastName: 'Pérez', teamId: 'cadillac', country: 'Мексика', flag: '🇲🇽' },
    { id: 'bottas', code: 'BOT', number: 77, firstName: 'Valtteri', lastName: 'Bottas', teamId: 'cadillac', country: 'Финляндия', flag: '🇫🇮' }
  ];

  var RACES = [
  {
    "id": "2026-australia",
    "slug": "australia",
    "round": 1,
    "nameRu": "Гран-при Австралии",
    "nameEn": "Australian Grand Prix",
    "shortRu": "Австралия",
    "city": "Мельбурн",
    "country": "Австралия",
    "countryCode": "AU",
    "flag": "🇦🇺",
    "circuit": "Альберт-Парк",
    "circuitShort": "Альберт-Парк",
    "lengthKm": 5.278,
    "laps": 58,
    "turns": 14,
    "distanceKm": 306.124,
    "localTimezone": "Australia/Melbourne",
    "weekendLabel": "6–8 марта 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-03-06T01:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-03-06T05:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-03-07T01:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-03-07T05:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "58 кругов · старт с места",
        "start": "2026-03-08T04:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "russell",
        "gap": "1:23:06.801"
      },
      {
        "position": 2,
        "driverId": "antonelli",
        "gap": "+2.974"
      },
      {
        "position": 3,
        "driverId": "leclerc",
        "gap": "+15.519"
      }
    ]
  },
  {
    "id": "2026-china",
    "slug": "china",
    "round": 2,
    "nameRu": "Гран-при Китая",
    "nameEn": "Chinese Grand Prix",
    "shortRu": "Китай",
    "city": "Шанхай",
    "country": "Китай",
    "countryCode": "CN",
    "flag": "🇨🇳",
    "circuit": "Шанхайский международный автодром",
    "circuitShort": "Шанхай",
    "lengthKm": 5.451,
    "laps": 56,
    "turns": 16,
    "distanceKm": 305.066,
    "localTimezone": "Asia/Shanghai",
    "weekendLabel": "13–15 марта 2026",
    "format": "Спринт-уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-03-13T03:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "sprintQuali",
        "code": "SQ",
        "name": "Спринт-квалификация",
        "subtitle": "Короткая квалификация",
        "start": "2026-03-13T07:30:00Z",
        "durationMin": 44,
        "kind": "sprintQualifying"
      },
      {
        "id": "sprint",
        "code": "SPR",
        "name": "Спринт",
        "subtitle": "100 км · без обязательного пит-стопа",
        "start": "2026-03-14T03:00:00Z",
        "durationMin": 60,
        "kind": "sprint"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-03-14T07:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "56 кругов · старт с места",
        "start": "2026-03-15T07:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "antonelli",
        "gap": "1:33:15.607"
      },
      {
        "position": 2,
        "driverId": "russell",
        "gap": "+5.515"
      },
      {
        "position": 3,
        "driverId": "hamilton",
        "gap": "+25.267"
      }
    ]
  },
  {
    "id": "2026-japan",
    "slug": "japan",
    "round": 3,
    "nameRu": "Гран-при Японии",
    "nameEn": "Japanese Grand Prix",
    "shortRu": "Япония",
    "city": "Судзука",
    "country": "Япония",
    "countryCode": "JP",
    "flag": "🇯🇵",
    "circuit": "Международная трасса Судзука",
    "circuitShort": "Судзука",
    "lengthKm": 5.807,
    "laps": 53,
    "turns": 18,
    "distanceKm": 307.471,
    "localTimezone": "Asia/Tokyo",
    "weekendLabel": "27–29 марта 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-03-27T02:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-03-27T06:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-03-28T02:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-03-28T06:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "53 круга · старт с места",
        "start": "2026-03-29T05:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "antonelli",
        "gap": "1:28:03.403"
      },
      {
        "position": 2,
        "driverId": "piastri",
        "gap": "+13.722"
      },
      {
        "position": 3,
        "driverId": "leclerc",
        "gap": "+15.27"
      }
    ]
  },
  {
    "id": "2026-miami",
    "slug": "miami",
    "round": 4,
    "nameRu": "Гран-при Майами",
    "nameEn": "Miami Grand Prix",
    "shortRu": "Майами",
    "city": "Майами",
    "country": "США",
    "countryCode": "US",
    "flag": "🇺🇸",
    "circuit": "Майами Интернэшнл Автодром",
    "circuitShort": "Майами",
    "lengthKm": 5.412,
    "laps": 57,
    "turns": 19,
    "distanceKm": 308.326,
    "localTimezone": "America/New_York",
    "weekendLabel": "1–3 мая 2026",
    "format": "Спринт-уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-05-01T16:00:00Z",
        "durationMin": 90,
        "kind": "practice"
      },
      {
        "id": "sprintQuali",
        "code": "SQ",
        "name": "Спринт-квалификация",
        "subtitle": "Короткая квалификация",
        "start": "2026-05-01T20:30:00Z",
        "durationMin": 44,
        "kind": "sprintQualifying"
      },
      {
        "id": "sprint",
        "code": "SPR",
        "name": "Спринт",
        "subtitle": "100 км · без обязательного пит-стопа",
        "start": "2026-05-02T16:00:00Z",
        "durationMin": 60,
        "kind": "sprint"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-05-02T20:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "57 кругов · старт с места",
        "start": "2026-05-03T17:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "antonelli",
        "gap": "1:33:19.273"
      },
      {
        "position": 2,
        "driverId": "norris",
        "gap": "+3.264"
      },
      {
        "position": 3,
        "driverId": "piastri",
        "gap": "+27.092"
      }
    ]
  },
  {
    "id": "2026-canada",
    "slug": "canada",
    "round": 5,
    "nameRu": "Гран-при Канады",
    "nameEn": "Canadian Grand Prix",
    "shortRu": "Канада",
    "city": "Монреаль",
    "country": "Канада",
    "countryCode": "CA",
    "flag": "🇨🇦",
    "circuit": "Автодром имени Жиля Вильнёва",
    "circuitShort": "Монреаль",
    "lengthKm": 4.361,
    "laps": 70,
    "turns": 14,
    "distanceKm": 305.27,
    "localTimezone": "America/Toronto",
    "weekendLabel": "22–24 мая 2026",
    "format": "Спринт-уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-05-22T16:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "sprintQuali",
        "code": "SQ",
        "name": "Спринт-квалификация",
        "subtitle": "Короткая квалификация",
        "start": "2026-05-22T20:30:00Z",
        "durationMin": 44,
        "kind": "sprintQualifying"
      },
      {
        "id": "sprint",
        "code": "SPR",
        "name": "Спринт",
        "subtitle": "100 км · без обязательного пит-стопа",
        "start": "2026-05-23T16:00:00Z",
        "durationMin": 60,
        "kind": "sprint"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-05-23T20:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "70 кругов · старт с места",
        "start": "2026-05-24T20:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "antonelli",
        "gap": "1:28:15.758"
      },
      {
        "position": 2,
        "driverId": "hamilton",
        "gap": "+10.768"
      },
      {
        "position": 3,
        "driverId": "verstappen",
        "gap": "+11.276"
      }
    ]
  },
  {
    "id": "2026-monaco",
    "slug": "monaco",
    "round": 6,
    "nameRu": "Гран-при Монако",
    "nameEn": "Monaco Grand Prix",
    "shortRu": "Монако",
    "city": "Монте-Карло",
    "country": "Монако",
    "countryCode": "MC",
    "flag": "🇲🇨",
    "circuit": "Городская трасса Монако",
    "circuitShort": "Монако",
    "lengthKm": 3.337,
    "laps": 78,
    "turns": 19,
    "distanceKm": 260.286,
    "localTimezone": "Europe/Monaco",
    "weekendLabel": "5–7 июня 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-06-05T11:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-06-05T15:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-06-06T10:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-06-06T14:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "78 кругов · старт с места",
        "start": "2026-06-07T13:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "antonelli",
        "gap": "2:23:31.243"
      },
      {
        "position": 2,
        "driverId": "hamilton",
        "gap": "+6.271"
      },
      {
        "position": 3,
        "driverId": "hadjar",
        "gap": "+23.394"
      }
    ]
  },
  {
    "id": "2026-barcelona-catalunya",
    "slug": "barcelona-catalunya",
    "round": 7,
    "nameRu": "Гран-при Барселоны",
    "nameEn": "Barcelona-Catalunya Grand Prix",
    "shortRu": "Барселона",
    "city": "Барселона",
    "country": "Испания",
    "countryCode": "ES",
    "flag": "🇪🇸",
    "circuit": "Барселона-Каталунья",
    "circuitShort": "Каталунья",
    "lengthKm": 4.657,
    "laps": 66,
    "turns": 14,
    "distanceKm": 307.362,
    "localTimezone": "Europe/Madrid",
    "weekendLabel": "12–14 июня 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-06-12T11:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-06-12T15:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-06-13T10:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-06-13T14:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "66 кругов · старт с места",
        "start": "2026-06-14T13:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "hamilton",
        "gap": "1:32:28.105"
      },
      {
        "position": 2,
        "driverId": "russell",
        "gap": "+19.561"
      },
      {
        "position": 3,
        "driverId": "norris",
        "gap": "+23.719"
      }
    ]
  },
  {
    "id": "2026-austria",
    "slug": "austria",
    "round": 8,
    "nameRu": "Гран-при Австрии",
    "nameEn": "Austrian Grand Prix",
    "shortRu": "Австрия",
    "city": "Шпильберг",
    "country": "Австрия",
    "countryCode": "AT",
    "flag": "🇦🇹",
    "circuit": "Ред Булл Ринг",
    "circuitShort": "Ред Булл Ринг",
    "lengthKm": 4.318,
    "laps": 71,
    "turns": 10,
    "distanceKm": 306.452,
    "localTimezone": "Europe/Vienna",
    "weekendLabel": "26–28 июня 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-06-26T11:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-06-26T15:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-06-27T10:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-06-27T14:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "71 круг · старт с места",
        "start": "2026-06-28T13:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "russell",
        "gap": "1:26:37.979"
      },
      {
        "position": 2,
        "driverId": "verstappen",
        "gap": "+1.611"
      },
      {
        "position": 3,
        "driverId": "antonelli",
        "gap": "+1.986"
      }
    ]
  },
  {
    "id": "2026-great-britain",
    "slug": "great-britain",
    "round": 9,
    "nameRu": "Гран-при Великобритании",
    "nameEn": "British Grand Prix",
    "shortRu": "Великобритания",
    "city": "Сильверстоун",
    "country": "Великобритания",
    "countryCode": "GB",
    "flag": "🇬🇧",
    "circuit": "Сильверстоун",
    "circuitShort": "Сильверстоун",
    "lengthKm": 5.891,
    "laps": 52,
    "turns": 18,
    "distanceKm": 306.198,
    "localTimezone": "Europe/London",
    "weekendLabel": "3–5 июля 2026",
    "format": "Спринт-уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-07-03T11:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "sprintQuali",
        "code": "SQ",
        "name": "Спринт-квалификация",
        "subtitle": "Короткая квалификация",
        "start": "2026-07-03T15:30:00Z",
        "durationMin": 44,
        "kind": "sprintQualifying"
      },
      {
        "id": "sprint",
        "code": "SPR",
        "name": "Спринт",
        "subtitle": "100 км · без обязательного пит-стопа",
        "start": "2026-07-04T11:00:00Z",
        "durationMin": 60,
        "kind": "sprint"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-07-04T15:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "52 круга · старт с места",
        "start": "2026-07-05T14:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "leclerc",
        "gap": "1:27:11.335"
      },
      {
        "position": 2,
        "driverId": "russell",
        "gap": "+0.427"
      },
      {
        "position": 3,
        "driverId": "hamilton",
        "gap": "+0.772"
      }
    ]
  },
  {
    "id": "2026-belgium",
    "slug": "belgium",
    "round": 10,
    "nameRu": "Гран-при Бельгии",
    "nameEn": "Belgian Grand Prix",
    "shortRu": "Бельгия",
    "city": "Спа",
    "country": "Бельгия",
    "countryCode": "BE",
    "flag": "🇧🇪",
    "circuit": "Спа-Франкоршам",
    "circuitShort": "Спа",
    "lengthKm": 7.004,
    "laps": 44,
    "turns": 19,
    "distanceKm": 308.052,
    "localTimezone": "Europe/Brussels",
    "weekendLabel": "17–19 июля 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-07-17T11:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-07-17T15:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-07-18T10:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-07-18T14:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "44 круга · старт с места",
        "start": "2026-07-19T13:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "antonelli",
        "gap": "1:24:42.479"
      },
      {
        "position": 2,
        "driverId": "leclerc",
        "gap": "+1.952"
      },
      {
        "position": 3,
        "driverId": "verstappen",
        "gap": "+11.586"
      }
    ]
  },
  {
    "id": "2026-hungary",
    "slug": "hungary",
    "round": 11,
    "nameRu": "Гран-при Венгрии",
    "nameEn": "Hungarian Grand Prix",
    "shortRu": "Венгрия",
    "city": "Будапешт",
    "country": "Венгрия",
    "countryCode": "HU",
    "flag": "🇭🇺",
    "circuit": "Хунгароринг",
    "circuitShort": "Хунгароринг",
    "lengthKm": 4.381,
    "laps": 70,
    "turns": 14,
    "distanceKm": 306.63,
    "localTimezone": "Europe/Budapest",
    "weekendLabel": "24–26 июля 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-07-24T11:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-07-24T15:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-07-25T10:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-07-25T14:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "70 кругов · старт с места",
        "start": "2026-07-26T13:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "norris",
        "gap": "1:39:56.180"
      },
      {
        "position": 2,
        "driverId": "verstappen",
        "gap": "+15.08"
      },
      {
        "position": 3,
        "driverId": "antonelli",
        "gap": "+18.728"
      }
    ]
  },
  {
    "id": "2026-netherlands",
    "slug": "netherlands",
    "round": 12,
    "nameRu": "Гран-при Нидерландов",
    "nameEn": "Dutch Grand Prix",
    "shortRu": "Нидерланды",
    "city": "Зандворт",
    "country": "Нидерланды",
    "countryCode": "NL",
    "flag": "🇳🇱",
    "circuit": "Зандворт",
    "circuitShort": "Зандворт",
    "lengthKm": 4.259,
    "laps": 72,
    "turns": 14,
    "distanceKm": 306.587,
    "localTimezone": "Europe/Amsterdam",
    "weekendLabel": "21–23 августа 2026",
    "format": "Спринт-уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-08-21T10:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "sprintQuali",
        "code": "SQ",
        "name": "Спринт-квалификация",
        "subtitle": "Короткая квалификация",
        "start": "2026-08-21T14:30:00Z",
        "durationMin": 44,
        "kind": "sprintQualifying"
      },
      {
        "id": "sprint",
        "code": "SPR",
        "name": "Спринт",
        "subtitle": "100 км · без обязательного пит-стопа",
        "start": "2026-08-22T10:00:00Z",
        "durationMin": 60,
        "kind": "sprint"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-08-22T14:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "72 круга · старт с места",
        "start": "2026-08-23T13:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "norris",
        "gap": "2:04:44.859"
      },
      {
        "position": 2,
        "driverId": "antonelli",
        "gap": "+11.536"
      },
      {
        "position": 3,
        "driverId": "russell",
        "gap": "+15.906"
      }
    ]
  },
  {
    "id": "2026-italy",
    "slug": "italy",
    "round": 13,
    "nameRu": "Гран-при Италии",
    "nameEn": "Italian Grand Prix",
    "shortRu": "Италия",
    "city": "Монца",
    "country": "Италия",
    "countryCode": "IT",
    "flag": "🇮🇹",
    "circuit": "Национальный автодром Монцы",
    "circuitShort": "Монца",
    "lengthKm": 5.793,
    "laps": 53,
    "turns": 11,
    "distanceKm": 306.72,
    "localTimezone": "Europe/Rome",
    "weekendLabel": "4–6 сентября 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-09-04T10:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-09-04T14:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-09-05T10:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-09-05T14:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "53 круга · старт с места",
        "start": "2026-09-06T13:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "antonelli",
        "gap": "1:51:15.281"
      },
      {
        "position": 2,
        "driverId": "russell",
        "gap": "+3.857"
      },
      {
        "position": 3,
        "driverId": "verstappen",
        "gap": "+14.718"
      }
    ]
  },
  {
    "id": "2026-spain",
    "slug": "spain",
    "round": 14,
    "nameRu": "Гран-при Испании",
    "nameEn": "Spanish Grand Prix",
    "shortRu": "Испания",
    "city": "Мадрид",
    "country": "Испания",
    "countryCode": "ES",
    "flag": "🇪🇸",
    "circuit": "Мадринг",
    "circuitShort": "Мадрид",
    "lengthKm": 5.474,
    "laps": 57,
    "turns": 22,
    "distanceKm": 312.018,
    "localTimezone": "Europe/Madrid",
    "weekendLabel": "11–13 сентября 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-09-11T11:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-09-11T15:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-09-12T10:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-09-12T14:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "57 кругов · старт с места",
        "start": "2026-09-13T13:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "antonelli",
        "gap": "1:34:23.754"
      },
      {
        "position": 2,
        "driverId": "verstappen",
        "gap": "+4.351"
      },
      {
        "position": 3,
        "driverId": "norris",
        "gap": "+5.089"
      }
    ]
  },
  {
    "id": "2026-azerbaijan",
    "slug": "azerbaijan",
    "round": 15,
    "nameRu": "Гран-при Азербайджана",
    "nameEn": "Azerbaijan Grand Prix",
    "shortRu": "Азербайджан",
    "city": "Баку",
    "country": "Азербайджан",
    "countryCode": "AZ",
    "flag": "🇦🇿",
    "circuit": "Бакинская городская трасса",
    "circuitShort": "Баку",
    "lengthKm": 6.003,
    "laps": 51,
    "turns": 20,
    "distanceKm": 306.049,
    "localTimezone": "Asia/Baku",
    "weekendLabel": "24–26 сентября 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-09-24T08:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-09-24T12:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-09-25T08:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-09-25T12:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "51 круг · старт с места",
        "start": "2026-09-26T11:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "russell",
        "gap": "1:38:02.143"
      },
      {
        "position": 2,
        "driverId": "verstappen",
        "gap": "+0.196"
      },
      {
        "position": 3,
        "driverId": "hadjar",
        "gap": "+10.704"
      }
    ]
  },
  {
    "id": "2026-bahrain",
    "slug": "bahrain",
    "round": 16,
    "nameRu": "Гран-при Бахрейна",
    "nameEn": "Bahrain Grand Prix",
    "shortRu": "Бахрейн",
    "city": "Сепанг",
    "country": "Малайзия",
    "countryCode": "MY",
    "flag": "🇲🇾",
    "circuit": "Международная трасса Сепанг",
    "circuitShort": "Сепанг",
    "lengthKm": 5.543,
    "laps": 56,
    "turns": 15,
    "distanceKm": 310.408,
    "localTimezone": "Asia/Kuala_Lumpur",
    "weekendLabel": "2–4 октября 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-10-02T04:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-10-02T08:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-10-03T04:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-10-03T08:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "56 кругов · старт с места",
        "start": "2026-10-04T07:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "verstappen",
        "gap": "1:47:14.808"
      },
      {
        "position": 2,
        "driverId": "antonelli",
        "gap": "+2.307"
      },
      {
        "position": 3,
        "driverId": "hamilton",
        "gap": "+4.919"
      }
    ]
  },
  {
    "id": "2026-singapore",
    "slug": "singapore",
    "round": 17,
    "nameRu": "Гран-при Сингапура",
    "nameEn": "Singapore Grand Prix",
    "shortRu": "Сингапур",
    "city": "Сингапур",
    "country": "Сингапур",
    "countryCode": "SG",
    "flag": "🇸🇬",
    "circuit": "Марина-Бей",
    "circuitShort": "Марина-Бей",
    "lengthKm": 4.94,
    "laps": 62,
    "turns": 19,
    "distanceKm": 306.28,
    "localTimezone": "Asia/Singapore",
    "weekendLabel": "9–11 октября 2026",
    "format": "Спринт-уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-10-09T08:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "sprintQuali",
        "code": "SQ",
        "name": "Спринт-квалификация",
        "subtitle": "Короткая квалификация",
        "start": "2026-10-09T12:30:00Z",
        "durationMin": 44,
        "kind": "sprintQualifying"
      },
      {
        "id": "sprint",
        "code": "SPR",
        "name": "Спринт",
        "subtitle": "100 км · без обязательного пит-стопа",
        "start": "2026-10-10T09:00:00Z",
        "durationMin": 30,
        "kind": "sprint"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-10-10T13:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "62 круга · старт с места",
        "start": "2026-10-11T12:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "verstappen",
        "gap": "1:42:00.785"
      },
      {
        "position": 2,
        "driverId": "leclerc",
        "gap": "+7.335"
      },
      {
        "position": 3,
        "driverId": "antonelli",
        "gap": "+24.573"
      }
    ]
  },
  {
    "id": "2026-united-states",
    "slug": "united-states",
    "round": 18,
    "nameRu": "Гран-при США",
    "nameEn": "United States Grand Prix",
    "shortRu": "США",
    "city": "Остин",
    "country": "США",
    "countryCode": "US",
    "flag": "🇺🇸",
    "circuit": "Трасса Америк",
    "circuitShort": "Остин",
    "lengthKm": 5.513,
    "laps": 56,
    "turns": 20,
    "distanceKm": 308.405,
    "localTimezone": "America/Chicago",
    "weekendLabel": "23–25 октября 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-10-23T17:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-10-23T21:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-10-24T17:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-10-24T21:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "56 кругов · старт с места",
        "start": "2026-10-25T20:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "antonelli",
        "gap": "1:35:16.650"
      },
      {
        "position": 2,
        "driverId": "leclerc",
        "gap": "+13.078"
      },
      {
        "position": 3,
        "driverId": "verstappen",
        "gap": "+17.485"
      }
    ]
  },
  {
    "id": "2026-mexico",
    "slug": "mexico",
    "round": 19,
    "nameRu": "Гран-при Мехико",
    "nameEn": "Mexico City Grand Prix",
    "shortRu": "Мексика",
    "city": "Мехико",
    "country": "Мексика",
    "countryCode": "MX",
    "flag": "🇲🇽",
    "circuit": "Автодром имени братьев Родригес",
    "circuitShort": "Мехико",
    "lengthKm": 4.304,
    "laps": 71,
    "turns": 17,
    "distanceKm": 305.354,
    "localTimezone": "America/Mexico_City",
    "weekendLabel": "30 октября – 1 ноября 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-10-30T18:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-10-30T22:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-10-31T17:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-10-31T21:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "71 круг · старт с места",
        "start": "2026-11-01T20:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "verstappen",
        "gap": "2:20:28.772"
      },
      {
        "position": 2,
        "driverId": "hamilton",
        "gap": "+0.799"
      },
      {
        "position": 3,
        "driverId": "antonelli",
        "gap": "+4.006"
      }
    ]
  },
  {
    "id": "2026-brazil",
    "slug": "brazil",
    "round": 20,
    "nameRu": "Гран-при Сан-Паулу",
    "nameEn": "São Paulo Grand Prix",
    "shortRu": "Сан-Паулу",
    "city": "Сан-Паулу",
    "country": "Бразилия",
    "countryCode": "BR",
    "flag": "🇧🇷",
    "circuit": "Автодром Интерлагос",
    "circuitShort": "Интерлагос",
    "lengthKm": 4.309,
    "laps": 71,
    "turns": 15,
    "distanceKm": 305.879,
    "localTimezone": "America/Sao_Paulo",
    "weekendLabel": "6–8 ноября 2026",
    "format": "Классический уикенд",
    "hasTrackMap": true,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-11-06T15:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-11-06T19:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-11-07T14:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-11-07T18:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "71 круг · старт с места",
        "start": "2026-11-08T17:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": [
      {
        "position": 1,
        "driverId": "norris",
        "gap": "1:35:23.504"
      },
      {
        "position": 2,
        "driverId": "verstappen",
        "gap": "+14.602"
      },
      {
        "position": 3,
        "driverId": "hadjar",
        "gap": "+24.485"
      }
    ]
  },
  {
    "id": "2026-las-vegas",
    "slug": "las-vegas",
    "round": 21,
    "nameRu": "Гран-при Лас-Вегаса",
    "nameEn": "Las Vegas Grand Prix",
    "shortRu": "Лас-Вегас",
    "city": "Лас-Вегас",
    "country": "США",
    "countryCode": "US",
    "flag": "🇺🇸",
    "circuit": "Лас-Вегас-Стрип",
    "circuitShort": "Лас-Вегас",
    "lengthKm": 6.201,
    "laps": 50,
    "turns": 17,
    "distanceKm": 310.05,
    "localTimezone": "America/Los_Angeles",
    "weekendLabel": "19–21 ноября 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-11-20T00:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-11-20T04:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-11-21T00:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-11-21T04:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "50 кругов · старт с места",
        "start": "2026-11-22T04:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": null
  },
  {
    "id": "2026-qatar",
    "slug": "qatar",
    "round": 22,
    "nameRu": "Гран-при Катара",
    "nameEn": "Qatar Grand Prix",
    "shortRu": "Катар",
    "city": "Лусаил",
    "country": "Катар",
    "countryCode": "QA",
    "flag": "🇶🇦",
    "circuit": "Международная трасса Лусаил",
    "circuitShort": "Лусаил",
    "lengthKm": 5.419,
    "laps": 57,
    "turns": 16,
    "distanceKm": 308.611,
    "localTimezone": "Asia/Qatar",
    "weekendLabel": "27–29 ноября 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-11-27T13:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-11-27T17:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-11-28T14:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-11-28T18:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "57 кругов · старт с места",
        "start": "2026-11-29T16:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": null
  },
  {
    "id": "2026-united-arab-emirates",
    "slug": "united-arab-emirates",
    "round": 23,
    "nameRu": "Гран-при Абу-Даби",
    "nameEn": "Abu Dhabi Grand Prix",
    "shortRu": "Абу-Даби",
    "city": "Абу-Даби",
    "country": "ОАЭ",
    "countryCode": "AE",
    "flag": "🇦🇪",
    "circuit": "Яс-Марина",
    "circuitShort": "Яс-Марина",
    "lengthKm": 5.281,
    "laps": 58,
    "turns": 16,
    "distanceKm": 306.183,
    "localTimezone": "Asia/Dubai",
    "weekendLabel": "4–6 декабря 2026",
    "format": "Классический уикенд",
    "hasTrackMap": false,
    "sessions": [
      {
        "id": "fp1",
        "code": "FP1",
        "name": "Практика 1",
        "subtitle": "Свободные заезды",
        "start": "2026-12-04T09:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp2",
        "code": "FP2",
        "name": "Практика 2",
        "subtitle": "Свободные заезды",
        "start": "2026-12-04T13:00:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "fp3",
        "code": "FP3",
        "name": "Практика 3",
        "subtitle": "Свободные заезды",
        "start": "2026-12-05T10:30:00Z",
        "durationMin": 60,
        "kind": "practice"
      },
      {
        "id": "quali",
        "code": "Q",
        "name": "Квалификация",
        "subtitle": "Три сегмента, борьба за поул",
        "start": "2026-12-05T14:00:00Z",
        "durationMin": 60,
        "kind": "qualifying"
      },
      {
        "id": "race",
        "code": "RACE",
        "name": "Гонка",
        "subtitle": "58 кругов · старт с места",
        "start": "2026-12-06T13:00:00Z",
        "durationMin": 120,
        "kind": "race"
      }
    ],
    "results": null
  }
];

  window.F1_DATA = {
    season: 2026,
    defaultRaceId: '2026-brazil',
    defaultSessionStates: {
  "2026-brazil": {
    "fp1": true,
    "fp2": true,
    "fp3": true,
    "quali": true,
    "race": false
  }
},
    defaultFriends: [
      {
        id: 'friend-alex',
        name: 'Алекс',
        tg: '@alex_live',
        status: 'live',
        note: 'Смотрит в лайве и готов обсуждать любой поворот.',
        createdAt: '2026-11-01T10:00:00.000Z',
        mock: true
      },
      {
        id: 'friend-maya',
        name: 'Майя',
        tg: '@maya_onboard',
        status: 'recording',
        note: 'Догоняет гонку вечером. Без спойлеров, пожалуйста.',
        createdAt: '2026-11-01T10:00:00.000Z',
        mock: true
      },
      {
        id: 'friend-danya',
        name: 'Даня',
        tg: '@danya_f1',
        status: 'watched',
        note: 'Уже посмотрел. Готов к полному разбору этапа.',
        createdAt: '2026-11-01T10:00:00.000Z',
        mock: true
      }
    ],
    races: RACES,
    teams: TEAMS,
    drivers: DRIVERS
  };

  window.F1_API_URL = 'https://api.jolpica.net/ergast/f1/current.json';
  window.F1_API_TIMEOUT_MS = 2000;
})();
