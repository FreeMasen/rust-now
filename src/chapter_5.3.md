# Bin vs Lib
$web-only$
One thing that can be confusing is that you need to explicitly state if your are creating a library or a binary project. `cargo new` will create a binary by default, this is a program that will actually be *run*, meaning it needs to have a `main` function to know where to start. You can also create a library project by executing `cargo new --lib`, this will set you up to have a project that other programs can use. You can always tell if your working on a library or a binary because libraries have a starting point at `lib.rs` while binaries start at `main.rs`. 
$web-only-end$

$slides-only$
### Bin
* Must have main
* Produces executable
### Lib
* Produces linkable library
* A project can have many libs
$slides-only-end$
$notes$
Project Types
- Two major flavors
  - Lib = usable by others
  - Bin = executable
    - must export main/start point
$notes-end$