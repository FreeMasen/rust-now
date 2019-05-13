# Ownership and Borrowing?
$web-only$
The next thing to cover is how rust handles references. In some languages, the reference vs value is something the developer has almost no control over. In Rust, like in C or C++ the control of a reference vs value is explicitly provided by the developer. Consider the following
$web-only-end$

```rust
# fn main() {
    let x = 0;
    let y = &x;
    println!("x: {}, y: {}", x, y); 
# }
```

$web-only$
In the above, we have two variables, `x` and `y`, `x` owns the value 0 and `y` borrows the value of `x`. The console will print `x: 0, y: 0`. If we remove the `&` from line 2 above, the compiler says no.
$web-only-end$

```rust
# fn main() {
    let x = 0;
    let y = x;
    // The same twice!
    println!("x: {}, y: {}", x, y);
# }
```

$web-only$
Our friendly complier tells us that we are trying to use a previously moved value, what does that mean? Well, in rust when we assign one variable to another we _move_ the data into that new variable. In the above `x` owns 0 on line 1, then on line 2 we move 0 into `y` so at that point `y` owns 0, when we try to look inside of `x` on line 3, we would find it empty because that value was moved. Here is the first rule of ownership and borrowing we need to know and that is any piece of data can only have 1 owner, that owner can lend out a reference to the data but the owner remains the same.

When we pair this concept with the explicitly mutable declaration we start to see the full picture of what is going on. Consider this example.
$web-only-end

```rust
# fn main() {
    let mut x = [0,1,2];
    {
        let y = &mut x;
        y[0] += 1;
    }
    // Updated!
    println!("x: {}", x[0]);
# }
```


$web-only$
As you can see we were able to manipulate x through our variable `y` as you would expect but why the extra curly braces? In the answer to that lies the second major rule of ownership and borrowing, the owner of any piece of data can lend out that data as many times as it would like, so long as the borrower can't modify the data. If the owner wants to lend out the data so the borrower can change it has to be exclusive. In the above example the extra curly braces create a new scope, `y` is borrowing `x` only until the end of that scope, which allows us to print part of `x`. If we tried it without that block the compiler would say no again.
$web-only-end$


```rust
# fn main() {
    let mut x = [0,1,2];
    let y = &mut x;
    y[0] += 1;
    // Nope!
    println!("x: {}", x[0]);
# }
```

$web-only$
In this example, the compiler is telling us that y has an exclusive borrow on x, so we can't loan it to `println` until `y` is done with it. With these two rules, we are able to guarantee that our programs will never have a data race which is a pretty powerful thing.
$web-only-end$