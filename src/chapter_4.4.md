# User Defined Types
$web-only$
Rust also allows users to create their own types, this brings the object oriented paradigm into play. The key feature here is that object definitions are *always* plain old object style. When you create a new `struct` you can only give it data properties, no methods. To add methods you need to use the `impl` keyword to define them. Similar to python, `self` is explicitly provided as the first argument to any non-static methods. 
$web-only-end$
```rust
struct Thing {
    stuff: u8,
}

impl Thing {
    pub fn new() -> Self {
        Self {
            stuff: 0,
        }
    }
    pub fn increment(&mut self) {
        self.stuff += 1;
    }
    pub fn decrement(&mut self) {
        self.stuff -= 1;
    }
    // private
    fn zero(&mut self) {
        self.stuff = 0;
    }
    pub fn stuff(&self) {
        self.stuff // copy
    }
    // consumes self
    fn inner(self) -> u8 {
        self.stuff
    }
}
```

$web-only$
Note that in the above example we have a few flavors of the `self` keyword. First we see that `new` method returns `Self`, this means we could change the name of our struct from `This` to `That` and we don't actually have to touch this method. Because `new` takes no arguments it actually work like a static method in other languages.

Next we have `inc` and `dec` which both take `&mut self` (a mutable reference to self) as their first argument, this allows them to modify the internal contents of `self`. `zero` has the same version of `self` but doesn't have the `pub` keyword, which makes it private. `stuff` takes an immutable reference to self, which means we can't change it but we could copy the inner `u8` as the return value. Lastly `inner` takes self by value, that means it actually has moved from the call site into this function and at the end of it `self` will be consumed. 
$web-only-end$

```rust
#fn main() {
#struct Thing {
#    stuff: u8,
#}
#
#impl Thing {
#    pub fn new() -> Self {
#        Self {
#            stuff: 0,
#        }
#    }
#    pub fn increment(&mut self) {
#        self.stuff += 1;
#    }
#    pub fn decrement(&mut self) {
#        self.stuff -= 1;
#    }
#    // private
#    fn zero(&mut self) {
#        self.stuff = 0;
#    }
#    pub fn stuff(&self) {
#        self.stuff // copy
#    }
#    // consumes self
#    fn inner(self) -> u8 {
#        self.stuff
#    }
#}
let mut thing = Thing::new();
thing.inc();
thing.dec();
// can't call thing.zero();
println!("{}", thing.stuff());
println!("{}", thing.inner()); // Thing dies here
#}
```

$notes$
Object Oriented (sort of)
- Structs are Plain Old Objects
- `impl` for method defs
- Like python, self is first arg at def site
  - self = move
  - &self = reference
  - &mut self = mutable references
$notes-end$