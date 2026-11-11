/**
 * F1 Paddock & Spoiler Shield — логика приложения.
 * Чистый ES6, без сборщика и внешних зависимостей.
 */
(function () {
  'use strict';

  var DATA = window.F1_DATA;
  var STORE = window.F1Store;

  var TEAM_BY_ID = {};
  var DRIVER_BY_ID = {};
  var RACE_BY_ID = {};
  DATA.teams.forEach(function (team) { TEAM_BY_ID[team.id] = team; });
  DATA.drivers.forEach(function (driver) { DRIVER_BY_ID[driver.id] = driver; });
  DATA.races.forEach(function (race) { RACE_BY_ID[race.id] = race; });

  var USER_TIMEZONE = (function () {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    } catch (error) {
      return 'UTC';
    }
  })();

  // Timezone options for the dropdown (UTC-12:00 to UTC+14:00)
  var TIMEZONE_OPTIONS = [
    { value: 'Etc/GMT+12', label: 'UTC-12:00', cities: 'Baker Island, Howland Island' },
    { value: 'Etc/GMT+11', label: 'UTC-11:00', cities: 'American Samoa, Niue, Midway Atoll' },
    { value: 'Pacific/Honolulu', label: 'UTC-10:00', cities: 'Honolulu, Tahiti' },
    { value: 'America/Anchorage', label: 'UTC-09:00', cities: 'Anchorage, Juneau' },
    { value: 'America/Los_Angeles', label: 'UTC-08:00', cities: 'Los Angeles, Seattle, Vancouver, Tijuana' },
    { value: 'America/Denver', label: 'UTC-07:00', cities: 'Denver, Phoenix, Calgary, Chihuahua' },
    { value: 'America/Chicago', label: 'UTC-06:00', cities: 'Chicago, Houston, Mexico City, Winnipeg' },
    { value: 'America/New_York', label: 'UTC-05:00', cities: 'New York, Toronto, Miami, Lima, Bogotá' },
    { value: 'America/Caracas', label: 'UTC-04:00', cities: 'Caracas, Santiago, La Paz, Halifax' },
    { value: 'America/Sao_Paulo', label: 'UTC-03:00', cities: 'São Paulo, Buenos Aires, Montevideo, Brasília' },
    { value: 'America/Noronha', label: 'UTC-02:00', cities: 'Fernando de Noronha, South Georgia' },
    { value: 'Atlantic/Azores', label: 'UTC-01:00', cities: 'Azores, Cape Verde' },
    { value: 'UTC', label: 'UTC+00:00', cities: 'London, Dublin, Reykjavik, Accra, Casablanca (winter)' },
    { value: 'Europe/Paris', label: 'UTC+01:00', cities: 'Paris, Berlin, Rome, Madrid, Stockholm, Warsaw, Lagos, Algiers' },
    { value: 'Europe/Helsinki', label: 'UTC+02:00', cities: 'Helsinki, Athens, Istanbul, Cairo, Jerusalem, Kyiv, Beirut, Johannesburg' },
    { value: 'Europe/Moscow', label: 'UTC+03:00', cities: 'Moscow, St. Petersburg, Minsk, Riyadh, Nairobi, Tehran (winter), Tbilisi' },
    { value: 'Asia/Dubai', label: 'UTC+04:00', cities: 'Dubai, Abu Dhabi, Baku, Yerevan, Samara, Mauritius, Seychelles' },
    { value: 'Asia/Karachi', label: 'UTC+05:00', cities: 'Karachi, Tashkent, Yekaterinburg, Malé, Astana (west)' },
    { value: 'Asia/Kolkata', label: 'UTC+05:30', cities: 'Mumbai, New Delhi, Kolkata, Chennai, Colombo, Kathmandu' },
    { value: 'Asia/Kathmandu', label: 'UTC+05:45', cities: 'Kathmandu' },
    { value: 'Asia/Dhaka', label: 'UTC+06:00', cities: 'Dhaka, Almaty, Omsk, Novosibirsk, Thimphu' },
    { value: 'Asia/Bangkok', label: 'UTC+07:00', cities: 'Bangkok, Jakarta, Hanoi, Ho Chi Minh City, Krasnoyarsk' },
    { value: 'Asia/Singapore', label: 'UTC+08:00', cities: 'Singapore, Kuala Lumpur, Manila, Perth, Hong Kong, Taipei, Beijing, Shanghai, Irkutsk' },
    { value: 'Asia/Tokyo', label: 'UTC+09:00', cities: 'Tokyo, Seoul, Pyongyang, Yakutsk, Palau' },
    { value: 'Australia/Sydney', label: 'UTC+10:00', cities: 'Sydney, Melbourne, Brisbane, Guam, Vladivostok, Port Moresby' },
    { value: 'Pacific/Noumea', label: 'UTC+11:00', cities: 'Nouméa, Solomon Islands, Magadan, Srednekolymsk' },
    { value: 'Pacific/Auckland', label: 'UTC+12:00', cities: 'Auckland, Wellington, Fiji, Kamchatka, Marshall Islands' },
    { value: 'Pacific/Tongatapu', label: 'UTC+13:00', cities: 'Nuku\'alofa, Apia (DST), Phoenix Islands' },
    { value: 'Pacific/Kiritimati', label: 'UTC+14:00', cities: 'Kiritimati, Line Islands' }
  ];

  var STATUS_META = {
    live: {
      emoji: '🟢',
      badge: 'live',
      header: 'Live',
      title: 'Смотрю Live',
      text: 'Спойлеры разрешены. Итоги открыты, друзья могут обсуждать гонку.',
      toast: 'Режим Live включён: спойлеры разрешены.',
      tone: 'success'
    },
    recording: {
      emoji: '🤫',
      badge: 'запись',
      header: 'Щит',
      title: 'Смотрю в записи',
      text: 'Результаты этапа скрыты. Друзья видят, что вам нельзя писать о гонке.',
      toast: 'Spoiler Shield включён: результаты скрыты.',
      tone: 'warn'
    },
    watched: {
      emoji: '🏁',
      badge: 'разбор',
      header: 'Готово',
      title: 'Уже посмотрел',
      text: 'Итоги открыты. Можно перейти к разбору с теми, кто тоже посмотрел.',
      toast: 'Итоги открыты. Готово к разбору.',
      tone: 'success'
    }
  };

  var FRIEND_META = {
    live: { label: 'Live', note: 'Смотрит в лайве и открыт к обсуждению.' },
    recording: { label: 'Без спойлеров', note: 'Смотрит в записи. Берегите спойлеры.' },
    watched: { label: 'Посмотрел', note: 'Уже посмотрел и готов к разбору.' }
  };

  var state = {
    profile: null,
    status: null,
    raceId: '',
    sessions: {},
    predictions: {},
    timeMode: 'local',
    userTimezone: null, // User-selected timezone (null = browser default)
    friends: [],
    predictionEditing: false,
    api: { status: 'loading', manual: false, season: null, round: null, error: null },
    modalMode: null,
    modalClosing: false,
    selectedTeam: 'ferrari',
    lastFocus: null,
    newFriendId: null,
    unlockPrompted: false,
    trackFocus: null,
    tzDropdownOpen: false
  };

  var modalCloseTimer = null;

  var el = {};

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $all(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  function icon(name, extraClass) {
    return '<svg class="icon' + (extraClass ? ' ' + extraClass : '') + '" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  }

  function getTeam(teamId) {
    return TEAM_BY_ID[teamId] || DATA.teams[0];
  }

  function getDriver(driverId) {
    return DRIVER_BY_ID[driverId] || null;
  }

  function getRace(raceId) {
    return RACE_BY_ID[raceId] || DATA.races[0];
  }

  function currentRace() {
    return getRace(state.raceId);
  }

  function currentSessions() {
    return state.sessions[state.raceId] || {};
  }

  function ensureRaceSessions(raceId) {
    if (!state.sessions[raceId]) {
      var map = {};
      getRace(raceId).sessions.forEach(function (session) { map[session.id] = false; });
      state.sessions[raceId] = map;
      state.sessions = STORE.saveSessions(state.sessions);
    }
    return state.sessions[raceId];
  }

  function currentPrediction() {
    return state.predictions[state.raceId] || null;
  }

  function getRaceSession(race) {
    return (race.sessions || []).filter(function (session) { return session.id === 'race'; })[0] || null;
  }

  function raceStart(race) {
    var raceSession = getRaceSession(race);
    if (raceSession) return new Date(raceSession.start).getTime();
    if (!race.sessions || !race.sessions.length) return 0;
    return new Date(race.sessions[0].start).getTime();
  }

  function raceEnd(race) {
    var raceSession = getRaceSession(race);
    if (!raceSession) return raceStart(race);
    return new Date(raceSession.start).getTime() + raceSession.durationMin * 60 * 1000;
  }

  function raceFinished(race) {
    return Date.now() >= raceEnd(race);
  }

  function raceWatched(race) {
    var sessions = state.sessions[race.id] || {};
    return sessions.race === true;
  }

  function hasOfficialResults(race) {
    return raceFinished(race) && Boolean(race.results && race.results.length === 3);
  }

  function computeDefaultRaceId() {
    var now = Date.now();
    var fourDays = 4 * 24 * 60 * 60 * 1000;
    var recent = DATA.races.filter(function (race) {
      var start = raceStart(race);
      return start <= now && now - start <= fourDays;
    }).sort(function (a, b) { return raceStart(a) - raceStart(b); });
    if (recent.length) return recent[recent.length - 1].id;

    var upcoming = DATA.races.filter(function (race) { return raceStart(race) > now; })
      .sort(function (a, b) { return raceStart(a) - raceStart(b); });
    if (upcoming.length) return upcoming[0].id;

    return DATA.races[DATA.races.length - 1].id;
  }

  function lapsLabel(number) {
    var mod10 = number % 10;
    var mod100 = number % 100;
    var word = 'кругов';
    if (mod10 === 1 && mod100 !== 11) word = 'круг';
    else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) word = 'круга';
    return number + ' ' + word;
  }

  function driverName(driver) {
    if (!driver) return 'Пилот';
    return driver.firstName + ' ' + driver.lastName;
  }

  function capitalize(value) {
    var string = String(value || '');
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function initials(name) {
    var parts = String(name || '').trim().split(/\s+/).slice(0, 2);
    var result = parts.map(function (part) {
      return Array.from(part)[0] || '';
    }).join('');
    return (result || '?').toUpperCase();
  }

  function avatarHue(name) {
    var hash = 0;
    String(name || '').split('').forEach(function (character) {
      hash = (hash * 31 + character.charCodeAt(0)) % 360;
    });
    return hash;
  }

  function formatTime(date, timeZone) {
    return new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
      timeZone: timeZone || undefined
    }).format(date);
  }

  function formatDate(date, timeZone) {
    var formatted = new Intl.DateTimeFormat('ru-RU', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      timeZone: timeZone || undefined
    }).format(date);
    return capitalize(formatted.replace(',', ''));
  }

  function formatStamp(iso) {
    if (!iso) return '';
    var date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    var now = new Date();
    var time = formatTime(date);
    if (date.toDateString() === now.toDateString()) return 'сегодня, ' + time;
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).format(date).replace(',', '');
  }

  function getTimezoneOffsetLabel(timeZone) {
    try {
      var parts = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        timeZoneName: 'longOffset'
      }).formatToParts(new Date());
      var value = parts.filter(function (part) { return part.type === 'timeZoneName'; })[0];
      return value ? value.value.replace('GMT', 'UTC') : 'UTC';
    } catch (error) {
      return 'UTC';
    }
  }

  function formatDuration(minutes) {
    if (minutes >= 90) {
      var hours = Math.floor(minutes / 60);
      var rest = minutes % 60;
      return hours + ' ч' + (rest ? ' ' + rest + ' мин' : '');
    }
    return minutes + ' мин';
  }

  function getSessionState(session) {
    var now = Date.now();
    var start = new Date(session.start).getTime();
    var end = start + session.durationMin * 60 * 1000;
    if (now > end) return { key: 'done', label: 'Завершено' };
    if (now >= start) return { key: 'live', label: 'В эфире' };
    return { key: 'upcoming', label: 'Скоро' };
  }

  function watchedCount() {
    return currentRace().sessions.filter(function (session) {
      return currentSessions()[session.id] === true;
    }).length;
  }

  function telegramProfileUrl(handle) {
    var clean = String(handle || '').replace(/^@/, '').replace(/[^a-zA-Z0-9_]/g, '');
    return clean ? 'https://t.me/' + clean : 'https://t.me/';
  }

  function shareText(friend) {
    var raceName = currentRace().nameRu;
    if (friend.status === 'watched') {
      return friend.name + ', я уже посмотрел ' + raceName + '. Разберём итоги? 🏁';
    }
    return friend.name + ', я смотрю ' + raceName + ' в лайве. Обсудим гонку? 🏎️';
  }

  function shareUrl(friend) {
    var clean = normalizeTelegram(friend.tg).replace(/^@/, '');
    var text = encodeURIComponent(shareText(friend));
    // Прямой чат с другом; Telegram подставляет текст там, где поддерживает ?text=.
    return clean ? 'https://t.me/' + clean + '?text=' + text
      : 'https://t.me/share/url?text=' + text;
  }

  function normalizeTelegram(value) {
    var clean = String(value || '').trim().replace(/\s+/g, '');
    clean = clean.replace(/^https?:\/\/(?:www\.)?(?:t\.me|telegram\.me)\//i, '');
    clean = clean.replace(/^@+/, '').replace(/[^a-zA-Z0-9_]/g, '');
    return clean ? '@' + clean.slice(0, 32) : '';
  }

  function makeId(prefix) {
    return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  }

  function motionBehavior() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  }

  /* ---------------------------------------------------------------- static */

  function buildRaceOptions() {
    el.raceSelect.innerHTML = DATA.races.map(function (race) {
      return '<option value="' + race.id + '">R' + race.round + ' · ' + esc(race.shortRu) + '</option>';
    }).join('');
  }

  function renderTimeMode() {
    var track = state.timeMode === 'track';
    $all('.time-mode__btn').forEach(function (button) {
      var active = button.dataset.timeMode === state.timeMode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    var race = currentRace();
    var userTz = getEffectiveTimezone();
    el.timeModeLabel.textContent = track ? 'Время на трассе' : 'Время в вашем поясе';
    el.tzInline.textContent = track ? race.localTimezone : userTz;
    el.timeModeHint.title = track
      ? 'Показано местное время трассы. Переключитесь на «Моё время», чтобы увидеть время браузера.'
      : 'Показано время вашего браузера. Переключитесь на «Время трассы», чтобы увидеть время на автодроме.';
  }

  function renderStatic() {
    var race = currentRace();
    el.gpRound.textContent = race.round;
    el.gpFormat.textContent = race.format;
    el.gpWeekend.textContent = race.weekendLabel;
    el.gpSeason.textContent = DATA.season;
    el.gpTitle.textContent = race.nameRu;
    el.gpNameEn.textContent = race.nameEn;
    el.gpCircuit.textContent = race.circuit;
    el.gpCountry.textContent = race.city + ', ' + race.country;
    el.predictorRound.textContent = 'R' + race.round;
    el.statLength.textContent = race.lengthKm.toFixed(3);
    el.statLaps.textContent = race.laps;
    el.statTurns.textContent = race.turns;
    el.statDistance.textContent = race.distanceKm.toFixed(1);
    el.resultsNote.textContent = 'Formula 1';
    el.watchedTotal.textContent = race.sessions.length;
    el.sessionList.setAttribute('aria-label', 'Сессии: ' + race.nameRu);
    el.raceSelect.value = race.id;

    var index = DATA.races.indexOf(race);
    el.prevRaceBtn.disabled = index <= 0;
    el.nextRaceBtn.disabled = index >= DATA.races.length - 1;
    el.raceSelect.title = 'R' + race.round + ' · ' + race.nameRu + ' · ' + race.weekendLabel;
    el.gpRoundMark.textContent = 'R' + race.round;

    renderTrack();
    renderTimeMode();
    document.title = 'F1 Paddock · ' + race.nameRu + ' · R' + race.round;
  }

  function trackData(race) {
    var data = (window.F1_TRACKS && window.F1_TRACKS[race.slug]) || {};
    return {
      image: data.image || '',
      corners: Array.isArray(data.corners) ? data.corners : [],
      note: data.note || ''
    };
  }

  function trackMetaLabel(race) {
    return race.lengthKm.toFixed(3) + ' км · ' + race.turns + ' поворотов · ' + lapsLabel(race.laps);
  }

  function renderTrack() {
    var race = currentRace();
    var track = trackData(race);
    var meta = trackMetaLabel(race);

    el.trackImage.src = track.image;
    el.trackImage.alt = 'Схема трассы ' + race.circuit + ' с номерами поворотов';
    el.trackSectionTitle.textContent = race.circuit;
    el.trackSectionMeta.textContent = meta;
    el.trackVisual.setAttribute('aria-label', 'Открыть карту трассы ' + race.circuit + ' и названия поворотов');
    el.trackDetailsBtn.textContent = track.corners.length
      ? 'Названия поворотов · ' + track.corners.length
      : 'Карта трассы и повороты';

    if (track.corners.length) {
      var preview = track.corners.slice(0, 3).map(function (corner) {
        return '<span class="track-chip"><b>' + esc(corner.turns) + '</b>' + esc(corner.name) + '</span>';
      }).join('');
      if (track.corners.length > 3) {
        preview += '<span class="track-chip"><b>+' + (track.corners.length - 3) + '</b> ещё</span>';
      }
      el.trackNamesPreview.innerHTML = preview;
    } else {
      el.trackNamesPreview.innerHTML = '<span class="track-copy__empty">' +
        esc(track.note || 'Исторических названий нет — используйте номера на схеме.') + '</span>';
    }
  }

  function renderTrackDialog() {
    var race = currentRace();
    var track = trackData(race);
    el.trackDialogTitle.textContent = race.circuit;
    el.trackDialogMeta.textContent = trackMetaLabel(race);
    el.trackDialogImage.src = track.image;
    el.trackDialogImage.alt = 'Схема трассы ' + race.circuit + ' с номерами поворотов';

    if (track.corners.length) {
      el.trackDialogLegend.innerHTML = track.corners.map(function (corner) {
        return '<div class="track-corner">' +
          '<span class="track-corner__turn">' + esc(corner.turns) + '</span>' +
          '<span class="track-corner__name">' + esc(corner.name) + '</span>' +
        '</div>';
      }).join('');
      el.trackDialogNote.textContent = track.note ||
        'Перечислены исторические названия; повороты без имени обозначены только номерами.';
    } else {
      el.trackDialogLegend.innerHTML = '<p class="track-legend-empty">' +
        esc(track.note || 'У этого автодрома нет устоявшихся названий поворотов.') +
        '</p>';
      el.trackDialogNote.textContent = 'Номера на схеме соответствуют официальной разметке трассы.';
    }
  }

  function openTrackDialog(trigger) {
    if (!el.trackDialog) return;
    renderTrackDialog();
    state.trackFocus = trigger || el.trackVisual;
    document.body.classList.add('modal-open');
    if (typeof el.trackDialog.showModal === 'function') {
      el.trackDialog.showModal();
    } else {
      el.trackDialog.setAttribute('open', '');
    }
    el.closeTrackBtn.focus();
  }

  function closeTrackDialog() {
    if (!el.trackDialog) return;
    if (typeof el.trackDialog.close === 'function') el.trackDialog.close();
    else el.trackDialog.removeAttribute('open');
    document.body.classList.remove('modal-open');
  }

  function selectRace(raceId) {
    var race = getRace(raceId);
    if (!race) return;
    if (race.id === state.raceId) {
      renderStatic();
      return;
    }

    state.raceId = race.id;
    STORE.saveSelectedRace(race.id);
    ensureRaceSessions(race.id);
    state.predictionEditing = false;
    state.unlockPrompted = false;

    renderStatic();
    renderSessions();
    renderProgress();
    renderResults();
    renderStatus();
    fillPredictionSelects(null);
    renderPrediction();
    renderFriends();
    renderTimeMode();
    toast('Этап сезона: ' + race.nameRu + '.', 'info', { icon: 'flag', duration: 2800 });
  }

  function setTimeMode(mode) {
    if (mode !== 'local' && mode !== 'track') return;
    if (mode === state.timeMode) return;
    state.timeMode = mode;
    STORE.savePrefs({ timeMode: mode });
    renderTimeMode();
    renderSessions();
  }

  function getEffectiveTimezone() {
    // Return user-selected timezone if set, otherwise browser default
    return state.userTimezone || USER_TIMEZONE;
  }

  function renderTimezone() {
    var tz = getEffectiveTimezone();
    var offset = getTimezoneOffsetLabel(tz);
    el.tzLabel.textContent = tz + ' · ' + offset;
    el.tzChip.title = 'Выбранный часовой пояс: ' + tz + ' (' + offset + ')';
    el.tzInline.textContent = tz;
  }

  function buildTimezoneOptions(filter) {
    filter = (filter || '').toLowerCase().trim();
    var tz = getEffectiveTimezone();

    el.tzListbox.innerHTML = TIMEZONE_OPTIONS
      .filter(function (option) {
        if (!filter) return true;
        var searchText = (option.value + ' ' + option.label + ' ' + option.cities).toLowerCase();
        return searchText.indexOf(filter) >= 0;
      })
      .map(function (option) {
        var selected = option.value === tz;
        return '' +
          '<button class="tz-dropdown__option' + (selected ? ' is-selected' : '') + '"' +
            ' role="option"' +
            ' data-tz-value="' + esc(option.value) + '"' +
            ' aria-selected="' + selected + '"' +
            ' tabindex="' + (selected ? '0' : '-1') + '">' +
            '<span class="tz-dropdown__option__label">' + esc(option.label) + (option.cities ? ' — ' + esc(option.cities) : '') + '</span>' +
            '<span class="tz-dropdown__option__offset">' + esc(option.label) + '</span>' +
          '</button>';
      })
      .join('');
  }

  function toggleTimezoneDropdown() {
    if (state.tzDropdownOpen) {
      closeTimezoneDropdown();
    } else {
      openTimezoneDropdown();
    }
  }

  function openTimezoneDropdown() {
    state.tzDropdownOpen = true;
    el.tzDropdown.setAttribute('aria-expanded', 'true');
    el.tzPanel.hidden = false;
    el.tzChip.setAttribute('aria-expanded', 'true');
    buildTimezoneOptions('');
    el.tzSearch.value = '';
    el.tzSearch.focus();

    // Focus the selected option
    var selected = el.tzListbox.querySelector('[aria-selected="true"]');
    if (selected) selected.focus();
  }

  function closeTimezoneDropdown() {
    state.tzDropdownOpen = false;
    el.tzDropdown.setAttribute('aria-expanded', 'false');
    el.tzPanel.hidden = true;
    el.tzChip.setAttribute('aria-expanded', 'false');
    el.tzSearch.value = '';
  }

  function filterTimezoneOptions(filter) {
    buildTimezoneOptions(filter);
    // Focus first visible option
    var first = el.tzListbox.querySelector('[data-tz-value]');
    if (first) first.focus();
  }

  function selectTimezone(tzValue) {
    var option = TIMEZONE_OPTIONS.find(function (o) { return o.value === tzValue; });
    if (!option) return;

    state.userTimezone = tzValue;
    STORE.savePrefs({ timeMode: state.timeMode, userTimezone: tzValue });
    renderTimezone();
    renderSessions();
    renderTimeMode();
    closeTimezoneDropdown();
    toast('Часовой пояс изменён на ' + option.label + '.', 'success', { icon: 'globe' });
  }

  function applyTeam(teamId) {
    var team = getTeam(teamId);
    document.documentElement.setAttribute('data-team', team.id);
    el.profileTeamName.textContent = team.name;
    el.profileTeam.style.setProperty('--team-color', team.accent);
    el.profileTeam.title = team.fullName;
  }

  function renderProfile() {
    var profile = state.profile;
    var team = getTeam(profile.team);
    el.profileName.textContent = profile.name;
    el.profileAvatar.textContent = initials(profile.name);
    applyTeam(team.id);
    el.profileButton.setAttribute('aria-label', 'Изменить профиль: ' + profile.name + ', команда ' + team.name);
  }

  function renderSessions() {
    var race = currentRace();
    var watchedMap = ensureRaceSessions(race.id);
    var trackMode = state.timeMode === 'track';
    var userTz = getEffectiveTimezone();
    var primaryZone = trackMode ? race.localTimezone : userTz;
    var secondaryZone = trackMode ? userTz : race.localTimezone;
    var secondaryLabel = trackMode ? 'у вас' : 'на трассе';

    el.sessionList.innerHTML = race.sessions.map(function (session) {
      var watched = watchedMap[session.id] === true;
      var sessionState = getSessionState(session);
      var start = new Date(session.start);
      var end = new Date(start.getTime() + session.durationMin * 60 * 1000);
      var secondaryTime = formatTime(start, secondaryZone);
      var stateBadge = sessionState.key === 'live'
        ? '<span class="session-state state--live"><i class="pulse-dot" aria-hidden="true"></i>В эфире</span>'
        : '<span class="session-state state--' + sessionState.key + '">' + sessionState.label + '</span>';
      var subtitle = session.subtitle ? esc(session.subtitle) + ' · ' : '';

      return '' +
        '<li class="session' + (watched ? ' is-watched' : '') + '" data-session-id="' + session.id + '" data-state="' + sessionState.key + '">' +
          '<span class="session__code" aria-hidden="true">' + esc(session.code) + '</span>' +
          '<div class="session__main">' +
            '<div class="session__title-row">' +
              '<h3 class="session__name">' + esc(session.name) + '</h3>' +
              stateBadge +
            '</div>' +
            '<p class="session__sub">' + subtitle + formatDuration(session.durationMin) + '</p>' +
          '</div>' +
          '<div class="session__when">' +
            '<span class="session__date">' + esc(formatDate(start, primaryZone)) + '</span>' +
            '<span class="session__time">' + formatTime(start, primaryZone) + '–' + formatTime(end, primaryZone) + '</span>' +
          '</div>' +
          '<div class="session__track">' +
            '<span class="session__track-label">' + secondaryLabel + '</span>' +
            '<span class="session__track-time">' + secondaryTime + '</span>' +
          '</div>' +
          '<label class="session__toggle">' +
            '<input class="session__checkbox" type="checkbox" data-session-toggle="' + session.id + '"' + (watched ? ' checked' : '') + ' aria-label="Посмотрел: ' + esc(session.name) + '">' +
            '<span class="checkbox" aria-hidden="true">' + icon('check') + '</span>' +
            '<span class="session__toggle-text">Посмотрел</span>' +
          '</label>' +
        '</li>';
    }).join('');
  }

  function refreshSessionStates() {
    currentRace().sessions.forEach(function (session) {
      var row = el.sessionList.querySelector('[data-session-id="' + session.id + '"]');
      if (!row) return;
      var sessionState = getSessionState(session);
      row.setAttribute('data-state', sessionState.key);
      var badge = row.querySelector('.session-state');
      if (!badge) return;
      if (sessionState.key === 'live') {
        badge.className = 'session-state state--live';
        badge.innerHTML = '<i class="pulse-dot" aria-hidden="true"></i>В эфире';
      } else {
        badge.className = 'session-state state--' + sessionState.key;
        badge.textContent = sessionState.label;
      }
    });
  }

  function renderProgress() {
    var race = currentRace();
    var total = race.sessions.length;
    var count = watchedCount();
    var remaining = total - count;

    el.watchedCount.textContent = count;
    el.progressBar.setAttribute('aria-valuemax', String(total));
    el.progressBar.setAttribute('aria-valuenow', String(count));
    var watchedMap = currentSessions();
    el.progressBar.innerHTML = race.sessions.map(function (session) {
      return '<span class="progress__segment' + (watchedMap[session.id] === true ? ' is-filled' : '') + '"></span>';
    }).join('');

    if (count === total) {
      el.progressHint.textContent = 'Уикенд закрыт. Можно обсуждать без ограничений.';
    } else if (count === 0) {
      el.progressHint.textContent = 'Отметьте первую сессию — прогресс появится здесь.';
    } else if (remaining === 1) {
      el.progressHint.textContent = 'Осталась одна сессия — вы почти у цели.';
    } else {
      el.progressHint.textContent = 'Ещё ' + remaining + ' из ' + total + ' сессий впереди.';
    }
  }

  function renderResults() {
    var race = currentRace();
    var show = hasOfficialResults(race);
    el.resultsPanel.hidden = !show;
    el.resultsPanel.classList.toggle('has-results', show);
    el.resultsPanel.classList.remove('is-pending');

    if (!show) {
      el.resultsBody.innerHTML = '';
      updateResultsMask();
      return;
    }

    var podium = race.results.slice().sort(function (a, b) {
      return a.position - b.position;
    });

    var rows = podium.map(function (entry) {
      var driver = getDriver(entry.driverId);
      if (!driver) return '';
      var team = getTeam(driver.teamId);
      return '' +
        '<div class="podium__row" data-position="' + entry.position + '">' +
          '<span class="podium__pos">' + entry.position + '</span>' +
          '<span class="podium__bar" style="background:linear-gradient(180deg,' + team.accent + ',' + team.accent2 + ')" aria-hidden="true"></span>' +
          '<span class="podium__driver">' +
            '<strong>' + esc(driverName(driver)) + '</strong>' +
            '<small>' + esc(team.name) + ' · #' + driver.number + '</small>' +
          '</span>' +
          '<span class="podium__result">' + esc(entry.gap) + '</span>' +
        '</div>';
    }).join('');

    el.resultsBody.innerHTML = '<div class="podium">' + rows + '</div>' +
      '<p class="results__source">Официальный результат · Formula 1</p>';
    updateResultsMask();
  }

  function updateResultsMask() {
    var race = currentRace();
    var show = !el.resultsPanel.hidden && hasOfficialResults(race);
    var watched = raceWatched(race);
    var masked = show && (!watched || state.status.mode === 'recording');

    el.resultsPanel.classList.toggle('is-masked', masked);
    el.resultsPanel.dataset.masked = String(masked);

    try {
      el.resultsBody.inert = masked;
    } catch (error) {
      /* inert не критичен для работы */
    }
    if (masked) el.resultsBody.setAttribute('aria-hidden', 'true');
    else el.resultsBody.removeAttribute('aria-hidden');

    if (!show) return;

    if (!watched) {
      el.resultsVeilTitle.textContent = 'Гонка не отмечена';
      el.resultsVeilText.textContent = 'Поставьте галочку у гонки в чек-листе или нажмите «Я посмотрел», чтобы открыть официальный подиум.';
      el.revealResultsBtn.hidden = false;
      el.revealResultsBtn.textContent = 'Я посмотрел';
      el.revealResultsBtn.dataset.resultsAction = 'mark-watched';
    } else if (state.status.mode === 'recording') {
      el.resultsVeilTitle.textContent = 'Spoiler Shield активен';
      el.resultsVeilText.textContent = 'Гонка отмечена, но режим «Без спойлеров» всё ещё включён.';
      el.revealResultsBtn.hidden = false;
      el.revealResultsBtn.textContent = 'Открыть итоги';
      el.revealResultsBtn.dataset.resultsAction = 'open';
    } else {
      el.revealResultsBtn.hidden = true;
    }
  }

  function renderStatus() {
    var mode = state.status.mode;
    var meta = STATUS_META[mode] || STATUS_META.recording;

    document.documentElement.setAttribute('data-spoiler', mode);

    $all('.segmented__btn', el.statusControl).forEach(function (button) {
      var active = button.dataset.mode === mode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-checked', String(active));
      button.tabIndex = active ? 0 : -1;
    });

    el.statusControl.dataset.mode = mode;
    el.shieldBadge.dataset.mode = mode;
    el.shieldBadge.textContent = meta.emoji + ' ' + meta.badge;
    el.shieldBadge.title = 'Текущий статус: ' + meta.title;
    el.headerShield.dataset.mode = mode;
    el.headerShieldText.textContent = meta.header;
    el.headerShield.title = 'Spoiler Shield: ' + meta.title;
    el.shieldDetail.dataset.mode = mode;
    el.shieldDetailEmoji.textContent = meta.emoji;
    el.shieldDetailTitle.textContent = meta.title;

    var race = currentRace();
    var finished = raceFinished(race);
    var watched = raceWatched(race);
    var detailText = meta.text;
    if (!finished) {
      detailText = 'Гонка ещё впереди. Результаты появятся только после финиша.';
    } else if (!watched) {
      detailText = mode === 'recording'
        ? 'Результаты скрыты: гонка ещё не отмечена просмотренной.'
        : 'Отметьте гонку просмотренной, чтобы открыть официальный подиум.';
    } else if (mode === 'recording') {
      detailText = 'Гонка отмечена, но Spoiler Shield всё ещё скрывает итоги.';
    }
    el.shieldDetailText.textContent = detailText;

    if (state.status.updatedAt) {
      el.statusUpdatedAt.textContent = formatStamp(state.status.updatedAt);
      el.statusUpdatedAt.dateTime = state.status.updatedAt;
      el.statusUpdatedAt.title = 'Статус сохранён: ' + state.status.updatedAt;
    } else {
      el.statusUpdatedAt.textContent = 'только что';
      el.statusUpdatedAt.removeAttribute('datetime');
    }

    updateResultsMask();
  }

  function setStatus(mode) {
    if (!STATUS_META[mode]) return;
    if (mode === state.status.mode) return;

    state.status = STORE.saveStatus(mode);
    state.unlockPrompted = false;
    renderStatus();

    var meta = STATUS_META[mode];
    toast(meta.toast, meta.tone, { icon: mode === 'recording' ? 'shield' : 'check' });
  }

  /* ------------------------------------------------------------------ API */

  function updateSourceUI() {
    var api = state.api;
    var stateName = api.status;
    var label = 'Синхронизация…';
    var title = 'Проверяем доступность Jolpica API';
    var gpText = 'Проверяем Jolpica API…';

    if (stateName === 'api') {
      label = 'Jolpica API';
      title = 'Источник: Jolpica API · сезон ' + api.season + ', раунд ' + api.round;
      gpText = 'Jolpica API · сезон ' + api.season + ', раунд ' + api.round;
    } else if (stateName === 'offline') {
      label = 'Офлайн';
      title = 'Нет сети — используется встроенный снимок данных';
      gpText = 'Офлайн-режим · локальный кэш';
    } else if (stateName === 'fallback') {
      label = 'Локальный кэш';
      title = api.error === 'timeout'
        ? 'Jolpica API не ответила за 2 секунды — используется локальный снимок'
        : 'Jolpica API недоступна — используется локальный снимок';
      gpText = 'Локальный кэш · Jolpica недоступна';
    } else if (api.manual) {
      label = 'Обновление…';
      title = 'Запрашиваем свежие данные у Jolpica API';
      gpText = 'Обновляем данные…';
    }

    el.sourcePill.dataset.state = stateName;
    el.sourceLabel.textContent = label;
    el.sourcePill.title = title;
    el.gpSourceDot.dataset.state = stateName;
    el.gpSourceText.textContent = gpText;
  }

  function syncApi(manual) {
    var controller = new AbortController();
    var timer = window.setTimeout(function () {
      controller.abort();
    }, window.F1_API_TIMEOUT_MS || 2000);

    state.api = {
      status: 'loading',
      manual: Boolean(manual),
      season: null,
      round: null,
      error: null
    };
    updateSourceUI();

    return fetch(window.F1_API_URL, {
      signal: controller.signal,
      mode: 'cors',
      cache: 'no-store',
      headers: { Accept: 'application/json' }
    })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(function (payload) {
        var races = payload && payload.MRData && payload.MRData.RaceTable && payload.MRData.RaceTable.Races;
        if (!Array.isArray(races) || !races.length) {
          throw new Error('Пустой ответ API');
        }
        var race = races[0];
        state.api = {
          status: 'api',
          manual: Boolean(manual),
          season: race.season || DATA.season,
          round: race.round || currentRace().round,
          error: null
        };
        updateSourceUI();
        if (manual) {
          toast('Jolpica API ответила: сезон ' + state.api.season + ', раунд ' + state.api.round + '.', 'success', { icon: 'globe' });
        }
      })
      .catch(function (error) {
        state.api = {
          status: navigator.onLine === false ? 'offline' : 'fallback',
          manual: Boolean(manual),
          season: null,
          round: null,
          error: error && error.name === 'AbortError' ? 'timeout' : 'network'
        };
        updateSourceUI();
        if (manual) {
          toast(
            error && error.name === 'AbortError'
              ? 'Jolpica не ответила за 2 секунды. Работаем на локальном кэше.'
              : 'Jolpica недоступна. Работаем на локальном кэше.',
            'warn',
            { icon: 'info' }
          );
        }
      })
      .finally(function () {
        window.clearTimeout(timer);
      });
  }

  /* -------------------------------------------------------------- profile */

  function renderTeamGrid() {
    el.teamGrid.innerHTML = DATA.teams.map(function (team) {
      var selected = team.id === state.selectedTeam;
      return '' +
        '<button type="button" class="team-option' + (selected ? ' is-selected' : '') + '"' +
          ' data-team-option="' + team.id + '"' +
          ' aria-pressed="' + selected + '"' +
          ' style="--team-color:' + team.accent + ';--team-color-2:' + team.accent2 + ';--team-ink:' + team.ink + '">' +
          '<span class="team-option__swatch" aria-hidden="true"></span>' +
          '<span class="team-option__name">' + esc(team.name) + '</span>' +
          '<span class="team-option__check" aria-hidden="true">' + icon('check') + '</span>' +
        '</button>';
    }).join('');
  }

  function setPageInert(isInert) {
    ['.site-header', 'main', '.site-footer', '.skip-link'].forEach(function (selector) {
      var node = $(selector);
      if (node) node.inert = isInert;
    });
  }

  function openProfileModal(mode) {
    if (!el.profileModal.hidden || state.modalClosing) return;

    state.modalMode = mode;
    state.selectedTeam = state.profile.team;
    var focusSource = document.activeElement;
    state.lastFocus = focusSource && focusSource !== document.body && typeof focusSource.focus === 'function'
      ? focusSource
      : el.profileButton;

    var onboarding = mode === 'onboarding';
    el.profileModalEyebrow.textContent = onboarding ? 'Mock-авторизация' : 'Профиль болельщика';
    el.profileModalTitle.textContent = onboarding ? 'Вход в паддок' : 'Изменить профиль';
    el.profileModalDesc.textContent = onboarding
      ? 'Представьтесь и выберите команду. Это mock-вход: без пароля, e-mail и сервера.'
      : 'Смените никнейм или любимую команду — акцент интерфейса обновится сразу.';
    el.skipProfileBtn.textContent = onboarding ? 'Пропустить' : 'Отмена';
    el.saveProfileBtn.textContent = onboarding ? 'Войти в паддок' : 'Сохранить';

    el.profileNameInput.value = onboarding && state.profile.name === 'Гонщик' ? '' : state.profile.name;
    el.profileNameError.hidden = true;
    el.profileNameInput.classList.remove('is-invalid');
    el.profileNameInput.setAttribute('aria-invalid', 'false');
    renderTeamGrid();
    applyTeam(state.profile.team);

    el.profileModal.hidden = false;
    document.body.classList.add('modal-open');
    setPageInert(true);
    window.requestAnimationFrame(function () {
      el.profileModal.classList.add('is-open');
      var dialog = $('.modal__dialog', el.profileModal);
      if (dialog) dialog.focus();
      if (onboarding) {
        el.profileNameInput.focus();
      } else {
        el.profileNameInput.focus();
        el.profileNameInput.select();
      }
    });
  }

  function markOnboarded() {
    if (!state.profile.onboarded) {
      state.profile = STORE.saveProfile({ onboarded: true });
    }
  }

  function closeProfileModal(skipOnboarding) {
    if (el.profileModal.hidden || state.modalClosing) return;

    var wasOnboarding = state.modalMode === 'onboarding';
    if (wasOnboarding && skipOnboarding) markOnboarded();

    state.modalClosing = true;
    el.profileModal.classList.add('is-closing');
    document.body.classList.remove('modal-open');
    applyTeam(state.profile.team);

    window.clearTimeout(modalCloseTimer);
    modalCloseTimer = window.setTimeout(function () {
      el.profileModal.hidden = true;
      el.profileModal.classList.remove('is-open', 'is-closing');
      state.modalClosing = false;
      state.modalMode = null;
      setPageInert(false);
      if (state.lastFocus && typeof state.lastFocus.focus === 'function') {
        state.lastFocus.focus();
      } else {
        el.profileButton.focus();
      }
    }, 170);
  }

  /* --------------------------------------------------------------- friend */

  function friendCard(friend) {
    var meta = FRIEND_META[friend.status] || FRIEND_META.watched;
    var isNew = state.newFriendId === friend.id;
    var handle = normalizeTelegram(friend.tg) || friend.tg;
    var action;

    if (friend.status === 'recording') {
      action = '' +
        '<button class="btn btn--sm btn--locked" type="button" disabled aria-describedby="lock-' + esc(friend.id) + '">' +
          icon('lock') + 'Чат закрыт' +
        '</button>';
    } else {
      action = '' +
        '<a class="btn btn--sm btn--tg"' +
          ' href="' + esc(shareUrl(friend)) + '"' +
          ' target="_blank" rel="noopener noreferrer">' +
          icon('telegram') + 'Обсудить в TG' +
        '</a>';
    }

    var shieldLine = friend.status === 'recording'
      ? '<p class="friend-card__shield" id="lock-' + esc(friend.id) + '">' +
          icon('lock') +
          '<span>🤫 Смотрит в записи. Чат закрыт от спойлеров</span>' +
        '</p>'
      : '';

    return '' +
      '<article class="friend-card' + (isNew ? ' is-new' : '') + '" data-status="' + friend.status + '" data-friend-id="' + esc(friend.id) + '">' +
        '<div class="friend-card__top">' +
          '<span class="avatar avatar--friend" style="--avatar-h:' + avatarHue(friend.name) + '" aria-hidden="true">' + esc(initials(friend.name)) + '</span>' +
          '<div class="friend-card__id">' +
            '<h3>' + esc(friend.name) + '</h3>' +
            '<a href="' + esc(telegramProfileUrl(handle)) + '" target="_blank" rel="noopener noreferrer">' + esc(handle) + '</a>' +
          '</div>' +
          '<span class="friend-badge" data-status="' + friend.status + '"><i aria-hidden="true"></i>' + meta.label + '</span>' +
        '</div>' +
        '<p class="friend-card__note">' + esc(friend.note || meta.note) + '</p>' +
        shieldLine +
        '<div class="friend-card__action">' +
          action +
          '<button class="icon-btn icon-btn--danger friend-card__remove" type="button" data-remove-friend="' + esc(friend.id) + '" aria-label="Удалить ' + esc(friend.name) + ' из паддока" title="Удалить друга">' +
            icon('trash') +
          '</button>' +
        '</div>' +
      '</article>';
  }

  function renderFriends() {
    el.friendsCount.textContent = state.friends.length;

    if (!state.friends.length) {
      el.friendsGrid.innerHTML = '' +
        '<div class="friends-empty">' +
          '<span class="friends-empty__icon" aria-hidden="true">' + icon('user') + '</span>' +
          '<div><strong>В паддоке пока тихо</strong>' +
          '<p>Добавьте друга через форму ниже — статус защитит вас от спойлеров.</p></div>' +
        '</div>';
      return;
    }

    el.friendsGrid.innerHTML = state.friends.map(friendCard).join('');
    if (state.newFriendId) {
      var createdId = state.newFriendId;
      window.setTimeout(function () {
        if (state.newFriendId === createdId) state.newFriendId = null;
      }, 1400);
    }
  }

  function addFriend(event) {
    event.preventDefault();

    var name = el.friendName.value.replace(/\s+/g, ' ').trim().slice(0, 24);
    var tg = normalizeTelegram(el.friendTg.value);
    var status = el.friendStatus.value;

    el.friendError.hidden = true;
    el.friendName.classList.remove('is-invalid');
    el.friendTg.classList.remove('is-invalid');
    el.friendName.setAttribute('aria-invalid', 'false');
    el.friendTg.setAttribute('aria-invalid', 'false');

    if (name.length < 2) {
      showFriendError('Имя должно содержать минимум 2 символа.', el.friendName);
      return;
    }
    if (!tg || tg.length < 3) {
      showFriendError('Укажите Telegram-ник: латиница, цифры или подчёркивание.', el.friendTg);
      return;
    }
    if (!FRIEND_META[status]) {
      showFriendError('Выберите статус друга.', el.friendStatus);
      return;
    }
    var duplicate = state.friends.some(function (friend) {
      return normalizeTelegram(friend.tg).toLowerCase() === tg.toLowerCase();
    });
    if (duplicate) {
      showFriendError('Друг с таким Telegram-ником уже в паддоке.', el.friendTg);
      return;
    }

    var friend = {
      id: makeId('friend'),
      name: name,
      tg: tg,
      status: status,
      note: FRIEND_META[status].note,
      createdAt: new Date().toISOString(),
      mock: false
    };

    state.friends = state.friends.concat(friend);
    STORE.saveFriends(state.friends);
    state.newFriendId = friend.id;
    renderFriends();

    el.friendForm.reset();
    el.friendStatus.value = 'live';
    el.friendName.focus();
    toast('Друг добавлен: ' + name + '.', 'success', { icon: 'user' });

    if (!STORE.isAvailable()) {
      toast('localStorage недоступен: изменения не сохранятся после перезагрузки.', 'warn', { icon: 'warning' });
    }
  }

  function showFriendError(message, field) {
    el.friendError.textContent = message;
    el.friendError.hidden = false;
    if (field) {
      field.classList.add('is-invalid');
      field.setAttribute('aria-invalid', 'true');
      field.focus();
    }
  }

  function removeFriend(friendId) {
    var index = state.friends.findIndex(function (friend) { return friend.id === friendId; });
    if (index < 0) return;

    var removed = state.friends[index];
    state.friends = state.friends.slice(0, index).concat(state.friends.slice(index + 1));
    STORE.saveFriends(state.friends);
    renderFriends();

    toast('Друг удалён: ' + removed.name, 'info', {
      icon: 'trash',
      duration: 6500,
      action: {
        label: 'Вернуть',
        onClick: function () {
          var insertAt = Math.min(index, state.friends.length);
          state.friends = state.friends.slice(0, insertAt).concat([removed], state.friends.slice(insertAt));
          STORE.saveFriends(state.friends);
          renderFriends();
          toast('Возвращён в паддок: ' + removed.name, 'success', { icon: 'undo' });
        }
      }
    });
  }

  /* ------------------------------------------------------------- predictor */

  function buildDriverOptions() {
    var groups = DATA.teams.map(function (team) {
      var drivers = DATA.drivers.filter(function (driver) { return driver.teamId === team.id; });
      if (!drivers.length) return '';
      return '<optgroup label="' + esc(team.name) + '">' + drivers.map(function (driver) {
        return '<option value="' + driver.id + '">#' + driver.number + ' ' + esc(driverName(driver)) + '</option>';
      }).join('') + '</optgroup>';
    }).join('');

    [el.p1Select, el.p2Select, el.p3Select].forEach(function (select) {
      select.innerHTML = '<option value="">Выберите пилота</option>' + groups;
    });
  }

  function predictionValues() {
    return {
      p1: el.p1Select.value,
      p2: el.p2Select.value,
      p3: el.p3Select.value
    };
  }

  function markDuplicateSelects(values) {
    var counts = {};
    Object.keys(values).forEach(function (key) {
      if (values[key]) counts[values[key]] = (counts[values[key]] || 0) + 1;
    });
    [el.p1Select, el.p2Select, el.p3Select].forEach(function (select) {
      select.classList.remove('is-invalid');
      if (select.value && counts[select.value] > 1) select.classList.add('is-invalid');
    });
  }

  function updatePredictionHint() {
    var values = predictionValues();
    var selected = [values.p1, values.p2, values.p3].filter(Boolean);
    var unique = selected.filter(function (value, index, list) { return list.indexOf(value) === index; });

    el.predictionHint.classList.remove('is-error', 'is-ready');
    [el.p1Select, el.p2Select, el.p3Select].forEach(function (select) {
      select.classList.remove('is-invalid');
    });

    if (selected.length < 3) {
      el.predictionHint.textContent = 'Выберите трёх разных пилотов.';
      return;
    }
    if (unique.length < 3) {
      el.predictionHint.textContent = 'Пилот не может занимать две позиции. Выберите другого.';
      el.predictionHint.classList.add('is-error');
      markDuplicateSelects(values);
      return;
    }
    el.predictionHint.textContent = 'Готово к фиксации. Прогноз сохранится локально.';
    el.predictionHint.classList.add('is-ready');
  }

  function renderSavedPrediction(prediction) {
    var rows = ['p1', 'p2', 'p3'].map(function (key, index) {
      var driver = getDriver(prediction[key]);
      var team = driver ? getTeam(driver.teamId) : getTeam('ferrari');
      return '' +
        '<div class="saved-podium__row">' +
          '<span class="saved-podium__pos">P' + (index + 1) + '</span>' +
          '<span class="saved-podium__bar" style="background:linear-gradient(180deg,' + team.accent + ',' + team.accent2 + ')" aria-hidden="true"></span>' +
          '<span class="saved-podium__driver">' +
            '<strong>' + esc(driverName(driver)) + '</strong>' +
            '<small>' + esc(team.name) + (driver ? ' · #' + driver.number : '') + '</small>' +
          '</span>' +
        '</div>';
    }).join('');

    el.savedPrediction.innerHTML = '' +
      '<div class="saved-prediction__head">' +
        '<span class="tag tag--success">' + icon('check') + 'зафиксирован</span>' +
        '<time class="saved-prediction__time">' + esc(formatStamp(prediction.savedAt)) + '</time>' +
      '</div>' +
      '<div class="saved-podium">' + rows + '</div>' +
      '<div class="saved-prediction__actions">' +
        '<button class="btn btn--secondary btn--sm" type="button" data-prediction-action="edit">' + icon('edit') + 'Изменить</button>' +
        '<button class="btn btn--ghost btn--sm btn--danger-text" type="button" data-prediction-action="clear">Сбросить</button>' +
      '</div>';
  }

  function fillPredictionSelects(prediction) {
    el.p1Select.value = prediction ? prediction.p1 : '';
    el.p2Select.value = prediction ? prediction.p2 : '';
    el.p3Select.value = prediction ? prediction.p3 : '';
    updatePredictionHint();
  }

  function renderPrediction() {
    var prediction = currentPrediction();
    var editing = state.predictionEditing;
    var showForm = !prediction || editing;

    el.predictionFormWrap.hidden = !showForm;
    el.savedPrediction.hidden = showForm;

    if (showForm) {
      if (prediction && editing) {
        fillPredictionSelects(prediction);
      } else {
        updatePredictionHint();
      }
      return;
    }

    renderSavedPrediction(prediction);
  }

  function savePrediction(event) {
    event.preventDefault();
    var values = predictionValues();
    var selected = [values.p1, values.p2, values.p3].filter(Boolean);
    var unique = selected.filter(function (value, index, list) { return list.indexOf(value) === index; });

    if (selected.length < 3) {
      updatePredictionHint();
      el.predictionHint.classList.add('is-error');
      el.predictionHint.textContent = 'Заполните все три позиции.';
      var empty = [el.p1Select, el.p2Select, el.p3Select].filter(function (select) { return !select.value; })[0];
      if (empty) empty.focus();
      toast('Прогноз не сохранён: заполните все три позиции.', 'error', { icon: 'warning' });
      return;
    }
    if (unique.length < 3) {
      updatePredictionHint();
      markDuplicateSelects(values);
      toast('Пилот не может занимать две позиции.', 'error', { icon: 'warning' });
      return;
    }

    var saved = STORE.savePrediction(state.raceId, values);
    if (!saved) {
      toast('Не удалось сохранить прогноз. Проверьте выбранных пилотов.', 'error', { icon: 'warning' });
      return;
    }
    state.predictions[state.raceId] = saved;
    state.predictionEditing = false;
    renderPrediction();
    toast('Прогноз зафиксирован. Удачи на старте!', 'success', { icon: 'trophy' });
  }

  function editPrediction() {
    if (!currentPrediction()) return;
    state.predictionEditing = true;
    renderPrediction();
    window.setTimeout(function () {
      el.p1Select.focus();
      el.predictionFormWrap.scrollIntoView({ behavior: motionBehavior(), block: 'nearest' });
    }, 30);
  }

  function clearPrediction() {
    STORE.clearPrediction(state.raceId);
    delete state.predictions[state.raceId];
    state.predictionEditing = false;
    fillPredictionSelects(null);
    renderPrediction();
    toast('Прогноз сброшен. Можно собрать новый.', 'info', { icon: 'refresh' });
  }

  /* ----------------------------------------------------------------- init */

  function cacheElements() {
    el.sourcePill = $('#sourcePill');
    el.sourceLabel = $('#sourceLabel');
    el.tzChip = $('#tzChip');
    el.tzLabel = $('#tzLabel');
    el.tzDropdown = $('#tzDropdown');
    el.tzPanel = $('#tzPanel');
    el.tzSearch = $('#tzSearch');
    el.tzListbox = $('#tzListbox');
    el.profileButton = $('#profileButton');
    el.profileAvatar = $('#profileAvatar');
    el.profileName = $('#profileName');
    el.profileTeam = $('#profileTeam');
    el.profileTeamName = $('#profileTeamName');
    el.headerShield = $('#headerShield');
    el.headerShieldText = $('#headerShieldText');

    el.gpRound = $('#gpRound');
    el.gpFormat = $('#gpFormat');
    el.gpWeekend = $('#gpWeekend');
    el.gpSeason = $('#gpSeason');
    el.gpTitle = $('#gpTitle');
    el.gpNameEn = $('#gpNameEn');
    el.gpCircuit = $('#gpCircuit');
    el.gpCountry = $('#gpCountry');
    el.statLength = $('#statLength');
    el.statLaps = $('#statLaps');
    el.statTurns = $('#statTurns');
    el.statDistance = $('#statDistance');
    el.resultsNote = $('#resultsNote');
    el.predictorRound = $('#predictorRound');
    el.raceSelect = $('#raceSelect');
    el.prevRaceBtn = $('#prevRaceBtn');
    el.nextRaceBtn = $('#nextRaceBtn');
    el.gpRoundMark = $('#gpRoundMark');
    el.trackVisual = $('#trackVisual');
    el.trackImage = $('#trackImage');
    el.trackSectionTitle = $('#trackSectionTitle');
    el.trackSectionMeta = $('#trackSectionMeta');
    el.trackNamesPreview = $('#trackNamesPreview');
    el.trackDetailsBtn = $('#trackDetailsBtn');
    el.trackDialog = $('#trackDialog');
    el.trackDialogTitle = $('#trackDialogTitle');
    el.trackDialogMeta = $('#trackDialogMeta');
    el.trackDialogImage = $('#trackDialogImage');
    el.trackDialogLegend = $('#trackDialogLegend');
    el.trackDialogNote = $('#trackDialogNote');
    el.closeTrackBtn = $('#closeTrackBtn');
    el.tzInline = $('#tzInline');
    el.timeModeControl = $('#timeModeControl');
    el.timeModeHint = $('#timeModeHint');
    el.timeModeLabel = $('#timeModeLabel');

    el.sessionList = $('#sessionList');
    el.progressBar = $('#progressBar');
    el.progressHint = $('#progressHint');
    el.watchedCount = $('#watchedCount');
    el.watchedTotal = $('#watchedTotal');

    el.resultsPanel = $('#resultsPanel');
    el.resultsBody = $('#resultsBody');
    el.resultsVeil = $('#resultsVeil');
    el.resultsVeilTitle = $('#resultsVeilTitle');
    el.resultsVeilText = $('#resultsVeilText');
    el.revealResultsBtn = $('#revealResultsBtn');
    el.gpSourceDot = $('#gpSourceDot');
    el.gpSourceText = $('#gpSourceText');
    el.refreshDataBtn = $('#refreshDataBtn');

    el.statusControl = $('#statusControl');
    el.shieldBadge = $('#shieldBadge');
    el.shieldDetail = $('#shieldDetail');
    el.shieldDetailEmoji = $('#shieldDetailEmoji');
    el.shieldDetailTitle = $('#shieldDetailTitle');
    el.shieldDetailText = $('#shieldDetailText');
    el.statusUpdatedAt = $('#statusUpdatedAt');

    el.predictionForm = $('#predictionForm');
    el.predictionFormWrap = $('#predictionFormWrap');
    el.p1Select = $('#p1Select');
    el.p2Select = $('#p2Select');
    el.p3Select = $('#p3Select');
    el.predictionHint = $('#predictionHint');
    el.savedPrediction = $('#savedPrediction');
    el.savePredictionBtn = $('#savePredictionBtn');

    el.friendsGrid = $('#friendsGrid');
    el.friendsCount = $('#friendsCount');
    el.friendForm = $('#friendForm');
    el.friendName = $('#friendName');
    el.friendTg = $('#friendTg');
    el.friendStatus = $('#friendStatus');
    el.friendError = $('#friendError');

    el.profileModal = $('#profileModal');
    el.profileModalEyebrow = $('#profileModalEyebrow');
    el.profileModalTitle = $('#profileModalTitle');
    el.profileModalDesc = $('#profileModalDesc');
    el.profileNameInput = $('#profileNameInput');
    el.profileNameError = $('#profileNameError');
    el.teamGrid = $('#teamGrid');
    el.skipProfileBtn = $('#skipProfileBtn');
    el.saveProfileBtn = $('#saveProfileBtn');

    el.storageWarning = $('#storageWarning');
    el.toastRegion = $('#toastRegion');
  }

  function applyInitialState() {
    el.progressHint.setAttribute('aria-live', 'polite');
    el.predictionHint.setAttribute('aria-live', 'polite');
    if (!STORE.isAvailable()) {
      el.storageWarning.hidden = false;
    }
  }

  function bindEvents() {
    el.profileButton.addEventListener('click', function () {
      openProfileModal('edit');
    });

    el.trackVisual.addEventListener('click', function () {
      openTrackDialog(el.trackVisual);
    });

    el.trackDetailsBtn.addEventListener('click', function () {
      openTrackDialog(el.trackDetailsBtn);
    });

    el.closeTrackBtn.addEventListener('click', closeTrackDialog);

    el.trackDialog.addEventListener('click', function (event) {
      if (event.target === el.trackDialog) closeTrackDialog();
    });

    el.trackDialog.addEventListener('close', function () {
      document.body.classList.remove('modal-open');
      if (state.trackFocus && typeof state.trackFocus.focus === 'function') {
        state.trackFocus.focus();
      }
    });

    el.profileModal.addEventListener('click', function (event) {
      var closer = event.target.closest('[data-close-modal]');
      if (closer) closeProfileModal(true);
    });

    el.skipProfileBtn.addEventListener('click', function () {
      closeProfileModal(true);
    });

    el.teamGrid.addEventListener('click', function (event) {
      var option = event.target.closest('[data-team-option]');
      if (!option) return;
      state.selectedTeam = option.dataset.teamOption;
      renderTeamGrid();
      applyTeam(state.selectedTeam);
      var selected = el.teamGrid.querySelector('[data-team-option="' + state.selectedTeam + '"]');
      if (selected) selected.focus();
    });

    el.profileForm = $('#profileForm');
    el.profileForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = el.profileNameInput.value.replace(/\s+/g, ' ').trim().slice(0, 24);

      el.profileNameError.hidden = true;
      el.profileNameInput.classList.remove('is-invalid');
      el.profileNameInput.setAttribute('aria-invalid', 'false');

      if (name.length < 2) {
        el.profileNameError.textContent = 'Никнейм должен содержать минимум 2 символа.';
        el.profileNameError.hidden = false;
        el.profileNameInput.classList.add('is-invalid');
        el.profileNameInput.setAttribute('aria-invalid', 'true');
        el.profileNameInput.focus();
        return;
      }

      state.profile = STORE.saveProfile({
        name: name,
        team: state.selectedTeam,
        onboarded: true
      });
      renderProfile();
      closeProfileModal(false);
      toast('Профиль сохранён. В паддоке: ' + state.profile.name + '.', 'success', { icon: 'user' });
    });

    el.profileNameInput.addEventListener('input', function () {
      el.profileNameError.hidden = true;
      el.profileNameInput.classList.remove('is-invalid');
      el.profileNameInput.setAttribute('aria-invalid', 'false');
    });

    el.statusControl.addEventListener('click', function (event) {
      var button = event.target.closest('[data-mode]');
      if (button) setStatus(button.dataset.mode);
    });

    el.raceSelect.addEventListener('change', function () {
      selectRace(el.raceSelect.value);
    });

    el.prevRaceBtn.addEventListener('click', function () {
      var index = DATA.races.indexOf(currentRace());
      if (index > 0) selectRace(DATA.races[index - 1].id);
    });

    el.nextRaceBtn.addEventListener('click', function () {
      var index = DATA.races.indexOf(currentRace());
      if (index >= 0 && index < DATA.races.length - 1) selectRace(DATA.races[index + 1].id);
    });

    el.timeModeControl.addEventListener('click', function (event) {
      var button = event.target.closest('[data-time-mode]');
      if (button) setTimeMode(button.dataset.timeMode);
    });

    el.statusControl.addEventListener('keydown', function (event) {
      var keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
      if (keys.indexOf(event.key) < 0) return;
      var buttons = $all('.segmented__btn', el.statusControl);
      var current = buttons.indexOf(document.activeElement);
      if (current < 0) return;

      event.preventDefault();
      var next = current;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (current + buttons.length - 1) % buttons.length;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (current + 1) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;

      setStatus(buttons[next].dataset.mode);
      buttons[next].focus();
    });

    el.sessionList.addEventListener('change', function (event) {
      var checkbox = event.target.closest('[data-session-toggle]');
      if (!checkbox) return;

      var race = currentRace();
      var sessionId = checkbox.dataset.sessionToggle;
      var session = race.sessions.filter(function (item) { return item.id === sessionId; })[0];
      if (!session) return;

      var watchedMap = ensureRaceSessions(race.id);
      watchedMap[sessionId] = checkbox.checked;
      state.sessions = STORE.saveSessions(state.sessions);

      var row = checkbox.closest('.session');
      if (row) row.classList.toggle('is-watched', checkbox.checked);
      renderProgress();
      renderResults();
      renderStatus();

      if (checkbox.checked) {
        toast('«' + session.name + '» отмечена как просмотренная.', 'success', { icon: 'check', duration: 2600 });
      } else {
        toast('Отметка «' + session.name + '» снята.', 'info', { icon: 'refresh', duration: 2600 });
      }

      if (checkbox.checked && watchedCount() === race.sessions.length &&
          state.status.mode === 'recording' && !state.unlockPrompted) {
        state.unlockPrompted = true;
        toast('Все сессии отмечены. Открыть итоги этапа?', 'info', {
          icon: 'shield',
          duration: 8000,
          action: {
            label: 'Открыть',
            onClick: function () { setStatus('watched'); }
          }
        });
      }
    });

    el.revealResultsBtn.addEventListener('click', function () {
      var action = el.revealResultsBtn.dataset.resultsAction;
      if (action === 'mark-watched') {
        var race = currentRace();
        var watchedMap = ensureRaceSessions(race.id);
        watchedMap.race = true;
        state.sessions = STORE.saveSessions(state.sessions);
        if (state.status.mode === 'recording') {
          state.status = STORE.saveStatus('watched');
        }
        state.unlockPrompted = false;
        renderSessions();
        renderProgress();
        renderResults();
        renderStatus();
        renderPrediction();
        toast('Гонка отмечена просмотренной. Итоги открыты.', 'success', { icon: 'check' });
        return;
      }
      if (action === 'open') {
        setStatus('watched');
      }
    });

    el.refreshDataBtn.addEventListener('click', function () {
      el.refreshDataBtn.disabled = true;
      el.refreshDataBtn.classList.add('is-loading');
      syncApi(true).finally(function () {
        el.refreshDataBtn.disabled = false;
        el.refreshDataBtn.classList.remove('is-loading');
      });
    });

    // Timezone dropdown events
    el.tzChip.addEventListener('click', function () {
      toggleTimezoneDropdown();
    });

    el.tzSearch.addEventListener('input', function () {
      filterTimezoneOptions(el.tzSearch.value);
    });

    el.tzListbox.addEventListener('click', function (event) {
      var option = event.target.closest('[data-tz-value]');
      if (option) selectTimezone(option.dataset.tzValue);
    });

    el.tzListbox.addEventListener('keydown', function (event) {
      var options = $all('[data-tz-value]', el.tzListbox);
      var focusedIndex = options.indexOf(document.activeElement);
      if (focusedIndex < 0) {
        if (event.key === 'ArrowDown' && options.length > 0) {
          event.preventDefault();
          options[0].focus();
        }
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        var next = (focusedIndex + 1) % options.length;
        options[next].focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        var prev = (focusedIndex - 1 + options.length) % options.length;
        options[prev].focus();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (document.activeElement.dataset.tzValue) {
          selectTimezone(document.activeElement.dataset.tzValue);
        }
      } else if (event.key === 'Escape') {
        closeTimezoneDropdown();
        el.tzChip.focus();
      } else if (event.key === 'Home') {
        event.preventDefault();
        options[0].focus();
      } else if (event.key === 'End') {
        event.preventDefault();
        options[options.length - 1].focus();
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (event) {
      if (state.tzDropdownOpen &&
          !el.tzDropdown.contains(event.target)) {
        closeTimezoneDropdown();
      }
    });

    // Close dropdown on escape key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && state.tzDropdownOpen) {
        closeTimezoneDropdown();
        el.tzChip.focus();
      }
    });

    el.predictionForm.addEventListener('submit', savePrediction);
    [el.p1Select, el.p2Select, el.p3Select].forEach(function (select) {
      select.addEventListener('change', updatePredictionHint);
    });

    el.savedPrediction.addEventListener('click', function (event) {
      var button = event.target.closest('[data-prediction-action]');
      if (!button) return;
      if (button.dataset.predictionAction === 'edit') editPrediction();
      if (button.dataset.predictionAction === 'clear') clearPrediction();
    });

    el.friendForm.addEventListener('submit', addFriend);

    [el.friendName, el.friendTg].forEach(function (input) {
      input.addEventListener('input', function () {
        input.classList.remove('is-invalid');
        input.setAttribute('aria-invalid', 'false');
        el.friendError.hidden = true;
      });
    });

    el.friendStatus.addEventListener('change', function () {
      el.friendError.hidden = true;
    });

    el.friendsGrid.addEventListener('click', function (event) {
      var removeButton = event.target.closest('[data-remove-friend]');
      if (removeButton) removeFriend(removeButton.dataset.removeFriend);
    });

    el.toastRegion.addEventListener('click', function (event) {
      var closeButton = event.target.closest('[data-toast-close]');
      if (closeButton) {
        var toastElement = closeButton.closest('.toast');
        if (toastElement) dismissToast(toastElement);
        return;
      }
      var actionButton = event.target.closest('[data-toast-action]');
      if (actionButton) {
        var id = actionButton.dataset.toastAction;
        var entry = toastActions[id];
        if (entry) entry();
        var toastElement2 = actionButton.closest('.toast');
        if (toastElement2) dismissToast(toastElement2);
        delete toastActions[id];
      }
    });

    document.addEventListener('keydown', function (event) {
      if (el.profileModal.hidden) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeProfileModal(true);
        return;
      }

      if (event.key === 'Tab') {
        var dialog = $('.modal__dialog', el.profileModal);
        if (!dialog) return;
        var focusable = $all('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])', dialog)
          .filter(function (node) { return node.offsetParent !== null; });
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener('online', function () {
      syncApi(false);
    });

    window.addEventListener('offline', function () {
      state.api = { status: 'offline', manual: false, season: null, round: null, error: 'offline' };
      updateSourceUI();
    });

    window.addEventListener('storage', function (event) {
      if (event.key && Object.keys(STORE.KEYS).every(function (key) { return STORE.KEYS[key] !== event.key; })) {
        return;
      }
      state.profile = STORE.loadProfile();
      state.status = STORE.loadStatus();
      state.sessions = STORE.loadSessions();
      state.friends = STORE.loadFriends();
      state.predictions = STORE.loadPredictions();
      var prefs = STORE.loadPrefs();
      state.timeMode = prefs.timeMode;
      state.userTimezone = prefs.userTimezone;
      var selectedRace = STORE.loadSelectedRace();
      if (selectedRace) state.raceId = selectedRace;
      ensureRaceSessions(state.raceId);
      state.predictionEditing = false;
      applyTeam(state.profile.team);
      renderProfile();
      renderStatic();
      renderTimezone();
      renderStatus();
      renderSessions();
      renderProgress();
      renderResults();
      fillPredictionSelects(null);
      renderPrediction();
      renderFriends();
      toast('Состояние обновлено в другой вкладке.', 'info', { icon: 'refresh', duration: 3000 });
    });
  }

  /* ----------------------------------------------------------------- toast */

  var toastActions = {};
  var toastCounter = 0;

  function toast(message, variant, options) {
    options = options || {};
    var id = 'toast-' + (++toastCounter);
    var wrapper = document.createElement('div');
    wrapper.className = 'toast toast--' + (variant || 'info');
    wrapper.setAttribute('role', 'status');
    wrapper.dataset.toastId = id;

    var iconName = options.icon || (variant === 'error' ? 'warning' : variant === 'warn' ? 'info' : 'check');

    wrapper.innerHTML = '' +
      '<span class="toast__icon" aria-hidden="true">' + icon(iconName) + '</span>' +
      '<p class="toast__message"></p>' +
      '<button class="toast__close" type="button" data-toast-close aria-label="Закрыть уведомление">' + icon('x') + '</button>';

    wrapper.querySelector('.toast__message').textContent = message;

    if (options.action && typeof options.action.onClick === 'function') {
      var actionButton = document.createElement('button');
      actionButton.type = 'button';
      actionButton.className = 'toast__action';
      actionButton.setAttribute('data-toast-action', id);
      actionButton.textContent = options.action.label;
      wrapper.appendChild(actionButton);
      toastActions[id] = options.action.onClick;
    }

    while (el.toastRegion.children.length >= 3) {
      var oldest = el.toastRegion.firstElementChild;
      if (!oldest) break;
      delete toastActions[oldest.dataset.toastId];
      el.toastRegion.removeChild(oldest);
    }
    el.toastRegion.appendChild(wrapper);
    window.requestAnimationFrame(function () {
      wrapper.classList.add('is-visible');
    });

    var timer = window.setTimeout(function () {
      dismissToast(wrapper);
    }, options.duration || 4500);

    wrapper.addEventListener('mouseenter', function () {
      window.clearTimeout(timer);
    });
    wrapper.addEventListener('mouseleave', function () {
      timer = window.setTimeout(function () { dismissToast(wrapper); }, 1800);
    });
  }

  function dismissToast(toastElement) {
    if (!toastElement || toastElement.classList.contains('is-leaving')) return;
    toastElement.classList.add('is-leaving');
    var id = toastElement.dataset.toastId;
    window.setTimeout(function () {
      if (toastElement.parentNode) toastElement.parentNode.removeChild(toastElement);
      if (id) delete toastActions[id];
    }, 220);
  }

  /* ------------------------------------------------------------------ init */

  function init() {
    cacheElements();
    applyInitialState();
    buildDriverOptions();
    buildRaceOptions();

    var snapshot = STORE.init();
    state.profile = snapshot.profile;
    state.status = snapshot.status;
    state.sessions = snapshot.sessions;
    state.friends = snapshot.friends;
    state.predictions = snapshot.predictions;
    state.timeMode = snapshot.prefs.timeMode;
    state.userTimezone = snapshot.prefs.userTimezone;
    state.raceId = snapshot.selectedRace || computeDefaultRaceId();
    STORE.saveSelectedRace(state.raceId);
    ensureRaceSessions(state.raceId);

    renderStatic();
    renderTimezone();
    applyTeam(state.profile.team);
    renderProfile();
    renderSessions();
    renderProgress();
    renderResults();
    renderStatus();
    fillPredictionSelects(null);
    renderPrediction();
    renderFriends();
    bindEvents();
    updateSourceUI();

    syncApi(false);

    if (!state.profile.onboarded) {
      window.setTimeout(function () {
        if (el.profileModal.hidden && !state.modalClosing && state.modalMode === null) {
          openProfileModal('onboarding');
        }
      }, 550);
    }

    window.setInterval(function () {
      refreshSessionStates();
      renderResults();
      renderStatus();
    }, 60000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
