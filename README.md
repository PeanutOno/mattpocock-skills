# 真实工程师的技能集

> 一个面向 **opencode** 的 fork,源自 [mattpocock/skills](https://github.com/mattpocock/skills)。所有技能设计与大部分文字归功于 Matt Pocock — 这个 fork 只调整了安装路径与目标 harness。致谢见文末。

一组通过 `SKILL.md` 加载到 opencode 的 agent skills。轻量、易改、可组合、与模型无关,把数十年工程经验沉淀成可复用的实践。拿去改、拿去拆,让它们变成你自己的。

## 快速上手

通过 skills.sh 装到项目里:

```bash
npx skills@latest add PeanutOno/mattpocock-skills
```

或者把整套软链到 opencode 的全局技能目录(无需逐项目安装):

```bash
git clone https://github.com/PeanutOno/mattpocock-skills.git
cd mattpocock-skills
bash scripts/link-skills.sh
```

然后在每个仓库里运行一次 `/setup-matt-pocock-skills`。它会配置好 issue tracker、triage 标签、领域文档布局 — 详见 [`.agents/invocation.md`](./.agents/invocation.md)。

## 在 opencode 中使用

[opencode](https://opencode.ai) 会自动从 `.opencode/skills/`、`.agents/skills/`、`.claude/skills/`(Claude 兼容路径)发现 `SKILL.md`。上面两种安装方式都会把技能放到 opencode 能找到的位置 — 不需要 manifest、marketplace,也不需要逐 harness 配置。

如果想某些技能在所有项目里都可用,`scripts/link-skills.sh` 会把它们软链到 `~/.config/opencode/skills/`(opencode 全局)与 `~/.agents/skills/`。`git pull` 之后再跑一次这个脚本即可同步新加进来的技能。

## 这个 fork 改了什么

- **安装路径**。所有命令都指向 `PeanutOno/mattpocock-skills` 而非 `mattpocock/skills` — 包括 `npx skills add`、手动 git clone、以及 `scripts/link-skills.sh`。
- **opencode 是首选 harness**。Claude Code 插件相关产物(`.claude-plugin/`、marketplace 安装)已经移除。详见 [`.agents/adr/0003-ship-as-opencode-native-skills.md`](./.agents/adr/0003-ship-as-opencode-native-skills.md)。
- **`claude-handoff` → `opencode-handoff`**。形态不变,启动命令改为面向 opencode。
- **`git-guardrails-claude-code` → `git-guardrails`**。现在以 opencode 插件(`plugins/git-guardrails.js`)形式提供,使用 `tool.execute.before` 钩子生效 — 放进 `.opencode/plugins/` 即可。
- **agent 文档合二为一**。`CLAUDE.md` 合并进 [`AGENTS.md`](./AGENTS.md)。

同步策略:有需要时从 `mattpocock/skills:main` 拉取,然后把这个 fork 的 delta 重新叠加上去。

## 常见走法

> **只是参考,不是固定流程。** 具体怎么走取决于你面对的问题与已有的产物,跳过某些步骤或从中间插入都可以。

这些技能不是孤立的散件 —— 大部分工作沿一条**主流程**走,两路**入场点**汇入;少数独立可用,有两个**词汇层**贯穿始终。

不确定接下来该用哪个?直接 [`/ask-matt`](./skills/engineering/ask-matt/SKILL.md) —— 它是所有用户调用技能的总路由。

### 一次性配置

每个仓库先跑一次:

- [`/setup-matt-pocock-skills`](./skills/engineering/setup-matt-pocock-skills/SKILL.md) — 配置 issue tracker、triage 标签、领域文档布局。后续技能默认这套配置已就绪。

### 主流程: idea → ship

一步步:

1. **从打磨想法开始**。
   - **普通想法**(单会话装得下)→ [`/grill-with-docs`](./skills/engineering/grill-with-docs/SKILL.md) 把想法磨透,把术语与决策沉淀到 `CONTEXT.md` 与 ADR。
   - **大块雾区**(greenfield、超大特性,单会话装不下)→ [`/wayfinder`](./skills/engineering/wayfinder/SKILL.md) 先出**决策 ticket 地图**,逐张解决直到视野清晰,再回来走第 3 步的 `/to-spec`。wayfinder 只产出决策,不直接交付代码。
   - **无 codebase** → [`/grill-me`](./skills/productivity/grill-me/SKILL.md)(无状态版本)。

2. **遇到需要可运行答案的问题时绕路**(可选)。通过 [`/handoff`](./skills/productivity/handoff/SKILL.md) 分叉到新会话,跑 [`/prototype`](./skills/engineering/prototype/SKILL.md) 拿到答案,再 `handoff` 回到主流程。

3. **决定怎么拆**。
   - 跨多会话构建 → [`/to-spec`](./skills/engineering/to-spec/SKILL.md) 把线索转成 spec,再 [`/to-tickets`](./skills/engineering/to-tickets/SKILL.md) 拆成带阻塞边的 tracer-bullet ticket。
   - 单会话够用 → 直接 [`/implement`](./skills/engineering/implement/SKILL.md)。

4. **逐 ticket 实现**。每个 ticket 在干净 context 里跑 `/implement`(内部驱动 [`/tdd`](./skills/engineering/tdd/SKILL.md),一个 red-green 切片一次);提交前跑 [`/code-review`](./skills/engineering/code-review/SKILL.md),再开下一个。

> **上下文卫生**:第 1–3 步保持在同一个 context window 里不打断,让 grilling、spec、tickets 共享同一段思考;`/implement` 每次清空后重新开始。

### 入场点

不是从想法开始,而是从已有产物出发:

- **issue 堆积** → [`/triage`](./skills/engineering/triage/SKILL.md)(只处理外部 issue;`/to-tickets` 出的不需要 triage)→ `/implement`
- **出 bug** → [`/diagnosing-bugs`](./skills/engineering/diagnosing-bugs/SKILL.md);根因是没接缝时,post-mortem 把它交到 [`/improve-codebase-architecture`](./skills/engineering/improve-codebase-architecture/SKILL.md)

### 代码库健康

非功能工作,日常维护:

- [`/improve-codebase-architecture`](./skills/engineering/improve-codebase-architecture/SKILL.md) — 闲时跑,产出"可深化的机会";挑一个进入主流程的 `/grill-with-docs`。

### 词汇层

贯穿所有上层技能,被它们按需调用:

- [`/domain-modeling`](./skills/engineering/domain-modeling/SKILL.md) — 打磨领域术语,把决策记到 `CONTEXT.md` 与 ADR。`/grill-with-docs` 主动驱动它。
- [`/codebase-design`](./skills/engineering/codebase-design/SKILL.md) — 深模块词汇(模块、接口、深度、接缝、适配器、杠杆、局部性)。`/tdd` 与 `/improve-codebase-architecture` 都用它。

### 跨会话

- [`/handoff`](./skills/productivity/handoff/SKILL.md) — 把当前对话压成文件,**新开会话**并引用它继续。分叉用,跨阶段保留完整思路。
- `/compact`(opencode 内置)— 留在同一会话里,摘要早先内容。**只在阶段切换时用**,不要在阶段中间用。

### 独立

- [`/research`](./skills/engineering/research/SKILL.md) — 后台调研,产出带引用的 markdown;结果带回到 `/grill-with-docs`,不替代它。
- [`/teach`](./skills/productivity/teach/SKILL.md) — 跨多会话教一项概念,把当前目录当状态化的工作区。
- [`/writing-great-skills`](./skills/productivity/writing-great-skills/SKILL.md) — 写/改 skill 的参考资料。

---

完整关系图与决策细节见 [`ask-matt`](./skills/engineering/ask-matt/SKILL.md)。

## 技能清单

仅展示 promoted 的桶。技能按一个维度划分 — **谁能调用**。**用户调用** 的技能只能由你显式触发(如 `/grill-me`),负责编排。**模型调用** 的技能既可被你触发,也可被智能体在任务匹配时主动拾起,承载可复用的方法论。

### 工程(Engineering)

日常编码工作。

**用户调用**

- **[ask-matt](./skills/engineering/ask-matt/SKILL.md)** — 询问当前场景该用哪个 skill 或流程。本仓库用户调用技能的总路由。
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)** — 一场 grilling 会话,顺带搭起项目的领域模型,把术语梳理清楚并就地更新 `CONTEXT.md` 与 ADR。
- **[triage](./skills/engineering/triage/SKILL.md)** — 把 issue 在 triage 角色的状态机里逐级推进。
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)** — 扫描代码库找出可深化的机会,生成可视化的 HTML 报告,再就你挑的那一项做 grilling。
- **[setup-matt-pocock-skills](./skills/engineering/setup-matt-pocock-skills/SKILL.md)** — 为工程类技能配置本仓库(issue tracker、triage 标签、领域文档布局)。在首次使用其他工程类技能之前,每个仓库运行一次。
- **[to-spec](./skills/engineering/to-spec/SKILL.md)** — 把当前对话转成一份 spec 并发布到 issue tracker。不做访谈,只综合你已讨论过的内容。
- **[to-tickets](./skills/engineering/to-tickets/SKILL.md)** — 把一份计划、spec 或当前对话拆成一组 tracer-bullet ticket,各自声明阻塞边 — 本地文件以纯文本形式记录,或在真正的 tracker 上用原生阻塞链接记录。
- **[implement](./skills/engineering/implement/SKILL.md)** — 按 spec 或一组 ticket 推进实现,在约定好的接缝处驱动 `/tdd`,并在提交前用 `/code-review` 收尾。
- **[wayfinder](./skills/engineering/wayfinder/SKILL.md)** — 为远超单次会话容量的大块工作做规划,以 issue tracker 上的决策 ticket 共享地图,逐张解决直到通向目标的路径清晰。

