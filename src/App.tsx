import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Bell,
  Bug,
  Calendar,
  CheckCircle2,
  Clock3,
  Database,
  ExternalLink,
  Filter,
  Gauge,
  GitBranch,
  Globe2,
  LayoutDashboard,
  Menu,
  Moon,
  PhoneCall,
  RefreshCw,
  Rocket,
  Search,
  Server,
  Settings,
  ShieldCheck,
  Sun,
  TrendingDown,
  TrendingUp,
  Users,
  X,
  Zap,
} from 'lucide-react';
import {
  AppShell,
  BrandMark,
  DashboardFrame,
  DangerButton,
  IconButton,
  MetricPanel,
  MobileDrawer,
  MobileOverlay,
  MobileTopBar,
  NavButton,
  Panel,
  SearchShell,
  SegmentButton,
  SidebarShell,
  SoftButton,
  StatusPill,
} from './components/ui';

type ThemeChoice = 'light' | 'dark' | 'system';
type LanguageChoice = 'ja' | 'en';
type Section =
  | 'overview'
  | 'incidents'
  | 'deployments'
  | 'performance'
  | 'errors'
  | 'sla'
  | 'oncall'
  | 'services'
  | 'postmortems'
  | 'settings';

const THEME_KEY = 'melius-official-app-engineering-console-theme';
const LANGUAGE_KEY = 'melius-official-app-engineering-console-language';

const COPY = {
  en: {
    appName: 'SignalOps',
    live: 'Live',
    search: 'Search incidents...',
    quickAccess: 'Quick Access',
    operations: 'Operations',
    settings: 'Settings',
    dashboard: 'Dashboard',
    activeIncidents: 'Active Incidents',
    recentDeploys: 'Recent Deploys',
    incidents: 'Incidents',
    deployments: 'Deployments',
    performance: 'Performance',
    errorTracking: 'Error Tracking',
    sla: 'SLA & Uptime',
    oncall: 'On-Call',
    services: 'Services',
    postmortems: 'Postmortems',
    userName: 'Avery Stone',
    userRole: 'SRE Lead',
    menu: 'Open navigation',
    close: 'Close navigation',
    last24: 'Last 24 hours',
    refresh: 'Refresh',
    alerts: 'Alerts',
    reportIncident: 'Report Incident',
    language: 'Language',
    theme: 'Theme',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    systemStatus: 'System Status',
    operational: 'Operational',
    uptime: 'Uptime',
    p95Latency: 'P95 Latency',
    recentActivity: 'Recent Activity',
    oncallTeam: 'On-Call Team',
    overviewTitle: 'System Overview',
    overviewSubtitle: 'Real-time engineering metrics',
    incidentsTitle: 'Incidents',
    incidentsSubtitle: 'Active and recent incident response',
    deploymentsTitle: 'Deployments',
    deploymentsSubtitle: 'Release pipeline and deployment history',
    performanceTitle: 'Performance',
    performanceSubtitle: 'Latency, throughput, and saturation',
    errorsTitle: 'Error Tracking',
    errorsSubtitle: 'Exceptions, error rates, and triage queues',
    slaTitle: 'SLA & Uptime',
    slaSubtitle: 'Service level monitoring',
    oncallTitle: 'On-Call',
    oncallSubtitle: 'Schedule and response metrics',
    servicesTitle: 'Services',
    servicesSubtitle: 'Service catalog and health',
    postmortemsTitle: 'Postmortems',
    postmortemsSubtitle: 'Incident reports and learnings',
    settingsTitle: 'Settings',
    settingsSubtitle: 'Configuration and integrations',
    requestsTitle: 'Request Volume',
    requestsSubtitle: 'Requests per hour',
    serviceLatency: 'Service Latency',
    latencySubtitle: 'P50, P95, P99 latency by service',
    open: 'open',
    duration: 'Duration',
    assignee: 'Assignee',
    impacted: 'Impacted Services',
    timeline: 'Timeline',
    openTracker: 'Open in tracker',
    all: 'all',
    investigating: 'investigating',
    mitigating: 'mitigating',
    monitoring: 'monitoring',
    resolved: 'resolved',
    deploymentFrequency: 'Deployment Frequency',
    deployFrequencySubtitle: 'Deploys per day this week',
    recentDeployments: 'Recent Deployments',
    serviceCatalog: 'Service Catalog',
    serviceCatalogSubtitle: 'Ownership, health, and current saturation',
    escalationPlan: 'Escalation Plan',
    escalationSubtitle: 'Current response ladder and coverage',
    configSurface: 'Console Preferences',
    configSubtitle: 'Visual controls for this UI-only starter',
  },
  ja: {
    appName: 'SignalOps',
    live: '稼働中',
    search: 'インシデントを検索...',
    quickAccess: 'クイックアクセス',
    operations: '運用',
    settings: '設定',
    dashboard: 'ダッシュボード',
    activeIncidents: '進行中インシデント',
    recentDeploys: '最近のデプロイ',
    incidents: 'インシデント',
    deployments: 'デプロイ',
    performance: 'パフォーマンス',
    errorTracking: 'エラー追跡',
    sla: 'SLA・稼働率',
    oncall: 'オンコール',
    services: 'サービス',
    postmortems: '振り返り',
    userName: 'Avery Stone',
    userRole: 'SREリード',
    menu: 'ナビゲーションを開く',
    close: 'ナビゲーションを閉じる',
    last24: '直近24時間',
    refresh: '更新',
    alerts: 'アラート',
    reportIncident: 'インシデント報告',
    language: '言語',
    theme: 'テーマ',
    system: 'システム',
    light: 'ライト',
    dark: 'ダーク',
    systemStatus: 'システム状態',
    operational: '正常稼働',
    uptime: '稼働率',
    p95Latency: 'P95レイテンシ',
    recentActivity: '最近のアクティビティ',
    oncallTeam: 'オンコール担当',
    overviewTitle: 'システム概要',
    overviewSubtitle: 'エンジニアリング指標をリアルタイムで確認',
    incidentsTitle: 'インシデント',
    incidentsSubtitle: '進行中と直近の対応状況',
    deploymentsTitle: 'デプロイ',
    deploymentsSubtitle: 'リリースパイプラインと履歴',
    performanceTitle: 'パフォーマンス',
    performanceSubtitle: 'レイテンシ、スループット、飽和度',
    errorsTitle: 'エラー追跡',
    errorsSubtitle: '例外、エラー率、トリアージキュー',
    slaTitle: 'SLA・稼働率',
    slaSubtitle: 'サービスレベルを監視',
    oncallTitle: 'オンコール',
    oncallSubtitle: '当番表と応答指標',
    servicesTitle: 'サービス',
    servicesSubtitle: 'サービスカタログと健全性',
    postmortemsTitle: '振り返り',
    postmortemsSubtitle: 'インシデントレポートと学び',
    settingsTitle: '設定',
    settingsSubtitle: '設定と連携',
    requestsTitle: 'リクエスト量',
    requestsSubtitle: '1時間あたりのリクエスト',
    serviceLatency: 'サービスレイテンシ',
    latencySubtitle: 'サービス別 P50、P95、P99',
    open: '件対応中',
    duration: '継続時間',
    assignee: '担当者',
    impacted: '影響サービス',
    timeline: 'タイムライン',
    openTracker: 'トラッカーで開く',
    all: 'すべて',
    investigating: '調査中',
    mitigating: '緩和中',
    monitoring: '監視中',
    resolved: '解決済み',
    deploymentFrequency: 'デプロイ頻度',
    deployFrequencySubtitle: '今週の日別デプロイ数',
    recentDeployments: '最近のデプロイ',
    serviceCatalog: 'サービスカタログ',
    serviceCatalogSubtitle: '担当、健全性、現在の負荷',
    escalationPlan: 'エスカレーション計画',
    escalationSubtitle: '現在の対応順序とカバレッジ',
    configSurface: 'コンソール設定',
    configSubtitle: 'UI-onlyスターターの表示コントロール',
  },
} as const;

