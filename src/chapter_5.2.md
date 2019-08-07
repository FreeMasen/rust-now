# Cargo
$web-only$
Next up is cargo, every rust developer's best friend, this tool will do a the heaving lifting when if comes to working with rust. First it can be used to boot strap you a new project by using the `cargo new [folder-name]` and `cargo init` commands. It will also run all of your `#[test]`s that we talked about before using the `cargo test` command. You can also use `cargo build` to compiler your program into the `targets` folder or `cargo run` to both compile it and run it. For validating your program works correctly you can use the `cargo check` which will work faster that `cargo build`. Lastly, you can use `cargo install` to install new command line tools for example `cargo install mdbook` would install the static site generate used to write this site.

It also helps you manage your dependencies, in a Cargo.toml file in your project's root you will be able to list any packages that exist on [crates.io](https://crates.io) (which are referred to as "crates" because of puns). When you compile or run your program with cargo it will download and install those packages on your system locally and set them up to be included in your program.

so, in short, it works a lot like npm but for rust.
$web-only-end$
$slides-only$
The package manager and test runner and binary installer and build pipeline runner for most rust programs.

- `cargo new`
- `cargo init`
- `cargo test`
- `cargo run`
- `cargo check`
- `cargo install mdbook`

[Crates.io](https://crates.io)
$slides-only-end$
$notes$
Cargo
- Like NPM for "crates"
- Crates.io like npmjs.org
- Owned and operated by the community
$notes-end$