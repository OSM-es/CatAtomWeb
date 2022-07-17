class MockUserStore {
  osmId = '123'
  username = 'Cervantes'
  token = false

  get isLogged() {
    return this.token
  }

  isOwner(user) {
    return user && user.osm_id == this.osmId
  }

  login() {
    this.token = true
  }

  logout() {
    this.token = false
  }

  update() {}
}

const user = new MockUserStore()

module.exports = {
  useUserStore: () => user,
}
