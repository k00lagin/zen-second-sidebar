# Second Sidebar for Firefox

A Firefox userChrome.js script for adding a second sidebar with web panels like in Vivaldi/Floorp/Zen.

![promo_rounded](https://github.com/user-attachments/assets/d81493d3-a7f7-4798-9249-a2b9e5e3a8b7)

## Motivation

There are many forks of Firefox, but I prefer to continue using the original browser. However, I have also tried other browsers such as Vivaldi, Floorp and Zen. I also miss the feature of having a decent sidebar with web panels, which is why I decided to create my own version, with blackjack and hookers.

## Demo

https://github.com/user-attachments/assets/e11f7657-62b0-4936-994f-5c8ae13618f6

## Features

<table>
   <tr>
      <td>
      <h3>Adding new web panel</h3>
         <ol>
            <li>Left-click on the Plus button.</li>
            <li>Enter the web address. The current address will be automatically inserted into the field.</li>
            <li>Press Enter or click on the "Create" button.</li>
            <li>A new web panel will be created with default settings.</li>
         </ol>
      </td>
      <td><img src="https://github.com/user-attachments/assets/da636324-3408-4c6b-b625-84d6a0090e88" width="400px" /></td>
   </tr>
   <tr>
      <td>
         <h3>Changing width of the web panel</h3>
         After creating a web panel, you might want to consider changing its width. To achieve this, position the mouse cursor at the edge of the web panel opposite the sidebar and then drag it.
      </td>
      <td><img src="https://github.com/user-attachments/assets/6c47c56d-4d7c-467f-83b8-018cc3547370" width="400px" /></td>
   </tr>
   <tr>
      <td>
         <h3>Pinning and unpinning the web panel</h3>
         Depending on your needs, you can pin the web panel to the side of the web page or make it appear on top of the content.
      </td>
      <td><img src="https://github.com/user-attachments/assets/048fd1e2-d50e-4ffc-beba-dc33d06e7251" width="400px" /></td>
   </tr>
   <tr>
      <td>
         <h3>Mobile view and zooming</h3>
         There is an option to open the website using the mobile user agent. There are also buttons to zoom in and out of the content.
      </td>
      <td><img src="https://github.com/user-attachments/assets/fad1d08e-f906-47d1-990d-9e6568e1512b" width="400px" /></td>
   </tr>
   <tr>
      <td>
         <h3>Unloading the web panel from memory</h3>
         To save memory, you can manually unload the web panel using two methods: the toolbar button or the context menu.
      </td>
      <td><img src="https://github.com/user-attachments/assets/d41a7e0b-f751-45a4-9403-653254417ee1" width="400px" /></td>
   </tr>
   <tr>
      <td>
         <h3>Web panel settings</h3>
         Here you can change the following:
         <ol>
            <li>Page address. After changing the relevant field, please wait one second for the changes to be temporarily applied. They will be saved or canceled depending on your next action.
</li>
            <li>Favicon address. The same as for the page address.</li>
            <li>Web panel type: floating or pinned.</li>
            <li>Use mobile User Agent.</li>
            <li>Load into memory at startup: automatic loading of the web panel. </li>
            <li>Unload from memory after closing.</li>
            <li>Hide toolbar: "headless" web panel.</li>
            <li>Zoom.</li>
            <li>Position of the web panel button.</li>
         </ol>
         All changes are applied instantly, but can be rolled back by clicking the "Cancel" button or by losing focus. They are saved only after clicking the "Save" button.
      </td>
      <td><img src="https://github.com/user-attachments/assets/78d01e86-26cf-4726-8dae-8f8588a30c2e" width="400px" /></td>
   </tr>
   <tr>
      <td>
         <h3>Deleting the web panel</h3>
         There is confirmation of the deletion, so you don't need to worry about accidentally deleting the web panel.
      </td>
      <td><img src="https://github.com/user-attachments/assets/f564e590-a7ab-4a66-aa50-d7e8169a3f89" width="400px" /></td>
   </tr>
   <tr>
      <td>
         <h3>Sidebar settings</h3>
         Here you can change the following:
         <ol>
            <li>Sidebar position: left or right.</li>
            <li>Sidebar buttons position: top or bottom.</li>
            <li>Plus button position: above web panel buttons or below them.</li>
            <li>Sidebar width with predefined values.</li>
            <li>Sidebar buttons size in pixels.</li>
            <li>Floating web panel offset.</li>
            <li>Hide sidebar in popup windows.</li>
            <li>Auto-hide of back and forward buttons from toolbar.</li>
         </ol>
         All changes are applied instantly, but can be rolled back by clicking the "Cancel" button or by losing focus. They are saved only after clicking the "Save" button.
      </td>
      <td><img src="https://github.com/user-attachments/assets/21fc96c3-8cf5-463a-a2ba-f3ca75a70132" width="400px" /></td>
   </tr>
</table>

## Install (fx-autoconfig)

1. Install [fx-autoconfig](https://github.com/MrOtherGuy/fx-autoconfig).
2. Copy the contents of the `src/` directory (`second_sidebar/` and `second_sidebar.uc.mjs`) into `chrome/JS/`.
3. [Clear](https://github.com/MrOtherGuy/fx-autoconfig?tab=readme-ov-file#deleting-startup-cache) startup-cache.
4. Have fun!

## If you use another loader

Use a wrapper script provided by @dimdamin: https://github.com/aminought/firefox-second-sidebar/issues/5.
