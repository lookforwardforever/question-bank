# 分批路线图

> 原则：先面试第一梯队，再项目精读补全；每批 20 题，稳定落盘。生成一次，之后只读文件，不再花 token。

## 已完成

| 批次 | 领域 | 题量 | id 前缀 | 状态 |
|---|---|---|---|---|
| batch-1 | VLA / 具身智能 | 100 | `VLA-` | ✅ 已完成（选择 40 / 判断 20 / 填空 20 / 简答 15 / 论述 5） |
| batch-2 | 控制算法 | 20 | `CTRL-` | ✅ 已完成（PID/LQR/iLQR/MPC/QP/WBC/ZMP/casadi/acados/crocoddyl/滑模） |
| batch-3 | 运动控制与 RL | 20 | `RL-` | ✅ 已完成（MDP/PPO/SAC/GAE/AMP/ASE/legged_gym/sim2real/运动模仿） |
| batch-4 | 水下机器人 | 20 | `UUV-` | ✅ 已完成（Fossen/附加质量/声呐/DVL/USBL/BlueROV/ArduSub/DAVE/Stonefish） |
| batch-5 | 世界模型与仿真 | 20 | `WM-` | ✅ 已完成（MuJoCo/Bullet/Genesis/IsaacLab/碰撞检测/三类世界模型/sim2real） |
| batch-6 | 数据工程与部署 | 20 | `DATA-` | ✅ 已完成（LeRobot v3/RLDS/DROID/管线/vLLM/FlashRT/CUDA Graph/量化/Jetson） |
| batch-7 | 前沿追踪（网络来源） | 30 | `FRONT-` | ✅ 已完成（SuperMimic/BlinkMimic/XMimic/MorphMimic/M3imic/MimicDroid/SUGAR/BeyondMimic/GR00T2/TouchWorld/MoDE-VLA/TeleDexter/TacClaw） |
| batch-8 | 灵巧手与操作（双片并行） | 80 | `DEX-` | ✅ 已完成（自由度/降维/GMR/BiDexHand/GenDexGrasp/DexMimicGen/MANO/UniDex/EgoMimic/ManipNet/UniHand/HumanPlus/点云/触觉，一次并行 2×40） |
| batch-9 | 八大方向前沿（双片并行） | 40 | `FRONT-031~070` | ✅ 已完成（RT-2/GR00T N1.7/Gemini2.5/Helix/JEPA 系/安全评测/MorphMimic 深度/LingBot-Touch/DTWM/世界模型五分类/空间表征/本体算力，来源：前沿-42 速记+arXiv） |
| batch-10 | U4 强化学习单元（双片并行） | 80 | `RL-021~100` | ✅ 已完成（MDP/PPO/SAC/TD3/CQL 数学、legged_gym 工程、humanoid-gym 帧堆叠/相位时钟/sim2sim、DreamWaQ、蒸馏部署，2026 前沿 BFM-Zero/APEX 棘轮/GRPO/自动奖励，含 4 个网络 URL） |
| batch-11 | U4 补齐 + U10 水下开工（五片并行） | 180 | `RL-101~200` / `UUV-021~100` | ✅ 已完成（RL：GAE/PPO 手撕数学、unitree/booster/skrl、DreamWaQ/AMP 深挖、EMA/目标网络/课程/蒸馏；UUV：附加质量系数与辨识、Fossen 各项、声呐/DVL/USBL、MarineGym/sonar-SLAM/UNav-Sim/Angler、ArduSub/BlueROV/Stonefish、水下 VLA 与迁移论述） |
| batch-12 | U10 收官 + U5 开工（四片并行） | 100 | `UUV-101~160` / `WBC-001~040` | ✅ 已完成（U10：LBL/SBL/TERCOM/EKF、声学通信/光通信/对接/ARV/VBS、耐压/充油/推进器/缆绳、UVMS/液压臂/声呐loader/图像增强/覆盖路径/产业选型；U5：QP/KKT、WBC 目标与约束、分层 QP/零空间、浮动基/质心/SRB/LIPM/ZMP/CP、OCS2、WBC 推导与控制栈） |
| batch-13 | U5 全身控制（单片 40） | 40 | `WBC-041~080` | ✅ 已完成（阻抗/导纳/柔顺：输入输出方向、控制律与量纲、临界阻尼、增益调度接触过渡、混合力位 S 矩阵、SEA、摩擦锥内接近似、力控带宽四卡点、动量观测器、全身阻抗接 WBC；MPC 落地：滚动时域、线性 MPC=QP、MPC/LQR 等价、acados RTI、mjpc 采样、MPC-WBC 分工、终端代价、dial-mpc 退火、采样瓶颈 rollouts） |

