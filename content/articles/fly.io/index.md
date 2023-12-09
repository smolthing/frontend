---
title: "Fly.io"
description: "Deploy for free"
date: "2023-12-09"
categories:
  - "Deployment"
keywords:
  - "Deployment"
  - "fly.io"
---

## Deploy Java application using [fly.io](https://fly.io/docs/hands-on/install-flyctl/)

#### Install dependencies and create account
```bash
brew install flyctl
fly auth signup
fly auth login
```

#### Launch [docker image into fly.io](https://hub.docker.com/layers/mysmolthing/birb-service/1.0/images/sha256:4581d48b1fdf70ee40886e7b7bd1c06b82aa2bd7246b482caa52080fe68e292d)
```js
cd PATH_TO_FOLDER_CONTAINING_K8_DEPLOYMENT
fly launch
// add credit card information in order to run launch
// I say no to dockerignore option as it breaks my docker image
...
```

Generated fly.toml. Update configuration for gRPC with port 9000 using tls.
```
# fly.toml app configuration file generated for birb-service on 2023-12-09T22:43:38+08:00
#
# See https://fly.io/docs/reference/configuration/ for information about how to use this file.
#

app = "birb-service"
primary_region = "hkg"

[build]

[[services]]
  internal_port = 9000
  protocol = "tcp"
  processes = ["app"]
  http_checks = []
  script_checks = []

  [[services.ports]]
    handlers = ["tls"]
    port = 443

  [services.ports.tls_options]
    alpn = ["h2"]

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 1024

```

#### Pricing [as of 9/12/23]
```
Free allowances
Resources included for free on all plans:

Up to 3 shared-cpu-1x 256mb VMs
3GB persistent volume storage (total)
160GB outbound data transfer
```

Seems too good to be true, hopefully I don't have to pay anything to showcase my birb.( ' >')


### Fly Scaling
Woah, this is like hpa scaling but better.
```js
$ fly scale show // see scaling count
VM Resources for app: birb-service

Groups
NAME	COUNT	KIND  	CPUS	MEMORY 	REGIONS
app 	2    	shared	1   	1024 MB	hkg(2)

$ fly scale count 1 // reduce to 1 to reduce usage eh
App 'birb-service' is going to be scaled according to this plan:
  -1 machines for group 'app' on region 'hkg' of size 'shared-cpu-1x'
? Scale app birb-service? Yes
Executing scale plan
  Destroyed 91857447c1d528 group:app region:hkg size:shared-cpu-1x
```

Overall, it's simple and sweet. 5/5