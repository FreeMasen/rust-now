# Pattern Matching

```rust
enum Message {
    Join(String),
    Leave(String),
    Nick(String, String),
    Shout { from: String, msg: String},
    Whisper {from: String, to: String, msg: String},
}
fn main() {
    let messages = vec![
        Message::Join(String::from("person1")),
        Message::Join(String::from("person2")),
        Message::Join(String::from("person3")),
        Message::Nick(String::from("person2"), String::from("JunkMaster3000")),
        Message::Shout { 
            from: String::from("JunkMaster3000"), 
            msg: String::from("All Hail JunkMaster!")
        },
        Message::Whisper {
            from: String::from("person1"),
            to: String::from("person3"),
            msg: String::from("Whoa, that went in a different direction than I was expecting"),
        },
        Message::Whisper {
            from: String::from("person3"),
            to: String::from("person1"),
            msg: String::from("lol, yeah JunkMaster is a little wild sometimes"),
        },
        Message::Leave(String::from("person1")),
    ];
    for msg in messages {
        match msg {
            Message::Join(username) => {
                println!("{} has joined the chat", username);
            },
            Message::Leave(username) => {
                println!("{} has left the chat", username);
            },
            Message::Nick(from, to) => {
                println!("{} has changed their username to {}", from, to);
            },
            Message::Shout { from, msg } => {
                println!("{}: {}", from, msg);
            },
            Message::Whisper { from, to, msg } => {
                println!("secret message for {} from {}:", to, from);
                println!("    {}", msg);
            }
        }
    }
}
```

$web-only$
The above is a naive example of how a chat program might run. We have our dummy message buffer in the variable `messages`. We loop over each `msg` in that collection and depending on what kind of message it is we print a different message to the console. The final key that makes this so powerful is that pattern matching is exhaustive, meaning if you added a new message type to the `Message` enum the compiler won't let you build the application until you have handled it.
$web-only-end$

```rust
enum Message {
    Join(String),
    Leave(String),
    Nick(String, String),
    Shout { from: String, msg: String},
    Whisper {from: String, to: String, msg: String},
    Kick(String),
}
#fn main() {
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
#    for msg in messages {
//....
match msg {
    Message::Join(username) => {
        println!("{} has joined the chat", username);
    },
    Message::Leave(username) => {
        println!("{} has left the chat", username);
    },
    Message::Nick(from, to) => {
        println!("{} has changed their username to {}", from, to);
    },
    Message::Shout { from, msg } => {
        println!("{}: {}", from, msg);
    },
    Message::Whisper { from, to, msg } => {
        println!("secret message for {} from {}:", to, from);
        println!("    {}", msg);
    }
}
#    }
#}
```

$web-only$
This allows a developer to feel confident that something is going to just get lost. If you needed to add a catch all you can do that with the `_` case.
$web-only-end$


```rust
#enum Message {
#    Join(String),
#    Leave(String),
#    Nick(String, String),
#    Shout { from: String, msg: String},
#    Whisper {from: String, to: String, msg: String},
#    Kick(String),
#}
#fn main() {
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
#            to: String::from("person1"),
#            msg: String::from("Whoa, that went in a different direction than I was expecting"),
#        },
#        Message::Whisper {
#            from: String::from("person3"),
#            to: String::from("person1"),
#            msg: String::from("lol, yeah JunkMaster is a little wild sometimes"),
#        },
#        Message::Leave(String::from("person1")),
#    ];
#    for msg in messages {
//...
match msg {
    Message::Join(username) => {
        println!("{} has joined the chat", username);
    },
    Message::Leave(username) => {
        println!("{} has left the chat", username);
    },
    Message::Nick(from, to) => {
        println!("{} has changed their username to {}", from, to);
    },
    Message::Shout { from, msg } => {
        println!("{}: {}", from, msg);
    },
    Message::Whisper { from, to, msg } => {
        println!("secret message for {} from {}:", to, from);
        println!("    {}", msg);
    },
    _ => println!("Unknown message"),
}
#    }
#}
```