import { config } from '@vue/test-utils'

config.global.mocks['$t'] = (key) => key
config.global.stubs['FontAwesomeIcon'] = { template: '<span />' }