const navItems: Array<{
  id: Section;
  icon: typeof LayoutDashboard;
  badge?: string;
  badgeTone?: 'red' | 'amber' | 'neutral';
  labelKey: keyof typeof COPY.en;
}> = [
  { id: 'overview', icon: LayoutDashboard, labelKey: 'dashboard' },
  { id: 'incidents', icon: AlertTriangle, labelKey: 'incidents', badge: '3', badgeTone: 'red' },
  { id: 'deployments', icon: Rocket, labelKey: 'deployments', badge: '8', badgeTone: 'neutral' },
  { id: 'performance', icon: Gauge, labelKey: 'performance' },
  { id: 'errors', icon: Bug, labelKey: 'errorTracking', badge: '24', badgeTone: 'amber' },
  { id: 'sla', icon: ShieldCheck, labelKey: 'sla' },
  { id: 'oncall', icon: PhoneCall, labelKey: 'oncall' },
  { id: 'services', icon: Server, labelKey: 'services' },
  { id: 'postmortems', icon: Activity, labelKey: 'postmortems' },
];

const sectionConfig: Record<Section, { titleKey: keyof typeof COPY.en; subtitleKey: keyof typeof COPY.en }> = {
  overview: { titleKey: 'overviewTitle', subtitleKey: 'overviewSubtitle' },
  incidents: { titleKey: 'incidentsTitle', subtitleKey: 'incidentsSubtitle' },
  deployments: { titleKey: 'deploymentsTitle', subtitleKey: 'deploymentsSubtitle' },
  performance: { titleKey: 'performanceTitle', subtitleKey: 'performanceSubtitle' },
  errors: { titleKey: 'errorsTitle', subtitleKey: 'errorsSubtitle' },
  sla: { titleKey: 'slaTitle', subtitleKey: 'slaSubtitle' },
  oncall: { titleKey: 'oncallTitle', subtitleKey: 'oncallSubtitle' },
  services: { titleKey: 'servicesTitle', subtitleKey: 'servicesSubtitle' },
  postmortems: { titleKey: 'postmortemsTitle', subtitleKey: 'postmortemsSubtitle' },
  settings: { titleKey: 'settingsTitle', subtitleKey: 'settingsSubtitle' },
};

const trafficData = [
  { label: '00:00', requests: 12400, errors: 45 },
  { label: '04:00', requests: 8200, errors: 23 },
  { label: '08:00', requests: 24500, errors: 89 },
  { label: '12:00', requests: 31200, errors: 124 },
  { label: '16:00', requests: 28900, errors: 98 },
  { label: '20:00', requests: 19800, errors: 67 },
  { label: 'Now', requests: 22100, errors: 72 },
];

const latencyData = [
  { service: 'API Gateway', p50: 45, p95: 142, p99: 289 },
  { service: 'Auth', p50: 23, p95: 67, p99: 134 },
  { service: 'Database', p50: 12, p95: 34, p99: 78 },
  { service: 'Cache', p50: 2, p95: 8, p99: 15 },
  { service: 'CDN', p50: 18, p95: 45, p99: 92 },
];

const deploymentFrequency = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 18 },
  { label: 'Wed', value: 15 },
  { label: 'Thu', value: 22 },
  { label: 'Fri', value: 19 },
  { label: 'Sat', value: 5 },
  { label: 'Sun', value: 3 },
];

const metrics = [
  { key: 'active-incidents', label: { en: 'Active Incidents', ja: '進行中インシデント' }, value: '3', change: '+2', tone: 'red' as const, icon: AlertTriangle },
  { key: 'deployments-today', label: { en: 'Deployments Today', ja: '本日のデプロイ' }, value: '8', change: '+3', tone: 'blue' as const, icon: Zap },
  { key: 'error-rate', label: { en: 'Error Rate', ja: 'エラー率' }, value: '0.42%', change: '-0.12%', tone: 'emerald' as const, icon: Activity },
  { key: 'uptime-30d', label: { en: 'Uptime (30d)', ja: '稼働率 (30日)' }, value: '99.98%', change: '+0.01%', tone: 'emerald' as const, icon: CheckCircle2 },
];

