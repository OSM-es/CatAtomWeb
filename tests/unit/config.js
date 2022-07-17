import { config } from '@vue/test-utils'
import 'core-js'

config.global.mocks['$t'] = (key) => key
config.global.stubs['FontAwesomeIcon'] = { template: '<span />' }
config.global.stubs['VueCollapsiblePanel'] = {
  template:
    '<div><slot name="title"></slot><slot name="content"></slot></div>',
}
