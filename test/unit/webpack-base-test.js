const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base.js');
  it('entry', () => {
    assert.equal(baseConfig.entry.home.includes('test/smoke/template/src/home/index.js'), true)
    assert.equal(baseConfig.entry.search.includes('test/smoke/template/src/search/index.js'), true)
  })
})