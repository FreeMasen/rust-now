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
        let y = &mut x;
       *y += 1;
    }
    println!("{}", x);
}
```
$web-only$
Previously the borrow checker wouldn't have been able to tell that `println!` would be able to safely print `x` because it was borrowed mutably by `y` so we would put the mutable borrow in its own scope. Thankfully non-lexical lifetimes save us from this rigamarole.

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
            sleep(Duration::from_millis(50 * x));
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
            sleep(Duration::from_millis(50 * sleep_inc));
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
### Futures
$slides-only-end$

```rust
use std::{
    time::Duration,
};

#[macro_use]
extern crate futures;
extern crate tokio;
use std::fmt;

use futures::{
    prelude::*,
    Stream,
};
use tokio::timer::Interval;
struct Counter {
    end: isize,
    idx: isize,
    inc: bool,
    interval: Interval,
}
impl Counter {
    fn new(min: isize, max: isize) -> Self {
        Self {
            end: max,
            idx: min,
            inc: min < max,
            interval: Interval::new_interval(Duration::from_millis(1)),
        }
    }
}
impl Stream for Counter {
    type Item = isize;
    type Error = ();
    fn poll(&mut self) -> Poll<Option<Self::Item>, Self::Error> {
        try_ready!(
            self.interval.poll()
                // The interval can fail if the Tokio runtime is unavailable.
                // In this example, the error is ignored.
                .map_err(|_| ())
        );
        let next_wait = self.idx.abs() as u64;
        self.interval = Interval::new_interval(
            Duration::from_millis(1 + next_wait * 10)
        );
        Ok(if self.inc {
            if self.idx < self.end {
                self.idx += 1;
                Async::Ready(Some(self.idx))
            } else {
                Async::Ready(None)
            }
        } else {
            if self.idx > self.end {
                self.idx -= 1;
                Async::Ready(Some(self.idx))
            } else {
                Async::Ready(None)
            }
        })
    }
}

pub struct DisplayCt<T> {
    stream: T,
}

impl<T> DisplayCt<T> {
    fn new(stream: T) -> DisplayCt<T> {
        Self {
            stream,
        }
    }
}

impl<T> Future for DisplayCt<T>
where
    T: Stream,
    T::Item: fmt::Debug,
{
    type Item = ();
    type Error = T::Error;

    fn poll(&mut self) -> Poll<(), Self::Error> {
        
        loop {
            let value = match try_ready!(self.stream.poll()) {
                Some(value) => value,
                None => break,
            };

            println!("{:?}", value);
        }

        Ok(Async::Ready(()))
    }
}
fn main() {
    let ct1 = Counter::new(0, 10).map_err(|e| eprintln!("{:?}", e));
    let ct2 = Counter::new(0, -10).map_err(|e| eprintln!("{:?}", e));
    let d1 = DisplayCt::new(ct1);
    let d2 = DisplayCt::new(ct2);
    let joined = d1.join(d2);
    tokio::run(
        joined.and_then(|_| Ok(()))
    );
}
```
$web-only$
Just a short time ago, the `Future` trait was co-opted by the rust standard library, so that it could be coupled with the keywords async and await. Similar to how JavaScript co-opted the concept of Promises to work with its async/await syntax, rust will be able to abstract all the Future craziness into these keywords.

It is anticipated to look something like this.
$web-only-end$
$slides-only$
### async/await
$slides-only-end$

```rust
let up = || {
    for i in 0..10 {
        println!("{}", i);
        yield;
    }
    return;
};
let down = || {
    for i in (-10..0).rev() {
        println!("{}", i);
        yield;
    }
    return;
};
let up_gen = from_generator(up);
let down_gen = from_generator(down);
up_gen.await;
down_gen.await;
```
$web-only$
Sadly, that last example wont run right now but the last major RFC for a true MVP was just slated for stabilization. Since rust runs on a 6 week release cycle, that means we are looking at fewer than 12 weeks before this is fully realized.

Rust has been going through a huge ergonomic push to make life easier, things like non-lexical lifetimes have already made the learning curve ease up a bit. With async/await even much more advanced programs won't cause a developers head to explode.

With that, let's take a quick glance at a few other features rust can boast about.
$web-only-end$


$notes$
Big slide, here's the highlights
- The last 2 years have brought a bunch of ergonomic wins
  - if you have ever heard of "fighting the borrow checker" that era is pretty much over
    - NLL
- We are on the cusp of async/await
  - Future trait (poll method)
    - Community built
    - adopted in last major release
  - Plugable runtimes
- Other Highlights
  - Swappable memory allocator
    - huge for embedded
$notes-end$