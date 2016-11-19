# Project LMJW (POC)

## Module goal

- Answer the ultimate question, "how much time will it take to complete this feature?"
- Enforce continues delivery of quality software, while keeping your developer sane and happy.

## Module usage

- Provide this module with a list of work office time spending activities object for any given developer,
demo currently uses "./data.json" file to extract dummy data from it as developer mock.
- Provide amount of total tasks until feature completion when being prompt.

module should output realistic amount of sprints range until feature completion for that particular developer.
module should output "half-day" equivalent definition in hourly representation for that particular developer.

## TIPS FOR ACCURATE RESULTS:

- time spending activities data list for developer should be sincerer and accurate as possible.
- in order for this module to work accurately, the team should enforce tasks scope of "1-task/half-day" cycles.
- the developer should mentally grasp 1 ticket as "I think I can do this in 'X' hour/s".
(this module returns the 'X' for any given developer as part of it's output)
- the team should do whatever necessary in order to scope tasks at half-day cycles.
- the developer of the feature should confirm each task as "1-task/half-day" and accept responsibility over delivering it if it meets the conditions.
- if no agreement is made between team members on a specific task then that task should be restructured into smaller tasks.
- if developer cant deliver over time or spending after-hours due poor "1-task/half-day" estimations, next tasks sprint cycle should be reevaluated and optionally restructured into smaller tasks.
- if developer is over delivering, tasks should be restructured into bigger tasks in order to maintain "1-task/half-day" cycle.

## Contains

- [x] [babel-cli](https://babeljs.io/)
- [x] [babel-preset-latest](https://babeljs.io/)
- [x] [Node](https://nodejs.org/)
- [x] [Nodemon](http://nodemon.io/)
- [x] [colors](https://github.com/marak/colors.js/)

## Setup

```
$ npm install
```

## Running

```
$ npm start
```

## TODO:

- write unit test.
- work on spelling mistakes in documentation.
- write references in code to design thinking methodology.

## contributors:
- if you want to help me out and contribute to this project than anything you add should
directly help enforce design thinking for teams.
- we can start with the todo section :)
- if you never heard of design thinking before then you can start learning about it from this awesome blog post by[Tom Dabson](https://www.artefactgroup.com/articles/post-agile-a-design-thinking-approach-to-software-development/)
- additional great video tutorials on design thinking by [Chris Nodder on Lynda.com](https://www.lynda.com/Interaction-Design-tutorials/Design-Thinking-Understanding-Process/476938-2.html?srchtrk=index%3a1%0alinktypeid%3a2%0aq%3adesign+thinking%0apage%3a1%0as%3arelevance%0asa%3atrue%0aproducttypeid%3a2)

# License

ISC
