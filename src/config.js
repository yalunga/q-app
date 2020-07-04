import * as R from 'ramda';

let config;

if (process.env.TEST) {
  config = require('./config/config-test.json');
} else if (process.env.RUN_MODE !== 'local') {
  config = require('./config/config.json');
} else {
  config = require('./config/config-template.json');
  try {
    const customConfig = require('./config/config.json'); // eslint-disable-line @typescript-eslint/no-var-requires
    config = R.mergeDeepRight(config, customConfig);
  } catch (e) { /* no custom config */ }
}

export default config;