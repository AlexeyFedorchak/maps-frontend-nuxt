export const ICON_NAMES = [
    'lifetime',
    'hd',
    'feather',
    'water-drop',
    'print',
    'stars'
] as const

export type IconName = typeof ICON_NAMES[number]