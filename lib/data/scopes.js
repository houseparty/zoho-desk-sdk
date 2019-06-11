'use strict';

const scopes = {
  Desk: {
    tickets: {
      ALL: 'Desk.tickets.ALL',
      READ: 'Desk.tickets.READ',
      WRITE: 'Desk.tickets.WRITE',
      UPDATE: 'Desk.tickets.UPDATE',
      CREATE: 'Desk.tickets.CREATE',
      DELETE: 'Desk.tickets.DELETE'
    },
    contacts: {
      ALL: 'Desk.contacts.ALL',
      READ: 'Desk.contacts.READ',
      WRITE: 'Desk.contacts.WRITE',
      UPDATE: 'Desk.contacts.UPDATE',
      CREATE: 'Desk.contacts.CREATE',
      DELETE: 'Desk.contacts.DELETE'
    },
    tasks: {
      ALL: 'Desk.tasks.ALL',
      READ: 'Desk.tasks.READ',
      WRITE: 'Desk.tasks.WRITE',
      UPDATE: 'Desk.tasks.UPDATE',
      CREATE: 'Desk.tasks.CREATE',
      DELETE: 'Desk.tasks.DELETE'
    },
    basic: {
      ALL: 'Desk.basic.ALL',
      READ: 'Desk.basic.READ',
      WRITE: 'Desk.basic.WRITE',
      UPDATE: 'Desk.basic.UPDATE',
      CREATE: 'Desk.basic.CREATE',
      DELETE: 'Desk.basic.DELETE'
    },
    settings: {
      ALL: 'Desk.settings.ALL',
      READ: 'Desk.settings.READ',
      WRITE: 'Desk.settings.WRITE',
      UPDATE: 'Desk.settings.UPDATE',
      CREATE: 'Desk.settings.CREATE',
      DELETE: 'Desk.settings.DELETE'
    },
    search: {
      READ: 'Desk.search.READ'
    },
    events: {
      ALL: 'Desk.events.ALL',
      READ: 'Desk.events.READ',
      WRITE: 'Desk.events.WRITE',
      UPDATE: 'Desk.events.UPDATE',
      CREATE: 'Desk.events.CREATE',
      DELETE: 'Desk.events.DELETE'
    },
    articles: {
      ALL: 'Desk.articles.ALL',
      READ: 'Desk.articles.READ',
      WRITE: 'Desk.articles.WRITE',
      UPDATE: 'Desk.articles.UPDATE',
      CREATE: 'Desk.articles.CREATE',
      DELETE: 'Desk.articles.DELETE'
    }
  }
};

scopes.allScopes = [
  scopes.Desk.articles.ALL,
  scopes.Desk.basic.ALL,
  scopes.Desk.contacts.ALL,
  scopes.Desk.events.ALL,
  scopes.Desk.search.READ,
  scopes.Desk.settings.ALL,
  scopes.Desk.tasks.ALL,
  scopes.Desk.tickets.ALL
].join(',');

module.exports = scopes;
