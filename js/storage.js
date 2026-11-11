/**
 * F1 Paddock & Spoiler Shield — слой хранения.
 * Данные живут в localStorage под ключами f1_*. Если storage недоступен
 * (приватный режим, жёсткие настройки), используется прозрачный memory-fallback.
 *
 * Схема v2: сессии и прогнозы хранятся по каждому этапу, выбранный этап
 * и настройки интерфейса — отдельно. Старые плоские данные мигрируются.
 */
(function () {
  'use strict';

  var KEYS = {
    profile: 'f1_profile',
    status: 'f1_user_status',
    sessions: 'f1_sessions',
    friends: 'f1_friends',
    predictions: 'f1_predictions',
    selectedRace: 'f1_selected_race',
    prefs: 'f1_prefs'
  };

  var DATA = window.F1_DATA;
  var OLD_RACE_ID = '2026-sao-paulo';
  var NEW_RACE_ID = '2026-brazil';

  var memory = Object.create(null);
  var available = true;
  var lastError = null;

  try {
    var probe = '__f1_storage_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
  } catch (error) {
    available = false;
    lastError = error;
  }

  function readRaw(key) {
    if (available) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        available = false;
        lastError = error;
      }
    }
    return Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null;
  }

  function writeRaw(key, value) {
    memory[key] = value;
    if (!available) return false;
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (error) {
      available = false;
      lastError = error;
      return false;
    }
  }

  function removeRaw(key) {
    if (available) {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        available = false;
        lastError = error;
      }
    }
    delete memory[key];
  }

  function readJSON(key, fallback) {
    var raw = readRaw(key);
    if (raw === null || raw === '') return fallback;
    try {
      var parsed = JSON.parse(raw);
      return parsed === null || parsed === undefined ? fallback : parsed;
    } catch (error) {
      return fallback;
    }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function nowISO() {
    return new Date().toISOString();
  }

  function normalizeRaceId(raceId) {
    if (raceId === OLD_RACE_ID) return NEW_RACE_ID;
    return raceId;
  }

  function getRace(raceId) {
    var normalized = normalizeRaceId(raceId);
    if (!DATA || !Array.isArray(DATA.races)) return null;
    return DATA.races.filter(function (race) { return race.id === normalized; })[0] || null;
  }

  function isKnownRace(raceId) {
    return Boolean(getRace(raceId));
  }

  function isKnownTeam(teamId) {
    var teams = (DATA && DATA.teams) || [];
    return teams.some(function (team) { return team.id === teamId; });
  }

  function isKnownDriver(driverId) {
    var drivers = (DATA && DATA.drivers) || [];
    return drivers.some(function (driver) { return driver.id === driverId; });
  }

  function normalizeName(value) {
    if (typeof value !== 'string') return '';
    return value.replace(/\s+/g, ' ').trim().slice(0, 24);
  }

  function normalizeProfile(raw) {
    var profile = {
      name: 'Гонщик',
      team: 'ferrari',
      onboarded: false,
      updatedAt: null
    };
    if (!raw || typeof raw !== 'object') return profile;

    var name = normalizeName(raw.name);
    if (name.length >= 2) profile.name = name;
    if (typeof raw.team === 'string' && isKnownTeam(raw.team)) profile.team = raw.team;
    profile.onboarded = raw.onboarded === true;
    if (typeof raw.updatedAt === 'string' && !Number.isNaN(Date.parse(raw.updatedAt))) {
      profile.updatedAt = raw.updatedAt;
    }
    return profile;
  }

  function normalizeStatus(raw) {
    var mode = null;
    if (typeof raw === 'string') mode = raw;
    else if (raw && typeof raw === 'object') mode = raw.mode;
    if (mode !== 'live' && mode !== 'recording' && mode !== 'watched') mode = 'recording';
    return {
      mode: mode,
      updatedAt: raw && typeof raw === 'object' && typeof raw.updatedAt === 'string' ? raw.updatedAt : null
    };
  }

  function emptySessionsForRace(race) {
    var result = {};
    (race.sessions || []).forEach(function (session) { result[session.id] = false; });
    return result;
  }

  function normalizeSessionsForRace(raceId, raw) {
    var race = getRace(raceId);
    if (!race || !raw || typeof raw !== 'object') return null;
    var result = {};
    (race.sessions || []).forEach(function (session) {
      result[session.id] = raw[session.id] === true;
    });
    return result;
  }

  function normalizeSessions(raw) {
    if (!raw || typeof raw !== 'object') return {};

    var raceKeys = Object.keys(raw).filter(function (key) { return isKnownRace(key); });
    var looksFlat = Object.keys(raw).some(function (key) {
      return ['fp1', 'fp2', 'fp3', 'quali', 'race', 'sprint', 'sprintQuali'].indexOf(key) >= 0;
    });

    if (looksFlat && raceKeys.length === 0) {
      var defaultRace = getRace(DATA.defaultRaceId || NEW_RACE_ID);
      if (!defaultRace) return {};
      var migrated = normalizeSessionsForRace(defaultRace.id, raw);
      return migrated ? (function () {
        var wrap = {};
        wrap[defaultRace.id] = migrated;
        return wrap;
      })() : {};
    }

    var result = {};
    Object.keys(raw).forEach(function (key) {
      var normalizedId = normalizeRaceId(key);
      var normalized = normalizeSessionsForRace(normalizedId, raw[key]);
      if (normalized) result[normalizedId] = normalized;
    });
    return result;
  }

  function normalizeFriends(raw) {
    if (!Array.isArray(raw)) {
      return clone((DATA && DATA.defaultFriends) || []);
    }
    return raw
      .filter(function (friend) {
        return friend && typeof friend === 'object' && typeof friend.name === 'string';
      })
      .map(function (friend, index) {
        var status = friend.status;
        if (status !== 'live' && status !== 'recording' && status !== 'watched') status = 'watched';
        return {
          id: typeof friend.id === 'string' && friend.id ? friend.id : 'friend-restored-' + index,
          name: normalizeName(friend.name) || 'Друг',
          tg: typeof friend.tg === 'string' ? friend.tg : '@friend',
          status: status,
          note: typeof friend.note === 'string' ? friend.note : '',
          createdAt: typeof friend.createdAt === 'string' ? friend.createdAt : nowISO(),
          mock: friend.mock === true
        };
      })
      .slice(0, 40);
  }

  function normalizePredictionEntry(raw, fallbackRaceId) {
    if (!raw || typeof raw !== 'object') return null;
    var raceId = normalizeRaceId(raw.raceId || fallbackRaceId);
    if (!isKnownRace(raceId)) raceId = DATA.defaultRaceId || NEW_RACE_ID;

    var p1 = raw.p1;
    var p2 = raw.p2;
    var p3 = raw.p3;
    var unique = [p1, p2, p3].filter(function (id, index, list) {
      return typeof id === 'string' && list.indexOf(id) === index;
    });
    if (unique.length !== 3) return null;
    if (!unique.every(isKnownDriver)) return null;

    return {
      raceId: raceId,
      p1: p1,
      p2: p2,
      p3: p3,
      savedAt: typeof raw.savedAt === 'string' && !Number.isNaN(Date.parse(raw.savedAt))
        ? raw.savedAt
        : nowISO()
    };
  }

  function normalizePredictions(raw) {
    if (!raw || typeof raw !== 'object') return {};

    if (raw.p1 && raw.p2 && raw.p3) {
      var single = normalizePredictionEntry(raw, raw.raceId);
      return single ? (function () {
        var wrap = {};
        wrap[single.raceId] = single;
        return wrap;
      })() : {};
    }

    var result = {};
    Object.keys(raw).forEach(function (key) {
      var normalizedId = normalizeRaceId(key);
      if (!isKnownRace(normalizedId)) return;
      var entry = normalizePredictionEntry(raw[key], normalizedId);
      if (entry) result[entry.raceId] = entry;
    });
    return result;
  }

  function normalizePrefs(raw) {
    var timeMode = raw && raw.timeMode === 'track' ? 'track' : 'local';
    var userTimezone = raw && typeof raw.userTimezone === 'string' ? raw.userTimezone : null;
    return { timeMode: timeMode, userTimezone: userTimezone };
  }

  function seedIfMissing() {
    if (readRaw(KEYS.profile) === null) {
      writeRaw(KEYS.profile, JSON.stringify({
        name: 'Гонщик',
        team: 'ferrari',
        onboarded: false,
        updatedAt: null
      }));
    }
    if (readRaw(KEYS.status) === null) {
      writeRaw(KEYS.status, JSON.stringify({ mode: 'recording', updatedAt: nowISO() }));
    }
    if (readRaw(KEYS.sessions) === null) {
      var defaultRace = getRace(DATA.defaultRaceId || NEW_RACE_ID) || DATA.races[0];
      var defaultSessions = {};
      if (defaultRace) {
        var configured = DATA.defaultSessionStates && DATA.defaultSessionStates[defaultRace.id];
        defaultSessions[defaultRace.id] = configured
          ? normalizeSessionsForRace(defaultRace.id, configured)
          : emptySessionsForRace(defaultRace);
      }
      writeRaw(KEYS.sessions, JSON.stringify(defaultSessions));
    }
    if (readRaw(KEYS.friends) === null) {
      writeRaw(KEYS.friends, JSON.stringify(clone((DATA && DATA.defaultFriends) || [])));
    }
    if (readRaw(KEYS.prefs) === null) {
      writeRaw(KEYS.prefs, JSON.stringify({ timeMode: 'local', userTimezone: null }));
    }
    // f1_predictions и f1_selected_race создаются по действию пользователя.
  }

  window.F1Store = {
    KEYS: KEYS,
    isAvailable: function () { return available; },
    getLastError: function () { return lastError; },
    getRace: getRace,
    init: function () {
      seedIfMissing();
      var sessionsRaw = readJSON(KEYS.sessions, null);
      var sessions = normalizeSessions(sessionsRaw);
      if (sessionsRaw !== null && JSON.stringify(sessionsRaw) !== JSON.stringify(sessions)) {
        writeRaw(KEYS.sessions, JSON.stringify(sessions));
      }
      var predictionsRaw = readJSON(KEYS.predictions, null);
      var predictions = normalizePredictions(predictionsRaw);
      if (predictionsRaw !== null && JSON.stringify(predictionsRaw) !== JSON.stringify(predictions)) {
        writeRaw(KEYS.predictions, JSON.stringify(predictions));
      }
      return {
        profile: this.loadProfile(),
        status: this.loadStatus(),
        sessions: sessions,
        friends: this.loadFriends(),
        predictions: predictions,
        selectedRace: this.loadSelectedRace(),
        prefs: this.loadPrefs()
      };
    },
    loadProfile: function () { return normalizeProfile(readJSON(KEYS.profile, null)); },
    saveProfile: function (patch) {
      var current = this.loadProfile();
      var next = normalizeProfile({
        name: patch && patch.name !== undefined ? patch.name : current.name,
        team: patch && patch.team !== undefined ? patch.team : current.team,
        onboarded: patch && patch.onboarded !== undefined ? patch.onboarded : current.onboarded,
        updatedAt: nowISO()
      });
      writeRaw(KEYS.profile, JSON.stringify(next));
      return next;
    },
    loadStatus: function () { return normalizeStatus(readJSON(KEYS.status, null)); },
    saveStatus: function (mode) {
      var next = normalizeStatus({ mode: mode, updatedAt: nowISO() });
      writeRaw(KEYS.status, JSON.stringify(next));
      return next;
    },
    loadSessions: function () { return normalizeSessions(readJSON(KEYS.sessions, null)); },
    saveSessions: function (sessions) {
      var next = normalizeSessions(sessions);
      writeRaw(KEYS.sessions, JSON.stringify(next));
      return next;
    },
    loadFriends: function () { return normalizeFriends(readJSON(KEYS.friends, null)); },
    saveFriends: function (friends) {
      var next = normalizeFriends(friends);
      writeRaw(KEYS.friends, JSON.stringify(next));
      return next;
    },
    loadPredictions: function () { return normalizePredictions(readJSON(KEYS.predictions, null)); },
    loadPrediction: function (raceId) {
      var predictions = this.loadPredictions();
      return predictions[normalizeRaceId(raceId)] || null;
    },
    savePrediction: function (raceId, values) {
      var predictions = this.loadPredictions();
      var entry = normalizePredictionEntry({
        raceId: normalizeRaceId(raceId),
        p1: values.p1,
        p2: values.p2,
        p3: values.p3,
        savedAt: nowISO()
      }, raceId);
      if (!entry) return null;
      predictions[entry.raceId] = entry;
      writeRaw(KEYS.predictions, JSON.stringify(predictions));
      return entry;
    },
    clearPrediction: function (raceId) {
      var predictions = this.loadPredictions();
      delete predictions[normalizeRaceId(raceId)];
      if (Object.keys(predictions).length === 0) removeRaw(KEYS.predictions);
      else writeRaw(KEYS.predictions, JSON.stringify(predictions));
    },
    loadSelectedRace: function () {
      var raw = readJSON(KEYS.selectedRace, null);
      var id = normalizeRaceId(typeof raw === 'string' ? raw : '');
      return isKnownRace(id) ? id : '';
    },
    saveSelectedRace: function (raceId) {
      var id = normalizeRaceId(raceId);
      if (!isKnownRace(id)) return '';
      writeRaw(KEYS.selectedRace, JSON.stringify(id));
      return id;
    },
    loadPrefs: function () { return normalizePrefs(readJSON(KEYS.prefs, null)); },
    savePrefs: function (patch) {
      var current = this.loadPrefs();
      var next = normalizePrefs({
        timeMode: patch && patch.timeMode !== undefined ? patch.timeMode : current.timeMode,
        userTimezone: patch && patch.userTimezone !== undefined ? patch.userTimezone : current.userTimezone
      });
      writeRaw(KEYS.prefs, JSON.stringify(next));
      return next;
    }
  };
})();
