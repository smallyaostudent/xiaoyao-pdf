# xiaoyao-pdf fork — 内网 / 气隙环境部署白名单

> 本文档对应 fork-roadmap §A1（关闭所有外网调用）。
> 列出 xiaoyao-pdf fork **默认禁用但仍可能在源码中残留硬编码 URL** 的所有外网调用，
> 给出每个调用的功能目的、当前的禁用策略、以及内网化时的替代方案。
>
> **默认状态下 xiaoyao-pdf 不会主动发起任何对外网服务的调用。**
> 但有几个已被禁用的开关（如 OAuth2、SAML2、AATL、EUTL），如果运维手动打开，
> 会重新触发外网请求——本文档就是这些开关的"已知外网白名单"清单。

---

## 0. 验收命令

启动后用下列命令确认无意外外网调用：

```powershell
# 找出当前 jar/源码中所有 https:// URL（排除测试、localhost、注释）
cd "E:\PDF编辑工具\PDF编辑工具1.0\Stirling-PDF-main"
Get-ChildItem -Path app/core/src,app/common/src,app/proprietary/src -Recurse -Filter *.java |
  Select-String -Pattern 'https://[a-zA-Z0-9.-]+' |
  Select-Object -Unique Path, Line
```

对照本文档的清单逐项排查。任何不在清单内的 URL 都视为"未预期外网调用"，
需要联系 α track owner 处理。

---

## 1. 默认已禁用的外网调用（运行时）

下面这些都是 fork-roadmap §A1 表格里列出的**已经完成处置**的项目，
默认 `false` / 指向内网占位，启动后不会再向外网发起请求。

### 1.1 PostHog telemetry（产品遥测）

| 字段 | 状态 | 默认值 |
|---|---|---|
| `system.enableAnalytics` | settings.yml.template | **`false`**（原 `null`） |
| `system.enablePosthog` | settings.yml.template | **`false`**（原 `null`） |

**触发位置**：`app/core/src/main/java/.../service/analytics/PostHogService.java`

**内网替代**：无。如需遥测，部署内网 PostHog 或自建 telemetry 收集点，
重新启用 `enablePosthog: true` 并设置 `posthog.host` 指向内网实例。

---

### 1.2 Scarf tracking pixel（产品统计）

| 字段 | 状态 | 默认值 |
|---|---|---|
| `system.enableScarf` | settings.yml.template | **`false`**（原 `null`） |

**触发位置**：`frontend/editor/src/core/hooks/useScarfTracking.ts`（前端 SPA 加载时）
打点：`https://static.scarf.sh/a.png`

**内网替代**：删除 `useScarfTracking` 的调用，或替换为内部埋点。

---

### 1.3 Google Visibility / robots.txt（搜索引擎收录）

| 字段 | 状态 | 默认值 |
|---|---|---|
| `system.googlevisibility` | settings.yml.template | **`false`**（不变） |

**触发位置**：`app/core/.../controller/web/RobotsController.java`

**说明**：默认就是 false，但注释容易被忽视。这里再强调一次：内网实例
保持 false，不要开放。

---

### 1.4 远程版本检查

| 字段 | 状态 | 默认值 |
|---|---|---|
| `system.showUpdate` | settings.yml.template | **`false`**（原 `true`） |
| `system.showUpdateOnlyAdmin` | settings.yml.template | `true`（不变） |

**触发位置**：`frontend/editor/src/core/services/updateService.ts` —
前端 SPA 启动时调用 GitHub API 检查是否有新版本。

**API endpoint**：`https://api.github.com/repos/Stirling-Tools/Stirling-PDF/releases/latest`

**内网替代**：删除 `updateService.ts` 的 GitHub API 调用，或换为内部 release feed。

---

### 1.5 外网 OAuth2 / OIDC

| 字段 | 状态 | 默认值 |
|---|---|---|
| `security.oauth2.enabled` | settings.yml.template | **`false`**（原 `true`） |

**触发位置**：当 enabled=true 时，
`security.oauth2.issuer` / `clientId` / `clientSecret` 会用于
OAuth2/OIDC login 流程的 discovery + token exchange。

**内网替代**：
1. 部署内网 Keycloak / Authing / 飞书企业版
2. 启用 `security.oauth2.enabled: true`
3. 设置 `security.oauth2.issuer` 指向内网 IdP 的 discovery endpoint
4. `clientId` / `clientSecret` 通过环境变量注入