| batch-14 | U5 收官（两片并行） | 80 | `WBC-081~160` | ✅ 已完成（MPC 落地：crocoddyl/FDDP/接触序列、mjpc 七规划器与 gRPC/direct、acados RTI/condensing/全局化、miniMPC 约束验证、热启动与实时预算、TD-MPC、采样瓶颈；人形系统：humanoid-gym 帧堆叠 705、HumanoidVerse 三引擎、booster_gym T1.pt、BerkeleyHumanoid、IIT 组件库、InternHumanoid 上下半身、RoboJuDo 三层、ASE 风格、push recovery 三策略与 arXiv 2505.11495 撑墙抗推、sim2real 检查清单） |

| batch-15 | U1 数学与控制理论（两片并行） | 80 | `CTRL-021~100` | ✅ 已完成（数学地基：SVD/条件数/伪逆/正定二次型、旋量-Chasles-POE-伴随-SO(3)-hat、GMM-GMR-EM、粒子滤波与卡尔曼、凸性与对偶、李群优化、最小二乘/FOS；控制理论：可控可观/极点配置/计算力矩/反馈线性化、滑模抖振与边界层、MRAC/H∞/增益调度、采样与纯延迟、LQR-卡尔曼对偶、EKF-UKF、RLS、李雅普诺夫、两篇论述：Riccati 手撕 + 数学工具选用地图 + 动力学到 LQR 全链 + 传统与学习控制边界） |

| batch-16 | U1 收官 20 + U3 开工 40 | 60 | `CTRL-101~120`、`IMIT-001~040` | ✅ 已完成（U1 收官：增益/相位裕度、Nyquist、anti-windup、微分先行/不完全微分、龙伯格观测器、RK4、模型降阶、摩擦补偿、三环伺服论述；U3 首片：BC 目标与协变量偏移、DAgger、ACT 分块-CVAE-时间集成、扩散策略多模态/双时域、DP3 点云与坐标系、流匹配 ODE、robomimic HDF5、数据质量与多样性） |

| batch-17 | U3 收官（三片） | 120 | `IMIT-041~160` | ✅ 已完成（运动模仿主线：motion_imitation 奖励/相位/早期终止、DeepMimic、AMP 判别器与训练不稳、ASE、PHC、MaskedMimic、BeyondMimic、HumanPlus；重定向与数据管线：IK 三解法、阻尼最小二乘、mink FrameTask/两种 Limit/迭代收敛 0.001/daqp、四元数顺序与双覆盖、双阶段表、error1/error2、soma-retargeter GPU IK 与脚稳定、DexMimicGen 相对轨迹迁移；遥操作与落地：LeRobot 16 种遥操作器/get_action 与 send_feedback/DAgger 吸位姿、Twist2 VR 链路/35 维观测/状态机/插值、评估 pc_success 与数据飞轮、QUANTILES、EMA/LoRA/梯度累积、三条路线选型） |

| batch-18 | U2 VLA 三片并行 | 120 | `VLA-109~228` | ✅ 已完成（架构与动作表示：动作头三范式、Octo 256 箱与 readout、块状因果注意力、按具身反归一化、SmolVLA 半宽专家与缺失相机 mask；π 系与 RDT：π0.5 动作块 50、π0.6 RECAP 分布价值与 MEM、RDT-1B 双流 DiT 与 DDPM 50 步、RTC 三实现、vLLM/SGLang 与 TensorRT/FlashRT 选型；项目精读：CogACT、GR00T N1.7、SpatialVLA、MemoryVLA、X-VLA、InternVLA-M1、NaVILA、DynamicVLA） |

