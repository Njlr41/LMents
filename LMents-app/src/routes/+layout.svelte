<nav>
    <a href="/">Home</a>
    <a href="/signup">Login</a>
    <a href="/googleclassroom-courses">Google Classroom Courses</a>
</nav>

<main>
    <slot/>
</main>
  
<style>
    nav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        }
</style>