# Macros

$web-only$

$web-only-end$
$slides-only$

$slides-only-end$
```rust
fn main() {
    println!("I'm a macro");
    println!("I'm from a custom derive: {:?}", Thing);
    println!("I'm from a an attribute macro: {}", say_hi());
}
#[derive(Debug)]
struct Thing;

#[inline]
fn say_hi() -> &'static str {
    "Hello world!"
}
```
