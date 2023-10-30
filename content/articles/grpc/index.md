---
title: gRPC
description: "Build gRPC endpoint using Vert.x"
date: "2023-10-31"
categories:
  - "vert.x"
keywords:
  - "vert.x"
  - "java"
  - "youtube"
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/i5wI3T-ubcM?si=XPi4yUugM6CLLUxQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

[Birb Service (Github Project)](https://github.com/smolthing/birb-service)
-----------
A gRPC service that provides methods to get birb information.

## gRPC Methods

| Methods               | Description                                                      |
|-----------------------|------------------------------------------------------------------|
| `GetBirb`             | Retrieve detailed information about a bird by its unique ID.    |
| `GetBirbByType`       | Get a list of birds belonging to a specific bird type.           |

## Protobuf Schema

```protobuf
syntax = "proto3";

package protobuf_schema.grpc;
option java_multiple_files = true;
option java_package = "com.birb.protobuf.grpc";
option java_outer_classname = "BirbProto";

enum BirbType {
  UNKNNOW = 0;
  COCKATIEL = 1;
  LOVEBIRD = 2;
  MYNAH = 3;
  PIGEON = 4;
}

service BirbService {
  rpc GetBirb (GetBirbRequest) returns (GetBirbResponse) {}
  rpc GetBirbByType (GetBirbByTypeRequest) returns (GetBirbByTypeResponse) {}

}

message Birb {
  int64 id = 1;
  string name= 2;
  string sound = 3;
  float volume = 4;
  BirbType type = 5;
}

message GetBirbRequest {
  int64 id = 1;
}

message GetBirbResponse {
  Birb birb = 1;
}

message GetBirbByTypeRequest {
  BirbType type = 1;
}

message GetBirbByTypeResponse {
  repeated Birb birb = 1;
}

```

## Calling the gRPC endpoints

1. Using grpcurl.

```bash
grpcurl -plaintext -d '{"id": 1}' -import-path ./proto -proto birb.proto localhost:50051 birb.BirbService/GetBirb
```

```bash
grpcurl -plaintext -d '{"type": PIGEON}' -import-path ./proto -proto birb.proto localhost:50051 birb.BirbService/GetBirbByType
```

2. Using Postman (Not sure why it kept crashing on meeeee) `localhost:9000`, import Birb.proto and select GetBirb orGetBirbByType method.

#### GetBirbBy Message
```
{
    "id": "1"
}
```

#### Response
```
{
    "birb": {
        "id": "1",
        "name": "ah",
        "sound": "ahhhhh",
        "volume": 0.10000000149011612,
        "type": "PIGEON"
    }
}
```

#### GetBirbByType Message
```
{
    "type": "PIGEON"
}
```

#### Response
```
{
    "birb": [
        {
            "id": "1",
            "name": "ah",
            "sound": "ahhhhh",
            "volume": 0.10000000149011612,
            "type": "PIGEON"
        },
        {
            "id": "3",
            "name": "caca",
            "sound": "caaacaaaa",
            "volume": 0.30000001192092896,
            "type": "PIGEON"
        },
        {
            "id": "5",
            "name": "eheh",
            "sound": "eheheheh",
            "volume": 0.30000001192092896,
            "type": "PIGEON"
        }
    ]
}
```

## 🗝️

0. gRPC uses Protocol Buffers(Protobuf) to define the contract between services. All the servicse have to import the protobuf to implement or use the gRPC endpoint.
1. Invalid fields will be thrown errors due to validation in Protobuf.
2. `import com.google.protobuf.gradle.id` to use the protobuf extension.
3. `implementation("javax.annotation:javax.annotation-api:1.3.2")` is required for protobuf.
4. `./gradlew generateProto` to build the protobuf separately.
5. Use Postman, insomia, bloomRPC to call gRPC endpoints. You will need to import the proto file.