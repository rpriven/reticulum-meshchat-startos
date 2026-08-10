# Reticulum MeshChat

Encrypted mesh messaging you own end to end. MeshChat is a web interface for
[Reticulum](https://reticulum.network/) — a network stack where your **identity is a keypair on
your disk**, not an account, and messages (LXMF) route peer-to-peer with end-to-end encryption
and no central servers. Reticulum is medium-agnostic: TCP over the internet, I2P, LoRa radios,
serial links — one network across all of them.

## Quick start

1. **Start the service** and open the **Web UI**. First boot generates your identity keypair —
   give it a moment.
2. **Set your display name** — *My Identity* panel, top of the sidebar. Your **LXMF Address**
   shown there is what other people message.
3. **Connect to a mesh** — a fresh node only has `AutoInterface` (local network). To reach peers
   over the internet, add a TCP entry point: *Interfaces → Add Interface → TCP Client*. Find
   current community entry points at **[directory.rns.recipes](https://directory.rns.recipes)**
   — entry points come and go, so treat any hardcoded example as possibly stale.
4. **Restart the service** — interface changes only take effect after a restart (the app shows a
   banner saying so; the StartOS restart button does the job).
   ⚠️ **A misconfigured interface can prevent MeshChat from starting** (crash loop, health check
   stuck on "not yet listening"). If that happens, run the **Reset Network Interfaces** action —
   it removes custom interfaces while keeping your identity and messages — then restart and re-add
   the interface with the correct type and target.
5. **Message someone** — announce yourself (*Announce Now*), then compose to a peer's LXMF
   address.

## Security model — read this

**The MeshChat web UI has NO authentication.** Anyone who can reach the Web UI port controls
your messaging identity: read everything, send as you.

- **Tor access (StartOS default):** effectively safe — the onion address acts like an
  unguessable bearer token. Don't share it.
- **LAN access is the real exposure:** any device on your network — a compromised IoT gadget, a
  guest's laptop — gets full control. If your LAN isn't trusted, don't enable a LAN address for
  this service, or wait for the planned basic-auth hardening (v1.1).

## Backups

StartOS backups of this service include your **Reticulum identity keypair** and message
database. That's correct — restoring a backup restores *being you* on the mesh — but it means
backup media holds the key. Guard it accordingly.

## Scope notes

- **Radio hardware (RNode/LoRa) is not supported in this version** — network interfaces only
  (TCP, AutoInterface). Radio passthrough into the container is unverified on StartOS.
- Your node keeps its own embedded Reticulum instance under this service's volume. Other
  Reticulum apps on the same box would have separate identities — that's expected.