**模型调用**

- **[prototype](./skills/engineering/prototype/SKILL.md)** — 搭建一个一次性原型回答设计问题 — 状态/逻辑问题用可在终端跑的小应用,UI 问题用同一个路由下可切换的几种截然不同的变体。
- **[diagnosing-bugs](./skills/engineering/diagnosing-bugs/SKILL.md)** — 面向疑难 bug 与性能回归的规范诊断循环:复现 → 最小化 → 假设 → 埋点 → 修复 → 回归测试。
- **[research](./skills/engineering/research/SKILL.md)** — 围绕高可信一手资料调研一个问题,把结果沉淀为带引用的 Markdown 文件存入仓库,以后台 agent 形式运行。
- **[tdd](./skills/engineering/tdd/SKILL.md)** — 测试驱动开发,red-green-refactor 循环,一次一个纵切片地搭功能或修 bug。
- **[domain-modeling](./skills/engineering/domain-modeling/SKILL.md)** — 主动搭建并打磨项目的领域模型 — 用术语表挑战现有概念,用边界场景做压力测试,并就地更新 `CONTEXT.md` 与 ADR。
- **[codebase-design](./skills/engineering/codebase-design/SKILL.md)** — 设计"深模块"的共享纪律与词汇:一个简洁接口背后承载大量行为,接缝干净,且能通过该接口测试。
- **[code-review](./skills/engineering/code-review/SKILL.md)** — 沿两条轴评审某固定点以来的 diff:**标准**(是否遵循仓库编码规范,加上 Fowler 的坏味基线)与**需求**(是否忠实实现 issue/PRD),由两个并行子 agent 分别执行以避免互相污染。
- **[resolving-merge-conflicts](./skills/engineering/resolving-merge-conflicts/SKILL.md)** — 逐 hunk 拆解进行中的 git merge/rebase 冲突,按两侧一手来源追溯意图后解决,最后完成操作 — 永远不要 `--abort`。

