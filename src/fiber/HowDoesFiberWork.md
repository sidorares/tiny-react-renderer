## How Does Fiber Work?

> Note: it is highly recommended that you read [https://github.com/acdlite/react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)
> along with this. Andrew has a lot more foundational definitions and describes
> the `fiber` data structure, whereas this describes how updates are scheduled
> and commited from the renderers point of view.

The fiber reconciler builds on the idea of Algebraic Effects. A custom renderer
coordinates with the reconciler by informing it when certain effects should be
scheduled. The type of effects are:

* `NoEffect`
* `Placement`
* `Update`
* `PlacementAndUpdate`
* `Deletion`
* `ContentReset`
* `Callback`
* `Err`
* `Ref`

This is likely best explained with an example. We’ll create a component that
first renders the text `"Hello"` followed by rendering the text `"World"`.

```jsx
const App = (props) => <div>{props.children}</div>;

ReactDOM.render(<App>Hello</App>, document.body);
ReactDOM.render(<App>Goodbye</App>, document.body);
```

In your reconciler config you will have a few methods specifically regarding
text updates.

* `shouldSetTextContent`
* `createTextInstance`
* `resetTextContent`
* `commitTextUpdate`

`shouldSetTextContent` method returns a boolean to inform the reconciler to
schedule a `ContentReset` effect which results in the reconcilers
`resetTextContent` and `commitTextUpdate` methods being called at the
appropriate times.

