# Rustup
$web-only$
The first tool to talk about is rustup, which is a sort of environment manager for rust. It will install the latest compiler for you or add new compiler targets to your computer. When getting started the most important thing about it is that it will take care of installing just about everything you could want for rust development.
$web-only-end$
$slides-only$
## Environment manager for rust
$slides-only-end$
### Macos/Linux
```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
$web-only$
For unix-like systems the process is dead simple, run the above in your terminal and you will be all set.
$web-only-end$
### Windows
1. Go to [https://rustup.rs/](https://rustup.rs/)
1. Download and install rustup-init.exe
$web-only$
For windows users it is a little more complicated, first you need to actually run an installer which you can find at the link above. You may also need to have re-distributable visual C++ which you can find [here](https://www.microsoft.com/en-us/download/developer-tools.aspx).

$web-only-end$
$slides-only$
## Contents
1. Rustup
1. Cargo
1. Rustc
$slides-only-end$
## Confirm your install
```sh
rustc --version
cargo --version
rustup --version
```

$notes$
Rustup
- version manager for the compiler
- primary place to install
- installs 2 other items
  - rustc
  - cargo
$notes-end$