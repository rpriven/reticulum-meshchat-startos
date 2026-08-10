export const DEFAULT_LANG = 'en_US'

const dict = {
  'Starting Reticulum MeshChat!': 0,
  'Web UI': 1,
  'MeshChat is serving its web interface': 2,
  'MeshChat is not yet listening. Check the service logs.': 3,
  'The MeshChat web interface — messages, network interfaces, and settings': 4,
  'Reset Network Interfaces': 5,
  'Remove all custom RNS interfaces, keeping only the default. Use this if a misconfigured interface prevents MeshChat from starting.': 6,
  'Custom interface definitions will be deleted. Your identity and messages are untouched.': 7,
  'Interfaces Reset': 8,
  'No RNS config found — nothing to reset.': 9,
  'All custom interfaces removed. Restart the service to apply.': 10,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