---

### 1.6 外网 SAML2

| 字段 | 状态 | 默认值 |
|---|---|---|
| `security.saml2.enabled` | settings.yml.template | **`false`**（不变） |

**触发位置**：`security.saml2.idpMetadataUri` 配置的 URL 在启动时被拉取。

**内网替代**：同上，部署内网 SAML2 IdP 后设置 `idpMetadataUri`。

---

### 1.7 PDF 签名验证：AATL / EUTL（CA 证书下载）

| 字段 | 状态 | 默认值 |
|---|---|---|
| `security.validation.trust.useAATL` | settings.yml.template | **`false`**（不变） |
| `security.validation.trust.useEUTL` | settings.yml.template | **`false`**（不变） |

**触发位置**：enabled 时启动时下载 Adobe / EU 的可信证书列表。

**API endpoints**：
- AATL: `https://trustlist.adobe.com/tl.pdf`
- EUTL: `https://ec.europa.eu/tools/lotl/eu-lotl.xml`

**内网替代**：内网 CA 通过 `security.validation.trust.serverAsAnchor: true` +
公司自签 CA 注入 JVM truststore。

---

### 1.8 PDF 签名时间戳（TSA）

| 字段 | 状态 | 默认值 |
|---|---|---|
| `security.timestamp.defaultTsaUrl` | settings.yml.template | **`http://timestamp.local`**（原 `http://timestamp.digicert.com`） |

**触发位置**：PDF 签名时调用 TSA 获取 RFC 3161 时间戳。

**内网替代**：部署内网 TSA（如公司自签 TSA），设置 URL 指向它。

---

## 2. CI / 构建时已知的硬编码外网（不影响运行时）

下面这些是 **CI / GitHub Actions / GitLab CI** 配置里的外网引用，**不影响运行时 jar 启动**，
但提交 PR / 跑 CI 时会触发外网请求。

| 文件 | 外网引用 |
|---|---|
| `.github/workflows/*.yml` | GitHub API、SonarCloud、Snyk、Depot、Anchore、Scarf CI badge |
| `app/allowed-licenses.json` | 许可证白名单（构建时用） |
| `build.gradle` | `repositories { mavenCentral() }` |

**内网替代**：
- 公司内网跑 CI 时设 `MAVEN_PUBLIC_URL` 环境变量指向 Nexus/Artifactory
- 跳过 `.github/workflows` 或用 fork 自己的 CI

---

## 3. 启动后实际发起的 HTTP 请求验证

```powershell
# 启动 xiaoyao-pdf
cd "E:\PDF编辑工具\PDF编辑工具1.0\Stirling-PDF-main"
java -jar app/core/build/libs/*.jar

# 另一个终端：用 Windows 资源监视器 / Fiddler / Wireshark 抓包
# 应该看不到任何出站请求（除 localhost:8080 + JVM 自己）
```

---

## 4. 内网 Maven / NPM 镜像配置

见 `docs/internal-deployment.md`（如果不存在则参考 Stirling-PDF 官方文档：
`MAVEN_PUBLIC_URL` / `MAVEN_USER` / `MAVEN_PASSWORD` 环境变量，
`frontend/editor/.npmrc` 指向公司 npm registry）。

---

## 5. 公司 CA 注入

JVM 默认 truststore 在 `${JAVA_HOME}/lib/security/cacerts`。
把公司根 CA 加入：

```bash
keytool -import -trustcacerts -alias corp-ca -file corp-ca.crt \
  -keystore $JAVA_HOME/lib/security/cacerts -storepass changeit
```

或在 Docker 启动时：

```dockerfile
COPY configs/corp-ca.crt /usr/local/share/ca-certificates/
RUN update-ca-certificates
```

---

## 6. 已知限制

以下功能**不能内网化**，因为它们设计上是 SaaS-only：

- Stirling Cloud 账户链接（`portal.*` UI）
- PostHog Cloud
- Scarf Cloud
- Adobe AATL / EU EUTL 下载
- GitHub Releases 版本检查

如果公司业务需要这些功能，**必须**开通对应的外网访问，或部署对应的内网替代品。

---

## 7. 变更日志

- **2026-07-06**（xiaoyao-pdf fork 初始化，A1）：所有上表字段默认 false / 内网占位。