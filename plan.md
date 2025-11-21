全栈作品集项目 21 天开发计划
这是一份将两个配套文档转化为可执行工作日程的开发指南，假设每天投入 6-8 小时，适合作为课程结业项目的冲刺计划。
📋 前置准备（Day 0）
确认工具：安装 Node.js, MongoDB Compass, Postman, Git
确认账号：GitHub, MongoDB Atlas, Render/Vercel 部署平台
确认后端 API 文档：根据 read2.txt 列出所有端点和请求格式
创建仓库：分别初始化前端和后端 Git 仓库（建议分开）
Week 1: 后端 API 开发（核心优先）
Day 1: 后端环境搭建与 MVC 结构
目标：跑通 Express 服务器基础框架
任务：
初始化 Node 项目：npm init -y
安装依赖：express, mongoose, dotenv, cors, helmet, bcrypt, jsonwebtoken
创建文件夹结构：/models, /routes, /controllers, /middleware
配置 .env 文件（DB 连接串、JWT_SECRET、PORT）
编写 server.js：连接 MongoDB Atlas，启动 Express 服务器
添加 helmet 和基础错误处理中间件
产出：服务器本地运行，能响应基础路由
Day 2: 数据模型设计（Mongoose Schemas）
目标：完成所有 5 个数据模型的设计与验证
任务：
User.js：username, email（required + unique）, password（required，minlength: 6）
Project.js：title, description, imageUrl, repoUrl, liveUrl, user(ObjectId)
BlogPost.js：title, content, author(ObjectId), timestamps
Comment.js：body, author(ObjectId), post(ObjectId), timestamps
Message.js：name, email, message, timestamps
为上述模型添加 Mongoose 验证规则（required、unique、minlength 等，确保 User 密码 minlength: 6，email/username unique）
产出：所有模型文件创建完毕，可通过 Mongoose 成功写入测试数据
Day 3: 认证系统 - 注册与登录
目标：用户能注册和登录，获得 JWT
任务：
编写 /controllers/auth.js：注册逻辑（bcrypt 哈希）、登录逻辑（JWT 生成）
创建 /routes/users.js：POST /register, POST /login
使用 Postman 测试：注册新用户、登录获取 token
确保密码被正确哈希存储
产出：认证端点正常，返回有效 JWT
Day 4: 授权中间件与保护路由
目标：实现 JWT 验证和保护路由机制
任务：
编写 /middleware/auth.js：protect 中间件（验证 Authorization header）
将 req.user 附加到通过验证的请求
创建测试路由验证中间件是否生效
关键：确保未授权请求返回 401 错误
产出：protect 中间件可用，能区分公开/保护路由
Day 5: 项目（Project）完整 CRUD
目标：项目管理的所有端点可用
任务：
GET /api/projects & GET /api/projects/:id（公开）
POST /api/projects（保护，需登录）
PUT /api/projects/:id（保护）
DELETE /api/projects/:id（保护）
在 Project 创建时自动关联 req.user._id
产出：Postman 测试所有 Project 端点通过
Day 6: 博客（Blog）完整 CRUD + 授权
目标：博客文章管理，仅作者可修改
任务：
实现 GET /api/blog（populate author 的 username）
实现 GET /api/blog/:id（populate author + comments）
POST /api/blog（保护）
PUT/DELETE /api/blog/:id（保护 + 授权检查：author === req.user.id）
实现 GET /api/blog/:postId/comments（公开）
实现 POST /api/blog/:postId/comments（保护）
产出：博客端点正常，授权逻辑生效
Day 7: 联系表单 + 错误处理 + API 测试日
目标：后端 100% 功能完成并全面测试
任务：
POST /api/contact（接收并保存 Message）
完善中央错误处理中间件（返回一致 JSON 错误）
全面 Postman 测试：逐个测试所有端点
检查 CORS 配置，确保前端能跨域访问
编写后端 README：列出所有 API 端点（方法、URL、用途、请求体/参数示例）
产出：API 文档（README），所有端点通过测试
Week 2: 前端 React 应用开发
Day 8: 前端环境搭建与核心组件
目标：React 应用跑起来，基础组件就位
任务：
create-react-app 或 Vite 初始化项目
安装：react-router-dom, axios
配置 tailwind.css（或 CSS Modules）
创建基础组件：Header, Footer, LoadingSpinner, ErrorMessage
设置 Axios 基础配置（baseURL 指向本地后端）
产出：前端首页能运行，Header/Footer 组件渲染
Day 9: 路由体系与 Context 初始化
目标：多页面路由结构 + 认证 Context
任务：
在 App.js 配置所有 React Router 路由（/projects, /blog, /contact, /login, /register）
创建 /admin 保护路由（暂时硬编码 isLoggedIn）
创建 AuthContext.js：管理 token, user, login/logout 函数
将 Context Provider 包裹整个应用
产出：能导航到所有页面，Context 可用
Day 10: 公共页面 - 项目与博客列表
目标：展示从后端获取的数据
任务：
Projects 页面：useEffect 调用 GET /api/projects，渲染 ProjectCard 列表
Blog 页面：useEffect 调用 GET /api/blog，渲染 BlogPostCard 列表
实现 Loading... 和 Error 的 Conditional Rendering
创建可复用的卡片组件，响应式设计
产出：两个页面能正确显示后端数据
Day 11: 详情页与联系表单
目标：博客详情 + 用户交互
任务：
博客详情页 /blog/:id：获取文章 + 评论列表
详情页底部添加评论表单（仅登录用户可见）
实现 POST /api/blog/:id/comments 提交逻辑
联系页面 /contact：创建受控表单，提交到 POST /api/contact
产出：详情页路由正常，表单能提交数据
Day 12: 认证页面 - 登录与注册
目标：用户能登录，JWT 存储到 Context
任务：
登录表单：受控组件，提交到 POST /api/users/login
注册表单：提交到 POST /api/users/register
登录成功后：存储 token 到 Context + localStorage
Header 组件：根据 Context 状态显示不同导航项
产出：登录/注册功能正常，Header 动态变化
Day 13: 保护路由与 Admin 后台框架
目标：/admin 路由真正受保护
任务：
实现 PrivateRoute 组件：未登录自动跳转到 /login
/admin 路由应用 PrivateRoute
Admin 后台布局：Tab 切换（管理 Projects / 管理 Blog）
创建 Admin 表单组件（共享用于 Create/Update）
产出：未登录无法访问 /admin
Day 14: Admin 后台 - 完整 CRUD 功能
目标：管理员能管理所有内容
任务：
Project 管理列表（GET），带编辑/删除按钮
Blog 管理列表（GET），带编辑/删除按钮
实现 POST /api/projects 和 POST /api/blog（创建）
实现 PUT /api/projects/:id 和 PUT /api/blog/:id（更新）
实现 DELETE 操作（需确认对话框）
产出：Admin 后台能完整管理所有数据
Week 3: 集成、优化与部署
Day 15: 前后端联调与 JWT 传递
目标：前端 Admin 操作能真正影响后端
任务：
Axios 拦截器：自动在请求头添加 Authorization: Bearer <token>
测试 Admin 的所有 POST/PUT/DELETE 操作
修复 CORS 问题（后端 cors() 配置）
处理 token 过期场景（401 错误自动登出）
产出：保护端点能识别用户身份
Day 16: 博客授权逻辑 + 评论功能
目标：仅作者可编辑自己的博客
任务：
在 Admin 的 Blog 列表中，非作者的文章隐藏编辑/删除按钮
评论功能：未登录用户隐藏评论表单
评论提交后，实时刷新评论列表
测试边界情况：尝试编辑他人文章（应失败）
产出：前后端授权逻辑一致
Day 17: UI 抛光与响应式优化
目标：专业外观，移动端友好
任务：
所有页面移动端适配（Tailwind 响应式类）
添加加载动画、Toast 提示（操作成功/失败）
统一配色、字体、间距
Header/Footer 添加社交媒体链接
产出：网站在手机上正常显示
Day 18: 全面功能测试与 Bug 修复
目标：无阻塞性问题
任务：
测试清单：
注册 → 登录 → 进入 Admin → 创建 Project/Blog → 编辑 → 删除
退出登录 → 无法访问 Admin
未登录用户访问：可看项目/博客，不能评论
联系表单提交 → 后端数据库有记录
修复所有发现的 bug
清理 console.log 和无用代码
产出：功能测试报告，所有核心流程通畅
Day 19: 性能优化与安全性检查
目标：生产级质量
任务：
前端：图片懒加载、代码分割（React.lazy）
后端：给 GET /api/blog 和 GET /api/projects 添加简单分页（可选，加分项）
检查：环境变量 .env 是否加入 .gitignore
检查：JWT_SECRET 是否足够复杂
检查：helmet 是否在 Express 中启用
产出：性能和安全清单检查完成
Day 20: 部署后端 API
目标：后端上线，可公开访问
任务：
在 Render/Heroku 创建新服务
配置环境变量（DB 连接串, JWT_SECRET）
部署代码（连接 GitHub 仓库自动部署）
部署后 Postman 测试所有端点
更新前端 .env 为生产环境后端 URL
产出：Live API URL（如 https://my-api.onrender.com）
Day 21: 部署前端 + 最终验证
目标：全栈上线，准备提交
任务：
前端项目：npm run build 生成生产包
部署到 Vercel/Netlify，配置生产环境变量
访问前端域名，测试所有功能：
项目展示、博客、评论、联系表单
注册/登录、Admin 管理
编写 README.md（前端 + 后端）：包含项目简介、技术栈、本地运行步骤、环境变量说明以及前/后端线上地址
提交：Live 前端 URL, Live 后端 URL, 源码链接
产出：全栈部署完成，准备项目提交！
🎯 每日开发小贴士
上午：专注核心逻辑开发（API 或组件）
下午：测试、调试、小功能完善
晚上：代码提交、写当日开发笔记
每周末：回顾本周进度，灵活调整下周计划
遇到问题：优先查阅官方文档，其次社区搜索