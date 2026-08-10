import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'reticulum-meshchat',
  title: 'Reticulum MeshChat',
  license: 'MIT',
  packageRepo: 'https://github.com/rpriven/reticulum-meshchat-startos',
  upstreamRepo: 'https://github.com/liamcottle/reticulum-meshchat',
  marketingUrl: 'https://reticulum.network/',
  donationUrl: 'https://liamcottle.com',
  description: { short, long },
  volumes: ['main'],
  images: {
    meshchat: {
      source: {
        dockerBuild: {},
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