const incidents = [
  {
    id: 'INC-2847',
    title: { en: 'Database latency spike in us-east-1', ja: 'us-east-1でデータベース遅延が上昇' },
    description: {
      en: 'PostgreSQL primary is reporting elevated query time across checkout paths.',
      ja: '決済導線でPostgreSQL primaryのクエリ時間が上昇しています。',
    },
    severity: 'high',
    status: 'investigating',
    duration: '23 min',
    assignee: 'Ava S.',
    initials: 'AS',
    impacted: ['checkout-api', 'payment-service', 'order-service'],
    timeline: [
      { time: '10:32', event: { en: 'Alert triggered', ja: 'アラート発火' } },
      { time: '10:35', event: { en: 'On-call notified', ja: 'オンコールへ通知' } },
      { time: '10:38', event: { en: 'Investigation started', ja: '調査開始' } },
    ],
  },
  {
    id: 'INC-2846',
    title: { en: 'Payment gateway timeout errors', ja: '決済ゲートウェイのタイムアウト' },
    description: {
      en: 'External payment requests are timing out on a subset of transactions.',
      ja: '一部トランザクションで外部決済リクエストがタイムアウトしています。',
    },
    severity: 'critical',
    status: 'mitigating',
    duration: '45 min',
    assignee: 'Ken M.',
    initials: 'KM',
    impacted: ['payment-service', 'checkout-api'],
    timeline: [
      { time: '09:47', event: { en: 'Alert triggered', ja: 'アラート発火' } },
      { time: '09:55', event: { en: 'Root cause identified', ja: '原因を特定' } },
      { time: '10:10', event: { en: 'Mitigation in progress', ja: '緩和対応中' } },
    ],
  },
  {
    id: 'INC-2845',
    title: { en: 'CDN cache invalidation delay', ja: 'CDNキャッシュ削除の遅延' },
    description: {
      en: 'Static asset invalidations are propagating more slowly than normal.',
      ja: '静的アセットのキャッシュ削除反映が通常より遅れています。',
    },
    severity: 'medium',
    status: 'monitoring',
    duration: '1h 12m',
    assignee: 'Mina P.',
    initials: 'MP',
    impacted: ['cdn', 'static-assets'],
    timeline: [
      { time: '08:20', event: { en: 'Alert triggered', ja: 'アラート発火' } },
      { time: '08:25', event: { en: 'Workaround applied', ja: '回避策を適用' } },
      { time: '09:15', event: { en: 'Monitoring resolution', ja: '解決を監視中' } },
    ],
  },
  {
    id: 'INC-2844',
    title: { en: 'Auth service memory pressure', ja: '認証サービスのメモリ圧迫' },
    description: {
      en: 'Memory pressure is back to baseline after a rolling restart.',
      ja: 'ローリング再起動後、メモリ圧迫は通常値に戻りました。',
    },
    severity: 'low',
    status: 'resolved',
    duration: '4h 32m',
    assignee: 'Theo W.',
    initials: 'TW',
    impacted: ['auth-service'],
    timeline: [
      { time: '04:15', event: { en: 'Alert triggered', ja: 'アラート発火' } },
      { time: '08:47', event: { en: 'Hotfix deployed', ja: '修正をデプロイ' } },
    ],
  },
];

const deployments = [
  { id: 'DEP-1234', service: 'api-gateway', version: 'v2.3.1', status: 'success', env: 'production', duration: '2m 34s', time: '10 min ago', author: 'Ava S.', commit: 'feat: add rate limiting', hash: 'a3b4c5d' },
  { id: 'DEP-1233', service: 'user-service', version: 'v1.8.0', status: 'success', env: 'production', duration: '3m 12s', time: '45 min ago', author: 'Ken M.', commit: 'fix: refresh token edge case', hash: 'f6g7h8i' },
  { id: 'DEP-1232', service: 'checkout-api', version: 'v3.1.2', status: 'failed', env: 'staging', duration: '1m 45s', time: '1 hour ago', author: 'Mina P.', commit: 'chore: update dependencies', hash: 'j9k0l1m' },
  { id: 'DEP-1231', service: 'notification-service', version: 'v2.0.5', status: 'success', env: 'production', duration: '2m 08s', time: '2 hours ago', author: 'Theo W.', commit: 'feat: add digest templates', hash: 'n2o3p4q' },
  { id: 'DEP-1230', service: 'analytics-api', version: 'v1.4.0', status: 'success', env: 'production', duration: '4m 21s', time: '3 hours ago', author: 'Ava S.', commit: 'feat: expose metric endpoint', hash: 'r5s6t7u' },
];

const services = [
  { name: 'api-gateway', owner: 'Platform', health: 'healthy', latency: '142ms', saturation: 68 },
  { name: 'checkout-api', owner: 'Commerce', health: 'degraded', latency: '211ms', saturation: 82 },
  { name: 'payment-service', owner: 'Commerce', health: 'critical', latency: '340ms', saturation: 91 },
  { name: 'auth-service', owner: 'Identity', health: 'healthy', latency: '67ms', saturation: 44 },
  { name: 'cdn-edge', owner: 'Web', health: 'watch', latency: '45ms', saturation: 57 },
];

const rightActivity = [
  { type: 'incident', title: { en: 'Database latency spike', ja: 'DB遅延が上昇' }, time: { en: '2 min ago', ja: '2分前' }, status: 'active' },
  { type: 'deploy', title: { en: 'api-gateway v2.3.1', ja: 'api-gateway v2.3.1' }, time: { en: '15 min ago', ja: '15分前' }, status: 'success' },
  { type: 'incident', title: { en: 'Auth service 503', ja: '認証サービス 503' }, time: { en: '1 hour ago', ja: '1時間前' }, status: 'resolved' },
  { type: 'deploy', title: { en: 'user-service v1.8.0', ja: 'user-service v1.8.0' }, time: { en: '2 hours ago', ja: '2時間前' }, status: 'success' },
  { type: 'incident', title: { en: 'CDN cache miss', ja: 'CDNキャッシュミス' }, time: { en: '3 hours ago', ja: '3時間前' }, status: 'resolved' },
];

const team = [
  { name: 'Ava Stone', role: { en: 'Primary On-Call', ja: '一次オンコール' }, initials: 'AS', status: 'active' },
  { name: 'Ken Mori', role: { en: 'Secondary On-Call', ja: '二次オンコール' }, initials: 'KM', status: 'standby' },
  { name: 'Mina Park', role: { en: 'Platform Lead', ja: 'Platformリード' }, initials: 'MP', status: 'available' },
  { name: 'Theo Wright', role: { en: 'SRE Engineer', ja: 'SREエンジニア' }, initials: 'TW', status: 'available' },
];

function getInitialLanguage(): LanguageChoice {
  if (typeof window === 'undefined') {
    return 'ja';
  }

  const params = new URLSearchParams(window.location.search);
  const requested = params.get('locale') || params.get('lang') || params.get('language') || params.get('melius_locale');

  if (requested === 'ja' || requested === 'en') {
    return requested;
  }

  const stored = window.localStorage.getItem(LANGUAGE_KEY);

  return stored === 'ja' || stored === 'en' ? stored : 'ja';
}

function getInitialTheme(): ThemeChoice {
  if (typeof window === 'undefined') {
    return 'system';
  }

  const params = new URLSearchParams(window.location.search);
  const requested = params.get('theme') || params.get('themeMode') || params.get('colorScheme') || params.get('melius_theme');

  if (requested === 'light' || requested === 'dark' || requested === 'system') {
    return requested;
  }

  const stored = window.localStorage.getItem(THEME_KEY);

  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
}

