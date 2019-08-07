# Error Handling

$web-only$
With the power of the rust enum, it becomes easy to return a value that is _either_ a success or failure. This means we don't need to lean on runtime exceptions as our only error handling option. Instead we can use the `Result` type. This is an enum provided by the standard library that has two cases, `Ok` for success and `Err` for errors. 
$web-only-end$

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
$web-only$
In the above example we have a function called `could_fail` that will always fail on even numbers. Inside of our `main` function, we call `could_fail` with a few different options for error handling.

The first is the `?` operator, this short circuits `main` if the call was an error. Next we have the long form pattern matching for when you really do care about what to do on an error. Third we have a call that just ignores there is even a return value, this will cause the compiler to warn you about this and lastly we return the result of the call to `can_fail`. Overall this creates a great error handing experience, first you will always know if the functions you are calling can fail. In the event you want to ignore that fact, you can always just short circuit or even ignore the error case.
$web-only-end$

$notes$
Error Handling
- Enums + Pattern matching = beautiful error handling
- ? operator short circuts
- pattern matching on Ok vs Err
- warning when unused
$notes-end$