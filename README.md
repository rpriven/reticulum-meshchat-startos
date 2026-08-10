# Reticulum MeshChat for StartOS

> ✅ **Tested on real hardware.** Built via Start9 CI (x86_64 + aarch64) and run on StartOS
> 0.4.0.1 stable: fresh install, in-place update, two-way LXMF messaging, interface-reset
> recovery, reboot survival, and a week-long soak. Submitted to the Start9 community registry —
> until it lands there, sideload the CI-built `.s9pk`.

[Reticulum MeshChat](https://github.com/liamcottle/reticulum-meshchat) is a web-UI chat
application for the [Reticulum Network Stack](https://reticulum.network/) — encrypted,
delay-tolerant mesh messaging (LXMF) that runs over TCP, I2P, LoRa radios, serial links, or
any mix of them at once. This package brings it to
[StartOS](https://github.com/Start9Labs/start-os): a sovereign mesh-messaging node on your own
hardware. A LoRa radio node and an internet node aren't two bridged systems — they're one network.

## v1 shape

- Pinned upstream multi-arch image (x86_64 + aarch64), headless web UI on port 8000
- Single persistent volume at `/config` carrying the whole state surface (RNS config, message
  DB, identity keypair) — StartOS backups therefore include the identity
- Zero duplicate config surfaces: display name, identity, and network interfaces are all
  managed in MeshChat's own UI (entry points via [directory.rns.recipes](https://directory.rns.recipes) —
  entry points rot; they are configuration, not constants)
- Network-interfaces-only in v1 (no radio hardware passthrough yet)
- Honest security model documented: the web UI has no auth — exposure guidance included

## License

MIT — same as upstream.
