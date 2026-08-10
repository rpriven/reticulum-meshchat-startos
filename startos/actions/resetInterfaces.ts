import { FileHelper } from '@start9labs/start-sdk'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

// The RNS config MeshChat's own Interfaces page edits. This action is the ONE
// sanctioned second writer, and only for surgery: a single misconfigured
// interface (e.g. a duplicate AutoInterface binding an in-use port) makes RNS
// init throw, which kills MeshChat before its web server binds — so the UI
// that could fix the config is unreachable. VM-reproduced 2026-07-17:
// OSError Errno 98 → python exit 255 → StartOS restart loop.
const rnsConfig = FileHelper.string({
  base: sdk.volumes.main,
  subpath: './.reticulum/config',
})

// Byte-for-byte the [[Default Interface]] block RNS v2.4.0's bundled stack
// generates in a fresh config (captured from a real first boot).
const DEFAULT_INTERFACES_SECTION = `[interfaces]

  [[Default Interface]]
    type = AutoInterface
    enabled = Yes
`

// Top-level section headers are single-bracket ([interfaces]); interface
// definitions are double-bracket ([[Name]]) and deeper.
const isTopLevelHeader = (line: string): boolean => {
  const t = line.trim()
  return t.startsWith('[') && !t.startsWith('[[') && t.endsWith(']')
}

export function stripCustomInterfaces(config: string): string {
  const lines = config.split('\n')
  const start = lines.findIndex((l) => l.trim() === '[interfaces]')
  if (start === -1) {
    return config.trimEnd() + '\n\n' + DEFAULT_INTERFACES_SECTION
  }
  let end = lines.length
  for (let ii = start + 1; ii < lines.length; ii++) {
    if (isTopLevelHeader(lines[ii])) {
      end = ii
      break
    }
  }
  return [
    ...lines.slice(0, start),
    DEFAULT_INTERFACES_SECTION,
    ...lines.slice(end),
  ].join('\n')
}

export const resetInterfaces = sdk.Action.withoutInput(
  'reset-interfaces',

  async ({ effects }) => ({
    name: i18n('Reset Network Interfaces'),
    description: i18n(
      'Remove all custom RNS interfaces, keeping only the default. Use this if a misconfigured interface prevents MeshChat from starting.',
    ),
    warning: i18n(
      'Custom interface definitions will be deleted. Your identity and messages are untouched.',
    ),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const current = await rnsConfig.read().once()
    if (!current) {
      return {
        version: '1',
        title: i18n('Interfaces Reset'),
        message: i18n('No RNS config found — nothing to reset.'),
        result: null,
      }
    }
    await rnsConfig.write(effects, stripCustomInterfaces(current))
    return {
      version: '1',
      title: i18n('Interfaces Reset'),
      message: i18n(
        'All custom interfaces removed. Restart the service to apply.',
      ),
      result: null,
    }
  },
)