| batch-19 | U2 收官（四强与评测） | 40 | `VLA-229~268` | ✅ 已完成（国产四强：共同配方 Qwen 系 VLM + DiT/FM、LingBot 双流 36 层专家与 Token MoE/canonical 动作向量/6 万小时 20 构型、XIAOMI 16 层 DiT 与 5 步/30 步 chunk/局部窗口 4 与前缀屏蔽、UniFoLM future_tokens 与 OXE、XR-1 全身闭源；跨具身三路线对比；评测：SimplerEnv 两种设置与 7D 动作、CALVIN 34 任务 11 类与 ABC→D/平均完成长度、重规划 10/30、hash 种子、24 维 PAD、服务化与视频留档） |

| batch-20 | U6 仿真与世界模型（片一：物理引擎） | 40 | `WM-021~060` | ✅ 已完成（mj_step 五阶段与稀疏 LDLᵀ、质量缩放、pyramidal 摩擦锥、solref 双参数、MJX 的 JAX 重写、MJWarp nworld 批量、CUDA Graph 重捕获、IsaacLab 三后端与克隆机制与 PHYSICS_READY order 20、Genesis Quadrants 编译与一场景一状态、PyBullet PGS、SAPIEN 部件级、Newton 后端、URDF→MJCF 五关键、仿真三级排查、可微物理三类用法、MuJoCo→IsaacLab 迁移） |

| batch-21 | U6 世界模型（片二：生成式/控制式） | 40 | `WM-061~100` | ✅ 已完成（Cosmos 3 的 MoT 双模式、Super/Nano/Edge 三档、9D 位姿与 6D 旋转、正逆策略三种动力学、57D 人手动作、DMD2 4 步蒸馏 17-25 倍；Genie 3 的 latent action 与生成式 RL；V-JEPA 2 表征预测与 EMA 防坍缩；Dreamer 4 梦境训练与 V3 通用性；TD-MPC 50 维潜空间与 CEM 512/51/6；DreamZero WAM 画面加动作双预测；BWM 低成本三用；GR00T-Dreams 任务链与 GR00T-N1 双脑与 CategorySpecificLinear；UniSim 数据驱动仿真器与 UniPi 视频生成加 IDM；1XGPT 的 MAGVIT2 256 token 与先空间后时间注意力与 MaskGIT；LingBot-World KV 滚动加 Sink、Kairos 三注意力；世界模型评估三维度与 mini 实验教训） |

| batch-22 | U6 仿真生态与基准（片三） | 40 | `WM-101~140` | ✅ 已完成（BEHAVIOR-1K 的 1000 项家庭活动与 OmniGibson 与四层动作与语义/符号原语与 apply_ref 五次重试与 CuRobo 的 GPU 批量 IK 规划 10-100 倍；GRUtopia 10 万场景 287 类与 LWM-bench 测世界模型；HumanoidVerse 三仿真器 IsaacGym/IsaacSim/Genesis 与三层分离与 H1/G1 自由度；SIMPLE 50+ 人形全身任务与 IsaacSim 4.5 加 MuJoCo 3.3 双引擎与 Cosmos3/DreamZero 当策略；仿真选型决策树与 sim2real 五板斧与三个常见坑；长程成功率乘性衰减与评测三层递进） |

| batch-23 | U6 收官（运动规划与世界模型风险） | 40 | `WM-141~180` | ✅ 已完成（OMPL 的 RRTConnect 双向树、RRT* 重连、PRM 多查询、概率完备与最优的区别、Hybrid A* 与 DWA、CHOMP/TrajOpt 轨迹优化；C 空间与工作空间分工、MoveIt 规划链路、规划执行分离；dm_control 的 physics_timestep 与控制步子步、MuJoCo Playground 的 MJX、RoboSuite 与 RoboCasa；世界模型幻觉三层评估与生成数据四道闸门、数据工厂风险控制体系） |

| batch-24 | U7 灵巧手补强（片一：抓取与触觉） | 40 | `DEX-081~120` | ✅ 已完成（力封闭与形封闭、FPC 三维力、平行夹爪的摩擦依赖、抓取质量裕度、GraspNet 十亿标注与稠密预测、腱驱动 vs 直驱、BiDexHand 16DoF 与 15 腱驱动、影射 vs IK 重定向、腱张力校准、压电滑觉、GelSight、触觉选型三角、滑觉增力、轴孔力位混合、阻抗刚度、在手操作、触觉视觉融合、灵巧手全栈设计与触觉精细操作方案） |

