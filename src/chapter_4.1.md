# Arithmetic Data Types
$web-only$
While this feature might have a pretty intimidating name (I program so I don't need to do math), it is an extremely powerful tool. Sometimes referred to as _tagged unions_ or _enums with associated data_, it is a way to explicitly define one datatype that might have a few different shapes. It looks something like this.
$web-only-end$

```rust
enum Message {
    Join(String),
    Leave(String),
    Nick(String, String),
    Shout(String),
    Whisper {from: String, to: String, msg: String}
}
```
$web-only$
The above is an example of all of the different messages a chat system might need. `Join` and `Leave` would contain the username for the user joining or leaving, `Nick` would allow a user to change their username by providing the current and new values, `Shout` is a message everyone can see while `Whisper` is a private message between two users. 

That in an of itself isn't very compelling but when you pair that with pattern matching, it becomes extremely useful. Let's fill out this example to include listing for messages.
$web-only-end$


$notes$
- Arithmetic Data Types
    - Tagged Unions
    - Enums with Associated Data
- Another feature picked from functional languages
- A huge win for explicit dynamism
$notes-end$