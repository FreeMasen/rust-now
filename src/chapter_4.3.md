# Error Handling

```rust
fn main() -> Result<(), String> {
    // question mark to short circut
    could_fail(1)?;
    // pattern matching
    match could_fail(2) {
        Ok(_) => (),
        Err(e) => eprintln!("{}", e),
    }
    // complains that result is unused
    could_fail(3);
    could_fail(5)
}

fn could_fail(n: u8) -> Result<(), String> {
    if n % 2 == 0 {
        Err(format!("{} is even", n))
    } else {
        Ok(())
    }
}

```