# Std Types
$web-only$
There are a few types provided by rust that that can be confusing when getting started. The first one we covered which is the `Result` type.
$web-only-end$
## `Result`
```rust
enum Result<T, E> {
    Ok(T),
    Err(E)
}
```
$web-only$
The above is what the definition of the result type actually looks like. It really is just an enum with two cases, however there are a few things the compiler does that make it a little more special (like warning on unused).

Next is the `Option` type, this is the way we can work with data that could be unavailable. Like result it has two cases but instead of ok and error they are Some and None, where Some has data and None does not.
$web-only-end$
## `Option`
```rust
enum Option<T> {
    Some(T),
    None,
}
```
$web-only$
There are a number of really nice features surrounding this type just like there is for Result, but in the end it is also just an enum defined like the above code block.
$web-only-end$
## `String` vs `&str`
$slides-only$
* `String`: Heap allocated growable buffer
* `&str`: Reference to fixed size buffer
$web-only$
The next type to cover is strings. In rust there are two different types of strings which can get a little confusing but they are there for good reason. First is the `String` type, this is the growable string which will always be heap allocated (if that matters to you). The other type is `str` or a string slice, this is always used as a reference either to a static string or to a `String`. If you are familiar with the `StringBuilder` in C#, `String` fills a similar role.
$web-only-end$
```rust
fn main() {
    let mut string = String::new();
    string.push('a');
    string.push('b');
    string.push('c');
    string.push_str("def");
    println!("String: {}", string);
    let fixed: &str = "abcdef"; // static string;
    println!("fixed: {}", fixed);
    let other: &str = &string[1..3]; // slice of `string`
    println!("other: {}", other);
}
```
## `Vec<T>` vs `[T; N]`
$slides-only$
* `Vec`: Growable array (ArrayList/List)
* `[T; N]`: Fixed size array
$slides-only-end$
$web-only$
Similar to `String` and `str`, `Vec` is the growable collection type while `[T; N]` is the fixed size array. 
$web-only-end$
```rust
fn main() {
    let mut v: Vec<usize> = Vec::new();
    v.push(1);
    v.push(2);
    v.push(3);
    println!("Vec: {:?}", v);
    let mut arr: [usize; 3] = [0;3];
    arr[0] = 1;
    arr[1] = 2;
    arr[3] = 3;
    println!("arr: {:?}", arr);
}
```
## `Box<T>`
$slides-only$
* Heap allocated pointer
$slides-only-end$
$web-only$
The default for types is that they will be stack allocated, that means that sometimes it can be tough to get a type to live for longer than any given function. This is where the `Box` type comes it, this type explicitly puts your data on the heap but if you don't much care about that that's ok too because you can actually use a boxed version of data just like an unboxed version.
$web-only-end$
```rust
#fn main() {
let n = 100;
let heap_n = Box::new(n);
if heap_n > 10 {
    println!("big!");
}
#}
```
## Numbers
$web-only$
There are quite a few number types in rust, the full list is below. Most of these are pretty self explanatory, each is prefixed with either i, u or f (integer, unsigned-integer, or float) and then the size of that number. So `i8` can only go up to 127 while u8 can go up to 255 but not below 0. The only slightly confusing ones are `isize` and `usize` which will always corrispond to the computer you compiled it for (isize on a 64bit system is i64 but on a 32 bit system is i32).
$web-only-end$
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
$slides-only$
* First class data type
$slides-only-end$
$web-only$
Tuples are a slightly looser data type, you can think of them like a fixed size collection of possibly different types. Their primary use is for returning multiple pieces of data from one function. One of the nice things about them is that they can be used to easily de-structure some return value, the below example the variables x and y are initialized to the respective numbers from `get_tuple`. If you don't want to destructure you can access the inner values with dot and then the index of the value you want.
$web-only-end$
```rust
#fn main() {
let (x, y) = get_tuple();
let pair = get_tuple();
println!("x: {}, pair.0: {}", x, pair.0);
println!("y: {}, pair.1: {}", y, pair.1);
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