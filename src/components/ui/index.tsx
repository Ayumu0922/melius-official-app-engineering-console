import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

interface ChildrenProps {
  children: ReactNode;
}

interface DataProps {
  dataId: string;
  roleName?: string;
}

interface ButtonProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type' | 'disabled'>, DataProps {
  label?: string;
  children: ReactNode;
}

interface NavButtonProps extends DataProps {
  selected?: boolean;
  badge?: string;
  badgeTone?: 'red' | 'amber' | 'neutral';
  onClick?: () => void;
  icon: ReactNode;
  children: ReactNode;
}

interface SegmentButtonProps extends DataProps {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

interface MetricPanelProps extends DataProps {
  icon: ReactNode;
  label: string;
  value: string;
  change: string;
  tone: 'red' | 'blue' | 'emerald' | 'amber';
}

export function AppShell({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div
      {...props}
      data-melius-ui-id="engineering-console-shell"
      data-melius-ui-role="app-shell"
      className="min-h-screen overflow-hidden bg-[#f2f5f8] text-slate-950 antialiased dark:bg-[#07111f] dark:text-slate-50"
    >
      {children}
    </div>
  );
}

export function DashboardFrame({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div {...props} className="relative flex h-screen w-full overflow-hidden">
      {children}
    </div>
  );
}

export function SidebarShell({ children, ...props }: HTMLAttributes<HTMLElement> & ChildrenProps) {
  return (
    <aside
      {...props}
      data-melius-ui-id="desktop-left-navigation"
      data-melius-ui-role="navigation"
      className="hidden h-screen w-[260px] shrink-0 flex-col border-r border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900 lg:flex"
    >
      {children}
    </aside>
  );
}

export function MobileDrawer({ children, ...props }: HTMLAttributes<HTMLElement> & ChildrenProps) {
  return (
    <aside
      {...props}
      data-melius-ui-id="mobile-navigation-drawer"
      data-melius-ui-role="navigation"
      className="console-drawer fixed inset-y-0 left-0 z-50 flex w-[min(20rem,calc(100vw-2rem))] flex-col border-r border-slate-200 bg-white shadow-2xl shadow-slate-950/20 dark:border-white/10 dark:bg-slate-900 lg:hidden"
    >
      {children}
    </aside>
  );
}

export function MobileOverlay({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      data-melius-ui-id="mobile-navigation-overlay"
      data-melius-ui-role="overlay"
      aria-label="Close navigation"
      onClick={onClick}
      className="fixed inset-0 z-40 bg-slate-950/[0.45] backdrop-blur-sm lg:hidden"
    />
  );
}

export function MobileTopBar({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div
      {...props}
      data-melius-ui-id="mobile-top-bar"
      data-melius-ui-role="toolbar"
      className="flex min-h-14 items-center justify-between border-b border-slate-200 bg-white px-3 dark:border-white/10 dark:bg-slate-900 lg:hidden"
    >
      {children}
    </div>
  );
}

export function BrandMark({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div
      {...props}
      data-melius-ui-id="brand-mark"
      data-melius-ui-role="logo"
      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950"
    >
      {children}
    </div>
  );
}

export function SearchShell({ children, ...props }: HTMLAttributes<HTMLButtonElement> & ChildrenProps) {
  return (
    <button
      {...props}
      type="button"
      data-melius-ui-id="sidebar-search-control"
      data-melius-ui-role="search"
      className="flex w-full items-center gap-3 rounded-xl bg-slate-100 px-3.5 py-2.5 text-left text-sm text-slate-500 transition-colors hover:bg-slate-200/70 dark:bg-white/[0.06] dark:text-slate-400 dark:hover:bg-white/10"
    >
      {children}
    </button>
  );
}

export function NavButton({ dataId, roleName, selected, badge, badgeTone, onClick, icon, children }: NavButtonProps) {
  const badgeClass =
    badgeTone === 'red'
      ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'
      : badgeTone === 'amber'
        ? 'bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300'
        : 'bg-slate-100 text-slate-500 dark:bg-white/[0.08] dark:text-slate-400';

  if (selected) {
    return (
      <button
        type="button"
        data-melius-ui-id={dataId}
        data-melius-ui-role={roleName}
        onClick={onClick}
        className="flex w-full items-center gap-3 rounded-xl bg-slate-950 px-3 py-2.5 text-sm font-medium text-white shadow-sm transition-colors dark:bg-white dark:text-slate-950"
      >
        <span className="shrink-0">{icon}</span>
        <span className="min-w-0 flex-1 truncate text-left">{children}</span>
        {badge ? <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{badge}</span> : null}
      </button>
    );
  }

  return (
    <button
      type="button"
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-white"
    >
      <span className="shrink-0">{icon}</span>
      <span className="min-w-0 flex-1 truncate text-left">{children}</span>
      {badge ? <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${badgeClass}`}>{badge}</span> : null}
    </button>
  );
}

export function IconButton({ dataId, roleName, label, children, onClick, disabled, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-white/[0.08] dark:hover:text-white"
    >
      {children}
    </button>
  );
}

export function SoftButton({ dataId, roleName, label, children, onClick, disabled, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
    >
      {children}
    </button>
  );
}

export function DangerButton({ dataId, roleName, label, children, onClick, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl bg-rose-600 px-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400"
    >
      {children}
    </button>
  );
}

export function SegmentButton({ dataId, roleName, selected, onClick, children }: SegmentButtonProps) {
  if (selected) {
    return (
      <button
        type="button"
        data-melius-ui-id={dataId}
        data-melius-ui-role={roleName}
        onClick={onClick}
        className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-slate-950"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      onClick={onClick}
      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:bg-white/[0.06] dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
    >
      {children}
    </button>
  );
}

export function Panel({
  dataId,
  roleName,
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement> & ChildrenProps & DataProps) {
  return (
    <div
      {...props}
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      className={`console-panel rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900 ${className}`}
    >
      {children}
    </div>
  );
}

export function MetricPanel({ dataId, roleName, icon, label, value, change, tone }: MetricPanelProps) {
  const iconTone =
    tone === 'red'
      ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300'
      : tone === 'emerald'
        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
        : tone === 'amber'
          ? 'bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300'
          : 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300';

  const changeTone =
    tone === 'red'
      ? 'text-rose-600 dark:text-rose-300'
      : tone === 'amber'
        ? 'text-amber-700 dark:text-amber-300'
        : 'text-emerald-700 dark:text-emerald-300';

  return (
    <div
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      className="console-panel rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${iconTone}`}>{icon}</div>
        <span className={`text-sm font-semibold ${changeTone}`}>{change}</span>
      </div>
      <p className="mb-1 text-2xl font-semibold text-slate-950 dark:text-white">{value}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

export function StatusPill({ children, tone }: { children: ReactNode; tone: 'red' | 'amber' | 'blue' | 'emerald' | 'neutral' }) {
  const toneClass =
    tone === 'red'
      ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'
      : tone === 'amber'
        ? 'bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300'
        : tone === 'blue'
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300'
          : tone === 'emerald'
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
            : 'bg-slate-100 text-slate-600 dark:bg-white/[0.08] dark:text-slate-300';

  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClass}`}>{children}</span>;
}
