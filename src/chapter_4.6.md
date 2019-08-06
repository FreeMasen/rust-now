# Macros

$web-only$

$web-only-end$
$slides-only$
### Syntax extensions and More
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
$notes$
Macros
- not going to be a long slide
- 4 kinds of macros
  - older macro_rules style
  - custom derives
  - attributes
  - function like macros
- Nearing finalization of hygiene
$notes-end$