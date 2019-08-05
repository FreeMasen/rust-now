# Tests
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