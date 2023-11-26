# Gneiss

Gneiss is an open-source social network kit that allows you to build your own private social network.

---
![Gneiss Social Network Kit](assets/gneiss.png)

## Features

* **Posts**:  Create, edit, delete posts
* **Likes**: Like/unlike posts
* **Comments**: Create and delete comments on posts
* **User management**: Sign in, sign up, sign out, reset password
* **Wall**: Display posts on user wall
* **Profile**: User profile
* **Files and photos management**: Add ability to upload and display images and files
* **Spaces**: Dedicated place for a subset of users to connect and share privately

### TODO

* **Notifications**: Display internal and email notifications
* **Follow**: User can follow another user
* **Invite**: User can invite another user to join the network
* **Mentioning**: User can mention another user in a post or a comment
* **Activity**: Display activities of users  

## Setup

```bash
make build
make up

cd console
make migrate
make metadata
```

## GraphQL console

```bash
make console
```

## Endpoints

| Port        | Service     |
| ----------- | ----------- |
| 3333        | UI          |
| 5555        | Rest API    |
| 8080        | GraphQL API |
| 8888        | Adminer     |

## License

MIT License
