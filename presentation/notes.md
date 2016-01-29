# MVC Simple

To best describe flux, we will compare it to one of the leading client-side architectures: MVC. In a client-side MVC application, a user interaction triggers code in a controller. The controller knows how to coordinate changes to one or more models by calling methods on the models. When the models change, they notify one or more views, which in turn read the new data from the models and update themselves accordingly so that the user can see that new data.

---

# MVC Complex

As an MVC application grows and controllers, models, and views are added, the dependencies become more complex.

With the addition of just three views, one controller, and one model, the dependency graph is already harder to trace. When the user interacts with the UI, multiple branching code paths are executed, and debugging problems in application state becomes an exercise in figuring out which module (or modules) in one (or more) of these potential code paths contains a bug. In the worst cases, a user interaction will trigger updates which in turn trigger additional updates, resulting in error-prone and difficult-to-debug cascading effects along several of these, sometimes overlapping, paths.

---

# Flux Simple

Flux eschews this design in favor of a one-way data flow. All user interactions within a view call an action creator, which causes an action event to be emitted from a singleton dispatcher. The dispatcher is a single-point-of-emission for all actions in a flux application. The action is sent from the dispatcher to stores, which update themselves in response to the action.

---

# Demo

Together, we are going to build a map application, that allows us to search for keywords, and view the results on a heatmap.

The dataset we will be using is of chicago crimes from 2001 to present. 

What we will start with is a skeleton that gives us
- TypeScript compilation
- An asset server
- A data server
- Styles

Hello world

Map with static locations

Search input with console.log

Async set locations

---

# If extra time

- Writing your own typescript definitions.
- Explain middleware
