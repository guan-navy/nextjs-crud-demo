## Next.js Server Actions

### 原理
- 在组件中使用 `"use server"` 标记的函数会在服务器端执行
- Next.js 自动生成特殊的API端点处理表单提交
- 客户端提交表单时，数据通过这些隐藏的端点发送到服务器

### 工作流程
1. 用户提交表单
2. Next.js 拦截提交事件
3. 数据通过自动生成的安全端点发送
4. 服务器执行对应的函数

### 优势
1. 安全性高
   - 业务逻辑在服务器端执行
   - 接口不对外暴露
   - 内置CSRF保护

2. 开发体验好
   - 无需手动创建API路由
   - 直接在组件中写服务端逻辑
   - 代码组织更清晰

### 示例代码
- [新建博客表单实现](/app/new-post/page.js)