全栈作品集界面美化技术选型文档
一、基础视觉系统
1.1 样式框架
Tailwind CSS - 原子化 CSS 框架，快速构建响应式布局
CSS Modules - 组件级样式隔离，避免命名冲突
1.2 字体与排版
Google Fonts - 免费引入 Inter/Poppins 等现代字体
@fontsource  - NPM 方式自托管字体文件
1.3 设计系统
CSS 自定义属性 - 定义全局颜色/间距变量
Figma - 提前设计视觉规范稿
二、动画与交互
2.1 核心动画库
framer-motion - React 声明式动画，支持手势与页面过渡
react-spring - 物理动画引擎，适合弹性效果
2.2 微交互
react-tsparticles - 粒子背景效果
react-intersection-observer - 监听元素进入视口触发动画
2.3 加载与反馈
react-spinners - 多样化加载动画组件
react-hot-toast - 轻量级 Toast 通知提示
@headlessui/react - 无障碍模态框与下拉菜单
三、图标与视觉元素
3.1 图标系统
react-icons - 集成 Font Awesome/Tabler 等图标库
lucide-react - 风格统一的线性图标
3.2 视觉效果
react-syntax-highlighter - 博客代码块语法高亮
date-fns - 日期格式化显示
四、页面级增强
4.1 数据展示
@tanstack/react-table - 复杂数据表格（Admin 后台）
react-query - 数据获取与缓存优化
4.2 表单增强
react-hook-form - 高性能表单管理
@hookform/resolvers - 表单验证集成
五、高级视觉特效
5.1 3D 效果
@react-three/fiber - React  Three.js 渲染器
@react-three/drei - 常用 3D 组件库
5.2 背景特效
shader-park - 自定义着色器背景
PIXI.js - 2D 渲染引擎，适合复杂视觉特效
六、性能与优化工具
6.1 图片优化
react-lazy-load-image-component - 图片懒加载与占位
sharp - 后端图片压缩与 WebP 转换
6.2 代码质量
eslint-plugin-tailwindcss - Tailwind 类名排序
prettier - 代码格式化
七、部署与监控
Vercel/Netlify - 前端部署（自动 HTTPS/CDN）
Render - 后端 Node.js 部署
Upptime - 监控 API 可用性
优先级建议：
必需：Tailwind CSS + framer-motion + react-icons
推荐：react-hot-toast + @headlessui/react
可选：3D 特效类根据项目风格选择
技术选型原则：先保证一致性，再考虑复杂度，动画时长控制在 0.2-0.5s。