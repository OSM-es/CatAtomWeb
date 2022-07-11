module.exports = {
  t: (key) => key.toUpperCase(),
  te: (key) => key != 'not.exists',
  global: {
    t: (key) => key.toUpperCase(),
    te: (key) => key != 'not.exists',
  },
}
