# Ownership and Borrowing?
$web-only$
The next thing to cover is how rust handles references. In some languages, the reference vs value is something the developer has almost no control over. In Rust, like in C or C++ the control of a reference vs value is explicitly provided by the developer. Consider the following
$web-only-end$
$slides-only$
### Owned data can loan that data out
This example borrows `"ex"` as `y`
$slides-only-end$
```rust
# fn main() {
    let x = String::from("ex");;
    let y = &x;
    println!("x: {}, y: {}", x, y); 
# }
```
$notes$
Example 1
- x is a string
- y is borrowing "ex" from x
$notes-end$

$web-only$
In the above, we have two variables, `x` and `y`, `x` owns the value "ex" and `y` borrows the value of `x`. The console will print `x: 0, y: 0`. If we remove the `&` from line 2 above, the compiler says no.
$web-only-end$

$slides-only$
### Loaning data is explicit
this example moves `String::from("ex")` into `y`
$slides-only-end$
```rust
# fn main() {
    let x = String::from("ex");
    let y = x;
    println!("x: {}, y: {}", x, y);
# }
```
$notes$
Example 2
- "ex" is moved from x into y
  - x is dead
$notes-end$

$web-only$
Our friendly complier tells us that we are trying to use a previously moved value, what does that mean? Well, in rust when we assign one variable to another we _move_ the data into that new variable. In the above `x` owns the String "ex" on line 1, then on line 2 we move it into `y` so at that point `y` owns 0, when we try to look inside of `x` on line 3, we would find it empty because that value was moved. Here is the first rule of ownership and borrowing we need to know: any piece of data can only have 1 owner, that owner can lend out a reference to the data but the owner remains the same.

When we pair this concept with the explicitly mutable declaration we start to see the full picture of what is going on. Consider this example.
$web-only-end
$slides-only$
### Loaning data mutably

$slides-only-end$
```rust
# fn main() {
    let mut x = [0,1,2];
    let y = &mut x;
    y[0] += 1;
    // Updated!
    println!("x: {}", x[0]);
# }
```

$notes$
Example 3
- x is a mutable array
- y is a mutable reference to x
- x is updated through y
- ** Mutability is still explicit with references **
$notes-end$

$web-only$
As you can see we were able to manipulate x through our variable `y` as you would expect. The one big caveat here lies in the second rule of ownership and borrowing: any data owner is allowed to share data immutably as many times as they'd like but there can only ever be 1 mutable reference at at time. 
$web-only-end$

$slides-only$
### Is exclusive
$slides-only-end$
```rust
# fn main() {
    let mut x = [0,1,2];
    let y = &mut x;
    let z = &mut x;
    y[0] += 1;
    z[2] += 1;
    // Nope!
    println!("x: {}", x[0]);
# }
```
$notes$
Example 4
- Reference rules
  - Any number of references
  - 1 and only 1 mutable reference
$notes-end$

$web-only$
In this example, the compiler is telling us that y has an exclusive borrow on x, so we can't loan it to `z` until `y` is done with it. 
$web-only-end$