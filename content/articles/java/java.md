---
title: Everything about Java (WIP)
description: Focusing on Data Structure
date: "2024-01-02"
categories:
  - "java"
keywords:
  - "java"
---

## JVM vs JRE vs JDK

## Process vs Thread

## Deadlock

## Map
```java
import java.util.*;

class EverythingAboutMap {
    public static void main(String args[]){
      Map<String, String> birbMap = new HashMap<>(); // <> infer type
      birbMap.put("bibi", "chirps");
      birbMap.put("dudu", "barks");

      System.out.println(birbMap);
      // {bibi=chirps, dudu=barks}

      Map<String, String> birbMapWithDefaultValues = Map.of("bibi", "chirps", "dudu","barks"); // key, value, key, value ... -> limit of 10 keys only
      System.out.println(birbMapWithDefaultValues);
      // {bibi=chirps, dudu=barks}

      Map<String, String> birbMapWithEntries = Map.ofEntries(Map.entry("bibi", "chirps")); // unlimited number of entries
      System.out.println("entries: " + birbMapWithEntries);


      for(var birbKey: birbMap.keySet()) {
        System.out.println(String.format("birb: %s, %s", birbKey, birbMap.get(birbKey)));
      }
      // birb: bibi, chirps
      // birb: dudu, barks

      for (var birbEntry: birbMap.entrySet()) {
        System.out.println(String.format("birb: %s, %s", birbEntry.getKey(), birbEntry.getValue()));
      }
      // birb: bibi, chirps
      // birb: dudu, barks

      Map.Entry<Integer, Birb> tuple;
      tuple = new AbstractMap.SimpleEntry<>(1, new Birb("bibi", "chirps"));
      System.out.println(tuple);
      // 1=Birb[name=bibi, sound=chirps]

      List<Map.Entry<Integer, Birb>> orderedTuple = new ArrayList<>();
      orderedTuple.add(Map.entry(1, new Birb("bibi", "chirps")));
      orderedTuple.add(Map.entry(2, new Birb("dudu", "barks")));
      System.out.println(orderedTuple);
      // [1=Birb[name=bibi, sound=chirps], 2=Birb[name=dudu, sound=barks]]

      orderedTuple.forEach(birb -> {
        System.out.println(birb);
        System.out.println(String.format("birb: %s, %s", birb.getKey(), birb.getValue()));
      });
      // 1=Birb[name=bibi, sound=chirps]
      // birb: 1, Birb[name=bibi, sound=chirps]
      // 2=Birb[name=dudu, sound=barks]
      // birb: 2, Birb[name=dudu, sound=barks]


      Set<String> uniqueSet = new HashSet<>();
    }
}

record Birb(String name, String sound) {
}

```

## Enum
```
```

## Interface

## Record


