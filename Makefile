# headscale ships no riscv64 release binary and debian:bookworm-slim has no riscv64
# variant, so riscv is dropped — same as forgejo/p2pool. Re-add 'riscv' here +
# 'riscv64' in the manifest if upstream ships one AND the base image supports it.
ARCHES := x86 arm
include s9pk.mk
