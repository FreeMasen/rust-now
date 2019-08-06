# Std Types
## `Result`
```rust
enum Result<T, E> {
    Ok(T),
    Err(E)
}
```
## `Option`
```rust
enum Option<T> {
    Some(T),
    None,
}
```
## `String` vs `&str`
* `String`: Heap allocated growable buffer
* `&str`: Reference to fixed size buffer
## `Vec<T>` vs `[T; N]`
* `Vec`: Growable array (ArrayList/List)
* `[T; N]`: Fixed size array
## `Box<T>`
* Heap allocated pointer
```rust
#fn main() {
let n = 100;
let heap_n = Box::new(n);
#}
```
## Numbers
* `u8`
* `i8`
* `u16`
* `i16`
* `u32`
* `i32`
* `f32`
* `u64`
* `i64`
* `f64`
* `u128`
* `i128`
* `usize`
* `isize`
## Tuples
* First class data type
```rust
#fn main() {
let (x, y) = get_tuple();
#}
fn get_tuple() -> (u8, u8) {
    (1, 2)
}
```

$notes$
Std Types
- Result: error handling
- Option: Null Handler
- String vs &str
  - StringBuilder vs string (c#)
- Vec vs []
  - Array vs Array List
  - Vec: growable
  - []: static size
- Box:
  - Everything is stack allocated unless explicitly boxed
    - Some exceptions (String, Vec, HashMap...)
- Lots of numbers (all shapes and sizes)
  - usize & isize = size_t ish
- Loose data structures with strong typing
$notes-end$