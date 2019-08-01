# Why Now?
$web-only$
If you have tried to learn rust in the past, you may have run into some friction around a few points. First is the old borrow checker, up until late last year the rust compiler could only use lexical scope to determine the life of any borrowed data, that meant we would have to jump through some hoops like this.
$web-only-end$
$slides-only$
### Non-lexical lifetimes
$slides-only-end$
```rust
fn main() {
    let mut x = 1;
    {
        inc(&mut x);
    }
    println!("{}", x);
}
fn inc(&mut x: usize) {
    x += 1;
}
```
$web-only$
Previously the borrow checker wouldn't have been able to tell that `println!` would be able to safely print `x` because it was borrowed mutably by `inc` so we would put the mutable borrow in its own scope. Thankfully non-lexical lifetimes save us from this rigamarole.

Next up is the ability to use the `dyn` and `impl` keyword to refer to data that conforms to a specific `trait` (rust's primary inheritance construct) in a far more convenient way. Previously it was not possible to use traits as return types unless they were first `Box`ed onto the heap, this lead to some extra run-time cost. 
$web-only-end$

$slides-only$
### dyn/impl trait
$slides-only-end$
```rust

fn main() {
    let boxed_fn = get_closure();
    let raw_fn = get_closure_better();
    println!("{}, {}", boxed_fn(10), raw_fn(7));
}

fn get_closure() -> Box<dyn Fn(usize) -> usize> {
    Box::new(|x| x * x)
}

fn get_closure_better() -> impl Fn(usize) -> usize {
    |x| x * x
}
```
$web-only$
While it might not seem like much, it is a pretty big performance win for this kind of code. Previously you would need to create a function pointer and allocate that function on the heap, this would lead to a v-table being crated and you could only call that function through the v-table now there is no heap allocation and also no v-table. Whoa... lots of jargon in that one, quickly and to the point it is a lot faster.

Now for the kicker, async/await has just started to stabilize, this is a huge win! Previously, to perform some asynchronous operation you would either need to spin up a thread manually and then create a channel to communicate across those threads which is cumbersome at best. 

$web-only-end$

$slides-only$
### thread + channel
$slides-only-end$
```rust
use std::{
    thread::{
        spawn,
        sleep
    },
    sync::mpsc::{
        channel,
    },
    time::Duration,
};

fn main() {
    let (sender, receiver) = channel();
    let s1 = sender.clone();
    spawn(move || {
        let s = s1;
        for x in 0..10 {
            s.send(Some(x as isize)).unwrap();
            sleep(Duration::from_millis(100 * x));
        }
        s.send(None).unwrap();
    });
    let s2 = sender.clone();
    spawn(move || {
        sleep(Duration::from_millis(500));
        let s = s2;
        for y in (-10..0).rev() {
            s.send(Some(y)).unwrap();
            let sleep_inc = y.abs() as u64;
            sleep(Duration::from_millis(100 * sleep_inc));
        }
        s.send(None).unwrap();
    });
    let mut done = 0;
    while done < 2 {
        match receiver.recv() {
            Ok(Some(m)) => println!("{}", m),
            Ok(None) => done += 1,
            _ => (),
        }
    }
}
```
$web-only$
The other option was to utilize this 3rd party library trait called `Future` the big problem here is that the type signature is so complicated that it is difficult to get everything right.

$web-only-end$

$slides-only$
### async/await
$slides-only-end$


