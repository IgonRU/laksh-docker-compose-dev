#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🔄 Pre-commit: Updating version and build info...');

try {
  // Увеличиваем patch версию
  console.log('📦 Bumping patch version...');
  execSync('npm run version:bump patch', { stdio: 'inherit' });
  
  // Запускаем скрипт генерации информации о билде
  console.log('📋 Updating build info...');
  const buildInfoScript = path.join(__dirname, 'generate-build-info.js');
  execSync(`node "${buildInfoScript}"`, { stdio: 'inherit' });
  
  // Добавляем обновленные файлы в коммит
  execSync('git add package.json', { stdio: 'inherit' });
  execSync('git add src/app/_shared/build-info.ts', { stdio: 'inherit' });
  
  console.log('✅ Version bumped, build info updated and files added to commit');
} catch (error) {
  console.error('❌ Failed to update version and build info:', error.message);
  process.exit(1);
}
