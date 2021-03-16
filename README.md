# svelte-starter-kit
> Simple Svelte starter kit boilerplate based on Webpack, SASS and Bootstrap 5 (alpha)

## How to use
Just clone the project in a new folder:
```bash
git clone https://github.com/mohole/svelte-starter-kit my-new-project
```

install dependencies
```bash
cd my-new-project
npm install 
# or "npm i" as shortcut...
```

and get started:
```bash
npm start
```

This will start a `webpack-dev-server` instance in `hot-reload` mode (*this will automatically update your browser when you apply any changes to the source files*), your project will be exposed at `localhost:8080`.

To create the optimized files to publish to whaterver static hosting you choose, just run:
```bash
npm run build
```

the result will be available in the `./dist` folder.

## Customizations
Youn can change the notifications title by editing the `displayName` field in the `package.json` file:

```json
 "displayName": "Svelte starter kit",
```

per modificare la porta su cui avviare il dev-server di Webpack e la cartella in cui generare i file pubblicabili, basta modificare le relative costanti nel file `webpack.config.js`:

```javascript
const dist = './dist';
const port = 8080;
```

## License
Release under the [MIT license](LICENSE).
