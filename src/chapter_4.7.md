# Tests
$web-only$
One of my personal favorite things about rust is that tests are a first class citizen. Simply using the `#[test]` attribute you can define your own test, these will only run when passed to the test runner, otherwise they will be stripped out of your program.
$web-only-end$
```rust
fn add_one(v: u8) -> u8 {
    v + 1
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_add_one() {
        assert_eq!(2, add_one(1));
        assert_eq!(3, add_one(2));
    }
}
```
$notes$
Tests!
- Integrated test framework
- makes them first class concepts
$notes-end$