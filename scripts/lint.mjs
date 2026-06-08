import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const projectRoot = process.cwd()

/**
 * 读取 UTF-8 文本文件内容。
 *
 * @param {string} relativePath 相对于项目根目录的文件路径。
 * @returns {string} 返回文件的 UTF-8 文本内容。
 */
function readText(relativePath) {
  return readFileSync(path.join(projectRoot, relativePath), 'utf8')
}

/**
 * 断言指定文件存在。
 *
 * @param {string} relativePath 相对于项目根目录的文件路径。
 * @returns {void} 无返回值；当文件不存在时抛出异常。
 */
function assertFileExists(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath)

  if (!existsSync(absolutePath) || !statSync(absolutePath).isFile()) {
    throw new Error(`缺少基础文件: ${relativePath}`)
  }
}

/**
 * 断言指定目录存在。
 *
 * @param {string} relativePath 相对于项目根目录的目录路径。
 * @returns {void} 无返回值；当目录不存在时抛出异常。
 */
function assertDirectoryExists(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath)

  if (!existsSync(absolutePath) || !statSync(absolutePath).isDirectory()) {
    throw new Error(`缺少基础目录: ${relativePath}`)
  }
}

/**
 * 读取并解析 JSON 文件。
 *
 * @param {string} relativePath 相对于项目根目录的 JSON 文件路径。
 * @returns {Record<string, unknown>} 返回解析后的 JSON 对象。
 */
function parseJson(relativePath) {
  return JSON.parse(stripJsonComments(readText(relativePath)))
}

/**
 * 移除 JSON 字符串中的单行与块级注释。
 *
 * @param {string} content 待处理的 JSON 文本内容。
 * @returns {string} 返回移除注释后的 JSON 文本。
 */
function stripJsonComments(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
}

/**
 * 递归收集目录下的全部文件路径。
 *
 * @param {string} relativePath 相对于项目根目录的目录路径。
 * @returns {string[]} 返回目录下全部文件的相对路径列表。
 */
function collectFiles(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath)
  /** @type {string[]} */
  const files = []

  for (const entry of readdirSync(absolutePath, { withFileTypes: true })) {
    const entryRelativePath = path.join(relativePath, entry.name)

    if (entry.isDirectory()) {
      files.push(...collectFiles(entryRelativePath))
      continue
    }

    files.push(entryRelativePath)
  }

  return files
}

/**
 * 校验 manifest.json 的 uni-app x 关键配置。
 *
 * @param {Record<string, unknown>} manifest 解析后的 manifest.json 内容。
 * @returns {void} 无返回值；当关键配置不符合预期时抛出异常。
 */
function validateManifest(manifest) {
  const uniAppX = manifest['uni-app-x']
  const vueVersion = manifest.vueVersion

  if (typeof uniAppX !== 'object' || uniAppX === null || Array.isArray(uniAppX)) {
    throw new Error('manifest.json 必须保留 uni-app-x 对象配置')
  }

  if (vueVersion !== '3') {
    throw new Error('manifest.json 的 vueVersion 必须保持为 "3"')
  }
}

/**
 * 校验 pages.json 的启动页配置。
 *
 * @param {Record<string, unknown>} pagesConfig 解析后的 pages.json 内容。
 * @returns {void} 无返回值；当启动页配置不符合预期时抛出异常。
 */
function validatePagesConfig(pagesConfig) {
  const pages = Array.isArray(pagesConfig.pages) ? pagesConfig.pages : []
  const firstPage = pages[0]

  if (!firstPage || typeof firstPage !== 'object') {
    throw new Error('pages.json 必须至少包含一个页面配置')
  }

  if (firstPage.path !== 'pages/index/index') {
    throw new Error('pages.json 的首个页面必须保持为 pages/index/index')
  }
}

/**
 * 校验 uvue 样式中是否包含已知的不兼容写法。
 *
 * @param {string} relativePath 相对于项目根目录的 uvue 文件路径。
 * @param {string} content 待校验的文件内容。
 * @returns {void} 无返回值；当发现已知不兼容写法时抛出异常。
 */
function validateUvueCss(relativePath, content) {
  const unsupportedRules = [
    {
      pattern: /(^|\n)\s*page\s*\{/,
      message: 'uvue 不支持 `page` 选择器，请改为类选择器。'
    },
    {
      pattern: /min-height\s*:\s*\d+(\.\d+)?%/i,
      message: 'uvue 的 `min-height` 不支持百分比，请改为 number 或 pixel。'
    },
    {
      pattern: /max-width\s*:\s*\d+(\.\d+)?%/i,
      message: 'uvue 的 `max-width` 不支持百分比，请改为 number 或 pixel。'
    },
    {
      pattern: /(^|[^-])width\s*:\s*\d+(\.\d+)?%/i,
      message: 'uvue 的 `width` 不支持百分比，请改为 number、pixel 或其它兼容布局方式。'
    }
  ]

  for (const rule of unsupportedRules) {
    if (rule.pattern.test(content)) {
      throw new Error(`${relativePath} 存在不兼容样式：${rule.message}`)
    }
  }
}

/**
 * 校验项目内全部源码级 uvue 文件。
 *
 * @returns {void} 无返回值；当发现不兼容样式时抛出异常。
 */
function validateUvueFiles() {
  const uvueFiles = [
    'App.uvue',
    ...collectFiles('components'),
    ...collectFiles('pages')
  ].filter((filePath) => filePath.endsWith('.uvue'))

  uvueFiles.forEach((filePath) => {
    validateUvueCss(filePath, readText(filePath))
  })
}

/**
 * 执行基础工程骨架校验。
 *
 * @returns {void} 无返回值；校验通过时输出结果，失败时抛出异常。
 */
function main() {
  const requiredFiles = [
    'App.uvue',
    'main.uts',
    'manifest.json',
    'pages.json',
    'pages/index/index.uvue',
    'uni.scss'
  ]

  const requiredDirectories = [
    'api',
    'components',
    'constants',
    'hooks',
    'layouts',
    'pages',
    'scripts',
    'static',
    'stores',
    'types',
    'uni_modules',
    'utils'
  ]

  requiredFiles.forEach(assertFileExists)
  requiredDirectories.forEach(assertDirectoryExists)

  validateManifest(parseJson('manifest.json'))
  validatePagesConfig(parseJson('pages.json'))
  validateUvueFiles()

  console.log('Lint passed: uni-app x 基础工程骨架校验通过。')
}

main()
