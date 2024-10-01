/**
 * 输出带颜色的控制台日志
 * @param message 要输出的消息
 * @param hexColor 十六进制颜色代码（例如 '#8E7DE1'）
 */
export const colorLog = (message: string, hexColor: string): void => {
    // 验证十六进制颜色格式
    if (!/^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
        throw new Error('Invalid hex color format. Use #RRGGBB');
    }

    // 将 HEX 颜色转换为 RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // 计算接近的 ANSI 256 色彩代码
    const ansi256 = 16 + 36 * Math.round((r / 255) * 5) + 6 * Math.round((g / 255) * 5) + Math.round((b / 255) * 5);

    // 构建 ANSI 转义序列
    const colorCode = `\x1b[38;5;${ansi256}m`;
    const resetCode = '\x1b[0m';

    // 输出带颜色的消息
    console.log(`${colorCode}${message}${resetCode}`);
};
