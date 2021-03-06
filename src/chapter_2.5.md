# So?
$web-only$
Let's review, because mutability is declarative, we can differentiate between mutable references and non-mutable references. Our borrowing rules require that only one place can mutate data at a time. Lifetimes ensure that our data is allocated and cleaned up correctly. Finally, no variable can ever be null. What does that all mean?


* Because we can only mutate data from one place, we can't have a data race.
* Because each piece of data not only has a type but also a known lifetime that means we don't need to call `malloc/free` and also we don't need to have a runtime garbage collector.
* Because no variable can be null we can't act on something that doesn't exist.

This turns out to squash a ridiculous number of bugs.
$web-only-end$

$slides-only$
* No data races
* Memory safe
  * No malloc/free
  * No double free
  * No memory leaks
  * No reference cycles
  * No garbage collector
* Never null
$slides-only-end$

$notes$
- No data races
  - You can't share references across threads if any of them will be mutated
  - To do so you can use something like a mutex or Atomic data structure
- Memory Safe
  - No manual management
  - No memory leaks
  - No garbage collector errors
    - Refernce cycles
    - Complicated Object Graphs (JS)
  - No null pointer error
- This offloads a lot of possible runtime errors to compile time
  - which is a win
$notes-end$