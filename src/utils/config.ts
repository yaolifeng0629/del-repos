import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

interface Config {
    github_token?: string;
    gitee_token?: string;
}

const CONFIG_DIR = join(homedir(), '.del-repos');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');

/**
 * 确保配置目录存在
 */
const ensureConfigDir = (): void => {
    if (!existsSync(CONFIG_DIR)) {
        mkdirSync(CONFIG_DIR, { recursive: true });
    }
};

/**
 * 读取配置文件
 * @returns 配置对象
 */
export const readConfig = (): Config => {
    if (!existsSync(CONFIG_FILE)) {
        return {};
    }

    try {
        const configContent = readFileSync(CONFIG_FILE, 'utf-8');
        return JSON.parse(configContent);
    } catch (error) {
        console.warn('Warning: Failed to read config file, using default config');
        return {};
    }
};

/**
 * 写入配置文件
 * @param config 配置对象
 */
export const writeConfig = (config: Config): void => {
    ensureConfigDir();
    try {
        writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error: Failed to write config file');
        throw error;
    }
};

/**
 * 获取平台对应的token
 * @param platform 平台名称
 * @returns token字符串或undefined
 */
export const getToken = (platform: string): string | undefined => {
    const config = readConfig();
    const tokenKey = platform.toLowerCase() === 'github' ? 'github_token' : 'gitee_token';
    return config[tokenKey];
};

/**
 * 保存平台token
 * @param platform 平台名称
 * @param token token字符串
 */
export const saveToken = (platform: string, token: string): void => {
    const config = readConfig();
    const tokenKey = platform.toLowerCase() === 'github' ? 'github_token' : 'gitee_token';
    config[tokenKey] = token;
    writeConfig(config);
};

/**
 * 删除平台token
 * @param platform 平台名称
 */
export const removeToken = (platform: string): void => {
    const config = readConfig();
    const tokenKey = platform.toLowerCase() === 'github' ? 'github_token' : 'gitee_token';
    delete config[tokenKey];
    writeConfig(config);
};

/**
 * 清除所有保存的token
 */
export const clearAllTokens = (): void => {
    writeConfig({});
};

/**
 * 检查是否存在配置文件
 * @returns 是否存在配置文件
 */
export const hasConfig = (): boolean => {
    return existsSync(CONFIG_FILE);
};