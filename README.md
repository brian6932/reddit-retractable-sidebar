# Reddit Retractable Sidebar

If you do a lot of split screen Redditing, you'll quickly find that the sidebar can be a nuisance. Well, this script makes that sidebar retractable.

It adds a FAB button to the right-hand side of the screen which allows you to hide or show the sidebar. A `localStorage` entry's added to remember the sidebar's last position, so that you can browse the site without continually hiding it.

This is a full rewrite of https://github.com/MichaelCharles/reddit-retractable-sidebar without the use of jQuery.

## Things to note.
- The fork adds `prefers-color-scheme` dark and light modes.
- Will only work on Old Reddit.
- As of version `0.4`, you can toggle the sidebar by pressing <kbd>q</kbd>.
