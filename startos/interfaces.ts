import { sdk } from './sdk'
import { webPort } from './utils'
import { i18n } from './i18n'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  // The MeshChat web UI has NO authentication — whoever reaches this port
  // owns the messaging identity. The Tor address is effectively the bearer
  // token; LAN exposure is the real risk. instructions.md carries the threat
  // model; a basic-auth sidecar is the named v1.1 hardening path.
  const webMulti = sdk.MultiHost.of(effects, 'web')
  const webOrigin = await webMulti.bindPort(webPort, {
    protocol: 'http',
    preferredExternalPort: webPort,
  })
  const webInterface = sdk.createInterface(effects, {
    name: i18n('Web UI'),
    id: 'web',
    description: i18n(
      'The MeshChat web interface — messages, network interfaces, and settings',
    ),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })
  const webReceipt = await webOrigin.export([webInterface])

  return [webReceipt]
})
