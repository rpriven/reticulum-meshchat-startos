import { i18n } from './i18n'
import { sdk } from './sdk'
import { webPort, mount } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Reticulum MeshChat!'))

  const subcontainer = await sdk.SubContainer.of(
    effects,
    { imageId: 'meshchat' },
    mount,
    'meshchat-sub',
  )

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer,
    exec: {
      // Verified against upstream v2.4.0 (docker inspect): WORKDIR /app, no
      // ENTRYPOINT. Absolute script path so the command cannot depend on the
      // image's working directory surviving into the daemon exec.
      command: [
        'python',
        '/app/meshchat.py',
        '--host=0.0.0.0',
        `--port=${webPort}`,
        '--reticulum-config-dir=/config/.reticulum',
        '--storage-dir=/config/.meshchat',
        '--headless',
      ],
    },
    ready: {
      display: i18n('Web UI'),
      // First boot generates the identity keypair and RNS config before the
      // web server binds — allow it time on slow disks.
      gracePeriod: 60000,
      // Port-listening ONLY. The health GATE must never depend on external
      // peers — a check that dials mesh entry points would flap on OTHER
      // people's outages. Mesh reachability belongs in an informational
      // status line (announces API), not here.
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, webPort, {
          successMessage: i18n('MeshChat is serving its web interface'),
          errorMessage: i18n(
            'MeshChat is not yet listening. Check the service logs.',
          ),
        }),
    },
    requires: [],
  })
})
