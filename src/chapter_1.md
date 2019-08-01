# Rust?

$slides-only$
- _Systems_ Programming Language
- Developed at Mozilla Research
- Compiled/No Runtime
- Memory Safe
- No Data Races
- Concurrency First
$slides-only-end$

$web-only$
For the uninitiated Rust is a _systems_ programming language from Mozilla designed with the goal of parallelizing the browser and was [actually successful](https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/) in doing so. It is an attempt to balance the niceties of modern programming languages with the speed of C or C++. To achieve this, the output is fully compiled to machine code instead of an intermediate language and while this means that programs need to be compiled for a specific system, the range of systems is extremely broad. Current _tier 1_ targets include MacOS, Windows and Linux (all for i686 and x86_64), _tier 2_ targets include almost any system you can think of. If all of that wasn't already impressive, it is also _memory safe_ meaning we don't have to worry about our program's memory the compiler will guarantee we aren't doing anything dangerous. So now the big question is how?
$web-only-end$