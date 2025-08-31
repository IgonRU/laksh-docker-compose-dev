const fs = require('fs');
const path = require('path');
const { getCurrentVersion } = require('./version-manager');

// Функция для получения информации о git
function getGitInfo() {
  try {
    const { execSync } = require('child_process');
    
    // Получаем текущий коммит
    const commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    
    // Получаем ветку
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    
    // Получаем последний тег
    let lastTag = '';
    try {
      lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    } catch (e) {
      lastTag = 'no-tag';
    }
    
    return { commitHash, branch, lastTag };
  } catch (e) {
    return { commitHash: 'unknown', branch: 'unknown', lastTag: 'unknown' };
  }
}

// Функция для генерации информации о билде
function generateBuildInfo() {
  const now = new Date();
  const gitInfo = getGitInfo();
  
  const buildInfo = {
    buildTime: now.toISOString(),
    buildDate: now.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    buildTimestamp: now.getTime(),
    commitHash: gitInfo.commitHash,
    branch: gitInfo.branch,
    lastTag: gitInfo.lastTag,
    version: getCurrentVersion()
  };
  
  // Создаем содержимое файла
  const fileContent = `// Этот файл автоматически генерируется при сборке
// Не редактируйте его вручную!

export const BUILD_INFO = ${JSON.stringify(buildInfo, null, 2)};

export default BUILD_INFO;
`;

  // Путь к файлу
  const outputPath = path.join(__dirname, '..', 'src', 'app', '_shared', 'build-info.ts');
  
  // Создаем директорию если её нет
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Записываем файл
  fs.writeFileSync(outputPath, fileContent, 'utf8');
  
  console.log('✅ Build info generated successfully!');
  console.log(`📁 File: ${outputPath}`);
  console.log(`🕐 Build time: ${buildInfo.buildDate}`);
  console.log(`🔗 Commit: ${buildInfo.commitHash}`);
  console.log(`🌿 Branch: ${buildInfo.branch}`);
  console.log(`🏷️  Tag: ${buildInfo.lastTag}`);
}

// Запускаем генерацию
generateBuildInfo();
