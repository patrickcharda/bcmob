const {AndroidConfig, withAndroidManifest } = require('@expo/config-plugins');
const {Paths} = require('@expo/config-plugins/build/android');
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const { getMainApplicationOrThrow} = AndroidConfig.Manifest

const withTrustLocalCerts = config => {
  return withAndroidManifest(config, async config => {
    config.modResults = await setCustomConfigAsync(config, config.modResults);
    return config;
  });
}

async function setCustomConfigAsync(config, androidManifest) {
  const networkSecurityConfigPath = path.join(
    config.modRequest.projectRoot,
    'plugins',
    'network_security_config.xml'
  );
  const networkSecurityConfig = await fsPromises.readFile(networkSecurityConfigPath, 'utf-8');

  const mainApplication = getMainApplicationOrThrow(androidManifest);
  mainApplication['$']['android:networkSecurityConfig'] = '@xml/network_security_config';

  const xmlPath = await Paths.getResourceFolderAsync(config.modRequest.projectRoot);
  await fsPromises.writeFile(path.join(xmlPath, 'network_security_config.xml'), networkSecurityConfig);

  return androidManifest;
}

module.exports = withTrustLocalCerts;
