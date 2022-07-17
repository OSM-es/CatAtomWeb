module.exports = {
  useUserStore: () => ({
    osmId: '123',
    username: 'Cervantes',
    isOwner: (user) => user && user.osm_id == '123',
  }),
}
