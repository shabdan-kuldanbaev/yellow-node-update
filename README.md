WE ARE YELLOW!!!

We refactored almost the entire project, but here's still some deprecated components left. Refactored components, sections and views are located in `./UI/`.

We tried to keep the code as splitted as possible, so we decided to use this stucture:

- `./*ComponentName*/index.js`- root component file with markdown and hook `useProps` or `use*ComponentName*Props` (doesnt matter)
- `useProps` or `use*ComponentName*Props` hook, which contains all logic of the component and takes component's props as an argument
- Styles, splitted by page path

There's some components inside `./containers` and `./components` left after refactoring. We didnt have enough time to move them to `./UI` folder.
