const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('js', 'json', 'ts', 'tsx', 'mjs');

module.exports = config;
