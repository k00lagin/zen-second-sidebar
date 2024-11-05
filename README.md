# Firefox Second Sidebar

A Firefox userChrome.js script for adding a second sidebar with web panels like in Vivaldi/Floorp/Zen.

## Motivation

There are many forks of Firefox, but I prefer to continue using the original browser. However, I have also tried other browsers such as Vivaldi, Floorp and Zen. I also miss the feature of having a decent sidebar with web panels, which is why I decided to create my own version, with blackjack and hookers.

## Demo

[![fss_panels](https://github.com/user-attachments/assets/bc63aacb-228d-4a02-9042-533d28256448)](https://github.com/user-attachments/assets/1c578202-a24d-47dd-96b7-6ed2be02fb32)

## Features

1. Adding a new web panel by left-clicking on the plus sign. If you are on a web page, the current address will be automatically inserted into the address bar.
2. Changing the width of the sidebar, each web panel has its own width.
3. Pinning and unpinning the sidebar, each web panel has its own state. In the pinned state, the sidebar will be located statically next to the page. The unpinned sidebar appears on top of the page and closes when the focus is lost.
4. Closing sidebar with unloading of the web panel;
5. Editing the web panel by right-clicking on the corresponding button:
    - Changing the web address.
    - Changing the favicon.
    - Resetting the favicon.
    - Option to unload from memory after closing.
    - Moving the web panel button.
    - Deleting the web panel.
6. Managing the page opened in the web panel: going back and forth, refreshing the page and going to the home page.
7. Sound indicator.

## Install

1. Install [fx-autoconfig](https://github.com/MrOtherGuy/fx-autoconfig).
2. Copy `second_sidebar/` and `second_sidebar.uc.mjs` into `chrome` folder.
3. [Clear](https://github.com/MrOtherGuy/fx-autoconfig?tab=readme-ov-file#deleting-startup-cache) startup-cache.
4. Have fun!