function resolveTheme(theme: ThemeChoice) {
  if (theme !== 'system') {
    return theme;
  }

  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function severityTone(severity: string): 'red' | 'amber' | 'neutral' {
  if (severity === 'critical') {
    return 'red';
  }

  if (severity === 'high') {
    return 'amber';
  }

  return 'neutral';
}

function statusTone(status: string): 'red' | 'amber' | 'blue' | 'emerald' | 'neutral' {
  if (status === 'investigating') {
    return 'amber';
  }

  if (status === 'mitigating') {
    return 'blue';
  }

  if (status === 'monitoring' || status === 'watch') {
    return 'blue';
  }

  if (status === 'resolved' || status === 'success' || status === 'healthy') {
    return 'emerald';
  }

  if (status === 'critical' || status === 'failed') {
    return 'red';
  }

  return 'neutral';
}

function statusLabel(status: string, language: LanguageChoice) {
  const labels: Record<string, Record<LanguageChoice, string>> = {
    investigating: { en: 'Investigating', ja: '調査中' },
    mitigating: { en: 'Mitigating', ja: '緩和中' },
    monitoring: { en: 'Monitoring', ja: '監視中' },
    resolved: { en: 'Resolved', ja: '解決済み' },
    success: { en: 'Success', ja: '成功' },
    failed: { en: 'Failed', ja: '失敗' },
    healthy: { en: 'Healthy', ja: '正常' },
    degraded: { en: 'Degraded', ja: '低下' },
    critical: { en: 'Critical', ja: '重大' },
    watch: { en: 'Watch', ja: '監視' },
  };

  return labels[status]?.[language] ?? status;
}

function MiniAreaChart({ dataId }: { dataId: string }) {
  const points = trafficData
    .map((point, index) => {
      const x = 32 + index * 88;
      const y = 210 - (point.requests / 32000) * 160;

      return `${x},${y}`;
    })
    .join(' ');
  const fillPoints = `32,220 ${points} 560,220`;

  return (
    <div data-melius-ui-id={dataId} data-melius-ui-role="chart" className="h-[240px] overflow-hidden">
      <svg viewBox="0 0 600 240" className="h-full w-full">
        <defs>
          <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[52, 94, 136, 178, 220].map((y) => (
          <line key={y} x1="28" x2="570" y1={y} y2={y} stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeDasharray="4 5" />
        ))}
        <polygon points={fillPoints} fill="url(#trafficFill)" />
        <polyline points={points} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="chart-trace" />
        {trafficData.map((point, index) => {
          const x = 32 + index * 88;
          const y = 210 - (point.requests / 32000) * 160;

          return <circle key={point.label} cx={x} cy={y} r="4" fill="#2563eb" className="stroke-white dark:stroke-slate-900" strokeWidth="2" />;
        })}
        {trafficData.map((point, index) => (
          <text key={point.label} x={32 + index * 88} y="235" textAnchor="middle" className="fill-slate-400 text-[12px] dark:fill-slate-500">
            {point.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function BarMeter({ value, colorClass, delay = 0 }: { value: number; colorClass: string; delay?: number }) {
  return (
    <div className="h-2 min-w-0 flex-1 rounded-full bg-slate-100 dark:bg-white/8">
      <div className={`bar-grow h-full rounded-full ${colorClass}`} style={{ width: `${value}%`, animationDelay: `${delay}ms` }} />
    </div>
  );
}

function SidebarContent({
  activeSection,
  setActiveSection,
  language,
  setLanguage,
  theme,
  setTheme,
  closeMobile,
}: {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  language: LanguageChoice;
  setLanguage: (language: LanguageChoice) => void;
  theme: ThemeChoice;
  setTheme: (theme: ThemeChoice) => void;
  closeMobile?: () => void;
}) {
  const t = COPY[language];

  const handleNavigate = (section: Section) => {
    setActiveSection(section);
    closeMobile?.();
  };

  return (
    <>
      <div className="flex min-h-16 items-center gap-3 border-b border-slate-200 px-5 dark:border-white/10">
        <BrandMark>
          <Zap className="h-5 w-5" />
        </BrandMark>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold tracking-tight text-slate-950 dark:text-white">{t.appName}</p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">Engineering console</p>
        </div>
        <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
          {t.live}
        </span>
      </div>

      <div className="px-4 py-4">
        <SearchShell>
          <Search className="h-4 w-4 shrink-0" />
          <span className="min-w-0 flex-1 truncate">{t.search}</span>
          <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[11px] text-slate-500 dark:border-white/10 dark:bg-slate-950 dark:text-slate-400">/</kbd>
        </SearchShell>
      </div>

      <div className="px-4 pb-2">
        <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t.quickAccess}</p>
        <nav className="space-y-0.5" data-melius-ui-id="quick-access-nav" data-melius-ui-role="navigation">
          <NavButton dataId="quick-active-incidents" roleName="nav-item" icon={<AlertTriangle className="h-[18px] w-[18px]" />} onClick={() => handleNavigate('incidents')}>
            {t.activeIncidents}
          </NavButton>
          <NavButton dataId="quick-recent-deploys" roleName="nav-item" icon={<Rocket className="h-[18px] w-[18px]" />} onClick={() => handleNavigate('deployments')}>
            {t.recentDeploys}
          </NavButton>
        </nav>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 thin-scrollbar">
        <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t.operations}</p>
        <nav className="space-y-0.5" data-melius-ui-id="operations-nav" data-melius-ui-role="navigation">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavButton
                key={item.id}
                dataId={`nav-${item.id}`}
                roleName="nav-item"
                selected={activeSection === item.id}
                badge={item.badge}
                badgeTone={item.badgeTone}
                icon={<Icon className="h-[18px] w-[18px]" />}
                onClick={() => handleNavigate(item.id)}
              >
                {t[item.labelKey]}
              </NavButton>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3 border-t border-slate-200 px-4 py-4 dark:border-white/10">
        <NavButton
          dataId="nav-settings"
          roleName="nav-item"
          selected={activeSection === 'settings'}
          icon={<Settings className="h-[18px] w-[18px]" />}
          onClick={() => handleNavigate('settings')}
        >
          {t.settings}
        </NavButton>

        <div data-melius-ui-id="sidebar-preferences" data-melius-ui-role="toolbar" className="grid grid-cols-2 gap-2">
          <button
            type="button"
            data-melius-ui-id="language-toggle"
            data-melius-ui-role="language-toggle"
            onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-slate-100 px-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-white/6 dark:text-slate-300 dark:hover:bg-white/10"
          >
            <Globe2 className="h-4 w-4" />
            {language === 'ja' ? 'JA' : 'EN'}
          </button>
          <button
            type="button"
            data-melius-ui-id="theme-toggle"
            data-melius-ui-role="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-slate-100 px-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-white/6 dark:text-slate-300 dark:hover:bg-white/10"
          >
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            {theme === 'dark' ? t.dark : t.light}
          </button>
        </div>

        <div data-melius-ui-id="sidebar-user-profile" data-melius-ui-role="profile" className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-100 dark:hover:bg-white/8">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">AS</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{t.userName}</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">{t.userRole}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Header({
  activeSection,
  language,
  theme,
  setTheme,
  setLanguage,
}: {
  activeSection: Section;
  language: LanguageChoice;
  theme: ThemeChoice;
  setTheme: (theme: ThemeChoice) => void;
  setLanguage: (language: LanguageChoice) => void;
}) {
  const t = COPY[language];
  const config = sectionConfig[activeSection];

  return (
    <header data-melius-ui-id="workspace-header" data-melius-ui-role="toolbar" className="hidden min-h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8 dark:border-white/10 dark:bg-slate-900 lg:flex">
      <div className="min-w-0">
        <h1 className="truncate text-lg font-semibold tracking-tight text-slate-950 dark:text-white">{t[config.titleKey]}</h1>
        <p className="truncate text-sm text-slate-500 dark:text-slate-400">{t[config.subtitleKey]}</p>
      </div>

      <div className="flex items-center gap-3">
        <SoftButton dataId="time-range-button" roleName="button" label={t.last24}>
          <Calendar className="h-4 w-4" />
          <span>{t.last24}</span>
        </SoftButton>
        <SoftButton dataId="refresh-button" roleName="button" label={t.refresh}>
          <RefreshCw className="h-4 w-4" />
          <span>{t.refresh}</span>
        </SoftButton>
        <IconButton dataId="alert-bell-button" roleName="button" label={t.alerts}>
          <span className="relative">
            <Bell className="h-5 w-5" />
            <span className="status-pulse absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500" />
          </span>
        </IconButton>
        <button
          type="button"
          data-melius-ui-id="header-language-button"
          data-melius-ui-role="language-toggle"
          onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
        >
          <Globe2 className="h-4 w-4" />
          {language === 'ja' ? 'JA' : 'EN'}
        </button>
        <button
          type="button"
          data-melius-ui-id="header-theme-button"
          data-melius-ui-role="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
        >
          {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          {theme === 'dark' ? t.dark : t.light}
        </button>
        <DangerButton dataId="report-incident-button" roleName="button" label={t.reportIncident}>
          <AlertTriangle className="h-4 w-4" />
          <span>{t.reportIncident}</span>
        </DangerButton>
      </div>
    </header>
  );
}

function OverviewContent({ language }: { language: LanguageChoice }) {
  const t = COPY[language];

  return (
    <div className="space-y-6 console-panel-enter">
      <div data-melius-ui-id="overview-metrics-grid" data-melius-ui-role="metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <MetricPanel
              key={metric.key}
              dataId={`metric-${metric.key}`}
              roleName="metric-card"
              icon={<Icon className="h-5 w-5" />}
              label={metric.label[language]}
              value={metric.value}
              change={metric.change}
              tone={metric.tone}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Panel dataId="request-volume-panel" roleName="chart-panel" className="xl:col-span-2">
          <div className="p-5 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-slate-950 dark:text-white">{t.requestsTitle}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t.requestsSubtitle}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="h-3 w-3 rounded-full bg-blue-600" />
                Requests
              </div>
            </div>
            <MiniAreaChart dataId="request-volume-chart" />
          </div>
        </Panel>

        <Panel dataId="active-incidents-panel" roleName="incident-list">
          <div className="p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-slate-950 dark:text-white">{t.activeIncidents}</h2>
              <StatusPill tone="red">
                {incidents.filter((incident) => incident.status !== 'resolved').length} {t.open}
              </StatusPill>
            </div>
            <div className="space-y-3">
              {incidents.slice(0, 3).map((incident) => (
                <button
                  key={incident.id}
                  type="button"
                  data-melius-ui-id={`overview-incident-${incident.id.toLowerCase()}`}
                  data-melius-ui-role="incident-card"
                  className="w-full rounded-xl bg-slate-50 p-3 text-left transition-colors hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/8"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <StatusPill tone={severityTone(incident.severity)}>{incident.severity}</StatusPill>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{incident.id}</span>
                  </div>
                  <p className="mb-2 line-clamp-2 text-sm font-semibold text-slate-950 dark:text-white">{incident.title[language]}</p>
                  <div className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-3 w-3" />
                      {incident.duration}
                    </span>
                    <span>{incident.assignee}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      <Panel dataId="service-latency-panel" roleName="chart-panel">
        <div className="p-5 sm:p-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-950 dark:text-white">{t.serviceLatency}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t.latencySubtitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-emerald-500" />P50</span>
              <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-blue-600" />P95</span>
              <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-fuchsia-500" />P99</span>
            </div>
          </div>
          <div data-melius-ui-id="latency-bar-chart" data-melius-ui-role="chart" className="space-y-4">
            {latencyData.map((item, index) => (
              <div key={item.service} className="grid gap-3 md:grid-cols-[120px_1fr] md:items-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{item.service}</p>
                <div className="space-y-1.5">
                  <BarMeter value={(item.p50 / 300) * 100} colorClass="bg-emerald-500" delay={index * 60} />
                  <BarMeter value={(item.p95 / 300) * 100} colorClass="bg-blue-600" delay={index * 80} />
                  <BarMeter value={(item.p99 / 300) * 100} colorClass="bg-fuchsia-500" delay={index * 100} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}

function IncidentsContent({ language }: { language: LanguageChoice }) {
  const t = COPY[language];
  const [selectedId, setSelectedId] = useState(incidents[0].id);
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? incidents : incidents.filter((incident) => incident.status === filter);
  const selectedIncident = incidents.find((incident) => incident.id === selectedId) ?? incidents[0];

  return (
    <div className="grid min-h-[calc(100vh-8rem)] grid-cols-1 gap-6 console-panel-enter xl:grid-cols-[400px_1fr]">
      <div data-melius-ui-id="incident-list-column" data-melius-ui-role="incident-list" className="min-h-0">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              data-melius-ui-id="incident-search-input"
              data-melius-ui-role="search-input"
              aria-label={t.search}
              placeholder={t.search}
              className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-950 placeholder:text-slate-400 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>
          <SoftButton dataId="incident-filter-button" roleName="button" label="Filter">
            <Filter className="h-4 w-4" />
          </SoftButton>
        </div>
        <div data-melius-ui-id="incident-status-filter" data-melius-ui-role="segmented-control" className="mb-4 flex flex-wrap gap-2">
          {['all', 'investigating', 'mitigating', 'monitoring', 'resolved'].map((status) => (
            <SegmentButton key={status} dataId={`incident-filter-${status}`} roleName="segment" selected={filter === status} onClick={() => setFilter(status)}>
              {status === 'all' ? t.all : statusLabel(status, language)}
            </SegmentButton>
          ))}
        </div>
        <div className="max-h-[620px] space-y-3 overflow-y-auto pr-1 thin-scrollbar">
          {filtered.map((incident) => (
            <button
              key={incident.id}
              type="button"
              data-melius-ui-id={`incident-row-${incident.id.toLowerCase()}`}
              data-melius-ui-role="incident-card"
              onClick={() => setSelectedId(incident.id)}
              className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                selectedIncident.id === incident.id
                  ? 'border-slate-950 bg-white shadow-sm dark:border-white dark:bg-slate-900'
                  : 'border-slate-200 bg-white hover:border-slate-300 dark:border-white/10 dark:bg-slate-900 dark:hover:border-white/20'
              }`}
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <StatusPill tone={severityTone(incident.severity)}>{incident.severity}</StatusPill>
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{incident.id}</span>
              </div>
              <p className="mb-3 line-clamp-2 text-sm font-semibold text-slate-950 dark:text-white">{incident.title[language]}</p>
              <div className="flex items-center justify-between gap-3">
                <StatusPill tone={statusTone(incident.status)}>{statusLabel(incident.status, language)}</StatusPill>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Clock3 className="h-3 w-3" />
                  {incident.duration}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Panel dataId="incident-detail-panel" roleName="detail-panel">
        <div className="p-5 sm:p-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <StatusPill tone={severityTone(selectedIncident.severity)}>{selectedIncident.severity}</StatusPill>
                <StatusPill tone={statusTone(selectedIncident.status)}>{statusLabel(selectedIncident.status, language)}</StatusPill>
              </div>
              <h2 className="mb-1 text-xl font-semibold text-slate-950 dark:text-white">{selectedIncident.title[language]}</h2>
              <p className="font-mono text-sm text-slate-500 dark:text-slate-400">{selectedIncident.id}</p>
            </div>
            <SoftButton dataId="open-incident-tracker-button" roleName="button" label={t.openTracker}>
              <ExternalLink className="h-4 w-4" />
              <span>{t.openTracker}</span>
            </SoftButton>
          </div>

          <p data-melius-ui-id="incident-detail-description" data-melius-ui-role="body-text" className="mb-6 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600 dark:bg-white/5 dark:text-slate-300">
            {selectedIncident.description[language]}
          </p>

          <div data-melius-ui-id="incident-summary-cards" data-melius-ui-role="metrics" className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-white/5">
              <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">{t.duration}</p>
              <p className="inline-flex items-center gap-2 text-lg font-semibold text-slate-950 dark:text-white"><Clock3 className="h-4 w-4 text-slate-400" />{selectedIncident.duration}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-white/5">
              <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">{t.assignee}</p>
              <p className="inline-flex items-center gap-2 text-lg font-semibold text-slate-950 dark:text-white"><span className="grid h-6 w-6 place-items-center rounded-full bg-blue-100 text-xs text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">{selectedIncident.initials}</span>{selectedIncident.assignee}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-white/5">
              <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">{t.impacted}</p>
              <p className="text-lg font-semibold text-slate-950 dark:text-white">{selectedIncident.impacted.length}</p>
            </div>
          </div>

          <div data-melius-ui-id="impacted-services-list" data-melius-ui-role="tag-list" className="mb-6">
            <h3 className="mb-3 text-sm font-semibold text-slate-950 dark:text-white">{t.impacted}</h3>
            <div className="flex flex-wrap gap-2">
              {selectedIncident.impacted.map((service) => (
                <span key={service} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">{service}</span>
              ))}
            </div>
          </div>

          <div data-melius-ui-id="incident-timeline" data-melius-ui-role="timeline">
            <h3 className="mb-4 text-sm font-semibold text-slate-950 dark:text-white">{t.timeline}</h3>
            <div className="space-y-4">
              {selectedIncident.timeline.map((item, index) => (
                <div key={`${item.time}-${item.event.en}`} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                      <AlertTriangle className="h-4 w-4" />
                    </span>
                    {index < selectedIncident.timeline.length - 1 ? <span className="mt-2 h-8 w-px bg-slate-200 dark:bg-white/10" /> : null}
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-semibold text-slate-950 dark:text-white">{item.event[language]}</p>
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function DeploymentsContent({ language }: { language: LanguageChoice }) {
  const t = COPY[language];

  return (
    <div className="space-y-6 console-panel-enter">
      <div data-melius-ui-id="deployment-metrics-grid" data-melius-ui-role="metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: { en: 'Deploys Today', ja: '本日のデプロイ' }, value: '8', change: '+3' },
          { label: { en: 'Success Rate', ja: '成功率' }, value: '94%', change: '+2%' },
          { label: { en: 'Avg Duration', ja: '平均時間' }, value: '2m 45s', change: '-15s' },
          { label: { en: 'Rollbacks', ja: 'ロールバック' }, value: '1', change: '0' },
        ].map((metric) => (
          <Panel key={metric.label.en} dataId={`deployment-metric-${metric.label.en.toLowerCase().replace(/\s+/g, '-')}`} roleName="metric-card">
            <div className="p-5">
              <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">{metric.label[language]}</p>
              <div className="flex items-end justify-between gap-3">
                <p className="text-2xl font-semibold text-slate-950 dark:text-white">{metric.value}</p>
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">{metric.change}</span>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <Panel dataId="deployment-frequency-panel" roleName="chart-panel">
        <div className="p-5 sm:p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-950 dark:text-white">{t.deploymentFrequency}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t.deployFrequencySubtitle}</p>
          </div>
          <div data-melius-ui-id="deployment-frequency-chart" data-melius-ui-role="chart" className="grid h-[180px] grid-cols-7 items-end gap-3">
            {deploymentFrequency.map((item, index) => (
              <div key={item.label} className="flex h-full flex-col justify-end gap-2">
                <div className="flex flex-1 items-end rounded-xl bg-slate-50 px-2 pb-2 dark:bg-white/5">
                  <div className="bar-grow w-full rounded-lg bg-emerald-500" style={{ height: `${(item.value / 22) * 100}%`, animationDelay: `${index * 65}ms` }} />
                </div>
                <p className="text-center text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <Panel dataId="recent-deployments-table" roleName="table">
        <div className="border-b border-slate-200 p-5 dark:border-white/10">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">{t.recentDeployments}</h2>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-white/10">
          {deployments.map((deploy) => (
            <button key={deploy.id} type="button" data-melius-ui-id={`deployment-row-${deploy.id.toLowerCase()}`} data-melius-ui-role="table-row" className="grid w-full grid-cols-1 gap-3 p-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-white/5 md:grid-cols-[44px_1fr_auto] md:items-center">
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${deploy.status === 'success' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'}`}>
                {deploy.status === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
              </div>
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-slate-950 dark:text-white">{deploy.service}</span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500 dark:bg-white/8 dark:text-slate-400">{deploy.version}</span>
                  <StatusPill tone={statusTone(deploy.status)}>{statusLabel(deploy.status, language)}</StatusPill>
                </div>
                <p className="truncate text-sm text-slate-500 dark:text-slate-400">{deploy.commit}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 md:justify-end">
                <span className="inline-flex items-center gap-1"><GitBranch className="h-3 w-3" />{deploy.hash}</span>
                <span>{deploy.author}</span>
                <span>{deploy.time}</span>
              </div>
            </button>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function ServicesContent({ language }: { language: LanguageChoice }) {
  const t = COPY[language];

  return (
    <div className="space-y-6 console-panel-enter">
      <Panel dataId="services-catalog-panel" roleName="table">
        <div className="border-b border-slate-200 p-5 dark:border-white/10">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">{t.serviceCatalog}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.serviceCatalogSubtitle}</p>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-white/10">
          {services.map((service, index) => (
            <div key={service.name} data-melius-ui-id={`service-row-${service.name}`} data-melius-ui-role="table-row" className="grid gap-4 p-4 md:grid-cols-[1.2fr_.8fr_.7fr_1fr] md:items-center">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600 dark:bg-white/8 dark:text-slate-300">
                  {service.name.includes('db') || service.name.includes('payment') ? <Database className="h-5 w-5" /> : <Server className="h-5 w-5" />}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-mono text-sm font-semibold text-slate-950 dark:text-white">{service.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{service.owner}</p>
                </div>
              </div>
              <StatusPill tone={statusTone(service.health)}>{statusLabel(service.health, language)}</StatusPill>
              <p className="font-mono text-sm text-slate-600 dark:text-slate-300">{service.latency}</p>
              <BarMeter value={service.saturation} colorClass={service.saturation > 88 ? 'bg-rose-500' : service.saturation > 70 ? 'bg-amber-500' : 'bg-blue-600'} delay={index * 70} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel dataId="service-health-runbook" roleName="runbook-panel">
        <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
          {[
            { label: { en: 'Rollback readiness', ja: 'ロールバック準備' }, value: 'Ready', icon: Rocket },
            { label: { en: 'Synthetic checks', ja: '合成監視' }, value: '42/42', icon: CheckCircle2 },
            { label: { en: 'Noisy alerts', ja: 'ノイズアラート' }, value: '6', icon: Bell },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label.en} className="rounded-xl bg-slate-50 p-4 dark:bg-white/5">
                <Icon className="mb-3 h-5 w-5 text-blue-600 dark:text-blue-300" />
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.label[language]}</p>
                <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

function OncallContent({ language }: { language: LanguageChoice }) {
  const t = COPY[language];

  return (
    <div className="grid grid-cols-1 gap-6 console-panel-enter xl:grid-cols-[1fr_360px]">
      <Panel dataId="oncall-escalation-panel" roleName="schedule">
        <div className="border-b border-slate-200 p-5 dark:border-white/10">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">{t.escalationPlan}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.escalationSubtitle}</p>
        </div>
        <div className="space-y-4 p-5 sm:p-6">
          {team.map((member, index) => (
            <div key={member.name} data-melius-ui-id={`oncall-step-${index + 1}`} data-melius-ui-role="timeline-row" className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-white/5">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">{member.initials}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{member.name}</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{member.role[language]}</p>
              </div>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">L{index + 1}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel dataId="oncall-response-metrics" roleName="metrics">
        <div className="space-y-4 p-5 sm:p-6">
          {[
            { label: { en: 'Ack median', ja: '確認中央値' }, value: '2m 18s' },
            { label: { en: 'Resolve median', ja: '解決中央値' }, value: '42m' },
            { label: { en: 'Pages this week', ja: '今週の呼び出し' }, value: '17' },
          ].map((item) => (
            <div key={item.label.en} className="rounded-xl bg-slate-50 p-4 dark:bg-white/5">
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.label[language]}</p>
              <p className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function SettingsContent({ language, theme, setTheme, setLanguage }: { language: LanguageChoice; theme: ThemeChoice; setTheme: (theme: ThemeChoice) => void; setLanguage: (language: LanguageChoice) => void }) {
  const t = COPY[language];

  return (
    <Panel dataId="settings-panel" roleName="settings-panel">
      <div className="p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-950 dark:text-white">{t.configSurface}</h2>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{t.configSubtitle}</p>
        <div className="grid gap-6 lg:grid-cols-2">
          <div data-melius-ui-id="theme-setting-group" data-melius-ui-role="segmented-control" className="rounded-xl bg-slate-50 p-4 dark:bg-white/5">
            <p className="mb-3 text-sm font-semibold text-slate-950 dark:text-white">{t.theme}</p>
            <div className="flex flex-wrap gap-2">
              {(['light', 'dark', 'system'] as ThemeChoice[]).map((option) => (
                <SegmentButton key={option} dataId={`theme-option-${option}`} roleName="segment" selected={theme === option} onClick={() => setTheme(option)}>
                  {t[option]}
                </SegmentButton>
              ))}
            </div>
          </div>
          <div data-melius-ui-id="language-setting-group" data-melius-ui-role="segmented-control" className="rounded-xl bg-slate-50 p-4 dark:bg-white/5">
            <p className="mb-3 text-sm font-semibold text-slate-950 dark:text-white">{t.language}</p>
            <div className="flex flex-wrap gap-2">
              <SegmentButton dataId="language-option-ja" roleName="segment" selected={language === 'ja'} onClick={() => setLanguage('ja')}>日本語</SegmentButton>
              <SegmentButton dataId="language-option-en" roleName="segment" selected={language === 'en'} onClick={() => setLanguage('en')}>English</SegmentButton>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function GenericOperationsContent({ section, language }: { section: Section; language: LanguageChoice }) {
  if (section === 'services') {
    return <ServicesContent language={language} />;
  }

  if (section === 'oncall') {
    return <OncallContent language={language} />;
  }

  const config = sectionConfig[section];
  const t = COPY[language];
  const rows =
    section === 'errors'
      ? [
          ['checkout-api', '2.4k', '0.82%', 'critical'],
          ['api-gateway', '1.1k', '0.24%', 'watch'],
          ['auth-service', '320', '0.08%', 'healthy'],
        ]
      : section === 'sla'
        ? [
            ['Public API', '99.99%', '12m budget', 'healthy'],
            ['Checkout', '99.94%', '42m budget', 'watch'],
            ['Identity', '99.98%', '18m budget', 'healthy'],
          ]
        : [
            ['Database latency spike', 'INC-2847', 'Draft due today', 'watch'],
            ['Payment timeout analysis', 'INC-2846', 'Owner review', 'critical'],
            ['Cache invalidation delay', 'INC-2845', 'Published', 'healthy'],
          ];

  return (
    <div className="space-y-6 console-panel-enter">
      <Panel dataId={`${section}-workbench-panel`} roleName="workbench">
        <div className="border-b border-slate-200 p-5 dark:border-white/10">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">{t[config.titleKey]}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t[config.subtitleKey]}</p>
        </div>
        <div className="grid gap-4 p-5 sm:p-6 xl:grid-cols-3">
          {rows.map((row, index) => (
            <div key={row[0]} data-melius-ui-id={`${section}-summary-${index + 1}`} data-melius-ui-role="summary-card" className="rounded-xl bg-slate-50 p-4 dark:bg-white/5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="font-mono text-sm font-semibold text-slate-950 dark:text-white">{row[0]}</span>
                <StatusPill tone={statusTone(row[3])}>{statusLabel(row[3], language)}</StatusPill>
              </div>
              <p className="text-2xl font-semibold text-slate-950 dark:text-white">{row[1]}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{row[2]}</p>
            </div>
          ))}
        </div>
      </Panel>
      <ServicesContent language={language} />
    </div>
  );
}

function RightPanel({ language }: { language: LanguageChoice }) {
  const t = COPY[language];

  return (
    <aside data-melius-ui-id="right-context-panel" data-melius-ui-role="aside" className="hidden h-screen w-[280px] shrink-0 flex-col overflow-hidden border-l border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900 xl:flex">
      <div className="border-b border-slate-200 p-5 dark:border-white/10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{t.systemStatus}</h3>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <span className="status-pulse h-2 w-2 rounded-full bg-emerald-500" />
            {t.operational}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div data-melius-ui-id="status-uptime-tile" data-melius-ui-role="metric" className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t.uptime}</p>
            <p className="text-lg font-semibold text-slate-950 dark:text-white">99.98%</p>
          </div>
          <div data-melius-ui-id="status-latency-tile" data-melius-ui-role="metric" className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t.p95Latency}</p>
            <p className="text-lg font-semibold text-slate-950 dark:text-white">142ms</p>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 p-5 dark:border-white/10">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
          <Activity className="h-4 w-4 text-slate-400" />
          {t.recentActivity}
        </h3>
        <div className="space-y-3">
          {rightActivity.map((item, index) => (
            <button key={`${item.type}-${index}`} type="button" data-melius-ui-id={`recent-activity-${index + 1}`} data-melius-ui-role="activity-row" className="flex w-full items-start gap-3 rounded-lg p-2 text-left transition-colors hover:bg-slate-50 dark:hover:bg-white/5">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${item.status === 'active' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'}`}>
                {item.type === 'incident' && item.status === 'active' ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-slate-950 dark:text-white">{item.title[language]}</span>
                <span className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Clock3 className="h-3 w-3" />
                  {item.time[language]}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-5 thin-scrollbar">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
          <Users className="h-4 w-4 text-slate-400" />
          {t.oncallTeam}
        </h3>
        <div className="space-y-2">
          {team.map((member, index) => (
            <button key={member.name} type="button" data-melius-ui-id={`right-oncall-member-${index + 1}`} data-melius-ui-role="person-row" className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-slate-50 dark:hover:bg-white/5">
              <span className="relative">
                <span className={`grid h-9 w-9 place-items-center rounded-full text-sm font-semibold ${member.status === 'active' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300' : member.status === 'standby' ? 'bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300' : 'bg-slate-100 text-slate-500 dark:bg-white/8 dark:text-slate-400'}`}>
                  {member.initials}
                </span>
                {member.status === 'active' ? <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" /> : null}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-slate-950 dark:text-white">{member.name}</span>
                <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{member.role[language]}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function WorkspaceContent({
  activeSection,
  language,
  theme,
  setTheme,
  setLanguage,
}: {
  activeSection: Section;
  language: LanguageChoice;
  theme: ThemeChoice;
  setTheme: (theme: ThemeChoice) => void;
  setLanguage: (language: LanguageChoice) => void;
}) {
  if (activeSection === 'overview') {
    return <OverviewContent language={language} />;
  }

  if (activeSection === 'incidents') {
    return <IncidentsContent language={language} />;
  }

  if (activeSection === 'deployments') {
    return <DeploymentsContent language={language} />;
  }

  if (activeSection === 'settings') {
    return <SettingsContent language={language} theme={theme} setTheme={setTheme} setLanguage={setLanguage} />;
  }

  return <GenericOperationsContent section={activeSection} language={language} />;
}

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [language, setLanguage] = useState<LanguageChoice>(() => getInitialLanguage());
  const [theme, setTheme] = useState<ThemeChoice>(() => getInitialTheme());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [systemTick, setSystemTick] = useState(0);

  const resolvedTheme = useMemo(() => {
    systemTick;

    return resolveTheme(theme);
  }, [theme, systemTick]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setSystemTick((value) => value + 1);
    media.addEventListener('change', onChange);

    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dataset.theme = resolvedTheme;
    root.dataset.themePreference = theme;
    root.classList.toggle('dark', resolvedTheme === 'dark');
    root.style.colorScheme = resolvedTheme === 'dark' ? 'dark' : 'light';

    try {
      window.localStorage.setItem(LANGUAGE_KEY, language);
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Ignore storage errors in embedded previews.
    }
  }, [language, resolvedTheme, theme]);

  const t = COPY[language];
  const activeConfig = sectionConfig[activeSection];

  return (
    <AppShell>
      <DashboardFrame>
        <SidebarShell>
          <SidebarContent activeSection={activeSection} setActiveSection={setActiveSection} language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} />
        </SidebarShell>

        {mobileOpen ? (
          <>
            <MobileOverlay onClick={() => setMobileOpen(false)} />
            <MobileDrawer>
              <div className="absolute right-2 top-2">
                <IconButton dataId="mobile-close-navigation-button" roleName="button" label={t.close} onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5" />
                </IconButton>
              </div>
              <SidebarContent activeSection={activeSection} setActiveSection={setActiveSection} language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} closeMobile={() => setMobileOpen(false)} />
            </MobileDrawer>
          </>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <MobileTopBar>
            <div className="flex min-w-0 items-center gap-3">
              <IconButton dataId="mobile-open-navigation-button" roleName="button" label={t.menu} onClick={() => setMobileOpen(true)}>
                <Menu className="h-5 w-5" />
              </IconButton>
              <div className="min-w-0">
                <h1 className="truncate text-sm font-semibold text-slate-950 dark:text-white">{t[activeConfig.titleKey]}</h1>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{t[activeConfig.subtitleKey]}</p>
              </div>
            </div>
            <DangerButton dataId="mobile-report-incident-button" roleName="button" label={t.reportIncident}>
              <AlertTriangle className="h-4 w-4" />
            </DangerButton>
          </MobileTopBar>

          <Header activeSection={activeSection} language={language} theme={theme} setTheme={setTheme} setLanguage={setLanguage} />

          <main data-melius-ui-id="workspace-main-content" data-melius-ui-role="main-content" className="min-h-0 flex-1 overflow-y-auto p-4 thin-scrollbar sm:p-6 lg:p-8">
            <WorkspaceContent activeSection={activeSection} language={language} theme={theme} setTheme={setTheme} setLanguage={setLanguage} />
          </main>
        </div>

        <RightPanel language={language} />
      </DashboardFrame>
    </AppShell>
  );
}
