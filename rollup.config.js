import browserConfig from './rollup.browser.config.js';
import nodeConfig from './rollup.node.config.js';

export default commandLineArgs => {
  if (commandLineArgs.browserConfig === true) {
    return browserConfig;
  }
  return nodeConfig;
}