### 生产力(Productivity)

通用工作流工具,与代码无关。

**用户调用**

- **[grill-me](./skills/productivity/grill-me/SKILL.md)** — 对你的计划或设计做无情的拷问,直到决策树的每一根枝丫都被解决。
- **[handoff](./skills/productivity/handoff/SKILL.md)** — 把当前对话压成一份交接文档,让另一个 agent 能继续工作。
- **[teach](./skills/productivity/teach/SKILL.md)** — 跨多轮会话教你一项新技能或新概念,把当前目录作为带状态的教学工作区。
- **[writing-great-skills](./skills/productivity/writing-great-skills/SKILL.md)** — 写好、改好 skill 的参考资料 — 让 skill 表现可预测的词汇与原则。

**模型调用**

- **[grilling](./skills/productivity/grilling/SKILL.md)** — 无情地拷问用户关于计划、决策或想法,直到决策树的每一根枝丫都被解决。`grill-me` 与 `grill-with-docs` 共享的复用循环。

## 致谢

本仓库所有技能设计与大部分文字来自 Matt Pocock 的 [mattpocock/skills](https://github.com/mattpocock/skills),MIT 协议。这个 fork 是 opencode 专版的再分发:我跟随上游节奏,把安装路径移植过来,并按 [`.agents/adr/0003`](./.agents/adr/0003-ship-as-opencode-native-skills.md) 适配 opencode-handoff 与 git-guardrails。