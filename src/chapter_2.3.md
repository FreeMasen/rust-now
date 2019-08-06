# Lifetimes

$web-only$
Now the big question is how does the compiler determine when a piece of data or reference is valid? To achieve this every data type must also have its lifetime defined. With owned data, we don't have to do anything special but for references there is an additional type parameter that might need to be provided. Let's take our first example from the last page and explicitly add this notation.
$web-only-end$
$slides-only$
### Data lives a finite life
$slides-only-end$

```rust
fn main() { 
    let x = 0;
    let y = &x;
    println!("x: {}, y: {}", x, y);
}
```
$notes$
Example 1
- Blue ('b) line is the lifetime for all of main
- x lives for all of 'b
- Red ('a) is the lifetime of y
  - y is a reference to x
  - 'a cannot outlive 'b, ever
- Both 'a and 'b end at the end of main
$notes-end$

$web-only$
Above is the same example from before, this time with some notation on where the two lifetimes start and end. lifetime `'b` begins at the start of the `main` function while lifetime `'a` starts when `y` borrows `x`; both of these lifetimes end at the bottom of `main`. 

In this example our lifetimes both fit nicely into the same package as lexical scope. Variables defined in a scope are only available in that scope or a child scope and variables cannot be accessed before they are declared. Rust's lifetimes are far more powerful than just the lexical scope, to expand on that let's look at this example.
$web-only-end$

$slides-only$
### Failing type inference
$slides-only-end$
```rust
fn main() {
    let s1 = "🐕🐕🔔🔔🐕🔔🐕🔔🐕🔔🔔🐕🐕🐕";
    let s2 = "🐕🐕🔔🔔🔔🔔🔔🔔🐕🔔🐕🔔";
    let trimmed = moar_cowbell(s1, s2);
    println!("{}", trimmed);
}

fn moar_cowbell(s1: &str, s2: &str) -> &str {
    let ct1 = s1.chars().fold(0, |acc, c| if c == '🔔' {
        acc + 1
    } else {
        acc
    });
    let ct2 = s2.chars().fold(0, |acc, c| if c == '🔔' {
        acc + 1
    } else {
        acc
    });
    if ct1 > ct2 {
        s1
    } else {
        s2
    }
}
```

$notes$
Example 2
- Failing Example
- The compiler cannot detect the lifetime of the return &str
- It must be tied to the lifetime of s1 or s2
- The way we are calling it s1 and s2 have the same lifetime
  - But eventually this might change
$notes-end$

$web-only$
In this example, we have defined a function called `moar_cowbell` which takes two string references and returns the one that contains more bell emoji, unfortunately this will not compile. Rust is smart enough to figure out most lifetime requirements without them having to be explicitly defined, through type inference. This is a system where the compiler looks at all possible type annotations that could be applied and when there is only one, the developer doesn't have to provide one. Lifetimes are actually a kind of type definition, in this situation the lifetime of the return value could come from `s1` or it could come from `s2`, because there isn't just one, we will need to add a little more information.
$web-only-end$

$slides-only$
### Now with lifetime annotations
$slides-only-end$
```rust
fn main() {
    let s1 = "🐕🐕🔔🔔🐕🔔🐕🔔🐕🔔🔔🐕🐕🐕";
    let s2 = "🐕🐕🔔🔔🔔🔔🔔🔔🐕🔔🐕🔔";
    let trimmed = moar_cowbell(s1, s2);
    println!("{}", trimmed);
}

fn moar_cowbell<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    let ct1 = s1.chars().fold(0, |acc, c| if c == '🔔' {
        acc + 1
    } else {
        acc
    });
    let ct2 = s2.chars().fold(0, |acc, c| if c == '🔔' {
        acc + 1
    } else {
        acc
    });
    if ct1 > ct2 {
        s1
    } else {
        s2
    }
}
```
$notes$
Example 3
- Same as previous, now with lifetime annotations
- Lifetimes are provided like generic arguments
  - though with a '
$notes-end$

$web-only$
With this newly encoded lifetime information, the compiler now knows that `s1`, `s2` and the return value all need to live the same lifetime.

Because each piece of data not only has a type but also a known lifetime that means we don't need to call `malloc/free` and also we don't need to have a runtime garbage collector, the rust compiler is able to just insert any allocation/deallocation you will need.

This brings us to the next big win for Rust and that is Memory Safety, with the above scheme, you can never encounter a null pointer, perform a double free or leak memory due to a complicated object graph (I'm looking at you JavaScript). 
$web-only-end$

<script type="text/javascript" src="assets/lifetimes.js"></script>