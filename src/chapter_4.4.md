# User Defined Types
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
    fn stuff(&self) {
        self.stuff // copy
    }
    // consumes self
    fn inner(self) {
        self.stuff
    }
}
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