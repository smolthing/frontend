---
title: "Create HTTP API with Quarkus"
description: "A simple tutorial to create HTTP API endpoints using Quarkus; create, retrieve and delete a user."
date: "2023-10-01"
categories:
  - "Quarkus"
keywords:
  - "Quarkus"
  - "Java"
  - "HTTP API"
---

# HTTP API for User

Create HTTP API for users using HashMap to store user data.

- `POST /users - create a user`
- `GET /users - get a list of users`
- `GET /users/{id} - get a user`
- `DELETE /users/{id} - delete a user`

## Getting Started with Quarkus

For more information, read https://quarkus.io/guides/getting-started.

```
git clone https://github.com/quarkusio/quarkus-quickstarts.git
quarkus create app org.acme:getting-started \
    --extension='resteasy-reactive'
cd getting-started
```

## Code

Add a User (store user information), UserService (a service to get user data) and UserResource (http controller with path `/users`).

Add a User by creating `/src/main/java/org/acme/http/user/model/User.java`.

```java
package org.acme.http.user;

import io.quarkus.cache.CacheResult;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Default;
import java.util.HashMap;
import java.util.Map;
import org.acme.http.user.model.User;

@Default
@ApplicationScoped
public class UserService {
  private Map<String, User> users = new HashMap<>();

  @CacheResult(cacheName = "user-cache")
  public Map<String, User> getUsers() {
    return users;
  }

  @CacheResult(cacheName = "user-cache")
  public User getUser(String id) {
    return users.get(id);
  }

  public User addUser(User user) {
    users.put(user.id, user);
    return user;
  }

  public User deleteUser(String id) {
    return users.remove(id);
  }
}
```

Add a UserService by creating `src/main/java/org/acme/http/user/UserService.java`.

```java
package org.acme.http.user;

import io.quarkus.cache.CacheResult;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Default;
import java.util.HashMap;
import java.util.Map;
import org.acme.http.user.model.User;

@Default
@ApplicationScoped
public class UserService {
  private Map<String, User> users = new HashMap<>();

  @CacheResult(cacheName = "user-cache")
  public Map<String, User> getUsers() {
    return users;
  }

  @CacheResult(cacheName = "user-cache")
  public User getUser(String id) {
    return users.get(id);
  }

  public User addUser(User user) {
    users.put(user.id, user);
    return user;
  }

  public User deleteUser(String id) {
    return users.remove(id);
  }
}

```

Add a HttpResponse by creating `src/main/java/org/acme/http/user/HttpResponse.java`.

```java
package org.acme.http.user;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.acme.http.user.model.User;

public class HttpResponse {
  public static class GetUserResponse {
    public List<User> users;

    public GetUserResponse(Map<String, User> listOfUsers) {
      this.users = listOfUsers.values().stream().toList();;
    }
  }
}
```

Add a UserResource by creating `src/main/java/org/acme/http/user/resource/UserResource.java`.

```java
package org.acme.http.user.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;
import org.acme.http.user.HttpResponse.GetUserResponse;
import org.acme.http.user.UserService;
import org.acme.http.user.model.User;

@Path("/users")
public class UserResource {

  @Inject
  private UserService userService;

  @GET
  public GetUserResponse getUsers() {
    return new GetUserResponse(userService.getUsers());
  }

  @GET
  @Path("/{id}")
  public User getUser(@PathParam("id") String id) {
    final var user = userService.getUser(id);
    if (user == null) {
      throw new NotFoundException();
    }

    return user;
  }

  @POST
  public User add(User user) {
    return userService.addUser(user);
  }

  @DELETE
  @Path("/{id}")
  public Response delete(String id) {
    final var user = userService.deleteUser(id);
    if (user == null) {
      throw new NotFoundException();
    }
    return Response.status(204).build();
  }
}

```

## Run commands:

```
quarkus dev
```

POST /users

```
curl --request POST \
  --url http://localhost:8000/users \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "test",
	"email": "test@example.com"
}'
```

Response

```json
{
  "id": "91555909-59dc-494a-80dd-90bcd88652fd",
  "name": "test",
  "email": "test@example.com"
}
```

GET /users

```js
curl --request GET \
  --url http://localhost:8000/users \
  --header 'Accept: application/json'
```

Response

```json
{
  "users": [
    {
      "id": "91555909-59dc-494a-80dd-90bcd88652fd",
      "name": "test",
      "email": "test@example.com"
    },
    {
      "id": "9130523c-fb9b-422a-95f0-575e3716f4ef",
      "name": "test1",
      "email": "test1@example.com"
    },
    {
      "id": "b1944944-68de-4cbe-8f15-414254555a9f",
      "name": "test2",
      "email": "test2@example.com"
    }
  ]
}
```

GET /users/{id}

```js
curl --request GET \
  --url http://localhost:8000/users/9130523c-fb9b-422a-95f0-575e3716f4ef \
  --header 'Accept: application/json'
```

Response

```json
{
  "id": "9130523c-fb9b-422a-95f0-575e3716f4ef",
  "name": "test1",
  "email": "test1@example.com"
}
```

DELETE /users/{id}

```
curl --request DELETE \
  --url http://localhost:8000/users/b1944944-68de-4cbe-8f15-414254555a9f \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json'
```

Response

```
204 no content
```

## The end

[Github code](https://github.com/smolthing/backend-quarkus)
