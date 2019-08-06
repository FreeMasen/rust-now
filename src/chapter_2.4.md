# No Null

$web-only$
The last piece in this puzzle is that no variable is allowed to be uninitialized, this means that there is no null pointer.
$web-only-end$
$slides-only$
#### Not allowed
$slides-only-end$
```rust
fn main() {
    let x: usize;
    println!("{}", x);
}
```
