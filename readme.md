# 多功能工具集合

一个集成了多个实用工具的开发工具集合网站。

## 主要功能

### 1. 🔄 排列组合工具

- 支持多种元素的排列组合计算
- 可视化展示组合结果

### 2. ⚡ JavaScript 转 TypeScript

- 支持 JavaScript 代码转换为 TypeScript
- 自动类型推导和类型声明生成

### 3. 📝 JSON 格式化工具

- JSON 数据的格式化展示
- 支持 JSON 数据的验证和美化

### 4. ⏰ 火锅定时器

- 火锅食材烹饪时间管理
- 多食材同时计时功能

### 5. 📚 古诗词起名

- 基于古诗词的智能起名
- 支持关键字搜索
- 提供起名排行榜
- 包含丰富的古诗词数据库

### 6. 📅 节假日可视化

- 年度节假日日历展示
- 法定假日、调休工作日统计
- 贡献图形式展示全年日期分布

### 7. 💰 倒推工资计算器

- 税后工资计算
- 支持两种公积金方案：
  - 无补充公积金（7%）
  - 有补充公积金（5% + 5%）
- 工资构成分析
- 工资对照表

## 技术栈

- React
- TypeScript
- Tailwind CSS
- Ant Design
- React Router

## 开发说明

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
src/
├── components/     # 公共组件
├── pages/         # 页面组件
│   ├── CombinationPage/    # 排列组合工具
│   ├── HomePage/          # JS转TS工具
│   ├── JsonFormatPage/    # JSON格式化工具
│   ├── TimerPage/         # 火锅定时器
│   ├── NamerPage/         # 古诗词起名
│   ├── HolidayPage/       # 节假日可视化
│   └── SalaryPage/        # 工资计算器
├── routes.tsx     # 路由配置
└── App.tsx        # 应用入口
```

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目。

## 许可证

MIT
