# Interview assignment 2016
This project contains a simple email service, consisting of a nodejs powered backend persisting to mongodb and an ionic/angularjs mobile app.

All components are realized in docker containers, meaning that to get started, all you have to do is this:

```
$ docker-compose up
```

Then point your browser to `localhost:8100` for a GUI, or `curl` you way around `localhost:3000/api` to explore the api.

For the rest of this guide, `docker-compose` will be abbreviated as `dc`; if you're on bash, executing `alias dc=docker-compose` will give you the same convenience (stick it in `.bashrc` for persistent joy).

## Backend
The backend consists of a node.js server container with an express.js app, and a mongodb container. For a rationale behind the file-structure of the app, see the readme of [this repository](https://github.com/focusaurus/express_code_structure). The test server is reloaded automatically when the file system beneath `app/` changes; you can find the api at `localhost:3000`:

```
$ curl localhost:3000
Hello, World!
```

Unit tests are provided in jasmine, as that is the default for ionic apps (the client). All files named `*.tests.js` are expected to contain tests. To run the tests:
```
$ dc exec api gulp test
```

The `Gulpfile` also contains a small data generator, to seed the database with the three users `admin`, `anna` and `don` and a few messages; it is run this way:
```
$ dc exec api gulp populate-db
```

If you need to inspect/edit the database, or empty some of it:
```
$ dc exec mongo mongo msg_api_development
> ...
> db.users.remove()
> db.messages.remove()
> bye
```

## Client
TODO

## Assignment
Implement the following:
1. Backend for getting possible receivers, at `GET /api/users`.
2. A compose message form, backed by a `POST /api/messages/outbox`.
3. List of sent messages, backed by `GET /api/messages/outbox`.