| batch-25 | U7 收官（数据、在手操作与触觉迁移） | 40 | `DEX-121~160` | ✅ 已完成（GRAB 人手抓取、DexYCB 的 YCB 物体、OakInk 可供性、DexArt 铰接物体；finger gaiting 与再抓取、在手旋转的接触难点；TaCo 触觉仿真与四环境、触觉 sim2real 的凝胶与接触误差；关节/末端/协同三种动作表示、维度灾难与分层、课程学习四级递进、几何增强的物理可行性、三维泛化评测；灵巧手研究选型与触觉迁移全链路） |

| batch-26 | U8 数据工程（片一：格式与数据集） | 40 | `DATA-021~060` | ✅ 已完成（LeRobot v3 的 Parquet 列式随机访问与 mp4 视频分家与帧索引对齐；RLDS 的 TFRecord 与 episode 四元组；HDF5 的 master/puppet 与深度图毫米判断；RoboMIND 107k 轨迹/479 任务/96 物体/4 本体与单位规范与 LeRobot 转换；AgiBot 100 万轨迹/43.8T/GO-1 的 Latent Planner 与 ctrl_freqs 与 24GB 动作专家微调；OXE 22 具身/1M episode/527 技能与动作归一化加 DOF mask；DROID 18 实验室/Oculus 手柄/RLDS；三种采集哲学与多本体数据集设计） |

| batch-27 | U8 数据工程（片二：采集、标注、增强与飞轮） | 40 | `DATA-061~100` | ✅ 已完成（遥操作四种方式选型、多相机分工、单任务几百到几千与 VLA 十万到百万量级、清洗五件事、语言标注 VLM 加抽检、MEAN_STD/MIN_MAX/QUANTILES、delta 与绝对动作、按 episode 划分防泄露、增强的不变性原理与 mini 实验 84.5→93.5、平移增强破坏位置敏感标签、平衡采样 4/4/4、padding 与投影头、长尾重采样、飞轮失败回流、数据够不够四信号、多本体三件套、抓取数据方案与版本管理） |

| batch-28 | U8 收官（质量评估与训练配方） | 40 | `DATA-101~140` | ✅ 已完成（数据质量最终看下游成功率、学习曲线与 loss 的区别、多样性与 DROID、过拟合排查、透明物体补采、embedding 距离与统计量、外推测试；UniFoLM 的双窗口 chunk、中性动作绝对重复相对置零、pad_mask、ActionTokenizer 256 桶、POS_EULER 8 维、配置即适配；RL Token 正 1.25/负 0.75/干预 1.5、sidecar 先帧级再 episode 回退；质量四信号、补数据顺序、混合配方、防灾难性遗忘三招、质量评估体系与多数据集训练配方） |

| batch-29 | U9 推理部署（片一：服务引擎与量化） | 40 | `DEPLOY-013~052` | ✅ 已完成（原 DATA-001~020 拆分为 DATA-001~008 + DEPLOY-001~012；本片覆盖 PagedAttention、连续批处理、前缀缓存、KV 显存、TTFT/TPOT、RadixAttention、投机解码、FP8 E4M3/E5M2、INT4 weight-only、AWQ/GPTQ/SmoothQuant、逐通道量化、TensorRT engine 硬件绑定、FlashRT 八组件与零编译、Jetson 统一内存、PTQ 校准、三引擎选型、VLA 上 Jetson 部署链路、高吞吐与低延迟架构） |

| batch-30 | U9 推理部署（片二：量化进阶、剪枝蒸馏、边缘监控） | 40 | `DEPLOY-053~092` | ✅ 已完成（对称/非对称量化、量化步长与误差、混合精度、KV cache 量化、W4A16、GPTQ 逐层重建、校准分布偏移、离群值裁剪、动态缩放、QAT 假量化；结构化/非结构化剪枝、剪枝后微调、迭代剪枝、蒸馏温度与 KL 损失；TensorRT 层融合与动态 shape profile、GPU 利用率与带宽瓶颈、P99 与过载降级；VLA 压缩方案与边缘监控体系） |

