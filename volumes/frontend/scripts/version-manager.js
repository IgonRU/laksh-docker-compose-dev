const fs = require('fs');
const path = require('path');

// Функция для чтения package.json
function readPackageJson() {
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageContent = fs.readFileSync(packagePath, 'utf8');
  return JSON.parse(packageContent);
}

// Функция для записи package.json
function writePackageJson(packageData) {
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageContent = JSON.stringify(packageData, null, 2) + '\n';
  fs.writeFileSync(packagePath, packageContent, 'utf8');
}

// Функция для парсинга версии
function parseVersion(version) {
  const parts = version.split('.');
  return {
    major: parseInt(parts[0]),
    minor: parseInt(parts[1]),
    patch: parseInt(parts[2])
  };
}

// Функция для форматирования версии
function formatVersion(versionObj) {
  return `${versionObj.major}.${versionObj.minor}.${versionObj.patch}`;
}

// Функция для увеличения версии
function bumpVersion(currentVersion, bumpType = 'patch') {
  const version = parseVersion(currentVersion);
  
  switch (bumpType) {
    case 'major':
      version.major++;
      version.minor = 0;
      version.patch = 0;
      break;
    case 'minor':
      version.minor++;
      version.patch = 0;
      break;
    case 'patch':
    default:
      version.patch++;
      break;
  }
  
  return formatVersion(version);
}

// Функция для автоматического определения типа обновления
function determineBumpType() {
  // По умолчанию увеличиваем patch версию
  // Можно расширить логику на основе изменений в коде
  return 'patch';
}

// Функция для обновления версии
function updateVersion(bumpType = null) {
  try {
    const packageData = readPackageJson();
    const currentVersion = packageData.version;
    
    // Определяем тип обновления если не передан
    const actualBumpType = bumpType || determineBumpType();
    
    // Увеличиваем версию
    const newVersion = bumpVersion(currentVersion, actualBumpType);
    
    // Обновляем package.json
    packageData.version = newVersion;
    writePackageJson(packageData);
    
    console.log(`✅ Version updated: ${currentVersion} → ${newVersion} (${actualBumpType})`);
    
    return newVersion;
  } catch (error) {
    console.error('❌ Failed to update version:', error.message);
    throw error;
  }
}

// Функция для получения текущей версии
function getCurrentVersion() {
  const packageData = readPackageJson();
  return packageData.version;
}

// Функция для установки конкретной версии
function setVersion(version) {
  try {
    const packageData = readPackageJson();
    const oldVersion = packageData.version;
    
    packageData.version = version;
    writePackageJson(packageData);
    
    console.log(`✅ Version set: ${oldVersion} → ${version}`);
    
    return version;
  } catch (error) {
    console.error('❌ Failed to set version:', error.message);
    throw error;
  }
}

// Экспортируем функции для использования в других скриптах
module.exports = {
  updateVersion,
  getCurrentVersion,
  setVersion,
  bumpVersion,
  parseVersion
};

// Если скрипт запущен напрямую
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'bump':
      const bumpType = args[1] || 'patch';
      updateVersion(bumpType);
      break;
    case 'set':
      const version = args[1];
      if (!version) {
        console.error('❌ Version required: node version-manager.js set <version>');
        process.exit(1);
      }
      setVersion(version);
      break;
    case 'current':
      console.log(`📦 Current version: ${getCurrentVersion()}`);
      break;
    default:
      console.log('📋 Version Manager Usage:');
      console.log('  node version-manager.js bump [patch|minor|major]  - Increase version');
      console.log('  node version-manager.js set <version>            - Set specific version');
      console.log('  node version-manager.js current                  - Show current version');
      console.log('');
      console.log('📦 Current version:', getCurrentVersion());
  }
}
