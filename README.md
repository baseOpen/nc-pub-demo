# 说明
- 初始化项目
```
  npm install
```

- 业务组页面的路径：src/containers/App/index.js
- 业务组引入nc-lightapp-front
```
import { createPage, base } from 'nc-lightapp-front';
const { NCInput } = base;
```
createPage 是高阶组件，base是基础组件

# 想要更新nc-lightapp-front
- 在nc-lightapp-front项目中执行 webpack 命令
- 将build文件夹下的index.js拷贝到此项目中的node_modules/nc-lightapp-front/build
