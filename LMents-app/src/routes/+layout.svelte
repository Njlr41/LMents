<nav>
    <a href="/">Home</a>
    <a href="/signup">Login</a>
    <a href="/courses">Courses</a>
    <a href="/assignments">Assignments</a>
    <a href="/announcements">Announcements</a>
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