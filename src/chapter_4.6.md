# Macros

$web-only$
A lot can be said about the macro system in rust, so I wont dwell here for long. Because there are so may syntax restrictions, rust exposes a very rich system for extending that syntax. You may have noticed that when we need to interpolate a string we have used `println!` or `format!`, the exclamation point at the end indicates that this was defined as a macro instead of a function.

There are 3 types of rust macros, the "function style" macros we have been using for interpolation have been one. There are also "custom derives" which allow for the almost automatic implementation of traits (like the debug trait in the example below). Lastly there are "attribute style" macros, this allows for marking any function, struct or enum with an `#[attribute]` that will perform some transformation on that. The example below has an overview of what the 3 different syntaxes look like.
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