export default function initializeDefaults(defaults, config) {
  for (var key of Object.keys(defaults)) {
    if (!config.hasOwnPropery(key)) config[key] = defaults[key];
  }
  return config;
}
