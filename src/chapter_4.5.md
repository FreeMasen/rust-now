# Traits
$web-only$

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