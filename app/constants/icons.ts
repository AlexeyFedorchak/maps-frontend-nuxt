export const ICON_NAMES = [
    'lifetime',
    'hd',
    'feather',
    'water-drop',
    'print',
    'stars',
    'arrow-up',
    'arrow-down',
] as const

export type IconName = typeof ICON_NAMES[number]