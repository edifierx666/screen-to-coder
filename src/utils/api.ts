import axios from 'axios';

export async function analyzeImage(imageFile: File): Promise<string> {
  try {
    const base64Image = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

    // 模拟 API 响应
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return `创建一个现代化的用户界面，包含以下元素：

1. 导航栏
   - 固定在顶部
   - 包含 Logo 和主导航链接
   - 响应式设计，移动端显示汉堡菜单

2. 主要内容区
   - 使用网格布局展示内容
   - 实现卡片式设计
   - 添加合适的内边距和间距

3. 交互元素
   - 添加悬停效果
   - 实现平滑过渡动画
   - 包含适当的状态反馈`;
  } catch (error) {
    throw new Error('设计分析失败，请重试');
  }
}

export async function generateStructureAnalysis(): Promise<string> {
  try {
    // 模拟 API 响应
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return `详细的页面结构分析：

1. 组件架构
   - 创建 Header 组件
   - 实现 Navigation 组件
   - 设计 Card 组件系统
   - 开发 Footer 组件

2. 样式指南
   - 主色调：#3B82F6 (蓝色)
   - 次要色：#F3F4F6 (浅灰)
   - 字体系统：系统默认字体栈
   - 间距系统：4px 倍数

3. 响应式断点
   - 移动端：< 640px
   - 平板：640px - 1024px
   - 桌面：> 1024px

4. 性能优化建议
   - 实现组件懒加载
   - 使用图片优化技术
   - 添加性能监控`;
  } catch (error) {
    throw new Error('结构分析生成失败，请重试');
  }
}