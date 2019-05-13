# Mutability?

$web-only$
If you've ever learned a functional programming language this will probably be something you are familiar with, if not it can be a bit jarring. Any variable has a type and also a flag as to whether or not it can be changed. Consider these two examples, the first will not compile while the second will. The key here is the `mut` keyword, which declares something as mutable. It may seem small and unimportant but it will play a huge role as we move forward.
$web-only-end$

```rust
# fn main() {
    let x = 0;
    // Nope!
    x += 1;
# }
```
```rust
# fn main() {
    let mut x = 0;
    // YES!
    x += 1;
    println!("HAHA Success {}", x);
# }
```