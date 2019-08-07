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
$notes$
Example 1
- This doesn't compile because x might not have a value
- The Option enum helps with this, which we will talk about later
$notes-end$