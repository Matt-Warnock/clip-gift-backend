const FeelDB = require('./feel-database')

describe('FeelDB', () => {
  it('Returns value of key from data', () => {
    const data = { soothe: 'kitten' }
    const feelDB = new FeelDB(data)

    expect(feelDB.getSearchStringOf('soothe')).toBe('kitten')
  })
})