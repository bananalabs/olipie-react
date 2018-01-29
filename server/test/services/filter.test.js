const assert = require('assert');
const app = require('../../src/app');

describe('\'filter\' service', () => {
  it('registered the service', () => {
    const service = app.service('filter');

    assert.ok(service, 'Registered the service');
  });
});
