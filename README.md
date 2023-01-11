# Kurs Book Order Manager

This is React.Js application made for managing orders coming from [Kurs Book Website](https://github.com/masleeh/kursbook-website) <br>

[Figma project file](https://www.figma.com/file/5Cf7IdQN7WyEVxPaEVkG2U/%D0%9A%D0%BD%D0%B8%D0%B3%D0%B0-%D0%9A%D1%83%D1%80%D1%81?node-id=175%3A4&t=qzber5mfJO04XkU2-1)

## Project specification

***Client:***

+ Framework: **React.js**
+ Typescript
+ SCSS (transformed to CSS through VSCode Extension)
+ JSON Web Token Authorization

## Project structure

Application has login page:
![Снимок экрана (17)](https://user-images.githubusercontent.com/102211370/211869830-ca952e25-57e8-4e56-a3af-d4761c7bc506.png)

After successful login/password verifying client receives JSON-web-token. After saving token in local storage, client <br>
makes **GEt** request for all orders.<br>
Orders manager looks like this:
 ![New video](https://user-images.githubusercontent.com/102211370/211869732-be87fad1-8d55-4258-9acd-4a5df7fe41ab.gif)
<br>

All changes are saving in Mongo DB Atlas
