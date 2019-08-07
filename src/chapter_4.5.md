# Traits
$web-only$
Traits are Rust's primary tool for dynamism. A trait can be defined and then implemented by a large number of types. Trait names can be used in place of type names to allow for that dynamic behavior. Conceptually they are very similar to interfaces however they can only define behavior, not data.

There are two ways to work with traits, first is that you can implement traits defined by *others* for your types. In this example we are implementing the standard library trait `Display` for our `Message` enum from before. The `Display` trait exposes 1 method, `fmt` which takes a reference to the implementor and a formatter, it then expects a return value of a `std::fmt::Result` which is what `write!` returns.
$web-only-end$
$slides-only$
### Implement other traits for your type
$slides-only-end$
```rust
#use std::fmt::{
#    Formatter,
#    Result,
#    Display,
#};
#enum Message {
#    Join(String),
#    Leave(String),
#    Nick(String, String),
#    Shout { from: String, msg: String},
#    Whisper {from: String, to: String, msg: String},
#    Kick(String),
#}
impl Display for Message {
    fn fmt(&self, f: &mut Formatter) -> Result {
        match self {
            Message::Join(username) => {
                write!(f, "👋 {} has joined the chat", username)
            },
            Message::Leave(username) => {
                write!(f, "😢 {} has left the chat", username)
            },
            Message::Nick(from, to) => {
                write!(f, "😎 {} has changed their username to {}", from, to)
            },
            Message::Shout { from, msg } => {
                write!(f, "😃 {}: {}", from, msg)
            },
            Message::Whisper { from, to, msg } => {
                write!(f, "🐱‍👤 secret message for {} from {}:\n    {}", to, from, msg)
            },
            Message::Kick(who) => {
                write!(f, "👢 user {} has been kicked from the channel", who)
            },
        }
    }
}
fn main() {
    #    let messages = vec![
#        Message::Join(String::from("person1")),
#        Message::Join(String::from("person2")),
#        Message::Join(String::from("person3")),
#        Message::Nick(String::from("person2"), String::from("JunkMaster3000")),
#        Message::Shout { 
#            from: String::from("JunkMaster3000"), 
#            msg: String::from("All Hail JunkMaster!")
#        },
#        Message::Whisper {
#            from: String::from("person1"),
#            to: String::from("person3"),
#            msg: String::from("Whoa, that went in a different direction than I was expecting"),
#        },
#        Message::Whisper {
#            from: String::from("person3"),
#            to: String::from("person1"),
#            msg: String::from("lol, yeah JunkMaster is a little wild sometimes"),
#        },
#        Message::Leave(String::from("person1")),
#    ];
    //...
    for msg in messages {
        println!("{}", msg);
    }
}
```
$web-only$
With this defined we now can just pass any `Message` to `println!` using the `{}` syntax to have it call our `fmt` method.

The other way to work with types is to define your own types which can be implemented for anyone else's types. In th next example, we have defined a trait called `Firstable` which allows us to get a reference to something returned by `first`. Below, it is implemented for two types of rust collections, Vectors and Arrays.
$web-only-end$
$slides-only$
### Implement your traits for other types
$slides-only-end$
```rust
pub trait Firstable<T> {
    fn first(&self) -> &T;
}
impl<T> Firstable<T> for Vec<T> {
    fn first(&self) -> &T {
        &self[0]
    }
}
impl<T> Firstable<T> for &[T] {
    fn first(&self) -> &T {
        &self[0]
    }
}
```

$notes$
Traits
- Primary method of shared behavior
- methods only
- can impl YOUR traits for OTHER's types
- can impl OTHER's traits for YOUR types
$notes-end$