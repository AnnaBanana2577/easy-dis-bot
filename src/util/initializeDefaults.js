export default function initializeDefaults(defaults, config) {
  for (var key of Object.keys(defaults)) {
    if (!config.hasOwnProperty(key)) config[key] = defaults[key];
  }
  return config;
}
