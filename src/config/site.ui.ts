import { SITE_CONFIG, type TaskConfig, type TaskKey } from '@/lib/site-config'

/** Tasks shown in public shell: nav, footer, hero, homepage feed, create menu. */
export const UI_VISIBLE_TASK_KEYS = ['article'] as const satisfies readonly TaskKey[]

export function getTasksForShell(): TaskConfig[] {
  const set = new Set<TaskKey>(UI_VISIBLE_TASK_KEYS)
  return SITE_CONFIG.tasks.filter((task) => task.enabled && set.has(task.key))
}
