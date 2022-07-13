import { config } from '@vue/test-utils'
import 'core-js'

config.global.mocks['$t'] = (key) => key
config.global.stubs['FontAwesomeIcon'] = { template: '<span />' }