| batch-31 | U9 推理部署（片三：服务化、分布式与端侧） | 40 | `DEPLOY-093~132` | ✅ 已完成（OpenAI 兼容与 SSE、准入控制、副本选路、readiness/liveness、优雅停机、金丝雀与影子流量；TP/PP/EP、NCCL Ring AllReduce、NVLink 拓扑、prefill-decode 分离；ROS2 QoS、depth=1、零拷贝、PTP、看门狗、急停、热降频、OTA 回滚；Little 定律、多副本服务架构、端侧推理系统） |

| batch-32 | U8 补空号（12 题） | 12 | `DATA-009~020` | ✅ 已完成（LeRobot writer finalize、DROID 50 万/13 机构、AgiBot Alpha 9.2 万、RoboMIND UR-5e 25,170、OXE 527 技能/15 万指令、episode 与 state 定义、多相机标定、帧率重采样、dataset_stats.json、观测窗口与动作块、数据管线三原则），U8 达 140/140 收官 |

| batch-33 | U9 收官（Triton 与服务化补漏） | 8 | `DEPLOY-133~140` | ✅ 已完成（Triton 动态批处理、ensemble、模型仓库版本目录；蓝绿与金丝雀区别；HPA 看队列/P99/GPU 利用率；容器化可复现；限流不只用于安全；Prometheus 指标采集），U9 达 140/140 收官 |

| batch-34 | U11 Agent 与中间件（片一：Agent 架构、MCP、dsh/OpenManus） | 40 | `AGENT-001~040` | ✅ 已完成（Agent 三要素与 ReAct、工具结果回填、长上下文压缩、成本控制、多智能体分工；dsh 515 行内核 + 50 插件、AGENTS.md、日志唯一真相、fail-closed、可续子代理；MCP 命名空间与 12 位哈希、500ms 指数退避封顶 30s 最多 10 次、30s 稳定性窗口、Fetch/Swap 两阶段同步、旧代保留、串行队列、原始名调用、5s 关闭超时；OpenManus 定位与工具集、弱安全、OpenManus-RL；机器人 Agent 与 MCP 接入方案） |

| batch-35 | U11 Agent 与中间件（片二：工具、技能、记忆、沙箱、SDK/DDS） | 40 | `AGENT-041~080` | ✅ 已完成（dsh 工具注册与调用管线、schema 校验、失败回填；SKILL.md 技能系统与 AGENTS.md 加载；钩子与记忆四件套、向量检索、状态续跑；本地/容器沙箱、网络隔离、fail-closed、提示词注入边界；宇树 SDK2 的 DDS 通信、HighCmd/LowCmd、RL 走 LowCmd、控制 QoS；DDS 无中心与 MQTT broker 对比） |

| batch-36 | U11 收官（编排与子代理、CycloneDDS、Zephyr、Kalibr） | 40 | `AGENT-081~120` | ✅ 已完成（dsh 编排层三件套、子代理独立上下文、任务拆解粒度、结果摘要回收、分层收益、并发写冲突、递归深度上限；DDS 无中心发现、key 实例、共享内存零拷贝、RMW 抽象；Zephyr 优先级抢占、优先级反转与继承、多架构、实时性定义；Kalibr 连续时间批量估计、B-spline 轨迹、相机-IMU 外参与时间偏移、AprilGrid、double-sphere 鱼眼模型），U11 达 120/120 收官 |

| batch-37 | U12 前沿片二（人形控制 2026、世界模型落地、竞速） | 40 | `FRONT-071~110` | ✅ 已完成（SONIC 运动跟踪规模化、FSQ 运动令牌、4200 万参数与真机零样本；踢球虚拟感知、1 秒 50 帧压 64 维、RMSE 降 46%；ZEST 三类异构数据、失败分数采样、辅助外力课程、闭链执行器增益；AstraBrain 序列运控与 2 万小时数据；GAE、ULTRA、OpenHLM、LEGS、WholeBodyWAM/MotionWAM、VioLA；世界模型落地四用法；人形竞速四难与天工/荣耀对比；未开源项目的推断方法） |

