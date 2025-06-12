# Zen Garden

An opinionated fork/port of [aminought](https://github.com/aminought)'s [firefox-second-sidebar](https://github.com/aminought/firefox-second-sidebar), intended to bring web panels back to Zen browser, but also to make them feel and look like a native Zen feature.

![2025-05-15 001712](https://github.com/user-attachments/assets/e4e341be-4cf4-489e-8650-155ded6c9dc8)

## Motivation

Is to remove friction and polish web panels, making them enjoyable even for those who previously disliked them or thought that it's just a gimmik.

## Install (fx-autoconfig)

1. Install [fx-autoconfig](https://github.com/MrOtherGuy/fx-autoconfig).
2. Copy the contents of the `src/` directory (`second_sidebar/` and `second_sidebar.uc.mjs`) into `chrome/JS/`.
3. Copy the contents of the `resources/` directory (`second_sidebar/`) into `chrome/resources/`.
4. (optional) Copy and merge the contents of the `extras-src/` directory (`js/`, `css/` etc.) into `chrome/`. Read corresponding [readme](https://github.com/k00lagin/zen-second-sidebar/tree/zen-second-sidebar/extras-src) for more information.
5. [Clear](https://github.com/MrOtherGuy/fx-autoconfig?tab=readme-ov-file#deleting-startup-cache) startup-cache.
6. Have fun!

## If you use another loader

Use a wrapper script provided by @dimdamin: https://github.com/aminought/firefox-second-sidebar/issues/5.
