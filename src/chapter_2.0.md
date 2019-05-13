# How?
$web-only$
There are a few things that enable rust to deliver on its promises. The three we are going to cover in this section are mutability being at the type level, lifetimes and the borrow checker. Each of these play an important role individually but together they form a sort of safety Voltron. 
$web-only-end$

- Mutability at the type level
- Ownership & Borrowing
- Lifetimes

<img id="voltron" src="./assets/img/voltron.jpg" height="400" alt="Voltron Assemble" style="display:none;margin-left: 10px;" />
<script>
    (function() {
        let v = document.getElementById('voltron');
        if (!v) return console.error('no voltron image found');
        setTimeout(() => {
            v.style.display = 'block'
        }, 2000);
    })();
</script>