| batch-38 | U12 收官（行业趋势、开源生态、评测与求职视野） | 10 | `FRONT-111~120` | ✅ 已完成（竞争焦点从奖励工程转向数据；世界模型三强开放程度；仿真跟踪指标的解释边界；VLA 选型三角；配方趋同与开源动机；踢球遮挡 0.6 秒边界；STAR 四段；前沿成功率的落地折扣；2026 格局下的技术定位），U12 达 120/120 收官 |

| batch-39 | U13 水下具身新项目 | 40 | `UUV-161~200` | ✅ 已完成（U0 水下 VLA 的 GR00T N1.5 底座与 29 维状态/13 维动作；MarineGym 的 Isaac Sim + OmniDrones 与 10⁷ 步/秒；UTracker 的 HoloOcean 视觉/声呐跟踪；BlueROV2 Gym 四自由度与奖励；FCRN+DDDQN 单目深度避障；六项目选型），U10 达 200/200 |

| batch-40 | IROS 2026 具身智能专题 | 40 | `FRONT-121~160` | ✅ 已完成（LT-Mem 的 Tri-Memory 与易变性策略；GaussMemory 的 3DGS 主动记忆；VTAP 三指 13 DOF 主动手掌；GelSphere 全向滚动触觉；Shallow-π 18→6 层蒸馏；SteadyTray 冻结行走加残差；DAWN 带噪输入/干净重建；LATENT 不完美人体片段；Ask-to-Clarify 多轮消歧；Contact-Aided 水下接触定位；MIWA/DeLM/ULTRA/PGFlowNav），U12 增至 160 |

当前全库 **2000 题 / 240 个来源**。十二个单元全部达标：U1 120/120、U2 260/260、U3 160/160、U4 200/200、U5 160/160、U6 180/180、U7 160/160、U8 140/140、U9 140/140、U10 200/200、U11 120/120、U12 160/160（原 120 收官 + batch-40 40 题）。总体规划见 [08-master-plan.md](08-master-plan.md)；剩余增量是“项目精读补全”与新论文专题，按需推进。

**第一轮全库复核（2026-11-17）**：结构错误 0；选择题答案 A/B/C/D = 195/195/193/193；简答 274 题全部 ≥3 句；近重复题干 0 对；缺失 `options` 字段 180 条已补齐为 `null`；来源 230 份全部可解析。

## 建议顺序与素材（后续）

| 批次 | 领域 | 主要素材 | 目标题量 |
|---|---|---|---|
| batch-7 | 灵巧手与操作 | `B04-灵巧手与人形背诵版.md`、RDT / UniDex / BiDexHand / GenDexGrasp / DexMimicGen / EgoMimic / ManipNet / HumanPlus | 150（已有 VLA 题覆盖部分，注意查重） |
| batch-8 | Agent / 宇树 SDK | `B08-Agent背诵版.md`、dsh / openmanus / unitree-sdk2 / sdk2py / go2ros2 / CycloneDDS / Zephyr / Kalibr | 120 |
| batch-9 | 项目精读补全 | 391 份项目精读，按项目每份 1–2 题，优先面试第一梯队项目 | 400–600 |

> 题量是上限估计，实际以“讲义信息密度”为准；宁可少而准，不要凑数。

## 每批执行清单

1. 选 3–6 份讲义，运行 [01-explore.md](01-explore.md) 抽 15–25 个考点。
2. 运行 [02-plan.md](02-plan.md) 排 20 个 template（配额 8/4/4/3/1）。
3. 逐题运行 [03-generate.md](03-generate.md)，不合格走 [04-repair.md](04-repair.md)。
4. 追加到 `data/questions.jsonl`，更新 `meta.json`。
5. 运行 [05-validate.md](05-validate.md) 的构建与抽查。
6. 记录本批考点，下一批先查重。

## 去重命令

```powershell
# 看已有考点
Select-String -Path question-bank\data\questions.jsonl -Pattern '"topic":"[^"]+' -AllMatches

# 搜某个关键词是否已出过
Select-String -Path question-bank\data\questions.jsonl -Pattern 'flow matching'
```
